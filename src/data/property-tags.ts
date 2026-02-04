/**
 * Property Tagging System
 *
 * Comprehensive tagging for properties that integrates with:
 * - Blog posts (for "Best Beach Properties" type articles)
 * - Search/filtering
 * - SEO structured data
 * - Property recommendations
 */

// ==========================================
// TAG CATEGORIES
// ==========================================

export type TagCategory =
  | 'location'      // Beach, Golf, City Center, Coastal, Inland
  | 'price'         // Budget, Mid-range, Luxury, Investment
  | 'property'      // Villa, Apartment, Penthouse, etc.
  | 'status'        // Key-ready, Off-plan, Under Construction
  | 'lifestyle'     // Family, Retirement, Holiday, Investment
  | 'feature'       // Pool, Sea View, Garden, Modern
  | 'beach'         // Specific beach proximity tags
  | 'golf'          // Specific golf course tags
  | 'region';       // Costa Blanca South, North, Costa Calida

export interface Tag {
  id: string;
  name: string;
  slug: string;
  category: TagCategory;
  description?: string;
  icon?: string;           // Emoji or icon name
  blogRelevant: boolean;   // Can be used for blog posts like "Best X Properties"
  seoKeywords?: string[];  // Related SEO keywords
}

// ==========================================
// BEACH ZONES - Properties near beaches
// ==========================================

