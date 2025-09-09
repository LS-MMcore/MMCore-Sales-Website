"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  Warehouse,
  Shield,
  Truck,
  Package,
  CheckCircle,
  Network,
  MapPin,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { useLanguage } from "@/contexts/LanguageContext"

export default function GlobalEcommerceLogisticsPage() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Globe,
      title: t("globalEcommerce.features.crossBorderLogistics.title"),
      description: t("globalEcommerce.features.crossBorderLogistics.description"),
    },
    {
      icon: Warehouse,
      title: t("globalEcommerce.features.warehouseNetwork.title"),
      description: t("globalEcommerce.features.warehouseNetwork.description"),
    },
    {
      icon: Shield,
      title: t("globalEcommerce.features.customsCompliance.title"),
      description: t("globalEcommerce.features.customsCompliance.description"),
    },
    {
      icon: Truck,
      title: t("globalEcommerce.features.lastMileDelivery.title"),
      description: t("globalEcommerce.features.lastMileDelivery.description"),
    },
    {
      icon: TrendingUp,
      title: t("globalEcommerce.features.scalableInfrastructure.title"),
      description: t("globalEcommerce.features.scalableInfrastructure.description"),
    },
    {
      icon: Users,
      title: t("globalEcommerce.features.localExpertise.title"),
      description: t("globalEcommerce.features.localExpertise.description"),
    },
  ]

  const services = [
    { name: t("globalEcommerce.services.customsClearance"), icon: Shield },
    { name: t("globalEcommerce.services.fulfillment"), icon: Package },
    { name: t("globalEcommerce.services.trucking"), icon: Truck },
    { name: t("globalEcommerce.services.lastMile"), icon: MapPin },
    { name: t("globalEcommerce.services.warehousing"), icon: Warehouse },
    { name: t("globalEcommerce.services.compliance"), icon: CheckCircle },
  ]

  const stats = [
    {
      icon: Globe,
      labelKey: "countriesServed",
      value: "50+",
    },
    {
      icon: Warehouse,
      labelKey: "warehouseLocations",
      value: "25+",
    },
    {
      icon: Package,
      labelKey: "dailyParcelVolume",
      value: "100K+",
    },
    {
      icon: Clock,
      labelKey: "averageTransitTime",
      value: "2-5 Days",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div style={{ paddingTop: "50px" }}>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#63b2dc]/10 via-[#63b2dc]/20 to-background">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-gradient-to-br from-[#63b2dc] to-[#4a9bc7]">
                  <Globe className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance"
                style={{ color: "#63b2dc" }}
              >
                {t("globalEcommerce.hero.title")}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto text-pretty">
                {t("globalEcommerce.hero.subtitle")}
              </p>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">
                  {t("globalEcommerce.hero.trustedPartner")}
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                    {t("globalEcommerce.hero.badges.crossBorder")}
                  </Badge>
                  <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                    {t("globalEcommerce.hero.badges.euCustoms")}
                  </Badge>
                  <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                    {t("globalEcommerce.hero.badges.iossCompliance")}
                  </Badge>
                  <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                    {t("globalEcommerce.hero.badges.globalNetwork")}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-20 bg-gradient-to-br from-white to-slate-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 rounded-full bg-[#63b2dc]/10">
                      <Network className="h-8 w-8 text-[#63b2dc]" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800">{t("globalEcommerce.whoWeAre.title")}</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-lg text-slate-700 leading-relaxed">
                      <span className="font-semibold text-[#63b2dc]">MMcore</span>{" "}
                      {t("globalEcommerce.whoWeAre.description1")}
                    </p>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      {t("globalEcommerce.whoWeAre.description2")}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-[#63b2dc]/20">
                      <CheckCircle className="h-6 w-6 text-[#63b2dc]" />
                      <span className="font-medium text-slate-700">
                        {t("globalEcommerce.whoWeAre.highlights.euCompliance")}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-[#63b2dc]/20">
                      <Globe className="h-6 w-6 text-[#63b2dc]" />
                      <span className="font-medium text-slate-700">
                        {t("globalEcommerce.whoWeAre.highlights.globalReach")}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-[#63b2dc]/20">
                      <TrendingUp className="h-6 w-6 text-[#63b2dc]" />
                      <span className="font-medium text-slate-700">
                        {t("globalEcommerce.whoWeAre.highlights.scalableSolutions")}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-[#63b2dc]/20">
                      <Users className="h-6 w-6 text-[#63b2dc]" />
                      <span className="font-medium text-slate-700">
                        {t("globalEcommerce.whoWeAre.highlights.localExpertise")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#63b2dc]/10 to-[#63b2dc]/5 rounded-2xl p-8 border border-[#63b2dc]/20">
                    <div className="text-center space-y-6">
                      <div className="flex justify-center">
                        <div className="p-4 rounded-full bg-gradient-to-br from-[#63b2dc] to-[#4a9bc7]">
                          <Network className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-slate-800">
                          {t("globalEcommerce.whoWeAre.globalNetworkTitle")}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {t("globalEcommerce.whoWeAre.globalNetworkDescription")}
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Button size="lg" asChild className="text-white" style={{ backgroundColor: "#63b2dc" }}>
                          <Link href="/#contact">{t("globalEcommerce.hero.getStarted")}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6 max-w-4xl mx-auto mb-16">
              <div className="flex justify-center mb-6">
                <div className="p-3 rounded-full bg-[#63b2dc]/10">
                  <TrendingUp className="h-8 w-8 text-[#63b2dc]" />
                </div>
              </div>
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-slate-800 text-balance">
                {t("globalEcommerce.overview.title")}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto text-pretty">
                {t("globalEcommerce.overview.description")}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto text-pretty">
                {t("globalEcommerce.overview.compliance")}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              {stats.map((stat, idx) => (
                <Card key={idx} className="text-center border-[#63b2dc]/20 bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="p-3 bg-[#63b2dc]/10 rounded-full">
                        <stat.icon className="h-6 w-6 text-[#63b2dc]" />
                      </div>
                      <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                      <div className="text-sm text-slate-600">{t(`globalEcommerce.stats.${stat.labelKey}`)}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-800">
                {t("globalEcommerce.coreCapabilities.title")}
              </h2>
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-lg">
                {t("globalEcommerce.coreCapabilities.description")}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="h-full border-[#63b2dc]/30 hover:border-[#63b2dc]/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: "#63b2dc20" }}>
                        <feature.icon className="h-6 w-6" style={{ color: "#63b2dc" }} />
                      </div>
                      <CardTitle className="text-xl text-slate-800">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base text-slate-600">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24" style={{ backgroundColor: "#63b2dc20" }}>
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-800">
                {t("globalEcommerce.logisticsChain.title")}
              </h2>
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-lg">
                {t("globalEcommerce.logisticsChain.description")}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="text-center border-[#63b2dc]/30 hover:border-[#63b2dc]/50 transition-colors"
                >
                  <CardContent className="pt-6 pb-4">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="p-3 bg-[#63b2dc]/10 rounded-full">
                        <service.icon className="h-6 w-6 text-[#63b2dc]" />
                      </div>
                      <div className="text-sm font-medium text-slate-800 text-center">{service.name}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl" style={{ color: "#63b2dc" }}>
                {t("globalEcommerce.cta.title")}
              </h2>
              <p className="text-slate-700 md:text-lg text-pretty">{t("globalEcommerce.cta.subtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="text-white" style={{ backgroundColor: "#63b2dc" }}>
                  <Link href="/#contact">{t("globalEcommerce.cta.getStarted")}</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-transparent hover:text-white"
                  style={{ borderColor: "#63b2dc", color: "#63b2dc" }}
                >
                  <Link href="/services">{t("globalEcommerce.cta.learnMore")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
