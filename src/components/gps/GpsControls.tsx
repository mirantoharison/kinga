import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RefreshCw, Copy, Trash2, CheckCheck, ExternalLink, Share2 } from "lucide-react"
import { useState } from "react"

interface Props {
  latitude?: number
  longitude?: number
  onRefresh: () => void
  onReset: () => void
}

export function GpsControls({ latitude, longitude, onRefresh, onReset }: Props) {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)

  const hasCoords = latitude != null && longitude != null

  const handleCopy = () => {
    if (!hasCoords) return
    navigator.clipboard.writeText(`${latitude!.toFixed(6)}, ${longitude!.toFixed(6)}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenMaps = () => {
    if (!hasCoords) return
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, "_blank")
  }

  const handleShare = async () => {
    if (!hasCoords) return
    const text = `Ma position : ${latitude!.toFixed(6)}, ${longitude!.toFixed(6)}\nhttps://www.google.com/maps?q=${latitude},${longitude}`
    if (navigator.share) {
      await navigator.share({ title: "Ma position GPS", text })
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    } else {
      navigator.clipboard.writeText(text)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        {/* Primary actions */}
        <div className="flex gap-2">
          <Button
            className="flex-1 gap-2 bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
            onClick={onRefresh}
          >
            <RefreshCw className="w-4 h-4" />
            Actualiser
          </Button>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={handleCopy}
                disabled={!hasCoords}
              >
                {copied ? <CheckCheck className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              {copied ? "Copié !" : "Copier les coordonnées"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={handleShare}
                disabled={!hasCoords}
              >
                {shared ? <CheckCheck className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              {shared ? "Partagé !" : "Partager la position"}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Secondary actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 gap-2 text-muted-foreground"
            onClick={handleOpenMaps}
            disabled={!hasCoords}
          >
            <ExternalLink className="w-4 h-4" />
            Ouvrir dans Google Maps
          </Button>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={onReset}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              Réinitialiser les échantillons
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}