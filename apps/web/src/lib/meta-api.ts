import { supabase } from "./supabase"

export interface MetaIntegration {
  id: string
  facebook_user_id: string
  facebook_user_name: string | null
  status: "connected" | "expired" | "revoked"
  token_expires_at: string | null
  created_at: string
}

export interface MetaAdAccount {
  id: string
  integration_id: string
  account_id: string
  name: string
  account_status: number
  currency: string
  timezone_name: string
  business_name: string | null
  is_active: boolean
  created_at: string
}

export interface MetaInsightSummary {
  spend: number
  impressions: number
  clicks: number
  reach: number
  frequency: number
  cpc: number
  cpm: number
  ctr: number
  messages: number
  leads: number
  purchases: number
  landing_page_views: number
  link_clicks: number
  video_views: number
  roas: number
  purchase_value: number
  date_start: string | null
  date_stop: string | null
}

export interface MetaCampaignInsight {
  id: string
  name: string
  status: string
  objective: string
  daily_budget: number
  spend: number
  impressions: number
  clicks: number
  reach: number
  cpc: number
  ctr: number
  leads: number
  messages: number
  purchases: number
}

export interface MetaInsightsReport {
  id?: string
  account_id: string
  period: string
  summary: MetaInsightSummary
  campaigns: MetaCampaignInsight[]
  actions_breakdown?: any[]
  last_synced_at: string
}

export async function fetchCurrentIntegration(): Promise<MetaIntegration | null> {
  const { data, error } = await supabase
    .from("meta_integrations")
    .select("id, facebook_user_id, facebook_user_name, status, token_expires_at, created_at")
    .eq("status", "connected")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error("Erro ao buscar integracao com a Meta:", error.message)
    return null
  }

  return data
}

export async function fetchConnectedAdAccounts(): Promise<MetaAdAccount[]> {
  const { data, error } = await supabase
    .from("meta_ad_accounts")
    .select("*")
    .order("name", { ascending: true })

  if (error) {
    console.error("Erro ao carregar contas de anuncios:", error.message)
    return []
  }

  return data || []
}

export async function getMetaAuthUrl(redirectUri?: string): Promise<string> {
  const { data, error } = await supabase.functions.invoke("meta-auth", {
    body: { action: "get-url", redirectUri },
  })

  if (error || !data?.url) {
    throw new Error(error?.message || data?.error || "Falha ao obter URL de autenticacao.")
  }

  return data.url
}

export async function handleMetaCallback(code: string, redirectUri?: string) {
  const { data, error } = await supabase.functions.invoke("meta-auth", {
    body: { action: "callback", code, redirectUri },
  })

  if (error || !data?.success) {
    throw new Error(error?.message || data?.error || "Falha ao processar autorizacao da Meta.")
  }

  return data
}

export async function triggerMetaSync(token?: string) {
  const { data, error } = await supabase.functions.invoke("meta-auth", {
    body: { action: "sync", token },
  })

  if (error || !data?.success) {
    throw new Error(error?.message || data?.error || "Falha ao sincronizar contas da Meta.")
  }

  return data
}

export async function disconnectMetaIntegration(): Promise<void> {
  await supabase.functions.invoke("meta-auth", {
    body: { action: "disconnect" },
  })

  await supabase.from("meta_integrations").delete().neq("id", "00000000-0000-0000-0000-000000000000")
}

export async function fetchAccountInsights(
  accountId: string,
  period: string = "maximum",
  forceSync: boolean = false
): Promise<{ fromCache: boolean; data: MetaInsightsReport }> {
  const cleanAccountId = accountId.replace("act_", "")

  // Se nao for forceSync, tenta buscar direto do Supabase DB primeiro
  if (!forceSync) {
    const { data: cached } = await supabase
      .from("meta_insights_cache")
      .select("*")
      .eq("account_id", cleanAccountId)
      .eq("period", period)
      .maybeSingle()

    if (cached && cached.summary) {
      return {
        fromCache: true,
        data: cached as MetaInsightsReport,
      }
    }
  }

  // Se for forceSync ou nao estiver no cache, aciona a Edge Function
  const { data, error } = await supabase.functions.invoke("meta-insights", {
    body: { accountId: cleanAccountId, period, forceSync },
  })

  if (error || !data?.success) {
    throw new Error(error?.message || data?.error || "Falha ao consultar insights da Meta.")
  }

  return {
    fromCache: data.fromCache,
    data: data.data as MetaInsightsReport,
  }
}
