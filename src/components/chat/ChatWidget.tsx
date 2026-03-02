"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ChatPanel = dynamic(() => import("./ChatPanel"), { ssr: false });

interface Props {
  config?: { enabled?: boolean; position?: string; greeting?: string; escalationEnabled?: boolean } | null;
}

export function ChatWidget({ config }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (!config?.enabled) return null;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: 20,
          right: config.position === "bottom-left" ? undefined : 20,
          left: config.position === "bottom-left" ? 20 : undefined,
          zIndex: 9999,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.2)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(124, 58, 237, 0.45), 0 0 0 1px rgba(255,255,255,0.08) inset",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        aria-label="Open chat"
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      </button>
    );
  }

  return <ChatPanel config={config} onClose={() => setIsOpen(false)} />;
}
