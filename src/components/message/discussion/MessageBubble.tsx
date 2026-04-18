"use client"

import { PriceMessage } from "@/components/message/card/PriceMessage"
import { PhotoMessage } from "@/components/message/card/PhotoMessage"
import { LiveLocationMessage } from "@/components/message/card/LiveLocationMessage"

interface Props {
  message: Message
  onUpdatePrice: (id: number, status: "accepted" | "refused") => void
}

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

export function MessageBubble({ message, onUpdatePrice }: Props) {
  const isMe = message.sender === "me"
  const isCard = message.type !== "text"

  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>

      <div
        className={
          isCard
            ? `w-[65%] ${isMe ? "self-end" : "self-start"}`
            : `max-w-[75%] text-sm shadow-sm px-3 py-2 ${isMe
              ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm"
              : "bg-muted text-foreground rounded-2xl rounded-bl-sm"
            }`
        }
      >
        {/* TEXT */}
        {message.type === "text" && message.content}

        {/* PRICE */}
        {message.type === "price" && (
          <PriceMessage
            message={message}
            isMe={isMe}
            onUpdate={onUpdatePrice}
          />
        )}

        {/* PHOTO */}
        {message.type === "photo" && (
          <PhotoMessage
            message={message}
            isMe={isMe}
          />
        )}

        {/* LIVE LOCATION */}
        {message.type === "live-location" && (
          <LiveLocationMessage
            message={message}
            isMe={isMe}
          />
        )}
      </div>

      {/* TIME */}
      <span className="text-[10px] text-muted-foreground mt-0.5 px-1">
        {message.time}
      </span>
    </div>
  )
}