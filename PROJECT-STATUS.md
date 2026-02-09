# Project Status — newbuildhomescostablanca.com
**Last updated: 2026-02-09**

## WORKFLOW RULES
- **ALWAYS update this file before telling Oskar to push**
- **ALWAYS read this file at the start of a new session**
- This file tracks everything done, pending, and technical context so we don't lose progress between sessions

## COMPLETED (all sessions combined)

### Design & Cleanup
- [x] Replaced 18 Unsplash stock image URLs with local photos (stock-images.ts)
- [x] Fixed Header golf links
- [x] Removed 100+ emojis from 12 files (blog, guides, areas)
- [x] Fixed off-design-system colors (blue/purple/emerald → primary/accent/warm)
- [x] Fixed Costa Calida area page to match developments card style
- [x] Fixed property counter grammar (1 property singular, hide 0-count towns)
- [x] Added light CTA boxes between sections on developments, properties, areas pages

### Blog & Content
- [x] Created 13 Top 10 blog articles total:
  1. top-10-new-build-developments-costa-blanca (featured)
  2. top-10-beaches-costa-blanca-south
  3. top-10-golf-courses-costa-blanca
  4. top-10-areas-buy-property-costa-blanca
  5. top-10-international-schools-costa-blanca
  6. top-10-restaurants-torrevieja
  7. top-10-things-to-do-orihuela-costa
  8. top-10-reasons-move-spain
  9. top-10-family-activities-costa-blanca
  10. top-10-new-build-developers-costa-blanca
  11. top-10-hidden-gems-costa-blanca-south
  12. top-10-tips-buying-property-spain
  13. top-10-beaches-near-javea-moraira
- [x] Added "Top 10 Lists" category to blog page
- [x] Built getBlogPostsByTag() cross-site article system
- [x] Wired related articles to Torrevieja, Jávea, Costa Blanca North super guides (3 each)
- [x] Wired related articles to golf detail pages (2) and golf landing (3)

### Property Generation
- [x] Fixed SSL certificate error in generate-all-content.ts
- [x] Added diagnostic logging to feed fetching
- [x] Generated 268 AI content files (areas, developments, projects)
- [x] ~806 content files exist (96 areas, 533 developments, 172 projects)
- [x] ~400-500 properties still need generation (API credits ran out mid-run)

### Swedish i18n (Structure Complete)
- [x] Activated Swedish in SUPPORTED_LOCALES config
- [x] Created sv.json locale file with culturally adapted translations
- [x] Created middleware.ts for /sv/ routing
- [x] Created LocaleContext.tsx
- [x] Created /sv/ layout with Swedish metadata
- [x] 11 Swedish pages created:
  - /sv/ (homepage with "Varför svenskar väljer Costa Blanca")
  - /sv/properties (full listing with Swedish filters)
  - /sv/properties/[reference] (redirect to English — interim)
  - /sv/developments (full Swedish adaptation, 1236 lines)
  - /sv/areas (region cards with Swedish descriptions)
  - /sv/golf (22 courses with Swedish lifestyle content)
  - /sv/luxury (luxury collection with Stockholm price comparisons)
  - /sv/inland (Swedish value propositions vs Stockholm prices)
  - /sv/blog (English fallback + Swedish categories)
  - /sv/contact ("Svenska Tjänster" section)
  - /sv/about ("Vi talar svenska" emphasis)
- [x] Added EN/SV language switcher with flag icons to Header (desktop + mobile)
- [x] Added hreflang alternates to all 10 English pages
- [x] Created translate-articles.ts batch translation script

## COMMITS (all local, ready to push)
1. `3d5de55` — Stock images + header golf links
2. `823ab0c` — Design cleanup (emojis, colors — 23 files)
3. `36a60a0` — Costa Calida cards, property counter, CTA boxes
4. `f0d139e` — 5 Top 10 blog articles
5. `207b7c4` — Related articles wired to super guides, golf, blog
6. `bbc0aa9` — Generation script SSL fix + diagnostics
7. `1403687` — 201 AI-generated content files
8. `86e0e5a` — Swedish i18n infrastructure (config, middleware, locale, homepage)
9. `71ea206` — Swedish translation script
10. `cf1d32e` — Swedish properties, areas, golf, blog, contact pages
11. `9a306e6` — Swedish devs, luxury, inland, about + language switcher + hreflang
12. `9789725` — 67 new AI-generated development descriptions
13. `20c9c3f` — 8 more Top 10 blog articles

## PENDING TASKS

### Must Do (User Action Required)
- [ ] `git push` — 13 commits waiting
- [ ] Top up Claude API credits (Haiku)
- [ ] Run: `npx tsx src/scripts/generate-all-content.ts && npx tsx src/scripts/translate-articles.ts`
- [ ] Commit generated content after scripts complete

### Swedish — Remaining Work
- [ ] Run translation script to translate 135+ English blog articles to Swedish
- [ ] Swedish property detail pages (currently redirects to English)
- [ ] Swedish guide pages (/sv/guides/)
- [ ] Localized alt tags for images in Swedish version
- [ ] Swedish-specific meta descriptions targeting Swedish Google queries
- [ ] Swedish-specific blog content ("Att köpa bostad i Spanien som svensk", Stockholm price comparisons)

### Content — Future Articles
- [ ] Area-specific articles to further populate related cards on super guides
- [ ] More lifestyle/buyer guide content

### Future Languages
- [ ] German (de) — next after Swedish is complete
- [ ] Same infrastructure pattern: /de/ prefix, de.json locale, page templates

### Features — Deferred
- [ ] Automated blog agent (scheduled content generation — needs shortcut infrastructure)
- [ ] Swedish property detail pages with full translation
- [ ] More super guide pages (Benidorm, Alicante, Murcia etc.)

## TECHNICAL NOTES

### Generation Script
- Path: `src/scripts/generate-all-content.ts`
- Run: `npx tsx src/scripts/generate-all-content.ts`
- Idempotent: skips existing content files
- Needs: Internet + Claude API credits (uses Haiku model)
- SSL fix: `NODE_TLS_REJECT_UNAUTHORIZED='0'` set in script
- Feeds: Background Properties (145 new builds) + REDSP (1,019 properties)

### Translation Script
- Path: `src/scripts/translate-articles.ts`
- Run: `npx tsx src/scripts/translate-articles.ts`
- Options: `--limit=N` or `--slug=article-name`
- Output: `src/content/sv/articles/`
- Uses Claude Haiku, rate limited (1s between calls)

### Design System
- Palette: primary-900, accent-500, warm-* (no raw blue/purple/emerald)
- Font: DM Sans
- Corners: rounded-sm
- Schema: Article, FAQPage, BreadcrumbList, GolfCourse
- No emojis in content

### i18n Architecture
- English: no prefix (default locale)
- Swedish: /sv/ prefix
- Middleware: src/middleware.ts detects locale from path
- Locale file: src/i18n/locales/sv.json
- Config: src/i18n/config.ts (SUPPORTED_LOCALES: ['en', 'sv'])
