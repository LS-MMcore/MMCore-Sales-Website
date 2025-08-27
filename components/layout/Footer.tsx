"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} MMCore B.V. {t("footer.allRightsReserved")}
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="https://mmcore.tech/AlgemeneVoorwaarden" className="text-xs hover:underline underline-offset-4">
          {t("footer.termsOfService")}
        </Link>
        <Link
          href="https://mmcore.tech/AlgemeneVoorwaarden?pb=c4ca4238a0b923820dcc509a6f75849b"
          className="text-xs hover:underline underline-offset-4"
        >
          {t("footer.privacyPolicy")}
        </Link>
      </nav>
    </footer>
  )
}
