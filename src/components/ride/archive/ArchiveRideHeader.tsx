"use client"

import { Archive, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Props {
  count: number
  archiveDays: number
}

export function ArchivedRideHeader({ count, archiveDays }: Props) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">
      
      {/* ICON */}
      <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center">
        <Archive className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        <h1 className="text-lg font-semibold">
          Trajets archivés
        </h1>

        <p className="text-xs text-muted-foreground mt-1 leading-relaxed flex items-start gap-1.5">
          Ces trajets correspondent à des déplacements effectués il y a plus de {archiveDays} jours. Ils sont conservés à titre d’historique personnel afin de vous permettre
          de retrouver facilement vos anciens trajets, tout en gardant votre activité
          récente claire, lisible et centrée sur vos déplacements actuels.
        </p>
      </div>

      {/* COUNT */}
      <Badge variant="secondary" className="border">
        {count} trajet{count > 1 ? "s" : ""}
      </Badge>

    </div>
  )
}