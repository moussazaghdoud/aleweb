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
  const enabled = config?.enabled ?? false;

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load session from localStorage on mount
  useEffect(() => {
    if (!enabled) return;
    const savedSessionId = localStorage.getItem(SESSION_ID_KEY);
    if (savedSessionId) {
      setSessionId(savedSessionId);
      fetchMessages(savedSessionId);
    }
  }, [enabled]);

  // Poll for new messages when escalated
  useEffect(() => {
    if (!enabled) return;
    if (sessionStatus === "escalated" && sessionId && isOpen) {
      pollRef.current = setInterval(() => {
        fetchMessages(sessionId);
      }, 3000);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [enabled, sessionStatus, sessionId, isOpen]);

  const handleSend = useCallback(
    async (text: string) => {
      const visitorId = getOrCreateVisitorId();

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
          const reader = res.body?.getReader();
          if (!reader) throw new Error("No response body");

          const decoder = new TextDecoder();
          let assistantContent = "";
          const assistantMsgId = "ai_" + Date.now();

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
      } catch {
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

  const handleEscalate = useCallback(async () => {
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
  }, [sessionId]);

  // ── All hooks above this line ──

  if (!enabled) return null;

  function fetchMessages(sid: string) {
    const visitorId = getOrCreateVisitorId();
    fetch(`/api/chat/sessions/${sid}?visitorId=${visitorId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
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
      })
      .catch(() => {});
  }

  const posClass = position === "bottom-left" ? "left-5" : "right-5";

  return (
    <>
      {!isOpen && (
        <ChatBubble onClick={() => setIsOpen(true)} position={position} />
      )}

      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: position === "bottom-left" ? undefined : 20,
            left: position === "bottom-left" ? 20 : undefined,
            zIndex: 9999,
            width: 380,
            maxWidth: "calc(100vw - 2.5rem)",
            height: 560,
            maxHeight: "calc(100vh - 6rem)",
            backgroundColor: "white",
            borderRadius: 16,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            border: "1px solid #e5e7eb",
            display: "flex",
            flexDirection: "column" as const,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "linear-gradient(to right, #7C3AED, #6D28D9)", color: "white", flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.2, margin: 0 }}>ALE Assistant</h3>
              <p style={{ fontSize: 10, opacity: 0.7, margin: 0 }}>
                {sessionStatus === "escalated" ? "Connected to agent" : "AI-powered support"}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ width: 28, height: 28, borderRadius: "50%", border: "none", background: "transparent", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              aria-label="Close chat"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
            {messages.length === 0 && (
              <div style={{ textAlign: "center", paddingTop: 32 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "rgba(124,58,237,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#7C3AED" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                </div>
                <p style={{ fontSize: 14, color: "#4b5563", fontWeight: 500, marginBottom: 4 }}>{greeting}</p>
                <p style={{ fontSize: 12, color: "#9ca3af" }}>Ask about our products, solutions, or services</p>
              </div>
            )}

            {messages.map((msg) => (
              <ChatMessageBubble key={msg.id} role={msg.role} content={msg.content} createdAt={msg.createdAt} />
            ))}

            {isStreaming && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 12 }}>
                <div style={{ backgroundColor: "#f3f4f6", borderRadius: 16, padding: "12px 16px", display: "flex", gap: 4 }}>
                  <span style={{ width: 8, height: 8, backgroundColor: "#9ca3af", borderRadius: "50%", animation: "bounce 1s infinite" }} />
                  <span style={{ width: 8, height: 8, backgroundColor: "#9ca3af", borderRadius: "50%", animation: "bounce 1s infinite 0.15s" }} />
                  <span style={{ width: 8, height: 8, backgroundColor: "#9ca3af", borderRadius: "50%", animation: "bounce 1s infinite 0.3s" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Escalation banner */}
          {showEscalationBanner && config?.escalationEnabled && (
            <div style={{ padding: "12px 16px", backgroundColor: "#fffbeb", borderTop: "1px solid #fde68a", display: "flex", alignItems: "center", gap: 12 }}>
              <p style={{ fontSize: 12, color: "#92400e", flex: 1, margin: 0 }}>Would you like to talk to a human agent?</p>
              <button onClick={handleEscalate} style={{ fontSize: 12, fontWeight: 600, color: "white", backgroundColor: "#7C3AED", padding: "6px 12px", borderRadius: 999, border: "none", cursor: "pointer" }}>Yes</button>
              <button onClick={() => setShowEscalationBanner(false)} style={{ fontSize: 12, color: "#6b7280", background: "none", border: "none", cursor: "pointer" }}>No thanks</button>
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
