export async function reverseGeocode(lat: number, lng: number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    )

    const data = await res.json()
    const address = data.address || {}

    const addressLabel = [
      address.road,
      address.suburb,
      address.city || address.town || address.village,
      address.country,
    ]
      .filter(Boolean)
      .join(", ")

    const coords = `${lat.toFixed(5)}, ${lng.toFixed(5)}`

    // 🔥 fusion propre
    const finalLabel = addressLabel
      ? `${addressLabel} • ${coords}`
      : coords

    return finalLabel
  } catch (err) {
    console.error("Geocoding error:", err)
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
  }
}

export async function searchLocation(query: string) {
  if (!query || query.length < 3) return []

  const finalQuery = `${query}, Madagascar`

  const res = await fetch(
    `https://photon.komoot.io/api/?q=${encodeURIComponent(finalQuery)}&limit=5&lang=fr`
  )

  const data = await res.json()

  return data.features.map((f: any) => {
    const props = f.properties

    return {
      label: [
        props.name,
        props.city || props.town || props.village,
        props.country,
      ]
        .filter(Boolean)
        .join(", "),
      lat: f.geometry.coordinates[1],
      lng: f.geometry.coordinates[0],
      type: props.type,
    }
  })
}