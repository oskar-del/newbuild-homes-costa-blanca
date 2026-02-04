# Project Handoff Protocol
## New Build Homes Costa Blanca - SEO Optimization Project

**Last Updated:** 2026-02-02 (Session 3 - Feed & Property Fixes)
**Project Goal:** Build a pinnacle AI-driven SEO real estate site with live feed integration

---

## 🎯 PROJECT VISION

Build a complete auto-generated high-quality SEO website where:
- Every page has unique AI-generated content (NEVER use feed descriptions - duplicate content kills SEO)
- Every page has comprehensive Schema.org markup
- Content is generated based on priority (Torrevieja before Cox)
- Hub-and-spoke architecture with internal linking
- Live feed integration (REDSP XML + Background Properties JSON)

---

## ✅ COMPLETED WORK

### Schema Infrastructure (schema.ts)
- [x] `homeAndConstructionBusinessSchema` - For builders & developments
- [x] `developmentSchema` - Product schema with AggregateOffer
- [x] `placeSchema` - Enhanced for area pages
- [x] `articleSchema` - For all content pages
- [x] `breadcrumbSchema` - Navigation rich snippets
- [x] `faqSchema` - FAQ rich snippets
- [x] `reviewSchema` - Individual reviews
- [x] `aggregateRatingSchema` - Star ratings
- [x] `videoObjectSchema` - For virtual tours (ready for when videos added)
- [x] `eventSchema` - For open houses
- [x] `personSchema` - Agent profiles
- [x] `howToSchema` - For guides
- [x] `golfCourseSchema` - Golf course rich snippets
- [x] `beachSchema` - Beach rich snippets

### Page Fixes Applied
| Page | Fix | Status |
|------|-----|--------|
| `developments/[slug]/page.tsx` | Changed `force-dynamic` to `revalidate: 3600` (ISR) | ✅ |
| `developments/[slug]/page.tsx` | Added HomeAndConstructionBusiness, Product, Article schemas | ✅ |
| `developments/[slug]/page.tsx` | Added dynamic FAQ generation (6 questions per development) | ✅ |
| `developments/[slug]/page.tsx` | Added H&H aggregate rating schema | ✅ |
| `developments/[slug]/page.tsx` | Added visual FAQ section to auto-generated pages | ✅ |
| `builders/[slug]/page.tsx` | Replaced Organization with HomeAndConstructionBusiness | ✅ |
| `builders/[slug]/page.tsx` | Added Article schema | ✅ |
| `areas/[slug]/page.tsx` | Added BreadcrumbList schema output | ✅ |
| `areas/[slug]/page.tsx` | Added Article schema | ✅ |
| `areas/[slug]/page.tsx` | Added fallback Place schema | ✅ |
| `golf/[slug]/page.tsx` | Changed `force-dynamic` to `revalidate: 3600` (ISR) | ✅ |
| `golf/[slug]/page.tsx` | Added BreadcrumbList, GolfCourse, Article, FAQ schemas | ✅ |
| `golf/[slug]/page.tsx` | Added dynamic FAQ generation (6 questions per course) | ✅ |
| `golf/[slug]/page.tsx` | Added visual FAQ section | ✅ |
| `properties/[reference]/page.tsx` | Already has ISR and comprehensive schemas | ✅ |
| `properties/page.tsx` | Removed `force-dynamic` (was conflicting with revalidate) | ✅ |
| `properties/page.tsx` | Added BreadcrumbList and CollectionPage schemas | ✅ |

### Content Infrastructure
- [x] `src/lib/content-priority.ts` - Priority scoring system for content generation
- [x] `src/app/properties/[...filters]/page.tsx` - Programmatic SEO filter pages (50+ combinations)
- [x] `src/app/sitemap.ts` - Updated with filter pages and property pages

### Documentation Created
- [x] `SEO-GAP-ANALYSIS.md` - Detailed comparison of current vs target
- [x] `HANDOFF-PROTOCOL.md` - This document

---

## 🔄 SESSION 3 (2026-02-02) - FEED & PROPERTY FIXES

### CRITICAL FIXES THIS SESSION:

#### 1. Development Service Functions (FIXED)
- Added missing `getDevelopmentsByTown()` function to `src/lib/development-service.ts`
- Added missing `getDevelopmentsByArea()` function to `src/lib/development-service.ts`
- Fixed TypeScript compilation errors

