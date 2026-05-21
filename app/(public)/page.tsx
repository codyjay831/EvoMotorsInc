import { Suspense } from "react";
import type { Metadata } from "next";
import { Section, SiteContainer } from "@/components/layout";
import {
  HomeCtaBand,
  HomeContactSummary,
  HomeFeaturedInventoryLoader,
  HomeLocalBlock,
  HomeTrustRow,
  FeaturedVehiclesSkeleton,
} from "@/components/home";
import { HeroStorySection, RoadStorySection } from "@/components/marketing";
import { fullUrl, seoConfig, ogImageUrl } from "@/lib/seo-config";
import { isHomepageV2Enabled } from "@/lib/homepage-v2";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: seoConfig.homeTitle },
  description: seoConfig.homeDescription,
  alternates: { canonical: fullUrl("/") },
  openGraph: {
    title: seoConfig.homeTitle,
    description: seoConfig.homeDescription,
    url: fullUrl("/"),
    images: [{ url: ogImageUrl(seoConfig.defaultOgImagePath), width: 1200, height: 630, alt: seoConfig.siteName }],
  },
};

function HomePageV2() {
  return (
    <>
      <HeroStorySection />

      <SiteContainer>
        <Section spacing="default">
          <Suspense fallback={<FeaturedVehiclesSkeleton />}>
            <HomeFeaturedInventoryLoader />
          </Suspense>
        </Section>

        <Section spacing="default">
          <HomeTrustRow />
        </Section>

        <Section spacing="default">
          <HomeLocalBlock />
        </Section>

        <Section spacing="default">
          <RoadStorySection />
        </Section>

        <Section spacing="default">
          <HomeCtaBand />
        </Section>

        <Section spacing="default">
          <HomeContactSummary />
        </Section>
      </SiteContainer>
    </>
  );
}

export default function HomePage() {
  if (!isHomepageV2Enabled()) {
    return (
      <>
        <HeroStorySection />
        <SiteContainer>
          <Section spacing="default">
            <Suspense fallback={<FeaturedVehiclesSkeleton />}>
              <HomeFeaturedInventoryLoader />
            </Suspense>
          </Section>
        </SiteContainer>
      </>
    );
  }

  return <HomePageV2 />;
}
