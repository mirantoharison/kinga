import { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { type LatLngExpression } from "leaflet"
import { RecenterMap } from "./RecenterMap"
import { AccuracyCircle } from "./AccuracyCircle"
import { MapOverlayControls, TILE_LAYERS } from "./MapControl"

interface Props {
  position: LatLngExpression
  accuracy?: number
  lat: number
  lng: number
}

export function MapDisplay({ position, accuracy, lat, lng }: Props) {
  const [tracking, setTracking] = useState(true)
  const [tileKey, setTileKey] = useState<keyof typeof TILE_LAYERS>("standard")

  const tile = TILE_LAYERS[tileKey]

  return (
    <div className="relative h-full w-full overflow-hidden">
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer key={tileKey} attribution={tile.attribution} url={tile.url} />

        <Marker position={position}>
          <Popup className="rounded-xl shadow-lg">
            <div className="text-sm font-medium">📍 Vous êtes ici</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {lat.toFixed(5)}, {lng.toFixed(5)}
            </div>
          </Popup>
        </Marker>

        {accuracy && <AccuracyCircle position={position} accuracy={accuracy} />}

        {tracking && (
          <RecenterMap lat={lat} lng={lng} accuracy={accuracy} autoFit={false} />
        )}

        <MapOverlayControls
          lat={lat}
          lng={lng}
          tracking={tracking}
          tileKey={tileKey}
          onToggleTracking={() => setTracking(t => !t)}
          onChangeTile={setTileKey}
        />
      </MapContainer>
    </div>
  )
}