export const BEACH_ZONES: Record<string, {
  beach: string;
  distance: 'beachfront' | 'walking' | 'short-drive';
  town: string;
}> = {
  // TORREVIEJA BEACHES
  'playa de el cura': { beach: 'Playa del Cura', distance: 'walking', town: 'Torrevieja' },
  'playa del cura': { beach: 'Playa del Cura', distance: 'walking', town: 'Torrevieja' },
  'playa el cura': { beach: 'Playa del Cura', distance: 'walking', town: 'Torrevieja' },
  'la mata': { beach: 'Playa de La Mata', distance: 'walking', town: 'Torrevieja' },
  'playa los locos': { beach: 'Playa de Los Locos', distance: 'beachfront', town: 'Torrevieja' },
  'playa los naufragos': { beach: 'Playa de Los Náufragos', distance: 'beachfront', town: 'Torrevieja' },
  'acequion': { beach: 'Playa del Acequión', distance: 'walking', town: 'Torrevieja' },
  'los balcones': { beach: 'Multiple Torrevieja beaches', distance: 'short-drive', town: 'Torrevieja' },
  'aguas nuevas': { beach: 'Playa del Cura', distance: 'short-drive', town: 'Torrevieja' },

  // ORIHUELA COSTA BEACHES
  'la zenia': { beach: 'Cala Bosque / La Zenia Beach', distance: 'walking', town: 'Orihuela Costa' },
  'playa flamenca': { beach: 'Playa Flamenca', distance: 'walking', town: 'Orihuela Costa' },
  'cabo roig': { beach: 'Cala Capitán', distance: 'walking', town: 'Orihuela Costa' },
  'campoamor': { beach: 'Playa de Campoamor', distance: 'walking', town: 'Orihuela Costa' },
  'dehesa de campoamor': { beach: 'Playa de Campoamor', distance: 'walking', town: 'Orihuela Costa' },
  'punta prima': { beach: 'Playa de Punta Prima', distance: 'walking', town: 'Orihuela Costa' },
  'aguamarina': { beach: 'Playa Flamenca', distance: 'walking', town: 'Orihuela Costa' },

  // PILAR DE LA HORADADA
  'mil palmeras': { beach: 'Playa de Mil Palmeras', distance: 'walking', town: 'Pilar de la Horadada' },
  'torre de la horadada': { beach: 'Playa de la Torre', distance: 'walking', town: 'Pilar de la Horadada' },
  'el mojon': { beach: 'Playa del Mojón', distance: 'walking', town: 'Pilar de la Horadada' },

  // GUARDAMAR
  'el raso': { beach: 'Playa de Guardamar', distance: 'short-drive', town: 'Guardamar del Segura' },
  'guardamar': { beach: 'Playa de Guardamar', distance: 'walking', town: 'Guardamar del Segura' },

  // MAR MENOR / COSTA CALIDA
  'los narejos': { beach: 'Mar Menor beaches', distance: 'walking', town: 'Los Alcázares' },
  'los alcazares': { beach: 'Playa de Los Alcázares', distance: 'walking', town: 'Los Alcázares' },
  'santiago de la ribera': { beach: 'Playa de Santiago', distance: 'walking', town: 'San Javier' },
  'la manga': { beach: 'La Manga beaches', distance: 'beachfront', town: 'La Manga' },
  'mar de plata': { beach: 'Mazarrón beaches', distance: 'walking', town: 'Puerto de Mazarrón' },
  'lo pagan': { beach: 'Playa de Lo Pagán', distance: 'walking', town: 'San Pedro del Pinatar' },

  // COSTA BLANCA NORTH - Extensive coverage for Background Properties feed
  'muchavista': { beach: 'Playa de Muchavista', distance: 'walking', town: 'El Campello' },
  'la tellerola': { beach: 'Playa de Villajoyosa', distance: 'short-drive', town: 'Villajoyosa' },

  // JAVEA / XABIA
  'javea': { beach: 'Playa del Arenal', distance: 'walking', town: 'Jávea' },
  'xabia': { beach: 'Playa del Arenal', distance: 'walking', town: 'Jávea' },
  'arenal': { beach: 'Playa del Arenal', distance: 'walking', town: 'Jávea' },
  'el arenal': { beach: 'Playa del Arenal', distance: 'walking', town: 'Jávea' },
  'la grava': { beach: 'Playa La Grava', distance: 'walking', town: 'Jávea' },
  'portichol': { beach: 'Playa del Arenal', distance: 'short-drive', town: 'Jávea' },
  'montgo': { beach: 'Playa del Arenal', distance: 'short-drive', town: 'Jávea' },
  'montgó': { beach: 'Playa del Arenal', distance: 'short-drive', town: 'Jávea' },
  'tosalet': { beach: 'Cala Blanca', distance: 'walking', town: 'Jávea' },
  'cap marti': { beach: 'Cala Blanca', distance: 'walking', town: 'Jávea' },

  // DENIA
  'denia': { beach: 'Playa de Les Marines', distance: 'walking', town: 'Dénia' },
  'les marines': { beach: 'Playa de Les Marines', distance: 'walking', town: 'Dénia' },
  'les deveses': { beach: 'Playa Les Deveses', distance: 'walking', town: 'Dénia' },
  'deveses': { beach: 'Playa Les Deveses', distance: 'walking', town: 'Dénia' },
  'les rotes': { beach: 'Playa Les Rotes', distance: 'walking', town: 'Dénia' },
  'rotes': { beach: 'Playa Les Rotes', distance: 'walking', town: 'Dénia' },
  'marquesa': { beach: 'Playa de Les Marines', distance: 'short-drive', town: 'Dénia' },

  // MORAIRA
  'moraira': { beach: 'Playa de l\'Ampolla', distance: 'walking', town: 'Moraira' },
  'el portet': { beach: 'Playa El Portet', distance: 'walking', town: 'Moraira' },
  'l\'ampolla': { beach: 'Playa de l\'Ampolla', distance: 'walking', town: 'Moraira' },
  'ampolla': { beach: 'Playa de l\'Ampolla', distance: 'walking', town: 'Moraira' },
  'cap blanc': { beach: 'Playa de l\'Ampolla', distance: 'short-drive', town: 'Moraira' },
  'benitachell': { beach: 'Cala del Moraig', distance: 'short-drive', town: 'Benitachell' },
  'cumbre del sol': { beach: 'Cala del Moraig', distance: 'short-drive', town: 'Benitachell' },

  // CALPE
  'calpe': { beach: 'Playa Arenal-Bol', distance: 'walking', town: 'Calpe' },
  'calp': { beach: 'Playa Arenal-Bol', distance: 'walking', town: 'Calpe' },
  'arenal bol': { beach: 'Playa Arenal-Bol', distance: 'walking', town: 'Calpe' },
  'la fossa': { beach: 'Playa La Fossa', distance: 'walking', town: 'Calpe' },
  'cantal roig': { beach: 'Playa Cantal Roig', distance: 'walking', town: 'Calpe' },
  'levante': { beach: 'Playa Arenal-Bol', distance: 'short-drive', town: 'Calpe' },

  // ALTEA
  'altea': { beach: 'Playa La Roda', distance: 'walking', town: 'Altea' },
  'la roda': { beach: 'Playa La Roda', distance: 'walking', town: 'Altea' },
  'albir': { beach: 'Playa del Albir', distance: 'walking', town: 'Albir' },
  'altea hills': { beach: 'Playa La Roda', distance: 'short-drive', town: 'Altea' },
  'mascarat': { beach: 'Cala Mascarat', distance: 'walking', town: 'Altea' },
  'sierra altea': { beach: 'Playa La Roda', distance: 'short-drive', town: 'Altea' },

  // BENIDORM
  'benidorm': { beach: 'Playa de Levante', distance: 'walking', town: 'Benidorm' },
  'rincon de loix': { beach: 'Playa de Levante', distance: 'walking', town: 'Benidorm' },
  'poniente': { beach: 'Playa de Poniente', distance: 'walking', town: 'Benidorm' },
  'levante benidorm': { beach: 'Playa de Levante', distance: 'walking', town: 'Benidorm' },
  'cala finestrat': { beach: 'Cala Finestrat', distance: 'walking', town: 'Finestrat' },

  // VILLAJOYOSA
  'villajoyosa': { beach: 'Playa Centro Villajoyosa', distance: 'walking', town: 'Villajoyosa' },
  'la vila': { beach: 'Playa Centro Villajoyosa', distance: 'walking', town: 'Villajoyosa' },
  'paraiso': { beach: 'Playa Paraíso', distance: 'walking', town: 'Villajoyosa' },
  'bol nuevo': { beach: 'Playa Bol Nuevo', distance: 'walking', town: 'Villajoyosa' },

  // FINESTRAT (Inland but near coast)
  'finestrat': { beach: 'Cala Finestrat', distance: 'short-drive', town: 'Finestrat' },
  'la cala': { beach: 'Cala Finestrat', distance: 'walking', town: 'Finestrat' },
  'balcon de finestrat': { beach: 'Cala Finestrat', distance: 'short-drive', town: 'Finestrat' },

  // PEDREGUER AREA (Background Properties feed focus)
  'pedreguer': { beach: 'Playa Les Marines (Dénia)', distance: 'short-drive', town: 'Pedreguer' },
  'ondara': { beach: 'Playa Les Marines (Dénia)', distance: 'short-drive', town: 'Ondara' },
  'gata de gorgos': { beach: 'Playa del Arenal (Jávea)', distance: 'short-drive', town: 'Gata de Gorgos' },
  'teulada': { beach: 'Playa de l\'Ampolla (Moraira)', distance: 'short-drive', town: 'Teulada' },
  'benissa': { beach: 'Cala Baladrar', distance: 'short-drive', town: 'Benissa' },
  'alcalali': { beach: 'Playa Les Marines (Dénia)', distance: 'short-drive', town: 'Alcalalí' },
  'jalon': { beach: 'Playa del Arenal (Jávea)', distance: 'short-drive', town: 'Jalón' },
  'jalón': { beach: 'Playa del Arenal (Jávea)', distance: 'short-drive', town: 'Jalón' },
  'xalo': { beach: 'Playa del Arenal (Jávea)', distance: 'short-drive', town: 'Jalón' },
  'lliber': { beach: 'Playa del Arenal (Jávea)', distance: 'short-drive', town: 'Llíber' },
  'parcent': { beach: 'Playa del Arenal (Jávea)', distance: 'short-drive', town: 'Parcent' },
  'murla': { beach: 'Playa del Arenal (Jávea)', distance: 'short-drive', town: 'Murla' },

  // EL CAMPELLO
  'el campello': { beach: 'Playa Muchavista', distance: 'walking', town: 'El Campello' },
  'cala baeza': { beach: 'Cala Baeza', distance: 'walking', town: 'El Campello' },
  'coveta fuma': { beach: 'Playa Coveta Fumá', distance: 'walking', town: 'El Campello' },

  // LA NUCIA / POLOP (Inland but near coast)
  'la nucia': { beach: 'Playa del Albir', distance: 'short-drive', town: 'La Nucía' },
  'polop': { beach: 'Playa del Albir', distance: 'short-drive', town: 'Polop' },
  'alfaz del pi': { beach: 'Playa del Albir', distance: 'walking', town: 'Alfàs del Pi' },
};

