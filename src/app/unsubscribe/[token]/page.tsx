"use client";

import { useState } from "react";
import { createBrowserClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";

export default function UnsubscribePage() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const params = useParams();
  const email = decodeURIComponent(params.token as string);

  async function handleUnsubscribe() {
    setStatus("loading");
    const supabase = createBrowserClient();

    const { error } = await supabase
      .from("subscribers")
      .update({
        status: "unsubscribed",
        unsubscribed_at: new Date().toISOString(),
      })
      .eq("email", email)
      .eq("status", "active");

    if (error) {
      setStatus("error");
    } else {
      setStatus("done");
    }
  }

  if (status === "done") {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">You&apos;ve been unsubscribed</h1>
        <p className="text-muted">
          You won&apos;t receive any more emails from us. Sorry to see you go!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20 text-center">
      <h1 className="text-2xl font-bold mb-2">Unsubscribe</h1>
      <p className="text-muted mb-6">
        Click below to unsubscribe <strong className="text-foreground">{email}</strong> from
        TradeWeekly.
      </p>

      {status === "error" && (
        <p className="text-red-400 text-sm mb-4">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        onClick={handleUnsubscribe}
        disabled={status === "loading"}
        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Unsubscribing..." : "Confirm Unsubscribe"}
      </button>
    </div>
  );
}
