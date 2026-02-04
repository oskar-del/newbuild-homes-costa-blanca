# AI Content Generation Strategy

## Overview

This document outlines the strategy for generating SEO-optimized content using AI for the New Build Homes Costa Blanca website. The goal is to create unique, valuable content for each development, builder, area, and golf course while managing API costs effectively.

---

## Content Types & Structure

### 1. Development Pages (`/src/content/developments/{slug}.json`)

Each development JSON file includes:
```json
{
  "slug": "villa-example",
  "projectName": "Villa Example",
  "metaTitle": "Villa Example | New Build in Torrevieja from €250,000",
  "metaDescription": "Discover Villa Example in Torrevieja. Modern 3-bed villas with pool...",
  "content": {
    "heroIntro": "Two paragraphs of compelling introduction...",
    "locationSection": {
      "intro": "About the location...",
      "highlights": ["Near beach", "Close to golf", "Airport 30 min"]
    },
    "propertyFeatures": {
      "intro": "Features description...",
      "features": ["Private pool", "Solarium", "A/C", ...]
    },
    "investmentSection": "Rental yield and investment info...",
    "whyBuySection": ["Reason 1", "Reason 2", ...],
    "faqs": [
      {"question": "...", "answer": "..."},
      ...
    ],
    "conclusion": "CTA paragraph..."
  },
  "property": {
    "ref": "N1234",
    "price": 250000,
    "bedrooms": 3,
    "bathrooms": 2,
    "builtSize": 120,
    "plotSize": 250,
    "town": "Torrevieja",
    "province": "Alicante",
    "propertyType": "Villa",
    "developer": "Builder Name",
    "developerSlug": "builder-name",
    "images": ["url1", "url2", ...]
  },
  "schemaProduct": {...},
  "schemaFAQ": {...}
}
```

### 2. Builder Pages (`/src/content/builders/{slug}.json`)

```json
{
  "slug": "builder-name",
  "name": "Builder Name",
  "towns": ["Torrevieja", "Orihuela Costa"],
  "propertyTypes": ["Villa", "Apartment"],
  "propertyCount": 45,
  "priceRange": {"min": 180000, "max": 850000},
  "content": {
    "metaTitle": "Builder Name | Property Developer Costa Blanca",
    "metaDescription": "View 45 developments by Builder Name...",
    "heroIntro": "Introduction paragraph...",
    "aboutSection": "Company history and expertise...",
    "qualitySection": {
      "intro": "Quality overview...",
      "standards": ["10-year warranty", "Energy efficient", ...]
    },
    "whyChooseSection": ["Reason 1", "Reason 2", ...],
    "faqs": [...],
    "conclusion": "CTA..."
  },
  "schema": {...},
  "schemaFAQ": {...}
}
```

### 3. Area/Location Pages (`/src/content/areas/{slug}.json`)

```json
{
  "slug": "torrevieja",
  "name": "Torrevieja",
  "region": "Costa Blanca South",
  "content": {
    "metaTitle": "New Build Properties in Torrevieja | Costa Blanca",
    "metaDescription": "Find new build homes in Torrevieja...",
    "heroIntro": "About Torrevieja...",
    "livingSection": "What it's like to live here...",
    "amenitiesSection": "Nearby amenities...",
    "transportSection": "Getting around, airport distance...",
    "climateSection": "Weather and climate...",
    "investmentSection": "Property market and rental potential...",
    "neighborhoodGuide": [
      {"name": "La Zenia", "description": "..."},
      {"name": "Punta Prima", "description": "..."}
    ],
    "faqs": [...]
  }
}
```

### 4. Golf Course Pages (`/src/content/golf/{slug}.json`)

```json
{
  "slug": "villamartin-golf",
  "name": "Villamartín Golf",
  "location": "Orihuela Costa",
  "holes": 18,
  "content": {
    "metaTitle": "Villamartín Golf | Properties on Golf Course",
    "metaDescription": "New build homes at Villamartín Golf...",
    "courseDescription": "About the course...",
    "lifestyleSection": "Golf lifestyle benefits...",
    "nearbyDevelopments": ["dev-slug-1", "dev-slug-2"],
    "nearbyBuilders": ["builder-slug-1"],
    "faqs": [...]
  }
}
```

---

## Batch Generation Strategy

### Why Batched Sessions?

1. **Token Management**: Each session has context limits. Batching prevents hitting limits.
2. **Cost Control**: Can pause between batches to review quality.
3. **Iteration**: Can refine prompts between batches based on output quality.
4. **Progress Tracking**: Clear visibility into what's been generated.

### Recommended Batch Sizes

