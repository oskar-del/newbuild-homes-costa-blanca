#!/usr/bin/env node
/**
 * Postiz Auto-Upload — EDIFICIO VENTO ONLY
 * ------------------------------------------
 * Uploads rendered Vento social media stills to Postiz and creates
 * scheduled posts for all 5 connected channels.
 *
 * 10 posts:
 *   1. Vento Overview (from €158K)      — Square + Pinterest
 *   2. Vento 2-Bed (€245K)              — Square + Pinterest
 *   3. Vento Penthouse (€412K)          — Square + Pinterest
 *   4. Vento 3-Bed Flagship (€488K)     — Square + Pinterest
 *   5. Torrevieja Area Showcase          — Square + Pinterest
 *
 * Usage:  node upload-vento-to-postiz.mjs
 *
 * Pre-requisite: Render stills first:
 *   npx remotion still VentoOverviewSquare --output out/social-posts/vento-overview-square.png
 *   npx remotion still VentoOverviewPinterest --output out/social-posts/vento-overview-pinterest.png
 *   ... (see render-vento.sh)
 */

import { readFileSync, writeFileSync, unlinkSync, mkdtempSync } from "fs";
import { resolve, basename, join } from "path";
import { execFileSync } from "child_process";
import { tmpdir } from "os";

// ============================================================================
// CONFIGURATION
// ============================================================================

const API_KEY = "66a61ca1055ae30a313f66b7e445d7a9e9746b9753b1d6778985611ddb6508c3";
const BASE_URL = "https://api.postiz.com/public/v1";

const CHANNELS = {
  youtube:   "cmlzb137206duru0ya3mi4fge",
  facebook:  "cmlzc4jlw06ijru0yag75hfhy",
  tiktok:    "cmlzgh2wc073zru0yboboy3mf",
  instagram: "cmlzh9a9a0783ru0yol9yzx7e",
  pinterest: "cmlzhult907ceru0yub8kso5h",
};

const IMAGE_DIR = resolve(import.meta.dirname, "out/social-posts");

// ============================================================================
// HASHTAG SYSTEM — Torrevieja-focused for Vento
// ============================================================================

