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

function upstreamCareerPath() {
  const fromEnv = process.env.ROCKY_API_CAREER_PATH?.trim();
  if (fromEnv) return fromEnv.startsWith("/") ? fromEnv : `/${fromEnv}`;
  return "/api/career";
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const fullName = String(form.get("fullName") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const position = String(form.get("position") ?? "").trim();
    const cv = form.get("cv");

    if (!fullName || !email || !phone || !position) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    if (!(cv instanceof File)) {
      return NextResponse.json({ message: "CV upload is required." }, { status: 400 });
    }

    const upstreamForm = new FormData();
    upstreamForm.set("fullName", fullName);
    upstreamForm.set("email", email);
    upstreamForm.set("phone", phone);
    upstreamForm.set("position", position);
    upstreamForm.set("cv", cv);

    const res = await fetch(`${upstreamOrigin()}${upstreamCareerPath()}`, {
      method: "POST",
      body: upstreamForm,
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
        typeof parsed === "object" && parsed !== null ? parsed : { message },
        { status: res.status },
      );
    }

    return NextResponse.json(parsed ?? { success: true });
  } catch (e) {
    console.error("POST /api/career proxy failed:", e);
    return NextResponse.json(
      { message: "Unexpected error forwarding application." },
      { status: 500 },
    );
  }
}
