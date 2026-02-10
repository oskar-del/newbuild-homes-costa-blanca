import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPostsForArea } from '@/lib/blog-area-mapping';
import { breadcrumbSchema, faqSchema, articleSchema, placeSchema, toJsonLd } from '@/lib/schema';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Living in Orihuela Costa 2026: Complete Guide to Neighborhoods & Property',
  description: 'The definitive guide to Orihuela Costa — from Villamartin to Cabo Roig. Explore neighborhoods, new build developments, beaches, golf courses, and practical tips for buyers.',
  keywords: ['Orihuela Costa', 'property guide', 'neighborhoods', 'golf courses', 'beach living', 'Costa Blanca'],
  openGraph: {
    title: 'Living in Orihuela Costa 2026: Complete Guide to Neighborhoods & Property',
    description: 'The definitive guide to Orihuela Costa — from Villamartin to Cabo Roig. Explore neighborhoods, new build developments, beaches, golf courses, and practical tips for buyers.',
    url: 'https://newbuildhomescostablanca.com/guides/orihuela-costa',
    type: 'article',
    images: [
      {
        url: 'https://newbuildhomescostablanca.com/images/areas/orihuela-costa.jpg',
        width: 1200,
        height: 630,
        alt: 'Orihuela Costa aerial view',
      },
    ],
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/guides/orihuela-costa',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/orihuela-costa',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/orihuela-costa',
      'x-default': 'https://newbuildhomescostablanca.com/guides/orihuela-costa',
    },
  },
};

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Guides', url: '/guides' },
  { name: 'Orihuela Costa', url: '/guides/orihuela-costa' },
];

const faqItems = [
  {
    question: 'Is Orihuela Costa a good place to buy property?',
    answer: 'Absolutely. Orihuela Costa is one of the most established and popular areas on the Costa Blanca for international buyers. It offers a perfect balance of amenities, infrastructure, beaches, golf, and mature community. Property values are stable, rental yields are strong, and it has excellent year-round sunshine.',
  },
  {
    question: 'What are the best neighborhoods in Orihuela Costa?',
    answer: 'The best neighborhoods depend on your priorities. Villamartin is ideal for golf enthusiasts and established community feel. La Zenia is best for shopping and family living. Cabo Roig appeals to those seeking upmarket living with marina facilities. Playa Flamenca offers great value, while Punta Prima and Campoamor provide quieter, more exclusive options.',
  },
  {
    question: 'How far is Orihuela Costa from the airport?',
    answer: 'Orihuela Costa is approximately 45 minutes from Alicante-Elche Airport by car, and about 30 minutes from Murcia Airport. Both airports offer excellent flight connections to the rest of Europe, particularly Scandinavia.',
  },
  {
    question: 'What are the average property prices in Orihuela Costa?',
    answer: 'Apartments typically range from €150,000 to €250,000. Townhouses are between €200,000 and €350,000, while villas range from €300,000 to €600,000 depending on location, size, and finishes. New build properties command slightly higher prices than resale.',
  },
  {
    question: 'Is there good healthcare available?',
    answer: 'Yes. Orihuela Costa has several private clinics and healthcare centers. The major Hospital Universitario de Torrevieja is just 10 minutes away and offers comprehensive services. Many residents are covered by private health insurance, which is affordable and provides access to excellent medical care.',
  },
  {
    question: 'Can I rent out my property in Orihuela Costa?',
    answer: 'Yes, rental opportunities are excellent. Orihuela Costa attracts thousands of tourists annually, particularly during peak season. Holiday rentals through platforms like Airbnb and Booking.com generate strong returns, typically 4-6% annually. Some developments have buy-to-let schemes with guaranteed rental returns.',
  },
  {
    question: 'What is the cost of living like?',
    answer: 'Cost of living is reasonable compared to Northern Europe. Groceries, dining out, and entertainment are affordable. Healthcare, utilities, and property maintenance are economical. Most international residents spend between €1,500-€2,500 monthly for a comfortable lifestyle including social activities.',
  },
  {
    question: 'Is there an international community?',
    answer: 'Yes, Orihuela Costa has a vibrant international community with residents from Scandinavia, the UK, Germany, and beyond. There are numerous expatriate clubs, social groups, and events throughout the year, making it easy to make friends and integrate into community life.',
  },
];

