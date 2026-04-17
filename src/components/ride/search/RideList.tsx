"use client"

import { RideCard } from "./RideCard"

interface Ride {
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
}

export function RideList({ rides }: Props) {
  return (
    <div className="space-y-4">
      {rides.map((ride, i) => (
        <RideCard key={i} ride={ride} />
      ))}
    </div>
  )
}