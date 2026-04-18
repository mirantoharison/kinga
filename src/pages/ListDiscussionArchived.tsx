"use client"

import { useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useMessages } from "@/hooks/use-message"

import { MessagesBulkActions } from "@/components/message/discussion-list/MessageBulkActions"
import { MessagesList } from "@/components/message/discussion-list/MessageListContainer"

import { MessagesArchivedHeader } from "@/components/message/discussion-archived-list/ArchivedHeader"
import { MessagesArchivedFilters } from "@/components/message/discussion-archived-list/ArchivedFilters"

export default function MessagesArchivedPage() {
  const navigate = useNavigate()

  const {
    search,
    setSearch,
    selected,
    toggleSelect,
    clearSelection,
    sort,
    setSort,
    setFilter,
    filtered,
    markOneRead,
    markSelectedRead,
    archiveSelected,
    deleteSelected,
  } = useMessages()

  // ✅ IMPORTANT : reset des filtres pour éviter incohérences UX
  useEffect(() => {
    setFilter("all")
  }, [setFilter])

  // ✅ filtre archivés uniquement
  const archivedFiltered = useMemo(
    () => filtered.filter((m) => m.status === "archived"),
    [filtered]
  )

  // ✅ sécurisation : sélection uniquement dans les archivés
  const safeSelected = useMemo(
    () => selected.filter((id) =>
      archivedFiltered.some((m) => m.id === id)
    ),
    [selected, archivedFiltered]
  )

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <MessagesArchivedHeader count={archivedFiltered.length} />

      {/* FILTERS */}
      <MessagesArchivedFilters
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      {/* BULK ACTIONS */}
      {safeSelected.length > 0 && (
        <MessagesBulkActions
          selected={safeSelected}
          markSelectedRead={markSelectedRead}
          archiveSelected={archiveSelected}
          deleteSelected={deleteSelected}
          clearSelection={clearSelection}
        />
      )}

      {/* LIST */}
      <MessagesList
        conversations={archivedFiltered}
        selected={safeSelected}
        toggleSelect={toggleSelect}
        markOneRead={markOneRead}
        navigate={navigate}
        search={search}
      />

    </div>
  )
}