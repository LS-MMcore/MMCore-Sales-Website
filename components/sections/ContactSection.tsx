"use client"

import { Card } from "@/components/ui/card"
import { Mail, Truck, Warehouse, Headphones, Sparkles, Zap, Shield } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

function ContactForm() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    enquiry: "",
    message: "",
  })
  const [status, setStatus] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, enquiry: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Simulate form submission
    console.log("Form submitted:", formData)
    setStatus("Your message has been sent successfully!")
    setFormData({ firstName: "", lastName: "", email: "", companyName: "", enquiry: "", message: "" }) // Clear form
    setTimeout(() => setStatus(null), 5000) // Clear status after 5 seconds
  }

  return (
    <Card className="p-8 shadow-2xl bg-white border-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#63b2dc]/5 via-transparent to-[#63b2dc]/10"></div>
      <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-[#63b2dc] via-blue-500 to-[#63b2dc] rounded-lg opacity-20 blur-sm"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#63b2dc]/10 rounded-full">
            <Sparkles className="h-6 w-6 text-[#63b2dc]" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{t("contact.form.title")}</h3>
        </div>
        <p className="text-gray-600 mb-8">{t("contact.form.subtitle")}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-700 font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-[#63b2dc] rounded-full"></div>
                {t("contact.form.name")} *
              </Label>
              <Input
                id="firstName"
                placeholder={t("contact.form.namePlaceholder")}
                value={formData.firstName}
                onChange={handleChange}
                required
                className="border-2 border-gray-200 focus:border-[#63b2dc] focus:ring-2 focus:ring-[#63b2dc]/20 transition-all duration-200 h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-700 font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-[#63b2dc] rounded-full"></div>
                {t("contact.form.lastName")} *
              </Label>
              <Input
                id="lastName"
                placeholder={t("contact.form.lastNamePlaceholder")}
                value={formData.lastName}
                onChange={handleChange}
                required
                className="border-2 border-gray-200 focus:border-[#63b2dc] focus:ring-2 focus:ring-[#63b2dc]/20 transition-all duration-200 h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
              <div className="w-2 h-2 bg-[#63b2dc] rounded-full"></div>
              {t("contact.form.email")} *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t("contact.form.emailPlaceholder")}
              value={formData.email}
              onChange={handleChange}
              required
              className="border-2 border-gray-200 focus:border-[#63b2dc] focus:ring-2 focus:ring-[#63b2dc]/20 transition-all duration-200 h-12"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-gray-700 font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                {t("contact.form.company")}
              </Label>
              <Input
                id="companyName"
                placeholder={t("contact.form.companyPlaceholder")}
                value={formData.companyName}
                onChange={handleChange}
                className="border-2 border-gray-200 focus:border-[#63b2dc] focus:ring-2 focus:ring-[#63b2dc]/20 transition-all duration-200 h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enquiry" className="text-gray-700 font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                {t("contact.form.enquiry")}
              </Label>
              <Select onValueChange={handleSelectChange} value={formData.enquiry}>
                <SelectTrigger
                  id="enquiry"
                  className="border-2 border-gray-200 focus:border-[#63b2dc] focus:ring-2 focus:ring-[#63b2dc]/20 transition-all duration-200 h-12"
                >
                  <SelectValue placeholder={t("contact.form.selectEnquiry")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">{t("contact.form.enquiryOptions.sales")}</SelectItem>
                  <SelectItem value="support">{t("contact.form.enquiryOptions.support")}</SelectItem>
                  <SelectItem value="technical">{t("contact.form.enquiryOptions.technical")}</SelectItem>
                  <SelectItem value="partnership">{t("contact.form.enquiryOptions.partnership")}</SelectItem>
                  <SelectItem value="billing">{t("contact.form.enquiryOptions.billing")}</SelectItem>
                  <SelectItem value="demo">{t("contact.form.enquiryOptions.demo")}</SelectItem>
                  <SelectItem value="other">{t("contact.form.enquiryOptions.other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-gray-700 font-medium flex items-center gap-2">
              <div className="w-2 h-2 bg-[#63b2dc] rounded-full"></div>
              {t("contact.form.message")} *
            </Label>
            <Textarea
              id="message"
              placeholder={t("contact.form.messagePlaceholder")}
              className="min-h-[140px] border-2 border-gray-200 focus:border-[#63b2dc] focus:ring-2 focus:ring-[#63b2dc]/20 transition-all duration-200 resize-none"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#63b2dc] to-blue-500 text-white hover:from-[#5aa3cc] hover:to-blue-600 transition-all duration-200 h-14 text-lg font-semibold shadow-lg hover:shadow-xl"
          >
            <Send className="mr-3 h-5 w-5" /> {t("contact.form.submit")}
            <Zap className="ml-3 h-5 w-5" />
          </Button>

          {status && (
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium">{status}</p>
            </div>
          )}
        </form>
      </div>
    </Card>
  )
}

export default function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="w-full py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#63b2dc] via-transparent to-blue-500"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(99,178,220,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(99,178,220,0.1),transparent_50%)]"></div>
      </div>

      <div className="container px-4 md:px-6 text-center relative z-10">
        <div className="space-y-6 mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-[#63b2dc]" />
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900">
              {t("contact.title")}
            </h2>
          </div>
          <p className="mx-auto max-w-[800px] text-gray-600 text-xl leading-relaxed">{t("contact.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-[#63b2dc] to-blue-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <Truck className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-3">TMS</div>
            <div className="text-white/90 text-lg">Transport Management System</div>
            <div className="text-white/80 text-sm mt-2">Complete transportation planning and execution</div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-blue-500 to-[#63b2dc] text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <Warehouse className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-3">WMS</div>
            <div className="text-white/90 text-lg">Warehouse Management System</div>
            <div className="text-white/80 text-sm mt-2">Optimize inventory and warehouse operations</div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-[#63b2dc] to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <Headphones className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-3">24/7 Support</div>
            <div className="text-white/90 text-lg">Round-the-clock assistance</div>
            <div className="text-white/80 text-sm mt-2">Expert support whenever you need it</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <ContactForm />

          <div className="flex flex-col gap-8">
            <Card className="p-8 shadow-xl bg-white border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-[#63b2dc]/10 rounded-full">
                  <Mail className="h-6 w-6 text-[#63b2dc]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t("contact.info.title")}</h3>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-500 p-4 rounded-xl shadow-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-xl text-gray-900 mb-2">{t("contact.info.email")}</p>
                    <a
                      href="mailto:info@mmcore.eu"
                      className="text-[#63b2dc] hover:text-blue-600 transition-colors text-lg font-medium"
                    >
                      info@mmcore.eu
                    </a>
                    <p className="text-sm text-gray-500 mt-2">{t("contact.info.emailDesc")}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <Zap className="h-6 w-6 text-[#63b2dc]" />
                {t("contact.quickLinks.title")}
              </h3>
              <div className="space-y-4">
                <a
                  href="/api-docs"
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 hover:text-[#63b2dc] group"
                >
                  <span className="text-2xl">{t("contact.quickLinks.apiIcon")}</span>
                  <span className="font-medium text-lg group-hover:translate-x-1 transition-transform">
                    {t("contact.quickLinks.api")}
                  </span>
                </a>
                <a
                  href="/services"
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 hover:text-[#63b2dc] group"
                >
                  <span className="text-2xl">{t("contact.quickLinks.featuresIcon")}</span>
                  <span className="font-medium text-lg group-hover:translate-x-1 transition-transform">
                    {t("contact.quickLinks.features")}
                  </span>
                </a>
                <a
                  href="/tracking"
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 hover:text-[#63b2dc] group"
                >
                  <span className="text-2xl">{t("contact.quickLinks.trackingIcon")}</span>
                  <span className="font-medium text-lg group-hover:translate-x-1 transition-transform">
                    {t("contact.quickLinks.tracking")}
                  </span>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
