"use client"

import { useState } from "react"
import {
  Bell,
  CheckCheck,
  Filter,
  MessageCircle,
  Car,
  CreditCard,
  Info,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const filters = ["Toutes", "Messages", "Trajets", "Paiements", "Système"]

const notifications = [
  {
    id: 1,
    type: "message",
    title: "Nouveau message reçu",
    description: "Jean vous a envoyé un message concernant votre trajet Antananarivo → Tamatave.",
    time: "Il y a 2 min",
    unread: true,
  },
  {
    id: 2,
    type: "ride",
    title: "Réservation confirmée",
    description: "Votre place a été confirmée pour le trajet demain à 08:00.",
    time: "Il y a 1 heure",
    unread: true,
  },
  {
    id: 3,
    type: "payment",
    title: "Paiement reçu",
    description: "Vous avez reçu un paiement de 15 000 Ar.",
    time: "Aujourd’hui",
    unread: false,
  },
  {
    id: 4,
    type: "system",
    title: "Mise à jour de l’application",
    description: "De nouvelles fonctionnalités sont disponibles dans votre application.",
    time: "Hier",
    unread: false,
  },
]

function getIcon(type: string) {
  switch (type) {
    case "message":
      return <MessageCircle className="w-4 h-4 text-blue-500" />
    case "ride":
      return <Car className="w-4 h-4 text-emerald-500" />
    case "payment":
      return <CreditCard className="w-4 h-4 text-amber-500" />
    default:
      return <Info className="w-4 h-4 text-muted-foreground" />
  }
}

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("Toutes")

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className="min-h-dvh w-full max-w-[430px] mx-auto flex flex-col bg-background">

      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-base font-semibold">Notifications</h1>
              <p className="text-xs text-muted-foreground">
                Suivez l’activité liée à vos trajets et échanges
              </p>
            </div>
          </div>

          <Button variant="ghost" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* STATS */}
        <div className="flex gap-2 px-4 pb-3">
          <Badge variant="secondary" className="text-emerald-600 bg-emerald-50 border border-emerald-200">
            {unreadCount} non lue{unreadCount > 1 && "s"}
          </Badge>
          <Badge variant="secondary">Aujourd’hui</Badge>
          <Badge variant="secondary">Activité récente</Badge>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap ${
                activeFilter === f
                  ? "bg-emerald-500 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-3 px-4 py-4">

        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`rounded-2xl border p-4 flex gap-3 transition ${
              notif.unread
                ? "bg-emerald-50/40 border-emerald-200"
                : "bg-background"
            }`}
          >
            {/* ICON */}
            <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
              {getIcon(notif.type)}
            </div>

            {/* CONTENT */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium leading-snug">
                  {notif.title}
                </p>

                {notif.unread && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1" />
                )}
              </div>

              <p className="text-xs text-muted-foreground mt-1 leading-snug">
                {notif.description}
              </p>

              <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                {notif.time}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="text-xs h-7">
                  Voir
                </Button>
                {notif.unread && (
                  <Button size="sm" variant="ghost" className="text-xs h-7">
                    Marquer comme lu
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* EMPTY STATE */}
        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
            <Bell className="w-8 h-8 text-muted-foreground/40" />
            <p className="text-sm font-medium">
              Aucune notification pour le moment
            </p>
            <p className="text-xs text-muted-foreground max-w-[250px]">
              Les nouvelles activités liées à vos trajets et messages apparaîtront ici automatiquement.
            </p>
          </div>
        )}

      </div>

      <Separator />

      {/* FOOTER ACTION */}
      <div className="p-4">
        <Button variant="outline" className="w-full gap-2">
          <CheckCheck className="w-4 h-4" />
          Tout marquer comme lu
        </Button>
      </div>

    </div>
  )
}