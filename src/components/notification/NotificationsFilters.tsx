"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Search,
  Inbox,
  Mail,
  MessageCircle,
  Car,
  CreditCard,
  Settings,
} from "lucide-react"

/* ─────────────── TYPES ─────────────── */

export type FilterKey = "all" | "unread" | "message" | "ride" | "payment" | "system"

interface Props {
  search: string
  setSearch: (value: string) => void
  filter: FilterKey
  setFilter: (value: FilterKey) => void
}

/* ─────────────── CONFIG ─────────────── */

const FILTERS: Record<
  FilterKey,
  { label: string; icon: React.ElementType }
> = {
  all: { label: "Toutes", icon: Inbox },
  unread: { label: "Non lues", icon: Mail },
  message: { label: "Messages", icon: MessageCircle },
  ride: { label: "Trajets", icon: Car },
  payment: { label: "Paiements", icon: CreditCard },
  system: { label: "Système", icon: Settings },
}

/* ─────────────── COMPONENT ─────────────── */

export function NotificationsFilters({
  search,
  setSearch,
  filter,
  setFilter,
}: Props) {
  return (
    <div className="flex flex-col gap-3">

      {/* 🔍 SEARCH */}
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground" />

        <Input
          placeholder="Rechercher une notification..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🎯 FILTERS */}
      <div className="flex items-center gap-2 flex-wrap pr-3">

        {(Object.entries(FILTERS) as [FilterKey, typeof FILTERS[FilterKey]][])
          .map(([key, config]) => {
            const Icon = config.icon

            return (
              <Button
                key={key}
                size="sm"
                variant={filter === key ? "secondary" : "outline"}
                onClick={() => setFilter(key)}
                className="rounded-full text-xs h-7 flex items-center gap-1.5"
              >
                <Icon className="w-3 h-3" />
                {config.label}
              </Button>
            )
          })}

      </div>

    </div>
  )
}