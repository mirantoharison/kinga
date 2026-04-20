"use client"

import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  CalendarRange,
  CalendarDays,
  Banknote,
  Users,
  Route,
} from "lucide-react"

/* TYPES */

export const FILTER_KEYS = [
  "all",
  "d30_60",
  "d60_90",
  "d90_120",
  "d120_plus",
] as const

export type ArchivedRideFilter = typeof FILTER_KEYS[number]

export const SORT_KEYS = [
  "date",
  "price",
  "distance",
  "seats",
] as const

export type ArchivedRideSort = typeof SORT_KEYS[number]

export const FILTERS_CONFIG = {
  all: {
    label: "Tous",
    icon: CalendarDays,
  },
  d30_60: {
    label: "30–60 j",
    icon: CalendarRange,
  },
  d60_90: {
    label: "60–90 j",
    icon: CalendarRange,
  },
  d90_120: {
    label: "90–120 j",
    icon: CalendarRange,
  },
  d120_plus: {
    label: "+120 j",
    icon: CalendarDays,
  },
} satisfies Record<ArchivedRideFilter, { label: string; icon: any }>

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
} satisfies Record<ArchivedRideSort, { label: string; icon: any }>

/* COMPONENT */

interface Props {
  filter: ArchivedRideFilter
  setFilter: (value: ArchivedRideFilter) => void

  sort: ArchivedRideSort
  setSort: (value: ArchivedRideSort) => void
}

export function ArchivedRideFilters({
  filter,
  setFilter,
  sort,
  setSort,
}: Props) {
  return (
    <div className="space-y-3">

      <p className="text-xs text-muted-foreground leading-relaxed">
        Filtrez vos trajets archivés selon leur ancienneté ou leurs caractéristiques
        afin de retrouver rapidement un déplacement précis.
      </p>

      <div className="flex items-center">

        {/* FILTERS */}
        <div className="flex items-center gap-2 flex-wrap pr-3">
          {FILTER_KEYS.map((key) => {
            const { label, icon: Icon } = FILTERS_CONFIG[key]

            return (
              <Button
                key={key}
                variant={filter === key ? "secondary" : "outline"}
                size="sm"
                className="rounded-full text-xs h-7 flex items-center gap-1.5"
                onClick={() => setFilter(key)}
              >
                <Icon className="w-3 h-3" />
                {label}
              </Button>
            )
          })}
        </div>

        {/* SORT */}
        <div className="flex items-center gap-2 flex-wrap border-l pl-3">
          {SORT_KEYS.map((key) => {
            const { label, icon: Icon } = SORTS_CONFIG[key]

            return (
              <Button
                key={key}
                variant={sort === key ? "secondary" : "ghost"}
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
    </div>
  )
}