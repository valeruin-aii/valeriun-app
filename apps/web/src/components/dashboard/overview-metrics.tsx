import { 
  CreditCard, 
  Eye, 
  MousePointerClick, 
  CheckCircle2, 
  Activity, 
  TrendingUp, 
  Lightbulb,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Scale
} from "lucide-react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@workspace/ui/components/popover"

interface MetricCardData {
  id: string
  title: string
  fullName: string
  icon: typeof CreditCard
  value: string
  cents?: string
  valueSub?: string
  change: string
  changeType?: "positive" | "negative" | "neutral" | "badge"
  changeSub?: string
  description: string
  idealBehavior: {
    type: "higher" | "lower" | "balanced"
    label: string
    reason: string
  }
  tip: string
  isFeatured?: boolean
  isSimpleEssential?: boolean
}

const defaultMetrics: MetricCardData[] = [
  {
    id: "investimento",
    title: "Investimento",
    fullName: "Investimento Total (Spend)",
    icon: CreditCard,
    value: "R$ 48.650",
    cents: ",00",
    change: "↑ +12.4%",
    changeSub: "vs anterior",
    changeType: "positive",
    description: "Volume financeiro total consumido em anúncios no período selecionado.",
    idealBehavior: {
      type: "balanced",
      label: "Escala Controlada",
      reason: "Deve crescer somente enquanto o ROAS e o CPA se mantiverem lucrativos.",
    },
    tip: "Aumente o orçamento entre 15% e 20% a cada 3 a 5 dias para não desestabilizar o aprendizado da IA.",
    isSimpleEssential: true,
  },
  {
    id: "impressoes",
    title: "Impressões",
    fullName: "Impressões Totais",
    icon: Eye,
    value: "2.840.120",
    change: "↑ +18.2%",
    changeSub: "vs anterior",
    changeType: "positive",
    description: "Total de vezes que os seus anúncios foram renderizados na tela dos usuários.",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Mais impressões qualificadas aumentam a presença e as oportunidades de conversão.",
    },
    tip: "Monitore a frequência média: se passar de 3.0x no mesmo público, troque os criativos para evitar saturação.",
    isSimpleEssential: false,
  },
  {
    id: "cliques",
    title: "Cliques Totais",
    fullName: "Cliques no Anúncio & Link",
    icon: MousePointerClick,
    value: "94.320",
    change: "↑ +14.6%",
    changeSub: "CTR 3.32%",
    changeType: "positive",
    description: "Quantidade de toques ou cliques que direcionaram para a página ou WhatsApp.",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Indica forte interesse e eficácia na chamada para ação (CTA) do criativo.",
    },
    tip: "Capriche no gancho visual dos primeiros 3 segundos para alavancar a taxa de cliques (CTR).",
    isSimpleEssential: false,
  },
  {
    id: "conversoes",
    title: "Conversões",
    fullName: "Conversões Confirmadas",
    icon: CheckCircle2,
    value: "3.420",
    change: "↑ +24.8%",
    changeSub: "vs anterior",
    changeType: "positive",
    description: "Total de ações de alto valor concluídas (pedidos pagos ou leads qualificados).",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Representa a geração direta de receita e crescimento do negócio.",
    },
    tip: "Otimize o tempo de carregamento da página de destino para evitar perdas entre o clique e a conversão.",
    isSimpleEssential: true,
  },
  {
    id: "cpa",
    title: "CPA Médio",
    fullName: "CPA (Custo por Aquisição)",
    icon: Activity,
    value: "R$ 14",
    cents: ",22",
    change: "↓ -9.8%",
    changeSub: "favorável",
    changeType: "positive",
    description: "Valor médio investido para gerar cada cliente ou venda confirmada.",
    idealBehavior: {
      type: "lower",
      label: "Melhor Menor",
      reason: "Quanto menor o CPA, maior a margem de lucro líquida de cada operação.",
    },
    tip: "Desative conjuntos de anúncios cujo CPA ultrapasse o limite de equilíbrio do seu produto.",
    isSimpleEssential: true,
  },
  {
    id: "roas",
    title: "ROAS Consolidado",
    fullName: "ROAS (Retorno sobre Gasto)",
    icon: TrendingUp,
    value: "4.82x",
    change: "+0.6x incremento",
    changeType: "badge",
    description: "Multiplicador de retorno: faturamento bruto dividido pelo total investido.",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Multiplica o retorno de cada Real alocado em anúncios na Meta.",
    },
    tip: "ROAS acima de 3.0x sinaliza oportunidade imediata para acelerar a escala horizontal de público.",
    isFeatured: true,
    isSimpleEssential: true,
  },
]

