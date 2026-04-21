import { Badge } from "@/components/ui/badge"

export function RegisterBadge() {
  return (
    <div className="flex flex-col items-center gap-1">

      <Badge className="text-xs gap-1 px-2 py-0.5 bg-muted text-muted-foreground border">
        120 000+ utilisateurs actifs
      </Badge>

      <p className="text-[11px] text-muted-foreground text-center">
        Une communauté active basée sur des avis et expériences réelles.
      </p>

    </div>
  )
}