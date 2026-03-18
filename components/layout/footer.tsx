import Link from "next/link";
import { Logo } from "./logo";
import { SiteContainer } from "./site-container";
import { buildPortalUrl, buildRegisterUrl } from "@/lib/auth-bridge";
import { SITE } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/request-vehicle", label: "Request Vehicle" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50">
      <SiteContainer className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo size="md" className="mb-4" />
            <p className="evo-body-sm text-muted-foreground max-w-xs">
              {SITE.tagline} Premium electric vehicles.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="evo-eyebrow mb-4 text-foreground/80">Site</p>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                <Link
                  href={href}
                  className={cn(
                      "evo-body-sm text-muted-foreground no-underline transition-colors duration-200 hover:text-foreground evo-focus-ring rounded-sm"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="evo-eyebrow mb-4 text-foreground/80">Contact &amp; account</p>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href={buildPortalUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="evo-body-sm text-muted-foreground no-underline transition-colors duration-200 hover:text-primary evo-focus-ring rounded-sm"
                >
                  Customer Portal
                </a>
              </li>
              <li>
                <a
                  href={buildRegisterUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="evo-body-sm text-muted-foreground no-underline transition-colors duration-200 hover:text-foreground evo-focus-ring rounded-sm"
                >
                  Create account
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="evo-body-sm text-muted-foreground no-underline transition-colors duration-200 hover:text-foreground evo-focus-ring rounded-sm"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="evo-muted text-center sm:text-left">
            © {year} {SITE.name}. All rights reserved.
          </p>
        </div>
      </SiteContainer>
    </footer>
  );
}
