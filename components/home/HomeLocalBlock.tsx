import Link from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { PUBLIC_BUSINESS_INFO } from "@/lib/public-business-info";
import { seoConfig } from "@/lib/seo-config";

type HomeLocalBlockProps = {
  className?: string;
};

export function HomeLocalBlock({ className }: HomeLocalBlockProps) {
  const { localSeo } = seoConfig;

  return (
    <section
      className={cn(
        "evo-content-width rounded-xl border border-border bg-muted/20 px-6 py-8 sm:px-8",
        className
      )}
      aria-label="Service area"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface text-muted-foreground"
            aria-hidden
          >
            <MapPin className="size-4" />
          </span>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              EV dealer in {localSeo.primaryCity}, {localSeo.state}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Serving {localSeo.serviceArea}. Browse our hand-picked electric vehicles or visit us at{" "}
              {PUBLIC_BUSINESS_INFO.addressLine1}, {PUBLIC_BUSINESS_INFO.cityStateZip}.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3 sm:flex-col sm:items-end">
          {PUBLIC_BUSINESS_INFO.phone ? (
            <a
              href={`tel:${PUBLIC_BUSINESS_INFO.phoneTel}`}
              className="text-sm font-medium text-primary no-underline hover:text-primary/90 evo-focus-ring rounded-sm"
            >
              {PUBLIC_BUSINESS_INFO.phone}
            </a>
          ) : null}
          <Link
            href="/contact"
            className="text-sm font-medium text-primary no-underline hover:text-primary/90 evo-focus-ring rounded-sm"
          >
            Contact &amp; directions →
          </Link>
          {PUBLIC_BUSINESS_INFO.googleMapsUrl ? (
            <a
              href={PUBLIC_BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground no-underline hover:text-foreground evo-focus-ring rounded-sm"
            >
              Open in Maps
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
