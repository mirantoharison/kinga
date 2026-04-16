import { useMap } from "react-leaflet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ZoomIn, ZoomOut, Locate, Navigation, Navigation2 } from "lucide-react"

export const TILE_LAYERS = {
  standard: {
    label: "Plan",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap contributors",
  },
  satellite: {
    label: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "&copy; Esri",
  },
  terrain: {
    label: "Relief",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenTopoMap",
  },
} as const

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
    <div className="flex flex-col gap-1 bg-background/90 backdrop-blur-md p-1 rounded-xl border border-border/50 shadow-lg">
      <Button
        size="icon"
        variant="ghost"
        className="w-8 h-8 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-600"
        onClick={() => map.zoomIn()}
      >
        <ZoomIn className="w-3.5 h-3.5" />
      </Button>
      <Separator className="mx-1" />
      <Button
        size="icon"
        variant="ghost"
        className="w-8 h-8 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-600"
        onClick={() => map.zoomOut()}
      >
        <ZoomOut className="w-3.5 h-3.5" />
      </Button>
    </div>
  )
}

function RecenterButton({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  return (
    <div className="bg-background/90 backdrop-blur-md p-1 rounded-xl border border-border/50 shadow-lg">
      <Button
        size="icon"
        variant="ghost"
        className="w-8 h-8 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-600"
        onClick={() => map.setView([lat, lng], 15)}
      >
        <Locate className="w-3.5 h-3.5" />
      </Button>
    </div>
  )
}

export function MapOverlayControls({ lat, lng, tracking, tileKey, onToggleTracking, onChangeTile }: Props) {
  const tileKeys = Object.keys(TILE_LAYERS) as (keyof typeof TILE_LAYERS)[]

  return (
    <>
      {/* Right controls — zoom & recenter */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-2">
        <ZoomButtons />
        <RecenterButton lat={lat} lng={lng} />
      </div>

      {/* Top-left — tracking toggle */}
      <div className="absolute top-3 left-3 z-[1000]">
        <Button
          size="sm"
          variant={tracking ? "default" : "outline"}
          className={`h-8 gap-1.5 px-2.5 text-xs rounded-lg shadow-lg ${
            tracking
              ? "bg-emerald-500 hover:bg-emerald-600 text-white border-0"
              : "bg-background/90 backdrop-blur-md border-border/50"
          }`}
          onClick={onToggleTracking}
        >
          {tracking
            ? <Navigation2 className="w-3 h-3 fill-white" />
            : <Navigation className="w-3 h-3" />
          }
          {tracking ? "Suivi actif" : "Suivre"}
        </Button>
      </div>

      {/* Bottom center — tile switcher */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[1000]">
        <div className="flex gap-1 bg-background/90 backdrop-blur-md px-1.5 py-1 rounded-xl border border-border/50 shadow-lg">
          {tileKeys.map((key) => (
            <button
              key={key}
              onClick={() => onChangeTile(key)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                tileKey === key
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              {TILE_LAYERS[key].label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}