"use client";

import { useState, useRef, useCallback, useEffect } from "react";

/* ── Types ── */
type Asset = { title: string; url: string; snippet: string };
type PlanCTA = { label: string; url: string };
type PlanSection = {
  objective: string;
  actions: string[];
  questions: string[];
  assets: Asset[];
  cta: PlanCTA;
};
type PlanData = {
  audit: PlanSection;
  presales: PlanSection;
  solution: PlanSection;
  offer: PlanSection;
};
type PlanResponse = {
  intentSummary: string;
  clarifyingQuestion: string | null;
  plan: PlanData | null;
  confidence: number;
  kbStats: { hits: number };
  fallbackMessage?: string;
  error?: string;
};

type UXState = "idle" | "loading" | "results" | "error" | "clarifying";

const PHASE_META: Record<keyof PlanData, { label: string; icon: string; color: string }> = {
  audit:    { label: "Audit",    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", color: "text-blue-400" },
  presales: { label: "Presales", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", color: "text-purple-400" },
  solution: { label: "Solution", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", color: "text-cyan-400" },
  offer:    { label: "Offer",    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "text-green-400" },
};

const PHASES: (keyof PlanData)[] = ["audit", "presales", "solution", "offer"];

export function GoalCaptureGlassPanel() {
  const [goal, setGoal] = useState("");
  const [state, setState] = useState<UXState>("idle");
  const [plan, setPlan] = useState<PlanResponse | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<keyof PlanData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback(async () => {
    const text = goal.trim();
    if (!text || state === "loading") return;

    setState("loading");
    setErrorMsg("");
    setPlan(null);
    setExpandedPhase(null);

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: text,
          pageUrl: window.location.href,
          locale: document.documentElement.lang || "en",
        }),
      });

      if (res.status === 429) {
        setErrorMsg("Too many requests. Please wait a moment and try again.");
        setState("error");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      const data: PlanResponse = await res.json();
      setPlan(data);

      if (data.clarifyingQuestion && !data.plan) {
        setState("clarifying");
      } else if (data.plan) {
        setState("results");
        setExpandedPhase("audit"); // auto-expand first phase
      } else {
        setErrorMsg(data.fallbackMessage || "Could not generate a plan. Please contact sales.");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setState("error");
    }
  }, [goal, state]);

  const handleReset = useCallback(() => {
    setState("idle");
    setPlan(null);
    setGoal("");
    setErrorMsg("");
    setExpandedPhase(null);
    textareaRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey && state === "idle") {
        e.preventDefault();
        handleSubmit();
      }
      if (e.key === "Escape" && (state === "results" || state === "error" || state === "clarifying")) {
        handleReset();
      }
    },
    [state, handleSubmit, handleReset],
  );

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }, [goal]);

  return (
    <div
      ref={panelRef}
      role="region"
      aria-label="Goal capture — describe what you want to achieve"
      className="w-full max-w-md backdrop-blur-xl bg-white/[0.07] border border-white/[0.15] rounded-2xl shadow-2xl shadow-black/20 p-6 transition-all duration-500"
      onKeyDown={handleKeyDown}
    >
      {/* ── IDLE / INPUT STATE ── */}
      {(state === "idle" || state === "loading") && (
        <div className="space-y-4">
          <div>
            <h2 className="text-white text-lg font-semibold leading-snug">
              What&apos;s your goal?
            </h2>
            <p className="text-white/50 text-xs mt-1 leading-relaxed">
              Describe your goal in one sentence. Example: reduce support workload, modernize Wi-Fi, secure network access.
            </p>
          </div>

          <textarea
            ref={textareaRef}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Write here what you want to do, What are you looking to solve in your organization"
            rows={3}
            maxLength={1000}
            disabled={state === "loading"}
            aria-label="Describe your business goal"
            className="w-full resize-none rounded-xl bg-white/[0.06] border border-white/[0.12] text-white text-sm placeholder:text-white/30 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/40 transition-all disabled:opacity-50"
          />

          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={!goal.trim() || state === "loading"}
              aria-label="Get a plan"
              className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-400/60 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {state === "loading" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating plan...
                </>
              ) : (
                <>
                  Get a plan
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>

            <a
              href="/contact"
              className="text-white/60 text-xs hover:text-white/90 underline underline-offset-2 transition-colors whitespace-nowrap focus:outline-none focus:text-white"
              aria-label="Talk to an expert"
            >
              Talk to an expert
            </a>
          </div>
        </div>
      )}

      {/* ── ERROR STATE ── */}
      {state === "error" && (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Could not generate plan</p>
              <p className="text-white/50 text-xs mt-1">{errorMsg}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 h-10 px-5 text-sm font-medium text-white bg-white/10 border border-white/15 rounded-full hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Try again
            </button>
            <a
              href="/contact"
              className="flex-1 h-10 px-5 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-400/60"
            >
              Contact Sales
            </a>
          </div>
        </div>
      )}

      {/* ── CLARIFYING QUESTION STATE ── */}
      {state === "clarifying" && plan?.clarifyingQuestion && (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Quick question</p>
              <p className="text-white/70 text-sm mt-1">{plan.clarifyingQuestion}</p>
            </div>
          </div>

          <textarea
            ref={textareaRef}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Add more details..."
            rows={2}
            className="w-full resize-none rounded-xl bg-white/[0.06] border border-white/[0.12] text-white text-sm placeholder:text-white/30 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/40 transition-all"
            aria-label="Provide additional details"
          />

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="h-10 px-5 text-sm font-medium text-white/60 hover:text-white transition-colors focus:outline-none"
            >
              Start over
            </button>
            <button
              onClick={handleSubmit}
              disabled={!goal.trim()}
              className="flex-1 h-10 px-5 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* ── RESULTS STATE ── */}
      {state === "results" && plan?.plan && (
        <div className="space-y-3">
          {/* Intent summary */}
          <div className="flex items-center justify-between">
            <p className="text-white text-sm font-medium leading-snug flex-1 pr-3">
              {plan.intentSummary}
            </p>
            <button
              onClick={handleReset}
              aria-label="Start over"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Confidence indicator */}
          {plan.confidence < 0.5 && (
            <p className="text-yellow-400/80 text-xs">
              Limited KB coverage — we recommend speaking with sales for a tailored plan.
            </p>
          )}

          {/* 4-phase accordion */}
          <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
            {PHASES.map((phase, idx) => {
              const section = plan.plan![phase];
              const meta = PHASE_META[phase];
              const isOpen = expandedPhase === phase;

              return (
                <div key={phase} className="rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedPhase(isOpen ? null : phase)}
                    aria-expanded={isOpen}
                    aria-controls={`phase-${phase}`}
                    className="w-full flex items-center gap-3 px-3 py-2.5 bg-white/[0.05] hover:bg-white/[0.09] transition-colors text-left focus:outline-none focus:ring-2 focus:ring-purple-400/40 rounded-xl"
                  >
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/60">
                      {idx + 1}
                    </span>
                    <svg className={`w-4 h-4 ${meta.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={meta.icon} />
                    </svg>
                    <span className="flex-1 text-white text-sm font-medium">{meta.label}</span>
                    <svg
                      className={`w-4 h-4 text-white/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isOpen && section && (
                    <div id={`phase-${phase}`} className="px-3 pb-3 pt-2 space-y-3 bg-white/[0.03] rounded-b-xl">
                      {/* Objective */}
                      <p className="text-white/80 text-xs leading-relaxed">{section.objective}</p>

                      {/* Actions */}
                      {section.actions?.length > 0 && (
                        <div>
                          <p className="text-white/40 text-[10px] uppercase tracking-wider font-semibold mb-1">Key actions</p>
                          <ul className="space-y-1">
                            {section.actions.map((a, i) => (
                              <li key={i} className="text-white/70 text-xs flex items-start gap-1.5">
                                <span className="text-purple-400 mt-0.5">&#8226;</span>
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Questions */}
                      {section.questions?.length > 0 && (
                        <div>
                          <p className="text-white/40 text-[10px] uppercase tracking-wider font-semibold mb-1">Key questions</p>
                          <ul className="space-y-1">
                            {section.questions.map((q, i) => (
                              <li key={i} className="text-white/60 text-xs flex items-start gap-1.5">
                                <span className="text-cyan-400 mt-0.5">?</span>
                                {q}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Assets */}
                      {section.assets?.length > 0 && (
                        <div>
                          <p className="text-white/40 text-[10px] uppercase tracking-wider font-semibold mb-1">Resources</p>
                          <div className="space-y-1.5">
                            {section.assets.map((asset, i) => (
                              <a
                                key={i}
                                href={asset.url}
                                className="block rounded-lg bg-white/[0.05] hover:bg-white/[0.1] p-2 transition-colors group focus:outline-none focus:ring-1 focus:ring-purple-400/40"
                              >
                                <p className="text-white/90 text-xs font-medium group-hover:text-purple-300 transition-colors">
                                  {asset.title}
                                </p>
                                {asset.snippet && (
                                  <p className="text-white/40 text-[11px] mt-0.5 line-clamp-2">{asset.snippet}</p>
                                )}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      {section.cta && (
                        <a
                          href={section.cta.url}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-purple-200 transition-colors focus:outline-none focus:underline"
                        >
                          {section.cta.label}
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom actions */}
          <div className="flex items-center gap-3 pt-1">
            <a
              href="/contact"
              className="flex-1 h-9 px-4 text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-400/60"
            >
              Talk to an expert
            </a>
            <button
              onClick={handleReset}
              className="h-9 px-4 text-xs font-medium text-white/50 hover:text-white/80 bg-white/[0.06] border border-white/[0.1] rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              New goal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
