"use client"

import { Check } from "lucide-react"

interface Props {
  stepFromDone: boolean
  stepToDone: boolean
  stepRouteDone: boolean
  stepDetailsDone: boolean
}

export function CreateRideSteps({
  stepFromDone,
  stepToDone,
  stepRouteDone,
  stepDetailsDone,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">

      <StepBadge
        number={1}
        label="Choisir le trajet"
        done={stepFromDone && stepToDone}
        active={!stepFromDone || !stepToDone}
      />

      <StepBadge
        number={2}
        label="Vérifier l'itinéraire"
        done={stepRouteDone}
        active={stepFromDone && stepToDone && !stepRouteDone}
      />

      <StepBadge
        number={3}
        label="Renseigner les infos"
        done={stepDetailsDone}
        active={stepRouteDone && !stepDetailsDone}
      />

    </div>
  )
}

/* ───────────────────────────────────────────── */

function StepBadge({
  number,
  label,
  done,
  active,
}: {
  number: number
  label: string
  done: boolean
  active: boolean
}) {
  return (
    <div
      className={`p-3 rounded-xl border text-xs flex items-center gap-2 transition-colors
        ${
          done
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
            : active
            ? "bg-muted border-border font-medium text-foreground"
            : "bg-muted/30 border-border/40 text-muted-foreground"
        }`}
    >
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0
          ${
            done
              ? "bg-emerald-500 text-white"
              : active
              ? "bg-foreground text-background"
              : "bg-muted-foreground/20 text-muted-foreground"
          }`}
      >
        {done ? <Check className="w-3 h-3" /> : number}
      </span>

      <span className="leading-tight">
        {label}
      </span>
    </div>
  )
}