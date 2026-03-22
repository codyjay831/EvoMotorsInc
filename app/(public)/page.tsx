import type { Metadata } from "next";
import { Section, SiteContainer } from "@/components/layout";
import {
  HomeFeaturedVehicles,
  HomeCtaBand,
  HomeContactSummary,
} from "@/components/home";
import {
  HeroStoryMobileHero,
  HeroStoryMobileTrustBlocks,
  HeroStorySection,
  RoadStorySection,
} from "@/components/marketing";
import { getDealer, getFeaturedVehicles } from "@/lib/api";
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
  const [dealer, featuredVehicles] = await Promise.all([
    getDealer(),
    getFeaturedVehicles(6),
  ]);

  return (
    <>
      <div className="flex flex-col">
        <div className="hidden md:order-1 md:block">
          <HeroStorySection />
        </div>

        <div className="order-1 md:hidden">
          <HeroStoryMobileHero />
        </div>

        <div className="order-2 md:order-3">
          <SiteContainer>
            <Section spacing="default">
              <HomeFeaturedVehicles dealer={dealer} vehicles={featuredVehicles} />
            </Section>
          </SiteContainer>
        </div>

        <div className="order-3 md:hidden">
          <HeroStoryMobileTrustBlocks />
        </div>

        <RoadStorySection className="order-4 md:order-2" />

        <SiteContainer className="order-5 md:order-4">
          <Section spacing="default">
            <HomeCtaBand />
          </Section>

          <Section spacing="default">
            <HomeContactSummary dealer={dealer} />
          </Section>
        </SiteContainer>
      </div>
    </>
  );
}
