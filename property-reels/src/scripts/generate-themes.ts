#!/usr/bin/env tsx
/**
 * Theme Generator — Auto-creates reel configs from live feed data
 * ================================================================
 * Fetches all properties from XML feeds and generates themed reel
 * configurations like:
 *   - "Top 5 Key-Ready Villas in Javea"
 *   - "New Build Apartments Under €200k Guardamar"
 *   - "Luxury Penthouses Costa Blanca South"
 *   - "Best Value New Builds Torrevieja"
 *
 * Usage:
 *   npx tsx src/scripts/generate-themes.ts                  # Generate all themes
 *   npx tsx src/scripts/generate-themes.ts --lang=sv        # Swedish themes
 *   npx tsx src/scripts/generate-themes.ts --render         # Generate AND render
 *   npx tsx src/scripts/generate-themes.ts --list           # Just list what would be generated
 *
 * Output: ./themes/ directory with JSON configs for each reel
 */

import fs from "fs";
import path from "path";
import {
  loadAllProperties,
  type ReelProperty,
} from "../data/property-loader";

// ============================================================================
// TYPES
// ============================================================================

interface ThemeConfig {
  id: string;
  compositionId: "PropertyCarousel";
  headline: string;
  subheadline: string;
  properties: {
    reference: string;
    image: string;
    title: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    town: string;
    type: string;
  }[];
  language: string;
  category: string;
  socialCaption: string;
  hashtags: string[];
}

// ============================================================================
// THEME HEADLINES PER LANGUAGE
// ============================================================================

const HEADLINES: Record<string, {
  topIn: (n: number, type: string, town: string) => string;
  under: (price: string, type: string, town: string) => string;
  luxury: (town: string) => string;
  bestValue: (town: string) => string;
  newBuilds: (town: string) => string;
  keyReady: (type: string, area: string) => string;
}> = {
  en: {
    topIn: (n, type, town) => `Top ${n} ${type}s in ${town}`,
    under: (price, type, town) => `${type}s Under ${price} in ${town}`,
    luxury: (town) => `Luxury New Builds ${town}`,
    bestValue: (town) => `Best Value in ${town}`,
    newBuilds: (town) => `New Build Homes ${town}`,
    keyReady: (type, area) => `Key-Ready ${type}s ${area}`,
  },
  sv: {
    topIn: (n, type, town) => `Topp ${n} ${type} i ${town}`,
    under: (price, type, town) => `${type} Under ${price} i ${town}`,
    luxury: (town) => `Lyxiga Nybyggen ${town}`,
    bestValue: (town) => `Bästa Priserna i ${town}`,
    newBuilds: (town) => `Nybyggda Hem ${town}`,
    keyReady: (type, area) => `Inflyttningsklara ${type} ${area}`,
  },
  nl: {
    topIn: (n, type, town) => `Top ${n} ${type}s in ${town}`,
    under: (price, type, town) => `${type}s Onder ${price} in ${town}`,
    luxury: (town) => `Luxe Nieuwbouw ${town}`,
    bestValue: (town) => `Beste Prijs in ${town}`,
    newBuilds: (town) => `Nieuwbouw ${town}`,
    keyReady: (type, area) => `Sleutelklare ${type}s ${area}`,
  },
  "nl-be": {
    topIn: (n, type, town) => `Top ${n} ${type}s in ${town}`,
    under: (price, type, town) => `${type}s Onder ${price} in ${town}`,
    luxury: (town) => `Luxe Nieuwbouw ${town}`,
    bestValue: (town) => `Beste Prijs in ${town}`,
    newBuilds: (town) => `Nieuwbouw ${town}`,
    keyReady: (type, area) => `Sleutelklare ${type}s ${area}`,
  },
  fr: {
    topIn: (n, type, town) => `Top ${n} ${type}s à ${town}`,
    under: (price, type, town) => `${type}s Moins de ${price} à ${town}`,
    luxury: (town) => `Neuf de Luxe ${town}`,
    bestValue: (town) => `Meilleurs Prix à ${town}`,
    newBuilds: (town) => `Constructions Neuves ${town}`,
    keyReady: (type, area) => `${type}s Clé en Main ${area}`,
  },
  no: {
    topIn: (n, type, town) => `Topp ${n} ${type} i ${town}`,
    under: (price, type, town) => `${type} Under ${price} i ${town}`,
    luxury: (town) => `Luksus Nybygg ${town}`,
    bestValue: (town) => `Beste Priser i ${town}`,
    newBuilds: (town) => `Nybygg ${town}`,
    keyReady: (type, area) => `Innflyttingsklare ${type} ${area}`,
  },
  de: {
    topIn: (n, type, town) => `Top ${n} ${type}s in ${town}`,
    under: (price, type, town) => `${type}s Unter ${price} in ${town}`,
    luxury: (town) => `Luxus-Neubauten ${town}`,
    bestValue: (town) => `Beste Preise in ${town}`,
    newBuilds: (town) => `Neubauten ${town}`,
    keyReady: (type, area) => `Schlüsselfertige ${type}s ${area}`,
  },
  pl: {
    topIn: (n, type, town) => `Top ${n} ${type} w ${town}`,
    under: (price, type, town) => `${type} Poniżej ${price} w ${town}`,
    luxury: (town) => `Luksusowe Nowe Budowy ${town}`,
    bestValue: (town) => `Najlepsze Ceny w ${town}`,
    newBuilds: (town) => `Nowe Budowy ${town}`,
    keyReady: (type, area) => `Gotowe do Zamieszkania ${type} ${area}`,
  },
  ru: {
    topIn: (n, type, town) => `Топ ${n} ${type} в ${town}`,
    under: (price, type, town) => `${type} до ${price} в ${town}`,
    luxury: (town) => `Элитные Новостройки ${town}`,
    bestValue: (town) => `Лучшие Цены в ${town}`,
    newBuilds: (town) => `Новостройки ${town}`,
    keyReady: (type, area) => `Готовые к Заселению ${type} ${area}`,
  },
};

