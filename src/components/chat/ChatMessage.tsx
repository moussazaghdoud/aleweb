"use client";

import type { MessageRole } from "@/lib/chat/types";

interface Props {
  role: MessageRole;
  content: string;
  createdAt?: string;
}

const roleStyles: Record<MessageRole, { wrapper: string; bubble: string; label: string }> = {
  user: {
    wrapper: "justify-end",
    bubble: "bg-ale text-white rounded-2xl rounded-br-md",
    label: "",
  },
  assistant: {
    wrapper: "justify-start",
    bubble: "bg-gray-100 text-gray-900 rounded-2xl rounded-bl-md",
    label: "ALE Assistant",
  },
  agent: {
    wrapper: "justify-start",
    bubble: "bg-green-50 text-gray-900 border border-green-200 rounded-2xl rounded-bl-md",
    label: "Agent",
  },
  system: {
    wrapper: "justify-center",
    bubble: "bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs",
    label: "",
  },
};

/** Minimal markdown: **bold**, [links](url), and line breaks */
function renderContent(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    // Bold
    const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
    if (boldMatch) return <strong key={i}>{boldMatch[1]}</strong>;
    // Link
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="underline font-medium">
          {linkMatch[1]}
        </a>
      );
    }
    // Plain text with line breaks
    return part.split("\n").map((line, j) => (
      <span key={`${i}-${j}`}>
        {j > 0 && <br />}
        {line}
      </span>
    ));
  });
}

export function ChatMessageBubble({ role, content, createdAt }: Props) {
  const style = roleStyles[role];

  return (
    <div className={`flex ${style.wrapper} mb-3`}>
      <div className={`max-w-[85%] ${role === "system" ? "max-w-full" : ""}`}>
        {style.label && (
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1 block px-1">
            {style.label}
          </span>
        )}
        <div
          className={`px-4 py-2.5 text-sm leading-relaxed ${style.bubble}`}
          title={createdAt ? new Date(createdAt).toLocaleString() : undefined}
        >
          {renderContent(content)}
        </div>
      </div>
    </div>
  );
}
