import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { EmailSignup } from "@/components/email-signup";

export default function Home() {
  const posts = getAllPosts();
  const latestPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <p className="text-accent font-medium text-sm tracking-wide uppercase mb-4">
          Weekly Newsletter
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
          AI Meets the Trades
        </h1>
        <p className="text-muted text-lg sm:text-xl max-w-2xl leading-relaxed mb-8">
          Weekly insights on how AI is transforming HVAC, plumbing, electrical,
          and roofing businesses. For contractors who want to work smarter and
          builders who want to know where the opportunity is.
        </p>
        <EmailSignup variant="inline" />
        <p className="text-muted text-xs mt-3">
          Join 2,000+ readers. Free, every Tuesday.
        </p>
      </section>

      {/* Featured / Latest Post */}
      {latestPost && (
        <section className="pb-12">
          <div className="border border-border rounded-xl p-6 sm:p-8 bg-surface hover:border-border-hover transition-colors">
            <p className="text-accent text-sm font-medium mb-3">Latest Issue</p>
            <a href={`/posts/${latestPost.slug}`}>
              <h2 className="text-2xl sm:text-3xl font-bold hover:text-accent transition-colors leading-snug">
                {latestPost.title}
              </h2>
            </a>
            <p className="text-muted mt-3 leading-relaxed">
              {latestPost.excerpt}
            </p>
            <div className="flex items-center gap-3 text-sm text-muted mt-4">
              <time dateTime={latestPost.date}>
                {new Date(latestPost.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>&middot;</span>
              <span>{latestPost.readingTime}</span>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="pb-16">
          <h2 className="text-lg font-bold mb-2">Recent Issues</h2>
          <div>
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <a
            href="/archive"
            className="inline-block mt-6 text-sm text-accent hover:text-accent-hover transition-colors"
          >
            View all issues &rarr;
          </a>
        </section>
      )}

      {/* Email Signup */}
      <section className="pb-20">
        <EmailSignup />
      </section>
    </div>
  );
}
