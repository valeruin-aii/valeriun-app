import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json().catch(() => ({}));
    const { accountId, period = "maximum", forceSync = false } = body;

    if (!accountId) {
      throw new Error("ID da conta de anuncios (accountId) e obrigatorio.");
    }

    const cleanAccountId = accountId.replace("act_", "");

    // 1. Verifica se ja existe no cache (quando nao for forceSync)
    if (!forceSync) {
      const { data: cached } = await supabase
        .from("meta_insights_cache")
        .select("*")
        .eq("account_id", cleanAccountId)
        .eq("period", period)
        .maybeSingle();

      if (cached) {
        return new Response(JSON.stringify({ success: true, fromCache: true, data: cached }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
    }

    // 2. Busca token ativo de acesso
    const { data: integration, error: intErr } = await supabase
      .from("meta_integrations")
      .select("access_token")
      .eq("status", "connected")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (intErr || !integration?.access_token) {
      throw new Error("Nenhuma conta Meta conectada ou token de acesso indisponivel.");
    }

    const token = integration.access_token;

    // 3. Consulta Meta Marketing API em paralelo
    const insightsFields = [
      "spend",
      "impressions",
      "clicks",
      "cpc",
      "cpm",
      "ctr",
      "reach",
      "frequency",
      "actions",
      "action_values",
      "cost_per_action_type",
      "date_start",
      "date_stop",
    ].join(",");

    const [accountInsightsRes, campaignInsightsRes, campaignsListRes] = await Promise.all([
      // A. Totais agregados da conta
      fetch(
        `https://graph.facebook.com/v21.0/act_${cleanAccountId}/insights?fields=${insightsFields}&date_preset=${period}&access_token=${token}`
      ),
      // B. Metricas por campanha
      fetch(
        `https://graph.facebook.com/v21.0/act_${cleanAccountId}/insights?fields=campaign_id,campaign_name,${insightsFields}&level=campaign&date_preset=${period}&limit=50&access_token=${token}`
      ),
      // C. Lista de campanhas (status e orcamento)
      fetch(
        `https://graph.facebook.com/v21.0/act_${cleanAccountId}/campaigns?fields=id,name,status,objective,daily_budget,lifetime_budget,start_time,stop_time&limit=50&access_token=${token}`
      ),
    ]);

    const [accountData, campaignInsightsData, campaignsListData] = await Promise.all([
      accountInsightsRes.json(),
      campaignInsightsRes.json(),
      campaignsListRes.json(),
    ]);

    if (accountData.error) {
      throw new Error(`Erro na Meta API (Totais): ${accountData.error.message}`);
    }

    // 4. Normalizacao dos Totais
    const rawTotal = accountData.data?.[0] || {};
    const actions = rawTotal.actions || [];
    const actionValues = rawTotal.action_values || [];

    const messagesCount = extractActionCount(actions, [
      "onsite_conversion.messaging_conversation_started_7d",
      "onsite_conversion.total_messaging_connection",
      "onsite_conversion.messaging_first_reply",
    ]);

    const leadsCount = extractActionCount(actions, [
      "lead",
      "onsite_conversion.lead",
      "offsite_complete_registration_add_meta_leads",
    ]);

    const purchasesCount = extractActionCount(actions, [
      "omni_purchase",
      "purchase",
      "onsite_conversion.purchase",
    ]);

    const landingPageViews = extractActionCount(actions, [
      "landing_page_view",
      "omni_landing_page_view",
    ]);

    const linkClicks = extractActionCount(actions, ["link_click"]);
    const videoViews = extractActionCount(actions, ["video_view"]);

    const spendNum = parseFloat(rawTotal.spend || "0");
    const purchaseValueNum = extractActionValue(actionValues, ["purchase", "omni_purchase"]);
    const calculatedRoas = spendNum > 0 && purchaseValueNum > 0 ? purchaseValueNum / spendNum : 0;

    const summary = {
      spend: spendNum,
      impressions: parseInt(rawTotal.impressions || "0", 10),
      clicks: parseInt(rawTotal.clicks || "0", 10),
      reach: parseInt(rawTotal.reach || "0", 10),
      frequency: parseFloat(rawTotal.frequency || "1"),
      cpc: parseFloat(rawTotal.cpc || "0"),
      cpm: parseFloat(rawTotal.cpm || "0"),
      ctr: parseFloat(rawTotal.ctr || "0"),
      messages: messagesCount,
      leads: leadsCount,
      purchases: purchasesCount,
      landing_page_views: landingPageViews,
      link_clicks: linkClicks,
      video_views: videoViews,
      roas: parseFloat(calculatedRoas.toFixed(2)),
      purchase_value: purchaseValueNum,
      date_start: rawTotal.date_start || null,
      date_stop: rawTotal.date_stop || null,
    };

    // 5. Normalizacao de Campanhas
    const campaignsMap = new Map();

    // Registra campanhas cadastradas
    if (campaignsListData.data) {
      for (const camp of campaignsListData.data) {
        campaignsMap.set(camp.id, {
          id: camp.id,
          name: camp.name,
          status: camp.status || "PAUSED",
          objective: camp.objective || "OUTCOME_TRAFFIC",
          daily_budget: camp.daily_budget ? parseFloat(camp.daily_budget) / 100 : 0,
          spend: 0,
          impressions: 0,
          clicks: 0,
          reach: 0,
          cpc: 0,
          ctr: 0,
          leads: 0,
          messages: 0,
          purchases: 0,
        });
      }
    }

    // Mescla com metricas de insights
    if (campaignInsightsData.data) {
      for (const ins of campaignInsightsData.data) {
        const campActions = ins.actions || [];
        const existing = campaignsMap.get(ins.campaign_id) || {
          id: ins.campaign_id,
          name: ins.campaign_name,
          status: "ACTIVE",
          objective: "OUTCOME_TRAFFIC",
          daily_budget: 0,
        };

        existing.spend = parseFloat(ins.spend || "0");
        existing.impressions = parseInt(ins.impressions || "0", 10);
        existing.clicks = parseInt(ins.clicks || "0", 10);
        existing.reach = parseInt(ins.reach || "0", 10);
        existing.cpc = parseFloat(ins.cpc || "0");
        existing.ctr = parseFloat(ins.ctr || "0");
        existing.messages = extractActionCount(campActions, [
          "onsite_conversion.messaging_conversation_started_7d",
          "onsite_conversion.total_messaging_connection",
        ]);
        existing.leads = extractActionCount(campActions, ["lead", "onsite_conversion.lead"]);
        existing.purchases = extractActionCount(campActions, ["purchase", "omni_purchase"]);

        campaignsMap.set(ins.campaign_id, existing);
      }
    }

    const campaignsList = Array.from(campaignsMap.values()).sort((a, b) => b.spend - a.spend);

    // 6. Grava no cache do Supabase
    const cachePayload = {
      account_id: cleanAccountId,
      period,
      summary,
      campaigns: campaignsList,
      actions_breakdown: actions,
      last_synced_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: savedCache, error: saveErr } = await supabase
      .from("meta_insights_cache")
      .upsert(cachePayload, { onConflict: "account_id,period" })
      .select()
      .single();

    if (saveErr) {
      console.error("Erro ao salvar cache de insights:", saveErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        fromCache: false,
        data: savedCache || cachePayload,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

// Funcoes utilitarias de extracao
function extractActionCount(actions: any[], types: string[]): number {
  if (!Array.isArray(actions)) return 0;
  for (const type of types) {
    const found = actions.find((a) => a.action_type === type);
    if (found && found.value) {
      return parseInt(found.value, 10);
    }
  }
  return 0;
}

function extractActionValue(actionValues: any[], types: string[]): number {
  if (!Array.isArray(actionValues)) return 0;
  for (const type of types) {
    const found = actionValues.find((a) => a.action_type === type || a.action_type.includes(type));
    if (found && found.value) {
      return parseFloat(found.value);
    }
  }
  return 0;
}
