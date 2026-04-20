"use client"

import { useState } from "react"

import { useReviews, type Review } from "@/hooks/use-review"

import { ReviewHeader } from "@/components/review/ReviewHeader"
import { ReviewStats } from "@/components/review/ReviewStats"
import { ReviewFilters } from "@/components/review/ReviewFilters"
import { ReviewCard } from "@/components/review/ReviewCard"
import { ReviewPagination } from "@/components/review/ReviewPagination"
import { ReviewEmpty } from "@/components/review/ReviewEmpty"

import { Toast } from "@/components/review/misc/ReviewMiscUi"

/* ───────────── MOCK TEMP (à remplacer plus tard) ───────────── */

export const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    author: "Jean",
    role: "Conducteur",
    rating: 5,
    comment:
      "Très bon passager, ponctuel et agréable. Le trajet s’est déroulé dans une ambiance détendue avec une excellente communication avant et pendant le voyage. Aucun souci à signaler, je recommande vivement pour de futurs trajets sans hésitation.",
    from: "Antananarivo",
    to: "Tamatave",
    date: "2026-04-10",
    replies: ["Merci pour ton retour, c’était un plaisir !"],
  },
  {
    id: 2,
    author: "Sarah",
    role: "Passager",
    rating: 4,
    comment:
      "Trajet confortable avec une conduite très fluide. Le conducteur était à l’écoute et le véhicule propre. Petit retard au départ mais rien de très problématique. Dans l’ensemble, une expérience positive que je renouvellerais sans souci.",
    from: "Fianarantsoa",
    to: "Antsirabe",
    date: "2026-04-08",
    replies: [],
  },
  {
    id: 3,
    author: "Lucas",
    role: "Conducteur",
    rating: 3,
    comment:
      "Expérience globalement correcte. Le passager était sympathique mais il y a eu quelques soucis d’organisation au moment du départ. Rien de grave, mais cela peut être amélioré pour rendre l’expérience encore plus fluide et agréable.",
    from: "Majunga",
    to: "Antananarivo",
    date: "2026-04-06",
    replies: [],
  },
  {
    id: 4,
    author: "Paul",
    role: "Passager",
    rating: 2,
    comment:
      "Retard important sans réelle communication en amont. Le trajet s’est finalement déroulé correctement mais le manque d’information a rendu l’expérience stressante. Il serait important d’améliorer la coordination et la communication.",
    from: "Diego",
    to: "Majunga",
    date: "2026-04-05",
    replies: [],
  },
  {
    id: 5,
    author: "Haja",
    role: "Conducteur",
    rating: 5,
    comment:
      "Excellent passager, très respectueux et ponctuel. Le trajet s’est passé dans une excellente ambiance avec des échanges agréables. Je recommande fortement et je serais ravi de voyager à nouveau avec cette personne dans le futur.",
    from: "Antsirabe",
    to: "Antananarivo",
    date: "2026-04-03",
    replies: ["Merci beaucoup, à très bientôt sur la route !"],
  },
  {
    id: 6,
    author: "Mickael",
    role: "Passager",
    rating: 4,
    comment:
      "Bonne expérience globale. Le véhicule était confortable et le conducteur sympathique. Quelques petites améliorations possibles sur la ponctualité mais rien de bloquant. Je recommande pour des trajets réguliers.",
    from: "Moramanga",
    to: "Antananarivo",
    date: "2026-04-02",
    replies: [],
  },
  {
    id: 7,
    author: "Aina",
    role: "Passager",
    rating: 1,
    comment:
      "Très mauvaise expérience. Le conducteur ne s’est pas présenté au point de rendez-vous sans prévenir. Impossible de le joindre pendant plusieurs heures. Cela a complètement perturbé mon planning. Je ne recommande pas.",
    from: "Antananarivo",
    to: "Fianarantsoa",
    date: "2026-04-01",
    replies: ["Désolé pour ce problème, une urgence imprévue est survenue."],
  },
  {
    id: 8,
    author: "Rado",
    role: "Conducteur",
    rating: 5,
    comment:
      "Passager exemplaire, très respectueux et agréable durant tout le trajet. Communication fluide et ponctualité parfaite. Rien à redire, je recommande fortement pour de futurs trajets.",
    from: "Antananarivo",
    to: "Antsirabe",
    date: "2026-03-30",
    replies: [],
  },
]

/* ───────────── PAGE ───────────── */

export default function ReviewsPage() {
  const {
    paginated,
    stats,
    page,
    totalPages,
    setPage,
    search,
    setSearch,
    filter,
    setFilter,
    sort,
    setSort,
    resetFilters,
  } = useReviews(MOCK_REVIEWS)

  const [toast, setToast] = useState<string | null>(null)

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* TOAST */}
      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast(null)}
        />
      )}

      {/* HEADER */}
      <ReviewHeader
        total={stats.total}
        positiveRate={stats.positive}
      />

      {/* STATS */}
      <ReviewStats reviews={MOCK_REVIEWS} />

      {/* FILTERS */}
      <ReviewFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />

      {/* LIST */}
      {paginated.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
          {paginated.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onToast={setToast}
            />
          ))}
        </div>
      ) : (
        <ReviewEmpty onReset={resetFilters} />
      )}

      {/* PAGINATION */}
      <ReviewPagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

    </div>
  )
}