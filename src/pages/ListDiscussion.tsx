"use client"

import { useNavigate } from "react-router-dom"

import { useMessages } from "@/hooks/use-message"

import { MessagesHeader } from "@/components/message/discussion-list/MessageHeader"
import { MessagesStats } from "@/components/message/discussion-list/MessageStats"
import { MessagesFilters } from "@/components/message/discussion-list/MessageFilters"
import { MessagesBulkActions } from "@/components/message/discussion-list/MessageBulkActions"
import { MessagesList } from "@/components/message/discussion-list/MessageListContainer"

export default function MessagesListPage() {
  const navigate = useNavigate()

  const {
    search,
    setSearch,
    selected,
    toggleSelect,
    clearSelection,
    sort,
    setSort,
    filter,
    setFilter,
    stats,
    filtered,
    markOneRead,
    markSelectedRead,
    archiveSelected,
    deleteSelected,
  } = useMessages()

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* 🧾 HEADER */}
      <MessagesHeader count={filtered.length} />

      {/* 📊 STATS */}
      <MessagesStats stats={stats} />

      {/* 🔍 FILTERS */}
      <MessagesFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />

      {/* ⚡ BULK ACTIONS */}
      <MessagesBulkActions
        selected={selected}
        markSelectedRead={markSelectedRead}
        archiveSelected={archiveSelected}
        deleteSelected={deleteSelected}
        clearSelection={clearSelection}
      />

      {/* 📦 LIST */}
      <MessagesList
        conversations={filtered}
        selected={selected}
        toggleSelect={toggleSelect}
        markOneRead={markOneRead}
        navigate={navigate}
        search={search}
      />

    </div>
  )
}