import { Suspense } from "react";
import type { Metadata } from "next";
import { Section, SiteContainer } from "@/components/layout";
import {
  HomeChargingFeature,
  HomeCtaBand,
  HomeFeaturedInventoryLoader,
  HomeLocalBlock,
  HomeQuickActions,
  HomeTrustRow,
  FeaturedVehiclesSkeleton,
} from "@/components/home";
import { HeroStorySection } from "@/components/marketing";
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
        <Section spacing="afterHero">
          <Suspense fallback={<FeaturedVehiclesSkeleton />}>
            <HomeFeaturedInventoryLoader />
          </Suspense>
        </Section>

        <Section spacing="default">
          <HomeQuickActions />
        </Section>

        <Section spacing="default">
          <HomeTrustRow />
        </Section>

        <Section spacing="default">
          <HomeChargingFeature />
        </Section>

        <Section spacing="default">
          <HomeLocalBlock />
        </Section>

        <Section spacing="compact">
          <HomeCtaBand />
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
          <Section spacing="afterHero">
            <Suspense fallback={<FeaturedVehiclesSkeleton />}>
              <HomeFeaturedInventoryLoader />
            </Suspense>
          </Section>
          <Section spacing="default">
            <HomeQuickActions />
          </Section>
        </SiteContainer>
      </>
    );
  }

  return <HomePageV2 />;
}
