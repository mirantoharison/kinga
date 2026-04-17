"use client"

import { useState, useMemo } from "react"

// 🔹 DATA
interface Ride {
  from: string
  to: string
  time: string
  date: string
  distance: number
  duration: string
  price: number
  seats: number
  driver: string
  rating: number
  reviews: number
}

const ALL_RIDES: Ride[] = [
  {
    from: "Antananarivo",
    to: "Tamatave",
    time: "08:30",
    date: "17 Avr 2026",
    distance: 320,
    duration: "6h30",
    price: 12000,
    seats: 1,
    driver: "Jean",
    rating: 4.8,
    reviews: 24,
  },
  {
    from: "Antsirabe",
    to: "Fianarantsoa",
    time: "10:00",
    date: "18 Avr 2026",
    distance: 250,
    duration: "5h10",
    price: 15000,
    seats: 3,
    driver: "Marie",
    rating: 4.6,
    reviews: 18,
  },
]

// 🔹 COMPONENTS
import { ListRideHeader } from "@/components/ride/search/ListRideHeader"
import { RideSearch } from "@/components/ride/search/RideSearch"
import { RideFilters } from "@/components/ride/search/RideFilters"
import { RideList } from "@/components/ride/search/RideList"
import { RidePagination } from "@/components/ride/search/RidePagination"
import { RidePaginationControls } from "@/components/ride/search/RidePaginationControls"

export default function ListRidePage() {

  /* ───────────────────────── STATE ───────────────────────── */

  const [search, setSearch] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const [maxPrice, setMaxPrice] = useState(30000)
  const [minSeats, setMinSeats] = useState(1)

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(2)

  /* ───────────────────────── FILTER ───────────────────────── */

  const filtered = useMemo(() => {
    const q = search.toLowerCase()

    return ALL_RIDES.filter((r) => {
      return (
        (!q ||
          r.from.toLowerCase().includes(q) ||
          r.to.toLowerCase().includes(q)) &&
        r.price <= maxPrice &&
        r.seats >= minSeats
      )
    })
  }, [search, maxPrice, minSeats])

  /* ───────────────────────── PAGINATION ───────────────────────── */

  const totalPages = Math.ceil(filtered.length / perPage)

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage
    return filtered.slice(start, start + perPage)
  }, [filtered, currentPage, perPage])

  /* ───────────────────────── UI ───────────────────────── */

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <ListRideHeader count={filtered.length} />

      {/* SEARCH */}
      <RideSearch
        search={search}
        setSearch={setSearch}
        showFilters={showFilters}
        toggleFilters={() => setShowFilters(v => !v)}
      />

      {/* FILTERS */}
      {showFilters && (
        <RideFilters
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minSeats={minSeats}
          setMinSeats={setMinSeats}
        />
      )}

      {/* PAGINATION EXPLANATION (conservé tel quel) */}
      <div className="text-xs text-muted-foreground leading-relaxed space-y-2">
        <p>
          Les résultats sont organisés en plusieurs pages afin de garantir une navigation fluide et une lecture plus confortable. Ce découpage permet d’éviter une surcharge d’informations et vous aide à vous concentrer sur un nombre limité de trajets à la fois.
        </p>
        <p>
          Vous pouvez naviguer facilement entre les différentes pages à l’aide des boutons de navigation. Il est également possible de modifier le nombre de trajets affichés par page afin d’adapter l’affichage à votre préférence, que vous souhaitiez parcourir rapidement les résultats ou analyser plus en détail chaque proposition.
        </p>
      </div>

      {/* CONTROLS */}
      <RidePaginationControls
        perPage={perPage}
        setPerPage={setPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageReset={() => setCurrentPage(1)}
      />

      {/* PAGINATION TOP */}
      <RidePagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {/* RESULTS */}
      <RideList rides={paginated} />

      {/* PAGINATION BOTTOM */}
      <RidePagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

    </div>
  )
}