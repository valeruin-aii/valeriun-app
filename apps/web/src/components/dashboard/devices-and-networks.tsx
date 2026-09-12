import { 
  Smartphone, 
  Monitor, 
  Tablet, 
  Lightbulb,
  Layers,
  MessageCircle,
  AtSign,
  HelpCircle,
  ArrowDown
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

// SVG Icons for Platforms
function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

interface DeviceItem {
  id: string
  rank: number
  name: string
  leads: number
  cpl: string
  cplColor: string
  invested: string
  type: "mobile" | "desktop" | "tablet" | "other"
}

const devicesData: DeviceItem[] = [
  {
    id: "android_smartphone",
    rank: 1,
    name: "Android Smartphone",
    leads: 621,
    cpl: "R$ 3.01",
    cplColor: "text-amber-500",
    invested: "R$ 1868.00",
    type: "mobile",
  },
  {
    id: "iphone",
    rank: 2,
    name: "Iphone",
    leads: 148,
    cpl: "R$ 2.92",
    cplColor: "text-amber-500",
    invested: "R$ 432.31",
    type: "mobile",
  },
  {
    id: "other",
    rank: 3,
    name: "Other",
    leads: 3,
    cpl: "R$ 4.40",
    cplColor: "text-rose-500",
    invested: "R$ 13.20",
    type: "other",
  },
  {
    id: "android_tablet",
    rank: 4,
    name: "Android Tablet",
    leads: 2,
    cpl: "R$ 1.66",
    cplColor: "text-emerald-500",
    invested: "R$ 3.32",
    type: "tablet",
  },
  {
    id: "desktop",
    rank: 5,
    name: "Desktop",
    leads: 0,
    cpl: "R$ 0.00",
    cplColor: "text-muted-foreground",
    invested: "R$ 0.13",
    type: "desktop",
  },
  {
    id: "ipad",
    rank: 6,
    name: "Ipad",
    leads: 0,
    cpl: "R$ 0.00",
    cplColor: "text-muted-foreground",
    invested: "R$ 0.06",
    type: "tablet",
  },
]

interface NetworkItem {
  id: string
  rank: number
  name: string
  impressions: string
  leads: number
  cpl: string
  cplColor: string
  invested: string
  platform: "instagram" | "facebook" | "whatsapp" | "audience" | "messenger" | "threads" | "unknown"
}

const networksData: NetworkItem[] = [
  {
    id: "instagram",
    rank: 1,
    name: "Instagram",
    impressions: "87.7k",
    leads: 459,
    cpl: "R$ 3.04",
    cplColor: "text-amber-500",
    invested: "R$ 1396.10",
    platform: "instagram",
  },
  {
    id: "facebook",
    rank: 2,
    name: "Facebook",
    impressions: "62.9k",
    leads: 277,
    cpl: "R$ 3.02",
    cplColor: "text-amber-500",
    invested: "R$ 836.85",
    platform: "facebook",
  },
  {
    id: "whatsapp",
    rank: 3,
    name: "Whatsapp",
    impressions: "7.9k",
    leads: 38,
    cpl: "R$ 2.18",
    cplColor: "text-emerald-500",
    invested: "R$ 82.68",
    platform: "whatsapp",
  },
  {
    id: "audience_network",
    rank: 4,
    name: "Audience Network",
    impressions: "25",
    leads: 0,
    cpl: "R$ 0.00",
    cplColor: "text-muted-foreground",
    invested: "R$ 1.33",
    platform: "audience",
  },
  {
    id: "messenger",
    rank: 5,
    name: "Messenger",
    impressions: "5",
    leads: 0,
    cpl: "R$ 0.00",
    cplColor: "text-muted-foreground",
    invested: "R$ 0.05",
    platform: "messenger",
  },
  {
    id: "threads",
    rank: 6,
    name: "Threads",
    impressions: "1",
    leads: 0,
    cpl: "R$ 0.00",
    cplColor: "text-muted-foreground",
    invested: "R$ 0.01",
    platform: "threads",
  },
  {
    id: "unknown",
    rank: 7,
    name: "Unknown",
    impressions: "0",
    leads: 0,
    cpl: "R$ 0.00",
    cplColor: "text-muted-foreground",
    invested: "R$ 0.00",
    platform: "unknown",
  },
]

interface PlacementItem {
  id: string
  name: string
  platform: "FACEBOOK" | "INSTAGRAM" | "WHATSAPP"
  invested: string
  cpc: string
  cpl: string
  results: string
  status: "MANTER" | "ANALISAR"
}

const placementsData: PlacementItem[] = [
  {
    id: "fb_feed",
    name: "Feed",
    platform: "FACEBOOK",
    invested: "R$ 524.49",
    cpc: "R$ 0.65",
    cpl: "R$ 2.87",
    results: "183 Leads",
    status: "MANTER",
  },
  {
    id: "ig_reels",
    name: "instagram reels",
    platform: "INSTAGRAM",
    invested: "R$ 521.37",
    cpc: "R$ 1.05",
    cpl: "R$ 2.70",
    results: "193 Leads",
    status: "MANTER",
  },
  {
    id: "ig_stories",
    name: "instagram stories",
    platform: "INSTAGRAM",
    invested: "R$ 452.01",
    cpc: "R$ 0.73",
    cpl: "R$ 3.01",
    results: "150 Leads",
    status: "MANTER",
  },
  {
    id: "ig_feed",
    name: "Feed",
    platform: "INSTAGRAM",
    invested: "R$ 422.44",
    cpc: "R$ 1.35",
    cpl: "R$ 3.64",
    results: "116 Leads",
    status: "MANTER",
  },
  {
    id: "fb_reels",
    name: "facebook reels",
    platform: "FACEBOOK",
    invested: "R$ 258.22",
    cpc: "R$ 0.89",
    cpl: "R$ 2.93",
    results: "88 Leads",
    status: "MANTER",
  },
  {
    id: "wa_status",
    name: "status",
    platform: "WHATSAPP",
    invested: "R$ 82.68",
    cpc: "R$ 0.71",
    cpl: "R$ 2.18",
    results: "38 Leads",
    status: "MANTER",
  },
  {
    id: "fb_reels_overlay",
    name: "facebook reels overlay",
    platform: "FACEBOOK",
    invested: "R$ 22.18",
    cpc: "R$ 0.19",
    cpl: "-",
    results: "0 Leads",
    status: "ANALISAR",
  },
  {
    id: "fb_instream",
    name: "Videos In-Stream",
    platform: "FACEBOOK",
    invested: "R$ 19.45",
    cpc: "R$ 0.28",
    cpl: "R$ 3.89",
    results: "5 Leads",
    status: "MANTER",
  },
  {
    id: "fb_stories",
    name: "facebook stories",
    platform: "FACEBOOK",
    invested: "R$ 4.83",
    cpc: "R$ 0.48",
    cpl: "-",
    results: "0 Leads",
    status: "ANALISAR",
  },
]

export function DevicesAndNetworks() {
  return (
    <TooltipProvider delay={100}>
      <div className="flex flex-col w-full">
        {/* Seção Superior: 2 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Coluna 1: Dispositivos que Convertem */}
          <div className="flex flex-col bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-bold tracking-tight text-foreground mb-4">
              Dispositivos que Convertem
            </h3>

            <div className="flex flex-col gap-2">
              {devicesData.map((device) => {
                const getRankBadge = (rank: number) => {
                  if (rank === 1) return "bg-amber-500/20 text-amber-400 border-amber-500/40"
                  if (rank === 2) return "bg-zinc-700/40 text-zinc-300 border-zinc-600/40"
                  return "bg-purple-500/15 text-purple-400 border-purple-500/30"
                }

                return (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/50 hover:bg-muted/40 hover:border-border transition-colors"
                  >
                    {/* Esquerda: Rank + Ícone + Nome */}
                    <div className="flex items-center gap-3">
                      <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold border ${getRankBadge(device.rank)}`}>
                        {device.rank}
                      </span>

                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                        device.type === "mobile" 
                          ? "bg-blue-500/15 text-blue-400" 
                          : "bg-purple-500/15 text-purple-400"
                      }`}>
                        {device.type === "mobile" && <Smartphone className="h-4 w-4" />}
                        {device.type === "desktop" && <Monitor className="h-4 w-4" />}
                        {device.type === "tablet" && <Tablet className="h-4 w-4" />}
                        {device.type === "other" && <Monitor className="h-4 w-4" />}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground">
                          {device.name}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                          {device.leads} Leads Gerados
                        </span>
                      </div>
                    </div>

                    {/* Direita: CPL + Investimento */}
                    <div className="flex flex-col items-end text-right">
                      <div className="text-sm font-bold">
                        <span className={device.cplColor}>{device.cpl}</span>
                        <span className="text-xs text-muted-foreground font-normal ml-0.5">/ lead</span>
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">
                        {device.invested} investido
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Coluna 2: Desempenho por Rede Social */}
          <div className="flex flex-col bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-bold tracking-tight text-foreground mb-4">
              Desempenho por Rede Social
            </h3>

            <div className="flex flex-col gap-2">
              {networksData.map((network) => {
                const getRankBadge = (rank: number) => {
                  if (rank === 1) return "bg-amber-500/20 text-amber-400 border-amber-500/40"
                  if (rank === 2) return "bg-zinc-700/40 text-zinc-300 border-zinc-600/40"
                  return "bg-purple-500/15 text-purple-400 border-purple-500/30"
                }

                const getNetworkIcon = (platform: NetworkItem["platform"]) => {
                  if (platform === "instagram") return <InstagramIcon className="h-4 w-4 text-pink-400" />
                  if (platform === "facebook") return <FacebookIcon className="h-3.5 w-3.5 text-blue-400" />
                  if (platform === "whatsapp") return <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
                  if (platform === "audience") return <Layers className="h-4 w-4 text-purple-400" />
                  if (platform === "messenger") return <MessageCircle className="h-4 w-4 text-blue-300" />
                  if (platform === "threads") return <AtSign className="h-4 w-4 text-zinc-400" />
                  return <HelpCircle className="h-4 w-4 text-zinc-500" />
                }

                return (
                  <div
                    key={network.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/50 hover:bg-muted/40 hover:border-border transition-colors"
                  >
                    {/* Esquerda: Rank + Ícone + Nome */}
                    <div className="flex items-center gap-3">
                      <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold border ${getRankBadge(network.rank)}`}>
                        {network.rank}
                      </span>

                      <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-xs">
                        {getNetworkIcon(network.platform)}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground">
                          {network.name}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                          {network.impressions} impr. • {network.leads} Leads Gerados
                        </span>
                      </div>
                    </div>

                    {/* Direita: CPL + Investimento */}
                    <div className="flex flex-col items-end text-right">
                      <div className="text-sm font-bold">
                        <span className={network.cplColor}>{network.cpl}</span>
                        <span className="text-xs text-muted-foreground font-normal ml-0.5">/ lead</span>
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">
                        {network.invested} investido
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Seção Inferior: Tabela de Análise de Posicionamentos */}
        <div className="flex flex-col bg-card border border-border/80 rounded-2xl p-6 shadow-sm mb-8">
          <div className="mb-6">
            <h3 className="text-base font-bold tracking-tight text-foreground">
              Análise de Posicionamentos
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Investimento, Custo por Lead (CPL) e resultados em cada canal específico.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/80 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="pb-3 pr-4 font-bold">
                    <div className="flex items-center gap-1.5">
                      <span>POSICIONAMENTO</span>
                      <Tooltip>
                        <TooltipTrigger render={<button type="button" className="text-amber-500/70 hover:text-amber-400 focus:outline-hidden" />}>
                          <Lightbulb className="h-3 w-3" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          Onde o anúncio foi exibido (Feed, Stories, Reels, etc).
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </th>

                  <th className="pb-3 px-4 font-bold">
                    <div className="flex items-center gap-1.5">
                      <span>PLATAFORMA</span>
                      <Tooltip>
                        <TooltipTrigger render={<button type="button" className="text-amber-500/70 hover:text-amber-400 focus:outline-hidden" />}>
                          <Lightbulb className="h-3 w-3" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          Aplicativo ou rede da Meta (Facebook, Instagram, WhatsApp).
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </th>

                  <th className="pb-3 px-4 font-bold">
                    <div className="flex items-center gap-1.5">
                      <span>INVESTIDO</span>
                      <ArrowDown className="h-3 w-3 text-blue-500" />
                      <Tooltip>
                        <TooltipTrigger render={<button type="button" className="text-amber-500/70 hover:text-amber-400 focus:outline-hidden" />}>
                          <Lightbulb className="h-3 w-3" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          Valor total gasto nesse posicionamento.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </th>

                  <th className="pb-3 px-4 font-bold">
                    <div className="flex items-center gap-1.5">
                      <span>CPC</span>
                      <Tooltip>
                        <TooltipTrigger render={<button type="button" className="text-amber-500/70 hover:text-amber-400 focus:outline-hidden" />}>
                          <Lightbulb className="h-3 w-3" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          Custo médio por clique no link.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </th>

                  <th className="pb-3 px-4 font-bold">
                    <div className="flex items-center gap-1.5">
                      <span>CPL (LEAD)</span>
                      <Tooltip>
                        <TooltipTrigger render={<button type="button" className="text-amber-500/70 hover:text-amber-400 focus:outline-hidden" />}>
                          <Lightbulb className="h-3 w-3" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          Custo médio por lead gerado no posicionamento.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </th>

                  <th className="pb-3 px-4 font-bold">
                    <div className="flex items-center gap-1.5">
                      <span>RESULTADOS</span>
                      <Tooltip>
                        <TooltipTrigger render={<button type="button" className="text-amber-500/70 hover:text-amber-400 focus:outline-hidden" />}>
                          <Lightbulb className="h-3 w-3" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          Volume de conversões ou leads entregues.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </th>

                  <th className="pb-3 pl-4 text-right font-bold">
                    <span>STATUS</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border/40">
                {placementsData.map((placement) => {
                  const getPlatformIcon = (platform: PlacementItem["platform"]) => {
                    if (platform === "FACEBOOK") return <FacebookIcon className="h-3.5 w-3.5 text-blue-400" />
                    if (platform === "INSTAGRAM") return <InstagramIcon className="h-3.5 w-3.5 text-pink-400" />
                    return <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-400" />
                  }

                  return (
                    <tr key={placement.id} className="hover:bg-muted/30 transition-colors">
                      {/* Posicionamento */}
                      <td className="py-3.5 pr-4 font-semibold text-foreground flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                          {getPlatformIcon(placement.platform)}
                        </div>
                        <span>{placement.name}</span>
                      </td>

                      {/* Plataforma */}
                      <td className="py-3.5 px-4 font-bold text-xs text-muted-foreground uppercase tracking-wider">
                        {placement.platform}
                      </td>

                      {/* Investido */}
                      <td className="py-3.5 px-4 font-semibold text-foreground">
                        {placement.invested}
                      </td>

                      {/* CPC */}
                      <td className="py-3.5 px-4 font-medium text-muted-foreground">
                        {placement.cpc}
                      </td>

                      {/* CPL */}
                      <td className="py-3.5 px-4 font-bold">
                        {placement.cpl === "-" ? (
                          <span className="text-muted-foreground">-</span>
                        ) : (
                          <span className="text-emerald-400">{placement.cpl}</span>
                        )}
                      </td>

                      {/* Resultados */}
                      <td className="py-3.5 px-4 font-bold text-foreground">
                        {placement.results}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 pl-4 text-right">
                        <span
                          className={`inline-flex items-center justify-center text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${
                            placement.status === "MANTER"
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                              : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                          }`}
                        >
                          {placement.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
