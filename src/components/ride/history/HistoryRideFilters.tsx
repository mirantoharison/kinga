"use client"

import { SlidersHorizontal, CalendarDays, Banknote, Route, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

/* TYPES */

export const SORT_KEYS = [
  "date",
  "price",
  "distance",
  "seats",
] as const

export type HistoryRideSort = typeof SORT_KEYS[number]

export const SORTS_CONFIG = {
  date: {
    label: "Date",
    icon: CalendarDays,
  },
  price: {
    label: "Prix",
    icon: Banknote,
  },
  distance: {
    label: "Distance",
    icon: Route,
  },
  seats: {
    label: "Places",
    icon: Users,
  },
} satisfies Record<HistoryRideSort, { label: string; icon: any }>

/* COMPONENT */

interface Props {
  sort: HistoryRideSort
  setSort: (value: HistoryRideSort) => void
}

export function HistoryRideControls({ sort, setSort }: Props) {
  return (
    <div className="space-y-3">

      <p className="text-xs text-muted-foreground leading-relaxed">
        Triez vos trajets récents pour retrouver rapidement une information ou analyser votre activité.
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        {SORT_KEYS.map((key) => {
          const { label, icon: Icon } = SORTS_CONFIG[key]

          return (
            <Button
              key={key}
              variant={sort === key ? "secondary" : "outline"}
              size="sm"
              className="rounded-full text-xs h-7 flex items-center gap-1.5"
              onClick={() => setSort(key)}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <Icon className="w-3 h-3" />
              {label}
            </Button>
          )
        })}
      </div>

    </div>
  )
}