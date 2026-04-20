"use client"

import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Props {
  unreadCount: number
}

export function NotificationsHeader({ unreadCount }: Props) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">

      {/* ICON */}
      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
        <Bell className="w-5 h-5 text-emerald-500" />
      </div>

      {/* CONTENT */}
      <div className="flex-1">

        <h2 className="text-lg font-semibold">
          Notifications
        </h2>

        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          Retrouvez ici toutes les informations importantes liées à votre activité :
          messages reçus, mises à jour de trajets, confirmations de réservation,
          paiements ainsi que les alertes système essentielles. Les éléments non lus
          sont mis en avant afin de vous permettre de réagir rapidement et de suivre
          efficacement l’évolution de vos interactions.
        </p>

      </div>

      {/* BADGE */}
      <Badge className="bg-emerald-50 text-emerald-600 border shrink-0">
        {unreadCount} non lue{unreadCount > 1 && "s"}
      </Badge>

    </div>
  )
}