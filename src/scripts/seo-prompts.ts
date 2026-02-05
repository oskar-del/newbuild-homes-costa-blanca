/**
 * SEO-OPTIMIZED AI PROMPTS
 * ========================
 * Ultimate prompts designed to generate traffic-driving content.
 *
 * Strategy:
 * 1. Target "People Also Ask" queries for featured snippets
 * 2. Detect buyer persona to tailor content tone
 * 3. Generate search-query-style image alt tags
 * 4. Include price context and comparisons
 * 5. Voice search optimization (direct answers first)
 * 6. Long-tail keyword integration
 */

// ============================================
// BUYER PERSONA DETECTION
// ============================================
export function detectBuyerPersona(property: {
  price: number;
  bedrooms: number;
  propertyType: string;
  town: string;
  hasPool?: boolean;
  hasGolfView?: boolean;
  hasSeaView?: boolean;
}): { type: string; keywords: string[]; tone: string } {
  const { price, bedrooms, propertyType, town, hasGolfView } = property;
  const townLower = town.toLowerCase();

  // Costa Blanca South towns (retirement/budget friendly)
  const southTowns = ['torrevieja', 'orihuela', 'guardamar', 'algorfa', 'rojales', 'quesada', 'villamartin', 'campoamor', 'pilar', 'san miguel'];
  const isSouth = southTowns.some(t => townLower.includes(t));

  // Golf areas
  const golfAreas = ['algorfa', 'la finca', 'villamartin', 'campoamor', 'las colinas', 'vistabella', 'la marquesa'];
  const isGolfArea = golfAreas.some(t => townLower.includes(t)) || hasGolfView;

  // LUXURY: €500k+ OR 4+ beds + villa
  if (price >= 500000 || (bedrooms >= 4 && propertyType.toLowerCase().includes('villa'))) {
    return {
      type: 'luxury',
      keywords: ['exclusive', 'premium', 'prestigious', 'discerning buyers', 'exceptional', 'sophisticated'],
      tone: 'Sophisticated and exclusive. Emphasize quality, views, privacy, and prestige.'
    };
  }

  // GOLF: Golf views or golf area
  if (isGolfArea) {
    return {
      type: 'golf',
      keywords: ['golf lifestyle', 'fairway views', 'championship course', 'golfer\'s paradise', '19th hole'],
      tone: 'Active and lifestyle-focused. Emphasize golf access, clubhouse, courses nearby.'
    };
  }

  // RETIREMENT: South + under €350k + 2-3 beds
  if (isSouth && price < 350000 && bedrooms <= 3) {
    return {
      type: 'retirement',
      keywords: ['peaceful', 'relaxed lifestyle', 'expat community', 'year-round sunshine', 'healthcare', 'easy living'],
      tone: 'Warm and reassuring. Emphasize community, healthcare, climate, and value for money.'
    };
  }

  // FAMILY: 3+ beds + villa/townhouse
  if (bedrooms >= 3 && (propertyType.toLowerCase().includes('villa') || propertyType.toLowerCase().includes('townhouse'))) {
    return {
      type: 'family',
      keywords: ['family home', 'space to grow', 'schools nearby', 'safe neighborhood', 'outdoor space'],
      tone: 'Family-friendly and practical. Emphasize space, schools, safety, and community.'
    };
  }

  // INVESTMENT: Apartment in tourist area
  if (propertyType.toLowerCase().includes('apartment')) {
    return {
      type: 'investment',
      keywords: ['rental income', 'holiday let', 'capital appreciation', 'high demand', 'ROI'],
      tone: 'Numbers-focused and practical. Emphasize rental yields, demand, and appreciation.'
    };
  }

  // DEFAULT: Holiday home
  return {
    type: 'holiday',
    keywords: ['holiday home', 'Mediterranean escape', 'sunshine retreat', 'second home', 'getaway'],
    tone: 'Dreamy and aspirational. Emphasize lifestyle, beaches, weather, and relaxation.'
  };
}

// ============================================
// PEOPLE ALSO ASK - BY TOWN
// ============================================
export const PEOPLE_ALSO_ASK: Record<string, string[]> = {
  'torrevieja': [
    'Is Torrevieja a good place to live?',
    'How much does property cost in Torrevieja?',
    'Is Torrevieja good for expats?',
    'What is Torrevieja known for?',
    'Is Torrevieja safe to live?',
    'How far is Torrevieja from Alicante airport?',
    'Does Torrevieja have a beach?',
    'What is the weather like in Torrevieja?',
    'Are there English speaking doctors in Torrevieja?',
    'Can I get by with English in Torrevieja?',
  ],
  'javea': [
    'Is Javea expensive to live?',
    'Why is Javea so popular?',
    'Is Javea better than Benidorm?',
    'What is the average house price in Javea?',
    'Is Javea good for families?',
    'How far is Javea from Valencia airport?',
  ],
  'benidorm': [
    'Is Benidorm a good place to buy property?',
    'Is Benidorm good for expats?',
    'What is the cost of living in Benidorm?',
    'Is Benidorm safe?',
  ],
  'calpe': [
    'Is Calpe a nice place to live?',
    'Why buy property in Calpe?',
    'Is Calpe expensive?',
  ],
  'moraira': [
    'Is Moraira expensive?',
    'Why is Moraira so popular?',
    'Is Moraira good for families?',
  ],
  'algorfa': [
    'Is Algorfa a good place to live?',
    'How far is Algorfa from the beach?',
    'What golf courses are near Algorfa?',
  ],
  'orihuela costa': [
    'Is Orihuela Costa a good place to live?',
    'What is Orihuela Costa known for?',
    'Is Orihuela Costa safe?',
    'How far is Orihuela Costa from Alicante?',
  ],
  'default': [
    'Is Costa Blanca a good place to buy property?',
    'Can foreigners buy property in Spain?',
    'What are the costs of buying property in Spain?',
    'Do I need a visa to buy property in Spain?',
    'How much are property taxes in Spain?',
    'Can I get a mortgage in Spain as a foreigner?',
    'What is the cost of living in Costa Blanca?',
    'Is Costa Blanca good for retirees?',
    'How far is Costa Blanca from UK?',
    'What is the weather like on Costa Blanca?',
  ],
};

