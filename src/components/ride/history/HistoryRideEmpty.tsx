"use client"

import { History } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  onCreate?: () => void
}

export function RideHistoryEmpty({ onCreate }: Props) {
  return (
    <div className="py-10">
      <div className="
        text-center flex flex-col items-center
        border border-dashed border-border
        rounded-2xl
        py-12 px-6
        bg-muted/20
      ">

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <History className="w-6 h-6 text-muted-foreground opacity-60" />
        </div>

        {/* Title */}
        <p className="text-sm font-semibold">
          Aucun trajet publié
        </p>

        {/* Description */}
        <p className="text-xs text-muted-foreground mt-1 max-w-sm leading-relaxed">
          Vous n’avez pas encore proposé de trajet. Une fois publié, il apparaîtra ici
          avec ses informations et son statut pour vous permettre de le suivre facilement.
        </p>

        {/* Action */}
        {onCreate && (
          <Button
            size="sm"
            variant="outline"
            className="mt-4 text-xs"
            onClick={onCreate}
          >
            Proposer un trajet
          </Button>
        )}

      </div>
    </div>
  )
}