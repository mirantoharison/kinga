"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { RideCard, type Ride } from "@/components/ride/search/RideCard"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

import {
  ArrowLeft,
  Send,
  DollarSign,
  Paperclip,
  MoreVertical,
  Navigation,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Flag,
  Trash2,
  Lock,
  Phone,
  Star,
  Share2,
  Bell,
  BellOff,
  Info,
  ImageIcon,
  FileText,
  MessageSquare,
  Handshake,
  LocateFixed,
  Timer,
  ShieldCheck,
} from "lucide-react"

/* ───────────────────────── TYPES ───────────────────────── */

type Message =
  | { id: number; sender: "me" | "other"; type: "text"; content: string; time: string; date: string }
  | { id: number; sender: "me" | "other"; type: "price"; price: number; status: "pending" | "accepted" | "refused"; time: string; date: string }
  | { id: number; sender: "me" | "other"; type: "photo"; fileName: string; fileType: "image" | "document"; time: string; date: string }
  | { id: number; sender: "me" | "other"; type: "live-location"; duration: number; time: string; date: string }

type NewMessage =
  | { sender: "me" | "other"; type: "text"; content: string }
  | { sender: "me" | "other"; type: "price"; price: number; status: "pending" | "accepted" | "refused" }
  | { sender: "me" | "other"; type: "photo"; fileName: string; fileType: "image" | "document" }
  | { sender: "me" | "other"; type: "live-location"; duration: number }

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

/* ───────────────────────── HELPERS ───────────────────────── */

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

const TODAY = "Aujourd'hui"
const YESTERDAY = "Hier"