// ============================================
// PRICE CONTEXT DATA (€/m² averages by town)
// ============================================
export const TOWN_PRICE_DATA: Record<string, { avgPricePerSqm: number; trend: string; rental7Night: number; premiumComparison: string }> = {
  'torrevieja': { avgPricePerSqm: 1850, trend: '+8% year-on-year', rental7Night: 650, premiumComparison: '45% less than Costa Blanca North' },
  'orihuela costa': { avgPricePerSqm: 2100, trend: '+10% year-on-year', rental7Night: 800, premiumComparison: '35% less than Costa Blanca North' },
  'guardamar': { avgPricePerSqm: 1750, trend: '+7% year-on-year', rental7Night: 700, premiumComparison: '50% less than Jávea' },
  'algorfa': { avgPricePerSqm: 1600, trend: '+12% year-on-year', rental7Night: 900, premiumComparison: '50% less than coastal towns' },
  'villamartin': { avgPricePerSqm: 1900, trend: '+9% year-on-year', rental7Night: 850, premiumComparison: '40% less than Costa Blanca North' },
  'javea': { avgPricePerSqm: 3200, trend: '+6% year-on-year', rental7Night: 1400, premiumComparison: '30% less than Mallorca' },
  'moraira': { avgPricePerSqm: 3800, trend: '+5% year-on-year', rental7Night: 1600, premiumComparison: '25% less than Mallorca' },
  'calpe': { avgPricePerSqm: 2600, trend: '+7% year-on-year', rental7Night: 1000, premiumComparison: '20% less than Jávea' },
  'benidorm': { avgPricePerSqm: 2400, trend: '+8% year-on-year', rental7Night: 750, premiumComparison: '30% less than Costa del Sol' },
  'altea': { avgPricePerSqm: 2900, trend: '+6% year-on-year', rental7Night: 1100, premiumComparison: '25% less than Mallorca' },
  'denia': { avgPricePerSqm: 2500, trend: '+7% year-on-year', rental7Night: 900, premiumComparison: '35% less than Costa Brava' },
  'default': { avgPricePerSqm: 2200, trend: '+8% year-on-year', rental7Night: 800, premiumComparison: '40% less than Spanish island markets' },
};

