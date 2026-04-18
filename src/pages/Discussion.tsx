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
import { Handshake, MapPin, MessageCircle, ShieldCheck } from "lucide-react"

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
  const [loading, setLoading] = useState(true)

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

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 800) // remplace par ton vrai fetch
  }

  const grouped = groupMessagesByDate(messages)

  /* ───────────── AUTO SCROLL ───────────── */

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  /* ───────────── UI ───────────── */

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-64px)] overflow-hidden">

      {/* HEADER */}
      <DiscussionHeader
        navigate={navigate}
        muted={muted}
        setMuted={setMuted}
        onRefresh={handleRefresh} 
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
        <div className="px-6 py-4 flex flex-col items-center gap-3 text-center">

          {/* TITLE */}
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-foreground/60" />
            <p className="text-[11px] font-semibold text-foreground/60 uppercase tracking-wide">
              Discussion sécurisée
            </p>
          </div>

          {/* DESCRIPTION */}
          <p className="text-[10px] text-muted-foreground max-w-[450px] leading-snug">
            Cet espace vous permet d’échanger librement avec le conducteur avant de confirmer votre place.
            Vous pouvez poser vos questions, clarifier les détails du trajet, discuter des horaires ou des points de rendez-vous,
            et vous assurer que tout correspond à vos attentes. La discussion vous aide également à vous organiser plus facilement
            le jour du départ et à éviter toute confusion.
          </p>

          {/* FEATURES */}
          <div className="flex flex-wrap justify-center gap-3 mt-1 text-[10px] text-muted-foreground">

            <div className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Discuter</span>
            </div>

            <div className="flex items-center gap-1">
              <Handshake className="w-3.5 h-3.5" />
              <span>Négocier</span>
            </div>

            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Partager position</span>
            </div>

          </div>

        </div>

        <Separator />

        {/* MESSAGES */}
        {loading ? (
          <div className="flex flex-col gap-3 px-4 py-4">

            {/* Skeleton bulles */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`h-9 rounded-2xl animate-pulse bg-muted ${i % 2 === 0 ? "w-[52%]" : "w-[44%]"
                    }`}
                />
              </div>
            ))}

            {/* Icône + message */}
            <div className="flex flex-col items-center gap-2 pt-3">
              <svg
                className="animate-spin text-muted-foreground"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <span className="text-xs text-muted-foreground">
                Chargement des messages...
              </span>
            </div>

          </div>
        ) : (
          <MessagesList
            grouped={grouped}
            onUpdatePrice={updatePrice}
            endRef={endRef}
          />
        )}
      </div>

      {/* INPUT */}
      <InputBar push={push} />

    </div>
  )
}