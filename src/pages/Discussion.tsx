"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Separator } from "@/components/ui/separator"
import { RideCard, type Ride } from "@/components/ride/search/RideCard"

import { DiscussionHeader } from "@/components/message/discussion/DiscussionHeader"
import { MessagesList } from "@/components/message/discussion/MessageList"
import { InputBar } from "@/components/message/input/InputBar"

import {
  getTime,
  TODAY,
  YESTERDAY,
} from "@/lib/dateUtils"
import { groupMessagesByDate } from "@/lib/messageUtils"

import { type Message, type NewMessage } from "@/components/message/discussion/MessageBubble"

/* ───────────── MOCK RIDE ───────────── */

const ride: Ride = {
  from: "Antananarivo",
  to: "Tamatave",
  time: "08:00",
  date: "12 Mai",
  distance: 350,
  duration: "6h",
  price: 15000,
  seats: 3,
  driver: "Alex",
  rating: 4.8,
  reviews: 120,
}

/* ───────────── PAGE ───────────── */

export default function DiscussionPage() {
  const navigate = useNavigate()

  const endRef = useRef<HTMLDivElement>(null)

  const [muted, setMuted] = useState(false)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "other",
      type: "text",
      content: "Bonjour, le trajet est toujours disponible ?",
      time: "09:10",
      date: YESTERDAY,
    },
    {
      id: 2,
      sender: "me",
      type: "text",
      content: "Oui 👍 il reste encore des places",
      time: "09:12",
      date: YESTERDAY,
    },
    {
      id: 3,
      sender: "other",
      type: "live-location",
      duration: 30,
      lat: -18.8792,
      lng: 47.5079,
      label: "Antananarivo",
      accuracy: 20,
      time: "09:40", // 👈 important pour test logique 15 min
      date: TODAY,
    },
  ])

  /* ───────────── LOGIC ───────────── */

  const push = (msg: NewMessage) =>
    setMessages((prev) => [
      ...prev,
      {
        ...msg,
        id: Date.now(),
        time: getTime(),
        date: TODAY,
      } as Message,
    ])

  const updatePrice = (id: number, status: "accepted" | "refused") =>
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id && m.type === "price"
          ? { ...m, status }
          : m
      )
    )

  const grouped = groupMessagesByDate(messages)

  /* ───────────── AUTO SCROLL ───────────── */

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  /* ───────────── UI ───────────── */

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-64px)] overflow-hidden">

      {/* HEADER */}
      <DiscussionHeader
        navigate={navigate}
        muted={muted}
        setMuted={setMuted}
        ride={ride}
      />

      {/* BODY */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">

        {/* RIDE CARD */}
        <div className="px-4 pt-4 pb-3">
          <RideCard ride={ride} mode="message" />
        </div>

        <Separator />

        {/* MESSAGE INFO */}
        <div className="px-6 py-4 flex flex-col items-center gap-2 text-center">
          <p className="text-[11px] font-semibold text-foreground/60 uppercase tracking-wide">
            Discussion sécurisée
          </p>

          <p className="text-[10px] text-muted-foreground max-w-[450px] leading-snug">
            Cet espace vous permet d’échanger librement avec le conducteur avant de confirmer votre place.
            Vous pouvez poser vos questions, ajuster les détails du trajet, proposer un prix ou partager
            votre position en direct pour faciliter votre rencontre le jour du départ.
          </p>
        </div>

        <Separator />

        {/* MESSAGES */}
        <MessagesList
          grouped={grouped}
          onUpdatePrice={updatePrice}
          endRef={endRef} // 👈 important pour auto-scroll
        />
      </div>

      {/* INPUT */}
      <InputBar push={push} />

    </div>
  )
}