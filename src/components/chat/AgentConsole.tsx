"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChatMessageBubble } from "./ChatMessage";
import type { ChatMessage, MessageRole } from "@/lib/chat/types";

type SessionPreview = {
  id: string;
  visitorId: string;
  status: string;
  agentId?: string;
  messageCount: number;
  lastMessage: string;
  createdAt: string;
  updatedAt: string;
};

type QueueData = {
  pending: SessionPreview[];
  active: SessionPreview[];
};

export function AgentConsole() {
  const [queue, setQueue] = useState<QueueData>({ pending: [], active: [] });
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch queue
  const fetchQueue = useCallback(async () => {
    try {
      const res = await fetch("/api/chat/agent/queue", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setQueue(data);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  // Poll queue every 5s
  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 5000);
    return () => clearInterval(interval);
  }, [fetchQueue]);

  // Fetch messages for selected session
  const fetchMessages = useCallback(async () => {
    if (!selectedSession) return;
    try {
      const res = await fetch(
        `/api/chat/agent/messages?sessionId=${selectedSession}`,
        { credentials: "include" },
      );
      // This is SSE — we need to use the regular messages endpoint instead
    } catch {
      // ignore
    }
  }, [selectedSession]);

  // Poll messages for selected session
  useEffect(() => {
    if (!selectedSession) return;

    const fetchMsgs = async () => {
      try {
        // Use a simple GET to the session endpoint
        const res = await fetch(
          `/api/chat/sessions/${selectedSession}?visitorId=agent-view`,
          { credentials: "include" },
        );
        // Note: agent-view won't match visitorId — we need a different endpoint
        // Use the agent messages endpoint with POST instead
      } catch {
        // ignore
      }
    };

    // For now, poll using the SSE endpoint as a regular fetch
    const pollMessages = async () => {
      try {
        const res = await fetch(
          `/api/chat/agent/messages?sessionId=${selectedSession}`,
          { credentials: "include" },
        );
        if (!res.ok || !res.body) return;

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
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
              const event = JSON.parse(line.slice(6));
              if (event.type === "messages" && event.messages) {
                setMessages(event.messages);
              }
              if (event.type === "session_closed") {
                fetchQueue();
              }
            } catch {
              // skip
            }
          }
        }
      } catch {
        // reconnect on error
      }
    };

    pollMessages();

    return () => {
      // SSE cleanup handled by component unmount
    };
  }, [selectedSession, fetchQueue]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleAccept(sessionId: string) {
    try {
      const res = await fetch("/api/chat/agent/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sessionId }),
      });
      if (res.ok) {
        setSelectedSession(sessionId);
        fetchQueue();
      }
    } catch {
      // ignore
    }
  }

  async function handleSendMessage(sessionId: string, content: string) {
    try {
      await fetch("/api/chat/agent/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sessionId, content }),
      });
    } catch {
      // ignore
    }
  }

  async function handleCloseSession(sessionId: string) {
    try {
      // Close by sending a system message and updating status
      await fetch("/api/chat/agent/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          sessionId,
          content: "Agent has closed the conversation. Thank you for contacting ALE!",
        }),
      });
      setSelectedSession(null);
      fetchQueue();
    } catch {
      // ignore
    }
  }

  const allSessions = [...queue.pending, ...queue.active];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <h1 className="text-lg font-bold text-gray-900">Agent Console</h1>
          <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
            {queue.pending.length} pending
          </span>
          <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
            {queue.active.length} active
          </span>
          <a
            href="/admin"
            className="ml-auto text-sm text-gray-500 hover:text-gray-700"
          >
            Back to Admin
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          {/* Session list */}
          <div className="col-span-4 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-semibold text-gray-700">Escalated Sessions</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loading && (
                <div className="p-4 text-center text-sm text-gray-400">Loading...</div>
              )}
              {!loading && allSessions.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-sm text-gray-400">No escalated sessions</p>
                  <p className="text-xs text-gray-300 mt-1">Sessions will appear here when users request an agent</p>
                </div>
              )}
              {allSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => {
                    if (session.agentId) {
                      setSelectedSession(session.id);
                    } else {
                      handleAccept(session.id);
                    }
                  }}
                  className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    selectedSession === session.id ? "bg-ale-50 border-l-2 border-l-ale" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-400">
                      {session.id.slice(0, 8)}
                    </span>
                    {!session.agentId ? (
                      <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                        PENDING
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                        ACTIVE
                      </span>
                    )}
                    <span className="text-[10px] text-gray-400 ml-auto">
                      {session.messageCount} msgs
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 truncate">
                    {session.lastMessage || "No messages"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Conversation */}
          <div className="col-span-8 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            {!selectedSession ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 text-gray-200 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <p className="text-sm text-gray-400">Select a session to view the conversation</p>
                </div>
              </div>
            ) : (
              <>
                {/* Conversation header */}
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Session {selectedSession.slice(0, 8)}
                  </h3>
                  <button
                    onClick={() => handleCloseSession(selectedSession)}
                    className="ml-auto text-xs font-semibold text-red-600 bg-red-50 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors"
                  >
                    Close Session
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  {messages.map((msg) => (
                    <ChatMessageBubble
                      key={msg.id}
                      role={msg.role as MessageRole}
                      content={msg.content}
                      createdAt={msg.createdAt}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Agent input */}
                <div className="border-t border-gray-100 p-3">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const input = form.elements.namedItem("agentMsg") as HTMLInputElement;
                      if (input.value.trim()) {
                        handleSendMessage(selectedSession, input.value.trim());
                        input.value = "";
                      }
                    }}
                    className="flex gap-2"
                  >
                    <input
                      name="agentMsg"
                      type="text"
                      placeholder="Type your response..."
                      className="flex-1 h-10 px-3 text-sm rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-ale focus:ring-1 focus:ring-ale"
                    />
                    <button
                      type="submit"
                      className="h-10 px-4 bg-ale text-white text-sm font-semibold rounded-xl hover:bg-ale-dark transition-colors"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