// ==========================================
// GOLF ZONES - Properties near golf courses
// ==========================================

export const GOLF_ZONES: Record<string, {
  course: string;
  distance: 'on-course' | 'walking' | 'short-drive';
  holes: number;
}> = {
  // VEGA BAJA GOLF
  'vistabella golf': { course: 'Vistabella Golf', distance: 'on-course', holes: 18 },
  'vistabella': { course: 'Vistabella Golf', distance: 'on-course', holes: 18 },
  'lo romero golf': { course: 'Lo Romero Golf', distance: 'on-course', holes: 18 },
  'lo romero': { course: 'Lo Romero Golf', distance: 'on-course', holes: 18 },
  'la finca golf': { course: 'La Finca Golf', distance: 'on-course', holes: 18 },
  'la finca': { course: 'La Finca Golf', distance: 'on-course', holes: 18 },
  'las colinas golf': { course: 'Las Colinas Golf', distance: 'on-course', holes: 18 },
  'las colinas': { course: 'Las Colinas Golf', distance: 'on-course', holes: 18 },
  'villamartin': { course: 'Villamartín Golf', distance: 'walking', holes: 18 },
  'las ramblas': { course: 'Las Ramblas Golf', distance: 'walking', holes: 18 },
  'campoamor': { course: 'Real Club de Golf Campoamor', distance: 'walking', holes: 18 },
  'doña pepa': { course: 'La Marquesa Golf', distance: 'short-drive', holes: 18 },
  'ciudad quesada': { course: 'La Marquesa Golf', distance: 'short-drive', holes: 18 },

  // MAR MENOR GOLF
  'lo serena golf': { course: 'Serena Golf', distance: 'on-course', holes: 18 },
  'serena golf': { course: 'Serena Golf', distance: 'on-course', holes: 18 },
  'mar menor golf': { course: 'Mar Menor Golf Resort', distance: 'on-course', holes: 18 },
  'roda golf': { course: 'Roda Golf', distance: 'on-course', holes: 18 },
  'hacienda riquelme': { course: 'Hacienda Riquelme Golf', distance: 'on-course', holes: 18 },
  'la torre golf': { course: 'La Torre Golf', distance: 'on-course', holes: 18 },
  'country club': { course: 'Mazarrón Country Club', distance: 'on-course', holes: 18 },

  // COSTA BLANCA NORTH - Extensive golf coverage for Background Properties feed
  'don cayo': { course: 'Don Cayo Golf', distance: 'on-course', holes: 9 },
  'ifach': { course: 'Club de Golf Ifach', distance: 'short-drive', holes: 9 },

  // JAVEA GOLF
  'javea golf': { course: 'Club de Golf Jávea', distance: 'on-course', holes: 9 },
  'la sella': { course: 'La Sella Golf Resort', distance: 'on-course', holes: 27 },
  'la sella golf': { course: 'La Sella Golf Resort', distance: 'on-course', holes: 27 },
  'oliva nova': { course: 'Oliva Nova Golf', distance: 'on-course', holes: 18 },
  'oliva nova golf': { course: 'Oliva Nova Golf', distance: 'on-course', holes: 18 },

  // ALTEA GOLF
  'altea golf': { course: 'Club de Golf Don Cayo', distance: 'on-course', holes: 9 },
  'villaitana': { course: 'Villaitana Golf', distance: 'on-course', holes: 36 },
  'villaitana golf': { course: 'Villaitana Golf', distance: 'on-course', holes: 36 },

  // BENIDORM / FINESTRAT GOLF
  'asia gardens': { course: 'Villaitana Golf', distance: 'short-drive', holes: 36 },
  'terra mitica': { course: 'Villaitana Golf', distance: 'short-drive', holes: 36 },

  // CALPE / BENISSA GOLF
  'bernia': { course: 'Club de Golf Ifach', distance: 'short-drive', holes: 9 },

  // ALICANTE GOLF
  'bonalba': { course: 'Bonalba Golf', distance: 'on-course', holes: 18 },
  'bonalba golf': { course: 'Bonalba Golf', distance: 'on-course', holes: 18 },
  'alicante golf': { course: 'Alicante Golf', distance: 'on-course', holes: 18 },
  'font del llop': { course: 'Font del Llop Golf', distance: 'on-course', holes: 18 },
};

