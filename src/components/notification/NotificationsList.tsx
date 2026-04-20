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

/* ─────────────── COMPONENT ─────────────── */

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
      <div className="text-center py-12">
        <Bell className="w-6 h-6 mx-auto text-muted-foreground/40 mb-2" />

        <p className="text-sm font-medium">
          Aucune notification
        </p>

        <p className="text-xs text-muted-foreground">
          Les nouvelles activités apparaîtront ici
        </p>
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