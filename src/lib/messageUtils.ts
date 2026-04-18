import { type Message } from "@/components/message/discussion/MessageBubble";
import { parseTimeToMinutes } from "./dateUtils";

export function groupMessagesByDate(messages: any[]) {
  const groups: { date: string; messages: any[] }[] = []
  let currentDate = ""

  for (const msg of messages) {
    if (msg.date !== currentDate) {
      currentDate = msg.date
      groups.push({ date: msg.date, messages: [msg] })
    } else {
      groups[groups.length - 1].messages.push(msg)
    }
  }

  return groups
}

export function getGroupPosition(
  current: Message,
  prev?: Message,
  next?: Message
) {
  const threshold = 15

  const currentMin = parseTimeToMinutes(current.time)

  const prevMin = prev ? parseTimeToMinutes(prev.time) : null
  const nextMin = next ? parseTimeToMinutes(next.time) : null

  // 👇 C’EST ICI que tu mets ton code
  const isSamePrev =
    prev &&
    prev.sender === current.sender &&
    prev.date === current.date &&
    currentMin - prevMin! < threshold

  const isSameNext =
    next &&
    next.sender === current.sender &&
    next.date === current.date &&
    nextMin! - currentMin < threshold

  return {
    isStart: !isSamePrev,
    isEnd: !isSameNext,
  }
}