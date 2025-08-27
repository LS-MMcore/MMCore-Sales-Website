"use client"

import { ServiceCard } from "@/components/service-card"
import { Button } from "@/components/ui/button"
import { Package, Box, Warehouse, Truck } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export default function AboutSection() {
  const { t } = useLanguage()

  const services = [
    {
      icon: Package,
      title: t("about.multiCarrier.title"),
      description: t("about.multiCarrier.description"),
      tag: "Integration",
    },
    {
      icon: Box,
      title: t("about.realTimeTracking.title"),
      description: t("about.realTimeTracking.description"),
      tag: "Tracking",
    },
    {
      icon: Warehouse,
      title: t("about.customsSupport.title"),
      description: t("about.customsSupport.description"),
      tag: "Customs",
    },
    {
      icon: Truck,
      title: t("about.billingReconciliation.title"),
      description: t("about.billingReconciliation.description"),
      tag: "Billing",
    },
  ]

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("about.title")}</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t("about.subtitle")}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/services">{t("about.learnMore")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
