import { JsonLd } from './JsonLd'

type Props = {
  name: string
  description: string
  image?: string
  category?: string
  slug?: string
}

export function ProductJsonLd({ name, description, image, category, slug }: Props) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        ...(image && { image }),
        brand: {
          '@type': 'Brand',
          name: 'Alcatel-Lucent Enterprise',
        },
        ...(category && { category }),
        ...(slug && {
          url: `https://www.al-enterprise.com/products/${category}/${slug}`,
        }),
      }}
    />
  )
}
