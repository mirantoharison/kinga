"use client"

import { Badge } from "@/components/ui/badge"
import { Bell, Mail, Clock } from "lucide-react"

interface Props {
  total: number
  unread: number
  today: number
}

export function NotificationsStats({ total, unread, today }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">

      {/* TOTAL */}
      <Badge className="text-xs flex items-center gap-1.5">
        <Bell className="w-3 h-3" />
        {total} total
      </Badge>

      {/* UNREAD */}
      <Badge
        variant="secondary"
        className="text-xs flex items-center gap-1.5"
      >
        <Mail className="w-3 h-3" />
        {unread} non lue{unread > 1 && "s"}
      </Badge>

      {/* TODAY */}
      <Badge
        variant="secondary"
        className="text-xs flex items-center gap-1.5"
      >
        <Clock className="w-3 h-3" />
        {today} aujourd’hui
      </Badge>

    </div>
  )
}