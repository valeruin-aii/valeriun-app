import { Sparkles } from "lucide-react"

export function AiCreatives() {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span className="flex items-center justify-center bg-primary/10 text-primary h-6 w-6 rounded">
              <Sparkles className="h-4 w-4" />
            </span>
            Criativos e Anúncios Gerados por IA
          </h3>
          <p className="text-xs text-muted-foreground">Anúncios gerados pelo agente autônomo da Valeriun para esta conta.</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-border/80 bg-card/40 text-center">
        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
          <Sparkles className="h-5 w-5" />
        </div>
        <h4 className="font-semibold text-sm text-foreground mb-1">Nenhum criativo gerado por IA pendente</h4>
        <p className="text-xs text-muted-foreground max-w-md mb-4">
          Quando você criar ou solicitar otimização de anúncios com IA para a conta de anúncios selecionada, os criativos gerados aparecerão aqui para revisão e aprovação antes de serem enviados à Meta.
        </p>
      </div>
    </div>
  )
}
