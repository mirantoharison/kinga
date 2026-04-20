"use client"

import { useState } from "react"
import {
  Mail, Lock, Eye, EyeOff, Car,
  MapPin, Users, ShieldCheck, Leaf, Star, ArrowRight, Sun, Moon
} from "lucide-react"

import { Input }     from "@/components/ui/input"
import { Button }    from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label }     from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox }  from "@/components/ui/checkbox"
import { Badge }     from "@/components/ui/badge"

const FEATURES = [
  { icon: Car,         label: "Trajets partagés",  desc: "Trouvez un trajet en quelques clics" },
  { icon: ShieldCheck, label: "Paiement sécurisé", desc: "Transactions 100% protégées"         },
  { icon: Leaf,        label: "Éco-responsable",   desc: "Réduisez votre empreinte carbone"    },
  { icon: Users,       label: "Communauté",        desc: "Des milliers de covoitureurs actifs" },
]

export default function LoginPage() {
  const [dark, setDark]                 = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm]                 = useState({ email: "", password: "", remember: false })

  const handleChange = (key: string, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
  }

  return (
    <div className="relative w-full max-w-[360px] flex flex-col items-center gap-5">

      {/* THEME TOGGLE */}
      <button
        onClick={toggleDark}
        className="absolute -top-2 right-0 z-10 w-8 h-8 rounded-full flex items-center justify-center
          border border-neutral-200 dark:border-neutral-700
          bg-white dark:bg-neutral-800
          text-neutral-500 dark:text-neutral-400
          hover:text-neutral-800 dark:hover:text-white
          shadow-sm transition-colors"
      >
        {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
      </button>

      {/* BRAND */}
      <div className="flex flex-col items-center gap-2 pt-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md">
          <Car className="w-5 h-5 text-white" />
        </div>

        <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          CovoitGo
        </span>

        {/* FIX BADGE */}
        <Badge className="text-[10px] gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800">
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          4.9 · 120 000+ trajets effectués
        </Badge>
      </div>

      {/* INTRO */}
      <div className="text-center space-y-1">
        <h1 className="text-base font-semibold text-neutral-900 dark:text-white">
          Bon retour 👋
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Connectez-vous pour accéder à vos trajets, gérer vos réservations
          et communiquer avec d'autres utilisateurs.
        </p>
      </div>

      {/* LOGIN CARD */}
      <Card className="w-full shadow-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <CardHeader className="space-y-0.5 text-center pb-2 pt-5">
          <CardTitle className="text-sm font-semibold text-neutral-900 dark:text-white">
            Connexion à votre compte
          </CardTitle>
          <CardDescription className="text-[11px] text-neutral-500 dark:text-neutral-400">
            Entrez vos identifiants pour continuer
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3.5 px-5 pb-5">

          {/* EMAIL */}
          <div className="space-y-1">
            <Label className="text-[11px] font-medium flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
              <Mail className="w-3 h-3 text-emerald-500" />
              Adresse email
            </Label>
            <Input
              className="h-8 text-xs placeholder:text-[11px] placeholder:text-neutral-400 dark:placeholder:text-neutral-600
              dark:bg-neutral-800 dark:border-neutral-700 dark:text-white
              focus-visible:ring-emerald-500 focus-visible:ring-1 focus-visible:ring-offset-0"
              type="email"
              placeholder="vous@email.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-[11px] font-medium flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                <Lock className="w-3 h-3 text-emerald-500" />
                Mot de passe
              </Label>
              <button className="text-[10px] text-emerald-600 hover:underline">
                Mot de passe oublié ?
              </button>
            </div>

            <div className="relative">
              <Input
                className="h-8 text-xs pr-8 placeholder:text-[11px] placeholder:text-neutral-400 dark:placeholder:text-neutral-600
                dark:bg-neutral-800 dark:border-neutral-700 dark:text-white
                focus-visible:ring-emerald-500 focus-visible:ring-1 focus-visible:ring-offset-0"
                type={showPassword ? "text" : "password"}
                placeholder="Votre mot de passe"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* REMEMBER */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={form.remember}
              onCheckedChange={(val) => handleChange("remember", val)}
            />
            <label htmlFor="remember" className="text-[11px] text-neutral-500 dark:text-neutral-400 cursor-pointer">
              Se souvenir de moi sur cet appareil
            </label>
          </div>

          {/* LOGIN */}
          <Button className="w-full h-8 text-xs bg-emerald-500 hover:bg-emerald-600 text-white gap-1.5 shadow-sm">
            Se connecter
            <ArrowRight className="w-3 h-3" />
          </Button>

          {/* SEPARATOR */}
          <div className="flex items-center gap-2">
            <Separator className="flex-1 bg-neutral-200 dark:bg-neutral-800" />
            <span className="text-[10px] text-neutral-400 dark:text-neutral-600">
              ou continuer avec
            </span>
            <Separator className="flex-1 bg-neutral-200 dark:bg-neutral-800" />
          </div>

          {/* SOCIAL */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { src: "https://www.svgrepo.com/show/475656/google-color.svg",  label: "Google"   },
              { src: "https://cdn.simpleicons.org/apple/000000",               label: "Apple"    },
              { src: "https://www.svgrepo.com/show/475647/facebook-color.svg", label: "Facebook" },
            ].map(({ src, label }) => (
              <Button
                key={label}
                variant="outline"
                className="h-8 text-[11px] flex items-center justify-center gap-1.5
                  bg-white dark:bg-neutral-800
                  border-neutral-200 dark:border-neutral-700
                  hover:bg-neutral-50 dark:hover:bg-neutral-700
                  text-neutral-700 dark:text-neutral-200"
              >
                <img src={src} className="w-3 h-3" alt={label} />
                {label}
              </Button>
            ))}
          </div>

          {/* SIGNUP */}
          <p className="text-center text-[11px] text-neutral-500 dark:text-neutral-400">
            Pas encore de compte ?{" "}
            <button className="text-emerald-600 hover:underline font-medium">
              Créer un compte gratuitement
            </button>
          </p>

        </CardContent>
      </Card>

      {/* FEATURES */}
      <div className="w-full grid grid-cols-2 gap-2">
        {FEATURES.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="flex items-start gap-2 rounded-xl p-2.5 shadow-sm
              border border-neutral-200 dark:border-neutral-800
              bg-white dark:bg-neutral-900"
          >
            <div className="mt-0.5 w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center shrink-0">
              <Icon className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-100">{label}</p>
              <p className="text-[10px] text-neutral-400 dark:text-neutral-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* TRUST */}
      <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-400 dark:text-neutral-600">
        <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-500" />Données chiffrées</span>
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-500" />Trajets vérifiés</span>
        <span className="flex items-center gap-1"><Leaf className="w-3 h-3 text-emerald-500" />RGPD</span>
      </div>

      {/* LEGAL */}
      <p className="text-[10px] text-center text-neutral-400 dark:text-neutral-600 pb-4">
        En vous connectant, vous acceptez nos{" "}
        <button className="underline hover:opacity-80">CGU</button>{" "}
        et notre{" "}
        <button className="underline hover:opacity-80">Politique de confidentialité</button>.
      </p>

    </div>
  )
}