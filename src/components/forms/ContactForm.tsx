"use client";

import { useState, type FormEvent } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const data = {
      firstName: fd.get("firstName") as string,
      lastName: fd.get("lastName") as string,
      email: fd.get("email") as string,
      company: fd.get("company") as string,
      message: fd.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMsg(result.error || "Something went wrong.");
        setState("error");
        return;
      }

      setState("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-text mb-2">Thank you!</h3>
        <p className="text-sm text-text-secondary">
          Your inquiry has been submitted. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full h-10 px-3 border border-light-200 rounded-lg text-sm focus:outline-none focus:border-ale focus:ring-1 focus:ring-ale";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-firstName" className="text-xs font-semibold text-text-secondary block mb-1.5">
            First Name <span className="text-red-500">*</span>
          </label>
          <input id="cf-firstName" name="firstName" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="cf-lastName" className="text-xs font-semibold text-text-secondary block mb-1.5">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input id="cf-lastName" name="lastName" type="text" required className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-email" className="text-xs font-semibold text-text-secondary block mb-1.5">
          Work Email <span className="text-red-500">*</span>
        </label>
        <input id="cf-email" name="email" type="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="cf-company" className="text-xs font-semibold text-text-secondary block mb-1.5">
          Company
        </label>
        <input id="cf-company" name="company" type="text" className={inputClass} />
      </div>
      <div>
        <label htmlFor="cf-message" className="text-xs font-semibold text-text-secondary block mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          required
          className="w-full px-3 py-2 border border-light-200 rounded-lg text-sm focus:outline-none focus:border-ale focus:ring-1 focus:ring-ale resize-none"
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full h-11 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "submitting" ? "Submitting..." : "Submit Inquiry"}
      </button>
    </form>
  );
}
