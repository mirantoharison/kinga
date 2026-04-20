"use client"

import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Star, Search, SlidersHorizontal, MapPin, Copy,
  MessageCircle, Reply, Flag, ExternalLink, ChevronDown,
  ChevronUp, X, CheckCircle, AlertTriangle, Car, Users,
  TrendingUp, Send, BarChart2,
  List,
  MinusCircle,
  XCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

/* ─────────────── TYPES ─────────────── */

interface Review {
  id: number
  author: string
  role: "Conducteur" | "Passager"
  rating: number
  comment: string
  from: string
  to: string
  date: string
  replies: string[]
}

/* ─────────────── MOCK DATA ─────────────── */

const MOCK_REVIEWS: Review[] = [
  {
    id: 1, author: "Jean", role: "Conducteur", rating: 5,
    comment: "Très bon passager, ponctuel et agréable. Trajet très sympa, je recommande.",
    from: "Antananarivo", to: "Tamatave", date: "2026-04-10",
    replies: ["Merci pour ton retour ! À bientôt sur la route 🙂"],
  },
  {
    id: 2, author: "Sarah", role: "Passager", rating: 4,
    comment: "Trajet confortable, conduite fluide. Bon contact, musique agréable.",
    from: "Fianarantsoa", to: "Antsirabe", date: "2026-04-08",
    replies: [],
  },
  {
    id: 3, author: "Lucas", role: "Conducteur", rating: 3,
    comment: "Correct dans l'ensemble. Quelques petits retards mais globalement OK.",
    from: "Majunga", to: "Antananarivo", date: "2026-04-06",
    replies: ["Merci pour ton honnêteté. Nous allons nous améliorer."],
  },
  {
    id: 4, author: "Paul", role: "Passager", rating: 2,
    comment: "Retard important, peu de communication. Expérience décevante.",
    from: "Diego", to: "Majunga", date: "2026-04-05",
    replies: [],
  },
  {
    id: 5, author: "Haja", role: "Conducteur", rating: 5,
    comment: "Excellent passager ! Très respectueux et ponctuel. Je prendrai plaisir à voyager à nouveau avec lui.",
    from: "Antsirabe", to: "Antananarivo", date: "2026-04-03",
    replies: [],
  },
  {
    id: 6, author: "Miora", role: "Passager", rating: 1,
    comment: "Voiture en mauvais état, conduite dangereuse. Je ne recommande pas.",
    from: "Toliara", to: "Fianarantsoa", date: "2026-04-01",
    replies: ["Nous sommes désolés pour cette expérience. Nous avons transmis le signalement."],
  },
]

const FLAG_REASONS = [
  "Contenu inapproprié",
  "Fausse information",
  "Spam ou publicité",
  "Harcèlement",
  "Autre raison",
]

/* ─────────────── HELPERS ─────────────── */

