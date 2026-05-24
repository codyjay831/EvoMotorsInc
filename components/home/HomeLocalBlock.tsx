import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { HomeSectionHeader } from "./HomeSectionHeader";
import { cn } from "@/lib/utils";
import { PUBLIC_BUSINESS_INFO } from "@/lib/public-business-info";
import { seoConfig } from "@/lib/seo-config";

type HomeLocalBlockProps = {
  className?: string;
};

export function HomeLocalBlock({ className }: HomeLocalBlockProps) {
  const { localSeo } = seoConfig;

  return (
    <section className={cn("evo-home-section", className)} aria-label="Local dealership details">
      <div className="evo-home-panel p-6 sm:p-8 lg:p-10">
        <HomeSectionHeader
          eyebrow="Visit Evo Motors"
          title={`Local EV dealership support in ${localSeo.primaryCity}, ${localSeo.state}`}
          description={`Serving ${localSeo.serviceArea}. Talk with our team, review available EVs, and get straightforward charging and ownership guidance at our East Bay location.`}
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-border bg-background/40 p-4">
            <div className="mb-2 inline-flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <MapPin className="size-4" aria-hidden />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Address</h3>
            <p className="mt-2 text-sm text-muted-foreground">{PUBLIC_BUSINESS_INFO.addressLine1}</p>
            <p className="text-sm text-muted-foreground">{PUBLIC_BUSINESS_INFO.cityStateZip}</p>
            <p className="mt-2 text-xs text-muted-foreground">{PUBLIC_BUSINESS_INFO.dealerLicenseDisplay}</p>
          </div>

          <div className="rounded-xl border border-border bg-background/40 p-4">
            <div className="mb-2 inline-flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <Clock className="size-4" aria-hidden />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Hours</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{PUBLIC_BUSINESS_INFO.hoursDisplay}</p>
          </div>

          <div className="rounded-xl border border-border bg-background/40 p-4">
            <div className="mb-2 inline-flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <Mail className="size-4" aria-hidden />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <a
              href={`mailto:${PUBLIC_BUSINESS_INFO.email}`}
              className="mt-2 inline-flex text-sm text-primary no-underline hover:text-primary/90 evo-focus-ring rounded-sm"
            >
              {PUBLIC_BUSINESS_INFO.email}
            </a>
            {PUBLIC_BUSINESS_INFO.phone ? (
              <a
                href={`tel:${PUBLIC_BUSINESS_INFO.phoneTel || PUBLIC_BUSINESS_INFO.phone}`}
                className="mt-2 inline-flex items-center gap-2 text-sm text-primary no-underline hover:text-primary/90 evo-focus-ring rounded-sm"
              >
                <Phone className="size-3.5" aria-hidden />
                {PUBLIC_BUSINESS_INFO.phone}
              </a>
            ) : null}
          </div>

          <div className="rounded-xl border border-border bg-background/40 p-4">
            <h3 className="text-sm font-semibold text-foreground">Directions</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Plan your visit and get turn-by-turn directions to our East Bay office.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/contact"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 evo-focus-ring"
              >
                Contact &amp; directions
              </Link>
              {PUBLIC_BUSINESS_INFO.googleMapsUrl ? (
                <a
                  href={PUBLIC_BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-transparent px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted/80 evo-focus-ring"
                >
                  Open map
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