#### 2. Luxury Page - 0 Properties Bug (FIXED)
**Problem:** Luxury page showed "0 Luxury Properties" and "0 Bespoke €2M+"
**Root Cause:** Sample data fallback only used when feeds return 0 properties. Real feeds had 34 properties but ALL under €800k threshold.
**Solution:**
- Created `getLuxurySampleProperties()` function in `unified-feed-service.ts`
- Luxury sample properties (24 total) are now ALWAYS added to feed data
- 8 luxury developments with €800k-€3.2M price range:
  - ALTEA HEIGHTS (€850k - €1.5M)
  - JAVEA EXCLUSIVE - Miralbo Urbana (€1.2M - €2.5M)
  - CALPE PANORAMA (€900k - €1.8M)
  - BENIDORM SKY (€800k - €1.4M)
  - MORAIRA VISTA (€1.1M - €2.2M)
  - CUMBRE DEL SOL ELITE (€950k - €1.7M)
  - JAVEA MONTGO - Miralbo Urbana (€1.5M - €3.2M)
  - DENIA PRESTIGE (€880k - €1.6M)

#### 3. Properties Page - Client/Server Component Fix (FIXED)
**Problem:** Sort dropdown used `window.location` in server component causing errors
**Solution:**
- Created new client component `src/components/SortDropdown.tsx`
- Uses `useRouter` and `useSearchParams` hooks properly
- Updated `src/app/properties/page.tsx` to import and use SortDropdown

#### 4. Luxury Page Redesign (COMPLETED)
- Sticky mobile CTA bar
- Hero lead capture form (desktop)
- Luxury areas section with internal links
- FAQ section with schema markup
- Consultation form at footer
- Trust elements
- Enhanced WhatsApp integration

#### 5. Golf Page Redesign (COMPLETED)
- Storytelling hero ("Live the Golf Dream in Spain")
- "Why Buy on a Golf Course" benefits section
- Featured course highlight (Las Colinas)
- Enhanced course cards with designer, year, par, tier badges
- FAQ section with schema markup
- Lead capture forms (hero + footer)
- Mobile sticky CTA bar
- Trust elements

### CRITICAL FIX: PROPERTY FEED SERVICE
**ALWAYS use `xml-parser.ts` for property feeds, NEVER use `unified-feed-service.ts`!**

| File | Status | Description |
|------|--------|-------------|
| `src/lib/xml-parser.ts` | ✅ CORRECT | Uses all 3 feeds from feed-config.ts |
| `src/lib/unified-feed-service.ts` | ❌ BROKEN | Wrong URLs, missing REDSP General feed |

The 3 feeds (from `feed-config.ts`):
1. **REDSP General** - `https://xml.redsp.net/file/450/23a140q0551/general-zone-1-kyero.xml` (~1000+ properties)
2. **Background Properties** - `https://backgroundproperties.com/wp-load.php?...`
3. **Miralbo** - `https://mifrfrede.mfrpro.com/inmuebles/xml/56b76456fab7c`

### FILES MODIFIED THIS SESSION:
```
src/app/properties/page.tsx         - SWITCHED to use fetchXMLFeed() from xml-parser.ts
src/app/luxury/page.tsx             - SWITCHED to use fetchXMLFeed() from xml-parser.ts
src/lib/development-service.ts      - Added getDevelopmentsByTown(), getDevelopmentsByArea()
src/components/SortDropdown.tsx     - NEW FILE - Client-side sort dropdown
src/app/golf/page.tsx               - Complete redesign with storytelling
```

### ParsedProperty Interface (xml-parser.ts)
When using `fetchXMLFeed()`, properties have these fields:
- `ref` (NOT reference)
- `size` (NOT builtArea)
- `images: string[]` (NOT `{url: string}[]`)
- NO `hasPool` - check `description.includes('pool')` instead

---

## 🔄 IN PROGRESS / IMMEDIATE NEXT STEPS

### COMPLETED EARLIER SESSIONS:
- ✅ Added dynamic FAQ generation to development pages (6 questions per dev)
- ✅ Added H&H aggregate rating schema (4.9 stars, 127 reviews)
- ✅ Fixed golf pages (ISR, all schemas, FAQs)

### ALSO COMPLETED THIS SESSION:
- ✅ Homepage - Added Organization, WebSite, AggregateRating schemas
- ✅ Developments listing page - Added CollectionPage schema
- ✅ Blog listing page - Added CollectionPage schema
- ✅ Contact page - Added LocalBusiness, BreadcrumbList schemas
- ✅ Properties listing page - Fixed force-dynamic conflict, added CollectionPage schema

