"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
} from "lucide-react"

interface Props {
  form: {
    date: string
    time: string
    price: string
    seats: string
  }
  onChange: (key: string, value: string) => void
  estimatedPrice: number | null
}

export function RideDetailsForm({
  form,
  onChange,
  estimatedPrice,
}: Props) {
  return (
    <div className="space-y-6">

      {/* DATE / HEURE */}
      <div className="grid grid-cols-2 gap-4">

        <Field icon={Calendar} label="Date du départ">
          <Input
            type="date"
            value={form.date}
            onChange={(e) => onChange("date", e.target.value)}
          />
        </Field>

        <Field icon={Clock} label="Heure de départ">
          <Input
            type="time"
            value={form.time}
            onChange={(e) => onChange("time", e.target.value)}
          />
        </Field>

      </div>

      {/* PRIX / PLACES */}
      <div className="grid grid-cols-2 gap-4">

        <Field
          icon={DollarSign}
          label="Prix par passager (Ar)"
          hint={
            estimatedPrice
              ? `Suggestion : ${estimatedPrice} Ar`
              : undefined
          }
        >
          <Input
            type="number"
            value={form.price}
            placeholder={
              estimatedPrice ? `${estimatedPrice}` : "Ex : 5000"
            }
            onChange={(e) => onChange("price", e.target.value)}
          />
        </Field>

        <Field
          icon={Users}
          label="Nombre de places"
          hint="Places disponibles pour les passagers"
        >
          <Input
            type="number"
            value={form.seats}
            onChange={(e) => onChange("seats", e.target.value)}
            min={1}
            max={8}
          />
        </Field>

      </div>

    </div>
  )
}

/* ───────────────────────────────────────────── */

function Field({
  icon: Icon,
  label,
  hint,
  children,
}: {
  icon: any
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">

      <Label className="text-xs text-muted-foreground flex items-center gap-1">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </Label>

      {children}

      {hint && (
        <p className="text-[11px] text-muted-foreground">
          {hint}
        </p>
      )}

    </div>
  )
}