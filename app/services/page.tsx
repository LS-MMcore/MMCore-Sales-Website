"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Globe, Zap, Shield, BarChart3, Users, CheckCircle, Truck, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { useLanguage } from "@/contexts/LanguageContext"

const carrierList = [
  { name: "PostNL", region: "Netherlands", type: "National" },
  { name: "DHL Netherlands", region: "Netherlands", type: "Express" },
  { name: "DHL Germany", region: "Germany", type: "Express" },
  { name: "DHL Express", region: "Global", type: "Express" },
  { name: "FedEx", region: "Global", type: "Express" },
  { name: "Deutsche Post", region: "Germany", type: "National" },
  { name: "bPost", region: "Belgium", type: "National" },
  { name: "DPD Netherlands", region: "Netherlands", type: "Parcel" },
  { name: "DPD Germany", region: "Germany", type: "Parcel" },
  { name: "DPD Austria", region: "Austria", type: "Parcel" },
  { name: "DPD UK", region: "United Kingdom", type: "Parcel" },
  { name: "GLS Netherlands", region: "Netherlands", type: "Parcel" },
  { name: "GLS Denmark", region: "Denmark", type: "Parcel" },
  { name: "GLS Slovenia", region: "Slovenia", type: "Parcel" },
  { name: "PostNord", region: "Nordic", type: "National" },
  { name: "Helthjem", region: "Norway", type: "National" },
  { name: "Earlybird", region: "Europe", type: "Express" },
  { name: "Hermes Europe", region: "Europe", type: "Parcel" },
  { name: "Hermes UK", region: "United Kingdom", type: "Parcel" },
  { name: "Colissimo France", region: "France", type: "National" },
  { name: "Colis Privé", region: "France", type: "Parcel" },
  { name: "Correos", region: "Spain", type: "National" },
  { name: "SwissLynx", region: "Switzerland", type: "Express" },
  { name: "Global Mail", region: "Global", type: "Mail" },
  { name: "UPS", region: "Global", type: "Express" },
  { name: "Skynet Worldwide", region: "Global", type: "Express" },
]

const advantages = {
  operational: [
    "Status reports comparing promised vs actual transit times",
    "Direct carrier customer support communication",
    "Comprehensive track & trace functionality",
    "Multiple parcel injection points per country",
    "Automatic email notifications for shipments",
    "Industrial printer compatibility (.ZPL format)",
  ],
  financial: [
    "Flexible tariff management (platform or custom)",
    "Real-time billing reconciliation",
    "Automatic weight discrepancy detection",
    "Immediate billing error correction",
    "Cost optimization tools",
    "Financial reporting and analytics",
  ],
  sales: [
    "Multi-carrier flexibility for best rates",
    "No interference with existing contracts",
    "Custom carrier contract integration",
    "Multi-location shipping support",
    "Country-specific local injection",
    "Superior return network coverage",
  ],
}