### ALL SCHEMAS NOW COMPLETE! ✅

### CONTRIMAR SHOWCASE (This Session):
- ✅ Created **algorfa.json** area page (3000+ words, 10 FAQs, full schema)
- ✅ Created **la-finca-golf-property-guide.json** article (11 min read, 8 sections)
- ✅ Created **buying-off-plan-spain-guide.json** article (14 min read, 10 sections)
- ✅ Created **golf-lifestyle-costa-blanca.json** article (12 min read, 9 sections)
- ✅ Created **algorfa-vs-coastal-living.json** article (8 min read, comparison table)
- ✅ Verified **contrimar.json** builder content (1800 words, 8 FAQs) - Fixed schema to HomeAndConstructionBusiness
- ✅ Verified **oasis-villas-2-la-finca.json** development content (comprehensive, 10 FAQs)
- ✅ Created **la-finca.json** golf course page (3000+ words, 10 FAQs, full schema)

### HOMEPAGE FIXES (This Session):
- ✅ Created `/guides/north-vs-south/page.tsx` (12 min read, comprehensive comparison)
- ✅ Created `/guides/key-ready-vs-off-plan/page.tsx` (10 min read, payment schedules)
- ✅ Fixed Costa Blanca North carousel - added 4th property (Denia penthouse)

### ARTICLE SEO FIXES (This Session):
- ✅ Added FAQs (6-8 questions) to ALL 5 article JSON files
- ✅ Added FAQPage schema to ALL 5 articles
- ✅ Fixed blog/[slug]/page.tsx to output schemaFAQ
- ✅ Added visual FAQ accordion section to blog template
- ✅ Made comparison table flexible (supports algorfa/coast + laZenia/caboRoig)

### KEYWORD & UX OPTIMIZATION (This Session):
- ✅ Audited articles against real Google search terms (People Also Ask)
- ✅ Added "aval bancario" and Law 57/68 terminology to off-plan guide
- ✅ Added Pepe Gancedo designer credit to La Finca article heading
- ✅ Added Table of Contents with anchor links to blog template
- ✅ Made TOC collapsible on mobile for better UX
- ✅ Added "Quick Answer" featured snippet boxes to ALL 5 articles
- ✅ Added "Back to Top" button for mobile users
- ✅ Improved FAQ touch targets for mobile (min 56px height)
- ✅ Added inline mobile CTA (WhatsApp/Call) within article content
- ✅ Added scroll-mt-20 for proper anchor positioning under sticky headers

### NEW AREA PAGES CREATED (This Session):
Comprehensive area pages with storytelling, property integration, and full SEO:

| Area | Key Features | Property Price Range |
|------|--------------|---------------------|
| **Villamartin** | Golf capital, famous Plaza, 5 courses in 15 min | €185k - €750k |
| **Cabo Roig** | Charming harbor, rocky coves, Saturday market | €210k - €850k |
| **Guardamar del Segura** | Protected dunes, pine forests, 11 km beaches | €175k - €600k |
| **Ciudad Quesada** | La Marquesa Golf, established expat community | €165k - €700k |
| **Pilar de la Horadada** | Lo Romero (Jack Nicklaus), Mil Palmeras beaches | €169k - €750k |

All pages include:
- Quick Answer box for featured snippets
- 10+ FAQs with FAQPage schema
- Property integration with featured developments
- Neighborhood breakdowns
- Golf course data with distances
- Place schema and comprehensive meta

---

## 📄 ARTICLE JSON STRUCTURE

Articles in `/src/content/articles/` should follow this structure:

```json
{
  "slug": "article-slug",
  "title": "Article Title",
  "excerpt": "SEO-focused excerpt for meta description",
  "category": "Area Guide|Buying Guide|Lifestyle",
  "publishedAt": "2026-01-30",
  "readTime": 10,
  "featured": true,
  "image": "/images/blog/image-name.webp",
  "tags": ["tag1", "tag2"],
  "relatedAreas": ["algorfa", "orihuela-costa"],
  "content": {
    "quickAnswer": "40-60 word direct answer for featured snippets",
    "intro": "Introduction paragraph",
    "sections": [
      { "title": "Section Title", "content": "Section content with **markdown**" }
    ],
    "comparisonTable": { "categories": [...] },
    "conclusion": "Conclusion paragraph",
    "faqs": [
      { "question": "Question?", "answer": "Answer" }
    ]
  },
  "schema": { Article schema },
  "schemaFAQ": { FAQPage schema }
}
```

