"use client"

import {
  Car,
  Clock,
  Route,
  MapPin,
  Users,
  Info,
  Star,
  MessageCircle,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

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
  ride: Ride
  mode?: "public" | "dashboard"
}

export function RideCard({ ride, mode }: Props) {
  const isLastSeat = ride.seats === 1

  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="p-4 space-y-4">

        {/* TRAJET */}
        <div className="space-y-3">

          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <Car className="w-4 h-4 text-emerald-500" />

            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {ride.duration}
            </span>

            <span className="flex items-center gap-1">
              <Route className="w-3 h-3" />
              {ride.distance} km
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <div className="flex-1 border-t border-dashed border-muted-foreground/40" />
            <MapPin className="w-4 h-4 text-red-500" />
          </div>

          <div className="flex justify-between text-xs font-medium">
            <span>{ride.from}</span>
            <span>{ride.to}</span>
          </div>

        </div>

        {/* INFOS */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">

          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {ride.time}
          </span>

          <span className="flex items-center gap-1">
            <Info className="w-3 h-3" />
            {ride.date}
          </span>

          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {ride.seats} voyageur{ride.seats > 1 ? "s" : ""}
          </span>

          {isLastSeat && (
            <Badge variant="destructive">
              Dernier voyageur
            </Badge>
          )}

        </div>

        <Separator />

        {/* DRIVER */}
        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">
            <img
              src={`https://i.pravatar.cc/100?u=${ride.driver}`}
              className="w-10 h-10 rounded-full"
            />

            <div>
              <p className="text-sm font-medium">
                {ride.driver}
              </p>

              <div className="flex items-center gap-1 text-xs">
                <Star className="w-3 h-3 text-yellow-500" />
                {ride.rating}
                <span>• {ride.reviews} avis</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold">
              {ride.price} Ar
            </p>
            <p className="text-xs text-muted-foreground">
              par voyageur
            </p>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 pt-2">

          {mode === "dashboard" ? (
            <>
              <Button size="sm" className="flex-1 text-xs">
                Confirmer
              </Button>

              <Button variant="outline" size="sm" className="flex-1 text-xs">
                Voir
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                <Info className="w-3 h-3 mr-1" />
                Détails
              </Button>

              <Button variant="outline" size="sm" className="flex-1 text-xs">
                <MessageCircle className="w-3 h-3 mr-1" />
                Contacter
              </Button>

              <Button size="sm" className="flex-1 text-xs">
                Réserver
              </Button>
            </>
          )}

        </div>

      </CardContent>
    </Card>
  )
}