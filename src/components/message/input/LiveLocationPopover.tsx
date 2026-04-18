"use client"

import { useState, useEffect } from "react"
import { LocateFixed } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

import { type NewMessage } from "@/components/message/discussion/MessageBubble"
import { useGeolocation } from "@/hooks/use-geolocation"

interface Props {
  push: (msg: NewMessage) => void
}

export function LiveLocationPopover({ push }: Props) {
  const [liveOpen, setLiveOpen] = useState(false)
  const [duration, setDuration] = useState(15)

  const { coords, error, loading, getLocation } = useGeolocation()

  useEffect(() => {
    if (!coords) return

    push({
      sender: "me",
      type: "live-location",
      duration,
      lat: coords.latitude,
      lng: coords.longitude,
      accuracy: coords.accuracy,
      label: "Votre position",
    })

    setLiveOpen(false)
  }, [coords])

  const handleShare = () => {
    getLocation()
  }

  return (
    <Popover open={liveOpen} onOpenChange={setLiveOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline">
          <LocateFixed className="w-4 h-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-4 space-y-3 z-[9999]">
        <div>
          <p className="text-sm font-semibold">Partager ma position</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
            Votre position GPS sera visible par l’autre participant pendant la durée choisie. Idéal pour vous retrouver facilement au point de départ.
          </p>
        </div>

        {/* DURÉE */}
        <div className="flex gap-2">
          {[15, 30, 60].map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`flex-1 border rounded-md py-1 text-xs transition ${duration === d
                  ? "bg-primary text-white border-primary"
                  : "bg-background hover:bg-muted"
                }`}
            >
              {d} min
            </button>
          ))}
        </div>

        {/* ERREUR */}
        {error && (
          <p className="text-xs text-destructive">
            {error}
          </p>
        )}

        {/* ACTION */}
        <Button
          size="sm"
          className="w-full"
          onClick={handleShare}
          disabled={loading}
        >
          {loading ? "Localisation en cours..." : "Partager ma position"}
        </Button>
      </PopoverContent>
    </Popover>
  )
}