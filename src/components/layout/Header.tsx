"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Moon, Sun, Bell, Globe, CreditCard, Clock, Car, MapPin, User, MessageCircle, Star } from "lucide-react"
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
import { useLocation, matchPath } from "react-router-dom"

export function Header() {
  const { theme, toggle } = useTheme()
  const [lang, setLang] = useState("fr")
  const location = useLocation()

  const routeTitles: Record<string, string> = {
    "/": "Accueil",
    "/ride/search": "Rechercher un trajet",
    "/ride/create": "Proposer un trajet",
    "/rides": "Mes trajets",
    "/messages": "Messages",
    "/messages/archived": "Messages archivés",
    "/messages/:rideId": "Discussion privée",
    "/notifications": "Notifications",
    "/reviews": "Évaluations",
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

  // ✅ Fonction pour matcher dynamiquement les routes
  const getRouteTitle = () => {
    for (const path in routeTitles) {
      const match = matchPath({ path, end: true }, location.pathname)
      if (match) return routeTitles[path]
    }
    return "Accueil"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="h-14 flex items-center justify-between gap-3 px-4">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <SidebarTrigger />

          <div>
            <p className="text-sm font-medium">
              {getRouteTitle()}
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

            <DropdownMenuContent align="end" className="w-96 p-0">

              {/* HEADER */}
              <div className="px-4 py-3 border-b flex items-center justify-between">
                <p className="text-sm font-semibold">Notifications</p>
                <span className="text-[11px] text-muted-foreground">3 non lues</span>
              </div>

              {/* LIST */}
              <div className="max-h-[360px] overflow-y-auto">

                {/* TRAJET */}
                <div className="px-4 py-3 flex gap-3 hover:bg-muted/50 transition cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Car className="w-4 h-4 text-blue-500" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <p className="text-xs font-medium">
                      Nouvelle demande de réservation
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>Antananarivo → Mahajanga</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>Rakoto Jean</span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1">
                      <Clock className="w-3 h-3" />
                      <span>Il y a 2 min</span>
                    </div>
                  </div>

                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
                </div>

                {/* MESSAGE */}
                <div className="px-4 py-3 flex gap-3 hover:bg-muted/50 transition cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-violet-500" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <p className="text-xs font-medium">
                      Nouveau message reçu
                    </p>

                    <p className="text-[11px] text-muted-foreground line-clamp-2">
                      Le départ est confirmé pour 14h, merci d’arriver 10 minutes en avance.
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>Conducteur : Rabe Hery</span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1">
                      <Clock className="w-3 h-3" />
                      <span>Il y a 10 min</span>
                    </div>
                  </div>

                  <span className="w-2 h-2 bg-violet-500 rounded-full mt-1" />
                </div>

                {/* AVIS */}
                <div className="px-4 py-3 flex gap-3 hover:bg-muted/50 transition cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Star className="w-4 h-4 text-amber-500" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <p className="text-xs font-medium">
                      Nouvelle évaluation reçue
                    </p>

                    <p className="text-[11px] text-muted-foreground">
                      Note : 5/5 — Très bon trajet, conducteur ponctuel.
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>Par : Ando Sarah</span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1">
                      <Clock className="w-3 h-3" />
                      <span>Hier</span>
                    </div>
                  </div>
                </div>

                {/* PAIEMENT */}
                <div className="px-4 py-3 flex gap-3 hover:bg-muted/50 transition cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-emerald-500" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <p className="text-xs font-medium">
                      Paiement confirmé
                    </p>

                    <p className="text-[11px] text-muted-foreground">
                      +20 tokens ajoutés à votre solde
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <CreditCard className="w-3 h-3" />
                      <span>Référence : TRX-45821</span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1">
                      <Clock className="w-3 h-3" />
                      <span>Il y a 1h</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* FOOTER */}
              <div className="border-t p-2">
                <button className="w-full text-[11px] text-center text-primary hover:underline">
                  Voir toutes les notifications
                </button>
              </div>

            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  )
}