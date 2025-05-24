"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import DragDropOverlay from "@/components/DragDropOverlay"
import DocumentUpload from "@/components/DocumentUpload"
import ChatWindow from "@/components/ChatWindow"

export default function Home() {
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    console.log("Page component mounted")
  }, [])

  const handleFileDrop = (fileList: FileList) => {
    const newFiles = Array.from(fileList)
    setFiles((prev) => [...prev, ...newFiles])
    console.log("Page: Files dropped and processed:", newFiles)
  }

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-10 bg-gradient-to-br from-white via-[#FAFDFF] to-white">
      <DragDropOverlay onFileDrop={handleFileDrop} />
      
      <div className="max-w-[1400px] mx-auto">
        <header className="flex flex-col items-start gap-1 mb-6 lg:mb-10">
          <Image 
            src="/bunnings-logo.png" 
            alt="Bunnings Logo" 
            width={180} 
            height={50} 
            className="mb-6 lg:mb-10 w-[120px] sm:w-[150px] lg:w-[180px] h-auto" 
          />

          <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold leading-[1.25] tracking-[-0.96px] text-[#001A6C] mb-1">
            Fast Contractor Registration
          </h1>
          <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-medium leading-[1.5] text-[#30363B] max-w-3xl">
            Upload the insurance documents, licenses, and other files typically requested by your clients. Not sure what to upload? Just ask using the chat
          </p>
        </header>

        <div className="flex flex-col items-center lg:items-start lg:flex-row gap-6 lg:gap-10">
          <DocumentUpload onFilesSelected={handleFileDrop} />
          <ChatWindow />
        </div>
      </div>
    </main>
  )
}