// ==========================================
// PRICE BRACKETS
// ==========================================

export interface PriceBracket {
  id: string;
  name: string;
  slug: string;
  min: number;
  max: number;
  description: string;
  blogTitle: string;  // For blog posts like "Best Budget Properties..."
}

export const PRICE_BRACKETS: PriceBracket[] = [
  {
    id: 'budget',
    name: 'Budget-Friendly',
    slug: 'budget-properties',
    min: 0,
    max: 175000,
    description: 'Affordable new build properties under €175,000',
    blogTitle: 'Best Budget New Builds'
  },
  {
    id: 'affordable',
    name: 'Affordable',
    slug: 'affordable-properties',
    min: 175000,
    max: 250000,
    description: 'Quality new builds from €175,000 to €250,000',
    blogTitle: 'Best Affordable New Builds'
  },
  {
    id: 'mid-range',
    name: 'Mid-Range',
    slug: 'mid-range-properties',
    min: 250000,
    max: 400000,
    description: 'Premium new builds from €250,000 to €400,000',
    blogTitle: 'Best Mid-Range New Builds'
  },
  {
    id: 'luxury',
    name: 'Luxury',
    slug: 'luxury-properties',
    min: 400000,
    max: 750000,
    description: 'Luxury new builds from €400,000 to €750,000',
    blogTitle: 'Best Luxury New Builds'
  },
  {
    id: 'ultra-luxury',
    name: 'Ultra Luxury',
    slug: 'ultra-luxury-properties',
    min: 750000,
    max: Infinity,
    description: 'Exclusive properties over €750,000',
    blogTitle: 'Most Exclusive New Builds'
  }
];

