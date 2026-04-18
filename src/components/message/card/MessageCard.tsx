"use client"

import { type ReactNode } from "react"

interface CardProps {
  isMe: boolean
  children: ReactNode
}

export function Card({ isMe, children }: CardProps) {
  return (
    <div
      className={`rounded-xl border p-3 space-y-2 text-sm ${
        isMe
          ? "bg-primary/10 border-primary/20"
          : "bg-muted border-border"
      }`}
    >
      {children}
    </div>
  )
}

interface CardLabelProps {
  icon: React.ElementType
  label: string
}

export function CardLabel({ icon: Icon, label }: CardLabelProps) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{label}</span>
    </div>
  )
}