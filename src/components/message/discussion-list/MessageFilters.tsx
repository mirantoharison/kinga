"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Props {
  search: string
  setSearch: (value: string) => void

  filter: "all" | "pending" | "confirmed" | "unread"
  setFilter: (value: "all" | "pending" | "confirmed" | "unread") => void

  sort: "recent" | "unread" | "price"
  setSort: (value: "recent" | "unread" | "price") => void
}

export function MessagesFilters({
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
}: Props) {

  const FILTERS = {
    all: "Tous",
    pending: "En attente",
    confirmed: "Confirmés",
    unread: "Non lus",
  }

  const SORTS = {
    recent: "Récent",
    unread: "Non lus d'abord",
    price: "Prix",
  }

  return (
    <div className="space-y-4">

      {/* 🔍 SEARCH */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par ville, personne..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* 📄 DESCRIPTION */}
      <div className="text-xs text-muted-foreground leading-relaxed">
        Utilisez les filtres par statut pour afficher uniquement les conversations en attente, confirmées ou contenant
        des messages non lus. Les options de tri vous permettent de réorganiser la liste selon la date, le nombre de
        messages non lus ou le montant du trajet, selon vos priorités du moment.
      </div>

      {/* 🎛 FILTER + SORT */}
      <div className="flex items-center">

        {/* FILTERS */}
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

        {/* SORT */}
        <div className="flex items-center gap-2 flex-wrap border-l pl-3">
          {(Object.keys(SORTS) as Array<keyof typeof SORTS>).map((s) => (
            <Button
              key={s}
              variant={sort === s ? "secondary" : "ghost"}
              size="sm"
              className="rounded-full text-xs h-7"
              onClick={() => setSort(s)}
            >
              <SlidersHorizontal className="w-3 h-3 mr-1" />
              {SORTS[s]}
            </Button>
          ))}
        </div>

      </div>

    </div>
  )
}