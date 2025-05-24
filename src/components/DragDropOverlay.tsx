"use client"

import { useState, useEffect } from "react"

interface DragDropOverlayProps {
  onFileDrop: (files: FileList) => void
}

export default function DragDropOverlay({ onFileDrop }: DragDropOverlayProps) {
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      // Only set isDragging to false if we're leaving the window
      if (e.relatedTarget === null) {
        setIsDragging(false)
      }
    }

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = e.dataTransfer?.files
      if (files && files.length > 0) {
        onFileDrop(files)
        
        // Dispatch custom event for DocumentUpload component
        const event = new CustomEvent('filesDrop', {
          detail: { files }
        })
        window.dispatchEvent(event)
      }
    }

    // Add listeners to the window to handle drops anywhere on the page
    window.addEventListener("dragenter", handleDragEnter)
    window.addEventListener("dragleave", handleDragLeave)
    window.addEventListener("dragover", handleDragOver)
    window.addEventListener("drop", handleDrop)

    return () => {
      window.removeEventListener("dragenter", handleDragEnter)
      window.removeEventListener("dragleave", handleDragLeave)
      window.removeEventListener("dragover", handleDragOver)
      window.removeEventListener("drop", handleDrop)
    }
  }, [onFileDrop])

  if (!isDragging) return null

  return (
    <div className="fixed inset-0 bg-[#3D87F2] z-50 flex items-center justify-center">
      <p className="text-white text-[48px] font-semibold leading-[60px] tracking-[-0.96px]">
        Drop your files here
      </p>
    </div>
  )
} 