"use strict";
/**
 * Sample Property Data
 *
 * Used for development and as fallback when XML feed is unavailable
 * Includes featured developments with realistic data
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.golfCourses = exports.sampleAreas = exports.sampleBuilders = exports.featuredDevelopments = exports.sampleDevelopments = void 0;
// Featured developments with complete data
exports.sampleDevelopments = [
    {
        slug: 'oasis-golf-la-finca',
        name: 'Oasis Golf La Finca',
        developer: 'Contrimar',
        developerSlug: 'contrimar',
        town: 'Algorfa',
        province: 'Alicante',
        zone: 'La Finca Golf Resort',
        propertyCount: 40,
        priceFrom: 261000,
        priceTo: 298000,
        types: ['apartment'],
        bedroomRange: { min: 2, max: 3 },
        statuses: ['under-construction'],
        properties: []
    },
    {
        slug: 'oasis-laguna-ii',
        name: 'Oasis Laguna II',
        developer: 'Contrimar',
        developerSlug: 'contrimar',
        town: 'Guardamar del Segura',
        province: 'Alicante',
        zone: 'El Raso',
        propertyCount: 138,
        priceFrom: 222000,
        priceTo: 261000,
        types: ['apartment'],
        bedroomRange: { min: 2, max: 3 },
        statuses: ['under-construction', 'off-plan'],
        properties: []
    },
    {
        slug: 'oasis-villas-sun',
        name: 'Oasis Villas Sun',
        developer: 'Contrimar',
        developerSlug: 'contrimar',
        town: 'Torrevieja',
        province: 'Alicante',
        zone: 'La Siesta',
        propertyCount: 12,
        priceFrom: 389000,
        priceTo: 425000,
        types: ['villa'],
        bedroomRange: { min: 3, max: 3 },
        statuses: ['under-construction'],
        properties: []
    },
    {
        slug: 'alegria-24',
        name: 'Alegría 24',
        developer: 'Alegría',
        developerSlug: 'alegria',
        town: 'Torrevieja',
        province: 'Alicante',
        zone: 'Parque de las Naciones',
        propertyCount: 24,
        priceFrom: 195000,
        priceTo: 285000,
        types: ['apartment', 'penthouse'],
        bedroomRange: { min: 2, max: 3 },
        statuses: ['under-construction'],
        properties: []
    },
    {
        slug: 'optimus-iii',
        name: 'Optimus III',
        developer: 'AMAY',
        developerSlug: 'amay',
        town: 'Benijofar',
        province: 'Alicante',
        zone: '',
        propertyCount: 18,
        priceFrom: 189000,
        priceTo: 245000,
        types: ['apartment'],
        bedroomRange: { min: 2, max: 3 },
        statuses: ['under-construction'],
        properties: []
    },
    {
        slug: 'atlantis',
        name: 'Atlantis',
        developer: 'AEDAS Homes',
        developerSlug: 'aedas-homes',
        town: 'Santa Pola',
        province: 'Alicante',
        zone: 'Gran Alacant',
        propertyCount: 85,
        priceFrom: 245000,
        priceTo: 385000,
        types: ['apartment', 'penthouse'],
        bedroomRange: { min: 2, max: 4 },
        statuses: ['under-construction'],
        properties: []
    },
    {
        slug: 'residencial-h',
        name: 'Residencial H',
        developer: 'Prime Home Alicante',
        developerSlug: 'prime-home-alicante',
        town: 'Benijofar',
        province: 'Alicante',
        zone: 'Fuentex',
        propertyCount: 32,
        priceFrom: 175000,
        priceTo: 235000,
        types: ['apartment'],
        bedroomRange: { min: 2, max: 3 },
        statuses: ['under-construction'],
        properties: []
    },
    {
        slug: 'oasis-guardamar',
        name: 'Oasis Guardamar',
        developer: 'Alteco Invest',
        developerSlug: 'alteco-invest',
        town: 'Guardamar del Segura',
        province: 'Alicante',
        zone: '',
        propertyCount: 45,
        priceFrom: 215000,
        priceTo: 289000,
        types: ['apartment'],
        bedroomRange: { min: 2, max: 3 },
        statuses: ['under-construction'],
        properties: []
    }
];
// Featured developments for homepage (detailed data)
exports.featuredDevelopments = [
    {
        slug: 'oasis-golf-la-finca',
        name: 'Oasis Golf La Finca',
        developer: 'Contrimar',
        location: 'Algorfa, La Finca Golf Resort',
        description: 'Frontline golf apartments at La Finca Golf Resort. 2-3 bedroom apartments with private gardens or solariums, communal pool, gym, and turnkey furnished.',
        priceFrom: 261000,
        status: 'under-construction',
        completionDate: 'December 2025 / July 2026',
        propertyTypes: ['2-bed apartments', '3-bed apartments'],
        highlights: [
            'Frontline golf location',
            'Fully furnished & turnkey',
            'Private gardens up to 264m²',
            'Roof solariums up to 108m²',
            'Communal pool & gym'
        ],
        distances: {
            golf: 0,
            beach: 14,
            airport: 40
        },
        image: '/images/developments/oasis-golf-la-finca.jpg'
    },
    {
        slug: 'oasis-laguna-ii',
        name: 'Oasis Laguna II',
        developer: 'Contrimar',
        location: 'Guardamar del Segura, El Raso',
        description: 'Licensed tourist apartments with professional rental management. Views over Laguna de La Mata nature reserve. VAT recovery available for investors.',
        priceFrom: 222000,
        status: 'under-construction',
        completionDate: 'September 2026 - January 2027',
        propertyTypes: ['2-bed apartments', '3-bed apartments'],
        highlights: [
            'Tourist license included',
            'Professional rental management',
            '21% VAT recovery eligible',
            'Up to 4 months personal use',
            'Laguna views'
        ],
        distances: {
            beach: 3,
            airport: 35,
            golf: 15
        },
        image: '/images/developments/oasis-laguna-ii.jpg'
    },
    {
        slug: 'oasis-villas-sun',
        name: 'Oasis Villas Sun',
        developer: 'Contrimar',
        location: 'Torrevieja, La Siesta',
        description: 'Luxury detached villas with private pools. Modern design with high-quality finishes, spacious plots, and excellent location close to amenities.',
        priceFrom: 389000,
        status: 'under-construction',
        completionDate: 'Q2 2026',
        propertyTypes: ['3-bed villas'],
        highlights: [
            'Private swimming pool',
            'Detached villa',
            'Modern design',
            'Spacious plots',
            'Close to beaches'
        ],
        distances: {
            beach: 5,
            airport: 45,
            golf: 10
        },
        image: '/images/developments/oasis-villas-sun.jpg'
    }
];
// Sample builders
exports.sampleBuilders = [
    {
        slug: 'contrimar',
        name: 'Contrimar',
        fullName: 'Grupo Contrimar',
        established: 2003,
        description: 'One of Costa Blanca\'s most respected developers with over 20 years of experience delivering quality new build properties. Known for on-time completion and excellent after-sales service.',
        projectsCompleted: 25,
        activeDevelopments: 3,
        specializations: ['Golf properties', 'Tourist apartments', 'Villas'],
        developments: ['oasis-golf-la-finca', 'oasis-laguna-ii', 'oasis-villas-sun'],
        logo: '/images/builders/contrimar-logo.png'
    },
    {
        slug: 'aedas-homes',
        name: 'AEDAS Homes',
        fullName: 'AEDAS Homes S.A.',
        established: 2016,
        description: 'One of Spain\'s leading property developers, listed on the Spanish Stock Exchange. Known for large-scale residential developments with premium specifications.',
        projectsCompleted: 150,
        activeDevelopments: 45,
        specializations: ['Large residential developments', 'Urban regeneration'],
        developments: ['atlantis'],
        logo: '/images/builders/aedas-homes-logo.png'
    },
    {
        slug: 'taylor-wimpey-espana',
        name: 'Taylor Wimpey España',
        fullName: 'Taylor Wimpey España',
        established: 1958,
        description: 'The Spanish arm of Taylor Wimpey, one of the UK\'s largest homebuilders. Over 65 years of experience building holiday homes for international buyers.',
        projectsCompleted: 200,
        activeDevelopments: 12,
        specializations: ['British buyers', 'Holiday homes', 'Golf resorts'],
        developments: [],
        logo: '/images/builders/taylor-wimpey-logo.png'
    }
];
// Sample areas
exports.sampleAreas = [
    {
        slug: 'torrevieja',
        name: 'Torrevieja',
        region: 'Costa Blanca South',
        province: 'Alicante',
        description: 'Popular coastal city with excellent amenities, salt lakes, and vibrant expat community. Great beaches and year-round sunshine.',
        population: 84000,
        propertyCount: 45,
        priceFrom: 175000,
        highlights: ['Salt lakes', 'Beaches', 'Large expat community', 'Good healthcare'],
        distanceToAirport: 45,
        image: '/images/areas/torrevieja.jpg'
    },
    {
        slug: 'orihuela-costa',
        name: 'Orihuela Costa',
        region: 'Costa Blanca South',
        province: 'Alicante',
        description: 'Modern resort area with beautiful beaches, golf courses, and La Zenia Boulevard shopping center. Popular with families and retirees.',
        population: 35000,
        propertyCount: 38,
        priceFrom: 185000,
        highlights: ['La Zenia Boulevard', 'Multiple golf courses', 'Blue flag beaches', 'New developments'],
        distanceToAirport: 50,
        image: '/images/areas/orihuela-costa.jpg'
    },
    {
        slug: 'guardamar-del-segura',
        name: 'Guardamar del Segura',
        region: 'Costa Blanca South',
        province: 'Alicante',
        description: 'Authentic Spanish town with stunning pine-backed beaches and the unique Laguna de La Mata nature reserve. Growing expat community.',
        population: 16000,
        propertyCount: 22,
        priceFrom: 195000,
        highlights: ['Pine forests', 'Nature reserve', 'Authentic Spanish feel', 'Excellent beaches'],
        distanceToAirport: 35,
        image: '/images/areas/guardamar.jpg'
    },
    {
        slug: 'algorfa',
        name: 'Algorfa',
        region: 'Costa Blanca South',
        province: 'Alicante',
        description: 'Home to La Finca Golf Resort, this inland town offers great value properties and a relaxed lifestyle close to beaches and amenities.',
        population: 5000,
        propertyCount: 15,
        priceFrom: 195000,
        highlights: ['La Finca Golf', 'Affordable prices', 'Quiet lifestyle', 'Close to coast'],
        distanceToAirport: 40,
        image: '/images/areas/algorfa.jpg'
    },
    {
        slug: 'benidorm',
        name: 'Benidorm',
        region: 'Costa Blanca North',
        province: 'Alicante',
        description: 'Vibrant resort city with skyscrapers, beautiful beaches, and excellent entertainment. Great for rental investment.',
        population: 68000,
        propertyCount: 28,
        priceFrom: 195000,
        highlights: ['Beaches', 'Entertainment', 'Rental potential', 'Terra Mítica'],
        distanceToAirport: 45,
        image: '/images/areas/benidorm.jpg'
    },
    {
        slug: 'finestrat',
        name: 'Finestrat',
        region: 'Costa Blanca North',
        province: 'Alicante',
        description: 'Charming town behind Benidorm with mountain views, traditional Spanish village, and modern urbanizations.',
        population: 8000,
        propertyCount: 18,
        priceFrom: 225000,
        highlights: ['Mountain views', 'Traditional village', 'Close to Benidorm', 'Puig Campana'],
        distanceToAirport: 50,
        image: '/images/areas/finestrat.jpg'
    },
    {
        slug: 'santa-pola',
        name: 'Santa Pola',
        region: 'Costa Blanca South',
        province: 'Alicante',
        description: 'Traditional fishing town with beautiful beaches, salt flats, and ferry to Tabarca Island. Mix of Spanish and international residents.',
        population: 35000,
        propertyCount: 20,
        priceFrom: 215000,
        highlights: ['Tabarca Island', 'Salt flats', 'Fishing port', 'Family beaches'],
        distanceToAirport: 20,
        image: '/images/areas/santa-pola.jpg'
    },
    {
        slug: 'benijofar',
        name: 'Benijófar',
        region: 'Costa Blanca South',
        province: 'Alicante',
        description: 'Small inland town offering excellent value properties. Growing expat community with good local amenities.',
        population: 4500,
        propertyCount: 25,
        priceFrom: 165000,
        highlights: ['Excellent value', 'Sunday market', 'Close to beaches', 'Growing community'],
        distanceToAirport: 45,
        image: '/images/areas/benijofar.jpg'
    }
];
// Golf courses data
exports.golfCourses = [
    {
        name: 'La Finca Golf',
        town: 'Algorfa',
        holes: 18,
        designer: 'Justo Vecino Quesada',
        style: 'Championship links-style',
        developmentsNearby: ['oasis-golf-la-finca'],
        availability: 'Frontline properties available'
    },
    {
        name: 'Vistabella Golf',
        town: 'Orihuela Costa',
        holes: 18,
        designer: 'Manuel Piñero',
        style: 'Desert-style course',
        developmentsNearby: [],
        availability: 'Properties within 10 min'
    },
    {
        name: 'Villamartín Golf',
        town: 'Orihuela Costa',
        holes: 18,
        designer: 'Robert Putman',
        style: 'Traditional parkland',
        developmentsNearby: [],
        availability: 'Properties within 5 min'
    },
    {
        name: 'Las Colinas Golf',
        town: 'Campoamor',
        holes: 18,
        designer: 'Cabell Robinson',
        style: 'Award-winning design',
        developmentsNearby: [],
        availability: 'Properties within 10 min'
    },
    {
        name: 'La Marquesa Golf',
        town: 'Ciudad Quesada',
        holes: 18,
        designer: 'Justo Vecino Quesada',
        style: 'Parkland with lakes',
        developmentsNearby: [],
        availability: 'Properties within 5 min'
    },
    {
        name: 'Campoamor Golf',
        town: 'Orihuela Costa',
        holes: 18,
        designer: 'José María Olazábal',
        style: 'Coastal parkland',
        developmentsNearby: [],
        availability: 'Properties within 10 min'
    },
    {
        name: 'Lo Romero Golf',
        town: 'Pilar de la Horadada',
        holes: 18,
        designer: 'Sterling & Martin',
        style: 'Links-style',
        developmentsNearby: [],
        availability: 'Properties within 15 min'
    },
    {
        name: 'Roda Golf',
        town: 'San Javier',
        holes: 18,
        designer: 'Dave Thomas',
        style: 'Mediterranean parkland',
        developmentsNearby: [],
        availability: 'Properties within 20 min'
    }
];
exports.default = {
    developments: exports.sampleDevelopments,
    featuredDevelopments: exports.featuredDevelopments,
    builders: exports.sampleBuilders,
    areas: exports.sampleAreas,
    golfCourses: exports.golfCourses
};
