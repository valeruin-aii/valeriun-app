import { AppLayout } from "@/components/app-layout"

export function App() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        {/* Breadcrumb e Título da Página */}
        <div className="flex flex-col gap-1.5">
          <div className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
            Configurações do Workspace /{" "}
            <span className="text-primary font-bold">Canais & Contas</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Integrações & Contas de Anúncios
          </h1>

          <p className="text-sm text-muted-foreground">
            Conecte seus canais de tráfego pago e gerencie os acessos de Agentes Autônomos de IA.
          </p>
        </div>

        {/* Placeholder elegante para a Fase 2 (Integrações e Contas) */}
        <div className="mt-4 rounded-xl border border-dashed border-border/80 bg-muted/20 p-12 text-center">
          <div className="mx-auto flex max-w-md flex-col items-center gap-2">
            <h3 className="text-base font-semibold text-foreground">
              Layout e Menu Lateral Configurados
            </h3>
            <p className="text-xs text-muted-foreground">
              A navegação lateral e o cabeçalho foram configurados com sucesso seguindo o design system e Shadcn UI.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