const leadsMetrics: MetricCardData[] = [
  {
    id: "investimento",
    title: "Investimento",
    fullName: "Investimento Total (Spend)",
    icon: CreditCard,
    value: "R$ 48.650",
    cents: ",00",
    change: "↑ +12.4%",
    changeSub: "vs anterior",
    changeType: "positive",
    description: "Volume financeiro total consumido em anúncios no período selecionado.",
    idealBehavior: {
      type: "balanced",
      label: "Escala Controlada",
      reason: "Deve crescer mantendo o custo por lead dentro da meta de lucratividade.",
    },
    tip: "Aumente o orçamento gradualmente nas campanhas com melhor taxa de resposta no atendimento.",
    isSimpleEssential: true,
  },
  {
    id: "impressoes",
    title: "Impressões",
    fullName: "Impressões Totais",
    icon: Eye,
    value: "2.840.120",
    change: "↑ +18.2%",
    changeSub: "vs anterior",
    changeType: "positive",
    description: "Total de vezes que os seus anúncios foram renderizados na tela dos usuários.",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Amplia o reconhecimento da sua marca e produtos no segmento.",
    },
    tip: "Segmente públicos semelhantes aos seus melhores clientes para gerar impressões qualificadas.",
    isSimpleEssential: false,
  },
  {
    id: "cliques",
    title: "Cliques Totais",
    fullName: "Cliques no Anúncio & Link",
    icon: MousePointerClick,
    value: "94.320",
    change: "↑ +14.6%",
    changeSub: "CTR 3.32%",
    changeType: "positive",
    description: "Volume de toques que direcionaram o usuário para a conversa de WhatsApp ou LP.",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Garante fluxo constante de novas oportunidades entrando no funil.",
    },
    tip: "Destaque o benefício principal na imagem e use CTAs diretos como Falar com Especialista.",
    isSimpleEssential: false,
  },
  {
    id: "leads",
    title: "Leads Gerados",
    fullName: "Leads & Conversas WhatsApp",
    icon: MessageSquare,
    value: "3.420",
    change: "↑ +24.8%",
    changeSub: "vs anterior",
    changeType: "positive",
    description: "Contatos reais que iniciaram conversa no WhatsApp ou preencheram cadastro.",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Alimenta o time comercial ou funil automatizado com novos potenciais compradores.",
    },
    tip: "Atenda o lead em menos de 5 minutos para triplicar as chances de fechamento da venda.",
    isSimpleEssential: true,
  },
  {
    id: "cpl",
    title: "CPL Médio",
    fullName: "CPL (Custo por Lead)",
    icon: Activity,
    value: "R$ 14",
    cents: ",22",
    change: "↓ -9.8%",
    changeSub: "favorável",
    changeType: "positive",
    description: "Custo médio pago para gerar cada novo contato ou conversa iniciada.",
    idealBehavior: {
      type: "lower",
      label: "Melhor Menor",
      reason: "Permite atrair mais clientes potenciais com o mesmo orçamento total.",
    },
    tip: "Use criativos específicos para filtrar curiosos antes do clique, reduzindo custos com leads desqualificados.",
    isSimpleEssential: true,
  },
  {
    id: "taxa_contato",
    title: "Taxa de Conversão",
    fullName: "Taxa de Conversão de Leads",
    icon: TrendingUp,
    value: "3.63%",
    change: "+0.8pp vs anterior",
    changeType: "badge",
    description: "Percentual de pessoas que clicaram no anúncio e de fato enviaram mensagem/lead.",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Indica sincronia perfeita entre a promessa do anúncio e a página/conversa.",
    },
    tip: "Mensagens pré-configuradas no botão do WhatsApp facilitam o envio pelo usuário.",
    isFeatured: true,
    isSimpleEssential: true,
  },
]

