import { JsonLd } from './JsonLd'

type Props = {
  name?: string
  url?: string
  logo?: string
}

export function OrganizationJsonLd({
  name = 'Alcatel-Lucent Enterprise',
  url = 'https://www.al-enterprise.com',
  logo = 'https://www.al-enterprise.com/-/media/assets/internet/images/ale-logo-og.png',
}: Props) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name,
        url,
        logo,
        sameAs: [
          'https://www.linkedin.com/company/alcatel-lucent-enterprise/',
          'https://twitter.com/ALaboratories',
          'https://www.youtube.com/user/oaboratories',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['English', 'French'],
        },
      }}
    />
  )
}
