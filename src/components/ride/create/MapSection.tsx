"use client"

import { type LatLngTuple } from "leaflet"
import { MapPin, MousePointerClick } from "lucide-react"
import { MapPicker } from "@/components/map/MapPicker"

interface Props {
  selecting: "from" | "to" | null
  fromCoords: LatLngTuple | null
  toCoords: LatLngTuple | null
  onSelect: (lat: number, lng: number) => void
  setRouteInfo: (data: { distance: number; duration: number }) => void
}

export function MapSection({
  selecting,
  fromCoords,
  toCoords,
  onSelect,
  setRouteInfo,
}: Props) {
  const showMap = Boolean(fromCoords || toCoords || selecting)

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="flex items-center gap-2">
        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Carte interactive
        </span>
      </div>

      {/* MAP CONTAINER */}
      <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm h-[320px]">

        {!showMap ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 bg-muted/30">
            <div className="w-8 h-8 rounded-full border-2 border-muted-foreground/20 border-t-emerald-500 animate-spin" />
            <div className="text-center px-6">
              <p className="text-sm font-medium">
                Carte en attente
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Cliquez sur « Départ » ou « Arrivée » pour commencer.
              </p>
            </div>
          </div>
        ) : (
          <MapPicker
            from={fromCoords}
            to={toCoords}
            onSelect={onSelect}
            onRouteData={setRouteInfo}
          />
        )}
      </div>

      {/* INSTRUCTION */}
      {selecting && (
        <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2 font-medium">
          <MousePointerClick className="w-3.5 h-3.5" />
          Cliquez sur la carte pour placer{" "}
          {selecting === "from"
            ? "votre point de départ"
            : "votre destination"}
        </p>
      )}

    </div>
  )
}