"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Mail,
  MapPin,
  Globe,
  Package,
  Truck,
  Landmark,
  Settings,
  Warehouse,
  Box,
  Phone,
  Clock,
  Send,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { ServiceCard } from "@/components/service-card"

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    sector: "",
    message: "",
  })
  const [status, setStatus] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, sector: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Simulate form submission
    console.log("Form submitted:", formData)
    setStatus("Your message has been sent successfully!")
    setFormData({ firstName: "", lastName: "", email: "", companyName: "", sector: "", message: "" }) // Clear form
    setTimeout(() => setStatus(null), 5000) // Clear status after 5 seconds
  }

  return (
    <Card className="p-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Stuur ons een bericht</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">Voornaam *</Label>
            <Input
              id="firstName"
              placeholder="Je voornaam"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Achternaam *</Label>
            <Input
              id="lastName"
              placeholder="Je achternaam"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">E-mailadres *</Label>
          <Input
            id="email"
            type="email"
            placeholder="je@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="companyName">Bedrijfsnaam</Label>
            <Input id="companyName" placeholder="Je bedrijf" value={formData.companyName} onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sector">Sector</Label>
            <Select onValueChange={handleSelectChange} value={formData.sector}>
              <SelectTrigger id="sector">
                <SelectValue placeholder="Selecteer sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="logistics">Logistics</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">Bericht *</Label>
          <Textarea
            id="message"
            placeholder="Vertel ons over je project of vraag..."
            className="min-h-[120px]"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Send className="mr-2 h-4 w-4" /> Verstuur bericht
        </Button>
        {status && <p className="text-center text-sm text-green-600 mt-2">{status}</p>}
      </form>
    </Card>
  )
}

const services = [
  {
    icon: Package,
    title: "3PL Partner Search",
    description: "Matching businesses with reliable fulfilment and logistics partners.",
    tag: "Logistics",
  },
  {
    icon: Box,
    title: "ECommerce Fulfillment",
    description: "Fast and efficient order processing, pick, pack & ship services.",
    tag: "E-commerce",
  },
  {
    icon: Warehouse,
    title: "Warehousing Connections",
    description: "Secure, scalable, and cost-effective warehousing solutions.",
    tag: "Storage",
  },
  {
    icon: Truck,
    title: "Shipping & Freight Solutions",
    description: "Smooth and cost-efficient transportation via air, sea, and road.",
    tag: "Transport",
  },
  {
    icon: Landmark,
    title: "Customs Clearance & Compliance",
    description: "Ensuring smooth and compliant international trade procedures.",
    tag: "Customs",
  },
  {
    icon: Settings,
    title: "Customizing Your Supply Chain Needs",
    description: "Tailored supply chain solutions for seamless operations and cost savings.",
    tag: "Consulting",
  },
  {
    icon: Truck, // Reusing Truck icon for TMS
    title: "Transport Management System (TMS)",
    description: "Optimize and streamline your shipping and transportation needs.",
    tag: "Software",
  },
  {
    icon: Warehouse, // Reusing Warehouse icon for WMS
    title: "Warehouse Management System (WMS)",
    description: "Optimize inventory management and enhance warehouse efficiency.",
    tag: "Software",
  },
]

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="#" className="flex items-center justify-center">
          <Image
            src="/mmcore_transparent.png"
            alt="MMCore Logo"
            width={150}
            height={40}
            className="h-8 w-auto"
            priority
          />
          <span className="sr-only">MMCore</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {["home", "services", "about", "contact"].map((id) => (
            <Link
              key={id}
              href={`#${id}`}
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-blue-400 text-primary-foreground"
        >
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                Seamless Logistics & Fulfillment Solutions Across Europe and the UK
              </h1>
              <p className="mx-auto max-w-[800px] text-lg md:text-xl">
                Welcome to MMCore, your trusted partner in logistics and supply chain solutions. Based in the
                Netherlands, we specialize in connecting brands, manufacturers, and logistics providers with the right
                partners for e-commerce fulfilment, warehousing, shipping, air cargo, and customs clearance. This to
                ensuring efficiency at every stage.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="#contact">
                  <Button className="bg-white text-primary hover:bg-gray-100">Let's Connect</Button>
                </Link>
                <Link href="#services">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-8 md:py-16 lg:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Your Trusted Partner in Logistics
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  With our extensive 3PL and 4PL network across Europe and the UK, we help businesses streamline
                  operations, reduce costs, and improve efficiency. Whether you're looking for 3PL or 4PL logistics
                  support, we leverage our strong network across Europe and the UK to find the perfect fit for your
                  business needs.
                </p>
                <p className="text-muted-foreground md:text-lg">
                  With MMCore, you gain a trusted logistics partner that helps streamline your operations, expand your
                  reach, and optimize your supply chain. Let's connect and move your business forward.
                </p>
              </div>
              <div className="flex justify-center">
                <Globe className="h-48 w-48 text-primary" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Comprehensive Solutions
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                MMCore offers a wide range of logistics and supply chain services tailored to your business needs.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  tag={service.tag}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Neem Contact Op</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Klaar om je bedrijf naar het volgende niveau te tillen? Laten we praten over jouw uitdagingen en doelen.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Left Column: Contact Form */}
              <ContactForm />

              {/* Right Column: Contact Details & CTA */}
              <div className="flex flex-col gap-8">
                <Card className="p-6 shadow-lg flex-1">
                  <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Contactgegevens</h3>
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Telefoon</p>
                        <a href="tel:+310612345678" className="text-muted-foreground hover:underline">
                          +31 (0)6 12 34 56 78
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">E-mail</p>
                        <a href="mailto:info@MMCore.eu" className="text-muted-foreground hover:underline">
                          info@MMCore.eu
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Bereikbaarheid</p>
                        <p className="text-muted-foreground">Ma-Vr: 9:00 - 18:00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Locatie</p>
                        <p className="text-muted-foreground">Nederland</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} MMCore B.V. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
