"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  History,
  Hash,
  Smartphone,
  Calendar,
  CheckCircle2,
  Clock,
} from "lucide-react"

export interface HistoryItem {
  id: string
  operator: string
  amount: number
  status: "validé" | "en attente"
  date: string
}

interface Props {
  history: HistoryItem[]
}

export function PaymentHistory({ history }: Props) {
  return (
    <Card>
      <CardContent className="p-5 space-y-5">

        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Historique des paiements
          </span>
        </div>

        {/* 🔥 TEXTE RICHE */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Consultez vos dernières transactions pour vérifier l’état de vos paiements. Les paiements passent en <span className="font-medium text-foreground">attente</span> avant
            d’être <span className="font-medium text-foreground">validés</span> après vérification.
          </p>
        </div>

        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
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
          ))}
        </div>

        {/* 🔥 SUPPORT TEXT */}
        <div className="rounded-xl bg-muted/40 border px-4 py-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            ⚠️ Si un paiement reste en attente trop longtemps, vérifiez les
            informations saisies ou contactez le support.
          </p>
        </div>

      </CardContent>
    </Card>
  )
}