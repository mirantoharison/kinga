"use client"

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet"
import { useEffect, useState } from "react"

import { RoutePreview } from "./RoutePreview"
import { startIcon, endIcon } from "./MapPins"

// 👉 contrôles de MapView
import { MapOverlayControls, TILE_LAYERS } from "@/components/map/MapControl"

type LatLngTuple = [number, number]

function ClickHandler({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  const [position, setPosition] = useState<LatLngTuple | null>(null)

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      const coords: LatLngTuple = [lat, lng]

      setPosition(coords)
      onSelect(lat, lng)
    },
  })

  return position ? <Marker position={position} /> : null
}

interface Props {
  from: LatLngTuple | null
  to: LatLngTuple | null
  onSelect: (lat: number, lng: number) => void
  onRouteData?: (data: { distance: number; duration: number }) => void
}

export function MapPicker({ from, to, onSelect, onRouteData }: Props) {
  const [tracking, setTracking] = useState(false)
  const [tileKey, setTileKey] = useState<keyof typeof TILE_LAYERS>("standard")

  const tile = TILE_LAYERS[tileKey]

  // 👉 centre intelligent
  const center: LatLngTuple = from || to || [-18.8792, 47.5079]

  return (
    <div className="relative h-full w-full">

      <MapContainer
        center={center}
        zoom={13}
        zoomControl={false} // ❗ important pour utiliser tes controls custom
        style={{ height: "100%", width: "100%" }}
      >
        {/* Tile dynamique */}
        <TileLayer
          key={tileKey}
          attribution={tile.attribution}
          url={tile.url}
        />

        {/* Pins */}
        {from && <Marker position={from} icon={startIcon} />}
        {to && <Marker position={to} icon={endIcon} />}

        {/* Route */}
        <RoutePreview
          from={from}
          to={to}
          onData={onRouteData}
        />

        {/* Click */}
        <ClickHandler onSelect={onSelect} />

        {/* 🔥 Controls réutilisés */}
        <MapOverlayControls
          lat={center[0]}
          lng={center[1]}
          tracking={tracking}
          tileKey={tileKey}
          onToggleTracking={() => setTracking((t) => !t)}
          onChangeTile={setTileKey}
        />

      </MapContainer>

    </div>
  )
}

function MapCenter({
  from,
  to,
}: {
  from: [number, number] | null
  to: [number, number] | null
}) {
  const map = useMap()

  useEffect(() => {
    if (to) {
      map.setView(to, 13, { animate: true })
    } else if (from) {
      map.setView(from, 13, { animate: true })
    }
  }, [from, to])

  return null
}