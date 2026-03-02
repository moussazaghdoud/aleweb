import React from 'react'

const styles = {
  container: {
    padding: '24px',
    marginBottom: '24px',
    background: '#fff',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  } as React.CSSProperties,
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  } as React.CSSProperties,
  title: {
    fontSize: '20px',
    fontWeight: 600,
    margin: 0,
    color: '#1a202c',
  } as React.CSSProperties,
  dot: (color: string) => ({
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: color,
  } as React.CSSProperties),
  statsRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,
  statCard: (borderColor: string) => ({
    flex: '1 1 120px',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    borderLeft: `4px solid ${borderColor}`,
    background: '#fafafa',
  } as React.CSSProperties),
  statLabel: {
    fontSize: '12px',
    color: '#718096',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: '4px',
  } as React.CSSProperties,
  statValue: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#1a202c',
  } as React.CSSProperties,
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '14px',
  } as React.CSSProperties,
  th: {
    textAlign: 'left' as const,
    padding: '10px 12px',
    borderBottom: '2px solid #e2e8f0',
    color: '#718096',
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  } as React.CSSProperties,
  td: {
    padding: '10px 12px',
    borderBottom: '1px solid #edf2f7',
    color: '#2d3748',
  } as React.CSSProperties,
  badge: (bg: string, color: string) => ({
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 500,
    backgroundColor: bg,
    color,
  } as React.CSSProperties),
  link: {
    color: '#3182ce',
    textDecoration: 'none',
    fontSize: '13px',
  } as React.CSSProperties,
  empty: {
    textAlign: 'center' as const,
    padding: '24px',
    color: '#a0aec0',
    fontSize: '14px',
  } as React.CSSProperties,
  error: {
    textAlign: 'center' as const,
    padding: '16px',
    color: '#e53e3e',
    fontSize: '13px',
  } as React.CSSProperties,
}

const statusBadge = (status: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    indexed: { bg: '#c6f6d5', color: '#22543d' },
    failed: { bg: '#fed7d7', color: '#822727' },
    pending: { bg: '#fefcbf', color: '#744210' },
    crawling: { bg: '#bee3f8', color: '#2a4365' },
    processing: { bg: '#e9d8fd', color: '#44337a' },
  }
  const s = map[status] || { bg: '#edf2f7', color: '#4a5568' }
  return <span style={styles.badge(s.bg, s.color)}>{status}</span>
}

const typeBadge = (type: string) => {
  if (type === 'url') return <span style={styles.badge('#ebf8ff', '#2b6cb0')}>URL</span>
  return <span style={styles.badge('#faf5ff', '#553c9a')}>File</span>
}

function formatBytes(bytes: number | null | undefined): string {
  if (!bytes) return '\u2014'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

function formatDate(date: string | null | undefined): string {
  if (!date) return '\u2014'
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function KnowledgeDashboard() {
  let sources: any[] = []
  let vectorStoreOk = false
  let vectorStoreFileCount = 0
  let loadError = ''

  try {
    // Dynamic import to avoid top-level module errors crashing admin
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'knowledge-sources',
      limit: 50,
      sort: '-updatedAt',
    })
    sources = docs as any[]
  } catch (err: any) {
    loadError = err?.message || 'Failed to load knowledge sources'
  }

  // Check vector store health (completely optional — never crash on this)
  try {
    const { getOpenAIClient, ensureVectorStore } = await import('@/lib/chat/openai')
    const vsId = await ensureVectorStore()
    const client = getOpenAIClient()
    const store = await client.vectorStores.retrieve(vsId)
    vectorStoreOk = true
    vectorStoreFileCount = (store as any).file_counts?.completed ?? 0
  } catch {
    vectorStoreOk = false
  }

  const totalSources = sources.length
  const indexed = sources.filter((s) => s.status === 'indexed').length
  const failed = sources.filter((s) => s.status === 'failed').length
  const active = sources.filter((s) => s.status === 'crawling' || s.status === 'pending' || s.status === 'processing').length

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Knowledge Base</h2>
        <span
          style={styles.dot(vectorStoreOk ? '#48bb78' : '#f56565')}
          title={vectorStoreOk ? `Vector store OK (${vectorStoreFileCount} files)` : 'Vector store unavailable'}
        />
        {vectorStoreOk && (
          <span style={{ fontSize: '12px', color: '#718096' }}>
            {vectorStoreFileCount} files in vector store
          </span>
        )}
      </div>

      {loadError ? (
        <div style={styles.error}>Could not load knowledge sources: {loadError}</div>
      ) : (
        <>
          <div style={styles.statsRow}>
            <div style={styles.statCard('#4299e1')}>
              <div style={styles.statLabel}>Total Sources</div>
              <div style={styles.statValue}>{totalSources}</div>
            </div>
            <div style={styles.statCard('#48bb78')}>
              <div style={styles.statLabel}>Indexed</div>
              <div style={styles.statValue}>{indexed}</div>
            </div>
            <div style={styles.statCard('#f56565')}>
              <div style={styles.statLabel}>Failed</div>
              <div style={styles.statValue}>{failed}</div>
            </div>
            <div style={styles.statCard('#ed8936')}>
              <div style={styles.statLabel}>Pending / Active</div>
              <div style={styles.statValue}>{active}</div>
            </div>
          </div>

          {sources.length === 0 ? (
            <div style={styles.empty}>
              No knowledge sources yet. Add files or URLs from the Knowledge Sources collection.
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Size</th>
                  <th style={styles.th}>Last Indexed</th>
                  <th style={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {sources.map((source: any) => (
                  <tr key={source.id}>
                    <td style={styles.td}>{source.name}</td>
                    <td style={styles.td}>{typeBadge(source.type)}</td>
                    <td style={styles.td}>{statusBadge(source.status)}</td>
                    <td style={styles.td}>{formatBytes(source.fileSize)}</td>
                    <td style={styles.td}>{formatDate(source.lastIndexedAt)}</td>
                    <td style={styles.td}>
                      <a
                        href={`/admin/collections/knowledge-sources/${source.id}`}
                        style={styles.link}
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  )
}