// ==========================================
// LIFESTYLE TAGS
// ==========================================

export const LIFESTYLE_TAGS: Tag[] = [
  {
    id: 'beach-lover',
    name: 'Beach Lover',
    slug: 'beach-properties',
    category: 'lifestyle',
    description: 'Properties perfect for those who love the beach',
    icon: '🏖️',
    blogRelevant: true,
    seoKeywords: ['beach property spain', 'beachfront apartment', 'costa blanca beach']
  },
  {
    id: 'golf-enthusiast',
    name: 'Golf Enthusiast',
    slug: 'golf-properties',
    category: 'lifestyle',
    description: 'Properties on or near golf courses',
    icon: '⛳',
    blogRelevant: true,
    seoKeywords: ['golf property spain', 'golf resort apartment', 'costa blanca golf']
  },
  {
    id: 'family-home',
    name: 'Family Home',
    slug: 'family-properties',
    category: 'lifestyle',
    description: 'Spacious properties ideal for families',
    icon: '👨‍👩‍👧‍👦',
    blogRelevant: true,
    seoKeywords: ['family home spain', 'villa for families', 'family property costa blanca']
  },
  {
    id: 'retirement',
    name: 'Retirement',
    slug: 'retirement-properties',
    category: 'lifestyle',
    description: 'Properties perfect for retirees',
    icon: '🌅',
    blogRelevant: true,
    seoKeywords: ['retire to spain', 'retirement property', 'costa blanca retirement']
  },
  {
    id: 'holiday-home',
    name: 'Holiday Home',
    slug: 'holiday-properties',
    category: 'lifestyle',
    description: 'Ideal properties for holiday use',
    icon: '🌴',
    blogRelevant: true,
    seoKeywords: ['holiday home spain', 'vacation property', 'spanish holiday apartment']
  },
  {
    id: 'investment',
    name: 'Investment',
    slug: 'investment-properties',
    category: 'lifestyle',
    description: 'Properties with strong rental potential',
    icon: '📈',
    blogRelevant: true,
    seoKeywords: ['investment property spain', 'buy to let spain', 'rental investment costa blanca']
  },
  {
    id: 'first-time-buyer',
    name: 'First-Time Buyer',
    slug: 'first-time-buyer-properties',
    category: 'lifestyle',
    description: 'Perfect entry-level properties',
    icon: '🔑',
    blogRelevant: true,
    seoKeywords: ['first home spain', 'starter property', 'affordable first home']
  }
];

