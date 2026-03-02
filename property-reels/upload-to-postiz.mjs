#!/usr/bin/env node
/**
 * Postiz Auto-Upload Script
 * -------------------------
 * Uploads rendered social media images to Postiz and creates scheduled posts
 * for all 5 connected channels (Facebook, Instagram, Pinterest, TikTok, YouTube).
 *
 * Usage:  node upload-to-postiz.mjs
 *
 * Requires: Node.js 18+ (uses native fetch and fs/promises)
 */

import { readFile, writeFile, unlink } from "fs/promises";
import { resolve, basename, join } from "path";
import { createReadStream, readFileSync, writeFileSync, unlinkSync, mkdtempSync } from "fs";
import { execSync, execFileSync } from "child_process";
import { tmpdir } from "os";

// ============================================================================
// CONFIGURATION
// ============================================================================

const API_KEY = "66a61ca1055ae30a313f66b7e445d7a9e9746b9753b1d6778985611ddb6508c3";
const BASE_URL = "https://api.postiz.com/public/v1";

// Connected channel (integration) IDs
const CHANNELS = {
  youtube:   "cmlzb137206duru0ya3mi4fge",
  facebook:  "cmlzc4jlw06ijru0yag75hfhy",
  tiktok:    "cmlzgh2wc073zru0yboboy3mf",
  instagram: "cmlzh9a9a0783ru0yol9yzx7e",
  pinterest: "cmlzhult907ceru0yub8kso5h",
};

// Image directory (relative to this script)
const IMAGE_DIR = resolve(import.meta.dirname, "out/social-posts");

// ============================================================================
// HASHTAG GENERATOR — structured, multilingual hashtag system
// ============================================================================

// Layer 1: Location hashtags — town + area + province + country
const LOCATION_TAGS = {
  "Guardamar del Segura": {
    town: ["#Guardamar", "#GuardamarDelSegura"],
    area: ["#CostaBlanca", "#CostaBlancaSur"],
    province: ["#Alicante", "#ProvinciaDeAlicante"],
  },
  "Torrevieja": {
    town: ["#Torrevieja"],
    area: ["#CostaBlanca", "#CostaBlancaSur"],
    province: ["#Alicante"],
  },
  "Orihuela Costa": {
    town: ["#OrihuelaCosta", "#LaZenia", "#Campoamor", "#PlayaFlamenca"],
    area: ["#CostaBlanca", "#CostaBlancaSur"],
    province: ["#Alicante"],
  },
  "Altea": {
    town: ["#Altea"],
    area: ["#CostaBlanca", "#CostaBlancaNord"],
    province: ["#Alicante"],
  },
  "Villamartín": {
    town: ["#Villamartín", "#VillamartínGolf"],
    area: ["#CostaBlanca", "#CostaBlancaSur"],
    province: ["#Alicante"],
  },
  "Benitachell": {
    town: ["#Benitachell", "#CumbreDelSol"],
    area: ["#CostaBlanca", "#CostaBlancaNord"],
    province: ["#Alicante"],
  },
  "Costa Blanca": {
    town: [],
    area: ["#CostaBlanca"],
    province: ["#Alicante"],
  },
};

// Layer 2: Property type hashtags
const PROPERTY_TYPE_TAGS = {
  penthouse:  ["#Penthouse", "#NewBuild", "#NewBuildPenthouse"],
  villa:      ["#Villa", "#NewBuild", "#NewBuildVilla", "#LuxuryVilla"],
  apartment:  ["#Apartment", "#NewBuild", "#NewBuildApartment"],
  townhouse:  ["#Townhouse", "#NewBuild", "#NewBuildTownhouse"],
  bungalow:   ["#Bungalow", "#NewBuild", "#NewBuildBungalow"],
  area:       [], // area showcase posts — no property type
};

// Layer 3: Buyer intent hashtags (English)
const BUYER_INTENT_TAGS = [
  "#PropertyForSale", "#BuyInSpain", "#SpainProperty",
  "#SpainRealEstate", "#InvestInSpain", "#PropertyInvestment",
];

