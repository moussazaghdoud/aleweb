/* ------------------------------------------------------------------ */
/*  Enterprise AI Chatbot — Core Types                                */
/* ------------------------------------------------------------------ */

export type SessionStatus = 'active' | 'escalated' | 'closed'
export type MessageRole = 'user' | 'assistant' | 'agent' | 'system'
export type FileStatus = 'processing' | 'indexed' | 'error'
export type EscalationStatus = 'pending' | 'accepted' | 'closed'

export interface ChatSession {
  id: string
  visitorId: string
  status: SessionStatus
  agentId?: string
  metadata: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export interface ChatMessage {
  id: string
  sessionId: string
  role: MessageRole
  content: string
  createdAt: string
}

export interface KnowledgeFile {
  id: string
  filename: string
  openaiFileId: string
  vectorStoreId: string
  fileSize: number
  mimeType: string
  status: FileStatus
  uploadedBy?: string
  createdAt: string
}

export interface EscalationRequest {
  sessionId: string
  reason?: string
  agentId?: string
  status: EscalationStatus
  createdAt: string
}

export interface ChatConfig {
  enabled: boolean
  provider?: 'rainbow' | 'intercom' | 'custom'
  position: 'bottom-right' | 'bottom-left'
  greeting: string
  openaiModel?: string
  systemPrompt?: string
  escalationEnabled?: boolean
  maxMessagesPerSession?: number
}

/** Result from chatWithRAG — either a streamed text response or an escalation signal */
export type ChatResponse =
  | { type: 'stream'; stream: AsyncIterable<string>; getFullResponse: () => string }
  | { type: 'escalation_needed'; reason: string }

/** Shape returned by the message store */
export interface ChatStore {
  createSession(visitorId: string, metadata?: Record<string, unknown>): Promise<ChatSession>
  getSession(sessionId: string): Promise<ChatSession | null>
  addMessage(sessionId: string, role: MessageRole, content: string): Promise<ChatMessage>
  getMessages(sessionId: string, after?: string): Promise<ChatMessage[]>
  updateSessionStatus(sessionId: string, status: SessionStatus, agentId?: string): Promise<void>
  getRecentSessions(status?: SessionStatus, limit?: number): Promise<ChatSession[]>
}
