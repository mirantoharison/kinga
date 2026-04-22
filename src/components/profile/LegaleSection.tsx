"use client"

import { useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  ShieldCheck, CheckCircle2, XCircle, Clock, Info,
  Upload, FileText, Trash2, RotateCcw, AlertCircle,
  Eye, Loader2, Send,
} from "lucide-react"

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
type DocStatus = "idle" | "pending" | "verified" | "rejected"

interface SubmissionRecord {
  submittedAt: Date
  status: "verified" | "rejected"
  rejectionReason?: string
}

interface DocState {
  file: File | null
  status: DocStatus
  previewUrl: string | null
  fileError: string | null
  rejectionReason: string | null
  history: SubmissionRecord[]
}

interface DocConfig {
  id: string
  title: string
  description: string
  required: boolean
  tooltip?: string
}

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"]

const REJECTION_REASONS = [
  "Document illisible ou de mauvaise qualité",
  "Document expiré",
  "Les informations ne correspondent pas au profil",
  "Format de fichier non reconnu",
]

const DOCS: DocConfig[] = [
  {
    id: "cin",
    title: "Carte d'identité (CIN)",
    description: "Recto/verso, format image ou PDF accepté",
    required: true,
    tooltip:
      "Assurez-vous que les deux faces du document sont lisibles et que les informations ne sont pas masquées.",
  },
  {
    id: "permis",
    title: "Permis de conduire",
    description: "Obligatoire pour proposer des trajets en tant que conducteur",
    required: true,
    tooltip:
      "Votre permis doit être en cours de validité. Les permis provisoires ne sont pas acceptés.",
  },
  {
    id: "passport",
    title: "Passeport",
    description: "Renforce la confiance de votre profil",
    required: false,
    tooltip:
      "Document optionnel. L'ajouter augmente votre score de confiance et rassure les autres membres.",
  },
]

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
}

function formatDateTime(date: Date): string {
  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function validateFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type))
    return "Format non supporté. Utilisez JPG, PNG, WEBP ou PDF."
  if (file.size > MAX_FILE_SIZE)
    return `Fichier trop volumineux. Maximum ${formatFileSize(MAX_FILE_SIZE)}.`
  return null
}

function makeEmptyDoc(): DocState {
  return {
    file: null,
    status: "idle",
    previewUrl: null,
    fileError: null,
    rejectionReason: null,
    history: [],
  }
}

/* ─────────────────────────────────────────
   STATUS HELPERS
───────────────────────────────────────── */
function getDocStatusUI(status: DocStatus) {
  switch (status) {
    case "verified":
      return {
        label: "Vérifié",
        icon: <CheckCircle2 className="w-3 h-3" />,
        // Vert très sombre, désaturé
        badgeCls: "bg-[#0d1f12] text-[#6aab7a] border border-[#1e3a24]",
      }
    case "pending":
      return {
        label: "En attente",
        icon: <Loader2 className="w-3 h-3 animate-spin" />,
        // Ambre sombre et discret
        badgeCls: "bg-[#1a1608] text-[#9a8840] border border-[#2e2610]",
      }
    case "rejected":
      return {
        label: "Refusé",
        icon: <XCircle className="w-3 h-3" />,
        // Rouge sombre, pas flashy
        badgeCls: "bg-[#1a0a0a] text-[#9a5050] border border-[#2e1414]",
      }
    default:
      return {
        label: "Non soumis",
        icon: null,
        badgeCls: "bg-white/[0.04] text-muted-foreground border border-white/[0.06]",
      }
  }
}

// Bordure de la carte selon le statut — subtile, pas colorée à l'excès
function getCardBorderCls(status: DocStatus) {
  switch (status) {
    case "verified": return "border-[#1e3a24]"
    case "rejected":  return "border-[#2e1414]"
    case "pending":   return "border-[#2e2610]"
    default:          return "border-white/[0.06]"
  }
}

function getGlobalStatusUI(allVerified: boolean, anyRejected: boolean, anyPending: boolean) {
  if (allVerified)
    return {
      label: "Profil vérifié",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      cls: "bg-[#0d1f12] text-[#6aab7a] border border-[#1e3a24]",
    }
  if (anyRejected)
    return {
      label: "Action requise",
      icon: <XCircle className="w-3.5 h-3.5" />,
      cls: "bg-[#1a0a0a] text-[#9a5050] border border-[#2e1414]",
    }
  if (anyPending)
    return {
      label: "En cours de vérification",
      icon: <Clock className="w-3.5 h-3.5" />,
      cls: "bg-[#0a0f1a] text-[#5a7aaa] border border-[#14213a]",
    }
  return {
    label: "Non vérifié",
    icon: <Info className="w-3.5 h-3.5" />,
    cls: "bg-white/[0.04] text-muted-foreground border border-white/[0.06]",
  }
}

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */

