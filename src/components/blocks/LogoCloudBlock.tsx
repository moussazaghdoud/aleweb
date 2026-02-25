import Image from 'next/image'

type Logo = {
  name: string
  image?: { url?: string; alt?: string } | null
  href?: string | null
  id?: string
}

type Props = {
  heading?: string | null
  logos?: Logo[] | null
  style?: 'grid' | 'carousel'
}

export function LogoCloudBlock({ heading, logos, style = 'grid' }: Props) {
  if (!logos?.length) return null

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1320px] px-6">
        {heading && (
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-10 text-center">
            {heading}
          </h2>
        )}
        <div
          className={
            style === 'carousel'
              ? 'flex gap-8 overflow-x-auto pb-4 snap-x'
              : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center'
          }
        >
          {logos.map((logo) => {
            const img = logo.image?.url ? (
              <Image
                src={logo.image.url}
                alt={logo.image.alt ?? logo.name}
                width={160}
                height={60}
                className="object-contain max-h-12 w-auto mx-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            ) : (
              <span className="text-sm font-medium text-text-secondary">{logo.name}</span>
            )

            if (logo.href) {
              return (
                <a
                  key={logo.id ?? logo.name}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 snap-start"
                >
                  {img}
                </a>
              )
            }

            return (
              <div key={logo.id ?? logo.name} className="flex items-center justify-center p-4 snap-start">
                {img}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
