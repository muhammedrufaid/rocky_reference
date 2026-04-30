import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const form = await req.formData();
        const name = String(form.get("name") ?? "").trim();
        const email = String(form.get("email") ?? "").trim();
        const phone = String(form.get("phone") ?? "").trim();
        const position = String(form.get("position") ?? "").trim();
        const cv = form.get("cv");

        if (!name || !email || !phone || !position) {
            return new NextResponse("Missing required fields.", { status: 400 });
        }

        if (!(cv instanceof File)) {
            return new NextResponse("CV upload is required.", { status: 400 });
        }

        // Note: This endpoint intentionally only validates and acknowledges receipt.
        // Hook this up to email/CRM/storage later (S3, database, etc.).
        return NextResponse.json({
            ok: true,
            received: {
                name,
                email,
                phone,
                position,
                cvFileName: cv.name,
                cvType: cv.type,
                cvSize: cv.size,
            },
        });
    } catch {
        return new NextResponse("Unexpected error.", { status: 500 });
    }
}

