type TimelineItem = {
  year: string
  title: string
  description?: string | null
  id?: string
}

type Props = {
  heading?: string | null
  items?: TimelineItem[] | null
}

export function TimelineBlock({ heading, items }: Props) {
  if (!items?.length) return null

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1320px] px-6">
        {heading && (
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-12 text-center">
            {heading}
          </h2>
        )}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-12">
            {items.map((item, i) => (
              <div
                key={item.id ?? i}
                className={`relative flex items-start gap-6 sm:gap-12 ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 bg-ale rounded-full border-2 border-white shadow" />

                {/* Content */}
                <div className={`ml-10 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                  <span className="inline-block text-sm font-bold text-ale mb-1">{item.year}</span>
                  <h3 className="text-base font-bold text-text mb-1">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
