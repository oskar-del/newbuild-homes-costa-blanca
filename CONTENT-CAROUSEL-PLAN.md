# Content Carousel System — Implementation Plan

**Created: February 16, 2026**

## Overview

The Content Carousel is an automated content distribution system that takes a single piece of content (blog article, area guide, property listing, or development update) and repurposes it across all marketing channels — email (MailerLite), social (Postiz), ads (Google Ads), and video (Remotion) — with Airtable as the central orchestration hub.

## How It Works

```
1 Blog Article
    ↓
[Airtable Content Table]
    ↓
    ├── MailerLite: Newsletter + area-specific drip
    ├── Postiz: Facebook, Instagram, LinkedIn posts (9 languages)
    ├── Google Ads: Dynamic ad copy for retargeting
    └── Remotion: 30-sec video reel for TikTok/Instagram
```

## Airtable Tables Required

### Table 1: Content Calendar (NEW — to create)
Fields:
- Content Title (text)
- Content Type (select: Blog, Area Guide, Development, Property Alert, Market Report)
- Source URL (url)
- Language (select: all 9)
- Area (linked to areas)
- Status (select: Draft, Approved, Scheduled, Published, Archived)
- Publish Date (date)
- Email Version (long text) — short summary for email
- Social Caption (long text) — punchy social media text
- Ad Copy (long text) — Google Ads text
- Video Script (long text) — Remotion narration
- Image URLs (text) — comma-separated image paths
- Tags (multi-select: Buying Guide, Area Spotlight, Price Update, Lifestyle, Golf, etc.)
- Performance Score (number) — populated by feedback loop
- Created By (text)
- Notes (long text)

### Table 2: Social Posts (NEW — to create)
Fields:
- Content (linked to Content Calendar)
- Platform (select: Facebook, Instagram, LinkedIn, TikTok)
- Language (select: all 9)
- Post Text (long text)
- Image (attachment)
- Scheduled Date (datetime)
- Status (select: Draft, Scheduled, Published, Failed)
- Engagement (number) — likes + comments + shares
- Click-Through (number)
- Postiz Post ID (text) — for tracking

### Table 3: Email Campaigns (NEW — to create)
Fields:
- Content (linked to Content Calendar)
- Campaign Type (select: Newsletter, Drip, Property Alert, Welcome)
- Language (select: all 9)
- Subject Line (text)
- Preview Text (text)
- Body HTML (long text)
- Segment (text) — MailerLite segment name
- Scheduled Date (datetime)
- Status (select: Draft, Scheduled, Sent, Failed)
- Open Rate (percent)
- Click Rate (percent)
- MailerLite Campaign ID (text)

## Distribution Channels

### 1. MailerLite (Email)

**Setup Steps:**
1. Create MailerLite account (free up to 1,000 subscribers)
2. Create subscriber groups per language: EN, SV, NL, DE, FR, NO, PL, RU
3. Create subscriber groups per area interest
4. Design email templates per language (matching site design)
5. Set up webhook: new Airtable lead → add to MailerLite group
6. Build automation workflows:
   - Welcome series (3 emails over 7 days)
   - Weekly newsletter per language
   - Property alert drips (new dev in matched area)
   - Re-engagement (inactive 30 days)

**API Integration:**
- MailerLite API v2: `https://connect.mailerlite.com/api`
- Webhook from Airtable Automation: on new lead → POST to MailerLite
- Or use Zapier/Make.com as middleware

**Welcome Email Flow:**
```
Day 0: "Welcome to NewBuild Homes" + matched area guide link
Day 2: "Top 5 developments in {area}" + property photos
Day 5: "Your buying guide for {country}" + nationality guide link
Day 7: "Ready to visit?" + WhatsApp CTA
```

### 2. Postiz (Social Media)

**Setup Steps:**
1. Self-host Postiz (open source) or use cloud version
2. Connect: Facebook Page, Instagram Business, LinkedIn Company
3. Configure posting calendar:
   - Monday: Area spotlight (rotate through 15 areas)
   - Wednesday: Lifestyle/culture article
   - Friday: Property/development highlight
   - Sunday: Blog article link
4. Use Postiz API to schedule posts from Airtable Automation

**Post Templates:**
```
[Area Spotlight]
Discover {area_name} — {tagline}
{key_stat_1} | {key_stat_2} | {key_stat_3}
Read more: {url}
#CostBlanca #SpainProperty #{area_name}

[Property Highlight]
NEW: {development_name} in {area}
From {price_from} | {beds} beds | {pool_type}
{description_snippet}
Learn more: {url}

[Blog Article]
{article_title}
{excerpt}
Read the full guide: {url}
```

**Language Strategy:**
- English posts: main page (widest reach)
- Swedish posts: share to "Svenskar i Torrevieja/Spanien" groups
- Dutch posts: share to Dutch expat groups
- Each language gets 2 posts/week minimum

### 3. Google Ads (Retargeting)

**Setup Steps:**
1. Add Google Ads conversion tag to all pages (gtag.js)
2. Create remarketing audiences:
   - All visitors (last 30 days)
   - Area page visitors (per area)
   - Guide readers
   - Property page visitors
   - Language-specific segments