function ratingBg(r: number) {
  if (r >= 4) return "bg-zinc-800/60 border-zinc-700 text-zinc-300"
  if (r === 3) return "bg-zinc-800/60 border-zinc-700 text-zinc-400"
  return "bg-zinc-800/60 border-zinc-700 text-zinc-400"
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= rating ? "fill-current text-zinc-400" : "text-zinc-700"}`}
        />
      ))}
    </div>
  )
}

/* ─────────────── TOAST ─────────────── */

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-foreground text-background px-4 py-2.5 rounded-xl shadow-xl text-sm animate-in slide-in-from-bottom-4 duration-300">
      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      {message}
    </div>
  )
}

/* ─────────────── MODAL ─────────────── */

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-background border rounded-2xl shadow-2xl w-full max-w-md p-5 space-y-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm">{title}</p>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

/* ─────────────── STAT CARD ─────────────── */

function Stat({ label, value, icon, highlight }: any) {
  return (
    <div className="bg-muted/50 rounded-xl px-4 py-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-muted-foreground">
          {label}
        </p>
        <span className="text-muted-foreground">
          {icon}
        </span>
      </div>

      <p className={`text-2xl font-semibold mt-0.5 ${highlight ?? ""}`}>
        {value}
      </p>
    </div>
  )
}

/* ─────────────── REVIEW CARD ─────────────── */

function ReviewCard({
  review,
  navigate,
  onToast,
}: {
  review: Review
  navigate: (to: string) => void
  onToast: (msg: string) => void
}) {
  const [copied, setCopied] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [replyOpen, setReplyOpen] = useState(false)
  const [flagOpen, setFlagOpen] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [flagReason, setFlagReason] = useState("")
  const [localReplies, setLocalReplies] = useState(review.replies)

  const handleCopy = () => {
    navigator.clipboard.writeText(`${review.from} → ${review.to}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
    onToast("Trajet copié dans le presse-papiers")
  }

  const handleSendReply = () => {
    if (!replyText.trim()) return
    setLocalReplies((prev) => [...prev, replyText.trim()])
    setReplyText("")
    setReplyOpen(false)
    onToast("Réponse envoyée avec succès")
  }

  const handleFlag = () => {
    if (!flagReason) return
    setFlagOpen(false)
    onToast("Signalement transmis à la modération")
  }

  return (
    <>
      {replyOpen && (
        <Modal title={`Répondre à ${review.author}`} onClose={() => setReplyOpen(false)}>
          <div className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded-lg italic">
            "{review.comment}"
          </div>
          <textarea
            className="w-full border rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/30 min-h-[90px]"
            placeholder="Votre réponse..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setReplyOpen(false)}>Annuler</Button>
            <Button size="sm" onClick={handleSendReply} disabled={!replyText.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Send className="w-3.5 h-3.5 mr-1.5" /> Envoyer
            </Button>
          </div>
        </Modal>
      )}

      {flagOpen && (
        <Modal title="Signaler cet avis" onClose={() => setFlagOpen(false)}>
          <p className="text-xs text-muted-foreground">Sélectionnez la raison du signalement :</p>
          <div className="space-y-1.5">
            {FLAG_REASONS.map((r) => (
              <button
                key={r}
                onClick={() => setFlagReason(r)}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg border transition-all ${flagReason === r
                  ? "border-rose-400 bg-rose-50 text-rose-700"
                  : "border-transparent hover:bg-muted"
                  }`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setFlagOpen(false)}>Annuler</Button>
            <Button size="sm" onClick={handleFlag} disabled={!flagReason}
              className="bg-rose-600 hover:bg-rose-700 text-white">
              <AlertTriangle className="w-3.5 h-3.5 mr-1.5" /> Signaler
            </Button>
          </div>
        </Modal>
      )}

      <Card className="transition-all hover:shadow-sm duration-150">
        <CardContent className="px-4 py-3 space-y-2.5">

          {/* HEADER */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-300 text-xs font-semibold shrink-0">
                {review.author[0]}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                <p className="text-xs font-semibold leading-tight">{review.author}</p>
                <Badge
                  variant="outline"
                  className="text-[10px] h-4 px-1.5 border-zinc-700 bg-zinc-800/50 text-zinc-400 font-normal"
                >
                  {review.role === "Conducteur" ? <Car className="w-2.5 h-2.5 mr-1" /> : <Users className="w-2.5 h-2.5 mr-1" />}
                  {review.role}
                </Badge>
                <span className="text-[10px] text-muted-foreground/60">{review.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 border border-zinc-700/60 rounded-md px-2 py-1 bg-zinc-800/40 shrink-0">
              <Stars rating={review.rating} />
              <span className="text-[11px] font-medium text-zinc-400">{review.rating}/5</span>
            </div>
          </div>

          {/* TRAJET */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs bg-muted px-3 py-1.5 rounded-lg">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="font-medium">{review.from}</span>
              <span className="text-muted-foreground">→</span>
              <span className="font-medium">{review.to}</span>
            </div>

            <div className="flex gap-1">
              <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => navigate(`/rides/${review.id}`)}>
                <ExternalLink className="w-3.5 h-3.5 mr-1" /> Voir
              </Button>
              <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={handleCopy}>
                <Copy className="w-3.5 h-3.5 mr-1" />
                {copied ? "Copié ✓" : "Copier"}
              </Button>
            </div>
          </div>

          {/* COMMENT */}
          <div className="relative bg-muted/50 px-4 py-3 rounded-xl border border-border/40">
            <span className="absolute top-1 left-2.5 text-xl text-muted-foreground/30 font-serif select-none">
              "
            </span>

            <p className="text-xs text-muted-foreground italic leading-relaxed pl-3 pr-2">
              {review.comment}
            </p>

            <span className="absolute bottom-1 right-3 text-xl text-muted-foreground/30 font-serif select-none">
              "
            </span>
          </div>

          {/* REPLIES */}
          {localReplies.length > 0 && (
            <div>
              <button
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowReplies((v) => !v)}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                {localReplies.length} réponse{localReplies.length > 1 ? "s" : ""}
                {showReplies ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showReplies && (
                <div className="mt-2 space-y-2 pl-3 border-l-2 border-emerald-200">
                  {localReplies.map((rep, i) => (
                    <div key={i} className="text-xs bg-emerald-50 text-emerald-800 px-3 py-2 rounded-lg border border-emerald-100">
                      <span className="font-medium mr-1">Admin ·</span>{rep}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {localReplies.length === 0 && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" /> Aucune réponse
            </p>
          )}

          {/* ACTIONS */}
          <div className="flex items-center justify-between pt-2 border-t gap-2 flex-wrap">
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setReplyOpen(true)}>
                <Reply className="w-3.5 h-3.5 mr-1" /> Répondre
              </Button>
              <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground hover:text-rose-600 hover:bg-rose-50"
                onClick={() => setFlagOpen(true)}>
                <Flag className="w-3.5 h-3.5 mr-1" /> Signaler
              </Button>
            </div>
            <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground"
              onClick={() => navigate(`/reviews/${review.id}`)}>
              Détails →
            </Button>
          </div>

        </CardContent>
      </Card>
    </>
  )
}

/* ─────────────── PAGE ─────────────── */

export default function ReviewsPage() {
  const navigate = useNavigate()
  const [reviews] = useState<Review[]>(MOCK_REVIEWS)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "positive" | "neutral" | "negative">("all")
  const [sort, setSort] = useState<"recent" | "rating">("recent")
  const [page, setPage] = useState(1)
  const [toast, setToast] = useState<string | null>(null)

  const PAGE_SIZE = 3

  const filtered = useMemo(() => {
    let data = [...reviews]
    if (search)
      data = data.filter((r) =>
        `${r.comment} ${r.from} ${r.to} ${r.author}`.toLowerCase().includes(search.toLowerCase())
      )
    if (filter === "positive") data = data.filter((r) => r.rating >= 4)
    if (filter === "neutral") data = data.filter((r) => r.rating === 3)
    if (filter === "negative") data = data.filter((r) => r.rating <= 2)
    if (sort === "recent") data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    if (sort === "rating") data.sort((a, b) => b.rating - a.rating)
    return data
  }, [search, filter, sort, reviews])

  const stats = useMemo(() => {
    const total = reviews.length
    const avg = total > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1) : 0
    const positive = total > 0 ? Math.round((reviews.filter((r) => r.rating >= 4).length / total) * 100) : 0
    const withReplies = reviews.filter((r) => r.replies.length > 0).length
    return { total, avg, positive, withReplies }
  }, [reviews])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* TOAST */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* HEADER */}
      <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">

        {/* Icon */}
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
          <Star className="w-5 h-5 text-emerald-500" />
        </div>

        {/* Text */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold">
            Gestion des avis et évaluations liées aux trajets
          </h2>

          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Cette interface centralise l'ensemble des évaluations laissées par les utilisateurs après leurs trajets,
            que vous soyez conducteur ou passager. Chaque avis est associé à un déplacement précis afin de garantir
            une lecture claire et une meilleure compréhension des expériences vécues.
          </p>
        </div>

        {/* Badge */}
        <Badge className="bg-emerald-50 text-emerald-600 border shrink-0">
          {filtered.length} avis
        </Badge>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Note moyenne" value={`${stats.avg} / 5`} icon={<Star className="w-4 h-4" />} progress={Number(stats.avg) * 20} />
        <Stat label="Total avis" value={stats.total} icon={<BarChart2 className="w-4 h-4" />} />
        <Stat label="Avis positifs" value={`${stats.positive}%`} icon={<TrendingUp className="w-4 h-4" />} progress={stats.positive} />
        <Stat label="Avec réponse" value={stats.withReplies} icon={<MessageCircle className="w-4 h-4" />} progress={Math.round((stats.withReplies / stats.total) * 100)} />
      </div>

      {/* FILTERS */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par trajet, utilisateur, commentaire..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="pl-9 rounded-xl"
          />
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <div className="flex gap-1.5 flex-wrap">
            {(["all", "positive", "neutral", "negative"] as const).map((f) => {
              const config = {
                all: {
                  label: "Tous",
                  icon: <List className="w-3.5 h-3.5 mr-1" />,
                },
                positive: {
                  label: "Positifs",
                  icon: <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-500" />,
                },
                neutral: {
                  label: "Neutres",
                  icon: <MinusCircle className="w-3.5 h-3.5 mr-1 text-amber-500" />,
                },
                negative: {
                  label: "Négatifs",
                  icon: <XCircle className="w-3.5 h-3.5 mr-1 text-rose-500" />,
                },
              }

              return (
                <Button
                  key={f}
                  variant={filter === f ? "secondary" : "outline"}
                  size="sm"
                  className="rounded-full text-xs h-7 flex items-center"
                  onClick={() => {
                    setFilter(f)
                    setPage(1)
                  }}
                >
                  {config[f].icon}
                  {config[f].label}
                </Button>
              )
            })}
          </div>

          <div className="flex gap-1.5 border-l pl-3 ml-1">
            {(["recent", "rating"] as const).map((s) => (
              <Button
                key={s}
                variant={sort === s ? "secondary" : "ghost"}
                size="sm"
                className="rounded-full text-xs h-7"
                onClick={() => { setSort(s); setPage(1) }}
              >
                <SlidersHorizontal className="w-3 h-3 mr-1" />
                {{ recent: "Récent", rating: "Meilleures notes" }[s]}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* LIST */}
      {paginated.length > 0 ? (
        <div className="space-y-3">
          {paginated.map((review) => (
            <ReviewCard key={review.id} review={review} navigate={navigate} onToast={setToast} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <Star className="w-8 h-8 mx-auto mb-3 opacity-20" />
          <p className="text-sm">Aucun avis ne correspond à votre recherche.</p>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1.5 flex-wrap pt-2">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
            ← Précédent
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button key={p} size="sm" variant={p === page ? "default" : "outline"} onClick={() => setPage(p)}>
              {p}
            </Button>
          ))}
          <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
            Suivant →
          </Button>
        </div>
      )}

    </div>
  )
}