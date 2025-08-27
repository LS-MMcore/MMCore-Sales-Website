import { type NextRequest, NextResponse } from "next/server"

type MMCoreScan = {
  itemNumber: number
  code: string
  description: string
  location: string
  dateTime: string
}

type MMCoreResponse = {
  state: boolean
  numberOfItems: number
  notFound: string[]
  items: Record<string, MMCoreScan[]>
  lastStatus: Record<string, MMCoreScan>
}

function buildMMCoreUrl(language: string, apiKey: string) {
  return `https://api.mmcore.tech/get_tracking_information/${encodeURIComponent(
    apiKey,
  )}?lang=${encodeURIComponent(language)}&type=barcode`
}

export async function POST(request: NextRequest) {
  try {
    const MMCORE_KEY = "43133486A143C928A86CF90CCF0E8DD0A16F57D0"

    if (!MMCORE_KEY) {
      return NextResponse.json({ error: "MMCore API key not configured" }, { status: 500 })
    }

    const body = await request.json()
    const { trackingNumbers, language = "EN" } = body

    if (!trackingNumbers || !Array.isArray(trackingNumbers)) {
      return NextResponse.json({ error: "Invalid tracking numbers provided" }, { status: 400 })
    }

    // Limit to 50 tracking numbers
    const cleaned = Array.from(new Set(trackingNumbers.map((c: any) => String(c).trim()).filter(Boolean))).slice(0, 50)

    if (cleaned.length === 0) {
      return NextResponse.json({ error: "No valid tracking numbers provided" }, { status: 400 })
    }

    const url = buildMMCoreUrl(language, MMCORE_KEY)

    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(cleaned),
      cache: "no-store",
    })

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => "")
      throw new Error(text || `Upstream error (${upstream.status})`)
    }

    const data = (await upstream.json()) as MMCoreResponse

    return NextResponse.json({
      requested: cleaned,
      lang: language,
      data,
    })
  } catch (error: any) {
    console.error("Tracking API error:", error)
    return NextResponse.json({ error: error?.message || "Something went wrong" }, { status: 500 })
  }
}
