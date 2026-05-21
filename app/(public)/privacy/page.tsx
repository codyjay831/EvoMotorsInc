import type { Metadata } from "next";
import { Section, SiteContainer } from "@/components/layout";
import { fullUrl, seoConfig, ogImageUrl } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${seoConfig.siteName}. How we collect and use information when you browse our site or submit a form.`,
  alternates: { canonical: fullUrl("/privacy") },
  robots: { index: true, follow: true },
  openGraph: {
    title: `Privacy Policy | ${seoConfig.siteName}`,
    description: `Privacy policy for ${seoConfig.siteName}.`,
    url: fullUrl("/privacy"),
    images: [{ url: ogImageUrl(seoConfig.defaultOgImagePath), width: 1200, height: 630, alt: seoConfig.siteName }],
  },
};

export default function PrivacyPage() {
  return (
    <SiteContainer>
      <Section>
        <div className="evo-content-width max-w-3xl space-y-8">
          <h1 className="evo-section-heading text-foreground">Privacy Policy</h1>
          <p className="evo-body text-muted-foreground">
            Last updated: May 2026
          </p>

          <div className="space-y-6 evo-body text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground">Information we collect</h2>
              <p className="mt-3">
                When you submit a contact form, request a vehicle, or reserve a vehicle, we collect the
                information you provide (such as name, email, phone, and message content) so we can respond
                to your inquiry.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">How we use information</h2>
              <p className="mt-3">
                We use your information to respond to inquiries, process vehicle requests and reservations,
                and improve our services. We do not sell your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">Analytics</h2>
              <p className="mt-3">
                We may use analytics tools (such as Google Analytics) to understand how visitors use our
                website. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">Contact</h2>
              <p className="mt-3">
                Questions about this policy? Email us at{" "}
                <a href="mailto:ron@evomotorsinc.com" className="text-primary no-underline hover:text-primary/90">
                  ron@evomotorsinc.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </Section>
    </SiteContainer>
  );
}
