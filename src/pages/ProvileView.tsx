"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  MapPin,
  ShieldCheck,
  Car,
  MessageCircle,
  Music,
  VolumeX,
  Volume2,
  PawPrint,
  Baby,
  Luggage,
  Wind,
  Thermometer,
  Cigarette,
  Phone,
  AirVent,
  Bluetooth,
  Wifi,
  Usb,
  Zap,
  Globe,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Flag,
  Fuel,
  Users,
  Gauge,
  Wrench,
  CheckCircle2,
  Calendar,
  Link,
  ArrowRight,
  Clock,
  TrendingUp,
} from "lucide-react"

/* ─────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────── */
const PROFILE = {
  name: "Alex Rakoto",
  pseudo: "@alex.rakoto",
  avatar: "https://i.pravatar.cc/150?img=12",
  cover: "https://i.pravatar.cc/600?img=12",
  location: "Antananarivo",
  role: "Conducteur",
  verified: true,
  online: true,
  rating: 4.8,
  reviewCount: 124,
  tripsCount: 237,
  memberSince: "Janvier 2022",
  responseRate: 96,
  responseTime: "< 1h",
  bio: "Conducteur expérimenté sur l'axe Antananarivo–Antsirabe depuis plus de 3 ans. Je conduis calmement, je suis ponctuel et j'aime rendre le trajet agréable pour tout le monde. N'hésitez pas à me poser des questions avant de réserver !",
  languages: [
    { code: "mg", label: "Malagasy", country: "mg" },
    { code: "fr", label: "Français", country: "fr" },
    { code: "en", label: "English", country: "gb" },
  ],
  preferences: [
    { key: "music", label: "Musique", icon: Music },
    { key: "chat", label: "Discussion", icon: MessageCircle },
    { key: "pets", label: "Animaux", icon: PawPrint },
    { key: "luggage", label: "Bagages", icon: Luggage },
    { key: "aircon", label: "Climatisation", icon: Wind },
    { key: "nosmoking", label: "Non-fumeur", icon: Cigarette },
  ],
  socials: {
    facebook: "https://facebook.com/alex.rakoto",
    instagram: "https://instagram.com/alex.rakoto",
    website: null,
    linkedin: null,
  },
}

const VEHICLE = {
  brand: "Toyota",
  model: "Corolla",
  year: "2019",
  color: "Gris",
  colorHex: "#94a3b8",
  fuel: "Essence",
  seats: 4,
  plate: "ABC 1234 T",
  comfort: 4,
  mileage: "87 000 km",
  ctValid: true,
  insValid: true,
  photos: [
    "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80",
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&q=80",
    "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=600&q=80",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80",
  ],
  equipments: [
    { key: "aircon",    label: "Climatisation", icon: AirVent },
    { key: "bluetooth", label: "Bluetooth",      icon: Bluetooth },
    { key: "usb",       label: "Prise USB",      icon: Usb },
    { key: "gps",       label: "GPS intégré",    icon: MapPin },
  ],
}

const REVIEWS = [
  {
    id: 1,
    author: "Fanja R.",
    role: "Passagère",
    date: "12 avr. 2025",
    rating: 5,
    from: "Antananarivo",
    to: "Antsirabe",
    comment: "Trajet très agréable, conducteur ponctuel et véhicule propre. Je recommande vivement !",
    reply: "Merci beaucoup, c'était un plaisir !",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: 2,
    author: "Hery M.",
    role: "Passager",
    date: "8 avr. 2025",
    rating: 4,
    from: "Fianarantsoa",
    to: "Antananarivo",
    comment: "Passager respectueux et à l'heure. Trajet sans encombre, bonne communication avant le départ.",
    reply: null,
    avatar: "https://i.pravatar.cc/40?img=8",
  },
  {
    id: 3,
    author: "Vonjy A.",
    role: "Passagère",
    date: "28 mars 2025",
    rating: 5,
    from: "Antananarivo",
    to: "Mahajanga",
    comment: "Excellent conducteur, très professionnel. Véhicule confortable et climatisé, musique agréable.",
    reply: "Super voyage, merci à vous aussi !",
    avatar: "https://i.pravatar.cc/40?img=9",
  },
  {
    id: 4,
    author: "Noro S.",
    role: "Passagère",
    date: "20 mars 2025",
    rating: 3,
    from: "Antananarivo",
    to: "Toliara",
    comment: "Trajet correct mais le véhicule manquait d'espace pour les bagages.",
    reply: null,
    avatar: "https://i.pravatar.cc/40?img=11",
  },
]

