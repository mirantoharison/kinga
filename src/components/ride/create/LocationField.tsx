"use client"

import { useCallback, useRef, useState, useEffect } from "react"
import {
  Copy, CheckCheck, MapPin, Building2, Home, Globe,
  Loader2, X, LocateFixed, Navigation, Check,
  ArrowRight, MousePointerClick,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useLocationSearch, type SearchResult } from "@/hooks/use-geolocation-search"
import { useCoordDisplay } from "@/hooks/use-coord-display"
import { cn } from "@/lib/utils"
import {
  MIN_QUERY_LENGTH,
  COPY_FEEDBACK_DELAY,
  formatCoords,
  buildFullLabel,
} from "@/lib/locationUtils"

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface LocationFieldProps {
  label: string
  value: string
  placeholder: string
  active: boolean
  done: boolean
  color: string
  tooltip: string
  buttonLabel: string
  onClick: () => void
  onSearchSelectHandler: (lat: number, lng: number, label: string) => void
}

/* ─── Constants ──────────────────────────────────────────────────────────────── */

const LOCATION_ICONS = {
  city:     Building2,
  locality: MapPin,
  house:    Home,
  other:    Globe,
} satisfies Record<string, React.ElementType>

const LOCATION_LABELS: Record<string, string> = {
  city:     "Ville",
  locality: "Localité",
  house:    "Adresse",
  other:    "Lieu",
}

const getLocationIcon = (type: string): React.ElementType =>
  (LOCATION_ICONS as Record<string, React.ElementType>)[type] ?? MapPin

const getLocationLabel = (type: string): string =>
  LOCATION_LABELS[type] ?? "Lieu"

/* ─── Composant ──────────────────────────────────────────────────────────────── */

