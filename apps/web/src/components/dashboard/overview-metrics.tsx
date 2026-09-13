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
    value: "—",
    cents: "",
    change: "Meta Ads",
    changeSub: "Aguardando sincronização",
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
    value: "—",
    change: "Meta Ads",
    changeSub: "Aguardando sincronização",
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
    value: "—",
    change: "Meta Ads",
    changeSub: "Aguardando sincronização",
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
    value: "—",
    change: "Meta Ads",
    changeSub: "Aguardando sincronização",
    changeType: "positive",
    description: "Total de ações concluídas (mensagens WhatsApp, formulários ou compras registradas).",
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
    value: "—",
    cents: "",
    change: "Meta Ads",
    changeSub: "Aguardando sincronização",
    changeType: "positive",
    description: "Valor médio investido para gerar cada cliente ou ação confirmada.",
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
    value: "—",
    change: "Meta Ads",
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
    value: "—",
    cents: "",
    change: "Meta Ads",
    changeSub: "Aguardando sincronização",
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
    value: "—",
    change: "Meta Ads",
    changeSub: "Aguardando sincronização",
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
    value: "—",
    change: "Meta Ads",
    changeSub: "Aguardando sincronização",
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
    value: "—",
    change: "Meta Ads",
    changeSub: "Aguardando sincronização",
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
    value: "—",
    cents: "",
    change: "Meta Ads",
    changeSub: "Aguardando sincronização",
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
    value: "—",
    change: "Meta Ads",
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

import type { MetaInsightSummary } from "@/lib/meta-api"

interface OverviewMetricsProps {
  reportMode?: string
  isProMode?: boolean
  realSummary?: MetaInsightSummary | null
}

export function OverviewMetrics({ 
  reportMode = "automatico", 
  isProMode = true,
  realSummary = null
}: OverviewMetricsProps) {
  const isLeadsMode = reportMode === "whatsapp_leads"
  const allMetrics = isLeadsMode ? leadsMetrics : defaultMetrics
  
  // No modo simples, filtra apenas as 4 metricas essenciais de negocio
  const baseMetrics = isProMode 
    ? allMetrics 
    : allMetrics.filter((m) => m.isSimpleEssential)

  const currentMetrics = baseMetrics.map((m) => {
    if (!realSummary) {
      return {
        ...m,
        value: "—",
        cents: "",
        change: "Sem dados",
        changeSub: "Aguardando sincronização"
      }
    }

    if (m.id === "investimento") {
      const parts = (realSummary.spend || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).split(",")
      return { 
        ...m, 
        value: parts[0], 
        cents: parts[1] ? `,${parts[1]}` : ",00", 
        change: "Meta Ads Real", 
        changeSub: realSummary.date_start ? `${realSummary.date_start} a ${realSummary.date_stop}` : "período selecionado"
      }
    }
    if (m.id === "impressoes") {
      return { 
        ...m, 
        value: (realSummary.impressions || 0).toLocaleString("pt-BR"), 
        change: "Meta Ads Real",
        changeSub: `Freq: ${(realSummary.frequency || 1).toFixed(2)}x`
      }
    }
    if (m.id === "cliques") {
      return { 
        ...m, 
        value: (realSummary.clicks || 0).toLocaleString("pt-BR"), 
        change: `CTR ${(realSummary.ctr || 0).toFixed(2)}%`, 
        changeSub: `CPC ${(realSummary.cpc || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      }
    }
    if (m.id === "cpc") {
      return { 
        ...m, 
        value: (realSummary.cpc || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }), 
        change: "Meta Ads Real",
        changeSub: "por clique no link"
      }
    }
    if (m.id === "conversoes") {
      const conv = (realSummary.messages || 0) + (realSummary.leads || 0) + (realSummary.purchases || 0)
      return {
        ...m,
        value: conv.toLocaleString("pt-BR"),
        change: "Meta Ads Real",
        changeSub: realSummary.messages > 0 
          ? `${realSummary.messages} msgs WhatsApp` 
          : realSummary.leads > 0 
          ? `${realSummary.leads} leads` 
          : realSummary.purchases > 0 
          ? `${realSummary.purchases} compras` 
          : "sem conversões no período"
      }
    }
    if (m.id === "conversas_wpp" || m.id === "leads") {
      const count = (realSummary.messages || 0) + (realSummary.leads || 0)
      return { 
        ...m, 
        value: count.toLocaleString("pt-BR"), 
        change: "WhatsApp & Leads", 
        changeSub: realSummary.messages > 0 ? `${realSummary.messages} msgs WhatsApp` : `${realSummary.leads} cadastros`
      }
    }
    if (m.id === "cpa") {
      const conv = (realSummary.messages || 0) + (realSummary.leads || 0) + (realSummary.purchases || 0)
      const cpaVal = conv > 0 ? (realSummary.spend / conv) : (realSummary.cpc > 0 ? realSummary.cpc : 0)
      const parts = cpaVal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).split(",")
      return {
        ...m,
        value: parts[0],
        cents: parts[1] ? `,${parts[1]}` : ",00",
        change: conv > 0 ? "Custo por Ação" : "CPC Médio",
        changeSub: conv > 0 ? "calculado da Meta API" : "sem conversões"
      }
    }
    if (m.id === "cpl") {
      const count = (realSummary.messages || 0) + (realSummary.leads || 0)
      const cplVal = count > 0 ? (realSummary.spend / count) : 0
      const parts = cplVal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).split(",")
      return { 
        ...m, 
        value: parts[0], 
        cents: parts[1] ? `,${parts[1]}` : ",00",
        change: "Custo por Lead/Msg",
        changeSub: count > 0 ? "calculado da Meta API" : "sem leads no período"
      }
    }
    if (m.id === "taxa_contato") {
      const conv = (realSummary.messages || 0) + (realSummary.leads || 0)
      const rate = realSummary.clicks > 0 ? ((conv / realSummary.clicks) * 100).toFixed(2) : "0.00"
      return {
        ...m,
        value: `${rate}%`,
        change: "Conversão de Cliques",
        changeSub: `${conv} de ${realSummary.clicks || 0} cliques`
      }
    }
    if (m.id === "roas") {
      const roasVal = realSummary.roas || (realSummary.spend > 0 && realSummary.purchase_value > 0 ? realSummary.purchase_value / realSummary.spend : 0)
      return { 
        ...m, 
        value: roasVal > 0 ? `${roasVal.toFixed(1)}x` : "0.0x", 
        change: realSummary.purchase_value > 0 ? `Retorno: ${realSummary.purchase_value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}` : "Sem compras registradas"
      }
    }
    if (m.id === "alcance") {
      return { 
        ...m, 
        value: (realSummary.reach || 0).toLocaleString("pt-BR"), 
        change: "Pessoas Alcançadas",
        changeSub: "Meta Ads Real"
      }
    }
    return m
  })

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
