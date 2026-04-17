// /hooks/useCreateRide.ts
import { useState } from "react"

export function useCreateRide() {
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
    seats: "1",
    description: "",
  })

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return {
    selecting,
    setSelecting,
    routeInfo,
    setRouteInfo,
    form,
    setForm,
    handleChange,
  }
}