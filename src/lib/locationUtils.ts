export const MIN_QUERY_LENGTH = 3
export const SEARCH_DELAY_SHORT = 800
export const SEARCH_DELAY_LONG = 500
export const COPY_FEEDBACK_DELAY = 1500

export const formatCoords = (lat: number, lng: number): string => {
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
}

export const buildFullLabel = (label: string, lat: number, lng: number): string => {
  const base = label.includes("•") ? label.split("•")[0].trim() : label
  return `${base} • ${formatCoords(lat, lng)}`
}

export const getSearchDelay = (len: number): number =>
  len < 5 ? SEARCH_DELAY_SHORT : SEARCH_DELAY_LONG

export const parseLocationValue = (
  value: string
): { address: string; coords: string | undefined } => {
  if (!value) return { address: "", coords: undefined }
  if (value.includes("•")) {
    const [address, ...rest] = value.split("•").map((s) => s.trim())
    return { address, coords: rest[0] || undefined }
  }
  return { address: value, coords: undefined }
}