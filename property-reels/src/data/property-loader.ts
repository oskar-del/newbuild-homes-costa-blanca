/**
 * Property Data Loader for Remotion Reels
 * ========================================
 * Fetches property data from the same XML feeds as the main website,
 * and maps it to the format expected by Remotion compositions.
 *
 * Data flow:
 *   XML Feed (REDSP) → ParsedProperty → ReelProperty
 *   XML Feed (BP)    → ParsedProperty → ReelProperty
 *
 * This is a STANDALONE loader that doesn't depend on the Next.js project
 * at runtime. It duplicates the minimal parsing logic needed.
 */

import https from "https";
import http from "http";

// ============================================================================
// FEED URLS — Same as the main website
// ============================================================================

const FEED_URLS = {
  general: "https://xml.redsp.net/file/450/23a140q0551/general-zone-1-kyero.xml",
  background: "https://backgroundproperties.com/wp-load.php?security_token=23f0185aeb5102e7&export_id=19&action=get_data",
};

// ============================================================================
// TYPES
// ============================================================================

export interface ReelProperty {
  reference: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number; // built area m²
  images: string[];
  town: string;
  province: string;
  type: string;
  features: string[];
  developer: string;
  developmentName: string;
  isNewBuild: boolean;
}

// ============================================================================
// FETCH HELPER
// ============================================================================

function fetchURL(url: string, timeoutMs = 30000): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const request = client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        const redirectUrl = res.headers.location;
        if (redirectUrl) {
          fetchURL(redirectUrl, timeoutMs).then(resolve).catch(reject);
          return;
        }
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      let data = "";
      res.on("data", (chunk: string) => (data += chunk));
      res.on("end", () => resolve(data));
      res.on("error", reject);
    });
    request.on("error", reject);
    request.setTimeout(timeoutMs, () => {
      request.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

// ============================================================================
// XML PARSING — Minimal parser for property data
// ============================================================================

function extractText(node: any, ...keys: string[]): string {
  let current = node;
  for (const key of keys) {
    if (!current || typeof current !== "object") return "";
    current = current[key];
  }
  if (typeof current === "string") return current.trim();
  if (typeof current === "number") return String(current);
  if (current?.["#text"]) return String(current["#text"]).trim();
  return "";
}

function extractNum(node: any, ...keys: string[]): number | null {
  const text = extractText(node, ...keys);
  if (!text) return null;
  const num = parseFloat(text.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? null : num;
}

function extractImages(node: any): string[] {
  const imgs: string[] = [];
  try {
    const imageNode = node?.images?.image;
    if (!imageNode) return imgs;
    const list = Array.isArray(imageNode) ? imageNode : [imageNode];
    for (const img of list) {
      const url = typeof img === "string" ? img : img?.url || img?.["#text"] || "";
      if (url && url.startsWith("http")) imgs.push(url);
    }
  } catch {
    // Skip malformed image data
  }
  return imgs;
}

function extractFeatures(node: any): string[] {
  const features: string[] = [];
  try {
    const featureNode = node?.features?.feature || node?.feature;
    if (!featureNode) return features;
    const list = Array.isArray(featureNode) ? featureNode : [featureNode];
    for (const f of list) {
      const text = typeof f === "string" ? f : f?.["#text"] || "";
      if (text) features.push(text.trim());
    }
  } catch {
    // Skip
  }
  return features;
}

function detectFeaturesFromDescription(desc: string): string[] {
  const features: string[] = [];
  const lower = desc.toLowerCase();
  if (lower.includes("pool") || lower.includes("piscina")) features.push("Pool");
  if (lower.includes("terrace") || lower.includes("terraza")) features.push("Terrace");
  if (lower.includes("garden") || lower.includes("jardín")) features.push("Garden");
  if (lower.includes("parking") || lower.includes("garage") || lower.includes("garaje")) features.push("Parking");
  if (lower.includes("sea view") || lower.includes("vista al mar")) features.push("Sea View");
  if (lower.includes("golf")) features.push("Golf");
  if (lower.includes("solarium")) features.push("Solarium");
  if (lower.includes("air conditioning") || lower.includes("aire acondicionado")) features.push("A/C");
  return features;
}

// ============================================================================
// KYERO V3 (REDSP General Feed) PARSER
// ============================================================================

function parseKyeroProperty(prop: any): ReelProperty | null {
  const ref = extractText(prop, "ref") || extractText(prop, "id");
  const price = extractNum(prop, "price");
  const beds = extractNum(prop, "beds");
  const baths = extractNum(prop, "baths");
  const size = extractNum(prop, "surface_area", "built") || extractNum(prop, "built");
  const town = extractText(prop, "town");
  const province = extractText(prop, "province");
  const type = extractText(prop, "type");
  const images = extractImages(prop);

  // Get English description
  let description = "";
  const descNode = prop?.desc;
  if (Array.isArray(descNode)) {
    const enDesc = descNode.find((d: any) => d?.["@_language"] === "en" || d?.["@_lang"] === "en");
    description = enDesc?.["#text"] || enDesc?.["#cdata-section"] || descNode[0]?.["#text"] || "";
  } else if (descNode) {
    description = descNode?.["#text"] || descNode?.["#cdata-section"] || String(descNode) || "";
  }

  // Skip if missing critical data
  if (!ref || !price || !town) return null;

  // Build title
  const title = `${beds || ""}${beds ? " Bed " : ""}${type || "Property"} ${town}`;

  const feedFeatures = extractFeatures(prop);
  const descFeatures = detectFeaturesFromDescription(description);
  const allFeatures = Array.from(new Set([...feedFeatures, ...descFeatures]));

  const isNewBuild = extractText(prop, "new_build") === "1" || extractText(prop, "new_build") === "true";

  return {
    reference: ref,
    title: title.trim(),
    price: price,
    bedrooms: beds || 0,
    bathrooms: baths || 0,
    area: size || 0,
    images,
    town,
    province: province || "Alicante",
    type: type || "Property",
    features: allFeatures.slice(0, 6),
    developer: extractText(prop, "agent", "name") || "",
    developmentName: extractText(prop, "development") || "",
    isNewBuild,
  };
}

// ============================================================================
// SOOPREMA (Background Properties Feed) PARSER
// ============================================================================

function parseSoopremaProperty(prop: any): ReelProperty | null {
  const ref = extractText(prop, "reference") || extractText(prop, "id");
  const price = extractNum(prop, "price");
  const beds = extractNum(prop, "beds") || extractNum(prop, "bedrooms");
  const baths = extractNum(prop, "baths") || extractNum(prop, "bathrooms");
  const size = extractNum(prop, "built_area") || extractNum(prop, "area");
  const town = extractText(prop, "city") || extractText(prop, "town");
  const province = extractText(prop, "province") || "Alicante";
  const type = extractText(prop, "type") || extractText(prop, "property_type");

  // Images from various formats
  let images: string[] = [];
  const pics = prop?.pictures?.picture || prop?.images?.image;
  if (pics) {
    const list = Array.isArray(pics) ? pics : [pics];
    images = list
      .map((p: any) => (typeof p === "string" ? p : p?.url || p?.["#text"] || ""))
      .filter((u: string) => u.startsWith("http"));
  }

  if (!ref || !price || !town) return null;

  const title = `${beds || ""}${beds ? " Bed " : ""}${type || "Property"} ${town}`;

  return {
    reference: `BP-${ref}`,
    title: title.trim(),
    price: price,
    bedrooms: beds || 0,
    bathrooms: baths || 0,
    area: size || 0,
    images,
    town,
    province,
    type: type || "Property",
    features: [],
    developer: extractText(prop, "agent") || "",
    developmentName: "",
    isNewBuild: true, // BP feed is new builds only
  };
}

// ============================================================================
// MAIN LOADER
// ============================================================================

let cachedProperties: ReelProperty[] | null = null;

export async function loadAllProperties(): Promise<ReelProperty[]> {
  if (cachedProperties) return cachedProperties;

  console.log("[PropertyLoader] Fetching XML feeds...");
  const properties: ReelProperty[] = [];
  const refsSeen = new Set<string>();

  // 1. REDSP General Feed (primary)
  try {
    console.log("[PropertyLoader] Fetching REDSP general feed...");
    const xml = await fetchURL(FEED_URLS.general);
    if (xml) {
      // Use dynamic import for fast-xml-parser
      const { XMLParser } = await import("fast-xml-parser");
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
        textNodeName: "#text",
        isArray: (name) => ["property", "image", "feature", "desc"].includes(name),
      });
      const result = parser.parse(xml);
      const props = result?.root?.property || [];
      console.log(`[PropertyLoader] REDSP: Found ${props.length} properties`);

      for (const raw of props) {
        const parsed = parseKyeroProperty(raw);
        if (parsed && !refsSeen.has(parsed.reference) && parsed.images.length > 0) {
          refsSeen.add(parsed.reference);
          properties.push(parsed);
        }
      }
    }
  } catch (err) {
    console.error("[PropertyLoader] REDSP feed error:", err);
  }

  // 2. Background Properties Feed
  try {
    console.log("[PropertyLoader] Fetching Background Properties feed...");
    const xml = await fetchURL(FEED_URLS.background);
    if (xml) {
      const { XMLParser } = await import("fast-xml-parser");
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
        textNodeName: "#text",
        isArray: (name) => ["property", "picture", "image"].includes(name),
      });
      const result = parser.parse(xml);
      // Sooprema format uses <properties><property>
      const props = result?.properties?.property || result?.root?.property || [];
      console.log(`[PropertyLoader] BP: Found ${props.length} properties`);

      for (const raw of props) {
        const parsed = parseSoopremaProperty(raw);
        if (parsed && !refsSeen.has(parsed.reference) && parsed.images.length > 0) {
          refsSeen.add(parsed.reference);
          properties.push(parsed);
        }
      }
    }
  } catch (err) {
    console.error("[PropertyLoader] BP feed error:", err);
  }

  console.log(`[PropertyLoader] Total: ${properties.length} properties with images`);
  cachedProperties = properties;
  return properties;
}

