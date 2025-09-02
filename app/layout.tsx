import type React from "react"
import type { Metadata } from "next"
import { LanguageProvider } from "@/contexts/LanguageContext"
import "./globals.css"

export const metadata: Metadata = {
  title: 'MMCore',
  description: 'MMcore',
  icons: {
    icon: "/favicon.ico", 
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./orb.png" />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
