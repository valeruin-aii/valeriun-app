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
}

export function PipelineFunnel({ objective = "todos" }: PipelineFunnelProps) {
  const getFunnelSteps = (): FunnelStep[] => {
    if (objective === "trafego_reconhecimento") {
      return [
        {
          title: "Alcance",
          subtitle: "Pessoas alcançadas",
          value: "54.200",
          color: "bg-[#2563eb]",
          maxWidthClass: "w-full max-w-2xl",
          rateLabel: "Taxa de Cliques",
          rateValue: "4.12%",
        },
        {
          title: "Cliques no Link",
          subtitle: "Visitaram a página de destino",
          value: "2.233",
          color: "bg-[#4f46e5]",
          maxWidthClass: "w-[75%] max-w-[480px]",
        },
      ]
    }

    if (objective === "geracao_leads") {
      return [
        {
          title: "Alcance",
          subtitle: "Pessoas alcançadas",
          value: "32.150",
          color: "bg-[#2563eb]",
          maxWidthClass: "w-full max-w-2xl",
          rateLabel: "Taxa de Cliques",
          rateValue: "5.80%",
        },
        {
          title: "Cliques",
          subtitle: "Visitaram a landing page",
          value: "1.864",
          color: "bg-[#4f46e5]",
          maxWidthClass: "w-[78%] max-w-[500px]",
          rateLabel: "Taxa de Conversão",
          rateValue: "12.45%",
        },
        {
          title: "Leads Cadastrados",
          subtitle: "Formulários e contatos recebidos",
          value: "232",
          color: "bg-[#9333ea]",
          maxWidthClass: "w-[56%] max-w-[360px]",
        },
      ]
    }

    // Default: Vendas / Todos
    return [
      {
        title: "Alcance",
        subtitle: "Pessoas alcançadas",
        value: "28.450",
        color: "bg-[#2563eb]",
        maxWidthClass: "w-full max-w-2xl",
        rateLabel: "Taxa de Cliques",
        rateValue: "6.46%",
      },
      {
        title: "Cliques",
        subtitle: "Visitaram a página",
        value: "1.840",
        color: "bg-[#4f46e5]",
        maxWidthClass: "w-[78%] max-w-[500px]",
        rateLabel: "Conversão",
        rateValue: "10.00%",
      },
      {
        title: "Leads Gerados",
        subtitle: "Contatos / Cadastros",
        value: "184",
        color: "bg-[#9333ea]",
        maxWidthClass: "w-[58%] max-w-[370px]",
        rateLabel: "Fechamento",
        rateValue: "48.37%",
      },
      {
        title: "Compras",
        subtitle: "Compras confirmadas",
        value: "89",
        color: "bg-[#059669]",
        maxWidthClass: "w-[38%] max-w-[245px]",
      },
    ]
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
