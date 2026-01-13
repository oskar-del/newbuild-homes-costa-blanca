/**
 * Property Content Generator - ENHANCED VERSION
 * =============================================
 * Generates ALL unique AI content for property pages.
 * 
 * CRITICAL: Every piece of text on a property page must be UNIQUE per property.
 * We NEVER use feed descriptions (they appear on Idealista, Kyero = duplicate content = SEO death)
 * 
 * SEO FOCUS (Based on 2024-2025 Research):
 * - Titles optimized for search intent
 * - Area section: 100-150 words (town facts, geography, climate)
 * - Lifestyle section: ~300 words (healthcare, schools, beaches, expat community, activities)
 * - Investment section: ~250 words (Spain context, Costa Blanca trends, rental demand, growth)
 * - FAQ answers begin with direct statements (voice search optimization)
 * - Long-tail keywords naturally integrated
 * - Buyer persona variations (villa vs apartment, North vs South)
 * 
 * LONG-TAIL KEYWORDS TO INTEGRATE:
 * - "buy property in [town] Spain"
 * - "expat life [town]"
 * - "retire to [town] Costa Blanca"
 * - "healthcare in [town] Spain"
 * - "international schools Costa Blanca"
 * - "rental yield [town]"
 * - "property investment Costa Blanca"
 * - "living in [town] as expat"
 */

import { UnifiedProperty } from './unified-property';

// ====================
// TYPE DEFINITIONS
// ====================

export interface PropertyContent {
  seoTitle: string;
  metaDescription: string;
  mainDescription: string;
  areaSection: string;        // NEW: 100-150 words about the town
  lifestyleSection: string;   // ENHANCED: ~300 words
  investmentSection: string;  // ENHANCED: ~250 words
  sellingPoints: string[];
  faqs: FAQ[];
  priceChartData: PriceDataPoint[];
  rentalYieldData: YieldDataPoint[];
  rentalIncomeEstimate: RentalEstimate;
  imageAltTags: string[];
  areaHighlights: string[];
  priceContext: PriceContext;
  lastUpdated: string;
  buyerPersona: BuyerPersona;  // NEW: detected buyer type
}

export interface BuyerPersona {
  type: 'family' | 'retirement' | 'investment' | 'holiday' | 'luxury' | 'golf';
  description: string;
}

export interface PriceContext {
  pricePerSqm: number;
  areaAverageSqm: number;
  percentageDiff: number;
  comparisonText: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PriceDataPoint {
  year: string;
  price: number;
}

export interface YieldDataPoint {
  area: string;
  yield: number;
  color: string;
}

export interface RentalEstimate {
  annual: number;
  monthly: number;
  weekly: number;
  occupancyRate: number;
}

// ====================
// COMPREHENSIVE AREA DATA
// ====================

interface AreaInfo {
  // Basic info
  description: string;
  highlights: string[];
  priceRange: { min: number; max: number };
  rentalYield: { min: number; max: number };
  lifestyle: string;
  region: 'north' | 'south';
  
  // Geography & Climate
  geography: string;
  climate: string;
  sunshineHours: number;
  
  // Beaches & Nature
  nearestBeach: string;
  beachDetails: string;
  natureParks: string[];
  
  // Golf
  nearestGolf: string;
  golfCourses: string[];
  
  // Healthcare
  nearestHospital: string;
  healthcareDetails: string;
  privateClinic: string;
  pharmacies: string;
  
  // Education
  internationalSchools: string[];
  spanishSchools: string;
  educationNotes: string;
  
  // Transport
  nearestAirport: string;
  airportDistance: string;
  publicTransport: string;
  drivingNotes: string;
  
  // Expat Community
  expat: string;
  mainNationalities: string[];
  englishSpoken: 'excellent' | 'good' | 'moderate' | 'limited';
  expatClubs: string;
  
  // Activities & Amenities
  activities: string[];
  restaurants: string;
  shopping: string;
  weeklyMarkets: string;
  
