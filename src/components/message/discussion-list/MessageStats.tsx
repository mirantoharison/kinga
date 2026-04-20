"use client"

import {
  MessageCircle,
  MailOpen,
  CheckCircle2,
  Clock
} from "lucide-react"

interface Stats {
  total: number
  unread: number
  confirmed?: number
  pending?: number
  archived?: number
}

interface Props {
  stats: Stats
}

export function MessagesStats({ stats }: Props) {
  const items = [
    {
      label: "Conversations",
      value: stats.total,
      icon: MessageCircle,
    },
    {
      label: "Non lus",
      value: stats.unread,
      icon: MailOpen,
      highlight: "text-emerald-600",
      iconColor: "text-emerald-500",
    },
    {
      label: "Confirmés",
      value: stats.confirmed,
      icon: CheckCircle2,
      iconColor: "text-blue-500",
    },
    {
      label: "En attente",
      value: stats.pending,
      icon: Clock,
      highlight: "text-amber-600",
      iconColor: "text-amber-500",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((s) => {
        const Icon = s.icon

        return (
          <div
            key={s.label}
            className="bg-muted/50 rounded-xl px-4 py-3"
          >
            {/* HEADER (label + icon à droite) */}
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-muted-foreground">
                {s.label}
              </p>

              <Icon className={`w-3.5 h-3.5 ${s.iconColor ?? "text-muted-foreground/60"}`} />
            </div>

            {/* VALUE */}
            <p className={`text-xl font-semibold mt-1 ${s.highlight ?? ""}`}>
              {s.value ?? 0}
            </p>
          </div>
        )
      })}
    </div>
  )
}