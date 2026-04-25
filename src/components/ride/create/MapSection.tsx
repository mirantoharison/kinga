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

  const selectingLabel =
    selecting === "from" ? "point de départ" : "destination"

  return (
    <div className="space-y-3">

      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Carte interactive
        </span>

        <div className="flex-1 h-px bg-border" />

        {selecting && (
          <span
            className={`
              text-[10px] font-semibold px-2.5 py-0.5 rounded-full border animate-pulse
              ${selecting === "from"
                ? "text-emerald-600 bg-emerald-500/10 border-emerald-500/30"
                : "text-red-600 bg-red-500/10 border-red-500/30"
              }
            `}
          >
            Sélection active
          </span>
        )}
      </div>

      {/* Map container */}
      <div
        className={`
          relative rounded-2xl overflow-hidden h-[300px]
          border transition-all duration-300
          ${selecting
            ? selecting === "from"
              ? "border-emerald-500/40 shadow-lg shadow-emerald-500/10"
              : "border-red-500/40 shadow-lg shadow-red-500/10"
            : "border-border"
          }
          bg-muted
        `}
      >
        {!showMap ? (
          // Empty state
          <div className="h-full flex flex-col items-center justify-center gap-4">

            {/* Subtle grid decoration */}
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

                <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-[220px]">
                  Cliquez sur « Départ » ou « Arrivée » pour afficher la carte et placer vos points.
                </p>
              </div>
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

        {/* Selecting overlay hint */}
        {selecting && showMap && (
          <div
            className={`
              absolute bottom-3 left-1/2 -translate-x-1/2 z-[500]
              flex items-center gap-2 px-3.5 py-2 rounded-full
              backdrop-blur-sm border text-xs font-semibold
              shadow-xl pointer-events-none
              ${selecting === "from"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600"
                : "bg-red-500/10 border-red-500/30 text-red-600"
              }
            `}
          >
            <MousePointerClick className="w-3.5 h-3.5" />
            Cliquez pour placer votre {selectingLabel}
          </div>
        )}
      </div>
    </div>
  )
}