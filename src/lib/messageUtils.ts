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
  const THRESHOLD = 2
  const currentMin = parseTimeToMinutes(current.time)

  const isSamePrev = (() => {
    if (!prev || prev.sender !== current.sender) return false
    const diff = currentMin - parseTimeToMinutes(prev.time)
    return diff >= 0 && diff < THRESHOLD
  })()

  const isSameNext = (() => {
    if (!next || next.sender !== current.sender) return false
    const diff = parseTimeToMinutes(next.time) - currentMin
    return diff >= 0 && diff < THRESHOLD
  })()

  return {
    isStart: !isSamePrev,
    isEnd: !isSameNext,
  }
}