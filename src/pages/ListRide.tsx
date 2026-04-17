"use client"

import { useState, useMemo } from "react"
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Car,
  Route,
  Star,
  Users,
  Clock,
  MessageCircle,
  Info,
  ChevronLeft,
  ChevronRight,
  List,
  Filter,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface Ride {
  from: string
  to: string
  time: string
  date: string
  distance: number
  duration: string
  price: number
  seats: number
  driver: string
  rating: number
  reviews: number
}

const ALL_RIDES: Ride[] = [
  {
    from: "Antananarivo",
    to: "Tamatave",
    time: "08:30",
    date: "17 Avr 2026",
    distance: 320,
    duration: "6h30",
    price: 12000,
    seats: 1,
    driver: "Jean",
    rating: 4.8,
    reviews: 24,
  },
  {
    from: "Antsirabe",
    to: "Fianarantsoa",
    time: "10:00",
    date: "18 Avr 2026",
    distance: 250,
    duration: "5h10",
    price: 15000,
    seats: 3,
    driver: "Marie",
    rating: 4.6,
    reviews: 18,
  },
]

export default function ListRidePage() {
  const [search, setSearch] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const [maxPrice, setMaxPrice] = useState(30000)
  const [minSeats, setMinSeats] = useState(1)

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(2)

  const filtered = useMemo(() => {
    return ALL_RIDES.filter((r) => {
      const q = search.toLowerCase()
      return (
        (!q ||
          r.from.toLowerCase().includes(q) ||
          r.to.toLowerCase().includes(q)) &&
        r.price <= maxPrice &&
        r.seats >= minSeats
      )
    })
  }, [search, maxPrice, minSeats])

  const totalPages = Math.ceil(filtered.length / perPage)

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage
    return filtered.slice(start, start + perPage)
  }, [filtered, currentPage, perPage])

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <Car className="w-5 h-5 text-emerald-500" />
        </div>

        <div className="flex-1">
          <h1 className="text-lg font-semibold">
            Rechercher un trajet
          </h1>

          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Cette page vous permet d’explorer les trajets proposés par les voyageurs de la communauté.
            Chaque proposition correspond à un trajet réel que vous pouvez rejoindre.
            Prenez le temps de comparer les horaires, la distance et le profil du voyageur avant de faire votre choix.
          </p>
        </div>

        <Badge className="bg-emerald-50 text-emerald-600 border">
          {filtered.length} résultats
        </Badge>
      </div>

      {/* SEARCH */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs uppercase text-muted-foreground">
            Recherche
          </span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Saisissez une ville de départ ou d’arrivée pour filtrer les trajets disponibles au sein de la communauté. La recherche s’effectue en temps réel et met automatiquement à jour les résultats au fur et à mesure de votre saisie, vous permettant de repérer rapidement les trajets correspondant à votre besoin sans avoir à recharger la page.
        </p>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Ex: Antananarivo"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>

          <Button
            variant={showFilters ? "default" : "outline"}
            onClick={() => setShowFilters((v) => !v)}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* FILTERS */}
      {showFilters && (
        <div className="p-4 rounded-xl border bg-muted/40 space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Les filtres vous permettent d’affiner votre recherche en fonction de vos contraintes.
            Vous pouvez par exemple limiter le prix ou choisir un trajet avec moins de voyageurs pour plus de confort.
          </p>

          <div>
            <p className="text-xs mb-1">Prix maximum : {maxPrice} Ar</p>
            <input
              type="range"
              min={5000}
              max={30000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <p className="text-xs mb-1">
              Nombre minimum de voyageurs : {minSeats}
            </p>
            <input
              type="range"
              min={1}
              max={4}
              value={minSeats}
              onChange={(e) => setMinSeats(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* PAGINATION EXPLANATION */}
      <div className="text-xs text-muted-foreground leading-relaxed space-y-2">
        <p>
          Les résultats sont organisés en plusieurs pages afin de garantir une navigation fluide et une lecture plus confortable. Ce découpage permet d’éviter une surcharge d’informations et vous aide à vous concentrer sur un nombre limité de trajets à la fois.
        </p>
        <p>
          Vous pouvez naviguer facilement entre les différentes pages à l’aide des boutons de navigation. Il est également possible de modifier le nombre de trajets affichés par page afin d’adapter l’affichage à votre préférence, que vous souhaitiez parcourir rapidement les résultats ou analyser plus en détail chaque proposition.
        </p>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-between w-full text-xs">

        {/* GAUCHE */}
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-muted-foreground" />
          <span>Afficher</span>

          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="border rounded px-2 py-1"
          >
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>

          <span>trajets par page</span>
        </div>

        {/* DROITE */}
        <div className="flex items-center gap-2">
          <span>
            Page {currentPage} / {totalPages || 1}
          </span>
        </div>

      </div>

      {/* PAGINATION TOP */}
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Précédent
        </Button>

        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Suivant
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* RESULTS */}
      <div className="space-y-4">
        {paginated.map((ride, i) => {
          const isLastSeat = ride.seats === 1

          return (
            <Card key={i} className="hover:shadow-md transition">
              <CardContent className="p-4 space-y-4">

                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <Car className="w-4 h-4 text-emerald-500" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {ride.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Route className="w-3 h-3" />
                      {ride.distance} km
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <div className="flex-1 border-t border-dashed border-muted-foreground/40" />
                    <MapPin className="w-4 h-4 text-red-500" />
                  </div>

                  <div className="flex justify-between text-xs font-medium">
                    <span>{ride.from}</span>
                    <span>{ride.to}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {ride.time}
                  </span>

                  <span className="flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    {ride.date}
                  </span>

                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {ride.seats} voyageur{ride.seats > 1 ? "s" : ""}
                  </span>

                  {isLastSeat && (
                    <Badge variant="destructive">
                      Dernier voyageur
                    </Badge>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://i.pravatar.cc/100?u=${ride.driver}`}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">{ride.driver}</p>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {ride.rating}
                        <span>• {ride.reviews} avis</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {ride.price} Ar
                    </p>
                    <p className="text-xs text-muted-foreground">
                      par voyageur
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <Info className="w-3 h-3 mr-1" />
                    Détails
                  </Button>

                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Contacter
                  </Button>

                  <Button size="sm" className="flex-1 text-xs">
                    Réserver
                  </Button>
                </div>

              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* PAGINATION BOTTOM */}
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Précédent
        </Button>

        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Suivant
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

    </div>
  )
}