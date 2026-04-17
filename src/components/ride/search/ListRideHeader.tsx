"use client"

import { Car } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Props {
  count: number
}

export function ListRideHeader({ count }: Props) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">
      
      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
        <Car className="w-5 h-5 text-emerald-500" />
      </div>

      <div className="flex-1">
        <h1 className="text-lg font-semibold">
          Rechercher un trajet
        </h1>

        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          Cette page vous permet d’explorer les trajets proposés par les voyageurs de la communauté.
          Chaque proposition correspond à un trajet réel que vous pouvez rejoindre.
          Prenez le temps de comparer les horaires, la distance et le profil du voyageur avant de faire votre choix.
        </p>
      </div>

      <Badge className="bg-emerald-50 text-emerald-600 border">
        {count} résultats
      </Badge>
    </div>
  )
}