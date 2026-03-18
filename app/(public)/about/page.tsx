import type { Metadata } from "next";
import { Section, PageHeader, SiteContainer } from "@/components/layout";
import { fullUrl, seoConfig, ogImageUrl } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Evo Motors—our story, values, and commitment to electric mobility. Premium EVs and a straightforward buying experience.",
  alternates: { canonical: fullUrl("/about") },
  openGraph: {
    title: "About | " + seoConfig.siteName,
    description: "Our story and commitment to electric mobility.",
    url: fullUrl("/about"),
    images: [{ url: ogImageUrl(seoConfig.defaultOgImagePath), width: 1200, height: 630, alt: seoConfig.siteName }],
  },
};

export default function AboutPage() {
  return (
    <SiteContainer>
      <Section>
        <PageHeader
          title="About"
          description="Our story and commitment to electric mobility."
        />
      </Section>
    </SiteContainer>
  );
}
