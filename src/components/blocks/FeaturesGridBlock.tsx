import Image from 'next/image'

type MediaField = {
  url?: string
  alt?: string
} | null

type Feature = {
  title: string
  description: string
  icon?: string | null
  image?: MediaField
  id?: string
}

type Props = {
  heading?: string | null
  subheading?: string | null
  columns?: '2' | '3' | '4'
  features?: Feature[] | null
}

const colsClass: Record<string, string> = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

export function FeaturesGridBlock({ heading, subheading, columns = '3', features }: Props) {
  if (!features?.length) return null

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
        <div className={`grid gap-6 ${colsClass[columns]}`}>
          {features.map((feat) => (
            <div
              key={feat.id ?? feat.title}
              className="group border border-light-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              {feat.icon && (
                <div className="w-10 h-10 rounded-lg bg-ale-50 flex items-center justify-center mb-4 text-ale text-lg font-bold">
                  {feat.icon}
                </div>
              )}

              {/* Image */}
              {feat.image?.url && (
                <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={feat.image.url}
                    alt={feat.image.alt ?? feat.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <h3 className="text-base font-bold text-text mb-2">{feat.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