// Layer 4: Multilingual hashtags — targeting your actual buyer markets
const MULTILINGUAL_TAGS = {
  // Swedish — "Hus i Spanien", "Bostad Spanien", "Lägenhet Costa Blanca"
  swedish: ["#HusISpanien", "#BostadSpanien", "#FlyttaTillSpanien", "#SpanienBoende"],
  // Polish — "Nieruchomości Hiszpania", "Mieszkanie Costa Blanca"
  polish: ["#NieruchomosciHiszpania", "#MieszkanieHiszpania", "#HiszpaniaNieruchomosci", "#DomWHiszpanii"],
  // German — "Immobilien Spanien", "Haus kaufen Spanien"
  german: ["#ImmobilienSpanien", "#HausKaufenSpanien", "#SpanienImmobilien", "#WohnenInSpanien"],
  // Dutch — "Huis in Spanje", "Wonen in Spanje"
  dutch: ["#HuisInSpanje", "#WonenInSpanje", "#SpanjeVastgoed", "#AppartementSpanje"],
  // Norwegian — "Bolig Spania", "Hus i Spania"
  norwegian: ["#BoligSpania", "#HusISpania", "#FlytteTilSpania", "#SpaniaBolig"],
  // French — "Immobilier Espagne", "Maison Espagne"
  french: ["#ImmobilierEspagne", "#MaisonEspagne", "#AppartementEspagne"],
};

// Layer 5: Lifestyle / emotional engagement hashtags
const LIFESTYLE_TAGS = [
  "#MediterraneanLife", "#ExpatLife", "#SunshineLifestyle",
  "#MoveToSpain", "#LifeInSpain", "#SpainDream",
];

/**
 * Generate structured hashtags for a post.
 *
 * @param {string} platform    — "instagram" | "facebook" | "tiktok" | "youtube" | "pinterest"
 * @param {string} town        — key from LOCATION_TAGS
 * @param {string} propertyType — key from PROPERTY_TYPE_TAGS
 * @param {string[]} [extra]   — any post-specific bonus tags
 * @returns {string} hashtag string (or empty for platforms that don't use them)
 */
function generateHashtags(platform, town, propertyType, extra = []) {
  const loc = LOCATION_TAGS[town] || LOCATION_TAGS["Costa Blanca"];
  const propTags = PROPERTY_TYPE_TAGS[propertyType] || [];

  if (platform === "pinterest") {
    // Pinterest: no hashtags, SEO comes from pin title + description
    return "";
  }

  if (platform === "youtube") {
    // YouTube: minimal tags in description, 3-5 max
    return [...loc.town.slice(0, 1), ...loc.area, "#Spain", "#NewBuild"].join(" ");
  }

  if (platform === "facebook") {
    // Facebook: light hashtags, 3-5 — location + type only
    return [...loc.town.slice(0, 1), ...loc.area, ...propTags.slice(0, 1), "#Spain"].join(" ");
  }

  if (platform === "tiktok") {
    // TikTok: 6-8 trending-style tags — location + intent + lifestyle
    const tags = [
      ...loc.town.slice(0, 1),
      ...loc.area,
      "#SpainProperty",
      "#NewBuild",
      ...LIFESTYLE_TAGS.slice(0, 2),
      ...extra.slice(0, 2),
    ];
    return [...new Set(tags)].slice(0, 8).join(" ");
  }

  if (platform === "instagram") {
    // Instagram: maximum hashtags — all 5 layers, up to 25
    // Pick 2 multilingual sets per post (rotate based on town name hash)
    const langKeys = Object.keys(MULTILINGUAL_TAGS);
    const hash = town.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const lang1 = langKeys[hash % langKeys.length];
    const lang2 = langKeys[(hash + 1) % langKeys.length];
    const lang3 = langKeys[(hash + 2) % langKeys.length];

    const tags = [
      // Location (town + area + province)
      ...loc.town,
      ...loc.area,
      ...loc.province,
      "#Spain",
      // Property type
      ...propTags,
      // Buyer intent (pick 3)
      ...BUYER_INTENT_TAGS.slice(0, 3),
      // Multilingual (3 languages × 2 tags each)
      ...MULTILINGUAL_TAGS[lang1].slice(0, 2),
      ...MULTILINGUAL_TAGS[lang2].slice(0, 2),
      ...MULTILINGUAL_TAGS[lang3].slice(0, 2),
      // Lifestyle (pick 2)
      ...LIFESTYLE_TAGS.slice(0, 2),
      // Extra post-specific
      ...extra,
    ];

    // Deduplicate and cap at 25
    return [...new Set(tags)].slice(0, 25).join(" ");
  }

  return "";
}

