"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type MessageRole = "user" | "assistant" | "agent" | "system";

type UIMessage = {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
};

interface Props {
  config: { position?: string; greeting?: string; escalationEnabled?: boolean };
  onClose: () => void;
}

const VISITOR_ID_KEY = "ale-chat-visitor-id";
const SESSION_ID_KEY = "ale-chat-session-id";

function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = "v_" + Math.random().toString(36).slice(2, 14);
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

export default function ChatPanel({ config, onClose }: Props) {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(() => localStorage.getItem(SESSION_ID_KEY));
  const [input, setInput] = useState("");
  const [escalated, setEscalated] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const greeting = config.greeting || "Hi! How can I help you today?";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const visitorId = getVisitorId();
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    setFeedbackGiven(false);
    setMessages((prev) => [
      ...prev,
      { id: "u_" + Date.now(), role: "user", content: text, createdAt: new Date().toISOString() },
    ]);
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: text, visitorId }),
      });

      const ct = res.headers.get("content-type") || "";

      if (ct.includes("application/json")) {
        const data = await res.json();
        if (data.sessionId && !sessionId) {
          setSessionId(data.sessionId);
          localStorage.setItem(SESSION_ID_KEY, data.sessionId);
        }
        if (data.error) {
          setMessages((prev) => [
            ...prev,
            { id: "e_" + Date.now(), role: "system", content: data.error, createdAt: new Date().toISOString() },
          ]);
        }
        setIsStreaming(false);
        return;
      }

      if (ct.includes("text/event-stream")) {
        const reader = res.body?.getReader();
        if (!reader) throw new Error("No body");

        const decoder = new TextDecoder();
        let assistantContent = "";
        const msgId = "a_" + Date.now();

        setMessages((prev) => [
          ...prev,
          { id: msgId, role: "assistant", content: "", createdAt: new Date().toISOString() },
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
            try {
              const ev = JSON.parse(line.slice(6).trim());
              if (ev.type === "session" && ev.sessionId) {
                setSessionId(ev.sessionId);
                localStorage.setItem(SESSION_ID_KEY, ev.sessionId);
              }
              if (ev.type === "delta" && ev.content) {
                assistantContent += ev.content;
                setMessages((prev) =>
                  prev.map((m) => (m.id === msgId ? { ...m, content: assistantContent } : m)),
                );
              }
            } catch {}
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: "e_" + Date.now(), role: "system", content: "Connection error. Please try again.", createdAt: new Date().toISOString() },
      ]);
    } finally {
      setIsStreaming(false);
    }
  }, [input, sessionId, isStreaming]);

  const handleHappy = useCallback(() => {
    setFeedbackGiven(true);
    setMessages((prev) => [
      ...prev,
      { id: "s_" + Date.now(), role: "system", content: "Thanks for chatting! Glad I could help.", createdAt: new Date().toISOString() },
    ]);
    setTimeout(() => onClose(), 1500);
  }, [onClose]);

  const handleEscalate = useCallback(async () => {
    setFeedbackGiven(true);
    setEscalated(true);
    setMessages((prev) => [
      ...prev,
      { id: "s_" + Date.now(), role: "system", content: "Connecting you with an agent...", createdAt: new Date().toISOString() },
    ]);
    try {
      await fetch("/api/chat/escalate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, visitorId: getVisitorId(), reason: "User requested human agent" }),
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: "e_" + Date.now(), role: "system", content: "Could not connect to an agent. Please try again later.", createdAt: new Date().toISOString() },
      ]);
    }
  }, [sessionId]);

  // Show feedback buttons after the last assistant message, only when not streaming and no feedback yet
  const lastAssistantIdx = messages.reduce((acc, msg, i) => (msg.role === "assistant" ? i : acc), -1);
  const showFeedbackButtons = lastAssistantIdx >= 0 && !isStreaming && !feedbackGiven;

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999, width: 380, maxWidth: "calc(100vw - 2.5rem)", height: 560, maxHeight: "calc(100vh - 6rem)", backgroundColor: "white", borderRadius: 16, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", border: "1px solid #e5e7eb", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "linear-gradient(to right, #7C3AED, #6D28D9)", color: "white", flexShrink: 0 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>ALE Assistant</div>
          <div style={{ fontSize: 10, opacity: 0.7 }}>{escalated ? "Connecting to agent..." : "AI-powered support"}</div>
        </div>
        <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: "50%", border: "none", background: "transparent", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Close chat">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", paddingTop: 32 }}>
            <p style={{ fontSize: 14, color: "#4b5563", fontWeight: 500, marginBottom: 4 }}>{greeting}</p>
            <p style={{ fontSize: 12, color: "#9ca3af" }}>Ask about our products, solutions, or services</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={msg.id}>
            <div style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
              <div style={{
                maxWidth: "85%",
                padding: "10px 14px",
                borderRadius: 16,
                fontSize: 14,
                lineHeight: 1.5,
                ...(msg.role === "user"
                  ? { backgroundColor: "#7C3AED", color: "white", borderBottomRightRadius: 4 }
                  : msg.role === "system"
                  ? { backgroundColor: "#fffbeb", color: "#92400e", border: "1px solid #fde68a", borderRadius: 999, fontSize: 12 }
                  : { backgroundColor: "#f3f4f6", color: "#111827", borderBottomLeftRadius: 4 }),
              }}>
                {msg.content || "..."}
              </div>
            </div>
            {showFeedbackButtons && idx === lastAssistantIdx && (
              <div style={{ display: "flex", gap: 8, marginBottom: 12, paddingLeft: 4 }}>
                <button onClick={handleHappy} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 999, border: "none", backgroundColor: "#10b981", color: "white", cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>
                  &#10003; I&apos;m happy
                </button>
                <button onClick={handleEscalate} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 999, border: "none", backgroundColor: "#3b82f6", color: "white", cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>
                  &#128100; Talk to a human
                </button>
              </div>
            )}
          </div>
        ))}
        {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
          <div style={{ color: "#9ca3af", fontSize: 13, padding: "8px 0" }}>Typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, padding: 12, borderTop: "1px solid #f3f4f6", backgroundColor: "white" }}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          onInput={() => { const el = textareaRef.current; if (el) { el.style.height = "auto"; el.style.height = Math.min(el.scrollHeight, 120) + "px"; } }}
          disabled={isStreaming}
          placeholder="Ask about ALE products..."
          rows={1}
          style={{ flex: 1, resize: "none", fontSize: 14, padding: "8px 12px", borderRadius: 12, border: "1px solid #e5e7eb", backgroundColor: "#f9fafb", outline: "none", fontFamily: "inherit" }}
        />
        <button
          onClick={handleSend}
          disabled={isStreaming || !input.trim()}
          style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: isStreaming || !input.trim() ? "#d1d5db" : "#7C3AED", color: "white", border: "none", cursor: isStreaming || !input.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          aria-label="Send message"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
