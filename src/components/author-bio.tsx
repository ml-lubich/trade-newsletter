import Link from "next/link";

export function AuthorBio() {
  return (
    <div className="flex items-start gap-4 bg-surface border border-border rounded-xl p-6">
      <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl shrink-0">
        M
      </div>
      <div>
        <Link href="/about" className="font-bold text-foreground hover:text-accent transition-colors">
          Misha Lubich
        </Link>
        <p className="text-muted text-sm mt-1 leading-relaxed">
          AI engineer building tools for trade businesses. Writing about the intersection of software and blue-collar industries.
        </p>
      </div>
    </div>
  );
}