const VENTO_TAGS = {
  // Instagram: max 25 tags, all 5 layers
  instagram: {
    property: [
      "#Torrevieja", "#CostaBlanca", "#CostaBlancaSur", "#Alicante", "#Spain",
      "#NewBuild", "#NewBuildApartment", "#EdificioVento",
      "#PropertyForSale", "#BuyInSpain", "#SpainRealEstate",
      "#HusISpanien", "#BostadSpanien",
      "#NieruchomosciHiszpania", "#MieszkanieHiszpania",
      "#ImmobilienSpanien", "#HausKaufenSpanien",
      "#MediterraneanLife", "#ExpatLife", "#SunshineLifestyle",
      "#MoveToSpain", "#LifeInSpain",
      "#TorreviejaProperty", "#BeachProperty", "#InvestInSpain",
    ].join(" "),
    penthouse: [
      "#Torrevieja", "#CostaBlanca", "#CostaBlancaSur", "#Alicante", "#Spain",
      "#NewBuild", "#Penthouse", "#NewBuildPenthouse", "#EdificioVento",
      "#PropertyForSale", "#BuyInSpain", "#SpainRealEstate",
      "#HusISpanien", "#FlyttaTillSpanien",
      "#DomWHiszpanii", "#NieruchomosciHiszpania",
      "#HuisInSpanje", "#WonenInSpanje",
      "#LuxuryProperty", "#PrivatePool", "#RooftopPool",
      "#MediterraneanLife", "#SunshineLifestyle", "#InvestInSpain",
    ].join(" "),
    area: [
      "#Torrevieja", "#CostaBlanca", "#CostaBlancaSur", "#Alicante", "#Spain",
      "#SpainRealEstate", "#PropertyForSale", "#BuyInSpain",
      "#HusISpanien", "#BostadSpanien", "#FlyttaTillSpanien",
      "#NieruchomosciHiszpania", "#MieszkanieHiszpania",
      "#ImmobilienSpanien", "#WohnenInSpanien",
      "#BoligSpania", "#HusISpania",
      "#MediterraneanLife", "#ExpatLife", "#SunshineLifestyle",
      "#BeachLife", "#MoveToSpain", "#LifeInSpain",
      "#DroneView", "#GoldenHour",
    ].join(" "),
  },

  // Facebook: 3-5 tags
  facebook: {
    property: "#Torrevieja #CostaBlanca #NewBuild #Spain",
    penthouse: "#Torrevieja #CostaBlanca #Penthouse #NewBuild #Spain",
    area: "#Torrevieja #CostaBlanca #Spain #MediterraneanLife",
  },

  // TikTok: 6-8 tags
  tiktok: {
    property: "#Torrevieja #CostaBlanca #SpainProperty #NewBuild #MediterraneanLife #ExpatLife #BeachProperty #SpainDream",
    penthouse: "#Torrevieja #CostaBlanca #Penthouse #LuxuryProperty #NewBuild #PrivatePool #SpainProperty #SpainDream",
    area: "#Torrevieja #CostaBlanca #SpainTravel #BeachLife #ExpatLife #MediterraneanLife #MoveToSpain #SunshineLifestyle",
  },

  // YouTube: 3-5 tags
  youtube: {
    property: "#Torrevieja #CostaBlanca #Spain #NewBuild",
    penthouse: "#Torrevieja #CostaBlanca #Spain #Penthouse #NewBuild",
    area: "#Torrevieja #CostaBlanca #Spain #BeachLife",
  },
};

// ============================================================================
// POST DEFINITIONS — 5 Vento posts (Square for IG/FB/TT/YT, Pinterest for Pin)
// ============================================================================

