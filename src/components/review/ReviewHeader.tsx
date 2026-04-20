"use client"

import { Star, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Props {
  total: number
  positiveRate?: number
}

export function ReviewHeader({ total, positiveRate }: Props) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">

      {/* Icon */}
      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
        <Star className="w-5 h-5 text-emerald-500" />
      </div>

      {/* Content */}
      <div className="flex-1">

        <h2 className="text-lg font-semibold">
          Avis et évaluations utilisateurs
        </h2>

        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          Analysez les retours laissés après chaque trajet afin de mieux comprendre
          la qualité des expériences vécues et renforcer la confiance entre utilisateurs.
        </p>

        {/* Extra info */}
        {positiveRate !== undefined && (
          <div className="flex items-center gap-2 mt-2 text-xs text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" />
            {positiveRate}% d’avis positifs
          </div>
        )}

      </div>

      {/* Badge */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <Badge className="bg-emerald-50 text-emerald-600 border">
          {total} avis
        </Badge>
      </div>

    </div>
  )
}