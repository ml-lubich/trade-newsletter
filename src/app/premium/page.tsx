import type { Metadata } from "next";
import { EmailSignup } from "@/components/email-signup";

export const metadata: Metadata = {
  title: "Premium",
  description:
    "Weekly deep dives, market maps, templates, and more. $9/month.",
};

export default function PremiumPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-accent font-medium text-sm tracking-wide uppercase mb-4">
          Premium Membership
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Go deeper on AI + Trades
        </h1>
        <p className="text-muted text-lg leading-relaxed mb-12">
          The free newsletter gives you the insights. Premium gives you the
          playbooks, templates, and data to act on them.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="border border-accent rounded-xl p-8 bg-surface">
          <div className="text-center mb-8">
            <p className="text-4xl font-extrabold">
              $9<span className="text-lg text-muted font-normal">/month</span>
            </p>
            <p className="text-muted text-sm mt-1">Cancel anytime</p>
          </div>

          <ul className="space-y-4 mb-8">
            {[
              "Weekly deep-dive essays (2,000+ words of analysis)",
              "Monthly AI-for-trades market map with 40+ startups tracked",
              "Landing page template pack (12 Figma templates + copy frameworks)",
              "AI tool recommendation database, updated monthly",
              "Founder interviews and case studies",
              "Private community access (coming soon)",
              "Archive of all premium content",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="text-accent mt-0.5 shrink-0">&#10003;</span>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            disabled
            className="w-full py-3 bg-accent/20 text-accent font-medium rounded-lg text-sm cursor-not-allowed"
          >
            Coming Soon — Join the Waitlist Below
          </button>
        </div>

        <div className="mt-10">
          <p className="text-center text-muted text-sm mb-4">
            Get notified when Premium launches:
          </p>
          <EmailSignup variant="inline" />
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-xl font-bold mb-4">
            What free subscribers are saying
          </h2>
          <div className="space-y-6">
            {[
              {
                quote:
                  "TradeWeekly is the only newsletter I actually read every week. Misha gets the trades in a way that most tech people don't.",
                author: "Jake R., HVAC business owner, Phoenix",
              },
              {
                quote:
                  "I built my first SaaS product for plumbers after reading Misha's market analysis. Already at $8K MRR.",
                author: "Sarah K., indie founder",
              },
              {
                quote:
                  "The AI bidding tools article alone saved me 6 hours a week. Can't wait for the premium deep dives.",
                author: "Mike T., electrical contractor, Dallas",
              },
            ].map((testimonial) => (
              <blockquote
                key={testimonial.author}
                className="bg-surface border border-border rounded-xl p-6 text-left"
              >
                <p className="text-sm leading-relaxed italic text-muted">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="text-sm font-medium mt-3">
                  &mdash; {testimonial.author}
                </p>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
