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

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const base = apiConfig.baseUrl.replace(/\/$/, "");
  const url = `${base}/api/v1/public/leads?dealerSlug=${encodeURIComponent(apiConfig.dealerSlug)}`;

  const upstream = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await upstream.text();
  if (!upstream.ok) {
    const message = parseUpstreamMessage(upstream.status, text);
    return Response.json({ ok: false, message }, { status: upstream.status });
  }

  return Response.json({ ok: true });
}
