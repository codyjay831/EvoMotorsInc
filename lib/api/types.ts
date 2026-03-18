/**
 * Typed contracts for the website-facing data model.
 * Aligned to storefront extraction behavior (dealer, inventory, leads).
 */

/** Dealer identity and config. */
export interface Dealer {
  id: string;
  slug: string;
  name: string;
  /** Optional short display name. */
  shortName?: string;
  branding?: DealerBranding;
  homepage?: DealerHomepage;
  /** Contact summary for footer/home. */
  contact?: DealerContact;
  /** Trust/highlight items for homepage. */
  trustHighlights?: DealerTrustHighlight[];
}

/** Trust/highlight item for homepage. */
export interface DealerTrustHighlight {
  title: string;
  description?: string;
  icon?: string;
}

/** Dealer contact summary for footer/home. */
export interface DealerContact {
  phone?: string;
  email?: string;
  city?: string;
  region?: string;
}

/** Dealer branding (logo, colors, tagline). */
export interface DealerBranding {
  logoUrl?: string;
  tagline?: string;
  primaryColor?: string;
}

/** Dealer homepage content (hero, featured, CTA). */
export interface DealerHomepage {
  heroHeadline?: string;
  heroSubheadline?: string;
  heroCtaText?: string;
  featuredSectionTitle?: string;
  /** Optional custom content blocks. */
  blocks?: Record<string, unknown>;
}

/** Trust/highlight item for homepage. */
export interface DealerTrustHighlight {
  title: string;
  description?: string;
  icon?: string;
}

/** Dealer contact summary for footer/home. */
export interface DealerContact {
  phone?: string;
  email?: string;
  city?: string;
  region?: string;
}


/** Vehicle summary for inventory cards and lists. */
export interface VehicleSummary {
  id: string;
  stockNumber?: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  /** Display name e.g. "2025 Tesla Model 3 Long Range". */
  displayName?: string;
  price?: number;
  /** Formatted price string for display. */
  priceDisplay?: string;
  mileage?: number;
  /** e.g. "12,500 mi". */
  mileageDisplay?: string;
  exteriorColor?: string;
  interiorColor?: string;
  imageUrl?: string;
  imageUrls?: string[];
  /** EV-specific: range in miles. */
  rangeMiles?: number;
  /** Fuel/energy type: Electric, etc. */
  fuelType?: string;
  condition?: "new" | "used" | "certified";
  vin?: string;
  /** Listed at (ISO date). */
  listedAt?: string;
}

/** Vehicle detail for VDP (full listing). */
export interface VehicleDetail extends VehicleSummary {
  description?: string;
  features?: string[];
  options?: string[];
  drivetrain?: string;
  transmission?: string;
  engine?: string;
  /** EV: battery capacity etc. */
  battery?: string;
  /** Dealer notes. */
  notes?: string;
  /** Full image set. */
  imageUrls?: string[];
  /** Last updated (ISO). */
  updatedAt?: string;
}

/** Inventory list filters (query params). */
export interface InventoryFilters {
  /** Free-text search (make, model, display name). */
  search?: string;
  make?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  condition?: "new" | "used" | "certified";
  /** EV range minimum (miles). */
  rangeMin?: number;
  sort?: "price_asc" | "price_desc" | "year_desc" | "mileage_asc" | "listed_desc";
  page?: number;
  limit?: number;
}

/** Paginated inventory response. */
export interface InventoryResponse {
  vehicles: VehicleSummary[];
  total: number;
  page: number;
  limit: number;
}

/** Generic inquiry (contact form, trade-in, etc.). */
export interface InquiryPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message?: string;
  source?: string;
  /** Optional metadata. */
  metadata?: Record<string, unknown>;
}

/** Contact page / general contact. */
export interface ContactPayload extends InquiryPayload {
  subject?: string;
}

/** Request vehicle (specific vehicle or configuration). */
export interface VehicleRequestPayload {
  vehicleId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message?: string;
  /** Desired trim/config if no vehicleId. */
  preferredTrim?: string;
  preferredContact?: "email" | "phone" | "either";
  /** Optional preferences (storefront / lead capture). */
  make?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  maxMileage?: number;
  budgetMax?: number;
  colorPreferences?: string;
  desiredFeatures?: string;
  timeline?: string;
  financingInterest?: boolean;
  tradeInInterest?: boolean;
  notes?: string;
}

/** Reserve initiation (placeholder for future reserve flow). */
export interface ReservePayload {
  vehicleId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** Optional hold duration hint (minutes). */
  holdMinutes?: number;
}

/** Reserve response shape (placeholder). */
export interface ReserveResponse {
  reservationId?: string;
  status: "pending" | "confirmed" | "expired" | "cancelled";
  expiresAt?: string;
  message?: string;
  /** For payment shell: Stripe client secret when wired. */
  clientSecret?: string;
  /** Deposit amount in cents (e.g. 50000 = $500). */
  depositAmountCents?: number;
  /** Display string for deposit (e.g. "$500"). */
  depositAmountDisplay?: string;
}
