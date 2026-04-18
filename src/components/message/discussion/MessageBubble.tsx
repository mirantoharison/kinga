"use client"

import { PriceMessage } from "@/components/message/card/PriceMessage"
import { PhotoMessage } from "@/components/message/card/PhotoMessage"
import { LiveLocationMessage } from "@/components/message/card/LiveLocationMessage"
import { getGroupPosition } from "@/lib/messageUtils"

/* ───────────── TYPES ───────────── */

export type Message =
  | {
    id: number
    sender: "me" | "other"
    type: "text"
    content: string
    time: string
    date: string
  }
  | {
    id: number
    sender: "me" | "other"
    type: "price"
    price: number
    status: "pending" | "accepted" | "refused"
    time: string
    date: string
  }
  | {
    id: number
    sender: "me" | "other"
    type: "photo"
    fileName: string
    fileType: "image" | "document"
    time: string
    date: string
  }
  | {
    id: number
    sender: "me" | "other"
    type: "live-location"
    duration: number
    lat: number
    lng: number
    label?: string
    accuracy?: number
    time: string
    date: string
  }

export type NewMessage =
  | { sender: "me" | "other"; type: "text"; content: string }
  | {
    sender: "me" | "other"
    type: "price"
    price: number
    status: "pending" | "accepted" | "refused"
  }
  | {
    sender: "me" | "other"
    type: "photo"
    fileName: string
    fileType: "image" | "document"
  }
  | {
    sender: "me" | "other"
    type: "live-location"
    duration: number
    lat: number
    lng: number
    label?: string
    accuracy?: number
  }

/* ───────────── PROPS ───────────── */

interface Props {
  message: Message
  previousMessage?: Message
  nextMessage?: Message
  onUpdatePrice: (id: number, status: "accepted" | "refused") => void
}

/* ───────────── COMPONENT ───────────── */

export function MessageBubble({
  message,
  previousMessage,
  nextMessage,
  onUpdatePrice,
}: Props) {
  const isMe = message.sender === "me"
  const isCard = message.type !== "text"

  const { isStart, isEnd } = getGroupPosition(
    message,
    previousMessage,
    nextMessage
  )

  /* 🎨 SHAPE FIXED */

  const base = "max-w-[75%] text-sm shadow-sm px-3 py-2"

  const meStyles = `
  bg-primary text-primary-foreground
  rounded-l-2xl
  ${isStart ? "rounded-tr-2xl" : "rounded-tr-sm"}
  ${isEnd ? "rounded-br-2xl" : "rounded-br-sm"}
`

  const otherStyles = `
  bg-muted text-foreground
  rounded-r-2xl
  ${isStart ? "rounded-tl-2xl" : "rounded-tl-sm"}
  ${isEnd ? "rounded-bl-2xl" : "rounded-bl-sm"}
`

  return (
    <div
      className={`flex flex-col ${isMe ? "items-end" : "items-start"
        } ${isEnd ? "mb-2" : "mb-0.5"}`}
    >
      <div
        className={
          isCard
            ? "w-[65%]"
            : `${base} ${isMe ? meStyles : otherStyles}`
        }
      >
        {message.type === "text" && message.content}

        {message.type === "price" && (
          <PriceMessage
            message={message}
            isMe={isMe}
            onUpdate={onUpdatePrice}
          />
        )}

        {message.type === "photo" && (
          <PhotoMessage message={message} isMe={isMe} />
        )}

        {message.type === "live-location" && (
          <LiveLocationMessage message={message} isMe={isMe} />
        )}
      </div>

      {/* ⏱️ TIME uniquement fin de groupe */}
      {isEnd && (
        <span className="text-[10px] text-muted-foreground mt-0.5 px-1">
          {message.time}
        </span>
      )}
    </div>
  )
}