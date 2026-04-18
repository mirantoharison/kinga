"use client"

import { useState } from "react"
import {
  Bell,
  Search,
  CheckCheck,
  Trash2,
  MessageCircle,
  Car,
  CreditCard,
  Info,
  Clock,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

type NotificationType = "message" | "ride" | "payment" | "system"

interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  date: string
  read: boolean
}

const FILTERS = {
  all: "Toutes",
  unread: "Non lues",
  message: "Messages",
  ride: "Trajets",
  payment: "Paiements",
  system: "Système",
}

const initialData: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "Nouveau message reçu",
    description: "Jean vous a écrit pour le trajet Antananarivo → Tamatave",
    date: "Il y a 2 min",
    read: false,
  },
  {
    id: "2",
    type: "ride",
    title: "Réservation confirmée",
    description: "Votre place pour demain à 08:00 est confirmée",
    date: "Il y a 1 heure",
    read: false,
  },
  {
    id: "3",
    type: "payment",
    title: "Paiement reçu",
    description: "Vous avez reçu 15 000 Ar",
    date: "Aujourd’hui",
    read: true,
  },
  {
    id: "4",
    type: "system",
    title: "Mise à jour disponible",
    description: "De nouvelles fonctionnalités ont été ajoutées",
    date: "Hier",
    read: true,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialData)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState<string[]>([])

  /* ─────────────── DERIVED ─────────────── */

  const filtered = notifications.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase())

    const matchFilter =
      filter === "all" ||
      (filter === "unread" && !n.read) ||
      n.type === filter

    return matchSearch && matchFilter
  })

  const stats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.read).length,
    today: notifications.filter((n) => n.date.includes("Aujourd’hui")).length,
  }

  const multiSelect = selected.length > 0

  /* ─────────────── ACTIONS ─────────────── */

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const clearSelection = () => setSelected([])

  const markOneRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markSelectedRead = () => {
    setNotifications((prev) =>
      prev.map((n) =>
        selected.includes(n.id) ? { ...n, read: true } : n
      )
    )
    clearSelection()
  }

  const deleteSelected = () => {
    setNotifications((prev) =>
      prev.filter((n) => !selected.includes(n.id))
    )
    clearSelection()
  }

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    )
  }

  /* ─────────────── HELPERS ─────────────── */

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "message":
        return <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
      case "ride":
        return <Car className="w-3.5 h-3.5 text-emerald-500" />
      case "payment":
        return <CreditCard className="w-3.5 h-3.5 text-amber-500" />
      default:
        return <Info className="w-3.5 h-3.5 text-muted-foreground" />
    }
  }

  /* ─────────────── UI ─────────────── */

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* 🧾 HEADER */}
      <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
          <Bell className="w-5 h-5 text-emerald-500" />
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold">Notifications</h2>

          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Cet espace centralise toutes les activités importantes liées à votre compte :
            nouveaux messages, mises à jour de trajets, confirmations de réservation,
            paiements ainsi que les informations système utiles au bon déroulement de
            vos déplacements. Les notifications les plus récentes et non lues sont mises en avant afin de
            vous permettre de réagir rapidement, suivre l’évolution de vos trajets en
            temps réel et rester informé à chaque étape de votre expérience. Vous pouvez consulter, filtrer ou marquer comme lues ces notifications à tout
            moment pour garder une vue claire et organisée de votre activité.
          </p>
        </div>

        <Badge className="bg-emerald-50 text-emerald-600 border shrink-0">
          {stats.unread} non lue{stats.unread > 1 && "s"}
        </Badge>
      </div>

      {/* 📊 STATS */}
      <div className="flex gap-2 flex-wrap">
        <Badge>{stats.total} total</Badge>
        <Badge variant="secondary">{stats.unread} non lues</Badge>
        <Badge variant="secondary">{stats.today} aujourd’hui</Badge>
      </div>

      {/* 🔍 FILTERS */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une notification..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap pr-3">
          {(Object.keys(FILTERS) as Array<keyof typeof FILTERS>).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "secondary" : "outline"}
              size="sm"
              className="rounded-full text-xs h-7"
              onClick={() => setFilter(f)}
            >
              {FILTERS[f]}
            </Button>
          ))}
        </div>
      </div>

      {/* ⚡ BULK ACTIONS */}
      {multiSelect && (
        <div className="flex items-center justify-between bg-muted/40 border rounded-xl px-4 py-2">
          <span className="text-xs">
            {selected.length} sélectionnée{selected.length > 1 && "s"}
          </span>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={markSelectedRead}>
              <CheckCheck className="w-4 h-4 mr-1" />
              Lire
            </Button>

            <Button size="sm" variant="destructive" onClick={deleteSelected}>
              <Trash2 className="w-4 h-4 mr-1" />
              Supprimer
            </Button>

            <Button size="sm" variant="ghost" onClick={clearSelection}>
              Annuler
            </Button>
          </div>
        </div>
      )}

      {/* 📦 LIST */}
      <div className="flex flex-col gap-3">

        {filtered.map((n) => (
          <div
            key={n.id}
            className={`cursor-pointer transition-all rounded-2xl border ${selected.includes(n.id) ? "ring-2 ring-emerald-500" : ""
              } ${!n.read ? "bg-emerald-50/40 border-emerald-200" : ""}`}
            onClick={() => {
              if (multiSelect) toggleSelect(n.id)
              else markOneRead(n.id)
            }}
          >
            <div className="p-4 space-y-3">

              {/* TOP */}
              <div className="flex items-center justify-between gap-3">

                <div className="flex items-center gap-2 min-w-0">
                  <Checkbox
                    checked={selected.includes(n.id)}
                    onCheckedChange={() => toggleSelect(n.id)}
                    onClick={(e) => e.stopPropagation()}
                  />

                  <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center">
                    {getIcon(n.type)}
                  </div>

                  <span className="text-sm font-semibold truncate">
                    {n.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {!n.read && (
                    <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  )}
                  <Badge variant="outline" className="text-[10px]">
                    {n.type}
                  </Badge>
                </div>
              </div>

              {/* META */}
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                {n.date}
              </div>

              {/* DESC */}
              <p className="text-xs text-muted-foreground">
                {n.description}
              </p>

              {/* FOOTER */}
              <div className="flex justify-end">
                {!n.read && (
                  <>
                    <Separator />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 text-[11px] px-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        markOneRead(n.id)
                      }}
                    >
                      <CheckCheck className="w-3 h-3 mr-1" />
                      Marquer lu
                    </Button>
                  </>
                )}
              </div>

            </div>
          </div>
        ))}

        {/* EMPTY */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-6 h-6 mx-auto text-muted-foreground/40 mb-2" />
            <p className="text-sm font-medium">
              Aucune notification
            </p>
            <p className="text-xs text-muted-foreground">
              Les nouvelles activités apparaîtront ici
            </p>
          </div>
        )}

      </div>

      <Separator />

      {/* FOOTER */}
      <Button variant="outline" className="w-full" onClick={markAllRead}>
        <CheckCheck className="w-4 h-4 mr-2" />
        Tout marquer comme lu
      </Button>

    </div>
  )
}