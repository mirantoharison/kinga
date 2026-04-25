"use client"

import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts"

import {
  Car,
  Calendar,
  Star,
  TrendingUp,
  AlertTriangle,
  MessageCircle,
  Percent,
  Package,
  BarChart2,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Bell,
  ChevronRight,
} from "lucide-react"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RideCard } from "@/components/ride/search/RideCard"
import { ReviewCard } from "@/components/review/ReviewCard"
import { NotificationCard } from "@/components/notification/NotificationsCard"

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const metricsConfig = {
  rides: { label: "Trajets", color: "#10b981", icon: Car },
  bookings: { label: "Réservations", color: "#3b82f6", icon: Calendar },
  revenue: { label: "Revenus", color: "#a855f7", icon: TrendingUp },
  occupancy: { label: "Remplissage", color: "#f59e0b", icon: Percent },
  conversion: { label: "Conversion", color: "#ef4444", icon: Percent },
  messages: { label: "Messages", color: "#06b6d4", icon: MessageCircle },
  reviews: { label: "Avis", color: "#eab308", icon: Star },
}

function buildChartData() {
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
  const values = [
    { rides: 2, bookings: 1, revenue: 10000, occupancy: 40, conversion: 20, messages: 3, reviews: 1 },
    { rides: 4, bookings: 2, revenue: 20000, occupancy: 50, conversion: 25, messages: 5, reviews: 1 },
    { rides: 3, bookings: 3, revenue: 25000, occupancy: 70, conversion: 40, messages: 6, reviews: 2 },
    { rides: 5, bookings: 4, revenue: 40000, occupancy: 75, conversion: 45, messages: 8, reviews: 2 },
    { rides: 6, bookings: 5, revenue: 50000, occupancy: 80, conversion: 50, messages: 10, reviews: 3 },
    { rides: 8, bookings: 6, revenue: 65000, occupancy: 90, conversion: 60, messages: 12, reviews: 4 },
    { rides: 7, bookings: 5, revenue: 55000, occupancy: 85, conversion: 55, messages: 9, reviews: 3 },
  ]
  const today = new Date()
  const dayOfWeek = today.getDay()
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  const monday = new Date(today)
  monday.setDate(today.getDate() + diffToMonday)
  return days.map((day, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    const dd = String(d.getDate()).padStart(2, "0")
    const mm = String(d.getMonth() + 1).padStart(2, "0")
    return { day, date: `${dd}/${mm}`, label: `${day}\n${dd}/${mm}`, ...values[i] }
  })
}

const chartData = buildChartData()

type TrendDir = "up" | "down" | "neutral"

interface KPI {
  label: string
  value: string
  trend: string
  trendDir: TrendDir
  icon: React.ElementType
  color: string
  bg: string
  description: string
}

const kpis: KPI[] = [
  {
    label: "Trajets publiés",
    value: "24",
    trend: "+12%",
    trendDir: "up" as const,
    icon: Car,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    description: "7 derniers jours",
  },
  {
    label: "Réservations",
    value: "18",
    trend: "+8%",
    trendDir: "up" as const,
    icon: Calendar,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    description: "passagers confirmés",
  },
  {
    label: "Note moyenne",
    value: "4.8",
    trend: "+0.2",
    trendDir: "up" as const,
    icon: Star,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    description: "sur 124 avis",
  },
  {
    label: "Revenus",
    value: "120 000 Ar",
    trend: "+5%",
    trendDir: "up" as const,
    icon: TrendingUp,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    description: "cette semaine",
  },
]

const mockNotifications = [
  {
    id: "1",
    type: "ride" as const,
    title: "Trajet publié",
    description: "Votre trajet Tana → Majunga a été publié avec succès.",
    date: "Il y a 2h",
    read: false,
  },
  {
    id: "2",
    type: "message" as const,
    title: "Nouveau message",
    description: "Jean vous a envoyé un message concernant le trajet du 27 avril.",
    date: "Il y a 3h",
    read: false,
  },
  {
    id: "3",
    type: "payment" as const,
    title: "Paiement reçu",
    description: "Vous avez reçu 15 000 Ar pour le trajet Antsirabe → Fianarantsoa.",
    date: "Il y a 5h",
    read: true,
  },
]

