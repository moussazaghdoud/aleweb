import { JsonLd } from './JsonLd'

type BreadcrumbItem = {
  name: string
  href: string
}

type Props = {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: Props) {
  const baseUrl = 'https://www.al-enterprise.com'

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.href}`,
        })),
      }}
    />
  )
}
