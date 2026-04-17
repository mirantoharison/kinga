"use client"

import { useCallback } from "react"
import { LocationField } from "./LocationField"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Location {
  label: string
  lat: number | null
  lng: number | null
}

export type SelectingField = "from" | "to" | null

interface LocationSectionProps {
  from: Location
  to: Location
  selecting: SelectingField
  setSelecting: (value: SelectingField) => void
  onSearchSelectHandler: (
    field: "from" | "to",
    lat: number,
    lng: number,
    label: string
  ) => void
}

// ─── Component ───────────────────────────────────────────────────────────────

export function LocationSection({
  from, to, selecting, setSelecting, onSearchSelectHandler,
}: LocationSectionProps) {
  const fromDone = !!(from.lat && from.lng)
  const toDone   = !!(to.lat && to.lng)

  const handleToggle = useCallback(
    (field: "from" | "to") => setSelecting(selecting === field ? null : field),
    [selecting, setSelecting]
  )

  const handleSelect = useCallback(
    (field: "from" | "to", lat: number, lng: number, label: string) =>
      onSearchSelectHandler(field, lat, lng, label),
    [onSearchSelectHandler]
  )

  return (
    <div className="space-y-3">
      <LocationField
        label="Point de départ"
        value={from.label}
        placeholder="Recherchez ou cliquez sur la carte…"
        active={selecting === "from"}
        done={fromDone}
        color="text-emerald-500"
        tooltip="Activez puis cliquez sur la carte pour définir le départ"
        buttonLabel="Départ"
        onClick={() => handleToggle("from")}
        onSearchSelectHandler={(lat, lng, label) => handleSelect("from", lat, lng, label)}
      />

      <LocationField
        label="Destination"
        value={to.label}
        placeholder="Recherchez ou cliquez sur la carte…"
        active={selecting === "to"}
        done={toDone}
        color="text-red-500"
        tooltip="Activez puis cliquez sur la carte pour définir la destination"
        buttonLabel="Arrivée"
        onClick={() => handleToggle("to")}
        onSearchSelectHandler={(lat, lng, label) => handleSelect("to", lat, lng, label)}
      />
    </div>
  )
}