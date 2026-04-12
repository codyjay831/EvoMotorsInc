/**
 * API and dealer configuration for the Evo Motors website.
 * All client-side env vars must be prefixed with NEXT_PUBLIC_.
 *
 * Expected env vars:
 * - NEXT_PUBLIC_VEHICLIX_API_URL – Base URL for the Vehiclix storefront API (e.g. https://api.vehiclix.app).
 *   Required in production. If unset, mock data is only allowed in non-production modes.
 * - NEXT_PUBLIC_DEALER_SLUG – Dealer identifier for API paths (e.g. evo-motors).
 *   Required in production.
 * - Auth bridge URLs – see lib/auth-bridge.ts and .env.example.
 */

const isProduction = process.env.NODE_ENV === "production";

function isDisallowedProductionHost(value: string): boolean {
  try {
    const { hostname } = new URL(value);
    const normalized = hostname.toLowerCase();
    return (
      normalized === "localhost" ||
      normalized === "127.0.0.1" ||
      normalized === "0.0.0.0" ||
      normalized === "::1" ||
      normalized.endsWith(".local") ||
      normalized.includes("ngrok") ||
      normalized.includes("tunnel")
    );
  } catch {
    return true;
  }
}

function resolveApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_VEHICLIX_API_URL?.trim() ?? "";
  if (!raw) {
    if (isProduction) {
      throw new Error(
        "Missing NEXT_PUBLIC_VEHICLIX_API_URL in production. Set it to the live Vehiclix API origin."
      );
    }
    return "";
  }
  if (isProduction && isDisallowedProductionHost(raw)) {
    throw new Error(
      `Invalid NEXT_PUBLIC_VEHICLIX_API_URL in production (${raw}). Local/dev tunnel hosts are not allowed.`
    );
  }
  return raw;
}

function resolveDealerSlug(): string {
  const raw = process.env.NEXT_PUBLIC_DEALER_SLUG?.trim() ?? "";
  if (!raw) {
    if (isProduction) {
      throw new Error(
        "Missing NEXT_PUBLIC_DEALER_SLUG in production. Set it to the live dealer slug."
      );
    }
    return "evo-motors";
  }
  return raw;
}

const API_BASE_URL = resolveApiBaseUrl();
const DEALER_SLUG = resolveDealerSlug();

/** Use mock data only outside production when API URL is intentionally unset. */
export const useMockData = !API_BASE_URL && !isProduction;

export const apiConfig = {
  baseUrl: API_BASE_URL,
  dealerSlug: DEALER_SLUG,
  /** Default request timeout in ms. */
  timeoutMs: 15_000,
} as const;
