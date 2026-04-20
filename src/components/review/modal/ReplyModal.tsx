"use client"

import { useState, useEffect } from "react"
import { Send, X, MessageCircle, Quote } from "lucide-react"

import { Button } from "@/components/ui/button"
import { type Review } from "@/hooks/use-review"

interface Props {
  open: boolean
  onClose: () => void
  review: Review
  onSend: (text: string) => void
}

export function ReplyModal({ open, onClose, review, onSend }: Props) {
  const [text, setText] = useState("")

  useEffect(() => {
    if (open) setText("")
  }, [open])

  if (!open) return null

  const handleSend = () => {
    if (!text.trim()) return
    onSend(text.trim())
    setText("")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

      <div className="bg-background border rounded-2xl shadow-2xl w-full max-w-md">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="font-semibold text-sm">
              Répondre à {review.author}
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

          {/* CONTEXT */}
          <div className="flex gap-2 bg-muted/50 px-3 py-2 rounded-xl text-xs text-muted-foreground">
            <Quote className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-60" />
            <p className="italic leading-relaxed line-clamp-3">
              {review.comment}
            </p>
          </div>

          {/* INPUT */}
          <div className="space-y-1.5">
            <textarea
              className="
                w-full
                border rounded-xl
                px-3 py-2
                text-xs
                resize-none
                min-h-[80px]
                focus:outline-none
                focus:ring-2 focus:ring-emerald-500/20
              "
              placeholder="Écrire une réponse..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* helper */}
            <p className="text-[10px] text-muted-foreground">
              Votre réponse sera visible publiquement.
            </p>
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center px-5 py-4 border-t">

          {/* left info */}
          <span className="text-[10px] text-muted-foreground">
            {text.length} caractères
          </span>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-xs"
            >
              Annuler
            </Button>

            <Button
              size="sm"
              onClick={handleSend}
              disabled={!text.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
            >
              <Send className="w-3.5 h-3.5 mr-1.5" />
              Envoyer
            </Button>
          </div>

        </div>

      </div>
    </div>
  )
}