// ==========================================
// FEATURE TAGS
// ==========================================

export const FEATURE_TAGS: Tag[] = [
  {
    id: 'sea-view',
    name: 'Sea View',
    slug: 'sea-view-properties',
    category: 'feature',
    icon: '🌊',
    blogRelevant: true,
    seoKeywords: ['sea view property', 'ocean view apartment', 'mediterranean views']
  },
  {
    id: 'private-pool',
    name: 'Private Pool',
    slug: 'private-pool-properties',
    category: 'feature',
    icon: '🏊',
    blogRelevant: true,
    seoKeywords: ['villa with pool', 'private pool property', 'pool villa spain']
  },
  {
    id: 'communal-pool',
    name: 'Communal Pool',
    slug: 'communal-pool-properties',
    category: 'feature',
    icon: '🏊‍♂️',
    blogRelevant: false,
    seoKeywords: ['apartment with pool', 'communal pool']
  },
  {
    id: 'garden',
    name: 'Garden',
    slug: 'garden-properties',
    category: 'feature',
    icon: '🌳',
    blogRelevant: true,
    seoKeywords: ['property with garden', 'villa with garden spain']
  },
  {
    id: 'roof-terrace',
    name: 'Roof Terrace',
    slug: 'roof-terrace-properties',
    category: 'feature',
    icon: '☀️',
    blogRelevant: true,
    seoKeywords: ['penthouse with terrace', 'rooftop apartment', 'solarium property']
  },
  {
    id: 'parking',
    name: 'Parking',
    slug: 'parking-properties',
    category: 'feature',
    icon: '🚗',
    blogRelevant: false,
    seoKeywords: ['property with parking', 'garage included']
  },
  {
    id: 'modern-design',
    name: 'Modern Design',
    slug: 'modern-properties',
    category: 'feature',
    icon: '✨',
    blogRelevant: true,
    seoKeywords: ['modern villa spain', 'contemporary apartment', 'designer property']
  },
  {
    id: 'key-ready',
    name: 'Key Ready',
    slug: 'key-ready-properties',
    category: 'status',
    icon: '🔑',
    blogRelevant: true,
    seoKeywords: ['key ready property', 'move in ready', 'immediate occupation']
  },
  {
    id: 'off-plan',
    name: 'Off Plan',
    slug: 'off-plan-properties',
    category: 'status',
    icon: '📋',
    blogRelevant: true,
    seoKeywords: ['off plan property spain', 'new development', 'pre-construction']
  }
];

// ==========================================
// PROPERTY TYPE TAGS
// ==========================================

export const PROPERTY_TYPE_TAGS: Tag[] = [
  {
    id: 'apartment',
    name: 'Apartment',
    slug: 'apartments',
    category: 'property',
    icon: '🏢',
    blogRelevant: true,
    seoKeywords: ['apartment costa blanca', 'flat spain', 'piso']
  },
  {
    id: 'villa',
    name: 'Villa',
    slug: 'villas',
    category: 'property',
    icon: '🏡',
    blogRelevant: true,
    seoKeywords: ['villa costa blanca', 'detached house spain', 'chalet']
  },
  {
    id: 'townhouse',
    name: 'Townhouse',
    slug: 'townhouses',
    category: 'property',
    icon: '🏘️',
    blogRelevant: true,
    seoKeywords: ['townhouse spain', 'adosado', 'terraced house']
  },
  {
    id: 'bungalow',
    name: 'Bungalow',
    slug: 'bungalows',
    category: 'property',
    icon: '🏠',
    blogRelevant: true,
    seoKeywords: ['bungalow spain', 'single storey', 'ground floor property']
  },
  {
    id: 'penthouse',
    name: 'Penthouse',
    slug: 'penthouses',
    category: 'property',
    icon: '🌆',
    blogRelevant: true,
    seoKeywords: ['penthouse spain', 'atico', 'top floor apartment']
  },
  {
    id: 'duplex',
    name: 'Duplex',
    slug: 'duplexes',
    category: 'property',
    icon: '🔲',
    blogRelevant: true,
    seoKeywords: ['duplex spain', 'two storey apartment', 'maisonette']
  }
];

