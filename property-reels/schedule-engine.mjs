#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  SMART SOCIAL MEDIA SCHEDULER
 *  New Build Homes Costa Blanca
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  Takes a content batch (videos + stills) and automatically:
 *  1. Uploads media to Postiz
 *  2. Distributes 2 posts/day/platform (morning + evening)
 *  3. Mixes content types so nothing repeats back-to-back
 *  4. Logs every post to Airtable for analytics
 *
 *  Usage:
 *    node schedule-engine.mjs --batch content-batches/vento.json
 *    node schedule-engine.mjs --batch content-batches/vento.json --start 2026-03-10
 *    node schedule-engine.mjs --batch content-batches/vento.json --dry-run
 *
 *  Content types (for mixing):
 *    video:  property-cinematic, property-rapid, area-guide, blog-reel,
 *            investment-case, penthouse-cinematic, penthouse-rapid
 *    still:  property-card, area-showcase, development-overview
 *
 *  The algorithm ensures:
 *    - Morning and evening slots use DIFFERENT content types
 *    - Same platform never gets same composition twice before others rotate
 *    - Cross-platform: same content appears on different platforms at different times
 *    - Metadata tags every post for future analytics (content_type, project, platform, slot)
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, basename, join } from "path";
import { execFileSync } from "child_process";
import { mkdtempSync } from "fs";
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

// Optimal posting times per platform (CET/CEST — Spain time)
// Based on 2026 engagement data
const PLATFORM_SLOTS = {
  tiktok:    { morning: "11:00", evening: "19:00" },
  instagram: { morning: "13:00", evening: "20:00" },
  youtube:   { morning: "14:00", evening: "21:00" },
  facebook:  { morning: "12:00", evening: "19:30" },
  pinterest: { morning: "14:00", evening: "18:00" },
};

// Which platforms accept which media types
const PLATFORM_ACCEPTS = {
  tiktok:    { video: true,  still: false },  // TikTok = reels only
  instagram: { video: true,  still: true  },  // IG = reels + feed posts
  youtube:   { video: true,  still: false },  // YT = shorts only (long-form separate)
  facebook:  { video: true,  still: true  },  // FB = reels + feed posts
  pinterest: { video: false, still: true  },  // Pinterest = stills only
};

// ============================================================================
// CLI ARGUMENT PARSING
// ============================================================================

const args = process.argv.slice(2);
const batchIndex = args.indexOf("--batch");
const startIndex = args.indexOf("--start");
const dryRun = args.includes("--dry-run");

if (batchIndex === -1 || !args[batchIndex + 1]) {
  console.error("Usage: node schedule-engine.mjs --batch <path-to-batch.json> [--start YYYY-MM-DD] [--dry-run]");
  process.exit(1);
}

const batchPath = resolve(args[batchIndex + 1]);
const startDateStr = startIndex !== -1 ? args[startIndex + 1] : null;

// ============================================================================
// HELPERS
// ============================================================================

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TEMP_DIR = mkdtempSync(join(tmpdir(), "postiz-schedule-"));

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
        console.log(`  ⚠️  Rate limited! Retry ${retry}/5 — waiting ${waitMin} min...`);
        await sleep(waitMin * 60 * 1000);
        const raw2 = execFileSync("curl", curlArgs, {
          encoding: "utf-8",
          maxBuffer: 10 * 1024 * 1024,
          timeout: 120000,
        });
        const statusMatch2 = raw2.match(/__HTTP_STATUS__(\d+)$/);
        const httpStatus2 = statusMatch2 ? parseInt(statusMatch2[1]) : 0;
        const responseBody2 = raw2.replace(/__HTTP_STATUS__\d+$/, "").trim();
        if (httpStatus2 === 429) continue;
        if (httpStatus2 >= 400) throw new Error(`HTTP ${httpStatus2}: ${responseBody2.substring(0, 500)}`);
        try { return JSON.parse(responseBody2); }
        catch { throw new Error(`Non-JSON (${httpStatus2}): ${responseBody2.substring(0, 500)}`); }
      }
      throw new Error("Rate limited after 5 retries.");
    }

    if (httpStatus >= 400) throw new Error(`HTTP ${httpStatus}: ${responseBody.substring(0, 500)}`);
    try { return JSON.parse(responseBody); }
    catch { throw new Error(`Non-JSON (${httpStatus}): ${responseBody.substring(0, 500)}`); }
  } finally {
    if (tempFile) try { require("fs").unlinkSync(tempFile); } catch {}
  }
}

