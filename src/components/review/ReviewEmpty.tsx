"use client"

import { Star, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  onReset?: () => void
}

export function ReviewEmpty({ onReset }: Props) {
  return (
    <div className="text-center py-16 flex flex-col items-center">

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Search className="w-6 h-6 text-muted-foreground opacity-60" />
      </div>

      {/* Title */}
      <p className="text-sm font-semibold">
        Aucun résultat trouvé
      </p>

      {/* Description */}
      <p className="text-xs text-muted-foreground mt-1 max-w-sm leading-relaxed">
        Nous n’avons trouvé aucun avis correspondant à vos critères actuels.
        Vous pouvez ajuster votre recherche ou réinitialiser les filtres pour voir plus de résultats.
      </p>

      {/* Action */}
      {onReset && (
        <Button
          size="sm"
          variant="outline"
          className="mt-4 text-xs"
          onClick={onReset}
        >
          Réinitialiser les filtres
        </Button>
      )}

    </div>
  )
}