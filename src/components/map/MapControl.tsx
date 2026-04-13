import { useMap } from "react-leaflet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ZoomIn, ZoomOut, Locate, Layers, Navigation
} from "lucide-react"

const TILE_LAYERS = {
  standard: {
    label: "Standard",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap contributors",
  },
  satellite: {
    label: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "&copy; Esri",
  },
  terrain: {
    label: "Terrain",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenTopoMap",
  },
}

interface Props {
  lat: number
  lng: number
  tracking: boolean
  tileKey: keyof typeof TILE_LAYERS
  onToggleTracking: () => void
  onChangeTile: (key: keyof typeof TILE_LAYERS) => void
}

function ZoomButtons() {
  const map = useMap()
  return (
    <div className="flex flex-col gap-1">
      <Button
        size="icon"
        variant="secondary"
        className="w-9 h-9 rounded-xl shadow-sm"
        onClick={() => map.zoomIn()}
      >
        <ZoomIn className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="secondary"
        className="w-9 h-9 rounded-xl shadow-sm"
        onClick={() => map.zoomOut()}
      >
        <ZoomOut className="w-4 h-4" />
      </Button>
    </div>
  )
}

function RecenterButton({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  return (
    <Button
      size="icon"
      variant="secondary"
      className="w-9 h-9 rounded-xl shadow-sm"
      onClick={() => map.setView([lat, lng], 15)}
    >
      <Locate className="w-4 h-4" />
    </Button>
  )
}

export { TILE_LAYERS }

export function MapOverlayControls({
  lat, lng, tracking, tileKey, onToggleTracking, onChangeTile
}: Props) {
  const tileKeys = Object.keys(TILE_LAYERS) as (keyof typeof TILE_LAYERS)[]

  return (
    <>
      {/* Zoom + recentrer — droite */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1">
        <ZoomButtons />
        <RecenterButton lat={lat} lng={lng} />
      </div>

      {/* Tracking — gauche */}
      <div className="absolute top-3 left-3 z-[1000] flex flex-col gap-1">
        <Button
          size="sm"
          variant={tracking ? "default" : "secondary"}
          className={`h-9 rounded-xl shadow-sm gap-1.5 text-xs font-medium ${
            tracking ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
          }`}
          onClick={onToggleTracking}
        >
          <Navigation className="w-3.5 h-3.5" />
          {tracking ? "Suivi actif" : "Suivre"}
        </Button>
      </div>

      {/* Sélecteur de tuile — bas */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[1000] flex gap-1">
        {tileKeys.map((key) => (
          <Badge
            key={key}
            variant={tileKey === key ? "default" : "secondary"}
            className={`cursor-pointer px-3 py-1 text-xs rounded-lg shadow-sm ${
              tileKey === key
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-white/90 hover:bg-white"
            }`}
            onClick={() => onChangeTile(key)}
          >
            {TILE_LAYERS[key].label}
          </Badge>
        ))}
      </div>
    </>
  )
}