function groupMessagesByDate(messages: Message[]) {
  const groups: { date: string; messages: Message[] }[] = []
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

/* ───────────────────────── PAGE ───────────────────────── */

export default function DiscussionPage() {
  const navigate = useNavigate()
  const endRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [muted, setMuted] = useState(false)

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "other", type: "text", content: "Bonjour, le trajet est toujours disponible ?", time: "09:10", date: YESTERDAY },
    { id: 2, sender: "me", type: "text", content: "Oui 👍 il reste encore des places", time: "09:12", date: YESTERDAY },
    { id: 3, sender: "other", type: "price", price: 12000, status: "pending", time: "09:13", date: TODAY },
  ])

  const [input, setInput] = useState("")

  /* Prix */
  const [priceInput, setPriceInput] = useState("")
  const [priceOpen, setPriceOpen] = useState(false)

  /* Position en direct */
  const [liveOpen, setLiveOpen] = useState(false)
  const [liveDuration, setLiveDuration] = useState(15)

  /* Pièce jointe */
  const [attachOpen, setAttachOpen] = useState(false)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  /* ───────────── HANDLERS ───────────── */

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

  const sendMessage = () => {
    if (!input.trim()) return
    push({ sender: "me", type: "text", content: input })
    setInput("")
  }

  const sendPrice = () => {
    if (!priceInput) return
    push({ sender: "me", type: "price", price: Number(priceInput), status: "pending" })
    setPriceInput(""); setPriceOpen(false)
  }

  const sendLiveLocation = () => {
    push({ sender: "me", type: "live-location", duration: liveDuration })
    setLiveOpen(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    push({ sender: "me", type: "photo", fileName: file.name, fileType: file.type.startsWith("image/") ? "image" : "document" })
    setAttachOpen(false)
    e.target.value = ""
  }

  const updatePrice = (id: number, status: "accepted" | "refused") =>
    setMessages((prev) => prev.map((m) => (m.id === id && m.type === "price" ? { ...m, status } : m)))

  const grouped = groupMessagesByDate(messages)

  /* ───────────── UI ───────────── */

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-64px)] overflow-hidden">

      {/* ── HEADER ── */}
      <div className="sticky top-0 z-10 bg-background border-b px-4 py-3 flex items-center gap-3 min-w-0">
        <button onClick={() => navigate("/messages")} className="shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="text-sm font-semibold truncate">Discussion entre Alex et Vous</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Navigation className="w-3 h-3 shrink-0" />
            <span className="truncate">{ride.from} → {ride.to}</span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="shrink-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2"><Phone className="w-4 h-4" /> Appeler le conducteur</DropdownMenuItem>
            <DropdownMenuItem className="gap-2"><Star className="w-4 h-4" /> Évaluer le conducteur</DropdownMenuItem>
            <DropdownMenuItem className="gap-2"><Share2 className="w-4 h-4" /> Partager le trajet</DropdownMenuItem>
            <DropdownMenuItem className="gap-2" onClick={() => setMuted((v) => !v)}>
              {muted
                ? <><Bell className="w-4 h-4" /> Activer les notifs</>
                : <><BellOff className="w-4 h-4" /> Désactiver les notifs</>}
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2"><Info className="w-4 h-4" /> Infos sur le trajet</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2"><Lock className="w-4 h-4" /> Clôturer la discussion</DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive"><Flag className="w-4 h-4" /> Signaler</DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive"><Trash2 className="w-4 h-4" /> Supprimer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ── SCROLLABLE BODY ── */}
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
        <div className="px-3 py-4 space-y-5">
          {grouped.map((group) => (
            <div key={group.date} className="space-y-2">
              <div className="flex justify-center">
                <span className="text-[11px] text-muted-foreground bg-muted px-3 py-0.5 rounded-full">
                  {group.date}
                </span>
              </div>
              {group.messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} onUpdatePrice={updatePrice} />
              ))}
            </div>
          ))}
          <div ref={endRef} />
        </div>

      </div>

      {/* ── INPUT BAR ── */}
      <div className="px-3 py-2.5 flex items-center gap-2 border-t bg-background shrink-0">

        {/* Prix */}
        <Popover open={priceOpen} onOpenChange={setPriceOpen}>
          <PopoverTrigger asChild>
            <Button size="icon" variant="outline" className="shrink-0" title="Proposer un prix">
              <DollarSign className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" side="top" sideOffset={8} className="w-64 p-4 space-y-3">
            <div>
              <p className="text-sm font-semibold">Proposer un prix</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                Entrez le montant souhaité par place. Le conducteur pourra accepter ou refuser.
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Montant (Ar / place)</label>
              <Input
                type="number"
                placeholder={`Affiché : ${ride.price.toLocaleString()} Ar`}
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
              />
            </div>
            <Button size="sm" className="w-full" onClick={sendPrice}>
              Envoyer la proposition
            </Button>
          </PopoverContent>
        </Popover>

        {/* Position en direct */}
        <Popover open={liveOpen} onOpenChange={setLiveOpen}>
          <PopoverTrigger asChild>
            <Button size="icon" variant="outline" className="shrink-0" title="Partager ma position en direct">
              <LocateFixed className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" side="top" sideOffset={8} className="w-64 p-4 space-y-3">
            <div>
              <p className="text-sm font-semibold">Position en direct</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                Votre position GPS sera visible par l'autre participant pendant la durée choisie.
                Pratique pour se retrouver au point de départ.
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Durée de partage</label>
              <div className="flex gap-2">
                {[15, 30, 60].map((min) => (
                  <button
                    key={min}
                    onClick={() => setLiveDuration(min)}
                    className={`flex-1 rounded-md border py-1.5 text-xs font-medium transition-colors
                      ${liveDuration === min
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-muted"
                      }`}
                  >
                    {min} min
                  </button>
                ))}
              </div>
            </div>
            <Button size="sm" className="w-full gap-1.5" onClick={sendLiveLocation}>
              <LocateFixed className="w-3.5 h-3.5" /> Partager ma position
            </Button>
          </PopoverContent>
        </Popover>

        {/* Pièce jointe */}
        <Popover open={attachOpen} onOpenChange={setAttachOpen}>
          <PopoverTrigger asChild>
            <Button size="icon" variant="outline" className="shrink-0" title="Envoyer une pièce jointe">
              <Paperclip className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" side="top" sideOffset={8} className="w-60 p-4 space-y-3">
            <div>
              <p className="text-sm font-semibold">Pièce jointe</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                Photo, preuve de paiement, document d'identité, etc.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button size="sm" variant="outline" className="w-full justify-start gap-2" onClick={() => fileInputRef.current?.click()}>
                <ImageIcon className="w-4 h-4" /> Photo ou image
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start gap-2" onClick={() => fileInputRef.current?.click()}>
                <FileText className="w-4 h-4" /> Document (PDF…)
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileChange}
        />

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Écrire un message..."
          className="flex-1 min-w-0"
        />

        <Button onClick={sendMessage} disabled={!input.trim()} className="shrink-0">
          <Send className="w-4 h-4" />
        </Button>
      </div>

    </div>
  )
}

