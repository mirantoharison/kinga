import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowUpDown, ArrowLeftRight, CircleDot, Sigma } from "lucide-react"

interface Props {
  latitude?: number
  longitude?: number
  accuracy?: number
  sampleCount: number
}

export function GpsInputs({ latitude, longitude, accuracy, sampleCount }: Props) {
  const rows = [
    {
      icon: <ArrowUpDown className="w-4 h-4 text-emerald-500 shrink-0" />,
      label: "Latitude",
      value: latitude?.toFixed(6) ?? "",
    },
    {
      icon: <ArrowLeftRight className="w-4 h-4 text-emerald-500 shrink-0" />,
      label: "Longitude",
      value: longitude?.toFixed(6) ?? "",
    },
    {
      icon: <CircleDot className="w-4 h-4 text-emerald-500 shrink-0" />,
      label: "Précision",
      value: accuracy != null ? `± ${Math.round(accuracy)} m` : "",
    },
    {
      icon: <Sigma className="w-4 h-4 text-emerald-500 shrink-0" />,
      label: "Échantillons",
      value: sampleCount > 0 ? `${sampleCount} mesure${sampleCount > 1 ? "s" : ""} moyennées` : "",
    },
  ]

  return (
    <Card className="mx-4 rounded-2xl shadow-none border-border/50">
      <CardContent className="p-0">
        {rows.map((row, i) => (
          <div key={row.label}>
            {i > 0 && <Separator className="mx-4" />}
            <div className="flex items-center gap-3 px-4 py-3">
              {row.icon}
              <div className="flex-1 min-w-0">
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  {row.label}
                </Label>
                <Input
                  readOnly
                  value={row.value}
                  placeholder="En attente..."
                  className="border-none shadow-none p-0 h-auto text-sm font-mono font-medium focus-visible:ring-0 bg-transparent"
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}