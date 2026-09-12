import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Bot,
  TrendingUp,
  SlidersHorizontal,
  User,
  CreditCard,
  Megaphone,
  Settings,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar"

interface NavItem {
  title: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

interface NavGroup {
  title: string
  icon?: React.ComponentType<{ className?: string }>
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    title: "META ADS",
    icon: Megaphone,
    items: [
      {
        title: "Agente IA",
        url: "/agent-ai",
        icon: Bot,
        badge: "IA",
      },
      {
        title: "Relatórios",
        url: "/relatorios",
        icon: TrendingUp,
      },
    ],
  },
  {
    title: "CONFIGURAÇÕES",
    icon: Settings,
    items: [
      {
        title: "Integrações",
        url: "/integracoes",
        icon: SlidersHorizontal,
      },
      {
        title: "Perfil",
        url: "/perfil",
        icon: User,
      },
      {
        title: "Plano",
        url: "/plano",
        icon: CreditCard,
      },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()

  return (
    <Sidebar className="border-r border-border/80 bg-sidebar" {...props}>
      <SidebarHeader className="h-16 justify-center px-6 border-b border-border/40">
        <div className="flex items-center gap-3">
          {/* Logo Icon com barras/gradiente moderno */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div className="flex items-baseline">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Valeriun
            </span>
            <span className="text-lg font-bold tracking-tight text-primary">
              .ai
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 gap-4">
        {/* Item inicial: Dashboard */}
        <SidebarGroup className="p-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link to="/" />}
                isActive={location.pathname === "/"}
                className={`h-9 px-3 text-sm font-medium rounded-lg transition-all ${
                  location.pathname === "/"
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-primary/95 hover:text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60"
                }`}
              >
                <LayoutDashboard className={`h-4 w-4 ${location.pathname === "/" ? "text-primary-foreground" : "text-muted-foreground"}`} />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Grupos de navegação */}
        {navGroups.map((group) => {
          const GroupIcon = group.icon
          return (
            <SidebarGroup key={group.title} className="p-0">
              <SidebarGroupLabel className="flex items-center gap-2 px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-1">
                {GroupIcon && <GroupIcon className="h-3.5 w-3.5 opacity-70" />}
                <span>{group.title}</span>
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  {group.items.map((item) => {
                    const ItemIcon = item.icon
                    const isActive = location.pathname === item.url

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          render={<Link to={item.url} />}
                          isActive={isActive}
                          className={`h-9 px-3 text-sm font-medium rounded-lg transition-all ${
                            isActive
                              ? "bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-primary/95 hover:text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60"
                          }`}
                        >
                          <ItemIcon
                            className={`h-4 w-4 ${
                              isActive ? "text-primary-foreground" : "text-muted-foreground"
                            }`}
                          />
                          <span className="flex-1">{item.title}</span>

                          {item.badge && (
                            <SidebarMenuBadge
                              className={`ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                isActive
                                  ? "bg-primary-foreground/20 text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {item.badge}
                            </SidebarMenuBadge>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
