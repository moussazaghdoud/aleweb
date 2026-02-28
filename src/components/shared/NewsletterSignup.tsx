'use client'

import { useState } from 'react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <div className="mx-auto max-w-[1320px] px-6 py-14">
      <div className="max-w-2xl">
        {submitted ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white/80 text-sm">
              Thanks for subscribing! You&apos;ll hear from us soon.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-white text-lg font-semibold mb-1">Stay connected</h3>
            <p className="text-white/50 text-sm mb-5">
              Get the latest ALE news, product updates, and insights delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 px-5 rounded-full bg-white/10 text-white placeholder-white/40 text-sm border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="h-12 px-8 bg-ale text-white font-semibold rounded-full hover:bg-ale-dark transition-all text-sm shrink-0"
              >
                Subscribe
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
