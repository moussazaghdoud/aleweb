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

const DEFAULT_SYSTEM_PROMPT = `You are the ALE (Alcatel-Lucent Enterprise) virtual assistant on the official ALE website.

Your role:
- Answer questions about ALE products, solutions, platforms, and services
- Help visitors find the right networking, communications, and cloud solutions
- Provide accurate information based on the knowledge base documents
- Be professional, helpful, and concise

Key product families: OmniSwitch (networking), OmniAccess Stellar (WiFi/WLAN), Rainbow (cloud communications/UCaaS), OmniPCX Enterprise (telephony), OXO Connect (SMB comms)

Guidelines:
- Always use information from the knowledge base when available
- If you don't have specific information, say so honestly and suggest contacting an ALE representative
- Keep responses concise (2-4 paragraphs max)
- Use markdown formatting for clarity (bold, lists)
- Never make up product specifications or pricing
- If the user wants to speak with a human agent, acknowledge their request clearly`

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
  let vectorStoreId: string | undefined

  try {
    vectorStoreId = await ensureVectorStore()
  } catch (err) {
    console.warn('[Chat] Vector store unavailable, proceeding without RAG:', err)
  }

  // Build conversation input for Responses API
  const input: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = []

  // Add conversation history (last 10 exchanges for context window management)
  const recentHistory = history.slice(-20) // 10 pairs
  for (const msg of recentHistory) {
    input.push({ role: msg.role, content: msg.content })
  }

  // Add current message
  input.push({ role: 'user', content: message })

  // Build tools array
  const tools: any[] = []
  if (vectorStoreId) {
    tools.push({
      type: 'file_search',
      vector_store_ids: [vectorStoreId],
    })
  }

  let fullResponse = ''

  // Use Responses API with streaming
  const stream = await client.responses.create({
    model: model || 'gpt-4o',
    instructions: systemPrompt || DEFAULT_SYSTEM_PROMPT,
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
