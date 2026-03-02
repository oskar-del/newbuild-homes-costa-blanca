---
name: social-media-pipeline
description: Automate Costa Blanca real estate content from planning to published posts across 5 channels (Facebook, Instagram, Pinterest, TikTok, YouTube). 5-stage pipeline covering content planning, Remotion video+still rendering, batch rendering, Postiz API upload, and smart multi-channel scheduling with content-type mixing. Use when scheduling social media posts, creating content batches, or automating the post pipeline.
---

# Social Media Pipeline Skill

Generate, render, upload, and schedule real estate content for Facebook, Instagram, Pinterest, TikTok, and YouTube in one automated workflow.

## Pipeline Overview — 3-Step Automated Flow

```
1. DEFINE BATCH    →  content-batches/<project>.json
2. RENDER ALL      →  bash render-<project>.sh
3. SCHEDULE        →  node schedule-engine.mjs --batch content-batches/<project>.json
```

**That's it.** Step 1 is done once per project. Steps 2-3 run on the user's Mac.

## Content Batch Format

Each project gets a JSON batch file in `property-reels/content-batches/`:

```json
{
  "project": "Edificio Vento",
  "area": "Torrevieja",
  "content": [
    {
      "name": "Vento Cinematic",
      "compositionId": "VentoCinematic",
      "contentType": "property-cinematic",
      "mediaType": "video",
      "format": null,
      "renderedFile": "out/videos/vento-cinematic.mp4",
      "duration": "35s",
      "title": "...",
      "captions": { "tiktok": "...", "instagram": "...", "youtube": "...", "facebook": "..." },
      "hashtags": { "tiktok": "...", "instagram": "...", "youtube": "...", "facebook": "..." }
    }
  ],
  "youtubeVideos": [
    { "name": "La Hoya 4K", "file": "path/to/video.mp4", "status": "ready" }
  ]
}
```

### Content Types (for scheduling mix algorithm)

Video types: `property-cinematic`, `property-rapid`, `penthouse-cinematic`, `penthouse-rapid`, `area-guide`, `blog-reel`, `investment-case`, `buyer-persona`, `curated-list`

Still types: `property-card`, `area-showcase`, `development-overview`

## Scheduling Algorithm

### Rules
- **2 posts per day per platform** — morning + evening slots
- **Morning and evening content type always different** — never same type back-to-back
- **Cross-platform offset** — same video appears on different platforms on different days
- **Every post tagged** with content_type, project, platform, slot for future analytics

### Platform Timing (CET/CEST)

| Platform  | Video Morning | Video Evening | Still Morning | Still Evening | Media Types |
|-----------|--------------|--------------|---------------|--------------|-------------|
| TikTok    | 11:00        | 19:00        | —             | —            | Video only  |
| Instagram | 13:00        | 20:00        | 10:00         | 17:00        | Video + Still |
| YouTube   | 14:00        | 21:00        | —             | —            | Video only  |
| Facebook  | 12:00        | 19:30        | 10:30         | 17:30        | Video + Still |
| Pinterest | —            | —            | 14:00         | 18:00        | Still only  |

### Frequency Targets (2026 data)
- TikTok: 2 reels/day (14/week) — 8hr spacing
- Instagram: 2 reels + 2 feed = 4/day
- YouTube Shorts: 2/day
- Facebook: 2 reels + 2 feed = 4/day
- Pinterest: 2 stills/day

### Multi-Project Interleaving
When adding a second project, the scheduler interleaves:
- Monday AM TikTok: Vento property reel
- Monday PM TikTok: Benidorm area guide
- Tuesday AM TikTok: Benidorm investment case
- Tuesday PM TikTok: Vento blog reel

## Remotion Compositions

### Video Compositions (1080×1920 vertical, 30fps)

| Composition ID | Type | Duration | Use |
|----------------|------|----------|-----|
| PropertySpotlightCinematic | property-cinematic | 35s | Full property showcase |
| PropertySpotlightRapid | property-rapid | 15s | Quick highlight |
| AreaGuideReel | area-guide | 33s | Area lifestyle |
| BlogSummaryReel | blog-reel | 30s | Article key points |
| InvestmentCaseReel | investment-case | 15s | Investment data |
| BuyerPersonaReel | buyer-persona | 25s | Persona targeting |
| CuratedListReel | curated-list | 30s | Multi-property |

### Still Compositions

| Format | Dimensions | Platforms |
|--------|-----------|-----------|
| Square | 1080×1080 | IG Feed, FB Feed |
| Pinterest | 1000×1500 | Pinterest |

## Postiz API

- Base: `https://api.postiz.com/public/v1`
- Auth: Bearer token
- Rate limit: 30 req/hour, script uses 2s between + 30s cooldown every 10
- Upload cache: `.schedule-upload-cache.json`
- **VM blocked** — use browser-api-bridge skill in Cowork, or run on Mac

### Channel IDs
- Instagram: `cmlzh9a9a0783ru0yol9yzx7e`
- Facebook: `cmlzc4jlw06ijru0yag75hfhy`
- TikTok: `cmlzgh2wc073zru0yboboy3mf`
- YouTube: `cmlzb137206duru0ya3mi4fge`
- Pinterest: `cmlzhult907ceru0yub8kso5h`

## YouTube Long-Form (separate from scheduler)

9 pre-made development videos in `Digital assets/New Build Videos/`. Upload 1-2/week via YouTube Studio or Postiz as reviewed.

## Analytics Loop

Every post tagged with: project, contentType, platform, slot, date. After 2-4 weeks pull analytics to optimize: best content type per platform, morning vs evening, best days, best projects.

## File Structure

```
property-reels/
├── schedule-engine.mjs           ← Smart scheduler
├── render-vento.sh               ← Full render: videos + stills
├── content-batches/
│   └── vento.json                ← Batch definition
├── out/
│   ├── videos/                   ← Rendered video reels
│   └── social-posts/             ← Rendered stills
└── src/Root.tsx                   ← All compositions
```

## Quick Start

```bash
cd property-reels
bash render-vento.sh                                                    # Render all
node schedule-engine.mjs --batch content-batches/vento.json --dry-run   # Preview
node schedule-engine.mjs --batch content-batches/vento.json             # Go live
```
