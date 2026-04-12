import type { Metadata } from "next";
import { Suspense } from "react";
import { Section, PageHeader } from "@/components/layout";
import { RequestVehicleForm } from "@/components/forms";
import { fullUrl, seoConfig, ogImageUrl } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Request a vehicle",
  description:
    "Tell us what you want (make, model, budget, timeline) and we will help you find the right EV. No obligation.",
  alternates: { canonical: fullUrl("/request-vehicle") },
  openGraph: {
    title: "Request a vehicle | " + seoConfig.siteName,
    description: "Tell us what you're looking for and we'll help you find the right fit.",
    url: fullUrl("/request-vehicle"),
    images: [{ url: ogImageUrl(seoConfig.defaultOgImagePath), width: 1200, height: 630, alt: seoConfig.siteName }],
  },
};

export default function RequestVehiclePage() {
  return (
    <Section>
      <div className="evo-content-width max-w-3xl">
        <PageHeader
          title="Request a vehicle"
          description="Tell us what you're looking for and we'll help you find the right fit. Optional fields let you narrow it down."
        />
        <div className="mt-10 rounded-xl border border-border bg-surface/40 p-6 sm:p-8">
          <Suspense fallback={<p className="evo-muted">Loading form…</p>}>
            <RequestVehicleForm />
          </Suspense>
        </div>
      </div>
    </Section>
  );
}
