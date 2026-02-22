#!/usr/bin/env tsx
/**
 * Postiz Social Media Publisher
 * ==============================
 * Reads the render manifest and publishes reels to social media via Postiz.
 *
 * Usage:
 *   npx tsx src/scripts/postiz-publish.ts                 # Publish all from manifest
 *   npx tsx src/scripts/postiz-publish.ts --lang=sv       # Swedish manifest
 *   npx tsx src/scripts/postiz-publish.ts --dry-run       # Preview without publishing
 *   npx tsx src/scripts/postiz-publish.ts --schedule=3h   # Schedule 3 hours apart
 *
 * Requires:
 *   POSTIZ_API_KEY env var (or in .env file)
 *   POSTIZ_URL env var (default: http://localhost:5000)
 *
 * Postiz API docs: https://docs.postiz.com
 */

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

// ============================================================================
// CONFIG
// ============================================================================

const POSTIZ_URL = process.env.POSTIZ_URL || "http://localhost:5000";
const POSTIZ_API_KEY = process.env.POSTIZ_API_KEY || "";

// Social media caption templates per language
const CAPTION_TEMPLATES: Record<string, {
  single: string;
  carousel: string;
  hashtags: string[];
}> = {
  en: {
    single: "🏡 {type} in {town} | €{price}\n\n✅ {beds} Bed · {baths} Bath · {area}m²\n📍 {town}, Costa Blanca\n\n{features}\n\n👉 Link in bio\n💬 DM for info",
    carousel: "🏠 New Build Homes in {town}\n\nFrom €{priceFrom}\n\n{count} stunning properties available\n\n👉 Link in bio for all listings",
    hashtags: ["#CostaBblanca", "#SpainProperty", "#NewBuildSpain", "#SpanishProperty", "#PropertyInvestment", "#VillaSpain", "#ApartmentSpain", "#MediterraneanLiving", "#ExpatsSpain"],
  },
  sv: {
    single: "🏡 {type} i {town} | €{price}\n\n✅ {beds} Sovrum · {baths} Bad · {area}m²\n📍 {town}, Costa Blanca\n\n{features}\n\n👉 Länk i bio\n💬 DM för info",
    carousel: "🏠 Nybyggen i {town}\n\nFrån €{priceFrom}\n\n{count} fantastiska bostäder\n\n👉 Länk i bio",
    hashtags: ["#CostaBblanca", "#SpanienBostad", "#Nybygge", "#BoISpanien", "#Utlandsboende", "#Medelhavet", "#SpanskaFastigheter"],
  },
  nl: {
    single: "🏡 {type} in {town} | €{price}\n\n✅ {beds} Slpk · {baths} Badk · {area}m²\n📍 {town}, Costa Blanca\n\n{features}\n\n👉 Link in bio\n💬 DM voor info",
    carousel: "🏠 Nieuwbouw in {town}\n\nVanaf €{priceFrom}\n\n{count} prachtige woningen\n\n👉 Link in bio",
    hashtags: ["#CostaBblanca", "#SpanjeVastgoed", "#Nieuwbouw", "#WonenInSpanje", "#Emigreren", "#SpanjeWonen"],
  },
  "nl-be": {
    single: "🏡 {type} in {town} | €{price}\n\n✅ {beds} Slpk · {baths} Badk · {area}m²\n📍 {town}, Costa Blanca\n\n{features}\n\n👉 Link in bio\n💬 DM voor info",
    carousel: "🏠 Nieuwbouw in {town}\n\nVanaf €{priceFrom}\n\n{count} prachtige woningen\n\n👉 Link in bio",
    hashtags: ["#CostaBblanca", "#SpanjeVastgoed", "#Nieuwbouw", "#WonenInSpanje", "#BelgenInSpanje"],
  },
  fr: {
    single: "🏡 {type} à {town} | €{price}\n\n✅ {beds} Ch. · {baths} SdB · {area}m²\n📍 {town}, Costa Blanca\n\n{features}\n\n👉 Lien en bio\n💬 DM pour info",
    carousel: "🏠 Neuf à {town}\n\nÀ partir de €{priceFrom}\n\n{count} biens disponibles\n\n👉 Lien en bio",
    hashtags: ["#CostaBblanca", "#ImmobilierEspagne", "#Neuf", "#VivreEnEspagne", "#FrançaisEspagne"],
  },
  no: {
    single: "🏡 {type} i {town} | €{price}\n\n✅ {beds} Sov · {baths} Bad · {area}m²\n📍 {town}, Costa Blanca\n\n{features}\n\n👉 Lenke i bio\n💬 DM for info",
    carousel: "🏠 Nybygg i {town}\n\nFra €{priceFrom}\n\n{count} flotte eiendommer\n\n👉 Lenke i bio",
    hashtags: ["#CostaBblanca", "#SpaniaBolig", "#Nybygg", "#BoISpania", "#NordmennISpania"],
  },
  de: {
    single: "🏡 {type} in {town} | €{price}\n\n✅ {beds} Schlafz. · {baths} Badez. · {area}m²\n📍 {town}, Costa Blanca\n\n{features}\n\n👉 Link in Bio\n💬 DM für Info",
    carousel: "🏠 Neubau in {town}\n\nAb €{priceFrom}\n\n{count} traumhafte Immobilien\n\n👉 Link in Bio",
    hashtags: ["#CostaBblanca", "#ImmobilienSpanien", "#Neubau", "#LebenInSpanien", "#AuswandernSpanien"],
  },
  pl: {
    single: "🏡 {type} w {town} | €{price}\n\n✅ {beds} Syp. · {baths} Łaz. · {area}m²\n📍 {town}, Costa Blanca\n\n{features}\n\n👉 Link w bio\n💬 DM po info",
    carousel: "🏠 Nowe budowy w {town}\n\nOd €{priceFrom}\n\n{count} wspaniałych nieruchomości\n\n👉 Link w bio",
    hashtags: ["#CostaBblanca", "#NieruchomosciHiszpania", "#NoweBudowy", "#PolacyWHiszpanii"],
  },
  ru: {
    single: "🏡 {type} в {town} | €{price}\n\n✅ {beds} Спал. · {baths} Ванн. · {area}м²\n📍 {town}, Коста Бланка\n\n{features}\n\n👉 Ссылка в био\n💬 DM для инфо",
    carousel: "🏠 Новостройки в {town}\n\nОт €{priceFrom}\n\n{count} объектов\n\n👉 Ссылка в био",
    hashtags: ["#КостаБланка", "#НедвижимостьИспания", "#Новостройка", "#ЖизньВИспании"],
  },
};

