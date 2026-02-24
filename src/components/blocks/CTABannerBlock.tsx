import Image from 'next/image'
import Link from 'next/link'

type MediaField = {
  url?: string
  alt?: string
} | null

type CTAButton = {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
  id?: string
}

type Props = {
  heading: string
  description?: string | null
  backgroundImage?: MediaField
  buttons?: CTAButton[] | null
  theme?: 'dark' | 'light' | 'gradient'
}

const themeMap: Record<string, { section: string; heading: string; body: string }> = {
  dark: {
    section: 'bg-ale',
    heading: 'text-white',
    body: 'text-white/70',
  },
  light: {
    section: 'bg-light-50',
    heading: 'text-text',
    body: 'text-text-secondary',
  },
  gradient: {
    section: 'bg-gradient-to-r from-ale-800 via-ale-700 to-ale',
    heading: 'text-white',
    body: 'text-white/70',
  },
}

const btnStyles: Record<string, Record<string, string>> = {
  dark: {
    primary:
      'inline-flex items-center gap-2 h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all hover:shadow-lg',
    secondary:
      'inline-flex items-center gap-2 h-12 px-7 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all',
  },
  light: {
    primary:
      'inline-flex items-center gap-2 h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all hover:shadow-lg',
    secondary:
      'inline-flex items-center gap-2 h-12 px-7 border-2 border-ale text-ale text-sm font-semibold rounded-full hover:bg-ale-50 transition-all',
  },
  gradient: {
    primary:
      'inline-flex items-center gap-2 h-12 px-7 bg-white text-ale-800 text-sm font-semibold rounded-full hover:bg-ale-50 transition-all hover:shadow-lg',
    secondary:
      'inline-flex items-center gap-2 h-12 px-7 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all',
  },
}

export function CTABannerBlock({
  heading,
  description,
  backgroundImage,
  buttons,
  theme = 'dark',
}: Props) {
  const colors = themeMap[theme] ?? themeMap.dark
  const btnTheme = btnStyles[theme] ?? btnStyles.dark

  return (
    <section className={`relative py-20 overflow-hidden ${colors.section}`}>
      {/* Optional background image */}
      {backgroundImage?.url && (
        <>
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt ?? ''}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ale-800/75" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 text-center">
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${colors.heading}`}
        >
          {heading}
        </h2>

        {description && (
          <p className={`mt-4 text-base max-w-lg mx-auto leading-relaxed ${colors.body}`}>
            {description}
          </p>
        )}

        {buttons?.length ? (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {buttons.map((btn) => (
              <Link
                key={btn.id ?? btn.href}
                href={btn.href}
                className={btnTheme[btn.variant ?? 'primary']}
              >
                {btn.label}
                <svg
                  className="w-4 h-4"
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
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
