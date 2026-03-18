/**
 * API and dealer configuration for the Evo Motors website.
 * All client-side env vars must be prefixed with NEXT_PUBLIC_.
 *
 * Expected env vars:
 * - NEXT_PUBLIC_VEHICLIX_API_URL – Base URL for the Vehiclix storefront API (e.g. https://api.vehiclix.com).
 *   If unset, the client uses mock data so the site remains buildable.
 * - NEXT_PUBLIC_DEALER_SLUG – Dealer identifier for API paths (e.g. evo-motors).
 *   Optional; some APIs use a single tenant or header instead.
 * - Auth bridge URLs – see lib/auth-bridge.ts and .env.example.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_VEHICLIX_API_URL ?? "";
const DEALER_SLUG = process.env.NEXT_PUBLIC_DEALER_SLUG ?? "evo-motors";

/** Use mock data when no API URL is configured (development / preview). */
export const useMockData = !API_BASE_URL;

export const apiConfig = {
  baseUrl: API_BASE_URL,
  dealerSlug: DEALER_SLUG,
  /** Default request timeout in ms. */
  timeoutMs: 15_000,
} as const;
