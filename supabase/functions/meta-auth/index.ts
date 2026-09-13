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
    const metaAppId = Deno.env.get("META_APP_ID") ?? "";
    const metaAppSecret = Deno.env.get("META_APP_SECRET") ?? "";
    const defaultAccessToken = Deno.env.get("ACCESS_TOKEN") ?? Deno.env.get("META_ACCESS_TOKEN") ?? "";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Identifica o usuario autenticado se houver header Authorization
    const authHeader = req.headers.get("Authorization");
    let userId: string | null = null;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data: { user } } = await supabase.auth.getUser(token);
      if (user) {
        userId = user.id;
      }
    }

    const { action, code, redirectUri, token: inputToken } = await req.json().catch(() => ({ action: "status" }));

    // 1. Gerar URL de Autenticacao OAuth
    if (action === "get-url") {
      const targetRedirect = redirectUri || "http://localhost:5173/integracoes";
      const scopes = "ads_management,ads_read,business_management,public_profile";
      const state = btoa(JSON.stringify({ userId, timestamp: Date.now() }));
      const authUrl = `https://www.facebook.com/v21.0/dialog/oauth?client_id=${metaAppId}&redirect_uri=${encodeURIComponent(targetRedirect)}&scope=${scopes}&state=${state}&response_type=code`;

      return new Response(JSON.stringify({ success: true, url: authUrl }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // 2. Callback OAuth: Troca o code por token de longa duracao
    if (action === "callback") {
      if (!code) {
        throw new Error("Codigo de autorizacao (code) ausente.");
      }

      const targetRedirect = redirectUri || "http://localhost:5173/integracoes";

      // Troca code por short-lived token
      const tokenUrl = `https://graph.facebook.com/v21.0/oauth/access_token?client_id=${metaAppId}&redirect_uri=${encodeURIComponent(targetRedirect)}&client_secret=${metaAppSecret}&code=${code}`;
      const tokenRes = await fetch(tokenUrl);
      const tokenData = await tokenRes.json();

      if (tokenData.error) {
        throw new Error(`Erro na Meta OAuth: ${tokenData.error.message}`);
      }

      const shortLivedToken = tokenData.access_token;

      // Troca por long-lived token (60 dias)
      const extendUrl = `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${metaAppId}&client_secret=${metaAppSecret}&fb_exchange_token=${shortLivedToken}`;
      const extendRes = await fetch(extendUrl);
      const extendData = await extendRes.json();

      const longLivedToken = extendData.access_token || shortLivedToken;
      const expiresIn = extendData.expires_in || 5184000; // ~60 dias em segundos
      const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

      // Busca perfil do usuario Meta
      const meRes = await fetch(`https://graph.facebook.com/v21.0/me?access_token=${longLivedToken}&fields=id,name`);
      const meData = await meRes.json();

      // Salva ou atualiza a integracao no Supabase
      const { data: integration, error: intError } = await supabase
        .from("meta_integrations")
        .upsert(
          {
            user_id: userId,
            facebook_user_id: meData.id || "unknown",
            facebook_user_name: meData.name || "Meta User",
            access_token: longLivedToken,
            token_expires_at: expiresAt,
            scopes: ["ads_management", "ads_read", "business_management", "public_profile"],
            status: "connected",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "facebook_user_id" }
        )
        .select()
        .single();

      if (intError) {
        throw new Error(`Erro ao salvar integracao: ${intError.message}`);
      }

      // Sincroniza contas de anuncios
      const accounts = await syncAccountsFromMeta(supabase, integration.id, userId, longLivedToken);

      return new Response(JSON.stringify({ success: true, integration, accounts }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // 3. Sincronizacao Direta (utilizando token fornecido, variavel de ambiente ou token salvo)
    if (action === "sync") {
      let activeToken = inputToken || defaultAccessToken;
      let integrationId: string | null = null;

      if (!activeToken) {
        // Busca token existente no banco
        const { data: existingInt } = await supabase
          .from("meta_integrations")
          .select("*")
          .eq("status", "connected")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (existingInt) {
          activeToken = existingInt.access_token;
          integrationId = existingInt.id;
        }
      }

      if (!activeToken) {
        throw new Error("Nenhum access token configurado ou encontrado.");
      }

      // Se nao tem integracao criada mas temos o token (ex: configurado via env var), cria/atualiza registro
      if (!integrationId) {
        const meRes = await fetch(`https://graph.facebook.com/v21.0/me?access_token=${activeToken}&fields=id,name`);
        const meData = await meRes.json();

        if (meData.error) {
          throw new Error(`Erro ao validar token na Meta: ${meData.error.message}`);
        }

        const { data: newInt, error: createError } = await supabase
          .from("meta_integrations")
          .upsert(
            {
              user_id: userId,
              facebook_user_id: meData.id || "meta_dev",
              facebook_user_name: meData.name || "Conta Meta Integrada",
              access_token: activeToken,
              scopes: ["ads_management", "ads_read", "business_management", "public_profile"],
              status: "connected",
              updated_at: new Date().toISOString(),
            },
            { onConflict: "facebook_user_id" }
          )
          .select()
          .single();

        if (createError) {
          throw new Error(`Erro ao registrar integracao: ${createError.message}`);
        }
        integrationId = newInt.id;
      }

      // Importa contas de anuncios da Graph API
      const accounts = await syncAccountsFromMeta(supabase, integrationId, userId, activeToken);

      return new Response(JSON.stringify({ success: true, count: accounts.length, accounts }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // 4. Desconectar Integracao
    if (action === "disconnect") {
      let query = supabase.from("meta_integrations").delete();
      if (userId) {
        query = query.eq("user_id", userId);
      } else {
        query = query.neq("id", "00000000-0000-0000-0000-000000000000");
      }
      await query;

      return new Response(JSON.stringify({ success: true, message: "Integracao desconectada com sucesso." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Status padrao
    return new Response(JSON.stringify({ success: true, message: "Meta Auth Edge Function operacional." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

// Funcao auxiliar para consultar a Meta e gravar no banco
async function syncAccountsFromMeta(supabase: any, integrationId: string, userId: string | null, accessToken: string) {
  const adAccountsUrl = `https://graph.facebook.com/v21.0/me/adaccounts?access_token=${accessToken}&fields=id,account_id,name,account_status,currency,timezone_name,business_name`;
  const res = await fetch(adAccountsUrl);
  const data = await res.json();

  if (data.error) {
    throw new Error(`Erro ao consultar contas de anuncios na Meta: ${data.error.message}`);
  }

  const accountsList = data.data || [];
  const records = accountsList.map((acc: any) => ({
    integration_id: integrationId,
    user_id: userId,
    account_id: acc.account_id || acc.id?.replace("act_", ""),
    name: acc.name || `Conta ${acc.account_id}`,
    account_status: acc.account_status || 1,
    currency: acc.currency || "BRL",
    timezone_name: acc.timezone_name || "America/Sao_Paulo",
    business_name: acc.business_name || "Business Account",
    is_active: acc.account_status === 1,
    updated_at: new Date().toISOString(),
  }));

  if (records.length > 0) {
    const { error } = await supabase
      .from("meta_ad_accounts")
      .upsert(records, { onConflict: "integration_id,account_id" });

    if (error) {
      console.error("Erro ao fazer upsert das contas:", error);
    }
  }

  return records;
}
