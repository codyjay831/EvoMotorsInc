import type { Metadata } from "next";
import { Suspense } from "react";
import { Section, SiteContainer } from "@/components/layout";
import {
  InventoryHeader,
  InventoryToolbar,
  InventoryResultsSummary,
  VehicleGrid,
  InventoryEmptyState,
  InventoryCta,
} from "@/components/inventory";
import { getInventory, getMakes } from "@/lib/api";
import type { InventoryFilters, InventoryResponse } from "@/lib/api";
import { fullUrl, seoConfig, ogImageUrl } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Inventory",
  description:
    "Browse our selection of new and used electric vehicles. Tesla, Rivian, Lucid, and more. Transparent pricing and expert guidance.",
  alternates: { canonical: fullUrl("/inventory") },
  openGraph: {
    title: "Inventory | " + seoConfig.siteName,
    description: "Browse our selection of new and used electric vehicles.",
    url: fullUrl("/inventory"),
    images: [{ url: ogImageUrl(seoConfig.defaultOgImagePath), width: 1200, height: 630, alt: seoConfig.siteName }],
  },
};

const DEFAULT_LIMIT = 12;

function searchParamsToFilters(
  searchParams: Record<string, string | string[] | undefined>
): InventoryFilters {
  const get = (k: string) => {
    const v = searchParams[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const search = get("search")?.trim();
  const make = get("make")?.trim();
  const maxPrice = get("maxPrice")?.trim();
  const minYear = get("minYear")?.trim();
  const sort = get("sort")?.trim() as InventoryFilters["sort"] | undefined;
  const pageStr = get("page")?.trim();
  const page = pageStr ? Math.max(1, parseInt(pageStr, 10)) : 1;

  const filters: InventoryFilters = {
    page,
    limit: DEFAULT_LIMIT,
  };
  if (search) filters.search = search;
  if (make) filters.make = make;
  if (maxPrice) filters.priceMax = parseInt(maxPrice, 10);
  if (minYear) filters.yearMin = parseInt(minYear, 10);
  if (sort) filters.sort = sort;
  return filters;
}

function filtersToActiveSummary(
  searchParams: Record<string, string | string[] | undefined>
): Record<string, string> {
  const get = (k: string) => {
    const v = searchParams[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const out: Record<string, string> = {};
  const search = get("search")?.trim();
  const make = get("make")?.trim();
  const maxPrice = get("maxPrice")?.trim();
  const minYear = get("minYear")?.trim();
  const sort = get("sort")?.trim();
  if (search) out.search = search;
  if (make) out.make = make;
  if (maxPrice) out.maxPrice = maxPrice;
  if (minYear) out.minYear = minYear;
  if (sort && sort !== "listed_desc") out.sort = sort;
  return out;
}

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function InventoryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = searchParamsToFilters(params);
  const activeFilters = filtersToActiveSummary(params);

  let inventory: InventoryResponse;
  try {
    inventory = await getInventory(filters);
  } catch {
    inventory = {
      vehicles: [],
      total: 0,
      page: filters.page ?? 1,
      limit: filters.limit ?? DEFAULT_LIMIT,
    };
  }
  const makes = await getMakes();

  const hasResults = inventory.vehicles.length > 0;
  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <SiteContainer>
      <Section spacing="tight">
        <InventoryHeader />
      </Section>

      <Section spacing="default">
        <Suspense fallback={<div className="evo-content-width rounded-xl border border-border bg-surface/50 p-5 evo-muted">Loading filters…</div>}>
          <InventoryToolbar makes={makes} />
        </Suspense>
      </Section>

      <Section spacing="default" className="evo-content-width">
        <InventoryResultsSummary
          total={inventory.total}
          page={inventory.page}
          limit={inventory.limit}
          activeFilters={activeFilters}
          className="mb-6"
        />
        {hasResults ? (
          <VehicleGrid vehicles={inventory.vehicles} />
        ) : (
          <InventoryEmptyState hasActiveFilters={hasActiveFilters} />
        )}
      </Section>

      <Section spacing="default">
        <InventoryCta />
      </Section>
    </SiteContainer>
  );
}
