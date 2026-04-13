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
    <div className="relative h-full w-full">
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          key={tileKey}
          attribution={tile.attribution}
          url={tile.url}
        />

        <Marker position={position}>
          <Popup>Tu es ici 📍</Popup>
        </Marker>

        {accuracy && (
          <AccuracyCircle position={position} accuracy={accuracy} />
        )}

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