import { Car } from "lucide-react"

export function SidebarHeader() {
  return (
    <div className="px-4 py-4 border-b flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
        <Car className="w-5 h-5 text-emerald-500" />
      </div>

      <div>
        <p className="text-sm font-semibold leading-none">
          RideShare
        </p>
        <p className="text-xs text-muted-foreground">
          Réservez ou proposez vos trajets facilement
        </p>
      </div>
    </div>
  )
}