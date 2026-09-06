import {
  Building2,
  ChevronDown,
  Bell,
  Check,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/70 bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Lado Esquerdo: SidebarTrigger + Seletor de Workspace + Status */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8 text-muted-foreground hover:text-foreground" />

        {/* Seletor de Workspace */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-2 rounded-lg border-border/80 bg-background px-3 font-medium text-foreground shadow-xs hover:bg-muted/50"
              />
            }
          >
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold">Acme Performance Corp</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel className="text-xs text-muted-foreground">Workspaces</DropdownMenuLabel>
            <DropdownMenuItem className="flex items-center justify-between font-medium">
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Acme Performance Corp
              </span>
              <Check className="h-4 w-4 text-primary" />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              Vitta Holding Global
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs text-primary font-medium">
              + Criar Novo Workspace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Indicador de Sincronização */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Sincronizado há 2 min</span>
        </div>
      </div>

      {/* Lado Direito: Notificações + Perfil do Usuário */}
      <div className="flex items-center gap-3">
        {/* Botão Notificações */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notificações</span>
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </Button>

        {/* Separador vertical sutil */}
        <div className="h-5 w-px bg-border/80" />

        {/* Perfil do Usuário */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="flex h-10 items-center gap-3 rounded-lg px-2 hover:bg-muted/50 transition-colors"
              />
            }
          >
            <div className="flex flex-col text-right leading-tight">
              <span className="text-sm font-semibold text-foreground">Lucas Silva</span>
              <span className="text-[11px] text-muted-foreground font-normal">
                Gestor de Tráfego
              </span>
            </div>
            <Avatar className="h-8 w-8 border border-border shadow-xs">
              <AvatarImage
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                alt="Lucas Silva"
              />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                LS
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuItem>Perfil & Segurança</DropdownMenuItem>
            <DropdownMenuItem>Preferências</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive font-medium">
              Sair da Conta
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
