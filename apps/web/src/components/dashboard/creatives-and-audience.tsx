import * as React from "react"
import { 
  Users, 
  Video, 
  Image as ImageIcon, 
  TrendingUp, 
  Sparkles, 
  Pause, 
  Copy, 
  Layers, 
  MapPin
} from "lucide-react"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { Button } from "@workspace/ui/components/button"

interface CreativeItem {
  id: string
  name: string
  format: "video" | "image" | "carousel"
  thumbnailUrl: string
  hookRate: string // 3s
  holdRate: string // 15s
  ctr: string
  cpl: string
  spend: string
  revenue: string
  roas: string
  status: "winning" | "stable" | "fatigued"
  fatigueScore: number // 0-100
  aiSuggestion: string
}

const creativesData: CreativeItem[] = [
  {
    id: "cr_1",
    name: "Vídeo Gancho: 'Pare de perder dinheiro no WhatsApp'",
    format: "video",
    thumbnailUrl: "",
    hookRate: "48.2%",
    holdRate: "29.4%",
    ctr: "3.84%",
    cpl: "R$ 2.45",
    spend: "R$ 14.820,00",
    revenue: "R$ 82.400,00",
    roas: "5.56x",
    status: "winning",
    fatigueScore: 18,
    aiSuggestion: "Criativo vencedor com alto engajamento. Recomendada escala horizontal de orçamento.",
  },
  {
    id: "cr_2",
    name: "Carrossel: Prova Social & Resultados Reais de Clientes",
    format: "carousel",
    thumbnailUrl: "",
    hookRate: "39.1%",
    holdRate: "22.8%",
    ctr: "3.12%",
    cpl: "R$ 2.90",
    spend: "R$ 9.450,00",
    revenue: "R$ 48.200,00",
    roas: "5.10x",
    status: "winning",
    fatigueScore: 24,
    aiSuggestion: "Forte conversão em público morno. Manter veiculação e testar novos depoimentos.",
  },
  {
    id: "cr_3",
    name: "Imagem Única: Comparativo 'Antes vs Depois do Sistema'",
    format: "image",
    thumbnailUrl: "",
    hookRate: "31.5%",
    holdRate: "18.2%",
    ctr: "2.45%",
    cpl: "R$ 3.80",
    spend: "R$ 6.200,00",
    revenue: "R$ 24.800,00",
    roas: "4.00x",
    status: "stable",
    fatigueScore: 42,
    aiSuggestion: "Desempenho estável. Sugerido criar variação com chamada para ação mais urgente.",
  },
  {
    id: "cr_4",
    name: "Vídeo Demonstração: 'Como configurar em 3 minutos'",
    format: "video",
    thumbnailUrl: "",
    hookRate: "21.0%",
    holdRate: "11.5%",
    ctr: "1.65%",
    cpl: "R$ 5.90",
    spend: "R$ 4.100,00",
    revenue: "R$ 9.800,00",
    roas: "2.39x",
    status: "fatigued",
    fatigueScore: 78,
    aiSuggestion: "Fadiga detectada: taxa de retenção em queda de 34% nos últimos 7 dias. Pausar ou renovar gancho.",
  },
]

const ageDemographics = [
  { age: "18-24", pct: 12, spend: "R$ 5.800", leads: 180, roas: "3.4x" },
  { age: "25-34", pct: 44, spend: "R$ 21.400", leads: 1.540, roas: "5.8x", isBest: true },
  { age: "35-44", pct: 28, spend: "R$ 13.600", leads: 980, roas: "4.9x" },
  { age: "45-54", pct: 11, spend: "R$ 5.350", leads: 340, roas: "3.8x" },
  { age: "55+", pct: 5, spend: "R$ 2.500", leads: 120, roas: "2.9x" },
]

const topRegions = [
  { state: "São Paulo (SP)", share: "41.2%", revenue: "R$ 96.370", cpl: "R$ 2.65", leads: "1.410" },
  { state: "Rio de Janeiro (RJ)", share: "18.5%", revenue: "R$ 43.270", cpl: "R$ 2.80", leads: "634" },
  { state: "Minas Gerais (MG)", share: "14.1%", revenue: "R$ 32.980", cpl: "R$ 2.95", leads: "483" },
  { state: "Rio Grande do Sul (RS)", share: "9.8%", revenue: "R$ 22.920", cpl: "R$ 3.10", leads: "336" },
  { state: "Paraná (PR)", share: "8.4%", revenue: "R$ 19.650", cpl: "R$ 2.90", leads: "288" },
]

