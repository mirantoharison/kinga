"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {
  LineChart,
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
  PlusCircle,
  Percent,
  Package,
} from "lucide-react"


import { useState } from "react"
import { cn } from "@/lib/utils"
import { RideCard } from "@/components/ride/search/RideCard"
import { ReviewCard } from "@/components/review/ReviewCard"

const metricsConfig = {
  rides: {
    label: "Trajets",
    color: "#10b981",
    icon: Car,
  },
  bookings: {
    label: "Réservations",
    color: "#3b82f6",
    icon: Calendar,
  },
  revenue: {
    label: "Revenus",
    color: "#a855f7",
    icon: TrendingUp,
    type: "area",
  },
  occupancy: {
    label: "Remplissage",
    color: "#f59e0b",
    icon: Percent,
  },
  conversion: {
    label: "Conversion",
    color: "#ef4444",
    icon: Percent,
  },
  messages: {
    label: "Messages",
    color: "#06b6d4",
    icon: MessageCircle,
  },
  reviews: {
    label: "Avis",
    color: "#eab308",
    icon: Star,
  },
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null

  return (
    <div className="rounded-lg border bg-background p-3 shadow-md text-xs">
      <p className="font-medium mb-1">{label}</p>

      {payload.map((entry: any, i: number) => {
        const config = Object.values(metricsConfig).find(
          (m) => m.color === entry.color
        )

        if (!config) return null

        const Icon = config.icon

        return (
          <div key={i} className="flex items-center gap-2 mt-1">
            <Icon className="w-3.5 h-3.5" style={{ color: entry.color }} />
            <span className="text-muted-foreground">
              {config.label} :
            </span>
            <span className="font-medium">
              {entry.value}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function DashboardPage() {

  const data = [
    { day: "Lun", rides: 2, bookings: 1, revenue: 10000, occupancy: 40, conversion: 20, messages: 3, reviews: 1 },
    { day: "Mar", rides: 4, bookings: 2, revenue: 20000, occupancy: 50, conversion: 25, messages: 5, reviews: 1 },
    { day: "Mer", rides: 3, bookings: 3, revenue: 25000, occupancy: 70, conversion: 40, messages: 6, reviews: 2 },
    { day: "Jeu", rides: 5, bookings: 4, revenue: 40000, occupancy: 75, conversion: 45, messages: 8, reviews: 2 },
    { day: "Ven", rides: 6, bookings: 5, revenue: 50000, occupancy: 80, conversion: 50, messages: 10, reviews: 3 },
    { day: "Sam", rides: 8, bookings: 6, revenue: 65000, occupancy: 90, conversion: 60, messages: 12, reviews: 4 },
    { day: "Dim", rides: 7, bookings: 5, revenue: 55000, occupancy: 85, conversion: 55, messages: 9, reviews: 3 },
  ]

  const activities = [
    {
      id: 1,
      type: "ride",
      label: "Trajet publié",
      detail: "Tana → Majunga",
      date: "Il y a 2h",
    },
    {
      id: 2,
      type: "booking",
      label: "Réservation confirmée",
      detail: "2 passagers",
      date: "Il y a 3h",
    },
    {
      id: 3,
      type: "message",
      label: "Nouveau message",
      detail: "Discussion avec Jean",
      date: "Il y a 5h",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "ride":
        return <Car className="w-4 h-4 text-emerald-500" />
      case "booking":
        return <Package className="w-4 h-4 text-blue-500" />
      case "message":
        return <MessageCircle className="w-4 h-4 text-purple-500" />
      default:
        return null
    }
  }


  const [visible, setVisible] = useState({
    rides: true,
    bookings: true,
    revenue: true,
    occupancy: false,
    conversion: false,
    messages: false,
    reviews: false,
  })

  const toggleMetric = (key: keyof typeof visible) => {
    setVisible((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">

      {/* ───────────────── HEADER ───────────────── */}
      <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">

        {/* ICON */}
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <Car className="w-5 h-5 text-emerald-500" />
        </div>

        {/* CONTENT */}
        <div className="flex-1">

          <h1 className="text-lg font-semibold">
            Bonjour Alex 👋
          </h1>

          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Ce tableau de bord vous offre une vue globale et en temps réel de votre activité sur la plateforme.
            Vous pouvez y consulter vos trajets planifiés, suivre l’évolution de vos réservations
            et identifier rapidement les actions prioritaires à effectuer.
          </p>

          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Prenez quelques instants pour analyser vos performances récentes, vérifier vos disponibilités
            et optimiser votre organisation afin d’offrir la meilleure expérience possible à vos passagers.
            Une gestion proactive de vos trajets vous permet d’améliorer votre visibilité, votre taux de remplissage
            et votre réputation au sein de la communauté.
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-end gap-2">

          <Badge className="bg-emerald-50 text-emerald-600 border">
            3 trajets aujourd’hui
          </Badge>

          <Button size="sm" className="gap-2">
            <PlusCircle className="w-4 h-4" />
            Proposer un trajet
          </Button>

        </div>

      </div>

      {/* ───────────────── ALERTES ───────────────── */}
      <Card className="border border-amber-200 dark:border-amber-800 bg-amber-100 dark:bg-amber-900/30">
        <CardContent className="p-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>

            <div>
              <p className="text-sm font-medium text-foreground">
                2 actions requises aujourd’hui
              </p>
              <p className="text-xs text-muted-foreground">
                Réservations en attente de confirmation
              </p>
            </div>
          </div>

          <Button size="sm" variant="outline">
            Voir
          </Button>

        </CardContent>
      </Card>

      {/* ───────────────── KPI ───────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {/* TRAJETS */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Car className="w-5 h-5 text-emerald-500" />
              <Badge variant="secondary">+12%</Badge>
            </div>

            <p className="text-sm mt-2 text-muted-foreground">
              Trajets publiés
            </p>

            <p className="text-lg font-semibold">24</p>

            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Nombre total de trajets que vous avez proposés sur la période sélectionnée.
              Une activité régulière améliore votre visibilité auprès des passagers.
            </p>
          </CardContent>
        </Card>

        {/* RESERVATIONS */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Calendar className="w-5 h-5 text-blue-500" />
              <Badge variant="secondary">+8%</Badge>
            </div>

            <p className="text-sm mt-2 text-muted-foreground">
              Réservations
            </p>

            <p className="text-lg font-semibold">18</p>

            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Nombre de passagers ayant réservé vos trajets.
              Un bon taux de réservation reflète l’attractivité de vos offres.
            </p>
          </CardContent>
        </Card>

        {/* NOTE */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Star className="w-5 h-5 text-yellow-500" />
              <Badge variant="secondary">+0.2</Badge>
            </div>

            <p className="text-sm mt-2 text-muted-foreground">
              Note moyenne
            </p>

            <p className="text-lg font-semibold">4.8</p>

            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Évaluation globale laissée par vos passagers.
              Une note élevée renforce votre crédibilité et attire plus de réservations.
            </p>
          </CardContent>
        </Card>

        {/* REVENUS */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <Badge variant="secondary">+5%</Badge>
            </div>

            <p className="text-sm mt-2 text-muted-foreground">
              Revenus
            </p>

            <p className="text-lg font-semibold">120 000 Ar</p>

            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Montant total généré par vos trajets.
              Suivez l’évolution de vos gains pour ajuster vos prix et maximiser vos profits.
            </p>
          </CardContent>
        </Card>

      </div>

      {/* ───────────────── GRAPHIQUES ───────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Activité sur 7 jours</CardTitle>

          {/* TOGGLES */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {Object.entries(metricsConfig).map(([key, config]) => {
              const Icon = config.icon
              const active = visible[key as keyof typeof visible]

              return (
                <Button
                  key={key}
                  size="sm"
                  variant={active ? "default" : "outline"}
                  onClick={() => toggleMetric(key as any)}
                  className="gap-1.5 text-xs"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {config.label}
                </Button>
              )
            })}
          </div>
        </CardHeader>

        <CardContent>

          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Ce graphique illustre l’évolution de votre activité sur les derniers jours en combinant plusieurs indicateurs clés tels que les trajets publiés, les réservations et les revenus générés.
            Il vous permet d’identifier rapidement les périodes les plus performantes, d’analyser les variations de votre activité et d’ajuster votre stratégie en fonction de la demande.
          </p>

          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>

                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />

                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />

                {/* TOOLTIP CUSTOM */}
                <Tooltip content={<CustomTooltip />} />

                {/* AREA (revenue) */}
                {visible.revenue && (
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke={metricsConfig.revenue.color}
                    fill={metricsConfig.revenue.color}
                    fillOpacity={0.1}
                  />
                )}

                {/* LINES */}
                {visible.rides && (
                  <Line
                    type="monotone"
                    dataKey="rides"
                    stroke={metricsConfig.rides.color}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                )}

                {visible.bookings && (
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke={metricsConfig.bookings.color}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                )}

                {visible.occupancy && (
                  <Line
                    type="monotone"
                    dataKey="occupancy"
                    stroke={metricsConfig.occupancy.color}
                    strokeWidth={2}
                  />
                )}

                {visible.conversion && (
                  <Line
                    type="monotone"
                    dataKey="conversion"
                    stroke={metricsConfig.conversion.color}
                    strokeWidth={2}
                  />
                )}

                {visible.messages && (
                  <Line
                    type="monotone"
                    dataKey="messages"
                    stroke={metricsConfig.messages.color}
                    strokeWidth={2}
                  />
                )}

                {visible.reviews && (
                  <Line
                    type="monotone"
                    dataKey="reviews"
                    stroke={metricsConfig.reviews.color}
                    strokeWidth={2}
                  />
                )}

              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ───────────────── RESERVATIONS DU JOUR ───────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Réservations aujourd’hui</CardTitle>

          <p className="text-xs text-muted-foreground">
            Retrouvez ici les réservations prévues pour aujourd’hui.
            Vous pouvez consulter les détails de chaque trajet, confirmer les demandes
            en attente et gérer vos interactions avec les passagers.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">

          <RideCard
            mode="dashboard"
            ride={{
              from: "Antananarivo",
              to: "Tamatave",
              time: "14:30",
              date: "Aujourd’hui",
              distance: 350,
              duration: "5h",
              price: 15000,
              seats: 2,
              driver: "Alex",
              rating: 4.8,
              reviews: 32,
            }}
          />

          <RideCard
            mode="dashboard"
            ride={{
              from: "Antsirabe",
              to: "Fianarantsoa",
              time: "16:00",
              date: "Aujourd’hui",
              distance: 250,
              duration: "4h",
              price: 12000,
              seats: 1,
              driver: "Alex",
              rating: 4.7,
              reviews: 18,
            }}
          />

        </CardContent>
      </Card>

      {/* ───────────────── AVIS RECENTS ───────────────── */}
      <Card>
        <CardHeader className="space-y-3">

          <div className="flex items-center justify-between">
            <CardTitle>Avis récents</CardTitle>

            {/* Résumé global */}
            <div className="text-right">
              <p className="text-sm font-semibold">4.8 ⭐</p>
              <p className="text-xs text-muted-foreground">124 avis</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Consultez les retours récents laissés par vos passagers.
            Ces avis influencent directement votre réputation, votre taux de réservation
            et la confiance des futurs voyageurs.
          </p>

        </CardHeader>

        <CardContent className="space-y-4">

          <ReviewCard
            name="Jean"
            rating={5}
            comment="Très bon trajet, conducteur ponctuel et agréable."
            date="Il y a 2 jours"
            trip="Antananarivo → Tamatave"
            rideId="ride_123"
            likes={4}
            dislikes={0}
            replies={2}
          />

          <Separator />

          <ReviewCard
            name="Marie"
            rating={4}
            comment="Trajet confortable, bonne conduite et communication fluide."
            date="Il y a 5 jours"
            trip="Antsirabe → Fianarantsoa"
            rideId="ride_456"
            likes={2}
            dislikes={0}
            replies={1}
          />

          {/* ACTION FOOTER */}
          <div className="pt-2 flex gap-2">

            <Button variant="outline" size="sm" className="flex-1 text-xs">
              Voir tous les avis
            </Button>

            <Button size="sm" className="flex-1 text-xs">
              Gérer les avis
            </Button>

          </div>

        </CardContent>
      </Card>

      {/* ───────────────── ACTIVITE RECENTE ───────────────── */}
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle>Activité récente</CardTitle>

          <p className="text-xs text-muted-foreground">
            Suivez les dernières actions liées à votre activité : trajets publiés,
            réservations, messages et interactions récentes.
          </p>
        </CardHeader>

        <CardContent>

          <div className="rounded-xl border overflow-hidden">

            <table className="w-full text-sm">

              <thead className="bg-muted/40 text-xs text-muted-foreground">
                <tr>
                  <th className="text-left px-3 py-2">Type</th>
                  <th className="text-left px-3 py-2">Détail</th>
                  <th className="text-right px-3 py-2">Date</th>
                </tr>
              </thead>

              <tbody>
                {activities.slice(0, 10).map((activity) => (
                  <tr
                    key={activity.id}
                    className="border-t hover:bg-muted/40 transition"
                  >

                    {/* TYPE */}
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        {getIcon(activity.type)}
                        <span className="text-xs font-medium">
                          {activity.label}
                        </span>
                      </div>
                    </td>

                    {/* DETAIL */}
                    <td className="px-3 py-2 text-muted-foreground text-xs">
                      {activity.detail}
                    </td>

                    {/* DATE */}
                    <td className="px-3 py-2 text-right text-xs text-muted-foreground">
                      {activity.date}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </CardContent>
      </Card>

    </div>
  )
}