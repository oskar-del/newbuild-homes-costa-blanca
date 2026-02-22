#!/usr/bin/env tsx
/**
 * Batch render property reels
 * ============================
 * Usage:
 *   npx tsx src/scripts/render-batch.ts                     # Top 10 featured, English
 *   npx tsx src/scripts/render-batch.ts --lang=sv           # Swedish
 *   npx tsx src/scripts/render-batch.ts --town=Torrevieja   # Filter by town
 *   npx tsx src/scripts/render-batch.ts --type=Villa        # Filter by type
 *   npx tsx src/scripts/render-batch.ts --limit=20          # Render 20 reels
 *   npx tsx src/scripts/render-batch.ts --carousel          # Render a carousel too
 *   npx tsx src/scripts/render-batch.ts --refs=N9499,N8059  # Specific references
 *
 * Fetches all properties from XML feeds, filters, and renders reels in sequence.
 */

import path from "path";
import fs from "fs";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import {
  loadAllProperties,
  getPropertiesByTown,
  getPropertiesByType,
  getFeaturedProperties,
  getPropertyByRef,
  type ReelProperty,
} from "../data/property-loader";

// ============================================================================
// CLI ARGS
// ============================================================================

const args = process.argv.slice(2);
const langArg = args.find((a) => a.startsWith("--lang="))?.split("=")[1] || "en";
const townArg = args.find((a) => a.startsWith("--town="))?.split("=")[1];
const typeArg = args.find((a) => a.startsWith("--type="))?.split("=")[1];
const limitArg = parseInt(args.find((a) => a.startsWith("--limit="))?.split("=")[1] || "10");
const outDir = args.find((a) => a.startsWith("--out="))?.split("=")[1] || "./out";
const doCarousel = args.includes("--carousel");
const refsArg = args.find((a) => a.startsWith("--refs="))?.split("=")[1];

