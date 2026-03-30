import type { Metadata } from "next";
import { EmailSignup } from "@/components/email-signup";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Misha Lubich — AI engineer building tools for trade businesses.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="max-w-2xl">
        <div className="flex items-center gap-5 mb-10">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-3xl shrink-0">
            M
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Misha Lubich
            </h1>
            <p className="text-muted mt-1">
              AI Engineer &middot; Builder &middot; Writer
            </p>
          </div>
        </div>

        <div className="prose">
          <p>
            I&apos;m an AI engineer who stumbled into the trades industry and
            never looked back.
          </p>
          <p>
            After years building ML systems at tech companies, I discovered
            that the biggest impact I could have wasn&apos;t optimizing ad
            click-through rates — it was helping a plumber in Sacramento
            stop spending his Sundays on paperwork.
          </p>
          <p>
            <strong>TradeWeekly</strong> is my weekly newsletter at the
            intersection of artificial intelligence and trade businesses —
            HVAC, plumbing, electrical, roofing, and more. I write for two
            audiences:
          </p>
          <ul>
            <li>
              <strong>Trade business owners</strong> who want to understand
              how AI can make their operations more efficient, their
              marketing more effective, and their businesses more
              profitable.
            </li>
            <li>
              <strong>Developers and founders</strong> who are looking for
              the next massive, underserved market to build in. (Spoiler:
              it&apos;s the trades.)
            </li>
          </ul>
          <h2>What I&apos;m Building</h2>
          <p>
            Beyond the newsletter, I&apos;m actively building AI-powered
            tools for trade businesses. I can&apos;t share all the details
            yet, but the core thesis is simple: take the administrative
            burden that eats 15+ hours of every contractor&apos;s week and
            automate it with AI that actually understands the trades.
          </p>
          <h2>My Background</h2>
          <ul>
            <li>5+ years building ML/AI systems in production</li>
            <li>
              Spent 6 months embedded with trade businesses, learning
              their workflows firsthand
            </li>
            <li>
              Advised 10+ SaaS startups targeting the home services
              vertical
            </li>
            <li>
              Family background in electrical contracting (my uncle runs a
              15-person shop in Sacramento)
            </li>
          </ul>
          <h2>Get in Touch</h2>
          <p>
            I love hearing from readers — whether you&apos;re a contractor
            with a problem that needs solving, a founder exploring this
            space, or an investor looking at the trades market. The best
            way to reach me is by replying to any newsletter issue.
          </p>
        </div>

        <div className="mt-12">
          <EmailSignup />
        </div>
      </div>
    </div>
  );
}
