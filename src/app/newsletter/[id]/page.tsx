"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Newsletter {
  id: string;
  user_id: string;
  title: string;
  content: string;
  trade_category: string | null;
  published_at: string | null;
  status: string;
}

export default function NewsletterViewPage() {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const params = useParams();
  const router = useRouter();
  const supabase = createBrowserClient();
  const id = params.id as string;

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("newsletters")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setNewsletter(data as Newsletter);
      setLoading(false);
    }
    load();
  }, [id, supabase]);

  async function handlePublish() {
    if (!newsletter) return;
    const { error } = await supabase
      .from("newsletters")
      .update({
        status: "published",
        published_at: new Date().toISOString(),
      })
      .eq("id", newsletter.id);

    if (!error) {
      setNewsletter({
        ...newsletter,
        status: "published",
        published_at: new Date().toISOString(),
      });
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (notFound || !newsletter) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Newsletter not found</h1>
        <p className="text-muted mb-6">
          This newsletter may have been deleted or doesn&apos;t exist.
        </p>
        <Link href="/dashboard" className="text-accent hover:text-accent-hover">
          Back to dashboard &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/dashboard"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          &larr; Back to dashboard
        </Link>
        <div className="flex items-center gap-2">
          <span
            className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
              newsletter.status === "published"
                ? "bg-green-900/30 text-green-400"
                : newsletter.status === "sent"
                  ? "bg-blue-900/30 text-blue-400"
                  : "bg-yellow-900/30 text-yellow-400"
            }`}
          >
            {newsletter.status}
          </span>
          {newsletter.status === "draft" && (
            <button
              onClick={handlePublish}
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
            >
              Publish
            </button>
          )}
        </div>
      </div>

      <article>
        <header className="mb-8">
          {newsletter.trade_category && (
            <p className="text-accent text-sm font-medium mb-2">
              {newsletter.trade_category}
            </p>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.1] mb-3">
            {newsletter.title}
          </h1>
          {newsletter.published_at && (
            <p className="text-muted text-sm">
              Published{" "}
              {new Date(newsletter.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </header>

        <div
          className="prose mx-auto"
          dangerouslySetInnerHTML={{ __html: newsletter.content }}
        />
      </article>
    </div>
  );
}
