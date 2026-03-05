/* ------------------------------------------------------------------ */
/*  Orchestrator: generate detailed plan → PDF → email → update lead   */
/* ------------------------------------------------------------------ */

import { generateDetailedPlan } from './generate-detailed-plan'
import { generatePlanPdf } from './generate-pdf'
import { sendPlanEmail } from './send-plan-email'

interface ProcessPlanInput {
  email: string
  goal: string
  planJson: Record<string, unknown>
  locale: string
  leadId: string | number
}

async function updateLeadStatus(leadId: string | number, status: 'emailed' | 'email_failed'): Promise<void> {
  try {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    await fetch(`${serverUrl}/api/plan-leads/${leadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
  } catch (err) {
    console.error(`[PlanEmail] Failed to update lead ${leadId} status:`, err)
  }
}

export async function processAndSendPlan({
  email,
  goal,
  planJson,
  locale,
  leadId,
}: ProcessPlanInput): Promise<void> {
  const startTime = Date.now()
  console.log(`[PlanEmail] Starting background task for ${email} (lead ${leadId})`)

  try {
    // Step 1: Generate detailed plan via OpenAI
    const detailedPlan = await generateDetailedPlan(goal, planJson, locale)

    // Step 2: Render PDF in memory
    const pdfBytes = await generatePlanPdf(detailedPlan, email)

    // Step 3: Send email with PDF attachment
    await sendPlanEmail(email, detailedPlan, pdfBytes, locale)

    // Step 4: Update lead status
    await updateLeadStatus(leadId, 'emailed')

    const elapsed = Date.now() - startTime
    console.log(`[PlanEmail] Completed in ${elapsed}ms for ${email}`)
  } catch (err) {
    console.error(`[PlanEmail] Failed for ${email}:`, err)
    await updateLeadStatus(leadId, 'email_failed')
  }
}
