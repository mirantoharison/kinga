"use client"

import { useState } from "react"
import { Paperclip, ImageIcon, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

export function AttachPopover({ push, fileInputRef }: any) {
  const [open, setOpen] = useState(false)

  const handleFile = (e: any) => {
    const file = e.target.files?.[0]
    if (!file) return

    push({
      sender: "me",
      type: "photo",
      fileName: file.name,
      fileType: file.type.startsWith("image/") ? "image" : "document",
    })

    setOpen(false)
    e.target.value = ""
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline">
          <Paperclip className="w-4 h-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-60 p-4 space-y-3">
        <div>
          <p className="text-sm font-semibold">Envoyer une pièce jointe</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
            Ajoutez une photo ou un document pour partager une information utile : preuve de paiement, point de rendez-vous, ou tout autre détail important.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          Image
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <FileText className="w-4 h-4 mr-2" />
          Document
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFile}
        />
      </PopoverContent>
    </Popover>
  )
}