export function CreativesAndAudience() {
  const [filterFormat, setFilterFormat] = React.useState<string>("all")

  const filteredCreatives = creativesData.filter((cr) => {
    if (filterFormat === "all") return true
    return cr.format === filterFormat
  })

  return (
    <TooltipProvider delay={100}>
      <div className="flex flex-col w-full gap-8 mb-8">
        {/* Seção 1: Análise e Inteligência de Criativos */}
        <div className="flex flex-col bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold tracking-tight text-foreground flex items-center gap-2">
                <Video className="h-4 w-4 text-blue-500" />
                Performance de Criativos & Retenção de Vídeo
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Métricas de gancho (Hook Rate 3s), retenção profunda (Hold Rate 15s) e eficiência de conversão por criativo.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-muted/40 p-1 rounded-xl border border-border/60">
              <button
                type="button"
                onClick={() => setFilterFormat("all")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterFormat === "all" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Todos ({creativesData.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterFormat("video")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                  filterFormat === "video" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Video className="h-3 w-3" /> Vídeos
              </button>
              <button
                type="button"
                onClick={() => setFilterFormat("carousel")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                  filterFormat === "carousel" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Layers className="h-3 w-3" /> Carrosséis
              </button>
              <button
                type="button"
                onClick={() => setFilterFormat("image")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                  filterFormat === "image" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ImageIcon className="h-3 w-3" /> Imagens
              </button>
            </div>
          </div>

          {/* Grid de Cards de Criativos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredCreatives.map((cr) => (
              <div
                key={cr.id}
                className="flex flex-col justify-between bg-background/60 border border-border/70 rounded-xl p-4 shadow-2xs hover:border-border transition-all"
              >
                <div>
                  {/* Header do Card com Status e Formato */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="h-7 w-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                        {cr.format === "video" && <Video className="h-3.5 w-3.5" />}
                        {cr.format === "carousel" && <Layers className="h-3.5 w-3.5" />}
                        {cr.format === "image" && <ImageIcon className="h-3.5 w-3.5" />}
                      </span>
                      <span className="font-bold text-sm text-foreground line-clamp-1">
                        {cr.name}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border shrink-0 ${
                        cr.status === "winning"
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : cr.status === "stable"
                          ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                          : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                      }`}
                    >
                      {cr.status === "winning" ? "Vencedor" : cr.status === "stable" ? "Estável" : "Fadiga"}
                    </span>
                  </div>

                  {/* Grid de Métricas do Criativo */}
                  <div className="grid grid-cols-4 gap-2 bg-card/80 p-3 rounded-xl border border-border/50 mb-3">
                    <div>
                      <div className="text-[10px] text-muted-foreground font-semibold uppercase">Hook Rate (3s)</div>
                      <div className="text-sm font-bold text-foreground">{cr.hookRate}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground font-semibold uppercase">Hold Rate (15s)</div>
                      <div className="text-sm font-bold text-foreground">{cr.holdRate}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground font-semibold uppercase">CTR Link</div>
                      <div className="text-sm font-bold text-emerald-400">{cr.ctr}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground font-semibold uppercase">ROAS</div>
                      <div className="text-sm font-bold text-blue-400">{cr.roas}</div>
                    </div>
                  </div>

                  {/* Resumo Financeiro */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 px-1">
                    <span>Investido: <strong className="text-foreground">{cr.spend}</strong></span>
                    <span>CPL: <strong className="text-emerald-400">{cr.cpl}</strong></span>
                    <span>Retorno: <strong className="text-foreground">{cr.revenue}</strong></span>
                  </div>

                  {/* Recomendação de IA */}
                  <div className="flex items-start gap-2 bg-blue-500/5 border border-blue-500/20 p-2.5 rounded-lg text-xs text-muted-foreground mb-3">
                    <Sparkles className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-relaxed text-zinc-300">{cr.aiSuggestion}</span>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                  {cr.status === "winning" && (
                    <Button size="xs" className="flex-1 h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-1">
                      <TrendingUp className="h-3 w-3" /> Escalar Orçamento
                    </Button>
                  )}
                  {cr.status === "fatigued" && (
                    <Button size="xs" variant="outline" className="flex-1 h-7 text-xs border-rose-500/30 text-rose-400 hover:bg-rose-500/10 font-semibold gap-1">
                      <Pause className="h-3 w-3" /> Pausar Criativo
                    </Button>
                  )}
                  {cr.status === "stable" && (
                    <Button size="xs" variant="outline" className="flex-1 h-7 text-xs font-semibold gap-1">
                      <Copy className="h-3 w-3" /> Criar Variação
                    </Button>
                  )}
                  <Button size="xs" variant="ghost" className="h-7 text-xs text-muted-foreground hover:text-foreground">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção 2: Dados Demográficos & Público-Alvo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Faixa Etária e Gênero */}
          <div className="lg:col-span-7 flex flex-col bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-base font-bold tracking-tight text-foreground flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Distribuição por Faixa Etária & Eficiência
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Volume de leads e retorno sobre investimento segmentado por idade.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {ageDemographics.map((item) => (
                <div key={item.age} className="flex flex-col gap-1.5 p-3 rounded-xl bg-background/50 border border-border/50">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{item.age} anos</span>
                      {item.isBest && (
                        <span className="text-[9px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded-full uppercase">
                          Maior ROAS
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span>{item.leads} leads</span>
                      <span>Investido: {item.spend}</span>
                      <strong className="text-blue-400 font-bold">ROAS {item.roas}</strong>
                    </div>
                  </div>

                  {/* Barra de Progresso Visual */}
                  <div className="w-full bg-zinc-800/60 rounded-full h-2 overflow-hidden flex">
                    <div
                      className={`h-full rounded-full ${item.isBest ? "bg-emerald-500" : "bg-blue-500"}`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Regiões & Estados */}
          <div className="lg:col-span-5 flex flex-col bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-base font-bold tracking-tight text-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-500" />
                Top Estados por Conversão
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Localizações com maior densidade de fechamentos na Meta.
              </p>
            </div>

            <div className="flex flex-col divide-y divide-border/40">
              {topRegions.map((region, idx) => (
                <div key={region.state} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground w-4">{idx + 1}.</span>
                    <div>
                      <div className="text-sm font-bold text-foreground">{region.state}</div>
                      <div className="text-[11px] text-muted-foreground">{region.leads} leads • CPL {region.cpl}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-400">{region.revenue}</div>
                    <div className="text-[10px] text-muted-foreground">{region.share} do total</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
