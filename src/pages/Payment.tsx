"use client"

import { useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
  CreditCard,
  Smartphone,
  Hash,
  Banknote,
  History,
  Info,
  Calendar,
  CheckCircle2,
  Clock,
} from "lucide-react"

export default function PaymentPage() {

  /* ───────────────────────── STATE ───────────────────────── */

  const [tokens] = useState(120)

  const [form, setForm] = useState({
    transactionId: "",
    operator: "",
    amount: "",
    note: "",
  })

  const [history] = useState([
    {
      id: "TX123456",
      operator: "MVola",
      amount: 20000,
      status: "validé",
      date: "2026-04-15",
    },
    {
      id: "TX789012",
      operator: "Orange Money",
      amount: 10000,
      status: "en attente",
      date: "2026-04-14",
    },
    {
      id: "TX345678",
      operator: "Airtel Money",
      amount: 15000,
      status: "validé",
      date: "2026-04-12",
    },
  ])

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  /* ───────────────────────── UI ───────────────────────── */

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* 🔥 HEADER FINAL — aligné ListRide */}
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

      {/* 🔥 TEXTE GLOBAL (comme ListRide) */}
      <div className="text-xs text-muted-foreground leading-relaxed space-y-2">
        <p>
          Les recharges sont simples et rapides : effectuez un paiement via votre
          service mobile, puis renseignez les informations demandées pour déclencher
          la vérification automatique. Une fois validé, votre compte est crédité en tokens que vous pouvez utiliser
          immédiatement pour réserver ou publier des trajets.
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* ───────────────── FORM ───────────────── */}
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
                {["MVola", "Orange Money", "Airtel Money"].map((op) => (
                  <button
                    key={op}
                    type="button"
                    onClick={() => handleChange("operator", op)}
                    className={`flex flex-col items-center gap-2 border rounded-xl p-3 transition
                      ${form.operator === op
                        ? "border-emerald-500 bg-emerald-50"
                        : "hover:bg-muted"
                      }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                      {op[0]}
                    </div>
                    <span className="text-xs">{op}</span>
                  </button>
                ))}
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

        {/* ───────────────── HISTORY ───────────────── */}
        <Card>
          <CardContent className="p-5 space-y-5">

            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Historique des paiements
              </span>
            </div>

            {/* 🔥 TEXTE RICHE */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Consultez vos dernières transactions pour vérifier l’état de vos paiements. Les paiements passent en <span className="font-medium text-foreground">attente</span> avant
                d’être <span className="font-medium text-foreground">validés</span> après vérification.
              </p>
            </div>

            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border p-4 flex items-center justify-between hover:bg-muted/40 transition"
                >
                  {/* LEFT */}
                  <div className="space-y-1.5">

                    {/* ID */}
                    <div className="flex items-center gap-2">
                      <Hash className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {item.id}
                      </span>
                    </div>

                    {/* Operator + Date */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Smartphone className="w-3 h-3" />
                        {item.operator}
                      </span>

                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>

                    {/* Status description */}
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      {item.status === "validé" ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          Paiement confirmé et tokens crédités
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 text-amber-500" />
                          En cours de vérification
                        </>
                      )}
                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="text-right space-y-1">

                    <p className="text-sm font-semibold">
                      {item.amount} Ar
                    </p>

                    <Badge
                      className={
                        item.status === "validé"
                          ? "bg-emerald-500 text-white"
                          : "bg-amber-500 text-white"
                      }
                    >
                      {item.status}
                    </Badge>

                  </div>

                </div>
              ))}
            </div>

            {/* 🔥 SUPPORT TEXT */}
            <div className="rounded-xl bg-muted/40 border px-4 py-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                ⚠️ Si un paiement reste en attente trop longtemps, vérifiez les
                informations saisies ou contactez le support.
              </p>
            </div>

          </CardContent>
        </Card>

      </div>

    </div>
  )
}