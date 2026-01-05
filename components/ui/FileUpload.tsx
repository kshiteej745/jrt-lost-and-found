'use client'

import React, { useRef, useState } from 'react'

interface FileUploadProps {
  label: string
  helperText?: string
  error?: string
  accept?: string
  maxFiles?: number
  maxSizeMB?: number
  onFilesChange?: (files: File[]) => void
  required?: boolean
}

export function FileUpload({
  label,
  helperText,
  error,
  accept = 'image/*',
  maxFiles = 3,
  maxSizeMB = 5,
  onFilesChange,
  required,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadId = `file-upload-${label.toLowerCase().replace(/\s+/g, '-')}`

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    
    if (selectedFiles.length > maxFiles) {
      alert(`Please select no more than ${maxFiles} file(s).`)
      return
    }

    const validFiles: File[] = []
    const invalidFiles: string[] = []

    selectedFiles.forEach((file) => {
      if (file.size > maxSizeMB * 1024 * 1024) {
        invalidFiles.push(file.name)
      } else {
        validFiles.push(file)
      }
    })

    if (invalidFiles.length > 0) {
      alert(
        `The following files exceed ${maxSizeMB}MB: ${invalidFiles.join(', ')}`
      )
    }

    const newFiles = [...files, ...validFiles].slice(0, maxFiles)
    setFiles(newFiles)

    // Create previews
    const previewPromises = newFiles.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsDataURL(file)
        })
    )

    Promise.all(previewPromises).then((newPreviews) => {
      setPreviews(newPreviews)
    })

    onFilesChange?.(newFiles)
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    setFiles(newFiles)
    setPreviews(newPreviews)
    onFilesChange?.(newFiles)
    
    // Reset input if all files removed
    if (fileInputRef.current && newFiles.length === 0) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full">
      <label
        htmlFor={uploadId}
        className="block text-sm font-medium text-neutral-900 mb-1.5"
      >
        {label}
        {required && <span className="text-tiger-orange ml-1">*</span>}
      </label>
      <div
        className={`
          rounded-md border-2 border-dashed p-6 text-center transition-colors
          ${error ? 'border-red-500 bg-red-50' : 'border-neutral-300 bg-neutral-50'}
          hover:border-tucker-blue hover:bg-neutral-100
          focus-within:border-tucker-blue focus-within:ring-2 focus-within:ring-tucker-blue focus-within:ring-offset-2
        `}
      >
        <input
          ref={fileInputRef}
          id={uploadId}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={handleFileChange}
          className="hidden"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${uploadId}-error` : helperText ? `${uploadId}-helper` : undefined
          }
          required={required && files.length === 0}
        />
        <label
          htmlFor={uploadId}
          className="cursor-pointer"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              fileInputRef.current?.click()
            }
          }}
        >
          <svg
            className="mx-auto h-12 w-12 text-neutral-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="mt-2 block text-sm font-medium text-neutral-900">
            Click to upload photos
          </span>
          <span className="mt-1 text-xs text-neutral-500">
            PNG, JPG, GIF up to {maxSizeMB}MB (max {maxFiles} {maxFiles === 1 ? 'file' : 'files'})
          </span>
        </label>
      </div>

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="h-32 w-full rounded-md object-cover border border-neutral-200"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label={`Remove image ${index + 1}`}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {helperText && !error && (
        <p id={`${uploadId}-helper`} className="mt-1.5 text-sm text-neutral-500">
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${uploadId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

