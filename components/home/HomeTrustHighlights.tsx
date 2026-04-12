import type { Dealer, DealerTrustHighlight } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  Car,
  Zap,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

const FALLBACK_TRUST: DealerTrustHighlight[] = [
  { title: "Curated inventory", description: "Hand-picked EVs from leading brands, ready to drive." },
  { title: "EV expertise", description: "We specialize in electric vehicles, from range and charging to incentives." },
  { title: "Transparent buying", description: "No pressure. Clear pricing and straightforward process." },
  { title: "Right fit", description: "We help you find the EV that matches how you drive and live." },
];

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Curated inventory": Car,
  "EV expertise": Zap,
  "Transparent buying": ShieldCheck,
  "Right fit": MessageCircle,
};

type HomeTrustHighlightsProps = {
  dealer: Dealer;
  className?: string;
};

export function HomeTrustHighlights({ dealer, className }: HomeTrustHighlightsProps) {
  const items = dealer.trustHighlights?.length
    ? dealer.trustHighlights
    : FALLBACK_TRUST;

  return (
    <section className={cn("evo-content-width", className)} aria-label="Why choose us">
      <h2 className="sr-only">Why choose us</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = ICONS[item.title] ?? Car;
          return (
            <div
              key={item.title}
              className="group rounded-xl border border-border bg-surface/50 px-5 py-6 transition-all duration-200 hover:border-primary/20 hover:bg-surface/80"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20" aria-hidden>
                <Icon className="size-5" />
              </span>
              <h3 className="evo-card-title mt-4 text-foreground">{item.title}</h3>
              {item.description && (
                <p className="evo-muted mt-2">{item.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
