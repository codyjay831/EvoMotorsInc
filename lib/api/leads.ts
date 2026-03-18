import { apiConfig, useMockData } from "./config";
import { request } from "./client";
import type {
  InquiryPayload,
  ContactPayload,
  VehicleRequestPayload,
  ReservePayload,
  ReserveResponse,
} from "./types";

const DEALER = apiConfig.dealerSlug;
const BASE = `/dealers/${DEALER}`;

/**
 * Submit a general inquiry.
 */
export async function submitInquiry(payload: InquiryPayload): Promise<{ ok: boolean; message?: string }> {
  if (useMockData) {
    return Promise.resolve({ ok: true, message: "Thank you. We'll be in touch." });
  }
  return request(`${BASE}/inquiry`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Submit contact form (general contact).
 */
export async function submitContact(payload: ContactPayload): Promise<{ ok: boolean; message?: string }> {
  if (useMockData) {
    return Promise.resolve({ ok: true, message: "Message received." });
  }
  return request(`${BASE}/contact`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Request a specific vehicle or configuration.
 */
export async function submitVehicleRequest(
  payload: VehicleRequestPayload
): Promise<{ ok: boolean; message?: string }> {
  if (useMockData) {
    return Promise.resolve({ ok: true, message: "Request submitted." });
  }
  return request(`${BASE}/request-vehicle`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Initiate a reservation (placeholder for reserve flow).
 */
export async function initiateReservation(
  payload: ReservePayload
): Promise<ReserveResponse> {
  if (useMockData) {
    return Promise.resolve({
      reservationId: "mock-res-1",
      status: "pending",
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      message: "Reservation held. We'll contact you shortly to confirm.",
      depositAmountDisplay: "$500",
      depositAmountCents: 50000,
    });
  }
  return request<ReserveResponse>(`${BASE}/reserve`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
