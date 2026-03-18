import { apiConfig } from "./config";
import { ApiError } from "./errors";

type RequestOptions = RequestInit & {
  timeoutMs?: number;
  params?: Record<string, string | number | undefined>;
};

function buildUrl(path: string, params?: Record<string, string | number | undefined>): string {
  const base = apiConfig.baseUrl.replace(/\/$/, "");
  const pathNorm = path.startsWith("/") ? path : `/${path}`;
  let url = `${base}${pathNorm}`;
  if (params && Object.keys(params).length > 0) {
    const search = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== "") search.set(k, String(v));
    }
    const q = search.toString();
    if (q) url += `?${q}`;
  }
  return url;
}

/**
 * Fetch with timeout and consistent error handling.
 * Throws ApiError on non-2xx or timeout.
 */
export async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { timeoutMs = apiConfig.timeoutMs, params, ...init } = options;
  const url = buildUrl(path, params);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
    });
    clearTimeout(timeoutId);

    const text = await res.text();
    let data: unknown;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!res.ok) {
      throw new ApiError(
        (data && typeof data === "object" && "message" in data && typeof (data as { message: unknown }).message === "string")
          ? (data as { message: string }).message
          : `API error: ${res.status}`,
        res.status,
        (data && typeof data === "object" && "code" in data && typeof (data as { code: unknown }).code === "string")
          ? (data as { code: string }).code
          : undefined,
        data
      );
    }

    return data as T;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof ApiError) throw err;
    if (err instanceof Error) {
      if (err.name === "AbortError") {
        throw new ApiError("Request timeout", 408);
      }
      throw new ApiError(err.message);
    }
    throw new ApiError(String(err));
  }
}

export const api = { request };
