// /components/ride/create/tabs/DetailsTab.tsx

import {
  MapPin,
  Search,
  Loader2,
  Plus,
  Trash2,
  Globe,
  Settings,
} from "lucide-react"

import { RideDetailsForm } from "@/components/ride/create/RideDetailsForm"
import { TabHeader } from "@/components/ride/create/RideTabHeader"

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
  loading: boolean

  handleAddStop: (item: Stop) => void
  handleRemoveStop: (index: number) => void

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
  loading,

  handleAddStop,
  handleRemoveStop,

  routeInfo,
}: Props) {
  return (
    <div className="space-y-6 border border-border rounded-lg p-5 bg-card">

      {/* HEADER */}
      <TabHeader
        icon={Settings}
        title="Détails du trajet"
        description="Renseignez les informations essentielles de votre déplacement afin d’aider les conducteurs à comprendre votre besoin et proposer un trajet adapté."
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
            <MapPin className="w-3.5 h-3.5 text-emerald-500" />
            Arrêts possibles
          </p>
          <p className="text-[11px] text-muted-foreground">
            Ajoutez des localités intermédiaires pour augmenter vos chances de trouver un conducteur.
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative">

          {/* INPUT */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une ville, quartier..."
              className="w-full text-xs pl-8 pr-3 py-2 rounded-md bg-background border border-border outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* RESULTS */}
          {query.length >= 3 && (
            <div className="absolute z-10 mt-1 w-full bg-popover border border-border rounded-md max-h-48 overflow-auto shadow-lg">

              {loading && (
                <div className="p-2 text-xs text-muted-foreground flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Recherche...
                </div>
              )}

              {!loading && results.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleAddStop(item)}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-muted transition flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="truncate text-foreground">{item.label}</span>

                  <Plus className="w-3.5 h-3.5 ml-auto text-muted-foreground" />
                </button>
              ))}

              {!loading && results.length === 0 && (
                <div className="p-2 text-xs text-muted-foreground">
                  Aucun résultat
                </div>
              )}
            </div>
          )}
        </div>

        {/* LIST */}
        {stops.length > 0 && (
          <div className="grid gap-2">
            {stops.map((stop, i) => (
              <div
                key={i}
                className="group flex items-center justify-between rounded-md border border-border bg-muted/50 px-3 py-2 transition hover:bg-muted"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Globe className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
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
          </div>
        )}

        {/* INFO */}
        <p className="text-[11px] text-muted-foreground flex items-start gap-1.5">
          <MapPin className="w-3 h-3 mt-[2px] text-muted-foreground flex-shrink-0" />
          Ces arrêts permettent aux conducteurs de proposer des trajets partiels compatibles avec votre itinéraire.
        </p>

      </div>

      {/* ─── BUDGET ─── */}
      {!routeInfo.distance ? (
        <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-2">

          <p className="text-xs font-medium text-foreground">
            Estimation du prix
          </p>

          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Le prix estimatif de votre trajet n’est pas encore disponible, car l’itinéraire n’a pas été défini.
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
          <p className="text-[11px] text-muted-foreground">
            Estimation basée sur la distance du trajet
          </p>
        </div>
      )}

    </div>
  )
}