// ============================================================================
// SOCIAL CAPTIONS PER LANGUAGE
// ============================================================================

const SOCIAL: Record<string, {
  caption: (headline: string, priceFrom: string, count: number) => string;
  hashtags: string[];
}> = {
  en: {
    caption: (h, p, c) => `🏠 ${h}\n\n💰 From ${p}\n📍 ${c} properties available\n\n👉 Link in bio for details\n💬 DM us on WhatsApp`,
    hashtags: ["#CostaBblanca", "#SpainProperty", "#NewBuildSpain", "#SpanishRealEstate", "#PropertyInvestment", "#MediterraneanLiving", "#ExpatsSpain", "#SpainHomes"],
  },
  sv: {
    caption: (h, p, c) => `🏠 ${h}\n\n💰 Från ${p}\n📍 ${c} bostäder tillgängliga\n\n👉 Länk i bio\n💬 Skriv till oss på WhatsApp`,
    hashtags: ["#CostaBblanca", "#SpanienBostad", "#Nybygge", "#BoISpanien", "#Utlandsboende", "#Medelhavet"],
  },
  nl: {
    caption: (h, p, c) => `🏠 ${h}\n\n💰 Vanaf ${p}\n📍 ${c} woningen beschikbaar\n\n👉 Link in bio\n💬 Stuur ons een WhatsApp`,
    hashtags: ["#CostaBblanca", "#SpanjeVastgoed", "#Nieuwbouw", "#WonenInSpanje", "#Emigreren"],
  },
  "nl-be": {
    caption: (h, p, c) => `🏠 ${h}\n\n💰 Vanaf ${p}\n📍 ${c} woningen beschikbaar\n\n👉 Link in bio\n💬 Stuur ons een WhatsApp`,
    hashtags: ["#CostaBblanca", "#SpanjeVastgoed", "#Nieuwbouw", "#BelgenInSpanje"],
  },
  fr: {
    caption: (h, p, c) => `🏠 ${h}\n\n💰 À partir de ${p}\n📍 ${c} biens disponibles\n\n👉 Lien en bio\n💬 Contactez-nous sur WhatsApp`,
    hashtags: ["#CostaBblanca", "#ImmobilierEspagne", "#Neuf", "#VivreEnEspagne"],
  },
  no: {
    caption: (h, p, c) => `🏠 ${h}\n\n💰 Fra ${p}\n📍 ${c} eiendommer tilgjengelig\n\n👉 Lenke i bio\n💬 Send oss en WhatsApp`,
    hashtags: ["#CostaBblanca", "#SpaniaBolig", "#Nybygg", "#BoISpania"],
  },
  de: {
    caption: (h, p, c) => `🏠 ${h}\n\n💰 Ab ${p}\n📍 ${c} Immobilien verfügbar\n\n👉 Link in Bio\n💬 Schreiben Sie uns auf WhatsApp`,
    hashtags: ["#CostaBblanca", "#ImmobilienSpanien", "#Neubau", "#LebenInSpanien"],
  },
  pl: {
    caption: (h, p, c) => `🏠 ${h}\n\n💰 Od ${p}\n📍 ${c} nieruchomości\n\n👉 Link w bio\n💬 Napisz do nas na WhatsApp`,
    hashtags: ["#CostaBblanca", "#NieruchomosciHiszpania", "#NoweBudowy"],
  },
  ru: {
    caption: (h, p, c) => `🏠 ${h}\n\n💰 От ${p}\n📍 ${c} объектов\n\n👉 Ссылка в био\n💬 Напишите нам в WhatsApp`,
    hashtags: ["#КостаБланка", "#НедвижимостьИспания", "#Новостройка"],
  },
};

