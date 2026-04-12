import type { Dealer, VehicleSummary } from "../types";

export const mockDealer: Dealer = {
  id: "evo-1",
  slug: "evo-motors",
  name: "Evo Motors",
  shortName: "Evo",
  branding: {
    tagline: "Electric. Premium.",
    primaryColor: "#14b8a6",
  },
  homepage: {
    heroHeadline: "Electric. Premium.",
    heroSubheadline: "Next-generation electric vehicles, delivered.",
    heroCtaText: "View inventory",
    featuredSectionTitle: "Featured vehicles",
  },
  contact: {
    email: "ron@evomotorsinc.com",
    city: "El Sobrante",
    region: "CA",
  },
  trustHighlights: [
    { title: "Curated inventory", description: "Hand-picked EVs from leading brands, ready to drive." },
    { title: "EV expertise", description: "We specialize in electric vehicles, from range and charging to incentives." },
    { title: "Transparent buying", description: "No pressure. Clear pricing and straightforward process." },
    { title: "Right fit", description: "We help you find the EV that matches how you drive and live." },
  ],
};

export const mockVehiclesSummary: VehicleSummary[] = [];
