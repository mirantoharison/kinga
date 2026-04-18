import { useState, useMemo } from "react"

export interface Conversation {
  id: number
  from: string
  to: string
  date: string
  time: string
  distance: number
  duration: string
  price: number
  priceStatus: string
  status: "pending" | "confirmed" | "discussion" | "archived"
  urgency?: string
  lastMessage: string
  unread: number
  user: string
  role: string
  rating: number
  archived?: boolean
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    from: "Antananarivo", to: "Tamatave",
    date: "17 Avr 2026", time: "08:30",
    distance: 320, duration: "6h30",
    price: 12000, priceStatus: "proposé",
    status: "pending", urgency: "Départ proche",
    lastMessage: "Offre envoyée, en attente de réponse.",
    unread: 2, user: "Rakoto", role: "Conducteur", rating: 4.8,
  },
  {
    id: 2,
    from: "Antananarivo", to: "Majunga",
    date: "19 Avr 2026", time: "06:00",
    distance: 560, duration: "9h",
    price: 20000, priceStatus: "accepté",
    status: "confirmed",
    lastMessage: "Parfait, on se retrouve au départ à 6h.",
    unread: 0, user: "Hery", role: "Conducteur", rating: 4.6,
  },
  {
    id: 3,
    from: "Fianarantsoa", to: "Antananarivo",
    date: "20 Avr 2026", time: "07:00",
    distance: 410, duration: "7h",
    price: 15000, priceStatus: "en négociation",
    status: "discussion", urgency: "Départ demain",
    lastMessage: "Est-ce que 13 000 Ar ça vous convient ?",
    unread: 5, user: "Voahirana", role: "Passagère", rating: 4.9,
  },
  {
    id: 4,
    from: "Antananarivo", to: "Fort-Dauphin",
    date: "22 Avr 2026", time: "05:30",
    distance: 980, duration: "14h",
    price: 35000, priceStatus: "proposé",
    status: "pending",
    lastMessage: "Bonjour, est-ce que le trajet est direct ?",
    unread: 1, user: "Tiana", role: "Conducteur", rating: 4.4,
  },
  {
    id: 5,
    from: "Toliara", to: "Antananarivo",
    date: "25 Avr 2026", time: "04:00",
    distance: 950, duration: "13h",
    price: 30000, priceStatus: "confirmé",
    status: "confirmed",
    lastMessage: "Merci, à bientôt pour le trajet !",
    unread: 0, user: "Lanto", role: "Passager", rating: 5.0,
  },
  {
    id: 6,
    from: "Antananarivo", to: "Diego-Suarez",
    date: "28 Avr 2026", time: "05:00",
    distance: 1140, duration: "17h",
    price: 42000, priceStatus: "refusé",
    status: "discussion", urgency: "Prix contesté",
    lastMessage: "Je ne peux pas descendre en dessous de 40 000 Ar.",
    unread: 3, user: "Miora", role: "Conductrice", rating: 4.7,
  },
]

export function useMessages() {
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<number[]>([])
  const [sort, setSort] = useState<"recent" | "unread" | "price">("recent")
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "unread">("all")

  const stats = useMemo(() => ({
    total: conversations.filter(c => !c.archived).length,
    unread: conversations.filter(c => !c.archived).reduce((a, c) => a + c.unread, 0),
    confirmed: conversations.filter(c => !c.archived && c.status === "confirmed").length,
    pending: conversations.filter(c => !c.archived && c.status === "pending").length,
  }), [conversations])

  const filtered = useMemo(() => {
    let data = conversations.filter(c => !c.archived)

    if (search) {
      const q = search.toLowerCase()
      data = data.filter(c =>
        c.from.toLowerCase().includes(q) ||
        c.to.toLowerCase().includes(q) ||
        c.user.toLowerCase().includes(q)
      )
    }

    if (filter === "pending") data = data.filter(c => c.status === "pending")
    if (filter === "confirmed") data = data.filter(c => c.status === "confirmed")
    if (filter === "unread") data = data.filter(c => c.unread > 0)

    if (sort === "unread") data.sort((a, b) => b.unread - a.unread)
    else if (sort === "price") data.sort((a, b) => b.price - a.price)

    return data
  }, [conversations, search, filter, sort])

  const toggleSelect = (id: number) =>
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  const clearSelection = () => setSelected([])

  const markOneRead = (id: number) =>
    setConversations(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c))

  const markSelectedRead = () => {
    setConversations(prev => prev.map(c => selected.includes(c.id) ? { ...c, unread: 0 } : c))
    clearSelection()
  }

  const archiveSelected = () => {
    setConversations(prev => prev.map(c => selected.includes(c.id) ? { ...c, archived: true } : c))
    clearSelection()
  }

  const deleteSelected = () => {
    setConversations(prev => prev.filter(c => !selected.includes(c.id)))
    clearSelection()
  }

  return {
    search, setSearch,
    selected, toggleSelect, clearSelection,
    sort, setSort,
    filter, setFilter,
    stats,
    filtered,
    markOneRead,
    markSelectedRead,
    archiveSelected,
    deleteSelected,
  }
}