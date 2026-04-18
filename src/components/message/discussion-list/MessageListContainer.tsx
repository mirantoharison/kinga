"use client"

import { MessageCard } from "@/components/message/card/MessageListCard"

interface Props {
  conversations: any[]

  selected: number[]
  toggleSelect: (id: number) => void

  markOneRead: (id: number) => void

  navigate: (path: string) => void

  search: string
}

export function MessagesList({
  conversations,
  selected,
  toggleSelect,
  markOneRead,
  navigate,
  search,
}: Props) {

  return (
    <div className="space-y-4">

      {/* 🧾 HEADER LIST */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {conversations.length} conversation{conversations.length > 1 ? "s" : ""} affichée{conversations.length > 1 ? "s" : ""}
          {search ? ` pour « ${search} »` : ""}
        </p>

        {selected.length === 0 && (
          <p className="text-[11px] text-muted-foreground">
            Cochez une carte pour la sélectionner
          </p>
        )}
      </div>

      {/* ❌ EMPTY STATE */}
      {conversations.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Aucune conversation trouvée.
        </div>
      )}

      {/* 📦 LIST */}
      {conversations.map((conv) => (
        <MessageCard
          key={conv.id}
          conv={conv}
          isSelected={selected.includes(conv.id)}
          toggleSelect={toggleSelect}
          markOneRead={markOneRead}
          navigate={navigate}
          multiSelect={selected.length > 0}
        />
      ))}

    </div>
  )
}