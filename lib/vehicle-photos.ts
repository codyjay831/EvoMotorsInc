import { fullUrl } from "@/lib/seo-config";

const PLACEHOLDER_VALUES = new Set([
  "",
  "#",
  "-",
  "n/a",
  "na",
  "none",
  "null",
  "undefined",
  "about:blank",
]);

export type VehiclePhotoSource = {
  imageUrl?: string;
  imageUrls?: string[];
};

/** Trim, reject placeholders, and accept http(s), protocol-relative, or site-relative paths. */
export function normalizePhotoUrl(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  if (PLACEHOLDER_VALUES.has(trimmed.toLowerCase())) return undefined;

  const lower = trimmed.toLowerCase();
  if (lower.startsWith("javascript:") || lower.startsWith("data:")) return undefined;
  if (/^https?:\/\/?$/i.test(trimmed)) return undefined;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      new URL(trimmed);
      return trimmed;
    } catch {
      return undefined;
    }
  }

  if (trimmed.startsWith("//")) {
    try {
      new URL(`https:${trimmed}`);
      return trimmed;
    } catch {
      return undefined;
    }
  }

  if (trimmed.startsWith("/")) return trimmed;

  return `/${trimmed}`;
}

export function dedupePreserveOrder(urls: ReadonlyArray<string>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const url of urls) {
    const key = url.trim();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(url);
  }
  return out;
}

/** Hero first, then gallery arrays, preserving order and dropping invalid entries. */
export function collectVehiclePhotoUrls(source: VehiclePhotoSource): string[] {
  const candidates: string[] = [];

  const hero = normalizePhotoUrl(source.imageUrl);
  if (hero) candidates.push(hero);

  if (source.imageUrls?.length) {
    for (const raw of source.imageUrls) {
      const normalized = normalizePhotoUrl(raw);
      if (normalized) candidates.push(normalized);
    }
  }

  return dedupePreserveOrder(candidates);
}

export function getPrimaryVehiclePhoto(source: VehiclePhotoSource): string | undefined {
  return collectVehiclePhotoUrls(source)[0];
}

export function toAbsoluteVehiclePhotoUrl(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("//")) return `https:${src}`;
  return fullUrl(src.startsWith("/") ? src : `/${src}`);
}
