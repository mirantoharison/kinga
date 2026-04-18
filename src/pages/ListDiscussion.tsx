"use client"

import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"

import {
  MessageCircle,
  Search,
  MapPin,
  Clock,
  Trash2,
  Archive,
  CheckCircle,
  SlidersHorizontal,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

/* ───────────────────────── DATA ───────────────────────── */

interface Conversation {
  id: number
  from: string
  to: string
  date: string
  time: string
  distance: number
  duration: string
  price: number
  priceStatus: string
  status: "pending" | "confirmed" | "discussion"
  urgency?: string
  lastMessage: string
  unread: number
  user: string
  role: string
  rating: number
}

const ALL_CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    from: "Antananarivo",
    to: "Tamatave",
    date: "17 Avr 2026",
    time: "08:30",
    distance: 320,
    duration: "6h30",
    price: 12000,
    priceStatus: "proposé",
    status: "pending",
    urgency: "Départ proche",
    lastMessage: "Offre envoyée",
    unread: 2,
    user: "Rakoto",
    role: "Conducteur",
    rating: 4.8,
  },
]

/* ───────────────────────── PAGE ───────────────────────── */

export default function MessagesListPage() {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<number[]>([])
  const [sort, setSort] = useState("recent")

  /* ───────────────────────── FILTER ───────────────────────── */

  const filtered = useMemo(() => {
    let data = [...ALL_CONVERSATIONS]

    if (search) {
      const q = search.toLowerCase()
      data = data.filter(
        (c) =>
          c.from.toLowerCase().includes(q) ||
          c.to.toLowerCase().includes(q)
      )
    }

    if (sort === "unread") {
      data.sort((a, b) => b.unread - a.unread)
    }

    return data
  }, [search, sort])

  /* ───────────────────────── ACTIONS ───────────────────────── */

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    )
  }

  const clearSelection = () => setSelected([])

  /* ───────────────────────── HELPERS ───────────────────────── */

  const getStatus = (status: string) => {
    switch (status) {
      case "confirmed":
        return { label: "Confirmé", class: "bg-emerald-50 text-emerald-600 border" }
      case "pending":
        return { label: "En attente", class: "bg-amber-50 text-amber-600 border" }
      default:
        return { label: "Discussion", class: "bg-blue-50 text-blue-600 border" }
    }
  }

  /* ───────────────────────── UI ───────────────────────── */

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-emerald-500" />
        </div>

        <div className="flex-1">
          <h1 className="text-lg font-semibold">
            Gestion des conversations de trajets
          </h1>

          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Cette section vous permet de suivre, organiser et gérer toutes vos discussions liées aux trajets.
            Chaque conversation regroupe les informations essentielles : itinéraire, statut, prix, ainsi que les derniers échanges.
            Vous pouvez rapidement identifier les actions à effectuer, répondre aux demandes en attente ou gérer vos conversations
            grâce aux outils de tri, filtrage et actions groupées.
          </p>
        </div>

        <Badge className="bg-emerald-50 text-emerald-600 border">
          {filtered.length}
        </Badge>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col gap-3">

        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un trajet..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* ACTION BAR */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSort("recent")}
            >
              <SlidersHorizontal className="w-4 h-4 mr-1" />
              Récent
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSort("unread")}
            >
              Non lus
            </Button>

          </div>

          {selected.length > 0 && (
            <div className="flex items-center gap-2">

              <Button
                size="sm"
                variant="outline"
              >
                <Archive className="w-4 h-4 mr-1" />
                Archiver
              </Button>

              <Button
                size="sm"
                variant="destructive"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Supprimer
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={clearSelection}
              >
                Annuler
              </Button>

            </div>
          )}
        </div>

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {filtered.map((conv) => {
          const status = getStatus(conv.status)
          const isSelected = selected.includes(conv.id)

          return (
            <Card
              key={conv.id}
              className={`cursor-pointer transition ${isSelected ? "ring-2 ring-emerald-500" : ""}`}
            >
              <CardContent className="p-4 space-y-3">

                {/* TOP */}
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(conv.id)}
                    />

                    <p className="text-sm font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                      {conv.from} → {conv.to}
                    </p>

                  </div>

                  <span className="text-[11px] text-muted-foreground">
                    {conv.time}
                  </span>
                </div>

                {/* META */}
                <div className="flex gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {conv.date}
                  </span>

                  <span>{conv.distance} km</span>
                  <span>{conv.duration}</span>

                  {conv.urgency && (
                    <span className="text-amber-600 font-medium">
                      {conv.urgency}
                    </span>
                  )}
                </div>

                {/* PRICE + STATUS */}
                <div className="flex justify-between items-center">
                  <p className="text-xs">
                    {conv.price.toLocaleString()} Ar • {conv.priceStatus}
                  </p>

                  <Badge className={`text-[10px] ${status.class}`}>
                    {status.label}
                  </Badge>
                </div>

                {/* MESSAGE */}
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground truncate">
                    {conv.lastMessage}
                  </p>

                  {conv.unread > 0 && (
                    <Badge className="text-[10px]">
                      {conv.unread}
                    </Badge>
                  )}
                </div>

                {/* USER */}
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span>avec</span>

                  <Avatar className="w-5 h-5">
                    <AvatarImage src={`https://i.pravatar.cc/100?u=${conv.id}`} />
                    <AvatarFallback>
                      {conv.user.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <span>{conv.user}</span>
                  <span>• {conv.role}</span>
                  <span>• {conv.rating}</span>
                </div>

              </CardContent>
            </Card>
          )
        })}

      </div>

    </div>
  )
}