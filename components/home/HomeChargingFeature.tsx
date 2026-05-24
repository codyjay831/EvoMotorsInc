import Image from "next/image";
import Link from "next/link";
import { BatteryCharging } from "lucide-react";
import { cn } from "@/lib/utils";

type HomeChargingFeatureProps = {
  className?: string;
};

export function HomeChargingFeature({ className }: HomeChargingFeatureProps) {
  return (
    <section className={cn("evo-home-section", className)} aria-label="EV charging support">
      <div className="evo-home-panel overflow-hidden">
        <div className="grid lg:grid-cols-[1.2fr_1fr]">
          <div className="relative min-h-56 border-b border-border/80 lg:min-h-full lg:border-b-0 lg:border-r">
            <Image
              src="/hero/road-hero2.1.webp"
              alt="Home EV charging guidance from Evo Motors"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-center opacity-65"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/15" aria-hidden />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/35 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm">
              <BatteryCharging className="size-4" aria-hidden />
              Home charging made practical
            </span>
          </div>

          <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <p className="evo-eyebrow text-foreground/70">Charging support</p>
            <h2 className="evo-section-heading mt-2 text-foreground">Plan charging before you buy</h2>
            <p className="evo-body mt-4 text-muted-foreground">
              We help you understand charging speeds, outlet options, installer coordination, and what daily EV ownership
              looks like in real life.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
              <p className="rounded-lg border border-border/80 bg-muted/30 px-4 py-3">Understand Level 1 vs Level 2 at home.</p>
              <p className="rounded-lg border border-border/80 bg-muted/30 px-4 py-3">Estimate charging time for your commute.</p>
              <p className="rounded-lg border border-border/80 bg-muted/30 px-4 py-3">Get local East Bay installer guidance.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/ev-charging"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90 evo-focus-ring"
              >
                Open EV Charging Guide
              </Link>
              <Link
                href="/contact?intent=charging"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-transparent px-5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/80 evo-focus-ring"
              >
                Ask a charging question
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
