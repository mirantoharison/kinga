"use client"

import { Button } from "@/components/ui/button"

interface Props {
  page: number
  totalPages: number
  setPage: (p: number) => void
}

export function ReviewPagination({ page, totalPages, setPage }: Props) {
  if (totalPages <= 1) return null

  const getPages = () => {
    const delta = 1
    const range = []

    for (
      let i = Math.max(1, page - delta);
      i <= Math.min(totalPages, page + delta);
      i++
    ) {
      range.push(i)
    }

    return range
  }

  const pages = getPages()

  return (
    <div className="flex justify-center items-center gap-1.5 pt-4 flex-wrap">

      {/* PREVIOUS */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        ←
      </Button>

      {/* FIRST */}
      {!pages.includes(1) && (
        <>
          <Button size="sm" variant="outline" onClick={() => setPage(1)}>
            1
          </Button>
          <span className="text-xs text-muted-foreground">...</span>
        </>
      )}

      {/* RANGE */}
      {pages.map((p) => (
        <Button
          key={p}
          size="sm"
          variant={p === page ? "default" : "outline"}
          onClick={() => setPage(p)}
          className="min-w-[32px]"
        >
          {p}
        </Button>
      ))}

      {/* LAST */}
      {!pages.includes(totalPages) && (
        <>
          <span className="text-xs text-muted-foreground">...</span>
          <Button size="sm" variant="outline" onClick={() => setPage(totalPages)}>
            {totalPages}
          </Button>
        </>
      )}

      {/* NEXT */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        →
      </Button>

    </div>
  )
}