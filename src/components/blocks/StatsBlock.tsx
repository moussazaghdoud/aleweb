type StatItem = {
  stat: string
  label: string
  id?: string
}

type Props = {
  heading?: string | null
  items?: StatItem[] | null
  style?: 'inline' | 'grid'
}

function InlineStats({ heading, items }: { heading?: string | null; items: StatItem[] }) {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1320px] px-6">
        {heading && (
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-10 text-center">
            {heading}
          </h2>
        )}

        <div className="flex flex-wrap justify-center gap-12 lg:gap-20">
          {items.map((item) => (
            <div key={item.id ?? item.stat} className="text-center">
              <div className="text-4xl sm:text-5xl font-extrabold text-ale tracking-tight">
                {item.stat}
              </div>
              <div className="mt-2 text-sm text-text-secondary">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GridStats({ heading, items }: { heading?: string | null; items: StatItem[] }) {
  return (
    <section className="py-16 bg-light-50">
      <div className="mx-auto max-w-[1320px] px-6">
        {heading && (
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-10 text-center">
            {heading}
          </h2>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <div
              key={item.id ?? item.stat}
              className="bg-white border border-light-200 rounded-xl p-6 text-center"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-ale tracking-tight">
                {item.stat}
              </div>
              <div className="mt-2 text-sm text-text-secondary">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StatsBlock({ heading, items, style = 'inline' }: Props) {
  if (!items?.length) return null

  if (style === 'grid') {
    return <GridStats heading={heading} items={items} />
  }

  return <InlineStats heading={heading} items={items} />
}