const VALID_LANGS = ["en", "sv", "nl", "nl-be", "fr", "no", "de", "pl", "ru"];
if (!VALID_LANGS.includes(langArg)) {
  console.error(`Invalid language: ${langArg}. Valid: ${VALID_LANGS.join(", ")}`);
  process.exit(1);
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log("━".repeat(60));
  console.log("🎬 BATCH PROPERTY REEL RENDERER");
  console.log("━".repeat(60));
  console.log(`   Language: ${langArg}`);
  console.log(`   Output:   ${path.resolve(outDir)}`);
  if (townArg) console.log(`   Town:     ${townArg}`);
  if (typeArg) console.log(`   Type:     ${typeArg}`);
  if (refsArg) console.log(`   Refs:     ${refsArg}`);
  console.log(`   Limit:    ${limitArg}`);
  console.log(`   Carousel: ${doCarousel ? "Yes" : "No"}`);
  console.log("━".repeat(60));

  // 1. Load properties
  console.log("\n📊 Loading property data from feeds...");
  let properties: ReelProperty[];

  if (refsArg) {
    // Specific references
    const refs = refsArg.split(",").map((r) => r.trim());
    const loaded = await Promise.all(refs.map((r) => getPropertyByRef(r)));
    properties = loaded.filter((p): p is ReelProperty => p !== null);
    console.log(`   Found ${properties.length}/${refs.length} specified properties`);
  } else if (townArg) {
    properties = await getPropertiesByTown(townArg, limitArg);
    console.log(`   Found ${properties.length} properties in ${townArg}`);
  } else if (typeArg) {
    properties = await getPropertiesByType(typeArg, limitArg);
    console.log(`   Found ${properties.length} ${typeArg} properties`);
  } else {
    properties = await getFeaturedProperties(limitArg);
    console.log(`   Found ${properties.length} featured properties`);
  }

  if (properties.length === 0) {
    console.error("❌ No properties found matching criteria!");
    process.exit(1);
  }

  // Ensure output directory exists
  fs.mkdirSync(path.resolve(outDir), { recursive: true });

  // 2. Bundle Remotion project (once)
  console.log("\n📦 Bundling Remotion project...");
  const bundled = await bundle({
    entryPoint: path.resolve(__dirname, "../index.ts"),
    webpackOverride: (config) => config,
  });
  console.log("   ✅ Bundled successfully");

  // 3. Render individual property reels
  console.log(`\n🎥 Rendering ${properties.length} property reels...\n`);

  const results: { ref: string; file: string; success: boolean; error?: string }[] = [];

  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];
    const outputFile = path.resolve(outDir, `${property.reference}-${langArg}.mp4`);

    console.log(`[${i + 1}/${properties.length}] ${property.reference} - ${property.title}`);
    console.log(`   💰 €${property.price.toLocaleString()} | ${property.bedrooms}bed/${property.bathrooms}bath | ${property.area}m²`);

    try {
      const inputProps = {
        propertyRef: property.reference,
        images: property.images.slice(0, 6),
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

      const composition = await selectComposition({
        serveUrl: bundled,
        id: "PropertyReel",
        inputProps,
      });

      await renderMedia({
        composition,
        serveUrl: bundled,
        codec: "h264",
        outputLocation: outputFile,
        inputProps,
        onProgress: ({ progress }) => {
          const pct = Math.round(progress * 100);
          process.stdout.write(`\r   Rendering: ${pct}%`);
        },
      });

      console.log(`\r   ✅ Saved: ${outputFile}`);
      results.push({ ref: property.reference, file: outputFile, success: true });
    } catch (err: any) {
      console.log(`\r   ❌ Failed: ${err.message}`);
      results.push({ ref: property.reference, file: outputFile, success: false, error: err.message });
    }
    console.log("");
  }

  // 4. Optionally render carousel
  if (doCarousel && properties.length >= 2) {
    console.log("🎬 Rendering property carousel...\n");

    const carouselProps = {
      properties: properties.slice(0, 5).map((p) => ({
        reference: p.reference,
        image: p.images[0] || "",
        title: p.title,
        price: p.price,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        area: p.area,
        town: p.town,
        type: p.type,
      })),
      headline: townArg
        ? `New Build Homes ${townArg}`
        : "New Build Homes Costa Blanca",
      subheadline: `From €${Math.min(...properties.map((p) => p.price)).toLocaleString("en-GB")}`,
      agentName: "Oskar Peterson",
      agentPhone: "+34 634 044 970",
      websiteUrl: "newbuildhomescostablanca.com",
      language: langArg,
    };

    const carouselFile = path.resolve(
      outDir,
      `carousel-${townArg || "featured"}-${langArg}.mp4`
    );

    try {
      const composition = await selectComposition({
        serveUrl: bundled,
        id: "PropertyCarousel",
        inputProps: carouselProps,
      });

      await renderMedia({
        composition,
        serveUrl: bundled,
        codec: "h264",
        outputLocation: carouselFile,
        inputProps: carouselProps,
        onProgress: ({ progress }) => {
          const pct = Math.round(progress * 100);
          process.stdout.write(`\r   Rendering carousel: ${pct}%`);
        },
      });

      console.log(`\r   ✅ Carousel saved: ${carouselFile}\n`);
    } catch (err: any) {
      console.log(`\r   ❌ Carousel failed: ${err.message}\n`);
    }
  }

  // 5. Summary
  console.log("━".repeat(60));
  console.log("📊 BATCH RENDER SUMMARY");
  console.log("━".repeat(60));

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`   ✅ Successful: ${successful.length}`);
  console.log(`   ❌ Failed:     ${failed.length}`);
  console.log(`   📁 Output:     ${path.resolve(outDir)}`);

  if (failed.length > 0) {
    console.log("\n   Failed renders:");
    for (const f of failed) {
      console.log(`   - ${f.ref}: ${f.error}`);
    }
  }

  console.log("\n" + "━".repeat(60));

  // Write manifest JSON for Postiz integration
  const manifest = {
    renderedAt: new Date().toISOString(),
    language: langArg,
    reels: successful.map((r) => ({
      reference: r.ref,
      file: r.file,
      property: properties.find((p) => p.reference === r.ref),
    })),
  };

  const manifestPath = path.resolve(outDir, `manifest-${langArg}.json`);
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`📋 Manifest: ${manifestPath}`);
}

main().catch((err) => {
  console.error("💥 Batch render failed:", err.message);
  process.exit(1);
});