// Scheduling: spread across 1 week, optimal times per platform
// All dates use 2026-03-03 onwards (next Tuesday)
const POSTS = [
  // ── POST 1: Development Overview — the hero shot ──
  {
    name: "Vento Overview",
    squareImage: "vento-overview-square.png",
    pinterestImage: "vento-overview-pinterest.png",
    pinterestTitle: "Edificio Vento — New Build Apartments Torrevieja Centre | From €158,000",
    date: "2026-03-03T09:00:00.000Z",  // Tue 3 Mar 10:00 CET
    propertyUrl: "https://newbuildhomescostablanca.com/blog/edificio-vento-torrevieja-new-build-apartments",
    tagType: "property",
    captions: {
      instagram: (tags) => `Edificio Vento — 10 exclusive new build apartments in walkable central Torrevieja.\n\nFrom just €158,000 for a 1-bed. Penthouses with private rooftop pools from €412K.\n\n📍 10-min walk to Playa del Cura beach\n🏗️ Premium finishes: Roca, Saloni, Climalit\n🔑 Built by AVKR HOMES\n\nA new build you can actually walk everywhere from — that's rare on the Costa Blanca.\n\n👉 Link in bio for the full development spotlight\n📩 DM us for prices & floor plans\n\n${tags}`,
      facebook: (tags) => `Edificio Vento — 10 exclusive new build apartments in walkable central Torrevieja.\n\nFrom just €158,000 for a 1-bed. Penthouses with private rooftop pools from €412K.\n\n📍 10-min walk to Playa del Cura beach\n🏗️ Premium finishes: Roca, Saloni, Climalit\n🔑 Built by AVKR HOMES\n\n🏠 Read the full spotlight: https://newbuildhomescostablanca.com/blog/edificio-vento-torrevieja-new-build-apartments\n\n💬 Comment or message us for prices & floor plans\n\n${tags}`,
      tiktok: (tags) => `New build apartments in Torrevieja city centre from €158K 🏠 10 exclusive units, walk to the beach, private rooftop pools. Edificio Vento.\n\n${tags}`,
      youtube: (tags) => `Edificio Vento — 10 exclusive new build apartments in walkable central Torrevieja from €158,000. Penthouses with private rooftop pools from €412K. 10-min walk to Playa del Cura. Built by AVKR HOMES with premium Roca & Saloni finishes. Read the full development spotlight on newbuildhomescostablanca.com\n\n${tags}`,
      pinterest: () => `Edificio Vento — 10 exclusive new build apartments in central Torrevieja, Costa Blanca. From €158,000 for a 1-bed to €488,000 for a 3-bed duplex penthouse with private pool. Walk to Playa del Cura beach | newbuildhomescostablanca.com`,
    },
  },

  // ── POST 2: Two-Bedroom Apartment — mid-range sweet spot ──
  {
    name: "Vento 2-Bed",
    squareImage: "vento-2bed-square.png",
    pinterestImage: "vento-2bed-pinterest.png",
    pinterestTitle: "2-Bed New Build Apartment Torrevieja Centre | €245,000 | Edificio Vento",
    date: "2026-03-04T09:00:00.000Z",  // Wed 4 Mar 10:00 CET
    propertyUrl: "https://newbuildhomescostablanca.com/blog/edificio-vento-torrevieja-new-build-apartments",
    tagType: "property",
    captions: {
      instagram: (tags) => `2-bedroom apartment in Edificio Vento, central Torrevieja — 89 m², 2 bathrooms.\n\nFrom €245,000.\n\nOpen-plan living, underfloor heating in bathrooms, Saloni porcelain floors, and a private terrace. All in a walkable city centre — shops, restaurants, and Playa del Cura beach within 10 minutes on foot.\n\nOnly 10 apartments in the building. This is boutique living, not a resort complex.\n\n👉 Link in bio\n📩 DM for availability & floor plans\n\n${tags}`,
      facebook: (tags) => `2-bedroom apartment in Edificio Vento, central Torrevieja — 89 m², 2 bathrooms.\n\nFrom €245,000.\n\nOpen-plan living, underfloor heating, Saloni floors, private terrace. Walk to the beach in 10 minutes.\n\nOnly 10 apartments in the entire building — this is boutique, not resort.\n\n🏠 Full details: https://newbuildhomescostablanca.com/blog/edificio-vento-torrevieja-new-build-apartments\n\n💬 Message us for floor plans\n\n${tags}`,
      tiktok: (tags) => `2-bed apartment in Torrevieja city centre — €245K 🏠 89 m², walk to beach, underfloor heating. Only 10 units in the building. Edificio Vento.\n\n${tags}`,
      youtube: (tags) => `2-bedroom apartment in Edificio Vento, Torrevieja — 89 m², 2 bath, from €245,000. Open-plan living, premium finishes, walk to Playa del Cura. Only 10 units in the building. Visit newbuildhomescostablanca.com\n\n${tags}`,
      pinterest: () => `2-Bed New Build Apartment in Torrevieja Centre | €245,000 | 89 m², Open-Plan, Walk to Beach | Edificio Vento by AVKR HOMES | newbuildhomescostablanca.com`,
    },
  },

  // ── POST 3: Penthouse with Private Pool — the aspirational piece ──
  {
    name: "Vento Penthouse",
    squareImage: "vento-penthouse-square.png",
    pinterestImage: "vento-penthouse-pinterest.png",
    pinterestTitle: "Penthouse + Private Pool Torrevieja | €412,000 | Edificio Vento",
    date: "2026-03-05T09:00:00.000Z",  // Thu 5 Mar 10:00 CET
    propertyUrl: "https://newbuildhomescostablanca.com/blog/edificio-vento-torrevieja-new-build-apartments",
    tagType: "penthouse",
    captions: {
      instagram: (tags) => `Duplex penthouse with private rooftop pool — Edificio Vento, Torrevieja.\n\n2 bedrooms, 2 bathrooms, 173 m² across three levels. Solarium terrace with outdoor kitchen overlooking the Mediterranean.\n\n€412,000.\n\nThis isn't a resort — it's a boutique building of just 10 apartments in walkable central Torrevieja. Your own pool, your own rooftop, 10 minutes from the beach on foot.\n\n👉 Link in bio\n📩 DM for a private viewing\n\n${tags}`,
      facebook: (tags) => `Duplex penthouse with private rooftop pool — Edificio Vento, Torrevieja.\n\n2 bed, 2 bath, 173 m² across three levels. Solarium + outdoor kitchen overlooking the Mediterranean.\n\n€412,000.\n\nBoutique building of just 10 units. Your own pool, your own rooftop.\n\n🏠 Full spotlight: https://newbuildhomescostablanca.com/blog/edificio-vento-torrevieja-new-build-apartments\n\n💬 Message us for a viewing\n\n${tags}`,
      tiktok: (tags) => `Penthouse with YOUR OWN rooftop pool in Torrevieja 🏊 €412K. 173 m² duplex, solarium, outdoor kitchen. 10-min walk to beach. Edificio Vento.\n\n${tags}`,
      youtube: (tags) => `Duplex penthouse with private rooftop pool in Torrevieja — 2 bed, 173 m², solarium terrace with outdoor kitchen. €412,000. Edificio Vento is a boutique building of just 10 apartments in walkable central Torrevieja. Visit newbuildhomescostablanca.com\n\n${tags}`,
      pinterest: () => `Penthouse + Private Rooftop Pool in Torrevieja | €412,000 | 173 m² Duplex, Solarium, Outdoor Kitchen | Edificio Vento | newbuildhomescostablanca.com`,
    },
  },

  // ── POST 4: 3-Bed Flagship Penthouse — the investor/luxury piece ──
  {
    name: "Vento 3-Bed",
    squareImage: "vento-3bed-square.png",
    pinterestImage: "vento-3bed-pinterest.png",
    pinterestTitle: "3-Bed Duplex Penthouse Torrevieja | €488,000 | Private Pool | Edificio Vento",
    date: "2026-03-07T09:00:00.000Z",  // Sat 7 Mar 10:00 CET
    propertyUrl: "https://newbuildhomescostablanca.com/blog/edificio-vento-torrevieja-new-build-apartments",
    tagType: "penthouse",
    captions: {
      instagram: (tags) => `The flagship — 3-bedroom duplex penthouse with private pool at Edificio Vento.\n\n220 m², 2 bathrooms, solarium terrace, outdoor kitchen. The largest unit in this boutique 10-apartment building in central Torrevieja.\n\n€488,000.\n\nFor context: comparable new builds in Marbella or Ibiza are 3× this price. Torrevieja gives you the same Mediterranean lifestyle at a fraction of the cost.\n\n👉 Link in bio\n📩 DM for investor pricing & floor plans\n\n${tags}`,
      facebook: (tags) => `The flagship — 3-bed duplex penthouse with private pool at Edificio Vento.\n\n220 m², solarium, outdoor kitchen. The largest unit in a boutique 10-apartment building in central Torrevieja.\n\n€488,000.\n\nComparable new builds in Marbella or Ibiza? 3× this price. Same lifestyle.\n\n🏠 Full details: https://newbuildhomescostablanca.com/blog/edificio-vento-torrevieja-new-build-apartments\n\n💬 Message for investor pricing\n\n${tags}`,
      tiktok: (tags) => `3-bed duplex penthouse with private pool — €488K 🏡 220 m² in central Torrevieja. Same lifestyle as Marbella at 1/3 the price.\n\n${tags}`,
      youtube: (tags) => `The flagship: 3-bed duplex penthouse with private rooftop pool at Edificio Vento, Torrevieja — 220 m², solarium, outdoor kitchen. €488,000. Comparable new builds in Marbella are 3× this price. Visit newbuildhomescostablanca.com for the full spotlight.\n\n${tags}`,
      pinterest: () => `3-Bed Duplex Penthouse + Private Pool | €488,000 | 220 m², Solarium, Outdoor Kitchen | Edificio Vento, Torrevieja | newbuildhomescostablanca.com`,
    },
  },

  // ── POST 5: Torrevieja Area Showcase — lifestyle sell ──
  {
    name: "Vento Torrevieja",
    squareImage: "vento-torrevieja-square.png",
    pinterestImage: "vento-torrevieja-pinterest.png",
    pinterestTitle: "Torrevieja Costa Blanca — New Build Homes From €158,000",
    date: "2026-03-09T09:00:00.000Z",  // Mon 9 Mar 10:00 CET
    propertyUrl: "https://newbuildhomescostablanca.com/areas/torrevieja",
    tagType: "area",
    captions: {
      instagram: (tags) => `Torrevieja — salt lakes, sandy beaches, and one of Europe's healthiest microclimates.\n\n80,000 residents. 10+ beaches. 320 days of sunshine. A proper city with markets, restaurants, healthcare, and an international community.\n\nAnd now: boutique new build apartments in the walkable city centre from just €158,000.\n\nEdificio Vento — 10 exclusive units, 10 minutes from the beach on foot.\n\n👉 Link in bio\n📩 DM for a free Torrevieja property guide\n\n${tags}`,
      facebook: (tags) => `Torrevieja — salt lakes, sandy beaches, and one of Europe's healthiest microclimates.\n\n80,000 residents. 10+ beaches. 320 days of sunshine. And boutique new build apartments in the walkable centre from €158,000.\n\nEdificio Vento — 10 exclusive units, 10 minutes from the beach.\n\n🏠 Explore Torrevieja: https://newbuildhomescostablanca.com/areas/torrevieja\n\n💬 Comment or message for our free Torrevieja guide\n\n${tags}`,
      tiktok: (tags) => `This is Torrevieja, Costa Blanca 🌊 Salt lakes, sandy beaches, 320 days of sunshine. New build apartments from €158K in the city centre.\n\n${tags}`,
      youtube: (tags) => `Torrevieja — salt lakes, sandy beaches, and one of Europe's healthiest microclimates. 80,000 residents, 10+ beaches, 320 days of sunshine. New build apartments in the walkable city centre from €158,000. Visit newbuildhomescostablanca.com\n\n${tags}`,
      pinterest: () => `Torrevieja, Costa Blanca — Salt lakes, sandy beaches, 320 days of sunshine. New build apartments from €158,000 in the walkable city centre. Edificio Vento | newbuildhomescostablanca.com`,
    },
  },
];

