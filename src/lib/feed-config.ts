/**
 * CENTRALIZED FEED CONFIGURATION
 * ==============================
 * Single source of truth for all property feed mappings.
 *
 * When something doesn't work with feeds, CHECK HERE FIRST.
 *
 * FEEDS:
 * - General (REDSP Kyero V3): N-prefix refs, ~80% Costa Blanca South
 * - Special (REDSP v4): SP-prefix refs, restricted properties
 * - Background Properties: BP-prefix refs, ~99% Costa Blanca North (Pedreguer area)
 */

// =============================================================================
// FEED URLS
// =============================================================================
export const FEED_URLS = {
  // PRIORITY ORDER:
  // 1. REDSP General - Main feed with full town data (~80% Costa Blanca South)
  general: 'https://xml.redsp.net/file/450/23a140q0551/general-zone-1-kyero.xml',

  // 2. Background Properties - Sooprema format, new builds only
  background: 'https://backgroundproperties.com/wp-load.php?security_token=23f0185aeb5102e7&export_id=19&action=get_data',

  // 3. Miralbo Urbana - DISABLED (only 25 properties, DNS issues during build)
  // Can hard-code these properties later if needed
  miralbo: '', // DISABLED

  // DISABLED: Special feed has empty town fields, causes data loss
  special: 'https://xml.redsp.net/files/450/94015ams84x/test-redsp_v4.xml',
};

// =============================================================================
// REGIONS - Matching REDSP backend categories
// =============================================================================
export type RegionKey =
  | 'costa-blanca-north'
  | 'costa-blanca-north-inland'
  | 'costa-blanca-south'
  | 'costa-blanca-south-inland'
  | 'costa-calida'
  | 'costa-calida-inland';

export interface RegionConfig {
  key: RegionKey;
  label: string;
  shortLabel: string;
  isInland: boolean;
  description: string;
}

export const REGIONS: Record<RegionKey, RegionConfig> = {
  'costa-blanca-north': {
    key: 'costa-blanca-north',
    label: 'Costa Blanca North',
    shortLabel: 'CB North',
    isInland: false,
    description: 'From Denia to Benidorm - dramatic coastline, established resorts',
  },
  'costa-blanca-north-inland': {
    key: 'costa-blanca-north-inland',
    label: 'Costa Blanca North Inland',
    shortLabel: 'CB North Inland',
    isInland: true,
    description: 'Jalon Valley, Polop, La Nucia - mountain & valley living',
  },
  'costa-blanca-south': {
    key: 'costa-blanca-south',
    label: 'Costa Blanca South',
    shortLabel: 'CB South',
    isInland: false,
    description: 'From Torrevieja to Pilar de la Horadada - sunny beaches, golf',
  },
  'costa-blanca-south-inland': {
    key: 'costa-blanca-south-inland',
    label: 'Costa Blanca South Inland',
    shortLabel: 'CB South Inland',
    isInland: true,
    description: 'Vega Baja region - Algorfa, Rojales, best value for money',
  },
  'costa-calida': {
    key: 'costa-calida',
    label: 'Costa Calida',
    shortLabel: 'Costa Calida',
    isInland: false,
    description: 'Mar Menor, La Manga - warm waters, Spanish feel',
  },
  'costa-calida-inland': {
    key: 'costa-calida-inland',
    label: 'Costa Calida Inland',
    shortLabel: 'CC Inland',
    isInland: true,
    description: 'Murcia region - Torre Pacheco, authentic rural Spain',
  },
};

