import { useCallback, useEffect, useRef, useState } from "react"
import { searchLocation } from "@/lib/geocoding"
import { MIN_QUERY_LENGTH, getSearchDelay } from "@/lib/locationUtils"

export interface SearchResult {
  lat: number
  lng: number
  label: string
  type: string
}

export interface UseLocationSearchReturn {
  query: string
  setQuery: (q: string) => void
  results: SearchResult[]
  loading: boolean
  reset: () => void
}

export function useLocationSearch(): UseLocationSearchReturn {
  const [query,   setQuery]   = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (query.trim().length < MIN_QUERY_LENGTH) {
      setResults([])
      return
    }
    const delay = getSearchDelay(query.length)
    const timeout = setTimeout(async () => {
      abortRef.current?.abort()
      const ctrl = new AbortController()
      abortRef.current = ctrl
      setLoading(true)
      try {
        const res = await searchLocation(`${query}, Madagascar`)
        if (!ctrl.signal.aborted) setResults(res)
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError")
          console.error("[LocationSearch]", err)
      } finally {
        if (!ctrl.signal.aborted) setLoading(false)
      }
    }, delay)
    return () => { clearTimeout(timeout); abortRef.current?.abort() }
  }, [query])

  const reset = useCallback(() => {
    setQuery(""); setResults([]); setLoading(false)
  }, [])

  return { query, setQuery, results, loading, reset }
}