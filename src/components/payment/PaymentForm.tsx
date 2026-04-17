"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
  Smartphone,
  Hash,
  Banknote,
  Info,
} from "lucide-react"

interface Props {
  form: {
    transactionId: string
    operator: string
    amount: string
    note: string
  }
  handleChange: (key: string, value: string) => void
  OPERATOR_STYLES: Record<string, {
    bg: string
    border: string
    text: string
    circle: string
  }>
}

export function PaymentForm({
  form,
  handleChange,
  OPERATOR_STYLES,
}: Props) {

  return (
    <Card>
      <CardContent className="p-5 space-y-5">

        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Nouveau paiement
          </span>
        </div>

        {/* 🔥 EXPLICATION RICHE */}
        <div className="rounded-xl bg-muted/40 border px-4 py-3 space-y-2">
          <p className="text-xs font-medium flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-500" />
            Comment fonctionne la recharge ?
          </p>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Effectuez votre paiement via votre application mobile (MVola,
            Orange Money, Airtel Money…), puis saisissez le code de transaction.
            Ce code nous permet d’identifier et de valider votre paiement.
          </p>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Une fois soumis, votre paiement est vérifié. La validation est
            généralement rapide mais peut prendre quelques minutes.
          </p>
        </div>

        {/* Transaction */}
        <div className="space-y-2">
          <Label>Code de transaction</Label>
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4" />
            <Input
              placeholder="Ex: MP230498234"
              value={form.transactionId}
              onChange={(e) => handleChange("transactionId", e.target.value)}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Code unique fourni après votre paiement.
          </p>
        </div>

        {/* Operateurs */}
        <div className="space-y-2">
          <Label>Opérateur utilisé</Label>

          <div className="grid grid-cols-3 gap-3">
            {["MVola", "Orange Money", "Airtel Money"].map((op) => {
              const isActive = form.operator === op
              const styles = OPERATOR_STYLES[op]

              return (
                <button
                  key={op}
                  type="button"
                  onClick={() => handleChange("operator", op)}
                  className={`flex flex-col items-center gap-2 border rounded-xl p-3 transition active:scale-95
                    ${isActive
                      ? `${styles.bg} ${styles.border} ${styles.text}`
                      : "hover:bg-muted text-foreground"
                    }
                  `}
                >
                  {/* Logo / circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold
                      ${isActive
                        ? styles.circle
                        : "bg-muted text-muted-foreground"
                      }
                    `}
                  >
                    {op[0]}
                  </div>

                  {/* Label */}
                  <span className="text-xs font-medium">
                    {op}
                  </span>

                </button>
              )
            })}
          </div>

          <p className="text-xs text-muted-foreground">
            Sélectionnez le service utilisé pour le paiement.
          </p>
        </div>

        {/* Montant */}
        <div className="space-y-2">
          <Label>Montant payé</Label>
          <div className="flex items-center gap-2">
            <Banknote className="w-4 h-4" />
            <Input
              type="number"
              placeholder="Ex: 20000"
              value={form.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Le montant doit correspondre au paiement effectué.
          </p>
        </div>

        {/* Note */}
        <div className="space-y-2">
          <Label>Note (optionnel)</Label>
          <Textarea
            placeholder="Ajoutez un détail si nécessaire..."
            value={form.note}
            onChange={(e) => handleChange("note", e.target.value)}
          />
        </div>

        {/* 🔥 WARNING UX */}
        <div className="rounded-xl border px-4 py-3 bg-muted/30">
          <p className="text-xs text-muted-foreground leading-relaxed">
            💡 Vérifiez vos informations avant validation. Une erreur dans le code
            ou le montant peut retarder le traitement de votre paiement.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">
          <Button variant="outline">Annuler</Button>
          <Button>Valider le paiement</Button>
        </div>

      </CardContent>
    </Card>
  )
}