"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  RotateCcw,
  Route,
  Timer,
  Gauge,
  Coins,
  Info,
  MousePointerClick,
} from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { MapPicker } from "@/components/map/MapPicker"

type LatLngTuple = [number, number]

export default function CreateRidePage() {
  const [selecting, setSelecting] = useState<"from" | "to" | null>(null)

  const [routeInfo, setRouteInfo] = useState({
    distance: 0,
    duration: 0,
  })

  const [form, setForm] = useState({
    from: { label: "", lat: null as number | null, lng: null as number | null },
    to: { label: "", lat: null as number | null, lng: null as number | null },
    date: "",
    time: "",
    price: "",
    seats: "",
    description: "",
  })

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleMapSelect = (lat: number, lng: number) => {
    const label = `${lat.toFixed(5)}, ${lng.toFixed(5)}`

    if (selecting === "from") {
      setForm((prev) => ({
        ...prev,
        from: { label, lat, lng },
      }))
    }

    if (selecting === "to") {
      setForm((prev) => ({
        ...prev,
        to: { label, lat, lng },
      }))
    }

    setSelecting(null)
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

  const fromCoords: LatLngTuple | null =
    form.from.lat !== null && form.from.lng !== null
      ? [form.from.lat, form.from.lng]
      : null

  const toCoords: LatLngTuple | null =
    form.to.lat !== null && form.to.lng !== null
      ? [form.to.lat, form.to.lng]
      : null

  const estimatedPrice =
    routeInfo.distance > 0 ? Math.round(routeInfo.distance * 200) : null

  // Étapes complétées pour guider l'utilisateur
  const stepFromDone = !!fromCoords
  const stepToDone = !!toCoords
  const stepRouteDone = routeInfo.distance > 0
  const stepDetailsDone = form.date && form.time && form.price && form.seats

  return (
    <TooltipProvider>
      <div className="p-6 max-w-3xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Route className="w-5 h-5 text-emerald-500" />
          </div>

          <div>
            <h1 className="text-base font-semibold leading-none">
              Publier un trajet
            </h1>
            <p className="text-xs text-muted-foreground">
              Remplissez les 3 étapes ci-dessous pour mettre votre trajet en ligne en moins d'une minute.
            </p>
          </div>
        </div>

        {/* ÉTAPES VISUELLES */}
        <div className="grid grid-cols-3 gap-3">
          <StepBadge
            number={1}
            label="Choisir le trajet"
            done={stepFromDone && stepToDone}
            active={!stepFromDone || !stepToDone}
          />
          <StepBadge
            number={2}
            label="Vérifier l'itinéraire"
            done={stepRouteDone}
            active={stepFromDone && stepToDone && !stepRouteDone}
          />
          <StepBadge
            number={3}
            label="Renseigner les infos"
            done={!!stepDetailsDone}
            active={stepRouteDone && !stepDetailsDone}
          />
        </div>

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

            <div className="rounded-xl bg-muted/40 border border-border/40 px-4 py-3 space-y-1">
              <p className="text-xs font-medium text-foreground flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-500" />
                Comment ça marche ?
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cliquez sur <span className="font-medium text-foreground">« Départ »</span> puis placez un repère sur la carte à votre point de départ. Faites de même pour <span className="font-medium text-foreground">« Arrivée »</span>. L'itinéraire et le prix suggéré se calculent automatiquement.
              </p>
            </div>

          </CardHeader>

          <CardContent className="space-y-6">

            {/* LIEUX */}
            <div className="space-y-3">
              <LocationField
                label="Point de départ"
                placeholder={stepFromDone ? form.from.label : "Cliquez sur « Départ » puis placez un repère sur la carte"}
                value={form.from.label}
                active={selecting === "from"}
                done={stepFromDone}
                onClick={() => setSelecting(selecting === "from" ? null : "from")}
                color="text-emerald-500"
                tooltip="Cliquez ici, puis cliquez sur la carte pour choisir votre départ"
                buttonLabel="Départ"
              />

              <LocationField
                label="Destination"
                placeholder={stepToDone ? form.to.label : "Cliquez sur « Arrivée » puis placez un repère sur la carte"}
                value={form.to.label}
                active={selecting === "to"}
                done={stepToDone}
                onClick={() => setSelecting(selecting === "to" ? null : "to")}
                color="text-red-500"
                tooltip="Cliquez ici, puis cliquez sur la carte pour choisir votre destination"
                buttonLabel="Arrivée"
              />
            </div>

            {/* MAP */}
            {(selecting || fromCoords || toCoords) && (
              <div className="space-y-4">

                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Carte interactive
                  </span>
                </div>

                <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm h-[320px]">
                  {!selecting && !fromCoords && !toCoords ? (
                    <div className="h-full flex flex-col items-center justify-center gap-3 bg-muted/30">
                      <div className="w-8 h-8 rounded-full border-2 border-muted-foreground/20 border-t-emerald-500 animate-spin" />
                      <div className="text-center px-6">
                        <p className="text-sm font-medium">
                          Carte en attente
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Cliquez sur « Départ » ou « Arrivée » ci-dessus pour ouvrir la carte.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <MapPicker
                      from={fromCoords}
                      to={toCoords}
                      onSelect={handleMapSelect}
                      onRouteData={setRouteInfo}
                    />
                  )}
                </div>

                {selecting && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2 font-medium">
                    <MousePointerClick className="w-3.5 h-3.5" />
                    Cliquez maintenant sur la carte pour placer{" "}
                    {selecting === "from" ? "votre point de départ" : "votre destination"}
                  </p>
                )}

                {/* RÉSUMÉ DE ROUTE */}
                {routeInfo.distance > 0 && (
                  <>
                    <div className="flex items-center gap-2 pt-2">
                      <Route className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Résumé de votre trajet
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <InfoCard icon={Route} label="Distance totale" value={`${routeInfo.distance.toFixed(1)} km`} />
                      <InfoCard icon={Timer} label="Durée estimée" value={`${Math.round(routeInfo.duration)} min`} />
                      <InfoCard icon={Gauge} label="Vitesse moyenne" value={`${Math.round(routeInfo.distance / (routeInfo.duration / 60))} km/h`} />
                      <InfoCard
                        icon={Coins}
                        label="Prix suggéré"
                        value={estimatedPrice ? `${estimatedPrice} Ar` : "—"}
                        highlight
                      />
                    </div>

                    <div className="rounded-xl bg-muted/40 border border-border/40 px-4 py-3 space-y-2">
                      <p className="text-xs font-medium text-foreground">
                        À propos de ces estimations
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        La distance et la durée sont calculées sur l'itinéraire routier réel entre vos deux points. Le <span className="font-medium text-foreground">prix suggéré</span> est une base indicative — vous pouvez l'ajuster librement à l'étape suivante selon le confort, les arrêts prévus ou la demande.
                      </p>
                    </div>
                  </>
                )}

              </div>
            )}

            {/* SÉPARATEUR ÉTAPE 2 */}
            <div className="border-t border-border/50 pt-4 space-y-1">
              <p className="text-sm font-semibold">Étape 2 — Date, heure et tarif</p>
              <p className="text-xs text-muted-foreground">
                Indiquez quand vous partez, combien de places vous proposez et à quel prix. Ces infos sont affichées aux passagers lors de la recherche.
              </p>
            </div>

            {/* DATE / HEURE */}
            <div className="grid grid-cols-2 gap-4">
              <Field icon={Calendar} label="Date du départ">
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  placeholder="jj/mm/aaaa"
                />
              </Field>

              <Field icon={Clock} label="Heure de départ">
                <Input
                  type="time"
                  value={form.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                />
              </Field>
            </div>

            {/* PRIX / PLACES */}
            <div className="grid grid-cols-2 gap-4">
              <Field
                icon={DollarSign}
                label="Prix par passager (Ar)"
                hint={estimatedPrice ? `Suggestion : ${estimatedPrice} Ar` : undefined}
              >
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  placeholder={estimatedPrice ? `${estimatedPrice}` : "Ex : 5000"}
                />
              </Field>

              <Field
                icon={Users}
                label="Nombre de places"
                hint="Places disponibles pour les passagers"
              >
                <Input
                  type="number"
                  value={form.seats}
                  onChange={(e) => handleChange("seats", e.target.value)}
                  placeholder="Ex : 3"
                  min={1}
                  max={8}
                />
              </Field>
            </div>

            {/* SÉPARATEUR ÉTAPE 3 */}
            <div className="border-t border-border/50 pt-4 space-y-1">
              <p className="text-sm font-semibold">Étape 3 — Description (optionnel)</p>
              <p className="text-xs text-muted-foreground">
                Une bonne description rassure les passagers et augmente vos chances d'être choisi. Mentionnez ce qui rend votre trajet agréable : climatisation, musique, pauses prévues, politique sur les bagages, animaux acceptés, etc.
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-1.5">
              <Textarea
                placeholder="Ex : Voiture climatisée, musique douce, une pause café prévue à mi-chemin. Bagages en soute acceptés. Non-fumeur."
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline">Annuler</Button>
              <Button
                className="gap-2"
                disabled={!stepFromDone || !stepToDone || !form.date || !form.time || !form.price || !form.seats}
              >
                <Route className="w-4 h-4" />
                Publier le trajet
              </Button>
            </div>

            {(!stepFromDone || !stepToDone || !form.date || !form.time || !form.price || !form.seats) && (
              <p className="text-xs text-muted-foreground text-right">
                Complétez les champs obligatoires (départ, arrivée, date, heure, prix, places) pour pouvoir publier.
              </p>
            )}

          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}

// ─── Sous-composants ──────────────────────────────────────────────────────────

function StepBadge({
  number,
  label,
  done,
  active,
}: {
  number: number
  label: string
  done: boolean
  active: boolean
}) {
  return (
    <div
      className={`p-3 rounded-xl border text-xs flex items-center gap-2 transition-colors ${
        done
          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
          : active
          ? "bg-muted border-border font-medium text-foreground"
          : "bg-muted/30 border-border/40 text-muted-foreground"
      }`}
    >
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
          done
            ? "bg-emerald-500 text-white"
            : active
            ? "bg-foreground text-background"
            : "bg-muted-foreground/20 text-muted-foreground"
        }`}
      >
        {done ? "✓" : number}
      </span>
      {label}
    </div>
  )
}

function LocationField({
  label,
  value,
  placeholder,
  active,
  done,
  onClick,
  color,
  tooltip,
  buttonLabel,
}: {
  label: string
  value: string
  placeholder: string
  active: boolean
  done: boolean
  onClick: () => void
  color: string
  tooltip: string
  buttonLabel: string
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground flex items-center gap-1">
        <MapPin className={`w-3 h-3 ${color}`} />
        {label}
        {done && <span className="ml-1 text-emerald-500 text-[10px] font-medium">✓ Défini</span>}
      </Label>

      <div className="flex items-center gap-2">
        <Input
          value={value}
          placeholder={placeholder}
          readOnly
          className={done ? "text-foreground" : "text-muted-foreground"}
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="sm"
              variant={active ? "default" : done ? "outline" : "secondary"}
              onClick={onClick}
              className="shrink-0 text-xs"
            >
              <MapPin className="w-3.5 h-3.5 mr-1" />
              {done ? "Modifier" : buttonLabel}
            </Button>
          </TooltipTrigger>

          <TooltipContent className="text-xs max-w-[200px] text-center">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

function Field({
  icon: Icon,
  label,
  hint,
  children,
}: {
  icon: any
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground flex items-center gap-1">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </Label>
      {children}
      {hint && (
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      )}
    </div>
  )
}

function InfoCard({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: any
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className={`p-3 rounded-xl border ${highlight ? "bg-emerald-500/5 border-emerald-500/20" : "bg-muted/50 border-border/50"}`}>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
        <Icon className={`w-3.5 h-3.5 ${highlight ? "text-emerald-500" : ""}`} />
        {label}
      </div>
      <div className={`text-sm font-semibold ${highlight ? "text-emerald-700 dark:text-emerald-400" : ""}`}>
        {value}
      </div>
    </div>
  )
}