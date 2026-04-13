import { Circle } from "react-leaflet"
import { type LatLngExpression } from "leaflet"

interface Props {
  position: LatLngExpression
  accuracy: number
}

export function AccuracyCircle({ position, accuracy }: Props) {
  return (
    <Circle
      center={position}
      radius={accuracy}
      pathOptions={{
        color: "#10b981",
        fillColor: "#10b981",
        fillOpacity: 0.12,
        weight: 1.5,
      }}
    />
  )
}