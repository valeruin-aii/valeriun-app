import * as React from "react"
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight, 
  Scale
} from "lucide-react"

interface MetricDefinition {
  acronym: string
  fullName: string
  category: "custos" | "conversao" | "criativos" | "financeiro"
  categoryLabel: string
  meaning: string
  formula: string
  idealBehavior: {
    type: "higher" | "lower" | "balanced"
    label: string
    reason: string
  }
  tip: string
}

const metricsGlossary: MetricDefinition[] = [
  {
    acronym: "ROAS",
    fullName: "Return on Ad Spend (Retorno sobre Gasto em Anúncios)",
    category: "financeiro",
    categoryLabel: "Financeiro",
    meaning: "Mede a receita bruta gerada para cada 1 Real investido em campanhas de mídia paga.",
    formula: "Receita Total Gerada ÷ Investimento em Anúncios",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Quanto maior o ROAS, mais receita suas campanhas produzem por cada Real alocado.",
    },
    tip: "Compare sempre o ROAS atual com o seu Break-Even ROAS para garantir lucro líquido real.",
  },
  {
    acronym: "ROI",
    fullName: "Return on Investment (Retorno sobre o Investimento Total)",
    category: "financeiro",
    categoryLabel: "Financeiro",
    meaning: "Calcula a lucratividade real do negócio considerando todos os custos operacionais (produto, mídia, ferramentas e impostos).",
    formula: "((Receita Líquida - Custos Totais) ÷ Custos Totais) × 100",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Indica a saúde financeira real e a capacidade de expansão sustentável da empresa.",
    },
    tip: "Diferente do ROAS (que foca só em mídia), o ROI avalia a viabilidade global de toda a operação.",
  },
  {
    acronym: "CPA",
    fullName: "Cost Per Acquisition (Custo por Aquisição / Venda)",
    category: "custos",
    categoryLabel: "Custos",
    meaning: "Valor médio investido em anúncios para conquistar um novo cliente ou venda confirmada.",
    formula: "Total Investido ÷ Número de Conversões / Vendas",
    idealBehavior: {
      type: "lower",
      label: "Melhor Menor",
      reason: "Quanto menor o CPA, maior sobra de margem de contribuição no caixa.",
    },
    tip: "Defina seu CPA Máximo Permitido (Ticket Médio menos custos) e pause conjuntos que ultrapassarem essa linha.",
  },
  {
    acronym: "CPL",
    fullName: "Cost Per Lead (Custo por Lead / Contato)",
    category: "custos",
    categoryLabel: "Custos",
    meaning: "Custo médio necessário para capturar um contato qualificado, formulário ou conversa no WhatsApp.",
    formula: "Total Investido ÷ Quantidade de Leads Gerados",
    idealBehavior: {
      type: "lower",
      label: "Melhor Menor",
      reason: "Permite alimentar a equipe comercial ou automação com mais contatos usando o mesmo orçamento.",
    },
    tip: "Use perguntas de qualificação no formulário para evitar que CPL baixo atraia contatos desinteressados.",
  },
  {
    acronym: "CPC",
    fullName: "Cost Per Click (Custo por Clique no Link)",
    category: "custos",
    categoryLabel: "Custos",
    meaning: "Preço médio cobrado pela plataforma a cada clique que direcionou o usuário para seu destino.",
    formula: "Total Investido ÷ Total de Cliques no Link",
    idealBehavior: {
      type: "lower",
      label: "Melhor Menor",
      reason: "Reduz o custo unitário de cada visitante que entra na sua esteira de vendas.",
    },
    tip: "Para baixar o CPC, aumente o CTR melhorando a oferta e os ganchos visuais do criativo.",
  },
  {
    acronym: "CPM",
    fullName: "Cost Per Mille (Custo por Mil Impressões)",
    category: "custos",
    categoryLabel: "Custos",
    meaning: "Valor cobrado pelo leilão da Meta para exibir seu anúncio 1.000 vezes.",
    formula: "(Total Investido ÷ Total de Impressões) × 1.000",
    idealBehavior: {
      type: "lower",
      label: "Melhor Menor",
      reason: "Barateia a visibilidade geral dos seus criativos em frente ao público-alvo.",
    },
    tip: "Públicos muito pequenos ou criativos com baixa pontuação de qualidade encarecem o CPM.",
  },
  {
    acronym: "CTR",
    fullName: "Click-Through Rate (Taxa de Cliques)",
    category: "conversao",
    categoryLabel: "Conversão",
    meaning: "Percentual de pessoas que visualizaram o anúncio e decidiram clicar no link.",
    formula: "(Total de Cliques ÷ Total de Impressões) × 100",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Demonstra alta atratividade, relevância e poder de persuasão do criativo.",
    },
    tip: "Um CTR no link acima de 2.0% na Meta geralmente indica um criativo de excelente tração.",
  },
  {
    acronym: "CVR",
    fullName: "Conversion Rate (Taxa de Conversão da Página / Destino)",
    category: "conversao",
    categoryLabel: "Conversão",
    meaning: "Percentual de visitantes da landing page ou WhatsApp que concluíram a compra ou ação.",
    formula: "(Total de Conversões ÷ Total de Visitantes Únicos) × 100",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Aproveita o tráfego pago da melhor maneira possível sem desperdício de cliques.",
    },
    tip: "Otimize a velocidade de carregamento da página no celular e simplifique o checkout.",
  },
  {
    acronym: "CAC",
    fullName: "Customer Acquisition Cost (Custo de Aquisição de Clientes)",
    category: "custos",
    categoryLabel: "Custos",
    meaning: "Investimento financeiro total de marketing e vendas dividido pelo número de novos clientes adquiridos.",
    formula: "(Gastos Totais de Marketing + Vendas) ÷ Novos Clientes",
    idealBehavior: {
      type: "lower",
      label: "Melhor Menor",
      reason: "Garante retorno rápido e ciclo de caixa saudável para o crescimento da empresa.",
    },
    tip: "O CAC deve ser no máximo 1/3 do LTV do cliente para que o modelo de negócio seja sustentável.",
  },
  {
    acronym: "LTV",
    fullName: "Lifetime Value (Valor do Tempo de Vida do Cliente)",
    category: "financeiro",
    categoryLabel: "Financeiro",
    meaning: "Faturamento médio total que um único cliente gera durante todo o período de relacionamento com sua marca.",
    formula: "Ticket Médio × Média de Compras por Cliente ao Ano × Tempo Médio de Retenção",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Permite pagar um CAC maior no tráfego sem perder a lucratividade final.",
    },
    tip: "Crie esteiras de pós-venda, upsells, cross-sells e assinaturas para alavancar seu LTV.",
  },
  {
    acronym: "LTV/CAC",
    fullName: "Rácio de Eficiência de Aquisição",
    category: "financeiro",
    categoryLabel: "Financeiro",
    meaning: "Compara quanto valor o cliente gera (LTV) versus o custo pago para adquiri-lo (CAC).",
    formula: "LTV ÷ CAC",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior (Ideal ≥ 3.0)",
      reason: "Relação 3.0x ou mais indica uma máquina de vendas de alta performance e retorno comprovado.",
    },
    tip: "Se o rácio estiver abaixo de 2.0x, foque em retenção e recompra antes de acelerar os gastos de mídia.",
  },
  {
    acronym: "Hook Rate",
    fullName: "Hook Rate (Taxa de Retenção nos 3 Primeiros Segundos)",
    category: "criativos",
    categoryLabel: "Criativos & Vídeo",
    meaning: "Percentual de pessoas que assistiram pelo menos 3 segundos de um vídeo após o anúncio aparecer.",
    formula: "(Visualizações de 3 Segundos ÷ Impressões do Vídeo) × 100",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Indica se o gancho inicial e a promessa do vídeo conseguiram parar o 'scroll' do usuário.",
    },
    tip: "Mantenha o Hook Rate acima de 35% testando títulos impactantes e cortes rápidos no início.",
  },
  {
    acronym: "Hold Rate",
    fullName: "Hold Rate (Taxa de Retenção até 15 Segundos / Conclusão)",
    category: "criativos",
    categoryLabel: "Criativos & Vídeo",
    meaning: "Percentual de usuários que permaneceram assistindo o vídeo até a oferta ou primeiros 15 segundos.",
    formula: "(Visualizações de 15 Segundos / ThruPlay ÷ Visualizações de 3s) × 100",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Mede o poder de retenção da história e do argumento de vendas do vídeo.",
    },
    tip: "Use legendas dinâmicas, cortes e mudanças de ângulo para sustentar a atenção até a chamada para ação.",
  },
  {
    acronym: "Frequência",
    fullName: "Frequency (Frequência Média de Exibição)",
    category: "criativos",
    categoryLabel: "Criativos & Vídeo",
    meaning: "Média de vezes que cada pessoa única foi impactada pelos seus anúncios no período.",
    formula: "Total de Impressões ÷ Alcance Único",
    idealBehavior: {
      type: "balanced",
      label: "Equilíbrio (1.5x a 3.0x)",
      reason: "Frequência muito alta (acima de 4.0x em público frio) gera fadiga e eleva o CPA.",
    },
    tip: "Em público frio busque frequência entre 1.5x e 2.2x; em remarketing é natural tolerar até 4.0x.",
  },
  {
    acronym: "Alcance",
    fullName: "Reach (Pessoas Únicas Alcançadas)",
    category: "conversao",
    categoryLabel: "Conversão",
    meaning: "Quantidade de contas ou pessoas individuais distintas que viram seu anúncio pelo menos uma vez.",
    formula: "Métrica Primária de Usuários Únicos",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Amplia o tamanho do topo de funil e a conscientização de marca.",
    },
    tip: "Diferente de impressões (que conta repetições), o alcance mede pessoas reais alcançadas.",
  },
  {
    acronym: "Break-Even ROAS",
    fullName: "ROAS de Ponto de Equilíbrio (Margem Zero)",
    category: "financeiro",
    categoryLabel: "Financeiro",
    meaning: "ROAS mínimo exato necessário para que a campanha pague o custo do produto e a mídia sem dar prejuízo.",
    formula: "1 ÷ Margem Bruta (em decimal) ou 100 ÷ Margem %",
    idealBehavior: {
      type: "lower",
      label: "Melhor Menor",
      reason: "Quanto menor o Break-Even, maior é a sua margem de produto e mais fácil é lucrar no tráfego.",
    },
    tip: "Exemplo: Se sua margem de produto é 50%, seu Break-Even ROAS é 2.0x (1 ÷ 0.5).",
  },
  {
    acronym: "AOV",
    fullName: "Average Order Value (Ticket Médio por Pedido)",
    category: "financeiro",
    categoryLabel: "Financeiro",
    meaning: "Valor monetário médio faturado a cada pedido concluído na loja ou contratação.",
    formula: "Faturamento Total ÷ Total de Pedidos / Compras",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "Aumentar o AOV permite absorver CPAs mais altos com lucro expressivo.",
    },
    tip: "Adicione Order Bumps no checkout e combos 'Compre 2 e Leve 3' para subir o ticket médio.",
  },
  {
    acronym: "Taxa de Conexão",
    fullName: "Landing Page View Rate (Taxa de Carregamento da LP)",
    category: "conversao",
    categoryLabel: "Conversão",
    meaning: "Percentual de cliques no anúncio que de fato esperaram a página carregar completamente.",
    formula: "(Visualizações da Página de Destino ÷ Cliques no Link) × 100",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior (Ideal ≥ 80%)",
      reason: "Garante que o orçamento pago em cliques não seja desperdiçado por lentidão no servidor.",
    },
    tip: "Se a taxa estiver abaixo de 75%, comprima imagens da página e otimize a CDN de hospedagem.",
  },
  {
    acronym: "Taxa de Abandono",
    fullName: "Cart / Checkout Abandonment Rate",
    category: "conversao",
    categoryLabel: "Conversão",
    meaning: "Percentual de usuários que adicionaram itens ao carrinho ou iniciaram checkout mas não concluíram.",
    formula: "(1 - (Compras Concluídas ÷ Inícios de Checkout)) × 100",
    idealBehavior: {
      type: "lower",
      label: "Melhor Menor",
      reason: "Indica fluidez no pagamento, confiança no frete e clareza nos preços finais.",
    },
    tip: "Ative recuperação automática via WhatsApp e ofereça Pix com desconto para reduzir o abandono.",
  },
  {
    acronym: "Margem de Contribuição",
    fullName: "Contribution Margin (Margem Bruta Unitária)",
    category: "financeiro",
    categoryLabel: "Financeiro",
    meaning: "Fatia do faturamento que sobra após pagar os custos variáveis diretos (produto, frete, taxas e mídia).",
    formula: "Receita de Venda - Custos Variáveis - Gasto de Mídia",
    idealBehavior: {
      type: "higher",
      label: "Melhor Maior",
      reason: "É o montante que cobre os custos fixos da empresa e gera o lucro líquido final.",
    },
    tip: "Não escale campanhas olhando apenas faturamento bruto; acompanhe a margem de contribuição diária.",
  },
]

