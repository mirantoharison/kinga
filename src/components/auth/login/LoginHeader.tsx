import { Car, Sun, Moon } from "lucide-react"

export function LoginHeader({ theme, toggle }: any) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">

      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
        <Car className="w-5 h-5 text-emerald-500" />
      </div>

      <div className="flex-1">
        <h1 className="text-sm font-semibold">Bon retour 👋</h1>

        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          Connectez-vous pour accéder à votre espace personnel, retrouver vos trajets
          en cours et gérer facilement vos réservations.
        </p>

        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          En restant actif, vous améliorez votre visibilité sur la plateforme,
          augmentez vos chances de réservation et renforcez votre réputation.
        </p>
      </div>

      <button
        onClick={toggle}
        className="w-8 h-8 rounded-lg border bg-background flex items-center justify-center"
      >
        {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
      </button>

    </div>
  )
}