// ============================================================================
// THEME GENERATORS
// ============================================================================

function formatPrice(price: number): string {
  if (price >= 1000000) return `€${(price / 1000000).toFixed(1)}M`;
  return `€${Math.round(price / 1000)}k`;
}

function toCarouselProp(p: ReelProperty) {
  return {
    reference: p.reference,
    image: p.images[0] || "",
    title: p.title,
    price: p.price,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    town: p.town,
    type: p.type,
  };
}

function generateThemes(allProperties: ReelProperty[], lang: string): ThemeConfig[] {
  const themes: ThemeConfig[] = [];
  const h = HEADLINES[lang] || HEADLINES.en;
  const s = SOCIAL[lang] || SOCIAL.en;

  // Group properties by town
  const byTown = new Map<string, ReelProperty[]>();
  for (const p of allProperties) {
    if (p.images.length < 2) continue; // Need at least 2 images
    const existing = byTown.get(p.town) || [];
    existing.push(p);
    byTown.set(p.town, existing);
  }

  // Group by type
  const byType = new Map<string, ReelProperty[]>();
  for (const p of allProperties) {
    if (p.images.length < 2) continue;
    const existing = byType.get(p.type) || [];
    existing.push(p);
    byType.set(p.type, existing);
  }

  // ---- THEME 1: Top N [Type] in [Town] ----
  for (const [town, props] of byTown) {
    if (props.length < 3) continue; // Need at least 3 properties

    // Group by type within town
    const townByType = new Map<string, ReelProperty[]>();
    for (const p of props) {
      const existing = townByType.get(p.type) || [];
      existing.push(p);
      townByType.set(p.type, existing);
    }

    for (const [type, typeProps] of townByType) {
      if (typeProps.length < 3) continue;
      const selected = typeProps.sort((a, b) => b.images.length - a.images.length).slice(0, 5);
      const count = Math.min(selected.length, 5);
      const headline = h.topIn(count, type, town);
      const priceFrom = formatPrice(Math.min(...selected.map((p) => p.price)));

      themes.push({
        id: `top-${count}-${type.toLowerCase()}-${town.toLowerCase().replace(/\s+/g, "-")}-${lang}`,
        compositionId: "PropertyCarousel",
        headline,
        subheadline: `From ${priceFrom}`,
        properties: selected.map(toCarouselProp),
        language: lang,
        category: "top-by-type-town",
        socialCaption: s.caption(headline, priceFrom, count),
        hashtags: [...s.hashtags, `#${town.replace(/\s+/g, "")}`, `#${type}`],
      });
    }
  }

  // ---- THEME 2: Under €X in [Town] ----
  const priceThresholds = [200000, 250000, 300000];
  for (const threshold of priceThresholds) {
    for (const [town, props] of byTown) {
      const affordable = props.filter((p) => p.price <= threshold && p.price > 0);
      if (affordable.length < 3) continue;

      const selected = affordable
        .sort((a, b) => a.price - b.price)
        .slice(0, 5);
      const priceLabel = formatPrice(threshold);
      const headline = h.under(priceLabel, "Home", town);

      themes.push({
        id: `under-${threshold / 1000}k-${town.toLowerCase().replace(/\s+/g, "-")}-${lang}`,
        compositionId: "PropertyCarousel",
        headline,
        subheadline: `From ${formatPrice(Math.min(...selected.map((p) => p.price)))}`,
        properties: selected.map(toCarouselProp),
        language: lang,
        category: "under-price",
        socialCaption: s.caption(headline, formatPrice(selected[0].price), selected.length),
        hashtags: [...s.hashtags, `#${town.replace(/\s+/g, "")}`, "#BudgetFriendly"],
      });
    }
  }

  // ---- THEME 3: Luxury (€500k+) by area ----
  const luxuryProps = allProperties.filter((p) => p.price >= 500000 && p.images.length >= 3);
  if (luxuryProps.length >= 3) {
    const selected = luxuryProps
      .sort((a, b) => b.price - a.price)
      .slice(0, 5);
    const headline = h.luxury("Costa Blanca");

    themes.push({
      id: `luxury-costa-blanca-${lang}`,
      compositionId: "PropertyCarousel",
      headline,
      subheadline: `From ${formatPrice(Math.min(...selected.map((p) => p.price)))}`,
      properties: selected.map(toCarouselProp),
      language: lang,
      category: "luxury",
      socialCaption: s.caption(headline, formatPrice(selected[0].price), selected.length),
      hashtags: [...s.hashtags, "#LuxuryProperty", "#LuxuryVilla"],
    });
  }

  // ---- THEME 4: Best Value per town (lowest price/m²) ----
  for (const [town, props] of byTown) {
    if (props.length < 3) continue;
    const withArea = props.filter((p) => p.area > 0 && p.price > 0);
    if (withArea.length < 3) continue;

    const selected = withArea
      .sort((a, b) => (a.price / a.area) - (b.price / b.area))
      .slice(0, 5);
    const headline = h.bestValue(town);

    themes.push({
      id: `best-value-${town.toLowerCase().replace(/\s+/g, "-")}-${lang}`,
      compositionId: "PropertyCarousel",
      headline,
      subheadline: `From ${formatPrice(Math.min(...selected.map((p) => p.price)))}`,
      properties: selected.map(toCarouselProp),
      language: lang,
      category: "best-value",
      socialCaption: s.caption(headline, formatPrice(selected[0].price), selected.length),
      hashtags: [...s.hashtags, `#${town.replace(/\s+/g, "")}`, "#BestValue"],
    });
  }

  // ---- THEME 5: New Builds per town (general) ----
  for (const [town, props] of byTown) {
    const newBuilds = props.filter((p) => p.isNewBuild);
    if (newBuilds.length < 3) continue;

    const selected = newBuilds
      .sort((a, b) => b.images.length - a.images.length)
      .slice(0, 5);
    const headline = h.newBuilds(town);

    themes.push({
      id: `new-builds-${town.toLowerCase().replace(/\s+/g, "-")}-${lang}`,
      compositionId: "PropertyCarousel",
      headline,
      subheadline: `From ${formatPrice(Math.min(...selected.map((p) => p.price)))}`,
      properties: selected.map(toCarouselProp),
      language: lang,
      category: "new-builds",
      socialCaption: s.caption(headline, formatPrice(selected[0].price), selected.length),
      hashtags: [...s.hashtags, `#${town.replace(/\s+/g, "")}`, "#NewBuild"],
    });
  }

  return themes;
}

