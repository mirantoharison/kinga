"use client"

import { useCallback, useMemo, useState } from "react"
import { Copy, CheckCheck, MapPin, Building2, Home, Globe, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandList, CommandItem } from "@/components/ui/command"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useLocationSearch, type SearchResult } from "@/hooks/use-geolocation-search"
import { useCoordDisplay } from "@/hooks/use-coord-display"
import {
  MIN_QUERY_LENGTH,
  COPY_FEEDBACK_DELAY,
  formatCoords,
  buildFullLabel,
} from "@/lib/locationUtils"

// ─── Types ──────────────────────────────────────────────────────────────────

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

  const handleCopyCoords = useCallback(() => {
    if (!coords) return
    navigator.clipboard.writeText(coords).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DELAY)
    })
  }, [coords])

  const buttonVariant = useMemo<"default" | "outline" | "secondary">(
    () => (active ? "default" : done ? "outline" : "secondary"),
    [active, done]
  )

  const inputValue = query !== "" ? query : address

  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground flex items-center gap-1">
        <MapPin className={`w-3 h-3 ${color}`} aria-hidden="true" />
        {label}
      </Label>

      <div className="flex items-start gap-2">
        <div className="relative flex-1 min-w-0">
          <Popover open={popoverOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <span className="absolute inset-0 pointer-events-none" aria-hidden="true" />
            </PopoverTrigger>

            <Input
              value={inputValue}
              placeholder={placeholder}
              aria-label={label}
              aria-expanded={popoverOpen}
              aria-haspopup="listbox"
              aria-autocomplete="list"
              onChange={(e) => handleQueryChange(e.target.value)}
              onFocus={() => {
                if (query.length >= MIN_QUERY_LENGTH) setIsOpen(true)
              }}
              onBlur={() => setTimeout(() => setIsOpen(false), 150)} // délai pour laisser onSelect s'exécuter
            />

            <PopoverContent
              align="start"
              side="bottom"
              sideOffset={6}
              onOpenAutoFocus={(e) => e.preventDefault()}
              onInteractOutside={() => setIsOpen(false)}
              className="p-0 z-[9999] w-[var(--radix-popover-trigger-width)] max-w-[95vw] sm:max-w-[420px] md:max-w-[700px] rounded-md shadow-md"
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
                      className="flex items-center gap-2 px-3 py-2.5 text-xs text-muted-foreground">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                      Recherche en cours…
                    </div>
                  )}

                  {!loading && query.length >= MIN_QUERY_LENGTH && results.length === 0 && (
                    <div role="status" className="px-3 py-4 text-center space-y-0.5">
                      <p className="text-sm font-medium">Aucun résultat</p>
                      <p className="text-xs text-muted-foreground">Essayez un nom de ville ou un lieu plus précis</p>
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
                        className="flex items-start gap-2.5 cursor-pointer px-3 py-2 hover:bg-muted transition-colors"
                      >
                        <Icon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                        <div className="flex flex-col leading-snug min-w-0">
                          <span className="text-sm font-medium truncate">{main}</span>
                          {secondary.length > 0 && (
                            <span className="text-xs text-muted-foreground truncate">
                              {secondary.join(",")}
                            </span>
                          )}
                        </div>
                      </CommandItem>
                    )
                  })}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {coords && query === "" && (
            <div className="mt-1 flex items-center justify-end gap-1 pr-0.5">
              <span className="text-[10px] font-mono text-muted-foreground select-all">{coords}</span>
              <button
                type="button"
                onClick={handleCopyCoords}
                aria-label={copied ? "Coordonnées copiées" : "Copier les coordonnées"}
                className="p-1 rounded hover:bg-muted transition-colors"
              >
                {copied
                  ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                  : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
              </button>
            </div>
          )}
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button" size="sm" variant={buttonVariant}
              aria-pressed={active}
              aria-label={`${done ? "Modifier" : buttonLabel} sur la carte`}
              onClick={onClick}
              className="shrink-0 text-xs h-7 self-start"
            >
              <MapPin className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
              {done ? "Modifier" : buttonLabel}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-xs max-w-[200px] text-center">{tooltip}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}