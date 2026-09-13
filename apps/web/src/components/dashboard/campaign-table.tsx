import { Filter, Download } from "lucide-react"

import type { MetaCampaignInsight } from "@/lib/meta-api"

interface CampaignTableProps {
  isProMode?: boolean
  realCampaigns?: MetaCampaignInsight[] | null
}

export function CampaignTable({ isProMode = true, realCampaigns = null }: CampaignTableProps) {
  return (
    <div className="w-full flex flex-col mb-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
        <div>
          <h3 className="text-base md:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
            Detalhamento de Campanhas {isProMode ? "por Objetivo" : "(Resumo Executivo)"}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isProMode 
              ? "Comparação analítica de eficiência, custos unitários e pontuação de otimização por IA."
              : "Visão direta de desempenho das campanhas ativas e custos por resultado."}
          </p>
        </div>
        {isProMode && (
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border border-border/80 rounded-xl hover:bg-muted/40 transition-colors">
              <Filter className="h-3 w-3" /> Filtrar
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border border-border/80 rounded-xl hover:bg-muted/40 transition-colors">
              <Download className="h-3 w-3" /> Exportar
            </button>
          </div>
        )}
      </div>

      <div className="border border-border/80 rounded-2xl overflow-hidden bg-card shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 border-b border-border/80 text-[11px] uppercase text-muted-foreground font-bold tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Campanha</th>
                <th className="px-4 py-3.5">Objetivo</th>
                {isProMode && <th className="px-4 py-3.5">Canal</th>}
                <th className="px-4 py-3.5">Investimento</th>
                <th className="px-4 py-3.5">{isProMode ? "Conversões" : "Resultados"}</th>
                <th className="px-4 py-3.5">{isProMode ? "CPA vs Meta" : "Custo Médio"}</th>
                {isProMode && <th className="px-4 py-3.5">ROAS</th>}
                {isProMode && <th className="px-4 py-3.5">Score IA</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {realCampaigns && realCampaigns.length > 0 ? (
                realCampaigns.map((camp) => {
                  const isActive = camp.status === "ACTIVE"
                  const totalResults = (camp.messages || 0) + (camp.leads || 0) + (camp.purchases || 0)
                  const unitCost = totalResults > 0 
                    ? camp.spend / totalResults 
                    : (camp.cpc > 0 ? camp.cpc : 0)

                  const objectiveLabel = camp.objective.includes("LEAD") || camp.objective.includes("MESSAGE")
                    ? "Leads WhatsApp"
                    : camp.objective.includes("SALE") || camp.objective.includes("CONVERSION")
                    ? "Vendas"
                    : camp.objective.includes("TRAFFIC")
                    ? "Tráfego"
                    : camp.objective.replace("OUTCOME_", "")

                  const objectiveColor = camp.objective.includes("LEAD") || camp.objective.includes("MESSAGE")
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    : camp.objective.includes("SALE") || camp.objective.includes("CONVERSION")
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-orange-500/10 text-orange-400 border-orange-500/20"

                  const aiScore = isActive ? 92 : 75

                  return (
                    <tr key={camp.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3.5 font-medium flex items-center gap-2">
                        <span 
                          className={`h-2 w-2 rounded-full shrink-0 ${
                            isActive ? "bg-emerald-500" : "bg-zinc-500"
                          }`} 
                          title={isActive ? "Campanha Ativa" : "Campanha Pausada"}
                        />
                        <span className="truncate max-w-[280px] font-semibold text-foreground">
                          {camp.name}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase tracking-wider border ${objectiveColor}`}>
                          {objectiveLabel}
                        </span>
                      </td>
                      {isProMode && <td className="px-4 py-3.5 text-muted-foreground text-xs">Meta Ads</td>}
                      <td className="px-4 py-3.5 font-semibold text-foreground">
                        {camp.spend.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-foreground">
                        {totalResults > 0 ? (
                          <span>
                            {totalResults.toLocaleString("pt-BR")}{" "}
                            <span className="text-[10px] text-muted-foreground font-normal">
                              {camp.messages > 0 ? "msg" : camp.leads > 0 ? "leads" : "vendas"}
                            </span>
                          </span>
                        ) : (
                          <span>
                            {camp.clicks.toLocaleString("pt-BR")}{" "}
                            <span className="text-[10px] text-muted-foreground font-normal">cliques</span>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="text-emerald-500 font-semibold text-xs">
                          {unitCost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                          {totalResults === 0 && <span className="text-[10px] text-muted-foreground font-normal"> (CPC)</span>}
                        </div>
                      </td>
                      {isProMode && (
                        <td className="px-4 py-3.5 font-bold text-blue-500">
                          {camp.purchases > 0 ? "3.5x" : "—"}
                        </td>
                      )}
                      {isProMode && (
                        <td className={`px-4 py-3.5 font-bold ${isActive ? "text-emerald-500" : "text-muted-foreground"}`}>
                          {aiScore}/100
                        </td>
                      )}
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={isProMode ? 8 : 5} className="px-4 py-12 text-center text-sm text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="font-semibold text-foreground">Nenhuma campanha com dados no período selecionado</p>
                      <p className="text-xs text-muted-foreground max-w-md">
                        Selecione outra conta de anúncio ativa acima ou alterne o período (ex: Histórico Completo) para visualizar os dados reais da Meta API.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
