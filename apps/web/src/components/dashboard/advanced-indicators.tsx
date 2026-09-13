import { Calculator, ArrowLeftRight, Scale, Repeat, Receipt } from "lucide-react"
import type { MetaInsightSummary } from "@/lib/meta-api"

interface AdvancedIndicatorsProps {
  realSummary?: MetaInsightSummary | null
}

export function AdvancedIndicators({ realSummary = null }: AdvancedIndicatorsProps) {
  const totalConversions = (realSummary?.messages || 0) + (realSummary?.leads || 0) + (realSummary?.purchases || 0)
  const unitCost = realSummary && totalConversions > 0 
    ? realSummary.spend / totalConversions 
    : (realSummary?.cpc || 0)

  const cpmVal = realSummary?.cpm ? realSummary.cpm.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "R$ 0,00"
  const cpcVal = realSummary?.cpc ? realSummary.cpc.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "R$ 0,00"
  const ctrVal = realSummary?.ctr ? `${realSummary.ctr.toFixed(2)}%` : "0.00%"
  const freqVal = realSummary?.frequency ? `${realSummary.frequency.toFixed(2)}x` : "1.00x"
  const unitCostFormatted = unitCost > 0 ? unitCost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "R$ 0,00"

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Cálculos e Indicadores Técnicos da Conta
        </h3>
        <span className="text-xs text-muted-foreground">Métricas extraídas diretamente da Meta Marketing API</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Custo Médio por Ação */}
        <div className="flex flex-col gap-1 p-4 rounded-xl border border-border bg-card shadow-sm relative overflow-hidden">
          <div className="absolute top-4 right-4 text-muted-foreground">
            <Receipt className="h-4 w-4" />
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Custo Médio por Resultado</div>
          <div className="text-xl font-bold text-foreground">{realSummary ? unitCostFormatted : "—"}</div>
          <div className="text-xs font-semibold text-emerald-500 flex items-center gap-1 mt-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> {totalConversions > 0 ? `${totalConversions} conversões` : "Baseado em CPC"}
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-tight">Média ponderada do custo por mensagem/lead no período.</p>
        </div>

        {/* CPM (Custo por Mil Impressões) */}
        <div className="flex flex-col gap-1 p-4 rounded-xl border border-border bg-card shadow-sm relative overflow-hidden">
          <div className="absolute top-4 right-4 text-muted-foreground">
            <Scale className="h-4 w-4" />
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">CPM Real da Conta</div>
          <div className="text-xl font-bold text-foreground">{realSummary ? cpmVal : "—"}</div>
          <div className="text-xs font-semibold text-blue-500 flex items-center gap-1 mt-1">
            <span>Meta Marketing API</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-tight">Custo médio para entregar 1.000 impressões nos feeds e reels.</p>
        </div>

        {/* CTR Consolidado */}
        <div className="flex flex-col gap-1 p-4 rounded-xl border border-border bg-card shadow-sm relative overflow-hidden">
          <div className="absolute top-4 right-4 text-muted-foreground">
            <ArrowLeftRight className="h-4 w-4" />
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">CTR Médio (Taxa de Clique)</div>
          <div className="text-xl font-bold text-foreground">{realSummary ? ctrVal : "—"}</div>
          <div className="text-xs font-semibold text-emerald-500 flex items-center gap-1 mt-1">
            <span>{realSummary?.clicks ? `${realSummary.clicks} cliques totais` : "0 cliques"}</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-tight">Eficiência criativa e poder de atração dos anúncios.</p>
        </div>

        {/* Frequência Média */}
        <div className="flex flex-col gap-1 p-4 rounded-xl border border-border bg-card shadow-sm relative overflow-hidden">
          <div className="absolute top-4 right-4 text-muted-foreground">
            <Repeat className="h-4 w-4" />
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Frequência Média</div>
          <div className="text-xl font-bold text-foreground">{realSummary ? freqVal : "—"}</div>
          <div className="text-xs font-semibold text-blue-500 flex items-center gap-1 mt-1">
            <span>{Number(realSummary?.frequency || 1) > 2.5 ? "Atenção: Fadiga Alta" : "Frequência Saudável"}</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-tight">Média de vezes que cada usuário único visualizou seus anúncios.</p>
        </div>

        {/* CPC Real */}
        <div className="flex flex-col gap-1 p-4 rounded-xl border border-border bg-card shadow-sm relative overflow-hidden">
          <div className="absolute top-4 right-4 text-muted-foreground">
            <Receipt className="h-4 w-4" />
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">CPC Médio no Link</div>
          <div className="text-xl font-bold text-foreground">{realSummary ? cpcVal : "—"}</div>
          <div className="text-xs font-semibold text-primary flex items-center gap-1 mt-1">
            <span>{realSummary?.link_clicks ? `${realSummary.link_clicks} cliques no link` : "Custo unitário"}</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-tight">Custo efetivo de cada clique direcionado para a página ou WhatsApp.</p>
        </div>
      </div>
    </div>
  )
}
