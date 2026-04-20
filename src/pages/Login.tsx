"use client"

import { useState } from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-sm shadow-lg border rounded-2xl">

        {/* HEADER */}
        <CardHeader className="space-y-1 text-center pb-4">
          <CardTitle className="text-lg font-semibold">
            Connexion
          </CardTitle>
          <CardDescription className="text-xs">
            Accédez à votre compte pour continuer
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* EMAIL */}
          <div className="space-y-1.5">
            <Label className="text-xs">Email</Label>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-muted-foreground" />
              <Input
                className="h-9 text-sm"
                type="email"
                placeholder="ex: vous@email.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-1.5">
            <Label className="text-xs">Mot de passe</Label>

            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-muted-foreground" />

              <div className="relative w-full">
                <Input
                  className="h-9 text-sm pr-8"
                  type={showPassword ? "text" : "password"}
                  placeholder="Votre mot de passe"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* OPTIONS */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.remember}
                onCheckedChange={(val) => handleChange("remember", val)}
              />
              <span>Se souvenir</span>
            </div>

            <button className="text-emerald-600 hover:underline">
              Mot de passe oublié ?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <Button className="w-full h-9 text-sm bg-emerald-500 hover:bg-emerald-600 text-white">
            Se connecter
          </Button>

          {/* SEPARATOR */}
          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-[11px] text-muted-foreground">
              ou continuer avec
            </span>
            <Separator className="flex-1" />
          </div>

          {/* SOCIAL LOGIN */}
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="h-9 text-xs flex gap-2">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-3.5 h-3.5" />
              Google
            </Button>

            <Button variant="outline" className="h-9 text-xs flex gap-2">
              <img
                src="https://cdn.simpleicons.org/apple/000000"
                className="w-3.5 h-3.5"
              />
              Apple
            </Button>

            <Button variant="outline" className="h-9 text-xs flex gap-2">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-3.5 h-3.5" />
              Facebook
            </Button>
          </div>

          {/* SIGNUP */}
          <div className="text-center text-xs text-muted-foreground pt-2">
            Pas encore de compte ?{" "}
            <button className="text-emerald-600 hover:underline">
              S’inscrire
            </button>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}