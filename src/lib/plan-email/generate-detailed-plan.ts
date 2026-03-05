/* ------------------------------------------------------------------ */
/*  Generate a detailed plan from the brief AI plan using OpenAI       */
/* ------------------------------------------------------------------ */

import { getOpenAIClient, ensureVectorStore } from '@/lib/chat/openai'

export interface DetailedPlan {
  title: string
  executiveSummary: string
  challenge: {
    analysis: string
    keyInsights: string[]
    industryContext: string
  }
  recommendation: {
    overview: string
    solutions: Array<{
      name: string
      description: string
      benefit: string
    }>
    architectureNote: string
  }
  nextSteps: {
    roadmap: Array<{
      phase: string
      description: string
      timeline: string
    }>
    quickWins: string[]
  }
  topProduct: string | null
}

const DETAILED_PLAN_PROMPT = `You are a senior ALE (Alcatel-Lucent Enterprise) solutions architect.
Your job: given a brief prospect plan and their goal, produce a DETAILED expanded plan.

STRICT RULES:
1. Ground every recommendation in the [KB CONTEXT] provided.
2. NEVER invent product names, specs, pricing, or legal claims.
3. Be specific, professional, and persuasive — this will be sent as a branded PDF.
4. Output valid JSON matching the exact schema below, nothing else.

OUTPUT JSON SCHEMA (respond with ONLY this JSON, no markdown fences):
{
  "title": "A compelling plan title (e.g., 'Digital Transformation Roadmap for [Industry]')",
  "executiveSummary": "2-3 paragraph executive summary of the plan and its expected outcomes",
  "challenge": {
    "analysis": "Detailed analysis of the prospect's current challenge (2-3 paragraphs)",
    "keyInsights": ["3-5 key insights about their industry/situation"],
    "industryContext": "Brief industry context paragraph showing ALE's expertise"
  },
  "recommendation": {
    "overview": "1-2 paragraphs positioning the recommended solution approach",
    "solutions": [
      {
        "name": "Product/Solution Name",
        "description": "What it does and how it addresses the challenge",
        "benefit": "Key business benefit"
      }
    ],
    "architectureNote": "Brief note on how solutions work together"
  },
  "nextSteps": {
    "roadmap": [
      {
        "phase": "Phase 1: Discovery & Planning",
        "description": "What happens in this phase",
        "timeline": "Weeks 1-2"
      }
    ],
    "quickWins": ["2-3 immediate actions the prospect can take"]
  },
  "topProduct": "ProductName or null"
}`

export async function generateDetailedPlan(
  goal: string,
  briefPlan: Record<string, unknown>,
  locale: string,
): Promise<DetailedPlan> {
  const client = getOpenAIClient()

  // Retrieve KB context via vector store
  let kbContext = ''
  try {
    const vectorStoreId = await ensureVectorStore()
    const files = await client.vectorStores.files.list(vectorStoreId, { limit: 1 })

    if (files.data.length > 0) {
      const searchResponse = await client.responses.create({
        model: 'gpt-4o-mini',
        instructions:
          'Search the knowledge base for information relevant to this customer goal. Return a comprehensive summary of all relevant findings.',
        input: [
          {
            role: 'user',
            content: `Find all information relevant to this enterprise goal: "${goal}"`,
          },
        ],
        tools: [{ type: 'file_search', vector_store_ids: [vectorStoreId] }],
      })

      for (const item of searchResponse.output) {
        if (item.type === 'message') {
          for (const c of item.content) {
            if (c.type === 'output_text') {
              kbContext += c.text + '\n'
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn('[PlanEmail] KB retrieval error:', err)
  }

  const userPrompt = `[KB CONTEXT]
${kbContext || 'No knowledge base content available. Use general ALE product knowledge.'}

[PROSPECT GOAL]
${goal}

[BRIEF PLAN (to expand)]
${JSON.stringify(briefPlan, null, 2)}

[LOCALE]
${locale}

Generate a DETAILED expanded plan as JSON. This will be rendered as a professional PDF sent to the prospect. Be thorough, specific, and persuasive. Include 3-4 solutions and a 3-phase roadmap.`

  const response = await client.responses.create({
    model: 'gpt-4o',
    instructions: DETAILED_PLAN_PROMPT,
    input: [{ role: 'user', content: userPrompt }],
    temperature: 0.4,
  })

  let planText = ''
  for (const item of response.output) {
    if (item.type === 'message') {
      for (const c of item.content) {
        if (c.type === 'output_text') {
          planText += c.text
        }
      }
    }
  }

  // Strip markdown fences if present
  planText = planText.replace(/^```json?\s*/i, '').replace(/\s*```$/i, '').trim()

  const plan: DetailedPlan = JSON.parse(planText)
  console.log('[PlanEmail] Detailed plan generated:', plan.title)
  return plan
}
