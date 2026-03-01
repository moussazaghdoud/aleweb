"use client";

interface Props {
  onClick: () => void;
  position: "bottom-right" | "bottom-left";
  hasUnread?: boolean;
}

export function ChatBubble({ onClick, position, hasUnread }: Props) {
  const posClass = position === "bottom-left" ? "left-5" : "right-5";

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-5 ${posClass} z-[60] w-14 h-14 rounded-full bg-ale text-white shadow-lg shadow-ale/30 hover:bg-ale-dark hover:scale-105 transition-all flex items-center justify-center animate-[slideUp_0.3s_ease-out]`}
      aria-label="Open chat"
    >
      {/* Chat icon */}
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>

      {/* Unread indicator */}
      {hasUnread && (
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
      )}
    </button>
  );
}