// =============================================================================
// TOWN NAME ALIASES - Normalize different spellings to canonical names
// =============================================================================
// Use this to merge towns that should be treated as the same location
export const TOWN_ALIASES: Record<string, string> = {
  // Javea variations
  'xabia': 'javea',
  'jávea': 'javea',
  'jávea xàbia': 'javea',
  'javea xabia': 'javea',
  'xàbia': 'javea',

  // Alfaz del Pi variations
  'alfas del pi': 'alfaz del pi',
  'alfàs del pi': 'alfaz del pi',
  'l\'alfàs del pi': 'alfaz del pi',
  'lalfas del pi': 'alfaz del pi',

  // Moraira/Teulada - merge into Moraira (more recognizable)
  'moraira_teulada': 'moraira',
  'moraira-teulada': 'moraira',
  'moraira teulada': 'moraira',
  'teulada-moraira': 'moraira',
  'teulada moraira': 'moraira',

  // Denia variations
  'dénia': 'denia',

  // Calpe variations
  'calp': 'calpe',

  // Guardamar variations
  'guardamar': 'guardamar del segura',

  // Orihuela Costa variations
  'orihuela-costa': 'orihuela costa',

  // San Miguel variations
  'san miguel': 'san miguel de salinas',

  // Los Montesinos variations
  'montesinos': 'los montesinos',

  // Ciudad Quesada variations
  'quesada': 'ciudad quesada',
};

/**
 * Normalize town name using aliases
 */
export function normalizeTownName(town: string): string {
  const townLower = (town || '').toLowerCase().trim();
  return TOWN_ALIASES[townLower] || townLower;
}

// =============================================================================
// TOWN TO REGION MAPPING
// =============================================================================
// This is THE definitive list. If a town isn't here, it won't be categorized.

