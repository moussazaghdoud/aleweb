"use client";

import { useState } from "react";

interface Props {
  config?: { enabled?: boolean; position?: string; greeting?: string } | null;
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
          right: 20,
          zIndex: 99999,
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "#7C3AED",
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 14px rgba(124, 58, 237, 0.4)",
          fontSize: 24,
        }}
        aria-label="Open chat"
      >
        💬
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 99999,
        width: 380,
        height: 500,
        backgroundColor: "white",
        borderRadius: 16,
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        border: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "12px 16px", background: "linear-gradient(to right, #7C3AED, #6D28D9)", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>ALE Assistant</strong>
        <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: 18 }}>✕</button>
      </div>
      <div style={{ flex: 1, padding: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#666" }}>
        Chat widget loaded! OpenAI integration coming soon.
      </div>
    </div>
  );
}
