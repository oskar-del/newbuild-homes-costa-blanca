import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { organizationSchema, websiteSchema, localBusinessSchema, toJsonLd } from '@/lib/schema';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  title: {
    default: 'New Build Homes Costa Blanca | Modern Properties in Spain',
    template: '%s | New Build Homes Costa Blanca',
  },
  description: 'Find your dream new build property in Costa Blanca. Modern apartments, villas and townhouses from trusted developers. Expert guidance for international buyers.',
  metadataBase: new URL('https://newbuildhomescostablanca.com'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'New Build Homes Costa Blanca',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmNoscriptUrl = GTM_ID ? "https://www.googletagmanager.com/ns.html?id=" + GTM_ID : "";
  
  return (
    <html lang="en">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(websiteSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(localBusinessSchema()) }}
        />
      </head>
      <body className="font-sans">
        {GTM_ID && (
          <noscript>
            <iframe
              src={gtmNoscriptUrl}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        
        <Header />
        
        <form name="lead-inquiry" data-netlify="true" netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <textarea name="message" />
          <input type="text" name="property-interest" />
        </form>
        <form name="sidebar-inquiry" data-netlify="true" netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <input type="text" name="property-interest" />
        </form>
        
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
