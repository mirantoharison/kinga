"use client"

import { useState } from "react"

import {
  Car,
  Info,
  RotateCcw,
  MapPin,
  Route,
  Clock,
  Users
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { TooltipProvider } from "@/components/ui/tooltip"

// composants
import { CreateRideSteps } from "@/components/ride/create/CreateRideSteps"
import { LocationSection } from "@/components/ride/create/LocationSection"
import { MapSection } from "@/components/ride/create/MapSection"
import { RouteSummary } from "@/components/ride/create/RouteSummary"
import { RideDetailsForm } from "@/components/ride/create/RideDetailsForm"
import { RideDescription } from "@/components/ride/create/RideDescription"
import { RideActions } from "@/components/ride/create/RideAction"

// utils
import { calculateRidePrice } from "@/lib/ridePricing"
import { getDefaultDateTime } from "@/lib/dateUtils"
import { reverseGeocode } from "@/lib/geocoding"

type LatLngTuple = [number, number]

export default function CreateRidePage() {

  /* ───────────── STATE ───────────── */

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

  /* ───────────── HANDLERS ───────────── */

  const applyLocation = async (
    lat: number,
    lng: number,
    initialLabel?: string,
    forceField?: "from" | "to"
  ) => {
    const currentSelecting = forceField ?? selecting
    if (!currentSelecting) return

    const coordsText = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
    const fallbackLabel = initialLabel || coordsText

    setForm((prev) => ({
      ...prev,
      [currentSelecting]: { label: fallbackLabel, lat, lng },
    }))

    setSelecting(null)

    if (initialLabel) return

    try {
      const labelName = await reverseGeocode(lat, lng)
      const label = `${labelName} • ${coordsText}`

      setForm((prev) => ({
        ...prev,
        [currentSelecting]: { label, lat, lng },
      }))
    } catch (e) {
      console.error(e)
    }
  }

  const handleMapSelect = (lat: number, lng: number) => {
    applyLocation(lat, lng)
  }

  const handleSearchSelect = (
    field: "from" | "to",
    lat: number,
    lng: number,
    label: string
  ) => {
    applyLocation(lat, lng, label, field)
  }

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const resetPoints = () => {
    setForm((prev) => ({
      ...prev,
      from: { label: "", lat: null, lng: null },
      to: { label: "", lat: null, lng: null },
    }))
    setRouteInfo({ distance: 0, duration: 0 })
  }

  /* ───────────── DERIVED ───────────── */

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

  const canSubmit =
    fromCoords &&
    toCoords &&
    form.date &&
    form.time &&
    form.price &&
    form.seats

  /* ───────────── UI ───────────── */

  return (
    <TooltipProvider>
      <div className="p-6 max-w-4xl mx-auto space-y-6">

        {/* HEADER (style ListRide) */}
        <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Car className="w-5 h-5 text-emerald-500" />
          </div>

          <div className="flex-1">
            <h1 className="text-lg font-semibold">
              Publier un trajet
            </h1>

            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Cette page vous permet de proposer un trajet à la communauté.
              Définissez votre itinéraire, précisez les détails du voyage et
              publiez votre offre pour permettre à d’autres voyageurs de vous rejoindre.
              L’interface est conçue pour vous guider étape par étape de manière fluide.
            </p>
          </div>

          <Badge className="bg-emerald-50 text-emerald-600 border">
            Création
          </Badge>
        </div>

        {/* STEPS */}
        <CreateRideSteps
          stepFromDone={!!fromCoords}
          stepToDone={!!toCoords}
          stepRouteDone={routeInfo.distance > 0}
          stepDetailsDone={!!canSubmit}
        />

        {/* EXPLICATION */}
        <div className="text-xs text-muted-foreground leading-relaxed space-y-2">
          <p>
            Commencez par définir votre point de départ et votre destination.
            Une fois les deux positions renseignées, l’itinéraire sera automatiquement calculé avec une estimation de distance et de durée.
          </p>
          <p>
            Vous pourrez ensuite compléter les informations du trajet comme la date,
            le prix ou le nombre de places disponibles afin de finaliser votre publication.
          </p>
        </div>

        {/* CARD PRINCIPALE */}
        <Card>
          <CardHeader className="space-y-3">

            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Itinéraire et informations
              </CardTitle>

              {(fromCoords || toCoords) && (
                <Button variant="outline" size="sm" onClick={resetPoints}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Recommencer
                </Button>
              )}
            </div>

            <div className="rounded-xl bg-muted/40 border px-4 py-3 space-y-1">
              <p className="text-xs font-medium flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-500" />
                Fonctionnement
              </p>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Sélectionnez vos points sur la carte ou via la recherche.
                L’application calcule automatiquement les informations clés du trajet
                afin de vous faire gagner du temps.
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

            {/* SUMMARY */}
            <RouteSummary
              distance={routeInfo.distance}
              duration={routeInfo.duration}
              estimatedPrice={estimatedPrice}
            />

            <Separator />

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
              onSubmit={() => console.log("submit", form)}
              onCancel={() => console.log("cancel")}
            />

          </CardContent>
        </Card>

      </div>
    </TooltipProvider>
  )
}