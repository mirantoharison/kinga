"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { RotateCcw, Info, Car } from "lucide-react"

import {
  TooltipProvider,
} from "@/components/ui/tooltip"

// 🔹 composants modulaires
import { CreateRideSteps } from "@/components/ride/create/CreateRideSteps"
import { LocationSection } from "@/components/ride/create/LocationSection"
import { MapSection } from "@/components/ride/create/MapSection"
import { RouteSummary } from "@/components/ride/create/RouteSummary"
import { RideDetailsForm } from "@/components/ride/create/RideDetailsForm"
import { RideDescription } from "@/components/ride/create/RideDescription"
import { RideActions } from "@/components/ride/create/RideAction"

// 🔹 utils
import { calculateRidePrice } from "@/lib/ridePricing"
import { getDefaultDateTime } from "@/lib/dateUtils"
import { reverseGeocode } from "@/lib/geocoding"

type LatLngTuple = [number, number]

export default function CreateRidePage() {

  /* ───────────────────────── STATE ───────────────────────── */

  const [selecting, setSelecting] = useState<"from" | "to" | null>(null)

  const [routeInfo, setRouteInfo] = useState({
    distance: 0,
    duration: 0,
  })

  const defaults = getDefaultDateTime()

  const [form, setForm] = useState({
    from: { label: "", lat: null as number | null, lng: null as number | null },
    to: { label: "", lat: null as number | null, lng: null as number | null },
    date: defaults.date,
    time: defaults.time,
    price: "",
    seats: "1",
    description: "",
  })

  /* ───────────────────────── HANDLERS ───────────────────────── */

  const applyLocation = async (
    lat: number,
    lng: number,
    initialLabel?: string,
    forceField?: "from" | "to"  // ← nouveau
  ) => {
    const currentSelecting = forceField ?? selecting
    if (!currentSelecting) return  // garde-fou inchangé

    const coordsText = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
    const fallbackLabel =
      initialLabel
        ? `${initialLabel} • ${coordsText}`
        : coordsText

    setForm((prev) => ({
      ...prev,
      from:
        currentSelecting === "from"
          ? { label: fallbackLabel, lat, lng }
          : prev.from,
      to:
        currentSelecting === "to"
          ? { label: fallbackLabel, lat, lng }
          : prev.to,
    }))

    setSelecting(null)

    // 🔥 skip si recherche
    if (initialLabel) return

    try {
      const labelName = await reverseGeocode(lat, lng)
      const label = `${labelName} • ${lat.toFixed(5)}, ${lng.toFixed(5)}`

      setForm((prev) => ({
        ...prev,
        from:
          currentSelecting === "from"
            ? { label, lat, lng }
            : prev.from,
        to:
          currentSelecting === "to"
            ? { label, lat, lng }
            : prev.to,
      }))
    } catch (e) {
      console.error(e)
    }
  }

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleMapSelect = (lat: number, lng: number) => {
    applyLocation(lat, lng)
  }

  const handleSearchSelect = (field: "from" | "to", lat: number, lng: number, label: string) => {
    const fullLabel = `${label} • ${lat.toFixed(5)}, ${lng.toFixed(5)}`
    applyLocation(lat, lng, fullLabel, field)
  }

  const resetPoints = () => {
    setForm((prev) => ({
      ...prev,
      from: { label: "", lat: null, lng: null },
      to: { label: "", lat: null, lng: null },
    }))
    setRouteInfo({ distance: 0, duration: 0 })
    setSelecting(null)
  }

  /* ───────────────────────── DERIVED STATE ───────────────────────── */

  const fromCoords: LatLngTuple | null =
    form.from.lat !== null && form.from.lng !== null
      ? [form.from.lat, form.from.lng]
      : null

  const toCoords: LatLngTuple | null =
    form.to.lat !== null && form.to.lng !== null
      ? [form.to.lat, form.to.lng]
      : null

  const estimatedPrice = calculateRidePrice(
    routeInfo.distance,
    Number(form.seats)
  )

  const stepFromDone = fromCoords !== null
  const stepToDone = toCoords !== null
  const stepRouteDone = routeInfo.distance > 0
  const stepDetailsDone =
    form.date && form.time && form.price && form.seats

  const canSubmit =
    stepFromDone &&
    stepToDone &&
    stepDetailsDone

  /* ───────────────────────── UI ───────────────────────── */

  return (
    <TooltipProvider>
      <div className="p-6 max-w-3xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Car className="w-5 h-5 text-emerald-500" />
          </div>

          <div>
            <h1 className="text-base font-semibold">
              Publier un trajet
            </h1>
            <p className="text-xs text-muted-foreground">
              Remplissez les étapes pour publier rapidement votre trajet
            </p>
          </div>
        </div>

        <Separator />

        {/* STEPS */}
        <CreateRideSteps
          stepFromDone={stepFromDone}
          stepToDone={stepToDone}
          stepRouteDone={stepRouteDone}
          stepDetailsDone={!!stepDetailsDone}
        />

        <Card>
          <CardHeader className="space-y-3">

            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Étape 1 — Votre itinéraire
              </CardTitle>

              {(fromCoords || toCoords) && (
                <Button variant="outline" size="sm" onClick={resetPoints}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Recommencer
                </Button>
              )}
            </div>

            {/* INFO */}
            <div className="rounded-xl bg-muted/40 border px-4 py-3 space-y-1">
              <p className="text-xs font-medium flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-500" />
                Comment ça marche ?
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cliquez sur <span className="font-medium text-foreground">« Départ »</span> puis placez un repère sur la carte pour indiquer votre point de départ. Faites de même avec <span className="font-medium text-foreground">« Arrivée »</span> pour définir votre destination.
                <br />
                Une fois les deux points sélectionnés, l’application calcule automatiquement <span className="font-medium text-foreground">l’itinéraire, la distance, la durée estimée</span> ainsi qu’un <span className="font-medium text-foreground">prix suggéré</span> basé sur le coût du trajet.
                <br />
                Vous pouvez ensuite ajuster librement les informations selon vos préférences (confort, arrêts, nombre de places…).
              </p>
            </div>

          </CardHeader>

          <CardContent className="space-y-6">

            {/* LOCATION */}
            <LocationSection
              from={form.from}
              to={form.to}
              selecting={selecting}
              setSelecting={setSelecting}
              onSearchSelectHandler={handleSearchSelect}
            />

            {/* MAP */}
            <MapSection
              selecting={selecting}
              fromCoords={fromCoords}
              toCoords={toCoords}
              onSelect={handleMapSelect}
              setRouteInfo={setRouteInfo}
            />

            {/* ROUTE SUMMARY */}
            <RouteSummary
              distance={routeInfo.distance}
              duration={routeInfo.duration}
              estimatedPrice={estimatedPrice}
            />

            {/* DETAILS */}
            <RideDetailsForm
              form={form}
              onChange={handleChange}
              estimatedPrice={estimatedPrice}
            />

            {/* DESCRIPTION */}
            <RideDescription
              description={form.description}
              onChange={(value) => handleChange("description", value)}
            />

            {/* ACTIONS */}
            <RideActions
              canSubmit={!!canSubmit}
              onSubmit={() => {
                console.log("submit ride", form)
              }}
              onCancel={() => {
                console.log("cancel")
              }}
            />

          </CardContent>
        </Card>

      </div>
    </TooltipProvider>
  )
}