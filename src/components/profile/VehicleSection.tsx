"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Car, Camera, ImagePlus, CheckCircle2, XCircle,
  Fuel, Users, Palette, Hash, CalendarDays,
  ShieldCheck, Wrench, Gauge, Star, Zap,
  AirVent, Bluetooth, Wifi, Usb, MapPin,
} from "lucide-react"

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const FUEL_TYPES = [
  { value: "essence",    label: "Essence" },
  { value: "diesel",     label: "Diesel" },
  { value: "hybride",    label: "Hybride" },
  { value: "electrique", label: "Électrique" },
  { value: "gpl",        label: "GPL" },
]

const COLORS = [
  { value: "blanc",    label: "Blanc",    hex: "#f8fafc" },
  { value: "noir",     label: "Noir",     hex: "#0f172a" },
  { value: "gris",     label: "Gris",     hex: "#94a3b8" },
  { value: "rouge",    label: "Rouge",    hex: "#ef4444" },
  { value: "bleu",     label: "Bleu",     hex: "#3b82f6" },
  { value: "vert",     label: "Vert",     hex: "#22c55e" },
  { value: "jaune",    label: "Jaune",    hex: "#eab308" },
  { value: "orange",   label: "Orange",   hex: "#f97316" },
  { value: "marron",   label: "Marron",   hex: "#92400e" },
  { value: "beige",    label: "Beige",    hex: "#d4b483" },
]

const EQUIPMENTS = [
  { key: "aircon",     label: "Climatisation",    icon: AirVent,   description: "Véhicule climatisé" },
  { key: "bluetooth",  label: "Bluetooth",         icon: Bluetooth, description: "Système audio Bluetooth" },
  { key: "wifi",       label: "Wi-Fi",             icon: Wifi,      description: "Connexion internet à bord" },
  { key: "usb",        label: "Prise USB",         icon: Usb,       description: "Chargeur USB disponible" },
  { key: "gps",        label: "GPS intégré",       icon: MapPin,    description: "Navigation GPS embarquée" },
  { key: "electric",   label: "Borne de charge",   icon: Zap,       description: "Chargeur rapide disponible" },
] as const

type EquipmentKey = typeof EQUIPMENTS[number]["key"]

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 30 }, (_, i) => String(CURRENT_YEAR - i))

