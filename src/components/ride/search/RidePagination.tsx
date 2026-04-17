"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Props {
  currentPage: number
  totalPages: number
  setCurrentPage: (value: number) => void
}

export function RidePagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) {
  return (
    <div className="flex justify-center gap-2">

      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Précédent
      </Button>

      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Suivant
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>

    </div>
  )
}