import Link from "next/link";
import { Car, Zap, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const TRUST_ITEMS = [
  {
    title: "Inspected EVs",
    description: "Every vehicle is selected, inspected, and ready to drive.",
    Icon: Car,
  },
  {
    title: "Charging guidance",
    description: "We explain home charging and connect you with local installers.",
    Icon: Zap,
  },
  {
    title: "Rebate help",
    description: "Plain-language guidance on California and utility EV incentives.",
    Icon: ShieldCheck,
  },
] as const;

type HomeTrustRowProps = {
  className?: string;
};

export function HomeTrustRow({ className }: HomeTrustRowProps) {
  return (
    <section className={cn("evo-content-width", className)} aria-label="Why Evo Motors">
      <div className="grid gap-6 sm:grid-cols-3">
        {TRUST_ITEMS.map(({ title, description, Icon }) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-surface/50 px-5 py-6 transition-colors hover:border-primary/20"
          >
            <span
              className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
              aria-hidden
            >
              <Icon className="size-5" />
            </span>
            <h2 className="mt-4 text-lg font-semibold tracking-tight text-foreground">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        <Link href="/about" className="font-medium text-primary no-underline hover:text-primary/90 evo-focus-ring rounded-sm">
          About Evo Motors
        </Link>
        {" · "}
        <Link href="/ev-charging" className="font-medium text-primary no-underline hover:text-primary/90 evo-focus-ring rounded-sm">
          EV charging guide
        </Link>
      </p>
    </section>
  );
}
