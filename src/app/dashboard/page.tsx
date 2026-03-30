"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
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

export default function DashboardPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createBrowserClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const [newsletterRes, subscriberRes] = await Promise.all([
        supabase
          .from("newsletters")
          .select("*")
          .eq("user_id", user.id)
          .order("published_at", { ascending: false, nullsFirst: false }),
        supabase
          .from("subscribers")
          .select("id", { count: "exact", head: true })
          .eq("status", "active"),
      ]);

      setNewsletters((newsletterRes.data as Newsletter[]) || []);
      setSubscriberCount(subscriberRes.count || 0);
      setLoading(false);
    }
    load();
  }, [router, supabase]);

  async function handleDelete(id: string) {
    await supabase.from("newsletters").delete().eq("id", id);
    setNewsletters((prev) => prev.filter((n) => n.id !== id));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <Link
            href="/newsletter/new"
            className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
          >
            New Newsletter
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-surface border border-border text-sm rounded-lg hover:bg-surface-hover transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="text-muted text-sm mb-1">Active Subscribers</p>
          <p className="text-2xl font-bold">{subscriberCount}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="text-muted text-sm mb-1">Total Newsletters</p>
          <p className="text-2xl font-bold">{newsletters.length}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="text-muted text-sm mb-1">Published</p>
          <p className="text-2xl font-bold">
            {newsletters.filter((n) => n.status !== "draft").length}
          </p>
        </div>
      </div>

      {/* Newsletter List */}
      <h2 className="text-xl font-bold mb-4">Your Newsletters</h2>
      {newsletters.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-8 text-center">
          <p className="text-muted mb-4">No newsletters yet.</p>
          <Link
            href="/newsletter/new"
            className="text-accent hover:text-accent-hover text-sm"
          >
            Create your first newsletter &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {newsletters.map((newsletter) => (
            <div
              key={newsletter.id}
              className="bg-surface border border-border rounded-xl p-5 flex items-center justify-between"
            >
              <div>
                <Link
                  href={`/newsletter/${newsletter.id}`}
                  className="font-medium hover:text-accent transition-colors"
                >
                  {newsletter.title || "Untitled"}
                </Link>
                <div className="flex items-center gap-3 text-sm text-muted mt-1">
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
                  {newsletter.trade_category && (
                    <span>{newsletter.trade_category}</span>
                  )}
                  {newsletter.published_at && (
                    <time>
                      {new Date(newsletter.published_at).toLocaleDateString()}
                    </time>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/newsletter/${newsletter.id}`}
                  className="px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-surface-hover transition-colors"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDelete(newsletter.id)}
                  className="px-3 py-1.5 text-sm text-red-400 border border-border rounded-lg hover:bg-red-900/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
