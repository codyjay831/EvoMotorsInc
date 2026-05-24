import Link from "next/link";
import { Car, Zap, ShieldCheck } from "lucide-react";
import { HomeSectionHeader } from "./HomeSectionHeader";
import { cn } from "@/lib/utils";

const TRUST_ITEMS = [
  {
    title: "Inspected EVs",
    description: "Every vehicle is selected, inspected, and ready to drive.",
    href: "/inventory",
    cta: "See available EVs",
    Icon: Car,
  },
  {
    title: "Charging guidance",
    description: "We explain home charging and connect you with local installers.",
    href: "/ev-charging",
    cta: "Explore charging guide",
    Icon: Zap,
  },
  {
    title: "Rebate help",
    description: "Plain-language guidance on California and utility EV incentives.",
    href: "/contact?intent=rebate-help",
    cta: "Ask about rebates",
    Icon: ShieldCheck,
  },
] as const;

type HomeTrustRowProps = {
  className?: string;
};

export function HomeTrustRow({ className }: HomeTrustRowProps) {
  return (
    <section className={cn("evo-home-section", className)} aria-label="Why Evo Motors">
      <HomeSectionHeader
        eyebrow="Why drivers choose us"
        title="Practical support at every step"
      />

      <div className="grid gap-5 sm:grid-cols-3 lg:gap-6">
        {TRUST_ITEMS.map(({ title, description, href, cta, Icon }) => (
          <div
            key={title}
            className="rounded-2xl border border-border bg-surface/65 px-5 py-6 transition-colors hover:border-primary/20 sm:px-6 sm:py-7"
          >
            <span
              className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
              aria-hidden
            >
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            <Link href={href} className="mt-5 inline-flex text-sm font-medium text-primary no-underline hover:text-primary/90 evo-focus-ring rounded-sm">
              {cta} →
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        <Link href="/about" className="font-medium text-primary no-underline hover:text-primary/90 evo-focus-ring rounded-sm">
          About Evo Motors
        </Link>
      </p>
    </section>
  );
}
