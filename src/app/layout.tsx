import type { Metadata } from 'next';
import Script from 'next/script';
import localFont from 'next/font/local';
import './globals.css';
import { organizationSchema, websiteSchema, localBusinessSchema, toJsonLd } from '@/lib/schema';
import Header from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// Use system font stack with DM Sans loaded via CSS fallback
// Google Fonts import moved to globals.css @import for reliability
const dmSans = localFont({
  src: [
    { path: '../fonts/DMSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/DMSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/DMSans-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/DMSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-dm-sans',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const playfairDisplay = localFont({
  src: [
    { path: '../fonts/PlayfairDisplay-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/PlayfairDisplay-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/PlayfairDisplay-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-playfair',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const metadata: Metadata = {
  title: {
    default: 'New Build Homes Costa Blanca | Modern Properties in Spain',
    template: '%s',
  },
  description: 'Find your dream new build property in Costa Blanca. Modern apartments, villas and townhouses from trusted developers. Expert guidance for international buyers.',
  metadataBase: new URL('https://newbuildhomescostablanca.com'),
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'New Build Homes Costa Blanca',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'New Build Homes Costa Blanca - Modern Properties in Spain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-image.jpg'],
  },
  // NOTE: Do NOT set canonical here — each page.tsx must set its own
  // self-referencing canonical in its metadata.alternates.canonical.
  // Setting a canonical in the root layout causes child pages to inherit
  // the homepage canonical if they forget to override it, which breaks
  // Google indexing ("Google chose different canonical").
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmNoscriptUrl = GTM_ID ? "https://www.googletagmanager.com/ns.html?id=" + GTM_ID : "";

  return (
    <html lang="en" className={`${dmSans.variable} ${playfairDisplay.variable}`} suppressHydrationWarning>
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
      <body className="font-sans antialiased" suppressHydrationWarning>
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
        <CookieConsent />
        {/* Scroll animation observer â tiny, non-blocking, respects prefers-reduced-motion */}
        <Script
          id="scroll-observer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if(!window.matchMedia('(prefers-reduced-motion:reduce)').matches){
                var sel='.animate-on-scroll,.animate-slide-left,.animate-slide-right,.animate-scale,.image-reveal';
                var o=new IntersectionObserver(function(e){e.forEach(function(i){
                  if(i.isIntersecting){i.target.classList.add('is-visible');o.unobserve(i.target)}
                })},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
                document.querySelectorAll(sel).forEach(function(el){o.observe(el)});
                document.documentElement.classList.add('scroll-animations-ready');
                new MutationObserver(function(m){m.forEach(function(r){r.addedNodes.forEach(function(n){
                  if(n.nodeType===1){
                    if(n.classList&&(n.classList.contains('animate-on-scroll')||n.classList.contains('animate-slide-left')||n.classList.contains('animate-slide-right')||n.classList.contains('animate-scale')||n.classList.contains('image-reveal')))o.observe(n);
                    n.querySelectorAll&&n.querySelectorAll(sel).forEach(function(el){o.observe(el)});
                  }
                })})}).observe(document.body,{childList:true,subtree:true});
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
