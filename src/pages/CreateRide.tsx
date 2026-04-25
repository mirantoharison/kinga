"use client"

import { useEffect, useState } from "react"
import {
  Car, RotateCcw, Map, Settings, FileText, Paperclip, CheckCircle2,
  Info,
  MapPin,
  Plus,
  Loader2,
  X,
  Search,
  Trash2,
  Globe,
  Clock,
  Zap,
  Luggage,
  Package,
  Shuffle,
  Volume2,
  Upload
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"

import { CreateRideSteps } from "@/components/ride/create/CreateRideSteps"
import { LocationSection } from "@/components/ride/create/LocationSection"
import { MapSection } from "@/components/ride/create/MapSection"
import { RouteSummary } from "@/components/ride/create/RouteSummary"
import { RideDetailsForm } from "@/components/ride/create/RideDetailsForm"
import { RideDescription } from "@/components/ride/create/RideDescription"
import { RideActions } from "@/components/ride/create/RideAction"

import { calculateRidePrice } from "@/lib/ridePricing"
import { getDefaultDateTime } from "@/lib/dateUtils"
import { reverseGeocode, searchLocation } from "@/lib/geocoding"
import { TabHeader } from "@/components/ride/create/RideTabHeader"

type LatLngTuple = [number, number]

const TABS = [
  { key: "route", label: "Itinéraire", icon: Map },
  { key: "details", label: "Détails", icon: Settings },
  { key: "description", label: "Description", icon: FileText },
  { key: "files", label: "Fichiers", icon: Paperclip, count: 2 },
] as const

type TabKey = typeof TABS[number]["key"]

export default function CreateRidePage() {

  /* ─── STATE ─── */
  const [activeTab, setActiveTab] = useState<TabKey>("route")
  const [selecting, setSelecting] = useState<"from" | "to" | null>(null)
  const [routeInfo, setRouteInfo] = useState({ distance: 0, duration: 0 })

  const [stops, setStops] = useState<
    { label: string; lat: number; lng: number }[]
  >([])

  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

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

  /* ─── HANDLERS ─── */
  const applyLocation = async (lat: number, lng: number, initialLabel?: string, forceField?: "from" | "to") => {
    const currentSelecting = forceField ?? selecting
    if (!currentSelecting) return
    const coordsText = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
    const fallbackLabel = initialLabel || coordsText
    setForm((prev) => ({ ...prev, [currentSelecting]: { label: fallbackLabel, lat, lng } }))
    setSelecting(null)
    if (initialLabel) return
    try {
      const labelName = await reverseGeocode(lat, lng)
      setForm((prev) => ({ ...prev, [currentSelecting]: { label: `${labelName} • ${coordsText}`, lat, lng } }))
    } catch { }
  }

  const handleMapSelect = (lat: number, lng: number) => applyLocation(lat, lng)
  const handleSearchSelect = (field: "from" | "to", lat: number, lng: number, label: string) =>
    applyLocation(lat, lng, label, field)
  const handleChange = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))
  const handleAddStop = (item: any) => {
    setStops(prev => [...prev, item])
    setQuery("")
    setResults([])
  }
  const handleRemoveStop = (index: number) => {
    setStops(prev => prev.filter((_, i) => i !== index))
  }
  const resetPoints = () => {
    setForm((prev) => ({ ...prev, from: { label: "", lat: null, lng: null }, to: { label: "", lat: null, lng: null } }))
    setRouteInfo({ distance: 0, duration: 0 })
  }

  /* ─── DERIVED ─── */
  const fromCoords: LatLngTuple | null =
    form.from.lat !== null && form.from.lng !== null ? [form.from.lat, form.from.lng] : null
  const toCoords: LatLngTuple | null =
    form.to.lat !== null && form.to.lng !== null ? [form.to.lat, form.to.lng] : null
  const estimatedPrice = calculateRidePrice(routeInfo.distance, Number(form.seats))
  const canSubmit = fromCoords && toCoords && form.date && form.time && form.price && form.seats

  useEffect(() => {
    if (query.length < 3) {
      setResults([])
      return
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true)
        const res = await searchLocation(query)
        setResults(res)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => clearTimeout(timeout)
  }, [query])

  /* ─── UI ─── */
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        <div className="p-6 max-w-3xl mx-auto space-y-6">

          {/* ── HEADER ── */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <Car className="w-5 h-5 text-emerald-500" />
            </div>

            <div className="flex-1 space-y-1">
              <h1 className="text-base font-semibold text-zinc-100 tracking-tight">
                Publier un trajet
              </h1>

              <p className="text-xs text-zinc-400 leading-relaxed">
                Définissez votre itinéraire en précisant un point de départ et une destination,
                puis complétez les informations du trajet pour le rendre visible aux passagers.
                Vous pouvez utiliser la recherche d’adresse, la carte interactive ou les coordonnées GPS
                pour positionner chaque point avec précision.
              </p>

              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Une localisation précise améliore la compréhension du trajet et facilite la mise en relation avec les passagers.
              </p>
            </div>
          </div>

          {/* ── SEPARATOR ── */}
          <div className="space-y-3">
            {/* Header du bloc */}
            <div className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Comprendre la création de trajet
              </span>
            </div>

            {/* Contenu */}
            <div className="text-xs text-zinc-400 leading-relaxed space-y-3">
              <p>
                Cette page vous permet de créer et publier un trajet en quelques étapes simples.
                Commencez par définir précisément votre point de départ et votre destination,
                soit en utilisant la recherche d’adresse, soit en sélectionnant directement un emplacement sur la carte interactive.
                Une fois votre itinéraire défini, vous pouvez compléter les informations essentielles du trajet
                telles que la date, l’heure, le nombre de places disponibles et le prix.
                Une estimation peut être proposée automatiquement en fonction de la distance calculée.
                Vous avez également la possibilité d’ajouter des informations complémentaires
                pour mieux informer les passagers, ainsi que des fichiers (photos, documents)
                afin de rendre votre annonce plus claire et plus attractive.
                Toutes les informations restent modifiables à tout moment avant la publication,
                ce qui vous permet d’ajuster votre trajet selon vos préférences.
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            {/* ── STEPS ── */}
            <CreateRideSteps
              stepFromDone={!!fromCoords}
              stepToDone={!!toCoords}
              stepRouteDone={routeInfo.distance > 0}
              stepDetailsDone={!!canSubmit}
            />

            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-500">
                Définissez votre point de départ et votre destination
              </p>

              {(fromCoords || toCoords) && (
                <button
                  onClick={resetPoints}
                  className="flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Réinitialiser l’itinéraire
                </button>
              )}
            </div>

            {/* Tab bar */}
            <div className="flex items-center border-b border-border pt-1 gap-6">
              {TABS.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.key
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`
  relative flex items-center gap-1.5 py-3 text-xs font-medium
  transition-colors duration-150 rounded-t-lg
  ${isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                      }
`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                    {"count" in tab && tab.count !== null && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">
                        {tab.count}
                      </span>
                    )}
                    {/* active indicator */}
                    <span
                      className={`
                        absolute left-0 right-0 -bottom-px h-[2px] rounded-full transition-all z-[10]
                        ${isActive ? "bg-emerald-500" : "bg-transparent"}
                      `}
                    />
                  </button>
                )
              })}
            </div>

            {/* Content */}
            <div className="space-y-6">

              {/* TAB 1 — ITINÉRAIRE */}
              {activeTab === "route" && (
                <div className="space-y-6 rounded-lg border border-border bg-card p-5">
                  <LocationSection
                    from={form.from}
                    to={form.to}
                    selecting={selecting}
                    setSelecting={setSelecting}
                    onSearchSelectHandler={handleSearchSelect}
                  />

                  <MapSection
                    selecting={selecting}
                    fromCoords={fromCoords}
                    toCoords={toCoords}
                    onSelect={handleMapSelect}
                    setRouteInfo={setRouteInfo}
                  />

                  <RouteSummary
                    distance={routeInfo.distance}
                    duration={routeInfo.duration}
                    estimatedPrice={estimatedPrice}
                  />
                </div>
              )}

              {/* TAB 2 — DÉTAILS */}
              {activeTab === "details" && (
                <div className="space-y-6 border border-border rounded-md p-4 bg-card/80">
                  {/* HEADER */}
                  <TabHeader
                    icon={Settings}
                    title="Détails du trajet"
                    description="Renseignez les informations essentielles de votre déplacement afin d’aider les conducteurs à comprendre votre besoin et proposer un trajet adapté."
                  />

                  {/* FORM */}
                  <RideDetailsForm
                    form={form}
                    onChange={handleChange}
                    estimatedPrice={estimatedPrice}
                  />

                  {/* ARRÊTS */}
                  <div className="space-y-4">

                    {/* HEADER */}
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                        Arrêts possibles
                      </p>
                      <p className="text-[11px] text-zinc-500">
                        Ajoutez des localités intermédiaires pour augmenter vos chances de trouver un conducteur.
                      </p>
                    </div>

                    {/* SEARCH BAR */}
                    <div className="relative">

                      {/* input */}
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                        <input
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Rechercher une ville, quartier..."
                          className="w-full text-xs pl-8 pr-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 outline-none placeholder:text-zinc-500"
                        />
                      </div>

                      {/* RESULTS */}
                      {query.length >= 3 && (
                        <div className="absolute z-10 mt-1 w-full bg-zinc-900 border border-zinc-800 rounded-md max-h-48 overflow-auto shadow-lg">

                          {loading && (
                            <div className="p-2 text-xs text-zinc-500 flex items-center gap-2">
                              <Loader2 className="w-3 h-3 animate-spin" />
                              Recherche...
                            </div>
                          )}

                          {!loading && results.map((item, i) => (
                            <button
                              key={i}
                              onClick={() => handleAddStop(item)}
                              className="w-full text-left px-3 py-2 text-xs hover:bg-zinc-800 transition flex items-center gap-2"
                            >
                              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="truncate">{item.label}</span>

                              <Plus className="w-3.5 h-3.5 ml-auto text-zinc-500" />
                            </button>
                          ))}

                          {!loading && results.length === 0 && (
                            <div className="p-2 text-xs text-zinc-500">
                              Aucun résultat
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* LISTE DES ARRÊTS */}
                    {stops.length > 0 && (
                      <div className="grid gap-2">
                        {stops.map((stop, i) => (
                          <div
                            key={i}
                            className="group flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-900/40 px-3 py-2 transition hover:border-zinc-700 hover:bg-zinc-900/60"
                          >
                            {/* LEFT */}
                            <div className="flex items-center gap-2 min-w-0">
                              <Globe className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                              <span className="text-xs text-zinc-300 truncate">
                                {stop.label}
                              </span>
                            </div>

                            {/* RIGHT (hover only) */}
                            <button
                              onClick={() => handleRemoveStop(i)}
                              className="
            opacity-0 group-hover:opacity-100
            transition-opacity duration-150
            flex items-center gap-1 text-[11px]
            text-zinc-500 hover:text-red-400
          "
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Supprimer
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* INFO */}
                    <p className="text-[11px] text-zinc-500 flex items-start gap-1.5">
                      <MapPin className="w-3 h-3 mt-[2px] text-zinc-500 flex-shrink-0" />
                      Ces arrêts permettent aux conducteurs de proposer des trajets partiels compatibles avec votre itinéraire.
                    </p>

                  </div>

                  {/* BUDGET */}
                  {!routeInfo.distance ? (
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">

                      <p className="text-xs font-medium text-zinc-300">
                        Estimation du prix
                      </p>

                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        Le prix estimatif de votre trajet n’est pas encore disponible, car l’itinéraire n’a pas été défini.
                        Pour calculer une estimation fiable, il est nécessaire de renseigner à la fois un point de départ et une destination.
                      </p>

                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        Une fois ces deux points sélectionnés, la plateforme calcule automatiquement la distance et la durée du trajet,
                        puis propose un prix indicatif basé sur ces éléments. Cette estimation vous aide à fixer un budget cohérent
                        et à faciliter la mise en relation avec les conducteurs.
                      </p>

                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        Vous pouvez définir votre itinéraire en utilisant la recherche d’adresse ou en sélectionnant directement les points sur la carte.
                      </p>

                    </div>
                  ) : (
                    <div className="rounded-lg bg-zinc-800/50 p-3 border border-zinc-700">
                      <p className="text-xs text-zinc-400">
                        Budget suggéré
                      </p>
                      <p className="text-sm font-semibold text-emerald-400">
                        {estimatedPrice.toLocaleString()} Ar
                      </p>
                      <p className="text-[11px] text-zinc-500">
                        Estimation basée sur la distance du trajet
                      </p>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 3 — DESCRIPTION */}
              {activeTab === "description" && (
                <div className="space-y-6 border border-border rounded-md p-4 bg-card/80">

                  {/* HEADER */}
                  <TabHeader
                    icon={FileText}
                    title="Présentation du trajet"
                    description="Expliquez votre besoin et vos attentes pour aider les conducteurs à mieux comprendre votre demande et proposer une solution adaptée."
                  />

                  {/* EMPTY STATE GUIDE */}
                  {!form.description && (
                    <div className="rounded-md border border-zinc-800 bg-zinc-900/30 p-3">
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        Vous pouvez utiliser cet espace pour préciser les éléments importants de votre trajet et aider les conducteurs à mieux comprendre votre besoin.
                        Par exemple, vous pouvez indiquer si votre départ est flexible ou contraint par un horaire précis, préciser si vous voyagez avec des bagages ou du matériel particulier, mentionner si votre déplacement est urgent ou planifié à l’avance, ou encore donner des indications sur vos préférences pendant le trajet.
                        Ces informations ne sont pas obligatoires, mais elles permettent de rendre votre demande plus claire, d’éviter les malentendus et d’augmenter vos chances de recevoir rapidement une proposition adaptée.
                      </p>
                    </div>
                  )}

                  {/* SUGGESTIONS RAPIDES */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Départ tôt le matin", icon: Clock },
                      { label: "Trajet urgent", icon: Zap },
                      { label: "Voyage léger", icon: Luggage },
                      { label: "Bagage volumineux", icon: Package },
                      { label: "Flexible sur l’horaire", icon: Shuffle },
                      { label: "Préférence pour un trajet calme", icon: Volume2 },
                    ].map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() =>
                          handleChange(
                            "description",
                            form.description
                              ? form.description + ", " + label
                              : label
                          )
                        }
                        className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full border border-zinc-700 text-zinc-400 hover:bg-zinc-800 transition"
                      >
                        <Icon className="w-3 h-3 text-zinc-500" />
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* INPUT */}
                  <RideDescription
                    description={form.description}
                    onChange={(value) => handleChange("description", value)}
                  />

                  {/* FOOTER INFO */}
                  {form.description && (
                    <p className="text-[11px] text-zinc-500 leading-relaxed border-t border-zinc-800 pt-3">
                      Une description détaillée aide les conducteurs à mieux évaluer votre demande et à proposer un trajet correspondant à vos besoins.
                    </p>
                  )}

                </div>
              )}

              {/* TAB 4 — FICHIERS */}
              {activeTab === "files" && (
                <div className="space-y-6 border border-border rounded-md p-4 bg-card/80">

                  {/* HEADER */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                      <Paperclip className="w-3.5 h-3.5 text-zinc-400" />
                      Fichiers et informations complémentaires
                    </p>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                      Vous pouvez ajouter des fichiers pour apporter des précisions à votre demande.
                      Par exemple, une photo de bagage volumineux, un document utile ou toute information
                      permettant au conducteur de mieux anticiper les conditions du trajet.
                    </p>
                  </div>

                  {/* UPLOAD ZONE */}
                  <div className="space-y-3">
                    <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center cursor-pointer hover:border-zinc-600 hover:bg-zinc-800/30 transition-all group">

                      <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:border-zinc-600 transition-colors">
                        <Upload className="w-4 h-4 text-zinc-500" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-zinc-300">
                          Glissez-déposez vos fichiers
                        </p>
                        <p className="text-xs text-zinc-600 mt-0.5">
                          ou cliquez pour importer
                        </p>
                      </div>

                      <p className="text-[10px] text-zinc-600">
                        Images (JPEG, PNG) ou documents (PDF) · 5 Mo max
                      </p>

                      <input type="file" className="hidden" multiple />
                    </label>
                  </div>

                  {/* EMPTY STATE INFO */}
                  <div className="text-[11px] text-zinc-500 leading-relaxed border border-zinc-800 bg-zinc-900/30 rounded-md p-3">
                    L’ajout de fichiers est facultatif, mais peut aider les conducteurs à mieux comprendre votre besoin
                    et à éviter certaines contraintes liées au trajet, notamment en cas de bagages particuliers ou de demandes spécifiques.
                  </div>

                  {/* SECURITY NOTE */}
                  <div className="flex items-start gap-1.5 text-[11px] text-zinc-500 border-t border-zinc-800 pt-3">
                    <Info className="w-3 h-3 mt-[2px] text-zinc-500 flex-shrink-0" />
                    Évitez de partager des informations sensibles ou personnelles. Les fichiers sont uniquement visibles par les conducteurs intéressés par votre demande.
                  </div>

                </div>
              )}

              {/* Séparateur + actions */}
              <div className="pt-2 border-t border-zinc-800">
                <RideActions
                  canSubmit={!!canSubmit}
                  onSubmit={() => console.log("submit", form)}
                  onCancel={() => console.log("cancel")}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}