export function LocationField({
  label, value, placeholder, active, done,
  color, tooltip, buttonLabel, onClick, onSearchSelectHandler,
}: LocationFieldProps) {
  const { address, setAddress, coords, setCoords } = useCoordDisplay(value)
  const { query, setQuery, results, loading, reset } = useLocationSearch()
  const [copied, setCopied] = useState(false)
  const [open, setOpen]     = useState(false)

  // Ref sur le conteneur input + dropdown
  const containerRef = useRef<HTMLDivElement>(null)

  // Fermeture au clic en dehors du conteneur
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  const showDropdown = open && query.length >= MIN_QUERY_LENGTH

  const handleQueryChange = useCallback((val: string) => {
    setQuery(val)
    if (val.length >= MIN_QUERY_LENGTH) setOpen(true)
  }, [setQuery])

  const handleSelectResult = useCallback((item: SearchResult) => {
    setAddress(item.label)
    setCoords(formatCoords(item.lat, item.lng))
    onSearchSelectHandler(item.lat, item.lng, buildFullLabel(item.label, item.lat, item.lng))
    reset()
    setQuery("")
    setOpen(false)
  }, [onSearchSelectHandler, setAddress, setCoords, reset, setQuery])

  const handleClear = useCallback(() => {
    setQuery("")
    setAddress("")
    setCoords("")
    reset()
    setOpen(false)
  }, [setQuery, setAddress, setCoords, reset])

  const handleCopyCoords = useCallback(() => {
    if (!coords) return
    navigator.clipboard.writeText(coords).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DELAY)
    })
  }, [coords])

  const inputValue = query !== "" ? query : address
  const hasValue   = inputValue.length > 0

  const fieldState: "active" | "done" | "idle" =
    active ? "active" : done ? "done" : "idle"

  return (
    <div className="space-y-1.5">

      {/* ── Label ── */}
      <Label className={cn(
        "text-xs font-medium flex items-center gap-1.5 transition-colors",
        fieldState === "idle" ? "text-muted-foreground" : "text-foreground",
      )}>
        <MapPin className={cn("w-3 h-3", color)} aria-hidden="true" />
        {label}
      </Label>

      {/* ── Input row ── */}
      <div className="flex items-start gap-2">

        {/* Input + dropdown — ref sur ce conteneur */}
        <div ref={containerRef} className="relative flex-1 min-w-0">

          {/* Input */}
          <div className={cn(
            "flex items-center h-7 rounded-md border bg-background transition-all overflow-hidden",
            open && "ring-2 ring-ring ring-offset-0",
            fieldState === "done" && !open && "border-border bg-muted/30",
            fieldState === "active" && !open && "border-border bg-muted/20",
          )}>
            <div className="pl-3 pr-1 flex items-center shrink-0">
              {loading
                ? <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />
                : fieldState === "done"
                  ? <MapPin className={cn("w-3.5 h-3.5", color)} />
                  : fieldState === "active"
                    ? <Navigation className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                    : <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
              }
            </div>

            <input
              value={inputValue}
              placeholder={placeholder}
              aria-label={label}
              aria-expanded={showDropdown}
              aria-haspopup="listbox"
              aria-autocomplete="list"
              onChange={(e) => handleQueryChange(e.target.value)}
              onFocus={() => {
                if (query.length >= MIN_QUERY_LENGTH) setOpen(true)
              }}
              className="flex-1 min-w-0 bg-transparent text-xs py-0 pr-2 outline-none placeholder:text-xs placeholder:text-muted-foreground/80"
            />

            {hasValue && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Effacer la saisie"
                className="pr-2.5 pl-1 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* ── Dropdown ── */}
          {showDropdown && (
            <div className="absolute z-[9999] mt-1 w-full bg-popover border border-border rounded-md shadow-lg overflow-hidden">

              {loading && (
                <div className="px-3 py-3 flex items-center gap-2.5 text-xs text-muted-foreground">
                  <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0 text-emerald-500" />
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground">Recherche en cours…</span>
                    <span className="text-[10px]">Interrogation des services de géolocalisation</span>
                  </div>
                </div>
              )}

              {!loading && results.length === 0 && (
                <div className="px-3 py-3 flex items-start gap-2.5 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-px" />
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground">Aucun résultat trouvé</span>
                    <span className="text-[10px]">
                      Essayez un nom de ville, une adresse postale ou des coordonnées GPS.
                    </span>
                  </div>
                </div>
              )}

              {!loading && results.length > 0 && (
                <>
                  <div className="px-3 py-1.5 border-b border-border/60 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                      {results.length} résultat{results.length > 1 ? "s" : ""} trouvé{results.length > 1 ? "s" : ""}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60">
                      Cliquez pour sélectionner
                    </span>
                  </div>

                  <ul
                    role="listbox"
                    aria-label={label}
                    className="max-h-48 overflow-y-auto divide-y divide-border/40"
                  >
                    {results.map((item, i) => {
                      const Icon = getLocationIcon(item.type)
                      const typeLabel = getLocationLabel(item.type)
                      const [main, ...rest] = item.label.split(",")

                      return (
                        <li key={`${item.lat}-${item.lng}-${i}`} role="option">
                          <button
                            type="button"
                            // mousedown au lieu de click : s'exécute avant que
                            // l'outside-click listener ne referme le dropdown
                            onMouseDown={(e) => {
                              e.preventDefault()
                              handleSelectResult(item)
                            }}
                            className="w-full text-left px-3 py-2 text-xs hover:bg-muted/60 transition-colors flex items-center gap-2.5 group"
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-md bg-muted group-hover:bg-background border border-transparent group-hover:border-border/60 transition-all">
                                  <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                                </span>
                              </TooltipTrigger>
                              <TooltipContent className="text-xs">
                                {typeLabel}
                              </TooltipContent>
                            </Tooltip>

                            <div className="flex flex-col min-w-0 flex-1">
                              <span className="truncate font-medium text-foreground leading-tight">
                                {main}
                              </span>
                              {rest.length > 0 ? (
                                <span className="truncate text-[10px] text-muted-foreground leading-tight mt-px">
                                  {rest.join(",")}
                                </span>
                              ) : (
                                <span className="text-[10px] text-muted-foreground/50 leading-tight mt-px italic">
                                  Pas de détail supplémentaire
                                </span>
                              )}
                            </div>

                            <div className="shrink-0 flex flex-col items-end gap-px">
                              <span className="text-[10px] font-mono text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
                                {formatCoords(item.lat, item.lng)}
                              </span>
                              <span className="text-[9px] text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors">
                                WGS 84
                              </span>
                            </div>

                            <Check className="w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-emerald-500 transition-colors shrink-0" />
                          </button>
                        </li>
                      )
                    })}
                  </ul>

                  <div className="px-3 py-1.5 border-t border-border/60 flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-muted-foreground/50 shrink-0" />
                    <span className="text-[10px] text-muted-foreground/50">
                      Source : OpenStreetMap Nominatim
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── Coordonnées sous l'input ── */}
          {coords && query === "" && (
            <div className="mt-1 flex items-center gap-1 px-1">
              <LocateFixed className="w-3 h-3 text-muted-foreground shrink-0" />
              <span className="text-[10px] font-mono text-muted-foreground select-all flex-1 truncate">
                {coords}
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={handleCopyCoords}
                    aria-label={copied ? "Coordonnées copiées dans le presse-papier" : "Copier les coordonnées GPS"}
                    className="p-0.5 rounded hover:bg-muted transition-colors shrink-0"
                  >
                    {copied
                      ? <CheckCheck className="w-3 h-3 text-emerald-500" />
                      : <Copy className="w-3 h-3 text-muted-foreground" />
                    }
                  </button>
                </TooltipTrigger>
                <TooltipContent className="text-xs">
                  {copied
                    ? "✓ Coordonnées copiées dans le presse-papier"
                    : "Copier les coordonnées GPS (format décimal WGS 84)"
                  }
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>

        {/* ── Bouton carte ── */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="sm"
              variant={active ? "default" : done ? "outline" : "secondary"}
              aria-pressed={active}
              aria-label={`${done ? "Modifier l'emplacement" : buttonLabel} sur la carte`}
              onClick={onClick}
              className="shrink-0 text-xs h-7 w-24 self-start rounded-md gap-1.5 transition-all"
            >
              {active
                ? <Navigation className="w-3.5 h-3.5" />
                : done
                  ? <Check className="w-3.5 h-3.5" />
                  : <MapPin className="w-3.5 h-3.5" />
              }
              {active ? "En cours…" : done ? "Modifier" : buttonLabel}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-xs max-w-[220px] text-center leading-relaxed">
            {active
              ? "Cliquez sur n'importe quel point de la carte pour définir l'emplacement exact."
              : done
                ? "L'emplacement est enregistré. Cliquez pour le repositionner sur la carte."
                : tooltip
            }
          </TooltipContent>
        </Tooltip>

      </div>

      {/* ── Message contextuel ── */}
      {fieldState === "idle" && (
        <p className="flex items-start gap-1.5 text-[11px] text-muted-foreground leading-relaxed">
          <MousePointerClick className="w-3 h-3 shrink-0 mt-px" />
          Saisissez une adresse dans le champ ci-dessus, ou activez la sélection sur la carte pour pointer directement un emplacement.
        </p>
      )}
      {fieldState === "active" && (
        <p className="flex items-start gap-1.5 text-[11px] text-muted-foreground leading-relaxed">
          <LocateFixed className="w-3 h-3 shrink-0 mt-px animate-pulse text-blue-500" />
          Mode sélection carte activé — cliquez sur la carte pour positionner le point. Les coordonnées seront capturées automatiquement.
        </p>
      )}
      {fieldState === "done" && (
        <p className="flex items-start gap-1.5 text-[11px] text-muted-foreground leading-relaxed">
          <ArrowRight className="w-3 h-3 shrink-0 mt-px text-emerald-500" />
          Emplacement enregistré avec succès. Cliquez sur « Modifier » pour repositionner le point ou effectuer une nouvelle recherche.
        </p>
      )}

    </div>
  )
}