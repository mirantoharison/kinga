// /components/ride/create/tabs/RideDetailsTab.tsx

import { useRef, useEffect } from "react"
import {
  MapPin,
  Search,
  Loader2,
  Plus,
  Trash2,
  Globe,
  Settings,
  GripVertical,
} from "lucide-react"

import { RideDetailsForm } from "@/components/ride/create/RideDetailsForm"
import { TabHeader } from "@/components/ride/create/RideTabHeader"
import { MapSection } from "../MapSection"

type Stop = {
  label: string
  lat: number
  lng: number
}

type Props = {
  form: any
  setField: (key: string, value: string) => void
  estimatedPrice: number

  stops: Stop[]
  query: string
  setQuery: (v: string) => void
  results: Stop[]
  searchLoading: boolean

  handleAddStop: (item: Stop) => void
  handleRemoveStop: (index: number) => void
  handleReorderStops: (fromIndex: number, toIndex: number) => void

  routeInfo: { distance: number; duration: number }
}

export function DetailsTab({
  form,
  setField,
  estimatedPrice,
  stops,
  query,
  setQuery,
  results,
  searchLoading,
  handleAddStop,
  handleRemoveStop,
  handleReorderStops,
  routeInfo,
}: Props) {
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // Fermeture du dropdown au clic en dehors
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setQuery("")
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [setQuery])

  // Drag & drop handler pour handleReorderStops
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("dragIndex", String(index))
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    const dragIndex = Number(e.dataTransfer.getData("dragIndex"))
    if (dragIndex !== dropIndex) handleReorderStops(dragIndex, dropIndex)
  }

  const handleDragOver = (e: React.DragEvent) => e.preventDefault()

  return (
    <div className="space-y-6 border border-border rounded-lg p-5 bg-card">

      {/* HEADER */}
      <TabHeader
        icon={Settings}
        title="Détails du trajet"
        description="Renseignez les informations essentielles de votre trajet afin de permettre aux conducteurs de comprendre rapidement votre besoin et de proposer une solution adaptée."
      />

      {/* FORM */}
      <RideDetailsForm
        form={form}
        onChange={setField}
        estimatedPrice={estimatedPrice}
      />

      {/* ─── STOPS ─── */}
      <div className="space-y-4">

        {/* HEADER */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-foreground flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
            Arrêts possibles
          </p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Définissez des points d'arrêt intermédiaires le long de votre itinéraire.
            Les conducteurs pourront ainsi vous proposer des trajets partiels couvrant
            une portion de votre route, maximisant vos chances de trouver une correspondance rapide.
          </p>
        </div>

        {/* SEARCH */}
        <div ref={searchContainerRef} className="relative">

          <div className="relative">
            {searchLoading ? (
              <Loader2 className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground animate-spin" />
            ) : (
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            )}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ville, quartier, adresse ou point de repère…"
              className="w-full text-xs pl-8 pr-3 py-2 rounded-md bg-background border border-border outline-none placeholder:text-muted-foreground"
            />
          </div>

          {query.length >= 3 && (
            <div className="absolute z-10 mt-1 w-full bg-popover border border-border rounded-md max-h-48 overflow-auto shadow-lg">

              {searchLoading && (
                <div className="p-2 text-xs text-muted-foreground flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Recherche en cours…
                </div>
              )}

              {!searchLoading && results.map((item, i) => (
                <button
                  key={i}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleAddStop(item)
                    setQuery("")
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-muted transition flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="truncate text-foreground">{item.label}</span>
                  <Plus className="w-3.5 h-3.5 ml-auto text-muted-foreground" />
                </button>
              ))}

              {!searchLoading && results.length === 0 && (
                <div className="p-2 text-xs text-muted-foreground">
                  Aucun résultat — essayez un nom de ville ou une adresse plus précise.
                </div>
              )}

            </div>
          )}
        </div>

        {/* LIST — drag & drop pour réordonner via handleReorderStops */}
        {stops.length > 0 && (
          <div className="grid gap-2">
            {stops.map((stop, i) => (
              <div
                key={i}
                draggable
                onDragStart={(e) => handleDragStart(e, i)}
                onDrop={(e) => handleDrop(e, i)}
                onDragOver={handleDragOver}
                className="group flex items-center justify-between rounded-md border border-border bg-muted/50 px-3 py-2 transition hover:bg-muted cursor-grab active:cursor-grabbing"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground shrink-0 transition-colors" />
                  <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-blue-500/10 text-blue-500 text-[9px] font-semibold leading-none">
                    {i + 1}
                  </span>
                  <span className="text-xs text-foreground truncate">
                    {stop.label}
                  </span>
                </div>

                <button
                  onClick={() => handleRemoveStop(i)}
                  className="opacity-0 group-hover:opacity-100 transition text-[11px] text-muted-foreground hover:text-destructive flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Supprimer
                </button>
              </div>
            ))}
            <p className="text-[10px] text-muted-foreground/60 flex items-center gap-1 pl-1">
              <GripVertical className="w-3 h-3" />
              Glissez les arrêts pour modifier leur ordre sur l'itinéraire.
            </p>
          </div>
        )}

        {/* MAP PREVIEW */}
        {stops.length > 0 && form.from?.lat && form.to?.lat && (
          <div className="space-y-3 pt-2">
            <div className="space-y-1">
              <p className="text-xs font-medium text-foreground flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                Aperçu du trajet avec arrêts
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Visualisez le trajet complet incluant les arrêts que vous avez ajoutés.
                Cela permet de mieux comprendre l'itinéraire global proposé aux conducteurs.
              </p>
            </div>

            <MapSection
              selecting={null}
              fromCoords={[form.from.lat, form.from.lng]}
              toCoords={[form.to.lat, form.to.lng]}
              stops={stops}
              onSelect={() => { }}
              setRouteInfo={() => { }}
            />
          </div>
        )}

        {/* INFO */}
        <p className="text-[11px] text-muted-foreground flex items-start gap-1.5">
          <MapPin className="w-3 h-3 mt-[2px] text-muted-foreground flex-shrink-0" />
          Les arrêts intermédiaires sont visibles par les conducteurs et leur permettent
          de proposer des prises en charge partielles compatibles avec votre itinéraire global.
        </p>

      </div>

      {/* ─── BUDGET ─── */}
      {!routeInfo.distance ? (
        <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-2">
          <p className="text-xs font-medium text-foreground">
            Estimation du prix
          </p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            L'estimation tarifaire sera disponible dès que votre point de départ et votre
            destination seront tous deux renseignés. Le calcul est basé sur la distance
            totale du trajet et le nombre de places proposées.
          </p>
        </div>
      ) : (
        <div className="rounded-lg bg-muted p-3 border border-border">
          <p className="text-xs text-muted-foreground">
            Budget suggéré
          </p>
          <p className="text-sm font-semibold text-emerald-600">
            {estimatedPrice.toLocaleString()} Ar
          </p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Ce montant est calculé automatiquement en fonction de la distance et du nombre
            de places. Vous restez libre de l'ajuster selon vos préférences, les conditions
            de route ou les arrangements convenus avec les passagers.
          </p>
        </div>
      )}

    </div>
  )
}