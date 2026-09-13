import * as React from "react"
import { Sheet, SheetContent } from "@workspace/ui/components/sheet"
import { CampaignSetup } from "@/components/agent/campaign-setup"
import { ChatArea } from "@/components/agent/chat-area"
import { Button } from "@workspace/ui/components/button"
import { ChevronDown, MessageSquarePlus } from "lucide-react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@workspace/ui/components/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export function AgentAIPage() {
  const [isCampaignSetupOpen, setIsCampaignSetupOpen] = React.useState(false)

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-svh w-full bg-[#0a0a0a] text-zinc-100 overflow-hidden font-sans">
        <AppSidebar />
        
        <SidebarInset className="flex flex-col flex-1 min-w-0 h-full bg-[#0a0a0a]">
          {/* Top Header */}
          <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 shrink-0 bg-[#0f0f0f]">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-zinc-400 hover:text-white hover:bg-white/5" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
                  f
                </div>
                <span className="font-semibold tracking-tight text-white hidden sm:inline-block">Lunna Ads IA</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-1.5 text-xs text-zinc-300">
                <span>Corrente</span>
                <ChevronDown className="w-3 h-3 ml-2 opacity-50" />
              </div>
              <div className="hidden md:flex items-center bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-1.5 text-xs text-zinc-300">
                <span>Cardapro - Cardápio Digital</span>
                <ChevronDown className="w-3 h-3 ml-2 opacity-50" />
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs px-3">
                <MessageSquarePlus className="w-3.5 h-3.5 sm:mr-1.5" />
                <span className="hidden sm:inline">Novo Chat</span>
              </Button>
            </div>
          </header>

          <div className="flex flex-1 min-h-0 overflow-hidden">
            {/* Sidebar Histórico */}
            <div className="w-64 border-r border-white/5 bg-[#0a0a0a] flex-col hidden lg:flex shrink-0">
              <div className="p-4">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Histórico de Campanhas</h3>
              </div>
              <div className="flex-1 overflow-y-auto px-2 space-y-1">
                <div className="bg-[#1e293b] text-blue-100 rounded-lg p-3 cursor-pointer border border-blue-500/20">
                  <p className="text-xs font-medium truncate">Criar anuncio, curso desenvolvimento ...</p>
                  <p className="text-[10px] text-blue-200/50 mt-1">11/09/2026</p>
                </div>
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#121212]">
              <ChatArea onToggleSetup={() => setIsCampaignSetupOpen(!isCampaignSetupOpen)} />
            </div>
          </div>
        </SidebarInset>

        {/* Global Sheet/Drawer for Campaign Setup (Overlay for all screen sizes) */}
        <Sheet open={isCampaignSetupOpen} onOpenChange={setIsCampaignSetupOpen}>
          <SheetContent 
            side="right" 
            className="w-full sm:w-[600px] lg:w-[800px] p-0 overflow-y-auto border-white/10 bg-[#121212] sm:max-w-none"
            style={{ maxWidth: '800px' }}
          >
            <CampaignSetup onClose={() => setIsCampaignSetupOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </SidebarProvider>
  )
}

