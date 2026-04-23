"use client"

import {
  User,
  Phone,
  Mail,
  Calendar,
  UserCircle,
  FileText,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export function InfoSection() {
  return (
    <>
      {/* ── En-tête ── */}
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

      {/* ── Formulaire ── */}
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

      {/* ── Note de bas de section ── */}
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
  )
}