'use client'

import React, { useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type FileStatus = {
  name: string
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
}

const ACCEPT = '.pdf,.txt,.md,.docx,.html'

export default function BulkUploadButton() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<FileStatus[]>([])
  const [uploading, setUploading] = useState(false)

  const handleFiles = useCallback(
    async (selected: FileList) => {
      const items: FileStatus[] = Array.from(selected).map((f) => ({
        name: f.name,
        status: 'pending' as const,
      }))
      setFiles(items)
      setUploading(true)

      for (let i = 0; i < selected.length; i++) {
        const file = selected[i]
        setFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, status: 'uploading' } : f)),
        )

        try {
          // 1. Upload file to knowledge-uploads
          const formData = new FormData()
          formData.append('file', file)
          const uploadRes = await fetch('/api/knowledge-uploads', {
            method: 'POST',
            credentials: 'include',
            body: formData,
          })
          const uploadText = await uploadRes.text()
          if (!uploadRes.ok) {
            let msg = `Upload failed (${uploadRes.status})`
            try {
              const errBody = JSON.parse(uploadText)
              msg = errBody?.errors?.[0]?.message || errBody?.message || msg
            } catch {
              msg = uploadText?.slice(0, 200) || msg
            }
            throw new Error(msg)
          }
          const uploadDoc = JSON.parse(uploadText)
          const uploadId = uploadDoc.doc?.id ?? uploadDoc.id

          // 2. Create knowledge-sources doc
          const sourceRes = await fetch('/api/knowledge-sources', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: file.name,
              type: 'file',
              file: uploadId,
            }),
          })
          const sourceText = await sourceRes.text()
          if (!sourceRes.ok) {
            let msg = `Source failed (${sourceRes.status})`
            try {
              const errBody = JSON.parse(sourceText)
              msg = errBody?.errors?.[0]?.message || errBody?.message || msg
            } catch {
              msg = sourceText?.slice(0, 200) || msg
            }
            throw new Error(msg)
          }

          setFiles((prev) =>
            prev.map((f, idx) => (idx === i ? { ...f, status: 'done' } : f)),
          )
        } catch (err: any) {
          setFiles((prev) =>
            prev.map((f, idx) =>
              idx === i ? { ...f, status: 'error', error: err.message } : f,
            ),
          )
        }
      }

      setUploading(false)
      router.refresh()
    },
    [router],
  )

  const doneCount = files.filter((f) => f.status === 'done').length
  const errorCount = files.filter((f) => f.status === 'error').length

  return (
    <div style={{ marginBottom: '16px' }}>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPT}
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files?.length) handleFiles(e.target.files)
        }}
      />

      <button
        type="button"
        className="btn btn--style-secondary btn--size-medium"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        style={{
          cursor: uploading ? 'not-allowed' : 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 3v11M5 8l5-5 5 5M3 17h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {uploading ? `Uploading ${doneCount + errorCount}/${files.length}…` : 'Bulk Upload Files'}
      </button>

      {files.length > 0 && (
        <div style={{ marginTop: '12px', fontSize: '13px', lineHeight: '1.6' }}>
          {files.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>
                {f.status === 'pending' && '⏳'}
                {f.status === 'uploading' && '⬆️'}
                {f.status === 'done' && '✅'}
                {f.status === 'error' && '❌'}
              </span>
              <span>{f.name}</span>
              {f.error && (
                <span style={{ color: '#e53e3e', fontSize: '12px' }}>{f.error}</span>
              )}
            </div>
          ))}
          {!uploading && files.length > 0 && (
            <div style={{ marginTop: '8px', color: '#718096' }}>
              {doneCount} uploaded{errorCount > 0 ? `, ${errorCount} failed` : ''}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
