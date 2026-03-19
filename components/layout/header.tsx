"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { buildLoginUrl } from "@/lib/auth-bridge";
import { cn } from "@/lib/utils";

const loginButtonClass =
  "inline-flex h-9 shrink-0 items-center justify-center rounded-lg border border-transparent bg-primary px-4 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)] transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_28px_-2px_var(--glow-subtle)] evo-focus-ring";

const NAV_LINKS = [
  { href: "/inventory", label: "Inventory" },
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
      <div className="mx-auto h-20 w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10">
        {/* Mobile: brand left, hamburger right — simple and premium */}
        <div className="flex h-full items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4">
          <Link
            href="/"
            className="flex w-fit shrink-0 items-center gap-2 transition-opacity hover:opacity-90 evo-focus-ring rounded-md"
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

          {/* Center: main nav (desktop only) */}
          <nav
            className="hidden items-center justify-center gap-8 lg:gap-10 md:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "evo-body-sm rounded-md px-2 py-1.5 font-medium no-underline transition-colors duration-200 evo-focus-ring",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-foreground/90 hover:text-foreground hover:bg-white/5"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Login (desktop) / Hamburger (mobile) */}
          <div className="flex items-center justify-end gap-2">
            <a
              href={buildLoginUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(loginButtonClass, "hidden md:inline-flex")}
              aria-label="Secure account login"
            >
              Login
            </a>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-lg text-foreground hover:bg-white/10 transition-colors duration-200 evo-focus-ring md:hidden -mr-1"
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
          className="evo-content-width py-4"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-md px-4 py-3 text-sm font-medium no-underline transition-colors duration-200 evo-focus-ring",
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 border-t border-border pt-4">
            <a
              href={buildLoginUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(loginButtonClass, "inline-flex h-10 w-full justify-center")}
              onClick={() => setMobileOpen(false)}
            >
              Login
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
