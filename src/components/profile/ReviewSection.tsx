"use client"

import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"

import { ReviewCard } from "@/components/review/ReviewCard"
import { ReviewEmpty } from "@/components/review/ReviewEmpty"
import { ReviewPagination } from "@/components/review/ReviewPagination"
import { Toast } from "@/components/review/misc/ReviewMiscUi"
import { type Review } from "@/hooks/use-review"

/* ─────────────────────────────────────────
   MOCK DATA (à remplacer par vos vraies données)
───────────────────────────────────────── */
const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    author: "Fanja R.",
    role: "Passager",
    date: "12 avr. 2025",
    rating: 5,
    from: "Antananarivo",
    to: "Antsirabe",
    comment:
      "Trajet très agréable, conducteur ponctuel et véhicule propre. Je recommande vivement !",
    replies: ["Merci beaucoup, c'était un plaisir !"],
  },
  {
    id: 2,
    author: "Hery M.",
    role: "Conducteur",
    date: "8 avr. 2025",
    rating: 4,
    from: "Fianarantsoa",
    to: "Antananarivo",
    comment:
      "Passager respectueux et à l'heure. Trajet sans encombre, bonne communication avant le départ.",
    replies: [],
  },
  {
    id: 3,
    author: "Lalaina T.",
    role: "Passager",
    date: "3 avr. 2025",
    rating: 2,
    from: "Toamasina",
    to: "Antananarivo",
    comment:
      "Départ en retard de 45 minutes sans prévenir. Le trajet s'est bien passé ensuite mais l'attente était frustrante.",
    replies: [],
  },
  {
    id: 4,
    author: "Vonjy A.",
    role: "Passager",
    date: "28 mars 2025",
    rating: 5,
    from: "Antananarivo",
    to: "Mahajanga",
    comment:
      "Excellent conducteur, très professionnel. Véhicule confortable et climatisé, musique agréable. Je réserverai à nouveau.",
    replies: ["Super voyage, merci à vous aussi !"],
  },
  {
    id: 5,
    author: "Noro S.",
    role: "Passager",
    date: "20 mars 2025",
    rating: 3,
    from: "Antananarivo",
    to: "Toliara",
    comment:
      "Trajet correct mais le véhicule manquait d'espace pour les bagages. La route est longue, un arrêt de plus aurait été apprécié.",
    replies: [],
  },
  {
    id: 6,
    author: "Tianah B.",
    role: "Conducteur",
    date: "15 mars 2025",
    rating: 5,
    from: "Antananarivo",
    to: "Antsirabe",
    comment:
      "Passagère très agréable, ponctuelle et discrète. Trajet parfait, je n'hésiterai pas à l'accepter à nouveau.",
    replies: ["Merci, c'était vraiment sympa !"],
  },
]

const ITEMS_PER_PAGE = 4

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export function ReviewSection() {
  /* ── Pagination ── */
  const [page, setPage] = useState(1)

  /* ── Toast ── */
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const totalPages = Math.max(1, Math.ceil(MOCK_REVIEWS.length / ITEMS_PER_PAGE))
  const paginated = MOCK_REVIEWS.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <>
      {/* Toast global */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* ── En-tête ── */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Star className="w-4 h-4" />
          Avis et évaluations
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Retrouvez ici l'ensemble des avis laissés par les passagers et conducteurs après chaque
          trajet. Ces retours sont essentiels pour maintenir un niveau de confiance élevé sur la
          plateforme et améliorer continuellement la qualité des expériences partagées.
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Prenez le temps de répondre aux avis, notamment aux commentaires négatifs. Une réponse
          bienveillante et constructive démontre votre sérieux et rassure les futurs passagers qui
          consulteront votre profil avant de réserver un trajet avec vous.
        </p>
      </div>

      <div className="space-y-6">

        <Separator />

        {/* ── Liste des avis ── */}
        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
              Avis ({MOCK_REVIEWS.length})
            </p>
            <p className="text-[11px] text-muted-foreground">
              Cliquez sur « Répondre » pour envoyer une réponse publique, ou sur « Signaler » pour
              alerter la modération en cas de contenu inapproprié.
            </p>
          </div>

          {paginated.length === 0 ? (
            <ReviewEmpty />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {paginated.map((review) => (
                <ReviewCard key={review.id} review={review} onToast={showToast} />
              ))}
            </div>
          )}
        </div>

        {/* ── Pagination ── */}
        <ReviewPagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />

      </div>

      {/* ── Conseil ── */}
      <div className="mt-4 border rounded-lg p-3 bg-muted/40 text-[11px] text-muted-foreground">
        <p className="font-medium text-foreground mb-1">Conseil</p>
        <p>
          Les conducteurs qui répondent à plus de 80 % de leurs avis affichent en moyenne une note
          supérieure de 0,4 point. Une réponse courte et sincère suffit à montrer votre implication
          et à rassurer les futurs passagers sur votre sérieux.
        </p>
      </div>
    </>
  )
}