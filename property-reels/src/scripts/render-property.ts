#!/usr/bin/env tsx
/**
 * Render a single property reel
 * ==============================
 * Usage:
 *   npx tsx src/scripts/render-property.ts N9499
 *   npx tsx src/scripts/render-property.ts N9499 --lang=sv
 *   npx tsx src/scripts/render-property.ts N9499 --lang=de --out=./out
 *
 * Fetches property data from XML feed, renders a 15-second 9:16 reel.
 */

import path from "path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { getPropertyByRef } from "../data/property-loader";

// ============================================================================
// CLI ARGS
// ============================================================================

const args = process.argv.slice(2);
const reference = args.find((a) => !a.startsWith("--"));
const langArg = args.find((a) => a.startsWith("--lang="))?.split("=")[1] || "en";
const outDir = args.find((a) => a.startsWith("--out="))?.split("=")[1] || "./out";

if (!reference) {
  console.error("Usage: npx tsx src/scripts/render-property.ts <REFERENCE> [--lang=en] [--out=./out]");
  console.error("Example: npx tsx src/scripts/render-property.ts N9499 --lang=sv");
  process.exit(1);
}

const VALID_LANGS = ["en", "sv", "nl", "nl-be", "fr", "no", "de", "pl", "ru"];
if (!VALID_LANGS.includes(langArg)) {
  console.error(`Invalid language: ${langArg}. Valid: ${VALID_LANGS.join(", ")}`);
  process.exit(1);
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log(`\n🎬 Rendering property reel for ${reference} (${langArg})\n`);

  // 1. Load property data
  console.log("📊 Loading property data from feed...");
  const property = await getPropertyByRef(reference!);

  if (!property) {
    console.error(`❌ Property ${reference} not found in feed!`);
    console.error("   Make sure the reference exists in the REDSP or BP feed.");
    process.exit(1);
  }

  console.log(`   ✅ Found: ${property.title}`);
  console.log(`   💰 Price: €${property.price.toLocaleString()}`);
  console.log(`   🏠 ${property.bedrooms} bed / ${property.bathrooms} bath / ${property.area}m²`);
  console.log(`   📍 ${property.town}, ${property.province}`);
  console.log(`   🖼️  ${property.images.length} images`);

  if (property.images.length === 0) {
    console.error("❌ No images found for this property. Cannot render reel.");
    process.exit(1);
  }

  // 2. Bundle Remotion project
  console.log("\n📦 Bundling Remotion project...");
  const bundled = await bundle({
    entryPoint: path.resolve(__dirname, "../index.ts"),
    webpackOverride: (config) => config,
  });

  // 3. Select composition
  const inputProps = {
    propertyRef: property.reference,
    images: property.images.slice(0, 6), // Max 6 images for the reel
    title: property.title,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    town: property.town,
    province: property.province,
    type: property.type,
    features: property.features,
    agentName: "Oskar Peterson",
    agentPhone: "+34 634 044 970",
    websiteUrl: "newbuildhomescostablanca.com",
    language: langArg,
  };

  console.log("🎯 Selecting composition...");
  const composition = await selectComposition({
    serveUrl: bundled,
    id: "PropertyReel",
    inputProps,
  });

  // 4. Render
  const outputFile = path.resolve(
    outDir,
    `${property.reference}-${langArg}.mp4`
  );

  console.log(`\n🎥 Rendering to ${outputFile}...`);
  console.log("   This may take 30-60 seconds...\n");

  await renderMedia({
    composition,
    serveUrl: bundled,
    codec: "h264",
    outputLocation: outputFile,
    inputProps,
    onProgress: ({ progress }) => {
      const pct = Math.round(progress * 100);
      process.stdout.write(`\r   Progress: ${pct}%`);
    },
  });

  console.log(`\n\n✅ Done! Reel saved to: ${outputFile}`);
  console.log(`   Duration: 15 seconds | Resolution: 1080x1920 (9:16)`);
  console.log(`   Language: ${langArg} | Codec: H.264\n`);
}

main().catch((err) => {
  console.error("💥 Render failed:", err.message);
  process.exit(1);
});
