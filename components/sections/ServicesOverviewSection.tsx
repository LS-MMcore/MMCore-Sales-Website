"use client"

import { ServiceCard } from "@/components/service-card"
import { Button } from "@/components/ui/button"
import { Warehouse, Truck, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export default function ServicesOverviewSection() {
  const { t } = useLanguage()

  const services = [
    {
      icon: Warehouse,
      title: t("servicesOverview.wms.title"),
      description: t("servicesOverview.wms.description"),
      tag: t("servicesOverview.wms.tag"),
      href: "/wms",
    },
    {
      icon: Truck,
      title: t("servicesOverview.tms.title"),
      description: t("servicesOverview.tms.description"),
      tag: t("servicesOverview.tms.tag"),
      href: "/tms",
    },
  ]

  return (
    <section id="services-overview" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance"
            style={{ color: "#63b2dc" }}
          >
            {t("servicesOverview.title")}
          </h2>
          <p className="mx-auto max-w-[700px] text-slate-600 text-lg md:text-xl text-pretty">
            {t("servicesOverview.subtitle")}
          </p>
        </div>
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <Link key={index} href={service.href} className="group block">
              <div className="relative">
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  tag={service.tag}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#63b2dc]/0 to-[#63b2dc]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-2 bg-white/90 rounded-full shadow-lg">
                    <ArrowRight className="h-4 w-4" style={{ color: "#63b2dc" }} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
