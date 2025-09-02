import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
