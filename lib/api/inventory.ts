import { apiConfig, useMockData } from "./config";
import { request } from "./client";
import { mockVehiclesSummary } from "./mocks/data";
import type {
  VehicleSummary,
  VehicleDetail,
  InventoryFilters,
  InventoryResponse,
} from "./types";

const DEALER = apiConfig.dealerSlug;
const BASE = `/dealers/${DEALER}`;

/**
 * Featured / hero vehicles for homepage.
 * Uses the public catalog (newest items); no dedicated /featured API in Vehiclix.
 */
export async function getFeaturedVehicles(limit = 4): Promise<VehicleSummary[]> {
  if (useMockData) {
    return Promise.resolve(mockVehiclesSummary.slice(0, limit));
  }
  const catalogLimit = Math.max(6, limit);
  const raw = await request<unknown>("/api/v1/public/catalog", {
    params: {
      dealerSlug: apiConfig.dealerSlug,
      page: 1,
      limit: catalogLimit,
    },
  });
  const inv = mapVehiclixCatalogToInventoryResponse(raw, 1, catalogLimit);
  return inv.vehicles.slice(0, limit);
}

/**
 * Paginated inventory with optional filters.
 */
export async function getInventory(
  filters: InventoryFilters = {}
): Promise<InventoryResponse> {
  if (useMockData) {
    let list = [...mockVehiclesSummary];
    if (filters.search?.trim()) {
      const q = filters.search.trim().toLowerCase();
      list = list.filter(
        (v) =>
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          (v.displayName?.toLowerCase().includes(q) ?? false)
      );
    }
    if (filters.make) {
      list = list.filter((v) => v.make.toLowerCase() === filters.make!.toLowerCase());
    }
    if (filters.condition) {
      list = list.filter((v) => v.condition === filters.condition);
    }
    if (filters.yearMin != null) {
      list = list.filter((v) => v.year >= filters.yearMin!);
    }
    if (filters.yearMax != null) {
      list = list.filter((v) => v.year <= filters.yearMax!);
    }
    if (filters.priceMin != null) {
      list = list.filter((v) => (v.price ?? 0) >= filters.priceMin!);
    }
    if (filters.priceMax != null) {
      list = list.filter((v) => (v.price ?? 0) <= filters.priceMax!);
    }
    const sort = filters.sort ?? "listed_desc";
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price_asc":
          return (a.price ?? 0) - (b.price ?? 0);
        case "price_desc":
          return (b.price ?? 0) - (a.price ?? 0);
        case "year_desc":
          return b.year - a.year;
        case "mileage_asc":
          return (a.mileage ?? 0) - (b.mileage ?? 0);
        case "listed_desc":
        default:
          return (b.listedAt ?? "").localeCompare(a.listedAt ?? "");
      }
    });
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 12;
    const start = (page - 1) * limit;
    const vehicles = list.slice(start, start + limit);
    return {
      vehicles,
      total: list.length,
      page,
      limit,
    };
  }
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 12;
  const params: Record<string, string | number | undefined> = {
    dealerSlug: apiConfig.dealerSlug,
    page,
    limit,
    ...(filters.search && { search: filters.search }),
    ...(filters.make && { make: filters.make }),
    ...(filters.yearMin != null && { minYear: filters.yearMin }),
    ...(filters.priceMax != null && { maxPrice: filters.priceMax }),
    ...(filters.sort && { sort: filters.sort }),
  };
  const raw = await request<unknown>("/api/v1/public/catalog", { params });
  return mapVehiclixCatalogToInventoryResponse(raw, page, limit);
}

function asRecordInv(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
}

function mapCatalogItemToVehicleSummary(raw: unknown): VehicleSummary | null {
  const v = asRecordInv(raw);
  if (!v) return null;
  const id = v.id ?? v.vehicleId;
  if (id == null || id === "") return null;
  const year = Number(v.year ?? v.modelYear);
  if (!Number.isFinite(year)) return null;
  const make = String(v.make ?? "");
  const model = String(v.model ?? "");
  if (!make || !model) return null;

  const price =
    typeof v.price === "number"
      ? v.price
      : v.price != null
        ? Number(v.price)
        : undefined;
  const isFinitePrice = price !== undefined && Number.isFinite(price);

  const priceDisplay =
    typeof v.priceDisplay === "string"
      ? v.priceDisplay
      : isFinitePrice
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(price!)
        : undefined;

  const mileage =
    typeof v.mileage === "number"
      ? v.mileage
      : v.mileage != null
        ? Number(v.mileage)
        : undefined;

  const imageUrls = Array.isArray(v.imageUrls)
    ? v.imageUrls.filter((u): u is string => typeof u === "string")
    : undefined;
  const firstImage =
    typeof v.imageUrl === "string"
      ? v.imageUrl
      : typeof v.primaryImageUrl === "string"
        ? v.primaryImageUrl
        : typeof v.heroImage === "string"
          ? v.heroImage
          : imageUrls?.[0];

  const conditionRaw = v.condition;
  const condition =
    conditionRaw === "new" || conditionRaw === "used" || conditionRaw === "certified"
      ? conditionRaw
      : undefined;

  return {
    id: String(id),
    stockNumber: typeof v.stockNumber === "string" ? v.stockNumber : undefined,
    year,
    make,
    model,
    trim: typeof v.trim === "string" ? v.trim : undefined,
    displayName: typeof v.displayName === "string" ? v.displayName : undefined,
    price: isFinitePrice ? price : undefined,
    priceDisplay,
    mileage: mileage !== undefined && Number.isFinite(mileage) ? mileage : undefined,
    mileageDisplay: typeof v.mileageDisplay === "string" ? v.mileageDisplay : undefined,
    exteriorColor: typeof v.exteriorColor === "string" ? v.exteriorColor : undefined,
    interiorColor: typeof v.interiorColor === "string" ? v.interiorColor : undefined,
    imageUrl: firstImage,
    imageUrls,
    rangeMiles:
      v.rangeMiles != null && Number.isFinite(Number(v.rangeMiles)) ? Number(v.rangeMiles) : undefined,
    fuelType: typeof v.fuelType === "string" ? v.fuelType : undefined,
    pricingMode:
      typeof v.pricingMode === "string"
        ? (v.pricingMode as VehicleSummary["pricingMode"])
        : undefined,
    condition,
    vin: typeof v.vin === "string" ? v.vin : undefined,
    listedAt: typeof v.listedAt === "string" ? v.listedAt : undefined,
  };
}