/* ─────────────────────────────────────────
   COMFORT RATING
───────────────────────────────────────── */
function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          className="transition"
        >
          <Star
            className={cn(
              "w-4 h-4 transition",
              (hovered || value) >= star
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground"
            )}
          />
        </button>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export function VehiculeSection() {
  const photoRef = useRef<HTMLInputElement>(null)

  const [photos,        setPhotos]        = useState<string[]>([])
  const [color,         setColor]         = useState<string | null>(null)
  const [equipments,    setEquipments]    = useState<EquipmentKey[]>([])
  const [comfortRating, setComfortRating] = useState(0)
  const [ctValid,       setCtValid]       = useState<boolean | null>(null)
  const [insValid,      setInsValid]      = useState<boolean | null>(null)

  function handlePhotos(files: FileList | null) {
    if (!files) return
    const urls = Array.from(files).slice(0, 6 - photos.length).map((f) => URL.createObjectURL(f))
    setPhotos((prev) => [...prev, ...urls].slice(0, 6))
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  function toggleEquipment(key: EquipmentKey) {
    setEquipments((prev) =>
      prev.includes(key) ? prev.filter((e) => e !== key) : [...prev, key]
    )
  }

  return (
    <>
      {/* ── En-tête ── */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Car className="w-4 h-4" />
          Mon véhicule
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Les informations sur votre véhicule jouent un rôle essentiel dans la décision des passagers.
          Un profil véhicule complet, accompagné de photos de qualité et de documents à jour, inspire
          immédiatement confiance et distingue votre annonce des autres conducteurs disponibles sur le
          même trajet.
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Renseignez avec précision la marque, le modèle, l'année et les caractéristiques de votre
          véhicule. Ces informations permettent aux passagers de savoir exactement dans quoi ils
          monteront, d'anticiper le niveau de confort et de vérifier que le véhicule correspond à
          leurs besoins, notamment en termes de capacité de bagages ou d'accessibilité.
        </p>
      </div>

      <div className="space-y-6">

        {/* ── Photos du véhicule ── */}
        <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-4">
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
              Photos du véhicule
            </p>
            <p className="text-[11px] text-muted-foreground">
              Ajoutez jusqu'à 6 photos de votre véhicule : extérieur avant, extérieur arrière, intérieur
              avant et arrière. Des photos récentes, nettes et bien éclairées rassurent les passagers
              et augmentent significativement le taux de réservation de vos trajets. Évitez les photos
              floues ou prises de nuit.
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-3 gap-2">
            {photos.map((url, i) => (
              <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-border group">
                <img src={url} className="w-full h-full object-cover" alt={`Photo ${i + 1}`} />
                <button
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  <XCircle className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
            {photos.length < 6 && (
              <button
                onClick={() => photoRef.current?.click()}
                className="aspect-video rounded-lg border border-dashed border-border bg-muted/40 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:bg-muted/60 transition"
              >
                <ImagePlus className="w-4 h-4" />
                <span className="text-[10px]">Ajouter</span>
              </button>
            )}
          </div>
          <input ref={photoRef} type="file" accept="image/*" multiple className="hidden"
            onChange={(e) => handlePhotos(e.target.files)} />
          <p className="text-[11px] text-muted-foreground">
            {photos.length}/6 photos · JPG, PNG · 5 Mo max par photo
          </p>
        </div>

        <Separator />

        {/* ── Informations générales ── */}
        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
              Informations générales
            </p>
            <p className="text-[11px] text-muted-foreground">
              Renseignez les caractéristiques principales de votre véhicule. Ces informations apparaissent
              directement sur vos annonces de trajet et permettent aux passagers de faire un choix éclairé.
              Assurez-vous que les données saisies correspondent exactement à votre véhicule actuel.
            </p>
          </div>
          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">

            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <Car className="w-3 h-3" /> Marque
              </Label>
              <Input className="text-xs" placeholder="ex. Toyota, Renault, Peugeot…" />
            </div>

            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <Car className="w-3 h-3" /> Modèle
              </Label>
              <Input className="text-xs" placeholder="ex. Corolla, Clio, 208…" />
            </div>

            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <CalendarDays className="w-3 h-3" /> Année
              </Label>
              <Select>
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Sélectionner une année" />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((y) => (
                    <SelectItem key={y} value={y} className="text-xs">{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <Fuel className="w-3 h-3" /> Carburant
              </Label>
              <Select>
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Type de carburant" />
                </SelectTrigger>
                <SelectContent>
                  {FUEL_TYPES.map(({ value, label }) => (
                    <SelectItem key={value} value={value} className="text-xs">{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <Users className="w-3 h-3" /> Nombre de places passagers
              </Label>
              <Select>
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Nombre de places" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <SelectItem key={n} value={String(n)} className="text-xs">
                      {n} place{n > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-[11px] text-muted-foreground">Hors conducteur.</p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <Gauge className="w-3 h-3" /> Kilométrage
              </Label>
              <Input className="text-xs" type="number" placeholder="ex. 45000" />
              <p className="text-[11px] text-muted-foreground">Kilométrage actuel au compteur.</p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <Hash className="w-3 h-3" /> Plaque d'immatriculation
              </Label>
              <Input className="text-xs" placeholder="ex. 1234 ABC" />
              <p className="text-[11px] text-muted-foreground">
                Non visible publiquement. Utilisée uniquement pour la vérification interne.
              </p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1">
                <Palette className="w-3 h-3" /> Couleur
              </Label>
              <div className="flex flex-wrap gap-2 pt-1">
                {COLORS.map(({ value, label, hex }) => (
                  <button
                    key={value}
                    type="button"
                    title={label}
                    onClick={() => setColor(value)}
                    className={cn(
                      "w-6 h-6 rounded-full border-2 transition",
                      color === value
                        ? "border-primary scale-110 shadow-sm"
                        : "border-border hover:scale-105"
                    )}
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
              {color && (
                <p className="text-[11px] text-muted-foreground">
                  Couleur sélectionnée : {COLORS.find((c) => c.value === color)?.label}
                </p>
              )}
            </div>

          </div>
        </div>

        <Separator />

        {/* ── Équipements ── */}
        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
              Équipements à bord
            </p>
            <p className="text-[11px] text-muted-foreground">
              Indiquez les équipements disponibles dans votre véhicule. Ces informations sont affichées
              sur vos annonces et permettent aux passagers de choisir en connaissance de cause, notamment
              pour les longs trajets où le confort et la connectivité peuvent faire la différence.
              Ne cochez que les équipements réellement disponibles et en état de fonctionnement.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {EQUIPMENTS.map(({ key, label, icon: Icon, description }) => (
              <button
                key={key}
                type="button"
                onClick={() => toggleEquipment(key)}
                className={cn(
                  "flex flex-col items-start gap-1 rounded-xl border px-3 py-2.5 text-left transition",
                  equipments.includes(key)
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

        {/* ── Confort ── */}
        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
              Niveau de confort
            </p>
            <p className="text-[11px] text-muted-foreground">
              Évaluez honnêtement le niveau de confort général de votre véhicule. Cette note indicative
              aide les passagers à calibrer leurs attentes avant le trajet. Un conducteur qui s'auto-évalue
              avec honnêteté évite les mauvaises surprises et reçoit de bien meilleurs avis en retour.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StarRating value={comfortRating} onChange={setComfortRating} />
            {comfortRating > 0 && (
              <span className="text-[11px] text-muted-foreground">
                {["", "Basique", "Correct", "Confortable", "Très confortable", "Luxueux"][comfortRating]}
              </span>
            )}
          </div>
        </div>

        <Separator />

        {/* ── Documents ── */}
        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
              Validité des documents
            </p>
            <p className="text-[11px] text-muted-foreground">
              Confirmez que vos documents véhicule sont en cours de validité. Le contrôle technique et
              l'assurance sont des prérequis obligatoires pour proposer des trajets sur la plateforme.
              Des documents expirés peuvent entraîner la suspension de votre compte conducteur. Pensez
              à les mettre à jour dès leur renouvellement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {/* Contrôle technique */}
            <div className="rounded-xl border border-border bg-muted/20 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium text-foreground flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" /> Contrôle technique
                </p>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCtValid(true)}
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full border transition flex items-center gap-1",
                      ctValid === true
                        ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                        : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                    )}
                  >
                    <CheckCircle2 className="w-2.5 h-2.5" /> Valide
                  </button>
                  <button
                    type="button"
                    onClick={() => setCtValid(false)}
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full border transition flex items-center gap-1",
                      ctValid === false
                        ? "bg-destructive/10 text-destructive border-destructive/20"
                        : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                    )}
                  >
                    <XCircle className="w-2.5 h-2.5" /> Expiré
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground">Date d'expiration</Label>
                <Input type="date" className="text-xs h-7" />
              </div>
            </div>

            {/* Assurance */}
            <div className="rounded-xl border border-border bg-muted/20 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Assurance
                </p>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setInsValid(true)}
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full border transition flex items-center gap-1",
                      insValid === true
                        ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                        : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                    )}
                  >
                    <CheckCircle2 className="w-2.5 h-2.5" /> Valide
                  </button>
                  <button
                    type="button"
                    onClick={() => setInsValid(false)}
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full border transition flex items-center gap-1",
                      insValid === false
                        ? "bg-destructive/10 text-destructive border-destructive/20"
                        : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                    )}
                  >
                    <XCircle className="w-2.5 h-2.5" /> Expirée
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground">Date d'expiration</Label>
                <Input type="date" className="text-xs h-7" />
              </div>
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
          Les annonces avec photos de véhicule reçoivent jusqu'à trois fois plus de réservations.
          Prenez le temps de photographier votre véhicule sous plusieurs angles dans un endroit bien
          éclairé : l'effort est minime mais l'impact sur votre visibilité est considérable.
        </p>
      </div>
    </>
  )
}