// ============================================================================
// HELPERS (same as original upload-to-postiz.mjs)
// ============================================================================

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TEMP_DIR = mkdtempSync(join(tmpdir(), "postiz-vento-"));

async function curlJson(method, endpoint, { body, isFormFile } = {}) {
  const url = `${BASE_URL}${endpoint}`;
  let tempFile = null;

  try {
    const curlArgs = [
      "-s", "-S",
      "-w", "\n__HTTP_STATUS__%{http_code}",
      "-X", method,
      "-H", `Authorization: ${API_KEY}`,
    ];

    if (isFormFile) {
      curlArgs.push("-F", `file=@${body}`);
    } else if (body) {
      tempFile = join(TEMP_DIR, `body-${Date.now()}.json`);
      writeFileSync(tempFile, body, "utf-8");
      curlArgs.push("-H", "Content-Type: application/json");
      curlArgs.push("-d", `@${tempFile}`);
    }

    curlArgs.push(url);

    const raw = execFileSync("curl", curlArgs, {
      encoding: "utf-8",
      maxBuffer: 10 * 1024 * 1024,
      timeout: 120000,
    });

    const statusMatch = raw.match(/__HTTP_STATUS__(\d+)$/);
    const httpStatus = statusMatch ? parseInt(statusMatch[1]) : 0;
    const responseBody = raw.replace(/__HTTP_STATUS__\d+$/, "").trim();

    if (httpStatus === 429) {
      for (let retry = 1; retry <= 5; retry++) {
        const waitMin = retry * 5;
        console.log(`  ⚠️  Rate limited! Retry ${retry}/5 — waiting ${waitMin} minutes...`);
        await new Promise(r => setTimeout(r, waitMin * 60 * 1000));
        const raw2 = execFileSync("curl", curlArgs, {
          encoding: "utf-8",
          maxBuffer: 10 * 1024 * 1024,
          timeout: 120000,
        });
        const statusMatch2 = raw2.match(/__HTTP_STATUS__(\d+)$/);
        const httpStatus2 = statusMatch2 ? parseInt(statusMatch2[1]) : 0;
        const responseBody2 = raw2.replace(/__HTTP_STATUS__\d+$/, "").trim();
        if (httpStatus2 === 429) continue;
        if (httpStatus2 >= 400) {
          throw new Error(`HTTP ${httpStatus2}: ${responseBody2.substring(0, 500)}`);
        }
        try { return JSON.parse(responseBody2); }
        catch { throw new Error(`Non-JSON (${httpStatus2}): ${responseBody2.substring(0, 500)}`); }
      }
      throw new Error("Rate limited after 5 retries. Try again later.");
    }

    if (httpStatus >= 400) {
      throw new Error(`HTTP ${httpStatus}: ${responseBody.substring(0, 500)}`);
    }

    try {
      return JSON.parse(responseBody);
    } catch {
      throw new Error(`Non-JSON (${httpStatus}): ${responseBody.substring(0, 500)}`);
    }
  } finally {
    if (tempFile) {
      try { unlinkSync(tempFile); } catch {}
    }
  }
}