const neighborhoods = [
  {
    name: 'Villamartin',
    image: '/images/areas/villamartin.jpg',
    description: 'The golf capital of Orihuela Costa and the oldest established area. Villamartin is centered around its three championship golf courses and the vibrant Villamartin Plaza with bars, restaurants, and nightlife.',
    highlights: [
      'Three championship golf courses within walking distance',
      'Villamartin Plaza — heart of social activity',
      'Well-established community with good infrastructure',
      'Wide range of property types and price points',
      'Excellent restaurants and bars',
      'Easy access to beaches and La Zenia Boulevard',
    ],
    prices: {
      apartments: 'From €150,000',
      townhouses: 'From €220,000',
      villas: 'From €300,000',
    },
  },
  {
    name: 'La Zenia',
    image: '/images/areas/la-zenia.jpg',
    description: 'The shopping and family hub of Orihuela Costa, anchored by the massive La Zenia Boulevard mall. This vibrant area combines retail therapy with family-friendly amenities and excellent beach access.',
    highlights: [
      'La Zenia Boulevard — major shopping destination',
      'Beautiful family beach nearby',
      'High concentration of restaurants and cafes',
      'Supermarkets and services within walking distance',
      'Active community with events throughout the year',
      'Good public transport connections',
    ],
    prices: {
      apartments: 'From €160,000',
      townhouses: 'From €230,000',
      villas: 'From €320,000',
    },
  },
  {
    name: 'Cabo Roig',
    image: '/images/areas/cabo-roig.jpg',
    description: 'The upmarket end of Orihuela Costa, featuring a working marina, seafront promenade, and more sophisticated dining. Cabo Roig maintains a more exclusive, established feel with quality properties and amenities.',
    highlights: [
      'Working marina with boat moorings',
      'Seafront restaurants and bars',
      'Blue Flag beach with excellent facilities',
      'Promenade walkway along the coast',
      'More exclusive property portfolio',
      'Quieter than Villamartin but still vibrant',
    ],
    prices: {
      apartments: 'From €200,000',
      townhouses: 'From €280,000',
      villas: 'From €380,000',
    },
  },
  {
    name: 'Playa Flamenca',
    image: '/images/areas/playa-flamenca.jpg',
    description: 'A large, well-established community offering excellent value. Playa Flamenca features the popular Saturday market, a bustling commercial center, and a real sense of neighborhood character.',
    highlights: [
      'Saturday market — local hub and social gathering',
      'Playa Flamenca commercial center',
      'Wide selection of property types',
      'Excellent value compared to other areas',
      'Family-friendly atmosphere',
      'Strong community and established infrastructure',
    ],
    prices: {
      apartments: 'From €145,000',
      townhouses: 'From €200,000',
      villas: 'From €280,000',
    },
  },
  {
    name: 'Punta Prima',
    image: '/images/areas/punta-prima.jpg',
    description: 'The northern gateway to Orihuela Costa, featuring the award-winning Blue Flag beach and a walkable promenade extending toward Torrevieja. Punta Prima combines beach living with modern new developments.',
    highlights: [
      'Blue Flag beach with excellent facilities',
      'Walkable beachfront promenade',
      'New build developments with modern amenities',
      'Gateway location with easy access to Torrevieja',
      'More contemporary feel than central areas',
      'Growing retail and dining options',
    ],
    prices: {
      apartments: 'From €155,000',
      townhouses: 'From €220,000',
      villas: 'From €300,000',
    },
  },
  {
    name: 'Campoamor',
    image: '/images/areas/campoamor.jpg',
    description: 'The southern jewel of Orihuela Costa, offering a quieter, more exclusive feel. Home to the prestigious Real Club de Golf Campoamor and upscale residential developments.',
    highlights: [
      'Real Club de Golf Campoamor — 18-hole championship course',
      'More exclusive residential atmosphere',
      'Quieter than central neighborhoods',
      'Beautiful natural surroundings',
      'High-quality property portfolio',
      'Growing amenities and services',
    ],
    prices: {
      apartments: 'From €200,000',
      townhouses: 'From €300,000',
      villas: 'From €400,000',
    },
  },
];

