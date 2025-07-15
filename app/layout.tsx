import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MMcore',
  description: 'Seamless Logistics & Fulfillment Solutions',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
