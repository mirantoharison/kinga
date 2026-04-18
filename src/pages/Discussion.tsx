"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { RideCard, type Ride } from "@/components/ride/search/RideCard"
import { Separator } from "@/components/ui/separator"

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
import { DollarSign, Handshake, MessageSquare, ShieldCheck } from "lucide-react"

/* ───────────────────────── MOCK RIDE ───────────────────────── */

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

/* ───────────────────────── PAGE ───────────────────────── */

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
      type: "price",
      price: 12000,
      status: "pending",
      time: "09:13",
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

        {/* MESSAGE D'ACCUEIL */}
        <div className="px-6 py-4 flex flex-col items-center gap-2 text-center">
          {/* Icônes décoratives */}
          <div className="flex items-center gap-3 text-muted-foreground/40 mb-0.5">
            <DollarSign className="w-3.5 h-3.5" />
            <MessageSquare className="w-3.5 h-3.5" />
            <ShieldCheck className="w-3.5 h-3.5" />
            <Handshake className="w-3.5 h-3.5" />
          </div>

          <p className="text-[11px] font-semibold text-foreground/60 tracking-wide uppercase">
            Discussion sécurisée
          </p>

          <div className="space-y-1.5 max-w-[450px] w-full">
            <p className="text-[10px] text-muted-foreground leading-[1.5]">
              Cet espace vous permet de vous accorder avec le conducteur avant de confirmer votre
              place. Négociez le prix, posez vos questions sur le trajet, ou précisez des détails
              pratiques comme le point de départ exact. Vous pouvez aussi partager votre position en direct le jour du départ pour faciliter la rencontre, ou envoyer une pièce jointe si nécessaire. Les messages ne sont visibles que par vous et le conducteur.
            </p>
          </div>
        </div>

        <Separator />

        {/* MESSAGES */}
        <MessagesList
          grouped={grouped}
          onUpdatePrice={updatePrice}
          endRef={endRef}
        />
      </div>

      {/* INPUT */}
      <InputBar push={push} />

    </div>
  )
}