import Image from "next/image";
import Link from "next/link";
import { RebatesCta } from "@/components/home/RebatesCta";
import { cn } from "@/lib/utils";

const HERO_REBATES_TRIGGER_DESKTOP =
  "inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-black/20 px-6 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/35 hover:border-white/30 evo-focus-ring";

const HERO_REBATES_TRIGGER_MOBILE =
  "inline-flex h-12 w-full shrink-0 items-center justify-center rounded-lg border border-white/20 bg-black/20 px-5 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/35 hover:border-white/30 evo-focus-ring";

type HeroStorySectionProps = {
  className?: string;
};

const PRIMARY_BEAT = {
  eyebrow: "EVO MOTORS",
  headline: "Electric. Without the guesswork.",
  subtext: "We help you choose the right EV and plan home charging in practical steps.",
} as const;

export function HeroStorySection({ className }: HeroStorySectionProps) {
  return (
    <section
      className={cn("relative w-full", className)}
      aria-label="Hero"
    >
      <div className="relative min-h-[100svh] w-full overflow-hidden md:min-h-[min(100svh,900px)] md:max-h-[900px]">
        {/* Mobile hero image */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/hero/hero-mobile2.webp"
            alt="Electric vehicle at Evo Motors"
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom brightness-110"
          />
        </div>
        {/* Desktop hero image */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/hero/tesla-hero1.webp"
            alt="Electric vehicle at Evo Motors"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>

        <div
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/25 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 hidden md:block"
          aria-hidden
          style={{ boxShadow: "inset 0 0 18vmin 2vmin rgba(0,0,0,0.35)" }}
        />

        <div className="relative z-10 flex min-h-[inherit] max-h-[inherit] flex-col justify-between px-5 pb-10 pt-24 md:px-[8vw] md:pb-12 md:pt-28">
          <div className="md:max-w-xl md:self-start md:pt-[min(12vh,6rem)]">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/55 md:text-[11px] md:tracking-[0.28em]">
              {PRIMARY_BEAT.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {PRIMARY_BEAT.headline}
            </h1>
            <p className="mt-4 max-w-[26ch] text-base leading-snug text-white/80 md:max-w-md md:text-lg">
              {PRIMARY_BEAT.subtext}
            </p>
          </div>

          <div className="mt-8 w-full md:mt-0 md:w-auto">
            <div className="space-y-2 rounded-xl bg-black/30 px-4 py-3 backdrop-blur md:inline-flex md:flex-row md:gap-3 md:bg-transparent md:p-0 md:backdrop-blur-none">
              <Link
                href="/inventory"
                className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)] transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_28px_-2px_var(--glow-subtle)] evo-focus-ring md:h-10 md:w-auto md:px-6"
              >
                Browse Inventory
              </Link>
              <div className="md:hidden">
                <RebatesCta triggerClassName={HERO_REBATES_TRIGGER_MOBILE} />
              </div>
              <div className="hidden md:block">
                <RebatesCta triggerClassName={HERO_REBATES_TRIGGER_DESKTOP} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
