"use client"

import { NotificationsHeader } from "@/components/notification/NotificationsHeader"
import { NotificationsStats } from "@/components/notification/NotificationsStats"
import { NotificationsFilters, type FilterKey } from "@/components/notification/NotificationsFilters"
import { NotificationsBulkActions } from "@/components/notification/NotificationsBulkActions"
import { NotificationsList } from "@/components/notification/NotificationsList"
import { NotificationsFooter } from "@/components/notification/NotificationsFooter"

import { useNotifications } from "@/hooks/use-notification"
import { type Notification } from "@/hooks/use-notification"

/* ─────────────── MOCK DATA ─────────────── */

const initialData: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "Nouveau message reçu",
    description: "Jean vous a écrit pour le trajet Antananarivo → Tamatave",
    date: "Il y a 2 min",
    read: false,
  },
  {
    id: "2",
    type: "ride",
    title: "Réservation confirmée",
    description: "Votre place pour demain à 08:00 est confirmée",
    date: "Il y a 1 heure",
    read: false,
  },
  {
    id: "3",
    type: "payment",
    title: "Paiement reçu",
    description: "Vous avez reçu 15 000 Ar",
    date: "Aujourd’hui",
    read: true,
  },
]

/* ─────────────── PAGE ─────────────── */

export default function NotificationsPage() {
  const {
    filtered,
    stats,
    search,
    setSearch,
    filter,
    setFilter,
    selected,
    toggleSelect,
    setSelected,
    setNotifications,
    notifications,
  } = useNotifications(initialData)

  /* ─────────────── ACTIONS ─────────────── */

  const clearSelection = () => setSelected([])

  const markOneRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markSelectedRead = () => {
    setNotifications((prev) =>
      prev.map((n) =>
        selected.includes(n.id) ? { ...n, read: true } : n
      )
    )
    clearSelection()
  }

  const deleteSelected = () => {
    setNotifications((prev) =>
      prev.filter((n) => !selected.includes(n.id))
    )
    clearSelection()
  }

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    )
  }

  const loadMore = () => {
    console.log("load more…")
  }

  /* ─────────────── UI ─────────────── */

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <NotificationsHeader unreadCount={stats.unread} />

      {/* STATS */}
      <NotificationsStats
        total={stats.total}
        unread={stats.unread}
        today={stats.today}
      />

      {/* FILTERS */}
      <NotificationsFilters
        search={search}
        setSearch={setSearch}
        filter={filter as FilterKey}
        setFilter={setFilter}
      />

      {/* BULK ACTIONS */}
      <NotificationsBulkActions
        selected={selected}
        onMarkRead={markSelectedRead}
        onDelete={deleteSelected}
        onClear={clearSelection}
      />

      {/* LIST */}
      <NotificationsList
        items={filtered}
        selected={selected}
        onToggleSelect={toggleSelect}
        onMarkRead={markOneRead}
      />

      {/* FOOTER */}
      <NotificationsFooter
        onLoadMore={loadMore}
      />

    </div>
  )
}