"use client"

import { useEffect } from "react"
import { CheckCircle, Star } from "lucide-react"

/* ───────────── STAT ───────────── */

interface StatProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  highlight?: string
}

export function Stat({ label, value, icon, highlight }: StatProps) {
  return (
    <div className="bg-muted/50 border border-border rounded-xl px-4 py-3">

      <div className="flex items-center justify-between">
        <p className="text-[11px] text-muted-foreground">
          {label}
        </p>

        {icon && (
          <span className="text-muted-foreground">
            {icon}
          </span>
        )}
      </div>

      <p className={`text-xl font-semibold mt-1 text-foreground ${highlight ?? ""}`}>
        {value}
      </p>

    </div>
  )
}

/* ───────────── STARS ───────────── */

interface StarProps {
  rating: number
}

export function Stars({ rating }: StarProps) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i <= rating
              ? "fill-amber-500 text-amber-500"
              : "text-muted-foreground/40"
          }`}
        />
      ))}
    </div>
  )
}

/* ───────────── TOAST ───────────── */

interface ToastProps {
  message: string
  onClose: () => void
  duration?: number
}

export function Toast({ message, onClose, duration = 2500 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [onClose, duration])

  return (
    <div
      className="
        fixed bottom-6 right-6 z-50
        flex items-center gap-2
        bg-foreground text-background
        px-4 py-2.5 rounded-xl shadow-xl text-xs
        animate-in slide-in-from-bottom-4 duration-300
      "
    >
      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      {message}
    </div>
  )
}