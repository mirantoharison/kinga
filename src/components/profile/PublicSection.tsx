"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  AtSign, Camera, CheckCircle2, FileText, ImagePlus,
  Link, Loader2, MapPin, MessageCircle,
  Music, PawPrint, Wind, XCircle, Volume2, VolumeX,
  Cigarette, Baby, Luggage, Thermometer, Phone,
  Facebook,
} from "lucide-react"

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const LANGUAGES = [
  { code: "mg", label: "Malagasy", flag: "🇲🇬", required: true },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English",  flag: "🇬🇧" },
  { code: "es", label: "Español",  flag: "🇪🇸" },
  { code: "de", label: "Deutsch",  flag: "🇩🇪" },
  { code: "ar", label: "العربية",  flag: "🇸🇦" },
  { code: "zh", label: "中文",     flag: "🇨🇳" },
  { code: "pt", label: "Português",flag: "🇵🇹" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "ru", label: "Русский",  flag: "🇷🇺" },
]

const PREFERENCES = [
  { key: "music",     label: "Musique",        icon: Music,          description: "J'écoute de la musique pendant le trajet" },
  { key: "nomusic",   label: "Silence",         icon: VolumeX,        description: "Je préfère un trajet calme et silencieux" },
  { key: "chat",      label: "Discussion",      icon: MessageCircle,  description: "J'aime discuter avec les passagers" },
  { key: "loud",      label: "Ambiance",        icon: Volume2,        description: "J'aime une ambiance animée à bord" },
  { key: "pets",      label: "Animaux",         icon: PawPrint,       description: "Les animaux de compagnie sont les bienvenus" },
  { key: "baby",      label: "Bébés",           icon: Baby,           description: "J'accepte les passagers avec des nourrissons" },
  { key: "luggage",   label: "Bagages",         icon: Luggage,        description: "J'accepte les grands bagages à bord" },
  { key: "aircon",    label: "Climatisation",   icon: Wind,           description: "Le véhicule est climatisé" },
  { key: "heating",   label: "Chauffage",       icon: Thermometer,    description: "Le véhicule est chauffé en saison froide" },
  { key: "nosmoking", label: "Non-fumeur",      icon: Cigarette,      description: "Il est interdit de fumer dans le véhicule" },
  { key: "phone",     label: "Appels OK",       icon: Phone,          description: "Les appels téléphoniques sont tolérés" },
] as const

