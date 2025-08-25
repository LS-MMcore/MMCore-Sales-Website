"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import SimpleHeader from "@/components/layout/simple-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import TrackingProgressBar from "@/components/tracking-progress-bar"
import {
  Loader2,
  Search,
  Package,
  CheckCircle2,
  Truck,
  Plane,
  MapPin,
  Clock,
  AlertTriangle,
  XCircle,
  Building2,
  FileText,
  PackageCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

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

const STATUS_MAP: Record<string, string> = {
  "97": "Manifested for customs",
  "98": "Label data pre-registered",
  "99": "Label created",
  "200": "Dispatch declaration",
  "201": "Dispatch arrival",
  "202": "Dispatch documentation",
  "203": "Dispatch amendment",
  "204": "Dispatch cancellation",
  "205": "Customs clearance started",
  "207": "Customs issue",
  "208": "Confiscated",
  "209": "Held by customs",
  "210": "Needs documents",
  "211": "Accepted",
  "213": "Parcel cleared",
  "214": "Cleared manually",
  "215": "Cancelled",
  "216": "Arrived in facility",
  "217": "Ready for last mile",
  "218": "Released to last mile",
  "219": "Job dispatched",
  "2000": "Cargo is being tracked",
  "2001": "Info sent; awaiting pickup",
  "2002": "Logistics provider picked up",
  "2003": "In transit",
  "2004": "Arrived at destination",
  "2005": "Consignee notified",
  "2006": "Delivered to consignee",
  "2007": "Lost/Damaged/Returned/Unclaimed",
  "2008": "Shipping time too long",
  "3000": "Reached a depot",
  "3001": "Outbound scan",
  "3004": "Parcel details updated",
  "3005": "Arrived at last-mile carrier",
  "3050": "Left the depot",
  "5000": "Out for delivery",
  "5001": "Out for delivery to recipient",
  "5002": "SMS sent to recipient",
  "5003": "Out for delivery to parcel locker",
  "5004": "Out for delivery to parcel shop",
  "7000": "Recipient not at home, second try",
  "7001": "Recipient not home; stored 5 days",
  "7002": "Recipient not at home",
  "7003": "Not home; pickup at collection point",
  "7004": "Stored until requested",
  "8000": "Return to sender",
  "8001": "Shipment canceled",
  "8500": "Extra information",
  "9000": "Delivered",
  "9001": "Delivered to neighbors",
  "9002": "Delivered to parcelshop",
  "9003": "Delivered to parcelbox",
  "9004": "Delivered to safe place",
  "9005": "Package collected",
  "9006": "Return delivered",
  "9500": "Refused",
  "9501": "Not picked up",
  "9502": "Not delivered",
  "9503": "Rerouted to new address",
  "9600": "Incorrect address details",
}

function getStatusInfo(code: string) {
  const statusText = STATUS_MAP[code] || code

  // Delivered statuses
  if (code === "9000" || code.startsWith("900")) {
    return {
      text: statusText,
      variant: "default" as const,
      bgColor: "bg-green-50 border-green-200",
      textColor: "text-green-800",
      icon: CheckCircle2,
      iconColor: "text-green-600",
    }
  }

  // Out for delivery / In transit
  if (code === "5000" || code === "5001" || code.startsWith("500") || code === "2003" || code === "3001" || code === "3050") {
    return {
      text: statusText,
      variant: "secondary" as const,
      bgColor: "bg-blue-50 border-blue-200",
      textColor: "text-blue-800",
      icon: Truck,
      iconColor: "text-blue-600",
    }
  }

  // At depot/facility
  if (code === "3000" || code === "216" || code === "3005") {
    return {
      text: statusText,
      variant: "secondary" as const,
      bgColor: "bg-indigo-50 border-indigo-200",
      textColor: "text-indigo-800",
      icon: Building2,
      iconColor: "text-indigo-600",
    }
  }

  // Customs/Documentation
  if (code.startsWith("20") || code === "97" || code === "98" || code === "213") {
    return {
      text: statusText,
      variant: "secondary" as const,
      bgColor: "bg-amber-50 border-amber-200",
      textColor: "text-amber-800",
      icon: FileText,
      iconColor: "text-amber-600",
    }
  }

  //Label generated
  if (code === "99") {
    return {
      text: statusText,
      variant: "secondary" as const,
      bgColor: "bg-grey-50 border-grey-200",
      textColor: "text-grey-800",
      icon: Package,
      iconColor: "text-grey-600",
    }
  }

  // Issues/Problems
  if (code.startsWith("95") || code === "215" || code === "208" || code.startsWith("70") || code.startsWith("80")) {
    return {
      text: statusText,
      variant: "destructive" as const,
      bgColor: "bg-red-50 border-red-200",
      textColor: "text-red-800",
      icon: AlertTriangle,
      iconColor: "text-red-600",
    }
  }

  // Default
  return {
    text: statusText,
    variant: "secondary" as const,
    bgColor: "bg-gray-50 border-gray-200",
    textColor: "text-gray-800",
    icon: Clock,
    iconColor: "text-gray-600",
  }
}

function buildMMCoreUrl(language: string, apiKey: string) {
  return `https://api.mmcore.tech/get_tracking_information/${encodeURIComponent(
    apiKey,
  )}?lang=${encodeURIComponent(language)}&type=barcode`
}

export default function TrackingPage() {
  const search = useSearchParams()
  const [raw, setRaw] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<null | { requested: string[]; lang: string; data: MMCoreResponse }>(null)
  const [collapsedPackages, setCollapsedPackages] = useState<Set<string>>(new Set())
  const [showAllEntries, setShowAllEntries] = useState<Set<string>>(new Set())

  const codesFromQuery = useMemo(() => {
    const numbers = search.get("numbers") || ""
    const codes = search.get("codes") || search.get("code") || ""
    const joined = [numbers, codes].filter(Boolean).join("\n")
    return parseCodes(joined)
  }, [search])

  const currentLang = useMemo(() => {
    if (typeof document !== "undefined") {
      const htmlLang = document.documentElement.lang?.toLowerCase()
      if (htmlLang === "nl") return "NL"
    }
    const qp = (search.get("lang") || "").toLowerCase()
    if (qp === "nl") return "NL"
    return "EN"
  }, [search])

  useEffect(() => {
    if (codesFromQuery.length) {
      setRaw(codesFromQuery.join("\n"))
      void onSubmit(codesFromQuery)
    }
  }, [])

  async function onSubmit(codesArg?: string[]) {
    const codes = codesArg ?? parseCodes(raw)
    if (!codes.length) {
      setError("Please enter at least one tracking number.")
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const cleaned = Array.from(new Set(codes.map((c) => String(c).trim()).filter(Boolean))).slice(0, 50)
      const language = currentLang === "NL" ? "NL" : "EN"

      const MMCORE_KEY =
        (typeof process !== "undefined" && (process as any).env?.NEXT_PUBLIC_MMCORE_KEY) ||
        "43133486A143C928A86CF90CCF0E8DD0A16F57D0"

      const url = buildMMCoreUrl(language, MMCORE_KEY)

      const upstream = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(cleaned),
        cache: "no-store",
      });

      if (!upstream.ok) {
        const text = await upstream.text().catch(() => "")
        throw new Error(text || `Upstream error (${upstream.status})`)
      }

      const data = (await upstream.json()) as MMCoreResponse

      setResult({ requested: cleaned, lang: language, data })
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const togglePackageCollapse = (barcode: string) => {
    setCollapsedPackages((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(barcode)) {
        newSet.delete(barcode)
      } else {
        newSet.add(barcode)
      }
      return newSet
    })
  }

  const toggleShowAllEntries = (barcode: string) => {
    setShowAllEntries((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(barcode)) {
        newSet.delete(barcode)
      } else {
        newSet.add(barcode)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-[#63b2dc]/10">
      <SimpleHeader />

      <main className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-8 pt-24 sm:pt-32">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#63b2dc]/10 rounded-full mb-3 sm:mb-4">
            <PackageCheck className="h-6 w-6 sm:h-8 sm:w-8 text-[#63b2dc]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">Track Your Shipment</h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto px-2">
            Enter up to 50 tracking numbers to get real-time updates on your packages. Separate multiple numbers with
            commas, spaces, or new lines.
          </p>
        </div>

        <Card className="p-4 sm:p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <div className="space-y-4 sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-[1fr_auto]">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Tracking Numbers</label>
              <Textarea
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
                className="min-h-[100px] sm:min-h-[120px] resize-none border-slate-200 focus:border-[#63b2dc] focus:ring-[#63b2dc] text-sm sm:text-base"
                placeholder="Enter tracking numbers (e.g., 05222436106976, 12345678901234)"
              />
            </div>
            <div className="flex flex-col gap-3 sm:w-48">
              <Button
                onClick={() => onSubmit()}
                disabled={loading}
                className="w-full bg-[#63b2dc] hover:bg-[#63b2dc]/90 text-white shadow-md h-11 sm:h-10 text-base sm:text-sm"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4 sm:h-8 sm:w-8" />
                    Track Packages
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setRaw("")}
                disabled={loading}
                className="w-full border-slate-200 hover:bg-slate-50 h-11 sm:h-10 text-base sm:text-sm"
              >
                Clear All
              </Button>
              <div className="text-center">
                <span className="text-xs text-slate-500">{parseCodes(raw).length} / 50 numbers</span>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-[#63b2dc] h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(parseCodes(raw).length / 50) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </Card>

        {result && (
          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
            {result.data.notFound?.length ? (
              <Card className="border-dashed border-amber-300 bg-amber-50/50 p-3 sm:p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-amber-800">
                    <span className="font-medium">Not found ({result.data.notFound.length}):</span>{" "}
                    <span className="text-amber-700 break-all">{result.data.notFound.join(", ")}</span>
                  </p>
                </div>
              </Card>
            ) : null}

            {Object.entries(result.data.items || {}).map(([barcode, scans]) => {
              const last = result.data.lastStatus?.[barcode]
              const lastCode = last?.code || ""
              const statusInfo = getStatusInfo(lastCode)
              const isCollapsed = collapsedPackages.has(barcode)
              const showingAll = showAllEntries.has(barcode)
              const sortedScans = (scans || [])
                .slice()
                .sort((a, b) => (b.dateTime || "").localeCompare(a.dateTime || ""))
              const displayedScans = showingAll ? sortedScans : sortedScans.slice(0, 5)
              const hasMoreEntries = sortedScans.length > 5

              return (
                <Card
                  key={barcode}
                  className={`overflow-hidden shadow-lg border-0 transition-all duration-300 ease-in-out ${isCollapsed ? "rounded-lg" : "bg-white"}`}
                  style={isCollapsed ? { backgroundColor: "color-mix(in oklab, #63b2dc 10%, transparent)" } : {}}
                >
                  <div
                    className={`transition-all duration-300 ease-in-out ${!isCollapsed ? "border-b rounded-t-lg" : ""} ${isCollapsed ? "bg-[#63b2dc] text-white" : statusInfo.bgColor}`}
                  >
                    <div className="flex items-center justify-between p-3 sm:p-4">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div
                          className={`p-1.5 sm:p-2 rounded-lg shadow-sm transition-all duration-300 flex-shrink-0 ${isCollapsed ? "bg-white/20" : "bg-white"}`}
                        >
                          <Package
                            className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300 ${isCollapsed ? "text-white" : "text-slate-600"}`}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div
                            className={`font-mono font-semibold text-sm sm:text-base transition-colors duration-300 truncate ${isCollapsed ? "text-white" : "text-slate-900"}`}
                          >
                            {barcode}
                          </div>
                          <div
                            className={`text-xs flex items-center gap-1 transition-colors duration-300 ${isCollapsed ? "text-white/80" : "text-slate-600"}`}
                          >
                            <Clock className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">
                              {last?.dateTime ? new Date(last.dateTime).toLocaleString() : "No updates"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        {statusInfo.icon && (
                          <statusInfo.icon
                            className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300 ${isCollapsed ? "text-white" : statusInfo.iconColor}`}
                          />
                        )}
                        <Badge
                          className={`font-medium text-xs transition-all duration-300 px-2 py-1 ${isCollapsed ? "bg-white/20 text-white hover:bg-white/30" : `${statusInfo.textColor} bg-white`}`}
                        >
                          {statusInfo.text || "Unknown Status"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePackageCollapse(barcode)}
                          className={`h-9 w-9 sm:h-8 sm:w-8 p-0 transition-all duration-300 ${isCollapsed ? "hover:bg-white/20 text-white" : "hover:bg-white/50"}`}
                        >
                          {isCollapsed ? (
                            <ChevronDown
                              className={`h-4 w-4 transition-all duration-300 transform ${isCollapsed ? "text-white rotate-0" : "text-slate-500 hover:text-slate-700 rotate-180"}`}
                            />
                          ) : (
                            <ChevronUp
                              className={`h-4 w-4 transition-all duration-300 transform ${isCollapsed ? "text-white rotate-180" : "text-slate-500 hover:text-slate-700 rotate-0"}`}
                            />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100"}`}
                  >
                    <div className="p-3 sm:p-6 bg-white rounded-b-lg">
                      <TrackingProgressBar scans={scans} lastStatus={last} />

                      <div className="space-y-3 sm:space-y-4">
                        {displayedScans.map((scan, index) => {
                          const scanStatusInfo = getStatusInfo(scan.code)
                          const isLatest = index === 0

                          return (
                            <div
                              key={barcode + "-" + scan.itemNumber}
                              className={`relative flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-200 hover:shadow-md ${isLatest ? scanStatusInfo.bgColor : "bg-slate-50 hover:bg-slate-100"
                                }`}
                              style={{
                                animationDelay: `${index * 50}ms`,
                                animation: !isCollapsed ? `fadeInUp 0.3s ease-out forwards` : "none",
                              }}
                            >
                              {index < displayedScans.length - 1 && (
                                <div className="absolute left-[22px] sm:left-[30px] top-[52px] sm:top-[60px] w-0.5 h-6 sm:h-8 bg-slate-200" />
                              )}

                              <div
                                className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ${isLatest ? "bg-white shadow-sm" : "bg-white"}`}
                              >
                                {scanStatusInfo.icon && (
                                  <scanStatusInfo.icon
                                    className={`h-3 w-3 sm:h-4 sm:w-4 ${scanStatusInfo.iconColor}`}
                                  />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div
                                  className={`font-medium text-sm sm:text-base leading-tight ${isLatest ? scanStatusInfo.textColor : "text-slate-900"}`}
                                >
                                  {scanStatusInfo.text}
                                </div>
                                {(scan.location || scan.description) && (
                                  <div className="mt-1 flex items-start gap-1 text-xs sm:text-sm text-slate-600">
                                    <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                    <span className="break-words">
                                      {scan.location}
                                      {scan.location && scan.description ? " • " : ""}
                                      {scan.description}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="text-right text-xs text-slate-500 flex-shrink-0">
                                {scan.dateTime ? (
                                  <>
                                    <div className="whitespace-nowrap">
                                      {new Date(scan.dateTime).toLocaleDateString()}
                                    </div>
                                    <div className="font-mono whitespace-nowrap">
                                      {new Date(scan.dateTime).toLocaleTimeString()}
                                    </div>
                                  </>
                                ) : (
                                  "—"
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {hasMoreEntries && (
                        <div className="mt-4 pt-4 border-t border-slate-200 flex justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleShowAllEntries(barcode)}
                            className="text-[#63b2dc] border-[#63b2dc]/20 hover:bg-[#63b2dc]/5 hover:border-[#63b2dc]/40 transition-all duration-200"
                          >
                            {showingAll ? (
                              <>
                                <ChevronUp className="mr-2 h-4 w-4" />
                                Show Less
                              </>
                            ) : (
                              <>
                                <ChevronDown className="mr-2 h-4 w-4" />
                                Show All ({sortedScans.length} entries)
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </main>
    </div>
  )
}

function parseCodes(input: string): string[] {
  const tokens = input
    .split(/[\s,;\n]+/g)
    .map((t) => t.trim())
    .filter(Boolean)
  const unique = Array.from(new Set(tokens))
  return unique.slice(0, 50)
}
