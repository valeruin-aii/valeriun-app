import * as React from "react"
import { Settings2, X } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { Badge } from "@workspace/ui/components/badge"
import { CampaignStep } from "./steps/campaign-step"
import { AudienceStep } from "./steps/audience-step"
import { AdStep } from "./steps/ad-step"

export interface CampaignData {
  // Step 1
  accountId: string
  pageId: string
  campaignName: string
  objective: string
  budget: string
  bidStrategy: string
  schedule: string
  spendingLimit: string
  startDate: string
  endDate: string

  // Step 2
  location: string
  minAge: string
  maxAge: string
  interests: string[]
  placements: string[]

  // Step 3
  abTestEnabled: boolean
  titles: string[]
  descriptions: string[]
  callToAction: string
  destinationUrl: string
}

const initialData: CampaignData = {
  accountId: "Corrente",
  pageId: "Cardapro - Cardápio Digital",
  campaignName: "Curso SaaS do Jeito Certo - Conversão",
  objective: "Engajamento (WhatsApp/Mensagens)",
  budget: "20",
  bidStrategy: "Valor Diário (Sem limite de lance)",
  schedule: "Rodar 24h (Orçamento Diário)",
  spendingLimit: "",
  startDate: "2026-09-11",
  endDate: "",
  location: "Rua do Bananal, Vila Cruzeiro do Sul",
  minAge: "18",
  maxAge: "40",
  interests: ["Hamburguerias Artesanais", "Pequenos Empreendedores Locais"],
  placements: ["Feed do Facebook", "Feed do Instagram"],
  abTestEnabled: true,
  titles: ["Crie seu SaaS do jeito certo", "Método SaaS Validado", "Do zero ao seu SaaS no ar", "Aprenda a criar SaaS hoje", "Vagas limitadas - Inscreva-se"],
  descriptions: [
    "Aprenda a criar seu SaaS do jeito certo e pare de perder tempo com erros que travam seu projeto. Clique em Saiba Mais e comece hoje!",
    "Marketing digital + SaaS é a combinação que mais fatura. Descubra o método certo e garanta sua vaga agora!",
    "Chega de tentar criar SaaS no achismo. Aprenda o caminho validado e coloque seu projeto para rodar com alta conversão e previsibilidade de receita."
  ],
  callToAction: "Saiba Mais",
  destinationUrl: "https://valeriun.ai/launchpad-saas"
}

interface CampaignSetupProps {
  onClose?: () => void
}

export function CampaignSetup({ onClose }: CampaignSetupProps = {}) {
  const [activeTab, setActiveTab] = React.useState("campanha")
  const [data, setData] = React.useState<CampaignData>(initialData)

  const updateData = (updates: Partial<CampaignData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const handlePublish = () => {
    console.log("Publishing campaign with data:", data)
    alert("Dados da campanha capturados no console!")
    if (onClose) onClose()
  }

  return (
    <div className="flex flex-col h-full bg-background border-l border-border/40">
      {/* Header */}
      <div className="p-4 border-b border-border/40 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Settings2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold flex items-center gap-2">
                Revisão e Configuração
                <Badge variant="secondary" className="text-[9px] uppercase tracking-wider bg-orange-500/10 text-orange-600 border-none font-bold">Rascunho Pronto</Badge>
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/30">
            <TabsTrigger value="campanha" className="text-xs py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <span className="flex items-center gap-1.5">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${activeTab === 'campanha' ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20'}`}>1</span>
                Campanha
              </span>
            </TabsTrigger>
            <TabsTrigger value="conjunto" className="text-xs py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <span className="flex items-center gap-1.5">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${activeTab === 'conjunto' ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20'}`}>2</span>
                Conjunto
              </span>
            </TabsTrigger>
            <TabsTrigger value="anuncio" className="text-xs py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <span className="flex items-center gap-1.5">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${activeTab === 'anuncio' ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20'}`}>3</span>
                Anúncio
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-muted/10">
        {activeTab === "campanha" && <CampaignStep data={data} updateData={updateData} onNext={() => setActiveTab("conjunto")} onCancel={onClose} />}
        {activeTab === "conjunto" && <AudienceStep data={data} updateData={updateData} onNext={() => setActiveTab("anuncio")} onBack={() => setActiveTab("campanha")} />}
        {activeTab === "anuncio" && <AdStep data={data} updateData={updateData} onBack={() => setActiveTab("conjunto")} onPublish={handlePublish} />}
      </div>
    </div>
  )
}
