import { Filter, Download } from "lucide-react"

interface CampaignTableProps {
  isProMode?: boolean
}

export function CampaignTable({ isProMode = true }: CampaignTableProps) {
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
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3.5 font-medium flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate max-w-[280px] font-semibold text-foreground">[VENDAS] Escala Black Season • Sneaker UltraBoost</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase tracking-wider border border-primary/20">Vendas</span>
                </td>
                {isProMode && <td className="px-4 py-3.5 text-muted-foreground text-xs">Meta Ads</td>}
                <td className="px-4 py-3.5 font-semibold text-foreground">R$ 18.420</td>
                <td className="px-4 py-3.5 font-semibold text-foreground">1.460</td>
                <td className="px-4 py-3.5">
                  <div className="text-emerald-500 font-semibold text-xs">
                    R$ 12,61 {isProMode && <span className="text-[10px] text-muted-foreground font-normal">(Meta R$ 16)</span>}
                  </div>
                </td>
                {isProMode && <td className="px-4 py-3.5 font-bold text-blue-500">5.4x</td>}
                {isProMode && <td className="px-4 py-3.5 font-bold text-emerald-500">98/100</td>}
              </tr>

              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3.5 font-medium flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate max-w-[280px] font-semibold text-foreground">[LEADS] Software Gestão Financeira B2B</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase tracking-wider border border-blue-500/20">Leads WhatsApp</span>
                </td>
                {isProMode && <td className="px-4 py-3.5 text-muted-foreground text-xs">WhatsApp Direct</td>}
                <td className="px-4 py-3.5 font-semibold text-foreground">R$ 14.150</td>
                <td className="px-4 py-3.5 font-semibold text-foreground">980</td>
                <td className="px-4 py-3.5">
                  <div className="text-emerald-500 font-semibold text-xs">
                    R$ 14,43 {isProMode && <span className="text-[10px] text-muted-foreground font-normal">(Meta R$ 18)</span>}
                  </div>
                </td>
                {isProMode && <td className="px-4 py-3.5 font-bold text-blue-500">4.2x</td>}
                {isProMode && <td className="px-4 py-3.5 font-bold text-emerald-500">94/100</td>}
              </tr>

              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3.5 font-medium flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate max-w-[280px] font-semibold text-foreground">[RETARGETING] Abandono de Carrinho 7D</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase tracking-wider border border-primary/20">Vendas</span>
                </td>
                {isProMode && <td className="px-4 py-3.5 text-muted-foreground text-xs">Meta Stories</td>}
                <td className="px-4 py-3.5 font-semibold text-foreground">R$ 9.980</td>
                <td className="px-4 py-3.5 font-semibold text-foreground">740</td>
                <td className="px-4 py-3.5">
                  <div className="text-emerald-500 font-semibold text-xs">
                    R$ 13,48 {isProMode && <span className="text-[10px] text-muted-foreground font-normal">(Meta R$ 15)</span>}
                  </div>
                </td>
                {isProMode && <td className="px-4 py-3.5 font-bold text-blue-500">5.8x</td>}
                {isProMode && <td className="px-4 py-3.5 font-bold text-emerald-500">96/100</td>}
              </tr>

              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3.5 font-medium flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate max-w-[280px] font-semibold text-foreground">[BRANDING] Reconhecimento de Marca & Vídeos</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="bg-orange-500/10 text-orange-400 text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase tracking-wider border border-orange-500/20">Tráfego</span>
                </td>
                {isProMode && <td className="px-4 py-3.5 text-muted-foreground text-xs">Instagram Reels</td>}
                <td className="px-4 py-3.5 font-semibold text-foreground">R$ 6.100</td>
                <td className="px-4 py-3.5 font-semibold text-foreground">240</td>
                <td className="px-4 py-3.5">
                  <div className="text-emerald-500 font-semibold text-xs">
                    R$ 25,41 {isProMode && <span className="text-[10px] text-muted-foreground font-normal">(Meta R$ 25)</span>}
                  </div>
                </td>
                {isProMode && <td className="px-4 py-3.5 font-bold text-blue-500">2.1x</td>}
                {isProMode && <td className="px-4 py-3.5 font-bold text-emerald-500">88/100</td>}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
