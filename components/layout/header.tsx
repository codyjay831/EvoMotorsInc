"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Main nav links (logo/brand also links home). */
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/ev-charging", label: "EV Charging" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/request-vehicle", label: "Request Vehicle" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        isHome
          ? "fixed inset-x-0 border-b border-white/10 bg-black/35"
          : "sticky border-b border-border bg-background/95"
      )}
    >
      <div className="mx-auto h-20 w-full max-w-[1400px] px-6 sm:px-8 md:px-10 lg:px-12">
        {/* 3-zone layout: Left (brand) | Center (nav) | Right (mobile hamburger) */}
        <div className="flex h-full w-full items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 md:items-center">
          {/* Left: logo + EVO MOTORS */}
          <Link
            href="/"
            className="flex w-fit shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90 evo-focus-ring rounded-md"
            aria-label="Evo Motors home"
          >
            <Image
              src="/branding/logo.png"
              alt=""
              width={36}
              height={36}
              className="object-contain"
              priority
            />
            <span
              className={cn(
                "uppercase font-semibold tracking-wide",
                isHome ? "text-white/90" : "text-foreground"
              )}
            >
              EVO MOTORS
            </span>
          </Link>

          {/* Center: main nav */}
          <nav
            className="hidden items-center justify-center md:flex md:gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "evo-body-sm rounded-md px-2.5 py-2 font-medium no-underline transition-colors duration-200 evo-focus-ring",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-foreground/90 hover:text-foreground hover:bg-muted/30"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Hamburger (mobile only) */}
          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-lg text-foreground hover:bg-muted/30 transition-colors duration-200 evo-focus-ring md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border bg-background md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
        aria-hidden={!mobileOpen}
      >
        <nav
          className="mx-auto max-w-[1400px] px-6 py-5 sm:px-8"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-0.5">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-sm font-medium no-underline transition-colors duration-200 evo-focus-ring",
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:bg-muted/50"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
