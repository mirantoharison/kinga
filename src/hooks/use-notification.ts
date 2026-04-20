import { useState } from "react"

export type NotificationType = "message" | "ride" | "payment" | "system"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  date: string
  read: boolean
}

export function useNotifications(initialData: Notification[]) {
  const [notifications, setNotifications] = useState(initialData)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState<string[]>([])

  const filtered = notifications.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase())

    const matchFilter =
      filter === "all" ||
      (filter === "unread" && !n.read) ||
      n.type === filter

    return matchSearch && matchFilter
  })

  const stats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.read).length,
    today: notifications.filter((n) => n.date.includes("Aujourd’hui")).length,
  }

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return {
    notifications,
    filtered,
    stats,
    search,
    setSearch,
    filter,
    setFilter,
    selected,
    setSelected,
    toggleSelect,
    setNotifications,
  }
}