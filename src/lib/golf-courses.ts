// Golf Courses in Costa Blanca, Murcia & Almería
// ONLY courses with actual properties in our feed
// Used for golf pages, property filtering, and SEO

export interface GolfCourse {
  id: string;
  name: string;
  slug: string;
  shortName: string;
  region: 'south' | 'north' | 'murcia' | 'almeria';
  regionDisplay: string;
  town: string;
  lat: number;
  lng: number;
  holes: number;
  par?: number;
  designer?: string;
  yearOpened?: number;
  website?: string;
  description: string;
  story: string; // Engaging narrative about the course
  features: string[];
  highlights: string[]; // Short bullet points
  nearbyTowns: string[]; // Towns to filter properties by
  image?: string;
  // Extended info
  hotel?: string;
  amenities?: string[];
  greenFees?: string;
  courseLength?: string;
  priceFrom: number;
  propertyCount: number;
  tier: 'premium' | 'popular' | 'value' | 'growing' | 'lifestyle' | 'unique';
  gradient: string; // For visual styling
  builders?: { name: string; slug: string }[];
  relatedDevelopments?: { name: string; slug: string }[];
}

export const GOLF_COURSES: GolfCourse[] = [
  // ============================================
  // COSTA CÁLIDA (MURCIA) - Best Value Region
  // ============================================
  {
    id: 'serena-golf',
    name: 'Serena Golf',
    shortName: 'Serena Golf',
    slug: 'serena-golf',
    region: 'murcia',
    regionDisplay: 'Costa Cálida (Murcia)',
    town: 'Los Alcázares',
    lat: 37.7456,
    lng: -0.8456,
    holes: 18,
    par: 71,
    designer: 'Dave Thomas',
    yearOpened: 2007,
    description: 'Serena Golf is a modern links-style course near the Mar Menor, Spain\'s largest saltwater lagoon. The course features wide fairways, strategic bunkers, and stunning views towards the Mediterranean. Sea breezes add challenge to what is otherwise an accessible layout for golfers of all levels.',
    story: 'Serena Golf has become a hotspot for new build developments with multiple quality builders creating modern apartments and villas. The combination of links-style golf, Mar Menor beaches just minutes away, and competitive property prices makes this one of the most attractive golf destinations in Spain.',
    features: [
      '18-hole links-style course',
      'Par 71 / 6,200 meters',
      'Mar Menor & sea views',
      'Modern practice facilities',
      'Clubhouse restaurant & bar',
      'Pro shop with equipment rental',
      'Electric buggy hire',
      'Golf academy for all levels'
    ],
    highlights: ['Mar Menor views', 'Links-style', 'New developments', 'Beach access'],
    nearbyTowns: ['Los Alcázares', 'Torre Pacheco', 'San Javier', 'Santiago de la Ribera', 'Roda'],
    amenities: ['Clubhouse', 'Pro shop', 'Restaurant', 'Practice facilities', 'Swimming pool'],
    priceFrom: 180000,
    propertyCount: 34,
    gradient: 'from-blue-600 to-blue-800',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80&fit=crop',
    tier: 'popular',
    builders: [
      { name: 'Grupo Vermell', slug: 'grupo-vermell' },
      { name: 'AMAL', slug: 'amal' }
    ],
  },
  {
    id: 'hacienda-del-alamo',
    name: 'Hacienda del Álamo Golf Resort',
    shortName: 'Hacienda del Álamo',
    slug: 'hacienda-del-alamo',
    region: 'murcia',
    regionDisplay: 'Costa Cálida (Murcia)',
    town: 'Fuente Álamo',
    lat: 37.7234,
    lng: -1.1345,
    holes: 18,
    par: 72,
    designer: 'Dave Thomas',
    yearOpened: 2005,
    description: 'Hacienda del Álamo is an expansive resort in the Murcia countryside with a challenging desert-style championship course. Wide open spaces, strategic water features, and mountain backdrops create a unique golfing experience that differs from coastal courses.',
    story: 'Hacienda del Álamo offers some of the best value in the region. The resort combines quality golf with spacious living - villas here have generous plots and the resort has excellent facilities including pools, spa, and tennis courts. Popular with families seeking space and sunshine.',
    features: [
      '18-hole championship course',
      'Par 72 / 6,400 meters',
      'Desert-style layout',
      'Mountain backdrop views',
      'Full practice facilities',
      'Clubhouse & restaurant',
      'On-site spa & wellness',
      'Multiple swimming pools'
    ],
    highlights: ['Desert-style course', 'Spacious resort', 'Great value', 'Mountain views'],
    nearbyTowns: ['Fuente Álamo', 'Mazarrón', 'Cartagena', 'Torre Pacheco'],
    amenities: ['Clubhouse', 'Pro shop', 'Restaurant', 'Pool', 'Spa', 'Tennis', 'Gym'],
    priceFrom: 175000,
    propertyCount: 9,
    gradient: 'from-amber-700 to-amber-900',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80&fit=crop',
    tier: 'value',
  },
  {
    id: 'peraleja-golf',
    name: 'Peraleja Golf Resort',
    shortName: 'Peraleja',
    slug: 'peraleja-golf',
    region: 'murcia',
    regionDisplay: 'Costa Cálida (Murcia)',
    town: 'Sucina',
    lat: 37.8123,
    lng: -0.9567,
    holes: 18,
    par: 72,
    designer: 'European Golf Design',
    yearOpened: 2008,
    description: 'Peraleja Golf Resort is a modern championship course with excellent facilities and a growing residential community. The well-maintained fairways and challenging greens suit all levels of golfer.',
    story: 'Peraleja is developing rapidly with new phases of villas and apartments. The Peralia Origenes development offers modern designs with golf views. Close proximity to both Mar Menor beaches and Murcia city makes this an excellent choice for those wanting the best of both worlds.',
    features: [
      '18-hole championship course',
      'Par 72 layout',
      'Modern course design',
      'Excellent practice facilities',
      'Clubhouse with restaurant',
      'Swimming pool complex',
      'Growing community',
      'Family-friendly atmosphere'
    ],
    highlights: ['Modern resort', 'Growing community', 'Good facilities', 'Family-friendly'],
    nearbyTowns: ['Sucina', 'Los Alcázares', 'Torre Pacheco', 'Roda', 'San Javier'],
    amenities: ['Clubhouse', 'Pro shop', 'Restaurant', 'Pool', 'Practice area'],
    priceFrom: 170000,
    propertyCount: 7,
    gradient: 'from-green-600 to-green-800',
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&q=80&fit=crop',
    tier: 'growing',
  },
  {
    id: 'altorreal-golf',
    name: 'Altorreal Golf Club',
    shortName: 'Altorreal',
    slug: 'altorreal-golf',
    region: 'murcia',
    regionDisplay: 'Murcia Inland',
    town: 'Molina de Segura',
    lat: 38.0712,
    lng: -1.1234,
    holes: 18,
    par: 72,
    designer: 'Dave Thomas',
    yearOpened: 1995,
    description: 'Altorreal Golf Club is an established parkland course in the Murcia hills with mature trees and excellent conditioning. This is a more traditional layout that rewards accurate play and course management.',
    story: 'Taylor Wimpey España is building the luxury Allure development here - high-spec villas in a prestigious, mature setting. Altorreal attracts a more discerning buyer looking for established gardens, privacy, and a quality course on their doorstep.',
    features: [
      '18-hole parkland course',
      'Par 72 / mature layout',
      'Established trees & landscaping',
      'Championship conditioning',
      'Traditional clubhouse',
      'Tennis & paddle courts',
      'Prestigious setting',
      'Quiet residential area'
    ],
    highlights: ['Established course', 'Mature trees', 'Prestigious area', 'Taylor Wimpey'],
    nearbyTowns: ['Molina de Segura', 'Murcia City', 'Alcantarilla'],
    amenities: ['Clubhouse', 'Pro shop', 'Restaurant', 'Tennis', 'Paddle'],
    priceFrom: 350000,
    propertyCount: 4,
    gradient: 'from-emerald-700 to-emerald-900',
    image: 'https://images.unsplash.com/photo-1591491653056-4e9d563a42de?w=800&q=80&fit=crop',
    tier: 'premium',
    builders: [
      { name: 'Taylor Wimpey España', slug: 'taylor-wimpey' }
    ],
  },
  {
    id: 'roda-golf',
    name: 'Roda Golf & Beach Resort',
    shortName: 'Roda Golf',
    slug: 'roda-golf',
    region: 'murcia',
    regionDisplay: 'Costa Cálida (Murcia)',
    town: 'San Javier',
    lat: 37.7845,
    lng: -0.8012,
    holes: 18,
    par: 72,
    designer: 'Dave Thomas',
    yearOpened: 2006,
    description: 'Roda Golf & Beach Resort combines the best of both worlds - a quality championship course and proximity to Mar Menor beaches. The well-designed layout features water hazards and Mediterranean views.',
    story: 'Roda Golf perfectly combines beach and golf lifestyle. Just minutes from the warm waters of the Mar Menor and the beaches of San Javier, this resort offers modern residences with easy access to both course and coast. Popular with families and those seeking an active lifestyle.',
    features: [
      '18-hole championship course',
      'Par 72 layout',
      'Water features throughout',
      'Mediterranean views',
      'Beach proximity',
      'Modern clubhouse',
      'Beach club access',
      'Family facilities'
    ],
    highlights: ['Beach proximity', 'Mar Menor location', 'Resort lifestyle', 'Water features'],
    nearbyTowns: ['San Javier', 'Santiago de la Ribera', 'Los Alcázares', 'Roda', 'Torre Pacheco'],
    amenities: ['Clubhouse', 'Pro shop', 'Restaurant', 'Beach club', 'Pool'],
    priceFrom: 195000,
    propertyCount: 3,
    gradient: 'from-cyan-600 to-cyan-800',
    image: 'https://images.unsplash.com/photo-1596727362302-b8d891c42ab8?w=800&q=80&fit=crop',
    tier: 'lifestyle',
  },

  // ============================================
  // COSTA BLANCA SOUTH
  // ============================================
  {
    id: 'la-finca-golf',
    name: 'La Finca Golf Resort',
    shortName: 'La Finca',
    slug: 'la-finca-golf',
    region: 'south',
    regionDisplay: 'Costa Blanca South',
    town: 'Algorfa',
    lat: 38.0647,
    lng: -0.7928,
    holes: 18,
    par: 72,
    designer: 'Pepe Gancedo',
    yearOpened: 2002,
    website: 'https://www.lafincagolf.com',
    description: 'La Finca Golf Resort is one of Costa Blanca South\'s premier golf destinations. This challenging 18-hole, par 72 championship course winds through stunning Mediterranean landscapes with strategic water hazards and well-protected greens.',
    story: 'La Finca offers exceptional value with modern villas from multiple builders. The resort has a 4-star hotel, spa, and excellent facilities. Popular with buyers seeking the golf lifestyle without the coastal price premium - you can be on the beach in 15 minutes.',
    features: [
      '18-hole championship course',
      'Par 72 / 6,016 meters',
      'Pepe Gancedo design',
      'Driving range & practice facilities',
      'Professional golf academy',
      'Clubhouse with panoramic restaurant',
      'Fully stocked pro shop',
      '4-star resort hotel on-site'
    ],
    highlights: ['Mountain views', 'Great value', 'Multiple builders', 'Quality course'],
    nearbyTowns: ['Algorfa', 'La Finca', 'Quesada', 'Ciudad Quesada', 'Rojales', 'Guardamar'],
    hotel: 'La Finca Golf & Spa Hotel (4-star)',
    amenities: ['4-star hotel', 'Spa & wellness', 'Swimming pools', 'Tennis courts', 'Paddle tennis', 'Gym', 'Multiple restaurants'],
    greenFees: 'From €50 (residents) / €75 (visitors)',
    courseLength: '6,016m (white tees)',
    priceFrom: 150000,
    propertyCount: 14,
    gradient: 'from-teal-700 to-teal-900',
    image: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=800&q=80&fit=crop',
    tier: 'value',
    builders: [
      { name: 'Contrimar', slug: 'contrimar' }
    ],
    relatedDevelopments: [
      { name: 'Oasis Villas 2 La Finca', slug: 'oasis-villas-2-la-finca' }
    ],
  },
  {
    id: 'vistabella-golf',
    name: 'Vistabella Golf',
    shortName: 'Vistabella',
    slug: 'vistabella-golf',
    region: 'south',
    regionDisplay: 'Costa Blanca South',
    town: 'Orihuela',
    lat: 38.0234,
    lng: -0.7856,
    holes: 18,
    par: 72,
    designer: 'Manuel Piñero',
    yearOpened: 2007,
    description: 'Vistabella Golf is a championship course designed by Ryder Cup legend Manuel Piñero. A challenging but fair course with excellent conditioning and mountain views that rewards accurate shot-making.',
    story: 'Vistabella is a growing resort with new developments from quality builders. The course design by Ryder Cup captain Manuel Piñero ensures quality, while the inland location means better value than coastal resorts. New phases continue to be released.',
    features: [
      '18-hole championship course',
      'Par 72 layout',
      'Manuel Piñero design',
      'Mountain backdrop',
      'Excellent conditioning',
      'Modern clubhouse',
      'Swimming pool',
      'Practice facilities'
    ],
    highlights: ['Piñero design', 'Growing resort', 'New developments', 'Mountain setting'],
    nearbyTowns: ['Vistabella', 'Quesada', 'Rojales', 'Algorfa', 'San Miguel de Salinas', 'Orihuela'],
    amenities: ['Clubhouse', 'Pro shop', 'Restaurant', 'Pool', 'Practice facilities'],
    priceFrom: 180000,
    propertyCount: 9,
    gradient: 'from-lime-700 to-lime-900',
    image: 'https://images.unsplash.com/photo-1500932334442-8761ee4810a7?w=800&q=80&fit=crop',
    tier: 'growing',
  },
  {
    id: 'lo-romero-golf',
    name: 'Lo Romero Golf',
    shortName: 'Lo Romero',
    slug: 'lo-romero-golf',
    region: 'south',
    regionDisplay: 'Costa Blanca South',
    town: 'Pilar de la Horadada',
    lat: 37.8456,
    lng: -0.7812,
    holes: 18,
    par: 72,
    designer: 'David Thomas',
    yearOpened: 2008,
    description: 'Lo Romero Golf is a modern championship course near the Mar Menor. Wide fairways and strategic bunkering make it enjoyable for all levels while still offering challenge for low handicappers.',
    story: 'Lo Romero is developing with new build options in a great location. Close to both Costa Blanca beaches and Mar Menor, it offers good connectivity and a modern golfing experience. The course is well-maintained and less crowded than coastal courses.',
    features: [
      '18-hole championship course',
      'Par 72 layout',
      'Modern course design',
      'Wide fairways',
      'Strategic bunkering',
      'Good practice facilities',
      'Swimming pool',
      'Near Mar Menor'
    ],
    highlights: ['Modern course', 'Near Mar Menor', 'Good facilities', 'New developments'],
    nearbyTowns: ['Pilar de la Horadada', 'San Pedro del Pinatar', 'Torre de la Horadada', 'Lo Pagan'],
    amenities: ['Clubhouse', 'Pro shop', 'Restaurant', 'Pool', 'Practice area'],
    priceFrom: 185000,
    propertyCount: 2,
    gradient: 'from-sky-700 to-sky-900',
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&q=80&fit=crop',
    tier: 'value',
  },
  {
    id: 'la-marquesa-golf',
    name: 'Golf La Marquesa',
    shortName: 'La Marquesa',
    slug: 'la-marquesa-golf',
    region: 'south',
    regionDisplay: 'Costa Blanca South',
    town: 'Rojales',
    lat: 38.0512,
    lng: -0.7823,
    holes: 18,
    par: 72,
    designer: 'Juanjo Losáñez',
    yearOpened: 1989,
    description: 'Golf La Marquesa is an established course in the heart of the Vega Baja region. Tree-lined fairways and water features create an attractive parkland layout that has matured beautifully over the years.',
    story: 'La Marquesa offers affordable golf resort living with the Terrazas Golf development providing modern apartments overlooking the course. An established community with a friendly atmosphere and one of the most accessible golf lifestyles in the region.',
    features: [
      '18-hole parkland course',
      'Par 72 layout',
      'Established tree-lined fairways',
      'Water features',
      'Central Vega Baja location',
      'Traditional clubhouse',
      'Friendly atmosphere',
      'Affordable green fees'
    ],
    highlights: ['Established course', 'Affordable options', 'Central location', 'Parkland style'],
    nearbyTowns: ['Rojales', 'Quesada', 'Ciudad Quesada', 'Guardamar', 'Algorfa'],
    amenities: ['Clubhouse', 'Pro shop', 'Restaurant', 'Practice area'],
    priceFrom: 165000,
    propertyCount: 1,
    gradient: 'from-green-700 to-green-900',
    image: 'https://images.unsplash.com/photo-1595367135281-77f2c5d3c25c?w=800&q=80&fit=crop',
    tier: 'value',
  },

  // ============================================
  // COSTA BLANCA NORTH
  // ============================================
  {
    id: 'puig-campana-golf',
    name: 'Villaitana Golf (Puig Campana)',
    shortName: 'Villaitana',
    slug: 'puig-campana-golf',
    region: 'north',
    regionDisplay: 'Costa Blanca North',
    town: 'Finestrat',
    lat: 38.5523,
    lng: -0.0934,
    holes: 36,
    par: 72,
    designer: 'Jack Nicklaus & Severiano Ballesteros',
    yearOpened: 2009,
    website: 'https://www.villaitana.com',
    description: 'Villaitana offers two championship courses designed by golfing legends. The Levante course by Jack Nicklaus is more challenging, while the Poniente course suits all levels. The dramatic Puig Campana mountain provides a stunning backdrop.',
    story: 'The only 36-hole resort in Costa Blanca offers luxury living in a stunning setting. Prime Home Alicante is developing here with the Green & Blue project - premium properties with access to world-class golf, a 5-star Meliá hotel, and proximity to Benidorm.',
    features: [
      '36 holes (two courses)',
      'Jack Nicklaus design (Levante)',
      'Severiano Ballesteros design (Poniente)',
      'Dramatic Puig Campana views',
      '5-star Meliá Villaitana hotel',
      'Full-service spa',
      'Multiple restaurants',
      'Premium practice facilities'
    ],
    highlights: ['36 holes', 'Nicklaus & Ballesteros', 'Mountain views', '5-star Meliá'],
    nearbyTowns: ['Finestrat', 'Benidorm', 'La Nucia', 'Alfaz del Pi', 'Altea'],
    hotel: 'Meliá Villaitana 5-star',
    amenities: ['Two clubhouses', 'Pro shop', 'Meliá Hotel', 'Spa', 'Restaurants', 'Pool', 'Tennis'],
    priceFrom: 350000,
    propertyCount: 3,
    gradient: 'from-indigo-700 to-indigo-900',
    image: 'https://images.unsplash.com/photo-1611374243147-44a702c2d44c?w=800&q=80&fit=crop',
    tier: 'premium',
    builders: [
      { name: 'Prime Home Alicante', slug: 'prime-home-alicante' }
    ],
    relatedDevelopments: [
      { name: 'Green & Blue Villaitana', slug: 'green-blue-villaitana' }
    ],
  },

  // ============================================
  // ALMERÍA
  // ============================================
  {
    id: 'aguilon-golf',
    name: 'Aguilón Golf Resort',
    shortName: 'Aguilón',
    slug: 'aguilon-golf',
    region: 'almeria',
    regionDisplay: 'Almería',
    town: 'Pulpí',
    lat: 37.4012,
    lng: -1.6823,
    holes: 18,
    par: 72,
    designer: 'Manuel Piñero',
    yearOpened: 2009,
    description: 'Aguilón Golf Resort features a desert-links course designed by Ryder Cup captain Manuel Piñero. The dramatic landscape offers mountain and sea views from multiple holes, creating a unique golfing experience.',
    story: 'Aguilón offers a unique setting between mountains and sea in the unspoilt Almería province. New developments here provide excellent value with spectacular views. Lower profile than Costa Blanca but increasingly popular with those seeking authenticity and value.',
    features: [
      '18-hole desert-links course',
      'Par 72 / Manuel Piñero design',
      'Mountain & sea views',
      'Dramatic landscape',
      'Desert-style bunkers',
      'Modern clubhouse',
      'Great value green fees',
      'Uncrowded rounds'
    ],
    highlights: ['Piñero design', 'Sea & mountain views', 'Unique landscape', 'Great value'],
    nearbyTowns: ['Pulpí', 'San Juan de los Terreros', 'Vera', 'Águilas'],
    amenities: ['Clubhouse', 'Pro shop', 'Restaurant', 'Pool'],
    priceFrom: 200000,
    propertyCount: 4,
    gradient: 'from-orange-700 to-orange-900',
    image: 'https://images.unsplash.com/photo-1600155537657-d064a60f5f12?w=800&q=80&fit=crop',
    tier: 'value',
  },
  {
    id: 'desert-springs',
    name: 'Desert Springs Golf Club',
    shortName: 'Desert Springs',
    slug: 'desert-springs',
    region: 'almeria',
    regionDisplay: 'Almería',
    town: 'Cuevas del Almanzora',
    lat: 37.3156,
    lng: -1.7234,
    holes: 18,
    par: 72,
    designer: 'Indiana Golf Course Design',
    yearOpened: 2001,
    description: 'Desert Springs is an award-winning desert course unique in Europe. The Arizona-style layout features cacti, dry river beds, and stunning mountain scenery - a truly different golfing experience.',
    story: 'Desert Springs offers a truly unique Spanish golf experience - the only desert golf course in Europe. Attracts golfers seeking something different, with excellent year-round weather and a distinctive resort atmosphere. Properties here offer something genuinely different.',
    features: [
      '18-hole desert course',
      'Par 72 / unique in Europe',
      'Arizona-style landscape',
      'Cacti & desert flora',
      'Mountain scenery',
      'Award-winning design',
      'Year-round playability',
      'Full resort facilities'
    ],
    highlights: ['Unique desert style', 'Award-winning', 'Spectacular scenery', 'Year-round play'],
    nearbyTowns: ['Cuevas del Almanzora', 'Vera', 'Mojácar', 'Garrucha'],
    amenities: ['Clubhouse', 'Pro shop', 'Restaurants', 'Pool', 'Spa', 'Tennis'],
    priceFrom: 250000,
    propertyCount: 2,
    gradient: 'from-yellow-700 to-yellow-900',
    image: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800&q=80&fit=crop',
    tier: 'unique',
  },
];

