"use client"

import { Button } from "@/components/ui/button"
import { Route } from "lucide-react"

interface Props {
  canSubmit: boolean
  onSubmit?: () => void
  onCancel?: () => void
}

export function RideActions({
  canSubmit,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <div className="space-y-2 pt-2">

      {/* ACTIONS */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>

        <Button
          className="gap-2"
          disabled={!canSubmit}
          onClick={onSubmit}
        >
          <Route className="w-4 h-4" />
          Publier le trajet
        </Button>
      </div>

      {/* MESSAGE D’AIDE */}
      {!canSubmit && (
        <p className="text-xs text-muted-foreground text-right">
          Complétez les champs obligatoires (départ, arrivée, date, heure, prix, places) pour pouvoir publier.
        </p>
      )}

    </div>
  )
}