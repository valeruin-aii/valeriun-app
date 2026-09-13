import { 
  ComposedChart, 
  Bar, 
  Line, 
  Area, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts"

import type { MetaCampaignInsight, MetaInsightSummary } from "@/lib/meta-api"

interface PerformanceChartProps {
  isProMode?: boolean
  realCampaigns?: MetaCampaignInsight[] | null
  realSummary?: MetaInsightSummary | null
}

export function PerformanceChart({ isProMode = true, realCampaigns = null }: PerformanceChartProps) {
  // Filtra apenas campanhas reais que tiveram atividade / cliques / investimento
  const activeCampaigns = (realCampaigns || [])
    .filter(c => c.spend > 0 || c.clicks > 0 || c.messages > 0 || c.leads > 0)
    .slice(0, 7)

  const chartData1 = activeCampaigns.map(c => ({
    name: c.name.length > 14 ? c.name.slice(0, 12) + ".." : c.name,
    fullName: c.name,
    investido: Math.round(c.spend),
    conversas: (c.messages || 0) + (c.leads || 0) + (c.purchases || 0),
    cliques: c.clicks || 0,
  }))

  const chartData2 = activeCampaigns.map(c => {
    const totalResults = (c.messages || 0) + (c.leads || 0) + (c.purchases || 0)
    const unitCost = totalResults > 0 ? Number((c.spend / totalResults).toFixed(2)) : Number((c.cpc || 0).toFixed(2))
    return {
      name: c.name.length > 14 ? c.name.slice(0, 12) + ".." : c.name,
      fullName: c.name,
      cpl: unitCost,
      ctr: Number((c.ctr || 0).toFixed(2)),
    }
  })

  const hasData = chartData1.length > 0

  if (!hasData) {
    return (
      <div className="w-full bg-card border border-border/80 rounded-2xl p-8 mb-8 text-center shadow-sm">
        <h3 className="text-base font-bold tracking-tight text-foreground mb-1">
          Gráficos de Desempenho
        </h3>
        <p className="text-xs text-muted-foreground">
          Nenhuma métrica de investimento registrada para as campanhas desta conta no período selecionado.
        </p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 ${isProMode ? "lg:grid-cols-2" : ""} gap-6 w-full mb-8`}>
      {/* Gráfico 1: Investimento vs Leads por Campanha */}
      <div className="flex flex-col bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold tracking-tight text-foreground">
              Investimento vs Resultados por Campanha
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Comparativo de gastos e resultados reais das campanhas ativas.
            </p>
          </div>
          {!isProMode && (
            <span className="text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full self-start sm:self-auto">
              Visão Simplificada
            </span>
          )}
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData1} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" opacity={0.6} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: "#9ca3af" }} 
                dy={8}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                domain={[0, 1200]}
                ticks={[0, 300, 600, 900, 1200]}
                tickFormatter={(value: number) => `R$${value}`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                domain={[0, 32]}
                ticks={[0, 8, 16, 24, 32]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#18181b", 
                  borderColor: "#27272a", 
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#ffffff"
                }}
                itemStyle={{ color: "#ffffff" }}
                formatter={(value: any, name?: any) => {
                  if (name === "conversas") return [value, "Conversas / Leads"]
                  if (name === "investido") return [`R$ ${value}`, "Investido"]
                  if (name === "receita") return [`R$ ${value}`, "Receita"]
                  return [value, name || ""]
                }}
              />
              <Bar 
                yAxisId="left" 
                dataKey="investido" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]} 
                barSize={isProMode ? 12 : 20} 
              />
              <Bar 
                yAxisId="left" 
                dataKey="receita" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]} 
                barSize={isProMode ? 12 : 20} 
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="conversas" 
                stroke="#c084fc" 
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#ffffff", stroke: "#c084fc", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#ffffff", stroke: "#a855f7", strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Legenda Gráfico 1 */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-2 border-t border-border/40 text-xs font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center">
              <span className="h-0.5 w-3 bg-[#c084fc]" />
              <span className="h-2 w-2 rounded-full border-2 border-[#c084fc] bg-white -ml-2.5" />
            </span>
            <span className="text-zinc-300 font-normal">Conversas / Leads</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#3b82f6]" />
            <span className="text-zinc-300 font-normal">Investido</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#10b981]" />
            <span className="text-zinc-300 font-normal">Receita</span>
          </div>
        </div>
      </div>

      {/* Gráfico 2: Evolução: Custo por Lead (CPL) vs CTR (Apenas no Modo Profissional) */}
      {isProMode && (
        <div className="flex flex-col bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-base font-bold tracking-tight text-foreground">
              Evolução: Custo por Lead (CPL) vs CTR
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Correlação técnica entre custo unitário e taxa de cliques.
            </p>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData2} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradientCpl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" opacity={0.6} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: "#9ca3af" }} 
                  dy={8}
                />
                <YAxis 
                  yAxisId="left"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  domain={[0, 12]}
                  ticks={[0, 3, 6, 9, 12]}
                  tickFormatter={(value: number) => `R$${value}`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  domain={[0, 2.6]}
                  ticks={[0, 0.65, 1.3, 1.95, 2.6]}
                  tickFormatter={(value: number) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#18181b", 
                    borderColor: "#27272a", 
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#ffffff"
                  }}
                  itemStyle={{ color: "#ffffff" }}
                  formatter={(value: any, name?: any) => {
                    if (name === "cpl") return [`R$ ${value}`, "CPL"]
                    if (name === "ctr") return [`${value}%`, "CTR"]
                    return [value, name || ""]
                  }}
                />
                <Area 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="cpl" 
                  stroke="#9333ea" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#gradientCpl)" 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="ctr" 
                  stroke="#f97316" 
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#ffffff", stroke: "#f97316", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: "#ffffff", stroke: "#ea580c", strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Legenda Gráfico 2 */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-2 border-t border-border/40 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#9333ea]" />
              <span className="text-zinc-300 font-normal">CPL (R$)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center">
                <span className="h-0.5 w-3 bg-[#f97316]" />
                <span className="h-2 w-2 rounded-full border-2 border-[#f97316] bg-white -ml-2.5" />
              </span>
              <span className="text-zinc-300 font-normal">CTR (%)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
