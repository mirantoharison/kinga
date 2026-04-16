import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowUpDown, ArrowLeftRight, CircleDot, Sigma, Info } from "lucide-react"

interface Props {
  latitude?: number
  longitude?: number
  accuracy?: number
  sampleCount: number
}

function AccuracyBadge({ accuracy }: { accuracy?: number }) {
  if (accuracy == null) return null
  const level =
    accuracy < 10 ? { label: "Excellente", color: "text-emerald-600 bg-emerald-50 border-emerald-200" }
    : accuracy < 30 ? { label: "Bonne", color: "text-blue-600 bg-blue-50 border-blue-200" }
    : accuracy < 100 ? { label: "Moyenne", color: "text-amber-600 bg-amber-50 border-amber-200" }
    : { label: "Faible", color: "text-red-600 bg-red-50 border-red-200" }

  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${level.color}`}>
      {level.label}
    </span>
  )
}

export function GpsInputs({ latitude, longitude, accuracy, sampleCount }: Props) {
  const rows = [
    {
      icon: <ArrowUpDown className="w-4 h-4 text-emerald-500 shrink-0" />,
      label: "Latitude",
      value: latitude?.toFixed(6) ?? "",
      hint: "Coordonnée nord/sud (−90° à +90°)",
    },
    {
      icon: <ArrowLeftRight className="w-4 h-4 text-emerald-500 shrink-0" />,
      label: "Longitude",
      value: longitude?.toFixed(6) ?? "",
      hint: "Coordonnée est/ouest (−180° à +180°)",
    },
    {
      icon: <CircleDot className="w-4 h-4 text-emerald-500 shrink-0" />,
      label: "Précision",
      value: accuracy != null ? `± ${Math.round(accuracy)} m` : "",
      hint: "Rayon d'incertitude autour de la position",
      extra: <AccuracyBadge accuracy={accuracy} />,
    },
    {
      icon: <Sigma className="w-4 h-4 text-emerald-500 shrink-0" />,
      label: "Échantillons",
      value: sampleCount > 0 ? `${sampleCount} mesure${sampleCount > 1 ? "s" : ""} moyennées` : "",
      hint: "Nombre de relevés GPS utilisés pour calculer la moyenne",
      extra: sampleCount > 0 ? (
        <div className="flex gap-0.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${i < sampleCount ? "bg-emerald-500" : "bg-muted"}`}
            />
          ))}
        </div>
      ) : null,
    },
  ]

  return (
    <TooltipProvider>
      <Card className="rounded-2xl shadow-none border-border/50">
        <CardContent className="p-0">
          {rows.map((row, i) => (
            <div key={row.label}>
              {i > 0 && <Separator className="mx-4" />}
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/8 shrink-0">
                  {row.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                      {row.label}
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3 h-3 text-muted-foreground/50 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs max-w-48">
                        {row.hint}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Input
                      readOnly
                      value={row.value}
                      placeholder="En attente…"
                      className="border-none shadow-none p-0 h-auto text-sm font-mono font-medium focus-visible:ring-0 bg-transparent w-auto flex-1 min-w-0"
                    />
                    {row.extra}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}