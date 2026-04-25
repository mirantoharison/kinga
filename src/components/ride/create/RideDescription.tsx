"use client"

import { Textarea } from "@/components/ui/textarea"

interface Props {
  description: string
  onChange: (value: string) => void
}

export function RideDescription({ description, onChange }: Props) {
  return (
    <div className="space-y-1.5">

      <Textarea
        placeholder="Ex : Voiture climatisée, musique douce, une pause café prévue à mi-chemin. Bagages acceptés. Non-fumeur."
        className="text-xs"
        autoCorrect="off"
        value={description}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
      />

    </div>
  )
}