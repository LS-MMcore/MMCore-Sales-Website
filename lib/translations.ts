import en from "../messages/en.json"
import nl from "../messages/nl.json"
import de from "../messages/de.json"
import fr from "../messages/fr.json"

export type Locale = "en" | "nl" | "de" | "fr"

export const translations = {
  en,
  nl,
  de,
  fr,
}

export const locales: Locale[] = ["en", "nl", "de", "fr"]

export const localeNames = {
  en: "English",
  nl: "Nederlands",
  de: "Deutsch",
  fr: "Français",
}

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split(".")
  let value: any = translations[locale]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
