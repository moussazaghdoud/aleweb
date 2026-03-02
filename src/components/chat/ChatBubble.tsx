"use client";

interface Props {
  onClick: () => void;
  position: "bottom-right" | "bottom-left";
  hasUnread?: boolean;
}

export function ChatBubble({ onClick, position, hasUnread }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: 20,
        right: position === "bottom-left" ? undefined : 20,
        left: position === "bottom-left" ? 20 : undefined,
        zIndex: 9999,
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
      }}
      aria-label="Open chat"
    >
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>

      {hasUnread && (
        <span
          style={{
            position: "absolute",
            top: -2,
            right: -2,
            width: 14,
            height: 14,
            backgroundColor: "#22c55e",
            borderRadius: "50%",
            border: "2px solid white",
          }}
        />
      )}
    </button>
  );
}
