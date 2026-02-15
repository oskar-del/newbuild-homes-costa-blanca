# Project Status — newbuildhomescostablanca.com

**Last updated: February 15, 2026**

## WORKFLOW RULES
- **ALWAYS update this file before telling Oskar to push**
- **ALWAYS read this file at the start of a new session**
- This file tracks everything done, pending, and technical context

---

## COMPLETED (all sessions)

### Website Foundation
- [x] Next.js 14 site with 1,700+ pages
- [x] 9-language support (EN, SV, NL, NL-BE, FR, DE, NO, PL, RU)
- [x] 140+ blog articles
- [x] Custom 404 pages per language
- [x] Hreflang SEO across all pages
- [x] Language switcher with proper routing
- [x] GSC analysis & 5xx error fixes
- [x] Property routes for all languages
- [x] 72 redirect route files (full route audit)

### Design & Cleanup
- [x] Replaced 18 Unsplash stock image URLs with local photos
- [x] Fixed Header golf links
- [x] Removed 100+ emojis from 12 files
- [x] Fixed off-design-system colors → primary/accent/warm
- [x] Fixed property counter grammar
- [x] Added CTA boxes between sections

### Blog & Content
- [x] 13 Top 10 blog articles
- [x] "Top 10 Lists" category on blog page
- [x] getBlogPostsByTag() cross-site article system
- [x] Related articles wired to area pages and golf pages

### Property Generation
- [x] 268 AI content files generated (areas, developments, projects)
- [x] ~806 content files exist (96 areas, 533 developments, 172 projects)

### Super Guides (5 total)
- [x] Torrevieja, Jávea, Costa Blanca North (existing)
- [x] Orihuela Costa (996 lines, 6 neighborhoods)
- [x] Benidorm & Finestrat (1095 lines, 9 neighborhoods)

### Swedish Original Content
- [x] 4 original Swedish articles (buying guide, price comparison, lifestyle, golf)
- [x] 11 Swedish pages with full cultural adaptation
- [x] Translation script for blog articles

### YouTube Video Infrastructure
- [x] video-mapping.ts, VideoCard.tsx, video JSON template
- [x] Functions: getVideosForArea(), getVideosByTag(), etc.

### Area Pages — Shared Architecture (THIS SESSION)
- [x] AreaPageContent.tsx — shared server component (775 lines)
- [x] area-utils.ts — data loading with language fallback (389 lines)
- [x] area-i18n.ts — 60+ UI labels translated in all 9 languages (575 lines)
- [x] prepareAreaPageData() helper shared across all language pages
- [x] All 8 language area pages rewritten from re-exports to actual pages

### Area Content — English Upgrades (THIS SESSION)
- [x] 6 areas upgraded to premium (450+ lines each): Calpe, Benidorm, Altea, Dénia, Santa Pola, Moraira
- [x] Each includes: investmentAnalysis, costOfLiving, events, schools, natureActivities, expatCommunity, lifestyleTimeline, mapEmbed
- [x] Javea upgraded with content from javea-xabia.json

### Area Translations — All Languages (THIS SESSION)
- [x] Swedish: 15/15 fully translated
- [x] Dutch + NL-BE: 15/15 fully translated
- [x] German: 15/15 fully translated
- [x] French: 15/15 fully translated (minor gaps possible)
- [x] Norwegian: 15/15 fully translated (minor gaps possible)
- [x] Polish: 15/15 fully translated (minor gaps possible)
- [x] Russian: 15/15 fully translated (minor gaps possible)
- [x] Total: 120 translated area JSON files

### Guide Pages (THIS SESSION)
- [x] Premium guide index redesign (3-tier: Essential, Destination, Decision)
- [x] All 9 language guide index pages matching premium design
- [x] Proper emoji icons, gradient hero, Finance CTA, Trust section

### Lead Capture System (THIS SESSION)
- [x] LeadForm.tsx — multilingual component (9 languages), auto-tags area/language/budget/property type
- [x] LeadFormSection.tsx — translated titles + subtitles per language
- [x] /api/leads/route.ts — validates input, pushes to Airtable, graceful fallback
- [x] Airtable "NewBuild Leads" table created with 15 fields
- [x] Lead form integrated into all area page sidebars
- [x] scripts/setup-airtable.js for table creation

---

## TO DO — Full Roadmap

### Phase 1: Lead Conversion (NEXT — Highest Impact)
- [ ] Test lead form end-to-end (submit test lead, verify in Airtable)
- [ ] MailerLite integration — auto-response email on new lead
  - Personalized by language + area
  - Include matched properties
  - Template per language
