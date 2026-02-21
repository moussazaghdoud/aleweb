import Image from 'next/image'
import Link from 'next/link'

type MediaField = {
  url?: string
  alt?: string
} | null

type Card = {
  title: string
  description: string
  image?: MediaField
  href?: string | null
  badge?: string | null
  id?: string
}

type Props = {
  heading?: string | null
  subheading?: string | null
  columns?: '2' | '3' | '4'
  cards?: Card[] | null
}

const colsClass: Record<string, string> = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

function CardInner({ card }: { card: Card }) {
  return (
    <>
      {/* Image */}
      {card.image?.url && (
        <div className="relative w-full aspect-[3/2] overflow-hidden">
          <Image
            src={card.image.url}
            alt={card.image.alt ?? card.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-5">
        {/* Badge */}
        {card.badge && (
          <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest bg-ale-50 text-ale mb-3">
            {card.badge}
          </span>
        )}

        <h3 className="text-base font-bold text-text mb-2 group-hover:text-ale transition-colors">
          {card.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">{card.description}</p>

        {card.href && (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ale mt-4">
            Learn more
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        )}
      </div>
    </>
  )
}

export function CardGridBlock({ heading, subheading, columns = '3', cards }: Props) {
  if (!cards?.length) return null

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1320px] px-6">
        {/* Header */}
        {(heading || subheading) && (
          <div className="mb-12 max-w-2xl">
            {heading && (
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">{subheading}</p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className={`grid gap-5 ${colsClass[columns]}`}>
          {cards.map((card) => {
            const className =
              'group bg-white rounded-xl overflow-hidden border border-light-200 hover:border-ale-200 hover:shadow-lg transition-all duration-300'

            if (card.href) {
              return (
                <Link key={card.id ?? card.title} href={card.href} className={className}>
                  <CardInner card={card} />
                </Link>
              )
            }

            return (
              <div key={card.id ?? card.title} className={className}>
                <CardInner card={card} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
