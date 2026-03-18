import type { Metadata } from "next";
import { Section, PageHeader } from "@/components/layout";
import { ContactForm } from "@/components/forms";
import { getDealer } from "@/lib/api";
import { fullUrl, seoConfig, ogImageUrl } from "@/lib/seo-config";
import { Mail, Phone, MapPin } from "lucide-react";

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

const FALLBACK = {
  phone: "(555) 123-4567",
  email: "hello@evomotors.com",
  city: "San Francisco",
  region: "CA",
};

export default async function ContactPage() {
  const dealer = await getDealer();
  const contact = dealer.contact;
  const phone = contact?.phone ?? FALLBACK.phone;
  const email = contact?.email ?? FALLBACK.email;
  const city = contact?.city ?? FALLBACK.city;
  const region = contact?.region ?? FALLBACK.region;
  const location = [city, region].filter(Boolean).join(", ") || null;

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
              {phone && (
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 evo-body text-foreground no-underline transition-colors hover:text-primary"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground shrink-0" aria-hidden>
                    <Phone className="size-5" />
                  </span>
                  {phone}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 evo-body text-foreground no-underline transition-colors hover:text-primary"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground shrink-0" aria-hidden>
                    <Mail className="size-5" />
                  </span>
                  {email}
                </a>
              )}
              {location && (
                <div className="flex items-center gap-3 evo-body text-muted-foreground">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground shrink-0" aria-hidden>
                    <MapPin className="size-5" />
                  </span>
                  {location}
                </div>
              )}
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
