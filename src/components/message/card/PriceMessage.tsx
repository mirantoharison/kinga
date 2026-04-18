"use client"

import {
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardLabel } from "./MessageCard"

interface Props {
  message: {
    id: number
    price: number
    status: "pending" | "accepted" | "refused"
  }
  isMe: boolean
  onUpdate: (id: number, status: "accepted" | "refused") => void
}

export function PriceMessage({ message, isMe, onUpdate }: Props) {
  const isPending = message.status === "pending"

  return (
    <Card isMe={isMe}>
      {/* LABEL */}
      <CardLabel
        icon={DollarSign}
        label={isMe ? "Proposition envoyée" : "Proposition reçue"}
      />

      {/* PRICE */}
      <p className="text-lg font-semibold leading-none">
        {message.price.toLocaleString()} Ar
        <span className="text-xs font-normal text-muted-foreground ml-1">
          / place
        </span>
      </p>

      {/* ACTIONS (si reçu) */}
      {isPending && !isMe && (
        <div className="flex gap-2 pt-0.5">
          <Button
            size="sm"
            className="flex-1 gap-1"
            onClick={() => onUpdate(message.id, "accepted")}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Accepter
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="flex-1 gap-1"
            onClick={() => onUpdate(message.id, "refused")}
          >
            <XCircle className="w-3.5 h-3.5" />
            Refuser
          </Button>
        </div>
      )}

      {/* STATUS (envoyé) */}
      {isPending && isMe && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>En attente de réponse</span>
        </div>
      )}

      {/* ACCEPTED */}
      {message.status === "accepted" && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-600">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Proposition acceptée</span>
        </div>
      )}

      {/* REFUSED */}
      {message.status === "refused" && (
        <div className="flex items-center gap-1.5 text-xs text-destructive">
          <XCircle className="w-3.5 h-3.5" />
          <span>Proposition refusée</span>
        </div>
      )}
    </Card>
  )
}