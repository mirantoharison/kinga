"use client"

import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"

import {
  MessageCircle, Search, MapPin, Clock, Trash2,
  Archive, SlidersHorizontal, Star, CheckCheck,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

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
  archived?: boolean
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    from: "Antananarivo", to: "Tamatave",
    date: "17 Avr 2026", time: "08:30",
    distance: 320, duration: "6h30",
    price: 12000, priceStatus: "proposé",
    status: "pending", urgency: "Départ proche",
    lastMessage: "Offre envoyée, en attente de réponse.",
    unread: 2, user: "Rakoto", role: "Conducteur", rating: 4.8,
  },
  {
    id: 2,
    from: "Antananarivo", to: "Majunga",
    date: "19 Avr 2026", time: "06:00",
    distance: 560, duration: "9h",
    price: 20000, priceStatus: "accepté",
    status: "confirmed",
    lastMessage: "Parfait, on se retrouve au départ à 6h.",
    unread: 0, user: "Hery", role: "Conducteur", rating: 4.6,
  },
  {
    id: 3,
    from: "Fianarantsoa", to: "Antananarivo",
    date: "20 Avr 2026", time: "07:00",
    distance: 410, duration: "7h",
    price: 15000, priceStatus: "en négociation",
    status: "discussion", urgency: "Départ demain",
    lastMessage: "Est-ce que 13 000 Ar ça vous convient ?",
    unread: 5, user: "Voahirana", role: "Passagère", rating: 4.9,
  },
  {
    id: 4,
    from: "Antananarivo", to: "Fort-Dauphin",
    date: "22 Avr 2026", time: "05:30",
    distance: 980, duration: "14h",
    price: 35000, priceStatus: "proposé",
    status: "pending",
    lastMessage: "Bonjour, est-ce que le trajet est direct ?",
    unread: 1, user: "Tiana", role: "Conducteur", rating: 4.4,
  },
  {
    id: 5,
    from: "Toliara", to: "Antananarivo",
    date: "25 Avr 2026", time: "04:00",
    distance: 950, duration: "13h",
    price: 30000, priceStatus: "confirmé",
    status: "confirmed",
    lastMessage: "Merci, à bientôt pour le trajet !",
    unread: 0, user: "Lanto", role: "Passager", rating: 5.0,
  },
  {
    id: 6,
    from: "Antananarivo", to: "Diego-Suarez",
    date: "28 Avr 2026", time: "05:00",
    distance: 1140, duration: "17h",
    price: 42000, priceStatus: "refusé",
    status: "discussion", urgency: "Prix contesté",
    lastMessage: "Je ne peux pas descendre en dessous de 40 000 Ar.",
    unread: 3, user: "Miora", role: "Conductrice", rating: 4.7,
  },
]

/* ───────────────────────── PAGE ───────────────────────── */

