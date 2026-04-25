import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { LogOut, Zap, Star, ShieldCheck, Calendar, Smartphone, Clock, UserCheck, Sparkles } from "lucide-react"

const tokensUsed = 340
const tokensTotal = 500
const profileCompletion = 85
const trajetsUsed = 18
const trajetsMax = 30
const plan = "Standard" // "Standard" | "Pro"

export function SidebarFooter() {
  const tokensRemaining = tokensTotal - tokensUsed
  const tokensPct = Math.round((tokensUsed / tokensTotal) * 100)
  const trajetsPct = Math.round((trajetsUsed / trajetsMax) * 100)

  return (
    <div className="mt-auto p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center gap-3 justify-start px-2 py-2 h-auto hover:bg-muted/60 rounded-xl transition-colors"
          >
            {/* Avatar avec indicateur de statut */}
            <div className="relative shrink-0">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Avatar utilisateur"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://ui-avatars.com/api/?name=Alex&background=0D8ABC&color=fff"
                }}
              />
              {/* Point de statut en ligne */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
            </div>

            {/* Infos */}
            <div className="flex flex-col items-start text-left min-w-0 flex-1 overflow-hidden">
              <div className="flex items-center gap-1.5 w-full">
                <p className="text-sm font-semibold leading-none truncate">Alex</p>
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 leading-none shrink-0">
                  Standard
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground truncate mt-0.5 w-full">
                Conducteur vérifié · 4.8 ⭐ · 124 avis
              </p>
            </div>

            {/* Chevron discret */}
            <svg
              className="w-3.5 h-3.5 text-muted-foreground shrink-0"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-72">

          {/* En-tête */}
          <DropdownMenuLabel>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold">Alex</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Plan {plan}
                </span>
              </div>
              {plan === "Standard" && (
                <Button
                  size="sm"
                  className="h-6 text-[10px] px-2 gap-1 bg-amber-500 hover:bg-amber-600 text-white"
                >
                  <Sparkles className="w-3 h-3" />
                  Passer au Pro
                </Button>
              )}
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* Crédits */}
          <div className="px-2 py-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Crédits restants
              </span>
              <span className="font-semibold text-foreground">
                {tokensRemaining}
                <span className="text-muted-foreground font-normal"> / {tokensTotal}</span>
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-500 transition-all"
                style={{ width: `${tokensPct}%` }}
              />
            </div>
          </div>

          {/* Trajets du mois */}
          <div className="px-2 pb-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                Trajets ce mois
              </span>
              <span className="font-semibold text-foreground">
                {trajetsUsed}
                <span className="text-muted-foreground font-normal"> / {trajetsMax}</span>
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-blue-500 transition-all"
                style={{ width: `${trajetsPct}%` }}
              />
            </div>
          </div>

          {/* Complétude du profil */}
          <div className="px-2 pb-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <UserCheck className="w-3.5 h-3.5" />
                Profil complété
              </span>
              <span className="font-semibold text-foreground">{profileCompletion}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Infos compte */}
          <div className="px-2 py-2 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Star className="w-3.5 h-3.5" />
                Note moyenne
              </span>
              <span className="font-medium text-foreground">4.8 / 5</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5" />
                Statut de vérification
              </span>
              <span className="font-medium text-emerald-600">Vérifié</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                Dernière connexion
              </span>
              <span className="font-medium text-foreground">Aujourd'hui 08h14</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Smartphone className="w-3.5 h-3.5" />
                Appareil actif
              </span>
              <span className="font-medium text-foreground">Android · Chrome</span>
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Déconnexion */}
          <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-500/10">
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}