// ============================================================================
// CLI
// ============================================================================

const args = process.argv.slice(2);
const langArg = args.find((a) => a.startsWith("--lang="))?.split("=")[1] || "en";
const listOnly = args.includes("--list");
const doRender = args.includes("--render");
const outDir = args.find((a) => a.startsWith("--out="))?.split("=")[1] || "./themes";

async function main() {
  console.log("━".repeat(60));
  console.log("🎨 THEMED REEL GENERATOR");
  console.log("━".repeat(60));
  console.log(`   Language: ${langArg}`);
  console.log("━".repeat(60));

  // Load properties
  console.log("\n📊 Loading properties from feeds...");
  const allProperties = await loadAllProperties();
  console.log(`   Found ${allProperties.length} total properties\n`);

  // Generate themes
  console.log("🎨 Generating themed reel configs...\n");
  const themes = generateThemes(allProperties, langArg);

  // Deduplicate — take the best per category+town combo
  const seen = new Set<string>();
  const uniqueThemes = themes.filter((t) => {
    const key = `${t.category}-${t.properties[0]?.town || "all"}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  console.log(`   Generated ${uniqueThemes.length} unique themed reels:\n`);

  // Group by category for display
  const byCategory = new Map<string, ThemeConfig[]>();
  for (const theme of uniqueThemes) {
    const existing = byCategory.get(theme.category) || [];
    existing.push(theme);
    byCategory.set(theme.category, existing);
  }

  for (const [category, categoryThemes] of byCategory) {
    console.log(`   📁 ${category} (${categoryThemes.length} reels)`);
    for (const theme of categoryThemes) {
      console.log(`      • ${theme.headline} (${theme.properties.length} properties)`);
    }
    console.log("");
  }

  if (listOnly) {
    console.log("ℹ️  List mode — no files written. Remove --list to save configs.");
    return;
  }

  // Save theme configs
  fs.mkdirSync(path.resolve(outDir), { recursive: true });

  for (const theme of uniqueThemes) {
    const filePath = path.resolve(outDir, `${theme.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(theme, null, 2));
  }

  console.log(`✅ Saved ${uniqueThemes.length} theme configs to ${path.resolve(outDir)}/`);

  // Optionally render
  if (doRender) {
    console.log("\n🎥 Rendering themed reels...\n");
    console.log("   To render, run:");
    console.log(`   npx tsx src/scripts/render-themes.ts --lang=${langArg}`);
  }

  // Summary
  console.log("\n━".repeat(60));
  console.log("📊 SUMMARY");
  console.log("━".repeat(60));
  console.log(`   Total themes:    ${uniqueThemes.length}`);
  console.log(`   Language:        ${langArg}`);
  console.log(`   Config dir:      ${path.resolve(outDir)}/`);
  console.log("\n   Next steps:");
  console.log("   1. Preview in Remotion Studio: npm run dev");
  console.log("   2. Render all: npx tsx src/scripts/render-themes.ts");
  console.log("   3. Publish: npm run publish");
  console.log("━".repeat(60));
}

main().catch((err) => {
  console.error("💥 Theme generation failed:", err.message);
  process.exit(1);
});
