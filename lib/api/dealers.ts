import { apiConfig, useMockData } from "./config";
import { request } from "./client";
import { mockDealer } from "./mocks/data";
import type { Dealer, DealerBranding, DealerContact, DealerHomepage } from "./types";

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
}

function pickDealerPayload(raw: unknown): Record<string, unknown> | null {
  const top = asRecord(raw);
  if (!top) return null;
  const dealer = asRecord(top.dealer);
  if (dealer) return dealer;
  const data = asRecord(top.data);
  if (data) {
    const inner = asRecord(data.dealer);
    if (inner) return inner;
    return data;
  }
  return top;
}

/**
 * Map Vehiclix GET /api/v1/public/dealers response → site Dealer (flexible shapes).
 */
function mapVehiclixDealerToDealer(raw: unknown, fallbackSlug: string): Dealer {
  if (Array.isArray(raw)) {
    const slug = fallbackSlug.toLowerCase();
    const match =
      raw.find((item) => {
        const o = asRecord(item);
        const s = o?.slug ?? o?.dealerSlug;
        return typeof s === "string" && s.toLowerCase() === slug;
      }) ?? raw[0];
    return mapVehiclixDealerToDealer(match, fallbackSlug);
  }

  const d = pickDealerPayload(raw) ?? {};
  const id = String(d.id ?? d.dealerId ?? fallbackSlug);
  const slug = String(d.slug ?? d.dealerSlug ?? fallbackSlug);
  const name = String(d.name ?? d.dealerName ?? d.displayName ?? "Dealer");
  const shortName = typeof d.shortName === "string" ? d.shortName : undefined;

  const contactRaw = asRecord(d.contact);
  const phoneFromRoot = typeof d.phone === "string" ? d.phone : undefined;
  const contact: DealerContact | undefined = (() => {
    const phone =
      typeof contactRaw?.phone === "string" ? contactRaw.phone : phoneFromRoot;
    const email =
      typeof contactRaw?.email === "string"
        ? contactRaw.email
        : typeof d.email === "string"
          ? d.email
          : undefined;
    const city =
      typeof contactRaw?.city === "string"
        ? contactRaw.city
        : typeof d.city === "string"
          ? d.city
          : undefined;
    const region =
      typeof contactRaw?.region === "string"
        ? contactRaw.region
        : typeof d.region === "string"
          ? d.region
          : undefined;
    if (phone == null && email == null && city == null && region == null) return undefined;
    return { phone, email, city, region };
  })();

  const brandingRaw = asRecord(d.branding);
  const branding: DealerBranding | undefined = brandingRaw
    ? {
        logoUrl: typeof brandingRaw.logoUrl === "string" ? brandingRaw.logoUrl : undefined,
        tagline: typeof brandingRaw.tagline === "string" ? brandingRaw.tagline : undefined,
        primaryColor: typeof brandingRaw.primaryColor === "string" ? brandingRaw.primaryColor : undefined,
      }
    : undefined;

  const homepageRaw = asRecord(d.homepage);
  const canonicalBaseUrl =
    typeof d.canonicalBaseUrl === "string"
      ? d.canonicalBaseUrl
      : typeof d.canonical_url === "string"
        ? d.canonical_url
        : undefined;

  let homepage: DealerHomepage | undefined;
  if (homepageRaw || canonicalBaseUrl) {
    homepage = {
      heroHeadline: typeof homepageRaw?.heroHeadline === "string" ? homepageRaw.heroHeadline : undefined,
      heroSubheadline:
        typeof homepageRaw?.heroSubheadline === "string" ? homepageRaw.heroSubheadline : undefined,
      heroCtaText: typeof homepageRaw?.heroCtaText === "string" ? homepageRaw.heroCtaText : undefined,
      featuredSectionTitle:
        typeof homepageRaw?.featuredSectionTitle === "string" ? homepageRaw.featuredSectionTitle : undefined,
      blocks: {
        ...(homepageRaw?.blocks && typeof homepageRaw.blocks === "object" && homepageRaw.blocks !== null
          ? (homepageRaw.blocks as Record<string, unknown>)
          : {}),
        ...(canonicalBaseUrl ? { canonicalBaseUrl } : {}),
      },
    };
    if (
      !homepage.heroHeadline &&
      !homepage.heroSubheadline &&
      !homepage.heroCtaText &&
      !homepage.featuredSectionTitle &&
      Object.keys(homepage.blocks ?? {}).length === 0
    ) {
      homepage = undefined;
    }
  }

  const trustRaw = d.trustHighlights;
  const trustHighlights = Array.isArray(trustRaw)
    ? trustRaw
        .map((t) => {
          const tr = asRecord(t);
          if (!tr || typeof tr.title !== "string") return null;
          return {
            title: tr.title,
            description: typeof tr.description === "string" ? tr.description : undefined,
            icon: typeof tr.icon === "string" ? tr.icon : undefined,
          };
        })
        .filter(Boolean)
    : undefined;

  return {
    id,
    slug,
    name,
    shortName,
    branding: branding && Object.values(branding).some(Boolean) ? branding : undefined,
    homepage,
    contact,
    trustHighlights: trustHighlights?.length ? (trustHighlights as Dealer["trustHighlights"]) : undefined,
  };
}

/**
 * Fetch dealer identity, branding, and homepage content.
 */
export async function getDealer(): Promise<Dealer> {
  if (useMockData) return Promise.resolve(mockDealer);
  const raw = await request<unknown>("/api/v1/public/dealers", {
    params: { dealerSlug: apiConfig.dealerSlug },
  });
  return mapVehiclixDealerToDealer(raw, apiConfig.dealerSlug);
}
