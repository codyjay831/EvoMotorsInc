import type { Metadata } from "next";
import { Section, SiteContainer } from "@/components/layout";
import {
  HomeFeaturedVehicles,
  HomeCtaBand,
  HomeContactSummary,
  MobileHomeStickyInventoryCta,
} from "@/components/home";
import { HeroStorySection, RoadStorySection } from "@/components/marketing";
import { getFeaturedVehicles } from "@/lib/api";
import { fullUrl, seoConfig, ogImageUrl } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: { absolute: seoConfig.defaultTitle },
  description: seoConfig.defaultDescription,
  alternates: { canonical: fullUrl("/") },
  openGraph: {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    url: fullUrl("/"),
    images: [{ url: ogImageUrl(seoConfig.defaultOgImagePath), width: 1200, height: 630, alt: seoConfig.siteName }],
  },
};

export default async function HomePage() {
  const featuredVehicles = await getFeaturedVehicles(6);

  return (
    <>
      <HeroStorySection />

      <RoadStorySection />

      <SiteContainer>
        <Section spacing="default">
          <HomeFeaturedVehicles vehicles={featuredVehicles} />
        </Section>

        <Section spacing="default">
          <HomeCtaBand />
        </Section>

        <Section spacing="default">
          <HomeContactSummary />
        </Section>
      </SiteContainer>

      <MobileHomeStickyInventoryCta />
    </>
  );
}
