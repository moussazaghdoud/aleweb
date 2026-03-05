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
  const [agentConnected, setAgentConnected] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastPollTimestamp = useRef<string | null>(null);
  const seenMessageIds = useRef(new Set<string>());

  const greeting = config.greeting || "Hi! How can I help you today?";


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // On mount, load conversation history from server if we have an existing session
  useEffect(() => {
    if (!sessionId) return;
    const visitorId = getVisitorId();
    fetch(`/api/chat/sessions/${sessionId}?visitorId=${visitorId}`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (!data) return;
        // Load existing messages (filter out empty content)
        if (data.messages?.length > 0) {
          const loaded: UIMessage[] = data.messages
            .filter((m: any) => m.content?.trim())
            .map((m: any) => {
              seenMessageIds.current.add(m.id);
              return { id: m.id, role: m.role as MessageRole, content: m.content, createdAt: m.createdAt };
            });
          setMessages(loaded);
          // Suppress feedback buttons for loaded history
          setFeedbackGiven(true);
          // Set poll cursor to latest message
          const latest = loaded[loaded.length - 1];
          if (latest) lastPollTimestamp.current = latest.createdAt;
        }
        // If session was escalated or closed, show history but start fresh with AI
        if (data.session?.status === "escalated" || data.session?.status === "closed") {
          setSessionId(null);
          localStorage.removeItem(SESSION_ID_KEY);
        }
      })
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Poll for agent/system messages when escalated
  useEffect(() => {
    if (!escalated || !sessionId) return;

    const visitorId = getVisitorId();
    let stopped = false;

    const poll = async () => {
      if (stopped) return;
      try {
        const params = new URLSearchParams({ visitorId });
        if (lastPollTimestamp.current) params.set("after", lastPollTimestamp.current);

        const res = await fetch(`/api/chat/sessions/${sessionId}?${params}`);
        if (!res.ok) return;

        const data = await res.json();

        // Filter for new agent/system messages we haven't seen
        const newMsgs: UIMessage[] = (data.messages || [])
          .filter((m: any) => (m.role === "agent" || m.role === "system") && !seenMessageIds.current.has(m.id))
          .map((m: any) => {
            seenMessageIds.current.add(m.id);
            return { id: m.id, role: m.role as MessageRole, content: m.content, createdAt: m.createdAt };
          });

        if (newMsgs.length > 0) {
          // Track agent connection
          if (newMsgs.some((m) => m.role === "agent")) {
            setAgentConnected(true);
          }

          setMessages((prev) => [...prev, ...newMsgs]);

          // Update poll cursor to latest message timestamp
          const latest = newMsgs[newMsgs.length - 1];
          if (latest) lastPollTimestamp.current = latest.createdAt;
        }

        // Stop polling if session is closed
        if (data.session?.status === "closed") {
          stopped = true;
          setEscalated(false);
        }
      } catch {
        // Ignore poll errors — will retry next interval
      }
    };

    // Initial poll immediately, then every 3 seconds
    poll();
    const interval = setInterval(poll, 3000);

    return () => {
      stopped = true;
      clearInterval(interval);
    };
  }, [escalated, sessionId]);

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
        if (data.status === "escalated") {
          // Session is in escalated mode — activate polling for agent messages
          setEscalated(true);
        } else if (data.error) {
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
              if (ev.type === "error") {
                setMessages((prev) =>
                  prev.map((m) => (m.id === msgId ? { ...m, content: ev.message || "An error occurred. Please try again." } : m)),
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
    if (escalated) return; // prevent double-click
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
    <div style={{
      position: "fixed",
      bottom: 20,
      right: 80,
      zIndex: 9999,
      width: 380,
      maxWidth: "calc(100vw - 2.5rem)",
      height: 560,
      maxHeight: "calc(100vh - 6rem)",
      /* Glassmorphism */
      background: "rgba(15, 10, 30, 0.50)",
      WebkitBackdropFilter: "blur(24px)",
      backdropFilter: "blur(24px)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      borderRadius: 20,
      boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255,255,255,0.05) inset",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>

      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 16px",
        background: "linear-gradient(135deg, rgba(59,130,246,0.32), rgba(124,58,237,0.30), rgba(6,182,212,0.28))",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        flexShrink: 0,
      }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>ALE Assistant</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{escalated ? (agentConnected ? "Connected to agent" : "Connecting to agent...") : "AI-powered support"}</div>
        </div>
        <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }} aria-label="Close chat">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Discreet scrollbar + waiting animation */}
      <style>{`
        .ale-chat-messages::-webkit-scrollbar { width: 4px; }
        .ale-chat-messages::-webkit-scrollbar-track { background: transparent; }
        .ale-chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }
        .ale-chat-messages::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
        .ale-chat-messages { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.12) transparent; }
        @keyframes ale-dot-pulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
        .ale-waiting-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #fbbf24; margin: 0 2px; animation: ale-dot-pulse 1.4s infinite ease-in-out; }
        .ale-waiting-dot:nth-child(2) { animation-delay: 0.2s; }
        .ale-waiting-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      {/* Messages */}
      <div className="ale-chat-messages" style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", paddingTop: 32 }}>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontWeight: 500, marginBottom: 4 }}>{greeting}</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Ask about our products, solutions, or services</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={msg.id}>
            {(() => {
              const isRoomEvent = msg.content?.includes("has been invited to join the bubble");
              if (msg.role === "system" || isRoomEvent) {
                const displayContent = isRoomEvent
                  ? msg.content.replace(/^.+(?=has been invited)/, "Hugo ")
                  : msg.content;
                return (
                  <div style={{ textAlign: "left", marginBottom: 2, padding: "1px 0" }}>
                    <span style={{ color: isRoomEvent ? "#67e8f9" : "#fbbf24", fontSize: 11 }}>
                      {displayContent || "..."}
                    </span>
                  </div>
                );
              }
              return null;
            })() || (msg.role !== "system" && (
            <div style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
              <div style={{
                maxWidth: "85%",
                padding: "10px 14px",
                borderRadius: 16,
                fontSize: 14,
                lineHeight: 1.5,
                whiteSpace: "pre-wrap",
                ...(msg.role === "user"
                  ? { background: "linear-gradient(135deg, #3b82f6, #7c3aed)", color: "white", borderBottomRightRadius: 4, boxShadow: "0 2px 8px rgba(124,58,237,0.3)" }
                  : msg.role === "agent"
                  ? { background: "rgba(16,185,129,0.12)", color: "rgba(255,255,255,0.9)", borderBottomLeftRadius: 4, border: "1px solid rgba(16,185,129,0.25)" }
                  : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)", borderBottomLeftRadius: 4, border: "1px solid rgba(255,255,255,0.06)" }),
              }}>
                {msg.content || "..."}
              </div>
            </div>
            ))}
            {showFeedbackButtons && idx === lastAssistantIdx && (
              <div style={{ display: "flex", gap: 8, marginBottom: 12, paddingLeft: 4 }}>
                <button onClick={handleHappy} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.15)", color: "#34d399", cursor: "pointer", fontFamily: "inherit", fontWeight: 500, transition: "background 0.2s" }}>
                  &#10003; I&apos;m happy
                </button>
                <button onClick={handleEscalate} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(59,130,246,0.3)", background: "rgba(59,130,246,0.15)", color: "#60a5fa", cursor: "pointer", fontFamily: "inherit", fontWeight: 500, transition: "background 0.2s" }}>
                  &#128100; Talk to a human
                </button>
              </div>
            )}
          </div>
        ))}
        {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, padding: "8px 0" }}>Typing...</div>
        )}
        {escalated && !agentConnected && (
          <div style={{ padding: "6px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span className="ale-waiting-dot" />
              <span className="ale-waiting-dot" />
              <span className="ale-waiting-dot" />
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginLeft: 2 }}>Waiting for an agent</span>
            </div>
            <button
              onClick={() => {
                setEscalated(false);
                setAgentConnected(false);
                setFeedbackGiven(false);
                setSessionId(null);
                localStorage.removeItem(SESSION_ID_KEY);
              }}
              style={{ marginTop: 8, fontSize: 11, padding: "4px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "inherit", transition: "background 0.2s" }}
            >
              Back to AI assistant
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, padding: 12, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => window.dispatchEvent(new CustomEvent("hero-video-pause"))}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          onInput={() => { const el = textareaRef.current; if (el) { el.style.height = "auto"; el.style.height = Math.min(el.scrollHeight, 120) + "px"; } }}
          disabled={isStreaming}
          placeholder="Ask about ALE products..."
          rows={1}
          style={{ flex: 1, resize: "none", fontSize: 14, padding: "8px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.88)", color: "#1a1a1a", outline: "none", fontFamily: "inherit" }}
        />
        <button
          onClick={handleSend}
          disabled={isStreaming || !input.trim()}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: isStreaming || !input.trim() ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg, #3b82f6, #7c3aed, #06b6d4)",
            color: "white",
            border: isStreaming || !input.trim() ? "1px solid rgba(255,255,255,0.1)" : "none",
            cursor: isStreaming || !input.trim() ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: isStreaming || !input.trim() ? "none" : "0 2px 8px rgba(124,58,237,0.4)",
            transition: "all 0.2s",
          }}
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
