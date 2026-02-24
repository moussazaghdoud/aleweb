import Image from 'next/image'
import Link from 'next/link'

type MediaField = {
  url?: string
  alt?: string
  width?: number
  height?: number
} | null

type CTAButton = {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
  id?: string
}

type Props = {
  heading: string
  subheading?: string | null
  backgroundImage?: MediaField
  ctaButtons?: CTAButton[] | null
  style?: 'fullWidth' | 'centered' | 'split'
}

const buttonStyles: Record<string, string> = {
  primary:
    'inline-flex items-center gap-2 h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all hover:shadow-lg hover:shadow-ale/30',
  secondary:
    'inline-flex items-center gap-2 h-12 px-7 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all',
  ghost:
    'inline-flex items-center gap-2 h-12 px-7 text-white/90 text-sm font-semibold hover:text-white underline-offset-4 hover:underline transition-all',
}

function CTAButtons({ buttons }: { buttons: CTAButton[] }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {buttons.map((btn) => (
        <Link
          key={btn.id ?? btn.href}
          href={btn.href}
          className={buttonStyles[btn.variant ?? 'primary']}
        >
          {btn.label}
          {btn.variant !== 'ghost' && (
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
          )}
        </Link>
      ))}
    </div>
  )
}

function FullWidthHero({ heading, subheading, backgroundImage, ctaButtons }: Props) {
  return (
    <section className="relative min-h-[520px] flex items-center overflow-hidden">
      {/* Background */}
      {backgroundImage?.url ? (
        <>
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt ?? ''}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ale-800/75 via-ale-700/50 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-ale-800 via-ale-700 to-ale" />
      )}

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pt-32 pb-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
            {heading}
          </h1>
          {subheading && (
            <p className="mt-6 text-lg text-white/70 max-w-lg leading-relaxed font-light">
              {subheading}
            </p>
          )}
          {ctaButtons?.length ? <CTAButtons buttons={ctaButtons} /> : null}
        </div>
      </div>
    </section>
  )
}

function CenteredHero({ heading, subheading, backgroundImage, ctaButtons }: Props) {
  return (
    <section className="relative min-h-[480px] flex items-center overflow-hidden">
      {backgroundImage?.url ? (
        <>
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt ?? ''}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-ale-800/70" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-ale-800 via-ale-700 to-ale" />
      )}

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pt-32 pb-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
            {heading}
          </h1>
          {subheading && (
            <p className="mt-6 text-lg text-white/70 max-w-lg mx-auto leading-relaxed font-light">
              {subheading}
            </p>
          )}
          {ctaButtons?.length ? (
            <div className="flex justify-center">
              <CTAButtons buttons={ctaButtons} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function SplitHero({ heading, subheading, backgroundImage, ctaButtons }: Props) {
  return (
    <section className="bg-gradient-to-r from-ale-800 via-ale-700 to-ale">
      <div className="mx-auto max-w-[1320px] px-6 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.08] tracking-tight">
              {heading}
            </h1>
            {subheading && (
              <p className="mt-6 text-lg text-white/70 max-w-lg leading-relaxed font-light">
                {subheading}
              </p>
            )}
            {ctaButtons?.length ? <CTAButtons buttons={ctaButtons} /> : null}
          </div>

          {/* Image side */}
          {backgroundImage?.url && (
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={backgroundImage.url}
                alt={backgroundImage.alt ?? ''}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function HeroBlock(props: Props) {
  const style = props.style ?? 'fullWidth'

  switch (style) {
    case 'centered':
      return <CenteredHero {...props} />
    case 'split':
      return <SplitHero {...props} />
    default:
      return <FullWidthHero {...props} />
  }
}
