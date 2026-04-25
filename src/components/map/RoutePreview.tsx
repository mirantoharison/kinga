import { useEffect, useMemo, useRef, useState, useCallback } from "react"
import { createPortal } from "react-dom"
import { Polyline, Marker } from "react-leaflet"
import L from "leaflet"
import { MapPin, Clock, Navigation } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type LatLng = [number, number]

type Stop = {
  lat: number
  lng: number
  label?: string
}

interface RouteData {
  distance: number
  duration: number
}

interface SegmentInfo {
  fromLabel: string
  toLabel: string
  distance: number
  duration: number
  isAlternative?: boolean
  altIndex?: number
}

interface SegmentResult {
  main: { coords: LatLng[]; distance: number; duration: number }
  alternatives: { coords: LatLng[]; distance: number; duration: number }[]
}

interface Props {
  from: LatLng | null
  to: LatLng | null
  stops?: Stop[]
  onData?: (data: RouteData) => void
  onError?: (err: Error) => void
  onLoading?: (loading: boolean) => void
  weight?: number
}

interface TooltipState {
  x: number
  y: number
  info: SegmentInfo
}

// ─── Palette ──────────────────────────────────────────────────────────────────

const SEGMENT_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#f97316",
  "#14b8a6",
  "#ec4899",
  "#eab308",
  "#06b6d4",
  "#84cc16",
]

function getSegmentColor(index: number): string {
  return SEGMENT_COLORS[index % SEGMENT_COLORS.length]
}

function getPointLabel(index: number, total: number, stops: Stop[]): string {
  if (index === 0) return "Départ"
  if (index === total - 1) return "Arrivée"
  return stops[index - 1]?.label ?? `Arrêt ${index}`
}

// ─── Icônes ───────────────────────────────────────────────────────────────────

function makePinIcon(type: "depart" | "arrivee") {
  const bg     = type === "depart" ? "#10b981" : "#ef4444"
  const border = type === "depart" ? "#059669" : "#dc2626"
  const label  = type === "depart" ? "D" : "A"
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
      <ellipse cx="16" cy="38" rx="6" ry="2" fill="rgba(0,0,0,0.18)"/>
      <path d="M16 2C9.373 2 4 7.373 4 14c0 9.333 12 24 12 24S28 23.333 28 14C28 7.373 22.627 2 16 2z"
            fill="${bg}" stroke="${border}" stroke-width="1.5"/>
      <circle cx="16" cy="14" r="7" fill="white" opacity="0.2"/>
      <text x="16" y="18.5" text-anchor="middle" font-family="system-ui,sans-serif"
            font-size="10" font-weight="800" fill="white">${label}</text>
    </svg>
  `
  return L.divIcon({
    html: `<div style="background:none;border:none;">${svg}</div>`,
    className: "",
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  })
}

function makeBusStopIcon(index: number) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44">
      <ellipse cx="18" cy="42" rx="7" ry="2.5" fill="rgba(0,0,0,0.18)"/>
      <path d="M18 2C10.268 2 4 8.268 4 16c0 10 14 26 14 26S32 26 32 16C32 8.268 25.732 2 18 2z"
            fill="#6b7280" stroke="#4b5563" stroke-width="1.5"/>
      <rect x="8" y="7" width="20" height="13" rx="3" fill="white"/>
      <rect x="10" y="5" width="16" height="6" rx="2" fill="#e5e7eb"/>
      <rect x="9.5" y="9" width="6" height="4" rx="1" fill="#bfdbfe"/>
      <rect x="18" y="9" width="6" height="4" rx="1" fill="#bfdbfe"/>
      <rect x="8" y="16" width="20" height="2" fill="#d1d5db"/>
      <circle cx="12" cy="21.5" r="2.5" fill="#4b5563"/>
      <circle cx="12" cy="21.5" r="1.2" fill="#9ca3af"/>
      <circle cx="24" cy="21.5" r="2.5" fill="#4b5563"/>
      <circle cx="24" cy="21.5" r="1.2" fill="#9ca3af"/>
      <circle cx="28" cy="6" r="6" fill="#1e293b" stroke="white" stroke-width="1.2"/>
      <text x="28" y="9.5" text-anchor="middle" font-family="system-ui,sans-serif"
            font-size="${index > 9 ? "5.5" : "7"}" font-weight="800" fill="white">${index}</text>
    </svg>
  `
  return L.divIcon({
    html: `<div style="background:none;border:none;">${svg}</div>`,
    className: "",
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -44],
  })
}