/* ───────────────────────── BUBBLE ───────────────────────── */

function MessageBubble({ message, onUpdatePrice }: {
  message: Message
  onUpdatePrice: (id: number, status: "accepted" | "refused") => void
}) {
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
        {message.type === "text" && message.content}
        {message.type === "price" && <PriceMessage message={message} isMe={isMe} onUpdate={onUpdatePrice} />}
        {message.type === "photo" && <PhotoMessage message={message} isMe={isMe} />}
        {message.type === "live-location" && <LiveLocationMessage message={message} isMe={isMe} />}
      </div>
      <span className="text-[10px] text-muted-foreground mt-0.5 px-1">{message.time}</span>
    </div>
  )
}

/* ───────────────────────── SHARED CARD ───────────────────────── */

function Card({ isMe, children }: { isMe: boolean; children: React.ReactNode }) {
  return (
    <div className={`rounded-xl border p-3 space-y-2 text-sm ${isMe ? "bg-primary/10 border-primary/20" : "bg-muted border-border"}`}>
      {children}
    </div>
  )
}

function CardLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{label}</span>
    </div>
  )
}

/* ───────────────────────── PRICE CARD ───────────────────────── */

function PriceMessage({ message, isMe, onUpdate }: any) {
  const isPending = message.status === "pending"
  return (
    <Card isMe={isMe}>
      <CardLabel icon={DollarSign} label={isMe ? "Proposition envoyée" : "Proposition reçue"} />
      <p className="text-lg font-semibold leading-none">
        {message.price.toLocaleString()} Ar
        <span className="text-xs font-normal text-muted-foreground ml-1">/ place</span>
      </p>
      {isPending && !isMe && (
        <div className="flex gap-2 pt-0.5">
          <Button size="sm" className="flex-1 gap-1" onClick={() => onUpdate(message.id, "accepted")}>
            <CheckCircle2 className="w-3.5 h-3.5" /> Accepter
          </Button>
          <Button size="sm" variant="outline" className="flex-1 gap-1" onClick={() => onUpdate(message.id, "refused")}>
            <XCircle className="w-3.5 h-3.5" /> Refuser
          </Button>
        </div>
      )}
      {isPending && isMe && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <AlertCircle className="w-3.5 h-3.5" /><span>En attente de réponse</span>
        </div>
      )}
      {message.status === "accepted" && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-600">
          <CheckCircle2 className="w-3.5 h-3.5" /><span>Proposition acceptée</span>
        </div>
      )}
      {message.status === "refused" && (
        <div className="flex items-center gap-1.5 text-xs text-destructive">
          <XCircle className="w-3.5 h-3.5" /><span>Proposition refusée</span>
        </div>
      )}
    </Card>
  )
}

/* ───────────────────────── LIVE LOCATION CARD ───────────────────────── */

function LiveLocationMessage({ message, isMe }: any) {
  return (
    <Card isMe={isMe}>
      <CardLabel icon={LocateFixed} label={isMe ? "Position partagée" : "Position reçue"} />
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm">Position en direct</p>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Timer className="w-3 h-3" /> {message.duration} min
        </span>
      </div>
      <div className="rounded-lg bg-muted/60 border border-border h-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-1 text-muted-foreground/50">
          <LocateFixed className="w-5 h-5" />
          <span className="text-[10px]">Carte interactive</span>
        </div>
      </div>
    </Card>
  )
}

/* ───────────────────────── PHOTO CARD ───────────────────────── */

function PhotoMessage({ message, isMe }: any) {
  const isImage = message.fileType === "image"
  return (
    <Card isMe={isMe}>
      <CardLabel icon={isImage ? ImageIcon : FileText} label={isImage ? "Photo envoyée" : "Document envoyé"} />
      <p className="font-medium text-xs truncate">{message.fileName}</p>
    </Card>
  )
}