// ============================================
// AMENITIES DATA BY TOWN (for Life & Amenities section)
// ============================================
export const TOWN_AMENITIES_DATA: Record<string, {
  hospitals: string[];
  internationalSchools: string[];
  supermarkets: string[];
  publicTransport: string;
  beaches: string[];
  golfCourses: string[];
  expat: string;
}> = {
  'torrevieja': {
    hospitals: ['Hospital Universitario de Torrevieja (public, 24hr)', 'Quirónsalud Torrevieja (private)', 'Multiple English-speaking clinics'],
    internationalSchools: ['El Limonar International School (British)', 'Colegio Internacional de Torrevieja'],
    supermarkets: ['Mercadona (multiple locations)', 'Carrefour', 'Lidl', 'Aldi', 'Iceland (British products)'],
    publicTransport: 'Regular bus connections to Alicante, Murcia, and coastal towns. No tram/metro.',
    beaches: ['Playa del Cura (Blue Flag)', 'La Mata (6km golden sand)', 'Los Locos', 'Los Náufragos'],
    golfCourses: ['Villamartín (15 min)', 'Las Ramblas (15 min)', 'Campoamor (20 min)', 'La Finca (20 min)'],
    expat: 'Largest expat community in Spain. English widely spoken everywhere.',
  },
  'orihuela costa': {
    hospitals: ['Hospital de Torrevieja (15 min)', 'Quirónsalud (20 min)', 'Local medical centers with English staff'],
    internationalSchools: ['El Limonar (15 min)', 'Kings College Murcia (40 min)'],
    supermarkets: ['Mercadona', 'Consum', 'Lidl', 'La Zenia Boulevard (major shopping center)'],
    publicTransport: 'Limited buses. Car recommended.',
    beaches: ['La Zenia (Blue Flag)', 'Campoamor', 'Cabo Roig', 'Playa Flamenca'],
    golfCourses: ['Villamartín (on doorstep)', 'Las Ramblas', 'Campoamor', 'Las Colinas', 'Vistabella'],
    expat: 'Strong British, Scandinavian, Dutch communities. English widely spoken.',
  },
  'algorfa': {
    hospitals: ['Hospital de Torrevieja (20 min)', 'Local health center'],
    internationalSchools: ['El Limonar (25 min)', 'Schools in Torrevieja area'],
    supermarkets: ['Local shops in village', 'Mercadona in Rojales (10 min)', 'Major shopping in Torrevieja'],
    publicTransport: 'Very limited. Car essential.',
    beaches: ['Guardamar beaches (15 min)', 'La Mata (20 min)'],
    golfCourses: ['La Finca Golf (on-site)', 'Lo Romero', 'La Marquesa', 'Vistabella'],
    expat: 'International golf community. English spoken at resort.',
  },
  'javea': {
    hospitals: ['Hospital de Dénia (15 min)', 'Clinica Benidorm (30 min)', 'Many English-speaking doctors'],
    internationalSchools: ['Xàbia International College (British)', 'Laude Lady Elizabeth (20 min)'],
    supermarkets: ['Mercadona', 'Consum', 'Masymas', 'British Corner Shop'],
    publicTransport: 'Bus to Dénia, Alicante. Ferry from Dénia to Ibiza/Mallorca.',
    beaches: ['Arenal (Blue Flag, sandy)', 'La Grava (pebbly)', 'Portitxol coves', 'Granadella'],
    golfCourses: ['Jávea Golf Club (9 holes)', 'La Sella (15 min)', 'Oliva Nova (25 min)'],
    expat: 'Large British, German, Dutch community. Excellent English everywhere.',
  },
  'benidorm': {
    hospitals: ['Hospital Clínica Benidorm', 'Hospital Marina Baixa (Villajoyosa, 15 min)', 'Multiple 24hr clinics'],
    internationalSchools: ['Colegio Internacional de Benidorm', 'Laude Newton College (25 min)'],
    supermarkets: ['Mercadona (multiple)', 'Carrefour', 'Lidl', 'British Corner Shop', 'Iceland'],
    publicTransport: 'TRAM connection to Alicante. Excellent bus network. Very walkable.',
    beaches: ['Levante Beach (2km, Blue Flag)', 'Poniente Beach (3km)', 'Mal Pas cove', 'Cala Finestrat'],
    golfCourses: ['Villaitana Golf (5 min)', 'Puig Campana (10 min)', 'Don Cayo (15 min)'],
    expat: 'Massive international community. English spoken everywhere. Year-round social scene.',
  },
  'calpe': {
    hospitals: ['Hospital de Dénia (30 min)', 'Centro de Salud Calp', 'Private clinics with English staff'],
    internationalSchools: ['Lady Elizabeth School (Cumbre del Sol, 10 min)', 'Laude Newton College (35 min)'],
    supermarkets: ['Mercadona', 'Consum', 'Lidl', 'Mas y Mas'],
    publicTransport: 'Bus connections to Benidorm, Valencia. TRAM coming soon.',
    beaches: ['Arenal-Bol (Blue Flag)', 'Cantal Roig', 'La Fossa', 'Les Bassetes'],
    golfCourses: ['Club de Golf Ifach (5 min)', 'Don Cayo (20 min)', 'La Sella (30 min)'],
    expat: 'Strong British and German community. English widely spoken in tourist areas.',
  },
  'moraira': {
    hospitals: ['Hospital de Dénia (25 min)', 'Centro de Salud Teulada-Moraira', 'Excellent private clinics'],
    internationalSchools: ['Lady Elizabeth School (15 min)', 'Laude Newton College (40 min)'],
    supermarkets: ['Mercadona', 'Consum', 'Masymas', 'Weekly market (Fridays)'],
    publicTransport: 'Limited buses. Car essential.',
    beaches: ['Playa de l\'Ampolla', 'El Portet (Blue Flag)', 'Cala Andrago', 'Cala Cap Blanc'],
    golfCourses: ['Club de Golf Ifach (15 min)', 'La Sella (20 min)', 'Jávea Golf (15 min)'],
    expat: 'Upmarket British, German, Dutch community. Quieter, sophisticated atmosphere.',
  },
  'altea': {
    hospitals: ['Hospital Marina Baixa (10 min)', 'Centro de Salud Altea', 'Private dental/medical clinics'],
    internationalSchools: ['Colegio Español María Inmaculada', 'Schools in Benidorm/Calpe areas'],
    supermarkets: ['Mercadona', 'Consum', 'Weekly market (Tuesdays)'],
    publicTransport: 'TRAM to Benidorm/Alicante. Good bus connections.',
    beaches: ['Playa de la Roda', 'Cap Negret', 'L\'Olla (pebbly, clear water)'],
    golfCourses: ['Don Cayo (10 min)', 'Villaitana (15 min)', 'La Sella (25 min)'],
    expat: 'Artistic, cultural community. Popular with Germans, Scandinavians, Dutch.',
  },
  'denia': {
    hospitals: ['Hospital de Dénia (Marina Salud)', 'Multiple medical centers', 'English-speaking doctors'],
    internationalSchools: ['The Lady Elizabeth School (20 min)', 'Xàbia International College (15 min)'],
    supermarkets: ['Mercadona', 'Consum', 'Lidl', 'Carrefour', 'Daily fresh market'],
    publicTransport: 'Ferries to Ibiza/Mallorca. Bus to Valencia/Alicante. TRAM planned.',
    beaches: ['Las Marinas (sandy, 5km)', 'Les Deveses', 'La Marineta Casiana', 'Les Rotes (rocky coves)'],
    golfCourses: ['La Sella (10 min)', 'Oliva Nova (20 min)', 'Jávea Golf (20 min)'],
    expat: 'Cosmopolitan mix of British, German, Dutch, French. Excellent English.',
  },
  'guardamar': {
    hospitals: ['Hospital de Torrevieja (15 min)', 'Centro de Salud Guardamar', 'Private clinics'],
    internationalSchools: ['El Limonar (20 min)', 'Schools in Torrevieja area'],
    supermarkets: ['Mercadona', 'Consum', 'Lidl', 'Weekly market (Wednesdays)'],
    publicTransport: 'Bus to Torrevieja, Alicante. Car recommended.',
    beaches: ['Playa Centro (Blue Flag)', 'La Roqueta', 'Les Ortigues (dune-backed, 10km total)'],
    golfCourses: ['La Marquesa (10 min)', 'La Finca (15 min)', 'Villamartín (20 min)'],
    expat: 'Growing British and Scandinavian community. More Spanish feel than Torrevieja.',
  },
  'villamartin': {
    hospitals: ['Hospital de Torrevieja (15 min)', 'Quirónsalud (20 min)', 'Local medical centers'],
    internationalSchools: ['El Limonar (20 min)', 'Kings College Murcia (35 min)'],
    supermarkets: ['Consum', 'Mercadona (Zenia)', 'La Zenia Boulevard (5 min)'],
    publicTransport: 'Very limited. Car essential.',
    beaches: ['La Zenia (10 min)', 'Campoamor (10 min)', 'Cabo Roig (12 min)'],
    golfCourses: ['Villamartín Golf (on doorstep)', 'Las Ramblas', 'Campoamor', 'Las Colinas'],
    expat: 'Strong British, Irish, Scandinavian community. Golf-focused lifestyle.',
  },
  'default': {
    hospitals: ['Regional hospital within 30 minutes', 'Private clinics available', 'English-speaking doctors'],
    internationalSchools: ['International schools in the region', 'British curriculum options'],
    supermarkets: ['Mercadona', 'Lidl', 'Consum', 'Local markets'],
    publicTransport: 'Bus connections available. Car recommended for flexibility.',
    beaches: ['Multiple Blue Flag beaches within 20 minutes'],
    golfCourses: ['Several championship courses nearby'],
    expat: 'Established international community. English commonly spoken.',
  },
};

