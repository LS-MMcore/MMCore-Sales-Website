import en from "../translations/en.json"
import nl from "../translations/nl.json"
import de from "../translations/de.json"
import fr from "../translations/fr.json"
import it from "../translations/it.json"

export type Locale = "en" | "nl" | "de" | "fr" | "it"

export const translations = {
  en,
  nl,
  de,
  fr,
  it,
}

export const locales: Locale[] = ["en", "nl", "de", "fr", "it"]

export const localeNames = {
  en: "English",
  nl: "Nederlands",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
}

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split(".")
  let value: any = translations[locale]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
