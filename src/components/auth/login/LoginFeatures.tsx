import { Car, ShieldCheck, Leaf, Star } from "lucide-react"

export function LoginFeatures() {
  const items = [
    { icon: Car, label: "Trajets", desc: "Trouvez rapidement un trajet adapté à vos besoins" },
    { icon: ShieldCheck, label: "Sécurité", desc: "Transactions et données protégées" },
    { icon: Leaf, label: "Écologique", desc: "Réduisez votre impact environnemental" },
    { icon: Star, label: "Communauté", desc: "Basée sur des avis réels" },
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map(({ icon: Icon, label, desc }) => (
        <div key={label} className="flex gap-2 rounded-xl p-3 bg-muted/30 hover:bg-muted/50">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Icon className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs font-medium">{label}</p>
            <p className="text-[10px] text-muted-foreground">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}