export function MetricsManual() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")

  const filteredMetrics = metricsGlossary.filter((metric) => {
    const matchesCategory = selectedCategory === "all" || metric.category === selectedCategory
    const matchesSearch = 
      metric.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
      metric.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      metric.meaning.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex flex-col w-full gap-6 mb-8">
      {/* Cabeçalho do Manual */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            Manual de Métricas & Glossário de Performance
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Guia de bolso didático com todas as siglas, fórmulas de cálculo, comportamentos ideais e recomendações práticas para tomada de decisão.
          </p>
        </div>

        <div className="text-xs font-bold text-muted-foreground bg-background px-3 py-1.5 rounded-xl border border-border/70 shrink-0">
          {metricsGlossary.length} Métricas Catalogadas
        </div>
      </div>

      {/* Barra de Filtros & Busca */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/70 border border-border/80 rounded-2xl p-4 shadow-2xs">
        {/* Campo de Busca */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por sigla ou conceito (ex: ROAS, CPL, Hook)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-xs bg-background/80 border border-border/80 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-primary transition-colors"
          />
        </div>

        {/* Pílulas de Categoria */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
              selectedCategory === "all"
                ? "bg-[#0084ff] text-white border-[#0084ff] shadow-xs"
                : "bg-background/80 text-muted-foreground hover:text-foreground border-border/70"
            }`}
          >
            Todas ({metricsGlossary.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("financeiro")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
              selectedCategory === "financeiro"
                ? "bg-[#0084ff] text-white border-[#0084ff] shadow-xs"
                : "bg-background/80 text-muted-foreground hover:text-foreground border-border/70"
            }`}
          >
            Financeiro
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("custos")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
              selectedCategory === "custos"
                ? "bg-[#0084ff] text-white border-[#0084ff] shadow-xs"
                : "bg-background/80 text-muted-foreground hover:text-foreground border-border/70"
            }`}
          >
            Custos (CPA/CPL/CPC)
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("conversao")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
              selectedCategory === "conversao"
                ? "bg-[#0084ff] text-white border-[#0084ff] shadow-xs"
                : "bg-background/80 text-muted-foreground hover:text-foreground border-border/70"
            }`}
          >
            Conversão (CTR/CVR)
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("criativos")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
              selectedCategory === "criativos"
                ? "bg-[#0084ff] text-white border-[#0084ff] shadow-xs"
                : "bg-background/80 text-muted-foreground hover:text-foreground border-border/70"
            }`}
          >
            Vídeo & Retenção
          </button>
        </div>
      </div>

      {/* Grid de Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredMetrics.map((metric) => (
          <div
            key={metric.acronym}
            className="flex flex-col justify-between bg-card border border-border/80 rounded-2xl p-5 shadow-2xs hover:border-border transition-all"
          >
            <div>
              {/* Topo do Card: Sigla + Categoria + Badge Ideal */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight text-white font-mono">
                      {metric.acronym}
                    </span>
                    <span className="text-[10px] font-semibold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md border border-border/50">
                      {metric.categoryLabel}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-zinc-400 mt-0.5">
                    {metric.fullName}
                  </div>
                </div>

                {/* Badge de Comportamento Ideal */}
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border shrink-0 ${
                    metric.idealBehavior.type === "higher"
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : metric.idealBehavior.type === "lower"
                      ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                      : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                  }`}
                >
                  {metric.idealBehavior.type === "higher" && <ArrowUpRight className="h-3 w-3" />}
                  {metric.idealBehavior.type === "lower" && <ArrowDownRight className="h-3 w-3" />}
                  {metric.idealBehavior.type === "balanced" && <Scale className="h-3 w-3" />}
                  {metric.idealBehavior.label}
                </span>
              </div>

              {/* O que é */}
              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                {metric.meaning}
              </p>

              {/* Fórmula Matemática */}
              <div className="flex flex-col gap-1 bg-background/80 p-2.5 rounded-xl border border-border/60 mb-3 font-mono text-[11px]">
                <span className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground font-sans">
                  Fórmula de Cálculo:
                </span>
                <span className="text-blue-400 font-semibold">{metric.formula}</span>
              </div>

              {/* Por que é Melhor Maior/Menor */}
              <div className="text-[11px] text-zinc-400 mb-3 bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/60 leading-relaxed">
                <strong className="text-zinc-200">Impacto na Operação: </strong>
                {metric.idealBehavior.reason}
              </div>
            </div>

            {/* Dica do Especialista */}
            <div className="flex items-start gap-2 pt-3 border-t border-border/40 text-[11px] text-amber-300/90 font-medium leading-relaxed">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-400 mt-0.5" />
              <span>{metric.tip}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredMetrics.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 bg-card border border-dashed border-border rounded-2xl text-center">
          <Search className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
          <h4 className="font-bold text-sm text-foreground">Nenhuma métrica encontrada</h4>
          <p className="text-xs text-muted-foreground mt-1">Tente buscar por outra sigla ou selecione outra categoria.</p>
        </div>
      )}
    </div>
  )
}
