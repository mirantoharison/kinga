"use client"

import { Search, SlidersHorizontal, List, CheckCircle, MinusCircle, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Props {
  search: string
  setSearch: (v: string) => void

  filter: "all" | "positive" | "neutral" | "negative"
  setFilter: (v: "all" | "positive" | "neutral" | "negative") => void

  sort: "recent" | "rating"
  setSort: (v: "recent" | "rating") => void
}

export function ReviewFilters({
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
}: Props) {

  /* ───────────── CONFIG ───────────── */

  const filters = [
    {
      key: "all",
      label: "Tous",
      icon: <List className="w-3.5 h-3.5 mr-1" />,
    },
    {
      key: "positive",
      label: "Positifs",
      icon: <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-500" />,
    },
    {
      key: "neutral",
      label: "Neutres",
      icon: <MinusCircle className="w-3.5 h-3.5 mr-1 text-amber-500" />,
    },
    {
      key: "negative",
      label: "Négatifs",
      icon: <XCircle className="w-3.5 h-3.5 mr-1 text-rose-500" />,
    },
  ] as const

  const sorts = [
    { key: "recent", label: "Récent" },
    { key: "rating", label: "Meilleures notes" },
  ] as const

  /* ───────────── UI ───────────── */

  return (
    <div className="space-y-3">

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

        <Input
          placeholder="Rechercher par trajet, utilisateur, commentaire..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 rounded-xl"
        />
      </div>

      {/* FILTERS + SORT */}
      <div className="flex items-center flex-wrap gap-2">

        {/* FILTER BUTTONS */}
        <div className="flex gap-1.5 flex-wrap">
          {filters.map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? "secondary" : "outline"}
              size="sm"
              className="rounded-full text-xs h-7 flex items-center"
              onClick={() => setFilter(f.key)}
            >
              {f.icon}
              {f.label}
            </Button>
          ))}
        </div>

        {/* SORT */}
        <div className="flex gap-1.5 border-l pl-3 ml-1">
          {sorts.map((s) => (
            <Button
              key={s.key}
              variant={sort === s.key ? "secondary" : "ghost"}
              size="sm"
              className="rounded-full text-xs h-7"
              onClick={() => setSort(s.key)}
            >
              <SlidersHorizontal className="w-3 h-3 mr-1" />
              {s.label}
            </Button>
          ))}
        </div>

      </div>

    </div>
  )
}