const mockReviews = [
  {
    id: 1,
    author: "Jean",
    role: "Passager" as const,
    rating: 5,
    comment: "Très bon trajet, conducteur ponctuel et agréable. Je recommande vivement !",
    date: "Il y a 2 jours",
    from: "Antananarivo",
    to: "Tamatave",
    replies: [],
  },
  {
    id: 2,
    author: "Marie",
    role: "Passager" as const,
    rating: 4,
    comment: "Trajet confortable, bonne conduite et communication fluide.",
    date: "Il y a 5 jours",
    from: "Antsirabe",
    to: "Fianarantsoa",
    replies: ["Merci Marie !"],
  },
]

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null
  return (
    <div className="rounded-lg border bg-background p-3 shadow-md text-xs">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((entry: any, i: number) => {
        const config = Object.values(metricsConfig).find((m) => m.color === entry.color)
        if (!config) return null
        const Icon = config.icon
        return (
          <div key={i} className="flex items-center gap-2 mt-1">
            <Icon className="w-3.5 h-3.5" style={{ color: entry.color }} />
            <span className="text-muted-foreground">{config.label} :</span>
            <span className="font-medium">{entry.value}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────
   SECTION WRAPPER
   Carte avec header fixe + contenu scrollable
───────────────────────────────────────────── */

interface SectionCardProps {
  title: string
  icon: React.ElementType
  headerRight?: React.ReactNode
  children: React.ReactNode
  className?: string
}

function SectionCard({ title, icon: Icon, headerRight, children, className }: SectionCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card flex flex-col overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center">
            <Icon className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        {headerRight}
      </div>
      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {children}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function DashboardPage() {
  /* Metric visibility toggles */
  const [visible, setVisible] = useState({
    rides: true, bookings: true, revenue: true,
    occupancy: false, conversion: false, messages: false, reviews: false,
  })

  const toggleMetric = useCallback((key: keyof typeof visible) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  /* Notifications local state */
  const [notifications, setNotifications] = useState(mockNotifications)
  const [notifSelected, setNotifSelected] = useState<string[]>([])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const handleToggleSelect = (id: string) => {
    setNotifSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  /* Toast placeholder */
  const handleToast = (msg: string) => console.log("[toast]", msg)

  return (
    <div className="p-6 space-y-5 max-w-4xl mx-auto">

      {/* ══════════════════════════════════════
          ZONE 1 — HEADER (inchangé)
      ══════════════════════════════════════ */}
      <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <Car className="w-5 h-5 text-emerald-500" />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Bonjour Alex 👋</h1>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Ce tableau de bord vous offre une vue globale et en temps réel de votre activité sur la plateforme.
            Vous pouvez y consulter vos trajets planifiés, suivre l'évolution de vos réservations
            et identifier rapidement les actions prioritaires à effectuer.
          </p>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Prenez quelques instants pour analyser vos performances récentes, vérifier vos disponibilités
            et optimiser votre organisation afin d'offrir la meilleure expérience possible à vos passagers.
            Une gestion proactive de vos trajets vous permet d'améliorer votre visibilité, votre taux de remplissage
            et votre réputation au sein de la communauté.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          ZONE 2 — ALERTE + KPIs
      ══════════════════════════════════════ */}

      {/* Alerte collée, juste au-dessus des KPIs */}
      <div className="flex items-center gap-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 px-4 py-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground">2 actions requises aujourd'hui</p>
          <p className="text-xs text-muted-foreground">Réservations en attente de confirmation</p>
        </div>
        <Button size="sm" variant="outline" className="shrink-0 text-xs h-7">
          Voir
        </Button>
      </div>

      {/* KPIs — grille 4 colonnes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          const isUp = kpi.trendDir === "up"
          const isDown = kpi.trendDir === "down"
          return (
            <div
              key={kpi.label}
              className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", kpi.bg)}>
                  <Icon className={cn("w-4 h-4", kpi.color)} />
                </div>
                <span className={cn(
                  "flex items-center gap-0.5 text-[11px] font-medium rounded-full px-2 py-0.5",
                  isUp && "text-emerald-600 bg-emerald-500/10",
                  isDown && "text-red-500 bg-red-500/10",
                  !isUp && !isDown && "text-muted-foreground bg-muted",
                )}>
                  {isUp && <ArrowUpRight className="w-3 h-3" />}
                  {isDown && <ArrowDownRight className="w-3 h-3" />}
                  {!isUp && !isDown && <Minus className="w-3 h-3" />}
                  {kpi.trend}
                </span>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground tracking-tight leading-none">
                  {kpi.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">{kpi.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* ══════════════════════════════════════
          ZONE 3 — GRAPHIQUE (toujours visible)
      ══════════════════════════════════════ */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center">
              <BarChart2 className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium">Activité — 7 derniers jours</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground hidden sm:block">Semaine · Mois</span>
            <Button size="sm" variant="outline" className="h-7 text-xs">
              Exporter
            </Button>
          </div>
        </div>

        {/* Metric toggles */}
        <div className="flex gap-2 flex-wrap px-4 py-3 border-b border-border">
          {Object.entries(metricsConfig).map(([key, config]) => {
            const Icon = config.icon
            const active = visible[key as keyof typeof visible]
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleMetric(key as keyof typeof visible)}
                className={cn(
                  "flex items-center gap-1.5 text-[11px] font-medium rounded-full px-2.5 py-1 border transition-all",
                  active
                    ? "border-transparent text-white"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                )}
                style={active ? { backgroundColor: config.color } : {}}
              >
                <Icon className="w-3 h-3" />
                {config.label}
              </button>
            )
          })}
        </div>

        {/* Texte d'introduction */}
        <div className="px-4 pt-4 pb-0">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Ce graphique retrace l'évolution de votre activité sur les sept derniers jours calendaires.
            Chaque courbe représente un indicateur clé de votre performance en tant que conducteur sur la plateforme :
            le nombre de trajets publiés, les réservations confirmées, les revenus générés, le taux de remplissage moyen
            de vos véhicules, le taux de conversion de vos annonces, le volume de messages reçus ainsi que le nombre
            d'avis déposés par vos passagers.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed mt-2">
            Utilisez les filtres ci-dessus pour afficher ou masquer les indicateurs selon ce que vous souhaitez analyser.
            Vous pouvez par exemple vous concentrer uniquement sur vos revenus et votre taux de remplissage pour évaluer
            la rentabilité de vos trajets, ou croiser vos réservations avec vos avis pour identifier les journées
            où la satisfaction passager a été la plus élevée. Cette lecture croisée est particulièrement utile pour
            anticiper les périodes de forte demande et ajuster vos disponibilités en conséquence.
          </p>
        </div>

        {/* Chart */}
        <div className="px-4 pb-2 pt-3 h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
              <XAxis dataKey="day" height={38} tick={(props: any) => { const entry = chartData[props.index]; return (<g transform={`translate(${props.x},${props.y})`}><text x={0} y={0} dy={12} textAnchor="middle" fontSize={11} fill="#888">{props.payload.value}</text><text x={0} y={0} dy={24} textAnchor="middle" fontSize={9} fill="#aaa">{entry?.date}</text></g>); }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              {visible.revenue && (
                <Area type="monotone" dataKey="revenue"
                  stroke={metricsConfig.revenue.color}
                  fill={metricsConfig.revenue.color} fillOpacity={0.08} />
              )}
              {visible.rides && (
                <Line type="monotone" dataKey="rides"
                  stroke={metricsConfig.rides.color} strokeWidth={2} dot={{ r: 3 }} />
              )}
              {visible.bookings && (
                <Line type="monotone" dataKey="bookings"
                  stroke={metricsConfig.bookings.color} strokeWidth={2} dot={{ r: 3 }} />
              )}
              {visible.occupancy && (
                <Line type="monotone" dataKey="occupancy"
                  stroke={metricsConfig.occupancy.color} strokeWidth={2} />
              )}
              {visible.conversion && (
                <Line type="monotone" dataKey="conversion"
                  stroke={metricsConfig.conversion.color} strokeWidth={2} />
              )}
              {visible.messages && (
                <Line type="monotone" dataKey="messages"
                  stroke={metricsConfig.messages.color} strokeWidth={2} />
              )}
              {visible.reviews && (
                <Line type="monotone" dataKey="reviews"
                  stroke={metricsConfig.reviews.color} strokeWidth={2} />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ══════════════════════════════════════
          ZONE 4 — DEUX COLONNES : Réservations + Avis
      ══════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* ── Réservations ── */}
        <SectionCard
          title="Réservations aujourd'hui"
          icon={Calendar}
          headerRight={
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px]">2</Badge>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground gap-1">
                Voir tout <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          }
        >
          <RideCard
            mode="dashboard"
            ride={{
              from: "Antananarivo", to: "Tamatave",
              time: "14:30", date: "Aujourd'hui",
              distance: 350, duration: "5h",
              price: 15000, seats: 2,
              driver: "Alex", rating: 4.8, reviews: 32,
            }}
          />
          <RideCard
            mode="dashboard"
            ride={{
              from: "Antsirabe", to: "Fianarantsoa",
              time: "16:00", date: "Aujourd'hui",
              distance: 250, duration: "4h",
              price: 12000, seats: 1,
              driver: "Alex", rating: 4.7, reviews: 18,
            }}
          />
        </SectionCard>

        {/* ── Avis récents ── */}
        <SectionCard
          title="Avis récents"
          icon={Star}
          headerRight={
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold">4.8</span>
                <span className="text-xs text-muted-foreground">· 124</span>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground gap-1">
                Voir tout <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          }
        >
          {mockReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onToast={handleToast}
            />
          ))}
        </SectionCard>
      </div>

      {/* ══════════════════════════════════════
          ZONE 5 — NOTIFICATIONS RÉCENTES (pleine largeur)
      ══════════════════════════════════════ */}
      <SectionCard
        title="Notifications récentes"
        icon={Bell}
        headerRight={
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-[10px]">
                {unreadCount} non lues
              </Badge>
            )}
            <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground gap-1">
              Voir tout <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        }
      >
        {/* Texte explicatif */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Cette section regroupe l'ensemble des notifications liées à votre activité sur la plateforme.
            Vous y retrouvez en temps réel les confirmations de trajets publiés, les messages reçus de vos
            passagers, les paiements effectués ainsi que toute information importante émise par la plateforme
            à votre intention. Chaque notification est horodatée et classée du plus récent au plus ancien
            afin de vous permettre de traiter en priorité les éléments les plus urgents.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Les notifications non lues sont mises en évidence par un fond légèrement coloré et un indicateur
            visuel vert. Cliquez sur une notification pour la marquer comme lue, ou utilisez le bouton
            dédié pour la traiter directement depuis cette vue. Si vous gérez plusieurs trajets simultanément,
            pensez à consulter cette section régulièrement afin de ne manquer aucune demande ou mise à jour
            importante de la part de vos passagers.
          </p>
        </div>

        {/* Liste */}
        <div className="flex flex-col gap-2">
          {notifications.map((notif) => (
            <NotificationCard
              key={notif.id}
              notification={notif}
              selected={notifSelected.includes(notif.id)}
              multiSelect={notifSelected.length > 0}
              onToggleSelect={() => handleToggleSelect(notif.id)}
              onMarkRead={() => handleMarkRead(notif.id)}
            />
          ))}
        </div>
      </SectionCard>

    </div>
  )
}