import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'
import { processAndSendPlan } from '@/lib/plan-email'

export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { email, goal, planJson, locale } = body

  if (!email?.trim() || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 })
  }

  try {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const res = await fetch(`${serverUrl}/api/plan-leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        goal: goal?.trim() || '',
        planJson: planJson || null,
        locale: locale || 'en',
      }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      console.error('[PlanEmail] Lead save failed:', res.status, data)
      return NextResponse.json(
        { error: data?.errors?.[0]?.message || 'Failed to save lead' },
        { status: 500 },
      )
    }

    // Extract leadId from Payload REST API response: { doc: { id, ... } }
    const leadData = await res.json().catch(() => ({}))
    const leadId = leadData?.doc?.id || leadData?.id || null

    console.log('[PlanEmail] Lead saved, id:', leadId, '| planJson present:', !!planJson)

    // Fire background task: generate detailed plan → PDF → email
    if (planJson) {
      after(async () => {
        console.log('[PlanEmail] after() callback started')
        await processAndSendPlan({
          email: email.trim(),
          goal: goal?.trim() || '',
          planJson: planJson || {},
          locale: locale || 'en',
          leadId: leadId || 'unknown',
        })
      })
    } else {
      console.warn('[PlanEmail] No planJson provided, skipping email generation')
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[PlanEmail] Route error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
