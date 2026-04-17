"use client"

import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Props {
  search: string
  setSearch: (value: string) => void
  showFilters: boolean
  toggleFilters: () => void
}

export function RideSearch({
  search,
  setSearch,
  showFilters,
  toggleFilters,
}: Props) {
  return (
    <div className="space-y-3">

      {/* LABEL */}
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs uppercase text-muted-foreground">
          Recherche
        </span>
      </div>

      {/* DESCRIPTION */}
      <p className="text-xs text-muted-foreground leading-relaxed">
        Saisissez une ville de départ ou d’arrivée pour filtrer les trajets disponibles au sein de la communauté. La recherche s’effectue en temps réel et met automatiquement à jour les résultats au fur et à mesure de votre saisie, vous permettant de repérer rapidement les trajets correspondant à votre besoin sans avoir à recharger la page.
      </p>

      {/* INPUT + BUTTON */}
      <div className="flex gap-2">
        
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          
          <Input
            placeholder="Ex: Antananarivo"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={toggleFilters}
        >
          <Filter className="w-4 h-4" />
        </Button>

      </div>
    </div>
  )
}