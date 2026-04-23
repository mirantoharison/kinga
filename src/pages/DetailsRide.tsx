"use client"

import { useState } from "react"

import {
  Car, Clock, Route, MapPin, Users, Info, Star,
  Calendar, CheckCircle2, XCircle, Send,
  FileText, Shield, Gift,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

/* ───────── MOCK ───────── */

const RIDE = {
  from: "Antananarivo",
  to: "Antsirabe",
  time: "07:30",
  date: "Lundi 28 avril",
  distance: 170,
  duration: "2h30",
  price: 15000,
  seats: 3,
  driver: "Hery Rakoto",
  rating: 4.8,
  reviews: 62,
  vehicle: "Toyota Corolla 2020",
  stops: ["Ambatolampy"],
  description: "Départ ponctuel garanti. Musique douce à bord. Pas de fumée.",
}

const EVENTS = [
  {
    label: "Trajet publié",
    time: "Il y a 3 jours · 14h22",
    status: "done" as const,
    Icon: FileText,
  },
  {
    label: "2 places réservées",
    time: "Hier · 09h45",
    status: "done" as const,
    Icon: Users,
  },
  {
    label: "Proposition acceptée",
    time: "Hier soir · 20h11",
    status: "current" as const,
    Icon: CheckCircle2,
  },
  {
    label: "Départ prévu",
    time: "Lundi 28 avril · 07h30",
    status: "pending" as const,
    Icon: Clock,
  },
]

const BILL_LINES = [
  {
    Icon: Gift,
    label: "Prix par place",
    sub: "Tarif fixé par le conducteur",
    amount: "15 000 Ar",
    muted: false,
  },
  {
    Icon: Users,
    label: "Places réservées",
    sub: "2 passagers confirmés",
    amount: "× 2",
    muted: false,
  },
  {
    Icon: Shield,
    label: "Frais de service",
    sub: "Commission plateforme",
    amount: "− 1 500 Ar",
    muted: true,
  },
  {
    Icon: Clock,
    label: "Place non réservée",
    sub: "1 place encore disponible",
    amount: "15 000 Ar",
    muted: true,
  },
]

const CONVERSATIONS = [
  { id: 1, name: "Tiana Raharisoa",  preview: "Oui 3 places dispo pour lundi",          time: "08:17", unread: 2 },
  { id: 2, name: "Fanja Andriantsoa", preview: "Merci ! Je confirme ma place 🙏",        time: "Hier",  unread: 0 },
  { id: 3, name: "Ravo Rabeson",      preview: "Vous faites un arrêt à Ambatolampy ?",   time: "Lun",   unread: 1 },
  { id: 4, name: "Lalaina Rasoa",     preview: "D'accord c'est noté, à lundi alors !",   time: "Dim",   unread: 0 },
]

/* ───────── PAGE ───────── */

type Tab = "details" | "history" | "finance" | "messages"

export default function RideDetailPage() {
  const [tab, setTab] = useState<Tab>("details")

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[11px] uppercase text-muted-foreground font-medium tracking-wide mb-2">
      {children}
    </p>
  )

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* ── HEADER — calqué sur ListRideHeader ── */}
      <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
          <Car className="w-5 h-5 text-emerald-500" />
        </div>

        <div className="flex-1">
          <h1 className="text-lg font-semibold">Détails du trajet</h1>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Consultez toutes les informations relatives à ce trajet avant de prendre une décision.
            Vérifiez le profil du conducteur, l'horaire, la distance et les conditions proposées.
          </p>
        </div>

        <Badge className="bg-emerald-50 text-emerald-600 border whitespace-nowrap">
          {RIDE.seats} places
        </Badge>
      </div>

      {/* ── RIDE CARD — calqué sur RideCard ── */}
      <Card className="transition border hover:shadow-md">
        <CardContent className="p-4 space-y-4">

          {/* Icônes méta */}
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <Car className="w-4 h-4 text-emerald-500" />
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{RIDE.duration}</span>
            <span className="flex items-center gap-1"><Route className="w-3 h-3" />{RIDE.distance} km</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{RIDE.date}</span>
          </div>

          {/* Ligne de trajet */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <div className="flex-1 border-t border-dashed border-muted-foreground/40" />
            <MapPin className="w-4 h-4 text-red-500" />
          </div>

          <div className="flex justify-between text-xs font-medium">
            <span className="truncate max-w-[45%]">{RIDE.from}</span>
            <span className="truncate max-w-[45%] text-right">{RIDE.to}</span>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Départ à {RIDE.time}</span>
            <span className="flex items-center gap-1"><Info className="w-3 h-3" />Arrêt : {RIDE.stops[0]}</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{RIDE.seats} voyageurs</span>
          </div>

          <Separator />

          {/* Driver + price */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={`https://i.pravatar.cc/100?u=${RIDE.driver}`}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{RIDE.driver}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 text-yellow-500" />
                  {RIDE.rating}
                  <span>· {RIDE.reviews} avis · {RIDE.vehicle}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{RIDE.price.toLocaleString()} Ar</p>
              <p className="text-xs text-muted-foreground">/ voyageur</p>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* ── TABS ── */}
      <div className="space-y-2">
        <SectionTitle>Informations</SectionTitle>
        <div className="flex border rounded-xl overflow-hidden text-xs">
          {(["details", "history", "finance", "messages"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 py-2 font-medium transition-colors",
                tab === t
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {t === "details" ? "Détails" : t === "history" ? "Historique" : t === "finance" ? "Finances" : "Messages"}
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB: DETAILS ── */}
      {tab === "details" && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <SectionTitle>Description</SectionTitle>
              <p className="text-xs text-muted-foreground leading-relaxed">{RIDE.description}</p>
            </div>
            <Separator />
            <div>
              <SectionTitle>Règles</SectionTitle>
              {[
                { ok: true,  label: "Bagages acceptés" },
                { ok: false, label: "Animaux refusés" },
                { ok: false, label: "Fumée interdite" },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-2 text-xs mt-2">
                  {r.ok
                    ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    : <XCircle    className="w-3.5 h-3.5 text-rose-400  flex-shrink-0" />}
                  {r.label}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── TAB: HISTORY — timeline avec icônes Lucide ── */}
      {tab === "history" && (
        <Card>
          <CardContent className="p-4">
            <SectionTitle>Historique du trajet</SectionTitle>

            <div className="flex flex-col mt-4">
              {EVENTS.map(({ label, time, status, Icon }, i) => (
                <div key={i} className="flex gap-3">
                  {/* Spine */}
                  <div className="flex flex-col items-center w-7 flex-shrink-0">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0",
                        status === "done"    && "bg-muted border-border text-muted-foreground",
                        status === "current" && "bg-emerald-500/10 border-emerald-500 text-emerald-500",
                        status === "pending" && "bg-transparent border-border text-muted-foreground opacity-50"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    {i < EVENTS.length - 1 && (
                      <div className="w-px flex-1 bg-border my-1" />
                    )}
                  </div>
                  {/* Content */}
                  <div className={cn("pb-4", i === EVENTS.length - 1 && "pb-0", "pt-1")}>
                    <p className={cn(
                      "text-xs font-medium",
                      status === "pending" && "text-muted-foreground"
                    )}>
                      {label}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── TAB: FINANCE — lignes de facturation ── */}
      {tab === "finance" && (
        <Card>
          <CardContent className="p-4">
            <SectionTitle>Résumé financier</SectionTitle>

            <div className="flex flex-col divide-y divide-border mt-2">
              {BILL_LINES.map(({ Icon, label, sub, amount, muted }) => (
                <div key={label} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon className={cn("w-3.5 h-3.5", muted ? "text-muted-foreground" : "text-foreground")} />
                    </div>
                    <div>
                      <p className={cn("text-xs font-medium", muted && "text-muted-foreground")}>{label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
                    </div>
                  </div>
                  <p className={cn("text-sm font-medium", muted && "text-muted-foreground text-xs")}>
                    {amount}
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mt-3 px-3 py-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <div>
                <p className="text-xs font-semibold">Total encaissé</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Hors place restante</p>
              </div>
              <p className="text-lg font-bold text-emerald-600">28 500 Ar</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── TAB: MESSAGES — calqué sur MessagesList ── */}
      {tab === "messages" && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground">
                {CONVERSATIONS.length} conversations affichées
              </p>
              <p className="text-[11px] text-muted-foreground">Cliquez pour ouvrir</p>
            </div>

            <div className="flex flex-col gap-1">
              {CONVERSATIONS.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 px-2 py-2.5 rounded-xl cursor-pointer hover:bg-muted/60 border border-transparent hover:border-border transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-muted border flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">{c.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate mt-0.5">{c.preview}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <p className="text-[10px] text-muted-foreground">{c.time}</p>
                    {c.unread > 0 && (
                      <span className="bg-emerald-600 text-white text-[10px] font-bold rounded-full px-1.5 min-w-[18px] text-center">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── ACTIONS ── */}
      <div className="flex gap-3">
        <Button className="flex-1">
          <CheckCircle2 className="w-4 h-4 mr-1" />
          Réserver
        </Button>
        <Button variant="outline" className="flex-1">
          <Send className="w-4 h-4 mr-1" />
          Contacter
        </Button>
      </div>

    </div>
  )
}