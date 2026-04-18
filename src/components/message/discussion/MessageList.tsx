"use client"

import { type Message } from "./MessageBubble"
import { MessageBubble } from "./MessageBubble"

interface GroupedMessages {
  date: string
  messages: Message[]
}

interface Props {
  grouped: GroupedMessages[]
  onUpdatePrice: (id: number, status: "accepted" | "refused") => void
  endRef: React.RefObject<HTMLDivElement>
}

export function MessagesList({
  grouped,
  onUpdatePrice,
  endRef,
}: Props) {
  return (
    <div className="px-3 py-4 space-y-5">

      {grouped.map((group) => (
        <div key={group.date} className="space-y-2">

          {/* DATE SEPARATOR */}
          <div className="flex justify-center">
            <span className="text-[11px] text-muted-foreground bg-muted px-3 py-0.5 rounded-full">
              {group.date}
            </span>
          </div>

          {/* MESSAGES */}
          {group.messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              onUpdatePrice={onUpdatePrice}
            />
          ))}

        </div>
      ))}

      {/* SCROLL TARGET */}
      <div ref={endRef} />

    </div>
  )
}