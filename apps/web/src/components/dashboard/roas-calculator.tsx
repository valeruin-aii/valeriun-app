import * as React from "react"
import { 
  Calculator, 
  Sparkles
} from "lucide-react"
import { TooltipProvider } from "@workspace/ui/components/tooltip"

export function RoasCalculator() {
  const [spend, setSpend] = React.useState<number>(10000)
  const [ticket, setTicket] = React.useState<number>(197)
  const [cpc, setCpc] = React.useState<number>(0.85)
  const [cvr, setCvr] = React.useState<number>(2.5)
  const [cmvPercent, setCmvPercent] = React.useState<number>(30)

  // Cálculos matemáticos em tempo real
  const estimatedClicks = cpc > 0 ? Math.floor(spend / cpc) : 0
  const estimatedSales = Math.floor(estimatedClicks * (cvr / 100))
  const estimatedRevenue = estimatedSales * ticket
  const productCost = estimatedRevenue * (cmvPercent / 100)
  const estimatedProfit = estimatedRevenue - spend - productCost
  const projectedRoas = spend > 0 ? estimatedRevenue / spend : 0
  const projectedCpa = estimatedSales > 0 ? spend / estimatedSales : 0
  const marginPercent = 100 - cmvPercent
  const maxAllowableCpa = ticket * (marginPercent / 100)
  const breakEvenRoas = marginPercent > 0 ? 100 / marginPercent : 0

  const isProfitable = estimatedProfit > 0
  const isHealthy = projectedRoas >= breakEvenRoas * 1.4

  return (
    <TooltipProvider delay={100}>
      <div className="flex flex-col w-full gap-8 mb-8">
        {/* Cabeçalho da Calculadora */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-500" />
              Calculadora e Simulador de ROAS & Escala
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Simule cenários de orçamento, ponto de equilíbrio (Break-even), CPA máximo permitido e lucro líquido antes de veicular suas campanhas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${
              isHealthy 
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                : isProfitable
                ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                : "bg-rose-500/15 text-rose-400 border-rose-500/30"
            }`}>
              {isHealthy ? "Cenário Altamente Lucrativo" : isProfitable ? "Cenário Viável" : "Cenário com Prejuízo"}
            </span>
          </div>
        </div>

        {/* Grid: 2 Colunas (Inputs à Esquerda | Projeções à Direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Coluna 1: Parâmetros de Simulação (Inputs) */}
          <div className="lg:col-span-5 flex flex-col bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold tracking-tight text-foreground mb-4">
              Parâmetros de Entrada
            </h3>

            <div className="flex flex-col gap-5">
              {/* Investimento */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    Orçamento / Investimento
                  </span>
                  <span className="text-base font-bold text-blue-400">
                    R$ {spend.toLocaleString("pt-BR")},00
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={spend}
                  onChange={(e) => setSpend(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
                  <span>R$ 500</span>
                  <span>R$ 50.000</span>
                  <span>R$ 100.000</span>
                </div>
              </div>

              {/* Ticket Médio */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                  <span>Ticket Médio do Produto / Serviço</span>
                  <span className="text-foreground font-semibold">R$ {ticket.toFixed(2)}</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs text-muted-foreground font-semibold">R$</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={ticket}
                    onChange={(e) => setTicket(Math.max(1, Number(e.target.value)))}
                    className="w-full h-9 pl-9 pr-3 text-xs bg-background/80 border border-border/80 rounded-lg text-foreground font-medium focus:outline-hidden focus:border-primary"
                  />
                </div>
              </div>

              {/* Custo do Produto / CMV (%) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                  <span>Custo do Produto / Operação (CMV %)</span>
                  <span className="text-foreground font-semibold">{cmvPercent}% (Margem: {marginPercent}%)</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    min="0"
                    max="99"
                    step="1"
                    value={cmvPercent}
                    onChange={(e) => setCmvPercent(Math.min(99, Math.max(0, Number(e.target.value))))}
                    className="w-full h-9 px-3 text-xs bg-background/80 border border-border/80 rounded-lg text-foreground font-medium focus:outline-hidden focus:border-primary"
                  />
                  <span className="absolute right-3 text-xs text-muted-foreground font-semibold">%</span>
                </div>
              </div>

              {/* CPC Médio Esperado */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                  <span>CPC Médio Estimado (Custo por Clique)</span>
                  <span className="text-foreground font-semibold">R$ {cpc.toFixed(2)}</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs text-muted-foreground font-semibold">R$</span>
                  <input
                    type="number"
                    min="0.05"
                    step="0.05"
                    value={cpc}
                    onChange={(e) => setCpc(Math.max(0.01, Number(e.target.value)))}
                    className="w-full h-9 pl-9 pr-3 text-xs bg-background/80 border border-border/80 rounded-lg text-foreground font-medium focus:outline-hidden focus:border-primary"
                  />
                </div>
              </div>

              {/* Taxa de Conversão da LP / WhatsApp */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                  <span>Taxa de Conversão Estimada (CVR %)</span>
                  <span className="text-foreground font-semibold">{cvr}%</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={cvr}
                    onChange={(e) => setCvr(Math.max(0.1, Number(e.target.value)))}
                    className="w-full h-9 px-3 text-xs bg-background/80 border border-border/80 rounded-lg text-foreground font-medium focus:outline-hidden focus:border-primary"
                  />
                  <span className="absolute right-3 text-xs text-muted-foreground font-semibold">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2: Resultados e Métricas Projetadas */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Cards de Métricas de Destaque */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* ROAS Projetado */}
              <div className="flex flex-col justify-between bg-blue-600 text-white rounded-2xl p-4 shadow-md min-h-[110px]">
                <span className="text-xs font-semibold text-blue-100 uppercase tracking-wider">ROAS Projetado</span>
                <div className="text-2xl font-bold tracking-tight">
                  {projectedRoas.toFixed(2)}x
                </div>
                <span className="text-[10px] text-blue-100">
                  Break-even: {breakEvenRoas.toFixed(2)}x
                </span>
              </div>

              {/* Faturamento Bruto */}
              <div className="flex flex-col justify-between bg-card border border-border/80 rounded-2xl p-4 shadow-2xs min-h-[110px]">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Faturamento</span>
                <div className="text-xl font-bold tracking-tight text-emerald-400">
                  R$ {estimatedRevenue.toLocaleString("pt-BR")},00
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {estimatedSales} vendas estimadas
                </span>
              </div>

              {/* Lucro Líquido */}
              <div className="flex flex-col justify-between bg-card border border-border/80 rounded-2xl p-4 shadow-2xs min-h-[110px]">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lucro Líquido</span>
                <div className={`text-xl font-bold tracking-tight ${estimatedProfit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  R$ {estimatedProfit.toLocaleString("pt-BR")},00
                </div>
                <span className="text-[10px] text-muted-foreground">
                  Margem Líquida: {estimatedRevenue > 0 ? ((estimatedProfit / estimatedRevenue) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>

            {/* Tabela de Detalhamento da Projeção */}
            <div className="flex flex-col bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold tracking-tight text-foreground mb-4">
                Detalhamento Econômico da Simulação
              </h3>

              <div className="flex flex-col divide-y divide-border/40 text-xs">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Cliques Estimados no Anúncio:</span>
                  <strong className="text-foreground">{estimatedClicks.toLocaleString("pt-BR")} cliques</strong>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Conversões / Vendas Esperadas:</span>
                  <strong className="text-foreground">{estimatedSales} pedidos</strong>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">CPA Projetado (Custo por Aquisição):</span>
                  <strong className="text-blue-400 font-bold">R$ {projectedCpa.toFixed(2)}</strong>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">CPA Máximo Permitido (Break-even CPA):</span>
                  <strong className="text-foreground">R$ {maxAllowableCpa.toFixed(2)}</strong>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Custo de Produto / Operação (CMV):</span>
                  <span className="text-muted-foreground">R$ {productCost.toLocaleString("pt-BR")},00</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Investimento em Mídia Meta:</span>
                  <span className="text-muted-foreground">R$ {spend.toLocaleString("pt-BR")},00</span>
                </div>
              </div>

              {/* Insight Estratégico de IA */}
              <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 p-3.5 rounded-xl mt-4">
                <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground block mb-0.5">Diagnóstico de Viabilidade da IA:</strong>
                  {projectedRoas >= breakEvenRoas * 1.5 ? (
                    <span>Sua estrutura de margem permite um CPA de até R$ {maxAllowableCpa.toFixed(2)}. Com o CPA estimado em R$ {projectedCpa.toFixed(2)}, você tem ampla folga de escala com segurança financeira.</span>
                  ) : projectedRoas >= breakEvenRoas ? (
                    <span>A campanha é lucrativa, mas próxima da margem de segurança. Recomendamos otimizar a página para aumentar a taxa de conversão (CVR) em 0.5% antes de dobrar o orçamento.</span>
                  ) : (
                    <span>Atenção: O CPA projetado (R$ {projectedCpa.toFixed(2)}) supera o CPA máximo tolerado (R$ {maxAllowableCpa.toFixed(2)}). Reduza o CPC ou melhore a oferta para garantir lucratividade.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
