"use client"

import { List } from "lucide-react"

interface Props {
  perPage: number
  setPerPage: (value: number) => void
  currentPage: number
  totalPages: number
  onPageReset: () => void
}

export function RidePaginationControls({
  perPage,
  setPerPage,
  currentPage,
  totalPages,
  onPageReset,
}: Props) {
  return (
    <div className="flex items-center justify-between w-full text-xs">

      {/* GAUCHE */}
      <div className="flex items-center gap-2">
        <List className="w-4 h-4 text-muted-foreground" />
        <span>Afficher</span>

        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value))
            onPageReset()
          }}
          className="border rounded px-2 py-1"
        >
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>

        <span>trajets par page</span>
      </div>

      {/* DROITE */}
      <div className="flex items-center gap-2">
        <span>
          Page {currentPage} / {totalPages || 1}
        </span>
      </div>

    </div>
  )
}