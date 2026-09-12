import * as React from "react"
import { Image as ImageIcon, Plus, Trash2, Wand2, PlusCircle, CheckCircle2, ChevronLeft, Save, Link as LinkIcon, Sparkles, Pencil, X, LayoutTemplate, SplitSquareHorizontal, Type } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Card } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Switch } from "@workspace/ui/components/switch"
import type { CampaignData } from "../campaign-setup"

interface AdStepProps {
  data: CampaignData
  updateData: (updates: Partial<CampaignData>) => void
  onBack: () => void
  onPublish: () => void
}

export function AdStep({ data, updateData, onBack, onPublish }: AdStepProps) {
  const handleUpdateArray = (field: 'titles' | 'descriptions', index: number, value: string) => {
    const newArray = [...data[field]]
    newArray[index] = value
    updateData({ [field]: newArray })
  }

  const handleRemoveFromArray = (field: 'titles' | 'descriptions', index: number) => {
    const newArray = [...data[field]]
    newArray.splice(index, 1)
    updateData({ [field]: newArray })
  }

  const handleAddToArray = (field: 'titles' | 'descriptions') => {
    updateData({ [field]: [...data[field], ""] })
  }

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Pencil className="w-4 h-4 text-muted-foreground" />
          Passo 3 de 3: Anúncio
        </h3>
        <p className="text-sm text-muted-foreground">Defina mídias, textos, títulos e chamadas para ação.</p>
      </div>

      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold flex items-center gap-2">
            Criar Vários Anúncios (Teste de Mídia)
            <Badge variant="secondary" className="text-[10px] bg-blue-500/10 text-blue-600 border-none font-medium">Ativado (Vários Anúncios)</Badge>
          </h4>
          <p className="text-xs text-muted-foreground mt-1">A IA criará anúncios separados para cada foto/vídeo selecionado. Ideal para testar qual mídia performa melhor.</p>
        </div>
        <Switch 
          checked={data.abTestEnabled}
          onCheckedChange={(checked) => updateData({ abTestEnabled: checked })}
          className="data-[state=checked]:bg-blue-600 shrink-0" 
        />
      </div>

      <Card className="p-5 border-border/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-foreground" /> Imagens e Vídeos
            <span className="text-xs font-normal text-muted-foreground ml-1">3 Selecionados</span>
          </h4>
          <span className="text-xs text-blue-500 font-medium flex items-center gap-1 cursor-pointer">
            <Sparkles className="w-3.5 h-3.5" /> Gerar criativos com IA
          </span>
        </div>
        <p className="text-xs text-muted-foreground -mt-2">As mídias aqui competirão entre si. A melhor ganhará mais verba automaticamente.</p>
        
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 hide-scrollbar">
          {/* Upload Button */}
          <div className="w-[120px] h-[120px] shrink-0 rounded-xl border border-dashed border-border/60 bg-muted/20 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/40 transition-colors">
            <Plus className="w-6 h-6 text-blue-500 mb-2" />
            <span className="text-xs font-medium">PC / Galeria</span>
            <span className="text-[9px] text-muted-foreground mt-0.5">Arraste arquivos</span>
          </div>

          {/* Media 1 */}
          <div className="w-[120px] h-[120px] shrink-0 rounded-xl border border-border/50 bg-muted overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <Badge variant="secondary" className="absolute top-2 left-2 z-20 text-[9px] px-1.5 py-0 h-4 bg-background/80 text-foreground font-medium">1:1 Feed</Badge>
            <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between">
              <span className="text-[9px] text-white truncate max-w-[80px]">saas_mockup.png</span>
              <ImageIcon className="w-3 h-3 text-white/80" />
            </div>
            {/* Delete button (shows on hover) */}
            <div className="absolute top-2 right-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-1 rounded-md cursor-pointer hover:bg-red-500/80">
              <Trash2 className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Media 2 */}
          <div className="w-[120px] h-[120px] shrink-0 rounded-xl border border-border/50 bg-muted overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <Badge variant="secondary" className="absolute top-2 left-2 z-20 text-[9px] px-1.5 py-0 h-4 bg-background/80 text-foreground font-medium">9:16 Reels</Badge>
            <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between">
              <span className="text-[9px] text-white truncate max-w-[80px]">pitch_video.mp4</span>
              <div className="flex gap-1">
                <span className="text-[9px] text-white bg-white/20 px-1 rounded">1.2x</span>
                <ImageIcon className="w-3 h-3 text-white/80" />
              </div>
            </div>
          </div>

          {/* AI Generator */}
          <div className="w-[120px] h-[120px] shrink-0 rounded-xl border border-blue-500/20 bg-blue-500/5 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-500/10 transition-colors">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mb-2">
              <Wand2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium">Gerar Mídia</span>
            <span className="text-[9px] text-muted-foreground mt-0.5 text-center px-2">Meta Creative Engine</span>
          </div>
        </div>
      </Card>

      <Card className="p-5 border-border/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            Títulos (Máx 5)
          </h4>
          <Badge variant="secondary" className="text-[10px] bg-muted font-normal">{data.titles.length} de 5 preenchidos</Badge>
        </div>
        
        <div className="space-y-2">
          {data.titles.map((title, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-6 h-6 shrink-0 rounded bg-muted flex items-center justify-center text-[10px] text-muted-foreground font-medium mt-0.5">{i+1}</div>
              <div className="relative flex-1">
                <Input 
                  value={title} 
                  onChange={(e) => handleUpdateArray('titles', i, e.target.value)}
                  className="h-9 pr-16 bg-muted/20" 
                />
                <span className="absolute right-3 top-2.5 text-[10px] text-muted-foreground">{title.length}/40</span>
              </div>
              {data.titles.length > 1 && (
                <Button onClick={() => handleRemoveFromArray('titles', i)} size="icon" variant="ghost" className="h-9 w-9 text-muted-foreground hover:text-red-500">
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-2">
          {data.titles.length < 5 ? (
            <span onClick={() => handleAddToArray('titles')} className="text-xs text-blue-500 font-medium flex items-center gap-1 cursor-pointer">
              <PlusCircle className="w-3.5 h-3.5" /> Adicionar Título Alternativo
            </span>
          ) : (
            <span className="text-xs text-muted-foreground opacity-50 flex items-center gap-1">
              <PlusCircle className="w-3.5 h-3.5" /> Adicionar Título Alternativo (Máximo Atingido)
            </span>
          )}
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Algoritmo Meta Ads combinará automaticamente
          </span>
        </div>
      </Card>

      <Card className="p-5 border-border/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Textos Principais (Máx 5)</h4>
          <Badge variant="secondary" className="text-[10px] bg-muted font-normal">{data.descriptions.length} de 5 preenchidos</Badge>
        </div>
        
        <div className="space-y-3">
          {data.descriptions.map((text, i) => (
            <div key={i} className="flex gap-2 relative">
              <div className="w-6 h-6 shrink-0 rounded bg-muted flex items-center justify-center text-[10px] text-muted-foreground font-medium mt-1">{i+1}</div>
              <div className="relative flex-1">
                <textarea 
                  value={text} 
                  onChange={(e) => handleUpdateArray('descriptions', i, e.target.value)}
                  className="w-full min-h-[80px] rounded-md border border-input bg-muted/20 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none pr-10"
                />
                <span className="absolute right-3 bottom-2 text-[10px] text-muted-foreground">{text.length}/125 carac. ideais</span>
                {data.descriptions.length > 1 && (
                  <Button onClick={() => handleRemoveFromArray('descriptions', i)} size="icon" variant="ghost" className="absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-1">
          {data.descriptions.length < 5 ? (
            <span onClick={() => handleAddToArray('descriptions')} className="text-xs text-blue-500 font-medium flex items-center gap-1 cursor-pointer">
              <PlusCircle className="w-3.5 h-3.5" /> Adicionar Opção de Copy
            </span>
          ) : (
            <span className="text-xs text-muted-foreground opacity-50 flex items-center gap-1">
              <PlusCircle className="w-3.5 h-3.5" /> Adicionar Opção de Copy (Máximo Atingido)
            </span>
          )}
          <span className="text-[10px] text-blue-500 font-medium flex items-center gap-1 cursor-pointer">
            <Sparkles className="w-3 h-3" /> Gerar Variações Persuasivas
          </span>
        </div>
      </Card>

      <Card className="p-5 border-border/60 shadow-sm">
        <div className="space-y-2 max-w-md">
          <label className="text-sm font-semibold block">Chamada para Ação (CTA)</label>
          <p className="text-xs text-muted-foreground mb-2">O botão visível no anúncio em todos os posicionamentos.</p>
          <select 
            value={data.callToAction}
            onChange={(e) => updateData({ callToAction: e.target.value })}
            className="w-full h-10 rounded-md border border-input bg-muted/20 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
          >
            <option>Saiba Mais</option>
            <option>Comprar Agora</option>
            <option>Cadastre-se</option>
            <option>Assinar</option>
            <option>Fale Conosco</option>
            <option>Baixar</option>
          </select>
        </div>
      </Card>

      {/* Fixed bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border/40 flex items-center justify-between gap-2 z-10">
        <Button onClick={onBack} variant="outline" size="sm" className="h-9 px-4">
          <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-9 px-4 text-muted-foreground bg-muted/50">
            <Save className="w-4 h-4 mr-2" /> Salvar Rascunho
          </Button>
          <Button onClick={onPublish} size="sm" className="h-9 px-5 bg-green-600 hover:bg-green-700 text-white">
            <CheckCircle2 className="w-4 h-4 mr-1.5" /> Confirmar e Publicar
          </Button>
        </div>
      </div>
    </div>
  )
}