/**
 * Get a single property by reference number
 */
export async function getPropertyByRef(reference: string): Promise<ReelProperty | null> {
  const all = await loadAllProperties();
  return all.find((p) => p.reference.toLowerCase() === reference.toLowerCase()) || null;
}

/**
 * Get properties filtered by town
 */
export async function getPropertiesByTown(town: string, limit = 10): Promise<ReelProperty[]> {
  const all = await loadAllProperties();
  return all
    .filter((p) => p.town.toLowerCase().includes(town.toLowerCase()))
    .slice(0, limit);
}

/**
 * Get properties filtered by type (Villa, Apartment, etc.)
 */
export async function getPropertiesByType(type: string, limit = 10): Promise<ReelProperty[]> {
  const all = await loadAllProperties();
  return all
    .filter((p) => p.type.toLowerCase().includes(type.toLowerCase()))
    .slice(0, limit);
}

/**
 * Get newest / featured properties for carousel
 * Prioritizes: has images, new build, reasonable price
 */
export async function getFeaturedProperties(limit = 5): Promise<ReelProperty[]> {
  const all = await loadAllProperties();
  return all
    .filter((p) => p.images.length >= 3 && p.price > 100000 && p.isNewBuild)
    .sort((a, b) => b.images.length - a.images.length) // More images = more visual
    .slice(0, limit);
}
