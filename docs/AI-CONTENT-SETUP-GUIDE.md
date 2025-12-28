# AI Content Generation Setup Guide

## Quick Overview

Your website now has an AI-powered SEO content system that generates 2,500-4,000 word articles for each development. Here's what you need to do to activate it.

---

## Step 1: Get Your Anthropic API Key

1. Go to: **https://console.anthropic.com/**
2. Sign up or log in
3. Navigate to **API Keys** in the left sidebar
4. Click **Create Key**
5. Name it something like "newbuild-website"
6. Copy the key (starts with `sk-ant-...`)

**Cost estimate:** ~$0.10-0.20 per article generated (using Claude Sonnet)

---

## Step 2: Set Up Locally

### 2a. Create the environment file

In your project root (`newbuild-nextjs/`), create a file called `.env.local`:

```bash
# Create the file
touch .env.local
```

### 2b. Add your API key

Open `.env.local` and add:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Replace `sk-ant-your-key-here` with your actual key from Step 1.

**Important:** This file is already in `.gitignore` so it won't be committed to GitHub.

---

## Step 3: Generate Content

### Option A: Generate ALL content (recommended first time)

```bash
npm run generate-content -- --all
```

This will:
- Fetch all developments from the XML feed
- Generate a 2,500-4,000 word article for each one
- Save them to `src/content/generated/`
- Take about 30-60 seconds per development

### Option B: Generate for a specific development

```bash
npm run generate-content -- --dev oasis-laguna-ii
```

### Option C: Generate only missing content

```bash
npm run generate-content
```

This skips developments that already have generated content.

---

## Step 4: Verify Content Was Generated

Check the generated files:

```bash
ls -la src/content/generated/
```

You should see files like:
```
development-oasis-golf-la-finca.json
development-oasis-laguna-ii.json
development-oasis-villas-sun.json
```

Test locally:

```bash
npm run dev
```

Visit `http://localhost:3000/developments/oasis-golf-la-finca` - you should see the full SEO article.

---

## Step 5: Commit Generated Content

The generated JSON files should be committed to your repo:

```bash
git add src/content/generated/
git commit -m "Add AI-generated SEO content for developments"
git push
```

**Why commit these files?** 
- Content is generated at build time, not runtime
- No API calls needed during deployment
- Faster builds and no API key needed in Netlify for content serving

---

## Step 6: Set Up Netlify (Optional but Recommended)

If you want to regenerate content during Netlify builds:

1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: Your API key from Step 1

Then update your `netlify.toml` build command:

```toml
[build]
  command = "npm run generate-content && npm run build"
  publish = ".next"
```

**Note:** This will regenerate content on every deploy. For production, you probably want to generate locally and commit the files instead.

---

## Regenerating Content

### When to regenerate:

- New development added to XML feed
- Development details changed significantly
- You want to refresh/improve the content
- Content is older than 30 days

### How to regenerate a specific development:

```bash
npm run generate-content -- --dev slug-name
```

### How to regenerate everything:

```bash
npm run generate-content -- --all
```

---

## Troubleshooting

### "ANTHROPIC_API_KEY is not set"

Make sure `.env.local` exists in your project root with:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-key
```

### "Error generating content for [development]"

- Check your API key is valid
- Check you have API credits
- The XML feed may not have data for that development

### Content not showing on page

1. Make sure the JSON file exists in `src/content/generated/`
2. Make sure the filename matches: `development-{slug}.json`
3. Rebuild: `npm run build`

### Page shows fallback content instead of AI content

The slug in the URL must match the slug in the JSON filename:
- URL: `/developments/oasis-golf-la-finca`
- File: `development-oasis-golf-la-finca.json`

---

## File Locations Reference

| File | Purpose |
|------|---------|
| `.env.local` | Your API key (don't commit) |
| `src/lib/ai-content-generator.ts` | AI generation logic |
| `src/lib/content-store.ts` | Saves/loads generated content |
| `src/scripts/generate-content.ts` | CLI script to run generation |
| `src/content/generated/` | Where generated JSON files live |
| `src/components/AIGeneratedContent.tsx` | Renders the content + schemas |

---

## Quick Command Reference

```bash
# Generate all content
npm run generate-content -- --all

# Generate specific development  
npm run generate-content -- --dev slug-name

# Generate missing only
npm run generate-content

# Build site
npm run build

# Run locally
npm run dev
```

---

## Cost Estimation

Using Claude 3.5 Sonnet:
- ~$0.10-0.20 per development article
- 10 developments = ~$1-2
- 50 developments = ~$5-10

Content only regenerates when you run the script, so costs are one-time per article.