const RATING_DIST = [
  { stars: 5, count: 89 },
  { stars: 4, count: 24 },
  { stars: 3, count: 7 },
  { stars: 2, count: 3 },
  { stars: 1, count: 1 },
]

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */
function FlagImg({ country }: { country: string }) {
  return (
    <img
      src={`https://flagcdn.com/24x18/${country}.png`}
      srcSet={`https://flagcdn.com/48x36/${country}.png 2x`}
      width={14}
      height={10}
      alt={country}
      className="rounded-[2px] object-cover shrink-0"
    />
  )
}

function StarRow({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  return (
    <div className={cn("flex gap-0.5", size === "lg" ? "gap-1" : "gap-0.5")}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn(
            size === "lg" ? "w-4 h-4" : "w-3 h-3",
            s <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   VEHICLE PHOTOS CAROUSEL
───────────────────────────────────────── */
function VehicleCarousel({ photos }: { photos: string[] }) {
  const [index, setIndex] = useState(0)
  return (
    <div className="space-y-2">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
        <img
          src={photos[index]}
          className="w-full h-full object-cover transition-all duration-300"
          alt={`Véhicule photo ${index + 1}`}
        />
        {photos.length > 1 && (
          <>
            <button
              onClick={() => setIndex((i) => (i - 1 + photos.length) % photos.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % photos.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition",
                    i === index ? "bg-white" : "bg-white/40"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-1.5">
        {photos.map((url, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={cn(
              "aspect-video rounded-lg overflow-hidden border-2 transition",
              i === index ? "border-primary" : "border-transparent"
            )}
          >
            <img src={url} className="w-full h-full object-cover" alt="" />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   RATING DISTRIBUTION
───────────────────────────────────────── */
function RatingDistribution() {
  const total = RATING_DIST.reduce((s, r) => s + r.count, 0)
  return (
    <div className="space-y-1.5">
      {RATING_DIST.map(({ stars, count }) => (
        <div key={stars} className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground w-3 shrink-0">{stars}</span>
          <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-400 transition-all"
              style={{ width: `${(count / total) * 100}%` }}
            />
          </div>
          <span className="text-[11px] text-muted-foreground w-5 text-right shrink-0">{count}</span>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   REVIEW CARD
───────────────────────────────────────── */
function ReviewCard({ review }: { review: typeof REVIEWS[number] }) {
  return (
    <div className="border rounded-xl p-3 space-y-2.5 bg-card">
      <div className="flex items-start gap-2.5">
        <img src={review.avatar} className="w-8 h-8 rounded-full object-cover shrink-0" alt={review.author} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div>
              <p className="text-xs font-medium">{review.author}</p>
              <p className="text-[10px] text-muted-foreground">{review.role}</p>
            </div>
            <StarRow rating={review.rating} />
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-[10px] text-muted-foreground flex-wrap">
            <span>{review.from}</span>
            <ArrowRight className="w-2.5 h-2.5 shrink-0" />
            <span>{review.to}</span>
            <span className="opacity-50">·</span>
            <span>{review.date}</span>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed">{review.comment}</p>
      {review.reply && (
        <div className="pl-3 border-l-2 border-primary/30">
          <p className="text-[10px] text-muted-foreground mb-0.5 font-medium">Réponse du conducteur</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed italic">{review.reply}</p>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────── */
function Section({ title, icon: Icon, children, className }: {
  title: string
  icon: React.ElementType
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <h2 className="text-sm font-semibold flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {title}
      </h2>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function PublicProfilePage() {
  const [liked, setLiked] = useState(false)
  const [reviewPage, setReviewPage] = useState(0)
  const REVIEWS_PER_PAGE = 4
  const totalPages = Math.ceil(REVIEWS.length / REVIEWS_PER_PAGE)
  const visibleReviews = REVIEWS.slice(
    reviewPage * REVIEWS_PER_PAGE,
    (reviewPage + 1) * REVIEWS_PER_PAGE
  )

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">

      {/* ───── HEADER CARD ───── */}
      <div className="rounded-2xl border bg-card overflow-hidden">

        {/* Cover */}
        <div className="relative w-full h-44 md:h-52">
          <img
            src={PROFILE.cover}
            className="w-full h-full object-cover object-top"
            alt="Couverture"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Top-right actions */}
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              size="icon"
              variant="outline"
              className="bg-background/80 backdrop-blur-sm w-8 h-8"
              onClick={() => {}}
            >
              <Share2 className="w-3.5 h-3.5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setLiked((p) => !p)}
              className={cn(
                "bg-background/80 backdrop-blur-sm w-8 h-8",
                liked && "text-rose-500 border-rose-300"
              )}
            >
              <Heart className="w-3.5 h-3.5" fill={liked ? "currentColor" : "none"} />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="bg-background/80 backdrop-blur-sm w-8 h-8"
            >
              <Flag className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Online badge */}
          {PROFILE.online && (
            <span className="absolute top-3 left-3 flex items-center gap-1.5 text-xs text-white bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              En ligne
            </span>
          )}
        </div>

        {/* Avatar + identity */}
        <div className="px-4 md:px-5 pb-4">
          <div className="flex items-end gap-3 -mt-10">
            <div className="relative shrink-0">
              <img
                src={PROFILE.avatar}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover ring-4 ring-background shadow-md"
                alt={PROFILE.name}
              />
              {PROFILE.online && (
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background" />
              )}
            </div>
            <div className="flex-1 min-w-0 pt-8">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base md:text-lg font-semibold">{PROFILE.name}</h1>
                {PROFILE.verified && (
                  <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px]">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    Vérifié
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap text-xs text-muted-foreground">
                <span>{PROFILE.pseudo}</span>
                <span className="opacity-40">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  {PROFILE.location}
                </span>
                <span className="opacity-40">·</span>
                <span>{PROFILE.role}</span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-4 grid grid-cols-3 gap-2 md:grid-cols-5 md:gap-3">
            {[
              { label: "Note", value: PROFILE.rating.toString(), sub: `${PROFILE.reviewCount} avis`, icon: Star },
              { label: "Trajets", value: PROFILE.tripsCount.toString(), sub: "effectués", icon: Car },
              { label: "Réponse", value: `${PROFILE.responseRate}%`, sub: "de taux", icon: TrendingUp },
              { label: "Délai", value: PROFILE.responseTime, sub: "de réponse", icon: Clock },
              { label: "Membre", value: "2022", sub: PROFILE.memberSince, icon: Calendar },
            ].map(({ label, value, sub, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center p-2 rounded-xl bg-muted/40 border"
              >
                <Icon className="w-3.5 h-3.5 text-muted-foreground mb-1" />
                <p className="text-sm font-semibold leading-none">{value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight hidden md:block">{sub}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight md:hidden">{label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-4 flex gap-2">
            <Button className="flex-1 gap-1.5">
              <MessageCircle className="w-4 h-4" />
              Contacter
            </Button>
            <Button variant="outline" className="flex-1 gap-1.5">
              <Car className="w-4 h-4" />
              Voir ses trajets
            </Button>
          </div>
        </div>
      </div>

      {/* ───── BODY : 2-col on desktop ───── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* LEFT COLUMN */}
        <div className="space-y-4 md:col-span-1">

          {/* Bio */}
          <div className="rounded-2xl border bg-card p-4">
            <Section title="À propos" icon={Globe}>
              <p className="text-xs text-muted-foreground leading-relaxed">{PROFILE.bio}</p>
            </Section>
          </div>

          {/* Languages */}
          <div className="rounded-2xl border bg-card p-4">
            <Section title="Langues parlées" icon={Globe}>
              <div className="flex flex-wrap gap-2">
                {PROFILE.languages.map((lang) => (
                  <span
                    key={lang.code}
                    className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border bg-muted/40"
                  >
                    <FlagImg country={lang.country} />
                    {lang.label}
                  </span>
                ))}
              </div>
            </Section>
          </div>

          {/* Preferences */}
          <div className="rounded-2xl border bg-card p-4">
            <Section title="Préférences à bord" icon={Luggage}>
              <div className="grid grid-cols-2 gap-1.5">
                {PROFILE.preferences.map(({ key, label, icon: Icon }) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 text-[11px] px-2.5 py-1.5 rounded-lg bg-muted/40 border text-muted-foreground"
                  >
                    <Icon className="w-3 h-3 shrink-0" />
                    {label}
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Socials */}
          {(PROFILE.socials.facebook || PROFILE.socials.instagram || PROFILE.socials.website || PROFILE.socials.linkedin) && (
            <div className="rounded-2xl border bg-card p-4">
              <Section title="Liens" icon={Link}>
                <div className="space-y-2">
                  {PROFILE.socials.facebook && (
                    <a
                      href={PROFILE.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition"
                    >
                      <Link className="w-3.5 h-3.5 shrink-0" />
                      Facebook
                    </a>
                  )}
                  {PROFILE.socials.instagram && (
                    <a
                      href={PROFILE.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition"
                    >
                      <Link className="w-3.5 h-3.5 shrink-0" />
                      Instagram
                    </a>
                  )}
                  {PROFILE.socials.linkedin && (
                    <a
                      href={PROFILE.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition"
                    >
                      <Link className="w-3.5 h-3.5 shrink-0" />
                      LinkedIn
                    </a>
                  )}
                  {PROFILE.socials.website && (
                    <a
                      href={PROFILE.socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition"
                    >
                      <Globe className="w-3.5 h-3.5 shrink-0" />
                      Site web
                    </a>
                  )}
                </div>
              </Section>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4 md:col-span-2">

          {/* Vehicle */}
          <div className="rounded-2xl border bg-card p-4 space-y-4">
            <Section title="Véhicule" icon={Car}>

              {/* Photos */}
              <VehicleCarousel photos={VEHICLE.photos} />

              <Separator />

              {/* Info grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  { icon: Car,       label: "Marque / Modèle", value: `${VEHICLE.brand} ${VEHICLE.model}` },
                  { icon: Calendar,  label: "Année",            value: VEHICLE.year },
                  { icon: Fuel,      label: "Carburant",        value: VEHICLE.fuel },
                  { icon: Users,     label: "Places passagers", value: `${VEHICLE.seats} places` },
                  { icon: Gauge,     label: "Kilométrage",      value: VEHICLE.mileage },
                  {
                    icon: null,
                    label: "Couleur",
                    value: VEHICLE.color,
                    colorDot: VEHICLE.colorHex,
                  },
                ].map(({ icon: Icon, label, value, colorDot }) => (
                  <div key={label} className="flex flex-col gap-0.5 p-2.5 rounded-xl border bg-muted/40">
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      {Icon && <Icon className="w-3 h-3 shrink-0" />}
                      {!Icon && colorDot && (
                        <span
                          className="w-3 h-3 rounded-full shrink-0 border border-border"
                          style={{ backgroundColor: colorDot }}
                        />
                      )}
                      {label}
                    </p>
                    <p className="text-xs font-medium">{value}</p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Equipments */}
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Équipements à bord
                </p>
                <div className="flex flex-wrap gap-2">
                  {VEHICLE.equipments.map(({ key, label, icon: Icon }) => (
                    <span
                      key={key}
                      className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border bg-muted/40 text-muted-foreground"
                    >
                      <Icon className="w-3 h-3 shrink-0" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Comfort + documents */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                {/* Comfort */}
                <div className="flex flex-col gap-1.5 p-3 rounded-xl border bg-muted/40">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                    Confort estimé
                  </p>
                  <div className="flex items-center gap-2">
                    <StarRow rating={VEHICLE.comfort} size="lg" />
                    <span className="text-xs text-muted-foreground">
                      {["", "Basique", "Correct", "Confortable", "Très confortable", "Luxueux"][VEHICLE.comfort]}
                    </span>
                  </div>
                </div>

                {/* Documents */}
                <div className="flex flex-col gap-1.5 p-3 rounded-xl border bg-muted/40">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                    Documents
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-3 h-3 text-muted-foreground shrink-0" />
                      <span className="text-[11px]">Contrôle technique</span>
                      <span
                        className={cn(
                          "ml-auto text-[10px] px-1.5 py-0.5 rounded-full",
                          VEHICLE.ctValid
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-500"
                        )}
                      >
                        {VEHICLE.ctValid ? "Valide" : "Expiré"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3 text-muted-foreground shrink-0" />
                      <span className="text-[11px]">Assurance</span>
                      <span
                        className={cn(
                          "ml-auto text-[10px] px-1.5 py-0.5 rounded-full",
                          VEHICLE.insValid
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-500"
                        )}
                      >
                        {VEHICLE.insValid ? "Valide" : "Expirée"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>

          {/* Reviews */}
          <div className="rounded-2xl border bg-card p-4 space-y-4">
            <Section title="Avis et évaluations" icon={Star}>

              {/* Rating overview */}
              <div className="flex flex-col md:flex-row gap-4 p-3 rounded-xl bg-muted/40 border">
                <div className="flex flex-col items-center justify-center md:border-r md:pr-4 gap-1">
                  <p className="text-4xl font-bold">{PROFILE.rating}</p>
                  <StarRow rating={Math.round(PROFILE.rating)} size="lg" />
                  <p className="text-[11px] text-muted-foreground">{PROFILE.reviewCount} avis</p>
                </div>
                <div className="flex-1">
                  <RatingDistribution />
                </div>
              </div>

              {/* Review list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {visibleReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-7 h-7"
                    disabled={reviewPage === 0}
                    onClick={() => setReviewPage((p) => p - 1)}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    {reviewPage + 1} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-7 h-7"
                    disabled={reviewPage === totalPages - 1}
                    onClick={() => setReviewPage((p) => p + 1)}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}

            </Section>
          </div>

        </div>
      </div>
    </div>
  )
}