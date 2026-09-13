import type { MetaInsightSummary } from "@/lib/meta-api"

interface FunnelStep {
  title: string
  subtitle: string
  value: string
  color: string
  maxWidthClass: string
  rateLabel?: string
  rateValue?: string
}

interface PipelineFunnelProps {
  objective?: string
  realSummary?: MetaInsightSummary | null
}

export function PipelineFunnel({ objective: _objective = "todos", realSummary = null }: PipelineFunnelProps) {
  const getFunnelSteps = (): FunnelStep[] => {
    if (!realSummary) {
      return [
        {
          title: "Alcance",
          subtitle: "Pessoas alcançadas",
          value: "0",
          color: "bg-[#2563eb]",
          maxWidthClass: "w-full max-w-2xl",
          rateLabel: "Taxa de Cliques",
          rateValue: "0.00%",
        },
        {
          title: "Cliques",
          subtitle: "Cliques no link e anúncio",
          value: "0",
          color: "bg-[#4f46e5]",
          maxWidthClass: "w-[78%] max-w-[500px]",
          rateLabel: "Conversão",
          rateValue: "0.00%",
        },
        {
          title: "Resultados / Contatos",
          subtitle: "Mensagens ou cadastros",
          value: "0",
          color: "bg-[#9333ea]",
          maxWidthClass: "w-[58%] max-w-[370px]",
        },
      ]
    }

    const reachVal = realSummary.reach || realSummary.impressions || 0
    const clicksVal = realSummary.clicks || 0
    const messagesVal = realSummary.messages || 0
    const leadsVal = realSummary.leads || 0
    const purchasesVal = realSummary.purchases || 0
    const totalConversions = messagesVal + leadsVal + purchasesVal

    const ctrVal = realSummary.ctr ? `${realSummary.ctr.toFixed(2)}%` : (reachVal > 0 ? `${((clicksVal / reachVal) * 100).toFixed(2)}%` : "0.00%")
    const conversionRate = clicksVal > 0 ? `${((totalConversions / clicksVal) * 100).toFixed(2)}%` : "0.00%"

    const steps: FunnelStep[] = [
      {
        title: "Alcance",
        subtitle: "Pessoas alcançadas",
        value: reachVal.toLocaleString("pt-BR"),
        color: "bg-[#2563eb]",
        maxWidthClass: "w-full max-w-2xl",
        rateLabel: "Taxa de Cliques (CTR)",
        rateValue: ctrVal,
      },
      {
        title: "Cliques",
        subtitle: "Interações no anúncio",
        value: clicksVal.toLocaleString("pt-BR"),
        color: "bg-[#4f46e5]",
        maxWidthClass: "w-[78%] max-w-[500px]",
        rateLabel: "Conversão de Contato",
        rateValue: conversionRate,
      },
      {
        title: messagesVal > 0 ? "Conversas WhatsApp" : leadsVal > 0 ? "Leads Cadastrados" : "Resultados",
        subtitle: messagesVal > 0 ? "Conversas iniciadas no WhatsApp" : leadsVal > 0 ? "Formulários recebidos" : "Ações registradas",
        value: (messagesVal || leadsVal || totalConversions).toLocaleString("pt-BR"),
        color: "bg-[#9333ea]",
        maxWidthClass: "w-[58%] max-w-[370px]",
      },
    ]

    if (purchasesVal > 0) {
      steps.push({
        title: "Compras Confirmadas",
        subtitle: "Vendas atribuídas pela Meta",
        value: purchasesVal.toLocaleString("pt-BR"),
        color: "bg-[#059669]",
        maxWidthClass: "w-[38%] max-w-[245px]",
      })
    }

    return steps
  }

  const steps = getFunnelSteps()

  return (
    <div className="w-full bg-card border border-border/80 rounded-2xl p-6 shadow-sm mb-8">
      {/* Header do Funil */}
      <div className="mb-6">
        <h3 className="text-base font-bold tracking-tight text-foreground">
          Funil de Conversão
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Do anúncio até a conversa no WhatsApp.
        </p>
      </div>

      {/* Estrutura Vertical Cônica */}
      <div className="flex flex-col items-center justify-center py-4 w-full">
        {steps.map((step) => (
          <div key={step.title} className="w-full flex flex-col items-center">
            {/* Bloco do Estágio */}
            <div
              className={`${step.maxWidthClass} ${step.color} text-white rounded-2xl px-6 py-4 flex items-center justify-between shadow-md transition-all hover:scale-[1.01]`}
            >
              <div className="flex flex-col">
                <span className="font-bold text-sm md:text-base tracking-tight leading-tight">
                  {step.title}
                </span>
                <span className="text-[11px] text-white/80 font-normal">
                  {step.subtitle}
                </span>
              </div>
              <div className="text-base md:text-xl font-bold tracking-tight">
                {step.value}
              </div>
            </div>

            {/* Conector e Taxa de Conversão */}
            {step.rateLabel && (
              <div className="py-2 flex items-center justify-center">
                <div className="px-3 py-0.5 rounded-full bg-background/80 border border-border/60 text-[10px] font-medium text-muted-foreground shadow-xs">
                  {step.rateLabel}: <span className="font-semibold text-foreground">{step.rateValue}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
