"use client"

import { Archive } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Props {
  count: number
}

export function MessagesArchivedHeader({ count }: Props) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">
      
      {/* Icon */}
      <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center shrink-0">
        <Archive className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold">
          Conversations archivées
        </h2>

        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          Cette section regroupe les discussions que vous avez choisies de mettre de côté. Elles ne sont plus visibles dans votre boîte principale afin de garder vos messages actifs
          clairs et faciles à suivre, tout en restant accessibles à tout moment si vous souhaitez les consulter ou les réactiver.
        </p>
      </div>

      {/* Badge */}
      <Badge variant="secondary" className="border shrink-0">
        {count} archive{count > 1 ? "s" : ""}
      </Badge>

    </div>
  )
}