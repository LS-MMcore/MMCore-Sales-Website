"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PackageCheck } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function TrackingSection() {
  const [trackingNumbers, setTrackingNumbers] = useState("")
  const { t } = useLanguage()

  return (
    <section
      id="tracking"
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-blue-400 text-white"
    >
      <div className="container px-4 md:px-6 text-center">
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center space-y-4">
            <PackageCheck className="h-24 w-24 text-white relative z-0" />
            <p className="text-sm font-medium uppercase tracking-wider text-white/80">
              {t("tracking.trackYourPackage")}
            </p>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("tracking.title")}</h2>
          <p className="text-lg text-white/80">{t("tracking.subtitle")}</p>
          <div className="w-full max-w-xl mx-auto">
            <Textarea
              placeholder={t("tracking.placeholder")}
              className="w-full min-h-[150px] bg-white/20 border-white/50 text-white placeholder:text-white/70 focus:ring-white focus:border-white"
              value={trackingNumbers}
              onChange={(e) => setTrackingNumbers(e.target.value)}
            />
            <Link href={`/tracking?numbers=${encodeURIComponent(trackingNumbers)}`} passHref>
              <Button className="mt-4 w-full bg-white text-primary hover:bg-gray-100">
                {t("tracking.trackButton")} <PackageCheck className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
