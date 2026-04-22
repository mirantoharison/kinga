"use client"

import { useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  ShieldCheck, CheckCircle2, XCircle, Clock, Info,
  Upload, FileText, Trash2, Send,
  Eye, Loader2, AlertCircle,
  ScanText,
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
   Utilise uniquement les variables CSS shadcn/ui :
   - success → text-green-* / bg-green-* (via classes Tailwind)
   - warning → text-yellow-* / bg-yellow-*
   - destructive → text-destructive / bg-destructive/10
   - muted    → text-muted-foreground / bg-muted
───────────────────────────────────────── */
function getDocStatusUI(status: DocStatus) {
  switch (status) {
    case "verified":
      return {
        label: "Vérifié",
        icon: <CheckCircle2 className="w-3 h-3" />,
        badgeCls:
          "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20",
      }
    case "pending":
      return {
        label: "En attente",
        icon: <Loader2 className="w-3 h-3 animate-spin" />,
        badgeCls:
          "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20",
      }
    case "rejected":
      return {
        label: "Refusé",
        icon: <XCircle className="w-3 h-3" />,
        badgeCls:
          "bg-destructive/10 text-destructive border border-destructive/20",
      }
    default:
      return {
        label: "Non soumis",
        icon: null,
        badgeCls:
          "bg-muted text-muted-foreground border border-border",
      }
  }
}

function getCardBorderCls(status: DocStatus) {
  switch (status) {
    case "verified": return "border-green-500/20"
    case "rejected": return "border-destructive/20"
    case "pending": return "border-yellow-500/20"
    default: return "border-border"
  }
}

function getGlobalStatusUI(allVerified: boolean, anyRejected: boolean, anyPending: boolean) {
  if (allVerified)
    return {
      label: "Profil vérifié",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      cls: "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20",
    }
  if (anyRejected)
    return {
      label: "Action requise",
      icon: <XCircle className="w-3.5 h-3.5" />,
      cls: "bg-destructive/10 text-destructive border border-destructive/20",
    }
  if (anyPending)
    return {
      label: "En cours de vérification",
      icon: <Clock className="w-3.5 h-3.5" />,
      cls: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    }
  return {
    label: "Non vérifié",
    icon: <Info className="w-3.5 h-3.5" />,
    cls: "bg-muted text-muted-foreground border border-border",
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
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-lg border border-border bg-popover text-popover-foreground p-2 text-[11px] leading-relaxed shadow-md z-50">
          {text}
        </span>
      )}
    </span>
  )
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${value === 100 ? "bg-green-500" : "bg-primary/40"
          }`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

function StepsGuide() {
  return (
    <div className="rounded-xl border border-border bg-muted/40 p-4 space-y-2">
      <p className="text-sm font-medium text-foreground flex items-center gap-2">
        <ScanText className="w-4 h-4 shrink-0" />
        Comment ça marche ?
      </p>
      <p className="text-[12px] text-muted-foreground leading-relaxed">
        Commencez par choisir ou glisser votre fichier depuis votre appareil ou votre galerie — les formats JPG, PNG, WEBP et PDF sont tous acceptés, dans la limite de 10 Mo par fichier. Avant de soumettre, prenez un moment pour consulter l'aperçu et vérifier que le document est net, bien cadré et entièrement lisible : une image floue ou tronquée est la principale cause de refus. Une fois que tout vous semble correct, cliquez sur <span className="font-medium text-foreground">Envoyer</span>. Notre équipe examine chaque document manuellement afin de garantir la fiabilité des vérifications, et vous recevrez une réponse dans un délai habituel de moins de 24 heures. En cas de refus, la raison vous sera communiquée et vous pourrez soumettre un nouveau fichier à tout moment.
      </p>
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
        border border-dashed border-border
        px-4 py-6 cursor-pointer
        transition-colors duration-150
        hover:bg-muted/50 hover:border-border/80
        ${dragging ? "bg-muted/60 border-border" : ""}
      `}
    >
      <div className="w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center">
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
            className="text-[10px] px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground"
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
    <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 border border-border transition-colors hover:bg-muted/40">
      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-border bg-muted flex items-center justify-center">
        {previewUrl && isImage ? (
          <img src={previewUrl} className="w-full h-full object-cover" />
        ) : (
          <FileText className="w-4 h-4 text-muted-foreground" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium truncate text-foreground">{file.name}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">{formatFileSize(file.size)}</p>
      </div>

      <div className="flex items-center gap-1">
        {previewUrl && isImage && status !== "verified" && (
          <button
            onClick={(e) => { e.stopPropagation(); onPreview() }}
            className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        )}
        {status !== "verified" && (
          <button
            onClick={onClear}
            className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
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
        <div className="flex items-start gap-2 rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2.5">
          <AlertCircle className="w-3.5 h-3.5 text-destructive mt-0.5 shrink-0" />
          <div>
            <p className="text-[11px] font-medium text-destructive mb-0.5">Raison du refus</p>
            <p className="text-[11px] text-destructive/80 leading-relaxed">{reason}</p>
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
                <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />
              ) : (
                <XCircle className="w-3 h-3 text-destructive shrink-0" />
              )}
              <span className="text-muted-foreground">{formatDateTime(record.submittedAt)}</span>
              {record.rejectionReason && (
                <span className="text-destructive/70 truncate">· {record.rejectionReason}</span>
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full mx-4 rounded-xl overflow-hidden bg-popover border border-border shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <p className="text-xs font-medium truncate max-w-[260px] text-foreground">{name}</p>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>
        <div className="p-2 max-h-[70vh] overflow-auto flex items-center justify-center bg-muted/30">
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
          bg-card
          border ${borderCls}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-muted border border-border">
            <FileText className="w-4 h-4 text-muted-foreground" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium flex items-center gap-1.5 text-foreground">
              {doc.title}
              {!doc.required && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted border border-border text-muted-foreground font-normal">
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

          {(rejectionReason || history.length > 0) && (
            <RejectionPanel reason={rejectionReason} history={history} />
          )}

          {fileError && (
            <div className="text-[11px] text-destructive flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {fileError}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex items-center gap-2 pt-2 border-t border-border">
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
          <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
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
            <span className="font-medium text-green-600 dark:text-green-400">{verifiedCount}</span>{" "}
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
      <div className="rounded-xl border border-border bg-muted/40 p-3 text-[11px] text-muted-foreground leading-relaxed">
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