import { useEffect, useState } from "react"
import { Polyline } from "react-leaflet"

interface Props {
  from: [number, number] | null
  to: [number, number] | null
  onData?: (data: { distance: number; duration: number }) => void
}

export function RoutePreview({ from, to, onData }: Props) {
  const [coords, setCoords] = useState<[number, number][]>([])

  useEffect(() => {
    if (!from || !to) return

    const fetchRoute = async () => {
      const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`

      const res = await fetch(url)
      const data = await res.json()

      const route = data.routes[0]

      // coords
      const points = route.geometry.coordinates.map(
        (c: [number, number]) => [c[1], c[0]]
      )

      setCoords(points)

      // distance (km) + durée (min)
      onData?.({
        distance: route.distance / 1000,
        duration: route.duration / 60,
      })
    }

    fetchRoute()
  }, [from, to])

  if (!coords.length) return null

  return (
    <Polyline
      positions={coords}
      pathOptions={{ color: "#10b981", weight: 4 }}
    />
  )
}