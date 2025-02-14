"use client"

import { useState } from "react"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "@/lib/firebase"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileUploadProps {
  onFileUpload: (url: string) => void
  acceptedFileTypes?: string
}

export function FileUpload({ onFileUpload, acceptedFileTypes = "image/*" }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      const storageRef = ref(storage, `uploads/${file.name}`)
      await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(storageRef)
      onFileUpload(downloadURL)
    } catch (error) {
      setError("Failed to upload file. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Input type="file" onChange={handleFileChange} accept={acceptedFileTypes} />
      <Button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

