import { useEffect, useMemo, useState } from "react"
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

type Stop = {
  label: string
  lat: number
  lng: number
}

/* ─── HOOK ─── */

export function useCreateRide() {
  const [activeTab, setActiveTab] = useState<TabKey>("route")
  const [selecting, setSelecting] = useState<"from" | "to" | null>(null)
  const [routeInfo, setRouteInfo] = useState<RouteInfo>({
    distance: 0,
    duration: 0,
  })

  const [stops, setStops] = useState<Stop[]>([])
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Stop[]>([])
  const [loading, setLoading] = useState(false)

  const defaults = getDefaultDateTime()

  const [form, setForm] = useState<RideForm>({
    from: { label: "", lat: null, lng: null },
    to: { label: "", lat: null, lng: null },
    date: defaults.date,
    time: defaults.time,
    price: "",
    seats: "1",
    description: "",
  })

  /* ─── HELPERS ─── */

  const setField = <K extends keyof RideForm>(
    key: K,
    value: RideForm[K]
  ) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const setLocation = (field: "from" | "to", value: LatLng) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  /* ─── HANDLERS ─── */

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

    setLocation(currentSelecting, {
      label: fallbackLabel,
      lat,
      lng,
    })

    setSelecting(null)

    if (initialLabel) return

    try {
      const labelName = await reverseGeocode(lat, lng)

      setLocation(currentSelecting, {
        label: `${labelName} • ${coordsText}`,
        lat,
        lng,
      })
    } catch {}
  }

  const handleMapSelect = (lat: number, lng: number) =>
    applyLocation(lat, lng)

  const handleSearchSelect = (
    field: "from" | "to",
    lat: number,
    lng: number,
    label: string
  ) => applyLocation(lat, lng, label, field)

  const handleAddStop = (item: Stop) => {
    setStops(prev => [...prev, item])
    setQuery("")
    setResults([])
  }

  const handleRemoveStop = (index: number) => {
    setStops(prev => prev.filter((_, i) => i !== index))
  }

  const resetPoints = () => {
    setForm(prev => ({
      ...prev,
      from: { label: "", lat: null, lng: null },
      to: { label: "", lat: null, lng: null },
    }))
    setRouteInfo({ distance: 0, duration: 0 })
  }

  /* ─── DERIVED ─── */

  const fromCoords: LatLngTuple | null = useMemo(() => {
    if (form.from.lat !== null && form.from.lng !== null) {
      return [form.from.lat, form.from.lng]
    }
    return null
  }, [form.from])

  const toCoords: LatLngTuple | null = useMemo(() => {
    if (form.to.lat !== null && form.to.lng !== null) {
      return [form.to.lat, form.to.lng]
    }
    return null
  }, [form.to])

  const isRouteDefined = !!(fromCoords && toCoords)

  const seatsNumber = useMemo(() => Number(form.seats), [form.seats])

  const estimatedPrice = useMemo(() => {
    return calculateRidePrice(routeInfo.distance, seatsNumber)
  }, [routeInfo.distance, seatsNumber])

  const canSubmit = useMemo(() => {
    return (
      isRouteDefined &&
      form.date &&
      form.time &&
      form.price &&
      form.seats
    )
  }, [form, isRouteDefined])

  /* ─── SEARCH ─── */

  useEffect(() => {
    if (query.length < 3) {
      setResults([])
      return
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true)
        const res = await searchLocation(query)

        // sécurisation du typage
        setResults(
          res.map((item: any) => ({
            label: item.label,
            lat: item.lat,
            lng: item.lng,
          }))
        )
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
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
    query,
    results,
    loading,
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