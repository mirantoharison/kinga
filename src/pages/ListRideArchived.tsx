"use client"

import { useEffect, useState, useMemo } from "react"
import { type Ride } from "@/components/ride/search/RideCard"

// COMPONENTS
import { RideList } from "@/components/ride/search/RideList"
import { RidePagination } from "@/components/ride/search/RidePagination"
import { RidePaginationControls } from "@/components/ride/search/RidePaginationControls"
import { ArchivedRideHeader } from "@/components/ride/archive/ArchiveRideHeader"
import {
  ArchivedRideFilters,
  type ArchivedRideFilter,
  type ArchivedRideSort,
} from "@/components/ride/archive/ArchiveRideFilters"

// UI
import { ArchivedRideEmpty } from "@/components/ride/archive/ArchiveRideEmpty"

const ARCHIVE_DAYS = 30

export default function ArchivedRidePage() {

  const [rides, setRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(5)

  const [filter, setFilter] = useState<ArchivedRideFilter>("all")
  const [sort, setSort] = useState<ArchivedRideSort>("date")

  /* FETCH */

  useEffect(() => {
    async function fetchRides() {
      try {
        const res = await fetch("/api/my-rides")
        const data = await res.json()
        setRides(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchRides()
  }, [])

  /* BASE ARCHIVE */

  const archivedRides = useMemo(() => {
    const now = Date.now()

    return rides.filter((ride) => {
      const rideTime = new Date(ride.date).getTime()
      const diffDays = (now - rideTime) / (1000 * 60 * 60 * 24)
      return diffDays > ARCHIVE_DAYS
    })
  }, [rides])

  /* FILTER + SORT */

  const processedRides = useMemo(() => {
    let list = [...archivedRides]

    const getDays = (date: string) =>
      (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)

    // FILTER (tranches de jours)
    if (filter === "d30_60") {
      list = list.filter(r => {
        const d = getDays(r.date)
        return d > 30 && d <= 60
      })
    }

    if (filter === "d60_90") {
      list = list.filter(r => {
        const d = getDays(r.date)
        return d > 60 && d <= 90
      })
    }

    if (filter === "d90_120") {
      list = list.filter(r => {
        const d = getDays(r.date)
        return d > 90 && d <= 120
      })
    }

    if (filter === "d120_plus") {
      list = list.filter(r => getDays(r.date) > 120)
    }

    // SORT
    list = [...list].sort((a, b) => {
      if (sort === "price") return b.price - a.price
      if (sort === "distance") return b.distance - a.distance
      if (sort === "seats") return b.seats - a.seats

      // date (default)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    return list
  }, [archivedRides, filter, sort])

  /* PAGINATION */

  const totalPages = Math.max(
    1,
    Math.ceil(processedRides.length / perPage)
  )

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage
    return processedRides.slice(start, start + perPage)
  }, [processedRides, currentPage, perPage])

  /* RESET PAGE */

  useEffect(() => {
    setCurrentPage(1)
  }, [perPage, filter, sort])

  /* UI */

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      <ArchivedRideHeader
        count={processedRides.length}
        archiveDays={ARCHIVE_DAYS}
      />

      {loading ? (
        <div className="text-sm text-muted-foreground">
          Chargement des trajets archivés…
        </div>
      ) : (
        <>
          <ArchivedRideFilters
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
          />

          <RidePaginationControls
            perPage={perPage}
            setPerPage={setPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageReset={() => setCurrentPage(1)}
          />

          {processedRides.length === 0 ? (
            <ArchivedRideEmpty />
          ) : (
            <>
              <RidePagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />

              <RideList rides={paginated} archived />

              <RidePagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}