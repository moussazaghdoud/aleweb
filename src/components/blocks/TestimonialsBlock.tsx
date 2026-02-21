import Image from 'next/image'

type MediaField = {
  url?: string
  alt?: string
} | null

type Testimonial = {
  quote: string
  author: string
  role?: string | null
  company?: string | null
  avatar?: MediaField
  id?: string
}

type Props = {
  heading?: string | null
  items?: Testimonial[] | null
}

export function TestimonialsBlock({ heading, items }: Props) {
  if (!items?.length) return null

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1320px] px-6">
        {heading && (
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-12 text-center">
            {heading}
          </h2>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t) => (
            <div
              key={t.id ?? t.author}
              className="bg-light-50 rounded-xl p-6 flex flex-col"
            >
              {/* Quote icon */}
              <svg
                className="w-8 h-8 text-ale-200 mb-4 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>

              {/* Quote text */}
              <p className="text-sm text-text-secondary leading-relaxed italic flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3">
                {t.avatar?.url ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={t.avatar.url}
                      alt={t.avatar.alt ?? t.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-ale-100 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-ale">
                      {t.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                <div>
                  <div className="text-sm font-bold text-text">{t.author}</div>
                  {(t.role || t.company) && (
                    <div className="text-xs text-text-muted">
                      {t.role}
                      {t.role && t.company && ', '}
                      {t.company}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
