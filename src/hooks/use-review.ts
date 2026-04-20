"use client"

import { useMemo, useState } from "react"

/* ───────────── TYPES ───────────── */

export type ReviewRole = "Conducteur" | "Passager"

export interface Review {
  id: number
  author: string
  role: ReviewRole
  rating: number
  comment: string
  from: string
  to: string
  date: string
  replies: string[]
}

export type ReviewFilter = "all" | "positive" | "neutral" | "negative"
export type ReviewSort = "recent" | "rating"

export interface ReviewStats {
  total: number
  avg: string
  positive: number
  withReplies: number
}

/* ───────────── HOOK ───────────── */

export function useReviews(initialReviews: Review[]) {
  const [reviews] = useState<Review[]>(initialReviews)

  const [search, setSearch] = useState<string>("")
  const [filter, setFilter] = useState<ReviewFilter>("all")
  const [sort, setSort] = useState<ReviewSort>("recent")
  const [page, setPage] = useState<number>(1)

  const PAGE_SIZE = 4

  /* ───────────── FILTERING ───────────── */

  const filtered = useMemo(() => {
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
  }, [reviews, search, filter, sort])

  /* ───────────── STATS ───────────── */

  const stats: ReviewStats = useMemo(() => {
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
  }, [reviews])

  /* ───────────── PAGINATION ───────────── */

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

  const paginated = useMemo(() => {
    return filtered.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    )
  }, [filtered, page])

  /* ───────────── ACTIONS ───────────── */

  const resetFilters = () => {
    setSearch("")
    setFilter("all")
    setSort("recent")
    setPage(1)
  }

  const safeSetPage = (p: number) => {
    if (p < 1 || p > totalPages) return
    setPage(p)
  }

  const setSearchSafe = (v: string) => {
    setSearch(v)
    setPage(1)
  }

  const setFilterSafe = (v: ReviewFilter) => {
    setFilter(v)
    setPage(1)
  }

  const setSortSafe = (v: ReviewSort) => {
    setSort(v)
    setPage(1)
  }

  /* ───────────── RETURN ───────────── */

  return {
    reviews,
    filtered,
    paginated,

    stats,

    page,
    totalPages,
    setPage: safeSetPage,

    search,
    filter,
    sort,

    setSearch: setSearchSafe,
    setFilter: setFilterSafe,
    setSort: setSortSafe,

    resetFilters,
  }
}