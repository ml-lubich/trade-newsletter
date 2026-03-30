import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <p className="font-bold text-lg">
              Trade<span className="text-accent">Weekly</span>
            </p>
            <p className="text-muted text-sm mt-1">
              AI insights for the trades, delivered weekly.
            </p>
          </div>
          <nav className="flex gap-6 text-sm text-muted">
            <Link href="/archive" className="hover:text-foreground transition-colors">
              Archive
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/premium" className="hover:text-foreground transition-colors">
              Premium
            </Link>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-sm text-muted">
          &copy; {new Date().getFullYear()} TradeWeekly. Built by Misha Lubich.
        </div>
      </div>
    </footer>
  );
}
