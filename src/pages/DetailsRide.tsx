"use client"

import { useState } from "react"

import {
  Car, Clock, Route, MapPin, Users, Info, Star,
  Calendar, CheckCircle2, XCircle, Send,
  FileText, Shield, Gift, TrendingUp, AlertCircle,
  Navigation, Fuel, Cloud, Sun, Wind, Droplets,
  Share2, Copy, QrCode, Check,
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
    detail: "Le conducteur a publié ce trajet et précisé les conditions de voyage. Les places ont été mises en ligne immédiatement.",
  },
  {
    label: "2 places réservées",
    time: "Hier · 09h45",
    status: "done" as const,
    Icon: Users,
    detail: "Deux passagers ont confirmé leur réservation et effectué le paiement. Les fonds sont sécurisés sur la plateforme.",
  },
  {
    label: "Proposition acceptée",
    time: "Hier soir · 20h11",
    status: "current" as const,
    Icon: CheckCircle2,
    detail: "Vous êtes ici. Le conducteur a validé la composition finale du groupe. Tout est prêt pour le départ.",
  },
  {
    label: "Départ prévu",
    time: "Lundi 28 avril · 07h30",
    status: "pending" as const,
    Icon: Clock,
    detail: "Le trajet démarrera à l'heure convenue. Un rappel vous sera envoyé 1h avant le départ.",
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

/* ───────── NOUVEAUX MOCK ───────── */

const WEATHER_POINTS = [
  { city: "Antananarivo", Icon: Sun,   temp: "19°C", wind: "12 km/h", humidity: "62%", condition: "Ensoleillé",   color: "text-yellow-500" },
  { city: "Ambatolampy",  Icon: Cloud, temp: "16°C", wind: "18 km/h", humidity: "71%", condition: "Nuageux",      color: "text-slate-400"  },
  { city: "Antsirabe",    Icon: Cloud, temp: "15°C", wind: "20 km/h", humidity: "75%", condition: "Couvert",      color: "text-slate-500"  },
]

const SHARE_LINK = "https://covoit.mg/trajet/tana-antsirabe-280425"

const ROUTE_WAYPOINTS = [
  { name: "Antananarivo", desc: "Point de départ — Place de l'Indépendance", time: "07:30", done: true },
  { name: "Ambatolampy",  desc: "Arrêt technique · ~45 min depuis Tana",     time: "08:15", done: false },
  { name: "Antsirabe",    desc: "Destination finale — Gare routière",         time: "10:00", done: false },
]

/* ───────── PAGE ───────── */

type Tab = "previsions" | "history" | "finance" | "messages" | "partage" | "documents" | "signalement"

const DOCS = [
  { Icon: FileText, label: "Confirmation de réservation", sub: "PDF · Généré le 27 avril", tag: "PDF" },
  { Icon: Gift,     label: "Reçu de paiement",            sub: "PDF · 2 × 15 000 Ar",    tag: "PDF" },
  { Icon: Shield,   label: "Attestation d'assurance",     sub: "Valable pour ce trajet",  tag: "PDF" },
]

const REPORT_REASONS = [
  "Le conducteur ne s'est pas présenté",
  "Véhicule différent de celui annoncé",
  "Comportement inapproprié",
  "Trajet annulé sans prévenir",
  "Autre problème",
]

export default function RideDetailPage() {
  const [tab, setTab] = useState<Tab>("previsions")
  const [reportReason, setReportReason] = useState<string | null>(null)
  const [reportSent, setReportSent] = useState(false)
  const [expandedEvent, setExpandedEvent] = useState<number | null>(2)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(SHARE_LINK)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
            Toutes les informations de ce trajet sont regroupées ici — horaire, itinéraire, conditions à bord et échanges avec le conducteur. Parcourez les onglets ci-dessous pour explorer chaque aspect avant de confirmer votre réservation.
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

        {/* Ligne 1 : tabs principaux */}
        <div className="flex border rounded-xl overflow-hidden text-xs">
          {(["previsions", "history", "finance", "messages"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("flex-1 py-2 font-medium transition-colors",
                tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted")}>
              {t === "previsions" ? "Prévisions" : t === "history" ? "Historique" : t === "finance" ? "Finances" : "Messages"}
            </button>
          ))}
        </div>

        {/* Ligne 2 : tabs secondaires */}
        <div className="flex border rounded-xl overflow-hidden text-xs">
          {(["partage", "documents", "signalement"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("flex-1 py-2 font-medium transition-colors",
                tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted")}>
              {t === "partage" ? "Partage" : t === "documents" ? "Documents" : "Signalement"}
            </button>
          ))}
        </div>

        <div className="px-1 pt-1">
          {tab === "previsions"  && <p className="text-[11px] text-muted-foreground leading-relaxed">La météo prévue sur les trois points du trajet et l'itinéraire détaillé étape par étape le long de la RN7.</p>}
          {tab === "history"     && <p className="text-[11px] text-muted-foreground leading-relaxed">Toutes les étapes franchies depuis la publication du trajet jusqu'à son statut actuel, avec les dates et heures précises.</p>}
          {tab === "finance"     && <p className="text-[11px] text-muted-foreground leading-relaxed">La ventilation complète des revenus générés par ce trajet : places vendues, frais de service déduits et gain potentiel restant.</p>}
          {tab === "messages"    && <p className="text-[11px] text-muted-foreground leading-relaxed">Les échanges avec chaque passager ayant manifesté de l'intérêt pour ce trajet, qu'ils aient réservé ou non.</p>}
          {tab === "partage"     && <p className="text-[11px] text-muted-foreground leading-relaxed">Partagez ce trajet par lien, QR code ou via vos applications de messagerie préférées.</p>}
          {tab === "documents"   && <p className="text-[11px] text-muted-foreground leading-relaxed">Téléchargez ou envoyez les justificatifs liés à ce trajet : confirmation, reçu de paiement et attestation d'assurance.</p>}
          {tab === "signalement" && <p className="text-[11px] text-muted-foreground leading-relaxed">Signalez un problème rencontré lors de ce trajet. Notre équipe examinera votre demande sous 48h ouvrées.</p>}
        </div>
      </div>

      {/* ── TAB: PRÉVISIONS ── */}
      {tab === "previsions" && (
        <Card>
          <CardContent className="p-4 space-y-5">

            <div>
              <SectionTitle>Météo du jour</SectionTitle>
              <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
                Conditions prévues ce lundi 28 avril le long de la RN7. Les températures baissent progressivement en altitude — prévoyez une veste légère à partir d'Ambatolampy.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {WEATHER_POINTS.map(({ city, Icon: WeatherIcon, temp, wind, humidity, condition, color }) => (
                  <Card key={city} className="border">
                    <CardContent className="p-3 flex flex-col items-center text-center gap-1.5">
                      <p className="text-[10px] font-semibold truncate w-full text-center">{city}</p>
                      <WeatherIcon className={cn("w-6 h-6", color)} />
                      <p className="text-sm font-bold">{temp}</p>
                      <p className={cn("text-[10px] font-medium", color)}>{condition}</p>
                      <div className="flex flex-col gap-0.5 w-full mt-1">
                        <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                          <Wind className="w-2.5 h-2.5" />{wind}
                        </div>
                        <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                          <Droplets className="w-2.5 h-2.5" />{humidity}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex items-start gap-2 mt-2 rounded-lg bg-muted/50 px-3 py-2">
                <Info className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-muted-foreground leading-snug">
                  Prévisions indicatives issues de données météo locales. Elles peuvent évoluer — vérifiez la veille du départ.
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <SectionTitle>Itinéraire étape par étape</SectionTitle>
              <p className="text-[11px] text-muted-foreground mb-4 leading-relaxed">
                Le trajet emprunte la RN7, route nationale principale reliant Antananarivo à Antsirabe. Entièrement goudronnée et praticable en toute saison, cette route traverse les hauts plateaux malgaches avec des paysages remarquables. L'arrêt à Ambatolampy dure environ 10 minutes.
              </p>
              <div className="flex flex-col">
                {ROUTE_WAYPOINTS.map(({ name, desc, time, done }, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center w-7 flex-shrink-0">
                      <div className={cn(
                        "w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0",
                        done ? "bg-emerald-500 border-emerald-500 text-white" : "bg-background border-border text-muted-foreground"
                      )}>
                        {i === 0 ? <Navigation className="w-3 h-3" /> : i === ROUTE_WAYPOINTS.length - 1 ? <MapPin className="w-3 h-3" /> : <Fuel className="w-3 h-3" />}
                      </div>
                      {i < ROUTE_WAYPOINTS.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
                    </div>
                    <div className={cn("pb-4", i === ROUTE_WAYPOINTS.length - 1 && "pb-0", "pt-1")}>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold">{name}</p>
                        <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">{time}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>
      )}

      {/* ── TAB: HISTORY — timeline avec icônes Lucide ── */}
      {tab === "history" && (
        <Card>
          <CardContent className="p-4">
            <SectionTitle>Historique du trajet</SectionTitle>
            <p className="text-[11px] text-muted-foreground mb-4 leading-relaxed">
              Suivez l'avancement de votre trajet en temps réel. Chaque étape est horodatée et archivée pour garantir la transparence entre conducteur et passagers.
            </p>

            <div className="flex flex-col mt-4">
              {EVENTS.map(({ label, time, status, Icon, detail }, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center w-7 flex-shrink-0">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 cursor-pointer",
                        status === "done"    && "bg-muted border-border text-muted-foreground",
                        status === "current" && "bg-emerald-500/10 border-emerald-500 text-emerald-500",
                        status === "pending" && "bg-transparent border-border text-muted-foreground opacity-50"
                      )}
                      onClick={() => setExpandedEvent(expandedEvent === i ? null : i)}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    {i < EVENTS.length - 1 && (
                      <div className="w-px flex-1 bg-border my-1" />
                    )}
                  </div>
                  <div className={cn("pb-4", i === EVENTS.length - 1 && "pb-0", "pt-1")}>
                    <p className={cn("text-xs font-medium", status === "pending" && "text-muted-foreground")}>
                      {label}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{time}</p>
                    {expandedEvent === i && (
                      <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed bg-muted/50 rounded-lg px-2 py-1.5">
                        {detail}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-lg bg-muted/50 px-3 py-2">
              <Info className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-snug">
                Cliquez sur une étape pour afficher les détails. L'historique complet est conservé pendant 30 jours après le trajet.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── TAB: FINANCE — lignes de facturation ── */}
      {tab === "finance" && (
        <Card>
          <CardContent className="p-4">
            <SectionTitle>Résumé financier</SectionTitle>
            <p className="text-[11px] text-muted-foreground mb-4 leading-relaxed">
              Ce tableau récapitule les flux financiers liés à ce trajet. Les fonds des passagers confirmés sont sécurisés sur un compte de séquestre et versés au conducteur 24h après le départ.
            </p>

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
                  <p className={cn("text-sm font-medium", muted && "text-muted-foreground text-xs")}>{amount}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-3 px-3 py-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <div>
                <p className="text-xs font-semibold">Total encaissé</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Hors place restante</p>
              </div>
              <p className="text-lg font-bold text-emerald-600">28 500 Ar</p>
            </div>

            <div className="flex items-center justify-between mt-2 px-3 py-3 rounded-xl bg-muted/60 border">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Si 3ème place réservée</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Gain supplémentaire potentiel</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-muted-foreground">+ 15 000 Ar</p>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-lg bg-muted/50 px-3 py-2">
              <Info className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-snug">
                Les frais de service (5%) couvrent l'assurance trajet, le support client et la maintenance de la plateforme. Ils sont déduits automatiquement avant versement.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── TAB: MESSAGES — calqué sur MessagesList ── */}
      {tab === "messages" && (
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Toutes les conversations liées à ce trajet sont regroupées ici. Vous pouvez échanger directement avec les passagers pour coordonner le point de rendez-vous ou toute information pratique.
            </p>
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

            <div className="mt-3 flex items-start gap-2 rounded-lg bg-muted/50 px-3 py-2">
              <Shield className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-snug">
                Vos messages sont chiffrés et uniquement visibles par les parties concernées. Ne partagez jamais vos coordonnées bancaires par messagerie.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── TAB: PARTAGE ── */}
      {tab === "partage" && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Partagez ce trajet avec vos proches pour qu'ils puissent suivre votre itinéraire ou réserver la dernière place disponible. Le lien pointe directement vers cette page.
            </p>

            <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2">
              <Share2 className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <p className="text-[11px] text-muted-foreground flex-1 truncate">{SHARE_LINK}</p>
              <button
                onClick={handleCopy}
                className={cn(
                  "flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg transition-colors flex-shrink-0",
                  copied
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    : "bg-background border hover:bg-muted text-muted-foreground"
                )}
              >
                {copied ? <><Check className="w-3 h-3" /> Copié</> : <><Copy className="w-3 h-3" /> Copier</>}
              </button>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-20 h-20 rounded-xl border bg-muted flex flex-col items-center justify-center gap-1 text-muted-foreground">
                <QrCode className="w-8 h-8" />
                <p className="text-[9px]">QR Code</p>
              </div>
              <div className="flex-1 space-y-1.5">
                <p className="text-xs font-medium">QR Code du trajet</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Scannez ou faites scanner ce code pour accéder directement à la page du trajet. Pratique pour partager en face à face sans saisir d'URL.
                </p>
                <button className="text-[11px] text-emerald-600 font-medium hover:underline">
                  Télécharger l'image →
                </button>
              </div>
            </div>

            <div>
              <p className="text-[11px] text-muted-foreground mb-2">Partage rapide via</p>
              <div className="flex gap-2 flex-wrap">
                {["WhatsApp", "Telegram", "SMS", "Email"].map((app) => (
                  <button key={app} className="text-[11px] font-medium px-3 py-1.5 rounded-full border bg-background hover:bg-muted transition-colors">
                    {app}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── TAB: DOCUMENTS ── */}
      {tab === "documents" && (
        <Card>
          <CardContent className="p-4">
            <SectionTitle>Documents du trajet</SectionTitle>
            <p className="text-[11px] text-muted-foreground mb-4 leading-relaxed">
              Ces documents sont générés automatiquement et liés à ce trajet spécifique. Ils sont disponibles en téléchargement pendant 90 jours après la date de départ. Vous pouvez également les envoyer directement par email.
            </p>

            <div className="flex flex-col divide-y divide-border">
              {DOCS.map(({ Icon: DocIcon, label, sub, tag }) => (
                <div key={label} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <DocIcon className="w-3.5 h-3.5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{tag}</span>
                    <button className="text-[11px] font-medium text-emerald-600 hover:underline">Télécharger</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-lg bg-muted/50 px-3 py-2">
              <Info className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-snug">
                Les documents sont générés au format PDF sécurisé. En cas de litige, la confirmation de réservation fait foi auprès des autorités compétentes.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── TAB: SIGNALEMENT ── */}
      {tab === "signalement" && (
        <Card>
          <CardContent className="p-4">
            <SectionTitle>Signaler un problème</SectionTitle>
            {reportSent ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-sm font-medium">Signalement envoyé</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed max-w-xs">
                  Notre équipe a bien reçu votre signalement et reviendra vers vous sous 48h ouvrées. Merci de contribuer à la sécurité de la communauté.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Si vous avez rencontré un problème lors de ce trajet, sélectionnez la raison ci-dessous. Votre signalement est traité de manière confidentielle par notre équipe de modération.
                </p>

                <div className="flex flex-col gap-2">
                  {REPORT_REASONS.map((reason) => (
                    <button
                      key={reason}
                      onClick={() => setReportReason(reason)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left text-xs transition-colors",
                        reportReason === reason
                          ? "border-rose-300 bg-rose-50 text-rose-700"
                          : "border-border bg-background hover:bg-muted text-foreground"
                      )}
                    >
                      <div className={cn(
                        "w-3.5 h-3.5 rounded-full border-[1.5px] flex-shrink-0",
                        reportReason === reason ? "border-rose-400 bg-rose-400" : "border-muted-foreground"
                      )} />
                      {reason}
                    </button>
                  ))}
                </div>

                <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-100 px-3 py-2">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[11px] text-amber-700 leading-snug">
                    Les signalements abusifs ou non fondés peuvent entraîner la suspension de votre compte. Merci d'utiliser cette fonctionnalité avec discernement.
                  </p>
                </div>

                <Button
                  className="w-full"
                  variant="destructive"
                  disabled={!reportReason}
                  onClick={() => setReportSent(true)}
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Envoyer le signalement
                </Button>
              </div>
            )}
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

      {/* AJOUT : note légale bas de page */}
      <p className="text-[10px] text-muted-foreground text-center leading-relaxed pb-2">
        En réservant, vous acceptez les conditions générales d'utilisation de la plateforme. Le conducteur est un particulier — ce service ne constitue pas un transport professionnel réglementé.
      </p>

    </div>
  )
}