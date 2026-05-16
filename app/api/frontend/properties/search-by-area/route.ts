import { NextResponse } from "next/server";

function upstreamOrigin() {
  const raw =
    process.env.ROCKY_API_ORIGIN ||
    process.env.API_ORIGIN ||
    process.env.NEXT_PUBLIC_API_ORIGIN ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:5001";
  return String(raw).trim().replace(/\/$/, "");
}

/** Proxies area search suggestions to the Rocky API (server-side avoids HTTPS→HTTP mixed content). */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() ?? "";
    const limit = searchParams.get("limit")?.trim() || "20";

    if (!q || q.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const upstream = new URL(
      `${upstreamOrigin()}/api/frontend/properties/search-by-area`,
    );
    upstream.searchParams.set("q", q);
    upstream.searchParams.set("limit", limit);

    const res = await fetch(upstream.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const text = await res.text();
    let parsed: unknown = null;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      parsed = null;
    }

    if (!res.ok) {
      const message =
        parsed &&
        typeof parsed === "object" &&
        parsed !== null &&
        "message" in parsed &&
        typeof (parsed as { message: unknown }).message === "string"
          ? (parsed as { message: string }).message
          : text || res.statusText;
      return NextResponse.json(
        typeof parsed === "object" && parsed !== null
          ? parsed
          : { message },
        { status: res.status },
      );
    }

    return NextResponse.json(parsed ?? { suggestions: [] });
  } catch (e) {
    console.error("GET /api/frontend/properties/search-by-area proxy failed:", e);
    return NextResponse.json(
      { message: "Failed to load search suggestions." },
      { status: 500 },
    );
  }
}
