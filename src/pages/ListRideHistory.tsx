"use client"

import { useEffect, useState, useMemo } from "react"
import { type Ride } from "@/components/ride/search/RideCard"

// COMPONENTS
import { RideList } from "@/components/ride/search/RideList"
import { RidePagination } from "@/components/ride/search/RidePagination"
import { RidePaginationControls } from "@/components/ride/search/RidePaginationControls"
import { RideHistoryHeader } from "@/components/ride/history/HistoryHeader"
import { RideHistoryEmpty } from "@/components/ride/history/HistoryRideEmpty"
import { HistoryRideControls, type HistoryRideSort  } from "@/components/ride/history/HistoryRideFilters"

export default function MyRideHistoryPage() {

  /* STATE */

  const [rides, setRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(5)

  const [sort, setSort] = useState<HistoryRideSort>("date")

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

  /* FILTER + SORT */

  const historyRides = useMemo(() => {
    const now = new Date()

    return rides
      .filter((ride) => {
        const rideDate = new Date(ride.date)

        if (isNaN(rideDate.getTime())) return false

        const isPast = rideDate < now

        const diffDays =
          (now.getTime() - rideDate.getTime()) / (1000 * 60 * 60 * 24)

        return isPast && diffDays <= 30
      })
      .sort((a, b) => {
        switch (sort) {
          case "price":
            return b.price - a.price
          case "distance":
            return b.distance - a.distance
          case "seats":
            return b.seats - a.seats
          case "date":
          default:
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
      })
  }, [rides, sort])

  /* PAGINATION */

  const totalPages = Math.max(
    1,
    Math.ceil(historyRides.length / perPage)
  )

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage
    return historyRides.slice(start, start + perPage)
  }, [historyRides, currentPage, perPage])

  /* RESET PAGE */

  useEffect(() => {
    setCurrentPage(1)
  }, [perPage, sort])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  /* UI */

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <RideHistoryHeader count={loading ? 0 : historyRides.length} />

      {/* LOADING */}
      {loading ? (
        <div className="text-sm text-muted-foreground">
          Chargement de vos trajets…
        </div>
      ) : (
        <>
          {/* SORT CONTROLS */}
          <HistoryRideControls
            sort={sort}
            setSort={setSort}
          />

          {/* PAGINATION CONTROLS */}
          <RidePaginationControls
            perPage={perPage}
            setPerPage={setPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageReset={() => setCurrentPage(1)}
          />

          {historyRides.length === 0 ? (
            <RideHistoryEmpty />
          ) : (
            <>
              {/* PAGINATION TOP */}
              <RidePagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />

              {/* LIST */}
              <RideList rides={paginated} />

              {/* PAGINATION BOTTOM */}
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