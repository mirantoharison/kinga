"use client"

import { Archive } from "lucide-react"

export function ArchivedRideEmpty() {
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
          <Archive className="w-6 h-6 text-muted-foreground opacity-60" />
        </div>

        {/* Title */}
        <p className="text-sm font-semibold">
          Aucun trajet archivé
        </p>

        {/* Description */}
        <p className="text-xs text-muted-foreground mt-1 max-w-sm leading-relaxed">
          Vous n’avez pas encore de trajets anciens à afficher.
          Les trajets de plus de 30 jours apparaîtront automatiquement ici afin de
          conserver un historique clair et organisé de vos déplacements passés.
        </p>

      </div>
    </div>
  )
}