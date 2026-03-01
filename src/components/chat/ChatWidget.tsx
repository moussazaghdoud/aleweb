"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatMessageBubble } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import type { ChatMessage, MessageRole } from "@/lib/chat/types";

interface ChatConfig {
  enabled?: boolean;
  position?: "bottom-right" | "bottom-left";
  greeting?: string;
  escalationEnabled?: boolean;
}

interface Props {
  config?: ChatConfig | null;
}

type UIMessage = {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
};

const VISITOR_ID_KEY = "ale-chat-visitor-id";
const SESSION_ID_KEY = "ale-chat-session-id";

function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = "v_" + Math.random().toString(36).slice(2, 14);
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

export function ChatWidget({ config }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionStatus, setSessionStatus] = useState<string>("active");
  const [showEscalationBanner, setShowEscalationBanner] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const position = config?.position || "bottom-right";
  const greeting = config?.greeting || "Hi! How can I help you today?";

  // Don't render if not enabled
  if (!config?.enabled) return null;

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load session from localStorage on mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem(SESSION_ID_KEY);
    if (savedSessionId) {
      setSessionId(savedSessionId);
      // Load existing messages
      loadSessionMessages(savedSessionId);
    }
  }, []);

  // Poll for new messages when escalated
  useEffect(() => {
    if (sessionStatus === "escalated" && sessionId && isOpen) {
      pollRef.current = setInterval(() => {
        loadSessionMessages(sessionId);
      }, 3000);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [sessionStatus, sessionId, isOpen]);

  async function loadSessionMessages(sid: string) {
    const visitorId = getOrCreateVisitorId();
    try {
      const res = await fetch(`/api/chat/sessions/${sid}?visitorId=${visitorId}`);
      if (!res.ok) return;
      const data = await res.json();
      setMessages(
        data.messages.map((m: ChatMessage) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          createdAt: m.createdAt,
        })),
      );
      if (data.session?.status) {
        setSessionStatus(data.session.status);
      }
    } catch {
      // Ignore — session may not exist yet
    }
  }

  const handleSend = useCallback(
    async (text: string) => {
      const visitorId = getOrCreateVisitorId();

      // Add user message to UI immediately
      const userMsg: UIMessage = {
        id: "tmp_" + Date.now(),
        role: "user",
        content: text,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsStreaming(true);
      setShowEscalationBanner(false);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, message: text, visitorId }),
        });

        // Check if response is JSON (escalation or error) vs SSE stream
        const contentType = res.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
          const data = await res.json();

          if (data.sessionId && !sessionId) {
            setSessionId(data.sessionId);
            localStorage.setItem(SESSION_ID_KEY, data.sessionId);
          }

          if (data.type === "escalation_needed") {
            setShowEscalationBanner(true);
            setIsStreaming(false);
            return;
          }

          if (data.status === "escalated") {
            setSessionStatus("escalated");
            setIsStreaming(false);
            return;
          }

          if (data.error) {
            setMessages((prev) => [
              ...prev,
              {
                id: "err_" + Date.now(),
                role: "system" as MessageRole,
                content: data.error,
                createdAt: new Date().toISOString(),
              },
            ]);
            setIsStreaming(false);
            return;
          }
        }

        if (contentType.includes("text/event-stream")) {
          // Read SSE stream
          const reader = res.body?.getReader();
          if (!reader) throw new Error("No response body");

          const decoder = new TextDecoder();
          let assistantContent = "";
          const assistantMsgId = "ai_" + Date.now();

          // Add empty assistant message
          setMessages((prev) => [
            ...prev,
            { id: assistantMsgId, role: "assistant", content: "", createdAt: new Date().toISOString() },
          ]);

          let buffer = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const jsonStr = line.slice(6).trim();
              if (!jsonStr) continue;

              try {
                const event = JSON.parse(jsonStr);

                if (event.type === "session" && event.sessionId) {
                  setSessionId(event.sessionId);
                  localStorage.setItem(SESSION_ID_KEY, event.sessionId);
                }

                if (event.type === "delta" && event.content) {
                  assistantContent += event.content;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMsgId ? { ...m, content: assistantContent } : m,
                    ),
                  );
                }

                if (event.type === "done") {
                  // Streaming complete
                }

                if (event.type === "error") {
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMsgId
                        ? { ...m, content: event.message || "An error occurred", role: "system" as MessageRole }
                        : m,
                    ),
                  );
                }
              } catch {
                // Skip malformed SSE data
              }
            }
          }
        }
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            id: "err_" + Date.now(),
            role: "system" as MessageRole,
            content: "Connection error. Please try again.",
            createdAt: new Date().toISOString(),
          },
        ]);
      } finally {
        setIsStreaming(false);
      }
    },
    [sessionId],
  );

  async function handleEscalate() {
    if (!sessionId) return;
    const visitorId = getOrCreateVisitorId();

    try {
      const res = await fetch("/api/chat/escalate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, visitorId, reason: "User requested agent" }),
      });

      const data = await res.json();
      if (data.escalated) {
        setSessionStatus("escalated");
        setShowEscalationBanner(false);
        setMessages((prev) => [
          ...prev,
          {
            id: "sys_" + Date.now(),
            role: "system",
            content: data.message || "Connecting you with an agent...",
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch {
      // Ignore
    }
  }

  const posClass = position === "bottom-left" ? "left-5" : "right-5";

  return (
    <>
      {/* Floating bubble — hidden when drawer is open */}
      {!isOpen && (
        <ChatBubble onClick={() => setIsOpen(true)} position={position} />
      )}

      {/* Chat drawer */}
      {isOpen && (
        <div
          className={`fixed bottom-5 ${posClass} z-[60] w-[380px] max-w-[calc(100vw-2.5rem)] h-[560px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-[slideUp_0.25s_ease-out]`}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-ale to-ale-dark text-white shrink-0">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold leading-tight">ALE Assistant</h3>
              <p className="text-[10px] text-white/70">
                {sessionStatus === "escalated" ? "Connected to agent" : "AI-powered support"}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-ale/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-ale" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 font-medium mb-1">{greeting}</p>
                <p className="text-xs text-gray-400">Ask about our products, solutions, or services</p>
              </div>
            )}

            {messages.map((msg) => (
              <ChatMessageBubble key={msg.id} role={msg.role} content={msg.content} createdAt={msg.createdAt} />
            ))}

            {/* Typing indicator */}
            {isStreaming && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Escalation banner */}
          {showEscalationBanner && config?.escalationEnabled && (
            <div className="px-4 py-3 bg-amber-50 border-t border-amber-200 flex items-center gap-3">
              <p className="text-xs text-amber-800 flex-1">Would you like to talk to a human agent?</p>
              <button
                onClick={handleEscalate}
                className="text-xs font-semibold text-white bg-ale px-3 py-1.5 rounded-full hover:bg-ale-dark transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => setShowEscalationBanner(false)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                No thanks
              </button>
            </div>
          )}

          {/* Input */}
          <ChatInput
            onSend={handleSend}
            disabled={isStreaming}
            placeholder={sessionStatus === "escalated" ? "Message agent..." : "Ask about ALE products..."}
          />
        </div>
      )}
    </>
  );
}
