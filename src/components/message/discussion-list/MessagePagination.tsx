"use client"

import { Button } from "@/components/ui/button"
import { Loader2, ChevronDown } from "lucide-react"

interface Props {
  onClick: () => void
  loading?: boolean
  hasMore?: boolean
}

export function LoadMoreButton({
  onClick,
  loading = false,
  hasMore = true,
}: Props) {
  if (!hasMore) return null

  return (
    <div className="flex flex-col items-center gap-2 pt-2">

      {/* 🔹 MESSAGE ENRICHI */}
      {!loading && (
        <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground text-center max-w-[460px] w-full leading-relaxed">
          <ChevronDown className="w-3 h-3 shrink-0" />
          D’autres conversations sont disponibles plus bas. 
          Vous pouvez continuer à explorer ou charger davantage de résultats.
        </p>
      )}

      {/* 🔹 BUTTON */}
      <Button
        variant="outline"
        onClick={onClick}
        disabled={loading}
        className="h-9 text-xs gap-2 px-4"
      >
        {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        {loading ? "Chargement..." : "Charger plus de conversations"}
      </Button>

    </div>
  )
}