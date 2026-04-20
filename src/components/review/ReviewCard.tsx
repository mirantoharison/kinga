"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  MapPin,
  ExternalLink,
  Copy,
  MessageCircle,
  Reply,
  Flag,
  Car,
  Users,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { Stars } from "@/components/review/misc/ReviewMiscUi"
import { truncateText } from "@/lib/reviewUtils"

import { ReplyModal } from "@/components/review/modal/ReplyModal"
import { FlagModal } from "@/components/review/modal/FlagModal"
import { type Review } from "@/hooks/use-review"

interface Props {
  review: Review
  onToast: (msg: string) => void
}

export function ReviewCard({ review, onToast }: Props) {
  const navigate = useNavigate()

  const [copied, setCopied] = useState(false)
  const [replyOpen, setReplyOpen] = useState(false)
  const [flagOpen, setFlagOpen] = useState(false)
  const [localReplies, setLocalReplies] = useState(review.replies)

  /* ───────────── ACTIONS ───────────── */

  const handleCopy = () => {
    navigator.clipboard.writeText(`${review.from} → ${review.to}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
    onToast("Trajet copié dans le presse-papiers")
  }

  const handleSendReply = (text: string) => {
    setLocalReplies((prev) => [...prev, text])
    onToast("Réponse envoyée avec succès")
  }

  const handleFlag = () => {
    onToast("Signalement transmis à la modération")
  }

  /* ───────────── UI ───────────── */

  return (
    <>
      {/* MODALS */}
      <ReplyModal
        open={replyOpen}
        onClose={() => setReplyOpen(false)}
        review={review}
        onSend={handleSendReply}
      />

      <FlagModal
        open={flagOpen}
        onClose={() => setFlagOpen(false)}
        onSubmit={handleFlag}
      />

      {/* CARD */}
      <Card className="flex flex-col h-full hover:shadow-sm transition-all">
        <CardContent className="flex flex-col h-full px-4 py-3">

          <div className="flex-1 space-y-3">

            {/* HEADER */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">

                {/* Avatar (FIX) */}
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="text-xs font-semibold bg-muted text-foreground">
                    {review.author[0]}
                  </AvatarFallback>
                </Avatar>

                {/* Infos */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <p className="text-xs font-semibold text-foreground">
                    {review.author}
                  </p>

                  <Badge
                    variant="outline"
                    className="text-[10px] h-4 px-1.5 flex items-center gap-1"
                  >
                    {review.role === "Conducteur" ? (
                      <Car className="w-2.5 h-2.5" />
                    ) : (
                      <Users className="w-2.5 h-2.5" />
                    )}
                    {review.role}
                  </Badge>

                  <span className="text-[10px] text-muted-foreground">
                    {review.date}
                  </span>
                </div>
              </div>

              {/* Rating (FIX LIGHT/DARK) */}
              <div className="flex items-center gap-1.5 border border-border rounded-md px-2 py-1 bg-muted/60">
                <Stars rating={review.rating} />
                <span className="text-[11px] text-foreground">
                  {review.rating}/5
                </span>
              </div>
            </div>

            {/* TRAJET */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs bg-muted px-3 py-1.5 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-medium">{review.from}</span>
                →
                <span className="font-medium">{review.to}</span>
              </div>

              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs"
                  onClick={() => navigate(`/rides/${review.id}`)}
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                  Voir
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs"
                  onClick={handleCopy}
                >
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  {copied ? "Copié ✓" : "Copier"}
                </Button>
              </div>
            </div>

            {/* COMMENT */}
            <div className="relative bg-muted/50 px-4 py-3 rounded-xl border border-border">
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                {truncateText(review.comment, 180)}
              </p>
            </div>

          </div>

          {/* REPLIES */}
          <div className="mt-3 text-xs text-muted-foreground flex justify-between">
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              {localReplies.length} réponse{localReplies.length > 1 && "s"}
            </div>

            <Button
              size="sm"
              variant="ghost"
              className="h-6 text-[11px]"
              onClick={() => navigate(`/reviews/${review.id}`)}
            >
              Voir détails
            </Button>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between pt-3 border-t border-border mt-3">
            <div className="flex gap-2">

              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs"
                onClick={() => setReplyOpen(true)}
              >
                <Reply className="w-3.5 h-3.5 mr-1" />
                Répondre
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs text-muted-foreground hover:text-rose-500"
                onClick={() => setFlagOpen(true)}
              >
                <Flag className="w-3.5 h-3.5 mr-1" />
                Signaler
              </Button>
            </div>

            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs text-muted-foreground"
              onClick={() => navigate(`/reviews/${review.id}`)}
            >
              Détails →
            </Button>
          </div>

        </CardContent>
      </Card>
    </>
  )
}