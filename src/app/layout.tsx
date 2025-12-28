import './globals.css'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: [...siteConfig.seo.keywords],
  robots: {
    index: false, // CHANGE TO TRUE WHEN LAUNCHING ON REAL DOMAIN
    follow: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: siteConfig.name,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
