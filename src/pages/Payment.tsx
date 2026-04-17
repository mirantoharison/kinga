"use client"

import { useState } from "react"

import { PaymentHeader } from "@/components/payment/PaymentHeader"
import { PaymentInfo } from "@/components/payment/PaymentInfo"
import { PaymentForm } from "@/components/payment/PaymentForm"
import { PaymentHistory } from "@/components/payment/PaymentHistory"

import { OPERATOR_STYLES } from "@/components/payment/OperatorSelector"
import { type HistoryItem } from "@/components/payment/PaymentHistory"

export default function PaymentPage() {

  /* ───────────────────────── STATE ───────────────────────── */

  const [tokens] = useState(120)

  const [form, setForm] = useState({
    transactionId: "",
    operator: "",
    amount: "",
    note: "",
  })

  const [history] = useState<HistoryItem[]>([
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

      {/* HEADER */}
      <PaymentHeader tokens={tokens} />

      {/* TEXTE GLOBAL */}
      <PaymentInfo />

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* FORM */}
        <PaymentForm
          form={form}
          handleChange={handleChange}
          OPERATOR_STYLES={OPERATOR_STYLES}
        />

        {/* HISTORY */}
        <PaymentHistory
          history={history}
        />

      </div>

    </div>
  )
}