"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { type Locale, getTranslation } from "../lib/translations"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = "lng"

function readInitialLocale(): Locale {
  // 1) URL ?lng=xx wins
  if (typeof window !== "undefined") {
    const urlLng = new URLSearchParams(window.location.search).get("lng")
    if (urlLng && ["en", "nl", "de", "fr", "it"].includes(urlLng)) {
      return urlLng as Locale
    }
    // 2) localStorage
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && ["en", "nl", "de", "fr", "it"].includes(stored)) {
      return stored as Locale
    }
    // 3) cookie
    const m = document.cookie.match(/(?:^|;\s*)lng=([^;]+)/)
    if (m && ["en", "nl", "de", "fr", "it"].includes(m[1])) {
      return m[1] as Locale
    }
  }
  // 4) fallback
  return "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, _setLocale] = useState<Locale>(readInitialLocale)

  // persist and update <html lang="...">
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch { }
    try {
      document.cookie = `lng=${locale}; path=/; max-age=31536000; samesite=lax`
    } catch { }
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale
    }
  }, [locale])

  const setLocale = (lng: Locale) => {
    _setLocale(lng)
    // persistence handled by the effect above
  }

  const t = useMemo(() => (key: string) => getTranslation(locale, key), [locale])

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