function mapCatalogItemToVehicleDetail(raw: unknown): VehicleDetail | null {
  const summary = mapCatalogItemToVehicleSummary(raw);
  if (!summary) return null;
  const v = asRecordInv(raw);
  if (!v) return summary;

  const stringArray = (x: unknown): string[] | undefined =>
    Array.isArray(x) ? x.filter((i): i is string => typeof i === "string") : undefined;

  return {
    ...summary,
    description: typeof v.description === "string" ? v.description : undefined,
    features: stringArray(v.features),
    options: stringArray(v.options),
    drivetrain: typeof v.drivetrain === "string" ? v.drivetrain : undefined,
    transmission: typeof v.transmission === "string" ? v.transmission : undefined,
    engine: typeof v.engine === "string" ? v.engine : undefined,
    battery: typeof v.battery === "string" ? v.battery : undefined,
    notes: typeof v.notes === "string" ? v.notes : undefined,
    updatedAt: typeof v.updatedAt === "string" ? v.updatedAt : undefined,
  };
}

function mapVehiclixCatalogToInventoryResponse(
  raw: unknown,
  fallbackPage: number,
  fallbackLimit: number
): InventoryResponse {
  const top = asRecordInv(raw);
  const data = top?.data;
  const inner = asRecordInv(data) ?? top;

  let items: unknown[] = [];
  if (Array.isArray(raw)) items = raw;
  else if (inner && Array.isArray(inner.vehicles)) items = inner.vehicles;
  else if (inner && Array.isArray(inner.items)) items = inner.items;
  else if (inner && Array.isArray(inner.results)) items = inner.results;
  else if (inner && Array.isArray(inner.catalog)) items = inner.catalog;

  const total = Number(
    inner?.total ?? inner?.totalCount ?? inner?.count ?? top?.total ?? items.length
  );
  const page = Number(inner?.page ?? inner?.currentPage ?? top?.page ?? fallbackPage);
  const limit = Number(inner?.limit ?? inner?.pageSize ?? top?.limit ?? fallbackLimit);

  const vehicles = items
    .map(mapCatalogItemToVehicleSummary)
    .filter((x): x is VehicleSummary => x != null);

  return {
    vehicles,
    total: Number.isFinite(total) ? total : vehicles.length,
    page: Number.isFinite(page) ? page : fallbackPage,
    limit: Number.isFinite(limit) ? limit : fallbackLimit,
  };
}

/**
 * Distinct makes for filter dropdown (mock: derived from inventory).
 */
export async function getMakes(): Promise<string[]> {
  if (useMockData) {
    const makes = [...new Set(mockVehiclesSummary.map((v) => v.make))];
    return Promise.resolve(makes.sort());
  }
  try {
    const res = await request<{ makes: string[] }>(`${BASE}/inventory/makes`);
    return res.makes ?? [];
  } catch {
    return [];
  }
}

/**
 * Single vehicle detail by id (for VDP).
 * Uses the public catalog API (same contract as the inventory list), filtered by id.
 */
export async function getVehicle(id: string): Promise<VehicleDetail | null> {
  if (useMockData) {
    void id;
    return Promise.resolve(null);
  }
  const trimmed = id.trim();
  if (!trimmed) return null;
  try {
    const raw = await request<unknown>("/api/v1/public/catalog", {
      params: {
        dealerSlug: apiConfig.dealerSlug,
        id: trimmed,
      },
    });
    const top = asRecordInv(raw);
    const data = top?.data;
    const inner = asRecordInv(data) ?? top;
    let items: unknown[] = [];
    if (Array.isArray(raw)) items = raw;
    else if (inner && Array.isArray(inner.vehicles)) items = inner.vehicles;
    else if (inner && Array.isArray(inner.items)) items = inner.items;
    else if (inner && Array.isArray(inner.results)) items = inner.results;
    else if (inner && Array.isArray(inner.catalog)) items = inner.catalog;
    const first = items[0];
    return mapCatalogItemToVehicleDetail(first);
  } catch {
    return null;
  }
}
