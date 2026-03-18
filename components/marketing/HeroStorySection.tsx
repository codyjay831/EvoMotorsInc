"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type HeroStorySectionProps = {
  className?: string;
};

type StoryBeat = {
  eyebrow: string;
  headline: string;
  subtext: string;
};

const STORY_BEATS: StoryBeat[] = [
  {
    eyebrow: "EVO MOTORS",
    headline: "Electric. Without the guesswork.",
    subtext: "From choosing the right EV to charging at home — we make it simple.",
  },
  {
    eyebrow: "CURATED",
    headline: "Not more options. Better ones.",
    subtext: "Every vehicle is selected, inspected, and ready to drive.",
  },
  {
    eyebrow: "EXPERTISE",
    headline: "No confusion. Just answers.",
    subtext: "Range, charging, incentives — explained simply.",
  },
  {
    eyebrow: "YOUR LIFE",
    headline: "Built around your life.",
    subtext: "From daily commutes to home charging — everything just works.",
  },
];

export function HeroStorySection({ className }: HeroStorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Hero exit threshold: after this, hero stays at 0 and never re-enters
  const HERO_EXIT = 0.17;

  // Image: gentle parallax over full scroll
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 0.9, 1], [1, 1.04, 1.08, 1.1]);
  const imageY = useTransform(scrollYProgress, [0, 0.5, 0.9, 1], [0, -20, -40, -50]);

  // Hero (beat 1): one-way exit — monotonic fade, hard clamp to 0 after HERO_EXIT
  const b1Opacity = useTransform(scrollYProgress, (v) => {
    if (v >= HERO_EXIT) return 0;
    if (v <= 0.1) return 1;
    return 1 - (v - 0.1) / (HERO_EXIT - 0.1);
  });
  const b1Y = useTransform(scrollYProgress, (v) => {
    if (v >= HERO_EXIT) return -14;
    if (v <= 0.01) return 0;
    return -14 * (v - 0.01) / (HERO_EXIT - 0.01);
  });
  const b1SubOpacity = useTransform(scrollYProgress, (v) => {
    if (v >= HERO_EXIT) return 0;
    if (v <= 0.09) return 1;
    return 1 - (v - 0.09) / (HERO_EXIT - 0.09);
  });
  const b1SubY = useTransform(scrollYProgress, (v) => {
    if (v >= HERO_EXIT) return -12;
    if (v <= 0.02) return 0;
    return -12 * (v - 0.02) / (HERO_EXIT - 0.02);
  });

  // Story 1: short gap after hero exit, then enter and hold (no overlap)
  const b2Opacity = useTransform(scrollYProgress, [0.20, 0.24, 0.38, 0.46], [0, 1, 1, 0]);
  const b2Y = useTransform(scrollYProgress, [0.20, 0.24, 0.46], [20, 0, -14]);
  const b2SubOpacity = useTransform(scrollYProgress, [0.21, 0.26, 0.37, 0.46], [0, 1, 1, 0]);
  const b2SubY = useTransform(scrollYProgress, [0.21, 0.26, 0.46], [16, 0, -12]);

  // Step 3: ease in → long hold → ease out (unchanged feel)
  const b3Opacity = useTransform(scrollYProgress, [0.46, 0.50, 0.64, 0.72], [0, 1, 1, 0]);
  const b3Y = useTransform(scrollYProgress, [0.46, 0.50, 0.72], [20, 0, -14]);
  const b3SubOpacity = useTransform(scrollYProgress, [0.47, 0.52, 0.63, 0.72], [0, 1, 1, 0]);
  const b3SubY = useTransform(scrollYProgress, [0.47, 0.52, 0.72], [16, 0, -12]);

  // Step 4: ease in → long hold → ease out
  const b4Opacity = useTransform(scrollYProgress, [0.68, 0.72, 0.86, 0.94], [0, 1, 1, 0]);
  const b4Y = useTransform(scrollYProgress, [0.68, 0.72, 0.94], [20, 0, -14]);
  const b4SubOpacity = useTransform(scrollYProgress, [0.69, 0.74, 0.85, 0.94], [0, 1, 1, 0]);
  const b4SubY = useTransform(scrollYProgress, [0.69, 0.74, 0.94], [16, 0, -12]);

  const ctaOpacity = useTransform(scrollYProgress, (v) => {
    if (v >= HERO_EXIT) return 0;
    if (v <= 0.08) return 1;
    return 1 - (v - 0.08) / (HERO_EXIT - 0.08);
  });

  return (
    <section
      className={cn("relative w-full", className)}
      aria-label="Hero story"
    >
      {/* Mobile: text-first cinematic layout */}
      <div className="relative md:hidden">
        <div className="relative h-[100dvh] min-h-[560px] w-full overflow-hidden">
          <Image src="/hero/tesla-hero.png" alt="Tesla electric vehicle" fill sizes="100vw" className="object-cover object-right" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 pt-20">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">{STORY_BEATS[0].eyebrow}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">{STORY_BEATS[0].headline}</h1>
            <p className="mt-2 text-base text-white/75">{STORY_BEATS[0].subtext}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/inventory" className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground evo-focus-ring">
                Browse Inventory
              </Link>
              <Link href="/contact?intent=approval" className="inline-flex h-10 items-center justify-center rounded-lg border border-white/20 px-5 text-sm font-medium text-white evo-focus-ring">
                Get Approved
              </Link>
            </div>
            <div className="mt-10 space-y-6">
              {STORY_BEATS.slice(1).map((beat) => (
                <div key={beat.headline}>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">{beat.eyebrow}</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">{beat.headline}</h2>
                  <p className="mt-1 text-sm text-white/70">{beat.subtext}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: clean full-screen pinned — taller scroll for dwell time */}
      <div ref={containerRef} className="relative hidden h-[520vh] md:block">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div className="absolute inset-0" style={{ scale: imageScale, y: imageY }}>
            <Image
              src="/hero/tesla-hero.png"
              alt="Tesla electric vehicle"
              fill
              sizes="100vw"
              className="object-cover object-right"
              priority
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 35%, transparent 65%, rgba(0,0,0,0.25) 100%)",
              }}
            />
            <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 18vmin 2vmin rgba(0,0,0,0.35)" }} />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse 90% 45% at 75% 70%, rgba(20, 184, 166, 0.08) 0%, transparent 60%)",
              }}
            />
          </div>

          <motion.div
            className="absolute bottom-10 left-[8vw] z-20 flex flex-wrap gap-3"
            style={{ opacity: ctaOpacity }}
          >
            <Link
              href="/inventory"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_0_22px_-4px_var(--glow-subtle)] evo-focus-ring"
            >
              Browse Inventory
            </Link>
            <Link
              href="/contact?intent=approval"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-white/20 bg-black/20 px-6 text-sm font-medium text-white backdrop-blur-sm evo-focus-ring"
            >
              Get Approved
            </Link>
          </motion.div>

          {/* Step 1: headline, subtext — visible from top, scroll-controlled */}
          <motion.div
            className="absolute left-[8vw] top-1/2 z-10 w-[min(28rem,calc(100vw-16vw))] -translate-y-1/2 text-left"
            style={{ opacity: b1Opacity, y: b1Y }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/55">{STORY_BEATS[0].eyebrow}</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">{STORY_BEATS[0].headline}</h2>
            <motion.p className="mt-4 max-w-md text-lg text-white/80" style={{ opacity: b1SubOpacity, y: b1SubY }}>
              {STORY_BEATS[0].subtext}
            </motion.p>
          </motion.div>

          {/* Step 2: slightly lower, centered-left */}
          <motion.div
            className="absolute left-[10vw] top-[52%] z-10 w-[min(26rem,calc(100vw-20vw))] -translate-y-1/2 text-left"
            style={{ opacity: b2Opacity, y: b2Y }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/55">{STORY_BEATS[1].eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">{STORY_BEATS[1].headline}</h2>
            <motion.p className="mt-4 max-w-md text-base text-white/75" style={{ opacity: b2SubOpacity, y: b2SubY }}>
              {STORY_BEATS[1].subtext}
            </motion.p>
          </motion.div>

          {/* Step 3: right aligned */}
          <motion.div
            className="absolute right-[8vw] top-1/2 z-10 w-[min(26rem,calc(100vw-16vw))] -translate-y-1/2 text-right"
            style={{ opacity: b3Opacity, y: b3Y }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/55">{STORY_BEATS[2].eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">{STORY_BEATS[2].headline}</h2>
            <motion.p className="mt-4 ml-auto max-w-md text-base text-white/75" style={{ opacity: b3SubOpacity, y: b3SubY }}>
              {STORY_BEATS[2].subtext}
            </motion.p>
          </motion.div>

          {/* Step 4: center, large, emotional */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-10 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 px-8 text-center"
            style={{ opacity: b4Opacity, y: b4Y }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/55">{STORY_BEATS[3].eyebrow}</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">{STORY_BEATS[3].headline}</h2>
            <motion.p className="mx-auto mt-4 max-w-lg text-lg text-white/80" style={{ opacity: b4SubOpacity, y: b4SubY }}>
              {STORY_BEATS[3].subtext}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
