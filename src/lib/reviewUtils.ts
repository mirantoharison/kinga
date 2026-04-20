/* ───────────── TYPES ───────────── */

import { type Review, type ReviewFilter, type ReviewSort, type ReviewStats } from "../hooks/use-review"

/* ───────────── TEXT ───────────── */

export function truncateText(text: string, max = 180): string {
  if (!text) return ""
  if (text.length <= max) return text
  return text.slice(0, max) + "..."
}

/* ───────────── FILTERING ───────────── */

export function filterReviews(
  reviews: Review[],
  search: string,
  filter: ReviewFilter
): Review[] {
  let data = [...reviews]

  if (search) {
    const q = search.toLowerCase()

    data = data.filter((r) =>
      `${r.comment} ${r.from} ${r.to} ${r.author}`
        .toLowerCase()
        .includes(q)
    )
  }

  if (filter === "positive") data = data.filter((r) => r.rating >= 4)
  if (filter === "neutral") data = data.filter((r) => r.rating === 3)
  if (filter === "negative") data = data.filter((r) => r.rating <= 2)

  return data
}

/* ───────────── SORT ───────────── */

export function sortReviews(
  reviews: Review[],
  sort: ReviewSort
): Review[] {
  const data = [...reviews]

  if (sort === "recent") {
    data.sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  if (sort === "rating") {
    data.sort((a, b) => b.rating - a.rating)
  }

  return data
}

/* ───────────── STATS ───────────── */

export function computeReviewStats(reviews: Review[]): ReviewStats {
  const total = reviews.length

  const avg =
    total > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / total
        ).toFixed(1)
      : "0"

  const positive =
    total > 0
      ? Math.round(
          (reviews.filter((r) => r.rating >= 4).length / total) * 100
        )
      : 0

  const withReplies = reviews.filter(
    (r) => r.replies.length > 0
  ).length

  return { total, avg, positive, withReplies }
}

/* ───────────── PAGINATION ───────────── */

export function paginate<T>(
  data: T[],
  page: number,
  pageSize: number
): T[] {
  const start = (page - 1) * pageSize
  return data.slice(start, start + pageSize)
}