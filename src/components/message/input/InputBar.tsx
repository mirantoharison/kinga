"use client"

import { useRef, useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

import { PricePopover } from "./PricePopover"
import { LiveLocationPopover } from "./LiveLocationPopover"
import { AttachPopover } from "./AttachPopover"

import { type NewMessage } from "@/components/message/discussion/MessageBubble"

interface Props {
  push: (msg: NewMessage) => void
}

export function InputBar({ push }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (!input.trim()) return
    push({ sender: "me", type: "text", content: input })
    setInput("")
  }

  return (
    <div className="px-3 py-2.5 flex items-center gap-2 border-t bg-background shrink-0">

      <PricePopover push={push} />
      <LiveLocationPopover push={push} />
      <AttachPopover push={push} fileInputRef={fileInputRef} />

      {/* INPUT */}
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Écrire un message..."
        className="flex-1 min-w-0"
      />

      {/* SEND */}
      <Button onClick={sendMessage} disabled={!input.trim()}>
        <Send className="w-4 h-4" />
      </Button>
    </div>
  )
}