- [ ] Property alerts — new development → email matched leads
- [ ] Lead scoring in Airtable (pages visited, forms filled, emails opened)
- [ ] WhatsApp Business API sequences (templated follow-ups, property alerts)

### Phase 2: Content Distribution & Social
- [ ] Postiz social scheduling connected to Airtable
  - Auto-generate social posts from blogs (9 languages)
  - Property highlights from development data
  - Area spotlights from guide content
  - Schedule: Mon=area, Wed=lifestyle, Fri=property
- [ ] Facebook Page → manual share to language groups
- [ ] Content repurposing engine (1 blog → email + social + ad copy + video script)

### Phase 3: Advertising
- [ ] Google Ads retargeting pixel on all pages
- [ ] Dynamic remarketing (area+language specific ads)
- [ ] PPC campaigns for high-intent keywords per language
- [ ] Multilingual ad copy auto-generation from Airtable
- [ ] Comparison content for ads ("Torrevieja vs Stockholm prices")

### Phase 4: Video & Visual Content
- [ ] Remotion templates for property reels (photos + transitions + text + music)
- [ ] Property data overlay (price, beds, area) from Airtable
- [ ] Area highlight reels from photos + guide data
- [ ] Download project videos → cut into TikTok/Instagram Reels
- [ ] PDF property brochures auto-generated per development

### Phase 5: Automated Blog System
- [ ] RSS feed aggregation (Costa Blanca News, The Local, property reports)
- [ ] AI content generation ("what this means for buyers" angle)
- [ ] Draft → review → approve → publish workflow in Airtable
- [ ] Auto-schedule social promotion for new posts

### Phase 6: Feedback Loops & Optimization
- [ ] Campaign data → Airtable (open rates, clicks, conversions)
- [ ] Auto-optimize targeting (learn which content works per language/area)
- [ ] A/B test emails and social formats
- [ ] Monthly auto-generated market reports
- [ ] Seasonal campaign triggers (school holidays, feria dates)

### Phase 7: Future Expansion
- [ ] Fix up hanssonhertzell.com
- [ ] Build "super site" with resales + new builds using this template
- [ ] Consider town-based microsites
- [ ] Referral program tracked in Airtable
- [ ] Country-specific articles per nationality

---

## Architecture

```
                    ┌──────────────┐
                    │   AIRTABLE   │ ← Central Hub
                    │    (Hub)     │
                    └──────┬───────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   Properties          Leads            Content
   (XML feeds)     (website forms)   (blogs, guides)
        │                  │                  │
        └────────┬─────────┴──────────┬───────┘
                 │                    │
    ┌────────────┼────────────────────┼───────────┐
    │            │                    │           │
    ▼            ▼                    ▼           ▼
MailerLite    Google Ads          Postiz      Remotion
 (email)    (retargeting)       (social)     (video)
    │            │                    │           │
    └────────────┴────────────────────┴───────────┘
                          │
                   Feedback Loop
              (performance → Airtable
               → optimize targeting)
```

## Tech Stack
- Website: Next.js 14 (App Router, TypeScript, Tailwind)
- Data hub: Airtable (base: appXVnwGv92LfG5j1)
- Email: MailerLite
- Social: Postiz
- Ads: Google Ads
- Video: Remotion
- Hosting: Vercel
- Repo: github.com/oskar-del/newbuild-homes-costa-blanca

## Key Files
- `src/components/area/AreaPageContent.tsx` — shared area page
- `src/lib/area-utils.ts` — data loading with language fallback
- `src/lib/area-i18n.ts` — UI translations (9 languages)
- `src/components/LeadForm.tsx` — multilingual lead form
- `src/components/LeadFormSection.tsx` — lead form wrapper
- `src/app/api/leads/route.ts` — Airtable API integration
- `src/content/areas/` — 96 English + 120 translated area JSONs
- `scripts/setup-airtable.js` — Airtable table creation

## Design System
- Palette: primary-900, accent-500, warm-* (no raw blue/purple/emerald)
- Font: DM Sans
- Corners: rounded-sm
- Schema: Article, FAQPage, BreadcrumbList, GolfCourse
- No emojis in content

## Environment Variables
```
AIRTABLE_API_TOKEN=pat0Hmz38dw8kc2R3.xxx
AIRTABLE_BASE_ID=appXVnwGv92LfG5j1
AIRTABLE_TABLE_ID=tblXP5CjfdOULnRiC
```