// ============================================
// ULTIMATE PROPERTY CONTENT PROMPT
// ============================================
export function generatePropertyPrompt(property: {
  reference: string;
  type: string;
  town: string;
  zone?: string;
  province: string;
  bedrooms: number;
  bathrooms: number;
  builtArea: number;
  plotArea?: number;
  price: number;
  pool?: boolean;
  views?: string;
  description?: string;
  images: string[];
  developer?: string;
}): string {
  const persona = detectBuyerPersona({
    price: property.price,
    bedrooms: property.bedrooms,
    propertyType: property.type,
    town: property.town,
    hasPool: property.pool,
    hasGolfView: property.views?.toLowerCase().includes('golf'),
    hasSeaView: property.views?.toLowerCase().includes('sea'),
  });

  const townKey = Object.keys(TOWN_PRICE_DATA).find(t => property.town.toLowerCase().includes(t)) || 'default';
  const priceData = TOWN_PRICE_DATA[townKey] || TOWN_PRICE_DATA['default'];
  const paaQuestions = PEOPLE_ALSO_ASK[townKey] || PEOPLE_ALSO_ASK['default'];

  const pricePerSqm = property.builtArea > 0 ? Math.round(property.price / property.builtArea) : 0;
  const priceDiff = pricePerSqm > 0 ? Math.round(((pricePerSqm - priceData.avgPricePerSqm) / priceData.avgPricePerSqm) * 100) : 0;

  // IMPORTANT: Never frame price as negative! Above average = premium positioning
  const priceContext = priceDiff > 0
    ? `premium specification (${priceData.premiumComparison})` // Use regional comparison, not "above average"
    : priceDiff < 0
      ? `${Math.abs(priceDiff)}% below ${property.town} average - excellent value`
      : `competitively priced at ${property.town} average`;

  // Get amenities data for lifestyle section
  const amenitiesKey = Object.keys(TOWN_AMENITIES_DATA).find(t => property.town.toLowerCase().includes(t)) || 'default';
  const amenities = TOWN_AMENITIES_DATA[amenitiesKey] || TOWN_AMENITIES_DATA['default'];

  return `Generate PREMIUM SEO-optimized content for this Costa Blanca property listing.

=== PROPERTY DATA ===
Reference: ${property.reference}
Type: ${property.type}
Location: ${property.zone ? property.zone + ', ' : ''}${property.town}, ${property.province}
Bedrooms: ${property.bedrooms}
Bathrooms: ${property.bathrooms}
Built Area: ${property.builtArea}m²
Plot Area: ${property.plotArea || 'N/A'}m²
Price: €${property.price.toLocaleString()}
Price/m²: €${pricePerSqm.toLocaleString()} (${priceContext})
Pool: ${property.pool ? 'Yes' : 'No'}
Views: ${property.views || 'Not specified'}
Developer: ${property.developer || 'Not specified'}
Number of Images: ${property.images.length}

=== BUYER PERSONA DETECTED: ${persona.type.toUpperCase()} ===
Tone: ${persona.tone}
Keywords to naturally include: ${persona.keywords.join(', ')}

=== PRICE CONTEXT ===
- This property: €${pricePerSqm.toLocaleString()}/m²
- ${property.town} average: €${priceData.avgPricePerSqm.toLocaleString()}/m²
- Market trend: ${priceData.trend}
- Typical rental (7 nights): €${priceData.rental7Night}
- Regional comparison: ${priceData.premiumComparison}

=== LOCAL AMENITIES (for Life & Amenities section) ===
- Hospitals: ${amenities.hospitals.join(', ')}
- International Schools: ${amenities.internationalSchools.join(', ')}
- Supermarkets: ${amenities.supermarkets.join(', ')}
- Public Transport: ${amenities.publicTransport}
- Beaches: ${amenities.beaches.join(', ')}
- Golf Courses: ${amenities.golfCourses.join(', ')}
- Expat Community: ${amenities.expat}

=== SEO REQUIREMENTS ===
1. FAQs MUST start with DIRECT ANSWER (for featured snippets)
   Example: Q: "How much does this property cost?"
   A: "€${property.price.toLocaleString()}. This ${property.bedrooms}-bedroom ${property.type.toLowerCase()}..."

2. Include these PEOPLE ALSO ASK questions (pick 3-4 most relevant):
${paaQuestions.map(q => `   - "${q}"`).join('\n')}

3. Image alt tags should be SEARCH QUERIES people type:
   - "What does a €${Math.round(property.price/1000)}k ${property.type.toLowerCase()} look like in ${property.town}"
   - "${property.bedrooms} bedroom ${property.type.toLowerCase()} with pool ${property.town} Spain"
   - "Modern kitchen new build ${property.town} Costa Blanca"

4. Naturally include long-tail keywords:
   - "buy ${property.type.toLowerCase()} ${property.town} Spain"
   - "${property.bedrooms} bed property ${property.town}"
   - "new build homes ${property.town}"

=== GENERATE THIS JSON ===
{
  "metaTitle": "SEO title under 60 chars with price, beds, location",
  "metaDescription": "Under 155 chars, compelling with price and key feature",

  "heroIntro": "2-3 paragraphs (300-400 words) tailored to ${persona.type.toUpperCase()} buyer. Use keywords: ${persona.keywords.slice(0,3).join(', ')}. Include the price context: ${priceContext}.",

  "areaSection": "150-200 words about ${property.town} specifically - geography, climate, why people love it. Different from lifestyle section.",

  "lifestyleSection": "200-250 words about daily life in ${property.town}. What's it like to LIVE here? Expat community, beaches, restaurants, markets, healthcare. Tailor to ${persona.type} buyer.",

  "locationHighlights": ["6-8 specific nearby attractions with distances - beaches, golf, airport, hospitals, schools, restaurants"],

  "propertyFeatures": {
    "intro": "Brief intro to standout features",
    "features": ["10-12 features based on specs and property type"]
  },

  "investmentSection": "150-200 words about investment potential. Include: price trend (${priceData.trend}), rental potential (€${priceData.rental7Night}/week typical), comparison to other Costa Blanca areas.",

  "lifeAndAmenities": {
    "intro": "Brief intro (50 words) about daily life conveniences in ${property.town}",
    "healthcare": {
      "text": "100-120 words about healthcare access. Mention specific hospitals, English-speaking doctors, health centers. Reassure buyers about medical care quality.",
      "keyPoints": ["3-4 bullet points: nearest hospital, emergency services, etc."]
    },
    "education": {
      "text": "80-100 words about schools. International schools, British curriculum options. Important for families.",
      "keyPoints": ["2-3 bullet points: nearest international schools with distances"]
    },
    "shopping": {
      "text": "80-100 words about shopping. Supermarkets, weekly markets, shopping centers.",
      "keyPoints": ["3-4 bullet points: main supermarkets and markets"]
    },
    "transport": {
      "text": "80-100 words about getting around. Airport distances, bus/tram, driving.",
      "keyPoints": ["3-4 bullet points: Alicante airport distance, public transport, parking"]
    }
  },

  "whyBuySection": ["8-10 compelling reasons tailored to ${persona.type} buyer. Be specific to THIS property."],

  "priceComparison": {
    "thisProperty": ${pricePerSqm},
    "areaAverage": ${priceData.avgPricePerSqm},
    "verdict": "One sentence: is this good value, premium, or average for the area?"
  },

  "buyerPersona": {
    "type": "${persona.type}",
    "perfectFor": "One sentence describing ideal buyer"
  },

  "faqs": [
    {
      "question": "How much does this property cost?",
      "answer": "€${property.price.toLocaleString()}. [Continue with 2-3 more sentences about value, payment options]"
    },
    {
      "question": "[Pick from People Also Ask list above]",
      "answer": "[DIRECT ANSWER FIRST]. [Then elaborate 2-3 sentences]"
    },
    // Include 8-10 FAQs total, mixing property-specific and town questions
  ],

  "imageAlts": [
    {
      "index": 0,
      "alt": "Search-query style alt for main exterior image"
    },
    {
      "index": 1,
      "alt": "Search-query style alt for second image (likely interior)"
    },
    // Generate for first 8 images, using search-query format
  ],

  "internalLinks": {
    "area": "/areas/${property.town.toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
    "builder": "${property.developer ? '/builders/' + property.developer.toLowerCase().replace(/[^a-z0-9]+/g, '-') : null}",
    "similarSearch": "/properties?town=${encodeURIComponent(property.town)}&beds=${property.bedrooms}"
  },

  "conclusion": "Compelling closing paragraph with clear CTA. Mention WhatsApp contact."
}

=== CRITICAL RULES ===
- NEVER use feed descriptions - write 100% original content
- FAQs must have DIRECT ANSWER as first word/sentence
- Image alts must be what someone would TYPE into Google
- Tailor EVERYTHING to ${persona.type.toUpperCase()} buyer persona
- Include price comparisons and value statements
- Write naturally, avoid clichés like "dream home" or "paradise"

RESPOND WITH ONLY THE JSON OBJECT. No markdown, no explanation.`;
}

