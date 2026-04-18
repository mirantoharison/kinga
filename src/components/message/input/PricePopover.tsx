"use client"

import { useState } from "react"
import { DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

export function PricePopover({ push }: any) {
  const [priceOpen, setPriceOpen] = useState(false)
  const [priceInput, setPriceInput] = useState("")

  const sendPrice = () => {
    if (!priceInput) return
    push({
      sender: "me",
      type: "price",
      price: Number(priceInput),
      status: "pending",
    })
    setPriceInput("")
    setPriceOpen(false)
  }

  return (
    <Popover open={priceOpen} onOpenChange={setPriceOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline">
          <DollarSign className="w-4 h-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-4 space-y-3">
        <div>
          <p className="text-sm font-semibold">Proposer un prix</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
            Indiquez le montant que vous souhaitez payer par place. Le conducteur pourra examiner votre proposition et choisir de l’accepter ou de la refuser.
          </p>
        </div>

        <Input
          type="number"
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
          placeholder="Montant"
        />

        <Button size="sm" className="w-full" onClick={sendPrice}>
          Envoyer
        </Button>
      </PopoverContent>
    </Popover>
  )
}