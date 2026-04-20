"use client"

import { useState } from "react"
import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (reason: string) => void
}

const FLAG_REASONS = [
  "Contenu inapproprié",
  "Fausse information",
  "Spam ou publicité",
  "Harcèlement",
  "Autre raison",
]

export function FlagModal({ open, onClose, onSubmit }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [custom, setCustom] = useState("")

  if (!open) return null

  const handleSubmit = () => {
    if (!selected) return
    const reason = selected === "Autre raison" ? custom : selected
    if (!reason.trim()) return

    onSubmit(reason)
    setSelected(null)
    setCustom("")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

      <div className="bg-background border rounded-2xl shadow-2xl w-full max-w-md">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
            </div>
            <p className="font-semibold text-sm">
              Signaler cet avis
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="px-5 py-4 space-y-4">

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed">
            Ce signalement sera envoyé à notre équipe de modération.
            Merci de choisir la raison la plus appropriée.
          </p>

          {/* REASONS */}
          <div className="grid gap-2">
            {FLAG_REASONS.map((reason) => (
              <button
                key={reason}
                onClick={() => setSelected(reason)}
                className={`
                  w-full text-left text-xs px-3 py-2 rounded-xl border transition-all
                  flex items-center justify-between
                  ${selected === reason
                    ? "border-rose-500/40 bg-rose-500/10 text-rose-400"
                    : "border-border hover:bg-muted"
                  }
                `}
              >
                {reason}

                {selected === reason && (
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                )}
              </button>
            ))}
          </div>

          {/* CUSTOM TEXTAREA */}
          {selected === "Autre raison" && (
            <textarea
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Précisez la raison du signalement..."
              className="
                w-full
                border rounded-xl
                px-3 py-2
                text-xs
                resize-none
                min-h-[70px]
                focus:outline-none
                focus:ring-2 focus:ring-rose-500/20
              "
            />
          )}

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-2 px-5 py-4 border-t">

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            Annuler
          </Button>

          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!selected || (selected === "Autre raison" && !custom.trim())}
            className="bg-rose-600 hover:bg-rose-700 text-white"
          >
            Signaler
          </Button>

        </div>

      </div>
    </div>
  )
}