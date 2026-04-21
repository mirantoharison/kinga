"use client"

import { useState } from "react"
import {
  Mail, Lock, Eye, EyeOff, Car,
  User, ArrowRight, Sun, Moon
} from "lucide-react"

import { useTheme } from "@/provider/ThemeProvider"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export default function RegisterPage() {
  const { theme, toggle } = useTheme()

  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accept: false,
  })

  const handleChange = (key: string, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-start gap-4 p-4 rounded-2xl border bg-muted/40">
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <Car className="w-5 h-5 text-emerald-500" />
        </div>

        <div className="flex-1">
          <h1 className="text-sm font-semibold">
            Créez votre compte 🚀
          </h1>

          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Rejoignez la plateforme pour proposer vos trajets, réserver facilement
            et interagir avec une communauté active et fiable.
          </p>

          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Une fois inscrit, vous pourrez publier vos trajets, recevoir des réservations
            et améliorer votre visibilité.
          </p>
        </div>

        {/* THEME BUTTON GLOBAL */}
        <button
          onClick={toggle}
          className="w-8 h-8 rounded-lg border bg-background flex items-center justify-center"
        >
          {theme === "dark"
            ? <Sun className="w-3.5 h-3.5" />
            : <Moon className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* BADGE */}
      <div className="flex flex-col items-center gap-1">
        <Badge className="text-xs gap-1 px-2 py-0.5 bg-muted text-muted-foreground border">
          120 000+ utilisateurs actifs
        </Badge>

        <p className="text-[11px] text-muted-foreground text-center">
          Une communauté active basée sur des avis et expériences réelles.
        </p>
      </div>

      {/* FORM */}
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-sm font-semibold">
            Création de votre compte
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* NAME */}
          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1.5">
              <User className="w-3 h-3 text-emerald-500" />
              Nom complet
            </Label>

            <Input
              className="h-9 text-sm"
              placeholder="Ex: Jean Dupont"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />

            <p className="text-[10px] text-muted-foreground">
              Visible par les autres utilisateurs lors des trajets.
            </p>
          </div>

          {/* EMAIL */}
          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-emerald-500" />
              Adresse email
            </Label>

            <Input
              className="h-9 text-sm"
              type="email"
              placeholder="vous@email.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-emerald-500" />
              Mot de passe
            </Label>

            <div className="relative">
              <Input
                className="h-9 pr-8 text-sm"
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 6 caractères"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showPassword
                  ? <EyeOff className="w-3.5 h-3.5" />
                  : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="space-y-1">
            <Label className="text-xs">
              Confirmer le mot de passe
            </Label>

            <Input
              className="h-9 text-sm"
              type="password"
              placeholder="Répétez votre mot de passe"
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />
          </div>

          {/* TERMS */}
          <div className="flex items-start gap-2">
            <Checkbox
              checked={form.accept}
              onCheckedChange={(val) => handleChange("accept", val)}
            />

            <p className="text-xs text-muted-foreground leading-relaxed">
              En créant un compte, vous acceptez nos{" "}
              <button className="text-emerald-600 hover:underline font-medium">
                Conditions Générales d’Utilisation
              </button>{" "}
              ainsi que notre{" "}
              <button className="text-emerald-600 hover:underline font-medium">
                Politique de Confidentialité
              </button>.
            </p>
          </div>

          {/* SUBMIT */}
          <Button
            disabled={!form.accept}
            className="w-full h-9 text-sm bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50"
          >
            Créer mon compte
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>

          {/* SEPARATOR */}
          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">
              ou continuer avec
            </span>
            <Separator className="flex-1" />
          </div>

          {/* SOCIAL */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { src: "https://www.svgrepo.com/show/475656/google-color.svg", label: "Google" },
              { src: "https://cdn.simpleicons.org/apple/000000", label: "Apple" },
              { src: "https://www.svgrepo.com/show/475647/facebook-color.svg", label: "Facebook" },
            ].map(({ src, label }) => (
              <Button
                key={label}
                variant="outline"
                className="h-9 text-xs flex items-center justify-center gap-1.5"
              >
                <img src={src} className="w-3.5 h-3.5" alt={label} />
                {label}
              </Button>
            ))}
          </div>

          {/* LOGIN */}
          <p className="text-center text-xs text-muted-foreground">
            Déjà inscrit ?{" "}
            <button className="text-emerald-600 hover:underline font-medium">
              Se connecter
            </button>
          </p>

        </CardContent>
      </Card>

    </div>
  )
}