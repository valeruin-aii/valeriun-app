import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppLayout } from "@/components/app-layout"
import { CampaignDashboard } from "@/pages/campaign-dashboard"
import { AgentAIPage } from "@/pages/agent-ai"
import { IntegrationsPage } from "@/pages/integrations"
import { PlaceholderPage } from "@/pages/placeholder"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout><CampaignDashboard /></AppLayout>} />
        <Route path="/agent-ai" element={<AgentAIPage />} />
        <Route path="/relatorios" element={<AppLayout><CampaignDashboard /></AppLayout>} />
        <Route path="/integracoes" element={<AppLayout><IntegrationsPage /></AppLayout>} />
        <Route path="/perfil" element={<AppLayout><PlaceholderPage title="Perfil" /></AppLayout>} />
        <Route path="/plano" element={<AppLayout><PlaceholderPage title="Plano" /></AppLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
