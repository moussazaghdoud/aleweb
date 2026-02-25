'use client'

import { useState } from 'react'

type Tab = {
  label: string
  content: any // Lexical richText data
  id?: string
}

type Props = {
  heading?: string | null
  tabs?: Tab[] | null
}

export function TabsContentBlock({ heading, tabs }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!tabs?.length) return null

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1320px] px-6">
        {heading && (
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-8">
            {heading}
          </h2>
        )}

        {/* Tab buttons */}
        <div className="flex gap-1 border-b border-gray-200 mb-8 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab.id ?? i}
              onClick={() => setActiveIndex(i)}
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                i === activeIndex
                  ? 'border-ale text-ale'
                  : 'border-transparent text-text-secondary hover:text-text hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="prose prose-sm max-w-none">
          {tabs[activeIndex]?.content && (
            typeof tabs[activeIndex].content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: tabs[activeIndex].content }} />
            ) : (
              <div className="text-text-secondary leading-relaxed">
                {JSON.stringify(tabs[activeIndex].content)}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
