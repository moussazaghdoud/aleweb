/* ------------------------------------------------------------------ */
/*  OpenAI Responses API + File Search Integration                    */
/* ------------------------------------------------------------------ */

import OpenAI from 'openai'
import type { ChatResponse } from './types'

const ESCALATION_PATTERNS = [
  /\btalk\s+to\s+(a\s+)?(human|agent|person|someone|representative)\b/i,
  /\bspeak\s+(to|with)\s+(a\s+)?(human|agent|person|someone)\b/i,
  /\bhuman\s+agent\b/i,
  /\breal\s+person\b/i,
  /\btransfer\s+me\b/i,
  /\bescalate\b/i,
  /\bneed\s+help\s+from\s+(a\s+)?person\b/i,
]

const FALLBACK_SYSTEM_PROMPT = `You are the ALE (Alcatel-Lucent Enterprise) virtual assistant.

RULES:
- Be concise: 2-3 sentences max per answer. Use bullet points for lists.
- Always search the web for up-to-date info from al-enterprise.com and help.openrainbow.com
- Cite sources with links when possible
- Never make up specs or pricing
- If unsure, say so and suggest visiting al-enterprise.com/contact

ALE PRODUCTS: OmniSwitch (networking), OmniAccess Stellar (WiFi), Rainbow (UCaaS), OmniPCX Enterprise (telephony), OXO Connect (SMB comms), ALE Connect (contact center)

KEY SITES: al-enterprise.com, help.openrainbow.com, openrainbow.com`

/** Load system prompt and model from SiteConfig (database). Cached for 60s. */
let cachedConfig: { prompt: string; model: string; ts: number } | null = null

async function getChatConfig(): Promise<{ prompt: string; model: string }> {
  const now = Date.now()
  if (cachedConfig && now - cachedConfig.ts < 60_000) {
    return { prompt: cachedConfig.prompt, model: cachedConfig.model }
  }

  try {
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()
    const config = await payload.findGlobal({ slug: 'site-config' }) as any
    const prompt = config?.chat?.systemPrompt || FALLBACK_SYSTEM_PROMPT
    const model = config?.chat?.openaiModel || 'gpt-4o-mini'
    cachedConfig = { prompt, model, ts: now }
    return { prompt, model }
  } catch {
    return { prompt: FALLBACK_SYSTEM_PROMPT, model: 'gpt-4o-mini' }
  }
}

let openaiClient: OpenAI | null = null

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('[Chat] OPENAI_API_KEY environment variable is required')
    }
    openaiClient = new OpenAI({ apiKey })
  }
  return openaiClient
}

/** Get or create the ALE knowledge vector store */
export async function ensureVectorStore(): Promise<string> {
  // Check env first (cached after first creation)
  const existingId = process.env.OPENAI_VECTOR_STORE_ID
  if (existingId) return existingId

  const client = getOpenAIClient()

  // Search for existing store by name
  const stores = await client.vectorStores.list({ limit: 100 })
  const existing = stores.data.find((s) => s.name === 'ale-knowledge-base')
  if (existing) {
    console.log('[Chat] Found existing vector store:', existing.id)
    return existing.id
  }

  // Create new store
  const store = await client.vectorStores.create({
    name: 'ale-knowledge-base',
    expires_after: { anchor: 'last_active_at', days: 365 },
  })
  console.log('[Chat] Created new vector store:', store.id)
  return store.id
}

export async function uploadFileToVectorStore(
  buffer: Buffer,
  filename: string,
): Promise<{ fileId: string; vectorStoreId: string }> {
  const client = getOpenAIClient()
  const vectorStoreId = await ensureVectorStore()

  // Upload file to OpenAI
  const file = await client.files.create({
    file: new File([new Uint8Array(buffer)], filename),
    purpose: 'assistants',
  })

  // Add to vector store
  await client.vectorStores.files.create(vectorStoreId, {
    file_id: file.id,
  })

  return { fileId: file.id, vectorStoreId }
}

export async function deleteFileFromVectorStore(openaiFileId: string): Promise<void> {
  const client = getOpenAIClient()

  try {
    const vectorStoreId = await ensureVectorStore()
    await client.vectorStores.files.delete(openaiFileId, { vector_store_id: vectorStoreId })
  } catch {
    // File may not be in vector store — continue
  }

  try {
    await client.files.delete(openaiFileId)
  } catch {
    // File may already be deleted
  }
}

export async function listVectorStoreFiles(): Promise<
  Array<{ id: string; filename: string; status: string; bytes: number }>
> {
  const client = getOpenAIClient()
  const vectorStoreId = await ensureVectorStore()

  const files = await client.vectorStores.files.list(vectorStoreId, { limit: 100 })

  const results = await Promise.all(
    files.data.map(async (vsf) => {
      try {
        const file = await client.files.retrieve(vsf.id)
        return {
          id: vsf.id,
          filename: file.filename,
          status: vsf.status,
          bytes: file.bytes,
        }
      } catch {
        return { id: vsf.id, filename: 'unknown', status: vsf.status, bytes: 0 }
      }
    }),
  )

  return results
}

/** Check if user message indicates they want human escalation */
function detectEscalationIntent(message: string): boolean {
  return ESCALATION_PATTERNS.some((pattern) => pattern.test(message))
}

/**
 * Chat with RAG using OpenAI Responses API + File Search.
 * Returns either a streaming response or an escalation signal.
 */
export async function chatWithRAG(
  message: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>,
  systemPrompt?: string,
  model?: string,
): Promise<ChatResponse> {
  // Check for escalation intent first
  if (detectEscalationIntent(message)) {
    return { type: 'escalation_needed', reason: 'User requested human agent' }
  }

  const client = getOpenAIClient()

  // Load prompt & model from SiteConfig (DB), with fallback
  const chatConfig = await getChatConfig()
  const activePrompt = systemPrompt || chatConfig.prompt
  const activeModel = model || chatConfig.model

  let vectorStoreId: string | undefined
  try {
    vectorStoreId = await ensureVectorStore()
    const files = await client.vectorStores.files.list(vectorStoreId, { limit: 1 })
    if (files.data.length === 0) vectorStoreId = undefined
  } catch (err) {
    console.warn('[Chat] Vector store unavailable, proceeding without RAG:', err)
  }

  // Build conversation input
  const input: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = []
  const recentHistory = history.slice(-20)
  for (const msg of recentHistory) {
    input.push({ role: msg.role, content: msg.content })
  }
  input.push({ role: 'user', content: message })

  // Tools: web search + optional file search
  const tools: any[] = [{ type: 'web_search_preview' }]
  if (vectorStoreId) {
    tools.push({ type: 'file_search', vector_store_ids: [vectorStoreId] })
  }

  let fullResponse = ''

  const stream = await client.responses.create({
    model: activeModel,
    instructions: activePrompt,
    input,
    tools: tools.length > 0 ? tools : undefined,
    stream: true,
  })

  // Create async iterable that yields text chunks
  async function* streamChunks(): AsyncIterable<string> {
    for await (const event of stream) {
      if (event.type === 'response.output_text.delta') {
        fullResponse += event.delta
        yield event.delta
      }
    }
  }

  return {
    type: 'stream',
    stream: streamChunks(),
    getFullResponse: () => fullResponse,
  }
}
