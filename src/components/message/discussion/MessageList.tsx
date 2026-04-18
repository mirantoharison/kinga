"use client"

import { useState, useMemo } from "react"
import { type Message, MessageBubble } from "./MessageBubble"
import { ChevronUp } from "lucide-react"

interface GroupedMessages {
  date: string
  messages: Message[]
}

interface Props {
  grouped: GroupedMessages[]
  onUpdatePrice: (id: number, status: "accepted" | "refused") => void
  endRef: React.RefObject<HTMLDivElement>
}

const PAGE_SIZE = 10

export function MessagesList({ grouped, onUpdatePrice, endRef }: Props) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  /* ───────────── FLATTEN ───────────── */

  const allMessages = useMemo(
    () => grouped.flatMap((g) => g.messages),
    [grouped]
  )

  /* ───────────── PAGINATION ───────────── */

  const visibleMessages = useMemo(
    () => allMessages.slice(-visibleCount),
    [allMessages, visibleCount]
  )

  const showMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE)
  }

  /* ───────────── REGROUP ───────────── */

  const regrouped = useMemo(() => {
    const map = new Map<string, Message[]>()

    visibleMessages.forEach((msg) => {
      if (!map.has(msg.date)) map.set(msg.date, [])
      map.get(msg.date)!.push(msg)
    })

    return Array.from(map.entries()).map(([date, messages]) => ({
      date,
      messages,
    }))
  }, [visibleMessages])

  /* ───────────── UI ───────────── */

  const remaining = allMessages.length - visibleCount

  return (
    <div className="px-3 py-4 space-y-5">

      {/* LOAD MORE */}
      {remaining > 0 && (
        <div className="flex justify-center">
          <button
            onClick={showMore}
            className="flex items-center gap-1 text-xs bg-muted px-3 py-1 rounded-full hover:bg-muted/80 transition"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            Voir {Math.min(PAGE_SIZE, remaining)} messages précédents
          </button>
        </div>
      )}

      {/* MESSAGES */}
      {regrouped.map((group, groupIndex) => (
        <div key={group.date} className="space-y-2">

          {/* DATE */}
          <div className="flex justify-center">
            <span className="text-[11px] text-muted-foreground bg-muted px-3 py-0.5 rounded-full">
              {group.date}
            </span>
          </div>

          {/* LIST */}
          {group.messages.map((msg, index) => {
            // 🔥 PREVIOUS (gestion cross-group)
            const prev =
              index > 0
                ? group.messages[index - 1]
                : regrouped[groupIndex - 1]?.messages.slice(-1)[0]

            // 🔥 NEXT (gestion cross-group)
            const next =
              index < group.messages.length - 1
                ? group.messages[index + 1]
                : regrouped[groupIndex + 1]?.messages[0]

                console.log(prev, msg, next)

            return (
              <MessageBubble
                key={msg.id}
                message={msg}
                previousMessage={prev}
                nextMessage={next}
                onUpdatePrice={onUpdatePrice}
              />
            )
          })}
        </div>
      ))}

      {/* SCROLL TARGET */}
      <div ref={endRef} />
    </div>
  )
}