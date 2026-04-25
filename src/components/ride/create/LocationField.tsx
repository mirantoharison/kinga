"use client"

import { useCallback, useMemo, useState } from "react"
import {
  Copy, CheckCheck, MapPin, Building2, Home, Globe,
  Loader2, X, LocateFixed, Navigation, Check,
  ArrowRight, MousePointerClick, Info,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandList, CommandItem } from "@/components/ui/command"
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

// ─── Types ───────────────────────────────────────────────────────────────────

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

// ─── Constants ───────────────────────────────────────────────────────────────

const LOCATION_ICONS = {
  city: Building2,
  locality: MapPin,
  house: Home,
  other: Globe,
} satisfies Record<string, React.ElementType>

const getLocationIcon = (type: string): React.ElementType =>
  (LOCATION_ICONS as Record<string, React.ElementType>)[type] ?? MapPin

// ─── Component ───────────────────────────────────────────────────────────────

export function LocationField({
  label, value, placeholder, active, done,
  color, tooltip, buttonLabel, onClick, onSearchSelectHandler,
}: LocationFieldProps) {
  const { address, setAddress, coords, setCoords } = useCoordDisplay(value)
  const { query, setQuery, results, loading, reset } = useLocationSearch()
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [focused, setFocused] = useState(false)

  const popoverOpen = isOpen && query.length >= MIN_QUERY_LENGTH

  const handleQueryChange = useCallback((val: string) => {
    setQuery(val)
    setIsOpen(val.length >= MIN_QUERY_LENGTH)
  }, [setQuery])

  const handleSelectResult = useCallback((item: SearchResult) => {
    setAddress(item.label)
    setCoords(formatCoords(item.lat, item.lng))
    onSearchSelectHandler(item.lat, item.lng, buildFullLabel(item.label, item.lat, item.lng))
    reset()
    setIsOpen(false)
  }, [onSearchSelectHandler, setAddress, setCoords, reset])

  const handleClear = useCallback(() => {
    setQuery("")
    setAddress("")
    setCoords("")
    reset()
    setIsOpen(false)
  }, [setQuery, setAddress, setCoords, reset])

  const handleCopyCoords = useCallback(() => {
    if (!coords) return
    navigator.clipboard.writeText(coords).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DELAY)
    })
  }, [coords])

  const inputValue = query !== "" ? query : address
  const hasValue = inputValue.length > 0

  // État visuel global du champ
  const fieldState: "active" | "done" | "idle" =
    active ? "active" : done ? "done" : "idle"

  return (
    <div className="space-y-1.5">

      {/* ── Label ── */}
      <div className="flex items-center justify-between">
        <Label className={cn(
          "text-xs font-medium flex items-center gap-1.5 transition-colors",
          fieldState === "active" && "text-foreground",
          fieldState === "done" && "text-foreground",
          fieldState === "idle" && "text-muted-foreground",
        )}>
          <MapPin className={cn("w-3 h-3", color)} aria-hidden="true" />
          {label}
        </Label>
      </div>

      {/* ── Input row ── */}
      <div className="flex items-start gap-2">

        {/* Input + popover */}
        <div className="relative flex-1 min-w-0">
          <Popover open={popoverOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <span className="absolute inset-0 pointer-events-none" aria-hidden="true" />
            </PopoverTrigger>

            {/* Icône gauche dans l'input */}
            <div className={cn(
              "flex items-center h-7 rounded-md border bg-background transition-all overflow-hidden",
              focused && "ring-2 ring-ring ring-offset-0",
              fieldState === "done" && !focused && "border-border bg-muted/30",
              fieldState === "active" && !focused && "border-border bg-muted/20",
            )}>
              {/* Icône état à gauche */}
              <div className={cn(
                "pl-3 pr-1 flex items-center flex-shrink-0",
              )}>
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
                aria-expanded={popoverOpen}
                aria-haspopup="listbox"
                aria-autocomplete="list"
                onChange={(e) => handleQueryChange(e.target.value)}
                onFocus={() => {
                  setFocused(true)
                  if (query.length >= MIN_QUERY_LENGTH) setIsOpen(true)
                }}
                onBlur={() => {
                  setFocused(false)
                  setTimeout(() => setIsOpen(false), 150)
                }}
                className={cn(
                  "flex-1 min-w-0 bg-transparent text-xs py-0 pr-2 outline-none",
                  "placeholder:text-xs placeholder:text-muted-foreground/80"
                )}
              />

              {/* Bouton clear */}
              {hasValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Effacer la valeur"
                  className="pr-2.5 pl-1 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <PopoverContent
              align="start"
              side="bottom"
              sideOffset={6}
              onOpenAutoFocus={(e) => e.preventDefault()}
              onInteractOutside={() => setIsOpen(false)}
              className="p-0 z-[9999] w-[var(--radix-popover-trigger-width)] max-w-[95vw] sm:max-w-[420px] md:max-w-[700px] rounded-xl shadow-lg border"
            >
              <Command>
                <CommandList
                  role="listbox"
                  aria-label={`Résultats pour ${label}`}
                  aria-live="polite"
                  className="max-h-60 overflow-y-auto"
                >
                  {loading && (
                    <div role="status" aria-label="Recherche en cours"
                      className="flex items-center gap-2 px-3 py-3 text-xs text-muted-foreground">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                      Recherche en cours…
                    </div>
                  )}

                  {!loading && query.length >= MIN_QUERY_LENGTH && results.length === 0 && (
                    <div role="status" className="px-3 py-5 text-center space-y-1">
                      <Globe className="w-6 h-6 text-muted-foreground/40 mx-auto" />
                      <p className="text-sm font-medium">Aucun résultat</p>
                      <p className="text-xs text-muted-foreground">
                        Essayez un nom de ville ou un lieu plus précis
                      </p>
                    </div>
                  )}

                  {results.map((item, i) => {
                    const Icon = getLocationIcon(item.type)
                    const [main, ...secondary] = item.label.split(",")
                    return (
                      <CommandItem
                        key={`${item.lat}-${item.lng}-${i}`}
                        value={item.label}
                        role="option"
                        onSelect={() => handleSelectResult(item)}
                        className="flex items-start gap-2.5 cursor-pointer px-3 py-2.5 hover:bg-muted transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col leading-snug min-w-0">
                          <span className="text-sm font-medium truncate">{main}</span>
                          {secondary.length > 0 && (
                            <span className="text-xs text-muted-foreground truncate">
                              {secondary.join(",")}
                            </span>
                          )}
                        </div>
                        {/* Coordonnées en preview à droite */}
                        <span className="ml-auto text-[10px] font-mono text-muted-foreground flex-shrink-0 self-center">
                          {formatCoords(item.lat, item.lng)}
                        </span>
                      </CommandItem>
                    )
                  })}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Ligne coordonnées sous l'input */}
          {coords && query === "" && (
            <div className="mt-1 flex items-center gap-1 px-1">
              <LocateFixed className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              <span className="text-[10px] font-mono text-muted-foreground select-all flex-1 truncate">
                {coords}
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={handleCopyCoords}
                    aria-label={copied ? "Coordonnées copiées" : "Copier les coordonnées"}
                    className="p-0.5 rounded hover:bg-muted transition-colors flex-shrink-0"
                  >
                    {copied
                      ? <CheckCheck className="w-3 h-3 text-emerald-500" />
                      : <Copy className="w-3 h-3 text-muted-foreground" />
                    }
                  </button>
                </TooltipTrigger>
                <TooltipContent className="text-xs">
                  {copied ? "Copié !" : "Copier les coordonnées"}
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
              aria-label={`${done ? "Modifier" : buttonLabel} sur la carte`}
              onClick={onClick}
              className="shrink-0 text-xs h-7 w-24 self-start rounded-md gap-1.5 transition-all"
            >
              {active
                ? <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                : done
                  ? <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  : <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              }
              {active ? "En cours…" : done ? "Modifier" : buttonLabel}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-xs max-w-[200px] text-center">
            {tooltip}
          </TooltipContent>
        </Tooltip>

      </div>

      {/* ── Message contextuel ── */}
      {fieldState === "idle" && (
        <p className="flex items-start gap-1.5 text-[11px] text-muted-foreground leading-relaxed">
          <MousePointerClick className="w-3 h-3 flex-shrink-0 mt-px" />
          Recherchez une adresse précise (ville, quartier, rue, point d’intérêt) pour gagner du temps,
          ou activez la sélection sur la carte pour positionner manuellement l’emplacement exact.
          Vous pouvez combiner les deux méthodes à tout moment.
        </p>
      )}
      {fieldState === "active" && (
        <p className="flex items-start gap-1.5 text-[11px] text-muted-foreground leading-relaxed">
          <LocateFixed className="w-3 h-3 flex-shrink-0 mt-px animate-pulse" />
          Mode sélection activé — cliquez sur la carte pour définir précisément votre position.
          Les coordonnées GPS seront automatiquement récupérées et converties en adresse.
          Vous pouvez également continuer à affiner votre recherche dans le champ.
        </p>
      )}
      {fieldState === "done" && (
        <p className="flex items-start gap-1.5 text-[11px] text-muted-foreground leading-relaxed">
          <ArrowRight className="w-3 h-3 flex-shrink-0 mt-px" />
          Emplacement enregistré avec succès. Vous pouvez le modifier à tout moment en cliquant sur
          « Modifier », en sélectionnant un nouveau point sur la carte ou en saisissant une autre adresse.
        </p>
      )}
    </div>
  )
}