const golfCourses = [
  {
    name: 'Villamartin Golf',
    holes: 18,
    established: 1972,
    greenFee: '€45-65',
    description: 'The original and most iconic course in the area, consistently ranked among Spain\'s best. Par 72, challenging layout with water hazards and strategic bunkering. The heart of Villamartin community.',
  },
  {
    name: 'Las Ramblas Golf',
    holes: 18,
    established: 1989,
    greenFee: '€35-55',
    description: 'Modern design course with rolling terrain and generous fairways. More forgiving than Villamartin but still challenging. Known for good condition and friendly atmosphere.',
  },
  {
    name: 'Campoamor Golf',
    holes: 18,
    established: 1972,
    greenFee: '€45-65',
    description: 'Private exclusive course in southern Orihuela Costa. Championship standard with demanding layout. Membership required but visitors welcome with introduction.',
  },
  {
    name: 'Las Colinas Golf',
    holes: 18,
    established: 2002,
    greenFee: '€40-60',
    description: 'Award-winning course nearby in Cumbre del Sol. Modern design with excellent facilities. Known for conditioning and professional management.',
  },
  {
    name: 'Lo Romero Golf',
    holes: 18,
    established: 1984,
    greenFee: '€30-50',
    description: 'Scenic course with views toward the sea. Par 72, well-maintained with good balance of challenge and playability. Popular value option for visitors.',
  },
];

const beaches = [
  {
    name: 'Cala Capitan',
    description: 'Small cove with golden sand and crystal-clear water. Intimate and charming, perfect for families seeking quieter beach experience.',
    facilities: ['Beach bars', 'Sunbeds & umbrellas', 'Lifeguards', 'Parking nearby'],
    blueFlag: false,
  },
  {
    name: 'Playa de la Zenia',
    description: 'Popular family beach with excellent facilities and vibrant atmosphere. Close to La Zenia Boulevard and numerous restaurants.',
    facilities: ['Beach bars', 'Sunbeds & umbrellas', 'Lifeguards', 'Showers', 'Water sports'],
    blueFlag: true,
  },
  {
    name: 'Cabo Roig Beaches',
    description: 'Multiple small beaches along the marina promenade. Charming Spanish atmosphere with quality restaurants and bars nearby.',
    facilities: ['Beach bars', 'Restaurants', 'Lifeguards', 'Boat rentals'],
    blueFlag: true,
  },
  {
    name: 'Punta Prima Beach',
    description: 'Award-winning Blue Flag beach with comprehensive facilities. Modern promenade with contemporary amenities and water sports facilities.',
    facilities: ['Beach bars', 'Sunbeds & umbrellas', 'Lifeguards', 'Showers', 'Water sports', 'Accessible facilities'],
    blueFlag: true,
  },
  {
    name: 'Campoamor Beach',
    description: 'More secluded option on the southern coast. Less crowded with natural charm and good facilities.',
    facilities: ['Beach bars', 'Sunbeds & umbrellas', 'Lifeguards', 'Parking'],
    blueFlag: false,
  },
];

