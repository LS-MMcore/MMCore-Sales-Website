import { NextResponse } from "next/server"

const API_KEY = "43133486A143C928A86CF90CCF0E8DD0A16F57D0"

export async function POST(req: Request) {
    try {
        const { codes, lang } = (await req.json()) as { codes: string[]; lang?: string }

        if (!Array.isArray(codes)) {
            return NextResponse.json({ error: "Invalid body. Expected { codes: string[] }." }, { status: 400 })
        }

        const cleaned = Array.from(
            new Set(
                codes
                    .map((c) => String(c).trim())
                    .filter(Boolean),
            ),
        ).slice(0, 50)

        const language = (lang || "EN").toUpperCase() === "NL" ? "NL" : "EN"

        const url = `https://api.mmcore.tech/get_tracking_information/${API_KEY}?lang=${encodeURIComponent(
            language,
        )}&type=barcode`

        const upstream = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(cleaned),
            cache: "no-store",
        })

        const text = await upstream.text()
        let data: any
        try {
            data = JSON.parse(text)
        } catch {
            return NextResponse.json({ error: "Upstream returned non-JSON", raw: text }, { status: 502 })
        }

        return NextResponse.json({ ok: true, requested: cleaned, lang: language, data }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 500 })
    }
}
