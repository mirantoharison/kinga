"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
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
  Search,
  SlidersHorizontal,
  List,
  CheckCircle,
  MinusCircle,
  XCircle,
  BarChart2,
  Star as StarIcon,
  MessageSquare,
  User,
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
    replies: ["Merci beaucoup, c'était un plaisir !"],
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
    replies: [],
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
    replies: ["Super voyage, merci à vous aussi !"],
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
    replies: [],
  },
  {
    id: 5,
    author: "Haja T.",
    role: "Conducteur",
    date: "15 mars 2025",
    rating: 5,
    from: "Antsirabe",
    to: "Antananarivo",
    comment: "Excellent passager, très respectueux et ponctuel. Je recommande fortement.",
    replies: ["Merci beaucoup, à très bientôt sur la route !"],
  },
  {
    id: 6,
    author: "Rado M.",
    role: "Conducteur",
    date: "10 mars 2025",
    rating: 4,
    from: "Moramanga",
    to: "Antananarivo",
    comment: "Bonne expérience globale. Quelques petites améliorations possibles sur la ponctualité.",
    replies: [],
  },
  {
    id: 7,
    author: "Aina V.",
    role: "Passagère",
    date: "5 mars 2025",
    rating: 2,
    from: "Antananarivo",
    to: "Fianarantsoa",
    comment: "Retard important sans réelle communication. L'expérience était stressante.",
    replies: ["Désolé pour ce problème, une urgence imprévue est survenue."],
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
   HELPERS
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

function truncateText(text: string, max: number) {
  return text.length > max ? text.slice(0, max) + "…" : text
}

/* ─────────────────────────────────────────
   VEHICLE PHOTOS CAROUSEL
───────────────────────────────────────── */
function VehicleCarousel({ photos }: { photos: string[] }) {
  const [index, setIndex] = useState(0)
  return (
    <div className="space-y-2">
      {/* rounded-md instead of rounded-xl */}
      <div className="relative aspect-video rounded-md overflow-hidden bg-muted">
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
      <div className="grid grid-cols-4 gap-1.5">
        {photos.map((url, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            // rounded-sm instead of rounded-lg
            className={cn(
              "aspect-video rounded-sm overflow-hidden border-2 transition",
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
function ReviewCard({ review, onToast }: {
  review: typeof REVIEWS[number]
  onToast: (msg: string) => void
}) {
  const [copied, setCopied] = useState(false)
  const [localReplies, setLocalReplies] = useState(review.replies)

  const handleCopy = () => {
    navigator.clipboard.writeText(`${review.from} → ${review.to}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
    onToast("Trajet copié dans le presse-papiers")
  }

  return (
    // rounded-lg instead of rounded-xl, border-border/50 for subtler border
    <div className="flex flex-col h-full border border-border/50 rounded-lg bg-card hover:shadow-sm transition-all overflow-hidden">
      <div className="flex flex-col h-full px-4 py-3 space-y-3">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-foreground">{review.author[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="text-xs font-semibold text-foreground">{review.author}</p>
              <Badge variant="outline" className="text-[10px] h-4 px-1.5 flex items-center gap-1 border-border/50">
                {review.role === "Conducteur" ? <Car className="w-2.5 h-2.5" /> : <Users className="w-2.5 h-2.5" />}
                {review.role}
              </Badge>
              <span className="text-[10px] text-muted-foreground">{review.date}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 border border-border/40 rounded-md px-2 py-1 bg-muted/40 shrink-0">
            <StarRow rating={review.rating} />
            <span className="text-[11px] text-foreground">{review.rating}/5</span>
          </div>
        </div>

        {/* TRAJET */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs bg-muted/60 px-3 py-1.5 rounded-md">
            <MapPin className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-medium">{review.from}</span>
            →
            <span className="font-medium">{review.to}</span>
          </div>
          <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={handleCopy}>
            {copied ? "Copié ✓" : "Copier"}
          </Button>
        </div>

        {/* COMMENT */}
        {/* rounded-md instead of rounded-xl, border-border/40 */}
        <div className="bg-muted/40 px-4 py-3 rounded-md border border-border/40 flex-1">
          <p className="text-xs text-muted-foreground italic leading-relaxed">
            {truncateText(review.comment, 180)}
          </p>
        </div>

        {/* REPLIES COUNT */}
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <MessageCircle className="w-3.5 h-3.5" />
          {localReplies.length} réponse{localReplies.length > 1 && "s"}
        </div>

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   REVIEW STATS BAR
───────────────────────────────────────── */
function ReviewStatBar() {
  const total = REVIEWS.length
  const avg = total > 0
    ? (REVIEWS.reduce((a, r) => a + r.rating, 0) / total).toFixed(1)
    : "0"
  const positive = total > 0
    ? Math.round((REVIEWS.filter(r => r.rating >= 4).length / total) * 100)
    : 0
  const withReplies = REVIEWS.filter(r => r.replies.length > 0).length

  const stats = [
    { label: "Note moyenne", value: `${avg} / 5`, icon: <Star className="w-4 h-4" />, highlight: "text-emerald-500" },
    { label: "Total avis",   value: total,         icon: <BarChart2 className="w-4 h-4" /> },
    { label: "Avis positifs", value: `${positive}%`, icon: <TrendingUp className="w-4 h-4" />, highlight: "text-emerald-500" },
    { label: "Avec réponse", value: withReplies,   icon: <MessageCircle className="w-4 h-4" /> },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map(({ label, value, icon, highlight }) => (
        // rounded-md, border-border/50
        <div key={label} className="flex flex-col gap-1 p-3 rounded-md border border-border/50 bg-muted/30">
          <div className={cn("text-muted-foreground", highlight)}>{icon}</div>
          <p className={cn("text-lg font-bold leading-none", highlight)}>{value}</p>
          <p className="text-[11px] text-muted-foreground">{label}</p>
        </div>
      ))}
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
   REVIEWS TAB CONTENT
───────────────────────────────────────── */
function ReviewsTab({ onToast }: { onToast: (msg: string) => void }) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "positive" | "neutral" | "negative">("all")
  const [sort, setSort] = useState<"recent" | "rating">("recent")
  const [page, setPage] = useState(1)
  const PER_PAGE = 4

  const filtered = REVIEWS
    .filter((r) => {
      const matchesSearch =
        search === "" ||
        r.author.toLowerCase().includes(search.toLowerCase()) ||
        r.comment.toLowerCase().includes(search.toLowerCase()) ||
        r.from.toLowerCase().includes(search.toLowerCase()) ||
        r.to.toLowerCase().includes(search.toLowerCase())
      const matchesFilter =
        filter === "all" ||
        (filter === "positive" && r.rating >= 4) ||
        (filter === "neutral" && r.rating === 3) ||
        (filter === "negative" && r.rating <= 2)
      return matchesSearch && matchesFilter
    })
    .sort((a, b) =>
      sort === "rating"
        ? b.rating - a.rating
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    )

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const filterBtns = [
    { key: "all",      label: "Tous",      icon: <List className="w-3.5 h-3.5 mr-1" /> },
    { key: "positive", label: "Positifs",  icon: <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-500" /> },
    { key: "neutral",  label: "Neutres",   icon: <MinusCircle className="w-3.5 h-3.5 mr-1 text-amber-500" /> },
    { key: "negative", label: "Négatifs",  icon: <XCircle className="w-3.5 h-3.5 mr-1 text-rose-500" /> },
  ] as const

  const sortBtns = [
    { key: "recent", label: "Récent" },
    { key: "rating", label: "Meilleures notes" },
  ] as const

  return (
    <div className="space-y-4">

      <ReviewStatBar />

      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par trajet, utilisateur, commentaire..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            // rounded-md
            className="pl-9 rounded-md"
          />
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <div className="flex gap-1.5 flex-wrap">
            {filterBtns.map((f) => (
              <Button
                key={f.key}
                variant={filter === f.key ? "secondary" : "outline"}
                size="sm"
                // rounded-md instead of rounded-full
                className="rounded-md text-xs h-7 flex items-center border-border/50"
                onClick={() => { setFilter(f.key); setPage(1) }}
              >
                {f.icon}
                {f.label}
              </Button>
            ))}
          </div>
          <div className="flex gap-1.5 border-l pl-3 ml-1">
            {sortBtns.map((s) => (
              <Button
                key={s.key}
                variant={sort === s.key ? "secondary" : "ghost"}
                size="sm"
                className="rounded-md text-xs h-7"
                onClick={() => { setSort(s.key); setPage(1) }}
              >
                <SlidersHorizontal className="w-3 h-3 mr-1" />
                {s.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {paginated.length > 0 ? (
        <div className="flex flex-col gap-3">
          {paginated.map((review) => (
            <ReviewCard key={review.id} review={review} onToast={onToast} />
          ))}
        </div>
      ) : (
        // rounded-lg, border-border/40
        <div className="py-10 text-center flex flex-col items-center border border-dashed border-border/40 rounded-lg py-12 px-6 bg-muted/20">
          <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-muted-foreground opacity-60" />
          </div>
          <p className="text-sm font-semibold">Aucun résultat trouvé</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm leading-relaxed">
            Aucun avis ne correspond à vos critères. Réinitialisez les filtres pour voir plus de résultats.
          </p>
          <Button
            size="sm" variant="outline" className="mt-4 text-xs border-border/50"
            onClick={() => { setSearch(""); setFilter("all"); setSort("recent"); setPage(1) }}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1.5 pt-2 flex-wrap">
          <Button variant="outline" size="sm" className="border-border/50" onClick={() => setPage(p => p - 1)} disabled={page === 1}>←</Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              size="sm"
              variant={p === page ? "default" : "outline"}
              onClick={() => setPage(p)}
              className={cn("min-w-[32px]", p !== page && "border-border/50")}
            >
              {p}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="border-border/50" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>→</Button>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────
   GENERAL TAB CONTENT
───────────────────────────────────────── */
function GeneralTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {/* LEFT COLUMN */}
      <div className="space-y-4 md:col-span-1">

        {/* Bio — rounded-lg, border-border/50 */}
        <div className="rounded-lg border border-border/50 bg-card p-4">
          <Section title="À propos" icon={Globe}>
            <p className="text-xs text-muted-foreground leading-relaxed">{PROFILE.bio}</p>
          </Section>
        </div>

        {/* Languages */}
        <div className="rounded-lg border border-border/50 bg-card p-4">
          <Section title="Langues parlées" icon={Globe}>
            <div className="flex flex-wrap gap-2">
              {PROFILE.languages.map((lang) => (
                <span
                  key={lang.code}
                  className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded border border-border/40 bg-muted/30"
                >
                  <FlagImg country={lang.country} />
                  {lang.label}
                </span>
              ))}
            </div>
          </Section>
        </div>

        {/* Preferences */}
        <div className="rounded-lg border border-border/50 bg-card p-4">
          <Section title="Préférences à bord" icon={Luggage}>
            <div className="grid grid-cols-2 gap-1.5">
              {PROFILE.preferences.map(({ key, label, icon: Icon }) => (
                <div
                  key={key}
                  className="flex items-center gap-2 text-[11px] px-2.5 py-1.5 rounded border border-border/40 bg-muted/30 text-muted-foreground"
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
          <div className="rounded-lg border border-border/50 bg-card p-4">
            <Section title="Liens" icon={Link}>
              <div className="space-y-2">
                {PROFILE.socials.facebook && (
                  <a href={PROFILE.socials.facebook} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition">
                    <Link className="w-3.5 h-3.5 shrink-0" /> Facebook
                  </a>
                )}
                {PROFILE.socials.instagram && (
                  <a href={PROFILE.socials.instagram} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition">
                    <Link className="w-3.5 h-3.5 shrink-0" /> Instagram
                  </a>
                )}
              </div>
            </Section>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN — Vehicle */}
      <div className="space-y-4 md:col-span-2">
        <div className="rounded-lg border border-border/50 bg-card p-4 space-y-4">
          <Section title="Véhicule" icon={Car}>

            <VehicleCarousel photos={VEHICLE.photos} />
            <Separator className="opacity-40" />

            {/* Info grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                { icon: Car,      label: "Marque / Modèle", value: `${VEHICLE.brand} ${VEHICLE.model}` },
                { icon: Calendar, label: "Année",            value: VEHICLE.year },
                { icon: Fuel,     label: "Carburant",        value: VEHICLE.fuel },
                { icon: Users,    label: "Places passagers", value: `${VEHICLE.seats} places` },
                { icon: Gauge,    label: "Kilométrage",      value: VEHICLE.mileage },
                { icon: null,     label: "Couleur",          value: VEHICLE.color, colorDot: VEHICLE.colorHex },
              ].map(({ icon: Icon, label, value, colorDot }) => (
                // rounded, border-border/40
                <div key={label} className="flex flex-col gap-0.5 p-2.5 rounded border border-border/40 bg-muted/30">
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    {Icon && <Icon className="w-3 h-3 shrink-0" />}
                    {!Icon && colorDot && (
                      <span className="w-3 h-3 rounded-full shrink-0 border border-border/50" style={{ backgroundColor: colorDot }} />
                    )}
                    {label}
                  </p>
                  <p className="text-xs font-medium">{value}</p>
                </div>
              ))}
            </div>

            <Separator className="opacity-40" />

            {/* Equipments */}
            <div>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Équipements à bord
              </p>
              <div className="flex flex-wrap gap-2">
                {VEHICLE.equipments.map(({ key, label, icon: Icon }) => (
                  <span key={key} className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded border border-border/40 bg-muted/30 text-muted-foreground">
                    <Icon className="w-3 h-3 shrink-0" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <Separator className="opacity-40" />

            {/* Comfort + documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5 p-3 rounded border border-border/40 bg-muted/30">
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
              <div className="flex flex-col gap-1.5 p-3 rounded border border-border/40 bg-muted/30">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Documents</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-3 h-3 text-muted-foreground shrink-0" />
                    <span className="text-[11px]">Contrôle technique</span>
                    <span className={cn("ml-auto text-[10px] px-1.5 py-0.5 rounded", VEHICLE.ctValid ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500")}>
                      {VEHICLE.ctValid ? "Valide" : "Expiré"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-muted-foreground shrink-0" />
                    <span className="text-[11px]">Assurance</span>
                    <span className={cn("ml-auto text-[10px] px-1.5 py-0.5 rounded", VEHICLE.insValid ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500")}>
                      {VEHICLE.insValid ? "Valide" : "Expirée"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </Section>
        </div>

        {/* Rating overview */}
        <div className="rounded-lg border border-border/50 bg-card p-4">
          <Section title="Aperçu des avis" icon={Star}>
            <div className="flex flex-col md:flex-row gap-4 p-3 rounded border border-border/40 bg-muted/30">
              <div className="flex flex-col items-center justify-center md:border-r md:border-border/40 md:pr-4 gap-1">
                <p className="text-4xl font-bold">{PROFILE.rating}</p>
                <StarRow rating={Math.round(PROFILE.rating)} size="lg" />
                <p className="text-[11px] text-muted-foreground">{PROFILE.reviewCount} avis</p>
              </div>
              <div className="flex-1">
                <RatingDistribution />
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-1">
              {REVIEWS.slice(0, 3).map((review) => (
                <ReviewCard key={review.id} review={review} onToast={() => {}} />
              ))}
            </div>
          </Section>
        </div>

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function PublicProfilePage() {
  const [liked, setLiked] = useState(false)
  const [activeTab, setActiveTab] = useState<"general" | "reviews">("general")
  const [toast, setToast] = useState<string | null>(null)

  const tabs = [
    { key: "general", label: "Informations", icon: User, count: undefined },
    { key: "reviews", label: "Avis", icon: Star, count: PROFILE.reviewCount },
  ] as const

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-foreground text-background text-xs px-4 py-2 rounded shadow-lg animate-in slide-in-from-top-2">
          {toast}
          <button onClick={() => setToast(null)} className="ml-3 opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      {/* ───── HEADER CARD ───── */}
      {/* rounded-lg instead of rounded-2xl, border-border/50 */}
      <div className="rounded-lg border border-border/50 bg-card overflow-hidden">

        {/* Cover */}
        <div className="relative w-full h-44 md:h-52">
          <img src={PROFILE.cover} className="w-full h-full object-cover object-top" alt="Couverture" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute top-3 right-3 flex gap-2">
            <Button size="icon" variant="outline" className="bg-background/80 backdrop-blur-sm w-8 h-8 rounded border-border/50">
              <Share2 className="w-3.5 h-3.5" />
            </Button>
            <Button
              size="icon" variant="outline"
              onClick={() => setLiked((p) => !p)}
              className={cn("bg-background/80 backdrop-blur-sm w-8 h-8 rounded border-border/50", liked && "text-rose-500 border-rose-300")}
            >
              <Heart className="w-3.5 h-3.5" fill={liked ? "currentColor" : "none"} />
            </Button>
            <Button size="icon" variant="outline" className="bg-background/80 backdrop-blur-sm w-8 h-8 rounded border-border/50">
              <Flag className="w-3.5 h-3.5" />
            </Button>
          </div>

          {PROFILE.online && (
            <span className="absolute top-3 left-3 flex items-center gap-1.5 text-xs text-white bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              En ligne
            </span>
          )}
        </div>

        {/* Avatar + identity */}
        <div className="px-4 md:px-5 pb-0">
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
                  <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200/60 text-[10px]">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    Vérifié
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap text-xs text-muted-foreground">
                <span>{PROFILE.pseudo}</span>
                <span className="opacity-40">·</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3 shrink-0" />{PROFILE.location}</span>
                <span className="opacity-40">·</span>
                <span>{PROFILE.role}</span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-4 grid grid-cols-3 gap-2 md:grid-cols-5 md:gap-3">
            {[
              { label: "Note",     value: PROFILE.rating.toString(), sub: `${PROFILE.reviewCount} avis`, icon: Star },
              { label: "Trajets",  value: PROFILE.tripsCount.toString(), sub: "effectués",              icon: Car },
              { label: "Réponse", value: `${PROFILE.responseRate}%`, sub: "de taux",                   icon: TrendingUp },
              { label: "Délai",    value: PROFILE.responseTime, sub: "de réponse",                     icon: Clock },
              { label: "Membre",   value: "2022", sub: PROFILE.memberSince,                            icon: Calendar },
            ].map(({ label, value, sub, icon: Icon }) => (
              // rounded-md, border-border/40
              <div key={label} className="flex flex-col items-center text-center p-2 rounded-md bg-muted/30 border border-border/40">
                <Icon className="w-3.5 h-3.5 text-muted-foreground mb-1" />
                <p className="text-sm font-semibold leading-none">{value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight hidden md:block">{sub}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight md:hidden">{label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-4 flex gap-2">
            <Button className="flex-1 gap-1.5 rounded-md">
              <MessageCircle className="w-4 h-4" />
              Contacter
            </Button>
            <Button variant="outline" className="flex-1 gap-1.5 rounded-md border-border/60">
              <Car className="w-4 h-4" />
              Voir ses trajets
            </Button>
          </div>

          {/* TABS */}
          <div className="flex gap-0 mt-5 border-b border-border/40 -mx-4 md:-mx-5 px-4 md:px-5">
            {tabs.map(({ key, label, icon: Icon, count }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors",
                  activeTab === key
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
                {count !== undefined && (
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded ml-0.5",
                    activeTab === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ───── TAB CONTENT ───── */}
      {activeTab === "general" && <GeneralTab />}
      {activeTab === "reviews" && <ReviewsTab onToast={setToast} />}

    </div>
  )
}