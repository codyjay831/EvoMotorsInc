import { toNumberOrUndefined } from "@/lib/utils/numbers";
import { useMockData } from "./config";
import { ApiError } from "./errors";
import type {
  InquiryPayload,
  ContactPayload,
  VehicleRequestPayload,
  ReservePayload,
  ReserveResponse,
} from "./types";

async function postLocalLead(
  body: Record<string, unknown>
): Promise<{ ok: boolean; message?: string; status: number }> {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let data: { ok?: boolean; message?: string } = {};
  try {
    data = (await res.json()) as { ok?: boolean; message?: string };
  } catch {
    data = {};
  }
  if (!res.ok) {
    return {
      ok: false,
      message: data.message ?? `Request failed (${res.status})`,
      status: res.status,
    };
  }
  return { ok: data.ok !== false, message: data.message, status: res.status };
}

/**
 * Submit a general inquiry.
 */
export async function submitInquiry(payload: InquiryPayload): Promise<{ ok: boolean; message?: string }> {
  if (useMockData) {
    return Promise.resolve({ ok: true, message: "Thank you. We'll be in touch." });
  }
  const out = await postLocalLead({
    type: "inquiry",
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone,
    message: payload.message,
    source: payload.source,
    metadata: payload.metadata,
  });
  return { ok: out.ok, message: out.message };
}

/**
 * Submit contact form (general contact).
 */
export async function submitContact(payload: ContactPayload): Promise<{ ok: boolean; message?: string }> {
  if (useMockData) {
    return Promise.resolve({ ok: true, message: "Message received." });
  }
  const out = await postLocalLead({
    type: "contact",
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone,
    message: payload.message,
    subject: payload.subject,
    source: "contact-page",
  });
  return { ok: out.ok, message: out.message };
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
  const {
    yearMin,
    yearMax,
    maxMileage,
    budgetMax,
    ...rest
  } = payload;
  const body: Record<string, unknown> = {
    type: "vehicle_request",
    ...rest,
  };
  const yMin = toNumberOrUndefined(yearMin);
  const yMax = toNumberOrUndefined(yearMax);
  const mileage = toNumberOrUndefined(maxMileage);
  const budget = toNumberOrUndefined(budgetMax);
  if (yMin !== undefined) body.yearMin = yMin;
  if (yMax !== undefined) body.yearMax = yMax;
  if (mileage !== undefined) body.maxMileage = mileage;
  if (budget !== undefined) body.budgetMax = budget;
  const out = await postLocalLead(body);
  return { ok: out.ok, message: out.message };
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
  const hold = toNumberOrUndefined(payload.holdMinutes);
  const res = await postLocalLead({
    type: "inquiry",
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone,
    message: "Vehicle reservation request",
    vehicleId: payload.vehicleId,
    ...(hold !== undefined ? { holdMinutes: hold } : {}),
    source: "reserve-flow",
  });
  if (!res.ok) {
    throw new ApiError(res.message ?? "Request failed", res.status);
  }
  return {
    status: "pending",
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    message: "Reservation request received. We'll contact you shortly to confirm.",
    depositAmountDisplay: "$500",
    depositAmountCents: 50000,
  };
}