// ============================================
// ULTIMATE BUILDER CONTENT PROMPT
// ============================================
export function generateBuilderPrompt(builder: {
  name: string;
  slug: string;
  propertyCount: number;
  developments: string[];
  zones: string[];
  priceRange?: { min: number; max: number };
  isGolfSpecialist: boolean;
}): string {
  const specialty = builder.isGolfSpecialist ? 'GOLF SPECIALIST' : 'GENERAL DEVELOPER';

  return `Generate PREMIUM SEO content for a property developer/builder page.

=== BUILDER DATA ===
Name: ${builder.name}
Properties Available: ${builder.propertyCount}
Developments: ${builder.developments.join(', ')}
Areas: ${builder.zones.join(', ')}
Price Range: €${builder.priceRange?.min?.toLocaleString() || 'N/A'} - €${builder.priceRange?.max?.toLocaleString() || 'N/A'}
Specialty: ${specialty}

=== SEO TARGETS ===
Primary keywords: "${builder.name} properties", "${builder.name} developments Costa Blanca"
Long-tail: "is ${builder.name} a good builder", "${builder.name} reviews", "buy from ${builder.name}"

=== PEOPLE ALSO ASK TO TARGET ===
- "Is ${builder.name} a reliable builder?"
- "Where does ${builder.name} build?"
- "What warranty does ${builder.name} offer?"
- "How long has ${builder.name} been building?"

=== GENERATE THIS JSON ===
{
  "metaTitle": "${builder.name} | Costa Blanca Property Developer - under 60 chars",
  "metaDescription": "Compelling 155 char description mentioning property count and areas",

  "heroHeadline": "${builder.name} - [Memorable tagline based on specialty]",
  "heroIntro": "2 paragraphs (200 words) introducing ${builder.name}. Include property count (${builder.propertyCount}), areas they build in, and what makes them notable.",

  "aboutSection": {
    "title": "About ${builder.name}",
    "content": "2-3 paragraphs about their history, philosophy, expertise. Make it feel authoritative but not salesy."
  },

  "specializationSection": {
    "title": "Where ${builder.name} Builds",
    "regions": ["Costa Blanca South", "etc"],
    "towns": ["List specific towns from zones"],
    "propertyTypes": ["Villas", "Apartments", "Townhouses"],
    "content": "1-2 paragraphs about their geographic and product focus"
  },

  "qualitySection": {
    "title": "Build Quality & Standards",
    "features": [
      "10-year structural warranty (decenal)",
      "Double-wall construction with insulation",
      "High-quality aluminum windows with thermal break",
      "Pre-installation for air conditioning",
      "Quality ceramic tiles and sanitaryware",
      // Add 4-5 more typical Spanish new build features
    ],
    "content": "Paragraph about their commitment to quality"
  },

  "whyChooseSection": {
    "title": "Why Choose ${builder.name}",
    "reasons": [
      {"title": "Short benefit title", "description": "One sentence explanation"},
      // 6-8 compelling reasons
    ]
  },

  "faqs": [
    {
      "question": "Is ${builder.name} a reliable builder?",
      "answer": "Yes. [Direct answer first, then 2-3 sentences with evidence]"
    },
    {
      "question": "Where does ${builder.name} build properties?",
      "answer": "[Direct list of areas first]. ${builder.name} focuses on..."
    },
    {
      "question": "What warranty does ${builder.name} provide?",
      "answer": "10-year structural warranty (decenal). Plus..."
    },
    // 5-8 total FAQs
  ],

  "conclusion": "Compelling CTA paragraph encouraging contact",

  "stats": {
    "propertyCount": ${builder.propertyCount},
    "developmentCount": ${builder.developments.length},
    "regionsServed": ["list regions"]
  }
}

=== RULES ===
- We are an AGENCY showcasing their properties, not the developer themselves
- FAQs must start with DIRECT ANSWER
- Be authoritative but not salesy
- Include specific numbers and facts where possible

RESPOND WITH ONLY THE JSON OBJECT.`;
}

