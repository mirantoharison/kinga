"use client"

import { useState } from "react"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import {
  User,
  ShieldCheck,
  MessageCircle,
  Star,
  MapPin,
  Heart,
  Phone,
  Mail,
  Calendar,
  UserCircle,
  FileText,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  Laptop,
  LogOut,
  AlertTriangle,
  KeyRound,
  RefreshCw,
  Trash2,
  CheckCircle2,
  Car,
  ImagePlus,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

import { LegalSection } from "@/components/profile/LegaleSection"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { PublicSection } from "@/components/profile/PublicSection"
import { VehiculeSection } from "@/components/profile/VehicleSection"
import { ReviewSection } from "@/components/profile/ReviewSection"

/* ─────────────────────────────────────────
   SECTION CONNEXION
───────────────────────────────────────── */
function ConnexionSection() {
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
          Pour garantir la sécurité de votre compte, il est recommandé d’utiliser un mot de passe unique,
          composé d’au moins 8 caractères, incluant une combinaison de lettres majuscules et minuscules,
          de chiffres ainsi que de symboles. Évitez d’utiliser des informations personnelles faciles à deviner
          comme votre nom, votre date de naissance ou des mots courants. Il est également fortement conseillé de ne jamais réutiliser un mot de passe déjà utilisé sur un autre service,
          afin de limiter les risques en cas de fuite de données externe. Prenez l’habitude de mettre à jour votre mot de passe
          régulièrement et de ne jamais le partager avec d’autres personnes, même en cas de demande apparente provenant d’un tiers.
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

          {/* Désactiver */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-foreground">
                Désactiver le compte
              </p>
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

          {/* Supprimer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-foreground">
                Supprimer le compte
              </p>
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

/* ─────────────────────────────────────────
   MENU
───────────────────────────────────────── */
const menuItems = [
  { key: "profil", label: "Profil public", icon: ImagePlus },
  { key: "info", label: "Informations de base", icon: User },
  { key: "connexion", label: "Connexion", icon: Lock },
  { key: "legal", label: "Légal", icon: ShieldCheck },
  { key: "vehicule", label: "Véhicule", icon: Car },
  { key: "avis", label: "Avis des utilisateurs", icon: Star },
]

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ProfilePage() {
  const [active, setActive] = useState("info")
  const [liked, setLiked] = useState(false)

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">

      <Card className="overflow-hidden py-0">

        {/* ───────────── HEADER ───────────── */}
        <CardHeader className="p-0">

          <div className="relative w-full">
            <img
              src="https://i.pravatar.cc/600?img=12"
              className="w-full h-40 object-cover object-top"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            <Button
              variant="outline"
              size="icon"
              onClick={() => setLiked(p => !p)}
              className={`absolute top-3 right-3 bg-background/80 backdrop-blur-sm ${liked ? "text-rose-500 border-rose-300" : ""}`}
            >
              <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
            </Button>

            <span className="absolute top-3 left-3 flex items-center gap-1.5 text-xs text-white bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              En ligne
            </span>
          </div>

          <div className="flex items-end gap-3 px-4 md:px-5 -mt-10 pb-4">
            <div className="relative flex-shrink-0">
              <img
                src="https://i.pravatar.cc/150?img=12"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover ring-4 ring-background shadow-md"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base md:text-lg font-semibold">Alex Rakoto</h1>
                <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Vérifié
                </Badge>
              </div>
              <div className="flex items-center gap-2 md:gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  Antananarivo • Conducteur
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                  <span className="font-medium text-foreground">4.8</span>
                  (124 avis)
                </span>
              </div>
            </div>
          </div>

        </CardHeader>

        {/* ───────────── BODY ───────────── */}
        <CardContent className="p-0 border-t">

          {/* Mobile : nav horizontale */}
          <div className="flex md:hidden border-b overflow-x-auto scrollbar-none">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.key}
                  onClick={() => setActive(item.key)}
                  className={cn(
                    "flex-shrink-0 flex items-center gap-1.5 text-xs px-4 py-3 border-b-2 transition whitespace-nowrap",
                    active === item.key
                      ? "border-foreground font-medium text-foreground"
                      : "border-transparent text-muted-foreground"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              )
            })}
          </div>

          <div className="flex">

            {/* Sidebar desktop */}
            <div className="hidden md:block w-[200px] border-r py-4 px-2 space-y-0.5 flex-shrink-0">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.key}
                    onClick={() => setActive(item.key)}
                    className={cn(
                      "w-full flex items-center gap-2 text-left text-xs px-2.5 py-1.5 rounded-md transition",
                      active === item.key
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                )
              })}
            </div>

            {/* Contenu */}
            <div className="flex-1 min-w-0 p-4 md:p-6 space-y-4">

              {active === "profil" && <PublicSection />}

              {active === "info" && (
                <>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Informations personnelles
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Cette section regroupe les informations essentielles permettant aux autres utilisateurs de vous identifier
                      clairement et de mieux comprendre avec qui ils vont effectuer un trajet. Un profil complet et précis contribue
                      directement à instaurer un climat de confiance, ce qui est un élément clé dans le cadre du covoiturage. Les informations que vous renseignez ici seront visibles par les autres utilisateurs lors de la consultation
                      de votre profil. Elles permettent notamment de faciliter la prise de contact, d'améliorer la transparence
                      et d'éviter toute confusion lors de l'organisation des trajets.
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Il est recommandé d'utiliser votre véritable identité et des coordonnées à jour afin de garantir une communication
                      fluide. Une présentation claire et sincère augmente significativement les chances d'être choisi pour un trajet,
                      en particulier lorsque plusieurs conducteurs sont disponibles. Prenez également le temps de compléter la section de présentation. Quelques lignes suffisent pour décrire votre
                      expérience, votre manière de conduire ou encore l'ambiance que vous proposez à bord. Ces éléments, bien que simples,
                      jouent un rôle important dans la décision des passagers.
                    </p>
                  </div>

                  <form className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
                    <div className="space-y-1">
                      <Label className="text-xs flex items-center gap-1"><UserCircle className="w-3 h-3" />Nom</Label>
                      <Input defaultValue="Rakoto" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs flex items-center gap-1"><UserCircle className="w-3 h-3" />Prénom</Label>
                      <Input defaultValue="Alex" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs flex items-center gap-1"><Calendar className="w-3 h-3" />Âge</Label>
                      <Input type="number" defaultValue={29} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs flex items-center gap-1"><User className="w-3 h-3" />Genre</Label>
                      <Select defaultValue="homme">
                        <SelectTrigger><SelectValue placeholder="Sélectionner un genre" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="homme">Homme</SelectItem>
                          <SelectItem value="femme">Femme</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                          <SelectItem value="none">Préfère ne pas dire</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs flex items-center gap-1"><Phone className="w-3 h-3" />Téléphone</Label>
                      <Input type="tel" defaultValue="+261 34 00 000 00" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs flex items-center gap-1"><Mail className="w-3 h-3" />Email</Label>
                      <Input type="email" defaultValue="alex@email.com" />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <Label className="text-xs flex items-center gap-1"><FileText className="w-3 h-3" />Présentation</Label>
                      <Textarea rows={6} placeholder="Conducteur expérimenté, ponctuel et attentif au confort des passagers." defaultValue="" />
                      <p className="text-[11px] text-muted-foreground">Décrivez brièvement votre manière de conduire ou votre expérience afin de rassurer les passagers.</p>
                    </div>
                    <div className="flex justify-end gap-2 pt-2 md:col-span-2">
                      <Button variant="outline" type="button">Annuler</Button>
                      <Button type="submit">Enregistrer</Button>
                    </div>
                  </form>

                  <div className="mt-4 space-y-2">
                    <div className="text-[11px] text-muted-foreground leading-relaxed space-y-2">
                      <p>
                        Les informations renseignées dans ce formulaire sont utilisées pour compléter votre profil public.
                        Elles permettent aux autres utilisateurs de mieux vous identifier et de faciliter les échanges avant un trajet.
                        Assurez-vous que les données fournies sont exactes et régulièrement mises à jour. Un profil clair et bien renseigné contribue à instaurer un climat de confiance. Les utilisateurs sont généralement plus enclins à choisir un conducteur dont les informations sont complètes,
                        cohérentes et faciles à comprendre. Vos coordonnées restent utilisées uniquement dans le cadre de l'organisation des trajets.
                        Il est recommandé de ne partager que les informations nécessaires et de rester vigilant lors des échanges avec d'autres utilisateurs.
                      </p>
                    </div>
                    <div className="border rounded-lg p-3 bg-muted/40 text-[11px] text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Conseil</p>
                      <p>Une présentation simple, authentique et précise améliore la qualité de votre profil et facilite la prise de décision des passagers. Quelques phrases bien rédigées peuvent faire la différence.</p>
                    </div>
                  </div>
                </>
              )}

              {active === "vehicule" && <VehiculeSection />}

              {active === "connexion" && <ConnexionSection />}

              {active === "legal" && <LegalSection />}

              {active === "avis" && <ReviewSection />}

            </div>
          </div>
        </CardContent>

      </Card>
    </div>
  )
}