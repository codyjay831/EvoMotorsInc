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
import { isInventorySimpleMode } from "@/lib/inventory-ui-config";
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

  const inventory = await getInventory(filters).catch(() => fallbackInventory);
  const simpleMode = isInventorySimpleMode(inventory.total);
  const makes = simpleMode ? [] : await getMakes();

  const hasResults = inventory.vehicles.length > 0;
  const hasActiveFilters = Object.keys(activeFilters).length > 0;
  const showBottomCta = !(simpleMode && !hasResults);

  return (
    <SiteContainer className="pb-9 sm:pb-11 lg:pb-14">
      <Section spacing="tight" className="pt-8 sm:pt-10">
        <div className="space-y-8 sm:space-y-10">
          <InventoryHero
            simpleMode={simpleMode}
            hasResults={hasResults}
            hasActiveFilters={hasActiveFilters}
            vehicleCount={inventory.total}
          />

          {!simpleMode && (
            <div className="evo-content-width space-y-5 sm:space-y-6">
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
            </div>
          )}

          {hasResults ? (
            <div className="evo-content-width space-y-6">
              {simpleMode && (
                <p
                  className="text-center text-sm font-medium tracking-tight text-muted-foreground"
                  id="available-evs"
                >
                  Available now
                </p>
              )}
              <div id={simpleMode ? undefined : "available-evs"}>
                <VehicleGrid vehicles={inventory.vehicles} compact={simpleMode} />
              </div>
            </div>
          ) : (
            !simpleMode && (
              <InventoryEmptyState hasActiveFilters={hasActiveFilters} />
            )
          )}

          {showBottomCta && (
            <div className="evo-content-width">
              <InventoryCta />
            </div>
          )}
        </div>
      </Section>
    </SiteContainer>
  );
}

function InventoryToolbarSkeleton() {
  return (
    <div className="rounded-2xl border border-border/70 bg-surface/40 p-4 sm:p-5 lg:p-6" aria-hidden>
      <div className="space-y-3">
        <div className="h-3 w-28 animate-pulse rounded bg-muted/70" />
        <div className="h-11 w-full animate-pulse rounded-xl bg-muted/60" />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-3 w-20 animate-pulse rounded bg-muted/70" />
            <div className="h-10 w-full animate-pulse rounded-xl bg-muted/60" />
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-start sm:justify-end">
        <div className="h-10 w-32 animate-pulse rounded-xl bg-muted/60" />
      </div>
    </div>
  );
}
