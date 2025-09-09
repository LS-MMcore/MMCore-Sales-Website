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

export default function WMSPage() {
  const { t } = useLanguage()

  const wmsFeatures = [
    {
      icon: Database,
      title: t("wms.features.realtimeInsight.title"),
      description: t("wms.features.realtimeInsight.description"),
      benefits: [
        t("wms.features.realtimeInsight.benefits.0"),
        t("wms.features.realtimeInsight.benefits.1"),
        t("wms.features.realtimeInsight.benefits.2"),
        t("wms.features.realtimeInsight.benefits.3"),
      ],
    },
    {
      icon: Zap,
      title: t("wms.features.flexibleFastSetup.title"),
      description: t("wms.features.flexibleFastSetup.description"),
      benefits: [
        t("wms.features.flexibleFastSetup.benefits.0"),
        t("wms.features.flexibleFastSetup.benefits.1"),
        t("wms.features.flexibleFastSetup.benefits.2"),
        t("wms.features.flexibleFastSetup.benefits.3"),
      ],
    },
    {
      icon: Globe,
      title: t("wms.features.plugPlayConnections.title"),
      description: t("wms.features.plugPlayConnections.description"),
      benefits: [
        t("wms.features.plugPlayConnections.benefits.0"),
        t("wms.features.plugPlayConnections.benefits.1"),
        t("wms.features.plugPlayConnections.benefits.2"),
        t("wms.features.plugPlayConnections.benefits.3"),
      ],
    },
    {
      icon: BarChart3,
      title: t("wms.features.reportingOptions.title"),
      description: t("wms.features.reportingOptions.description"),
      benefits: [
        t("wms.features.reportingOptions.benefits.0"),
        t("wms.features.reportingOptions.benefits.1"),
        t("wms.features.reportingOptions.benefits.2"),
        t("wms.features.reportingOptions.benefits.3"),
      ],
    },
  ]

  const carrierPlatformFeatures = [
    {
      icon: Globe,
      title: t("wms.carrierPlatform.features.allCarriers.title"),
      description: t("wms.carrierPlatform.features.allCarriers.description"),
      benefits: [
        t("wms.carrierPlatform.features.allCarriers.benefits.0"),
        t("wms.carrierPlatform.features.allCarriers.benefits.1"),
        t("wms.carrierPlatform.features.allCarriers.benefits.2"),
        t("wms.carrierPlatform.features.allCarriers.benefits.3"),
      ],
    },
    {
      icon: BarChart3,
      title: t("wms.carrierPlatform.features.performance.title"),
      description: t("wms.carrierPlatform.features.performance.description"),
      benefits: [
        t("wms.carrierPlatform.features.performance.benefits.0"),
        t("wms.carrierPlatform.features.performance.benefits.1"),
        t("wms.carrierPlatform.features.performance.benefits.2"),
        t("wms.carrierPlatform.features.performance.benefits.3"),
      ],
    },
    {
      icon: Users,
      title: t("wms.carrierPlatform.features.financial.title"),
      description: t("wms.carrierPlatform.features.financial.description"),
      benefits: [
        t("wms.carrierPlatform.features.financial.benefits.0"),
        t("wms.carrierPlatform.features.financial.benefits.1"),
        t("wms.carrierPlatform.features.financial.benefits.2"),
        t("wms.carrierPlatform.features.financial.benefits.3"),
      ],
    },
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: t("wms.benefits.items.enhancedEfficiency.title"),
      description: t("wms.benefits.items.enhancedEfficiency.description"),
      points: [
        t("wms.benefits.items.enhancedEfficiency.points.0"),
        t("wms.benefits.items.enhancedEfficiency.points.1"),
        t("wms.benefits.items.enhancedEfficiency.points.2"),
      ],
    },
    {
      icon: Target,
      title: t("wms.benefits.items.costSavings.title"),
      description: t("wms.benefits.items.costSavings.description"),
      points: [
        t("wms.benefits.items.costSavings.points.0"),
        t("wms.benefits.items.costSavings.points.1"),
        t("wms.benefits.items.costSavings.points.2"),
      ],
    },
    {
      icon: CheckCircle,
      title: t("wms.benefits.items.improvedAccuracy.title"),
      description: t("wms.benefits.items.improvedAccuracy.description"),
      points: [
        t("wms.benefits.items.improvedAccuracy.points.0"),
        t("wms.benefits.items.improvedAccuracy.points.1"),
        t("wms.benefits.items.improvedAccuracy.points.2"),
      ],
    },
    {
      icon: Settings,
      title: t("wms.benefits.items.scalability.title"),
      description: t("wms.benefits.items.scalability.description"),
      points: [
        t("wms.benefits.items.scalability.points.0"),
        t("wms.benefits.items.scalability.points.1"),
        t("wms.benefits.items.scalability.points.2"),
      ],
    },
    {
      icon: BarChart3,
      title: t("wms.benefits.items.betterDecisionMaking.title"),
      description: t("wms.benefits.items.betterDecisionMaking.description"),
      points: [
        t("wms.benefits.items.betterDecisionMaking.points.0"),
        t("wms.benefits.items.betterDecisionMaking.points.1"),
        t("wms.benefits.items.betterDecisionMaking.points.2"),
      ],
    },
  ]

  const stats = [
    {
      icon: Warehouse,
      label: t("wms.stats.warehousesConnected"),
      value: t("wms.stats.values.warehousesConnected"),
    },
    {
      icon: Database,
      label: t("wms.stats.erpIntegrations"),
      value: t("wms.stats.values.erpIntegrations"),
    },
    {
      icon: Globe,
      label: t("wms.stats.countriesServed"),
      value: t("wms.stats.values.countriesServed"),
    },
    {
      icon: Clock,
      label: t("wms.stats.systemUptime"),
      value: t("wms.stats.values.systemUptime"),
    },
  ]

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
                {t("wms.hero.title")}
              </h1>
              <p className="mx-auto max-w-[800px] text-slate-700 text-lg md:text-xl">{t("wms.hero.subtitle")}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                  {t("wms.hero.badges.saas")}
                </Badge>
                <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                  {t("wms.hero.badges.realtime")}
                </Badge>
                <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                  {t("wms.hero.badges.integrations")}
                </Badge>
                <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                  {t("wms.hero.badges.transparent")}
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
                {t("wms.logisticsSolutions.title")}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                {t("wms.logisticsSolutions.subtitle")}
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
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Extensive European Network</h3>
                      <p className="text-slate-600 leading-relaxed">{t("wms.logisticsSolutions.description")}</p>
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
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Tailored Solutions</h3>
                      <p className="text-slate-600 leading-relaxed">
                        We leverage our strong network across Europe and the UK to find the perfect fit for your
                        business needs, whether you're looking for 3PL or 4PL logistics support.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Logistics Services Grid Section */}
        <section className="w-full py-12 md:py-24 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {/* 3PL Partner Search */}
              <Card className="h-full border-[#63b2dc]/30 hover:border-[#63b2dc]/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: "#63b2dc20" }}>
                      <Network className="h-6 w-6" style={{ color: "#63b2dc" }} />
                    </div>
                    <CardTitle className="text-xl text-slate-800">{t("wms.partnerSearch.title")}</CardTitle>
                  </div>
                  <CardDescription className="text-base text-slate-600">
                    {t("wms.partnerSearch.subtitle")}
                  </CardDescription>
                  <p className="text-sm text-slate-600 font-medium">{t("wms.partnerSearch.description")}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {["0", "1", "2", "3"].map((idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "#63b2dc" }} />
                        <span className="text-sm text-slate-600">{t(`wms.partnerSearch.services.${idx}`)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* E-commerce Fulfillment */}
              <Card className="h-full border-[#63b2dc]/30 hover:border-[#63b2dc]/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: "#63b2dc20" }}>
                      <Package className="h-6 w-6" style={{ color: "#63b2dc" }} />
                    </div>
                    <CardTitle className="text-xl text-slate-800">{t("wms.ecommerceFulfillment.title")}</CardTitle>
                  </div>
                  <CardDescription className="text-base text-slate-600">
                    {t("wms.ecommerceFulfillment.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {["0", "1", "2", "3"].map((idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "#63b2dc" }} />
                        <span className="text-sm text-slate-600">{t(`wms.ecommerceFulfillment.services.${idx}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-slate-600">{t("wms.ecommerceFulfillment.description")}</p>
                </CardContent>
              </Card>

              {/* Warehousing Connections */}
              <Card className="h-full border-[#63b2dc]/30 hover:border-[#63b2dc]/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: "#63b2dc20" }}>
                      <Warehouse className="h-6 w-6" style={{ color: "#63b2dc" }} />
                    </div>
                    <CardTitle className="text-xl text-slate-800">{t("wms.warehousingConnections.title")}</CardTitle>
                  </div>
                  <CardDescription className="text-base text-slate-600">
                    {t("wms.warehousingConnections.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {["0", "1", "2", "3"].map((idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "#63b2dc" }} />
                        <span className="text-sm text-slate-600">{t(`wms.warehousingConnections.services.${idx}`)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Shipping & Freight */}
              <Card className="h-full border-[#63b2dc]/30 hover:border-[#63b2dc]/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: "#63b2dc20" }}>
                      <Truck className="h-6 w-6" style={{ color: "#63b2dc" }} />
                    </div>
                    <CardTitle className="text-xl text-slate-800">{t("wms.shippingFreight.title")}</CardTitle>
                  </div>
                  <CardDescription className="text-base text-slate-600">
                    {t("wms.shippingFreight.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {["0", "1", "2", "3"].map((idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "#63b2dc" }} />
                        <span className="text-sm text-slate-600">{t(`wms.shippingFreight.services.${idx}`)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Customs Clearance */}
              <Card className="h-full border-[#63b2dc]/30 hover:border-[#63b2dc]/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: "#63b2dc20" }}>
                      <Shield className="h-6 w-6" style={{ color: "#63b2dc" }} />
                    </div>
                    <CardTitle className="text-xl text-slate-800">{t("wms.customsClearance.title")}</CardTitle>
                  </div>
                  <CardDescription className="text-base text-slate-600">
                    {t("wms.customsClearance.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {["0", "1", "2", "3"].map((idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "#63b2dc" }} />
                        <span className="text-sm text-slate-600">{t(`wms.customsClearance.services.${idx}`)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Custom Supply Chain */}
              <Card className="h-full border-[#63b2dc]/30 hover:border-[#63b2dc]/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: "#63b2dc20" }}>
                      <Settings className="h-6 w-6" style={{ color: "#63b2dc" }} />
                    </div>
                    <CardTitle className="text-xl text-slate-800">{t("wms.customSupplyChain.title")}</CardTitle>
                  </div>
                  <CardDescription className="text-base text-slate-600">
                    {t("wms.customSupplyChain.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {["0", "1", "2", "3"].map((idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "#63b2dc" }} />
                        <span className="text-sm text-slate-600">{t(`wms.customSupplyChain.services.${idx}`)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* E-warehouse Features */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-800">
                {t("wms.saasSystem.title")}
              </h2>
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-lg">{t("wms.saasSystem.subtitle")}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
              {wmsFeatures.map((feature, index) => (
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
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "#63b2dc" }} />
                          <span className="text-sm text-slate-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section
          className="w-full py-12 md:py-24 text-white"
          style={{ background: `linear-gradient(135deg, #63b2dc 0%, #4a9bc7 50%, #3684b2 100%)` }}
        >
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">{t("wms.benefits.title")}</h2>
              <p className="mx-auto max-w-[700px] text-white/90 md:text-lg">{t("wms.benefits.subtitle")}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              {stats.map((stat, idx) => (
                <Card key={idx} className="text-center bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="p-3 bg-white/20 rounded-full">
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Benefits Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-white/20">
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl text-white">{benefit.title}</CardTitle>
                    </div>
                    <CardDescription className="text-white/80">{benefit.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {benefit.points.map((point, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-white" />
                          <span className="text-sm text-white/90">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Carrier Platform Section */}
        <section className="w-full py-12 md:py-24" style={{ backgroundColor: "#63b2dc20" }}>
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-800">
                {t("wms.carrierPlatform.title")}
              </h2>
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-lg">{t("wms.carrierPlatform.subtitle")}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
              {carrierPlatformFeatures.map((feature, index) => (
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
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "#63b2dc" }} />
                          <span className="text-sm text-slate-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl" style={{ color: "#63b2dc" }}>
                {t("wms.cta.title")}
              </h2>
              <p className="text-slate-700 md:text-lg">{t("wms.cta.subtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="text-white" style={{ backgroundColor: "#63b2dc" }}>
                  <Link href="/#contact">{t("wms.cta.getStarted")}</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-transparent hover:text-white"
                  style={{ borderColor: "#63b2dc", color: "#63b2dc" }}
                >
                  <Link href="/api-documentation">{t("wms.cta.viewApiDocs")}</Link>
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
