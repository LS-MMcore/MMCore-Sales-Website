import en from "../messages/en.json"
import nl from "../messages/nl.json"
import de from "../messages/de.json"
import fr from "../messages/fr.json"
import it from "../messages/it.json"

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
