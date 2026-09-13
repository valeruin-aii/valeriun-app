import type { MetaInsightSummary } from "@/lib/meta-api"

interface ChannelSummaryProps {
  realSummary?: MetaInsightSummary | null
}

export function ChannelSummary({ realSummary = null }: ChannelSummaryProps) {
  if (!realSummary) {
    return (
      <div className="w-full flex flex-col gap-2 p-6 rounded-2xl border border-border/80 bg-card shadow-xs text-center">
        <h3 className="text-base font-semibold text-foreground">Resumo por Posicionamento</h3>
        <p className="text-xs text-muted-foreground">Aguardando sincronização de métricas reais da conta.</p>
      </div>
    )
  }

  const spendFormatted = (realSummary.spend || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  const convCount = (realSummary.messages || 0) + (realSummary.leads || 0) + (realSummary.purchases || 0)

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-base font-semibold">Resumo Consolidado de Veiculação (Meta Ads)</h3>
          <p className="text-xs text-muted-foreground">Distribuição de alcance e interações nos canais do ecossistema Meta.</p>
        </div>
        <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
          Dados Reais
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card Consolidado Meta */}
        <div className="flex flex-col p-4 rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold">META</div>
              <div>
                <div className="font-semibold text-sm">Rede Meta (Instagram, Facebook & Messenger)</div>
                <div className="text-xs text-muted-foreground">Posicionamentos automáticos da conta</div>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Sincronizado
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="text-[10px] uppercase text-muted-foreground font-semibold">Investido</div>
              <div className="font-bold text-sm">{spendFormatted}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-muted-foreground font-semibold">Resultados</div>
              <div className="font-bold text-sm">{convCount.toLocaleString("pt-BR")}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-muted-foreground font-semibold">CTR Médio</div>
              <div className="font-bold text-sm text-blue-500">{(realSummary.ctr || 0).toFixed(2)}%</div>
            </div>
          </div>
        </div>

        {/* Card de Informação Técnica */}
        <div className="flex flex-col justify-center p-4 rounded-xl border border-border bg-card/60 shadow-sm text-xs text-muted-foreground leading-relaxed">
          <div className="font-semibold text-foreground mb-1">Detalhamento Granular por Posicionamento</div>
          <p>
            O valor de <span className="font-bold text-foreground">{spendFormatted}</span> representa o total consumido em todas as superfícies da conta (Feeds, Stories, Reels e Busca). Detalhamento individual por placement disponível em sincronizações com o parâmetro de breakdown da Graph API.
          </p>
        </div>
      </div>
    </div>
  )
}
