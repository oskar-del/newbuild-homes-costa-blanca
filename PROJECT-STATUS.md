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

### Super Guides
- [x] Torrevieja (existing, with drone photos + data files)
- [x] Jávea (existing)
- [x] Costa Blanca North (existing)
- [x] Orihuela Costa (NEW — 996 lines, 6 neighborhoods, golf, beaches, FAQs)
- [x] Benidorm & Finestrat (NEW — 1095 lines, 9 neighborhoods, property market, lifestyle)

### Original Swedish Blog Articles (not translations)
- [x] "Att Köpa Bostad i Spanien Som Svensk" — NIE, Skatteverket, SBAB/Skandia
- [x] "Stockholmspris vs Costa Blanca" — Price comparisons with SEK conversions
- [x] "Svenska Livet på Costa Blanca" — Swedish community, kyrkan, SIS school
- [x] "Golf i Spanien för Svenska Golfare" — Courses, green fees vs Bro Hof

### YouTube Video Infrastructure
- [x] YOUTUBE-SCRIPT.md — Claude browser prompt for generating YouTube listings
- [x] src/lib/video-mapping.ts — Video-to-area/property mapping (mirrors blog system)
- [x] src/components/VideoCard.tsx — 3 variants (card/inline/hero) with in-place YouTube embed
- [x] src/content/videos/_example.json — JSON template for video entries
- [x] Functions: getVideosForArea(), getVideosByTag(), getVideoForProperty(), getFeaturedVideos()

## COMMITS (ready to push)
1-12: (previously pushed)
13. `20c9c3f` — 8 more Top 10 blog articles
14. `4f12481` — PROJECT-STATUS.md for session continuity
15. `2f7eafb` — 78 AI-generated development descriptions (overnight run)
16. `7b88397` — Orihuela Costa + Benidorm/Finestrat super guides + 4 Swedish articles
17. `ee85362` — YouTube video infrastructure (mapping, VideoCard, listing script)

## PENDING TASKS

### Must Do (User Action Required)
- [ ] `git push` — multiple commits waiting
- [ ] Generation + translation scripts running in terminal
- [ ] Commit generated content after scripts complete
- [ ] Upload first YouTube video and create JSON entry in src/content/videos/

### YouTube — Next Steps
- [ ] Upload first video to YouTube (use YOUTUBE-SCRIPT.md prompt)
- [ ] Create video JSON file in src/content/videos/[slug].json
- [ ] Wire VideoSection into homepage (featured videos)
- [ ] Wire VideoSection into super guides (area videos)
- [ ] Wire VideoSection into property detail pages
- [ ] Create /videos page listing all videos
- [ ] Create YouTube channel playlists (see YOUTUBE-SCRIPT.md)

### Swedish — Remaining Work
- [ ] Translation script running (translating 135+ articles to Swedish)
- [ ] Swedish property detail pages (currently redirects to English)
- [ ] Swedish guide pages (/sv/guides/)
- [ ] Localized alt tags for images in Swedish version
- [ ] Swedish-specific meta descriptions targeting Swedish Google queries

### Content — Future Articles
- [ ] Area-specific articles to further populate related cards on super guides
- [ ] More lifestyle/buyer guide content

### Future Languages
- [ ] German (de) — next after Swedish is complete
- [ ] Same infrastructure pattern: /de/ prefix, de.json locale, page templates

### Features — Deferred
- [ ] Automated blog agent (scheduled content generation — needs shortcut infrastructure)
- [ ] Swedish property detail pages with full translation
- [ ] More super guide pages (Alicante, Murcia, Guardamar etc.)

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

### YouTube Video System
- Video JSONs: src/content/videos/[slug].json (see _example.json for format)
- Mapping: src/lib/video-mapping.ts (same pattern as blog-area-mapping.ts)
- Component: src/components/VideoCard.tsx (card/inline/hero variants)
- VideoSection: Drop-in grid section for any page
- YouTube listing prompt: YOUTUBE-SCRIPT.md (copy into Claude browser)
- Uses youtube-nocookie.com for privacy-friendly embeds
- Thumbnails auto-fetched from YouTube CDN
