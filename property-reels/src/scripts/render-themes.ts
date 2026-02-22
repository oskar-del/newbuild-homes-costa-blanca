#!/usr/bin/env tsx
/**
 * Render all themed reels from generated configs
 * ================================================
 * Usage:
 *   npx tsx src/scripts/render-themes.ts                # Render all themes
 *   npx tsx src/scripts/render-themes.ts --lang=sv      # Swedish themes only
 *   npx tsx src/scripts/render-themes.ts --category=luxury  # Only luxury themes
 *   npx tsx src/scripts/render-themes.ts --limit=5      # First 5 only
 *
 * Reads theme JSON configs from ./themes/ and renders each as an MP4.
 */

import fs from "fs";
import path from "path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";

// ============================================================================
// CLI ARGS
// ============================================================================

const args = process.argv.slice(2);
const langArg = args.find((a) => a.startsWith("--lang="))?.split("=")[1];
const categoryArg = args.find((a) => a.startsWith("--category="))?.split("=")[1];
const limitArg = parseInt(args.find((a) => a.startsWith("--limit="))?.split("=")[1] || "999");
const themesDir = args.find((a) => a.startsWith("--themes="))?.split("=")[1] || "./themes";
const outDir = args.find((a) => a.startsWith("--out="))?.split("=")[1] || "./out/themes";

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log("━".repeat(60));
  console.log("🎬 THEMED REEL RENDERER");
  console.log("━".repeat(60));

  // Load theme configs
  const themesPath = path.resolve(themesDir);
  if (!fs.existsSync(themesPath)) {
    console.error(`❌ Themes directory not found: ${themesPath}`);
    console.error("   Run generate-themes.ts first.");
    process.exit(1);
  }

  let themeFiles = fs.readdirSync(themesPath).filter((f) => f.endsWith(".json"));

  // Filter by language
  if (langArg) {
    themeFiles = themeFiles.filter((f) => f.endsWith(`-${langArg}.json`));
  }

  // Filter by category
  if (categoryArg) {
    themeFiles = themeFiles.filter((f) => {
      const config = JSON.parse(fs.readFileSync(path.join(themesPath, f), "utf-8"));
      return config.category === categoryArg;
    });
  }

  // Apply limit
  themeFiles = themeFiles.slice(0, limitArg);

  console.log(`   Found ${themeFiles.length} theme configs to render\n`);

  if (themeFiles.length === 0) {
    console.error("❌ No matching themes found!");
    process.exit(1);
  }

  // Ensure output directory
  fs.mkdirSync(path.resolve(outDir), { recursive: true });

  // Bundle once
  console.log("📦 Bundling Remotion project...");
  const bundled = await bundle({
    entryPoint: path.resolve(__dirname, "../index.ts"),
    webpackOverride: (config) => config,
  });
  console.log("   ✅ Bundled\n");

  // Render each theme
  const results: { id: string; file: string; success: boolean; error?: string }[] = [];

  for (let i = 0; i < themeFiles.length; i++) {
    const themeFile = themeFiles[i];
    const config = JSON.parse(fs.readFileSync(path.join(themesPath, themeFile), "utf-8"));

    console.log(`[${i + 1}/${themeFiles.length}] ${config.headline}`);
    console.log(`   ${config.properties.length} properties | Category: ${config.category}`);

    const outputFile = path.resolve(outDir, `${config.id}.mp4`);

    try {
      const inputProps = {
        properties: config.properties,
        headline: config.headline,
        subheadline: config.subheadline,
        agentName: "Oskar Peterson",
        agentPhone: "+34 634 044 970",
        websiteUrl: "newbuildhomescostablanca.com",
        language: config.language,
      };

      const composition = await selectComposition({
        serveUrl: bundled,
        id: config.compositionId,
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
      results.push({ id: config.id, file: outputFile, success: true });
    } catch (err: any) {
      console.log(`\r   ❌ Failed: ${err.message}`);
      results.push({ id: config.id, file: outputFile, success: false, error: err.message });
    }
    console.log("");
  }

  // Write manifest for Postiz
  const manifest = {
    renderedAt: new Date().toISOString(),
    themes: results
      .filter((r) => r.success)
      .map((r) => {
        const config = JSON.parse(
          fs.readFileSync(path.join(themesPath, `${r.id}.json`), "utf-8")
        );
        return {
          id: r.id,
          file: r.file,
          headline: config.headline,
          category: config.category,
          socialCaption: config.socialCaption,
          hashtags: config.hashtags,
        };
      }),
  };

  const manifestPath = path.resolve(outDir, "themes-manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  // Summary
  console.log("━".repeat(60));
  console.log("📊 RENDER SUMMARY");
  console.log("━".repeat(60));
  const ok = results.filter((r) => r.success).length;
  const fail = results.filter((r) => !r.success).length;
  console.log(`   ✅ Successful: ${ok}`);
  console.log(`   ❌ Failed:     ${fail}`);
  console.log(`   📁 Output:     ${path.resolve(outDir)}`);
  console.log(`   📋 Manifest:   ${manifestPath}`);
  console.log("\n   Next: npm run publish to schedule on social media");
  console.log("━".repeat(60));
}

main().catch((err) => {
  console.error("💥 Render failed:", err.message);
  process.exit(1);
});
