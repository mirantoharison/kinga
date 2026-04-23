"use client"

import { RideCard } from "./RideCard"
import { cn } from "@/lib/utils"

interface Ride {
  id?: string | number
  from: string
  to: string
  time: string
  date: string
  distance: number
  duration: string
  price: number
  seats: number
  driver: string
  rating: number
  reviews: number
}

interface Props {
  rides: Ride[]
  archived?: boolean
}

export function RideList({ rides, archived = false }: Props) {

  if (!rides.length) return null

  return (
    <div
      className={cn(
        "grid gap-4",
        // 🔥 responsive → déjà prêt pour scaling
        "md:grid-cols-2"
      )}
    >
      {rides.map((ride, i) => (
        <RideCard
          key={ride.id ?? `${ride.from}-${ride.to}-${ride.date}-${i}`}
          ride={ride}
          archived={archived}
        />
      ))}
    </div>
  )
}