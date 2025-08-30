"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Globe } from "lucide-react"
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
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { locale, setLocale, t } = useLanguage()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { href: "/", label: t("navigation.home") },
    { href: "/tracking", label: t("navigation.tracking") },
    { href: "/services", label: t("navigation.services") },
    { href: "/api-docs", label: t("navigation.apiDocs") },
    { href: "/#contact", label: t("navigation.contact") },
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

        <div className="hidden md:flex items-center space-x-8 h-full">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative h-full flex items-center px-2 group ${isActive(href) ? "text-primary font-semibold" : "text-foreground hover:text-primary transition-colors"
                }`}
            >
              {label}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive(href) ? "scale-x-100" : ""
                  }`}
              />
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{currentLanguage.name}</span>
                <span className="sm:hidden">{currentLanguage.flag}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)} className="gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="md:hidden flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{currentLanguage.name}</span>
                <span className="sm:hidden">{currentLanguage.flag}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)} className="gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <button onClick={() => setIsOpen(!isOpen)} className="text-foreground">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-lg animate-fade-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(href) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
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
