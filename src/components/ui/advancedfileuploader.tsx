"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
} from "lucide-react"

type UploadStatus = "idle" | "uploading" | "done" | "error"

export function AdvancedFileUploader({
  onUpload,
}: {
  onUpload?: (file: File) => Promise<void>
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<UploadStatus>("idle")

  /* ───────── Handle file ───────── */
  const handleFile = (f: File) => {
    setFile(f)
    setStatus("idle")
    setProgress(0)

    if (f.type.startsWith("image/")) {
      const url = URL.createObjectURL(f)
      setPreview(url)
    } else {
      setPreview(null)
    }
  }

  /* ───────── Fake upload (à remplacer backend) ───────── */
  const simulateUpload = async () => {
    if (!file) return

    setStatus("uploading")

    let p = 0
    const interval = setInterval(() => {
      p += 10
      setProgress(p)
      if (p >= 100) {
        clearInterval(interval)
        setStatus("done")
      }
    }, 150)

    if (onUpload) {
      await onUpload(file)
    }
  }

  /* ───────── UI ───────── */
  return (
    <div className="space-y-3">

      {/* Drop zone */}
      {!file && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            const f = e.dataTransfer.files?.[0]
            if (f) handleFile(f)
          }}
          className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-muted/40 transition"
        >
          <UploadCloud className="w-6 h-6 mx-auto text-muted-foreground mb-2" />

          <p className="text-xs font-medium">
            Glissez votre fichier ici ou cliquez
          </p>

          <p className="text-[11px] text-muted-foreground mt-1">
            Image ou PDF — max 10MB
          </p>
        </div>
      )}

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*,application/pdf"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleFile(f)
        }}
      />

      {/* File preview */}
      {file && (
        <div className="border rounded-xl p-3 space-y-3">

          <div className="flex items-center gap-3">

            {/* Preview */}
            <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
              {preview ? (
                <img src={preview} className="object-cover w-full h-full" />
              ) : (
                <FileText className="w-5 h-5 text-muted-foreground" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{file.name}</p>
              <p className="text-[11px] text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            {/* Delete */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setFile(null)
                setPreview(null)
                setStatus("idle")
              }}
              className="text-muted-foreground hover:text-rose-500"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress */}
          {status === "uploading" && (
            <Progress value={progress} className="h-1.5" />
          )}

          {/* Success */}
          {status === "done" && (
            <div className="flex items-center gap-1 text-emerald-600 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Upload terminé
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={simulateUpload}
              disabled={status === "uploading"}
            >
              {status === "uploading" ? "Upload..." : "Uploader"}
            </Button>
          </div>

        </div>
      )}
    </div>
  )
}