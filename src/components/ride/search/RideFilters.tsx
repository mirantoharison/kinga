"use client"

import { Slider } from "@/components/ui/slider"

interface Props {
  maxPrice: number
  setMaxPrice: (value: number) => void
  minSeats: number
  setMinSeats: (value: number) => void
}

export function RideFilters({
  maxPrice,
  setMaxPrice,
  minSeats,
  setMinSeats,
}: Props) {
  return (
    <div className="p-4 rounded-xl border bg-muted/40 space-y-5">

      {/* DESCRIPTION */}
      <p className="text-xs text-muted-foreground leading-relaxed">
        Affinez votre recherche selon vos préférences.
        Ajustez le prix et le nombre de voyageurs pour trouver un trajet adapté à votre confort et à votre budget.
      </p>

      {/* PRIX */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">
            Prix maximum
          </span>
          <span className="font-medium text-emerald-600">
            {maxPrice} Ar
          </span>
        </div>

        <Slider
          min={5000}
          max={30000}
          step={500}
          value={[maxPrice]}
          onValueChange={(val) => setMaxPrice(val[0])}
        />
      </div>

      {/* SIÈGES */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">
            Voyageurs minimum
          </span>
          <span className="font-medium text-emerald-600">
            {minSeats}
          </span>
        </div>

        <Slider
          min={1}
          max={4}
          step={1}
          value={[minSeats]}
          onValueChange={(val) => setMinSeats(val[0])}
        />
      </div>

    </div>
  )
}