import * as React from "react"
import { MapPin, Target, Settings, ChevronLeft, ChevronRight, X, Sparkles, SlidersHorizontal, CheckSquare, Square, ShieldCheck, ChevronDown, ChevronUp, CheckCircle2, Circle } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Card } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import type { CampaignData } from "../campaign-setup"

interface AudienceStepProps {
  data: CampaignData
  updateData: (updates: Partial<CampaignData>) => void
  onNext: () => void
  onBack: () => void
}

export function AudienceStep({ data, updateData, onNext, onBack }: AudienceStepProps) {
  const [newInterest, setNewInterest] = React.useState("")

  const handleAddInterest = () => {
    if (newInterest.trim() && !data.interests.includes(newInterest.trim())) {
      updateData({ interests: [...data.interests, newInterest.trim()] })
      setNewInterest("")
    }
  }

  const handleRemoveInterest = (interest: string) => {
    updateData({ interests: data.interests.filter(i => i !== interest) })
  }

  const togglePlacement = (placement: string) => {
    if (data.placements.includes(placement)) {
      updateData({ placements: data.placements.filter(p => p !== placement) })
    } else {
      updateData({ placements: [...data.placements, placement] })
    }
  }

  const [openGroups, setOpenGroups] = React.useState<string[]>(["feeds"])

  const toggleGroup = (groupId: string) => {
    if (openGroups.includes(groupId)) {
      setOpenGroups(openGroups.filter(id => id !== groupId))
    } else {
      setOpenGroups([...openGroups, groupId])
    }
  }

  const placementGroups = [
    {
      id: "feeds",
      title: "Feeds",
      subtitle: "Obtenha alta visibilidade para sua empresa com anúncios nos feeds",
      options: [
        "Feed do Facebook",
        "Feed do perfil do Facebook",
        "Feed do Instagram",
        "Feed do perfil do Instagram",
        "Facebook Marketplace",
        "Coluna da direita do Facebook",
        "Página inicial do Explorar do Instagram"
      ]
    },
    {
      id: "stories",
      title: "Stories, Status e Reels",
      subtitle: "Conte uma história visual rica com anúncios verticais imersivos",
      options: [
        "Instagram Stories",
        "Facebook Stories",
        "Messenger Stories",
        "Instagram Reels",
        "Facebook Reels",
        "Status do WhatsApp"
      ]
    },
    {
      id: "instream",
      title: "In-stream e Resultados de Pesquisa",
      subtitle: "Alcance pessoas durante vídeos ou enquanto pesquisam",
      options: [
        "In-stream para Reels (FB)",
        "Resultados de pesquisa (Facebook)"
      ]
    },
    {
      id: "apps",
      title: "Apps e sites",
      subtitle: "Expanda seu alcance com anúncios em sites e apps externos",
      options: [
        "Nativo, banner e intersticial",
        "Vídeos com incentivo"
      ]
    }
  ]

  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          Passo 2 de 3: Conjunto
        </h3>
        <p className="text-sm text-muted-foreground">Defina localização, demografia, intenções via IA e posicionamento de mídia.</p>
      </div>

      <Card className="p-5 border-border/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-500" /> Localização da Campanha
          </h4>
          <span className="text-xs text-blue-500 font-medium cursor-pointer">Alterar Ponto no Mapa</span>
        </div>
        
        <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg bg-background">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <MapPin className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">{data.location}</p>
              <p className="text-xs text-muted-foreground">Localização Selecionada</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 px-2 py-1.5 rounded-md border border-border/50">
            <Target className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-xs font-medium text-blue-500">Raio de 5 km</span>
          </div>
        </div>
      </Card>

      <Card className="p-5 border-border/60 shadow-sm space-y-4">
        <h4 className="text-sm font-semibold">Faixa Etária do Público</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground">Idade Mínima</label>
            <div className="relative">
              <Input 
                type="number" 
                value={data.minAge} 
                onChange={(e) => updateData({ minAge: e.target.value })}
                className="h-9 pl-9" 
              />
              <div className="absolute left-3 top-2.5 text-muted-foreground">
                <span className="text-xs">📅</span>
              </div>
              <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">anos</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground">Idade Máxima</label>
            <div className="relative">
              <Input 
                type="number" 
                value={data.maxAge}
                onChange={(e) => updateData({ maxAge: e.target.value })}
                className="h-9 pl-9" 
              />
              <div className="absolute left-3 top-2.5 text-muted-foreground">
                <span className="text-xs">📅</span>
              </div>
              <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">anos</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-5 border-border/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Público / Interesses (Palavras-chave)</h4>
          <Badge variant="secondary" className="text-[10px] bg-muted font-normal">Semântica Estrita</Badge>
        </div>
        
        <div className="p-4 border border-blue-500/20 rounded-lg bg-blue-500/5 space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">DESCUBRA O PÚBLICO COM IA</span>
          <div className="flex gap-2">
            <Input placeholder="Ex: Pessoas interessadas em comida rápida..." className="h-9 flex-1 bg-background" />
            <Button size="sm" type="button" className="h-9 bg-blue-600 hover:bg-blue-700">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Sugerir
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Input 
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddInterest()
              }
            }}
            placeholder="Ou digite um termo manualmente..." 
            className="h-9 flex-1" 
          />
          <Button type="button" onClick={handleAddInterest} size="sm" variant="secondary" className="h-9">Adicionar</Button>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {data.interests.map((interest, idx) => (
            <Badge key={idx} variant="secondary" className="px-2.5 py-1 text-xs font-normal flex items-center gap-1 bg-muted/80">
              {interest} 
              <X onClick={() => handleRemoveInterest(interest)} className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-red-500" />
            </Badge>
          ))}
          {data.interests.length === 0 && (
            <p className="text-xs text-muted-foreground italic">Nenhum interesse adicionado ainda.</p>
          )}
        </div>
      </Card>

      <Card className="border-border/60 shadow-sm overflow-hidden bg-background">
        <div className="p-4 bg-muted/20 border-b border-border/40 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold">Posicionamentos (Controle 100% Manual)</h4>
            <p className="text-xs text-muted-foreground mt-0.5">Escolha os locais exatos onde os criativos serão veiculados.</p>
          </div>
          <Badge variant="secondary" className="text-[10px] bg-blue-500/10 text-blue-600 border-none">{data.placements.length} Selecionados</Badge>
        </div>
        
        <div className="p-4 space-y-3">
          {placementGroups.map((group) => {
            const isOpen = openGroups.includes(group.id);
            return (
              <div key={group.id} className="border border-border/60 rounded-xl overflow-hidden bg-card transition-all">
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30"
                  onClick={() => toggleGroup(group.id)}
                >
                  <div>
                    <h5 className="text-sm font-bold">{group.title}</h5>
                    <p className="text-xs text-muted-foreground mt-0.5">{group.subtitle}</p>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                
                {isOpen && (
                  <div className="p-4 pt-0 border-t border-border/40 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mt-4">
                      {group.options.map((placement) => {
                        const isChecked = data.placements.includes(placement);
                        return (
                          <div 
                            key={placement} 
                            className="flex items-center gap-3 cursor-pointer group/item" 
                            onClick={() => togglePlacement(placement)}
                          >
                            {isChecked ? (
                              <CheckCircle2 className="w-5 h-5 text-[#0084ff] shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground/40 group-hover/item:text-muted-foreground shrink-0 transition-colors" />
                            )}
                            <span className={`text-sm font-medium ${isChecked ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {placement}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Fixed bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border/40 flex items-center justify-between gap-2 z-10">
        <Button onClick={onBack} variant="outline" size="sm" className="h-9 px-4">
          <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
        </Button>
        <Button onClick={onNext} size="sm" className="h-9 px-5">
          Avançar para Criativos <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
