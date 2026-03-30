"use client";

import { useState } from "react";

export function EmailSignup({ variant = "default" }: { variant?: "default" | "inline" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={`${variant === "default" ? "bg-surface border border-border rounded-xl p-8 text-center" : ""}`}>
        <p className="text-accent font-medium text-lg">You&apos;re in!</p>
        <p className="text-muted text-sm mt-1">Check your inbox for a welcome email.</p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-8 text-center">
      <h3 className="text-xl font-bold mb-2">Get the weekly newsletter</h3>
      <p className="text-muted text-sm mb-6 max-w-sm mx-auto">
        Join 2,000+ contractors and SaaS builders getting AI insights for the trades every Tuesday.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe Free"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-400 text-sm mt-3">Something went wrong. Try again.</p>
      )}
      <p className="text-muted text-xs mt-4">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
