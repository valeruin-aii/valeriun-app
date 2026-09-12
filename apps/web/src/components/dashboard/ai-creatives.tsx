import { Sparkles, Activity, CheckCircle2, Pencil } from "lucide-react"

export function AiCreatives() {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span className="flex items-center justify-center bg-blue-500/10 text-blue-500 h-6 w-6 rounded">
              <Sparkles className="h-4 w-4" />
            </span>
            Últimos Criativos e Anúncios Gerados por IA
          </h3>
          <p className="text-xs text-muted-foreground">Criados pelo agente autônomo aguardando sua revisão ou com veiculação recém-iniciada.</p>
        </div>
        <button className="text-xs font-semibold px-3 py-1.5 bg-muted/50 rounded-md hover:bg-muted transition-colors">
          Ver Todos (14)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Creative 1 */}
        <div className="flex flex-col border border-border rounded-xl overflow-hidden bg-card shadow-sm">
          <div className="relative h-32 bg-muted/50 w-full overflow-hidden">
            <div className="absolute top-2 left-2 z-10 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-white" /> Aguardando Aprovação
            </div>
            <div className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm text-foreground text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              Meta Ads
            </div>
            {/* Placeholder gradient for image */}
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center">
              <div className="h-16 w-16 bg-white/50 dark:bg-black/20 rounded-md backdrop-blur-md" />
            </div>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <div className="text-[10px] text-muted-foreground mb-1">Campanha: Black Season • E-commerce</div>
            <div className="text-sm font-bold text-foreground mb-1 leading-tight">UltraBoost X - Máximo Conforto e Performance</div>
            <div className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              "Treine sem limites com o novo amortecimento inteligente. Frete Grátis nas próximas 4 horas."
            </div>
            
            <div className="flex justify-between items-end mt-auto mb-4">
              <div>
                <div className="text-[10px] text-muted-foreground">Previsão Conv.</div>
                <div className="font-bold text-blue-500 text-sm">~4.8% CTR</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground">Copywriting</div>
                <div className="font-medium text-xs">AIDA + Urgência</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-primary text-primary-foreground text-xs font-bold py-2 rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                <CheckCircle2 className="h-3 w-3" /> Aprovar e Publicar
              </button>
              <button className="h-8 w-8 border border-border rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
                <Pencil className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Creative 2 */}
        <div className="flex flex-col border border-border rounded-xl overflow-hidden bg-card shadow-sm">
          <div className="relative h-32 bg-muted/50 w-full overflow-hidden">
            <div className="absolute top-2 left-2 z-10 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
              <Activity className="h-3 w-3" /> Publicado Hoje
            </div>
            <div className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm text-foreground text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              Instagram Stories
            </div>
            {/* Placeholder gradient for image */}
            <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 flex items-center justify-center">
              <div className="h-12 w-20 bg-white/50 dark:bg-black/20 rounded-md backdrop-blur-md" />
            </div>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <div className="text-[10px] text-muted-foreground mb-1">Campanha: Geração de Leads • B2B</div>
            <div className="text-sm font-bold text-foreground mb-1 leading-tight">Software de Gestão Financeira para PMEs</div>
            <div className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              "Automatize cobranças e DRE em tempo real. Teste 14 dias sem cartão de crédito."
            </div>
            
            <div className="flex justify-between items-end mt-auto mb-4">
              <div>
                <div className="text-[10px] text-muted-foreground">Taxa Atual</div>
                <div className="font-bold text-emerald-500 text-sm">6.2% Conv.</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground">CPA Real</div>
                <div className="font-bold text-xs">R$ 11,80</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 border border-border text-foreground text-xs font-bold py-2 rounded-md flex items-center justify-center gap-2 hover:bg-muted transition-colors">
                <Activity className="h-3 w-3 text-blue-500" /> Ver Métricas em Tempo Real
              </button>
              <button className="h-8 w-8 border border-border rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
                <Pencil className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Creative 3 */}
        <div className="flex flex-col border border-border rounded-xl overflow-hidden bg-card shadow-sm">
          <div className="relative h-32 bg-muted/50 w-full overflow-hidden">
            <div className="absolute top-2 left-2 z-10 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-white" /> Aguardando Aprovação
            </div>
            <div className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm text-foreground text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              Meta Stories
            </div>
            {/* Placeholder gradient for image */}
            <div className="w-full h-full bg-gradient-to-br from-rose-100 to-orange-100 dark:from-rose-900/40 dark:to-orange-900/40 flex items-center justify-center">
              <div className="h-20 w-12 bg-white/50 dark:bg-black/20 rounded-md backdrop-blur-md" />
            </div>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <div className="text-[10px] text-muted-foreground mb-1">Campanha: Retargeting • Cosméticos</div>
            <div className="text-sm font-bold text-foreground mb-1 leading-tight">Sérum Hidratante Vegano 24h</div>
            <div className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              "Esqueceu no carrinho? Finalize agora com cupom exclusivo de 15% OFF e brinde especial."
            </div>
            
            <div className="flex justify-between items-end mt-auto mb-4">
              <div>
                <div className="text-[10px] text-muted-foreground">Previsão ROAS</div>
                <div className="font-bold text-blue-500 text-sm">5.8x</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground">Formato</div>
                <div className="font-medium text-xs">Reels 9:16</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-primary text-primary-foreground text-xs font-bold py-2 rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                <CheckCircle2 className="h-3 w-3" /> Aprovar e Publicar
              </button>
              <button className="h-8 w-8 border border-border rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
                <Pencil className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
