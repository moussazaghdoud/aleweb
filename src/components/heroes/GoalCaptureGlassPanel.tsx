"use client";

import { useState, useRef, useCallback, useEffect } from "react";

/* ── Types ── */
type Link = { title: string; url: string; snippet: string };
type CTA = { label: string; url: string };

type ChallengeStep = {
  headline: string;
  points: string[];
  questions: string[];
};
type RecommendationStep = {
  headline: string;
  points: string[];
  links: Link[];
};
type NextStepsStep = {
  headline: string;
  actions: string[];
  cta: CTA;
};

type StepsData = {
  challenge: ChallengeStep;
  recommendation: RecommendationStep;
  nextSteps: NextStepsStep;
};

type PlanResponse = {
  intentSummary: string;
  clarifyingQuestion: string | null;
  steps: StepsData | null;
  topProduct: string | null;
  confidence: number;
  kbStats: { hits: number };
  fallbackMessage?: string;
  error?: string;
};

type UXState = "idle" | "loading" | "results" | "error" | "clarifying";

const STEP_META: Record<keyof StepsData, { label: string; icon: string; color: string; bg: string }> = {
  challenge: {
    label: "Your Challenge",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  recommendation: {
    label: "Our Recommendation",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  nextSteps: {
    label: "Get Started",
    icon: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
};

const STEPS_ORDER: (keyof StepsData)[] = ["challenge", "recommendation", "nextSteps"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function GoalCaptureGlassPanel() {
  const [goal, setGoal] = useState("");
  const [state, setState] = useState<UXState>("idle");
  const [plan, setPlan] = useState<PlanResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [revealed, setRevealed] = useState(false);

  // Email capture state
  const [emailMode, setEmailMode] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Staggered entrance animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = useCallback(async () => {
    const text = goal.trim();
    if (!text || state === "loading") return;

    setState("loading");
    setErrorMsg("");
    setPlan(null);

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

      if (data.clarifyingQuestion && !data.steps) {
        setState("clarifying");
      } else if (data.steps) {
        setState("results");
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
    setEmailMode(false);
    setEmail("");
    setEmailSent(false);
    setEmailSending(false);
    textareaRef.current?.focus();
  }, []);

  const handleEmailSubmit = useCallback(async () => {
    if (!email.trim() || !EMAIL_RE.test(email) || emailSending) return;

    setEmailSending(true);
    try {
      const res = await fetch("/api/plan/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          goal: goal.trim(),
          planJson: plan,
          locale: document.documentElement.lang || "en",
        }),
      });

      if (res.ok) {
        setEmailSent(true);
      }
    } catch {
      // Silently fail — the user still has the plan on screen
    } finally {
      setEmailSending(false);
    }
  }, [email, emailSending, goal, plan]);

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

  // Pause hero video on first keystroke
  const pauseVideo = useCallback(() => {
    window.dispatchEvent(new CustomEvent("hero-video-pause"));
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }, [goal]);

  // Focus email input when email mode opens
  useEffect(() => {
    if (emailMode && !emailSent) {
      const timer = setTimeout(() => emailInputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [emailMode, emailSent]);

  const isExpanded = state === "results";

  return (
    <div
      ref={panelRef}
      role="region"
      aria-label="Goal capture — describe what you want to achieve"
      className={`w-full backdrop-blur-xl bg-gradient-to-br from-white/[0.22] to-blue-200/[0.15] border border-white/[0.25] shadow-2xl shadow-blue-900/10 rounded-2xl p-5 transition-all duration-700 max-h-[calc(100vh-6rem)] overflow-hidden ${
        isExpanded ? "max-w-[30rem]" : "max-w-sm lg:max-w-[22rem]"
      } ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      onKeyDown={handleKeyDown}
    >
      <style>{`
        .goal-panel-scroll::-webkit-scrollbar { width: 4px; }
        .goal-panel-scroll::-webkit-scrollbar-track { background: transparent; }
        .goal-panel-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }
        .goal-panel-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
        .goal-panel-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.12) transparent; }
        @keyframes goalDotBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      {/* ── IDLE / INPUT STATE ── */}
      {(state === "idle" || state === "loading") && (
        <div className="space-y-3">
          <div>
            <h2 className="text-white text-lg font-semibold leading-snug">
              What&apos;s your goal?
            </h2>
            <p className="text-white/50 text-xs leading-relaxed mt-1">
              Describe your goal in one sentence. Example: reduce support workload, modernize Wi-Fi, secure network access.
            </p>
          </div>

          <div>
            <textarea
              ref={textareaRef}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onFocus={pauseVideo}
              placeholder="Write here what you want to do, What are you looking to solve in your organization"
              rows={4}
              maxLength={1000}
              disabled={state === "loading"}
              aria-label="Describe your business goal"
              style={{ outline: 'none', boxShadow: 'none' }}
              className="w-full resize-none rounded-lg bg-white/[0.06] border border-white/[0.12] text-white text-xs placeholder:text-white/30 px-4 py-3 focus:border-white/40 transition-all disabled:opacity-50"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={!goal.trim() || state === "loading"}
              aria-label="Get a plan"
              className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-6 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white text-sm font-semibold rounded-full hover:from-violet-700 hover:via-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
            >
              {state === "loading" ? (
                <>
                  <span className="inline-flex items-end gap-1 h-4">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="w-1.5 h-1.5 rounded-full bg-white"
                        style={{
                          animation: 'goalDotBounce 0.8s ease-in-out infinite',
                          animationDelay: `${delay}ms`,
                        }}
                      />
                    ))}
                  </span>
                  Thinking...
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
            onFocus={pauseVideo}
            placeholder="Add more details..."
            rows={2}
            style={{ outline: 'none', boxShadow: 'none' }}
            className="w-full resize-none rounded-xl bg-white/[0.06] border border-white/[0.12] text-white text-sm placeholder:text-white/30 px-4 py-3 focus:border-white/40 transition-all"
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
      {state === "results" && plan?.steps && (
        <div className="space-y-3">
          {/* Intent summary + reset button */}
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

          {/* Top product badge */}
          {plan.topProduct && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30">
              <svg className="w-3.5 h-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="text-purple-300 text-xs font-semibold">{plan.topProduct}</span>
            </div>
          )}

          {/* Confidence indicator */}
          {plan.confidence < 0.5 && (
            <p className="text-yellow-400/80 text-xs">
              Limited information — we recommend speaking with sales for a tailored plan.
            </p>
          )}

          {/* 3-step stacked cards with staggered entrance */}
          <div className="goal-panel-scroll space-y-2 max-h-[280px] overflow-y-auto pr-3">
            {STEPS_ORDER.map((stepKey, idx) => {
              const meta = STEP_META[stepKey];

              return (
                <div
                  key={stepKey}
                  className="rounded-xl bg-white/[0.05] border border-white/[0.08] p-3 space-y-2 animate-fade-up"
                  style={{ animationDelay: `${idx * 120}ms` }}
                >
                  {/* Step header */}
                  <div className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded-full ${meta.bg} flex items-center justify-center`}>
                      <svg className={`w-3.5 h-3.5 ${meta.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={meta.icon} />
                      </svg>
                    </span>
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">
                      Step {idx + 1}
                    </span>
                    <span className={`text-white text-xs font-semibold`}>{meta.label}</span>
                  </div>

                  {/* ── Challenge card ── */}
                  {stepKey === "challenge" && plan.steps!.challenge && (
                    <>
                      <p className="text-white/80 text-xs leading-relaxed">
                        {plan.steps!.challenge.headline}
                      </p>
                      {plan.steps!.challenge.points?.length > 0 && (
                        <ul className="space-y-1">
                          {plan.steps!.challenge.points.map((pt, i) => (
                            <li key={i} className="text-white/70 text-xs flex items-start gap-1.5">
                              <span className="text-blue-400 mt-0.5">&#8226;</span>
                              {pt}
                            </li>
                          ))}
                        </ul>
                      )}
                      {plan.steps!.challenge.questions?.length > 0 && (
                        <div className="pt-1">
                          <p className="text-white/40 text-[10px] uppercase tracking-wider font-semibold mb-1">To refine further</p>
                          <ul className="space-y-1">
                            {plan.steps!.challenge.questions.map((q, i) => (
                              <li key={i} className="text-white/60 text-xs flex items-start gap-1.5">
                                <span className="text-blue-400 mt-0.5">?</span>
                                {q}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}

                  {/* ── Recommendation card ── */}
                  {stepKey === "recommendation" && plan.steps!.recommendation && (
                    <>
                      <p className="text-white/80 text-xs leading-relaxed">
                        {plan.steps!.recommendation.headline}
                      </p>
                      {plan.steps!.recommendation.points?.length > 0 && (
                        <ul className="space-y-1">
                          {plan.steps!.recommendation.points.map((pt, i) => (
                            <li key={i} className="text-white/70 text-xs flex items-start gap-1.5">
                              <span className="text-purple-400 mt-0.5">&#8226;</span>
                              {pt}
                            </li>
                          ))}
                        </ul>
                      )}
                      {plan.steps!.recommendation.links?.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          {plan.steps!.recommendation.links.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              className="block rounded-lg bg-white/[0.05] hover:bg-white/[0.1] p-2 transition-colors group focus:outline-none focus:ring-1 focus:ring-purple-400/40"
                            >
                              <p className="text-white/90 text-xs font-medium group-hover:text-purple-300 transition-colors">
                                {link.title}
                              </p>
                              {link.snippet && (
                                <p className="text-white/40 text-[11px] mt-0.5 line-clamp-1">{link.snippet}</p>
                              )}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {/* ── Next Steps card ── */}
                  {stepKey === "nextSteps" && plan.steps!.nextSteps && (
                    <>
                      <p className="text-white/80 text-xs leading-relaxed">
                        {plan.steps!.nextSteps.headline}
                      </p>
                      {plan.steps!.nextSteps.actions?.length > 0 && (
                        <ul className="space-y-1">
                          {plan.steps!.nextSteps.actions.map((action, i) => (
                            <li key={i} className="text-white/70 text-xs flex items-start gap-1.5">
                              <span className="text-cyan-400 mt-0.5">&#10003;</span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Inline email capture (slide-open) ── */}
          <div
            className="grid transition-all duration-300 ease-out"
            style={{ gridTemplateRows: emailMode ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="pt-2">
                {emailSent ? (
                  <div className="flex items-center gap-2 py-2 animate-fade-up">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-emerald-300 text-xs font-medium">Plan sent!</span>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => { e.preventDefault(); handleEmailSubmit(); }}
                    className="flex gap-2"
                  >
                    <input
                      ref={emailInputRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      style={{ outline: 'none', boxShadow: 'none' }}
                      className="flex-1 h-9 px-3 text-xs text-white placeholder:text-white/30 bg-white/[0.06] border border-white/[0.12] rounded-lg focus:border-white/40 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!email.trim() || !EMAIL_RE.test(email) || emailSending}
                      className="h-9 px-4 text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-40 focus:outline-none"
                    >
                      {emailSending ? "..." : "Send"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* ── Action bar ── */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            {!emailSent && (
              <button
                onClick={() => setEmailMode((v) => !v)}
                className="h-9 px-5 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 rounded-full hover:from-violet-700 hover:via-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 inline-flex items-center justify-center gap-1.5 focus:outline-none"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Email my plan
              </button>
            )}

            {plan.steps!.nextSteps?.cta ? (
              <a
                href={plan.steps!.nextSteps.cta.url}
                className="h-9 px-4 text-xs font-semibold text-white bg-white/[0.08] border border-white/[0.15] rounded-full hover:bg-white/[0.15] transition-all inline-flex items-center justify-center gap-1.5 focus:outline-none"
              >
                {plan.steps!.nextSteps.cta.label}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            ) : (
              <a
                href="/contact"
                className="h-9 px-4 text-xs font-semibold text-white bg-white/[0.08] border border-white/[0.15] rounded-full hover:bg-white/[0.15] transition-all inline-flex items-center justify-center focus:outline-none"
              >
                Talk to an expert
              </a>
            )}
            <button
              onClick={handleReset}
              className="h-9 px-3 text-xs font-medium text-white/50 hover:text-white/80 transition-colors focus:outline-none"
            >
              New goal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
