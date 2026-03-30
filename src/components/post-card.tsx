import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="py-6 border-b border-border group-last:border-0">
          <div className="flex items-center gap-3 text-sm text-muted mb-2">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
          </div>
          <h3 className="text-xl font-bold group-hover:text-accent transition-colors leading-snug">
            {post.title}
          </h3>
          <p className="text-muted mt-2 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
