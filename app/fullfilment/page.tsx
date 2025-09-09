"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Warehouse,
  Database,
  Zap,
  BarChart3,
  Users,
  CheckCircle,
  Globe,
  Settings,
  TrendingUp,
  Clock,
  Target,
  Truck,
  Package,
  Shield,
  Network,
} from "lucide-react"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { useLanguage } from "@/contexts/LanguageContext"

export default function FulfilmentPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div style={{ paddingTop: "50px" }}>
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#63b2dc]/10 via-[#63b2dc]/20 to-background">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-3 rounded-full" style={{ backgroundColor: "#63b2dc20" }}>
                  <Warehouse className="h-8 w-8" style={{ color: "#63b2dc" }} />
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl" style={{ color: "#63b2dc" }}>
                {t("fulfilment.hero.title")}
              </h1>
              <p className="mx-auto max-w-[800px] text-slate-700 text-lg md:text-xl">{t("fulfilment.hero.subtitle")}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                  {t("fulfilment.hero.badges.europeanNetwork")}
                </Badge>
                <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                  {t("fulfilment.hero.badges.tailoredSolutions")}
                </Badge>
                <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                  {t("fulfilment.hero.badges.costEfficiency")}
                </Badge>
                <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                  {t("fulfilment.hero.badges.endToEnd")}
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Logistics Solutions Overview Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white">
          <div className="container px-4 md:px-6">
            {/* Main Title and Intro */}
            <div className="text-center space-y-6 max-w-4xl mx-auto mb-16">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-gradient-to-br from-[#63b2dc] to-[#4a9bc7]">
                  <Globe className="h-10 w-10 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-slate-800">
                {t("fulfilment.logisticsSolutions.title")}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                {t("fulfilment.logisticsSolutions.subtitle")}
              </p>
            </div>

            {/* Key Value Propositions */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
              <Card className="border-[#63b2dc]/20 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-[#63b2dc]/10">
                      <Network className="h-8 w-8 text-[#63b2dc]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">{t("fulfilment.network.title")}</h3>
                      <p className="text-slate-600 leading-relaxed">{t("fulfilment.network.description")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#63b2dc]/20 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-[#63b2dc]/10">
                      <Target className="h-8 w-8 text-[#63b2dc]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">{t("fulfilment.tayloredSolutions.title")}</h3>
                      <p className="text-slate-600 leading-relaxed">
                        {t("fulfilment.tayloredSolutions.description")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action Banner */}
            <div className="bg-gradient-to-r from-[#63b2dc] to-[#4a9bc7] rounded-2xl p-8 md:p-12 text-center text-white max-w-4xl mx-auto">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold">{t("fulfilment.logisticsSolutions.optimize")}</h3>
                <p className="text-lg text-white/90 max-w-2xl mx-auto">{t("fulfilment.logisticsSolutions.conclusion")}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-[#63b2dc] hover:bg-white/90 font-semibold"
                  >
                    <Link
                      href="/#contact"
                      className="bg-white text-[#63b2dc] hover:bg-white/90 font-semibold"
                    >
                      {t("fulfilment.logisticsSolutions.getStarted")}
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Link
                      href="/#contact"
                      className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                    >
                      {t("fulfilment.logisticsSolutions.learnMore")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
