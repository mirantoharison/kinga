"use client"

import { CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Props {
  tokens: number
}

export function PaymentHeader({ tokens }: Props) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">

      {/* ICON */}
      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
        <CreditCard className="w-5 h-5 text-emerald-500" />
      </div>

      {/* CONTENT */}
      <div className="flex-1">

        <h1 className="text-lg font-semibold">
          Gérer mes paiements
        </h1>

        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          Cette page vous permet de recharger votre compte via mobile banking
          et de suivre l’état de vos transactions. Après chaque paiement,
          saisissez le code de transaction afin de permettre la vérification
          automatique et l’ajout de tokens à votre solde. L’interface vous
          guide pour garantir une validation rapide et fiable.
        </p>

      </div>

      {/* BADGE */}
      <Badge className="bg-emerald-50 text-emerald-600 border">
        {tokens} tokens
      </Badge>

    </div>
  )
}