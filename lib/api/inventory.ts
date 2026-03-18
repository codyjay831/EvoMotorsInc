import { apiConfig, useMockData } from "./config";
import { request } from "./client";
import {
  mockVehiclesSummary,
  mockVehicleDetail,
} from "./mocks/data";
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
 */
export async function getFeaturedVehicles(limit = 4): Promise<VehicleSummary[]> {
  if (useMockData) {
    return Promise.resolve(mockVehiclesSummary.slice(0, limit));
  }
  const res = await request<{ vehicles: VehicleSummary[] }>(
    `${BASE}/featured`,
    { params: { limit } }
  );
  return res.vehicles ?? [];
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
  const params: Record<string, string | number | undefined> = {
    page: filters.page ?? 1,
    limit: filters.limit ?? 12,
    ...(filters.search && { search: filters.search }),
    ...(filters.make && { make: filters.make }),
    ...(filters.model && { model: filters.model }),
    ...(filters.yearMin != null && { yearMin: filters.yearMin }),
    ...(filters.yearMax != null && { yearMax: filters.yearMax }),
    ...(filters.priceMin != null && { priceMin: filters.priceMin }),
    ...(filters.priceMax != null && { priceMax: filters.priceMax }),
    ...(filters.condition && { condition: filters.condition }),
    ...(filters.rangeMin != null && { rangeMin: filters.rangeMin }),
    ...(filters.sort && { sort: filters.sort }),
  };
  return request<InventoryResponse>(`${BASE}/inventory`, { params });
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
 */
export async function getVehicle(id: string): Promise<VehicleDetail | null> {
  if (useMockData) {
    if (id === mockVehicleDetail.id) return Promise.resolve(mockVehicleDetail);
    const found = mockVehiclesSummary.find((v) => v.id === id);
    return found ? Promise.resolve({ ...found } as VehicleDetail) : Promise.resolve(null);
  }
  try {
    return await request<VehicleDetail>(`${BASE}/inventory/${id}`);
  } catch {
    return null;
  }
}