export default function MessagesListPage() {
  const navigate = useNavigate()

  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<number[]>([])
  const [sort, setSort] = useState<"recent" | "unread" | "price">("recent")
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "unread">("all")

  /* ───────────────────────── STATS ───────────────────────── */

  const stats = useMemo(() => ({
    total: conversations.filter(c => !c.archived).length,
    unread: conversations.filter(c => !c.archived).reduce((a, c) => a + c.unread, 0),
    confirmed: conversations.filter(c => !c.archived && c.status === "confirmed").length,
    pending: conversations.filter(c => !c.archived && c.status === "pending").length,
  }), [conversations])

  /* ───────────────────────── FILTER ───────────────────────── */

  const filtered = useMemo(() => {
    let data = conversations.filter(c => !c.archived)

    if (search) {
      const q = search.toLowerCase()
      data = data.filter(c =>
        c.from.toLowerCase().includes(q) ||
        c.to.toLowerCase().includes(q) ||
        c.user.toLowerCase().includes(q)
      )
    }

    if (filter === "pending") data = data.filter(c => c.status === "pending")
    if (filter === "confirmed") data = data.filter(c => c.status === "confirmed")
    if (filter === "unread") data = data.filter(c => c.unread > 0)

    if (sort === "unread") data.sort((a, b) => b.unread - a.unread)
    else if (sort === "price") data.sort((a, b) => b.price - a.price)

    return data
  }, [conversations, search, filter, sort])

  /* ───────────────────────── ACTIONS ───────────────────────── */

  const toggleSelect = (id: number) =>
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  const clearSelection = () => setSelected([])

  const markOneRead = (id: number) =>
    setConversations(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c))

  const markSelectedRead = () => {
    setConversations(prev => prev.map(c => selected.includes(c.id) ? { ...c, unread: 0 } : c))
    clearSelection()
  }

  const archiveSelected = () => {
    setConversations(prev => prev.map(c => selected.includes(c.id) ? { ...c, archived: true } : c))
    clearSelection()
  }

  const deleteSelected = () => {
    setConversations(prev => prev.filter(c => !selected.includes(c.id)))
    clearSelection()
  }

  /* ───────────────────────── HELPERS ───────────────────────── */

  const getStatus = (status: string) => {
    switch (status) {
      case "confirmed": return { label: "Confirmé", class: "bg-emerald-50 text-emerald-700 border border-emerald-200" }
      case "pending": return { label: "En attente", class: "bg-amber-50 text-amber-700 border border-amber-200" }
      default: return { label: "Discussion", class: "bg-blue-50 text-blue-700 border border-blue-200" }
    }
  }

  /* ───────────────────────── UI ───────────────────────── */

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* ── DESCRIPTION ── */}
      <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
          <MessageCircle className="w-5 h-5 text-emerald-500" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">
            Gestion des conversations liées aux trajets
          </h2>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Cette interface centralise l'ensemble de vos échanges liés à vos trajets, que vous soyez conducteur ou passager.
            Chaque conversation est directement associée à un déplacement précis afin de garantir une organisation claire
            et éviter toute confusion entre plusieurs trajets en cours.
          </p>
        </div>
        <Badge className="bg-emerald-50 text-emerald-600 border shrink-0">
          {filtered.length} discussions
        </Badge>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Conversations", value: stats.total },
          { label: "Non lus", value: stats.unread, highlight: "text-emerald-600" },
          { label: "Confirmés", value: stats.confirmed },
          { label: "En attente", value: stats.pending, highlight: "text-amber-600" },
        ].map(s => (
          <div key={s.label} className="bg-muted/50 rounded-xl px-4 py-3">
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-semibold mt-0.5 ${s.highlight ?? ""}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── SEARCH ── */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par ville, personne..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* ── FILTERS + SORT ── */}
      <div className="space-y-4">

        <div className="flex items-start rounded-2xl">
          <div className="flex-1 text-xs text-muted-foreground leading-relaxed">
            Utilisez les filtres par statut pour afficher uniquement les conversations en attente, confirmées ou contenant
            des messages non lus. Les options de tri vous permettent de réorganiser la liste selon la date, le nombre de
            messages non lus ou le montant du trajet, selon vos priorités du moment.
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-2 flex-wrap pr-3">
            {(["all", "pending", "confirmed", "unread"] as const).map(f => (
              <Button
                key={f}
                variant={filter === f ? "secondary" : "outline"}
                size="sm"
                className="rounded-full text-xs h-7"
                onClick={() => setFilter(f)}
              >
                {{ all: "Tous", pending: "En attente", confirmed: "Confirmés", unread: "Non lus" }[f]}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap border-l pl-3">
            {(["recent", "unread", "price"] as const).map(s => (
              <Button
                key={s}
                variant={sort === s ? "secondary" : "ghost"}
                size="sm"
                className="rounded-full text-xs h-7"
                onClick={() => setSort(s)}
              >
                <SlidersHorizontal className="w-3 h-3 mr-1" />
                {{ recent: "Récent", unread: "Non lus d'abord", price: "Prix" }[s]}
              </Button>
            ))}
          </div>
        </div>

      </div>

      {/* ── BULK ACTIONS ── */}
      {selected.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">
            <div className="flex-1">
              <p className="text-xs font-semibold mb-1">Actions groupées</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {selected.length} conversation{selected.length > 1 ? "s" : ""} sélectionnée{selected.length > 1 ? "s" : ""}.
                Vous pouvez les marquer comme lues, les archiver pour les masquer de la liste principale,
                ou les supprimer définitivement.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-4 py-2.5">
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={markSelectedRead}>
              <CheckCheck className="w-3.5 h-3.5 mr-1" /> Marquer lu
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={archiveSelected}>
              <Archive className="w-3.5 h-3.5 mr-1" /> Archiver
            </Button>
            <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={deleteSelected}>
              <Trash2 className="w-3.5 h-3.5 mr-1" /> Supprimer
            </Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs ml-auto" onClick={clearSelection}>
              Annuler
            </Button>
          </div>
        </div>
      )}

      {/* ── LIST ── */}
      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {filtered.length} conversation{filtered.length > 1 ? "s" : ""} affichée{filtered.length > 1 ? "s" : ""}
            {search ? ` pour « ${search} »` : ""}
          </p>
          {selected.length === 0 && (
            <p className="text-[11px] text-muted-foreground">
              Cochez une carte pour la sélectionner
            </p>
          )}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            Aucune conversation trouvée.
          </div>
        )}

        {filtered.map(conv => {
          const status = getStatus(conv.status)
          const isSelected = selected.includes(conv.id)

          return (
            <Card
              key={conv.id}
              className={`cursor-pointer transition-all ${isSelected ? "ring-2 ring-emerald-500" : ""}`}
              onClick={() => selected.length > 0 ? toggleSelect(conv.id) : navigate("/messages/test")}
            >
              <CardContent className="p-4 space-y-3">

                {/* TOP ROW */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(conv.id)}
                      onClick={e => e.stopPropagation()}
                    />
                    <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="text-sm font-semibold truncate">
                      {conv.from} → {conv.to}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {conv.unread > 0 && (
                      <Badge className="bg-emerald-500 text-white text-[10px] px-1.5 min-w-[20px] justify-center">
                        {conv.unread}
                      </Badge>
                    )}
                    <Badge className={`text-[10px] ${status.class}`}>{status.label}</Badge>
                  </div>
                </div>

                {/* META */}
                <div className="flex gap-3 text-[11px] text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />{conv.date} · {conv.time}
                  </span>
                  <span>{conv.distance} km · {conv.duration}</span>
                  {conv.urgency && (
                    <span className="text-amber-600 font-medium">{conv.urgency}</span>
                  )}
                </div>

                {/* LAST MESSAGE + PRICE */}
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-muted-foreground truncate flex-1">
                    {conv.lastMessage}
                  </p>
                  <span className="text-xs font-medium shrink-0">
                    {conv.price.toLocaleString()} Ar
                    <span className="text-muted-foreground font-normal"> · {conv.priceStatus}</span>
                  </span>
                </div>

                <Separator />

                {/* FOOTER */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={`https://i.pravatar.cc/100?u=${conv.id}`} />
                      <AvatarFallback className="text-[9px]">
                        {conv.user.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{conv.user}</span>
                    <span>·</span>
                    <span>{conv.role}</span>
                    <span>·</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{conv.rating}</span>
                  </div>

                  {conv.unread > 0 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 text-[11px] px-2"
                      onClick={e => { e.stopPropagation(); markOneRead(conv.id) }}
                    >
                      <CheckCheck className="w-3 h-3 mr-1" /> Marquer lu
                    </Button>
                  )}
                </div>

              </CardContent>
            </Card>
          )
        })}
      </div>

    </div>
  )
}