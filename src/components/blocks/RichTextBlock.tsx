import Link from 'next/link'
import React from 'react'

/* -------------------------------------------------------------------------- */
/*  Lexical JSON types (simplified subset used by Payload CMS)                */
/* -------------------------------------------------------------------------- */

type LexicalNode = {
  type: string
  tag?: string
  format?: number | string
  text?: string
  children?: LexicalNode[]
  direction?: string | null
  indent?: number
  listType?: string
  url?: string
  newTab?: boolean
  fields?: { linkType?: string; url?: string; newTab?: boolean }
  [key: string]: unknown
}

type Props = {
  content?: {
    root?: {
      children?: LexicalNode[]
    }
  } | null
}

/* -------------------------------------------------------------------------- */
/*  Format bitmask flags (Lexical text format)                                */
/* -------------------------------------------------------------------------- */
const IS_BOLD = 1
const IS_ITALIC = 2
const IS_UNDERLINE = 8
const IS_CODE = 16

/* -------------------------------------------------------------------------- */
/*  Recursive Lexical renderer                                                */
/* -------------------------------------------------------------------------- */

function renderNode(node: LexicalNode, index: number): React.ReactNode {
  // --- Text leaf ---
  if (node.type === 'text') {
    let content: React.ReactNode = node.text ?? ''
    const fmt = typeof node.format === 'number' ? node.format : 0

    if (fmt & IS_BOLD) content = <strong key={index}>{content}</strong>
    if (fmt & IS_ITALIC) content = <em key={index}>{content}</em>
    if (fmt & IS_UNDERLINE) content = <u key={index}>{content}</u>
    if (fmt & IS_CODE)
      content = (
        <code
          key={index}
          className="bg-light-100 text-ale-700 rounded px-1.5 py-0.5 text-[0.85em] font-mono"
        >
          {content}
        </code>
      )

    return <React.Fragment key={index}>{content}</React.Fragment>
  }

  // --- Line break ---
  if (node.type === 'linebreak') {
    return <br key={index} />
  }

  // --- Children ---
  const children = node.children?.map((child, i) => renderNode(child, i)) ?? null

  // --- Link ---
  if (node.type === 'link') {
    const href = node.url ?? node.fields?.url ?? '#'
    const newTab = node.newTab ?? node.fields?.newTab ?? false
    return (
      <Link
        key={index}
        href={href}
        className="text-ale font-semibold hover:text-ale-dark underline underline-offset-2 transition-colors"
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Link>
    )
  }

  // --- Heading ---
  if (node.type === 'heading') {
    const headingStyles: Record<string, string> = {
      h1: 'text-4xl sm:text-5xl font-extrabold text-text tracking-tight mt-10 mb-4',
      h2: 'text-3xl sm:text-4xl font-extrabold text-text tracking-tight mt-8 mb-3',
      h3: 'text-2xl font-extrabold text-text tracking-tight mt-7 mb-3',
      h4: 'text-xl font-bold text-text mt-6 mb-2',
      h5: 'text-lg font-bold text-text mt-5 mb-2',
      h6: 'text-base font-bold text-text mt-4 mb-2',
    }
    const tag = node.tag ?? 'h2'
    return React.createElement(
      tag,
      { key: index, className: headingStyles[tag] ?? headingStyles.h2 },
      children,
    )
  }

  // --- Paragraph ---
  if (node.type === 'paragraph') {
    return (
      <p key={index} className="text-base text-text-secondary leading-relaxed mb-4">
        {children}
      </p>
    )
  }

  // --- List ---
  if (node.type === 'list') {
    const isOrdered = node.listType === 'number'
    const Tag = isOrdered ? 'ol' : 'ul'
    return (
      <Tag
        key={index}
        className={`mb-4 pl-6 text-text-secondary leading-relaxed ${
          isOrdered ? 'list-decimal' : 'list-disc'
        }`}
      >
        {children}
      </Tag>
    )
  }

  // --- List item ---
  if (node.type === 'listitem') {
    return (
      <li key={index} className="mb-1">
        {children}
      </li>
    )
  }

  // --- Quote / blockquote ---
  if (node.type === 'quote') {
    return (
      <blockquote
        key={index}
        className="border-l-4 border-ale-200 pl-5 my-6 text-text-secondary italic"
      >
        {children}
      </blockquote>
    )
  }

  // --- Fallback: render children if present ---
  if (children) {
    return <React.Fragment key={index}>{children}</React.Fragment>
  }

  return null
}

/* -------------------------------------------------------------------------- */
/*  RichTextBlock component                                                   */
/* -------------------------------------------------------------------------- */

export function RichTextBlock({ content }: Props) {
  const nodes = content?.root?.children

  if (!nodes?.length) return null

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-3xl px-6">
        {nodes.map((node, i) => renderNode(node, i))}
      </div>
    </section>
  )
}
