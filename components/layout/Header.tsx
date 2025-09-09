"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Globe, ChevronDown, Warehouse, Truck } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import type { Locale } from "@/lib/translations"

const languages = [
  { code: "en" as Locale, name: "English", flag: "🇺🇸" },
  { code: "nl" as Locale, name: "Nederlands", flag: "🇳🇱" },
  { code: "de" as Locale, name: "Deutsch", flag: "🇩🇪" },
  { code: "fr" as Locale, name: "Français", flag: "🇫🇷" },
  { code: "it" as Locale, name: "Italiano", flag: "🇮🇹" },
  { code: "es" as Locale, name: "Español", flag: "🇪🇸" },
  { code: "cn" as Locale, name: "中文", flag: "🇨🇳" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()
  const { locale, setLocale, t } = useLanguage()

  const isActive = (path: string) => {
    return pathname === path
  }

  const isServicesActive = () => {
    return pathname === "/services" || pathname === "/wms" || pathname === "/tms"
  }

  const navItems = [
    { href: "/", label: t("navigation.home") },
    { href: "/services", label: t("navigation.services") },
    { href: "/tracking", label: t("navigation.tracking") },
    { href: "/faq", label: "FAQ" },
    { href: "/api-documentation", label: t("navigation.apiDocs") },
    { href: "/#contact", label: t("navigation.contact") },
  ]

  const servicesItems = [
    {
      href: "/wms",
      label: "WMS",
      description: "Warehouse Management System",
      icon: Warehouse,
    },
    {
      href: "/tms",
      label: "TMS",
      description: "Transport Management System",
      icon: Truck,
    },
  ]

  const handleLanguageChange = (langCode: Locale) => {
    setLocale(langCode)
  }

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0]

  return (
    <header className="fixed w-full top-0 z-50 bg-card border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center py-2">
          <Link href="/">
            <Image src="./mmcore_slogan.png" alt="Company Logo" width={150} height={60} priority />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 h-full">
          <DropdownMenu open={servicesOpen} onOpenChange={setServicesOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className={`relative h-full flex items-center px-3 lg:px-2 group gap-1 touch-manipulation ${isServicesActive()
                  ? "text-primary font-semibold"
                  : "text-foreground hover:text-primary transition-colors"
                  }`}
              >
                {t("navigation.services")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                />
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isServicesActive() ? "scale-x-100" : ""
                    }`}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-64 p-2">
              {servicesItems.map(({ href, label, description, icon: Icon }) => (
                <DropdownMenuItem key={href} asChild className="p-0">
                  <Link
                    href={href}
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors touch-manipulation"
                  >
                    <div className="p-2 rounded-lg" style={{ backgroundColor: "#63b2dc20" }}>
                      <Icon className="h-4 w-4" style={{ color: "#63b2dc" }} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{label}</span>
                      <span className="text-sm text-muted-foreground">{description}</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navItems.slice(2).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative h-full flex items-center px-3 lg:px-2 group touch-manipulation ${isActive(href) ? "text-primary font-semibold" : "text-foreground hover:text-primary transition-colors"
                }`}
            >
              {label}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive(href) ? "scale-x-100" : ""
                  }`}
              />
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white hidden sm:flex">
            <Link href="/portal" className="touch-manipulation min-h-[44px] px-4">
              {t("navigation.portalLogin")}
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent touch-manipulation min-h-[44px] px-3">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline md:hidden lg:inline">{currentLanguage.name}</span>
                <span className="sm:hidden md:inline lg:hidden">{currentLanguage.flag}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="gap-2 touch-manipulation"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-2 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-lg animate-fade-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-3 py-2">
              <div className="text-sm font-medium text-muted-foreground mb-2">{t("navigation.services")}</div>
              {servicesItems.map(({ href, label, description, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors touch-manipulation min-h-[48px]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="p-1.5 rounded-md" style={{ backgroundColor: "#63b2dc20" }}>
                    <Icon className="h-3 w-3" style={{ color: "#63b2dc" }} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{label}</span>
                    <span className="text-xs text-muted-foreground">{description}</span>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="https://mmcore.tech"
              target="_blank"
              className="block px-3 py-3 rounded-md text-base font-medium text-white text-center touch-manipulation min-h-[48px] flex items-center justify-center mx-2 mb-2"
              style={{ backgroundColor: "#63b2dc" }}
              onClick={() => setIsOpen(false)}
            >
              {t("navigation.portalLogin")}
            </Link>

            {navItems.slice(2).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block px-3 py-3 rounded-md text-base font-medium touch-manipulation min-h-[48px] flex items-center ${isActive(href) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