// ============================================================================
// POST DEFINITIONS — 10 posts with per-platform captions
// ============================================================================

const POSTS = [
  {
    name: "Penthouse Guardamar",
    town: "Guardamar del Segura",
    propertyType: "penthouse",
    pinterestTitle: "New Build Penthouse Guardamar del Segura | Costa Blanca",
    image: "property-penthouse-guardamar-square.png",
    date: "2026-02-26T09:00:00.000Z", // Thu 26 Feb 10:00 CET
    propertyUrl: "https://newbuildhomescostablanca.com/properties/N9499",
    captions: {
      instagram: (tags) => `New build penthouse in Guardamar del Segura — 2 bed, 2 bath, 80m² with pool and terrace views.\n\nStarting from €249,000.\n\nGuardamar is one of the Costa Blanca's best-kept secrets — award-winning beaches, pine forests, and new builds still under €250k.\n\n👉 Link in bio\n📩 DM us for a free property pack\n\n${tags}`,
      facebook: (tags) => `New build penthouse in Guardamar del Segura — 2 bed, 2 bath, 80m² with pool and terrace views.\n\nStarting from €249,000.\n\nGuardamar is one of the Costa Blanca's best-kept secrets — award-winning beaches, pine forests, and new builds still under €250k.\n\n🏠 View this property: https://newbuildhomescostablanca.com/properties/N9499\n\n💬 Comment or message us for a free property pack\n\n${tags}`,
      tiktok: (tags) => `New build penthouse in Guardamar del Segura 🏠 2 bed, 2 bath from €249,000. Award-winning beaches and prices still under €250k.\n\n${tags}`,
      youtube: (tags) => `New build penthouse available in Guardamar del Segura — 2 bed, 2 bath, 80m² from €249,000. One of the best value areas on the Costa Blanca with award-winning beaches and natural dune parks. Want the full listing? Drop a comment or visit newbuildhomescostablanca.com\n\n${tags}`,
      pinterest: () => `2 Bed New Build Penthouse in Guardamar del Segura, Costa Blanca | €249,000 | Pool, Terrace, Beach Walking Distance | newbuildhomescostablanca.com`,
    },
  },
  {
    name: "Villa Torrevieja",
    town: "Torrevieja",
    propertyType: "villa",
    pinterestTitle: "New Build Villa Torrevieja | Costa Blanca",
    image: "property-villa-torrevieja-square.png",
    date: "2026-02-26T09:30:00.000Z", // Thu 26 Feb 10:30 CET
    propertyUrl: "https://newbuildhomescostablanca.com/properties?town=Torrevieja&type=Villa",
    captions: {
      instagram: (tags) => `3 bedroom new build villa in Torrevieja — 120m², private pool, modern design.\n\nFrom €389,000.\n\nTorrevieja offers year-round sunshine, salt lakes, sandy beaches, and one of Europe's healthiest microclimates. New build villas here are selling fast.\n\n👉 Link in bio for the full listing\n📩 Message us for availability\n\n${tags}`,
      facebook: (tags) => `3 bedroom new build villa in Torrevieja — 120m², private pool, modern design.\n\nFrom €389,000.\n\nTorrevieja offers year-round sunshine, salt lakes, sandy beaches, and one of Europe's healthiest microclimates. New build villas here are selling fast.\n\n🏠 Explore our Torrevieja villas: https://newbuildhomescostablanca.com/properties?town=Torrevieja&type=Villa\n\n💬 Message us for availability\n\n${tags}`,
      tiktok: (tags) => `3 bed new build villa in Torrevieja 🏡 €389,000. Private pool, 120m², modern design. Salt lakes, beaches, and 320 days of sun.\n\n${tags}`,
      youtube: (tags) => `3 bedroom new build villa in Torrevieja — 120m², private pool, modern design. From €389,000. Torrevieja offers year-round sunshine, salt lakes, sandy beaches, and one of Europe's healthiest microclimates. Visit newbuildhomescostablanca.com\n\n${tags}`,
      pinterest: () => `3 Bed New Build Villa in Torrevieja, Costa Blanca | €389,000 | Private Pool, Modern Design, 120m² | newbuildhomescostablanca.com`,
    },
  },
  {
    name: "Torrevieja Beach",
    town: "Torrevieja",
    propertyType: "area",
    pinterestTitle: "Torrevieja Beach Aerial View | Costa Blanca Spain",
    image: "area-torrevieja-beach-square.png",
    date: "2026-02-27T09:00:00.000Z", // Fri 27 Feb 10:00 CET
    propertyUrl: "https://newbuildhomescostablanca.com/areas/torrevieja",
    extraTags: ["#DroneView", "#BeachLife"],
    captions: {
      instagram: (tags) => `Torrevieja from above — Playa del Cura beachfront, where your morning commute is a walk along the Mediterranean.\n\nOver 80,000 residents, 10+ beaches, and an average temperature of 20°C year-round. This is why people move here.\n\nThinking about it? We can help you find the right new build.\n\n👉 Link in bio\n📩 DM for a free consultation\n\n${tags}`,
      facebook: (tags) => `Torrevieja from above — Playa del Cura beachfront, where your morning commute is a walk along the Mediterranean.\n\nOver 80,000 residents, 10+ beaches, and an average temperature of 20°C year-round. This is why people move here.\n\n🏠 Discover Torrevieja: https://newbuildhomescostablanca.com/areas/torrevieja\n\n💬 Comment or message us for a free consultation\n\n${tags}`,
      tiktok: (tags) => `This is Torrevieja, Costa Blanca 🌊 Playa del Cura beachfront — 80k residents, 10+ beaches, 20°C average. Who wants to live here?\n\n${tags}`,
      youtube: (tags) => `Torrevieja from above — Playa del Cura beachfront. Over 80,000 residents, 10+ beaches, and an average temperature of 20°C year-round. This is why people move here. Visit newbuildhomescostablanca.com\n\n${tags}`,
      pinterest: () => `Torrevieja, Costa Blanca — Aerial drone view of Playa del Cura beachfront. Discover new build homes from €164,000 | newbuildhomescostablanca.com`,
    },
  },
  {
    name: "Apartment Orihuela Costa",
    town: "Orihuela Costa",
    propertyType: "apartment",
    pinterestTitle: "New Build Apartment Orihuela Costa | Costa Blanca",
    image: "property-apartment-orihuela-square.png",
    date: "2026-02-27T09:30:00.000Z", // Fri 27 Feb 10:30 CET
    propertyUrl: "https://newbuildhomescostablanca.com/properties?town=Orihuela+Costa",
    captions: {
      instagram: (tags) => `2 bed apartment in Orihuela Costa — 65m², walking distance to beaches and golf courses.\n\nFrom €195,000.\n\nOrihuela Costa is home to Campoamor, La Zenia, and Playa Flamenca — some of the most popular expat communities on the Costa Blanca. New builds here sell out quickly.\n\n👉 Link in bio\n📩 DM for availability\n\n${tags}`,
      facebook: (tags) => `2 bed apartment in Orihuela Costa — 65m², walking distance to beaches and golf courses.\n\nFrom €195,000.\n\nOrihuela Costa is home to Campoamor, La Zenia, and Playa Flamenca — some of the most popular expat communities on the Costa Blanca. New builds here sell out quickly.\n\n🏠 Browse Orihuela Costa apartments: https://newbuildhomescostablanca.com/properties?town=Orihuela+Costa\n\n💬 Message us for availability\n\n${tags}`,
      tiktok: (tags) => `2 bed new build apartment in Orihuela Costa 🏠 €195,000. Beach, golf, and sun — the expat dream from under €200k.\n\n${tags}`,
      youtube: (tags) => `2 bed apartment in Orihuela Costa — 65m², walking distance to beaches and golf courses. From €195,000. Visit newbuildhomescostablanca.com\n\n${tags}`,
      pinterest: () => `2 Bed New Build Apartment in Orihuela Costa, Costa Blanca | €195,000 | Near Beaches & Golf | newbuildhomescostablanca.com`,
    },
  },
  {
    name: "Altea Old Town",
    town: "Altea",
    propertyType: "area",
    pinterestTitle: "Altea Old Town Drone View | Costa Blanca Spain",
    image: "area-altea-oldtown-square.png",
    date: "2026-02-28T09:00:00.000Z", // Sat 28 Feb 10:00 CET
    propertyUrl: "https://newbuildhomescostablanca.com/areas/altea",
    extraTags: ["#DroneView", "#BlueDome"],
    captions: {
      instagram: (tags) => `Altea — the blue-domed jewel of the Costa Blanca, seen from above.\n\nWhite-washed streets, a stunning old town perched above the Mediterranean, and some of the finest dining on the coast. Altea is where artists and dreamers call home.\n\nNew build homes available from the high €200k range.\n\n👉 Link in bio\n📩 DM for our Altea property guide\n\n${tags}`,
      facebook: (tags) => `Altea — the blue-domed jewel of the Costa Blanca, seen from above.\n\nWhite-washed streets, a stunning old town perched above the Mediterranean, and some of the finest dining on the coast. Altea is where artists and dreamers call home.\n\n🏠 Explore Altea properties: https://newbuildhomescostablanca.com/areas/altea\n\n💬 Comment or message us for our Altea property guide\n\n${tags}`,
      tiktok: (tags) => `Altea from above 🏛️ The blue-domed gem of the Costa Blanca. White streets, Mediterranean views, artists' paradise. New builds available.\n\n${tags}`,
      youtube: (tags) => `Altea — the blue-domed jewel of the Costa Blanca. White-washed streets, a stunning old town perched above the Mediterranean. New build homes available from the high €200k range. Visit newbuildhomescostablanca.com\n\n${tags}`,
      pinterest: () => `Altea, Costa Blanca — Drone view of the iconic blue-domed church and white-washed old town above the Mediterranean. New build homes available | newbuildhomescostablanca.com`,
    },
  },
  {
    name: "Townhouse Villamartín",
    town: "Villamartín",
    propertyType: "townhouse",
    pinterestTitle: "New Build Townhouse Villamartin Golf | Costa Blanca",
    image: "property-townhouse-villamartin-square.png",
    date: "2026-02-28T09:30:00.000Z", // Sat 28 Feb 10:30 CET
    propertyUrl: "https://newbuildhomescostablanca.com/properties?town=Villamartin",
    extraTags: ["#GolfSpain", "#GolfProperty"],
    captions: {
      instagram: (tags) => `New build townhouse near Villamartín Golf — 3 bed, 2 bath, 95m² with rooftop solarium.\n\nFrom €279,000.\n\nVillamartín is the heart of the southern Costa Blanca golf scene. Three championship courses within walking distance, plus the famous Villamartín Plaza for tapas and socialising.\n\n👉 Link in bio\n📩 DM for the full listing\n\n${tags}`,
      facebook: (tags) => `New build townhouse near Villamartín Golf — 3 bed, 2 bath, 95m² with rooftop solarium.\n\nFrom €279,000.\n\nVillamartín is the heart of the southern Costa Blanca golf scene. Three championship courses within walking distance, plus the famous Villamartín Plaza for tapas and socialising.\n\n🏠 View Villamartín townhouses: https://newbuildhomescostablanca.com/properties?town=Villamartin\n\n💬 Message us for the full listing\n\n${tags}`,
      tiktok: (tags) => `3 bed townhouse near Villamartín Golf 🏌️ €279,000. Rooftop solarium, 3 golf courses walking distance. Southern Costa Blanca living.\n\n${tags}`,
      youtube: (tags) => `New build townhouse near Villamartín Golf — 3 bed, 2 bath, 95m² with rooftop solarium. From €279,000. Visit newbuildhomescostablanca.com\n\n${tags}`,
      pinterest: () => `3 Bed New Build Townhouse near Villamartín Golf, Costa Blanca | €279,000 | Rooftop Solarium, 95m² | newbuildhomescostablanca.com`,
    },
  },
  {
    name: "Cumbre del Sol",
    town: "Benitachell",
    propertyType: "area",
    pinterestTitle: "Cumbre del Sol Turquoise Coves | Costa Blanca Spain",
    image: "area-cumbredelsol-square.png",
    date: "2026-03-01T09:00:00.000Z", // Sun 1 Mar 10:00 CET
    propertyUrl: "https://newbuildhomescostablanca.com/areas/cumbre-del-sol",
    extraTags: ["#LuxuryProperty", "#SeaView", "#CliffView"],
    captions: {
      instagram: (tags) => `Cumbre del Sol, Benitachell — where the cliffs meet turquoise water and luxury villas dot the hillside.\n\nThis exclusive enclave between Jávea and Moraira offers some of the most dramatic coastline on the entire Mediterranean. Sea-view new builds available.\n\n👉 Link in bio\n📩 DM for our Cumbre del Sol listings\n\n${tags}`,
      facebook: (tags) => `Cumbre del Sol, Benitachell — where the cliffs meet turquoise water and luxury villas dot the hillside.\n\nThis exclusive enclave between Jávea and Moraira offers some of the most dramatic coastline on the entire Mediterranean. Sea-view new builds available.\n\n🏠 Discover Cumbre del Sol: https://newbuildhomescostablanca.com/areas/cumbre-del-sol\n\n💬 Comment or message us for our latest listings\n\n${tags}`,
      tiktok: (tags) => `Cumbre del Sol, Benitachell 🌊 Turquoise coves, clifftop villas, and the most dramatic coastline on the Costa Blanca. Would you live here?\n\n${tags}`,
      youtube: (tags) => `Cumbre del Sol, Benitachell — turquoise cliff coves and luxury villas. This exclusive enclave between Jávea and Moraira offers some of the most dramatic coastline on the Mediterranean. Visit newbuildhomescostablanca.com\n\n${tags}`,
      pinterest: () => `Cumbre del Sol, Benitachell — Turquoise cliff coves and luxury villas on the Costa Blanca. New build sea-view properties available | newbuildhomescostablanca.com`,
    },
  },
  {
    name: "Bungalow Guardamar",
    town: "Guardamar del Segura",
    propertyType: "bungalow",
    pinterestTitle: "New Build Bungalow Guardamar del Segura | Costa Blanca",
    image: "property-bungalow-guardamar-square.png",
    date: "2026-03-01T09:30:00.000Z", // Sun 1 Mar 10:30 CET
    propertyUrl: "https://newbuildhomescostablanca.com/properties?town=Guardamar+del+Segura&type=Bungalow",
    extraTags: ["#BudgetProperty", "#AffordableSpain"],
    captions: {
      instagram: (tags) => `Ground floor bungalow with private garden in Guardamar del Segura — 2 bed, 1 bath, 55m².\n\nFrom just €164,000.\n\nYes, you can still buy a brand new property on the Costa Blanca for under €165k. Guardamar's pine forests, dune beaches, and relaxed pace of life make it ideal for couples and retirees.\n\n👉 Link in bio\n📩 DM us — these don't last long\n\n${tags}`,
      facebook: (tags) => `Ground floor bungalow with private garden in Guardamar del Segura — 2 bed, 1 bath, 55m².\n\nFrom just €164,000.\n\nYes, you can still buy a brand new property on the Costa Blanca for under €165k. Guardamar's pine forests, dune beaches, and relaxed pace of life make it ideal for couples and retirees.\n\n🏠 View Guardamar bungalows: https://newbuildhomescostablanca.com/properties?town=Guardamar+del+Segura&type=Bungalow\n\n💬 Message us — these don't last long\n\n${tags}`,
      tiktok: (tags) => `Brand new bungalow with garden in Guardamar 🏡 Just €164,000. Yes, really. 2 bed, near the beach, Costa Blanca.\n\n${tags}`,
      youtube: (tags) => `Ground floor bungalow in Guardamar del Segura — 2 bed, 1 bath, 55m² from just €164,000. Guardamar's pine forests, dune beaches, and relaxed pace of life make it ideal for couples and retirees. Visit newbuildhomescostablanca.com\n\n${tags}`,
      pinterest: () => `2 Bed New Build Bungalow in Guardamar del Segura, Costa Blanca | From €164,000 | Private Garden | newbuildhomescostablanca.com`,
    },
  },
  {
    name: "Guardamar Dunes",
    town: "Guardamar del Segura",
    propertyType: "area",
    pinterestTitle: "Guardamar Sand Dunes Natural Beach | Costa Blanca",
    image: "area-guardamar-dunes-square.png",
    date: "2026-03-02T09:00:00.000Z", // Mon 2 Mar 10:00 CET
    propertyUrl: "https://newbuildhomescostablanca.com/areas/guardamar-del-segura",
    extraTags: ["#SandDunes", "#HiddenGem", "#BeachLife"],
    captions: {
      instagram: (tags) => `Guardamar del Segura — golden sand dunes, pine forests that reach the beach, and new build homes from €164,000.\n\nThis is one of the Costa Blanca's most underrated towns. Clean air, natural parks, a proper Spanish town centre with markets and restaurants, and beaches that rival anything in the Balearics.\n\n👉 Link in bio\n📩 DM for our Guardamar guide\n\n${tags}`,
      facebook: (tags) => `Guardamar del Segura — golden sand dunes, pine forests that reach the beach, and new build homes from €164,000.\n\nThis is one of the Costa Blanca's most underrated towns. Clean air, natural parks, a proper Spanish town centre with markets and restaurants, and beaches that rival anything in the Balearics.\n\n🏠 Explore Guardamar: https://newbuildhomescostablanca.com/areas/guardamar-del-segura\n\n💬 Comment or message us for our Guardamar guide\n\n${tags}`,
      tiktok: (tags) => `Guardamar del Segura 🏖️ Sand dunes, pine forests to the beach, new builds from €164k. The most underrated town on the Costa Blanca?\n\n${tags}`,
      youtube: (tags) => `Guardamar del Segura — golden sand dunes, pine forests that reach the beach, and new build homes from €164,000. One of the Costa Blanca's most underrated towns. Visit newbuildhomescostablanca.com\n\n${tags}`,
      pinterest: () => `Guardamar del Segura — Golden sand dunes and natural pine forests on the Costa Blanca. New build homes from €164,000 | newbuildhomescostablanca.com`,
    },
  },
  {
    name: "Costa Blanca Sunset",
    town: "Costa Blanca",
    propertyType: "area",
    pinterestTitle: "Costa Blanca Sunset Torrevieja Harbour | Spain",
    image: "area-costablanca-sunset-square.png",
    date: "2026-03-02T09:30:00.000Z", // Mon 2 Mar 10:30 CET
    propertyUrl: "https://newbuildhomescostablanca.com/properties",
    extraTags: ["#GoldenHour", "#SunsetVibes", "#Torrevieja"],
    captions: {
      instagram: (tags) => `320 days of sunshine a year. This is why people choose the Costa Blanca.\n\nTorrevieja harbour at golden hour — fishing boats, palm trees, and a lifestyle that's hard to beat anywhere in Europe.\n\nNew build homes across the entire Costa Blanca from €164,000.\n\n👉 Link in bio — explore all available properties\n📩 DM to start your journey\n\n${tags}`,
      facebook: (tags) => `320 days of sunshine a year. This is why people choose the Costa Blanca.\n\nTorrevieja harbour at golden hour — fishing boats, palm trees, and a lifestyle that's hard to beat anywhere in Europe.\n\nNew build homes across the entire Costa Blanca from €164,000.\n\n🏠 Explore all properties: https://newbuildhomescostablanca.com/properties\n\n💬 Comment or message us to start your journey\n\n${tags}`,
      tiktok: (tags) => `This is why people move to the Costa Blanca 🌅 320 days of sunshine. Torrevieja harbour at golden hour. New builds from €164k.\n\n${tags}`,
      youtube: (tags) => `320 days of sunshine a year. This is Torrevieja harbour at golden hour, and this is why thousands of people choose the Costa Blanca every year. We help people find new build homes across the entire coast, from €164,000 to luxury sea-view villas. What area interests you? Comment below or visit newbuildhomescostablanca.com\n\n${tags}`,
      pinterest: () => `Costa Blanca Sunset — Torrevieja harbour at golden hour. 320 days of sunshine a year. New build homes from €164,000 | newbuildhomescostablanca.com`,
    },
  },
];

