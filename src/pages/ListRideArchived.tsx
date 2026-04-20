"use client"

import { useEffect, useState, useMemo } from "react"
import { type Ride } from "@/components/ride/search/RideCard"

// 🔹 COMPONENTS
import { RideList } from "@/components/ride/search/RideList"
import { RidePagination } from "@/components/ride/search/RidePagination"
import { RidePaginationControls } from "@/components/ride/search/RidePaginationControls"
import { ArchivedRideHeader } from "@/components/ride/archive/ArchiveRideHeader"

// 🔹 UI
import { Separator } from "@/components/ui/separator"
import { ArchivedRideEmpty } from "@/components/ride/archive/ArchiveRideEmpty"

const ARCHIVE_DAYS = 30

export default function ArchivedRidePage() {

  /* ───────────────────────── STATE ───────────────────────── */

  const [rides, setRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(5)

  /* ───────────────────────── FETCH ───────────────────────── */

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

  /* ───────────────────────── FILTER (ARCHIVÉS) ───────────────────────── */

  const archivedRides = useMemo(() => {
    const now = new Date()

    return rides
      .filter((ride) => {
        const rideDate = new Date(ride.date)

        if (rideDate >= now) return false

        const diffDays =
          (now.getTime() - rideDate.getTime()) / (1000 * 60 * 60 * 24)

        return diffDays > ARCHIVE_DAYS
      })
      .sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      )
  }, [rides])

  /* ───────────────────────── PAGINATION ───────────────────────── */

  const totalPages = Math.max(
    1,
    Math.ceil(archivedRides.length / perPage)
  )

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage
    return archivedRides.slice(start, start + perPage)
  }, [archivedRides, currentPage, perPage])

  /* ───────────────────────── RESET PAGE ───────────────────────── */

  useEffect(() => {
    setCurrentPage(1)
  }, [perPage])

  /* ───────────────────────── UI ───────────────────────── */

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* HEADER CLEAN */}
      <ArchivedRideHeader
        count={archivedRides.length}
        archiveDays={ARCHIVE_DAYS}
      />

      {/* LOADING */}
      {loading ? (
        <div className="text-sm text-muted-foreground">
          Chargement des trajets archivés…
        </div>
      ) : (
        <>
          {/* CONTROLS */}
          <RidePaginationControls
            perPage={perPage}
            setPerPage={setPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageReset={() => setCurrentPage(1)}
          />

          {archivedRides.length === 0 ? (
            <ArchivedRideEmpty />
          ) : (
            <>
              {/* PAGINATION TOP */}
              <RidePagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />

              {/* LIST */}
              <RideList rides={paginated} archived />

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