// /components/ride/create/tabs/RouteTab.tsx

import { LocationSection } from "@/components/ride/create/LocationSection"
import { MapSection } from "@/components/ride/create/MapSection"
import { RouteSummary } from "@/components/ride/create/RouteSummary"

type Props = {
  form: any
  selecting: "from" | "to" | null
  setSelecting: (v: "from" | "to" | null) => void
  handleSearchSelect: (
    field: "from" | "to",
    lat: number,
    lng: number,
    label: string
  ) => void
  fromCoords: [number, number] | null
  toCoords: [number, number] | null
  handleMapSelect: (lat: number, lng: number) => void
  setRouteInfo: (v: { distance: number; duration: number }) => void
  routeInfo: { distance: number; duration: number }
  estimatedPrice: number
}

export function RouteTab({
  form,
  selecting,
  setSelecting,
  handleSearchSelect,
  fromCoords,
  toCoords,
  handleMapSelect,
  setRouteInfo,
  routeInfo,
  estimatedPrice,
}: Props) {
  return (
    <div className="space-y-6 rounded-lg border border-border bg-card p-5">

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

    </div>
  )
}