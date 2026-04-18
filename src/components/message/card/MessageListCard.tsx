"use client"

import {
  MapPin,
  Clock,
  Star,
  CheckCheck,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

import { getStatus } from "@/lib/messageUtils"

interface Props {
  conv: any
  isSelected: boolean
  multiSelect: boolean

  toggleSelect: (id: number) => void
  markOneRead: (id: number) => void

  navigate: (path: string) => void
}

export function MessageCard({
  conv,
  isSelected,
  multiSelect,
  toggleSelect,
  markOneRead,
  navigate,
}: Props) {

  const status = getStatus(conv.status)

  const handleClick = () => {
    if (multiSelect) {
      toggleSelect(conv.id)
    } else {
      navigate(`/messages/${conv.id}`)
    }
  }

  return (
    <Card
      className={`cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-emerald-500" : ""
      }`}
      onClick={handleClick}
    >
      <CardContent className="p-4 space-y-3">

        {/* ── TOP ROW ── */}
        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-2 min-w-0">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => toggleSelect(conv.id)}
              onClick={(e) => e.stopPropagation()}
            />

            <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />

            <span className="text-sm font-semibold truncate">
              {conv.from} → {conv.to}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">

            {conv.unread > 0 && (
              <Badge className="bg-emerald-500 text-white text-[10px] px-1.5 min-w-[20px] justify-center">
                {conv.unread}
              </Badge>
            )}

            <Badge className={`text-[10px] ${status.class}`}>
              {status.label}
            </Badge>

          </div>
        </div>

        {/* ── META ── */}
        <div className="flex gap-3 text-[11px] text-muted-foreground flex-wrap">

          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {conv.date} · {conv.time}
          </span>

          <span>
            {conv.distance} km · {conv.duration}
          </span>

          {conv.urgency && (
            <span className="text-amber-600 font-medium">
              {conv.urgency}
            </span>
          )}

        </div>

        {/* ── LAST MESSAGE + PRICE ── */}
        <div className="flex items-center justify-between gap-3">

          <p className="text-xs text-muted-foreground truncate flex-1">
            {conv.lastMessage}
          </p>

          <span className="text-xs font-medium shrink-0">
            {conv.price.toLocaleString()} Ar
            <span className="text-muted-foreground font-normal">
              {" "}· {conv.priceStatus}
            </span>
          </span>

        </div>

        <Separator />

        {/* ── FOOTER ── */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">

            <Avatar className="w-5 h-5">
              <AvatarImage src={`https://i.pravatar.cc/100?u=${conv.id}`} />
              <AvatarFallback className="text-[9px]">
                {conv.user.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <span>{conv.user}</span>
            <span>·</span>
            <span>{conv.role}</span>
            <span>·</span>

            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{conv.rating}</span>
          </div>

          {conv.unread > 0 && (
            <Button
              size="sm"
              variant="ghost"
              className="h-6 text-[11px] px-2"
              onClick={(e) => {
                e.stopPropagation()
                markOneRead(conv.id)
              }}
            >
              <CheckCheck className="w-3 h-3 mr-1" />
              Marquer lu
            </Button>
          )}

        </div>

      </CardContent>
    </Card>
  )
}