function Tooltip({ text }: { text: string }) {
  const [visible, setVisible] = useState(false)
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Plus d'informations"
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      {visible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-lg border border-white/[0.08] bg-[#0e1015] p-2 text-[11px] leading-relaxed text-muted-foreground shadow-md z-50">
          {text}
        </span>
      )}
    </span>
  )
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${
          value === 100 ? "bg-[#4a8a5a]" : "bg-white/30"
        }`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

function StepsGuide() {
  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3 space-y-2 text-[11px]">
      <p className="font-medium text-foreground">Comment ça marche ?</p>
      {[
        "Choisissez ou glissez votre fichier (JPG, PNG, PDF — 10 Mo max).",
        "Vérifiez l'aperçu pour vous assurer que le document est lisible.",
        "Cliquez sur Envoyer — la vérification prend en général moins de 24 h.",
      ].map((step, i) => (
        <div key={i} className="flex items-start gap-2.5">
          <span className="w-4 h-4 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] flex items-center justify-center font-medium text-muted-foreground shrink-0 mt-px">
            {i + 1}
          </span>
          <span className="text-muted-foreground leading-relaxed">{step}</span>
        </div>
      ))}
    </div>
  )
}

function DropZone({
  dragging,
  onClick,
  onDragOver,
  onDragLeave,
  onDrop,
}: {
  dragging: boolean
  onClick: () => void
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent) => void
}) {
  return (
    <div
      onClick={onClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`
        flex flex-col items-center justify-center gap-3 rounded-xl
        border border-dashed border-white/[0.07]
        bg-transparent
        px-4 py-6 cursor-pointer
        transition-colors duration-150
        hover:bg-white/[0.02] hover:border-white/[0.12]
        ${dragging ? "bg-white/[0.04] border-white/[0.14]" : ""}
      `}
    >
      <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
        <Upload className="w-4 h-4 text-muted-foreground" />
      </div>

      <div className="text-center">
        <p className="text-[12px] font-medium text-foreground">
          {dragging ? "Déposez le fichier ici" : "Glissez ou cliquez pour ajouter"}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          JPG, PNG, WEBP ou PDF · 10 Mo max
        </p>
      </div>

      <div className="flex gap-1.5">
        {["JPG", "PNG", "PDF"].map((t) => (
          <span
            key={t}
            className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function FileRow({
  file,
  previewUrl,
  onPreview,
  onClear,
  status,
}: {
  file: File
  previewUrl: string | null
  onPreview: () => void
  onClear: (e: React.MouseEvent) => void
  status: DocStatus
}) {
  const isImage = file.type.startsWith("image/")

  return (
    <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-transparent border border-white/[0.05] transition-colors hover:bg-white/[0.02]">
      {/* Thumbnail */}
      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/[0.05] bg-transparent flex items-center justify-center">
        {previewUrl && isImage ? (
          <img src={previewUrl} className="w-full h-full object-cover" />
        ) : (
          <FileText className="w-4 h-4 text-muted-foreground" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium truncate text-foreground">{file.name}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">{formatFileSize(file.size)}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {previewUrl && isImage && status !== "verified" && (
          <button
            onClick={(e) => { e.stopPropagation(); onPreview() }}
            className="w-7 h-7 rounded-md border border-white/[0.06] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        )}
        {status !== "verified" && (
          <button
            onClick={onClear}
            className="w-7 h-7 rounded-md border border-white/[0.06] flex items-center justify-center text-muted-foreground hover:text-[#9a5050] hover:bg-[#1a0a0a] transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}

function RejectionPanel({ reason, history }: {
  reason: string | null
  history: SubmissionRecord[]
}) {
  return (
    <div className="space-y-2">
      {reason && (
        <div className="flex items-start gap-2 rounded-lg bg-[#1a0a0a] border border-[#2e1414] px-3 py-2.5">
          <AlertCircle className="w-3.5 h-3.5 text-[#9a5050] mt-0.5 shrink-0" />
          <div>
            <p className="text-[11px] font-medium text-[#9a5050] mb-0.5">Raison du refus</p>
            <p className="text-[11px] text-[#7a4040] leading-relaxed">{reason}</p>
          </div>
        </div>
      )}
      {history.length > 0 && (
        <div className="space-y-1.5 px-1">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
            Historique
          </p>
          {history.map((record, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px]">
              {record.status === "verified" ? (
                <CheckCircle2 className="w-3 h-3 text-[#4a8a5a] shrink-0" />
              ) : (
                <XCircle className="w-3 h-3 text-[#9a5050] shrink-0" />
              )}
              <span className="text-muted-foreground">{formatDateTime(record.submittedAt)}</span>
              {record.rejectionReason && (
                <span className="text-[#7a4040] truncate">· {record.rejectionReason}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function PreviewModal({ url, name, onClose }: { url: string; name: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full mx-4 rounded-xl overflow-hidden bg-transparent border border-white/[0.08] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
          <p className="text-xs font-medium truncate max-w-[260px] text-foreground">{name}</p>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>
        <div className="p-2 max-h-[70vh] overflow-auto flex items-center justify-center bg-white/[0.02]">
          <img src={url} alt={name} className="max-w-full max-h-[65vh] object-contain rounded-lg" />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   DOCUMENT CARD
───────────────────────────────────────── */
interface DocumentCardProps {
  doc: DocConfig
  docState: DocState
  onFileChange: (id: string, file: File | null) => void
  onSubmit: (id: string) => void
  onRetry: (id: string) => void
}

function DocumentCard({ doc, docState, onFileChange, onSubmit, onRetry }: DocumentCardProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  const { file, status, previewUrl, fileError, rejectionReason, history } = docState
  const statusUI = getDocStatusUI(status)
  const borderCls = getCardBorderCls(status)

  const isSubmitDisabled = !file || status === "pending" || status === "verified" || !!fileError
  const showDropZone = !file || status === "rejected"

  return (
    <>
      <div
        className={`
          rounded-2xl overflow-visible transition-colors duration-200
          bg-transparent
          border ${borderCls}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/[0.04] border border-white/[0.06]">
            <FileText className="w-4 h-4 text-muted-foreground" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium flex items-center gap-1.5 text-foreground">
              {doc.title}
              {!doc.required && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-muted-foreground font-normal">
                  optionnel
                </span>
              )}
              {doc.tooltip && <Tooltip text={doc.tooltip} />}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{doc.description}</p>
          </div>

          <Badge className={`text-[10px] gap-1 ${statusUI.badgeCls}`}>
            {statusUI.icon}
            {statusUI.label}
          </Badge>
        </div>

        {/* BODY */}
        <div className="px-4 pb-4 space-y-3">
          {showDropZone ? (
            <>
              <DropZone
                dragging={dragging}
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setDragging(false)
                  const f = e.dataTransfer.files?.[0]
                  if (f) onFileChange(doc.id, f)
                }}
              />
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) onFileChange(doc.id, f)
                }}
              />
            </>
          ) : (
            <FileRow
              file={file!}
              previewUrl={previewUrl}
              onPreview={() => setPreviewOpen(true)}
              onClear={(e) => { e.stopPropagation(); onFileChange(doc.id, null) }}
              status={status}
            />
          )}

          {/* Raison de refus + historique */}
          {(rejectionReason || history.length > 0) && (
            <RejectionPanel reason={rejectionReason} history={history} />
          )}

          {/* Erreur fichier */}
          {fileError && (
            <div className="text-[11px] text-[#9a5050] flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {fileError}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/[0.05]">
            <Button
              size="sm"
              disabled={isSubmitDisabled}
              onClick={() => onSubmit(doc.id)}
              className="gap-1.5 text-xs h-8 px-3"
            >
              {status === "pending" ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : status === "verified" ? (
                <CheckCircle2 className="w-3 h-3" />
              ) : (
                <Send className="w-3 h-3" />
              )}
              {status === "pending" ? "Envoi..." : status === "verified" ? "Validé" : "Envoyer"}
            </Button>

            {status === "rejected" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onRetry(doc.id)}
                className="text-xs h-8"
              >
                Réessayer
              </Button>
            )}
          </div>
        </div>
      </div>

      {previewOpen && previewUrl && (
        <PreviewModal url={previewUrl} name={file!.name} onClose={() => setPreviewOpen(false)} />
      )}
    </>
  )
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export function LegalSection() {
  const [docStates, setDocStates] = useState<Record<string, DocState>>(
    Object.fromEntries(DOCS.map((d) => [d.id, makeEmptyDoc()]))
  )

  const statuses = DOCS.map((d) => docStates[d.id].status)
  const verifiedCount = statuses.filter((s) => s === "verified").length
  const submittedCount = statuses.filter((s) => s !== "idle").length
  const allVerified = statuses.every((s) => s === "verified")
  const anyRejected = statuses.some((s) => s === "rejected")
  const anyPending = statuses.some((s) => s === "pending")
  const hasReadyFiles = DOCS.some(
    (d) => docStates[d.id].file && docStates[d.id].status === "idle" && !docStates[d.id].fileError
  )
  const progressPct = Math.round((verifiedCount / DOCS.length) * 100)
  const globalUI = getGlobalStatusUI(allVerified, anyRejected, anyPending)

  const requiredDocs = DOCS.filter((d) => d.required)
  const optionalDocs = DOCS.filter((d) => !d.required)

  function handleFileChange(id: string, file: File | null) {
    if (!file) {
      setDocStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], file: null, status: "idle", previewUrl: null, fileError: null },
      }))
      return
    }
    const error = validateFile(file)
    let previewUrl: string | null = null
    if (!error && file.type.startsWith("image/")) previewUrl = URL.createObjectURL(file)
    setDocStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], file: error ? null : file, status: "idle", previewUrl, fileError: error, rejectionReason: null },
    }))
  }

  function resolveDoc(id: string, prev: DocState): DocState {
    const isVerified = Math.random() > 0.25
    const reason = isVerified
      ? null
      : REJECTION_REASONS[Math.floor(Math.random() * REJECTION_REASONS.length)]
    const record: SubmissionRecord = {
      submittedAt: new Date(),
      status: isVerified ? "verified" : "rejected",
      rejectionReason: reason ?? undefined,
    }
    return { ...prev, status: isVerified ? "verified" : "rejected", rejectionReason: reason, history: [record, ...prev.history] }
  }

  function handleSubmit(id: string) {
    setDocStates((prev) => ({ ...prev, [id]: { ...prev[id], status: "pending" } }))
    setTimeout(() => {
      setDocStates((prev) => ({ ...prev, [id]: resolveDoc(id, prev[id]) }))
    }, 2000)
  }

  function handleRetry(id: string) {
    setDocStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], file: null, status: "idle", previewUrl: null, fileError: null },
    }))
  }

  function handleSubmitAll() {
    const ids = DOCS.filter(
      (d) => docStates[d.id].file && docStates[d.id].status === "idle" && !docStates[d.id].fileError
    ).map((d) => d.id)
    if (!ids.length) return
    setDocStates((prev) => {
      const next = { ...prev }
      ids.forEach((id) => { next[id] = { ...prev[id], status: "pending" } })
      return next
    })
    setTimeout(() => {
      setDocStates((prev) => {
        const next = { ...prev }
        ids.forEach((id) => { next[id] = resolveDoc(id, prev[id]) })
        return next
      })
    }, 2200)
  }

  function handleReset() {
    DOCS.forEach((d) => {
      if (docStates[d.id].previewUrl) URL.revokeObjectURL(docStates[d.id].previewUrl!)
    })
    setDocStates(Object.fromEntries(DOCS.map((d) => [d.id, makeEmptyDoc()])))
  }

  return (
    <div className="space-y-5">
      {/* En-tête */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Vérification du profil
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
            Confirmez votre identité pour accéder à toutes les fonctionnalités
            et inspirer confiance à la communauté.
          </p>
        </div>
        <Badge className={`flex items-center gap-1.5 text-[11px] shrink-0 ${globalUI.cls}`}>
          {globalUI.icon}
          {globalUI.label}
        </Badge>
      </div>

      {/* Progression */}
      <div className="space-y-1.5">
        <ProgressBar value={progressPct} />
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>
            <span className="font-medium text-foreground">{submittedCount}</span>
            {" / "}
            {DOCS.length} soumis
          </span>
          <span>
            <span className="font-medium text-[#4a8a5a]">{verifiedCount}</span>{" "}
            vérifié{verifiedCount > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Guide */}
      <StepsGuide />

      <Separator />

      {/* Documents obligatoires */}
      <div className="space-y-3">
        <div>
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
            Documents obligatoires
          </p>
          <p className="text-[11px] text-muted-foreground">
            Ces deux documents sont requis pour activer votre compte conducteur.
          </p>
        </div>
        {requiredDocs.map((doc) => (
          <DocumentCard
            key={doc.id}
            doc={doc}
            docState={docStates[doc.id]}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            onRetry={handleRetry}
          />
        ))}
      </div>

      <Separator />

      {/* Documents optionnels */}
      <div className="space-y-3">
        <div>
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
            Document optionnel
          </p>
          <p className="text-[11px] text-muted-foreground">
            Non obligatoire, mais recommandé pour augmenter votre score de confiance.
          </p>
        </div>
        {optionalDocs.map((doc) => (
          <DocumentCard
            key={doc.id}
            doc={doc}
            docState={docStates[doc.id]}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            onRetry={handleRetry}
          />
        ))}
      </div>

      <Separator />

      {/* Actions globales */}
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" onClick={handleReset}>
          Réinitialiser
        </Button>
        <Button size="sm" disabled={!hasReadyFiles} onClick={handleSubmitAll} className="gap-1.5">
          <Send className="w-3.5 h-3.5" />
          Envoyer tout
        </Button>
      </div>

      {/* Confidentialité */}
      <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 text-[11px] text-muted-foreground leading-relaxed">
        <p className="font-medium text-foreground mb-1">Confidentialité &amp; sécurité</p>
        <p>
          Vos documents sont chiffrés et utilisés uniquement pour la vérification
          d&apos;identité. Ils ne sont jamais partagés publiquement et peuvent être
          supprimés à tout moment depuis vos paramètres.
        </p>
      </div>
    </div>
  )
}