  // Cost of Living
  costOfLiving: 'affordable' | 'moderate' | 'expensive';
  averageRent2Bed: number; // Monthly EUR
}

const AREA_DATA: Record<string, AreaInfo> = {
  'javea': {
    description: 'Jávea is one of Costa Blanca North\'s most prestigious coastal towns, known for its authentic Spanish character, stunning beaches, and thriving international community.',
    highlights: ['Arenal Beach (Blue Flag)', 'Historic old town', 'Montgo Natural Park', 'International dining scene', 'Yacht marina'],
    priceRange: { min: 3200, max: 4600 },
    rentalYield: { min: 4.5, max: 6.5 },
    lifestyle: 'upscale, international, year-round living',
    region: 'north',
    
    geography: 'Nestled between the Montgo mountain and the Mediterranean Sea, Jávea enjoys a unique microclimate protected from harsh winds.',
    climate: 'The WHO recognized Jávea as having one of the world\'s healthiest climates, with mild winters (15-18°C) and warm summers (28-32°C).',
    sunshineHours: 320,
    
    nearestBeach: 'Arenal Beach (walking distance in many areas)',
    beachDetails: 'Three distinct beach areas: the sandy Arenal, the pebbly Grava, and rocky coves in the Portitxol area. Blue Flag certified with excellent facilities.',
    natureParks: ['Montgo Natural Park', 'Cap de Sant Antoni', 'Granadella coves'],
    
    nearestGolf: 'Jávea Golf Club (9 holes), La Sella (18 holes, 15 min)',
    golfCourses: ['Jávea Golf Club', 'La Sella Golf Resort', 'Oliva Nova (25 min)'],
    
    nearestHospital: 'Hospital de Dénia (15 min)',
    healthcareDetails: 'Excellent public and private healthcare. Hospital de Dénia is a modern facility with English-speaking staff. Multiple private clinics in town.',
    privateClinic: 'Clínica Benidorm, IMED hospitals nearby',
    pharmacies: 'Multiple pharmacies throughout Jávea with 24-hour rotation',
    
    internationalSchools: ['Xàbia International College (British curriculum)', 'Laude Lady Elizabeth School (20 min)'],
    spanishSchools: 'Several public and private Spanish schools',
    educationNotes: 'Strong educational options from nursery to university entrance. International schools follow British curriculum with excellent exam results.',
    
    nearestAirport: 'Alicante (ALC) 85 km / Valencia (VLC) 100 km',
    airportDistance: '1 hour to Alicante, 1.5 hours to Valencia',
    publicTransport: 'Regular bus connections to Dénia, Alicante. Dénia has ferry connections to Ibiza and Mallorca.',
    drivingNotes: 'A7/AP7 motorway provides excellent connectivity. Free parking available in most residential areas.',
    
    expat: 'Large British and German community, excellent English widely spoken',
    mainNationalities: ['British', 'German', 'Dutch', 'Scandinavian', 'French'],
    englishSpoken: 'excellent',
    expatClubs: 'U3A Jávea, various sports and social clubs, active expat community with regular events',
    
    activities: ['Sailing and water sports', 'Hiking in Montgo', 'Scuba diving', 'Tennis and padel', 'Cycling', 'Yoga and wellness'],
    restaurants: 'Sophisticated dining scene with Spanish, international, and fine dining options. Arenal promenade and old town have the best concentration.',
    shopping: 'Quality boutiques in old town, Arenal shopping area. Major shopping in Ondara (20 min).',
    weeklyMarkets: 'Thursday morning market in Jávea, large Sunday market at Arenal',
    
    costOfLiving: 'expensive',
    averageRent2Bed: 1200
  },
  
  'moraira': {
    description: 'Moraira is an exclusive coastal village offering luxury living, crystal-clear waters, and a relaxed Mediterranean atmosphere favored by discerning buyers.',
    highlights: ['El Portet Beach', 'Luxury marina', 'Fine dining restaurants', 'Low-density development', 'Prestigious villas'],
    priceRange: { min: 3500, max: 5500 },
    rentalYield: { min: 4.0, max: 5.5 },
    lifestyle: 'exclusive, tranquil, sophisticated',
    region: 'north',
    
    geography: 'A picturesque bay surrounded by hills, Moraira maintains a village atmosphere despite its international reputation.',
    climate: 'Protected microclimate with very mild winters and pleasant summers. Sea breezes keep temperatures comfortable.',
    sunshineHours: 315,
    
    nearestBeach: 'Moraira Beach & El Portet (town center)',
    beachDetails: 'El Portet is a stunning horseshoe bay with calm, crystal-clear waters ideal for swimming and snorkeling. Main beach has good facilities.',
    natureParks: ['Cumbre del Sol', 'Cap d\'Or', 'Coastal walking paths'],
    
    nearestGolf: 'Ifach Golf Club (10 min)',
    golfCourses: ['Ifach Golf Club', 'La Sella Golf (20 min)', 'Javea Golf (15 min)'],
    
    nearestHospital: 'Hospital de Dénia (20 min)',
    healthcareDetails: 'High-quality healthcare available. Many residents use private healthcare in Benidorm or Dénia.',
    privateClinic: 'Local doctors with English, private clinics in Calpe and Benidorm',
    pharmacies: 'Several pharmacies in Moraira center',
    
    internationalSchools: ['Laude Lady Elizabeth School (Benitachell)', 'International School of Moraira'],
    spanishSchools: 'Local Spanish schools in Teulada-Moraira',
    educationNotes: 'Good international school options nearby. Many families choose Lady Elizabeth for its excellent reputation.',
    
    nearestAirport: 'Alicante (ALC) 80 km',
    airportDistance: '1 hour to Alicante',
    publicTransport: 'Limited public transport. Most residents have cars.',
    drivingNotes: 'Winding coastal roads are scenic but narrow. Good connections via N332 and AP7.',
    
    expat: 'Affluent international community, many permanent residents',
    mainNationalities: ['British', 'German', 'Dutch', 'Belgian', 'Scandinavian'],
    englishSpoken: 'excellent',
    expatClubs: 'Moraira Bowls Club, Tennis Club, various social groups',
    
    activities: ['Sailing from the marina', 'Snorkeling and diving', 'Walking coastal paths', 'Tennis', 'Gourmet dining'],
    restaurants: 'Excellent restaurant scene with quality seafood, fine dining, and international cuisine.',
    shopping: 'Boutique shops in town center. Larger shopping in Calpe or Ondara.',
    weeklyMarkets: 'Friday morning market',
    
    costOfLiving: 'expensive',
    averageRent2Bed: 1400
  },
  
  'calpe': {
    description: 'Calpe combines dramatic natural beauty with modern amenities, dominated by the iconic Peñón de Ifach rock and blessed with excellent beaches.',
    highlights: ['Peñón de Ifach Natural Park', 'La Fossa Beach', 'Arenal-Bol Beach', 'Fish market & restaurants', 'Modern marina'],
    priceRange: { min: 2500, max: 3800 },
    rentalYield: { min: 5.0, max: 7.0 },
    lifestyle: 'active, beachfront, family-friendly',
    region: 'north',
    
    geography: 'Dominated by the 332m Peñón de Ifach rock, Calpe has beaches on both sides creating a unique coastal setting.',
    climate: 'Mediterranean climate with hot summers and mild winters. The rock creates interesting microclimates.',
    sunshineHours: 320,
    
    nearestBeach: 'La Fossa & Arenal-Bol (town center)',
    beachDetails: 'Two main beaches: La Fossa (north, quieter, great views of Peñón) and Arenal-Bol (south, more facilities, livelier).',
    natureParks: ['Peñón de Ifach Natural Park', 'Las Salinas salt flats'],
    
    nearestGolf: 'Ifach Golf Club (5 min)',
    golfCourses: ['Ifach Golf Club', 'Don Cayo Golf (Altea, 15 min)'],
    
    nearestHospital: 'Hospital de Dénia (25 min) or IMED Levante Benidorm (20 min)',
    healthcareDetails: 'Good healthcare facilities. Many English-speaking doctors in private practice.',
    privateClinic: 'Several private clinics, IMED hospitals in Benidorm',
    pharmacies: 'Multiple pharmacies throughout town',
    
    internationalSchools: ['Laude Lady Elizabeth (30 min)', 'Schools in Benidorm (20 min)'],
    spanishSchools: 'Good selection of public and concertado schools',
    educationNotes: 'Local Spanish schools are well-regarded. International options require some commuting.',
    
    nearestAirport: 'Alicante (ALC) 65 km',
    airportDistance: '50 minutes to Alicante',
    publicTransport: 'TRAM connects to Benidorm and Alicante. Regular bus services.',
    drivingNotes: 'Good road connections via N332 and AP7. Traffic can be heavy in summer.',
    
    expat: 'Mixed Spanish and international, strong rental market',
    mainNationalities: ['Spanish', 'British', 'German', 'Russian', 'Scandinavian'],
    englishSpoken: 'good',
    expatClubs: 'Active expat community, U3A, various sports clubs',
    
    activities: ['Climbing Peñón de Ifach', 'Water sports', 'Scuba diving', 'Fishing trips', 'Cycling'],
    restaurants: 'Famous fish restaurants along the port. Mix of Spanish and international dining.',
    shopping: 'Good local shopping. Larger centers in Benidorm and Ondara.',
    weeklyMarkets: 'Saturday morning market',
    
    costOfLiving: 'moderate',
    averageRent2Bed: 900
  },
  
  'benidorm': {
    description: 'Benidorm offers vibrant city living with spectacular beaches, world-class entertainment, and exceptional rental investment potential.',
    highlights: ['Levante Beach', 'Poniente Beach', 'Theme parks nearby', 'Year-round entertainment', 'Excellent transport links'],
    priceRange: { min: 2500, max: 4500 },
    rentalYield: { min: 6.0, max: 8.5 },
    lifestyle: 'dynamic, urban, entertainment-focused',
    region: 'north',
    
    geography: 'Built on a rocky promontory between two sweeping bays, Benidorm has a distinctive skyline and perfect beach orientation.',
    climate: 'Excellent year-round climate. High-rise buildings are positioned to maximize sea breezes and sunshine.',
    sunshineHours: 325,
    
    nearestBeach: 'Levante & Poniente (city center)',
    beachDetails: 'Levante Beach (east) is the famous golden sand beach. Poniente (west) is quieter and equally beautiful. Both have Blue Flag status.',
    natureParks: ['Serra Gelada Natural Park', 'Island of Benidorm'],
    
    nearestGolf: 'Villaitana Golf (10 min), multiple courses nearby',
    golfCourses: ['Villaitana Golf Resort', 'Meliá Villaitana', 'Don Cayo', 'Alenda (25 min)'],
    
    nearestHospital: 'IMED Levante (city) and Hospital de la Marina Baixa (Villajoyosa)',
    healthcareDetails: 'Excellent healthcare infrastructure. IMED Levante is a major private hospital with English-speaking staff.',
    privateClinic: 'Multiple private clinics, excellent specialists available',
    pharmacies: 'Numerous pharmacies including 24-hour services',
    
    internationalSchools: ['British School of Benidorm', 'The Lady Elizabeth School (Cumbres del Sol)'],
    spanishSchools: 'Comprehensive public and private Spanish school system',
    educationNotes: 'British School of Benidorm is well-established. Good variety of educational options.',
    
    nearestAirport: 'Alicante (ALC) 50 km',
    airportDistance: '35-40 minutes to Alicante',
    publicTransport: 'TRAM to Alicante, extensive bus network, taxi services 24/7',
    drivingNotes: 'Excellent road connections. Parking can be challenging in summer but garages available.',
    
    expat: 'Large British community, tourism-driven economy',
    mainNationalities: ['British', 'Spanish', 'Dutch', 'Belgian', 'Nordic'],
    englishSpoken: 'excellent',
    expatClubs: 'Numerous clubs and societies, very active social scene',
    
    activities: ['Theme parks (Terra Mítica, Aqualandia)', 'Water sports', 'Nightlife', 'Golf', 'Hiking Serra Gelada'],
    restaurants: 'Incredible variety from British pubs to fine dining. Tapas in old town.',
    shopping: 'Large shopping centers, brand stores, traditional market',
    weeklyMarkets: 'Sunday morning market',
    
    costOfLiving: 'moderate',
    averageRent2Bed: 850
  },
  
  'altea': {
    description: 'Altea is the artistic heart of Costa Blanca, with its iconic blue-domed church, whitewashed old town, and sophisticated cultural scene.',
    highlights: ['Iconic blue-domed church', 'Charming old town', 'Art galleries', 'Cultural events', 'Beautiful marina'],
    priceRange: { min: 2800, max: 4200 },
    rentalYield: { min: 4.5, max: 6.0 },
    lifestyle: 'artistic, cultural, sophisticated',
    region: 'north',
    
    geography: 'Built on a hill overlooking the Mediterranean, Altea offers stunning views and a picturesque old town.',
    climate: 'Mediterranean climate protected by the Sierra de Bernia mountains.',
    sunshineHours: 320,
    
    nearestBeach: 'Altea main beach, La Roda, Cap Negret',
    beachDetails: 'Pebble beaches with crystal-clear water. Not ideal for families with small children but excellent for snorkeling.',
    natureParks: ['Sierra de Bernia', 'Serra Gelada (nearby)'],
    
    nearestGolf: 'Don Cayo Golf (10 min)',
    golfCourses: ['Don Cayo Golf', 'Villaitana (15 min)', 'Alenda (30 min)'],
    
    nearestHospital: 'Hospital de Villajoyosa (10 min) or IMED Benidorm (15 min)',
    healthcareDetails: 'Good healthcare access. Private clinics in Altea with English-speaking doctors.',
    privateClinic: 'Centro Médico Altea, IMED hospitals nearby',
    pharmacies: 'Several pharmacies in Altea town',
    
    internationalSchools: ['Sierra Bernia British School', 'Schools in Benidorm (15 min)'],
    spanishSchools: 'Good local Spanish schools',
    educationNotes: 'Sierra Bernia is a respected small British school. Benidorm offers more options.',
    
    nearestAirport: 'Alicante (ALC) 55 km',
    airportDistance: '45 minutes to Alicante',
    publicTransport: 'TRAM connection to Benidorm and Alicante. Bus services available.',
    drivingNotes: 'N332 provides good access. Old town has limited parking.',
    
    expat: 'Artistic and cultural community, mix of nationalities',
    mainNationalities: ['Spanish', 'Dutch', 'German', 'British', 'Scandinavian'],
    englishSpoken: 'good',
    expatClubs: 'Art groups, cultural associations, music clubs',
    
    activities: ['Art galleries and exhibitions', 'Cultural events', 'Hiking Sierra de Bernia', 'Water sports', 'Dining'],
    restaurants: 'Excellent restaurant scene focused on quality over quantity. Creative cuisine.',
    shopping: 'Boutiques and galleries in old town. Benidorm nearby for major shopping.',
    weeklyMarkets: 'Tuesday market in Altea la Vella',
    
    costOfLiving: 'moderate',
    averageRent2Bed: 950
  },
  
  'denia': {
    description: 'Dénia combines historical charm with modern amenities, offering a perfect blend of Spanish authenticity and international convenience.',
    highlights: ['Historic castle', 'Gastronomy capital', 'Ferry port to Balearics', 'Les Marines beach', 'Mountain backdrop'],
    priceRange: { min: 2600, max: 3800 },
    rentalYield: { min: 5.0, max: 6.5 },
    lifestyle: 'authentic Spanish, gastronomic, cultural',
    region: 'north',
    
    geography: 'Stretched between the Montgo mountain and 20km of coastline, Dénia offers diverse landscapes.',
    climate: 'Excellent Mediterranean climate with Montgo providing shelter from harsh weather.',
    sunshineHours: 320,
    
    nearestBeach: 'Les Marines (sandy), Les Rotes (rocky coves)',
    beachDetails: 'Les Marines offers kilometers of sandy beach. Les Rotes has beautiful rocky coves perfect for snorkeling.',
    natureParks: ['Montgo Natural Park', 'Cabo de San Antonio'],
    
    nearestGolf: 'La Sella Golf (15 min), Oliva Nova (20 min)',
    golfCourses: ['La Sella Golf Resort', 'Oliva Nova', 'Javea Golf'],
    
    nearestHospital: 'Hospital de Dénia (city)',
    healthcareDetails: 'Modern hospital serving the Marina Alta region. Excellent healthcare infrastructure.',
    privateClinic: 'Several private clinics with English-speaking staff',
    pharmacies: 'Numerous pharmacies including 24-hour rotation',
    
    internationalSchools: ['The Lady Elizabeth School (nearby)', 'Xàbia International College'],
    spanishSchools: 'Excellent selection of Spanish schools',
    educationNotes: 'Strong educational infrastructure. Good variety of options.',
    
    nearestAirport: 'Alicante (ALC) 95 km / Valencia (VLC) 100 km',
    airportDistance: '1 hour to both airports',
    publicTransport: 'Good bus connections. Ferry service to Ibiza, Mallorca, and Formentera.',
    drivingNotes: 'Excellent AP7 connection. Historic center has limited parking.',
    
    expat: 'Mixed Spanish and international, strong British and German presence',
    mainNationalities: ['Spanish', 'British', 'German', 'French', 'Dutch'],
    englishSpoken: 'good',
    expatClubs: 'Active social clubs, U3A, sports associations',
    
    activities: ['Hiking Montgo', 'Water sports', 'Gastronomy experiences', 'Sailing', 'Cultural events'],
    restaurants: 'UNESCO Creative City of Gastronomy. Outstanding restaurants including Michelin-starred.',
    shopping: 'Good local shopping. Historic center has charming shops.',
    weeklyMarkets: 'Monday market, large Friday market at port',
    
    costOfLiving: 'moderate',
    averageRent2Bed: 900
  },
  
  'torrevieja': {
    description: 'Torrevieja delivers excellent value with beautiful salt lake scenery, long sandy beaches, and Spain\'s largest expat community.',
    highlights: ['Pink Salt Lakes', 'La Mata Beach', 'Habaneras Shopping', 'International community', 'Affordable living'],
    priceRange: { min: 1800, max: 2800 },
    rentalYield: { min: 5.5, max: 7.5 },
    lifestyle: 'affordable, social, community-focused',
    region: 'south',
    
    geography: 'Situated between two salt lagoons (one famously pink) and the Mediterranean, creating unique landscapes.',
    climate: 'Excellent climate with low rainfall and mild winters. Salt lakes create healthy microclimate.',
    sunshineHours: 320,
    
    nearestBeach: 'La Mata & Los Locos (town)',
    beachDetails: 'Several Blue Flag beaches including La Mata (6km of golden sand), Cura, Los Locos. Excellent facilities.',
    natureParks: ['Lagunas de La Mata y Torrevieja Natural Park', 'Salt lake walking trails'],
    
    nearestGolf: 'Multiple courses within 15-20 min',
    golfCourses: ['Villamartin', 'Las Ramblas', 'Campoamor', 'La Finca', 'La Marquesa'],
    
    nearestHospital: 'Hospital Universitario de Torrevieja (city)',
    healthcareDetails: 'Modern university hospital with comprehensive services. Strong healthcare infrastructure.',
    privateClinic: 'Multiple private clinics, Quirón Salud network',
    pharmacies: 'Numerous pharmacies throughout the city',
    
    internationalSchools: ['El Limonar International School', 'Colegios internacionales in Orihuela Costa'],
    spanishSchools: 'Comprehensive public and private school system',
    educationNotes: 'Good options for education. El Limonar is a respected British curriculum school.',
    
    nearestAirport: 'Alicante (ALC) 45 km / Murcia (RMU) 35 km',
    airportDistance: '30-40 minutes to either airport',
    publicTransport: 'Good bus connections. Easy taxi access.',
    drivingNotes: 'N332 and AP7 provide excellent connectivity. Easy parking outside center.',
    
    expat: 'Largest expat population in Spain, English everywhere',
    mainNationalities: ['British', 'Scandinavian', 'German', 'Dutch', 'Belgian'],
    englishSpoken: 'excellent',
    expatClubs: 'Hundreds of clubs and groups covering every interest imaginable',
    
    activities: ['Beach life', 'Salt lake walks', 'Water sports', 'Golf', 'Cycling', 'Social clubs'],
    restaurants: 'Huge variety from English breakfasts to Spanish seafood. Very affordable.',
    shopping: 'Habaneras and La Zenia Boulevard nearby. Good supermarket options.',
    weeklyMarkets: 'Friday market (huge), daily fish market',
    
    costOfLiving: 'affordable',
    averageRent2Bed: 600
  },
  
  'orihuela costa': {
    description: 'Orihuela Costa is the heart of Costa Blanca South\'s golf coast, offering modern developments, pristine beaches, and excellent amenities.',
    highlights: ['La Zenia Boulevard', 'Campoamor Beach', 'Multiple golf courses', 'Modern urbanizations', 'Water parks'],
    priceRange: { min: 2200, max: 3200 },
    rentalYield: { min: 5.5, max: 7.5 },
    lifestyle: 'modern, golf-focused, resort-style',
    region: 'south',
    
    geography: 'A series of connected urbanizations along the coast, each with distinct character but shared amenities.',
    climate: 'Excellent year-round climate. Slightly cooler breezes than inland areas.',
    sunshineHours: 320,
    
    nearestBeach: 'Campoamor, La Zenia, Playa Flamenca',
    beachDetails: 'Multiple Blue Flag beaches with excellent facilities. Cala Bosque is beautiful natural cove.',
    natureParks: ['Dehesa de Campoamor', 'Rio Nacimiento trails'],
    
    nearestGolf: 'Villamartín, Las Ramblas, Campoamor (walking distance)',
    golfCourses: ['Villamartin Golf', 'Las Ramblas', 'Campoamor Golf', 'Las Colinas', 'Vistabella'],
    
    nearestHospital: 'Hospital de Torrevieja (15 min) or Quirónsalud Torrevieja',
    healthcareDetails: 'Excellent access to healthcare. Many English-speaking doctors in local medical centers.',
    privateClinic: 'Multiple private clinics in the area',
    pharmacies: 'Pharmacies in each urbanization',
    
    internationalSchools: ['El Limonar International School (15 min)', 'Various colegios in the area'],
    spanishSchools: 'Public schools serving the urbanizations',
    educationNotes: 'Growing education infrastructure. Some commuting may be needed for secondary.',
    
    nearestAirport: 'Alicante (ALC) 50 km / Murcia (RMU) 30 km',
    airportDistance: '35 minutes to Alicante, 25 minutes to Murcia',
    publicTransport: 'Limited public transport. Car essential.',
    drivingNotes: 'N332 and AP7 provide excellent access. Good road network within urbanizations.',
    
    expat: 'Strong British, Scandinavian, and Dutch communities',
    mainNationalities: ['British', 'Scandinavian', 'Dutch', 'Belgian', 'German'],
    englishSpoken: 'excellent',
    expatClubs: 'Golf clubs, social groups, sports associations',
    
    activities: ['Golf', 'Beach activities', 'Tennis and padel', 'Cycling', 'Shopping'],
    restaurants: 'Wide variety in each urbanization. La Zenia Boulevard has many options.',
    shopping: 'La Zenia Boulevard is the region\'s retail hub. Good local supermarkets.',
    weeklyMarkets: 'Various market days in different urbanizations',
    
    costOfLiving: 'moderate',
    averageRent2Bed: 750
  },
  
  'guardamar del segura': {
    description: 'Guardamar offers pristine Blue Flag beaches, unique pine forests, and an authentic Spanish atmosphere with excellent value.',
    highlights: ['11km of beaches', 'Protected dune system', 'Pine forest promenades', 'Spanish character', 'River Segura'],
    priceRange: { min: 1900, max: 2800 },
    rentalYield: { min: 5.0, max: 7.0 },
    lifestyle: 'natural, authentic, beach-focused',
    region: 'south',
    
    geography: 'Unique setting with dune forests protecting the town, River Segura estuary, and pristine beaches.',
    climate: 'The pine forests create exceptional air quality. Mediterranean climate with sea breezes.',
    sunshineHours: 315,
    
    nearestBeach: 'Multiple Blue Flag beaches (town)',
    beachDetails: '11 kilometers of stunning sandy beaches including Centro, La Roqueta, and Les Ortigues. Pine-backed and pristine.',
    natureParks: ['Dunas de Guardamar', 'Lagunas de La Mata (nearby)', 'River Segura wetlands'],
    
    nearestGolf: 'La Finca, La Marquesa (15-20 min)',
    golfCourses: ['La Finca Golf', 'La Marquesa', 'Vistabella', 'Lo Romero'],
    
    nearestHospital: 'Hospital de Torrevieja (15 min)',
    healthcareDetails: 'Good healthcare access via Torrevieja. Local health centers with doctors.',
    privateClinic: 'Local medical centers, Torrevieja private hospitals nearby',
    pharmacies: 'Several pharmacies in town center',
    
    internationalSchools: ['Schools in Torrevieja (15 min)', 'El Limonar (20 min)'],
    spanishSchools: 'Good Spanish school in Guardamar',
    educationNotes: 'International school options require commuting. Spanish school is well-regarded.',
    
    nearestAirport: 'Alicante (ALC) 40 km / Murcia (RMU) 45 km',
    airportDistance: '35 minutes to Alicante',
    publicTransport: 'Bus connections to Torrevieja and Alicante.',
    drivingNotes: 'Easy access via N332. Parking generally easy.',
    
    expat: 'Mixed Spanish and international, growing Scandinavian presence',
    mainNationalities: ['Spanish', 'Scandinavian', 'British', 'Dutch', 'German'],
    englishSpoken: 'moderate',
    expatClubs: 'Growing expat community, less organized than other areas',
    
    activities: ['Beach activities', 'Pine forest walks', 'Cycling', 'Fishing', 'Bird watching'],
    restaurants: 'Authentic Spanish restaurants dominate. Excellent seafood at the port.',
    shopping: 'Local shops and supermarkets. Larger shopping in Torrevieja.',
    weeklyMarkets: 'Wednesday market',
    
    costOfLiving: 'affordable',
    averageRent2Bed: 600
  },
  
  'algorfa': {
    description: 'Algorfa is a peaceful inland village transformed by La Finca Golf Resort into a golfer\'s paradise with year-round sunshine.',
    highlights: ['La Finca Golf Resort', 'Peaceful atmosphere', 'Lower prices', 'Authentic village life', 'Easy beach access'],
    priceRange: { min: 2000, max: 3000 },
    rentalYield: { min: 5.5, max: 7.0 },
    lifestyle: 'golf-focused, peaceful, value-oriented',
    region: 'south',
    
    geography: 'Inland village surrounded by citrus groves and the La Finca Golf Resort development.',
    climate: 'Slightly hotter summers than coastal areas but excellent year-round. Lower humidity.',
    sunshineHours: 320,
    
    nearestBeach: 'Guardamar (14 km, 15 min)',
    beachDetails: 'Guardamar\'s pristine Blue Flag beaches are a short drive away.',
    natureParks: ['Sierra de Escalona', 'Various hiking trails'],
    
    nearestGolf: 'La Finca (on-site), multiple nearby',
    golfCourses: ['La Finca Golf Resort', 'Lo Romero', 'La Marquesa', 'Vistabella', 'Alenda'],
    
    nearestHospital: 'Hospital de Torrevieja (20 min)',
    healthcareDetails: 'Local health center. Hospital access in Torrevieja.',
    privateClinic: 'Torrevieja private healthcare facilities',
    pharmacies: 'Pharmacy in Algorfa village',
    
    internationalSchools: ['El Limonar (25 min)', 'Schools in Torrevieja area'],
    spanishSchools: 'Local Spanish school',
    educationNotes: 'Limited local options. Most international buyers commute children to schools.',
    
    nearestAirport: 'Alicante (ALC) 45 km / Murcia (RMU) 35 km',
    airportDistance: '35 minutes to either airport',
    publicTransport: 'Very limited. Car essential.',
    drivingNotes: 'Good road connections but inland location means car is necessary.',
    
    expat: 'International golf community',
    mainNationalities: ['British', 'Scandinavian', 'German', 'Dutch'],
    englishSpoken: 'good',
    expatClubs: 'La Finca golf community, social events at the resort',
    
    activities: ['Golf', 'Cycling', 'Walking', 'Pool lifestyle', 'Day trips to coast'],
    restaurants: 'La Finca clubhouse, local Spanish bars in village. Limited but authentic.',
    shopping: 'Basic shops in village. Torrevieja or Quesada for major shopping.',
    weeklyMarkets: 'Small local market',
    
    costOfLiving: 'affordable',
    averageRent2Bed: 550
  },
  
  'villamartin': {
    description: 'Villamartín is the original golf urbanization of Costa Blanca South, offering established infrastructure and a thriving community.',
    highlights: ['Villamartín Golf Course', 'Villamartín Plaza', 'Established community', 'Good rentals', 'Near La Zenia'],
    priceRange: { min: 2000, max: 2800 },
    rentalYield: { min: 5.5, max: 7.0 },
    lifestyle: 'golf community, established, social',
    region: 'south',
    
    geography: 'Rolling golf resort terrain connected to the wider Orihuela Costa urbanizations.',
    climate: 'Excellent Mediterranean climate with cooling breezes from the nearby coast.',
    sunshineHours: 320,
    
    nearestBeach: 'La Zenia, Playa Flamenca (10 min)',
    beachDetails: 'Several Blue Flag beaches within easy driving distance.',
    natureParks: ['Local walking trails', 'La Mata salt lakes nearby'],
    
    nearestGolf: 'Villamartín (on-site)',
    golfCourses: ['Villamartin Golf', 'Las Ramblas (5 min)', 'Campoamor (10 min)'],
    
    nearestHospital: 'Hospital de Torrevieja (20 min)',
    healthcareDetails: 'Medical center in Villamartín. Hospital access in Torrevieja.',
    privateClinic: 'Local doctors with English, Torrevieja private hospitals',
    pharmacies: 'Pharmacy at Villamartín Plaza',
    
    internationalSchools: ['El Limonar (20 min)', 'Various options in Torrevieja area'],
    spanishSchools: 'Access to local Spanish schools',
    educationNotes: 'International schools available with short commute.',
    
    nearestAirport: 'Alicante (ALC) 45 km / Murcia (RMU) 30 km',
    airportDistance: '30-35 minutes to either airport',
    publicTransport: 'Limited. Car recommended.',
    drivingNotes: 'Good road connections to coast and airports.',
    
    expat: 'Large established expat community, very social',
    mainNationalities: ['British', 'Scandinavian', 'Irish', 'Dutch', 'German'],
    englishSpoken: 'excellent',
    expatClubs: 'Villamartín Golf Club, numerous social groups, very active community',
    
    activities: ['Golf', 'Tennis', 'Padel', 'Social events', 'Pool lifestyle'],
    restaurants: 'Villamartín Plaza is the social hub with bars, restaurants, and entertainment.',
    shopping: 'Local shops at Plaza. La Zenia Boulevard (10 min) for major shopping.',
    weeklyMarkets: 'Nearby markets at La Zenia and Torrevieja',
    
    costOfLiving: 'affordable',
    averageRent2Bed: 650
  }
};

// Default area for unknown locations
const DEFAULT_AREA: AreaInfo = {
  description: 'Costa Blanca offers the perfect Mediterranean lifestyle with over 300 days of sunshine, beautiful beaches, and excellent amenities.',
  highlights: ['Mediterranean climate', 'Beautiful beaches', 'International community', 'Excellent healthcare', 'Easy access from UK/EU'],
  priceRange: { min: 2000, max: 3500 },
  rentalYield: { min: 5.0, max: 7.0 },
  lifestyle: 'Mediterranean, relaxed, international',
  region: 'south',
  
  geography: 'The White Coast stretches along the Mediterranean, offering diverse landscapes from rocky coves to sandy beaches.',
  climate: 'One of Europe\'s best climates with over 300 days of sunshine and mild winters.',
  sunshineHours: 320,
  
  nearestBeach: 'Multiple beaches nearby',
  beachDetails: 'Blue Flag beaches with excellent facilities and golden sand.',
  natureParks: ['Various natural parks and reserves'],
  
  nearestGolf: 'Several courses in the region',
  golfCourses: ['Multiple championship courses'],
  
  nearestHospital: 'Modern hospitals within 30 minutes',
  healthcareDetails: 'Excellent public and private healthcare. Many English-speaking doctors.',
  privateClinic: 'Private healthcare facilities available',
  pharmacies: 'Pharmacies available locally',
  
  internationalSchools: ['International schools in the region'],
  spanishSchools: 'Public and private Spanish schools',
  educationNotes: 'Good educational options for families.',
  
  nearestAirport: 'Alicante (ALC) approximately 1 hour',
  airportDistance: 'Excellent airport connections',
  publicTransport: 'Bus connections available. Car recommended.',
  drivingNotes: 'Good road network throughout the region.',
  
  expat: 'Strong international community',
  mainNationalities: ['British', 'German', 'Scandinavian', 'Dutch'],
  englishSpoken: 'good',
  expatClubs: 'Various clubs and social groups',
  
  activities: ['Beach activities', 'Golf', 'Hiking', 'Water sports', 'Cultural events'],
  restaurants: 'Wide variety of Spanish and international dining.',
  shopping: 'Local and regional shopping options.',
  weeklyMarkets: 'Regular weekly markets in local towns',
  
  costOfLiving: 'moderate',
  averageRent2Bed: 700
};

// ====================
// HELPER FUNCTIONS
// ====================

/**
 * Get area info for a town - case insensitive matching
 */
function getAreaInfo(town: string): AreaInfo {
  const normalizedTown = town.toLowerCase().trim();
  
  // Try exact match first
  if (AREA_DATA[normalizedTown]) {
    return AREA_DATA[normalizedTown];
  }
  
  // Try partial match
  for (const [key, data] of Object.entries(AREA_DATA)) {
    if (normalizedTown.includes(key) || key.includes(normalizedTown)) {
      return data;
    }
  }
  
  // Handle specific variations
  const variations: Record<string, string> = {
    'xàbia': 'javea',
    'jávea': 'javea',
    'dénia': 'denia',
    'guardamar': 'guardamar del segura',
    'la finca': 'algorfa',
    'la zenia': 'orihuela costa',
    'playa flamenca': 'orihuela costa',
    'campoamor': 'orihuela costa',
    'punta prima': 'orihuela costa',
    'cabo roig': 'orihuela costa'
  };
  
  if (variations[normalizedTown]) {
    return AREA_DATA[variations[normalizedTown]] || DEFAULT_AREA;
  }
  
  return DEFAULT_AREA;
}

/**
 * Clean text - remove markdown, extra whitespace, ensure no raw ** or ## etc
 */
function cleanText(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .replace(/##/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Format price with EUR symbol and proper thousands separator
 */
function formatPrice(price: number): string {
  return '€' + price.toLocaleString('en-GB');
}

/**
 * Get primary features from property for content generation
 */
function getPrimaryFeatures(property: UnifiedProperty): string[] {
  const features: string[] = [];
  
  if (property.hasPool) features.push('pool');
  if (property.hasSeaview) features.push('sea view');
  if (property.hasGolfview) features.push('golf view');
  if (property.hasGarden) features.push('garden');
  if (property.hasTerrace) features.push('terrace');
  if (property.hasParking) features.push('parking');
  
  // Check features array for additional items
  if (property.features) {
    const featureLower = property.features.map(f => f.toLowerCase());
    if (featureLower.some(f => f.includes('air conditioning') || f.includes('a/c'))) {
      features.push('air conditioning');
    }
    if (featureLower.some(f => f.includes('storage'))) {
      features.push('storage');
    }
    if (featureLower.some(f => f.includes('lift') || f.includes('elevator'))) {
      features.push('lift');
    }
  }
  
  return features;
}

/**
 * Determine buyer persona based on property characteristics
 */
function determineBuyerPersona(property: UnifiedProperty): BuyerPersona {
  const beds = property.bedrooms || 2;
  const price = property.price || 0;
  const type = (property.propertyType || '').toLowerCase();
  const areaInfo = getAreaInfo(property.town || '');
  
  // Golf properties
  if (property.hasGolfview || (property.features?.some(f => f.toLowerCase().includes('golf')))) {
    return {
      type: 'golf',
      description: 'active retirees and golf enthusiasts seeking year-round play'
    };
  }
  
  // Luxury properties
  if (price > 500000 || type.includes('villa') && beds >= 4) {
    return {
      type: 'luxury',
      description: 'discerning buyers seeking premium Mediterranean living'
    };
  }
  
  // Family properties
  if (beds >= 3 && (type.includes('villa') || type.includes('townhouse') || type.includes('house'))) {
    return {
      type: 'family',
      description: 'families seeking space and quality of life in the Spanish sunshine'
    };
  }
  
  // Retirement focused (Costa Blanca South, moderate price)
  if (areaInfo.region === 'south' && price < 300000 && beds >= 2) {
    return {
      type: 'retirement',
      description: 'retirees seeking an affordable Mediterranean lifestyle'
    };
  }
  
  // Investment properties (apartments, good rental areas)
  if (type.includes('apartment') && areaInfo.rentalYield.max >= 6.5) {
    return {
      type: 'investment',
      description: 'investors seeking strong rental returns'
    };
  }
  
  // Default - holiday home
  return {
    type: 'holiday',
    description: 'buyers seeking a holiday home and potential rental income'
  };
}

// ====================
// SEO TITLE GENERATOR
// ====================

export function generateSEOTitle(property: UnifiedProperty): string {
  const beds = property.bedrooms || 2;
  const type = property.propertyType || 'Property';
  const town = property.town || 'Costa Blanca';
  const features = getPrimaryFeatures(property);
  
  const featureParts: string[] = [];
  
  if (features.includes('pool')) featureParts.push('Private Pool');
  if (features.includes('sea view')) featureParts.push('Sea Views');
  if (features.includes('golf view')) featureParts.push('Golf Views');
  if (features.includes('garden')) featureParts.push('Garden');
  
  let featureString = '';
  if (featureParts.length === 1) {
    featureString = ` with ${featureParts[0]}`;
  } else if (featureParts.length === 2) {
    featureString = ` with ${featureParts[0]} & ${featureParts[1]}`;
  } else if (featureParts.length > 2) {
    featureString = ` with ${featureParts[0]}, ${featureParts[1]} & More`;
  }
  
  return cleanText(`${beds}-Bedroom ${type} in ${town}${featureString}`);
}

// ====================
// META DESCRIPTION GENERATOR
// ====================

export function generateMetaDescription(property: UnifiedProperty): string {
  const beds = property.bedrooms || 2;
  const baths = property.bathrooms || 2;
  const type = (property.propertyType || 'property').toLowerCase();
  const town = property.town || 'Costa Blanca';
  const price = property.price;
  const features = getPrimaryFeatures(property);
  
  let desc = `Stunning ${beds}-bed ${type} for sale in ${town}`;
  
  if (features.includes('pool')) desc += ' with private pool';
  else if (features.includes('sea view')) desc += ' with sea views';
  else if (features.includes('golf view')) desc += ' with golf views';
  
  if (price) {
    desc += `. From ${formatPrice(price)}`;
  }
  
  desc += `. ${baths} bathrooms. Contact us for viewings and current availability.`;
  
  // Keep under 160 chars
  if (desc.length > 160) {
    desc = desc.substring(0, 157) + '...';
  }
  
  return cleanText(desc);
}

// ====================
// MAIN DESCRIPTION (300-500 words)
// ====================

export function generateMainDescription(property: UnifiedProperty): string {
  const beds = property.bedrooms || 2;
  const baths = property.bathrooms || 2;
  const type = property.propertyType || 'Property';
  const town = property.town || 'Costa Blanca';
  const areaInfo = getAreaInfo(town);
  const builtArea = property.builtArea;
  const plotArea = property.plotArea;
  const features = getPrimaryFeatures(property);
  const persona = determineBuyerPersona(property);
  
  const paragraphs: string[] = [];
  
  // Opening paragraph - property type + location hook
  paragraphs.push(
    `This exceptional ${beds}-bedroom ${type.toLowerCase()} offers the perfect opportunity to own property in ${town}, one of Costa Blanca's most sought-after locations. ` +
    `${areaInfo.description} Whether you're seeking a permanent home, holiday retreat, or investment property, this ${type.toLowerCase()} delivers on every front.`
  );
  
  // Property specifics
  let specsText = `The property comprises ${beds} well-appointed bedrooms and ${baths} modern bathrooms`;
  if (builtArea) {
    specsText += `, with ${builtArea}m² of interior living space`;
  }
  if (plotArea && plotArea > builtArea!) {
    specsText += ` set on a generous ${plotArea}m² plot`;
  }
  specsText += '. ';
  
  // Features paragraph
  if (features.includes('pool')) {
    specsText += `The private swimming pool is the centerpiece of the outdoor living area, perfect for cooling off in the Spanish sunshine or hosting summer gatherings. `;
  }
  if (features.includes('sea view')) {
    specsText += `Stunning sea views create a breathtaking backdrop to daily life, with the Mediterranean stretching to the horizon from your terrace. `;
  }
  if (features.includes('golf view')) {
    specsText += `Views over the manicured greens provide a serene, ever-changing landscape that golf enthusiasts and nature lovers will appreciate. `;
  }
  if (features.includes('garden')) {
    specsText += `The private garden offers space for al fresco dining, relaxation, or creating your own Mediterranean oasis. `;
  }
  if (features.includes('terrace')) {
    specsText += `Generous terrace space extends the living area outdoors, ideal for the Costa Blanca lifestyle of outdoor living. `;
  }
  paragraphs.push(specsText);
  
  // Location benefits
  paragraphs.push(
    `The location couldn't be better for enjoying everything ${town} has to offer. ` +
    `${areaInfo.nearestBeach}. ` +
    `${areaInfo.nearestGolf}. ` +
    `Daily amenities, restaurants, and healthcare facilities are all within easy reach.`
  );
  
  // Persona-specific paragraph
  if (persona.type === 'family') {
    paragraphs.push(
      `Families will appreciate the space and layout this ${type.toLowerCase()} provides, along with the safe, community-focused environment of ${town}. ` +
      `${areaInfo.educationNotes} ` +
      `${areaInfo.healthcareDetails}`
    );
  } else if (persona.type === 'retirement') {
    paragraphs.push(
      `For those seeking a retirement destination, ${town} offers an unbeatable combination of climate, healthcare, and lifestyle. ` +
      `${areaInfo.healthcareDetails} ` +
      `The welcoming expat community means you'll quickly feel at home.`
    );
  } else if (persona.type === 'investment') {
    paragraphs.push(
      `As an investment, this property benefits from ${town}'s strong rental demand. ` +
      `Rental yields in the area typically range from ${areaInfo.rentalYield.min}% to ${areaInfo.rentalYield.max}% annually, ` +
      `with ${features.includes('pool') ? 'pool properties commanding premium rates' : 'year-round demand from holidaymakers and long-term tenants alike'}.`
    );
  } else if (persona.type === 'golf') {
    paragraphs.push(
      `Golf enthusiasts will appreciate the proximity to excellent courses. ` +
      `${areaInfo.golfCourses.slice(0, 3).join(', ')} are all nearby, providing year-round play in perfect conditions. ` +
      `The international golf community here is welcoming and active.`
    );
  } else {
    paragraphs.push(
      `Whether as a permanent residence, holiday home, or rental investment, this ${type.toLowerCase()} in ${town} offers exceptional value. ` +
      `The ${areaInfo.lifestyle} lifestyle here attracts buyers from across Europe. ` +
      `Contact us today to arrange a viewing and discover why so many choose Costa Blanca.`
    );
  }
  
  return cleanText(paragraphs.join('\n\n'));
}

// ====================
// NEW: AREA SECTION (100-150 words)
// ====================

/**
 * Generate area section - factual information about the town
 * Target: 100-150 words
 */
export function generateAreaSection(property: UnifiedProperty): string {
  const town = property.town || 'Costa Blanca';
  const areaInfo = getAreaInfo(town);
  
  const sentences: string[] = [];
  
  // Geography and setting
  sentences.push(areaInfo.geography);
  
  // Climate
  sentences.push(areaInfo.climate);
  sentences.push(`With over ${areaInfo.sunshineHours} days of sunshine annually, outdoor living is a year-round reality.`);
  
  // Region positioning
  if (areaInfo.region === 'north') {
    sentences.push(`Located on Costa Blanca North, ${town} offers a more exclusive, upscale atmosphere compared to the southern coast.`);
  } else {
    sentences.push(`Situated on Costa Blanca South, ${town} benefits from excellent value and an established international community.`);
  }
  
  // Key highlight
  sentences.push(`Key attractions include ${areaInfo.highlights.slice(0, 3).join(', ')}.`);
  
  // Transport
  sentences.push(`${areaInfo.nearestAirport}, making weekend visits and permanent relocation equally convenient.`);
  
  return cleanText(sentences.join(' '));
}

// ====================
// ENHANCED: LIFESTYLE SECTION (~300 words)
// ====================

/**
 * Generate comprehensive lifestyle section
 * Target: ~300 words covering: daily life, beaches, healthcare, schools, expat community, activities, transport
 */
export function generateLifestyleSection(property: UnifiedProperty): string {
  const town = property.town || 'Costa Blanca';
  const areaInfo = getAreaInfo(town);
  const features = getPrimaryFeatures(property);
  const persona = determineBuyerPersona(property);
  
  const paragraphs: string[] = [];
  
  // 1. Daily Life Opening (~50 words)
  paragraphs.push(
    `Living in ${town} means embracing the authentic Mediterranean lifestyle that draws thousands of expats to Spain each year. ` +
    `Days unfold at a relaxed pace, with morning coffee on the terrace, long lunches at local restaurants, and evenings watching the sunset. ` +
    `The ${areaInfo.lifestyle} atmosphere makes every day feel like a holiday.`
  );
  
  // 2. Property-specific lifestyle (~40 words)
  if (features.includes('pool')) {
    paragraphs.push(
      `Your private pool becomes the heart of home life, perfect for morning swims, afternoon relaxation, and evening entertaining under the stars.`
    );
  } else if (features.includes('sea view')) {
    paragraphs.push(
      `Waking up to Mediterranean sea views transforms ordinary mornings into extraordinary ones, with the ever-changing blues providing a stunning backdrop to daily life.`
    );
  } else if (features.includes('golf view')) {
    paragraphs.push(
      `Your views over the golf course provide a peaceful, green panorama that changes with the seasons and the play below.`
    );
  }
  
  // 3. Beaches and Nature (~50 words)
  paragraphs.push(
    `${areaInfo.beachDetails} ` +
    `Beyond the beaches, ${areaInfo.natureParks.length > 0 ? areaInfo.natureParks.slice(0, 2).join(' and ') + ' offer' : 'local trails offer'} opportunities for hiking, cycling, and exploring the natural beauty of the region.`
  );
  
  // 4. Healthcare (~50 words)
  paragraphs.push(
    `Healthcare in ${town} meets the high standards that make Spain's health system one of Europe's best. ` +
    `${areaInfo.healthcareDetails} ` +
    `${areaInfo.pharmacies}.`
  );
  
  // 5. Education (if relevant based on persona) (~40 words)
  if (persona.type === 'family' || property.bedrooms! >= 3) {
    paragraphs.push(
      `For families, ${areaInfo.educationNotes} ` +
      `International schools offering British curriculum include ${areaInfo.internationalSchools.slice(0, 2).join(' and ')}.`
    );
  }
  
  // 6. Expat Community (~50 words)
  paragraphs.push(
    `The expat community in ${town} is welcoming and well-established, with ${areaInfo.mainNationalities.slice(0, 3).join(', ')} residents forming the core. ` +
    `English is ${areaInfo.englishSpoken === 'excellent' ? 'widely spoken in shops, restaurants, and services' : areaInfo.englishSpoken === 'good' ? 'commonly understood in most establishments' : 'spoken in tourist areas and expat businesses'}. ` +
    `${areaInfo.expatClubs}.`
  );
  
  // 7. Activities and Dining (~50 words)
  paragraphs.push(
    `Activities abound, from ${areaInfo.activities.slice(0, 4).join(', ')} to simply enjoying the café culture. ` +
    `${areaInfo.restaurants} ` +
    `${areaInfo.weeklyMarkets} provides a wonderful opportunity to stock up on fresh local produce and embrace Spanish traditions.`
  );
  
  return cleanText(paragraphs.join('\n\n'));
}

// ====================
// ENHANCED: INVESTMENT SECTION (~250 words)
// ====================

/**
 * Generate comprehensive investment section
 * Target: ~250 words covering: Spain context, Costa Blanca trends, rental demand, growth outlook
 */
export function generateInvestmentSection(property: UnifiedProperty): string {
  const town = property.town || 'Costa Blanca';
  const areaInfo = getAreaInfo(town);
  const price = property.price;
  const builtArea = property.builtArea;
  const features = getPrimaryFeatures(property);
  const persona = determineBuyerPersona(property);
  
  const pricePerM2 = builtArea && price 
    ? Math.round(price / builtArea) 
    : areaInfo.priceRange.min + Math.round((areaInfo.priceRange.max - areaInfo.priceRange.min) / 2);
  
  const paragraphs: string[] = [];
  
  // 1. Spain Market Context (~60 words)
  paragraphs.push(
    `Spain remains one of Europe's most attractive property markets for international buyers, offering exceptional quality of life, favorable tax treatment for retirees, and strong capital appreciation potential. ` +
    `Costa Blanca specifically benefits from excellent infrastructure, two international airports, and a mature property market with transparent buying processes.`
  );
  
  // 2. Costa Blanca & Regional Context (~50 words)
  if (areaInfo.region === 'north') {
    paragraphs.push(
      `Costa Blanca North commands premium prices compared to the southern coast, reflecting its more exclusive character and upscale amenities. ` +
      `${town} properties currently average €${pricePerM2.toLocaleString()}/m², positioning this area firmly in the quality end of the market.`
    );
  } else {
    paragraphs.push(
      `Costa Blanca South offers exceptional value compared to other Spanish costas, with prices significantly below Costa del Sol and Balearics. ` +
      `${town} properties currently average €${pricePerM2.toLocaleString()}/m², representing strong value with room for appreciation.`
    );
  }
  
  // 3. Rental Potential (~60 words)
  paragraphs.push(
    `Rental yields in ${town} typically range from ${areaInfo.rentalYield.min}% to ${areaInfo.rentalYield.max}% gross annually, ` +
    `driven by year-round demand from holidaymakers and long-term renters. ` +
    `${features.includes('pool') ? 'Properties with pools command premium rental rates and higher occupancy, particularly during peak summer months. ' : ''}` +
    `${features.includes('sea view') ? 'Sea view properties achieve rental premiums of 15-25% over comparable inland homes. ' : ''}` +
    `The established tourism industry ensures consistent booking potential.`
  );
  
  // 4. Growth Outlook (~50 words)
  paragraphs.push(
    `Costa Blanca property values have demonstrated steady appreciation of 4-6% annually over recent years, ` +
    `supported by strong international demand, limited new development in prime locations, and Spain's position as Europe's most popular relocation destination. ` +
    `Post-pandemic interest from remote workers has added a new dimension to the market.`
  );
  
  // 5. Property-Specific Investment Features (~30 words)
  const investmentFeatures: string[] = [];
  if (features.includes('pool')) investmentFeatures.push('private pool (rental premium)');
  if (features.includes('sea view')) investmentFeatures.push('sea views (high demand)');
  if (features.includes('golf view')) investmentFeatures.push('golf views (year-round appeal)');
  if (property.bedrooms! >= 3) investmentFeatures.push('family-size accommodation');
  
  if (investmentFeatures.length > 0) {
    paragraphs.push(
      `This property's investment appeal is enhanced by ${investmentFeatures.join(', ')}, all factors that support both rental income and long-term value appreciation.`
    );
  }
  
  return cleanText(paragraphs.join('\n\n'));
}

// ====================
// SELLING POINTS (10 points)
// ====================

export function generateSellingPoints(property: UnifiedProperty): string[] {
  const town = property.town || 'Costa Blanca';
  const areaInfo = getAreaInfo(town);
  const beds = property.bedrooms || 2;
  const baths = property.bathrooms || 2;
  const type = property.propertyType || 'Property';
  const features = getPrimaryFeatures(property);
  
  const points: string[] = [];
  
  // 1. Location
  points.push(`Prime location in ${town}, one of Costa Blanca's most desirable areas`);
  
  // 2. Bedrooms
  points.push(`Spacious ${beds}-bedroom layout perfect for ${beds >= 3 ? 'families or hosting guests' : 'comfortable living'}`);
  
  // 3. Key feature
  if (features.includes('pool')) {
    points.push('Private swimming pool for year-round enjoyment in the Spanish sunshine');
  } else if (features.includes('sea view')) {
    points.push('Breathtaking Mediterranean sea views from your terrace');
  } else if (features.includes('golf view')) {
    points.push('Peaceful golf course views creating a serene backdrop');
  } else {
    points.push('Modern design with quality finishes throughout');
  }
  
  // 4. Outdoor space
  if (features.includes('garden')) {
    points.push('Private garden providing outdoor space for relaxation and entertaining');
  } else if (features.includes('terrace')) {
    points.push('Spacious terrace ideal for al fresco dining and outdoor living');
  } else {
    points.push('Thoughtfully designed outdoor areas maximizing the Mediterranean climate');
  }
  
  // 5. Climate
  points.push(`Over ${areaInfo.sunshineHours} days of sunshine annually with mild winters and warm summers`);
  
  // 6. Beach access
  points.push(`${areaInfo.nearestBeach}`);
  
  // 7. Healthcare
  points.push(`${areaInfo.nearestHospital} with English-speaking medical staff`);
  
  // 8. Airport access
  points.push(`${areaInfo.nearestAirport} for convenient travel`);
  
  // 9. Expat community
  points.push(`Welcoming international community with ${areaInfo.mainNationalities.slice(0, 2).join(' and ')} expats`);
  
  // 10. Investment
  points.push(`Strong rental potential with yields of ${areaInfo.rentalYield.min}-${areaInfo.rentalYield.max}% in the area`);
  
  return points;
}

// ====================
// FAQ GENERATOR (8-10 questions)
// ====================

export function generateFAQs(property: UnifiedProperty): FAQ[] {
  const beds = property.bedrooms || 2;
  const baths = property.bathrooms || 2;
  const type = (property.propertyType || 'property').toLowerCase();
  const town = property.town || 'Costa Blanca';
  const price = property.price || 0;
  const areaInfo = getAreaInfo(town);
  const features = getPrimaryFeatures(property);
  
  const faqs: FAQ[] = [];
  
  // 1. Property basics - always include
  faqs.push({
    question: `What is included in this ${beds}-bedroom ${type}?`,
    answer: `This ${type} in ${town} features ${beds} bedrooms and ${baths} bathrooms${property.builtArea ? ` across ${property.builtArea}m² of living space` : ''}. ${features.includes('pool') ? 'The property includes a private swimming pool. ' : ''}${features.includes('terrace') ? 'A spacious terrace provides outdoor living space. ' : ''}${features.includes('parking') ? 'Private parking is included. ' : ''}Contact us for the complete specification and current availability.`
  });
  
  // 2. Location question
  faqs.push({
    question: `Why is ${town} a good place to buy property?`,
    answer: `${town} offers an exceptional quality of life with ${areaInfo.sunshineHours}+ days of sunshine annually, excellent beaches, modern healthcare facilities, and a welcoming international community. ${areaInfo.description} The area attracts buyers from ${areaInfo.mainNationalities.slice(0, 3).join(', ')} seeking the Mediterranean lifestyle.`
  });
  
  // 3. Beach access
  faqs.push({
    question: `How close is this property to the beach?`,
    answer: `${areaInfo.nearestBeach}. ${areaInfo.beachDetails} The Costa Blanca coastline offers some of Spain's finest Blue Flag beaches with excellent facilities and crystal-clear Mediterranean waters.`
  });
  
  // 4. Healthcare
  faqs.push({
    question: `What healthcare facilities are available near ${town}?`,
    answer: `${areaInfo.healthcareDetails} ${areaInfo.nearestHospital}. Spain's healthcare system consistently ranks among Europe's best, with many doctors speaking English. Private healthcare is also widely available and affordable.`
  });
  
  // 5. Rental potential (if relevant)
  if (price > 0) {
    faqs.push({
      question: `What is the rental potential for this property?`,
      answer: `Properties in ${town} achieve rental yields of ${areaInfo.rentalYield.min}-${areaInfo.rentalYield.max}% annually. ${features.includes('pool') ? 'Pool properties command premium rates, ' : ''}${features.includes('sea view') ? 'Sea views attract higher bookings, ' : ''}and the area benefits from year-round demand. We can provide detailed rental projections on request.`
    });
  }
  
  // 6. Buying process
  faqs.push({
    question: `What is the process for buying property in Spain?`,
    answer: `Buying property in Spain involves obtaining an NIE number (foreigner identification), opening a Spanish bank account, and working with a lawyer to handle contracts and due diligence. The process typically takes 6-12 weeks from reservation to completion. We guide buyers through every step, from initial viewing to collecting keys.`
  });
  
  // 7. Cost of ownership
  faqs.push({
    question: `What are the ongoing costs of owning property in ${town}?`,
    answer: `Ongoing costs include IBI (property tax, typically €400-1,200 annually depending on property value), community fees if applicable, home insurance, and utility bills. ${areaInfo.costOfLiving === 'affordable' ? 'The cost of living in the area is very affordable by European standards. ' : areaInfo.costOfLiving === 'expensive' ? 'While this is a premium area, daily costs remain reasonable. ' : 'Living costs are moderate and manageable for most buyers. '}We can provide detailed cost estimates for this specific property.`
  });
  
  // 8. Airport access
  faqs.push({
    question: `How do I get to ${town} from the UK or Europe?`,
    answer: `${town} is easily accessible via ${areaInfo.nearestAirport}. ${areaInfo.airportDistance}. Multiple airlines operate year-round flights from major UK and European cities, with flight times of approximately 2-2.5 hours from the UK. ${areaInfo.drivingNotes}`
  });
  
  // 9. Schools (if family-oriented property)
  if (beds >= 3) {
    faqs.push({
      question: `What schools are available for families in ${town}?`,
      answer: `${areaInfo.educationNotes} International schools following British curriculum include ${areaInfo.internationalSchools.slice(0, 2).join(' and ')}. Spanish public and private schools are also available. Most international schools offer transport services.`
    });
  }
  
  // 10. Viewing arrangement
  faqs.push({
    question: `How can I arrange a viewing of this property?`,
    answer: `Contact us via WhatsApp, phone, or email to arrange a viewing at your convenience. We offer in-person viewings for those visiting the area and video tours for overseas buyers. Our team can also arrange airport pickup and a full property tour during your visit to Costa Blanca.`
  });
  
  return faqs;
}

// ====================
// CHART DATA GENERATORS
// ====================

export function generatePriceChartData(property: UnifiedProperty): PriceDataPoint[] {
  const areaInfo = getAreaInfo(property.town || 'Costa Blanca');
  const basePrice = areaInfo.priceRange.min + Math.round((areaInfo.priceRange.max - areaInfo.priceRange.min) / 2);
  
  // Generate realistic price growth data (5-year trend)
  const growthRates = areaInfo.region === 'north' 
    ? [0.82, 0.86, 0.90, 0.95, 1.00] // North: higher growth
    : [0.85, 0.89, 0.93, 0.96, 1.00]; // South: steady growth
  
  return [
    { year: '2020', price: Math.round(basePrice * growthRates[0]) },
    { year: '2021', price: Math.round(basePrice * growthRates[1]) },
    { year: '2022', price: Math.round(basePrice * growthRates[2]) },
    { year: '2023', price: Math.round(basePrice * growthRates[3]) },
    { year: '2024', price: Math.round(basePrice * growthRates[4]) },
  ];
}

export function generateRentalYieldData(property: UnifiedProperty): YieldDataPoint[] {
  const town = property.town || 'Costa Blanca';
  const areaInfo = getAreaInfo(town);
  
  // Generate comparison data with nearby areas
  const data: YieldDataPoint[] = [
    { area: town, yield: (areaInfo.rentalYield.min + areaInfo.rentalYield.max) / 2, color: '#059669' },
  ];
  
  // Add comparison areas based on region
  if (areaInfo.region === 'south') {
    data.push({ area: 'Torrevieja', yield: 6.5, color: '#10b981' });
    data.push({ area: 'Orihuela Costa', yield: 6.5, color: '#34d399' });
    data.push({ area: 'Costa Blanca Avg', yield: 5.8, color: '#6ee7b7' });
  } else {
    data.push({ area: 'Benidorm', yield: 7.2, color: '#10b981' });
    data.push({ area: 'Calpe', yield: 6.0, color: '#34d399' });
    data.push({ area: 'Costa Blanca Avg', yield: 5.8, color: '#6ee7b7' });
  }
  
  return data;
}

export function generateRentalIncomeEstimate(property: UnifiedProperty): RentalEstimate {
  const price = property.price || 250000;
  const areaInfo = getAreaInfo(property.town || 'Costa Blanca');
  
  // Calculate based on average yield for the area
  const avgYield = (areaInfo.rentalYield.min + areaInfo.rentalYield.max) / 2 / 100;
  
  // Adjust for premium features
  let yieldMultiplier = 1.0;
  if (property.hasPool) yieldMultiplier += 0.1;
  if (property.hasSeaview) yieldMultiplier += 0.08;
  if (property.hasGolfview) yieldMultiplier += 0.05;
  
  const annualIncome = Math.round(price * avgYield * yieldMultiplier);
  const occupancyRate = property.hasPool || property.hasSeaview ? 0.65 : 0.55;
  
  return {
    annual: annualIncome,
    monthly: Math.round(annualIncome / 12),
    weekly: Math.round(annualIncome / 52),
    occupancyRate: occupancyRate * 100
  };
}

// ====================
// IMAGE ALT TAGS
// ====================

export function generateImageAltTags(property: UnifiedProperty, imageCount: number): string[] {
  const beds = property.bedrooms || 2;
  const type = (property.propertyType || 'property').toLowerCase();
  const town = property.town || 'Costa Blanca';
  const features = getPrimaryFeatures(property);
  
  const altTags: string[] = [];
  
  altTags.push(`${beds}-bedroom ${type} for sale in ${town}, Costa Blanca`);
  
  if (features.includes('pool')) {
    altTags.push(`Private pool at ${type} in ${town}`);
  }
  
  altTags.push(`Modern interior of ${type} in ${town}, Spain`);
  altTags.push(`Kitchen in ${beds}-bed ${type}, ${town}`);
  altTags.push(`Bedroom in new build ${type}, ${town}`);
  altTags.push(`Bathroom in ${type} for sale ${town}`);
  
  if (features.includes('terrace') || features.includes('garden')) {
    altTags.push(`Outdoor terrace area at ${town} ${type}`);
  }
  
  if (features.includes('sea view')) {
    altTags.push(`Sea views from ${type} in ${town}`);
  }
  
  if (features.includes('golf view')) {
    altTags.push(`Golf course views from ${town} property`);
  }
  
  altTags.push(`Living area in ${beds}-bedroom ${type}, ${town}`);
  altTags.push(`Exterior view of new build ${type} in ${town}`);
  
  while (altTags.length < imageCount) {
    altTags.push(`${type} for sale in ${town}, Costa Blanca - image ${altTags.length + 1}`);
  }
  
  return altTags.slice(0, imageCount);
}

// ====================
// PRICE CONTEXT GENERATOR
// ====================

function generatePriceContext(property: UnifiedProperty): PriceContext {
  const price = property.price || 0;
  const builtArea = property.builtArea || 1;
  const pricePerSqm = Math.round(price / builtArea);
  const areaInfo = getAreaInfo(property.town || '');
  
  const areaAverageSqm = areaInfo.priceRange.min + Math.round((areaInfo.priceRange.max - areaInfo.priceRange.min) / 2);
  const percentageDiff = Math.round(((pricePerSqm - areaAverageSqm) / areaAverageSqm) * 100);
  
  let comparisonText: string;
  if (percentageDiff <= -15) {
    comparisonText = `Excellent value - ${Math.abs(percentageDiff)}% below ${property.town} average`;
  } else if (percentageDiff < -5) {
    comparisonText = `Good value - ${Math.abs(percentageDiff)}% below ${property.town} average`;
  } else if (percentageDiff > 15) {
    comparisonText = `Premium property - ${percentageDiff}% above area average`;
  } else if (percentageDiff > 5) {
    comparisonText = `Slightly above ${property.town} average`;
  } else {
    comparisonText = `In line with ${property.town} market`;
  }
  
  return {
    pricePerSqm,
    areaAverageSqm,
    percentageDiff,
    comparisonText,
  };
}

// ====================
// MAIN GENERATOR FUNCTION
// ====================

/**
 * Generate all content for a property page
 * This is the main entry point - call this from page.tsx
 */
export function generatePropertyContent(property: UnifiedProperty): PropertyContent {
  const areaInfo = getAreaInfo(property.town || 'Costa Blanca');
  const imageCount = property.images?.length || 10;
  
  const today = new Date();
  const lastUpdated = today.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  return {
    seoTitle: generateSEOTitle(property),
    metaDescription: generateMetaDescription(property),
    mainDescription: generateMainDescription(property),
    areaSection: generateAreaSection(property),           // NEW
    lifestyleSection: generateLifestyleSection(property), // ENHANCED
    investmentSection: generateInvestmentSection(property), // ENHANCED
    sellingPoints: generateSellingPoints(property),
    faqs: generateFAQs(property),
    priceChartData: generatePriceChartData(property),
    rentalYieldData: generateRentalYieldData(property),
    rentalIncomeEstimate: generateRentalIncomeEstimate(property),
    imageAltTags: generateImageAltTags(property, imageCount),
    areaHighlights: areaInfo.highlights,
    priceContext: generatePriceContext(property),
    lastUpdated: lastUpdated,
    buyerPersona: determineBuyerPersona(property),        // NEW
  };
}

// ====================
// EXPORTS
// ====================

export {
  getAreaInfo,
  cleanText,
  formatPrice,
  getPrimaryFeatures,
  determineBuyerPersona,
  AREA_DATA,
  DEFAULT_AREA
};

export type { AreaInfo };
