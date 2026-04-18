"use client"

interface Stats {
  total: number
  unread: number
  confirmed: number
  pending: number
}

interface Props {
  stats: Stats
}

export function MessagesStats({ stats }: Props) {
  const items = [
    { label: "Conversations", value: stats.total },
    { label: "Non lus", value: stats.unread, highlight: "text-emerald-600" },
    { label: "Confirmés", value: stats.confirmed },
    { label: "En attente", value: stats.pending, highlight: "text-amber-600" },
  ]

  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((s) => (
        <div
          key={s.label}
          className="bg-muted/50 rounded-xl px-4 py-3"
        >
          <p className="text-[11px] text-muted-foreground">
            {s.label}
          </p>

          <p className={`text-2xl font-semibold mt-0.5 ${s.highlight ?? ""}`}>
            {s.value}
          </p>
        </div>
      ))}
    </div>
  )
}