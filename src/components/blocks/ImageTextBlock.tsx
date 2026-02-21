import Image from 'next/image'
import Link from 'next/link'

type MediaField = {
  url?: string
  alt?: string
  width?: number
  height?: number
} | null

type LexicalNode = {
  type: string
  text?: string
  children?: LexicalNode[]
  [key: string]: unknown
}

type Props = {
  heading: string
  content?: {
    root?: {
      children?: LexicalNode[]
    }
  } | null
  image?: MediaField
  imagePosition?: 'left' | 'right'
  ctaButton?: {
    label?: string | null
    href?: string | null
  } | null
}

/**
 * Extracts plain-text paragraphs from Lexical JSON for a simpler
 * text-beside-image layout. Does not render full rich text.
 */
function extractParagraphs(nodes?: LexicalNode[]): string[] {
  if (!nodes?.length) return []

  const paragraphs: string[] = []

  for (const node of nodes) {
    if (node.type === 'paragraph' || node.type === 'heading') {
      const text = extractText(node)
      if (text.trim()) paragraphs.push(text)
    }
  }

  return paragraphs
}

function extractText(node: LexicalNode): string {
  if (node.type === 'text') return node.text ?? ''
  if (node.type === 'linebreak') return '\n'
  if (!node.children?.length) return ''
  return node.children.map(extractText).join('')
}

export function ImageTextBlock({
  heading,
  content,
  image,
  imagePosition = 'right',
  ctaButton,
}: Props) {
  const paragraphs = extractParagraphs(content?.root?.children)

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1320px] px-6">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center ${
            imagePosition === 'left' ? '' : ''
          }`}
        >
          {/* Image */}
          <div
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${
              imagePosition === 'right' ? 'lg:order-2' : ''
            }`}
          >
            {image?.url ? (
              <Image
                src={image.url}
                alt={image.alt ?? heading}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-light-100" />
            )}
          </div>

          {/* Text */}
          <div className={imagePosition === 'right' ? 'lg:order-1' : ''}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
              {heading}
            </h2>

            {paragraphs.length > 0 && (
              <div className="mt-5 space-y-3">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-sm text-text-secondary leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {ctaButton?.label && ctaButton?.href && (
              <div className="mt-8">
                <Link
                  href={ctaButton.href}
                  className="inline-flex items-center gap-2 h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all hover:shadow-lg hover:shadow-ale/30"
                >
                  {ctaButton.label}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
