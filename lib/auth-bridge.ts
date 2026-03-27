/**
 * Auth bridge: routes users from the Evo Motors website to Vehiclix auth and app.
 * This project does NOT own authentication; Vehiclix owns login, sessions, and portal.
 *
 * Expected env vars (all optional; defaults allow the site to build and run):
 * - NEXT_PUBLIC_VEHICLIX_APP_URL – Base URL for Vehiclix app (e.g. https://app.evomotorsinc.com).
 *   Used for login, register, portal, and app when specific URLs are not set.
 * - NEXT_PUBLIC_VEHICLIX_LOGIN_URL – Override for login page (default: APP_URL + "/login").
 * - NEXT_PUBLIC_VEHICLIX_REGISTER_URL – Override for registration (default: APP_URL + "/register").
 * - NEXT_PUBLIC_VEHICLIX_PORTAL_URL – Override for customer portal (default: APP_URL + "/portal").
 * - NEXT_PUBLIC_LOGIN_APP_URL – Legacy; used as APP_URL if NEXT_PUBLIC_VEHICLIX_APP_URL is unset.
 * - NEXT_PUBLIC_DEALER_SLUG – Dealer identifier; can be appended to bridge URLs for context.
 */

const APP_BASE =
  process.env.NEXT_PUBLIC_VEHICLIX_APP_URL ??
  process.env.NEXT_PUBLIC_LOGIN_APP_URL ??
  "https://app.evomotorsinc.com";

const LOGIN_URL =
  process.env.NEXT_PUBLIC_VEHICLIX_LOGIN_URL ?? `${APP_BASE}/login`;
const REGISTER_URL =
  process.env.NEXT_PUBLIC_VEHICLIX_REGISTER_URL ?? `${APP_BASE}/register`;
const PORTAL_URL =
  process.env.NEXT_PUBLIC_VEHICLIX_PORTAL_URL ?? `${APP_BASE}/portal`;
const APP_URL = process.env.NEXT_PUBLIC_VEHICLIX_APP_URL ?? APP_BASE;

const DEALER_SLUG =
  process.env.NEXT_PUBLIC_DEALER_SLUG ?? "evo-motors";

export const authBridgeConfig = {
  loginUrl: LOGIN_URL,
  registerUrl: REGISTER_URL,
  portalUrl: PORTAL_URL,
  appUrl: APP_URL,
  dealerSlug: DEALER_SLUG,
} as const;

export type AuthBridgeParams = {
  /** Dealer/site context for future deep linking. */
  dealerSlug?: string | null;
  /** Where to send the user after auth (e.g. current page). */
  returnTo?: string | null;
  /** Source context, e.g. "website". */
  source?: string | null;
};

function appendParams(url: string, params: AuthBridgeParams | undefined): string {
  if (!params?.dealerSlug && !params?.returnTo && !params?.source) return url;
  const u = new URL(url);
  if (params.dealerSlug) u.searchParams.set("dealer", params.dealerSlug);
  if (params.returnTo) u.searchParams.set("returnTo", params.returnTo);
  if (params.source) u.searchParams.set("source", params.source);
  return u.toString();
}

/**
 * Build URL to Vehiclix login. Use for "Login" and "Dealer Login" CTAs.
 */
export function buildLoginUrl(params?: AuthBridgeParams): string {
  return appendParams(LOGIN_URL, {
    dealerSlug: params?.dealerSlug ?? DEALER_SLUG,
    returnTo: params?.returnTo,
    source: params?.source ?? "website",
  });
}

/**
 * Build URL to Vehiclix registration. Use for "Create account" / "Register" CTAs.
 */
export function buildRegisterUrl(params?: AuthBridgeParams): string {
  return appendParams(REGISTER_URL, {
    dealerSlug: params?.dealerSlug ?? DEALER_SLUG,
    returnTo: params?.returnTo,
    source: params?.source ?? "website",
  });
}

/**
 * Build URL to customer portal (secure account area). Use for "Customer Portal" / "Secure account" CTAs.
 */
export function buildPortalUrl(params?: AuthBridgeParams): string {
  return appendParams(PORTAL_URL, {
    dealerSlug: params?.dealerSlug ?? DEALER_SLUG,
    returnTo: params?.returnTo,
    source: params?.source ?? "website",
  });
}

/**
 * Build URL to Vehiclix app (admin/dealer app). Use for "Dealer Login" or app entry.
 */
export function buildAppUrl(params?: AuthBridgeParams): string {
  return appendParams(APP_URL, {
    dealerSlug: params?.dealerSlug ?? DEALER_SLUG,
    returnTo: params?.returnTo,
    source: params?.source ?? "website",
  });
}
