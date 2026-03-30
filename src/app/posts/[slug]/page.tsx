import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { ShareButtons } from "@/components/share-buttons";
import { AuthorBio } from "@/components/author-bio";
import { EmailSignup } from "@/components/email-signup";
import { MDXContent } from "@/components/mdx-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-10">
        <div className="flex items-center gap-3 text-sm text-muted mb-4">
          <time dateTime={post.date}>{formattedDate}</time>
          <span>&middot;</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4">
          {post.title}
        </h1>
        <p className="text-muted text-lg leading-relaxed">{post.excerpt}</p>
      </header>

      <div className="prose mx-auto">
        <MDXContent content={post.content} />
      </div>

      <div className="mt-12 pt-8 border-t border-border space-y-8 max-w-[680px] mx-auto">
        <ShareButtons title={post.title} slug={post.slug} />
        <AuthorBio />
        <EmailSignup />
      </div>
    </article>
  );
}
