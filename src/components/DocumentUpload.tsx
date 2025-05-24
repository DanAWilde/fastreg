"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { Trash2 } from "lucide-react"

type UploadedFile = {
  id: string
  name: string
  progress: number // 0-100
  status: "uploading" | "complete" | "error"
}

interface DocumentUploadProps {
  onFilesSelected?: (files: FileList) => void
}

export default function DocumentUpload({ onFilesSelected }: DocumentUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files)
      onFilesSelected?.(e.target.files)
    }
  }

  const addFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      progress: 0,
      status: "uploading" as const,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate file upload progress for each file
    newFiles.forEach((file) => {
      simulateFileUpload(file.id)
    })
  }

  const simulateFileUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 5

      setFiles((prev) =>
        prev.map((file) => (file.id === fileId ? { ...file, progress: Math.min(progress, 100) } : file)),
      )

      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, status: "complete" } : file)))
        }, 500)
      }
    }, 100)
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
  }

  // Handle files dropped from the DragDropOverlay
  useEffect(() => {
    const handleGlobalFileDrop = (e: CustomEvent) => {
      if (e.detail?.files) {
        addFiles(e.detail.files)
      }
    }

    window.addEventListener('filesDrop', handleGlobalFileDrop as EventListener)
    return () => window.removeEventListener('filesDrop', handleGlobalFileDrop as EventListener)
  }, [])

  return (
    <div 
      className="w-full max-w-[792px] min-h-[500px] lg:h-[calc(100vh-300px)] max-h-[692px] flex flex-col rounded-[16px] border border-[rgba(140,192,228,0.4)] bg-white shadow-[0px_7px_32px_0px_rgba(0,0,0,0.07)]"
    >
      {files.length === 0 ? (
        // Empty state - show upload UI
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
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </div>
      ) : (
        // Files uploaded - show table view
        <div className="flex flex-col items-start gap-0 flex-1 self-stretch w-full h-full p-8">
          <h2 className="text-[min(30px,5vw)] font-semibold leading-[1.27] text-[#30363B] text-center w-full mb-8">
            Your documents
          </h2>

          <div className="flex flex-col w-full flex-1 overflow-y-auto">
            {files.map((file, index) => (
              <div key={file.id}>
                <div
                  className={`flex h-[56px] min-h-[56px] p-[8px_12px_8px_0] items-center gap-2 self-stretch transition-colors ${
                    hoverIndex === index ? "bg-[#F5F8FA]" : ""
                  }`}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <div className="flex-1">
                    {file.status === "uploading" ? (
                      <div className="w-full">
                        <div className="text-[#30363B] font-medium mb-1">Uploading {file.name}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#005DE3] h-2 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${file.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <p
                        className="text-[#30363B] font-medium"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          overflow: "hidden",
                        }}
                      >
                        {file.name}
                      </p>
                    )}
                  </div>
                  {hoverIndex === index && file.status === "complete" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFile(file.id)
                      }}
                      className="p-2 text-[#505A62] hover:text-[#30363B]"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                {index < files.length - 1 && (
                  <div className="flex h-[1px] justify-center items-center self-stretch bg-[#E6EBF0]"></div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-auto w-full pt-4">
            <button
              className="flex h-[48px] p-[12px_16px] justify-center items-center gap-2 self-stretch rounded-[4px] bg-[#005DE3] text-white font-medium w-full"
              onClick={handleClick}
            >
              {files.some((file) => file.status === "uploading")
                ? "Uploading documents..."
                : "Submit documents and move to next step"}
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </div>
      )}
    </div>
  )
} 