// ==========================================
// REGION TAGS
// ==========================================

export const REGION_TAGS: Tag[] = [
  {
    id: 'costa-blanca-south',
    name: 'Costa Blanca South',
    slug: 'costa-blanca-south',
    category: 'region',
    icon: '☀️',
    blogRelevant: true,
    seoKeywords: ['costa blanca south', 'torrevieja', 'orihuela costa', 'alicante south']
  },
  {
    id: 'costa-blanca-north',
    name: 'Costa Blanca North',
    slug: 'costa-blanca-north',
    category: 'region',
    icon: '🏔️',
    blogRelevant: true,
    seoKeywords: ['costa blanca north', 'javea', 'denia', 'benidorm', 'altea']
  },
  {
    id: 'costa-calida',
    name: 'Costa Cálida',
    slug: 'costa-calida',
    category: 'region',
    icon: '🌅',
    blogRelevant: true,
    seoKeywords: ['costa calida', 'murcia', 'mar menor', 'los alcazares', 'la manga']
  }
];

// ==========================================
// ALL TAGS COMBINED
// ==========================================

export const ALL_TAGS: Tag[] = [
  ...LIFESTYLE_TAGS,
  ...FEATURE_TAGS,
  ...PROPERTY_TYPE_TAGS,
  ...REGION_TAGS
];

// ==========================================
// TAG FUNCTIONS
// ==========================================

/**
 * Get beach tag for a zone or town
 * Enhanced: Falls back to town-based detection for feeds with less data (Background Properties)
 */
export function getBeachTag(zone: string | undefined, town?: string): {
  isBeach: boolean;
  beach?: string;
  distance?: 'beachfront' | 'walking' | 'short-drive';
} {
  // Try zone first
  if (zone) {
    const zoneLower = zone.toLowerCase().trim();
    const beachInfo = BEACH_ZONES[zoneLower];

    if (beachInfo) {
      return {
        isBeach: true,
        beach: beachInfo.beach,
        distance: beachInfo.distance
      };
    }
  }

  // Fallback to town-based detection (for Background Properties, Miralbo feeds)
  if (town) {
    const townLower = town.toLowerCase().trim();
    const beachInfo = BEACH_ZONES[townLower];

    if (beachInfo) {
      return {
        isBeach: true,
        beach: beachInfo.beach,
        distance: beachInfo.distance
      };
    }

    // Try partial match on town name
    for (const [key, info] of Object.entries(BEACH_ZONES)) {
      if (townLower.includes(key) || key.includes(townLower)) {
        return {
          isBeach: true,
          beach: info.beach,
          distance: info.distance
        };
      }
    }
  }

  return { isBeach: false };
}

/**
 * Get golf tag for a zone or town
 * Enhanced: Falls back to town-based detection for feeds with less data
 */
