"use client"

import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Clock,
  Route,
  ExternalLink,
  MoreHorizontal,
  Info,
  Reply,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

interface Props {
  name: string
  rating: number
  comment: string
  avatar?: string
  date?: string
  trip?: string
  rideId?: string
  likes?: number
  dislikes?: number
  replies?: number
  compact?: boolean
}

export function ReviewCard({
  name,
  rating,
  comment,
  avatar,
  date,
  trip,
  rideId,
  likes = 0,
  dislikes = 0,
  replies = 0,
  compact = false,
}: Props) {
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const isPositive = rating >= 4
  const isNegative = rating <= 2

  const handleNavigate = () => {
    if (!rideId) return
    navigate(`/ride/${rideId}`)
  }

  return (
    <div
      className={cn(
        "flex gap-3 transition",
        !compact && "p-4 rounded-xl border bg-muted/30 hover:bg-muted/50"
      )}
    >

      {/* AVATAR */}
      <img
        src={avatar || `https://i.pravatar.cc/100?u=${name}`}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* CONTENT */}
      <div className="flex-1 space-y-3">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-medium">{name}</p>

            {isPositive && (
              <Badge className="text-[10px] bg-emerald-50 text-emerald-600 border">
                👍 Positif
              </Badge>
            )}

            {isNegative && (
              <Badge variant="destructive" className="text-[10px]">
                ⚠️ Négatif
              </Badge>
            )}
          </div>

          {date && (
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="w-3 h-3" />
              {date}
            </span>
          )}

        </div>

        {/* RATING */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-3.5 h-3.5",
                i < rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-muted-foreground/30"
              )}
            />
          ))}

          <span className="text-xs text-muted-foreground ml-1">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* TRAJET */}
        {trip && (
          <button
            onClick={handleNavigate}
            disabled={!rideId}
            className={cn(
              "flex items-center gap-1 text-[11px]",
              rideId
                ? "text-emerald-600 hover:underline cursor-pointer"
                : "text-muted-foreground"
            )}
          >
            <Route className="w-3 h-3" />
            {trip}
            {rideId && <ExternalLink className="w-3 h-3 opacity-60" />}
          </button>
        )}

        {/* COMMENT */}
        <p className="text-xs text-muted-foreground leading-relaxed">
          {comment}
        </p>

        {/* STATS */}
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">

          {/* LIKE */}
          <button
            onClick={() => {
              setLiked(!liked)
              if (disliked) setDisliked(false)
            }}
            className={cn(
              "flex items-center gap-1 transition",
              liked && "text-emerald-600"
            )}
          >
            <ThumbsUp className="w-3 h-3" />
            {likes + (liked ? 1 : 0)}
          </button>

          {/* DISLIKE */}
          <button
            onClick={() => {
              setDisliked(!disliked)
              if (liked) setLiked(false)
            }}
            className={cn(
              "flex items-center gap-1 transition",
              disliked && "text-red-500"
            )}
          >
            <ThumbsDown className="w-3 h-3" />
            {dislikes + (disliked ? 1 : 0)}
          </button>

          {/* REPLIES */}
          <span className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3" />
            {replies} réponse{replies > 1 ? "s" : ""}
          </span>

        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 pt-1">

          <Button variant="outline" size="sm" className="text-xs flex-1">
            <Info className="w-3 h-3 mr-1" />
            Détails
          </Button>

          <Button variant="outline" size="sm" className="text-xs flex-1">
            <Reply className="w-3 h-3 mr-1" />
            Répondre
          </Button>

          <Button size="sm" className="text-xs flex-1">
            Contacter
          </Button>

          <Button variant="ghost" size="icon" className="w-8 h-8">
            <MoreHorizontal className="w-4 h-4" />
          </Button>

        </div>

      </div>
    </div>
  )
}