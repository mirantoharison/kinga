"use client"

import { RideCard } from "@/components/ride/search/RideCard"

export default function ListRidePage() {

  const rides = [
    {
      from: "Antananarivo",
      to: "Tamatave",
      time: "08:30",
      price: 12000,
      seats: 3,
      driver: "Jean",
      rating: 4.8,
    },
    {
      from: "Antsirabe",
      to: "Fianarantsoa",
      time: "10:00",
      price: 15000,
      seats: 2,
      driver: "Marie",
      rating: 4.6,
    },
  ]

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">

      <h1 className="text-lg font-semibold">
        Trajets disponibles
      </h1>

      {rides.map((ride, i) => (
        <RideCard key={i} {...ride} />
      ))}

    </div>
  )
}