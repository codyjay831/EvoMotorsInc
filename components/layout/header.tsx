"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site-config";

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
        "top-0 z-50 border-b border-border/60 backdrop-blur-xl",
        isHome
          ? "fixed inset-x-0 bg-black/45 supports-[backdrop-filter]:bg-black/35"
          : "sticky bg-background/85 supports-[backdrop-filter]:bg-background/75"
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground evo-focus-ring"
      >
        Skip to main content
      </a>
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex h-[4.5rem] items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8">
          <Link
            href="/"
            className="group flex w-fit shrink-0 items-center gap-2 rounded-md px-1.5 py-1 evo-focus-ring"
            aria-label="Evo Motors home"
          >
            <Image
              src={SITE.logoPath}
              alt=""
              width={34}
              height={34}
              className="object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              priority
              unoptimized
            />
            <span
              className={cn(
                "font-sans text-sm font-semibold tracking-tight transition-colors",
                isHome ? "text-white/95 group-hover:text-white" : "text-foreground group-hover:text-white/90"
              )}
            >
              {SITE.name}
            </span>
          </Link>

          <nav
            className="hidden items-center justify-center md:flex"
            aria-label="Main navigation"
          >
            <ul className="flex items-center rounded-full border border-border/70 bg-surface/65 p-1">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "evo-body-sm rounded-full px-3.5 py-2 font-medium tracking-tight no-underline transition-all duration-200 evo-focus-ring",
                        isActive
                          ? "bg-primary/15 text-primary shadow-[0_0_0_1px_rgb(255_255_255_/_0.04)]"
                          : "text-foreground/78 hover:bg-muted/55 hover:text-foreground"
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-2">
            {isHome ? (
              <Link
                href="/inventory"
                className="hidden h-9 items-center rounded-full bg-primary px-4 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-primary/90 evo-focus-ring lg:inline-flex"
              >
                Browse Inventory
              </Link>
            ) : null}
            <Link
              href="/request-vehicle"
              className="hidden h-9 items-center rounded-full border border-primary/30 bg-primary/12 px-4 text-xs font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:bg-primary/20 evo-focus-ring md:inline-flex"
            >
              Request Vehicle
            </Link>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border/70 bg-surface/70 text-foreground transition-colors duration-200 hover:bg-muted/60 evo-focus-ring md:hidden"
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
          "md:hidden",
          mobileOpen ? "block border-t border-border/70 bg-background/95" : "hidden"
        )}
        aria-hidden={!mobileOpen}
      >
        <nav
          className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1 rounded-2xl border border-border/70 bg-surface/65 p-2">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-sm font-medium no-underline transition-colors duration-200 evo-focus-ring",
                      isActive
                        ? "bg-primary/15 text-primary"
                        : "text-foreground/90 hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/request-vehicle"
            className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-xl border border-primary/30 bg-primary/12 px-4 text-sm font-medium text-primary transition-colors hover:bg-primary/20 evo-focus-ring"
            onClick={() => setMobileOpen(false)}
          >
            Request vehicle
          </Link>
        </nav>
      </div>
    </header>
  );
}
