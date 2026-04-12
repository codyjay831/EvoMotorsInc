import type { NextRequest } from "next/server";
import { apiConfig } from "@/lib/api/config";

function parseUpstreamMessage(status: number, text: string): string {
  if (!text.trim()) return `Request failed (${status})`;
  try {
    const parsed = JSON.parse(text) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      "message" in parsed &&
      typeof (parsed as { message: unknown }).message === "string"
    ) {
      return (parsed as { message: string }).message;
    }
  } catch {
    // not JSON
  }
  return text.slice(0, 500);
}

/** Supports `https://api.example.com` or `https://api.example.com/api/v1/public` (see .env.example). */
function buildPublicLeadsUrl(baseUrl: string, dealerSlug: string): string {
  const base = baseUrl.replace(/\/$/, "");
  const q = `dealerSlug=${encodeURIComponent(dealerSlug)}`;
  if (base.endsWith("/api/v1/public")) {
    return `${base}/leads?${q}`;
  }
  return `${base}/api/v1/public/leads?${q}`;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const baseUrl = apiConfig.baseUrl.trim();
  if (!baseUrl) {
    return Response.json(
      {
        ok: false,
        message:
          "Storefront API URL is not configured. Set NEXT_PUBLIC_VEHICLIX_API_URL in .env.local (see .env.example), or leave it unset in development to use mock data for leads.",
      },
      { status: 503 }
    );
  }

  const url = buildPublicLeadsUrl(baseUrl, apiConfig.dealerSlug);

  let upstream: Response;
  let text: string;
  try {
    upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    text = await upstream.text();
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Network error";
    return Response.json(
      {
        ok: false,
        message: `Could not reach the storefront API at ${url.split("?")[0]}. ${detail}`,
      },
      { status: 502 }
    );
  }

  if (!upstream.ok) {
    const message = parseUpstreamMessage(upstream.status, text);
    return Response.json({ ok: false, message }, { status: upstream.status });
  }

  return Response.json({ ok: true });
}
