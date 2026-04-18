"use client"

import { MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Props {
  count: number
}

export function MessagesHeader({ count }: Props) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">
      
      {/* Icon */}
      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
        <MessageCircle className="w-5 h-5 text-emerald-500" />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold">
          Gestion des conversations liées aux trajets
        </h2>

        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          Cette interface centralise l'ensemble de vos échanges liés à vos trajets, que vous soyez conducteur ou passager.
          Chaque conversation est directement associée à un déplacement précis afin de garantir une organisation claire
          et éviter toute confusion entre plusieurs trajets en cours.
        </p>
      </div>

      {/* Badge */}
      <Badge className="bg-emerald-50 text-emerald-600 border shrink-0">
        {count} discussions
      </Badge>

    </div>
  )
}