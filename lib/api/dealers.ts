import { apiConfig, useMockData } from "./config";
import { request } from "./client";
import { mockDealer } from "./mocks/data";
import type { Dealer } from "./types";

const DEALER_PATH = `/dealers/${apiConfig.dealerSlug}`;

/**
 * Fetch dealer identity, branding, and homepage content.
 */
export async function getDealer(): Promise<Dealer> {
  if (useMockData) return Promise.resolve(mockDealer);
  return request<Dealer>(DEALER_PATH);
}
