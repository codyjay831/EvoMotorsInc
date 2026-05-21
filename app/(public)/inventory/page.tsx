import type { Metadata } from "next";
import { Suspense } from "react";
import { Section, SiteContainer } from "@/components/layout";
import {
  InventoryHero,
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
const DEFAULT_SORT: InventoryFilters["sort"] = "listed_desc";

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
  if (search) out.search = search;
  if (make) out.make = make;
  if (maxPrice) out.maxPrice = maxPrice;
  if (minYear) out.minYear = minYear;
  return out;
}

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function InventoryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = searchParamsToFilters(params);
  const activeFilters = filtersToActiveSummary(params);
  const currentSort = (Array.isArray(params.sort) ? params.sort[0] : params.sort) ?? DEFAULT_SORT;
  const fallbackInventory: InventoryResponse = {
    vehicles: [],
    total: 0,
    page: filters.page ?? 1,
    limit: filters.limit ?? DEFAULT_LIMIT,
  };
  const [inventory, makes] = await Promise.all([
    getInventory(filters).catch(() => fallbackInventory),
    getMakes(),
  ]);

  const hasResults = inventory.vehicles.length > 0;
  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <SiteContainer className="pb-10 sm:pb-12 lg:pb-16">
      <Section spacing="tight" className="pb-6 sm:pb-8 lg:pb-10">
        <InventoryHero />
      </Section>

      <Section spacing="tight" className="pt-0 sm:pt-0 lg:pt-0">
        <div className="evo-content-width space-y-6 sm:space-y-8">
          <InventoryHeader />
          <Suspense fallback={<InventoryToolbarSkeleton />}>
            <InventoryToolbar makes={makes} />
          </Suspense>
          <InventoryResultsSummary
            total={inventory.total}
            page={inventory.page}
            limit={inventory.limit}
            activeFilters={activeFilters}
            currentSort={currentSort}
            searchParams={params}
          />
          {hasResults ? (
            <VehicleGrid vehicles={inventory.vehicles} />
          ) : (
            <InventoryEmptyState hasActiveFilters={hasActiveFilters} />
          )}
        </div>
      </Section>

      <Section spacing="tight" className="pt-10 sm:pt-12 lg:pt-14">
        <InventoryCta />
      </Section>
    </SiteContainer>
  );
}

function InventoryToolbarSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface/50 p-4 sm:p-5" aria-hidden>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-3 w-20 animate-pulse rounded bg-muted/70" />
            <div className="h-10 w-full animate-pulse rounded-lg bg-muted/60" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <div className="h-9 w-28 animate-pulse rounded-lg bg-muted/60" />
      </div>
    </div>
  );
}
