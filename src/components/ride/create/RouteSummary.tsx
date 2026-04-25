"use client"

import { Route, Timer, Gauge, Coins, MapPin } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/* ─── Types ─────────────────────────────────────────────────────────────────── */

interface Props {
  distance: number
  duration: number
  estimatedPrice: number | null
  stopsCount?: number
}

/* ─── Composant principal ────────────────────────────────────────────────────── */

export function RouteSummary({ distance, duration, estimatedPrice, stopsCount = 0 }: Props) {
  if (!distance) return null

  const avgSpeed = duration > 0 ? Math.round(distance / (duration / 60)) : 0
  const hours    = Math.floor(duration / 60)
  const minutes  = Math.round(duration % 60)
  const durationLabel = hours > 0 ? `${hours}h${minutes > 0 ? ` ${minutes}min` : ""}` : `${minutes} min`

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="flex items-center gap-2 pt-2">
        <Route className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Résumé de votre trajet
        </span>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-2 gap-3">
        <InfoCard
          icon={Route}
          label="Distance totale"
          value={`${distance.toFixed(1)} km`}
        />

        <InfoCard
          icon={Timer}
          label="Durée estimée"
          value={durationLabel}
        />

        <InfoCard
          icon={Gauge}
          label="Vitesse moyenne"
          value={avgSpeed > 0 ? `${avgSpeed} km/h` : "—"}
        />

        <InfoCard
          icon={Coins}
          label="Prix suggéré"
          value={estimatedPrice != null ? `${estimatedPrice.toLocaleString()} Ar` : "—"}
          highlight
        />

        {/* Carte arrêts uniquement si > 0 */}
        {stopsCount > 0 && (
          <InfoCard
            icon={MapPin}
            label="Arrêts intermédiaires"
            value={`${stopsCount} arrêt${stopsCount > 1 ? "s" : ""}`}
            className="col-span-2"
          />
        )}
      </div>

      {/* INFO BOX */}
      <div className="rounded-xl bg-muted/40 border border-border/40 px-4 py-3 space-y-1.5">
        <p className="text-xs font-medium text-foreground">
          À propos de ces estimations
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          La distance et la durée sont calculées sur l'itinéraire réel
          {stopsCount > 0 && `, en passant par ${stopsCount} arrêt${stopsCount > 1 ? "s" : ""}`}.
          Le{" "}
          <span className="font-medium text-foreground">prix suggéré</span>{" "}
          est basé sur le coût du carburant et le partage entre passagers.
          Vous pouvez l'ajuster librement selon le confort ou les conditions du trajet.
        </p>
      </div>

    </div>
  )
}

/* ─── InfoCard ───────────────────────────────────────────────────────────────── */

interface InfoCardProps {
  icon: LucideIcon
  label: string
  value: string
  highlight?: boolean
  className?: string
}

function InfoCard({ icon: Icon, label, value, highlight = false, className }: InfoCardProps) {
  return (
    <div className={`p-3 rounded-xl border ${
        highlight
          ? "bg-emerald-500/5 border-emerald-500/20"
          : "bg-muted/50 border-border/50"
      } ${className ?? ""}`}
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
        <Icon className={`w-3.5 h-3.5 shrink-0 ${highlight ? "text-emerald-500" : ""}`} />
        <span>{label}</span>
      </div>

      <div className={`text-sm font-semibold ${
          highlight ? "text-emerald-700 dark:text-emerald-400" : "text-foreground"
        }`}
      >
        {value}
      </div>
    </div>
  )
}