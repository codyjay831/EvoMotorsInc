"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** ~20% viewport scroll — past a small initial scroll without stacking on the hero CTA. */
const VIEWPORT_REVEAL_RATIO = 0.2;

/** Hide near document end so footer / last CTAs stay unobstructed. */
const FOOTER_CLEARANCE_PX = 300;

const stickyInventoryButtonClass =
  "inline-flex h-11 w-full items-center justify-center rounded-lg border border-transparent bg-primary px-5 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)] transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_28px_-2px_var(--glow-subtle)] evo-focus-ring";

/**
 * Mobile homepage only: fixed “Browse Inventory” after scroll threshold.
 * Desktop: not rendered (`md:hidden`).
 */
export function MobileHomeStickyInventoryCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      const sh = document.documentElement.scrollHeight;
      const revealAt = Math.max(96, Math.round(h * VIEWPORT_REVEAL_RATIO));
      const pastThreshold = y > revealAt;
      const nearFooter = y + h > sh - FOOTER_CLEARANCE_PX;
      setVisible(pastThreshold && !nearFooter);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 md:hidden",
        "pointer-events-none px-4 pt-2",
        "pb-[max(0.625rem,env(safe-area-inset-bottom,0px))]"
      )}
    >
      <div
        className={cn(
          "pointer-events-auto mx-auto max-w-sm",
          "transition-opacity duration-200 motion-reduce:duration-0 motion-reduce:transition-none",
          visible ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div
          className={cn(
            "rounded-xl border border-white/10 bg-background/80 px-3 py-2",
            "shadow-[0_-4px_24px_-4px_rgba(0,0,0,0.35)] backdrop-blur-md",
            "supports-[backdrop-filter]:bg-background/70"
          )}
        >
          <Link
            href="/inventory"
            tabIndex={visible ? undefined : -1}
            aria-hidden={!visible}
            className={stickyInventoryButtonClass}
          >
            Browse Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
