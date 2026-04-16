"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Moon, Sun, Bell, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { useEffect, useState } from "react"
import { useTheme } from "@/hooks/use-theme"
import { useLocation } from "react-router-dom"

export function Header() {
  const { theme, toggle } = useTheme()
  const [lang, setLang] = useState("fr")
  const location = useLocation()
  const routeTitles: Record<string, string> = {
    "/": "Accueil",
    "/search": "Rechercher un trajet",
    "/ride/create": "Proposer un trajet",
    "/rides": "Mes trajets",
    "/messages": "Messages",
    "/payments": "Paiements",
    "/settings": "Paramètres",
  }

  useEffect(() => {
    const saved = localStorage.getItem("lang")
    if (saved) setLang(saved)
  }, [])

  const changeLang = (value: string) => {
    setLang(value)
    localStorage.setItem("lang", value)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="h-14 flex items-center justify-between gap-3 px-4">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <SidebarTrigger />

          <div>
            <p className="text-sm font-medium">
              {routeTitles[location.pathname] || "Accueil"}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">

          {/* 🌍 Language */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Langue</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => changeLang("fr")}>
                🇫🇷 Français
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => changeLang("en")}>
                🇬🇧 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 🌙 Theme */}
          <Button variant="ghost" size="icon" onClick={toggle}>
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>

          {/* 🔔 Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                🚗 Nouvelle demande de trajet reçue
              </DropdownMenuItem>

              <DropdownMenuItem>
                💬 Nouveau message d’un passager
              </DropdownMenuItem>

              <DropdownMenuItem>
                ⭐ Vous avez reçu une nouvelle évaluation
              </DropdownMenuItem>

              <DropdownMenuItem>
                💳 Paiement confirmé avec succès
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  )
}
