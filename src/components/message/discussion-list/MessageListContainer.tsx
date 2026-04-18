"use client"

import { MessageCircleOff } from "lucide-react"
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

  const isEmpty = conversations.length === 0

  return (
    <div className="space-y-4">

      {/* HEADER LIST */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {conversations.length} conversation{conversations.length > 1 ? "s" : ""} affichée{conversations.length > 1 ? "s" : ""}
          {search ? ` pour « ${search} »` : ""}
        </p>

        {selected.length === 0 && !isEmpty && (
          <p className="text-[11px] text-muted-foreground">
            Cochez une carte pour la sélectionner
          </p>
        )}
      </div>

      {/* EMPTY STATE */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-dashed bg-muted/20">

          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
            <MessageCircleOff className="w-5 h-5 text-muted-foreground" />
          </div>

          {/* Title */}
          <p className="text-sm font-medium text-foreground">
            Aucune conversation à afficher
          </p>

          {/* Description */}
          <p className="text-xs text-muted-foreground mt-1 max-w-[340px] leading-relaxed">
            {search
              ? "Aucune conversation ne correspond à votre recherche actuelle. Il est possible que les termes utilisés soient trop précis ou que les résultats soient filtrés. Vous pouvez essayer de modifier le mot-clé, ajuster les filtres ou élargir votre recherche pour retrouver des discussions pertinentes."
              : "Aucune conversation n’est disponible pour le moment. Cette section affichera automatiquement vos échanges dès que vous commencerez à discuter avec d’autres utilisateurs. Selon le contexte, cela peut inclure vos messages récents ou des conversations mises de côté pour consultation ultérieure."}
          </p>

        </div>
      )}

      {/* 📦 LIST */}
      {!isEmpty && conversations.map((conv) => (
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