// Upload cache
const CACHE_FILE = resolve(import.meta.dirname, ".vento-upload-cache.json");

function loadCache() {
  try {
    const data = readFileSync(CACHE_FILE, "utf-8");
    return JSON.parse(data);
  } catch { return {}; }
}

function saveCache(cache) {
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

async function uploadImage(imagePath) {
  const fileName = basename(imagePath);
  const cache = loadCache();

  if (cache[fileName]) {
    console.log(`  📦 Using cached upload for ${fileName}`);
    return cache[fileName];
  }

  console.log(`  📤 Uploading ${fileName}...`);
  const result = await curlJson("POST", "/upload", { body: imagePath, isFormFile: true });

  const uploaded = { id: result.id, path: result.path };
  cache[fileName] = uploaded;
  saveCache(cache);

  console.log(`  ✅ Uploaded → ${result.path}`);
  return uploaded;
}

async function createPost(post, squareUpload, pinterestUpload) {
  const tags = VENTO_TAGS;
  const tagType = post.tagType;

  const posts = [];

  // Instagram — square image
  posts.push({
    integration: { id: CHANNELS.instagram },
    value: [{
      content: post.captions.instagram(tags.instagram[tagType]),
      image: [squareUpload],
    }],
    settings: {
      __type: "instagram",
      post_type: "post",
    },
  });

  // Facebook — square image
  posts.push({
    integration: { id: CHANNELS.facebook },
    value: [{
      content: post.captions.facebook(tags.facebook[tagType]),
      image: [squareUpload],
    }],
    settings: {
      __type: "facebook",
      type: "post",
    },
  });

  // TikTok — square image
  posts.push({
    integration: { id: CHANNELS.tiktok },
    value: [{
      content: post.captions.tiktok(tags.tiktok[tagType]),
      image: [squareUpload],
    }],
    settings: {
      __type: "tiktok",
      post_type: "image",
      privacy_level: "PUBLIC_TO_EVERYONE",
      duet: false,
      stitch: false,
      comment: true,
      autoAddMusic: "no",
      brand_content_toggle: false,
      brand_organic_toggle: false,
      content_posting_method: "DIRECT_POST",
    },
  });

  // YouTube — square image, community post
  posts.push({
    integration: { id: CHANNELS.youtube },
    value: [{
      content: post.captions.youtube(tags.youtube[tagType]),
      image: [squareUpload],
    }],
    settings: {
      __type: "youtube",
      type: "public",
      title: post.pinterestTitle || post.name,
    },
  });

  // Pinterest — PINTEREST image (taller format)
  posts.push({
    integration: { id: CHANNELS.pinterest },
    value: [{
      content: post.captions.pinterest(""),
      image: [pinterestUpload],
    }],
    settings: {
      __type: "pinterest",
      title: post.pinterestTitle || post.name,
      board: "1092826734520101105", // "Latest Properties" board
    },
  });

  const payload = {
    type: "schedule",
    date: post.date,
    shortLink: false,
    tags: [],
    posts,
  };

  console.log(`  📝 Creating scheduled post for ${post.date}...`);
  const result = await curlJson("POST", "/posts", { body: JSON.stringify(payload) });

  console.log(`  ✅ Post created! ID: ${result.id || "ok"}`);
  return result;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║   EDIFICIO VENTO — Postiz Upload                 ║");
  console.log("║   5 posts × 5 channels = 25 scheduled posts      ║");
  console.log("║   Each post: Square (IG/FB/TT/YT) + Pinterest    ║");
  console.log("╚══════════════════════════════════════════════════╝");
  console.log();

  // Test API key
  console.log("🔑 Testing API key...");
  try {
    const now = new Date();
    const start = now.toISOString();
    const end = new Date(now.getTime() + 14 * 86400000).toISOString();
    await curlJson("GET", `/posts?startDate=${start}&endDate=${end}`);
    console.log(`✅ API key valid!\n`);
  } catch (e) {
    console.error(`❌ API key test failed: ${e.message}`);
    process.exit(1);
  }

  const results = [];

  for (let i = 0; i < POSTS.length; i++) {
    const post = POSTS[i];
    const squarePath = resolve(IMAGE_DIR, post.squareImage);
    const pinterestPath = resolve(IMAGE_DIR, post.pinterestImage);

    console.log(`\n━━━ [${i + 1}/5] ${post.name} ━━━`);

    try {
      // Upload both formats
      const squareUpload = await uploadImage(squarePath);
      const pinterestUpload = await uploadImage(pinterestPath);

      // Create scheduled post with all 5 channels
      await createPost(post, squareUpload, pinterestUpload);

      results.push({ name: post.name, status: "✅ Success", date: post.date });

      // Rate limit protection: 120s between posts
      if (i < POSTS.length - 1) {
        console.log(`  ⏳ Waiting 120s between posts (${i + 1}/5 done)...`);
        await sleep(120000);
      }
    } catch (err) {
      console.error(`  ❌ Error: ${err.message}`);
      results.push({ name: post.name, status: "❌ Failed", error: err.message });
    }
  }

  // Summary
  console.log("\n\n╔══════════════════════════════════════════════════╗");
  console.log("║   RESULTS SUMMARY                                ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  for (const r of results) {
    console.log(`  ${r.status}  ${r.name}  →  ${r.date || r.error}`);
  }

  const success = results.filter((r) => r.status.includes("✅")).length;
  console.log(`\n  Total: ${success}/${results.length} posts scheduled successfully.`);

  if (success === results.length) {
    console.log("\n  🎉 All Vento posts scheduled! Check platform.postiz.com/launches");
  }
}

main().catch((err) => {
  console.error("\n💀 Fatal error:", err);
  process.exit(1);
});
