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

  const handleSubmit = () => {
    console.log("login:", form)
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md shadow-xl border-border/50 rounded-2xl">

        {/* HEADER */}
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-xl font-semibold">
            Connexion
          </CardTitle>
          <CardDescription>
            Accédez à votre compte pour continuer
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* EMAIL */}
          <div className="space-y-2">
            <Label>Email</Label>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="ex: vous@email.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <Label>Mot de passe</Label>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-muted-foreground" />

              <div className="relative w-full">
                <Input
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
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* OPTIONS */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.remember}
                onCheckedChange={(val) => handleChange("remember", val)}
              />
              <span>Se souvenir de moi</span>
            </div>

            <button className="text-emerald-600 hover:underline">
              Mot de passe oublié ?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <Button
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            onClick={handleSubmit}
          >
            Se connecter
          </Button>

          {/* SEPARATOR */}
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">
              ou continuer avec
            </span>
            <Separator className="flex-1" />
          </div>

          {/* SOCIAL LOGIN */}
          <div className="grid grid-cols-3 gap-2">

            {/* GOOGLE */}
            <Button variant="outline" className="flex items-center gap-2">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-4 h-4"
              />
              Google
            </Button>

            {/* APPLE */}
            <Button variant="outline" className="flex items-center gap-2">
              <img
                src="https://www.svgrepo.com/show/452210/apple.svg"
                className="w-4 h-4"
              />
              Apple
            </Button>

            {/* FACEBOOK */}
            <Button variant="outline" className="flex items-center gap-2">
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                className="w-4 h-4"
              />
              Facebook
            </Button>

          </div>

          {/* SIGNUP */}
          <div className="text-center text-sm text-muted-foreground">
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