const fs = require('fs');

const content = `# BUILD RULES - MANDATORY FOR EVERY FILE

**READ THIS BEFORE CREATING ANY CODE**

## The Mission
XML feed → AI-unique content → Schema-rich pages → SEO traffic → Leads

## Critical Understanding
1. XML feed text is DUPLICATE across 50+ agent sites
2. ALL content must be AI-transformed to be unique
3. Every page needs FULL schema hierarchy
4. This is a lead-gen site - visitors must CONTACT for pricing

---

## SCHEMA HIERARCHY (Every Page Must Follow)

### Development Pages (ApartmentComplex)
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  "name": "[Development Name]",
  "description": "[UNIQUE AI-generated description]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street]",
    "addressLocality": "[Town]",
    "addressRegion": "Alicante",
    "postalCode": "[Code]",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[Lat]",
    "longitude": "[Lng]"
  },
  "numberOfAccommodationUnits": [Total],
  "numberOfAvailableAccommodationUnits": [Available],
  "amenityFeature": [
    {"@type": "LocationFeatureSpecification", "name": "Pool"},
    {"@type": "LocationFeatureSpecification", "name": "Parking"}
  ],
  "containsPlace": [References to Apartment units]
}
\`\`\`

### Listing Pages (RealEstateListing + Apartment)
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "[Listing Title]",
  "datePosted": "[ISO Date]",
  "mainEntity": {
    "@type": "Apartment",
    "name": "[Unit Name]",
    "numberOfBedrooms": [Int],
    "numberOfBathroomsTotal": [Int],
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": [Size],
      "unitCode": "MTK"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "[Town]",
      "addressCountry": "ES"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/PreSale",
      "price": [Price],
      "priceCurrency": "EUR",
      "seller": {
        "@type": "RealEstateAgent",
        "name": "New Build Homes Costa Blanca",
        "telephone": "+34634044970"
      }
    }
  }
}
\`\`\`

### FAQPage (Required on ALL pages)
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer - MUST start with direct statement for voice search]"
      }
    }
  ]
}
\`\`\`

### BreadcrumbList (Required on ALL pages)
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://newbuildhomescostablanca.com"},
    {"@type": "ListItem", "position": 2, "name": "[Section]", "item": "https://newbuildhomescostablanca.com/[section]"},
    {"@type": "ListItem", "position": 3, "name": "[Page]", "item": "https://newbuildhomescostablanca.com/[section]/[page]"}
  ]
}
\`\`\`

### Organization (Site-wide, in layout)
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "New Build Homes Costa Blanca",
  "url": "https://newbuildhomescostablanca.com",
  "telephone": "+34634044970",
  "email": "oskar@hanssonhertzell.com",
  "areaServed": ["Costa Blanca", "Alicante", "Torrevieja", "Javea", "Orihuela Costa"],
  "priceRange": "€€€"
}
\`\`\`

---

## PAGE REQUIREMENTS CHECKLIST

### Every Page MUST Have:
- [ ] generateMetadata() with unique title (50-60 chars)
- [ ] generateMetadata() with unique description (150-160 chars)
- [ ] revalidate = 3600 for ISR
- [ ] BreadcrumbList schema
- [ ] FAQPage schema (minimum 5 questions)
- [ ] Primary schema for page type
- [ ] Mobile-responsive design
- [ ] All CTAs present

### Development Pages MUST Have:
- [ ] ApartmentComplex schema
- [ ] FAQPage schema (8-10 questions)
- [ ] BreadcrumbList schema
- [ ] Unique AI-generated description (NOT from feed)
- [ ] Property listings
- [ ] Image gallery
- [ ] WhatsApp CTA
- [ ] Phone CTA
- [ ] Habeno mortgage CTA

### Builder Pages MUST Have:
- [ ] Organization schema
- [ ] FAQPage schema
- [ ] BreadcrumbList schema
- [ ] List of developments
- [ ] Unique description

### Area Pages MUST Have:
- [ ] Place schema with geo coordinates
- [ ] FAQPage schema
- [ ] BreadcrumbList schema
- [ ] sameAs link to Wikidata if available
- [ ] Properties in area

---

## CTAs - EXACT LINKS (Use These Always)

WhatsApp: https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0
Phone: +34 634 044 970
Habeno Mortgage: https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e

---

## CONTENT RULES

1. NEVER use raw XML feed descriptions - always AI-transform
2. Every H1 must be unique
3. Every meta description must be unique
4. FAQ answers MUST start with direct statement (voice search)
5. Include location in titles where relevant
6. Use PreSale or PreOrder for new builds (not InStock)

---

## TECHNICAL RULES

1. SSR/ISR only - no client-side data fetching for main content
2. All images use next/image with priority on hero
3. Lazy load heavy components (video tours, 3D)
4. JSON-LD in <head> via generateMetadata or script tag
5. Validate schema with Google Rich Results Test

---

## BEFORE COMMIT CHECKLIST

Run: node verify-build.js

All checks must pass:
- [ ] Every page has generateMetadata()
- [ ] Every page has schema markup
- [ ] Every page has BreadcrumbList
- [ ] Every page has FAQPage
- [ ] All CTAs present
- [ ] No hardcoded sample data
- [ ] Content is unique (not raw feed text)

If ANY check fails, DO NOT commit.
`;

fs.writeFileSync('BUILD_RULES.md', content);
console.log('BUILD_RULES.md created');
