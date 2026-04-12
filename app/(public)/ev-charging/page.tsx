import type { Metadata } from "next";
import { EvChargingContent } from "@/components/ev-charging/ev-charging-content";
import { fullUrl, ogImageUrl, seoConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "EV Charging",
  description:
    "Bay Area EV charging guide: Level 1 vs Level 2 vs fast charging, PG&E off-peak rates, home readiness, cost vs gas calculator, and myth-busting. Evo Motors.",
  alternates: { canonical: fullUrl("/ev-charging") },
  openGraph: {
    title: "EV Charging | " + seoConfig.siteName,
    description:
      "Practical Bay Area charging guidance, PG&E-focused rate tips, and tools to compare electric cost vs gas.",
    url: fullUrl("/ev-charging"),
    images: [
      {
        url: ogImageUrl(seoConfig.defaultOgImagePath),
        width: 1200,
        height: 630,
        alt: seoConfig.siteName,
      },
    ],
  },
};

export default function EvChargingPage() {
  return <EvChargingContent />;
}
