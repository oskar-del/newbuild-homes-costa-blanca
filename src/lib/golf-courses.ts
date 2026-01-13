// Golf Courses in Costa Blanca
// Used for golf pages, property filtering, and SEO

export interface GolfCourse {
  id: string;
  name: string;
  slug: string;
  region: 'north' | 'south';
  town: string;
  lat: number;
  lng: number;
  holes: number;
  par?: number;
  designer?: string;
  yearOpened?: number;
  website?: string;
  description: string;
  features: string[];
  nearbyTowns: string[]; // Towns to filter properties by
  image?: string;
}

export const GOLF_COURSES: GolfCourse[] = [
  // Costa Blanca South
  {
    id: 'la-finca',
    name: 'La Finca Golf Resort',
    slug: 'la-finca',
    region: 'south',
    town: 'Algorfa',
    lat: 38.0647,
    lng: -0.7928,
    holes: 18,
    par: 72,
    designer: 'Pepe Gancedo',
    yearOpened: 2002,
    website: 'https://www.lafincagolf.com',
    description: 'La Finca Golf Resort is one of Costa Blanca South\'s premier golf destinations. This challenging 18-hole, par 72 championship course winds through stunning landscapes with strategic water hazards and well-protected greens. The resort offers excellent practice facilities, a professional golf academy, and a welcoming clubhouse with panoramic views.',
    features: ['18 holes', 'Par 72', 'Driving range', 'Pro shop', 'Restaurant', 'Golf academy', 'Buggy rental'],
    nearbyTowns: ['Algorfa', 'Quesada', 'Ciudad Quesada', 'Rojales', 'Guardamar'],
    image: '/images/golf/la-finca-golf.jpg',
  },
  {
    id: 'villamartin',
    name: 'Villamartín Golf',
    slug: 'villamartin',
    region: 'south',
    town: 'Villamartín',
    lat: 37.9402,
    lng: -0.7645,
    holes: 18,
    par: 72,
    designer: 'Putman & Williams',
    yearOpened: 1972,
    website: 'https://www.villamartingolf.com',
    description: 'Villamartín Golf is one of the original Costa Blanca golf courses and remains one of the most popular. This mature, tree-lined course offers a classic golfing experience with its well-established fairways and challenging greens. The famous Villamartín Plaza nearby offers excellent dining and nightlife.',
    features: ['18 holes', 'Par 72', 'Driving range', 'Pro shop', 'Clubhouse', 'Restaurant', 'Golf lessons'],
    nearbyTowns: ['Villamartin', 'Orihuela Costa', 'La Zenia', 'Playa Flamenca', 'Torrevieja'],
    image: '/images/golf/villamartin-golf.jpg',
  },
  {
    id: 'las-ramblas',
    name: 'Las Ramblas Golf',
    slug: 'las-ramblas',
    region: 'south',
    town: 'Orihuela Costa',
    lat: 37.9356,
    lng: -0.7512,
    holes: 18,
    par: 72,
    designer: 'Sterling & Martin',
    yearOpened: 1991,
    website: 'https://www.lasramblasgolf.com',
    description: 'Las Ramblas Golf is known for its dramatic elevation changes and stunning mountain views. This challenging course rewards accurate shot-making with its narrow fairways and strategic bunker placement. Part of the Orihuela Costa golf trio alongside Villamartín and Campoamor.',
    features: ['18 holes', 'Par 72', 'Practice facilities', 'Pro shop', 'Clubhouse', 'Mountain views'],
    nearbyTowns: ['Orihuela Costa', 'Villamartin', 'Campoamor', 'Pilar de la Horadada'],
    image: '/images/golf/las-ramblas-golf.jpg',
  },
  {
    id: 'campoamor',
    name: 'Campoamor Golf',
    slug: 'campoamor',
    region: 'south',
    town: 'Orihuela Costa',
    lat: 37.8789,
    lng: -0.7634,
    holes: 18,
    par: 72,
    designer: 'José María Olazábal',
    yearOpened: 1989,
    website: 'https://www.campoamorgolf.com',
    description: 'Designed by Ryder Cup legend José María Olazábal, Campoamor Golf offers a truly championship experience. The course features well-designed holes that test all aspects of your game, with strategic bunkering and excellent green complexes. The stunning Mediterranean setting adds to the experience.',
    features: ['18 holes', 'Par 72', 'Driving range', 'Pro shop', 'Restaurant', 'Buggy rental', 'Mediterranean views'],
    nearbyTowns: ['Campoamor', 'Orihuela Costa', 'Pilar de la Horadada', 'Mil Palmeras'],
    image: '/images/golf/campoamor-golf.jpg',
  },
  {
    id: 'vistabella',
    name: 'Vistabella Golf',
    slug: 'vistabella',
    region: 'south',
    town: 'Vistabella',
    lat: 38.0234,
    lng: -0.7856,
    holes: 18,
    par: 72,
    yearOpened: 2007,
    description: 'Vistabella Golf is a modern course that offers excellent value and playability for golfers of all levels. The well-maintained layout features wide fairways and challenging greens, making it popular with both residents and visitors to the Costa Blanca.',
    features: ['18 holes', 'Par 72', 'Driving range', 'Pro shop', 'Restaurant', 'Golf academy'],
    nearbyTowns: ['Vistabella', 'Quesada', 'Rojales', 'Algorfa', 'San Miguel de Salinas'],
    image: '/images/golf/vistabella-golf.jpg',
  },
  {
    id: 'la-marquesa',
    name: 'La Marquesa Golf',
    slug: 'la-marquesa',
    region: 'south',
    town: 'Quesada',
    lat: 38.0512,
    lng: -0.7823,
    holes: 18,
    par: 72,
    yearOpened: 2000,
    description: 'La Marquesa Golf is a friendly, well-designed course popular with both beginners and experienced golfers. The layout offers variety with its mix of challenging holes and more forgiving fairways, all set against the backdrop of the Costa Blanca countryside.',
    features: ['18 holes', 'Par 72', 'Practice area', 'Pro shop', 'Clubhouse bar', 'Restaurant'],
    nearbyTowns: ['Quesada', 'Ciudad Quesada', 'Rojales', 'Algorfa', 'Guardamar'],
    image: '/images/golf/la-marquesa-golf.jpg',
  },
  {
    id: 'lo-romero',
    name: 'Lo Romero Golf',
    slug: 'lo-romero',
    region: 'south',
    town: 'Pilar de la Horadada',
    lat: 37.8456,
    lng: -0.7812,
    holes: 18,
    par: 72,
    yearOpened: 2008,
    description: 'Lo Romero Golf is a modern championship course featuring spectacular views of the Mediterranean Sea and surrounding countryside. The course offers a challenging yet enjoyable experience with its well-designed layout and excellent conditioning.',
    features: ['18 holes', 'Par 72', 'Sea views', 'Driving range', 'Pro shop', 'Restaurant'],
    nearbyTowns: ['Pilar de la Horadada', 'San Pedro del Pinatar', 'Torre de la Horadada'],
    image: '/images/golf/lo-romero-golf.jpg',
  },
  
  // Costa Blanca North
  {
    id: 'javea',
    name: 'Jávea Golf Club',
    slug: 'javea',
    region: 'north',
    town: 'Jávea',
    lat: 38.7612,
    lng: 0.1234,
    holes: 9,
    par: 34,
    yearOpened: 1981,
    website: 'https://www.clubdegolfjavea.com',
    description: 'Jávea Golf Club is a charming 9-hole course set against the dramatic backdrop of the Montgó mountain. While compact, the course offers a challenging and scenic round with its undulating terrain and stunning views. The friendly club atmosphere and excellent facilities make it a favorite among local residents.',
    features: ['9 holes', 'Par 34', 'Mountain views', 'Clubhouse', 'Restaurant', 'Pro shop'],
    nearbyTowns: ['Javea', 'Xabia', 'Denia', 'Benitachell', 'Cumbre del Sol'],
    image: '/images/golf/javea-golf.jpg',
  },
  {
    id: 'oliva-nova',
    name: 'Oliva Nova Golf',
    slug: 'oliva-nova',
    region: 'north',
    town: 'Oliva',
    lat: 38.9234,
    lng: -0.0612,
    holes: 18,
    par: 72,
    designer: 'Severiano Ballesteros',
    yearOpened: 1995,
    website: 'https://www.olivanova.com',
    description: 'Designed by the legendary Severiano Ballesteros, Oliva Nova Golf is one of Spain\'s finest courses. This championship layout combines strategic challenge with natural beauty, featuring mature palm trees, water hazards, and Mediterranean vegetation. The beachside resort setting offers a complete golf vacation experience.',
    features: ['18 holes', 'Par 72', 'Championship course', 'Beach resort', 'Driving range', 'Golf academy', 'Luxury hotel'],
    nearbyTowns: ['Oliva', 'Denia', 'Ondara', 'Pego'],
    image: '/images/golf/oliva-nova-golf.jpg',
  },
  {
    id: 'la-sella',
    name: 'La Sella Golf Resort',
    slug: 'la-sella',
    region: 'north',
    town: 'Denia',
    lat: 38.8123,
    lng: 0.0345,
    holes: 27,
    par: 72,
    designer: 'José María Olazábal',
    yearOpened: 1991,
    website: 'https://www.lasellagolf.com',
    description: 'La Sella Golf Resort offers 27 holes of challenging golf designed by José María Olazábal. Set in the foothills with stunning mountain and sea views, the three 9-hole courses provide variety and challenge for all skill levels. The resort includes a luxury hotel, spa, and extensive practice facilities.',
    features: ['27 holes', 'Mountain views', 'Resort hotel', 'Spa', 'Driving range', 'Golf academy', 'Multiple restaurants'],
    nearbyTowns: ['Denia', 'Javea', 'Pedreguer', 'Gata de Gorgos'],
    image: '/images/golf/la-sella-golf.jpg',
  },
  {
    id: 'altea-club',
    name: 'Altea Club de Golf Don Cayo',
    slug: 'altea',
    region: 'north',
    town: 'Altea',
    lat: 38.6023,
    lng: -0.0512,
    holes: 9,
    par: 33,
    yearOpened: 1974,
    description: 'Don Cayo Golf Club enjoys one of the most spectacular settings on the Costa Blanca, with panoramic views over Altea Bay and the Mediterranean. This 9-hole course winds through orange groves and offers a unique golfing experience in a truly picturesque location.',
    features: ['9 holes', 'Par 33', 'Sea views', 'Historic course', 'Clubhouse', 'Restaurant'],
    nearbyTowns: ['Altea', 'Albir', 'Alfaz del Pi', 'Benidorm'],
    image: '/images/golf/altea-golf.jpg',
  },
  {
    id: 'villaitana',
    name: 'Villaitana Golf',
    slug: 'villaitana',
    region: 'north',
    town: 'Benidorm',
    lat: 38.5523,
    lng: -0.0934,
    holes: 36,
    par: 72,
    designer: 'Jack Nicklaus & Bernhard Langer',
    yearOpened: 2008,
    website: 'https://www.villaitana.com',
    description: 'Villaitana offers two championship courses: the Nicklaus-designed Levante course and the Langer-designed Poniente course. This luxury resort destination features stunning views of Benidorm\'s skyline and the Mediterranean, with world-class facilities and a 5-star hotel.',
    features: ['36 holes', 'Two championship courses', 'Jack Nicklaus design', 'Bernhard Langer design', '5-star hotel', 'Spa', 'Multiple restaurants'],
    nearbyTowns: ['Benidorm', 'Finestrat', 'La Nucia', 'Alfaz del Pi'],
    image: '/images/golf/villaitana-golf.jpg',
  },
];

// Helper functions
export function getGolfCourseBySlug(slug: string): GolfCourse | undefined {
  return GOLF_COURSES.find(course => course.slug === slug);
}

export function getGolfCoursesByRegion(region: 'north' | 'south'): GolfCourse[] {
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

// For Footer display
export const FOOTER_GOLF_COURSES = {
  south: [
    { name: 'La Finca Golf', slug: 'la-finca' },
    { name: 'Villamartín Golf', slug: 'villamartin' },
    { name: 'Las Ramblas Golf', slug: 'las-ramblas' },
    { name: 'Campoamor Golf', slug: 'campoamor' },
  ],
  north: [
    { name: 'Oliva Nova Golf', slug: 'oliva-nova' },
    { name: 'La Sella Golf', slug: 'la-sella' },
    { name: 'Villaitana Golf', slug: 'villaitana' },
    { name: 'Jávea Golf', slug: 'javea' },
  ],
};
