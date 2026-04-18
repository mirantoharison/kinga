"use client"

import {
  ArrowLeft,
  MoreVertical,
  Navigation,
  Phone,
  Star,
  Share2,
  Bell,
  BellOff,
  Info,
  Lock,
  Flag,
  Trash2,
  RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

interface Props {
  navigate: (path: string) => void
  muted: boolean
  setMuted: React.Dispatch<React.SetStateAction<boolean>>
  onRefresh: () => void
  ride: {
    from: string
    to: string
    driver: string
  }
}

export function DiscussionHeader({
  navigate,
  muted,
  setMuted,
  onRefresh,
  ride,
}: Props) {
  return (
    <div className="sticky top-0 z-10 bg-background border-b px-4 py-3 flex items-center gap-3 min-w-0">

      {/* BACK */}
      <button onClick={() => navigate("/messages")} className="shrink-0">
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* TITLE */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <p className="text-sm font-semibold truncate">
          Discussion entre {ride.driver} et Vous
        </p>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Navigation className="w-3 h-3 shrink-0" />
          <span className="truncate">
            {ride.from} → {ride.to}
          </span>
        </div>
      </div>

      {/* REFRESH */}
      <Button size="icon" variant="ghost" className="shrink-0" onClick={onRefresh}>
        <RefreshCw className="w-4 h-4" />
      </Button>

      {/* MENU */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="shrink-0">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
            Options
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="gap-2">
            <Phone className="w-4 h-4" />
            Appeler le conducteur
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-2">
            <Star className="w-4 h-4" />
            Évaluer le conducteur
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-2">
            <Share2 className="w-4 h-4" />
            Partager le trajet
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2"
            onClick={() => setMuted((v) => !v)}
          >
            {muted ? (
              <>
                <Bell className="w-4 h-4" />
                Activer les notifs
              </>
            ) : (
              <>
                <BellOff className="w-4 h-4" />
                Désactiver les notifs
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-2">
            <Info className="w-4 h-4" />
            Infos sur le trajet
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="gap-2">
            <Lock className="w-4 h-4" />
            Clôturer la discussion
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
            <Flag className="w-4 h-4" />
            Signaler
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
            <Trash2 className="w-4 h-4" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}