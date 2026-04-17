"use client"

import { Label } from "@/components/ui/label"

export const OPERATOR_STYLES: Record<string, {
  bg: string
  border: string
  text: string
  circle: string
}> = {
  "MVola": {
    bg: "bg-yellow-200",
    border: "border-yellow-500",
    text: "text-yellow-900",
    circle: "bg-yellow-300 text-yellow-900",
  },
  "Orange Money": {
    bg: "bg-orange-200",
    border: "border-orange-500",
    text: "text-orange-900",
    circle: "bg-orange-300 text-orange-900",
  },
  "Airtel Money": {
    bg: "bg-red-200",
    border: "border-red-500",
    text: "text-red-900",
    circle: "bg-red-300 text-red-900",
  },
}

interface Props {
  value: string
  onChange: (value: string) => void
}

export function OperatorSelector({ value, onChange }: Props) {

  return (
    <div className="space-y-2">
      <Label>Opérateur utilisé</Label>

      <div className="grid grid-cols-3 gap-3">
        {["MVola", "Orange Money", "Airtel Money"].map((op) => {
          const isActive = value === op
          const styles = OPERATOR_STYLES[op]

          return (
            <button
              key={op}
              type="button"
              onClick={() => onChange(op)}
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
  )
}