'use client'

import React, { useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type FileStatus = {
  name: string
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
}

const ACCEPT = '.pdf,.txt,.md,.docx,.html'

function getPayloadToken(): string | null {
  // Try common Payload cookie prefixes
  for (const prefix of ['payload', 'payload-cms', 'aleweb']) {
    const match = document.cookie.match(new RegExp(`${prefix}-token=([^;]+)`))
    if (match) return match[1]
  }
  // Fallback: find any cookie ending with -token that looks like a JWT
  const all = document.cookie.match(/\b[\w-]+-token=(eyJ[^;]+)/i)
  return all ? all[1] : null
}

export default function BulkUploadButton() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<FileStatus[]>([])
  const [uploading, setUploading] = useState(false)

  const handleFiles = useCallback(
    async (selected: FileList) => {
      const token = getPayloadToken()
      // token may be null if cookie is HttpOnly — that's OK, we'll use credentials: 'include'

      const items: FileStatus[] = Array.from(selected).map((f) => ({
        name: f.name,
        status: 'pending' as const,
      }))
      setFiles(items)
      setUploading(true)

      for (let i = 0; i < selected.length; i++) {
        if (i > 0) await new Promise((r) => setTimeout(r, 2000))

        const file = selected[i]
        setFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, status: 'uploading' } : f)),
        )

        try {
          // Step 1: Upload file to knowledge-uploads
          const uploadForm = new FormData()
          uploadForm.append('file', file)
          const uploadRes = await fetch('/api/knowledge-uploads', {
            method: 'POST',
            credentials: 'include',
            ...(token ? { headers: { Authorization: `JWT ${token}` } } : {}),
            body: uploadForm,
          })
          const uploadText = await uploadRes.text()
          let uploadBody: any
          try { uploadBody = JSON.parse(uploadText) } catch {}

          if (!uploadRes.ok) {
            throw new Error(`Upload ${uploadRes.status}: ${JSON.stringify(uploadBody || uploadText).slice(0, 250)}`)
          }

          const uploadId = uploadBody?.doc?.id ?? uploadBody?.id
          if (!uploadId) throw new Error('Upload OK but no ID returned')

          // Step 2: Create knowledge-sources doc
          const sourceRes = await fetch('/api/knowledge-sources', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `JWT ${token}` } : {}),
            },
            body: JSON.stringify({
              name: file.name,
              type: 'file',
              file: uploadId,
            }),
          })
          const sourceText = await sourceRes.text()
          let sourceBody: any
          try { sourceBody = JSON.parse(sourceText) } catch {}

          if (!sourceRes.ok) {
            throw new Error(`Source ${sourceRes.status}: ${JSON.stringify(sourceBody || sourceText).slice(0, 250)}`)
          }

          setFiles((prev) =>
            prev.map((f, idx) => (idx === i ? { ...f, status: 'done' } : f)),
          )
        } catch (err: unknown) {
          let msg: string
          if (err instanceof DOMException && err.name === 'AbortError') {
            msg = 'Timeout — server busy'
          } else {
            msg = err instanceof Error ? err.message : String(err)
          }
          setFiles((prev) =>
            prev.map((f, idx) =>
              idx === i ? { ...f, status: 'error', error: msg } : f,
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
          if (inputRef.current) inputRef.current.value = ''
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
        {uploading ? `Uploading ${doneCount + errorCount}/${files.length}...` : 'Bulk Upload Files'}
      </button>

      {files.length > 0 && (
        <div style={{ marginTop: '12px', fontSize: '13px', lineHeight: '1.6' }}>
          {files.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ flexShrink: 0 }}>
                {f.status === 'pending' && '\u23F3'}
                {f.status === 'uploading' && '\u2B06'}
                {f.status === 'done' && '\u2705'}
                {f.status === 'error' && '\u274C'}
              </span>
              <span style={{ fontWeight: 500 }}>{f.name}</span>
              {f.error && (
                <span style={{ color: '#e53e3e', fontSize: '11px', wordBreak: 'break-all' }}>— {f.error}</span>
              )}
            </div>
          ))}
          {!uploading && (
            <div style={{ marginTop: '8px', color: '#718096' }}>
              Done: {doneCount} uploaded{errorCount > 0 ? `, ${errorCount} failed` : ''}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
