"use client"

import { useState } from "react"
import {
  LocateFixed,
  Timer,
  MapPin,
  Copy,
  CheckCheck,
} from "lucide-react"

import { Card, CardLabel } from "./MessageCard"
import { MapDisplay } from "@/components/map/MapDisplay"

interface Props {
  message: {
    duration: number
    lat: number
    lng: number
    label?: string
    accuracy?: number
  }
  isMe: boolean
}

export function LiveLocationMessage({ message, isMe }: Props) {
  const [copied, setCopied] = useState(false)

  const position: [number, number] = [message.lat, message.lng]

  const handleCopy = () => {
    const coords = `${message.lat.toFixed(5)}, ${message.lng.toFixed(5)}`
    navigator.clipboard.writeText(coords)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Card isMe={isMe}>

      {/* LABEL */}
      <CardLabel
        icon={LocateFixed}
        label={isMe ? "Position partagée" : "Position reçue"}
      />

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Timer className="w-3 h-3" />
          {message.duration} min
        </span>
      </div>

      {/* DESCRIPTION */}
      <p className="text-[11px] text-muted-foreground leading-snug">
        Cette position est partagée en temps réel afin de vous aider à vous localiser facilement.
        Elle peut être utilisée comme point de rendez-vous ou pour suivre l’arrivée de l’autre
        participant. Les informations affichées ci-dessous sont mises à jour automatiquement
        pendant la durée de partage.
      </p>

      {/* LOCATION INFO */}
      <div className="space-y-1">

        {/* Label */}
        {message.label && (
          <div className="flex items-center gap-1.5 text-xs text-foreground">
            <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-medium truncate">
              {message.label}
            </span>
          </div>
        )}

        {/* Coordinates + Copy */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono bg-muted px-2 py-0.5 rounded-md text-muted-foreground">
            {message.lat.toFixed(5)}, {message.lng.toFixed(5)}
          </span>

          <button
            onClick={handleCopy}
            className="p-1 rounded-md hover:bg-muted transition"
          >
            {copied ? (
              <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* MAP */}
      <div className="rounded-lg overflow-hidden border border-border h-40">
        <MapDisplay
          position={position}
          accuracy={message.accuracy}
          lat={message.lat}
          lng={message.lng}
        />
      </div>

    </Card>
  )
}