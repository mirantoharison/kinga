import { useEffect, useMemo, useState, useCallback } from "react"
import { calculateRidePrice } from "@/lib/ridePricing"
import { getDefaultDateTime } from "@/lib/dateUtils"
import { reverseGeocode, searchLocation } from "@/lib/geocoding"

/* ─── TYPES ─── */

type TabKey = "route" | "details" | "description" | "files"

type LatLngTuple = [number, number]

type LatLng = {
  label: string
  lat: number | null
  lng: number | null
}

type RouteInfo = {
  distance: number
  duration: number
}

type RideForm = {
  from: LatLng
  to: LatLng
  date: string
  time: string
  price: string
  seats: string
  description: string
}

export type Stop = {
  label: string
  lat: number
  lng: number
}

/* ─── HOOK ─── */

export function useCreateRide() {
  const [activeTab, setActiveTab] = useState<TabKey>("route")
  const [selecting, setSelecting] = useState<"from" | "to" | null>(null)
  const [routeInfo, setRouteInfo] = useState<RouteInfo>({ distance: 0, duration: 0 })

  const [stops, setStops] = useState<Stop[]>([])
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Stop[]>([])
  const [searchLoading, setSearchLoading] = useState(false)

  const defaults = getDefaultDateTime()

  const [form, setForm] = useState<RideForm>({
    from: { label: "", lat: null, lng: null },
    to:   { label: "", lat: null, lng: null },
    date: defaults.date,
    time: defaults.time,
    price: "",
    seats: "1",
    description: "",
  })

  /* ─── HELPERS ─── */

  const setField = useCallback(<K extends keyof RideForm>(key: K, value: RideForm[K]) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }, [])

  const setLocation = useCallback((field: "from" | "to", value: LatLng) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }, [])

  /* ─── LOCATION ─── */

  const applyLocation = useCallback(async (
    lat: number,
    lng: number,
    initialLabel?: string,
    forceField?: "from" | "to"
  ) => {
    const currentSelecting = forceField ?? selecting
    if (!currentSelecting) return

    const coordsText = `${lat.toFixed(5)}, ${lng.toFixed(5)}`

    // Applique immédiatement avec le label disponible
    setLocation(currentSelecting, {
      label: initialLabel ?? coordsText,
      lat,
      lng,
    })
    setSelecting(null)

    // Si pas de label fourni, on reverse geocode en arrière-plan
    if (!initialLabel) {
      try {
        const labelName = await reverseGeocode(lat, lng)
        setLocation(currentSelecting, {
          label: `${labelName} • ${coordsText}`,
          lat,
          lng,
        })
      } catch {}
    }
  }, [selecting, setLocation])

  const handleMapSelect = useCallback((lat: number, lng: number) => {
    applyLocation(lat, lng)
  }, [applyLocation])

  const handleSearchSelect = useCallback((
    field: "from" | "to",
    lat: number,
    lng: number,
    label: string
  ) => {
    applyLocation(lat, lng, label, field)
  }, [applyLocation])

  /* ─── STOPS ─── */

  const handleAddStop = useCallback((item: Stop) => {
    setStops(prev => [...prev, item])
    setQuery("")
    setResults([])
  }, [])

  const handleRemoveStop = useCallback((index: number) => {
    setStops(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleReorderStops = useCallback((fromIndex: number, toIndex: number) => {
    setStops(prev => {
      const next = [...prev]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next
    })
  }, [])

  const handleUpdateStop = useCallback((index: number, updated: Partial<Stop>) => {
    setStops(prev =>
      prev.map((s, i) => (i === index ? { ...s, ...updated } : s))
    )
  }, [])

  /* ─── RESET ─── */

  const resetPoints = useCallback(() => {
    setForm(prev => ({
      ...prev,
      from: { label: "", lat: null, lng: null },
      to:   { label: "", lat: null, lng: null },
    }))
    setStops([])                              // ← stops aussi réinitialisés
    setRouteInfo({ distance: 0, duration: 0 })
  }, [])

  /* ─── DERIVED ─── */

  const fromCoords = useMemo((): LatLngTuple | null => {
    if (form.from.lat !== null && form.from.lng !== null)
      return [form.from.lat, form.from.lng]
    return null
  }, [form.from])

  const toCoords = useMemo((): LatLngTuple | null => {
    if (form.to.lat !== null && form.to.lng !== null)
      return [form.to.lat, form.to.lng]
    return null
  }, [form.to])

  // Stops convertis en LatLngTuple[] pour RoutePreview
  const stopCoords = useMemo((): Stop[] => stops, [stops])

  const isRouteDefined = !!(fromCoords && toCoords)

  const seatsNumber = useMemo(() => Number(form.seats), [form.seats])

  const estimatedPrice = useMemo(
    () => calculateRidePrice(routeInfo.distance, seatsNumber),
    [routeInfo.distance, seatsNumber]
  )

  const canSubmit = useMemo(() => (
    isRouteDefined &&
    !!form.date &&
    !!form.time &&
    !!form.price &&
    !!form.seats
  ), [form, isRouteDefined])

  /* ─── SEARCH (stops) ─── */

  useEffect(() => {
    if (query.length < 3) {
      setResults([])
      return
    }

    const timeout = setTimeout(async () => {
      setSearchLoading(true)
      try {
        const res = await searchLocation(query)
        setResults(
          res.map((item: any): Stop => ({
            label: item.label,
            lat:   item.lat,
            lng:   item.lng,
          }))
        )
      } catch (e) {
        console.error("[useCreateRide] search error:", e)
        setResults([])
      } finally {
        setSearchLoading(false)
      }
    }, 400)

    return () => clearTimeout(timeout)
  }, [query])

  /* ─── API ─── */

  return {
    // state
    activeTab,
    selecting,
    routeInfo,
    stops,
    stopCoords,
    query,
    results,
    searchLoading,
    form,

    // setters
    setActiveTab,
    setSelecting,
    setRouteInfo,
    setQuery,
    setForm,

    // helpers
    setField,
    setLocation,

    // handlers
    handleMapSelect,
    handleSearchSelect,
    handleAddStop,
    handleRemoveStop,
    handleReorderStops,
    handleUpdateStop,
    resetPoints,

    // derived
    fromCoords,
    toCoords,
    isRouteDefined,
    seatsNumber,
    estimatedPrice,
    canSubmit,
  }
}