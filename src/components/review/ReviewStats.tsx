"use client"

import { Star, BarChart2, TrendingUp, MessageCircle } from "lucide-react"
import { Stat } from "@/components/review/misc/ReviewMiscUi"
import { type Review } from "@/hooks/use-review"

interface Props {
  reviews: Review[]
}

export function ReviewStats({ reviews }: Props) {
  const total = reviews.length

  const avg =
    total > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1)
      : "0"

  const positive =
    total > 0
      ? Math.round(
          (reviews.filter((r) => r.rating >= 4).length / total) * 100
        )
      : 0

  const withReplies = reviews.filter((r) => r.replies.length > 0).length

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

      <Stat
        label="Note moyenne"
        value={`${avg} / 5`}
        icon={<Star className="w-4 h-4" />}
        highlight="text-emerald-500"
      />

      <Stat
        label="Total avis"
        value={total}
        icon={<BarChart2 className="w-4 h-4" />}
      />

      <Stat
        label="Avis positifs"
        value={`${positive}%`}
        icon={<TrendingUp className="w-4 h-4" />}
        highlight="text-emerald-500"
      />

      <Stat
        label="Avec réponse"
        value={withReplies}
        icon={<MessageCircle className="w-4 h-4" />}
      />

    </div>
  )
}