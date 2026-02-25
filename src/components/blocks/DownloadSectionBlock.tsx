type Resource = {
  id: string
  title: string
  description?: string
  type?: string
  href?: string
  file?: { url?: string } | null
}

type Props = {
  heading?: string | null
  resources?: Resource[] | null
}

const typeIcons: Record<string, string> = {
  whitepaper: '\uD83D\uDCC4',
  'case-study': '\uD83D\uDCCB',
  datasheet: '\uD83D\uDCC3',
  video: '\uD83C\uDFA5',
  webinar: '\uD83C\uDF10',
  guide: '\uD83D\uDCD6',
}

export function DownloadSectionBlock({ heading, resources }: Props) {
  if (!resources?.length) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-[1320px] px-6">
        {heading && (
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-8">
            {heading}
          </h2>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((res) => {
            const downloadUrl = res.file?.url || res.href || '#'
            return (
              <a
                key={res.id}
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
              >
                <span className="text-2xl shrink-0">{typeIcons[res.type || ''] || '\uD83D\uDCC1'}</span>
                <div>
                  <h3 className="text-sm font-bold text-text mb-1">{res.title}</h3>
                  {res.description && (
                    <p className="text-xs text-text-secondary line-clamp-2">{res.description}</p>
                  )}
                  {res.type && (
                    <span className="inline-block mt-2 text-xs text-ale font-medium uppercase">{res.type.replace('-', ' ')}</span>
                  )}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
