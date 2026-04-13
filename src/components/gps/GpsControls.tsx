import { Button } from "@/components/ui/button"
import { RefreshCw, Copy, Trash2, CheckCheck } from "lucide-react"
import { useState } from "react"

interface Props {
  latitude?: number
  longitude?: number
  onRefresh: () => void
  onReset: () => void
}

export function GpsControls({ latitude, longitude, onRefresh, onReset }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (latitude == null || longitude == null) return
    navigator.clipboard.writeText(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-4 flex gap-2">
      <Button
        onClick={onRefresh}
        className="flex-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Actualiser
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="rounded-xl w-11 h-10"
        onClick={handleCopy}
        disabled={latitude == null}
      >
        {copied
          ? <CheckCheck className="w-4 h-4 text-emerald-500" />
          : <Copy className="w-4 h-4" />
        }
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="rounded-xl w-11 h-10"
        onClick={onReset}
        disabled={latitude == null}
      >
        <Trash2 className="w-4 h-4 text-destructive" />
      </Button>
    </div>
  )
}