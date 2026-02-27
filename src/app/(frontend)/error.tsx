"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6">
          <span className="text-red-600 font-extrabold text-3xl">500</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-3">
          Something went wrong
        </h1>
        <p className="text-text-secondary max-w-md mx-auto mb-8">
          We encountered an unexpected error. Please try again or contact us if the problem persists.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center h-11 px-6 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center h-11 px-6 border border-light-200 text-text text-sm font-semibold rounded-full hover:bg-light-100 transition-all"
          >
            Go to Homepage
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/solutions" className="text-ale hover:underline">Solutions</Link>
          <Link href="/products" className="text-ale hover:underline">Products</Link>
          <Link href="/industries" className="text-ale hover:underline">Industries</Link>
          <Link href="/support" className="text-ale hover:underline">Support</Link>
        </div>
      </div>
    </section>
  );
}
