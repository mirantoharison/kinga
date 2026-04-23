"use client"

import { useState } from "react"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import {
  User,
  ShieldCheck,
  Star,
  MapPin,
  Heart,
  Lock,
  Car,
  ImagePlus,
} from "lucide-react"

import { LegalSection } from "@/components/profile/LegaleSection"
import { PublicSection } from "@/components/profile/PublicSection"
import { VehiculeSection } from "@/components/profile/VehicleSection"
import { ReviewSection } from "@/components/profile/ReviewSection"
import { InfoSection } from "@/components/profile/InfoSection"
import { ConnexionSection } from "@/components/profile/ConnexionSection"

/* ─────────────────────────────────────────
   MENU
───────────────────────────────────────── */
const menuItems = [
  { key: "profil",    label: "Profil public",        icon: ImagePlus  },
  { key: "info",      label: "Informations de base", icon: User       },
  { key: "connexion", label: "Connexion",             icon: Lock       },
  { key: "legal",     label: "Légal",                icon: ShieldCheck },
  { key: "vehicule",  label: "Véhicule",              icon: Car        },
  { key: "avis",      label: "Avis des utilisateurs", icon: Star      },
]

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ProfilePage() {
  const [active, setActive] = useState("info")
  const [liked, setLiked] = useState(false)

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">

      <Card className="overflow-hidden py-0">

        {/* ───────────── HEADER ───────────── */}
        <CardHeader className="p-0">

          <div className="relative w-full">
            <img
              src="https://i.pravatar.cc/600?img=12"
              className="w-full h-40 object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            <Button
              variant="outline"
              size="icon"
              onClick={() => setLiked(p => !p)}
              className={`absolute top-3 right-3 bg-background/80 backdrop-blur-sm ${liked ? "text-rose-500 border-rose-300" : ""}`}
            >
              <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
            </Button>

            <span className="absolute top-3 left-3 flex items-center gap-1.5 text-xs text-white bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              En ligne
            </span>
          </div>

          <div className="flex items-end gap-3 px-4 md:px-5 -mt-10 pb-4">
            <div className="relative flex-shrink-0">
              <img
                src="https://i.pravatar.cc/150?img=12"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover ring-4 ring-background shadow-md"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base md:text-lg font-semibold">Alex Rakoto</h1>
                <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Vérifié
                </Badge>
              </div>
              <div className="flex items-center gap-2 md:gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  Antananarivo • Conducteur
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                  <span className="font-medium text-foreground">4.8</span>
                  (124 avis)
                </span>
              </div>
            </div>
          </div>

        </CardHeader>

        {/* ───────────── BODY ───────────── */}
        <CardContent className="p-0 border-t">

          {/* Mobile : nav horizontale */}
          <div className="flex md:hidden border-b overflow-x-auto scrollbar-none">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.key}
                  onClick={() => setActive(item.key)}
                  className={cn(
                    "flex-shrink-0 flex items-center gap-1.5 text-xs px-4 py-3 border-b-2 transition whitespace-nowrap",
                    active === item.key
                      ? "border-foreground font-medium text-foreground"
                      : "border-transparent text-muted-foreground"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              )
            })}
          </div>

          <div className="flex">

            {/* Sidebar desktop */}
            <div className="hidden md:block w-[200px] border-r py-4 px-2 space-y-0.5 flex-shrink-0">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.key}
                    onClick={() => setActive(item.key)}
                    className={cn(
                      "w-full flex items-center gap-2 text-left text-xs px-2.5 py-1.5 rounded-md transition",
                      active === item.key
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                )
              })}
            </div>

            {/* Contenu */}
            <div className="flex-1 min-w-0 p-4 md:p-6 space-y-4">
              {active === "profil"    && <PublicSection />}
              {active === "info"      && <InfoSection />}
              {active === "connexion" && <ConnexionSection />}
              {active === "legal"     && <LegalSection />}
              {active === "vehicule"  && <VehiculeSection />}
              {active === "avis"      && <ReviewSection />}
            </div>

          </div>
        </CardContent>

      </Card>
    </div>
  )
}