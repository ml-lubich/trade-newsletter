import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            Trade<span className="text-accent">Weekly</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/archive"
            className="text-muted hover:text-foreground transition-colors"
          >
            Archive
          </Link>
          <Link
            href="/about"
            className="text-muted hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/dashboard"
            className="text-muted hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/login"
            className="text-accent hover:text-accent-hover transition-colors font-medium"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