export default function ServicesPage() {
  const { t } = useLanguage()

  const platformFeatures = [
    {
      icon: Globe,
      title: t("services.platformCapabilities.apiIntegration.title"),
      description: t("services.platformCapabilities.apiIntegration.description"),
      benefits: ["No long-term contracts", "Immediate activation", "Direct API connection"],
    },
    {
      icon: Zap,
      title: t("services.platformCapabilities.customsSupport.title"),
      description: t("services.platformCapabilities.customsSupport.description"),
      benefits: ["Webshop plugins available", "Custom front-end support", "Automated data exchange"],
    },
    {
      icon: Shield,
      title: t("services.platformCapabilities.billingReconciliation.title"),
      description: t("services.platformCapabilities.billingReconciliation.description"),
      benefits: ["Cross-border shipping", "Legal compliance", "Automated data deletion"],
    },
    {
      icon: BarChart3,
      title: t("services.platformCapabilities.cloudBased.title"),
      description: t("services.platformCapabilities.cloudBased.description"),
      benefits: ["Invoice verification", "Billing error detection", "Cost management"],
    },
  ]

  const carrierStats = [
    {
      icon: Globe,
      label: t("services.carrierNetwork.stats.countriesLabel"),
      value: t("services.carrierNetwork.stats.countries"),
    },
    {
      icon: Truck,
      label: t("services.carrierNetwork.stats.carriersLabel"),
      value: t("services.carrierNetwork.stats.carriers"),
    },
    { icon: MapPin, label: "Injection Points", value: "200+" },
    {
      icon: Clock,
      label: t("services.carrierNetwork.stats.uptimeLabel"),
      value: t("services.carrierNetwork.stats.uptime"),
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-16">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#63b2dc]/10 via-[#63b2dc]/20 to-background">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl" style={{ color: "#63b2dc" }}>
                {t("services.title")}
              </h1>
              <p className="mx-auto max-w-[800px] text-slate-700 text-lg md:text-xl">{t("services.description")}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                  35+ Carriers
                </Badge>
                <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                  50+ Countries
                </Badge>
                <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                  Cloud-Based
                </Badge>
                <Badge variant="default" className="text-sm" style={{ backgroundColor: "#63b2dc" }}>
                  GDPR Compliant
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="w-full py-12 md:py-24 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-800">
                {t("services.platformCapabilities.title")}
              </h2>
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-lg">
                Everything you need to streamline your logistics operations
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
              {platformFeatures.map((feature, index) => (
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

        {/* Advantages Section */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-800">
                {t("services.keyAdvantages.title")}
              </h2>
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-lg">
                Delivering tangible benefits across operational, financial, and commercial areas
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              <Card className="border-[#63b2dc]/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" style={{ color: "#63b2dc" }} />
                    <span className="text-slate-800">{t("services.keyAdvantages.operational")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {advantages.operational.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#63b2dc" }} />
                        <span className="text-sm text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#63b2dc]/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" style={{ color: "#63b2dc" }} />
                    <span className="text-slate-800">{t("services.keyAdvantages.financial")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {advantages.financial.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#63b2dc" }} />
                        <span className="text-sm text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#63b2dc]/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" style={{ color: "#63b2dc" }} />
                    <span className="text-slate-800">{t("services.keyAdvantages.sales")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {advantages.sales.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#63b2dc" }} />
                        <span className="text-sm text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Carriers Section */}
        <section
          className="w-full py-12 md:py-24 text-white"
          style={{ background: `linear-gradient(135deg, #63b2dc 0%, #4a9bc7 50%, #3684b2 100%)` }}
        >
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                {t("services.carrierNetwork.title")}
              </h2>
              <p className="mx-auto max-w-[700px] text-white/90 md:text-lg">{t("services.carrierNetwork.subtitle")}</p>
            </div>

            {/* Carrier Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              {carrierStats.map((stat, idx) => (
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

            {/* Carriers Grid */}
            <Card className="max-w-6xl mx-auto bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Currently Integrated Carriers</CardTitle>
                <CardDescription className="text-slate-600">
                  Choose the best carrier for every shipment based on delivery time, pricing, and region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {carrierList.map((carrier, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-[#63b2dc]/5 transition-colors"
                      style={{ borderColor: "#63b2dc40" }}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-800">{carrier.name}</span>
                        <span className="text-sm text-slate-600">{carrier.region}</span>
                      </div>
                      <Badge variant="outline" className="text-xs" style={{ borderColor: "#63b2dc", color: "#63b2dc" }}>
                        {carrier.type}
                      </Badge>
                    </div>
                  ))}
                  <div
                    className="flex items-center justify-center p-3 border rounded-lg"
                    style={{ borderColor: "#63b2dc40", backgroundColor: "#63b2dc10" }}
                  >
                    <span className="font-medium" style={{ color: "#63b2dc" }}>
                      And many more...
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24" style={{ backgroundColor: "#63b2dc10" }}>
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl" style={{ color: "#63b2dc" }}>
                {t("services.readyToOptimize")}
              </h2>
              <p className="text-slate-700 md:text-lg">
                Get started with our multi-carrier platform and streamline your shipping operations today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="text-white" style={{ backgroundColor: "#63b2dc" }}>
                  <Link href="/#contact">{t("services.getStarted")}</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-transparent hover:text-white"
                  style={{ borderColor: "#63b2dc", color: "#63b2dc" }}
                >
                  <Link href="/api-docs">{t("services.apiDocumentation")}</Link>
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
