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

      try {
        // Mark all as uploading
        setFiles((prev) => prev.map((f) => ({ ...f, status: 'uploading' as const })))

        // Send all files in one request to the bulk endpoint
        const formData = new FormData()
        for (const file of Array.from(selected)) {
          formData.append('files', file)
        }

        const res = await fetch('/api/knowledge-bulk', {
          method: 'POST',
          credentials: 'include',
          body: formData,
        })

        const text = await res.text()
        let body: any
        try { body = JSON.parse(text) } catch {}

        if (!res.ok) {
          const msg = body?.error || `Server error ${res.status}: ${text.slice(0, 200)}`
          setFiles((prev) => prev.map((f) => ({ ...f, status: 'error' as const, error: msg })))
        } else if (body?.results) {
          setFiles((prev) =>
            prev.map((f) => {
              const result = body.results.find((r: any) => r.name === f.name)
              if (!result) return { ...f, status: 'error' as const, error: 'No result returned' }
              if (result.status === 'ok') return { ...f, status: 'done' as const }
              return { ...f, status: 'error' as const, error: result.error }
            }),
          )
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        setFiles((prev) => prev.map((f) => ({ ...f, status: 'error' as const, error: msg })))
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
        {uploading ? `Uploading ${files.length} files...` : 'Bulk Upload Files'}
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
