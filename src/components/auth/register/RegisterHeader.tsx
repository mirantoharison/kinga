import { Car, Sun, Moon } from "lucide-react"

export function RegisterHeader({ theme, toggle }: any) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">

      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
        <Car className="w-5 h-5 text-emerald-500" />
      </div>

      <div className="flex-1">
        <h1 className="text-sm font-semibold">
          Créez votre compte
        </h1>

        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          Rejoignez la plateforme pour proposer vos trajets, réserver facilement
          et interagir avec une communauté active et fiable. Une fois inscrit, vous pourrez publier vos trajets, recevoir des réservations
          et améliorer votre visibilité.
        </p>
      </div>

      <button
        onClick={toggle}
        className="w-8 h-8 rounded-lg border bg-background flex items-center justify-center"
      >
        {theme === "dark"
          ? <Sun className="w-3.5 h-3.5" />
          : <Moon className="w-3.5 h-3.5" />}
      </button>

    </div>
  )
}