3. Dynamic remarketing: show the exact area/development they viewed
4. Build campaigns:
   - Search: high-intent keywords per language
   - Display: retargeting with area photos
   - YouTube: pre-roll with Remotion videos

**Implementation:**
Add to `src/app/layout.tsx`:
```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-ads" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-XXXXXXXXXX');
  `}
</Script>
```

**Multilingual Ad Copy (auto-generated from Airtable):**
```
EN: "New Build Homes in {area} from €{price}k — View Properties"
SV: "Nybyggda hem i {area} från €{price}k — Se fastigheter"
NL: "Nieuwbouw in {area} vanaf €{price}k — Bekijk woningen"
DE: "Neubau in {area} ab €{price}k — Immobilien ansehen"
```

### 4. Remotion (Video Generation)

**Setup Steps:**
1. Install Remotion: `npx create-video@latest`
2. Create templates:
   - Property reel (photos + transitions + price overlay + music)
   - Area spotlight (drone photos + stats + CTA)
   - Development tour (project images + floor plans + pricing)
   - Market update (charts + numbers + commentary)
3. Data input from Airtable (development photos, prices, descriptions)
4. Output: 9:16 (Reels/TikTok) + 16:9 (YouTube) + 1:1 (Feed)

**Template Structure:**
```
[Property Reel — 30 seconds]
0-3s:  Logo + "New Build Homes Costa Blanca"
3-8s:  Hero photo + development name + area
8-13s: Photo 2 + price + beds/baths
13-18s: Photo 3 + key feature (pool, sea view, golf)
18-23s: Photo 4 + "Starting from €X"
23-28s: Photo 5 + "Available Now"
28-30s: CTA + WhatsApp + website
```

**Integration with drone photos:**
We have 104+ drone photos of Torrevieja organized by zone. These are perfect for area spotlight reels.

## Content Repurposing Engine

### Flow: 1 Blog → 5 Outputs

```
INPUT: New blog article (e.g., "Torrevieja vs Benidorm")
    ↓
Step 1: Extract key points (3-5 bullets)
Step 2: Generate outputs:
    ├── Email: 200-word summary + CTA + matched properties
    ├── Social x3: Headline + stat + link (EN, SV, NL)
    ├── Ad copy: 90-char headline + 180-char description
    └── Video script: 30-sec narration + image sequence
    ↓
Step 3: Store all in Airtable Content Calendar
Step 4: Schedule via Postiz + MailerLite + Google Ads
Step 5: After 7 days: pull engagement metrics → Airtable
```

## Feedback Loop

### Metrics to Track
- Email: open rate, click rate, unsubscribes per language/area
- Social: engagement rate, clicks, follows per platform/language
- Ads: CTR, CPC, conversion rate per keyword/language
- Website: page views, time on page, lead form submissions

### Auto-Optimization
- Weekly: which content type performs best per language?
- Monthly: which areas generate most leads per nationality?
- Quarterly: reallocate ad spend based on ROI per channel

### Airtable Automation Rules
1. New lead → MailerLite → Welcome series
2. New blog article → Content Calendar → generate social + email + ad versions
3. Engagement below threshold → pause campaign
4. High-performing content → boost ad spend
5. New development added → property alert to matched leads

## Implementation Priority

### Week 1: Foundation
- [ ] Create Content Calendar table in Airtable
- [ ] Set up MailerLite account + language groups
- [ ] Design welcome email template (EN first, then translate)
- [ ] Add Google Ads tag to site layout

### Week 2: Email Automation
- [ ] Build Airtable → MailerLite webhook (new lead → subscriber)
- [ ] Create welcome email series (EN, SV, NL)
- [ ] Set up weekly newsletter template

### Week 3: Social Setup
- [ ] Set up Postiz (self-hosted or cloud)
- [ ] Connect Facebook + Instagram + LinkedIn
- [ ] Create first 2 weeks of scheduled content
- [ ] Test posting in 3 languages

### Week 4: Ads & Video
- [ ] Launch Google Ads retargeting campaign (display)
- [ ] Create first Remotion video template
- [ ] Generate 3 area spotlight videos from drone photos
- [ ] Set up YouTube channel + upload schedule

### Ongoing
- [ ] Content Calendar: add new content weekly
- [ ] Monitor metrics → Airtable feedback loop
- [ ] Expand to more languages as results come in
- [ ] A/B test email subjects and social formats

## Environment Variables Needed
```
MAILERLITE_API_KEY=<from MailerLite dashboard>
POSTIZ_API_URL=<self-hosted or cloud URL>
POSTIZ_API_KEY=<from Postiz settings>
GOOGLE_ADS_ID=AW-XXXXXXXXXX
GOOGLE_ADS_CONVERSION_ID=<conversion label>
```

## Notes
- Start small: EN email + EN social → measure → expand
- Don't automate everything at once — validate each channel manually first
- Use Airtable views to create dashboards for each channel
- Postiz is open source — can self-host on a VPS for full control
- MailerLite free tier (1,000 subscribers) is enough to start
- Google Ads: start with €10/day retargeting budget