// ============================================================================
// HELPERS
// ============================================================================

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TEMP_DIR = mkdtempSync(join(tmpdir(), "postiz-"));

async function curlJson(method, endpoint, { body, isFormFile } = {}) {
  const url = `${BASE_URL}${endpoint}`;
  let tempFile = null;

  try {
    // Write response to a temp file so we can check status + body
    const responseFile = join(TEMP_DIR, `resp-${Date.now()}.txt`);
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

    // Extract HTTP status and response body
    const statusMatch = raw.match(/__HTTP_STATUS__(\d+)$/);
    const httpStatus = statusMatch ? parseInt(statusMatch[1]) : 0;
    const responseBody = raw.replace(/__HTTP_STATUS__\d+$/, "").trim();

    // Auto-retry on rate limit (429) — up to 5 retries with increasing waits
    if (httpStatus === 429) {
      for (let retry = 1; retry <= 5; retry++) {
        const waitMin = retry * 5; // 5, 10, 15, 20, 25 minutes
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
        if (httpStatus2 === 429) continue; // try again with longer wait
        if (httpStatus2 >= 400) {
          throw new Error(`HTTP ${httpStatus2}: ${responseBody2.substring(0, 500)}`);
        }
        try { return JSON.parse(responseBody2); }
        catch { throw new Error(`Non-JSON (${httpStatus2}): ${responseBody2.substring(0, 500)}`); }
      }
      throw new Error("Rate limited after 5 retries (75 min total). Try again later.");
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

// Upload cache — saves results so we don't re-upload on retry
const CACHE_FILE = resolve(import.meta.dirname, ".upload-cache.json");

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

  // Check cache first
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

async function createPost(post, uploadedImage) {
  // Generate structured hashtags per platform
  const extra = post.extraTags || [];
  const igTags = generateHashtags("instagram", post.town, post.propertyType, extra);
  const fbTags = generateHashtags("facebook", post.town, post.propertyType, extra);
  const ttTags = generateHashtags("tiktok", post.town, post.propertyType, extra);
  const ytTags = generateHashtags("youtube", post.town, post.propertyType, extra);

  // Build per-channel post entries
  const posts = [];

  // Instagram — type "post" (image post)
  posts.push({
    integration: { id: CHANNELS.instagram },
    value: [
      {
        content: post.captions.instagram(igTags),
        image: [uploadedImage],
      },
    ],
    settings: {
      __type: "instagram",
      post_type: "post",
    },
  });

  // Facebook — type "post"
  posts.push({
    integration: { id: CHANNELS.facebook },
    value: [
      {
        content: post.captions.facebook(fbTags),
        image: [uploadedImage],
      },
    ],
    settings: {
      __type: "facebook",
      type: "post",
    },
  });

  // TikTok — type "image" (image post)
  posts.push({
    integration: { id: CHANNELS.tiktok },
    value: [
      {
        content: post.captions.tiktok(ttTags),
        image: [uploadedImage],
      },
    ],
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

  // YouTube — community post (requires title + type: public/private/unlisted)
  posts.push({
    integration: { id: CHANNELS.youtube },
    value: [
      {
        content: post.captions.youtube(ytTags),
        image: [uploadedImage],
      },
    ],
    settings: {
      __type: "youtube",
      type: "public",
      title: post.pinterestTitle || post.name,
    },
  });

  // Pinterest — pin (requires title + Board ID)
  posts.push({
    integration: { id: CHANNELS.pinterest },
    value: [
      {
        content: post.captions.pinterest(""),
        image: [uploadedImage],
      },
    ],
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
  console.log("║   Postiz Auto-Upload — New Build Homes CB       ║");
  console.log("║   10 posts × 5 channels = 50 scheduled posts    ║");
  console.log("╚══════════════════════════════════════════════════╝");
  console.log();

  // Step 0: Test API key with proper date params
  console.log("🔑 Testing API key...");
  try {
    const now = new Date();
    const start = now.toISOString();
    const end = new Date(now.getTime() + 14 * 86400000).toISOString();
    const test = await curlJson("GET", `/posts?startDate=${start}&endDate=${end}`);
    console.log(`✅ API key valid!\n`);
  } catch (e) {
    console.error(`❌ API key test failed: ${e.message}`);
    console.error("Check your API key at https://platform.postiz.com/settings → Public API");
    process.exit(1);
  }

  // Rate limit: 30 req/hour. We need 10 uploads + 10 post creations = 20 requests.
  // That's within the limit, but let's add delays to be safe.

  const results = [];

  for (let i = 0; i < POSTS.length; i++) {
    const post = POSTS[i];
    const imagePath = resolve(IMAGE_DIR, post.image);

    console.log(`\n━━━ [${i + 1}/10] ${post.name} ━━━`);

    try {
      // Step 1: Upload image
      const uploaded = await uploadImage(imagePath);

      // Step 2: Create scheduled post with all 5 channels
      const created = await createPost(post, uploaded);

      results.push({ name: post.name, status: "✅ Success", date: post.date });

      // 30 req/hr limit — space out to stay safe
      if (i < POSTS.length - 1) {
        const waitSec = 120;
        console.log(`  ⏳ Waiting ${waitSec}s between posts (${i+1}/10 done)...`);
        await sleep(waitSec * 1000);
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
    console.log("\n  🎉 All done! Check your Postiz calendar at platform.postiz.com/launches");
  }
}

main().catch((err) => {
  console.error("\n💀 Fatal error:", err);
  process.exit(1);
});
