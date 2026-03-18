import Link from "next/link";
import Image from "next/image";
import type { Dealer } from "@/lib/api";
import { cn } from "@/lib/utils";

const glowButtonClass =
  "inline-flex h-9 shrink-0 items-center justify-center rounded-lg border border-transparent bg-primary px-5 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)] transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_28px_-2px_var(--glow-subtle)] evo-focus-ring";
const outlineButtonClass =
  "inline-flex h-9 shrink-0 items-center justify-center rounded-lg border border-border bg-transparent px-5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/80 hover:border-primary/30 evo-focus-ring";

const HERO_BG = "#0a0a0a";
/** Bump when you replace the hero image (same path) so caches load the new file. */
const HERO_IMAGE_VERSION = 2;

type HomeHeroProps = {
  dealer: Dealer;
  className?: string;
};

export function HomeHero({ dealer, className }: HomeHeroProps) {
  const headline = "Electric. Premium.";
  const subheadline = "Next-generation electric vehicles, delivered.";

  return (
    /* 1. Hero shell: single full-width panel, relative + overflow-hidden so background layers are contained */
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl sm:rounded-3xl",
        "min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center",
        "border border-white/10",
        "shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.04),inset_0_0_60px_-20px_rgb(0_0_0_/_0.5)]",
        className
      )}
      style={{ background: HERO_BG }}
      aria-label="Hero"
    >
      {/* 2. Art layers: all absolute, full hero; no content flow so the hero scales as one composition */}

      {/* Base black background (reinforces shell; image layer may have transparency) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{ background: HERO_BG }}
      />

      {/* Atmospheric gradient / soft cyan glow, localized near the car */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 85% 55%, var(--glow-subtle) 0%, transparent 55%)",
        }}
      />

      {/* Car art layer: absolute, no layout flow; anchored right + bottom; height ~100% hero, width auto (aspect ratio preserved) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <Image
          src={`/hero/tesla-hero.png?v=${HERO_IMAGE_VERSION}`}
          alt=""
          fill
          sizes="100vw"
          quality={100}
          priority
          className="object-contain object-right object-bottom"
        />
      </div>

      {/* 3. Blend overlays: left-to-right gradient removes visible image edges */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Black on left (~25%), fade to transparent (~65%) */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${HERO_BG} 0%, ${HERO_BG} 25%, transparent 65%, transparent 100%)`,
          }}
        />
        {/* Subtle vignette so edges and right side don’t feel cut off */}
        <div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl"
          style={{
            boxShadow: "inset 0 0 100px 30px rgba(0,0,0,0.35)",
          }}
        />
      </div>

      {/* 4. Content layer: sits above all background art; left-aligned, readable width */}
      <div
        className={cn(
          "relative z-10 evo-content-width py-12 sm:py-16 lg:py-20",
          "flex flex-col justify-center"
        )}
      >
        <div className="max-w-2xl">
          <p className="evo-eyebrow text-primary mb-4">{dealer.name}</p>
          <h1 className="evo-display text-foreground">{headline}</h1>
          <p className="evo-body mt-6 text-lg text-muted-foreground">{subheadline}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/inventory"
              className={cn(glowButtonClass, "min-w-[180px]")}
            >
              Browse Inventory
            </Link>
            <Link
              href="/contact?intent=approval"
              className={cn(outlineButtonClass, "min-w-[180px]")}
            >
              Get Approved
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
