"use client"

import { Badge } from "@/components/ui/badge"

import {
  Hash,
  Smartphone,
  Calendar,
  CheckCircle2,
  Clock,
} from "lucide-react"

interface Props {
  item: {
    id: string
    operator: string
    amount: number
    status: "validé" | "en attente"
    date: string
  }
}

export function PaymentHistoryItem({ item }: Props) {
  return (
    <div
      className="rounded-xl border p-4 flex items-center justify-between hover:bg-muted/40 transition"
    >
      {/* LEFT */}
      <div className="space-y-1.5">

        {/* ID */}
        <div className="flex items-center gap-2">
          <Hash className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-sm font-medium">
            {item.id}
          </span>
        </div>

        {/* Operator + Date */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Smartphone className="w-3 h-3" />
            {item.operator}
          </span>

          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {item.date}
          </span>
        </div>

        {/* Status description */}
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          {item.status === "validé" ? (
            <>
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              Paiement confirmé et tokens crédités
            </>
          ) : (
            <>
              <Clock className="w-3 h-3 text-amber-500" />
              En cours de vérification
            </>
          )}
        </div>

      </div>

      {/* RIGHT */}
      <div className="text-right space-y-1">

        <p className="text-sm font-semibold">
          {item.amount} Ar
        </p>

        <Badge
          className={
            item.status === "validé"
              ? "bg-emerald-500 text-white"
              : "bg-amber-500 text-white"
          }
        >
          {item.status}
        </Badge>

      </div>

    </div>
  )
}