import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = {
  title: "Archive",
  description: "All issues of TradeWeekly — AI insights for the trades.",
};

export default function ArchivePage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
        Archive
      </h1>
      <p className="text-muted mb-10">
        Every issue of TradeWeekly, from newest to oldest.
      </p>
      <div>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