export const TOWN_TO_REGION: Record<string, RegionKey> = {
  // COSTA BLANCA NORTH - COASTAL
  'denia': 'costa-blanca-north',
  'javea': 'costa-blanca-north',
  'xabia': 'costa-blanca-north',
  'moraira': 'costa-blanca-north',
  'teulada': 'costa-blanca-north',
  'benissa': 'costa-blanca-north',
  'calpe': 'costa-blanca-north',
  'altea': 'costa-blanca-north',
  'alfaz del pi': 'costa-blanca-north',
  'alfas del pi': 'costa-blanca-north', // Added alias
  'albir': 'costa-blanca-north',
  'benidorm': 'costa-blanca-north',
  'villajoyosa': 'costa-blanca-north',
  'benitachell': 'costa-blanca-north',
  'cumbre del sol': 'costa-blanca-north',

  // COSTA BLANCA NORTH - INLAND
  'jalon': 'costa-blanca-north-inland',
  'jalón': 'costa-blanca-north-inland',
  'xalo': 'costa-blanca-north-inland',
  'lliber': 'costa-blanca-north-inland',
  'parcent': 'costa-blanca-north-inland',
  'murla': 'costa-blanca-north-inland',
  'alcalali': 'costa-blanca-north-inland',
  'pedreguer': 'costa-blanca-north-inland',
  'ondara': 'costa-blanca-north-inland',
  'gata de gorgos': 'costa-blanca-north-inland',
  'polop': 'costa-blanca-north-inland',
  'la nucia': 'costa-blanca-north-inland',
  'relleu': 'costa-blanca-north-inland',
  'finestrat': 'costa-blanca-north-inland',
  'sella': 'costa-blanca-north-inland',
  'orxeta': 'costa-blanca-north-inland',
  "callosa d'en sarria": 'costa-blanca-north-inland',
  'callosa den sarria': 'costa-blanca-north-inland',
  'tarbena': 'costa-blanca-north-inland',
  'benigembla': 'costa-blanca-north-inland',

  // COSTA BLANCA SOUTH - COASTAL
  'torrevieja': 'costa-blanca-south',
  'orihuela costa': 'costa-blanca-south',
  'punta prima': 'costa-blanca-south',
  'playa flamenca': 'costa-blanca-south',
  'la zenia': 'costa-blanca-south',
  'cabo roig': 'costa-blanca-south',
  'campoamor': 'costa-blanca-south',
  'pilar de la horadada': 'costa-blanca-south',
  'mil palmeras': 'costa-blanca-south',
  'torre de la horadada': 'costa-blanca-south',
  'guardamar': 'costa-blanca-south',
  'guardamar del segura': 'costa-blanca-south',
  'santa pola': 'costa-blanca-south',
  'gran alacant': 'costa-blanca-south',
  'alicante': 'costa-blanca-south',

  // COSTA BLANCA SOUTH - INLAND (Vega Baja)
  'algorfa': 'costa-blanca-south-inland',
  'la finca': 'costa-blanca-south-inland', // La Finca Golf is in Algorfa
  'la finca golf': 'costa-blanca-south-inland',
  'rojales': 'costa-blanca-south-inland',
  'benijofar': 'costa-blanca-south-inland',
  'benijófar': 'costa-blanca-south-inland',
  'formentera del segura': 'costa-blanca-south-inland',
  'formentera': 'costa-blanca-south-inland',
  'san fulgencio': 'costa-blanca-south-inland',
  'daya nueva': 'costa-blanca-south-inland',
  'daya vieja': 'costa-blanca-south-inland',
  'almoradi': 'costa-blanca-south-inland',
  'almoradí': 'costa-blanca-south-inland',
  'catral': 'costa-blanca-south-inland',
  'dolores': 'costa-blanca-south-inland',
  'bigastro': 'costa-blanca-south-inland',
  'jacarilla': 'costa-blanca-south-inland',
  'benejuzar': 'costa-blanca-south-inland',
  'benejúzar': 'costa-blanca-south-inland',
  'redovan': 'costa-blanca-south-inland',
  'redován': 'costa-blanca-south-inland',
  'callosa de segura': 'costa-blanca-south-inland',
  'cox': 'costa-blanca-south-inland',
  'rafal': 'costa-blanca-south-inland',
  'benferri': 'costa-blanca-south-inland',
  'san miguel de salinas': 'costa-blanca-south-inland',
  'san miguel': 'costa-blanca-south-inland',
  'las salinas': 'costa-blanca-south-inland',
  'los montesinos': 'costa-blanca-south-inland',
  'montesinos': 'costa-blanca-south-inland',
  'orihuela': 'costa-blanca-south-inland', // City center is inland
  'ciudad quesada': 'costa-blanca-south-inland',
  'quesada': 'costa-blanca-south-inland',
  'vistabella': 'costa-blanca-south-inland', // Vistabella Golf
  'vistabella golf': 'costa-blanca-south-inland',
  'villamartin': 'costa-blanca-south-inland', // Villamartin Golf area
  'las ramblas': 'costa-blanca-south-inland', // Las Ramblas Golf
  'campoamor golf': 'costa-blanca-south-inland',
  'las colinas': 'costa-blanca-south-inland', // Las Colinas Golf

  // COSTA CALIDA - COASTAL (Mar Menor)
  'san javier': 'costa-calida',
  'san pedro del pinatar': 'costa-calida',
  'santiago de la ribera': 'costa-calida',
  'los alcazares': 'costa-calida',
  'la manga': 'costa-calida',
  'la manga del mar menor': 'costa-calida',
  'los urrutias': 'costa-calida',
  'los nietos': 'costa-calida',
  'mar de cristal': 'costa-calida',
  'playa honda': 'costa-calida',
  'cartagena': 'costa-calida',
  'mazarron': 'costa-calida',
  'puerto de mazarron': 'costa-calida',
  'aguilas': 'costa-calida',

  // COSTA CALIDA - INLAND (Murcia region)
  'torre pacheco': 'costa-calida-inland',
  'sucina': 'costa-calida-inland',
  'roldan': 'costa-calida-inland',
  'balsicas': 'costa-calida-inland',
  'fuente alamo': 'costa-calida-inland',
  'alhama de murcia': 'costa-calida-inland',
  'totana': 'costa-calida-inland',
  'librilla': 'costa-calida-inland',
  'mula': 'costa-calida-inland',
  'murcia': 'costa-calida-inland',
};