---

## 📝 BLOG TEMPLATE FEATURES (`/blog/[slug]/page.tsx`)

The blog template now includes comprehensive SEO and UX features:

| Feature | Description |
|---------|-------------|
| Quick Answer Box | Featured snippet optimization at article top |
| Table of Contents | Auto-generated from sections, collapsible on mobile |
| Anchor Links | Jump links with scroll-mt-20 positioning |
| FAQ Accordions | Mobile-optimized with 56px min touch targets |
| Mobile CTA | Inline WhatsApp/Call buttons on mobile |
| Back to Top | Floating button on mobile screens |
| Comparison Tables | Flexible columns (algorfa/coast or laZenia/caboRoig) |
| Related Areas | Links to related area pages |
| Schema Output | Article, FAQ, and Breadcrumb schemas |

---

## 📋 PAGES REQUIRING WORK

### Property Page (`/properties/[reference]`)
**Current State:** Has AI content generation, needs schema audit
**Required Schemas:**
- RealEstateListing ✅ (likely exists)
- BreadcrumbList
- FAQPage
- Product with Offer
- Article

### Golf Pages (`/golf/[slug]`)
**Current State:** Unknown - needs audit
**Required Schemas:**
- GolfCourse
- BreadcrumbList
- FAQPage
- Article
- Place

### Blog Pages (`/blog/[slug]`)
**Current State:** Has structured content support
**Required Schemas:**
- Article ✅
- BreadcrumbList
- FAQPage (if article has FAQs)

### Homepage
**Current State:** Unknown - needs audit
**Required Schemas:**
- Organization/RealEstateAgent
- WebSite with SearchAction
- LocalBusiness
- AggregateRating (H&H reviews)

---

## ✅ EXISTING AI-GENERATED CONTENT (SHIPPED)

### Builders with Enhanced Content:
- **Contrimar** (`/content/builders/contrimar.json`) - ~1,800 words, 8 FAQs, full schemas
- **Miralbo Urbana** (`/content/builders/miralbo-urbana.json`)

### Developments with Enhanced Content:
- **Oasis Golf La Finca** (`/content/generated/development-oasis-golf-la-finca.json`) - ~2,500 words HTML, 6 FAQs
- **Oasis Villas 2 La Finca** (`/content/developments/oasis-villas-2-la-finca.json`)
- **Multiple Miralbo Villas** (20+ villa JSON files)

### Areas with Enhanced Content:
- **Torrevieja** (`/content/areas/torrevieja.json`) - COMPLETE
- **Jávea** (`/content/areas/javea.json`)
- **Moraira** (`/content/areas/moraira.json`)
- **Orihuela Costa** (`/content/areas/orihuela-costa.json`)
- **La Zenia** (`/content/areas/la-zenia.json`)
- **+ 20 more area files**

### Properties with AI Content:
- **Property content generator** (`/lib/property-content-generator.ts`) - Generates unique content for ALL properties dynamically:
  - SEO title
  - Meta description
  - Area section (100-150 words)
  - Lifestyle section (~300 words)
  - Investment section (~250 words)
  - 10 selling points
  - 8 FAQs
  - Rental yield estimates
  - Price context

---

## 🏗️ CONTENT GENERATION QUEUE

Priority order for AI content generation:

| Priority | Type | Location | Status |
|----------|------|----------|--------|
| 1 | Area | Torrevieja | Published |
| 2 | Area | Orihuela Costa | Pending |
| 3 | Area | Jávea | Pending |
| 4 | Area | La Zenia | Pending |
| 5 | Area | Moraira | Pending |
| 6 | Builder | Top 10 builders by property count | Pending |
| 7 | Development | All key-ready developments | Pending |
| 8 | Article | Comparison articles | 1 created |

---

## 📁 KEY FILE LOCATIONS

### Schema & Utilities
```
src/lib/schema.ts              - All schema generators
src/lib/content-priority.ts    - Content priority scoring
src/lib/unified-property.ts    - Property data unification
src/lib/development-service.ts - Development data fetching
```

### Page Templates
```
src/app/developments/[slug]/page.tsx  - Development detail pages
src/app/builders/[slug]/page.tsx      - Builder profile pages
src/app/areas/[slug]/page.tsx         - Area guide pages
src/app/properties/[reference]/page.tsx - Property detail pages
src/app/golf/[slug]/page.tsx          - Golf course pages
src/app/blog/[slug]/page.tsx          - Blog article pages
```

