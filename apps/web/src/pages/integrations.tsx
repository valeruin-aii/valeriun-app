import * as React from "react"
import { Plus, RefreshCw, Unplug, Settings, Trash2, Search, Sparkles } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"

export function IntegrationsPage() {
  const [activeTab, setActiveTab] = React.useState("meta")

  const accounts = [
    {
      company: "Vitta Suplementos",
      segment: "E-commerce D2C",
      accountName: "Conta Escala Black Friday",
      accountId: "act_882910291",
      bm: "Vitta Global Business",
      platform: "Meta Ads",
      initials: "VS",
      isGoogle: false,
    },
    {
      company: "Bella Cosméticos",
      segment: "Cosméticos & Skincare",
      accountName: "Bella Performance Brasil",
      accountId: "act_339102948",
      bm: "Bella Holding BM",
      platform: "Meta Ads",
      initials: "BC",
      isGoogle: false,
    },
    {
      company: "Dr. Implantes",
      segment: "Rede Odontológica",
      accountName: "Google Search Local SP",
      accountId: "492-381-0021",
      bm: "MCC Agência Central",
      platform: "Google Ads",
      initials: "DI",
      isGoogle: true,
    },
    {
      company: "TechStore E-com",
      segment: "Varejo Eletrônico",
      accountName: "Shopping & Performance Max",
      accountId: "812-401-9231",
      bm: "MCC Agência Central",
      platform: "Google Ads",
      initials: "TE",
      isGoogle: true,
    },
    {
      company: "Alpha Coaching",
      segment: "Infoproduto & Mentorias",
      accountName: "Infoproduto Escala Q4",
      accountId: "act_771920381",
      bm: "Alpha Media Group",
      platform: "Meta Ads",
      initials: "AC",
      isGoogle: false,
    },
    {
      company: "Mobili Casa Design",
      segment: "Móveis e Decoração",
      accountName: "Catálogo Dynamic Ads",
      accountId: "act_992102456",
      bm: "Mobili Brand Hub",
      platform: "Meta Ads",
      initials: "MC",
      isGoogle: false,
    },
    {
      company: "EcoClean Solar",
      segment: "Energia Sustentável",
      accountName: "Geração de Leads B2B",
      accountId: "301-842-1994",
      bm: "MCC Agência Central",
      platform: "Google Ads",
      initials: "ES",
      isGoogle: true,
    },
  ]

  return (
    <div className="w-full p-4 md:p-8 pt-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
          CONFIGURAÇÕES DO WORKSPACE / <span className="text-blue-500">CANAIS & CONTAS</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
          Integrações & Contas de Anúncios
        </h1>
        <p className="text-sm text-muted-foreground">
          Conecte seus canais de tráfego pago e gerencie os acessos de Agentes Autônomos de IA.
        </p>
      </div>

      {/* TABS */}
      <div className="flex items-center gap-2 mb-6">
        <button 
          onClick={() => setActiveTab("todas")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'todas' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50'}`}
        >
          Todas
        </button>
        <button 
          onClick={() => setActiveTab("meta")}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${activeTab === 'meta' ? 'bg-[#0064e0] text-white' : 'text-muted-foreground hover:bg-muted/50'}`}
        >
          Meta Ads
        </button>
        <button 
          onClick={() => setActiveTab("google")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'google' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50'}`}
        >
          Google Ads
        </button>
      </div>

      {/* META ADS CARD */}
      <div className="border border-border/60 rounded-2xl p-6 bg-background shadow-sm relative overflow-hidden">
        
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0064e0]/10 text-[#0064e0] rounded-xl flex items-center justify-center font-bold text-xl">
              M
            </div>
            <div>
              <h3 className="text-lg font-bold">Meta Ads</h3>
              <p className="text-sm text-muted-foreground">Facebook & Instagram Ads</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            Sincronizado
          </div>
        </div>

        {/* Inner Card */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-border/40">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
              <AvatarImage src="https://i.pravatar.cc/150?u=lucas" />
              <AvatarFallback>LS</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-bold text-foreground">Lucas Silva (BM Oficial)</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Meta Business Account ID: 108429188210</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/40 text-xs font-medium">
            <span className="text-muted-foreground">4 contas ativas importadas</span>
            <span className="text-blue-500 font-semibold cursor-pointer">2 disponíveis para vincular</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button className="flex-1 bg-[#0064e0] hover:bg-[#0052c2] text-white h-10">
            <Search className="w-4 h-4 mr-2" /> Buscar Contas
          </Button>
          <Button variant="secondary" className="px-6 font-medium bg-muted hover:bg-muted/80 h-10">
            <Unplug className="w-4 h-4 mr-2" /> Desconectar
          </Button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="pt-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-3">
              Contas de Anúncios Cadastradas
              <Badge variant="secondary" className="bg-muted text-muted-foreground font-semibold">4 ativas</Badge>
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-xl">
              Gerenciamento direto de permissões, vinculação a BMs/MCCs e acionamento de Agentes Autônomos.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button variant="outline" className="h-9 font-medium shadow-sm">
              <RefreshCw className="w-3.5 h-3.5 mr-2" /> Sincronizar Todas
            </Button>
            <Button className="h-9 bg-[#0064e0] hover:bg-[#0052c2] text-white font-medium shadow-sm">
              <Plus className="w-4 h-4 mr-2" /> Importar Conta
            </Button>
          </div>
        </div>

        <div className="border border-border/60 rounded-xl overflow-hidden bg-background shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/40 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4">Empresa & Cliente</th>
                  <th className="px-5 py-4">Conta de Anúncios</th>
                  <th className="px-5 py-4">ID da Conta</th>
                  <th className="px-5 py-4">BM / MCC Vinculada</th>
                  <th className="px-5 py-4">Plataforma</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {accounts.map((acc, i) => (
                  <tr key={i} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${acc.isGoogle ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                          {acc.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{acc.company}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{acc.segment}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-semibold text-sm">
                      {acc.accountName}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground text-xs font-mono">
                      {acc.accountId}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground text-xs">
                      {acc.bm}
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant="secondary" className={`font-semibold px-2 py-0.5 border-none ${acc.isGoogle ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' : 'bg-[#0064e0]/10 text-[#0064e0] dark:bg-[#0064e0]/20'}`}>
                        {acc.platform}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        Ativa
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {acc.isGoogle ? (
                          <Button variant="secondary" size="sm" className="h-7 text-xs bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 font-bold border-none">
                            <Sparkles className="w-3 h-3 mr-1" /> Ver Agente IA
                          </Button>
                        ) : (
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-500 hover:bg-blue-500/10 hover:text-blue-600">
                            <Settings className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:bg-red-500/10 hover:text-red-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-[11px] text-muted-foreground font-medium">Mostrando 4 de 4 contas ativas no workspace</p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
            Todas as credenciais de OAuth válidas
          </div>
        </div>
      </div>
    </div>
  )
}
