'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

type ConsentConfig = {
  platform?: 'onetrust' | 'cookiebot' | 'custom' | null
  scriptUrl?: string | null
  domainScript?: string | null
}

type Props = {
  config?: ConsentConfig | null
}

export function CookieConsent({ config }: Props) {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = document.cookie.split('; ').find((c) => c.startsWith('ale_cookie_consent='))
    if (!consent) setShowBanner(true)
  }, [])

  // External consent platform
  if (config?.platform === 'onetrust' && config.scriptUrl) {
    return (
      <Script
        src={config.scriptUrl}
        data-domain-script={config.domainScript || ''}
        strategy="afterInteractive"
      />
    )
  }

  if (config?.platform === 'cookiebot' && config.scriptUrl) {
    return (
      <Script
        id="Cookiebot"
        src={config.scriptUrl}
        data-cbid={config.domainScript || ''}
        strategy="afterInteractive"
      />
    )
  }

  // Custom built-in banner
  if (!showBanner) return null

  const setCookie = (value: string) => {
    document.cookie = `ale_cookie_consent=${value}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`
    setShowBanner(false)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 sm:p-6">
      <div className="mx-auto max-w-[1320px] flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-600 flex-1">
          We use cookies to enhance your experience. By continuing to visit this site you agree to
          our use of cookies.{' '}
          <a href="/legal/cookies" className="text-ale underline hover:text-ale-dark">
            Learn more
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => setCookie('rejected')}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={() => setCookie('accepted')}
            className="px-4 py-2 text-sm bg-ale text-white rounded-lg hover:bg-ale-dark transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
