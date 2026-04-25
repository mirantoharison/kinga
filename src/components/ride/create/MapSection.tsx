"use client"

import { type LatLngTuple } from "leaflet"
import { MapPin, MousePointerClick, Plus } from "lucide-react"
import { MapPicker } from "@/components/map/MapPicker"
import type { Stop } from "@/hooks/use-create-ride"

/* ─── Types ──────────────────────────────────────────────────────────────────── */

type SelectingMode = "from" | "to" | "stop" | null

interface Props {
  selecting: SelectingMode
  fromCoords: LatLngTuple | null
  toCoords: LatLngTuple | null
  stops?: Stop[]
  onSelect: (lat: number, lng: number) => void
  onAddStop?: (lat: number, lng: number) => void
  setRouteInfo: (data: { distance: number; duration: number }) => void
}

/* ─── Constantes ─────────────────────────────────────────────────────────────── */

const SELECTING_CONFIG = {
  from: {
    label: "point de départ",
    color: "emerald",
    badge: "text-emerald-600 bg-emerald-500/10 border-emerald-500/30",
    border: "border-emerald-500/40 shadow-emerald-500/10",
    overlay: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600",
  },
  to: {
    label: "destination",
    color: "red",
    badge: "text-red-600 bg-red-500/10 border-red-500/30",
    border: "border-red-500/40 shadow-red-500/10",
    overlay: "bg-red-500/10 border-red-500/30 text-red-600",
  },
  stop: {
    label: "arrêt intermédiaire",
    color: "blue",
    badge: "text-blue-600 bg-blue-500/10 border-blue-500/30",
    border: "border-blue-500/40 shadow-blue-500/10",
    overlay: "bg-blue-500/10 border-blue-500/30 text-blue-600",
  },
} as const

/* ─── Composant ──────────────────────────────────────────────────────────────── */

export function MapSection({
  selecting,
  fromCoords,
  toCoords,
  stops = [],
  onSelect,
  onAddStop,
  setRouteInfo,
}: Props) {
  const showMap = Boolean(fromCoords || toCoords || selecting || stops.length)
  const config  = selecting ? SELECTING_CONFIG[selecting] : null

  const handleMapClick = (lat: number, lng: number) => {
    if (selecting === "stop" && onAddStop) {
      onAddStop(lat, lng)
    } else {
      onSelect(lat, lng)
    }
  }

  return (
    <div className="space-y-3">

      {/* ── HEADER ── */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Carte interactive
        </span>

        <div className="flex-1 h-px bg-border" />

        {config && (
          <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border animate-pulse ${config.badge}`}>
            Sélection active
          </span>
        )}
      </div>

      {/* ── MAP CONTAINER ── */}
      <div className={`
        relative rounded-2xl overflow-hidden h-[300px] border transition-all duration-300 bg-muted
        ${config ? `shadow-lg ${config.border}` : "border-border"}
      `}>

        {!showMap ? (
          <EmptyState />
        ) : (
          <MapPicker
            from={fromCoords}
            to={toCoords}
            stops={stops}
            onSelect={handleMapClick}
            onRouteData={setRouteInfo}
          />
        )}

        {/* ── OVERLAY INSTRUCTION ── */}
        {config && showMap && (
          <div className={`
            absolute bottom-3 left-1/2 -translate-x-1/2 z-[500]
            flex items-center gap-2 px-3.5 py-2 rounded-full
            backdrop-blur-sm border text-xs font-semibold
            shadow-xl pointer-events-none
            ${config.overlay}
          `}>
            {selecting === "stop"
              ? <Plus className="w-3.5 h-3.5" />
              : <MousePointerClick className="w-3.5 h-3.5" />
            }
            Cliquez pour placer votre {config.label}
          </div>
        )}

        {/* ── STOPS BADGE ── */}
        {stops.length > 0 && (
          <div className="absolute top-3 right-3 z-[500] flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full bg-background/80 border border-border backdrop-blur font-medium">
            <MapPin className="w-3 h-3 text-muted-foreground" />
            {stops.length} arrêt{stops.length > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Empty state ────────────────────────────────────────────────────────────── */

function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      {/* Grille décorative */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
        <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center">
          <MapPin className="w-5 h-5 text-muted-foreground" />
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">
            Carte en attente
          </p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-[240px]">
            Sélectionnez un point de départ, une destination ou ajoutez des arrêts
            pour visualiser votre trajet.
          </p>
        </div>
      </div>
    </div>
  )
}