| Content Type | Batch Size | Reason |
|--------------|-----------|--------|
| Developments | 10-15 | Most detailed content |
| Builders | 20-25 | Medium complexity |
| Areas | 10 | Rich location content |
| Golf Courses | 5-10 | Specialized content |
| Articles | 5 | Long-form content |

### Generation Order (Priority)

**Phase 1: Core SEO Pages**
1. Top 20 developments (by popularity/price)
2. Top 10 builders (by development count)
3. Top 10 areas (most searches)

**Phase 2: Expansion**
4. Next 30 developments
5. All remaining builders with 3+ developments
6. All golf courses (10)
7. Remaining areas

**Phase 3: Content Marketing**
8. Article generation (guides, how-tos, area guides)
9. FAQ expansion

---

## Generation Process

### Step 1: Data Collection
```bash
# Export current feed data for AI context
node scripts/export-feed-data.js
```

This creates:
- `data/developments.json` - All development data from feeds
- `data/builders.json` - All builder summaries
- `data/areas.json` - All unique areas with property counts

### Step 2: Generate Content Batch

For each batch:
1. Select 10-15 items to generate
2. Provide AI with:
   - Item data (from feed)
   - Content template (structure above)
   - SEO guidelines
   - Brand voice guidelines
   - Local knowledge prompts

### Step 3: Review & Refine
- Check for accuracy
- Verify local details
- Ensure uniqueness
- Validate SEO elements

### Step 4: Deploy
- Save JSON files to content directory
- Rebuild site (incremental)
- Verify pages render correctly

---

## AI Prompt Templates

### Development Content Prompt

```
You are a real estate copywriter specializing in Spanish new build properties.

Generate content for this development:
- Name: {name}
- Location: {town}, {region}
- Type: {propertyType}
- Price: €{price}
- Bedrooms: {bedrooms}
- Features: {features from description}

Create JSON content following this structure:
[paste structure]

Guidelines:
- Write for UK/Irish/Scandinavian buyers
- Highlight Costa Blanca lifestyle benefits
- Include specific local knowledge (nearby beaches, golf, amenities)
- SEO focus on "new build {town}", "property {town}"
- Create 5 unique FAQs about this specific property/area
- Be factual, avoid superlatives
- Mention distances to airport, beaches, golf
```

### Builder Content Prompt

```
Generate content for this property developer:
- Name: {name}
- Developments: {count} active projects
- Locations: {towns}
- Price Range: €{min} - €{max}

Focus on:
- Established reputation
- Quality standards
- Location expertise
- Buyer benefits
- 5 relevant FAQs
```

---

## Content Directories

```
src/content/
├── developments/
│   ├── villa-example.json
│   └── ...
├── builders/
│   ├── builder-name.json
│   └── ...
├── areas/
│   ├── torrevieja.json
│   └── ...
├── golf/
│   ├── villamartin-golf.json
│   └── ...
└── articles/
    ├── buying-guide-spain.json
    └── ...
```

---

## Tracking Progress

### Content Status File (`content-status.json`)

```json
{
  "lastUpdated": "2025-01-31",
  "developments": {
    "total": 150,
    "generated": 45,
    "pending": 105,
    "queue": ["slug-1", "slug-2", ...]
  },
  "builders": {
    "total": 80,
    "generated": 25,
    "pending": 55
  },
  "areas": {...},
  "golf": {...}
}
```

---

## Quality Checklist

Before deploying generated content:

- [ ] Meta title < 60 characters
- [ ] Meta description 150-160 characters
- [ ] All required sections present
- [ ] FAQs are unique and relevant
- [ ] No placeholder text remaining
- [ ] Local details are accurate
- [ ] Price and specs match feed data
- [ ] Images referenced exist
- [ ] Schema markup is valid
- [ ] Links work correctly

---

## Cost Estimation

| Content Type | ~Tokens/Item | Items | Total Tokens |
|--------------|-------------|-------|--------------|
| Development | 3,000 | 150 | 450,000 |
| Builder | 2,000 | 80 | 160,000 |
| Area | 2,500 | 30 | 75,000 |
| Golf | 2,000 | 10 | 20,000 |
| Articles | 4,000 | 20 | 80,000 |
| **Total** | | | **785,000** |

At ~$3/1M tokens (Claude 3.5 Sonnet), estimated cost: ~$2.50 total

---

## Scripts Needed

1. `scripts/export-feed-data.js` - Export feed data for AI context
2. `scripts/generate-content.js` - Generate content from AI responses
3. `scripts/validate-content.js` - Validate generated JSON
4. `scripts/content-status.js` - Track generation progress

---

## Next Steps

1. Create the content directories
2. Create export script
3. Generate first batch (10 developments)
4. Review and refine prompts
5. Continue with remaining content
