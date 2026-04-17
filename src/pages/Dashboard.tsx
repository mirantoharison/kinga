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
  Car,
  Calendar,
  Star,
  TrendingUp,
  AlertTriangle,
  MessageCircle,
  PlusCircle,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">

      {/* ───────────────── HEADER ───────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            Bonjour Alex 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Voici un aperçu de votre activité aujourd’hui
          </p>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="gap-2">
            <PlusCircle className="w-4 h-4" />
            Proposer un trajet
          </Button>
        </div>
      </div>

      {/* ───────────────── ALERTES ───────────────── */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <div>
              <p className="text-sm font-medium">
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
          </CardContent>
        </Card>

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
          </CardContent>
        </Card>

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
          </CardContent>
        </Card>

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
          </CardContent>
        </Card>

      </div>

      {/* ───────────────── GRAPHIQUES ───────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
            {/* 👉 Remplace ici par Recharts */}
            Graphique à intégrer (trajets / réservations)
          </div>
        </CardContent>
      </Card>

      {/* ───────────────── RESERVATIONS DU JOUR ───────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Réservations aujourd’hui</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">

          <div className="flex items-center justify-between border rounded-lg p-3">
            <div>
              <p className="text-sm font-medium">
                Antananarivo → Tamatave
              </p>
              <p className="text-xs text-muted-foreground">
                14:30 • 2 passagers
              </p>
            </div>

            <Button size="sm">Confirmer</Button>
          </div>

          <div className="flex items-center justify-between border rounded-lg p-3">
            <div>
              <p className="text-sm font-medium">
                Antsirabe → Fianarantsoa
              </p>
              <p className="text-xs text-muted-foreground">
                16:00 • 1 passager
              </p>
            </div>

            <Button size="sm" variant="outline">
              Voir
            </Button>
          </div>

        </CardContent>
      </Card>

      {/* ───────────────── AVIS RECENTS ───────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Avis récents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-muted" />
            <div>
              <p className="text-sm font-medium">Jean</p>
              <p className="text-xs text-muted-foreground">
                ⭐⭐⭐⭐⭐ — Très bon trajet !
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-muted" />
            <div>
              <p className="text-sm font-medium">Marie</p>
              <p className="text-xs text-muted-foreground">
                ⭐⭐⭐⭐ — Ponctuel et agréable
              </p>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* ───────────────── ACTIVITE RECENTE ───────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">

          <p>🚗 Trajet publié — Tana → Majunga</p>
          <p>📦 Réservation confirmée</p>
          <p>💬 Nouveau message reçu</p>

        </CardContent>
      </Card>

    </div>
  )
}