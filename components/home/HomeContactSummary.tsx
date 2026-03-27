import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { PUBLIC_BUSINESS_INFO } from "@/lib/public-business-info";

type HomeContactSummaryProps = {
  className?: string;
};

export function HomeContactSummary({ className }: HomeContactSummaryProps) {
  return (
    <section
      className={cn("evo-content-width", className)}
      aria-label="Contact"
    >
      <div className="rounded-xl border border-border bg-muted/30 py-8 px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-4">
            <div className="evo-body text-foreground">{PUBLIC_BUSINESS_INFO.contactName}</div>
            <a
              href={`mailto:${PUBLIC_BUSINESS_INFO.email}`}
              className="flex items-center gap-3 evo-body text-foreground no-underline transition-colors duration-200 hover:text-primary evo-focus-ring rounded-md"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-surface text-muted-foreground" aria-hidden>
                <Mail className="size-4" />
              </span>
              {PUBLIC_BUSINESS_INFO.email}
            </a>
            <div className="flex items-start gap-3 evo-body text-muted-foreground">
              <span className="flex size-9 items-center justify-center rounded-lg bg-surface text-muted-foreground shrink-0" aria-hidden>
                <MapPin className="size-4" />
              </span>
              <div>
                <div>{PUBLIC_BUSINESS_INFO.addressLine1}</div>
                <div>{PUBLIC_BUSINESS_INFO.cityStateZip}</div>
                <div className="mt-1">{PUBLIC_BUSINESS_INFO.dealerLicenseDisplay}</div>
              </div>
            </div>
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
