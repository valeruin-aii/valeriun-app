import { Sparkles, MessageCircle, DollarSign, ChevronRight, Save } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Card } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import type { CampaignData } from "../campaign-setup"

interface CampaignStepProps {
  data: CampaignData
  updateData: (updates: Partial<CampaignData>) => void
  onNext: () => void
  onCancel?: () => void
}

export function CampaignStep({ data, updateData, onNext, onCancel }: CampaignStepProps) {
  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          Passo 1 de 3: Campanha
          <Badge variant="secondary" className="text-[9px] bg-blue-500/10 text-blue-600 border-none uppercase">Novo</Badge>
        </h3>
        <p className="text-sm text-muted-foreground">Configurações globais de conta, atribuição, orçamento e cronograma de veiculação.</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground flex justify-between">
              Conta do Facebook
              <span className="text-muted-foreground font-normal">ID: act_892100438</span>
            </label>
            <div className="relative">
              <select 
                value={data.accountId}
                onChange={(e) => updateData({ accountId: e.target.value })}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
              >
                <option>Corrente</option>
              </select>
              <ChevronRight className="w-4 h-4 absolute right-3 top-2.5 text-muted-foreground rotate-90 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground flex justify-between">
              Página do Facebook
              <span className="text-blue-500 font-normal">Verificada</span>
            </label>
            <div className="relative">
              <select 
                value={data.pageId}
                onChange={(e) => updateData({ pageId: e.target.value })}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
              >
                <option>Cardapro - Cardápio Digital</option>
              </select>
              <ChevronRight className="w-4 h-4 absolute right-3 top-2.5 text-muted-foreground rotate-90 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground flex justify-between">
            Nome da Campanha
            <span className="text-muted-foreground font-normal">Taxonomia de Conversão</span>
          </label>
          <Input 
            value={data.campaignName}
            onChange={(e) => updateData({ campaignName: e.target.value })}
            className="h-9 bg-muted/30" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground flex justify-between">
            Objetivo
            <span className="text-primary font-normal flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Ideal para Geração de Leads
            </span>
          </label>
          <div className="relative">
            <select 
              value={data.objective}
              onChange={(e) => updateData({ objective: e.target.value })}
              className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none pl-8"
            >
              <option>Engajamento (WhatsApp/Mensagens)</option>
            </select>
            <MessageCircle className="w-4 h-4 absolute left-2.5 top-2.5 text-blue-500 pointer-events-none" />
            <ChevronRight className="w-4 h-4 absolute right-3 top-2.5 text-muted-foreground rotate-90 pointer-events-none" />
          </div>
        </div>
      </div>

      <Card className="p-5 border-border/60 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" /> Orçamento & Estratégia de Veiculação
          </h4>
          <Badge variant="secondary" className="text-[10px] bg-muted">CBO Ativo</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold">Orçamento</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-sm text-muted-foreground">R$</span>
              <Input 
                type="number"
                value={data.budget}
                onChange={(e) => updateData({ budget: e.target.value })}
                className="pl-9 h-9" 
              />
              <div className="absolute right-3 top-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                / dia
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold">Estratégia de Lance</label>
            <div className="relative">
              <select 
                value={data.bidStrategy}
                onChange={(e) => updateData({ bidStrategy: e.target.value })}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
              >
                <option>Valor Diário (Sem limite de lance)</option>
              </select>
              <ChevronRight className="w-4 h-4 absolute right-3 top-2.5 text-muted-foreground rotate-90 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold">Horário de Veiculação</label>
            <div className="relative">
              <select 
                value={data.schedule}
                onChange={(e) => updateData({ schedule: e.target.value })}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
              >
                <option>Rodar 24h (Orçamento Diário)</option>
              </select>
              <ChevronRight className="w-4 h-4 absolute right-3 top-2.5 text-muted-foreground rotate-90 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold flex justify-between">
              Limite Total (Opcional R$)
              <span className="text-muted-foreground font-normal">Gasto Máximo</span>
            </label>
            <div className="relative">
              <Input 
                placeholder="Ilimitado" 
                value={data.spendingLimit}
                onChange={(e) => updateData({ spendingLimit: e.target.value })}
                className="h-9 pr-16" 
              />
              <button type="button" onClick={() => updateData({ spendingLimit: "" })} className="absolute right-3 top-2.5 text-xs text-blue-500 font-medium">Redefinir</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold">Data de Início</label>
            <Input 
              type="date" 
              value={data.startDate}
              onChange={(e) => updateData({ startDate: e.target.value })}
              className="h-9 text-sm" 
            />
            <p className="text-[10px] text-muted-foreground">Início imediato após aprovação automática da Meta</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold flex justify-between">
              Data de Término (Opcional)
              <span className="text-muted-foreground font-normal">Veiculação contínua</span>
            </label>
            <Input 
              type="date" 
              value={data.endDate}
              onChange={(e) => updateData({ endDate: e.target.value })}
              className="h-9 text-sm" 
            />
            <p className="text-[10px] text-muted-foreground">Deixe vazio para manter a campanha ativa sem data final</p>
          </div>
        </div>
      </Card>

      {/* Fixed bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border/40 flex items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-2">
          <Button onClick={onCancel} variant="outline" size="sm" className="h-9 px-4">Cancelar</Button>
          <Button variant="ghost" size="sm" className="h-9 px-4 text-muted-foreground">
            <Save className="w-4 h-4 mr-2" /> Salvar Rascunho
          </Button>
        </div>
        <Button onClick={onNext} size="sm" className="h-9 px-5">
          Avançar para Conjunto <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
