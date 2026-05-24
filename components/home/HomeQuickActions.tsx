import Link from "next/link";
import { BatteryCharging, SearchCheck, MapPin } from "lucide-react";
import { HomeSectionHeader } from "./HomeSectionHeader";
import { cn } from "@/lib/utils";

const ACTIONS = [
  {
    title: "EV Charging Guide",
    description: "Get practical help with home charging, setup, and ownership planning.",
    href: "/ev-charging",
    cta: "Explore charging support",
    Icon: BatteryCharging,
    featured: true,
  },
  {
    title: "Request a specific vehicle",
    description: "Tell us what model and budget you want. We will source options for you.",
    href: "/request-vehicle",
    cta: "Request a vehicle",
    Icon: SearchCheck,
    featured: false,
  },
  {
    title: "Contact and directions",
    description: "Plan your visit, ask questions, or get directions to our East Bay location.",
    href: "/contact",
    cta: "Open contact details",
    Icon: MapPin,
    featured: false,
  },
] as const;

type HomeQuickActionsProps = {
  className?: string;
};

export function HomeQuickActions({ className }: HomeQuickActionsProps) {
  return (
    <section className={cn("evo-home-section", className)} aria-label="Quick actions">
      <HomeSectionHeader
        eyebrow="Quick actions"
        title="Other ways we can help"
        description="Already browsing inventory above? Here are the next best steps for charging support, sourcing, or planning a visit."
      />

      <div className="grid gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
        {ACTIONS.map(({ title, description, href, cta, Icon, featured }) => (
          <Link
            key={title}
            href={href}
            className={cn(
              "group rounded-2xl border px-5 py-6 sm:px-6 sm:py-7 transition-all duration-200 evo-focus-ring",
              featured
                ? "border-primary/35 bg-primary/10 shadow-[0_0_0_1px_rgb(255_255_255_/_0.04),0_0_36px_-10px_var(--glow-subtle)] hover:bg-primary/15"
                : "border-border bg-surface/70 hover:border-primary/25 hover:bg-surface"
            )}
          >
            <span
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-lg",
                featured ? "bg-primary/20 text-primary" : "bg-muted/70 text-muted-foreground group-hover:text-foreground"
              )}
              aria-hidden
            >
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            <span className="mt-5 inline-flex text-sm font-medium text-primary">{cta} →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
