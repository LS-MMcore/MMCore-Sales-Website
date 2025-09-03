"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Package, Globe, Zap, ChevronDown, Hand } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useIsMobile } from "@/hooks/use-mobile"

export default function HeroSection() {
  const { t } = useLanguage()
  const isMobile = useIsMobile()

  const scrollToNext = () => {
    const nextSection = document.querySelector("#services-overview")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: "#63b2dc" }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-white rounded-full animate-bounce delay-700"></div>
      </div>

      <div className="container relative px-4 md:px-6 flex-1 flex items-center pt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                {t("hero.title").split(t("hero.titleHighlight"))[0]}
                <span className="text-yellow-300">{t("hero.titleHighlight")}</span>
                {t("hero.title").split(t("hero.titleHighlight"))[1]}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed">{t("hero.subtitle")}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#contact">
                <Button
                  size="lg"
                  className="bg-white text-[#63b2dc] hover:bg-gray-100 font-semibold px-8 py-4 text-lg group touch-manipulation min-h-[48px]"
                >
                  {t("hero.getStarted")}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/api-documentation">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#63b2dc] bg-transparent font-semibold px-8 py-4 text-lg touch-manipulation min-h-[48px]"
                >
                  {t("hero.viewApiDocs")}
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">{t("hero.carriers")}</div>
                  <div className="text-sm text-white/70">{t("hero.carriersDesc")}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">{t("hero.countries")}</div>
                  <div className="text-sm text-white/70">{t("hero.countriesDesc")}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/90 sm:col-span-2 md:col-span-1">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">{t("hero.realtime")}</div>
                  <div className="text-sm text-white/70">{t("hero.realtimeDesc")}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:block hidden">
            <div className="relative w-full h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl backdrop-blur-sm border border-white/20"></div>
              <div className="absolute top-8 left-8 w-16 h-16 bg-yellow-300 rounded-2xl flex items-center justify-center">
                <Package className="w-8 h-8 text-[#63b2dc]" />
              </div>
              <div className="absolute top-8 right-8 w-12 h-12 bg-white/30 rounded-xl"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 bg-white/30 rounded-xl"></div>
              <div className="absolute bottom-8 right-8 w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Zap className="w-12 h-12 text-[#63b2dc]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToNext}
          className="flex flex-col items-center text-white/80 hover:text-white transition-colors group touch-manipulation p-4"
          aria-label="Scroll to next section"
        >
          <span className="text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {isMobile ? "Swipe Up" : "Scroll Down"}
          </span>
          {typeof isMobile === "boolean" && (
            isMobile ? (
              <>
                <Hand className="w-6 h-6 mt-2 animate-bounce" />
              </>
            ) : (
              <>
                <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
                </div>
                <ChevronDown className="w-6 h-6 mt-2 animate-bounce" />
              </>
            )
          )}
        </button>
      </div>
    </section>
  )
}
