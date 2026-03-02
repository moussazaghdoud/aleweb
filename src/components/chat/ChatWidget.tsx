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

function ChatWidgetInner({ config }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionStatus, setSessionStatus] = useState<string>("active");
  const [showEscalationBanner, setShowEscalationBanner] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const position = config?.position || "bottom-right";
  const greeting = config?.greeting || "Hi! How can I help you today?";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const savedSessionId = localStorage.getItem(SESSION_ID_KEY);
    if (savedSessionId) {
      setSessionId(savedSessionId);
    }
  }, []);

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
                // skip
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

  if (!isOpen) {
    return <ChatBubble onClick={() => setIsOpen(true)} position={position} />;
  }

  return (
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
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>ALE Assistant</div>
          <div style={{ fontSize: 10, opacity: 0.7 }}>
            {sessionStatus === "escalated" ? "Connected to agent" : "AI-powered support"}
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{ width: 28, height: 28, borderRadius: "50%", border: "none", background: "transparent", color: "white", cursor: "pointer" }}
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", paddingTop: 32 }}>
            <p style={{ fontSize: 14, color: "#4b5563", fontWeight: 500 }}>{greeting}</p>
            <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>Ask about our products, solutions, or services</p>
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} role={msg.role} content={msg.content} createdAt={msg.createdAt} />
        ))}
        {isStreaming && (
          <div style={{ color: "#9ca3af", fontSize: 12, padding: 8 }}>Typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        disabled={isStreaming}
        placeholder={sessionStatus === "escalated" ? "Message agent..." : "Ask about ALE products..."}
      />
    </div>
  );
}

// Wrapper with error boundary behavior
export function ChatWidget({ config }: Props) {
  const [error, setError] = useState(false);

  useEffect(() => {
    // Catch any unhandled errors from the inner component
    const handler = (e: ErrorEvent) => {
      if (e.message?.includes("chat") || e.message?.includes("Chat")) {
        setError(true);
      }
    };
    window.addEventListener("error", handler);
    return () => window.removeEventListener("error", handler);
  }, []);

  if (!config?.enabled || error) return null;

  return <ChatWidgetInner config={config} />;
}
