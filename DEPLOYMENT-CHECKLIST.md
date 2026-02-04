# Deployment Checklist - New Build Homes Costa Blanca

## What Was Fixed/Added Today

### 1. Homepage Guide Cards
- Fixed 3 guide card images that weren't displaying (now using Unsplash)

### 2. Why Buy New Build Guide
- Fixed CTA boxes with hard-to-read colors (changed from teal gradient to solid primary-900)
- Improved FAQ styling for better readability

### 3. Logos Added
- Round logo: `/public/images/logo/logo-round.png` (used in header)
- Horizontal logo: `/public/images/logo/logo-horizontal.png` (used in footer)

### 4. SEO Improvements
- Added OpenGraph and Twitter card meta tags to ALL key pages:
  - Homepage, Developments, Properties, Golf, Areas, Luxury, Contact, About
- Added favicon configuration in layout.tsx
- Created OG image at `/public/images/og-image.jpg`
- Added favicon files (favicon.png, apple-touch-icon.png)

### 5. Sitemap Updated
- Added all 7 guide pages
- Added all 12 golf course pages
- Added missing static pages (about, guides, luxury, properties, inland, finance)

---

## Before Deploying - Required Actions

### Environment Variables (Set in Netlify Dashboard)

**CRITICAL - Must Set:**
```
NEXT_PUBLIC_SITE_URL=https://newbuildhomescostablanca.com
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
AIRTABLE_TABLE_NAME=Leads
```

**RECOMMENDED - For Analytics:**
```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX  (Your Google Tag Manager ID)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  (Your Google Analytics 4 ID)
```

**OPTIONAL - For Email Notifications:**
```
SENDGRID_API_KEY=your_sendgrid_key
NOTIFICATION_EMAIL=leads@newbuildhomescostablanca.com
```

**REMOVE FROM PRODUCTION:**
```
NODE_TLS_REJECT_UNAUTHORIZED=0  (Security risk - remove this!)
```

---

## Google Search Console Setup

1. Go to https://search.google.com/search-console
2. Add property: `https://newbuildhomescostablanca.com`
3. Verify ownership (DNS or HTML tag method)
4. Submit sitemap: `https://newbuildhomescostablanca.com/sitemap.xml`
5. Add the verification code to layout.tsx in the `verification.google` field

---

## GDPR Compliance (Recommended Before Launch)

The site currently has NO cookie consent banner. Before going live in EU:
1. Add a cookie consent tool (CookieBot, OneTrust, Termly, etc.)
2. Only fire GTM/GA4 after user consent
3. Create a proper Privacy Policy page at `/privacy`

---

## Files Added/Modified

### New Files:
- `/public/images/og-image.jpg` - Social sharing image
- `/public/favicon.png` - Favicon
- `/public/apple-touch-icon.png` - Apple touch icon
- `/public/images/logo/logo-round.png` - Round logo
- `/public/images/logo/logo-horizontal.png` - Horizontal logo

### Modified Files:
- `src/app/layout.tsx` - Added favicon, robots, default OG/Twitter
- `src/app/page.tsx` - Full OpenGraph and Twitter cards
- `src/app/sitemap.ts` - Added guides, golf courses, static pages
- `src/app/developments/page.tsx` - Added Twitter cards
- `src/app/properties/page.tsx` - Added OpenGraph and Twitter cards
- `src/app/golf/page.tsx` - Added Twitter cards
- `src/app/areas/page.tsx` - Added OpenGraph and Twitter cards
- `src/app/luxury/page.tsx` - Added Twitter cards
- `src/app/contact/page.tsx` - Added OpenGraph and Twitter cards
- `src/app/about/page.tsx` - Added Twitter cards
- `src/app/guides/why-new-build/page.tsx` - Fixed colors
- `src/components/Header.tsx` - Updated to use round logo
- `src/components/Footer.tsx` - Updated to use horizontal logo

---

## Build Command

```bash
npm run build
```

## Netlify Configuration

Already configured in `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `.next`
- Next.js plugin enabled
- Security headers configured
- Cache headers for static assets

---

## Post-Deployment Checks

1. [ ] Test homepage loads correctly with logo
2. [ ] Test guide page images display
3. [ ] Test form submissions go to Airtable
4. [ ] Test WhatsApp links work
5. [ ] Verify sitemap at /sitemap.xml
6. [ ] Check robots.txt at /robots.txt
7. [ ] Test social sharing (Facebook, Twitter) with OG tags
8. [ ] Submit sitemap to Google Search Console
9. [ ] Set up Google Analytics dashboard
