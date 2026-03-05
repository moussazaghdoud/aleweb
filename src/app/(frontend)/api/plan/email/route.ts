import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'
import { processAndSendPlan } from '@/lib/plan-email'
import { getPayload } from '@/lib/payload'

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
    // Use Payload local API directly (no HTTP fetch — avoids ECONNREFUSED in Docker)
    const payload = await getPayload()
    const lead = await payload.create({
      collection: 'plan-leads',
      data: {
        email: email.trim(),
        goal: goal?.trim() || '',
        planJson: planJson || null,
        locale: locale || 'en',
      },
    })

    const leadId = lead?.id || null
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
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[PlanEmail] Route error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
