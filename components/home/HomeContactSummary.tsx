import Link from "next/link";
import type { Dealer } from "@/lib/api";
import { Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const FALLBACK = {
  phone: "(555) 123-4567",
  email: "hello@evomotors.com",
  city: "San Francisco",
  region: "CA",
};

type HomeContactSummaryProps = {
  dealer: Dealer;
  className?: string;
};

export function HomeContactSummary({ dealer, className }: HomeContactSummaryProps) {
  const contact = dealer.contact;
  const phone = contact?.phone ?? FALLBACK.phone;
  const email = contact?.email ?? FALLBACK.email;
  const city = contact?.city ?? FALLBACK.city;
  const region = contact?.region ?? FALLBACK.region;
  const location = [city, region].filter(Boolean).join(", ") || null;

  return (
    <section
      className={cn("evo-content-width", className)}
      aria-label="Contact"
    >
      <div className="rounded-xl border border-border bg-muted/30 py-8 px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-4">
            {phone && (
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="flex items-center gap-3 evo-body text-foreground no-underline transition-colors duration-200 hover:text-primary evo-focus-ring rounded-md"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-surface text-muted-foreground" aria-hidden>
                  <Phone className="size-4" />
                </span>
                {phone}
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 evo-body text-foreground no-underline transition-colors duration-200 hover:text-primary evo-focus-ring rounded-md"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-surface text-muted-foreground" aria-hidden>
                  <Mail className="size-4" />
                </span>
                {email}
              </a>
            )}
            {location && (
              <div className="flex items-center gap-3 evo-body text-muted-foreground">
                <span className="flex size-9 items-center justify-center rounded-lg bg-surface text-muted-foreground" aria-hidden>
                  <MapPin className="size-4" />
                </span>
                {location}
              </div>
            )}
          </div>
          <Link
            href="/contact"
            className="evo-body-sm font-medium text-primary no-underline transition-colors duration-200 hover:text-primary/90 shrink-0 evo-focus-ring rounded-sm"
          >
            Full contact &amp; hours →
          </Link>
        </div>
      </div>
    </section>
  );
}
