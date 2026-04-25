"use client"

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet"
import { useEffect, useMemo, useState } from "react"

import { RoutePreview } from "./RoutePreview"
import { startIcon, endIcon } from "./MapPins"
import { MapOverlayControls, TILE_LAYERS } from "@/components/map/MapControl"

type LatLngTuple = [number, number]

type Stop = {
  label: string
  lat: number
  lng: number
}

/* ───────── CLICK HANDLER ───────── */

function ClickHandler({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void
}) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      onSelect(lat, lng)
    },
  })

  return null
}

/* ───────── MAP CENTER ───────── */

function MapCenter({
  points,
}: {
  points: LatLngTuple[]
}) {
  const map = useMap()

  useEffect(() => {
    if (!points.length) return

    if (points.length === 1) {
      map.setView(points[0], 13, { animate: true })
      return
    }

    const bounds = points
    map.fitBounds(bounds, { padding: [40, 40] })
  }, [points])

  return null
}

/* ───────── MAIN ───────── */

interface Props {
  from: LatLngTuple | null
  to: LatLngTuple | null
  stops?: Stop[]

  onSelect: (lat: number, lng: number) => void
  onRouteData?: (data: { distance: number; duration: number }) => void
}

export function MapPicker({
  from,
  to,
  stops = [],
  onSelect,
  onRouteData,
}: Props) {
  const [tracking, setTracking] = useState(false)
  const [tileKey, setTileKey] =
    useState<keyof typeof TILE_LAYERS>("standard")

  const tile = TILE_LAYERS[tileKey]

  /* ─── POINTS COMBINÉS ─── */

  const allPoints = useMemo<LatLngTuple[]>(() => {
    const pts: LatLngTuple[] = []

    if (from) pts.push(from)
    stops.forEach((s) => pts.push([s.lat, s.lng]))
    if (to) pts.push(to)

    return pts
  }, [from, to, stops])

  /* ─── CENTRE ─── */

  const center: LatLngTuple =
    from || to || (stops[0] ? [stops[0].lat, stops[0].lng] : [-18.8792, 47.5079])

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={center}
        zoom={13}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        {/* TILE */}
        <TileLayer
          key={tileKey}
          attribution={tile.attribution}
          url={tile.url}
        />

        {/* AUTO CENTER */}
        <MapCenter points={allPoints} />

        {/* ─── MARKERS ─── */}

        {from && <Marker position={from} icon={startIcon} />}

        {stops.map((stop, i) => (
          <Marker
            key={`stop-${i}`}
            position={[stop.lat, stop.lng]}
            // 👉 tu peux créer un stopIcon numéroté plus tard
          />
        ))}

        {to && <Marker position={to} icon={endIcon} />}

        {/* ─── ROUTE ─── */}

        <RoutePreview
          from={from}
          to={to}
          stops={stops} // 🔥 NOUVEAU
          onData={onRouteData}
        />

        {/* ─── CLICK ─── */}

        <ClickHandler onSelect={onSelect} />

        {/* ─── CONTROLS ─── */}

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