interface OverviewMetricsProps {
  reportMode?: string
  isProMode?: boolean
}

export function OverviewMetrics({ 
  reportMode = "automatico", 
  isProMode = true 
}: OverviewMetricsProps) {
  const isLeadsMode = reportMode === "whatsapp_leads"
  const allMetrics = isLeadsMode ? leadsMetrics : defaultMetrics
  
  // No modo simples, filtra apenas as 4 métricas essenciais de negócio
  const currentMetrics = isProMode 
    ? allMetrics 
    : allMetrics.filter((m) => m.isSimpleEssential)

  const gridClass = isProMode
    ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 w-full"
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full"

  return (
    <div className={gridClass}>
      {currentMetrics.map((metric) => {
        const IconComponent = metric.icon

        if (metric.isFeatured) {
          return (
            <div
              key={metric.id}
              className={`flex flex-col justify-between bg-blue-600 text-white rounded-2xl shadow-md transition-all hover:scale-[1.01] ${
                isProMode ? "p-3.5 min-h-[120px]" : "p-4.5 min-h-[136px]"
              }`}
            >
              {/* Top: Ícone + Título + Lâmpada */}
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 truncate">
                  <IconComponent className={`${isProMode ? "h-3.5 w-3.5" : "h-4 w-4"} shrink-0 text-blue-200`} />
                  <span className={`${isProMode ? "text-xs" : "text-sm"} font-semibold text-blue-100 truncate`}>
                    {metric.title}
                  </span>
                </div>
                <Popover>
                  <PopoverTrigger render={
                    <button 
                      type="button" 
                      aria-label={`Explicação sobre ${metric.title}`}
                      className="group/light flex items-center justify-center h-6 w-6 rounded-lg text-blue-200 hover:text-white hover:bg-white/15 active:scale-95 focus:outline-hidden transition-all duration-200 shrink-0" 
                    />
                  }>
                    <Lightbulb className="h-3.5 w-3.5 transition-transform duration-200 group-hover/light:scale-120 group-hover/light:text-amber-300" />
                  </PopoverTrigger>
                  <PopoverContent 
                    side="top" 
                    align="center"
                    sideOffset={8}
                    className="w-80 max-w-[calc(100vw-2rem)] p-4 rounded-2xl bg-zinc-950 text-zinc-100 border border-zinc-800 shadow-2xl backdrop-blur-xl flex flex-col gap-3"
                  >
                    {/* Header Popover */}
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-zinc-800/80">
                      <span className="font-bold text-xs text-white">
                        {metric.fullName}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                        <ArrowUpRight className="h-3 w-3" /> {metric.idealBehavior.label}
                      </span>
                    </div>

                    {/* Descrição */}
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {metric.description}
                    </p>

                    {/* Comportamento Ideal */}
                    <div className="text-[11px] text-zinc-300 bg-zinc-900/90 p-2.5 rounded-xl border border-zinc-800/60 leading-relaxed">
                      <span className="text-zinc-100 font-semibold">Comportamento: </span>
                      {metric.idealBehavior.reason}
                    </div>

                    {/* Dica */}
                    <div className="flex items-start gap-2 pt-2 border-t border-zinc-800/80 text-[11px] text-amber-300 font-medium leading-relaxed">
                      <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-400 mt-0.5" />
                      <span>{metric.tip}</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Meio: Valor */}
              <div className="my-auto py-1">
                <div className={`${isProMode ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"} font-bold tracking-tight text-white whitespace-nowrap`}>
                  {metric.value}
                </div>
              </div>

              {/* Bottom: Variação / Badge */}
              <div className="mt-auto flex items-center">
                <span className="text-[10px] font-semibold bg-white/20 text-white px-2 py-0.5 rounded-md">
                  {metric.change}
                </span>
              </div>
            </div>
          )
        }

        return (
          <div
            key={metric.id}
            className={`flex flex-col justify-between bg-card border border-border/80 rounded-2xl shadow-2xs transition-all hover:border-border ${
              isProMode ? "p-3.5 min-h-[120px]" : "p-4.5 min-h-[136px]"
            }`}
          >
            {/* Top: Ícone + Título + Lâmpada */}
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 text-muted-foreground truncate">
                <IconComponent className={`${isProMode ? "h-3.5 w-3.5" : "h-4 w-4"} shrink-0 text-muted-foreground`} />
                <span className={`${isProMode ? "text-xs" : "text-sm"} font-semibold text-muted-foreground truncate`}>
                  {metric.title}
                </span>
              </div>
              <Popover>
                <PopoverTrigger render={
                  <button 
                    type="button" 
                    aria-label={`Explicação sobre ${metric.title}`}
                    className="group/light flex items-center justify-center h-6 w-6 rounded-lg text-amber-500/70 hover:text-amber-400 hover:bg-amber-500/10 active:scale-95 focus:outline-hidden transition-all duration-200 shrink-0" 
                  />
                }>
                  <Lightbulb className="h-3.5 w-3.5 transition-transform duration-200 group-hover/light:scale-120 group-hover/light:text-amber-300" />
                </PopoverTrigger>
                <PopoverContent 
                  side="top" 
                  align="center"
                  sideOffset={8}
                  className="w-80 max-w-[calc(100vw-2rem)] p-4 rounded-2xl bg-zinc-950 text-zinc-100 border border-zinc-800 shadow-2xl backdrop-blur-xl flex flex-col gap-3"
                >
                  {/* Header Popover */}
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-zinc-800/80">
                    <span className="font-bold text-xs text-white">
                      {metric.fullName}
                    </span>
                    <span 
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0 ${
                        metric.idealBehavior.type === "higher"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : metric.idealBehavior.type === "lower"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {metric.idealBehavior.type === "higher" && <ArrowUpRight className="h-3 w-3" />}
                      {metric.idealBehavior.type === "lower" && <ArrowDownRight className="h-3 w-3" />}
                      {metric.idealBehavior.type === "balanced" && <Scale className="h-3 w-3" />}
                      {metric.idealBehavior.label}
                    </span>
                  </div>

                  {/* Descrição */}
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {metric.description}
                  </p>

                  {/* Comportamento Ideal */}
                  <div className="text-[11px] text-zinc-300 bg-zinc-900/90 p-2.5 rounded-xl border border-zinc-800/60 leading-relaxed">
                    <span className="text-zinc-100 font-semibold">Comportamento: </span>
                    {metric.idealBehavior.reason}
                  </div>

                  {/* Dica */}
                  <div className="flex items-start gap-2 pt-2 border-t border-zinc-800/80 text-[11px] text-amber-300 font-medium leading-relaxed">
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-400 mt-0.5" />
                    <span>{metric.tip}</span>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Meio: Valor */}
            <div className="my-auto py-1">
              <div className={`${isProMode ? "text-base sm:text-lg md:text-xl" : "text-xl sm:text-2xl md:text-2xl"} font-bold tracking-tight text-foreground flex items-baseline whitespace-nowrap`}>
                <span>{metric.value}</span>
                {metric.cents && (
                  <span className="text-xs font-normal text-muted-foreground ml-0.5">
                    {metric.cents}
                  </span>
                )}
                {metric.valueSub && (
                  <span className="text-xs font-normal text-muted-foreground ml-1">
                    {metric.valueSub}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom: Variação / Subtítulo */}
            <div className="mt-auto flex items-center gap-1.5 text-[11px] leading-none">
              {metric.changeType === "positive" && (
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-emerald-500">
                    {metric.change}
                  </span>
                  {metric.changeSub && (
                    <span className="text-muted-foreground font-normal">
                      {metric.changeSub}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
