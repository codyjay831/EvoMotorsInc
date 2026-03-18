"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type RoadStorySectionProps = {
  className?: string;
};

const HEADLINE_LG = "text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-[3.25rem]";
const HEADLINE_MD = "text-2xl font-semibold tracking-tight text-white md:text-3xl";
const BODY = "text-lg text-white/85 md:text-xl";

const ROAD_BEATS = [
  {
    headline: "Confidence for the road ahead",
    subtext: "Everything you need to go electric — made simple.",
  },
  {
    headline: "Choosing an EV shouldn't feel complicated.",
    subtext:
      "We guide you through range, charging, and real-world ownership — so you know exactly what to expect.",
  },
  {
    headline:
      "Home charging support through BayTech Smart Homes helps your EV fit seamlessly into your life.",
  },
] as const;

export function RoadStorySection({ className }: RoadStorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.4, 0.85, 1], [1, 1.02, 1.05, 1.06]);
  const imageY = useTransform(scrollYProgress, [0, 0.45, 0.9, 1], [0, -16, -32, -40]);

  // Step 1: ease in → long hold → ease out
  const s1Opacity = useTransform(scrollYProgress, [0, 0.04, 0.26, 0.34], [0, 1, 1, 0]);
  const s1Y = useTransform(scrollYProgress, [0, 0.04, 0.34], [24, 0, -14]);
  const s1SubOpacity = useTransform(scrollYProgress, [0.01, 0.06, 0.25, 0.34], [0, 1, 1, 0]);
  const s1SubY = useTransform(scrollYProgress, [0.01, 0.06, 0.34], [18, 0, -12]);

  // Step 2: ease in → long hold → ease out
  const s2Opacity = useTransform(scrollYProgress, [0.30, 0.34, 0.56, 0.64], [0, 1, 1, 0]);
  const s2Y = useTransform(scrollYProgress, [0.30, 0.34, 0.64], [20, 0, -12]);
  const s2SubOpacity = useTransform(scrollYProgress, [0.31, 0.38, 0.54, 0.64], [0, 1, 1, 0]);
  const s2SubY = useTransform(scrollYProgress, [0.31, 0.38, 0.64], [16, 0, -10]);

  // Step 3: ease in → long hold → ease out
  const s3Opacity = useTransform(scrollYProgress, [0.60, 0.64, 0.84, 0.94], [0, 1, 1, 0]);
  const s3Y = useTransform(scrollYProgress, [0.60, 0.64, 0.94], [20, 0, -12]);

  const contentFade = useTransform(scrollYProgress, [0.88, 0.96], [1, 0]);
  const overlayDarken = useTransform(scrollYProgress, [0.86, 0.98], [0, 1]);

  return (
    <section
      className={cn("relative w-full", className)}
      aria-label="Road story"
    >
      {/* Mobile */}
      <div className="relative md:hidden">
        <div className="relative h-[100dvh] min-h-[560px] w-full overflow-hidden">
          <Image
            src="/hero/road-hero2.png"
            alt="Road ahead"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/45 via-black/25 to-black/55" />
          <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 pt-20">
            <h2 className={cn(HEADLINE_LG, "text-3xl")}>{ROAD_BEATS[0].headline}</h2>
            <p className="mt-3 text-base text-white/80">{ROAD_BEATS[0].subtext}</p>
            <div className="mt-10 space-y-8">
              <div>
                <h2 className={cn(HEADLINE_MD, "text-xl")}>{ROAD_BEATS[1].headline}</h2>
                <p className="mt-2 text-base text-white/80">{ROAD_BEATS[1].subtext}</p>
              </div>
              <div>
                <p className={cn("text-lg text-white/90", HEADLINE_MD)}>{ROAD_BEATS[2].headline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: full-screen pinned — taller scroll for dwell time */}
      <div ref={containerRef} className="relative hidden h-[400vh] md:block">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            style={{ scale: imageScale, y: imageY }}
          >
            <Image
              src="/hero/road-hero2.png"
              alt="Road ahead"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.20) 40%, rgba(0,0,0,0.08) 70%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.06) 40%, rgba(0,0,0,0.08) 70%, rgba(0,0,0,0.2) 100%)",
              }}
            />
            <div className="absolute inset-0 opacity-50" style={{ boxShadow: "inset 0 0 12vmin 1.5vmin rgba(0,0,0,0.2)" }} />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 70% 50%, rgba(0, 230, 210, 0.04) 0%, transparent 60%)",
              }}
            />
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 z-[2] bg-black"
            style={{ opacity: overlayDarken }}
            aria-hidden
          />

          <motion.div
            className="absolute left-1/2 top-1/2 z-10 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 px-6 text-center"
            style={{ opacity: s1Opacity, y: s1Y }}
          >
            <motion.div style={{ opacity: contentFade }}>
              <h2 className={HEADLINE_LG}>{ROAD_BEATS[0].headline}</h2>
              <motion.p
                className={cn("mx-auto mt-4 max-w-xl", BODY)}
                style={{ opacity: s1SubOpacity, y: s1SubY }}
              >
                {ROAD_BEATS[0].subtext}
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute left-[10vw] top-1/2 z-10 w-[min(32rem,calc(100vw-20vw))] -translate-y-1/2 text-left"
            style={{ opacity: s2Opacity, y: s2Y }}
          >
            <motion.div style={{ opacity: contentFade }}>
              <h2 className={HEADLINE_MD}>{ROAD_BEATS[1].headline}</h2>
              <motion.p className={cn("mt-4 text-white/85", BODY)} style={{ opacity: s2SubOpacity, y: s2SubY }}>
                {ROAD_BEATS[1].subtext}
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute right-[8vw] top-1/2 z-10 w-[min(28rem,calc(100vw-16vw))] -translate-y-1/2 text-right"
            style={{ opacity: s3Opacity, y: s3Y }}
          >
            <motion.div style={{ opacity: contentFade }}>
              <p className={cn(HEADLINE_MD)}>{ROAD_BEATS[2].headline}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
