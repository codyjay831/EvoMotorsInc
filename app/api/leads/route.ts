import type { NextRequest } from "next/server";

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
  const API_BASE = process.env.NEXT_PUBLIC_VEHICLIX_API_URL;
  const DEALER_SLUG = process.env.NEXT_PUBLIC_DEALER_SLUG || "evo-motors";

  if (!API_BASE?.trim()) {
    return Response.json(
      { ok: false, message: "Lead service is not configured." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const base = API_BASE.replace(/\/$/, "");
  const url = `${base}/api/v1/public/leads?dealerSlug=${encodeURIComponent(DEALER_SLUG)}`;

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