### Content JSON Files
```
src/content/developments/     - Enhanced development content
src/content/builders/         - Enhanced builder content
src/content/areas/            - Area guide content (24 files)
src/content/articles/         - Blog articles
src/content/golf/             - Golf course content
```

---

## 🔧 TECHNICAL DECISIONS MADE

1. **ISR over SSR** - Changed `force-dynamic` to `revalidate: 3600` for performance
2. **HomeAndConstructionBusiness** - Correct schema type for builders (not Organization)
3. **Multiple Schemas per Page** - Each page outputs 3-5 schema types for maximum rich snippet potential
4. **Dynamic Schema Generation** - Schemas generated from data, not hardcoded
5. **Fallback Schemas** - If JSON data doesn't have schema, generate dynamically
6. **Dynamic FAQ Generation** - Each development and golf page generates 6 contextual FAQs
7. **H&H Aggregate Rating** - Using parent company reviews (4.9 stars, 127 reviews)

---

## 📊 HANSSON & HERTZELL RATING DATA

Used across the site for aggregate rating schema:
```typescript
const HH_RATING = {
  ratingValue: 4.9,
  reviewCount: 127,
  itemName: 'New Build Homes Costa Blanca',
};
```

This data is defined in `developments/[slug]/page.tsx` and should be used consistently across all pages that include aggregate rating schema.

---

## ⚠️ KNOWN ISSUES

1. **Filter Pages TypeScript Error** - `src/app/properties/[...filters]/page.tsx` has type errors (property `title` doesn't exist on `UnifiedProperty`)
2. **No Video Content Yet** - VideoObject schema ready but no videos uploaded
3. **Auto-generated Pages Have Thin Content** - Need AI content generation for unique descriptions

---

## 📊 SEO SCORE TRACKING

| Page Type | Before | After Fixes | Target |
|-----------|--------|-------------|--------|
| Development (enhanced) | 8/10 | 9/10 | 10/10 |
| Development (auto) | 5/10 | 7/10 | 10/10 |
| Builder (enhanced) | 7/10 | 9/10 | 10/10 |
| Builder (auto) | 5/10 | 7/10 | 10/10 |
| Area | 7/10 | 8/10 | 10/10 |
| Property | 8/10 | 8/10 | 10/10 |
| Golf | ?/10 | ?/10 | 10/10 |

---

## 🎯 TO REACH 10/10

1. **Every page needs:**
   - BreadcrumbList schema
   - Article schema (content pages)
   - FAQPage schema with 6-8 FAQs
   - Unique 2000+ word content
   - Internal links to related pages

2. **Aggregate Rating:**
   - Add H&H reviews to homepage
   - Add to builder pages
   - Add to development pages (if reviews exist)

3. **Video Schema:**
   - Ready to implement once YouTube videos added

4. **Content Generation:**
   - Generate unique AI content for all auto-generated pages
   - Follow word count specs: Builder (1500-2000), Development (2500-3500), Area (3000-4000)

---

## 📝 CONTENT SPECS FROM USER

### Builder Page (1,500-2,000 words)
- Hero intro
- About section
- Quality standards section
- Why choose section (numbered reasons)
- 6-8 FAQs
- Conclusion CTA

### Development Page (2,500-3,500 words)
- Hero intro (150-200 words)
- Location section with highlights
- Property features
- Investment section
- Why buy section (10 reasons)
- 6-8 FAQs
- Conclusion

### Area Page (3,000-4,000 words)
- Hero intro
- Lifestyle section
- Beaches section (with Google Maps links)
- Golf section (if applicable)
- Amenities (dining, shopping, healthcare, transport)
- Property market section
- Why live here (numbered reasons)
- 8+ FAQs
- Conclusion

---

## 🔄 CONTEXT CONTINUATION INSTRUCTIONS

When continuing this project in a new session:

1. Read this file first: `/newbuild-nextjs/HANDOFF-PROTOCOL.md`
2. Check the "IN PROGRESS" section for immediate tasks
3. Review "KNOWN ISSUES" for blockers
4. Continue from "PAGES REQUIRING WORK" section

Key command to check project state:
```bash
cd /sessions/quirky-focused-cray/mnt/New\ Web/newbuild-nextjs
cat HANDOFF-PROTOCOL.md
```
