"use client";

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const url = `https://tradeweekly.com/posts/${slug}`;
  const text = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted hover:text-foreground transition-colors text-sm"
      >
        X/Twitter
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted hover:text-foreground transition-colors text-sm"
      >
        LinkedIn
      </a>
      <button
        onClick={() => navigator.clipboard.writeText(url)}
        className="text-muted hover:text-foreground transition-colors text-sm cursor-pointer"
      >
        Copy link
      </button>
    </div>
  );
}
