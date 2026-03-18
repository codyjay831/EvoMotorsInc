import Link from "next/link";
import type { Dealer } from "@/lib/api";
import { cn } from "@/lib/utils";

type HomeAboutTeaserProps = {
  dealer: Dealer;
  className?: string;
};

export function HomeAboutTeaser({ dealer, className }: HomeAboutTeaserProps) {
  const tagline = dealer.branding?.tagline ?? "Electric. Premium.";
  const name = dealer.name;

  return (
    <section
      className={cn(
        "evo-content-width evo-content-narrow text-center",
        className
      )}
      aria-label="About"
    >
      <p className="evo-eyebrow text-primary">{name}</p>
      <h2 className="evo-section-heading text-foreground mt-2">
        Built for the road ahead
      </h2>
      <p className="evo-body text-muted-foreground mt-6">
        {tagline} We&apos;re focused on electric vehicles that deliver on range,
        quality, and value. Whether you&apos;re switching to EV or upgrading,
        we&apos;re here to help you find the right fit.
      </p>
      <Link
        href="/about"
        className="evo-body-sm mt-8 inline-flex font-medium text-primary no-underline transition-colors duration-200 hover:text-primary/90 evo-focus-ring rounded-sm"
      >
        Learn about us →
      </Link>
    </section>
  );
}