// Helper functions
export function getGolfCourseBySlug(slug: string): GolfCourse | undefined {
  return GOLF_COURSES.find(course => course.slug === slug);
}

export function getGolfCoursesByRegion(region: 'north' | 'south' | 'murcia' | 'almeria'): GolfCourse[] {
  return GOLF_COURSES.filter(course => course.region === region);
}

export function getGolfCoursesNearTown(town: string): GolfCourse[] {
  const townLower = town.toLowerCase();
  return GOLF_COURSES.filter(course =>
    course.nearbyTowns.some(t => t.toLowerCase() === townLower) ||
    course.town.toLowerCase() === townLower
  );
}

export function getAllGolfSlugs(): string[] {
  return GOLF_COURSES.map(course => course.slug);
}

// Get total property count across all courses
export function getTotalGolfProperties(): number {
  return GOLF_COURSES.reduce((sum, course) => sum + course.propertyCount, 0);
}

// Get courses sorted by property count
export function getCoursesByPropertyCount(): GolfCourse[] {
  return [...GOLF_COURSES].sort((a, b) => b.propertyCount - a.propertyCount);
}

// For Footer display - show courses with most properties
export const FOOTER_GOLF_COURSES = {
  south: GOLF_COURSES
    .filter(c => c.region === 'south')
    .sort((a, b) => b.propertyCount - a.propertyCount)
    .slice(0, 4)
    .map(c => ({ name: c.shortName, slug: c.slug })),
  murcia: GOLF_COURSES
    .filter(c => c.region === 'murcia')
    .sort((a, b) => b.propertyCount - a.propertyCount)
    .slice(0, 4)
    .map(c => ({ name: c.shortName, slug: c.slug })),
  other: GOLF_COURSES
    .filter(c => c.region === 'north' || c.region === 'almeria')
    .sort((a, b) => b.propertyCount - a.propertyCount)
    .slice(0, 4)
    .map(c => ({ name: c.shortName, slug: c.slug })),
};