// ============================================
// ULTIMATE AREA CONTENT PROMPT
// ============================================
export function generateAreaPrompt(area: {
  name: string;
  slug: string;
  propertyCount: number;
  priceRange: { min: number; max: number };
  propertyTypes: string[];
  isGolfArea: boolean;
  isCoastal: boolean;
}): string {
  const areaType = area.isGolfArea ? 'GOLF DESTINATION' : area.isCoastal ? 'COASTAL TOWN' : 'INLAND TOWN';
  const paaQuestions = PEOPLE_ALSO_ASK[area.slug] || PEOPLE_ALSO_ASK['default'];

  // Get our curated data for this area
  const areaKey = Object.keys(TOWN_AMENITIES_DATA).find(t => area.name.toLowerCase().includes(t)) || 'default';
  const amenities = TOWN_AMENITIES_DATA[areaKey] || TOWN_AMENITIES_DATA['default'];
  const priceData = TOWN_PRICE_DATA[areaKey] || TOWN_PRICE_DATA['default'];

  return `Generate PREMIUM SEO content for an area guide page: ${area.name}

=== AREA DATA ===
Name: ${area.name}
Property Count: ${area.propertyCount}
Price Range: €${area.priceRange.min.toLocaleString()} - €${area.priceRange.max.toLocaleString()}
Property Types Available: ${area.propertyTypes.join(', ')}
Area Type: ${areaType}

=== PRICE DATA ===
Average Price per m²: €${priceData.avgPricePerSqm.toLocaleString()}/m²
Market Trend: ${priceData.trend}
Typical 7-Night Rental: €${priceData.rental7Night}
Regional Comparison: ${priceData.premiumComparison}

=== CURATED LOCAL AMENITIES (use this data!) ===
Hospitals: ${amenities.hospitals.join(', ')}
International Schools: ${amenities.internationalSchools.join(', ')}
Supermarkets: ${amenities.supermarkets.join(', ')}
Public Transport: ${amenities.publicTransport}
Beaches: ${amenities.beaches.join(', ')}
Golf Courses: ${amenities.golfCourses.join(', ')}
Expat Community: ${amenities.expat}

=== SEO TARGETS ===
Primary: "living in ${area.name}", "${area.name} property", "buy house ${area.name}"
Long-tail: "is ${area.name} a good place to live", "cost of living ${area.name}", "${area.name} expat community"
Life searches: "hospitals in ${area.name}", "international schools ${area.name}", "supermarkets ${area.name}"

=== PEOPLE ALSO ASK TO TARGET ===
${paaQuestions.map(q => `- "${q}"`).join('\n')}

=== GENERATE THIS JSON ===
{
  "metaTitle": "Living in ${area.name} 2026 | Complete Guide - under 60 chars",
  "metaDescription": "155 chars about living in ${area.name} with price range",

  "heroIntro": "2-3 paragraphs (300 words) overview of ${area.name}. What makes it special? Who lives there? Why choose it?",

  "climate": "150 words about weather, seasons, best time to visit/live",

  "lifestyle": "250 words about daily life - markets, restaurants, beaches, activities, expat community. Mention: ${amenities.expat}",

  "amenities": {
    "healthcare": {
      "text": "Paragraph about hospitals, clinics, English-speaking doctors. MUST mention: ${amenities.hospitals.slice(0, 2).join(', ')}",
      "keyPoints": ["List 3-4 key healthcare facilities from the data above"]
    },
    "shopping": {
      "text": "Paragraph about supermarkets, markets, malls. MUST mention: ${amenities.supermarkets.slice(0, 3).join(', ')}",
      "keyPoints": ["List 3-4 shopping options from the data above"]
    },
    "education": {
      "text": "Paragraph about schools for families. MUST mention: ${amenities.internationalSchools.join(', ')}",
      "keyPoints": ["List international schools from the data above"]
    },
    "sports": {
      "text": "Paragraph about golf, beaches, water sports. MUST mention beaches: ${amenities.beaches.slice(0, 2).join(', ')} and golf: ${amenities.golfCourses.slice(0, 2).join(', ')}",
      "keyPoints": ["List 3-4 sports/leisure options"]
    }
  },

  "transport": {
    "overview": "${amenities.publicTransport}",
    "airports": "Distance to Alicante and Valencia airports",
    "driving": "Connections to other towns, motorway access",
    "public": "Bus, tram, or train connections",
    "keyPoints": ["3-4 transport bullet points"]
  },

  "propertyMarket": {
    "overview": "Current market status and trends",
    "priceRange": "€${area.priceRange.min.toLocaleString()} - €${area.priceRange.max.toLocaleString()}",
    "popularTypes": "${area.propertyTypes.join(', ')}",
    "investment": "Rental potential, capital growth outlook"
  },

  "neighborhoods": ["List 4-6 popular areas/neighborhoods within ${area.name} with brief descriptions"],

  "prosAndCons": {
    "pros": ["5-6 genuine advantages of living here"],
    "cons": ["2-3 honest disadvantages or considerations"]
  },

  "faqs": [
    {
      "question": "Is ${area.name} a good place to live?",
      "answer": "Yes. [Direct answer then elaborate on why]"
    },
    // 6-8 FAQs from People Also Ask list
  ]
}

RESPOND WITH ONLY THE JSON OBJECT.`;
}

