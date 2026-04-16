import {
  Home,
  Search,
  PlusCircle,
  Calendar,
  Car,
  History,
  MessageCircle,
  Star,
  CreditCard,
  Wallet,
  Settings,
  HelpCircle,
  Info,
} from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import { useNavigate, useLocation } from "react-router-dom"

const menus = [
  {
    label: "Navigation",
    items: [
      { label: "Accueil", icon: Home, path: "/" },
      { label: "Rechercher un trajet", icon: Search, path: "/search" },
      { label: "Proposer un trajet", icon: PlusCircle, path: "/create" },
    ],
  },
  {
    label: "Mes trajets",
    items: [
      { label: "Mes réservations", icon: Calendar, path: "/bookings" },
      { label: "Trajets proposés", icon: Car, path: "/my-rides" },
      { label: "Historique des trajets", icon: History, path: "/history" },
    ],
  },
  {
    label: "Communication",
    items: [
      { label: "Messages", icon: MessageCircle, path: "/messages" },
      { label: "Avis et évaluations", icon: Star, path: "/reviews" },
    ],
  },
  {
    label: "Paiements",
    items: [
      { label: "Mes paiements", icon: CreditCard, path: "/payments" },
      { label: "Portefeuille", icon: Wallet, path: "/wallet" },
    ],
  },
  {
    label: "Paramètres",
    items: [
      { label: "Préférences", icon: Settings, path: "/settings" },
      { label: "Aide", icon: HelpCircle, path: "/help" },
      { label: "À propos", icon: Info, path: "/about" },
    ],
  },
]

export function SidebarMenus() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      {menus.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

          <SidebarMenu>
            {group.items.map((item) => {
              const isActive = location.pathname === item.path

              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.path)}
                    className={isActive ? "bg-muted font-medium" : ""}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
