import { useEffect, useState } from "react"
import L, { type LatLngExpression } from "leaflet"
import { LocateFixed } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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

  const position: LatLngExpression | null = averaged
    ? [averaged.latitude, averaged.longitude]
    : null

  const handleReset = () => setSamples([])

  return (
    <div className="flex flex-col h-dvh w-full max-w-[430px] mx-auto bg-muted overflow-hidden">

      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-6 pb-3">
        <LocateFixed className="w-5 h-5 text-emerald-500" />
        <span className="text-lg font-semibold tracking-tight">Ma position</span>
        {coords && (
          <Badge variant="secondary" className="ml-auto text-emerald-600 bg-emerald-50">
            GPS actif
          </Badge>
        )}
      </div>

      {/* Inputs GPS */}
      <GpsInputs
        latitude={averaged?.latitude}
        longitude={averaged?.longitude}
        accuracy={coords?.accuracy}
        sampleCount={samples.length}
      />

      {/* Contrôles */}
      <div className="mt-3">
        <GpsControls
          latitude={averaged?.latitude}
          longitude={averaged?.longitude}
          onRefresh={getLocation}
          onReset={handleReset}
        />
      </div>

      {/* Carte */}
      <div
        className="mx-4 my-3 rounded-2xl overflow-hidden border border-border/50"
        style={{ height: "calc(100dvh - 290px)" }}
      >
        {!position ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 bg-background">
            <div className="w-7 h-7 rounded-full border-2 border-muted-foreground/20 border-t-emerald-500 animate-spin" />
            <p className="text-sm text-muted-foreground">Localisation en cours...</p>
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
  )
}