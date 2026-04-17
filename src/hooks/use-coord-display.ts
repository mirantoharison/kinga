import { useEffect, useMemo, useRef, useState } from "react"
import { parseLocationValue } from "@/lib/locationUtils"

export function useCoordDisplay(value: string) {
  const parsed = useMemo(() => parseLocationValue(value), [value])
  const [address, setAddress] = useState(parsed.address)
  const [coords,  setCoords]  = useState(parsed.coords)
  const prevValue = useRef(value)

  useEffect(() => {
    if (prevValue.current === value) return
    prevValue.current = value
    setAddress(parsed.address)
    setCoords(parsed.coords)
  }, [value, parsed])

  return { address, setAddress, coords, setCoords }
}