// ============================================================================
// CLI ARGS
// ============================================================================

const args = process.argv.slice(2);
const langArg = args.find((a) => a.startsWith("--lang="))?.split("=")[1] || "en";
const outDir = args.find((a) => a.startsWith("--out="))?.split("=")[1] || "./out";
const dryRun = args.includes("--dry-run");
const scheduleArg = args.find((a) => a.startsWith("--schedule="))?.split("=")[1] || "3h";

// ============================================================================
// HELPERS
// ============================================================================

function parseScheduleInterval(s: string): number {
  const match = s.match(/^(\d+)(m|h|d)$/);
  if (!match) return 3 * 60 * 60 * 1000; // Default 3 hours
  const val = parseInt(match[1]);
  const unit = match[2];
  if (unit === "m") return val * 60 * 1000;
  if (unit === "h") return val * 60 * 60 * 1000;
  if (unit === "d") return val * 24 * 60 * 60 * 1000;
  return 3 * 60 * 60 * 1000;
}

function generateCaption(
  property: any,
  lang: string,
  type: "single" | "carousel" = "single"
): string {
  const templates = CAPTION_TEMPLATES[lang] || CAPTION_TEMPLATES.en;
  let caption = templates[type];

  // Replace placeholders
  caption = caption
    .replace("{type}", property.type || "Property")
    .replace("{town}", property.town || "Costa Blanca")
    .replace("{price}", (property.price || 0).toLocaleString("en-GB"))
    .replace("{priceFrom}", (property.priceFrom || property.price || 0).toLocaleString("en-GB"))
    .replace("{beds}", String(property.bedrooms || 0))
    .replace("{baths}", String(property.bathrooms || 0))
    .replace("{area}", String(property.area || 0))
    .replace("{count}", String(property.count || 5))
    .replace("{features}", (property.features || []).map((f: string) => `✨ ${f}`).join("\n"));

  // Add hashtags
  const hashtags = templates.hashtags.slice(0, 6).join(" ");
  caption += `\n\n${hashtags}`;

  return caption;
}

// ============================================================================
// POSTIZ API CLIENT
// ============================================================================