// =============================================================================
// PROVINCES
// =============================================================================
export const ALLOWED_PROVINCES = ['alicante', 'alacant', 'murcia'];
export const EXCLUDED_PROVINCES = ['almeria', 'almería', 'granada', 'malaga', 'málaga'];

// Towns to ALWAYS exclude (Almeria coast)
export const EXCLUDED_TOWNS = [
  'vera', 'mojacar', 'mojácar', 'garrucha', 'carboneras', 'nijar', 'níjar',
  'almeria', 'almería', 'roquetas', 'aguadulce', 'almerimar', 'macenas',
  'desert springs', 'palomares', 'cuevas', 'pulpi', 'pulpí', 'san juan de los terreros',
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get region for a town name (case-insensitive, partial match)
 * Uses normalization to handle different spellings
 */
export function getRegionForTown(town: string): RegionKey | null {
  const townLower = (town || '').toLowerCase().trim();

  // First normalize the town name
  const normalizedTown = normalizeTownName(townLower);

  // Try exact match with normalized name first
  if (TOWN_TO_REGION[normalizedTown]) {
    return TOWN_TO_REGION[normalizedTown];
  }

  // Try exact match with original name
  if (TOWN_TO_REGION[townLower]) {
    return TOWN_TO_REGION[townLower];
  }

  // Try partial match (town name contains a known town)
  for (const [knownTown, region] of Object.entries(TOWN_TO_REGION)) {
    if (townLower.includes(knownTown) || knownTown.includes(townLower)) {
      return region;
    }
  }

  return null;
}

/**
 * Check if a town is in an inland region
 */
export function isInlandTown(town: string): boolean {
  const region = getRegionForTown(town);
  if (!region) return false;
  return REGIONS[region].isInland;
}

/**
 * Check if a town should be excluded
 */
export function isExcludedTown(town: string): boolean {
  const townLower = (town || '').toLowerCase().trim();
  return EXCLUDED_TOWNS.some(t => townLower.includes(t));
}

/**
 * Check if a province should be excluded
 */
export function isExcludedProvince(province: string): boolean {
  const provinceLower = (province || '').toLowerCase().trim();
  return EXCLUDED_PROVINCES.some(p => provinceLower.includes(p));
}

/**
 * Check if property is in our target area
 */
export function isInTargetArea(province: string, town: string): boolean {
  if (isExcludedProvince(province)) return false;
  if (isExcludedTown(town)) return false;

  const provinceLower = (province || '').toLowerCase().trim();
  if (ALLOWED_PROVINCES.some(p => provinceLower.includes(p))) {
    return true;
  }

  // Check by town if province unknown
  return getRegionForTown(town) !== null;
}

/**
 * Get all inland regions
 */
export function getInlandRegions(): RegionConfig[] {
  return Object.values(REGIONS).filter(r => r.isInland);
}

/**
 * Get all towns for a specific region
 */
export function getTownsForRegion(regionKey: RegionKey): string[] {
  return Object.entries(TOWN_TO_REGION)
    .filter(([_, region]) => region === regionKey)
    .map(([town]) => town);
}

// =============================================================================
// PROPERTY TYPES
// =============================================================================
export const PROPERTY_TYPES = {
  villa: ['villa', 'detached', 'chalet'],
  apartment: ['apartment', 'flat', 'piso'],
  townhouse: ['townhouse', 'town house', 'adosado', 'semi-detached'],
  bungalow: ['bungalow'],
  penthouse: ['penthouse', 'atico'],
  duplex: ['duplex'],
  land: ['land', 'plot', 'terreno', 'solar'],
};

/**
 * Normalize property type
 */
export function normalizePropertyType(type: string): string {
  const typeLower = (type || '').toLowerCase();

  for (const [normalized, keywords] of Object.entries(PROPERTY_TYPES)) {
    if (keywords.some(k => typeLower.includes(k))) {
      return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    }
  }

  return type || 'Property';
}