type PreferenceKey = typeof PREFERENCES[number]["key"]

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export function ProfilSection() {
  const avatarRef   = useRef<HTMLInputElement>(null)
  const coverRef    = useRef<HTMLInputElement>(null)
  const pseudoTimer = useRef<ReturnType<typeof setTimeout>>(null!)

  const [avatar,       setAvatar]       = useState<string | null>(null)
  const [cover,        setCover]        = useState<string | null>(null)
  const [pseudo,       setPseudo]       = useState("")
  const [pseudoStatus, setPseudoStatus] = useState<"idle" | "checking" | "available" | "taken">("idle")
  const [languages,    setLanguages]    = useState<string[]>(["mg"])
  const [preferences,  setPreferences]  = useState<PreferenceKey[]>([])

  function handlePseudoChange(value: string) {
    setPseudo(value)
    if (!value) { setPseudoStatus("idle"); return }
    setPseudoStatus("checking")
    clearTimeout(pseudoTimer.current)
    pseudoTimer.current = setTimeout(() =>
      setPseudoStatus(Math.random() > 0.3 ? "available" : "taken"), 800
    )
  }

  function toggleLanguage(code: string, required?: boolean) {
    if (required) return
    setLanguages((prev) =>
      prev.includes(code) ? prev.filter((l) => l !== code) : [...prev, code]
    )
  }

  function togglePreference(key: PreferenceKey) {
    setPreferences((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    )
  }

  return (
    <>
      {/* ── En-tête ── */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <ImagePlus className="w-4 h-4" />
          Profil public
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Votre profil public est la première impression que vous donnez aux autres membres de la communauté.
          Une photo claire, un pseudo reconnaissable et une présentation soignée augmentent considérablement
          vos chances d'être choisi pour un trajet. Les informations renseignées ici sont visibles par tous
          les utilisateurs de la plateforme et constituent votre carte de visite au sein de la communauté.
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Prenez le temps de personnaliser chaque section : une identité visuelle cohérente, des préférences
          bien renseignées et une biographie sincère permettent aux passagers de savoir exactement à quoi
          s'attendre avant même de vous contacter. Un profil complet inspire confiance, réduit les annulations
          et reflète votre sérieux en tant que membre actif de la plateforme.
        </p>
      </div>

      <div className="space-y-6">

        {/* ── Photos ── */}
        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">Photos</p>
            <p className="text-[11px] text-muted-foreground">
              Une photo de profil reconnaissable et une photo de couverture personnalisée rendent votre profil
              immédiatement plus attractif et rassurant. Les profils avec photo reçoivent significativement
              plus de demandes que les profils sans visuel. Choisissez des images nettes, bien éclairées et
              représentatives de votre identité.
            </p>
          </div>

          {/* Couverture */}
          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1">
              <ImagePlus className="w-3 h-3" /> Photo de couverture
            </Label>
            <div
              className="relative w-full h-28 rounded-xl border border-dashed border-border bg-muted/40 overflow-hidden cursor-pointer group"
              onClick={() => coverRef.current?.click()}
            >
              {cover ? (
                <>
                  <img src={cover} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-1.5 text-muted-foreground">
                  <ImagePlus className="w-5 h-5" />
                  <p className="text-[11px]">Cliquez pour ajouter une photo de couverture</p>
                  <p className="text-[10px] opacity-60">JPG, PNG · 5 Mo max · Format paysage recommandé</p>
                </div>
              )}
            </div>
            <input ref={coverRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) setCover(URL.createObjectURL(f)) }} />
            <p className="text-[11px] text-muted-foreground">
              La photo de couverture s'affiche en haut de votre profil public. Optez pour une image qui vous
              représente : un paysage, un lieu que vous aimez ou une photo de votre véhicule.
            </p>
          </div>

          {/* Avatar */}
          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1">
              <Camera className="w-3 h-3" /> Photo de profil
            </Label>
            <div className="flex items-center gap-4">
              <div
                className="relative w-16 h-16 rounded-full border border-border bg-muted overflow-hidden cursor-pointer group shrink-0"
                onClick={() => avatarRef.current?.click()}
              >
                {avatar ? (
                  <>
                    <img src={avatar} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-full">
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Camera className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <Button variant="outline" size="sm" className="text-xs h-7"
                  onClick={() => avatarRef.current?.click()}>
                  Changer la photo
                </Button>
                {avatar && (
                  <Button variant="ghost" size="sm" className="text-xs h-7 text-destructive hover:text-destructive"
                    onClick={() => setAvatar(null)}>
                    Supprimer
                  </Button>
                )}
                <p className="text-[10px] text-muted-foreground">JPG, PNG · 2 Mo max · Format carré recommandé</p>
              </div>
            </div>
            <input ref={avatarRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) setAvatar(URL.createObjectURL(f)) }} />
            <p className="text-[11px] text-muted-foreground">
              Votre photo de profil apparaît sur toutes vos annonces de trajet, dans les messages et dans les
              avis. Privilégiez un portrait clair où votre visage est bien visible afin que les passagers
              puissent vous reconnaître facilement lors du départ.
            </p>
          </div>
        </div>

        <Separator />

        {/* ── Identité publique ── */}
        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">Identité publique</p>
            <p className="text-[11px] text-muted-foreground">
              Ces informations constituent le cœur de votre profil visible par la communauté. Votre pseudo
              est votre identifiant unique sur la plateforme : choisissez-le avec soin car il apparaîtra
              sur toutes vos annonces et dans tous vos échanges. Votre biographie est votre chance de vous
              présenter librement et de donner envie aux passagers de voyager avec vous.
            </p>
          </div>
          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">

            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <AtSign className="w-3 h-3" /> Pseudo
              </Label>
              <div className="relative">
                <Input
                  value={pseudo}
                  onChange={(e) => handlePseudoChange(e.target.value)}
                  className="pr-8 text-xs"
                  placeholder="votre_pseudo"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  {pseudoStatus === "checking"  && <Loader2      className="w-3 h-3 animate-spin text-muted-foreground" />}
                  {pseudoStatus === "available" && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                  {pseudoStatus === "taken"     && <XCircle      className="w-3 h-3 text-destructive" />}
                </span>
              </div>
              {pseudoStatus === "taken"     && <p className="text-[11px] text-destructive">Ce pseudo est déjà utilisé.</p>}
              {pseudoStatus === "available" && <p className="text-[11px] text-green-600 dark:text-green-400">Pseudo disponible.</p>}
              <p className="text-[11px] text-muted-foreground">Unique, sans espaces. Lettres, chiffres et underscores uniquement.</p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Ville / Région
              </Label>
              <Input defaultValue="Antananarivo" className="text-xs" placeholder="ex. Antananarivo" />
              <p className="text-[11px] text-muted-foreground">Votre localisation habituelle, utilisée pour affiner les suggestions de trajets.</p>
            </div>

            <div className="space-y-1 md:col-span-2">
              <Label className="text-xs flex items-center gap-1">
                <FileText className="w-3 h-3" /> Biographie
              </Label>
              <Textarea
                rows={3}
                placeholder="Présentez-vous en quelques mots : votre style de conduite, vos habitudes, ce que les passagers peuvent attendre..."
                className="text-xs resize-none"
              />
              <p className="text-[11px] text-muted-foreground">
                Visible sur votre profil public · Maximum 280 caractères. Une biographie authentique et bien
                rédigée rassure les passagers et augmente votre taux d'acceptation. Mentionnez votre expérience
                de conduite, vos trajets habituels ou simplement votre façon d'aborder le covoiturage.
              </p>
            </div>

          </div>
        </div>

        <Separator />

        {/* ── Langues ── */}
        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">Langues parlées</p>
            <p className="text-[11px] text-muted-foreground">
              Indiquez les langues dans lesquelles vous êtes à l'aise pour communiquer avec vos passagers.
              Cette information aide les utilisateurs à choisir un conducteur avec qui ils pourront échanger
              facilement tout au long du trajet. Le Malagasy est obligatoire et ne peut pas être retiré.
              Sélectionnez autant de langues que vous maîtrisez réellement.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map(({ code, label, flag, required }) => (
              <button
                key={code}
                type="button"
                onClick={() => toggleLanguage(code, required)}
                className={cn(
                  "text-[11px] px-2.5 py-1 rounded-full border transition flex items-center gap-1.5",
                  languages.includes(code)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border hover:bg-muted/80",
                  required && "cursor-not-allowed opacity-90"
                )}
              >
                <span>{flag}</span>
                {label}
                {required && <span className="text-[9px] opacity-70">(obligatoire)</span>}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* ── Préférences de trajet ── */}
        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">Préférences de trajet</p>
            <p className="text-[11px] text-muted-foreground">
              Ces préférences apparaissent directement sur vos annonces de trajet et permettent aux passagers
              de savoir exactement à quoi s'attendre à bord de votre véhicule. Soyez honnête dans vos choix :
              des préférences claires réduisent les malentendus, améliorent l'expérience de tous et contribuent
              à de meilleurs avis après chaque trajet. Vous pouvez en sélectionner autant que vous le souhaitez.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {PREFERENCES.map(({ key, label, icon: Icon, description }) => (
              <button
                key={key}
                type="button"
                onClick={() => togglePreference(key)}
                className={cn(
                  "flex flex-col items-start gap-1 rounded-xl border px-3 py-2.5 text-left transition",
                  preferences.includes(key)
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "bg-muted/40 text-muted-foreground border-border hover:bg-muted/60"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[11px] font-medium">{label}</span>
                </div>
                <span className="text-[10px] opacity-70 leading-relaxed">{description}</span>
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* ── Liens externes ── */}
        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">Liens externes</p>
            <p className="text-[11px] text-muted-foreground">
              Optionnel. Vous pouvez renseigner vos réseaux sociaux ou votre site personnel pour renforcer
              votre crédibilité et permettre aux passagers de mieux vous connaître avant un trajet. Ces liens
              seront affichés sur votre profil public. Ne renseignez que des profils publics et actifs —
              un lien inactif ou inaccessible peut nuire à la confiance que vous inspirez.
            </p>
          </div>
          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <Facebook className="w-3 h-3" /> Facebook
              </Label>
              <Input className="text-xs" placeholder="https://facebook.com/votre_profil" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <Link className="w-3 h-3" /> Instagram
              </Label>
              <Input className="text-xs" placeholder="https://instagram.com/votre_compte" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <Link className="w-3 h-3" /> LinkedIn
              </Label>
              <Input className="text-xs" placeholder="https://linkedin.com/in/votre_profil" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <Link className="w-3 h-3" /> Site web personnel
              </Label>
              <Input className="text-xs" placeholder="https://votre-site.com" />
            </div>
          </div>
        </div>

        <Separator />

        {/* ── Actions ── */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button">Annuler</Button>
          <Button type="button">Enregistrer</Button>
        </div>

      </div>

      {/* ── Conseil ── */}
      <div className="mt-4 border rounded-lg p-3 bg-muted/40 text-[11px] text-muted-foreground">
        <p className="font-medium text-foreground mb-1">Conseil</p>
        <p>
          Un profil avec photo, pseudo personnalisé, biographie complète et préférences bien renseignées
          reçoit en moyenne deux fois plus de demandes de trajet. Quelques minutes suffisent pour faire
          la différence et bâtir une réputation solide au sein de la communauté.
        </p>
      </div>
    </>
  )
}