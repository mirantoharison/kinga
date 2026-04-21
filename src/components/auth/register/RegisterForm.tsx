"use client"

import { useState } from "react"
import {
  Mail, Lock, Eye, EyeOff,
  User, ArrowRight
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

import { RegisterSocial } from "./RegisterSocial"
import { RegisterFooter } from "./RegisterFooter"

export function RegisterForm({ form, onChange }: any) {
  const [showPassword, setShowPassword] = useState(false)

  return (
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
            onChange={(e) => onChange("name", e.target.value)}
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
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        {/* PASSWORD */}
        <div className="space-y-1">
          <Label className="text-xs flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-500" />
            Mot de passe
          </Label>

          <div className="space-y-1.5">
            <div className="relative">
              <Input
                className="h-9 pr-8 text-sm"
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 6 caractères"
                value={form.password}
                onChange={(e) => onChange("password", e.target.value)}
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

            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Choisissez un mot de passe sécurisé d’au moins 6 caractères, en combinant
              lettres majuscules et minuscules ainsi qu’au moins un chiffre. Pour mieux
              protéger votre compte, évitez les mots trop simples ou les informations
              personnelles faciles à deviner.
            </p>
          </div>
        </div>

        {/* CONFIRM */}
        <div className="space-y-1">
          <Label className="text-xs">
            Confirmer le mot de passe
          </Label>

          <Input
            className="h-9 text-sm"
            type="password"
            placeholder="Répétez votre mot de passe"
            value={form.confirmPassword}
            onChange={(e) => onChange("confirmPassword", e.target.value)}
          />
        </div>

        {/* TERMS */}
        <div className="flex items-start gap-2">
          <Checkbox
            checked={form.accept}
            onCheckedChange={(val) => onChange("accept", val)}
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
          className="w-full h-9 text-sm bg-emerald-500 hover:bg-emerald-600"
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

        <RegisterSocial />

        <RegisterFooter />

      </CardContent>
    </Card>
  )
}