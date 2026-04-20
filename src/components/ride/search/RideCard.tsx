"use client"

import {
  Car,
  Clock,
  Route,
  MapPin,
  Users,
  Info,
  Star,
  Trash2,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface Ride {
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
  mode?: "public" | "dashboard" | "message"
  archived?: boolean
  onDelete?: () => void
}

export function RideCard({ ride, mode = "public", archived = false, onDelete }: Props) {
  const isLastSeat = ride.seats === 1

  return (
    <Card
      className={cn(
        "transition border",
        "hover:shadow-md",
        archived && "opacity-70 hover:opacity-100"
      )}
    >
      <CardContent className="p-4 space-y-4">

        {/* HEADER BADGE */}
        {archived && (
          <div className="flex justify-end">
            <Badge variant="secondary" className="text-[10px]">
              Archivé
            </Badge>
          </div>
        )}

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
            <span className="truncate max-w-[45%]">{ride.from}</span>
            <span className="truncate max-w-[45%] text-right">{ride.to}</span>
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
            <Badge variant="destructive" className="text-[10px]">
              Dernière place
            </Badge>
          )}

        </div>

        <Separator />

        {/* DRIVER + PRICE */}
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
              / voyageur
            </p>
          </div>

        </div>

        {/* ACTIONS SIMPLIFIÉES */}
        <div className="flex gap-2 pt-2">

          {mode === "dashboard" ? (
            <>
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                <Info className="w-3 h-3 mr-1" />
                Voir
              </Button>

              {onDelete && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={onDelete}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Supprimer
                </Button>
              )}
            </>
          ) : mode === "message" ? (
            <Button variant="outline" size="sm" className="w-full text-xs">
              <Info className="w-3 h-3 mr-1" />
              Voir le trajet
            </Button>
          ) : archived ? (
            <>
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                <Info className="w-3 h-3 mr-1" />
                Détails
              </Button>

              {onDelete && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={onDelete}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Supprimer
                </Button>
              )}
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                <Info className="w-3 h-3 mr-1" />
                Détails
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