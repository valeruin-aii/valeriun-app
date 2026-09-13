import * as React from "react"
import { 
  BarChart3, 
  Users, 
  ChevronDown,
  Play,
  RefreshCw,
  Smartphone,
  Calculator,
  HelpCircle,
  SlidersHorizontal,
  LayoutDashboard
} from "lucide-react"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@workspace/ui/components/tabs"
import { Button } from "@workspace/ui/components/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@workspace/ui/components/dropdown-menu"

import { 
  fetchCurrentIntegration, 
  fetchConnectedAdAccounts, 
  fetchAccountInsights,
  type MetaIntegration,
  type MetaAdAccount,
  type MetaInsightsReport
} from "@/lib/meta-api"

// Sub-components
import { OverviewMetrics } from "../components/dashboard/overview-metrics"
import { PipelineFunnel } from "../components/dashboard/pipeline-funnel"
import { AdvancedIndicators } from "../components/dashboard/advanced-indicators"
import { PerformanceChart } from "../components/dashboard/performance-chart"
import { ChannelSummary } from "../components/dashboard/channel-summary"
import { CampaignTable } from "../components/dashboard/campaign-table"
import { AiCreatives } from "../components/dashboard/ai-creatives"
import { DevicesAndNetworks } from "../components/dashboard/devices-and-networks"
import { CreativesAndAudience } from "../components/dashboard/creatives-and-audience"
import { RoasCalculator } from "../components/dashboard/roas-calculator"
import { MetricsManual } from "../components/dashboard/metrics-manual"

const reportModes = [
  { id: "automatico", label: "Automático" },
  { id: "whatsapp_leads", label: "WhatsApp / Leads" },
  { id: "vendas_roas", label: "Vendas / ROAS" },
  { id: "trafego_alcance", label: "Tráfego / Alcance" },
  { id: "todos_kpis", label: "Todos os KPIs" },
]

const periodsList = [
  { key: "maximum", label: "Histórico Completo (Máximo)" },
  { key: "last_30d", label: "Últimos 30 dias" },
  { key: "last_14d", label: "Últimos 14 dias" },
  { key: "last_7d", label: "Últimos 7 dias" },
  { key: "this_month", label: "Este Mês" },
  { key: "today", label: "Hoje" },
]

