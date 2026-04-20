"use client"

import { Button } from "@/components/ui/button"
import { CheckCheck, Trash2 } from "lucide-react"

interface Props {
  selected: string[]
  onMarkRead: () => void
  onDelete: () => void
  onClear: () => void
}

export function NotificationsBulkActions({
  selected,
  onMarkRead,
  onDelete,
  onClear,
}: Props) {
  if (selected.length === 0) return null

  const count = selected.length

  return (
    <div className="flex items-center justify-between bg-muted/40 border rounded-xl px-4 py-2">

      {/* LEFT */}
      <span className="text-xs">
        {count} sélectionnée{count > 1 && "s"}
      </span>

      {/* RIGHT ACTIONS */}
      <div className="flex gap-2">

        <Button
          size="sm"
          variant="outline"
          onClick={onMarkRead}
          className="h-8 text-xs"
        >
          <CheckCheck className="w-4 h-4 mr-1" />
          Marquer comme lu
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={onDelete}
          className="h-8 text-xs"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Supprimer
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={onClear}
          className="h-8 text-xs"
        >
          Annuler
        </Button>

      </div>
    </div>
  )
}