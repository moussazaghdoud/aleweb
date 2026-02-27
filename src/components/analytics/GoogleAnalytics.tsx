'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

type Props = {
  gaId?: string | null
}

function hasConsent(): boolean {
  return document.cookie.split('; ').some((c) => c === 'ale_cookie_consent=accepted')
}

export function GoogleAnalytics({ gaId }: Props) {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    // Check on mount
    if (hasConsent()) {
      setConsented(true)
      return
    }
    // Listen for consent changes (cookie set by CookieConsent banner)
    const interval = setInterval(() => {
      if (hasConsent()) {
        setConsented(true)
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!gaId || !consented) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            'analytics_storage': 'granted',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
