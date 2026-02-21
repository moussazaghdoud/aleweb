type LexicalNode = {
  type: string
  text?: string
  children?: LexicalNode[]
  [key: string]: unknown
}

type FAQItem = {
  question: string
  answer?: {
    root?: {
      children?: LexicalNode[]
    }
  } | null
  id?: string
}

type Props = {
  heading?: string | null
  items?: FAQItem[] | null
}

/**
 * Extracts paragraphs of plain text from Lexical JSON for
 * a lightweight rendering inside FAQ answers.
 */
function extractText(node: LexicalNode): string {
  if (node.type === 'text') return node.text ?? ''
  if (node.type === 'linebreak') return '\n'
  if (!node.children?.length) return ''
  return node.children.map(extractText).join('')
}

function renderAnswer(nodes?: LexicalNode[]): React.ReactNode {
  if (!nodes?.length) return null

  return nodes.map((node, i) => {
    if (node.type === 'paragraph' || node.type === 'heading') {
      const text = extractText(node)
      if (!text.trim()) return null
      return (
        <p key={i} className="text-sm text-text-secondary leading-relaxed mb-3 last:mb-0">
          {text}
        </p>
      )
    }
    return null
  })
}

export function FAQBlock({ heading, items }: Props) {
  if (!items?.length) return null

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-3xl px-6">
        {heading && (
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-10 text-center">
            {heading}
          </h2>
        )}

        <div className="divide-y divide-light-200">
          {items.map((item) => (
            <details key={item.id ?? item.question} className="group">
              <summary className="flex items-center justify-between py-5 cursor-pointer list-none">
                <span className="text-base font-bold text-text pr-4">{item.question}</span>
                <span className="shrink-0 w-6 h-6 rounded-full bg-light-100 flex items-center justify-center transition-colors group-open:bg-ale-50">
                  <svg
                    className="w-4 h-4 text-text-muted group-open:rotate-180 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>

              <div className="pb-5 pl-0">
                {renderAnswer(item.answer?.root?.children)}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
