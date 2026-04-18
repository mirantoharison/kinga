"use client"

import {
  Bell,
  Clock,
  CheckCheck,
  Info,
  MessageCircle,
  Car,
  CreditCard,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

interface Props {
  notif: any
  isSelected: boolean
  multiSelect: boolean

  toggleSelect: (id: string) => void
  markOneRead: (id: string) => void
}

export function NotificationCard({
  notif,
  isSelected,
  multiSelect,
  toggleSelect,
  markOneRead,
}: Props) {

  const getIcon = () => {
    switch (notif.type) {
      case "message":
        return <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
      case "ride":
        return <Car className="w-3.5 h-3.5 text-emerald-500" />
      case "payment":
        return <CreditCard className="w-3.5 h-3.5 text-amber-500" />
      default:
        return <Info className="w-3.5 h-3.5 text-muted-foreground" />
    }
  }

  const handleClick = () => {
    if (multiSelect) {
      toggleSelect(notif.id)
    } else {
      markOneRead(notif.id)
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
              onCheckedChange={() => toggleSelect(notif.id)}
              onClick={(e) => e.stopPropagation()}
            />

            <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center">
              {getIcon()}
            </div>

            <span className="text-sm font-semibold truncate">
              {notif.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">

            {!notif.read && (
              <Badge className="bg-emerald-500 text-white text-[10px] px-1.5">
                Nouveau
              </Badge>
            )}

            <Badge variant="outline" className="text-[10px]">
              {notif.type}
            </Badge>

          </div>
        </div>

        {/* ── META ── */}
        <div className="flex gap-3 text-[11px] text-muted-foreground flex-wrap">

          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {notif.date}
          </span>

          {notif.context && (
            <span>
              {notif.context}
            </span>
          )}

        </div>

        {/* ── DESCRIPTION ── */}
        <p className="text-xs text-muted-foreground leading-snug">
          {notif.description}
        </p>

        <Separator />

        {/* ── FOOTER ── */}
        <div className="flex items-center justify-between">

          <div className="text-[11px] text-muted-foreground">
            {notif.source || "Système"}
          </div>

          {!notif.read && (
            <Button
              size="sm"
              variant="ghost"
              className="h-6 text-[11px] px-2"
              onClick={(e) => {
                e.stopPropagation()
                markOneRead(notif.id)
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