"use client"

import { ImageIcon, FileText } from "lucide-react"
import { Card, CardLabel } from "./MessageCard"

interface Props {
  message: {
    fileName: string
    fileType: "image" | "document"
  }
  isMe: boolean
}

export function PhotoMessage({ message, isMe }: Props) {
  const isImage = message.fileType === "image"

  return (
    <Card isMe={isMe}>
      {/* LABEL */}
      <CardLabel
        icon={isImage ? ImageIcon : FileText}
        label={isImage ? "Photo envoyée" : "Document envoyé"}
      />

      {/* FILE NAME */}
      <p className="font-medium text-xs truncate">
        {message.fileName}
      </p>
    </Card>
  )
}