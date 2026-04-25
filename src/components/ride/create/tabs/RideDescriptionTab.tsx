// /components/ride/create/tabs/DescriptionTab.tsx

import {
  Clock,
  Zap,
  Luggage,
  Package,
  Shuffle,
  Volume2,
  FileText,
} from "lucide-react"

import { RideDescription } from "@/components/ride/create/RideDescription"
import { TabHeader } from "@/components/ride/create/RideTabHeader"

type Props = {
  description: string
  setField: (key: string, value: string) => void
}

const SUGGESTIONS = [
  { label: "Départ tôt le matin", icon: Clock },
  { label: "Trajet urgent", icon: Zap },
  { label: "Voyage léger", icon: Luggage },
  { label: "Bagage volumineux", icon: Package },
  { label: "Flexible sur l’horaire", icon: Shuffle },
  { label: "Préférence pour un trajet calme", icon: Volume2 },
]

export function DescriptionTab({ description, setField }: Props) {
  const handleAddSuggestion = (label: string) => {
    const value = description
      ? `${description}, ${label}`
      : label

    setField("description", value)
  }

  return (
    <div className="space-y-6 border border-border rounded-lg p-5 bg-card">

      {/* HEADER */}
      <TabHeader
        icon={FileText}
        title="Présentation du trajet"
        description="Expliquez votre besoin et vos attentes pour aider les conducteurs à mieux comprendre votre demande et proposer une solution adaptée."
      />

      {/* EMPTY STATE */}
      {!description && (
        <div className="rounded-md border border-border bg-muted/50 p-3">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Vous pouvez utiliser cet espace pour donner plus de contexte à votre trajet et éviter toute ambiguïté.
            Par exemple, vous pouvez préciser si votre départ est flexible ou dépend d’un horaire précis,
            indiquer si vous transportez des bagages ou du matériel particulier, ou encore mentionner
            le niveau d’urgence de votre déplacement.
          </p>

          <p className="text-[11px] text-muted-foreground leading-relaxed mt-2">
            Ces informations ne sont pas obligatoires, mais elles permettent aux conducteurs de mieux comprendre votre demande
            et d’augmenter vos chances de recevoir rapidement une proposition adaptée.
          </p>
        </div>
      )}

      {/* SUGGESTIONS */}
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => handleAddSuggestion(label)}
            className="
              flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full
              border border-border
              text-muted-foreground
              hover:bg-muted transition
            "
          >
            <Icon className="w-3 h-3 text-muted-foreground" />
            {label}
          </button>
        ))}
      </div>

      {/* INPUT */}
      <RideDescription
        description={description}
        onChange={(value) => setField("description", value)}
      />

      {/* FOOTER */}
      {description && (
        <p className="text-[11px] text-muted-foreground leading-relaxed border-t border-border pt-3">
          Une description claire et détaillée permet aux conducteurs d’évaluer plus facilement votre demande,
          de mieux anticiper les conditions du trajet et d’y répondre de manière plus pertinente.
        </p>
      )}

    </div>
  )
}