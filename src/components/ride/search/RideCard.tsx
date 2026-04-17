"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users, Star } from "lucide-react"

interface Props {
  from: string
  to: string
  time: string
  price: number
  seats: number
  driver: string
  rating: number
}

export function RideCard({
  from,
  to,
  time,
  price,
  seats,
  driver,
  rating,
}: Props) {
  return (
    <Card className="p-4 space-y-3">

      {/* TRAJET */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <MapPin className="w-4 h-4 text-emerald-500" />
          {from} → {to}
        </div>

        <div className="text-sm font-semibold text-emerald-600">
          {price} Ar
        </div>
      </div>

      {/* INFOS */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">

        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {time}
        </div>

        <div className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          {seats} places
        </div>

      </div>

      {/* DRIVER */}
      <div className="flex items-center justify-between">

        <div className="text-xs text-muted-foreground flex items-center gap-2">
          {driver}
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500" />
            {rating}
          </span>
        </div>

        <Button size="sm">
          Voir
        </Button>

      </div>

    </Card>
  )
}