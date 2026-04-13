import { useEffect } from "react"
import { useMap } from "react-leaflet"
import L from "leaflet"

interface Props {
  lat: number
  lng: number
  accuracy?: number
  autoFit?: boolean
}

export function RecenterMap({ lat, lng, accuracy, autoFit = true }: Props) {
  const map = useMap()

  useEffect(() => {
    if (autoFit && accuracy) {
      const circle = L.circle([lat, lng], { radius: accuracy })
      map.fitBounds(circle.getBounds())
    } else {
      map.setView([lat, lng], 15)
    }
  }, [lat, lng, accuracy, autoFit, map])

  return null
}