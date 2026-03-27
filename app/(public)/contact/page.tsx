import type { Metadata } from "next";
import { Section, PageHeader } from "@/components/layout";
import { ContactForm } from "@/components/forms";
import { fullUrl, seoConfig, ogImageUrl } from "@/lib/seo-config";
import { Mail, MapPin } from "lucide-react";
import { PUBLIC_BUSINESS_INFO } from "@/lib/public-business-info";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Evo Motors. Questions about our vehicles, financing, or the buying process? We're here to help.",
  alternates: { canonical: fullUrl("/contact") },
  openGraph: {
    title: "Contact | " + seoConfig.siteName,
    description: "Get in touch. We're here to help with any questions.",
    url: fullUrl("/contact"),
    images: [{ url: ogImageUrl(seoConfig.defaultOgImagePath), width: 1200, height: 630, alt: seoConfig.siteName }],
  },
};

export default function ContactPage() {
  return (
    <Section>
      <div className="evo-content-width space-y-12 lg:space-y-16">
        <PageHeader
          title="Contact"
          description="Get in touch. We're here to help with any questions about our vehicles or the buying process."
        />

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="evo-card-title text-foreground">Contact info</h2>
            <div className="rounded-xl border border-border bg-surface/50 p-6 space-y-4">
              <div className="evo-body text-foreground">{PUBLIC_BUSINESS_INFO.contactName}</div>
              <a
                href={`mailto:${PUBLIC_BUSINESS_INFO.email}`}
                className="flex items-center gap-3 evo-body text-foreground no-underline transition-colors hover:text-primary"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground shrink-0" aria-hidden>
                  <Mail className="size-5" />
                </span>
                {PUBLIC_BUSINESS_INFO.email}
              </a>
              <div className="flex items-start gap-3 evo-body text-muted-foreground">
                <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground shrink-0" aria-hidden>
                  <MapPin className="size-5" />
                </span>
                <div>
                  <div>{PUBLIC_BUSINESS_INFO.addressLine1}</div>
                  <div>{PUBLIC_BUSINESS_INFO.cityStateZip}</div>
                  <div className="mt-1">{PUBLIC_BUSINESS_INFO.dealerLicenseDisplay}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <h2 className="evo-card-title text-foreground mb-6">Send a message</h2>
            <div className="rounded-xl border border-border bg-surface/40 p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
