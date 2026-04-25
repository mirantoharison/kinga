import { useCreateRide } from "@/hooks/use-create-ride"

import { RouteTab }       from "@/components/ride/create/tabs/RideRouteTab"
import { DetailsTab }     from "@/components/ride/create/tabs/RideDetailsTab"
import { DescriptionTab } from "@/components/ride/create/tabs/RideDescriptionTab"
import { FilesTab }       from "@/components/ride/create/tabs/RideFileTab"

import { TabBar, type Tab } from "@/components/ride/create/RideTabBar"
import { RideActions }      from "@/components/ride/create/RideAction"
import { CreateRideSteps }  from "@/components/ride/create/CreateRideSteps"

import { Car, Info, RotateCcw, Map, Settings, FileText, Paperclip } from "lucide-react"

/* ─── Tabs config ────────────────────────────────────────────────────────────── */

const TABS: Tab[] = [
  { key: "route",       label: "Itinéraire", icon: Map       },
  { key: "details",     label: "Détails",    icon: Settings  },
  { key: "description", label: "Description",icon: FileText  },
  { key: "files",       label: "Fichiers",   icon: Paperclip },
]

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function CreateRidePage() {
  const ride = useCreateRide()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="p-6 max-w-4xl mx-auto space-y-6">

        {/* ── HEADER ── */}
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
            <Car className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="flex-1 space-y-1.5">
            <h1 className="text-base font-semibold text-foreground tracking-tight">
              Publier un trajet
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Créez votre trajet en quelques étapes simples : définissez votre point de départ
              et votre destination, puis complétez les informations essentielles comme la date,
              l'heure, le nombre de places et le prix. Vous pouvez utiliser la recherche
              d'adresse, la carte interactive ou vos coordonnées GPS.
            </p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Plus les informations sont claires et précises, plus vous augmentez vos chances
              de trouver rapidement des passagers.
            </p>
          </div>
        </div>

        {/* ── INFO BLOCK ── */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Comprendre la création de trajet
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Définissez l'itinéraire, renseignez les détails, puis enrichissez votre annonce
            avec une description et des fichiers si nécessaire.
          </p>
        </div>

        {/* ── STEPS ── */}
        <CreateRideSteps
          stepFromDone={!!ride.fromCoords}
          stepToDone={!!ride.toCoords}
          stepRouteDone={ride.routeInfo.distance > 0}
          stepDetailsDone={!!ride.canSubmit}
        />

        {/* ── RESET ── */}
        {(ride.fromCoords || ride.toCoords || ride.stops.length > 0) && (
          <div className="flex justify-end">
            <button
              onClick={ride.resetPoints}
              className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground hover:text-destructive transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Réinitialiser l'itinéraire
            </button>
          </div>
        )}

        {/* ── TABS ── */}
        <TabBar
          tabs={TABS}
          activeTab={ride.activeTab}
          setActiveTab={ride.setActiveTab}
        />

        {/* ── CONTENT ── */}
        <div className="space-y-6">

          {ride.activeTab === "route" && (
            <RouteTab
              form={ride.form}
              selecting={ride.selecting}
              setSelecting={ride.setSelecting}
              handleSearchSelect={ride.handleSearchSelect}
              handleMapSelect={ride.handleMapSelect}
              fromCoords={ride.fromCoords}
              toCoords={ride.toCoords}
              stops={ride.stops}
              setRouteInfo={ride.setRouteInfo}
              routeInfo={ride.routeInfo}
              estimatedPrice={ride.estimatedPrice}
            />
          )}

          {ride.activeTab === "details" && (
            <DetailsTab
              form={ride.form}
              setField={ride.setField}
              estimatedPrice={ride.estimatedPrice}
              stops={ride.stops}
              query={ride.query}
              setQuery={ride.setQuery}
              results={ride.results}
              searchLoading={ride.searchLoading}
              handleAddStop={ride.handleAddStop}
              handleRemoveStop={ride.handleRemoveStop}
              handleReorderStops={ride.handleReorderStops}
              routeInfo={ride.routeInfo}
            />
          )}

          {ride.activeTab === "description" && (
            <DescriptionTab
              description={ride.form.description}
              setField={ride.setField}
            />
          )}

          {ride.activeTab === "files" && (
            <FilesTab
              files={[]}
              onFilesChange={(files) => console.log(files)}
            />
          )}

          {/* ── ACTIONS ── */}
          <div className="pt-4 border-t border-border">
            <RideActions
              onSubmit={() => console.log("submit", ride.form)}
              onCancel={() => {}}
              canSubmit={ride.canSubmit}
            />
          </div>

        </div>
      </div>
    </div>
  )
}