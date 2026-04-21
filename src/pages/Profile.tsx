"use client"

import { useState } from "react"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  Menu,
  X,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

const menuItems = [
  { key: "info", label: "Informations de base", icon: User },
  { key: "connexion", label: "Connexion", icon: MessageCircle },
  { key: "legal", label: "Légal", icon: ShieldCheck },
  { key: "avis", label: "Avis des utilisateurs", icon: Star },
]

export default function ProfilePage() {
  const [active, setActive] = useState("info")
  const [liked, setLiked] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const activeItem = menuItems.find((m) => m.key === active)

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">

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

          {/* Avatar + Infos */}
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

          {/* ── Mobile : nav horizontale scrollable ── */}
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

          {/* ── Desktop : sidebar + contenu ── */}
          <div className="flex">

            {/* Sidebar desktop uniquement */}
            <div className="hidden md:block w-[220px] border-r py-6 px-3 space-y-1 flex-shrink-0">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.key}
                    onClick={() => setActive(item.key)}
                    className={cn(
                      "w-full flex items-center gap-2 text-left text-sm px-3 py-2 rounded-lg transition",
                      active === item.key
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                )
              })}
            </div>

            {/* Contenu */}
            <div className="flex-1 min-w-0 p-4 md:p-6 space-y-4">

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
                      <Label className="text-xs flex items-center gap-1">
                        <UserCircle className="w-3 h-3" />
                        Nom
                      </Label>
                      <Input defaultValue="Rakoto" />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs flex items-center gap-1">
                        <UserCircle className="w-3 h-3" />
                        Prénom
                      </Label>
                      <Input defaultValue="Alex" />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Âge
                      </Label>
                      <Input type="number" defaultValue={29} />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Genre
                      </Label>
                      <Select defaultValue="homme">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="homme">Homme</SelectItem>
                          <SelectItem value="femme">Femme</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                          <SelectItem value="none">Préfère ne pas dire</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        Téléphone
                      </Label>
                      <Input type="tel" defaultValue="+261 34 00 000 00" />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        Email
                      </Label>
                      <Input type="email" defaultValue="alex@email.com" />
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <Label className="text-xs flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        Présentation
                      </Label>
                      <Textarea
                        rows={6}
                        placeholder="Conducteur expérimenté, ponctuel et attentif au confort des passagers."
                        defaultValue=""
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Décrivez brièvement votre manière de conduire ou votre expérience afin de rassurer les passagers.
                      </p>
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
                      <p>
                        Une présentation simple, authentique et précise améliore la qualité de votre profil et facilite la prise de décision des passagers.
                        Quelques phrases bien rédigées peuvent faire la différence.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {active === "connexion" && (
                <>
                  <h3 className="text-sm font-semibold">Connexion</h3>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Répond rapidement aux messages</p>
                    <p>• Organisation simple et efficace</p>
                    <p>• Communication claire</p>
                  </div>
                </>
              )}

              {active === "legal" && (
                <>
                  <h3 className="text-sm font-semibold">Informations légales</h3>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Profil vérifié</p>
                    <p>• Téléphone confirmé</p>
                    <p>• Conformité aux règles</p>
                  </div>
                </>
              )}

              {active === "avis" && (
                <>
                  <h3 className="text-sm font-semibold">Avis des utilisateurs</h3>
                  <div className="space-y-3 text-xs">
                    <div className="border rounded-lg p-3">
                      <p className="font-medium">Marie</p>
                      <p className="text-muted-foreground">Très bon conducteur, ponctuel et agréable.</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <p className="font-medium">Jean</p>
                      <p className="text-muted-foreground">Conduite fluide, très professionnel.</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs mt-2">
                    Voir plus d'avis
                  </Button>
                </>
              )}

            </div>
          </div>
        </CardContent>

      </Card>
    </div>
  )
}