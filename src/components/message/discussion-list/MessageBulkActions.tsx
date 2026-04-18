"use client"

import { CheckCheck, Archive, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  selected: number[]

  markSelectedRead: () => void
  archiveSelected: () => void
  deleteSelected: () => void
  clearSelection: () => void
}

export function MessagesBulkActions({
  selected,
  markSelectedRead,
  archiveSelected,
  deleteSelected,
  clearSelection,
}: Props) {
  if (selected.length === 0) return null

  return (
    <div className="space-y-2">

      {/* 🧾 Description */}
      <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">
        <div className="flex-1">
          <p className="text-xs font-semibold mb-1">
            Actions groupées
          </p>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {selected.length} conversation{selected.length > 1 ? "s" : ""} sélectionnée{selected.length > 1 ? "s" : ""}.
            Vous pouvez les marquer comme lues, les archiver pour les masquer de la liste principale,
            ou les supprimer définitivement.
          </p>
        </div>
      </div>

      {/* 🎛 Actions */}
      <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-4 py-2.5">

        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs"
          onClick={markSelectedRead}
        >
          <CheckCheck className="w-3.5 h-3.5 mr-1" />
          Marquer lu
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs"
          onClick={archiveSelected}
        >
          <Archive className="w-3.5 h-3.5 mr-1" />
          Archiver
        </Button>

        <Button
          size="sm"
          variant="destructive"
          className="h-7 text-xs"
          onClick={deleteSelected}
        >
          <Trash2 className="w-3.5 h-3.5 mr-1" />
          Supprimer
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="h-7 text-xs ml-auto"
          onClick={clearSelection}
        >
          Annuler
        </Button>

      </div>
    </div>
  )
}