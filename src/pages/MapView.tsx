import { useEffect, useState } from "react"
import L, { type LatLngExpression } from "leaflet"
import { LocateFixed, Satellite, Map, Layers } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useGeolocation } from "@/hooks/use-geolocation"
import { MapDisplay } from "@/components/map/MapDisplay"
import { GpsInputs } from "@/components/gps/GpsInputs"
import { GpsControls } from "@/components/gps/GpsControls"

import "leaflet/dist/leaflet.css"

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

const MAX_SAMPLES = 10

export default function MapView() {
  const { coords, getLocation } = useGeolocation()
  const [samples, setSamples] = useState<{ lat: number; lng: number }[]>([])

  useEffect(() => { getLocation() }, [])

  useEffect(() => {
    if (coords) {
      setSamples(prev => [
        ...prev.slice(-(MAX_SAMPLES - 1)),
        { lat: coords.latitude, lng: coords.longitude },
      ])
    }
  }, [coords])

  const averaged = samples.length > 0
    ? {
      latitude: samples.reduce((s, p) => s + p.lat, 0) / samples.length,
      longitude: samples.reduce((s, p) => s + p.lng, 0) / samples.length,
    }
    : null

  const position: LatLngExpression = averaged
    ? [averaged.latitude, averaged.longitude]
    : null

  const handleReset = () => setSamples([])

  return (
    <div className="min-h-dvh w-full max-w-[430px] mx-auto bg-background flex flex-col overflow-y-auto">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/50">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10">
            <LocateFixed className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="flex-1">
            <h1 className="text-base font-semibold tracking-tight leading-none">
              Suivi de position GPS
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Visualisez et améliorez la précision de votre localisation en temps réel
            </p>
          </div>

          {coords ? (
            <Badge variant="secondary" className="text-emerald-600 bg-emerald-50 border border-emerald-200 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse inline-block" />
              Signal GPS actif
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-amber-600 bg-amber-50 border border-amber-200 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 inline-block" />
              Recherche du signal…
            </Badge>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 px-4 py-4 pb-8">

        {/* Coordonnées */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Map className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Vos coordonnées actuelles
            </span>
          </div>

          <p className="text-xs text-muted-foreground mb-2">
            Ces valeurs sont mises à jour automatiquement et affinées à chaque nouveau relevé GPS.
          </p>

          <GpsInputs
            latitude={averaged?.latitude}
            longitude={averaged?.longitude}
            accuracy={coords?.accuracy}
            sampleCount={samples.length}
          />

          {samples.length > 0 && (
            <p className="text-[11px] text-muted-foreground mt-2">
              {samples.length} relevé{samples.length > 1 ? "s" : ""} collecté
              {samples.length > 1 && "s"} pour améliorer la précision.
            </p>
          )}
        </div>

        {/* Actions */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Actions disponibles
            </span>
          </div>

          <p className="text-xs text-muted-foreground mb-2">
            Rafraîchissez votre position ou réinitialisez les données pour repartir d’une base propre.
          </p>

          <GpsControls
            latitude={averaged?.latitude}
            longitude={averaged?.longitude}
            onRefresh={getLocation}
            onReset={handleReset}
          />
        </div>

        <Separator className="my-1" />

        {/* Carte */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Satellite className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Visualisation sur la carte
            </span>
          </div>

          <p className="text-xs text-muted-foreground mb-2">
            Votre position est affichée ci-dessous dès qu’un signal GPS fiable est disponible.
          </p>

          <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm" style={{ height: 340 }}>
            {!position ? (
              <div className="h-full flex flex-col items-center justify-center gap-3 bg-muted/30">
                <div className="w-8 h-8 rounded-full border-2 border-muted-foreground/20 border-t-emerald-500 animate-spin" />
                <div className="text-center px-6">
                  <p className="text-sm font-medium text-foreground">
                    Localisation en cours…
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Assurez-vous d’avoir autorisé l’accès à votre position dans votre navigateur ou appareil.
                  </p>
                </div>
              </div>
            ) : (
              <MapDisplay
                position={position}
                accuracy={coords?.accuracy}
                lat={averaged!.latitude}
                lng={averaged!.longitude}
              />
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="rounded-xl bg-muted/40 border border-border/40 px-4 py-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Pourquoi plusieurs relevés ?</span>{" "}
            La position GPS peut varier légèrement à chaque lecture. Cette application
            combine jusqu’à {MAX_SAMPLES} mesures pour lisser les variations et obtenir
            une position plus fiable.
          </p>

          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            💡 Astuce : restez immobile quelques secondes pour améliorer rapidement la précision.
          </p>
        </div>

      </div>
    </div>
  )
}