interface PostizScheduleRequest {
  content: string;
  mediaUrl?: string;
  mediaPath?: string;
  scheduledAt?: string;
  platforms: string[];
  type: "reel" | "post" | "story";
}

async function postizApiCall(
  endpoint: string,
  method: string,
  body?: any
): Promise<any> {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, POSTIZ_URL);
    const client = url.protocol === "https:" ? https : http;

    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${POSTIZ_API_KEY}`,
      },
    };

    const req = client.request(options, (res) => {
      let data = "";
      res.on("data", (chunk: string) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve({ raw: data, status: res.statusCode });
        }
      });
    });

    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function scheduleReel(request: PostizScheduleRequest): Promise<any> {
  return postizApiCall("/api/posts", "POST", {
    content: request.content,
    media: request.mediaPath ? [{ path: request.mediaPath }] : [],
    date: request.scheduledAt,
    integration: request.platforms,
    type: request.type,
  });
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log("━".repeat(60));
  console.log("📱 POSTIZ SOCIAL MEDIA PUBLISHER");
  console.log("━".repeat(60));
  console.log(`   Language:  ${langArg}`);
  console.log(`   Schedule:  Every ${scheduleArg}`);
  console.log(`   Dry run:   ${dryRun ? "YES (preview only)" : "No"}`);
  console.log(`   Postiz:    ${POSTIZ_URL}`);
  console.log("━".repeat(60));

  // Load manifest
  const manifestPath = path.resolve(outDir, `manifest-${langArg}.json`);
  if (!fs.existsSync(manifestPath)) {
    console.error(`❌ Manifest not found: ${manifestPath}`);
    console.error("   Run render-batch.ts first to generate reels.");
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  const reels = manifest.reels || [];
  console.log(`\n📋 Found ${reels.length} reels in manifest\n`);

  if (reels.length === 0) {
    console.error("❌ No reels in manifest!");
    process.exit(1);
  }

  // Check Postiz connection (unless dry run)
  if (!dryRun) {
    if (!POSTIZ_API_KEY) {
      console.error("❌ POSTIZ_API_KEY not set!");
      console.error("   Set it as an environment variable or in .env");
      console.error("   Get your API key from Postiz dashboard → Settings → API");
      process.exit(1);
    }

    try {
      const health = await postizApiCall("/api/health", "GET");
      console.log(`✅ Postiz connected: ${JSON.stringify(health)}\n`);
    } catch (err: any) {
      console.error(`❌ Cannot connect to Postiz at ${POSTIZ_URL}: ${err.message}`);
      console.error("   Make sure Postiz is running (docker compose up)");
      process.exit(1);
    }
  }

  // Schedule reels
  const intervalMs = parseScheduleInterval(scheduleArg);
  const now = new Date();

  for (let i = 0; i < reels.length; i++) {
    const reel = reels[i];
    const property = reel.property;
    const scheduledAt = new Date(now.getTime() + i * intervalMs);

    const caption = generateCaption(property, langArg, "single");

    console.log(`[${i + 1}/${reels.length}] ${property.reference} - ${property.title}`);
    console.log(`   📅 Scheduled: ${scheduledAt.toLocaleString()}`);
    console.log(`   📝 Caption preview:`);
    console.log(`   ${caption.split("\n").slice(0, 3).join("\n   ")}...`);

    if (!dryRun) {
      try {
        const result = await scheduleReel({
          content: caption,
          mediaPath: reel.file,
          scheduledAt: scheduledAt.toISOString(),
          platforms: ["instagram", "tiktok"],
          type: "reel",
        });
        console.log(`   ✅ Scheduled: ${JSON.stringify(result?.id || result)}`);
      } catch (err: any) {
        console.log(`   ❌ Failed: ${err.message}`);
      }
    } else {
      console.log("   ⏭️  Skipped (dry run)");
    }
    console.log("");
  }

  // Summary
  console.log("━".repeat(60));
  console.log("📊 PUBLISHING SUMMARY");
  console.log("━".repeat(60));
  console.log(`   Reels:     ${reels.length}`);
  console.log(`   Language:  ${langArg}`);
  console.log(`   Interval:  ${scheduleArg}`);
  console.log(`   Platforms: Instagram Reels, TikTok`);
  if (dryRun) {
    console.log("\n   ℹ️  This was a dry run. Run without --dry-run to publish.");
  }
  console.log("━".repeat(60));
}

main().catch((err) => {
  console.error("💥 Publisher failed:", err.message);
  process.exit(1);
});