// ─── OSRM fetcher ─────────────────────────────────────────────────────────────

async function fetchSegment(
  from: LatLng,
  to: LatLng,
  signal: AbortSignal
): Promise<SegmentResult> {
  const url =
    `https://router.project-osrm.org/route/v1/driving/` +
    `${from[1]},${from[0]};${to[1]},${to[0]}` +
    `?overview=full&geometries=geojson&alternatives=true`

  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`OSRM HTTP ${res.status}`)

  const data = await res.json()
  if (!data.routes?.length) throw new Error("OSRM: aucune route trouvée")

  const parseRoute = (r: any) => ({
    coords: r.geometry.coordinates.map(
      ([lng, lat]: [number, number]): LatLng => [lat, lng]
    ),
    distance: r.distance,
    duration: r.duration,
  })

  const [main, ...alternatives] = data.routes.map(parseRoute)
  return { main, alternatives }
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function StickyTooltip({ tooltip }: { tooltip: TooltipState }) {
  const { x, y, info } = tooltip

  return (
    <div
      style={{
        position: "fixed",
        left: x + 16,
        top: y - 16,
        pointerEvents: "none",
        zIndex: 9999,
        background: "rgba(15,23,42,0.97)",
        color: "white",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 12,
        fontFamily: "system-ui, sans-serif",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.08)",
        minWidth: 180,
        lineHeight: 1.5,
      }}
    >
      {/* Header */}
      <div style={{
        fontSize: 10,
        fontWeight: 700,
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginBottom: 8,
      }}>
        {info.isAlternative ? `Alternative ${(info.altIndex ?? 0) + 1}` : "Route principale"}
      </div>

      {/* De → À */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          {/* Icône Navigation (départ) */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
          </svg>
          <span style={{ color: "#e2e8f0" }}>{info.fromLabel}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          {/* Icône MapPin (arrivée) */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span style={{ color: "#e2e8f0" }}>{info.toLabel}</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingTop: 8,
        display: "flex",
        gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {/* Icône ruler/distance */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12h20M2 12l4-4M2 12l4 4M22 12l-4-4M22 12l-4 4"/>
          </svg>
          <span style={{ color: "#94a3b8" }}>{info.distance.toFixed(1)} <strong style={{ color: "white" }}>km</strong></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {/* Icône clock */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <span style={{ color: "#94a3b8" }}>{Math.round(info.duration)} <strong style={{ color: "white" }}>min</strong></span>
        </div>
      </div>
    </div>
  )
}

// ─── SegmentLayer — gère z-index via re-mount ─────────────────────────────────
// Quand hoveredKey change, React re-monte le Polyline survolé EN DERNIER
// dans le DOM → il s'affiche au-dessus de tous les autres naturellement.

interface BuiltSegment {
  key: string
  coords: LatLng[]
  color: string
  weight: number
  opacity: number
  isDashed: boolean
  info: SegmentInfo
}

function SegmentLayer({
  segments,
  onHover,
}: {
  segments: BuiltSegment[]
  onHover: (t: TooltipState | null) => void
}) {
  // La clé du segment actuellement survolé
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  // Réordonner : survolé en dernier (= au-dessus dans le DOM)
  const ordered = useMemo(() => {
    if (!hoveredKey) return segments
    const others = segments.filter((s) => s.key !== hoveredKey)
    const hovered = segments.find((s) => s.key === hoveredKey)
    return hovered ? [...others, hovered] : segments
  }, [segments, hoveredKey])

  return (
    <>
      {ordered.map((seg) => {
        const isHovered = seg.key === hoveredKey
        return (
          <Polyline
            // Quand le segment passe en dernière position ET est survolé,
            // on force le re-mount avec un suffix pour recréer le layer Leaflet
            key={isHovered ? `${seg.key}--active` : seg.key}
            positions={seg.coords}
            pathOptions={{
              color: isHovered ? seg.color : "#9ca3af",
              weight: isHovered ? seg.weight + 2 : seg.weight,
              opacity: isHovered ? 1 : seg.opacity,
              dashArray: seg.isDashed ? "7 7" : undefined,
            }}
            eventHandlers={{
              mouseover: (e) => {
                setHoveredKey(seg.key)
                onHover({
                  x: e.originalEvent.clientX,
                  y: e.originalEvent.clientY,
                  info: seg.info,
                })
              },
              mousemove: (e) => {
                onHover({
                  x: e.originalEvent.clientX,
                  y: e.originalEvent.clientY,
                  info: seg.info,
                })
              },
              mouseout: () => {
                setHoveredKey(null)
                onHover(null)
              },
            }}
          />
        )
      })}
    </>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

export function RoutePreview({
  from,
  to,
  stops = [],
  onData,
  onError,
  onLoading,
  weight = 4,
}: Props) {
  const [allSegments, setAllSegments] = useState<BuiltSegment[]>([])
  const [tooltip, setTooltip]         = useState<TooltipState | null>(null)

  const onDataRef    = useRef(onData)
  const onErrorRef   = useRef(onError)
  const onLoadingRef = useRef(onLoading)
  useEffect(() => { onDataRef.current    = onData    }, [onData])
  useEffect(() => { onErrorRef.current   = onError   }, [onError])
  useEffect(() => { onLoadingRef.current = onLoading }, [onLoading])

  const abortRef = useRef<AbortController | null>(null)

  const routePoints = useMemo((): LatLng[] => {
    if (!from || !to) return []
    return [from, ...stops.map((s): LatLng => [s.lat, s.lng]), to]
  }, [from, to, stops])

  const handleHover = useCallback((t: TooltipState | null) => {
    setTooltip(t)
  }, [])

  useEffect(() => {
    if (routePoints.length < 2) {
      setAllSegments([])
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    const { signal } = controller

    const fetchAll = async () => {
      onLoadingRef.current?.(true)

      try {
        const pairs: [LatLng, LatLng][] = routePoints
          .slice(0, -1)
          .map((pt, i) => [pt, routePoints[i + 1]])

        const results = await Promise.all(
          pairs.map(([a, b]) => fetchSegment(a, b, signal))
        )

        const built: BuiltSegment[] = []

        results.forEach((result, i) => {
          const color = getSegmentColor(i)
          const baseInfo: Omit<SegmentInfo, "distance" | "duration" | "isAlternative" | "altIndex"> = {
            fromLabel: getPointLabel(i, routePoints.length, stops),
            toLabel:   getPointLabel(i + 1, routePoints.length, stops),
          }

          // Alternatives d'abord (en dessous)
          result.alternatives.forEach((alt, altIdx) => {
            built.push({
              key:      `alt-${i}-${altIdx}`,
              coords:   alt.coords,
              color,
              weight:   weight - 1,
              opacity:  0.4,
              isDashed: true,
              info: {
                ...baseInfo,
                distance:      alt.distance / 1000,
                duration:      alt.duration / 60,
                isAlternative: true,
                altIndex:      altIdx,
              },
            })
          })

          // Route principale (au-dessus des alternatives)
          built.push({
            key:      `main-${i}`,
            coords:   result.main.coords,
            color,
            weight,
            opacity:  0.85,
            isDashed: false,
            info: {
              ...baseInfo,
              distance:      result.main.distance / 1000,
              duration:      result.main.duration / 60,
              isAlternative: false,
            },
          })
        })

        setAllSegments(built)

        const totalDistance = results.reduce((sum, r) => sum + r.main.distance, 0)
        const totalDuration = results.reduce((sum, r) => sum + r.main.duration, 0)
        onDataRef.current?.({
          distance: totalDistance / 1000,
          duration: totalDuration / 60,
        })
      } catch (e) {
        if ((e as Error).name === "AbortError") return
        const err = e instanceof Error ? e : new Error(String(e))
        console.error("[RoutePreview]", err.message)
        onErrorRef.current?.(err)
        setAllSegments([])
      } finally {
        if (!signal.aborted) onLoadingRef.current?.(false)
      }
    }

    fetchAll()
    return () => controller.abort()
  }, [routePoints, stops, weight])

  return (
    <>
      <SegmentLayer segments={allSegments} onHover={handleHover} />

      {from && <Marker position={from} icon={makePinIcon("depart")} />}
      {stops.map((stop, i) => (
        <Marker
          key={`stop-${i}`}
          position={[stop.lat, stop.lng]}
          icon={makeBusStopIcon(i + 1)}
        />
      ))}
      {to && <Marker position={to} icon={makePinIcon("arrivee")} />}

      {tooltip && createPortal(
        <StickyTooltip tooltip={tooltip} />,
        document.body
      )}
    </>
  )
}