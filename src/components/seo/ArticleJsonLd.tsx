import { JsonLd } from './JsonLd'

type Props = {
  title: string
  description: string
  author: string
  publishedDate: string
  image?: string
  slug?: string
}

export function ArticleJsonLd({ title, description, author, publishedDate, image, slug }: Props) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        author: {
          '@type': 'Person',
          name: author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Alcatel-Lucent Enterprise',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.al-enterprise.com/-/media/assets/internet/images/ale-logo-og.png',
          },
        },
        datePublished: publishedDate,
        ...(image && { image }),
        ...(slug && { url: `https://www.al-enterprise.com/blog/${slug}` }),
      }}
    />
  )
}