export default function OrihuelaCosta() {
  const breadcrumbSchema_data = breadcrumbSchema(breadcrumbs);
  const faqSchema_data = faqSchema(faqItems);
  const placeSchema_data = placeSchema({
    name: 'Orihuela Costa',
    description: 'Popular coastal destination on the Costa Blanca South, stretching 16km from Punta Prima to Campoamor',
    url: 'https://newbuildhomescostablanca.com/guides/orihuela-costa',
    address: { region: 'Alicante', country: 'ES' },
    geo: { lat: 37.9355, lng: -0.7405 },
    containedIn: 'Costa Blanca South, Spain',
    population: 40000,
    amenities: ['Beaches', 'Golf Courses', 'Shopping Centers', 'Restaurants', 'Marina'],
    touristAttractions: ['La Zenia Boulevard', 'Cabo Roig Marina', 'Villamartin Plaza', 'Cala Capitan Beach'],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema_data) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema_data) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema_data) }}
      />

      <div className="bg-primary-900 text-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/areas/orihuela-costa.jpg"
              alt="Orihuela Costa aerial view"
              fill
              className="object-cover brightness-40"
              priority
            />
          </div>

          <div className="relative z-10 container mx-auto px-4 py-20">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center space-x-2 text-sm text-white/70">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {index > 0 && <span>/</span>}
                  <Link href={crumb.url} className="hover:text-accent-500 transition-colors">
                    {crumb.name}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Hero Content */}
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-accent-500 text-sm tracking-widest uppercase font-light mb-6">
                Complete Destination Guide
              </p>
              <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
                Orihuela Costa — The Complete Buyer's Guide 2026
              </h1>
              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                Discover the Costa Blanca's most popular destination for international property buyers. Explore neighborhoods, pristine beaches, championship golf courses, and modern living amenities.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                <div className="bg-white/10 backdrop-blur p-6 rounded-sm border border-white/20">
                  <div className="text-3xl font-light text-accent-500 mb-2">40,000+</div>
                  <p className="text-sm text-white/70">Residents</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-sm border border-white/20">
                  <div className="text-3xl font-light text-accent-500 mb-2">5</div>
                  <p className="text-sm text-white/70">Blue Flag Beaches</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-sm border border-white/20">
                  <div className="text-3xl font-light text-accent-500 mb-2">3</div>
                  <p className="text-sm text-white/70">Championship Courses</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-sm border border-white/20">
                  <div className="text-3xl font-light text-accent-500 mb-2">300+</div>
                  <p className="text-sm text-white/70">Days of Sunshine</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 border-t border-white/10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-6 text-white/80 leading-relaxed">
              <p>
                Orihuela Costa stands as Spain's premier destination for international property buyers, offering an unparalleled combination of Mediterranean living, modern infrastructure, and cosmopolitan amenities. Though technically part of the Orihuela municipality, this thriving coastal community feels like its own independent town—complete with its own culture, character, and community spirit.
              </p>

              <p>
                Stretching along 16 kilometers of pristine coastline from Punta Prima in the north to Campoamor in the south, Orihuela Costa encompasses six distinct neighborhoods, each with its own unique personality and appeal. Whether you're seeking golf-focused retirement living, a family-friendly beach community, or an upscale Mediterranean experience, you'll find exactly what you're looking for here.
              </p>

              <p>
                The area has evolved into a fully-formed community with schools, healthcare facilities, diverse dining and shopping options, and a thriving social scene. The international population of approximately 40,000 residents creates a welcoming environment for newcomers while maintaining authentic Spanish character. Year-round sunshine, affordable living costs, and excellent property values make Orihuela Costa not just a holiday destination, but a genuine home for thousands.
              </p>

              <p>
                Whether you're considering property investment, seeking a permanent relocation, or exploring holiday home opportunities, this comprehensive guide will equip you with everything you need to understand Orihuela Costa and make an informed decision about your future on the Costa Blanca.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Neighborhoods Section */}
      <section className="py-20 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-accent-500 text-sm tracking-widest uppercase font-light mb-4">
              Explore the Area
            </p>
            <h2 className="text-5xl font-light mb-6 text-primary-900">
              Six Neighborhoods, One Perfect Destination
            </h2>
            <div className="h-1 w-16 bg-accent-500 rounded-sm"></div>
          </div>

          <div className="space-y-12">
            {neighborhoods.map((neighborhood, index) => (
              <div
                key={index}
                className="bg-white rounded-sm border border-primary-900/10 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="relative h-80 md:h-full min-h-80">
                    <Image
                      src={neighborhood.image}
                      alt={neighborhood.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl font-light text-primary-900 mb-4">
                      {neighborhood.name}
                    </h3>
                    <p className="text-primary-900/70 mb-8 leading-relaxed">
                      {neighborhood.description}
                    </p>

                    <div className="mb-8">
                      <h4 className="text-sm tracking-widest uppercase font-light text-accent-500 mb-4">
                        Highlights
                      </h4>
                      <ul className="space-y-2">
                        {neighborhood.highlights.map((highlight, i) => (
                          <li key={i} className="text-primary-900/70 flex items-start">
                            <span className="text-accent-500 mr-3 mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-8 border-t border-primary-900/10">
                      <h4 className="text-sm tracking-widest uppercase font-light text-accent-500 mb-4">
                        Typical Prices
                      </h4>
                      <div className="space-y-2 text-primary-900">
                        <p>
                          <span className="font-light text-primary-900/60">Apartments:</span>{' '}
                          {neighborhood.prices.apartments}
                        </p>
                        <p>
                          <span className="font-light text-primary-900/60">Townhouses:</span>{' '}
                          {neighborhood.prices.townhouses}
                        </p>
                        <p>
                          <span className="font-light text-primary-900/60">Villas:</span>{' '}
                          {neighborhood.prices.villas}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Market Section */}
      <section className="py-20 bg-white border-t border-primary-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-accent-500 text-sm tracking-widest uppercase font-light mb-4">
              Investment Insights
            </p>
            <h2 className="text-5xl font-light mb-6 text-primary-900">
              Property Market Overview
            </h2>
            <div className="h-1 w-16 bg-accent-500 rounded-sm mb-16"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-light text-primary-900 mb-6">New Builds vs. Resale</h3>
                <p className="text-primary-900/70 mb-6 leading-relaxed">
                  The Orihuela Costa market offers excellent opportunities in both segments. New build properties command premium pricing due to modern amenities, warranties, and energy efficiency. Developers typically offer flexible payment plans and guaranteed rental schemes for investors.
                </p>
                <p className="text-primary-900/70 leading-relaxed">
                  Resale properties often provide better value and immediate occupancy. The established market offers greater choice and negotiating flexibility. Many buyers prefer resale for the mature landscaping and established community connections.
                </p>
              </div>

              <div className="bg-warm-50 p-8 rounded-sm border border-primary-900/10">
                <h4 className="text-sm tracking-widest uppercase font-light text-accent-500 mb-6">
                  Typical Price Ranges
                </h4>
                <div className="space-y-6">
                  <div>
                    <p className="text-primary-900 font-light mb-2">Apartments</p>
                    <p className="text-2xl text-accent-500 font-light">€150,000 - €250,000</p>
                    <p className="text-sm text-primary-900/60 mt-2">1-2 bed, established or new</p>
                  </div>
                  <div>
                    <p className="text-primary-900 font-light mb-2">Townhouses</p>
                    <p className="text-2xl text-accent-500 font-light">€200,000 - €350,000</p>
                    <p className="text-sm text-primary-900/60 mt-2">2-3 bed, terrace gardens</p>
                  </div>
                  <div>
                    <p className="text-primary-900 font-light mb-2">Villas</p>
                    <p className="text-2xl text-accent-500 font-light">€300,000 - €600,000</p>
                    <p className="text-sm text-primary-900/60 mt-2">3-4 bed, private pool options</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-900 text-white p-12 rounded-sm mb-12">
              <h3 className="text-2xl font-light mb-6">What You Get for Your Money</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-accent-500 text-sm tracking-widest uppercase font-light mb-4">
                    In €150k-200k Range
                  </h4>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-start">
                      <span className="text-accent-500 mr-3 mt-1">•</span>
                      <span>1-2 bedroom apartment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-500 mr-3 mt-1">•</span>
                      <span>Community pool and gardens</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-500 mr-3 mt-1">•</span>
                      <span>Parking included</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-500 mr-3 mt-1">•</span>
                      <span>Modern finishes</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-accent-500 text-sm tracking-widest uppercase font-light mb-4">
                    In €400k+ Range
                  </h4>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-start">
                      <span className="text-accent-500 mr-3 mt-1">•</span>
                      <span>3-4 bedroom villa</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-500 mr-3 mt-1">•</span>
                      <span>Private pool and garden</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-500 mr-3 mt-1">•</span>
                      <span>Premium location options</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-500 mr-3 mt-1">•</span>
                      <span>Luxury finishes available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-warm-50 p-8 rounded-sm border border-primary-900/10">
              <h4 className="text-primary-900 font-light mb-4">Popular New Developments</h4>
              <p className="text-primary-900/70 mb-4">
                Current market features several attractive new developments including contemporary apartment complexes in La Zenia, townhouse communities in Playa Flamenca, and exclusive villa projects in Campoamor. Most new builds include energy-efficient systems, smart home technology, and comprehensive warranties.
              </p>
              <p className="text-primary-900/70">
                Many projects offer off-plan purchasing opportunities with staged payment plans, making investment more accessible. Developer reputations and completion timelines are crucial factors in selection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Golf Section */}
      <section className="py-20 bg-warm-50 border-t border-primary-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-accent-500 text-sm tracking-widest uppercase font-light mb-4">
              Tee Off in Paradise
            </p>
            <h2 className="text-5xl font-light mb-6 text-primary-900">
              Championship Golf Courses
            </h2>
            <div className="h-1 w-16 bg-accent-500 rounded-sm"></div>
            <p className="text-primary-900/70 mt-8 leading-relaxed max-w-2xl">
              Orihuela Costa has become a world-renowned golf destination with five championship courses within the immediate area and five additional courses nearby. Whether you're a serious golfer or casual player, you'll find exceptional courses with stunning Mediterranean views and year-round playability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {golfCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-sm border border-primary-900/10 p-8 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-light text-primary-900 mb-4">{course.name}</h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-primary-900/10">
                  <div className="flex justify-between items-center">
                    <span className="text-primary-900/60 text-sm">Holes</span>
                    <span className="text-primary-900 font-light">{course.holes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-900/60 text-sm">Established</span>
                    <span className="text-primary-900 font-light">{course.established}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-900/60 text-sm">Green Fee</span>
                    <span className="text-accent-500 font-light">{course.greenFee}</span>
                  </div>
                </div>

                <p className="text-primary-900/70 text-sm leading-relaxed">{course.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-primary-900/10 rounded-sm p-12 mt-12 max-w-4xl mx-auto">
            <p className="text-primary-900/70 leading-relaxed mb-4">
              Beyond these courses, the wider Costa Blanca region offers numerous additional options including Las Colinas Golf in nearby Cumbre del Sol and Lo Romero Golf. Most courses offer excellent facilities including pro shops, restaurants, and golf academies. Many are affiliated with luxury residential communities offering members special privileges.
            </p>
            <p className="text-primary-900/70 leading-relaxed">
              Annual membership packages are available at most courses, providing significant savings for regular players. Temporary membership and holiday packages accommodate visitors seeking an immersive golf experience during their stay.
            </p>
          </div>
        </div>
      </section>

      {/* Beaches Section */}
      <section className="py-20 bg-white border-t border-primary-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-accent-500 text-sm tracking-widest uppercase font-light mb-4">
              Sun, Sea & Sand
            </p>
            <h2 className="text-5xl font-light mb-6 text-primary-900">
              Pristine Mediterranean Beaches
            </h2>
            <div className="h-1 w-16 bg-accent-500 rounded-sm"></div>
            <p className="text-primary-900/70 mt-8 leading-relaxed max-w-2xl">
              Orihuela Costa boasts five main beaches along its 16-kilometer coastline, each offering unique character and comprehensive amenities. From intimate coves to vibrant beach clubs, you'll find your perfect seaside spot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {beaches.map((beach, index) => (
              <div
                key={index}
                className="bg-warm-50 rounded-sm border border-primary-900/10 p-8"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-light text-primary-900">{beach.name}</h3>
                  {beach.blueFlag && (
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-sm text-xs font-light tracking-wide">
                      Blue Flag
                    </div>
                  )}
                </div>

                <p className="text-primary-900/70 mb-6 leading-relaxed text-sm">{beach.description}</p>

                <div>
                  <h4 className="text-sm tracking-widest uppercase font-light text-accent-500 mb-3">
                    Facilities
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {beach.facilities.map((facility, i) => (
                      <div key={i} className="flex items-center text-sm text-primary-900/70">
                        <span className="text-accent-500 mr-2">✓</span>
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary-900 text-white rounded-sm p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-light mb-6">Beach Living Year-Round</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              With over 300 days of sunshine annually, Orihuela Costa's beaches offer exceptional conditions for swimming, water sports, and leisurely seaside living. The water temperature ranges from 14°C in winter to 26°C in summer, providing comfortable conditions for most of the year.
            </p>
            <p className="text-white/80 leading-relaxed">
              Blue Flag beaches maintain the highest standards of water quality, safety, and environmental management. All beaches are equipped with lifeguards during peak season and offer comprehensive facilities including restaurants, beach bars, and water sports facilities.
            </p>
          </div>
        </div>
      </section>

      {/* Practical Living Section */}
      <section className="py-20 bg-warm-50 border-t border-primary-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-accent-500 text-sm tracking-widest uppercase font-light mb-4">
              Day-to-Day Living
            </p>
            <h2 className="text-5xl font-light mb-6 text-primary-900">
              Practical Information for Residents
            </h2>
            <div className="h-1 w-16 bg-accent-500 rounded-sm"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-sm border border-primary-900/10 p-8">
              <h3 className="text-2xl font-light text-primary-900 mb-6">Cost of Living</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-primary-900/60 text-sm font-light">Monthly Budget (Single)</p>
                  <p className="text-2xl text-accent-500 font-light">€1,200 - €1,800</p>
                </div>
                <div>
                  <p className="text-primary-900/60 text-sm font-light">Monthly Budget (Couple)</p>
                  <p className="text-2xl text-accent-500 font-light">€1,800 - €2,500</p>
                </div>
                <div className="pt-4 border-t border-primary-900/10">
                  <p className="text-sm text-primary-900/70 mb-3">Typical Expenses Include:</p>
                  <ul className="space-y-2 text-sm text-primary-900/70">
                    <li>Property maintenance: €100-200/month</li>
                    <li>Utilities: €100-150/month</li>
                    <li>Groceries: €300-400/month</li>
                    <li>Dining out: €200-400/month</li>
                    <li>Healthcare: €50-100/month (private insurance)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-primary-900/10 p-8">
              <h3 className="text-2xl font-light text-primary-900 mb-6">Healthcare</h3>
              <p className="text-primary-900/70 text-sm mb-6 leading-relaxed">
                Orihuela Costa has excellent healthcare facilities. The modern Hospital Universitario de Torrevieja, just 10 minutes away, provides comprehensive medical services. Multiple private clinics operate throughout the area.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-primary-900 font-light mb-2">Private Health Insurance</p>
                  <p className="text-sm text-primary-900/70">€40-80/month provides comprehensive coverage</p>
                </div>
                <div>
                  <p className="text-primary-900 font-light mb-2">Spanish Healthcare System</p>
                  <p className="text-sm text-primary-900/70">Available to legal residents with small social contributions</p>
                </div>
                <div>
                  <p className="text-primary-900 font-light mb-2">Dentists & Specialists</p>
                  <p className="text-sm text-primary-900/70">Excellent private options at reasonable costs</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-primary-900/10 p-8">
              <h3 className="text-2xl font-light text-primary-900 mb-6">International Schools</h3>
              <p className="text-primary-900/70 text-sm mb-6 leading-relaxed">
                Several international schools operate in the area, offering British, International Baccalaureate, and other curricula. Options include:
              </p>
              <ul className="space-y-2 text-sm text-primary-900/70">
                <li>International School with British curriculum</li>
                <li>European schools following various national systems</li>
                <li>Private academies with Spanish-English programs</li>
                <li>Kindergarten and nursery options</li>
              </ul>
            </div>

            <div className="bg-white rounded-sm border border-primary-900/10 p-8">
              <h3 className="text-2xl font-light text-primary-900 mb-6">Transportation</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-primary-900 font-light text-sm mb-1">Alicante-Elche Airport</p>
                  <p className="text-sm text-primary-900/70">45 minutes by car, major European connections</p>
                </div>
                <div>
                  <p className="text-primary-900 font-light text-sm mb-1">Murcia Airport</p>
                  <p className="text-sm text-primary-900/70">30 minutes by car, budget airline hub</p>
                </div>
                <div>
                  <p className="text-primary-900 font-light text-sm mb-1">Public Transport</p>
                  <p className="text-sm text-primary-900/70">Buses connect to Torrevieja and surrounding areas</p>
                </div>
                <div>
                  <p className="text-primary-900 font-light text-sm mb-1">Car Rental</p>
                  <p className="text-sm text-primary-900/70">Abundant options, €20-40/day typical rates</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-primary-900/10 p-8">
              <h3 className="text-2xl font-light text-primary-900 mb-6">Shopping & Amenities</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-primary-900 font-light text-sm mb-1">La Zenia Boulevard</p>
                  <p className="text-sm text-primary-900/70">Major shopping mall with 150+ stores</p>
                </div>
                <div>
                  <p className="text-primary-900 font-light text-sm mb-1">Supermarkets</p>
                  <p className="text-sm text-primary-900/70">Mercadona, Carrefour, Lidl throughout area</p>
                </div>
                <div>
                  <p className="text-primary-900 font-light text-sm mb-1">Markets</p>
                  <p className="text-sm text-primary-900/70">Saturday market in Playa Flamenca, weekly produce markets</p>
                </div>
                <div>
                  <p className="text-primary-900 font-light text-sm mb-1">Restaurants</p>
                  <p className="text-sm text-primary-900/70">100+ restaurants ranging from casual to fine dining</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-primary-900/10 p-8">
              <h3 className="text-2xl font-light text-primary-900 mb-6">Spanish Residency</h3>
              <p className="text-primary-900/70 text-sm mb-6 leading-relaxed">
                Obtaining Spanish residency is straightforward for property owners. Key requirements include:
              </p>
              <ul className="space-y-2 text-sm text-primary-900/70">
                <li>NIE (Foreigner Identification Number)</li>
                <li>Spanish bank account</li>
                <li>Healthcare registration</li>
                <li>Property deed or rental contract</li>
                <li>Legal documentation assistance available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles Section */}
      <section className="py-20 bg-white border-t border-primary-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-accent-500 text-sm tracking-widest uppercase font-light mb-4">
              Further Reading
            </p>
            <h2 className="text-5xl font-light mb-6 text-primary-900">
              Related Articles & Guides
            </h2>
            <div className="h-1 w-16 bg-accent-500 rounded-sm"></div>
          </div>

          <Suspense fallback={<div>Loading articles...</div>}>
            <BlogArticles />
          </Suspense>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-warm-50 border-t border-primary-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-accent-500 text-sm tracking-widest uppercase font-light mb-4">
              Common Questions
            </p>
            <h2 className="text-5xl font-light mb-6 text-primary-900">
              Frequently Asked Questions
            </h2>
            <div className="h-1 w-16 bg-accent-500 rounded-sm mb-16"></div>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="bg-white rounded-sm border border-primary-900/10 p-6 cursor-pointer group"
                >
                  <summary className="flex items-start justify-between font-light text-lg text-primary-900 hover:text-accent-500 transition-colors">
                    <span>{item.question}</span>
                    <span className="text-accent-500 ml-4 flex-shrink-0 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-primary-900/10">
                    <p className="text-primary-900/70 leading-relaxed">{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900 text-white border-t border-primary-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-accent-500 text-sm tracking-widest uppercase font-light mb-4">
              Ready to Explore?
            </p>
            <h2 className="text-5xl font-light mb-6">
              Get in Touch With Our Team
            </h2>
            <div className="h-1 w-16 bg-accent-500 rounded-sm mb-16"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur p-8 rounded-sm border border-white/20">
                <h3 className="text-xl font-light mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-white/60 text-sm mb-1">Phone</p>
                    <a
                      href="tel:+34634044970"
                      className="text-accent-500 font-light hover:text-accent-400 transition-colors"
                    >
                      +34 634 044 970
                    </a>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">WhatsApp</p>
                    <a
                      href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-500 font-light hover:text-accent-400 transition-colors"
                    >
                      Chat with us on WhatsApp
                    </a>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Hours</p>
                    <p className="text-white/80">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-white/80">Saturday & Sunday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur p-8 rounded-sm border border-white/20">
                <h3 className="text-xl font-light mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-accent-500 text-primary-900 py-3 rounded-sm font-light hover:bg-accent-400 transition-colors">
                    Browse Current Listings
                  </button>
                  <button className="w-full border border-accent-500 text-accent-500 py-3 rounded-sm font-light hover:bg-accent-500 hover:text-primary-900 transition-colors">
                    Request Information
                  </button>
                  <button className="w-full border border-white/30 text-white py-3 rounded-sm font-light hover:bg-white/10 transition-colors">
                    Schedule Virtual Tour
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-white/20">
              <p className="text-white/70 text-sm">
                Have more questions? Our team of local experts is ready to help you find the perfect property in Orihuela Costa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

async function BlogArticles() {
  try {
    const articles = await getBlogPostsForArea('orihuela-costa', 3);

    if (!articles || articles.length === 0) {
      return (
        <div className="bg-warm-50 rounded-sm border border-primary-900/10 p-12 text-center">
          <p className="text-primary-900/60">
            No related articles available at this time. Check back soon for updates.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group bg-white rounded-lg border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all overflow-hidden"
          >
            <div className="p-5">
              <span className="text-accent-600 text-xs font-medium uppercase tracking-wider">{article.category}</span>
              <h3 className="text-primary-900 font-semibold mt-2 mb-2 group-hover:text-accent-600 transition-colors">{article.title}</h3>
              <p className="text-warm-600 text-sm line-clamp-2">{article.description}</p>
              <span className="text-warm-400 text-xs mt-2 block">{article.readTime} min read</span>
            </div>
          </Link>
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className="bg-warm-50 rounded-sm border border-primary-900/10 p-12 text-center">
        <p className="text-primary-900/60">
          Unable to load articles at this time. Please try again later.
        </p>
      </div>
    );
  }
}
