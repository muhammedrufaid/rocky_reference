import { NextResponse } from "next/server";

function upstreamOrigin() {
  const raw =
    process.env.ROCKY_API_ORIGIN ||
    process.env.API_ORIGIN ||
    process.env.NEXT_PUBLIC_API_ORIGIN ||
    "http://localhost:5001";
  return String(raw).trim().replace(/\/$/, "");
}

/** Path on upstream origin (e.g. `/api/sell`). Override if backend exposes a different path. */
function upstreamSellPath() {
  const fromEnv = process.env.ROCKY_API_SELL_PATH?.trim();
  if (fromEnv)
    return fromEnv.startsWith("/") ? fromEnv : `/${fromEnv}`;
  return "/api/sell";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(`${upstreamOrigin()}${upstreamSellPath()}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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

    return NextResponse.json(parsed ?? { ok: true });
  } catch (e) {
    console.error("POST /api/sell proxy failed:", e);
    return NextResponse.json(
      { message: "Unexpected error forwarding enquiry." },
      { status: 500 },
    );
  }
}