// ============================================
// ULTIMATE DEVELOPMENT/PROJECT CONTENT PROMPT
// ============================================
// This generates content matching the EnhancedContent interface
// used by src/app/developments/[slug]/page.tsx
export function generateDevelopmentPrompt(development: {
  name: string;
  slug: string;
  developer: string;
  developerSlug: string;
  town: string;
  province?: string;
  zone?: string;
  propertyCount: number;
  priceFrom: number;
  propertyTypes: string[];
  bedroomRange: { min: number; max: number };
  bathroomRange?: { min: number; max: number };
  builtSizeRange?: { min: number; max: number };
  plotSizeRange?: { min: number; max: number };
  deliveryDate?: string;
  hasPool?: boolean;
  images?: string[];
  representativeRef?: string;
}): string {
  // Get our curated data for this area
  const areaKey = Object.keys(TOWN_AMENITIES_DATA).find(t => development.town.toLowerCase().includes(t)) || 'default';
  const amenities = TOWN_AMENITIES_DATA[areaKey] || TOWN_AMENITIES_DATA['default'];
  const priceData = TOWN_PRICE_DATA[areaKey] || TOWN_PRICE_DATA['default'];
  const paaQuestions = PEOPLE_ALSO_ASK[areaKey] || PEOPLE_ALSO_ASK['default'];

  // Determine if this is a golf development
  const isGolfDevelopment = development.zone?.toLowerCase().includes('golf') ||
    development.zone?.toLowerCase().includes('finca') ||
    development.name.toLowerCase().includes('golf');

  return `Generate PREMIUM SEO content for a development project page.

IMPORTANT: This JSON must match our EnhancedContent interface exactly for the page template.

=== DEVELOPMENT DATA ===
Project Name: ${development.name}
Slug: ${development.slug}
Developer: ${development.developer} (slug: ${development.developerSlug})
Location: ${development.zone ? development.zone + ', ' : ''}${development.town}, ${development.province || 'Alicante'}
Units Available: ${development.propertyCount}
Price From: €${development.priceFrom.toLocaleString()}
Property Types: ${development.propertyTypes.join(', ') || 'Various'}
Bedrooms: ${development.bedroomRange.min}-${development.bedroomRange.max}
Bathrooms: ${development.bathroomRange?.min || 1}-${development.bathroomRange?.max || 3}
Built Size: ${development.builtSizeRange?.min || 'N/A'}-${development.builtSizeRange?.max || 'N/A'}m²
Plot Size: ${development.plotSizeRange?.min || 'N/A'}-${development.plotSizeRange?.max || 'N/A'}m²
Delivery: ${development.deliveryDate || 'On request'}
Pool: ${development.hasPool ? 'Yes' : 'Check availability'}
Is Golf Development: ${isGolfDevelopment ? 'YES' : 'No'}

=== LOCAL AMENITIES DATA ===
Hospitals: ${amenities.hospitals.join(', ')}
Schools: ${amenities.internationalSchools.join(', ')}
Supermarkets: ${amenities.supermarkets.join(', ')}
Transport: ${amenities.publicTransport}
Beaches: ${amenities.beaches.join(', ')}
Golf: ${amenities.golfCourses.join(', ')}
Expat: ${amenities.expat}

=== MARKET DATA ===
Avg Price/m²: €${priceData.avgPricePerSqm}/m²
Trend: ${priceData.trend}
Rental 7-night: €${priceData.rental7Night}
Value Position: ${priceData.premiumComparison}

=== SEO TARGETS ===
Primary: "${development.name} ${development.town}", "buy ${development.name}"
Long-tail: "${development.name} prices", "${development.developer} ${development.town}"

=== PEOPLE ALSO ASK ===
${paaQuestions.slice(0, 5).map(q => `- "${q}"`).join('\n')}

=== GENERATE THIS EXACT JSON STRUCTURE ===
{
  "slug": "${development.slug}",
  "projectName": "${development.name}",
  "metaTitle": "${development.name} | ${development.town} | From €${development.priceFrom.toLocaleString()} - under 60 chars",
  "metaDescription": "155 char compelling description about ${development.name} in ${development.town}",

  "content": {
    "heroIntro": "2-3 paragraphs (300 words) introducing ${development.name}. Mention ${development.developer}, ${development.town} location, key features, delivery ${development.deliveryDate || 'date'}. Write for the buyer persona this attracts.",

    "locationSection": {
      "intro": "150-200 words about ${development.zone || development.town}. Geography, lifestyle, why buyers choose this area. Include specific amenities: ${amenities.hospitals[0]}, ${amenities.beaches[0]}, ${amenities.golfCourses[0]}.",
      "highlights": [
        "Airport: 30 min to Alicante (ALC)",
        "Beach: [specific beach and distance]",
        "Golf: ${amenities.golfCourses[0]}",
        "Hospital: ${amenities.hospitals[0]}",
        "Shopping: [specific centers]",
        "Restaurants: [area description]"
      ]
    },

    "propertyFeatures": {
      "intro": "100-150 words about the quality and specifications of ${development.name}. Construction standards, materials, finishes.",
      "features": [
        "Private/communal swimming pool",
        "Air conditioning pre-installation",
        "Fitted kitchen with appliances",
        "Double glazing with thermal break",
        "Private parking space",
        "Storage room",
        "Landscaped gardens",
        "Quality ceramic flooring",
        "Modern bathroom fixtures",
        "Video entry system"
      ]
    },

    "investmentSection": "150-200 words about investment potential. Market trend: ${priceData.trend}. Rental potential: €${priceData.rental7Night}/week. ${priceData.premiumComparison}. Why ${development.town} is growing.",

    "whyBuySection": [
      "Strategic location in ${development.zone || development.town}",
      "Trusted developer: ${development.developer}",
      "[Feature specific to this development]",
      "[Feature specific to this development]",
      "Delivery: ${development.deliveryDate || 'flexible timeline'}",
      "${amenities.expat}",
      "Easy access to ${amenities.beaches[0]}",
      "${amenities.golfCourses[0]} nearby"
    ],

    "faqs": [
      {
        "question": "What is the price of properties in ${development.name}?",
        "answer": "From €${development.priceFrom.toLocaleString()}. ${development.name} offers ${development.propertyTypes.join(', ')} with ${development.bedroomRange.min}-${development.bedroomRange.max} bedrooms. Contact us for current availability."
      },
      {
        "question": "When will ${development.name} be completed?",
        "answer": "${development.deliveryDate || 'Completion dates vary by unit'}. ${development.developer} provides a 10-year structural warranty. Contact us for specific delivery schedules."
      },
      {
        "question": "Who is the developer of ${development.name}?",
        "answer": "${development.developer}. They have an established track record building quality homes in ${development.town} and surrounding areas."
      },
      {
        "question": "Is ${development.town} a good place to buy property?",
        "answer": "Yes. ${amenities.expat} Property values show ${priceData.trend}. Excellent amenities include ${amenities.hospitals[0]} and ${amenities.beaches[0]}."
      },
      {
        "question": "How far is ${development.name} from the beach?",
        "answer": "[Direct answer with distance]. ${amenities.beaches.slice(0, 2).join(' and ')} are easily accessible."
      },
      {
        "question": "What amenities are near ${development.name}?",
        "answer": "Nearby: ${amenities.supermarkets.slice(0, 2).join(', ')} (shopping), ${amenities.hospitals[0]} (healthcare), ${amenities.golfCourses[0]} (golf)."
      }
    ],

    "conclusion": "150 words compelling conclusion. Summarize key benefits, mention WhatsApp contact for inquiries. Encourage action."
  },

  "property": {
    "ref": "${development.representativeRef || development.slug}",
    "price": ${development.priceFrom},
    "bedrooms": ${development.bedroomRange.min},
    "bathrooms": ${development.bathroomRange?.min || 2},
    "builtSize": ${development.builtSizeRange?.min || 'null'},
    "plotSize": ${development.plotSizeRange?.min || 'null'},
    "town": "${development.town}",
    "province": "${development.province || 'Alicante'}",
    "propertyType": "${development.propertyTypes[0] || 'Apartment'}",
    "developer": "${development.developer}",
    "developerSlug": "${development.developerSlug}",
    "images": []
  },

  "distances": {
    "airport": "30 min to Alicante (ALC)",
    "beach": "[specific distance to ${amenities.beaches[0]}]",
    "hospital": "[distance to ${amenities.hospitals[0]}]",
    "golf": "${isGolfDevelopment ? 'Frontline/within resort' : '[distance to ' + amenities.golfCourses[0] + ']'}",
    "shopping": "[distance to shopping]",
    "restaurants": "[distance to restaurants]"
  },

  ${isGolfDevelopment ? `"golfCourse": {
    "id": "${development.zone?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'golf-course'}",
    "name": "${amenities.golfCourses[0].split('(')[0].trim()}",
    "slug": "${amenities.golfCourses[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').split('-')[0]}",
    "distance": "Within resort / Frontline",
    "description": "Championship golf course within walking distance"
  },` : ''}

  "imageAlts": [
    {"url": "image-0", "alt": "${development.name} exterior view ${development.town} Costa Blanca"},
    {"url": "image-1", "alt": "Modern living room ${development.propertyTypes[0] || 'property'} ${development.town}"},
    {"url": "image-2", "alt": "Kitchen new build ${development.name} Spain"},
    {"url": "image-3", "alt": "Swimming pool ${development.name} ${development.town}"},
    {"url": "image-4", "alt": "Bedroom ${development.bedroomRange.min} bed ${development.propertyTypes[0] || 'apartment'} ${development.town}"},
    {"url": "image-5", "alt": "Terrace views ${development.name} Costa Blanca"}
  ]
}

=== CRITICAL RULES ===
- Match the EnhancedContent interface EXACTLY
- FAQs must start with DIRECT ANSWER
- Use REAL data from amenities/price sections
- Replace all [placeholders] with specific info
- heroIntro should be engaging, not generic
- locationSection.highlights must have 6+ items with real distances

RESPOND WITH ONLY THE JSON OBJECT.`;
}
