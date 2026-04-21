"use client"

import { useState } from "react"
import {
  Mail, Lock, Eye, EyeOff, ArrowRight
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

import { LoginSocial } from "./LoginSocial"
import { LoginFooter } from "./LoginFooter"

export function LoginForm({ form, onChange }: any) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          Connexion à votre compte
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

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

          <p className="text-[10px] text-muted-foreground">
            Utilisez l’adresse associée à votre compte pour retrouver vos données.
          </p>
        </div>

        {/* PASSWORD */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <Label className="text-xs flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-emerald-500" />
              Mot de passe
            </Label>

            <button className="text-xs text-emerald-600 hover:underline">
              Mot de passe oublié ?
            </button>
          </div>

          <div className="relative">
            <Input
              className="h-9 pr-8 text-sm"
              type={showPassword ? "text" : "password"}
              placeholder="Votre mot de passe"
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

          <p className="text-[10px] text-muted-foreground">
            Assurez-vous de saisir correctement votre mot de passe.
          </p>
        </div>

        {/* REMEMBER */}
        <div className="flex items-center gap-2">
          <Checkbox
            checked={form.remember}
            onCheckedChange={(val) => onChange("remember", val)}
          />
          <span className="text-xs text-muted-foreground">
            Se souvenir de moi sur cet appareil
          </span>
        </div>

        <Button className="w-full h-9 text-sm bg-emerald-500 hover:bg-emerald-600">
          Se connecter
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>

        <div className="flex items-center gap-2">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">
            ou continuer avec
          </span>
          <Separator className="flex-1" />
        </div>

        <LoginSocial />
        <LoginFooter />

      </CardContent>
    </Card>
  )
}