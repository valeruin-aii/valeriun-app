import * as React from "react"
import { 
  BarChart3, 
  Users, 
  Sparkles, 
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

export function CampaignDashboard() {
  const [isProMode, setIsProMode] = React.useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('campaign-dashboard-pro-mode')
      return saved !== null ? JSON.parse(saved) : true
    } catch {
      return true
    }
  })

  const [isExampleMode, setIsExampleMode] = React.useState(false)
  const [selectedReportMode, setSelectedReportMode] = React.useState("automatico")
  const [selectedAccount, setSelectedAccount] = React.useState("Nenhuma conta")
  const [selectedPage, setSelectedPage] = React.useState("Nenhuma página")
  const [selectedPeriod, setSelectedPeriod] = React.useState("Últimos 7 dias")
  const [activeTab, setActiveTab] = React.useState("overview")

  const handleSetProMode = (pro: boolean) => {
    setIsProMode(pro)
    try {
      localStorage.setItem('campaign-dashboard-pro-mode', JSON.stringify(pro))
    } catch (e) {
      // ignore
    }
  }

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
              <span className="text-[10px] font-bold uppercase tracking-wider bg-muted/60 text-muted-foreground border border-border/80 px-2 py-0.5 rounded-full">
                DESCONECTADO
              </span>
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
                ? "Painel avançado com diagnósticos de IA, análise de fadiga e métricas completas de tráfego."
                : "Visão executiva simplificada com foco nos principais resultados, vendas e leads gerados."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Toggle Dados Reais / Modo Exemplo */}
            <div className="flex items-center bg-card border border-border/80 p-1 rounded-xl shadow-xs">
              <button
                type="button"
                onClick={() => setIsExampleMode(false)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  !isExampleMode
                    ? "bg-[#0084ff] text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Dados Reais
              </button>
              <button
                type="button"
                onClick={() => setIsExampleMode(true)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  isExampleMode
                    ? "bg-[#0084ff] text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="h-3 w-3" /> Modo Exemplo
              </button>
            </div>

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
          <div className="md:col-span-4 flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              CONTA DE ANÚNCIO
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger render={<button type="button" className="w-full flex items-center justify-between h-9 px-3 text-xs bg-background/70 border border-border/80 rounded-lg text-muted-foreground hover:text-foreground hover:border-border transition-colors font-medium" />}>
                <span>{selectedAccount}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60 ml-2" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={() => setSelectedAccount("Nenhuma conta")}>Nenhuma conta</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedAccount("Acme Performance Corp")}>Acme Performance Corp</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedAccount("Valeriun E-commerce")}>Valeriun E-commerce</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedAccount("Agência XYZ")}>Agência XYZ</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Página do Facebook */}
          <div className="md:col-span-4 flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              PÁGINA DO FACEBOOK
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger render={<button type="button" className="w-full flex items-center justify-between h-9 px-3 text-xs bg-background/70 border border-border/80 rounded-lg text-muted-foreground hover:text-foreground hover:border-border transition-colors font-medium" />}>
                <span>{selectedPage}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60 ml-2" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={() => setSelectedPage("Nenhuma página")}>Nenhuma página</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPage("Valeriun Oficial")}>Valeriun Oficial</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPage("Cardápio Digital Pro")}>Cardápio Digital Pro</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Período e Sincronizar */}
          <div className="md:col-span-4 flex items-end gap-2">
            <div className="flex-1 flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                PERÍODO
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger render={<button type="button" className="w-full flex items-center justify-between h-9 px-3 text-xs bg-background/70 border border-border/80 rounded-lg text-foreground hover:border-border transition-colors font-medium" />}>
                  <span>{selectedPeriod}</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-60 ml-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setSelectedPeriod("Hoje")}>Hoje</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedPeriod("Últimos 7 dias")}>Últimos 7 dias</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedPeriod("Últimos 14 dias")}>Últimos 14 dias</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedPeriod("Últimos 30 dias")}>Últimos 30 dias</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedPeriod("Este Mês")}>Este Mês</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button variant="outline" size="sm" className="h-9 px-3 gap-1.5 text-xs border-border/80 bg-background/70 text-muted-foreground hover:text-foreground">
              <RefreshCw className="h-3.5 w-3.5" />
              Sincronizar
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
          <OverviewMetrics reportMode={selectedReportMode} isProMode={isProMode} />
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
            {/* Gráficos de Desempenho (Investimento vs Retorno e CPL vs CTR) */}
            <PerformanceChart isProMode={isProMode} />

            {/* Funil de Conversão Vertical em Cone */}
            <PipelineFunnel objective={selectedReportMode} />

            {/* Advanced Indicators (Apenas no Modo Profissional) */}
            {isProMode && (
              <AdvancedIndicators />
            )}

            {/* Resumo de Canais */}
            <div className="mb-8">
              <ChannelSummary />
            </div>

            {/* Detalhamento de Campanhas */}
            <CampaignTable isProMode={isProMode} />

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
