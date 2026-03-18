/**
 * Evo Motors website API layer.
 * Use getDealer, getInventory, getVehicle, getFeaturedVehicles for pages.
 * Use submit* and initiateReservation for forms.
 */

export { apiConfig, useMockData } from "./config";
export type {
  Dealer,
  DealerBranding,
  DealerHomepage,
  DealerTrustHighlight,
  DealerContact,
  VehicleSummary,
  VehicleDetail,
  InventoryFilters,
  InventoryResponse,
  InquiryPayload,
  ContactPayload,
  VehicleRequestPayload,
  ReservePayload,
  ReserveResponse,
} from "./types";
export { ApiError, isApiError, toApiError } from "./errors";
export { request, api } from "./client";
export { getDealer } from "./dealers";
export {
  getFeaturedVehicles,
  getInventory,
  getVehicle,
  getMakes,
} from "./inventory";
export {
  submitInquiry,
  submitContact,
  submitVehicleRequest,
  initiateReservation,
} from "./leads";
