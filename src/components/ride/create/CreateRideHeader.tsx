import { Route } from "lucide-react";

export function CreateRideHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
        <Route className="w-5 h-5 text-emerald-500" />
      </div>

      <div>
        <h1 className="text-base font-semibold">
          Publier un trajet
        </h1>
        <p className="text-xs text-muted-foreground">
          Remplissez les étapes pour publier rapidement votre trajet
        </p>
      </div>
    </div>
  )
}