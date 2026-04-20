"use client"

import { type Notification } from "@/hooks/use-notification"
import { NotificationCard } from "./NotificationsCard"
import { Bell } from "lucide-react"

interface Props {
  items: Notification[]
  selected: string[]
  onToggleSelect: (id: string) => void
  onMarkRead: (id: string) => void
}

export function NotificationsList({
  items,
  selected,
  onToggleSelect,
  onMarkRead,
}: Props) {
  const multiSelect = selected.length > 0

  /* ─────────────── EMPTY STATE ─────────────── */

  if (items.length === 0) {
    return (
      <div className="py-6">
        <div
          className="
            text-center flex flex-col items-center
            border border-dashed border-border
            rounded-2xl
            py-10 px-6
            bg-muted/20
            transition-colors
            hover:border-muted-foreground/40
          "
        >
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
            <Bell className="w-5 h-5 text-muted-foreground/60" />
          </div>

          {/* Title */}
          <p className="text-sm font-semibold">
            Aucune notification
          </p>

          {/* Description */}
          <p className="text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed">
            Les nouvelles activités et mises à jour apparaîtront ici dès qu’elles seront disponibles.
          </p>
        </div>
      </div>
    )
  }

  /* ─────────────── LIST ─────────────── */

  return (
    <div className="flex flex-col gap-3">
      {items.map((n) => (
        <NotificationCard
          key={n.id}
          notification={n}
          selected={selected.includes(n.id)}
          multiSelect={multiSelect}
          onToggleSelect={() => onToggleSelect(n.id)}
          onMarkRead={() => onMarkRead(n.id)}
        />
      ))}
    </div>
  )
}