"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { SiteContainer } from "./site-container";
import { buildLoginUrl } from "@/lib/auth-bridge";
import { cn } from "@/lib/utils";

const loginButtonClass =
  "inline-flex h-7 shrink-0 items-center justify-center rounded-lg border border-transparent bg-primary px-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)] transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_28px_-2px_var(--glow-subtle)] evo-focus-ring";

const NAV_LINKS = [
  { href: "/", label: "Home" },
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
      <SiteContainer>
        <div className="flex h-14 items-center justify-between gap-6 sm:h-16">
          <Logo size="sm" className="shrink-0" />

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "evo-body-sm rounded-md px-3 py-2 font-medium no-underline transition-colors duration-200 evo-focus-ring",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={buildLoginUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="evo-body-sm text-muted-foreground hover:text-foreground transition-colors duration-200 evo-focus-ring rounded-md"
              aria-label="Secure account login"
            >
              Login
            </a>
            <a
              href={buildLoginUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={loginButtonClass}
            >
              Login
            </a>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-foreground hover:bg-muted transition-colors duration-200 evo-focus-ring md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </SiteContainer>

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
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
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
          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            <a
              href={buildLoginUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="evo-body-sm text-center text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Customer Portal
            </a>
            <a
              href={buildLoginUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(loginButtonClass, "h-8")}
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