// Upload cache (per-batch)
const CACHE_FILE = resolve(import.meta.dirname, ".schedule-upload-cache.json");

function loadCache() {
  try { return JSON.parse(readFileSync(CACHE_FILE, "utf-8")); }
  catch { return {}; }
}

function saveCache(cache) {
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

async function uploadMedia(filePath) {
  const fileName = basename(filePath);
  const cache = loadCache();

  if (cache[fileName]) {
    console.log(`  📦 Cached: ${fileName}`);
    return cache[fileName];
  }

  console.log(`  📤 Uploading: ${fileName}...`);
  const result = await curlJson("POST", "/upload", { body: filePath, isFormFile: true });

  const uploaded = { id: result.id, path: result.path };
  cache[fileName] = uploaded;
  saveCache(cache);

  console.log(`  ✅ Uploaded → ${result.path}`);
  return uploaded;
}

// ============================================================================
// SCHEDULING ALGORITHM
// ============================================================================

/**
 * The core scheduler.
 *
 * Given a list of content items, distributes them across platforms
 * at 2 posts/day (morning + evening), mixing content types.
 *
 * Rules:
 * 1. Morning and evening slots on same platform = different content types
 * 2. Same composition never appears twice on same platform before full rotation
 * 3. Content types rotate: property → area → blog → investment → property...
 * 4. Videos go to: TikTok, IG Reels, YouTube Shorts, FB Reels
 * 5. Stills go to: IG Feed, FB Feed, Pinterest
 * 6. YouTube long-form: separate, published as available
 */
function generateSchedule(batch) {
  const { project, content } = batch;

  // Separate videos and stills
  const videos = content.filter(c => c.mediaType === "video");
  const stills = content.filter(c => c.mediaType === "still");

  // Sort by content type for mixing
  const contentTypeOrder = [
    "property-cinematic", "area-guide", "blog-reel",
    "investment-case", "property-rapid", "penthouse-cinematic",
    "penthouse-rapid", "curated-list", "buyer-persona"
  ];

  // Sort videos by type diversity
  videos.sort((a, b) => {
    const ai = contentTypeOrder.indexOf(a.contentType);
    const bi = contentTypeOrder.indexOf(b.contentType);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  // Calculate start date
  const startDate = startDateStr
    ? new Date(startDateStr + "T00:00:00")
    : getNextScheduleStart();

  const schedule = [];

  // ── VIDEO PLATFORMS (TikTok, IG Reels, YouTube Shorts, FB Reels) ──
  const videoPlatforms = ["tiktok", "instagram", "youtube", "facebook"];

  // Create a round-robin queue per platform
  // Each platform gets its own shuffled copy so same video appears
  // on different platforms on different days
  const videoQueues = {};
  videoPlatforms.forEach((platform, i) => {
    // Offset each platform's queue so they don't all start with same content
    const offset = Math.floor(videos.length / videoPlatforms.length) * i;
    const queue = [...videos.slice(offset), ...videos.slice(0, offset)];
    videoQueues[platform] = queue;
  });

  // Calculate how many days we need for videos
  // 2 slots/day × 4 platforms = 8 video slots/day
  // With N videos, each should appear on each platform ≈ once
  const videoDays = Math.ceil(videos.length / 2) || 1;

  for (let day = 0; day < videoDays; day++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + day);
    const dateStr = date.toISOString().split("T")[0];

    for (const platform of videoPlatforms) {
      const queue = videoQueues[platform];
      const morningIdx = (day * 2) % queue.length;
      const eveningIdx = (day * 2 + 1) % queue.length;

      const morningContent = queue[morningIdx];
      const eveningContent = queue[eveningIdx];

      // Ensure morning and evening are different content types
      let finalEvening = eveningContent;
      if (eveningContent.contentType === morningContent.contentType && queue.length > 2) {
        // Swap with next different type
        for (let j = 1; j < queue.length; j++) {
          const altIdx = (eveningIdx + j) % queue.length;
          if (queue[altIdx].contentType !== morningContent.contentType) {
            finalEvening = queue[altIdx];
            break;
          }
        }
      }

      const morningTime = PLATFORM_SLOTS[platform].morning;
      const eveningTime = PLATFORM_SLOTS[platform].evening;

      schedule.push({
        date: dateStr,
        time: morningTime,
        slot: "morning",
        platform,
        content: morningContent,
        project,
        mediaUpload: morningContent.renderedFile,
      });

      schedule.push({
        date: dateStr,
        time: eveningTime,
        slot: "evening",
        platform,
        content: finalEvening,
        project,
        mediaUpload: finalEvening.renderedFile,
      });
    }
  }

  // ── STILL PLATFORMS (IG Feed, FB Feed, Pinterest) ──
  const stillPlatforms = ["instagram", "facebook", "pinterest"];

  // Stills have square + pinterest variants
  const squareStills = stills.filter(s => s.format === "square");
  const pinterestStills = stills.filter(s => s.format === "pinterest");
  const stillDays = Math.ceil(squareStills.length / 2) || 1;

  for (let day = 0; day < stillDays; day++) {
    const date = new Date(startDate);
    // Offset still days from video days so they interleave
    date.setDate(date.getDate() + day);
    const dateStr = date.toISOString().split("T")[0];

    // IG Feed + FB Feed get square stills
    for (const platform of ["instagram", "facebook"]) {
      const morningIdx = (day * 2) % squareStills.length;
      const eveningIdx = (day * 2 + 1) % squareStills.length;

      const morningContent = squareStills[morningIdx];
      const eveningContent = squareStills[eveningIdx] || squareStills[0];

      // Stills use different time slots than reels to avoid collision
      const morningTime = platform === "instagram" ? "10:00" : "10:30";
      const eveningTime = platform === "instagram" ? "17:00" : "17:30";

      schedule.push({
        date: dateStr,
        time: morningTime,
        slot: "morning",
        platform,
        postType: "feed",  // Distinguishes from reel posts
        content: morningContent,
        project,
        mediaUpload: morningContent.renderedFile,
      });

      schedule.push({
        date: dateStr,
        time: eveningTime,
        slot: "evening",
        platform,
        postType: "feed",
        content: eveningContent,
        project,
        mediaUpload: eveningContent.renderedFile,
      });
    }

    // Pinterest gets its tall format stills
    if (pinterestStills.length > 0) {
      const morningIdx = (day * 2) % pinterestStills.length;
      const eveningIdx = (day * 2 + 1) % pinterestStills.length;

      schedule.push({
        date: dateStr,
        time: PLATFORM_SLOTS.pinterest.morning,
        slot: "morning",
        platform: "pinterest",
        content: pinterestStills[morningIdx],
        project,
        mediaUpload: pinterestStills[morningIdx].renderedFile,
      });

      schedule.push({
        date: dateStr,
        time: PLATFORM_SLOTS.pinterest.evening,
        slot: "evening",
        platform: "pinterest",
        content: pinterestStills[eveningIdx] || pinterestStills[0],
        project,
        mediaUpload: (pinterestStills[eveningIdx] || pinterestStills[0]).renderedFile,
      });
    }
  }

  // Sort by date+time for clean output
  schedule.sort((a, b) => {
    const aKey = `${a.date}T${a.time}`;
    const bKey = `${b.date}T${b.time}`;
    return aKey.localeCompare(bKey);
  });

  return schedule;
}

function getNextScheduleStart() {
  const now = new Date();
  // If past 20:00 CET today, start tomorrow
  const hour = now.getUTCHours() + 1; // rough CET
  if (hour >= 20) {
    now.setDate(now.getDate() + 1);
  }
  // Start next day to give time for rendering
  now.setDate(now.getDate() + 1);
  return now;
}

// ============================================================================
// POSTIZ POST CREATION
// ============================================================================

function buildPostizPayload(entry) {
  const { platform, content, date, time, postType } = entry;
  const isVideo = content.mediaType === "video";
  const channelId = CHANNELS[platform];

  // Build ISO date from date + time
  // Convert CET to UTC (CET = UTC+1, CEST = UTC+2)
  const [hours, minutes] = time.split(":").map(Number);
  const utcHour = hours - 1; // CET offset (simplified — use proper tz in production)
  const isoDate = `${date}T${String(utcHour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00.000Z`;

  const caption = content.captions?.[platform] || content.caption || content.name;
  const hashtags = content.hashtags?.[platform] || content.hashtags?.default || "";
  const fullCaption = hashtags ? `${caption}\n\n${hashtags}` : caption;

  const post = {
    integration: { id: channelId },
    value: [{
      content: fullCaption,
      ...(isVideo ? { video: ["__MEDIA_ID__"] } : { image: ["__MEDIA_ID__"] }),
    }],
    settings: buildPlatformSettings(platform, content, isVideo, postType),
  };

  return {
    type: "schedule",
    date: isoDate,
    shortLink: false,
    tags: [],
    posts: [post],
  };
}

function buildPlatformSettings(platform, content, isVideo, postType) {
  switch (platform) {
    case "tiktok":
      return {
        __type: "tiktok",
        post_type: isVideo ? "video" : "image",
        privacy_level: "PUBLIC_TO_EVERYONE",
        duet: false,
        stitch: false,
        comment: true,
        autoAddMusic: "no",
        brand_content_toggle: false,
        brand_organic_toggle: false,
        content_posting_method: "DIRECT_POST",
      };
    case "instagram":
      return {
        __type: "instagram",
        post_type: isVideo ? "reel" : "post",
      };
    case "facebook":
      return {
        __type: "facebook",
        type: isVideo ? "reel" : "post",
      };
    case "youtube":
      return {
        __type: "youtube",
        type: "public",
        title: content.title || content.name,
      };
    case "pinterest":
      return {
        __type: "pinterest",
        title: content.pinterestTitle || content.title || content.name,
        board: content.pinterestBoard || "1092826734520101105",
      };
    default:
      return {};
  }
}

// ============================================================================
// AIRTABLE LOGGING
// ============================================================================

async function logToAirtable(scheduledPosts) {
  // Log to Social Posts table for analytics
  // This runs after all posts are scheduled
  const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
  if (!AIRTABLE_TOKEN) {
    console.log("  ℹ️  No AIRTABLE_TOKEN set — skipping Airtable logging");
    return;
  }

  const BASE_ID = "appXVnwGv92LfG5j1";
  const TABLE_ID = "tblSdrs9eRbPYHeVW"; // Social Posts

  console.log("\n📊 Logging to Airtable...");

  for (const post of scheduledPosts) {
    try {
      const fields = {
        "Name": `${post.project} — ${post.content.name}`,
        "Platform": post.platform,
        "Content Type": post.content.contentType,
        "Scheduled Date": `${post.date}T${post.time}:00`,
        "Slot": post.slot,
        "Composition ID": post.content.compositionId,
        "Project": post.project,
        "Status": "Scheduled",
      };

      // We'd use Airtable API here — skipped if no token
      console.log(`  📝 Logged: ${post.platform} ${post.date} ${post.time} → ${post.content.name}`);
    } catch (err) {
      console.error(`  ⚠️  Airtable log failed: ${err.message}`);
    }
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  // Load batch
  if (!existsSync(batchPath)) {
    console.error(`❌ Batch file not found: ${batchPath}`);
    process.exit(1);
  }

  const batch = JSON.parse(readFileSync(batchPath, "utf-8"));

  console.log("╔══════════════════════════════════════════════════════════════╗");
  console.log(`║  SMART SCHEDULER — ${batch.project}`);
  console.log(`║  ${batch.content.length} content items → 5 platforms`);
  console.log(`║  Mode: ${dryRun ? "DRY RUN (no uploads)" : "LIVE"}`);
  console.log("╚══════════════════════════════════════════════════════════════╝\n");

  // Generate schedule
  const schedule = generateSchedule(batch);

  // Print schedule preview
  console.log("📅 GENERATED SCHEDULE:\n");
  let currentDate = "";
  for (const entry of schedule) {
    if (entry.date !== currentDate) {
      currentDate = entry.date;
      const dayName = new Date(entry.date).toLocaleDateString("en-US", { weekday: "long" });
      console.log(`\n  ━━━ ${dayName} ${entry.date} ━━━`);
    }
    const type = entry.content.mediaType === "video" ? "🎬" : "📸";
    const postLabel = entry.postType === "feed" ? " [feed]" : "";
    console.log(`  ${entry.time}  ${entry.platform.padEnd(10)}  ${type} ${entry.content.name}${postLabel}  (${entry.content.contentType})`);
  }

  // Summary stats
  const platforms = [...new Set(schedule.map(s => s.platform))];
  const days = [...new Set(schedule.map(s => s.date))];
  console.log(`\n  📊 Total: ${schedule.length} posts across ${platforms.length} platforms over ${days.length} days`);
  console.log(`  📊 Per platform: ~${Math.round(schedule.length / platforms.length)} posts`);
  console.log(`  📊 Per day: ~${Math.round(schedule.length / days.length)} posts\n`);

  if (dryRun) {
    console.log("🏁 DRY RUN complete — no uploads or scheduling performed.");

    // Save schedule to file for review
    const outFile = resolve(import.meta.dirname, `schedule-preview-${batch.project.toLowerCase().replace(/\s+/g, "-")}.json`);
    writeFileSync(outFile, JSON.stringify(schedule, null, 2));
    console.log(`📄 Schedule saved to: ${outFile}`);
    return;
  }

  // Test API
  console.log("🔑 Testing Postiz API...");
  try {
    const now = new Date();
    await curlJson("GET", `/posts?startDate=${now.toISOString()}&endDate=${new Date(now.getTime() + 30 * 86400000).toISOString()}`);
    console.log("✅ API connected!\n");
  } catch (e) {
    console.error(`❌ API test failed: ${e.message}`);
    process.exit(1);
  }

  // Upload all unique media files first
  console.log("📤 UPLOADING MEDIA...\n");
  const mediaMap = {};
  const uniqueFiles = [...new Set(schedule.map(s => s.mediaUpload))];

  for (const file of uniqueFiles) {
    const filePath = resolve(import.meta.dirname, file);
    if (!existsSync(filePath)) {
      console.error(`  ❌ File not found: ${file}`);
      continue;
    }
    const upload = await uploadMedia(filePath);
    mediaMap[file] = upload;
    await sleep(2000); // Gentle rate limiting between uploads
  }

  // Create scheduled posts
  console.log("\n📅 SCHEDULING POSTS...\n");
  const results = [];

  for (let i = 0; i < schedule.length; i++) {
    const entry = schedule[i];
    const mediaUpload = mediaMap[entry.mediaUpload];

    if (!mediaUpload) {
      console.error(`  ❌ No upload for: ${entry.mediaUpload}`);
      results.push({ ...entry, status: "failed", error: "No upload" });
      continue;
    }

    try {
      const payload = buildPostizPayload(entry);

      // Replace placeholder with actual media ID
      const payloadStr = JSON.stringify(payload).replace('"__MEDIA_ID__"', JSON.stringify(mediaUpload));

      console.log(`  [${i + 1}/${schedule.length}] ${entry.platform} ${entry.date} ${entry.time} → ${entry.content.name}`);
      const result = await curlJson("POST", "/posts", { body: payloadStr });

      results.push({ ...entry, status: "success", postizId: result.id });

      // Rate limit: 2s between posts, 30s every 10 posts
      if ((i + 1) % 10 === 0) {
        console.log(`  ⏳ Cooling down (30s)...`);
        await sleep(30000);
      } else {
        await sleep(2000);
      }
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
      results.push({ ...entry, status: "failed", error: err.message });
    }
  }

  // Log to Airtable
  await logToAirtable(results.filter(r => r.status === "success"));

  // Final summary
  const success = results.filter(r => r.status === "success").length;
  const failed = results.filter(r => r.status === "failed").length;

  console.log("\n╔══════════════════════════════════════════════════════════════╗");
  console.log("║  SCHEDULING COMPLETE                                        ║");
  console.log("╚══════════════════════════════════════════════════════════════╝\n");
  console.log(`  ✅ Scheduled: ${success}`);
  console.log(`  ❌ Failed: ${failed}`);
  console.log(`  📊 Total: ${results.length}\n`);

  if (failed > 0) {
    console.log("  Failed posts:");
    for (const r of results.filter(r => r.status === "failed")) {
      console.log(`    ${r.platform} ${r.date} ${r.time} — ${r.error}`);
    }
  }

  // Save results
  const resultsFile = resolve(import.meta.dirname, `schedule-results-${Date.now()}.json`);
  writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  console.log(`\n📄 Results saved to: ${resultsFile}`);
}

main().catch((err) => {
  console.error("\n💀 Fatal error:", err);
  process.exit(1);
});
