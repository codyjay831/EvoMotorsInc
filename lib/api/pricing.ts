import type { VehicleSummary } from "./types";

/**
 * Resolves the display text for a vehicle's price based on its pricingMode.
 * 
 * @param vehicle The vehicle summary or detail.
 * @returns The resolved display string.
 */
export function getPriceDisplay(vehicle: Pick<VehicleSummary, "pricingMode" | "priceDisplay">): string {
  const mode = vehicle.pricingMode ?? "LIST_PRICE";
  const display = vehicle.priceDisplay;

  switch (mode) {
    case "PRICE_ON_REQUEST":
      return "Price on request";
    case "CALL_FOR_PRICE":
      return "Call for price";
    case "HIDE_PRICE":
      return ""; // Component should handle hiding if empty
    case "LIST_PRICE":
    default:
      return display ?? "Price on request"; // Fallback for missing list price
  }
}
