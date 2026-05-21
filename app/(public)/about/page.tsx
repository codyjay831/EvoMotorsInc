import type { Metadata } from "next";
import { Section, PageHeader, SiteContainer } from "@/components/layout";
import { fullUrl, seoConfig, ogImageUrl } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Ronald, founder of Evo Motors. Over 15 years in electrical and green energy, from solar and battery storage to EV chargers and panel upgrades.",
  alternates: { canonical: fullUrl("/about") },
  openGraph: {
    title: "About | " + seoConfig.siteName,
    description:
      "Electric vehicles and home charging guidance from someone who installs the electrical side for a living.",
    url: fullUrl("/about"),
    images: [{ url: ogImageUrl(seoConfig.defaultOgImagePath), width: 1200, height: 630, alt: seoConfig.siteName }],
  },
};

export default function AboutPage() {
  return (
    <SiteContainer>
      <Section>
        <div className="evo-content-width max-w-3xl space-y-12">
          <PageHeader
            title="About"
            description="Electric vehicles and home charging, from someone who does the electrical work."
          />

          <div className="space-y-6 text-[0.9375rem] leading-[1.65] text-muted-foreground/90">
            <p>
              I&apos;m Ronald. I&apos;ve spent over 15 years in electrical and green energy: solar,
              battery storage, panel upgrades, smart panels, EV chargers, and the service work that
              keeps it all running.
            </p>
            <p>
              I&apos;ve always liked technology and electric cars. After years of answering the same
              questions from customers and friends about chargers, panel capacity, and what actually
              makes sense at home, I started Evo Motors to put that knowledge in one place.
            </p>
            <p>
              When you talk to me about a vehicle, you&apos;re also talking to someone who installs
              the charging and electrical side of it. I want to help people understand EVs and home
              charging without the guesswork.
            </p>
          </div>
        </div>
      </Section>
    </SiteContainer>
  );
}
