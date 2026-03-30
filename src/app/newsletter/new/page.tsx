"use client";

import { useEffect, useState, useRef } from "react";
import { createBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const TRADE_CATEGORIES = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "General Contracting",
  "Landscaping",
  "Painting",
  "Other",
];

export default function NewNewsletterPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tradeCategory, setTradeCategory] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createBrowserClient();

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push("/login");
    }
    checkAuth();
  }, [router, supabase]);

  function execCommand(command: string, value?: string) {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  }

  async function handleSave(publish: boolean) {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setSaving(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const htmlContent = editorRef.current?.innerHTML || content;

    const { data, error: saveError } = await supabase
      .from("newsletters")
      .insert({
        user_id: user.id,
        title: title.trim(),
        content: htmlContent,
        trade_category: tradeCategory || null,
        status: publish ? "published" : "draft",
        published_at: publish ? new Date().toISOString() : null,
      })
      .select("id")
      .single();

    if (saveError) {
      setError(saveError.message);
      setSaving(false);
      return;
    }

    router.push(`/newsletter/${data.id}`);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">New Newsletter</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-4 py-2 bg-surface border border-border text-sm rounded-lg hover:bg-surface-hover transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            Publish
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm mb-4 bg-red-900/20 border border-red-900/30 rounded-lg p-3">
          {error}
        </p>
      )}

      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Newsletter title..."
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-lg font-medium text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
        />

        <select
          value={tradeCategory}
          onChange={(e) => setTradeCategory(e.target.value)}
          className="px-4 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
        >
          <option value="">Select trade category...</option>
          {TRADE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-1 bg-surface border border-border rounded-t-lg p-2">
          <button
            type="button"
            onClick={() => execCommand("bold")}
            className="px-3 py-1.5 text-sm font-bold border border-border rounded hover:bg-surface-hover transition-colors"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => execCommand("italic")}
            className="px-3 py-1.5 text-sm italic border border-border rounded hover:bg-surface-hover transition-colors"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => execCommand("underline")}
            className="px-3 py-1.5 text-sm underline border border-border rounded hover:bg-surface-hover transition-colors"
          >
            U
          </button>
          <span className="w-px bg-border mx-1" />
          <button
            type="button"
            onClick={() => execCommand("formatBlock", "h2")}
            className="px-3 py-1.5 text-sm font-bold border border-border rounded hover:bg-surface-hover transition-colors"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => execCommand("formatBlock", "h3")}
            className="px-3 py-1.5 text-sm font-bold border border-border rounded hover:bg-surface-hover transition-colors"
          >
            H3
          </button>
          <span className="w-px bg-border mx-1" />
          <button
            type="button"
            onClick={() => execCommand("insertUnorderedList")}
            className="px-3 py-1.5 text-sm border border-border rounded hover:bg-surface-hover transition-colors"
          >
            &bull; List
          </button>
          <button
            type="button"
            onClick={() => execCommand("insertOrderedList")}
            className="px-3 py-1.5 text-sm border border-border rounded hover:bg-surface-hover transition-colors"
          >
            1. List
          </button>
          <span className="w-px bg-border mx-1" />
          <button
            type="button"
            onClick={() => execCommand("formatBlock", "blockquote")}
            className="px-3 py-1.5 text-sm border border-border rounded hover:bg-surface-hover transition-colors"
          >
            &ldquo; Quote
          </button>
          <button
            type="button"
            onClick={() => {
              const url = prompt("Enter link URL:");
              if (url) execCommand("createLink", url);
            }}
            className="px-3 py-1.5 text-sm border border-border rounded hover:bg-surface-hover transition-colors"
          >
            Link
          </button>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={() => setContent(editorRef.current?.innerHTML || "")}
          className="w-full min-h-[400px] px-6 py-4 bg-surface border border-border border-t-0 rounded-b-lg text-foreground prose focus:outline-none"
          data-placeholder="Start writing your newsletter..."
          style={{ minHeight: 400 }}
        />
      </div>
    </div>
  );
}