export function CampaignDashboard() {
  const [isProMode, setIsProMode] = React.useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('campaign-dashboard-pro-mode')
      return saved !== null ? JSON.parse(saved) : true
    } catch {
      return true
    }
  })

  const [selectedReportMode, setSelectedReportMode] = React.useState("automatico")
  const [activeTab, setActiveTab] = React.useState("overview")

  // Estados de Integracao Meta Ads
  const [integration, setIntegration] = React.useState<MetaIntegration | null>(null)
  const [adAccounts, setAdAccounts] = React.useState<MetaAdAccount[]>([])
  const [selectedAccountId, setSelectedAccountId] = React.useState<string | null>(null)
  const [report, setReport] = React.useState<MetaInsightsReport | null>(null)
  const [isSyncing, setIsSyncing] = React.useState<boolean>(false)
  const [selectedPeriodKey, setSelectedPeriodKey] = React.useState<string>("maximum")
  const [selectedPeriodLabel, setSelectedPeriodLabel] = React.useState<string>("Histórico Completo (Máximo)")

  const loadInsightsData = React.useCallback(async (accountId: string, period: string, forceSync = false) => {
    if (forceSync) {
      setIsSyncing(true)
    }
    try {
      const res = await fetchAccountInsights(accountId, period, forceSync)
      if (res && res.data) {
        setReport(res.data)
      }
    } catch (err) {
      console.error("Erro ao carregar insights da Meta:", err)
    } finally {
      setIsSyncing(false)
    }
  }, [])

  React.useEffect(() => {
    let isMounted = true
    async function initDashboard() {
      const currentInt = await fetchCurrentIntegration()
      if (!isMounted) return
      setIntegration(currentInt)

      if (currentInt) {
        const accounts = await fetchConnectedAdAccounts()
        if (!isMounted) return
        setAdAccounts(accounts)
        if (accounts.length > 0) {
          // Prioriza conta ativa com dados (ex: EduccaFlex ou Mega Pizzaria)
          const activeAcc = accounts.find(a => a.is_active && (a.account_id === "2720565471429105" || a.account_id === "1079576907877469")) 
            || accounts.find(a => a.is_active) 
            || accounts.find(a => a.account_id === "1610211749591974")
            || accounts[0]

          setSelectedAccountId(activeAcc.account_id)
          loadInsightsData(activeAcc.account_id, selectedPeriodKey, false)
        }
      }
    }
    initDashboard()
    return () => {
      isMounted = false
    }
  }, [loadInsightsData, selectedPeriodKey])

  const handleSetProMode = (pro: boolean) => {
    setIsProMode(pro)
    try {
      localStorage.setItem('campaign-dashboard-pro-mode', JSON.stringify(pro))
    } catch (e) {
      // ignore
    }
  }

  const handleSelectAccount = (acc: MetaAdAccount) => {
    setSelectedAccountId(acc.account_id)
    loadInsightsData(acc.account_id, selectedPeriodKey, false)
  }

  const handleSelectPeriod = (periodKey: string, periodLabel: string) => {
    setSelectedPeriodKey(periodKey)
    setSelectedPeriodLabel(periodLabel)
    if (selectedAccountId) {
      loadInsightsData(selectedAccountId, periodKey, false)
    }
  }

  const handleSyncClick = () => {
    if (selectedAccountId) {
      loadInsightsData(selectedAccountId, selectedPeriodKey, true)
    }
  }

  const currentAccount = adAccounts.find(a => a.account_id === selectedAccountId)

  return (
    <div className="flex flex-col w-full h-full pb-10">
      <div className="px-6 py-6 max-w-[1600px] mx-auto w-full">
        {/* Header Superior */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Facebook Ads
              </h1>
              {integration?.status === "connected" ? (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  CONECTADO: {integration.facebook_user_name || "Meta Ads"}
                </span>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-muted/60 text-muted-foreground border border-border/80 px-2 py-0.5 rounded-full">
                  DESCONECTADO
                </span>
              )}
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                isProMode 
                  ? "bg-purple-500/15 text-purple-400 border-purple-500/30" 
                  : "bg-blue-500/15 text-blue-400 border-blue-500/30"
              }`}>
                {isProMode ? "Modo Profissional" : "Modo Simples"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {isProMode 
                ? "Painel analítico conectado à Meta Marketing API com dados reais da sua conta."
                : "Visão executiva com os resultados e custos reais das suas campanhas ativas."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Toggle Simples / Profissional */}
            <div className="flex items-center bg-card border border-border/80 p-1 rounded-xl shadow-xs">
              <button
                type="button"
                onClick={() => handleSetProMode(false)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  !isProMode
                    ? "bg-[#0084ff] text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutDashboard className="h-3 w-3" /> Simples
              </button>
              <button
                type="button"
                onClick={() => handleSetProMode(true)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  isProMode
                    ? "bg-[#0084ff] text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <SlidersHorizontal className="h-3 w-3" /> Profissional
              </button>
            </div>

            {/* Botão Nova Campanha AI */}
            <Button className="bg-white hover:bg-zinc-100 text-black font-semibold text-xs h-9 px-4 rounded-xl shadow-xs gap-1.5">
              <Play className="h-3 w-3 fill-black" />
              Nova Campanha AI
            </Button>
          </div>
        </div>

        {/* Linha de Filtros Principais */}
        <div className="bg-card/90 border border-border/80 rounded-2xl p-4 mb-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-end shadow-2xs">
          {/* Conta de Anúncio */}
          <div className="md:col-span-6 flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              CONTA DE ANÚNCIO (META ADS)
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger render={<button type="button" className="w-full flex items-center justify-between h-9 px-3 text-xs bg-background/70 border border-border/80 rounded-lg text-foreground hover:border-border transition-colors font-medium cursor-pointer" />}>
                <span className="truncate">
                  {currentAccount ? `${currentAccount.name} (${currentAccount.account_id})` : (adAccounts.length > 0 ? "Selecione uma conta" : "Nenhuma conta vinculada")}
                </span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60 ml-2 shrink-0" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 max-h-80 overflow-y-auto">
                {adAccounts.length > 0 ? (
                  adAccounts.map((acc) => (
                    <DropdownMenuItem 
                      key={acc.id} 
                      onClick={() => handleSelectAccount(acc)}
                      className="flex flex-col items-start gap-0.5 py-2 cursor-pointer border-b border-border/30 last:border-0"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-semibold text-xs">{acc.name}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${acc.is_active ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-zinc-800 text-zinc-400"}`}>
                          {acc.is_active ? "Ativa" : "Inativa"}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        ID: {acc.account_id} • {acc.currency}
                      </span>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                    Nenhuma conta encontrada
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Período e Sincronizar */}
          <div className="md:col-span-6 flex items-end gap-2">
            <div className="flex-1 flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                PERÍODO DE RELATÓRIO
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger render={<button type="button" className="w-full flex items-center justify-between h-9 px-3 text-xs bg-background/70 border border-border/80 rounded-lg text-foreground hover:border-border transition-colors font-medium cursor-pointer" />}>
                  <span className="truncate">{selectedPeriodLabel}</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-60 ml-2 shrink-0" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {periodsList.map((p) => (
                    <DropdownMenuItem 
                      key={p.key} 
                      onClick={() => handleSelectPeriod(p.key, p.label)}
                      className="cursor-pointer text-xs py-2 font-medium"
                    >
                      {p.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              disabled={isSyncing || !selectedAccountId}
              onClick={handleSyncClick}
              className="h-9 px-3 gap-1.5 text-xs border-border/80 bg-background/70 text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-50"
              title="Sincronizar métricas sob demanda da Meta API"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin text-primary" : ""}`} />
              {isSyncing ? "Sincronizando..." : "Sincronizar"}
            </Button>
          </div>
        </div>

        {/* Linha de Modo de Relatório */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mr-2">
            MODO DE RELATÓRIO:
          </span>
          {reportModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedReportMode(mode.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
                selectedReportMode === mode.id
                  ? "bg-[#0084ff] text-white border-[#0084ff] shadow-xs"
                  : "bg-card/80 text-muted-foreground hover:text-foreground border-border/70 hover:border-border"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Cards de Métricas Principais (Simples ou Profissional) */}
        <div className="mb-6">
          <OverviewMetrics 
            reportMode={selectedReportMode} 
            isProMode={isProMode} 
            realSummary={report?.summary || null}
          />
        </div>

        {/* Abas de Navegação */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent w-full justify-start rounded-none h-auto p-0 mb-6 gap-2 flex-wrap border-b-0">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-card data-[state=active]:border-border/90 data-[state=active]:text-foreground data-[state=active]:shadow-xs bg-card/40 border border-border/60 text-muted-foreground px-4 py-2 text-xs font-semibold rounded-xl gap-2 hover:text-foreground transition-all"
            >
              <BarChart3 className="h-3.5 w-3.5 text-[#0084ff]" /> Visão Geral & Gráficos
            </TabsTrigger>
            <TabsTrigger 
              value="devices" 
              className="data-[state=active]:bg-card data-[state=active]:border-border/90 data-[state=active]:text-foreground data-[state=active]:shadow-xs bg-card/40 border border-border/60 text-muted-foreground px-4 py-2 text-xs font-semibold rounded-xl gap-2 hover:text-foreground transition-all"
            >
              <Smartphone className="h-3.5 w-3.5" /> Dispositivos & Redes
            </TabsTrigger>
            <TabsTrigger 
              value="audience" 
              className="data-[state=active]:bg-card data-[state=active]:border-border/90 data-[state=active]:text-foreground data-[state=active]:shadow-xs bg-card/40 border border-border/60 text-muted-foreground px-4 py-2 text-xs font-semibold rounded-xl gap-2 hover:text-foreground transition-all"
            >
              <Users className="h-3.5 w-3.5" /> Criativos & Público
            </TabsTrigger>
            <TabsTrigger 
              value="calculator" 
              className="data-[state=active]:bg-card data-[state=active]:border-border/90 data-[state=active]:text-foreground data-[state=active]:shadow-xs bg-card/40 border border-border/60 text-muted-foreground px-4 py-2 text-xs font-semibold rounded-xl gap-2 hover:text-foreground transition-all"
            >
              <Calculator className="h-3.5 w-3.5" /> Calculadora ROAS
            </TabsTrigger>
            <TabsTrigger 
              value="manual" 
              className="data-[state=active]:bg-card data-[state=active]:border-border/90 data-[state=active]:text-foreground data-[state=active]:shadow-xs bg-card/40 border border-border/60 text-muted-foreground px-4 py-2 text-xs font-semibold rounded-xl gap-2 hover:text-foreground transition-all"
            >
              <HelpCircle className="h-3.5 w-3.5" /> Manual de Métricas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0 outline-none">
            {/* Gráficos de Desempenho reais baseados nas campanhas */}
            <PerformanceChart 
              isProMode={isProMode} 
              realCampaigns={report?.campaigns || null} 
              realSummary={report?.summary || null}
            />

            {/* Funil de Conversão Vertical com dados reais */}
            <PipelineFunnel 
              objective={selectedReportMode} 
              realSummary={report?.summary || null} 
            />

            {/* Indicadores Técnicos reais (Apenas no Modo Profissional) */}
            {isProMode && (
              <AdvancedIndicators realSummary={report?.summary || null} />
            )}

            {/* Resumo de Veiculação Meta */}
            <div className="mb-8">
              <ChannelSummary realSummary={report?.summary || null} />
            </div>

            {/* Detalhamento de Campanhas reais */}
            <CampaignTable 
              isProMode={isProMode} 
              realCampaigns={report?.campaigns || null} 
            />

            {/* Otimizações e Criativos com IA */}
            <AiCreatives />
          </TabsContent>

          <TabsContent value="devices" className="mt-0 outline-none">
            <DevicesAndNetworks />
          </TabsContent>
          
          <TabsContent value="audience" className="mt-0 outline-none">
            <CreativesAndAudience />
          </TabsContent>

          <TabsContent value="calculator" className="mt-0 outline-none">
            <RoasCalculator />
          </TabsContent>

          <TabsContent value="manual" className="mt-0 outline-none">
            <MetricsManual />
          </TabsContent>

        </Tabs>
      </div>
    </div>
  )
}
