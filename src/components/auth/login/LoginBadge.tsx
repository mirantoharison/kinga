import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export function LoginBadge() {
  return (
    <div className="flex flex-col items-center gap-1">

      <Badge className="text-xs gap-1 px-2 py-0.5 bg-muted text-muted-foreground border">
        <Star className="w-3 h-3" />
        4.9 · 120 000+ trajets effectués
      </Badge>

      <p className="text-[11px] text-muted-foreground text-center">
        Une communauté active et fiable, basée sur des avis vérifiés.
      </p>

    </div>
  )
}