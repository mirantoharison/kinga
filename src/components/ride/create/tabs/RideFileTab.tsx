// /components/ride/create/tabs/FilesTab.tsx

import { Paperclip, Upload, Info } from "lucide-react"

type Props = {
  // pour plus tard (upload réel)
  files?: File[]
  onFilesChange?: (files: File[]) => void
}

export function FilesTab({ files = [], onFilesChange }: Props) {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !onFilesChange) return

    const newFiles = Array.from(e.target.files)
    onFilesChange([...files, ...newFiles])
  }

  return (
    <div className="space-y-6 border border-border rounded-lg p-5 bg-card">

      {/* HEADER */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-foreground flex items-center gap-1.5">
          <Paperclip className="w-3.5 h-3.5 text-muted-foreground" />
          Fichiers et informations complémentaires
        </p>

        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Ajoutez des fichiers pour aider les conducteurs à mieux comprendre votre demande :
          photo du point de rendez-vous, bagages, ou tout élément utile.
        </p>
      </div>

      {/* UPLOAD ZONE */}
      <div className="space-y-3">
        <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:bg-muted transition-all group">

          <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center">
            <Upload className="w-4 h-4 text-muted-foreground" />
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">
              Glissez-déposez vos fichiers
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              ou cliquez pour importer
            </p>
          </div>

          <p className="text-[10px] text-muted-foreground">
            Images (JPEG, PNG) ou PDF · 5 Mo max
          </p>

          <input
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* FILE LIST (optionnel mais prêt) */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="text-xs px-3 py-2 rounded-md border border-border bg-muted flex items-center justify-between"
            >
              <span className="truncate">{file.name}</span>
              <span className="text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
          ))}
        </div>
      )}

      {/* INFO */}
      <div className="text-[11px] text-muted-foreground leading-relaxed border border-border bg-muted/50 rounded-md p-3">
        L’ajout de fichiers est facultatif mais améliore la compréhension de votre demande.
      </div>

      {/* SECURITY */}
      <div className="flex items-start gap-1.5 text-[11px] text-muted-foreground border-t border-border pt-3">
        <Info className="w-3 h-3 mt-[2px]" />
        Évitez de partager des informations sensibles. Les fichiers sont visibles par les conducteurs intéressés.
      </div>

    </div>
  )
}