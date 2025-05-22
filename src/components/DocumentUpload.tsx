"use client"

import { useRef } from "react"
import Image from "next/image"

interface DocumentUploadProps {
  onFilesSelected?: (files: FileList) => void
}

export default function DocumentUpload({ onFilesSelected }: DocumentUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div 
      className="w-full max-w-[792px] min-h-[500px] lg:h-[calc(100vh-300px)] max-h-[692px] flex flex-col rounded-[16px] border border-[rgba(140,192,228,0.4)] bg-white shadow-[0px_7px_32px_0px_rgba(0,0,0,0.07)]"
    >
      <div
        className="w-full h-full flex flex-col justify-center items-center gap-[5%] p-[5%]"
        onClick={handleClick}
      >
        <div className="relative w-[30%] max-w-[233px] aspect-[233/174] flex-shrink-0">
          <Image src="/upload.svg" alt="Upload Documents" fill style={{ objectFit: "contain" }} />
        </div>

        <h2 className="text-[min(30px,5vw)] font-semibold leading-[1.27] text-[#30363B] text-center">
          Click or drag any document
        </h2>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              onFilesSelected?.(e.target.files)
            }
          }}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
      </div>
    </div>
  )
} 