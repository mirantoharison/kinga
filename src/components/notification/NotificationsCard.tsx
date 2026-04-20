"use client"

import { type Notification, type NotificationType } from "@/hooks/use-notification"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {
  MessageCircle,
  Car,
  CreditCard,
  Info,
  Clock,
  CheckCheck,
} from "lucide-react"

interface Props {
  notification: Notification
  selected: boolean
  multiSelect: boolean
  onToggleSelect: () => void
  onMarkRead: () => void
}

/* ─────────────── ICON ─────────────── */

function getIcon(type: NotificationType) {
  switch (type) {
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

/* ─────────────── COMPONENT ─────────────── */

export function NotificationCard({
  notification,
  selected,
  multiSelect,
  onToggleSelect,
  onMarkRead,
}: Props) {
  const { title, description, date, read, type } = notification

  const handleClick = () => {
    if (multiSelect) onToggleSelect()
    else if (!read) onMarkRead()
  }

  return (
    <div
      onClick={handleClick}
      className={`
        cursor-pointer transition-all rounded-2xl border
        ${selected ? "ring-2 ring-emerald-500" : ""}
        ${!read
          ? "bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10"
          : "hover:bg-muted/40"
        }
      `}
    >
      <div className="p-4 space-y-3">

        {/* ───── TOP ───── */}
        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-2 min-w-0">

            <Checkbox
              checked={selected}
              onCheckedChange={onToggleSelect}
              onClick={(e) => e.stopPropagation()}
            />

            <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center">
              {getIcon(type)}
            </div>

            <span className="text-sm font-semibold truncate">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!read && (
              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
            )}

            <Badge variant="outline" className="text-[10px]">
              {type}
            </Badge>
          </div>
        </div>

        {/* ───── META ───── */}
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Clock className="w-3 h-3" />
          {date}
        </div>

        {/* ───── DESCRIPTION ───── */}
        <p className="text-xs text-muted-foreground">
          {description}
        </p>

        {/* ───── FOOTER ───── */}
        {!read && <Separator className="opacity-60" />}

        <div className="flex justify-end">
          {!read && (
            <Button
              size="sm"
              variant="secondary"
              className="h-6 text-[11px] px-2"
              onClick={(e) => {
                e.stopPropagation()
                onMarkRead()
              }}
            >
              <CheckCheck className="w-3 h-3 mr-1" />
              Marquer comme lu
            </Button>
          )}
        </div>

      </div>
    </div>
  )
}