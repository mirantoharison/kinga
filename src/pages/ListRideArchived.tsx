"use client"

import { useEffect, useState, useMemo } from "react"
import { type Ride } from "@/components/ride/search/RideCard"

// 🔹 COMPONENTS
import { RideList } from "@/components/ride/search/RideList"
import { RidePagination } from "@/components/ride/search/RidePagination"
import { RidePaginationControls } from "@/components/ride/search/RidePaginationControls"
import { RideHistoryHeader } from "@/components/ride/history/HistoryHeader"
import { RideHistoryEmpty } from "@/components/ride/history/HistoryRideEmpty"

// 🔹 UI
import { Archive, Info } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const ARCHIVE_DAYS = 30

export default function ArchivedRideHistoryPage() {

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

  /* ───────────────────────── HELPERS ───────────────────────── */

  const now = new Date()

  const getDiffDays = (date: string) =>
    (now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)

  /* ───────────────────────── FILTER (ARCHIVÉS) ───────────────────────── */

  const archivedRides = useMemo(() => {
    return rides
      .filter((ride) => {
        const rideDate = new Date(ride.date)
        const isPast = rideDate < now
        const diffDays = getDiffDays(ride.date)

        return isPast && diffDays > ARCHIVE_DAYS
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

      {/* HEADER amélioré */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
          <Archive className="w-5 h-5 text-muted-foreground" />
        </div>

        <div>
          <h1 className="text-base font-semibold">
            Trajets archivés
          </h1>
          <p className="text-xs text-muted-foreground">
            Vos trajets de plus de {ARCHIVE_DAYS} jours
          </p>
        </div>
      </div>

      {/* INFO BLOCK */}
      <div className="rounded-xl bg-muted/40 border px-4 py-3">
        <p className="text-xs flex items-start gap-2 text-muted-foreground">
          <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          Ces trajets sont conservés à titre d’historique.  
          Ils n’apparaissent plus dans votre activité récente pour garder une interface claire.
        </p>
      </div>

      <Separator />

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