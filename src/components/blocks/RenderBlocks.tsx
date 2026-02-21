import { HeroBlock } from './HeroBlock'
import { RichTextBlock } from './RichTextBlock'
import { FeaturesGridBlock } from './FeaturesGridBlock'
import { CTABannerBlock } from './CTABannerBlock'
import { StatsBlock } from './StatsBlock'
import { CardGridBlock } from './CardGridBlock'
import { ImageTextBlock } from './ImageTextBlock'
import { FAQBlock } from './FAQBlock'
import { TestimonialsBlock } from './TestimonialsBlock'

/* eslint-disable @typescript-eslint/no-explicit-any */
const blockComponents: Record<string, React.ComponentType<any>> = {
  hero: HeroBlock,
  richText: RichTextBlock,
  featuresGrid: FeaturesGridBlock,
  ctaBanner: CTABannerBlock,
  stats: StatsBlock,
  cardGrid: CardGridBlock,
  imageText: ImageTextBlock,
  faq: FAQBlock,
  testimonials: TestimonialsBlock,
}

type Props = {
  blocks: any[]
}

export function RenderBlocks({ blocks }: Props) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null
        return <Component key={block.id ?? i} {...block} />
      })}
    </>
  )
}
