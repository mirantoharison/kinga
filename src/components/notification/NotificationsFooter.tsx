"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Info } from "lucide-react"

interface Props {
  onLoadMore?: () => void
  isLoading?: boolean
}

export function NotificationsFooter({
  onLoadMore,
  isLoading = false,
}: Props) {
  return (
    <>
      <Separator />

      <div className="flex flex-col items-center gap-3 pt-2">

        {/* INFO */}
        <div className="flex items-start gap-2 text-[11px] text-muted-foreground text-center max-w-[600px] leading-relaxed">
          <Info className="w-3.5 h-3.5 shrink-0 mt-[2px]" />

          <span>
            Vous avez consulté l’ensemble des notifications récentes.
            Les activités plus anciennes restent disponibles et peuvent être
            chargées à tout moment afin de continuer à suivre l’historique
            complet de vos échanges, trajets et paiements sans interruption.
          </span>
        </div>

        {/* ACTION */}
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-5 text-xs rounded-full"
          onClick={onLoadMore}
          disabled={isLoading}
        >
          {isLoading ? "Chargement..." : "Charger davantage"}
        </Button>

      </div>
    </>
  )
}