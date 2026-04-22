"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

import {
  ShieldCheck,
  FileText,
  Upload,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
} from "lucide-react"

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
type Status = "idle" | "pending" | "verified" | "rejected"

/* ─────────────────────────────────────────
   DOCUMENT CARD
───────────────────────────────────────── */
function DocumentUploadCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>("idle")

  const getStatusUI = () => {
    switch (status) {
      case "verified":
        return {
          label: "Vérifié",
          className: "bg-emerald-50 text-emerald-600 border border-emerald-200",
          icon: <CheckCircle2 className="w-3 h-3" />,
        }
      case "pending":
        return {
          label: "En cours",
          className: "bg-blue-50 text-blue-600 border border-blue-200",
          icon: <Clock className="w-3 h-3" />,
        }
      case "rejected":
        return {
          label: "Refusé",
          className: "bg-rose-50 text-rose-600 border border-rose-200",
          icon: <XCircle className="w-3 h-3" />,
        }
      default:
        return {
          label: "Non soumis",
          className: "bg-muted text-muted-foreground",
          icon: null,
        }
    }
  }

  const statusUI = getStatusUI()

  return (
    <div className="border rounded-xl p-4 space-y-3">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium">{title}</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <Badge className={`flex items-center gap-1 ${statusUI.className}`}>
          {statusUI.icon}
          {statusUI.label}
        </Badge>
      </div>

      {/* Upload */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => {
              const f = e.target.files?.[0] || null
              setFile(f)
              setStatus("idle")
            }}
          />

          {file && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setFile(null)
                setStatus("idle")
              }}
              className="text-muted-foreground hover:text-rose-500"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        {file && (
          <p className="text-[11px] text-muted-foreground">
            {file.name}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          size="sm"
          disabled={!file}
          onClick={() => {
            // 👉 ici tu brancheras ton API plus tard
            setStatus("pending")
          }}
          className="gap-1.5"
        >
          <Upload className="w-3.5 h-3.5" />
          Envoyer
        </Button>

        {status === "rejected" && (
          <Button size="sm" variant="outline">
            Réessayer
          </Button>
        )}
      </div>

    </div>
  )
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export function LegalSection() {
  const [globalStatus, setGlobalStatus] = useState<Status>("idle")

  const getGlobalStatusUI = () => {
    switch (globalStatus) {
      case "verified":
        return {
          label: "Profil vérifié",
          className: "bg-emerald-50 text-emerald-600 border border-emerald-200",
        }
      case "pending":
        return {
          label: "Vérification en cours",
          className: "bg-blue-50 text-blue-600 border border-blue-200",
        }
      case "rejected":
        return {
          label: "Vérification refusée",
          className: "bg-rose-50 text-rose-600 border border-rose-200",
        }
      default:
        return {
          label: "Non vérifié",
          className: "bg-muted text-muted-foreground",
        }
    }
  }

  const statusUI = getGlobalStatusUI()

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          Vérification du profil
        </h3>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Ajoutez vos documents officiels afin de confirmer votre identité et renforcer la confiance
          entre utilisateurs. Une vérification complète permet d’accéder à plus de fonctionnalités
          et augmente significativement vos chances d’être sélectionné pour un trajet.
        </p>
      </div>

      {/* ── Global status ── */}
      <div className="flex items-center justify-between p-3 border rounded-xl">
        <div>
          <p className="text-xs font-medium">Statut global</p>
          <p className="text-[11px] text-muted-foreground">
            État de validation de votre profil utilisateur
          </p>
        </div>

        <Badge className={statusUI.className}>
          {statusUI.label}
        </Badge>
      </div>

      <Separator />

      {/* ── Documents ── */}
      <div className="space-y-4">

        <DocumentUploadCard
          title="Carte d'identité (CIN)"
          description="Photo ou scan recto/verso accepté (image ou PDF)"
        />

        <DocumentUploadCard
          title="Permis de conduire"
          description="Obligatoire pour proposer des trajets en tant que conducteur"
        />

        <DocumentUploadCard
          title="Passeport"
          description="Optionnel mais recommandé pour renforcer votre profil"
        />

      </div>

      <Separator />

      {/* ── Submit global ── */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          Annuler
        </Button>

        <Button
          className="gap-1.5"
          onClick={() => setGlobalStatus("pending")}
        >
          <Upload className="w-3.5 h-3.5" />
          Envoyer pour vérification
        </Button>
      </div>

      {/* ── Info ── */}
      <div className="text-[11px] text-muted-foreground leading-relaxed border rounded-lg p-3 bg-muted/40">
        <p className="font-medium text-foreground mb-1">Confidentialité</p>
        <p>
          Vos documents sont utilisés uniquement dans le cadre de la vérification de votre identité.
          Ils sont stockés de manière sécurisée et ne sont jamais partagés publiquement.
          Vous pouvez supprimer ou mettre à jour vos documents à tout moment.
        </p>
      </div>

    </div>
  )
}