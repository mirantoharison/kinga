"use client"

import { History } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Props {
  count: number
}

export function RideHistoryHeader({ count }: Props) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">
      
      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
        <History className="w-5 h-5 text-emerald-500" />
      </div>

      <div className="flex-1">
        <h1 className="text-lg font-semibold">
          Historique de mes trajets
        </h1>

        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          Cette section regroupe tous les trajets que vous avez proposés sur la plateforme.
          Vous pouvez consulter leurs informations, suivre leur statut (à venir, terminé ou annulé)
          et revenir facilement sur vos activités passées pour mieux organiser vos prochains déplacements.
        </p>
      </div>

      <Badge className="bg-emerald-50 text-emerald-600 border">
        {count} trajet{count > 1 ? "s" : ""}
      </Badge>
    </div>
  )
}