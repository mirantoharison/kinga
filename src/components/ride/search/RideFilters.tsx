"use client"

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
    <div className="p-4 rounded-xl border bg-muted/40 space-y-4">

      {/* DESCRIPTION */}
      <p className="text-xs text-muted-foreground leading-relaxed">
        Les filtres vous permettent d’affiner votre recherche en fonction de vos contraintes.
        Vous pouvez par exemple limiter le prix ou choisir un trajet avec moins de voyageurs pour plus de confort.
      </p>

      {/* PRIX */}
      <div>
        <p className="text-xs mb-1">
          Prix maximum : {maxPrice} Ar
        </p>

        <input
          type="range"
          min={5000}
          max={30000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* SIÈGES */}
      <div>
        <p className="text-xs mb-1">
          Nombre minimum de voyageurs : {minSeats}
        </p>

        <input
          type="range"
          min={1}
          max={4}
          value={minSeats}
          onChange={(e) => setMinSeats(Number(e.target.value))}
          className="w-full"
        />
      </div>

    </div>
  )
}