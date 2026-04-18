"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Props {
  search: string
  setSearch: (value: string) => void

  sort: "recent" | "unread" | "price"
  setSort: (value: "recent" | "unread" | "price") => void
}

export function MessagesArchivedFilters({
  search,
  setSearch,
  sort,
  setSort,
}: Props) {

  const SORTS = {
    recent: "Récent",
    unread: "Non lus",
    price: "Prix",
  }

  return (
    <div className="space-y-3">

      {/* 🔍 SEARCH */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher dans les conversations archivées..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* 📄 DESCRIPTION */}
      <p className="text-xs text-muted-foreground leading-relaxed">
        Retrouvez facilement une conversation archivée en utilisant la recherche ou en ajustant l’ordre d’affichage selon vos préférences.
      </p>

      {/* 🎛 SORT ONLY */}
      <div className="flex items-center gap-2 flex-wrap">
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
  )
}