export function getGolfTag(zone: string | undefined, town?: string): {
  isGolf: boolean;
  course?: string;
  distance?: 'on-course' | 'walking' | 'short-drive';
  holes?: number;
} {
  // Try zone first
  if (zone) {
    const zoneLower = zone.toLowerCase().trim();
    const golfInfo = GOLF_ZONES[zoneLower];

    if (golfInfo) {
      return {
        isGolf: true,
        course: golfInfo.course,
        distance: golfInfo.distance,
        holes: golfInfo.holes
      };
    }

    // Check if zone name contains "golf"
    if (zoneLower.includes('golf')) {
      return {
        isGolf: true,
        course: zone,
        distance: 'on-course',
        holes: 18
      };
    }
  }

  // Fallback to town-based detection
  if (town) {
    const townLower = town.toLowerCase().trim();
    const golfInfo = GOLF_ZONES[townLower];

    if (golfInfo) {
      return {
        isGolf: true,
        course: golfInfo.course,
        distance: golfInfo.distance,
        holes: golfInfo.holes
      };
    }

    // Try partial match on town name
    for (const [key, info] of Object.entries(GOLF_ZONES)) {
      if (townLower.includes(key) || key.includes(townLower)) {
        return {
          isGolf: true,
          course: info.course,
          distance: info.distance,
          holes: info.holes
        };
      }
    }
  }

  return { isGolf: false };
}

/**
 * Get price bracket for a price
 */
export function getPriceBracket(price: number): PriceBracket | undefined {
  return PRICE_BRACKETS.find(bracket =>
    price >= bracket.min && price < bracket.max
  );
}

/**
 * Get all applicable tags for a property
 * Enhanced: Supports town fallback for feeds with less zone data
 */
export function getPropertyTags(property: {
  zone?: string;
  town?: string; // Added for fallback matching
  price?: number;
  propertyType?: string;
  bedrooms?: number;
  hasPool?: boolean;
  hasSeaView?: boolean;
  hasGarden?: boolean;
  status?: string;
  region?: string;
}): Tag[] {
  const tags: Tag[] = [];

  // Beach tag - uses zone with town fallback
  const beachInfo = getBeachTag(property.zone, property.town);
  if (beachInfo.isBeach) {
    tags.push(LIFESTYLE_TAGS.find(t => t.id === 'beach-lover')!);
  }

  // Golf tag - uses zone with town fallback
  const golfInfo = getGolfTag(property.zone, property.town);
  if (golfInfo.isGolf) {
    tags.push(LIFESTYLE_TAGS.find(t => t.id === 'golf-enthusiast')!);
  }

  // Property type tag
  if (property.propertyType) {
    const typeTag = PROPERTY_TYPE_TAGS.find(t =>
      t.name.toLowerCase() === property.propertyType?.toLowerCase()
    );
    if (typeTag) tags.push(typeTag);
  }

  // Feature tags
  if (property.hasPool) {
    tags.push(FEATURE_TAGS.find(t => t.id === 'private-pool')!);
  }
  if (property.hasSeaView) {
    tags.push(FEATURE_TAGS.find(t => t.id === 'sea-view')!);
  }
  if (property.hasGarden) {
    tags.push(FEATURE_TAGS.find(t => t.id === 'garden')!);
  }

  // Status tag
  if (property.status === 'key-ready' || property.status === 'completed') {
    tags.push(FEATURE_TAGS.find(t => t.id === 'key-ready')!);
  } else if (property.status === 'off-plan') {
    tags.push(FEATURE_TAGS.find(t => t.id === 'off-plan')!);
  }

  // Lifestyle tags based on criteria
  if (property.price && property.price < 200000) {
    tags.push(LIFESTYLE_TAGS.find(t => t.id === 'first-time-buyer')!);
  }
  if (property.bedrooms && property.bedrooms >= 3) {
    tags.push(LIFESTYLE_TAGS.find(t => t.id === 'family-home')!);
  }

  // Region tag
  if (property.region) {
    const regionTag = REGION_TAGS.find(t =>
      t.name.toLowerCase() === property.region?.toLowerCase()
    );
    if (regionTag) tags.push(regionTag);
  }

  return tags.filter(Boolean);
}

/**
 * Get tags suitable for blog articles
 */
export function getBlogRelevantTags(): Tag[] {
  return ALL_TAGS.filter(tag => tag.blogRelevant);
}

/**
 * Get tag by slug
 */
export function getTagBySlug(slug: string): Tag | undefined {
  return ALL_TAGS.find(tag => tag.slug === slug);
}

/**
 * Get tags by category
 */
export function getTagsByCategory(category: TagCategory): Tag[] {
  return ALL_TAGS.filter(tag => tag.category === category);
}
