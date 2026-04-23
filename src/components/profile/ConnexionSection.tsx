"use client"

import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Laptop,
  LogOut,
  AlertTriangle,
  Trash2,
} from "lucide-react"

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export function ConnexionSection() {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [twoFactor, setTwoFactor] = useState(true)
  const [loginAlerts, setLoginAlerts] = useState(true)

  const devices = [
    { id: 1, name: "iPhone 14 Pro", type: "mobile", location: "Antananarivo, MG", date: "Aujourd'hui · 09:14", current: true },
    { id: 2, name: "MacBook Pro", type: "desktop", location: "Antananarivo, MG", date: "Hier · 22:30", current: false },
    { id: 3, name: "Samsung Galaxy S22", type: "mobile", location: "Toamasina, MG", date: "Il y a 3 jours", current: false },
  ]

  return (
    <div className="space-y-6">

      {/* ── Mot de passe ── */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Mot de passe
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Pour garantir la sécurité de votre compte, il est recommandé d'utiliser un mot de passe unique,
          composé d'au moins 8 caractères, incluant une combinaison de lettres majuscules et minuscules,
          de chiffres ainsi que de symboles. Évitez d'utiliser des informations personnelles faciles à deviner
          comme votre nom, votre date de naissance ou des mots courants. Il est également fortement conseillé de ne jamais réutiliser un mot de passe déjà utilisé sur un autre service,
          afin de limiter les risques en cas de fuite de données externe. Prenez l'habitude de mettre à jour votre mot de passe
          régulièrement et de ne jamais le partager avec d'autres personnes, même en cas de demande apparente provenant d'un tiers.
          <br /><br />
          En adoptant ces bonnes pratiques, vous contribuez à protéger efficacement votre compte et les informations personnelles
          associées, tout en garantissant une utilisation plus sereine de la plateforme.
        </p>

        <div className="space-y-4">

          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1">
              <KeyRound className="w-3 h-3" />
              Mot de passe actuel
            </Label>
            <div className="relative">
              <Input type={showCurrent ? "text" : "password"} placeholder="••••••••" className="pr-9" />
              <button
                type="button"
                onClick={() => setShowCurrent(p => !p)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showCurrent ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1">
              <KeyRound className="w-3 h-3" />
              Nouveau mot de passe
            </Label>
            <div className="relative">
              <Input type={showNew ? "text" : "password"} placeholder="••••••••" className="pr-9" />
              <button
                type="button"
                onClick={() => setShowNew(p => !p)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showNew ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1">
              <KeyRound className="w-3 h-3" />
              Confirmer le nouveau mot de passe
            </Label>
            <div className="relative">
              <Input type={showConfirm ? "text" : "password"} placeholder="••••••••" className="pr-9" />
              <button
                type="button"
                onClick={() => setShowConfirm(p => !p)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-1">
            <Button size="sm" className="gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Mettre à jour
            </Button>
            <Button size="sm" variant="ghost" className="gap-1.5 text-muted-foreground">
              <RefreshCw className="w-3.5 h-3.5" />
              Réinitialiser par e-mail
            </Button>
          </div>

        </div>
      </div>

      <Separator />

      {/* ── Sécurité ── */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          Sécurité du compte
        </h3>

        <div className="space-y-3">

          <div className="flex items-center justify-between gap-4 p-3 border rounded-xl">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium">Double authentification (2FA)</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                Protégez votre compte en exigeant un code supplémentaire à chaque connexion depuis un nouvel appareil.
              </p>
            </div>
            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
          </div>

          <div className="flex items-center justify-between gap-4 p-3 border rounded-xl">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium">Alertes de connexion</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                Recevez une notification par e-mail à chaque connexion depuis un appareil ou un emplacement inconnu.
              </p>
            </div>
            <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
          </div>

        </div>
      </div>

      <Separator />

      {/* ── Appareils connectés ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            Appareils connectés
          </h3>
          <Button variant="ghost" size="sm" className="text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 gap-1.5">
            <LogOut className="w-3.5 h-3.5" />
            Tout déconnecter
          </Button>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Voici la liste des appareils actuellement connectés à votre compte. Si vous ne reconnaissez pas
          l'un d'eux, déconnectez-le immédiatement et changez votre mot de passe.
        </p>

        <div className="space-y-2">
          {devices.map((device) => (
            <div key={device.id} className="flex items-center gap-3 p-3 border rounded-xl">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                {device.type === "mobile"
                  ? <Smartphone className="w-4 h-4 text-muted-foreground" />
                  : <Laptop className="w-4 h-4 text-muted-foreground" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs font-medium">{device.name}</p>
                  {device.current && (
                    <Badge className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-1.5 py-0">
                      Cet appareil
                    </Badge>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {device.location} · {device.date}
                </p>
              </div>
              {!device.current && (
                <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-50 flex-shrink-0">
                  <LogOut className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* ── Zone dangereuse ── */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2 text-rose-500">
          <AlertTriangle className="w-4 h-4" />
          Zone dangereuse
        </h3>

        <div className="border border-rose-500/30 rounded-xl p-4 bg-rose-500/10 space-y-3">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-foreground">Désactiver le compte</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                Votre profil sera masqué temporairement. Vous pourrez le réactiver à tout moment.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-rose-500/40 text-rose-500 hover:bg-rose-500/20 hover:text-rose-400 flex-shrink-0 gap-1.5"
            >
              <EyeOff className="w-3.5 h-3.5" />
              Désactiver
            </Button>
          </div>

          <Separator className="bg-rose-500/20" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-foreground">Supprimer le compte</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                Cette action est irréversible. Toutes vos données, trajets et avis seront définitivement supprimés.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-rose-500 text-rose-600 hover:bg-rose-600 hover:text-white flex-shrink-0 gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Supprimer
            </Button>
          </div>

        </div>
      </div>

    </div>
  )
}