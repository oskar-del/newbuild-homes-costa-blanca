import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProperties } from '@/lib/unified-feed-service';
import { GOLF_COURSES, getGolfCoursesByRegion } from '@/lib/golf-courses';

export const metadata: Metadata = {
  title: 'Golf Properties Costa Blanca | Frontline Golf Homes & Apartments 2025',
  description: 'Find your dream golf property in Costa Blanca. Browse frontline golf apartments and villas near La Finca, Villamartín, Las Ramblas, Oliva Nova and 12+ championship courses. Year-round golf, 300+ days sunshine.',
  keywords: 'golf properties costa blanca, golf course homes spain, frontline golf apartments, la finca golf property, villamartin golf homes, costa blanca golf courses',
  openGraph: {
    title: 'Golf Properties Costa Blanca | Frontline Golf Homes',
    description: 'Find your dream golf property in Costa Blanca. 12+ championship courses, year-round golf, frontline homes from €180,000.',
    type: 'website',
  },
};

// FAQ Data
const GOLF_FAQS = [
  {
    question: "How many golf courses are in Costa Blanca?",
    answer: "Costa Blanca has over 20 golf courses spread across the North and South regions. The South (Orihuela Costa, Torrevieja area) has around 12 courses including La Finca, Villamartín, Las Ramblas, and Campoamor. The North (Jávea, Dénia, Benidorm area) has 8+ courses including the Severiano Ballesteros-designed Oliva Nova, La Sella, and Villaitana's twin Nicklaus/Langer courses."
  },
  {
    question: "What is the best golf course in Costa Blanca?",
    answer: "It depends on your preferences. For championship quality, Oliva Nova (designed by Seve Ballesteros) and Villaitana (Nicklaus & Langer designs) are world-class. For best value and accessibility, La Finca and La Marquesa in the South offer excellent golf at reasonable prices. Villamartín is the most established with a vibrant social scene. Las Ramblas offers the most dramatic elevation changes and mountain views."
  },
  {
    question: "Can you play golf year-round in Costa Blanca?",
    answer: "Yes! Costa Blanca enjoys over 300 days of sunshine annually with mild winters averaging 16-18°C. Unlike Northern Europe, courses never close for winter. January and February are the coolest months but still very playable. Summer (July-August) can be hot, so many golfers prefer early morning or late afternoon tee times. Spring (March-May) and autumn (September-November) offer ideal golfing conditions."
  },
  {
    question: "How much are green fees in Costa Blanca?",
    answer: "Green fees in Costa Blanca typically range from €50-100 for 18 holes depending on course and season. Budget-friendly courses like La Marquesa and Vistabella charge €50-65. Mid-range courses like La Finca and Villamartín are €65-85. Premium courses like Oliva Nova and Villaitana can reach €80-120. Most courses offer twilight rates (after 2-3pm) at 30-50% discount, and annual memberships range from €1,000-2,500."
  },
  {
    question: "Which Costa Blanca golf course is best for beginners?",
    answer: "Vistabella Golf and La Marquesa Golf are excellent for beginners, with wider fairways and forgiving layouts. Both offer good practice facilities and patient staff. The 9-hole courses at Jávea Golf Club and Altea's Don Cayo are also great for those building confidence. Avoid Las Ramblas initially as its elevation changes can be challenging for new golfers."
  },
  {
    question: "Are there famous designer golf courses in Costa Blanca?",
    answer: "Yes! Costa Blanca boasts courses by golf legends. Oliva Nova was designed by Severiano Ballesteros. Villaitana features two courses - one by Jack Nicklaus (Levante) and one by Bernhard Langer (Poniente). La Sella was designed by José María Olazábal, as was Campoamor. These championship-caliber courses attract golfers from around the world."
  },
  {
    question: "Is Costa Blanca or Costa del Sol better for golf?",
    answer: "Both are excellent, but Costa Blanca offers better value. Property prices are 30-40% lower than Costa del Sol while course quality is comparable. Costa Blanca has fewer crowds and a more authentic Spanish feel. Costa del Sol has more courses (70+) and is more established for golf tourism, but Costa Blanca's 20+ courses provide plenty of variety. Flight connections to both are excellent from across Europe."
  },
  {
    question: "What is the best time of year to play golf in Costa Blanca?",
    answer: "March to May and September to November offer the ideal combination of perfect weather (20-25°C), reasonable green fees, and less crowded courses. Winter (December-February) is popular with Northern Europeans escaping cold weather - courses are busier but still excellent playing conditions. Summer offers the lowest prices but can be very hot (30°C+) midday."
  },
  {
    question: "How far is Costa Blanca from the airport?",
    answer: "Alicante-Elche Airport (ALC) is the main gateway, with most golf courses 25-60 minutes away. Southern courses (Villamartín, La Finca, Campoamor) are 35-45 minutes from Alicante. Northern courses (Oliva Nova, La Sella) are 60-90 minutes from Alicante. Murcia-Corvera Airport (RMU) serves the South, with courses like Lo Romero just 20 minutes away."
  },
  {
    question: "Can I buy property directly on a golf course in Costa Blanca?",
    answer: "Yes! Many Costa Blanca developments are built around golf courses offering frontline golf properties with course views. La Finca Golf Resort, Villamartín, Las Ramblas, Campoamor, and Vistabella all have residential communities. Prices for frontline golf apartments start around €180,000, with villas from €350,000. We specialize in golf properties - contact us for current availability."
  }
];

// Green Fees Data (approximate, for reference)
const GREEN_FEES = [
  { course: 'La Finca Golf', region: 'South', high: '€75-85', low: '€55-65', buggy: '€35', annual: '€1,200' },
  { course: 'Villamartín Golf', region: 'South', high: '€80-95', low: '€60-70', buggy: '€40', annual: '€1,400' },
  { course: 'Las Ramblas Golf', region: 'South', high: '€75-90', low: '€55-65', buggy: '€35', annual: '€1,300' },
  { course: 'Campoamor Golf', region: 'South', high: '€70-85', low: '€50-60', buggy: '€35', annual: '€1,200' },
  { course: 'Vistabella Golf', region: 'South', high: '€55-65', low: '€40-50', buggy: '€30', annual: '€950' },
  { course: 'La Marquesa Golf', region: 'South', high: '€50-60', low: '€35-45', buggy: '€30', annual: '€900' },
  { course: 'Lo Romero Golf', region: 'South', high: '€65-80', low: '€45-55', buggy: '€35', annual: '€1,100' },
  { course: 'Oliva Nova Golf', region: 'North', high: '€90-110', low: '€70-85', buggy: '€45', annual: '€2,200' },
  { course: 'La Sella Golf', region: 'North', high: '€80-100', low: '€60-75', buggy: '€40', annual: '€1,800' },
  { course: 'Villaitana Golf', region: 'North', high: '€85-120', low: '€65-90', buggy: '€45', annual: '€2,000' },
  { course: 'Jávea Golf Club', region: 'North', high: '€50-60', low: '€35-45', buggy: '€25', annual: '€800' },
  { course: 'Altea Don Cayo', region: 'North', high: '€45-55', low: '€30-40', buggy: '€25', annual: '€700' },
];

// Best For Categories
const BEST_FOR = [
  { category: 'Championship Golf', course: 'Oliva Nova Golf', reason: 'Severiano Ballesteros design, hosts European Tour events', slug: 'oliva-nova' },
  { category: 'Best Value', course: 'La Marquesa Golf', reason: 'Quality 18-hole course, green fees from €35', slug: 'la-marquesa' },
  { category: 'Beginners', course: 'Vistabella Golf', reason: 'Forgiving layout, excellent practice facilities, friendly staff', slug: 'vistabella' },
  { category: 'Mountain Views', course: 'Las Ramblas Golf', reason: 'Dramatic elevation changes, stunning Sierra de Callosa backdrop', slug: 'las-ramblas' },
  { category: 'Social Scene', course: 'Villamartín Golf', reason: 'Famous plaza with bars/restaurants, established expat community', slug: 'villamartin' },
  { category: 'Luxury Resort', course: 'Villaitana Golf', reason: 'Two championship courses, 5-star hotel, spa facilities', slug: 'villaitana' },
  { category: 'Investment Property', course: 'La Finca Golf', reason: 'Strong rental demand, new developments, proven appreciation', slug: 'la-finca' },
  { category: 'Quick Round (9 holes)', course: 'Jávea Golf Club', reason: 'Charming 9-hole course, Montgó mountain views, friendly club', slug: 'javea' },
];

// Schema markup for golf properties collection
function getGolfPageSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Golf Properties Costa Blanca',
      description: 'Collection of golf properties and frontline golf homes in Costa Blanca, Spain. Over 20 courses including designs by Ballesteros, Nicklaus, and Olazábal.',
      url: 'https://www.newbuildhomescostablanca.com/golf',
      mainEntity: {
        '@type': 'ItemList',
        name: 'Costa Blanca Golf Courses',
        numberOfItems: GOLF_COURSES.length,
        itemListElement: GOLF_COURSES.map((course, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'GolfCourse',
            name: course.name,
            address: {
              '@type': 'PostalAddress',
              addressLocality: course.town,
              addressRegion: 'Alicante',
              addressCountry: 'ES',
            },
          },
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: GOLF_FAQS.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.newbuildhomescostablanca.com/' },
        { '@type': 'ListItem', position: 2, name: 'Golf Properties', item: 'https://www.newbuildhomescostablanca.com/golf' },
      ],
    },
  ];
}

export default async function GolfPage() {
  // Fetch properties with golf views/proximity
  const allProperties = await getAllProperties();
  const golfProperties = allProperties.filter(p => 
    p.hasGolfview || 
    p.features?.some(f => f.toLowerCase().includes('golf'))
  );

  const southCourses = getGolfCoursesByRegion('south');
  const northCourses = getGolfCoursesByRegion('north');

  // Count properties near each course
  const getPropertiesNearCourse = (course: typeof GOLF_COURSES[0]) => {
    return golfProperties.filter(p => 
      course.nearbyTowns.some(town => 
        p.town?.toLowerCase().includes(town.toLowerCase())
      )
    ).length;
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getGolfPageSchema()) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <nav className="text-sm mb-4 text-white/70">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Golf Properties</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Golf Properties Costa Blanca
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover frontline golf apartments, villas, and townhouses near Costa Blanca's 
              finest championship courses. From La Finca to Oliva Nova, find your perfect 
              golf lifestyle home in Spain's sunniest region.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/properties?feature=golf"
                className="bg-[#e8913a] hover:bg-[#d4792c] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View All Golf Properties ({golfProperties.length})
              </Link>
              <a
                href="#courses"
                className="border-2 border-white/50 hover:border-white text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Golf Courses
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#1e3a5f]">{golfProperties.length}+</div>
              <div className="text-stone-600">Golf Properties</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1e3a5f]">{GOLF_COURSES.length}+</div>
              <div className="text-stone-600">Golf Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1e3a5f]">300+</div>
              <div className="text-stone-600">Days of Sunshine</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1e3a5f]">12 Months</div>
              <div className="text-stone-600">Golfing Season</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Costa Blanca Section - Visual Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4 text-center">
            Why Costa Blanca is Europe's Premier Golf Destination
          </h2>
          <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">
            World-class courses, year-round sunshine, and property prices 30-40% lower than Costa del Sol
          </p>
          
          {/* Key Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#1e3a5f] mb-2">Year-Round Golf</h3>
              <p className="text-stone-600 text-sm">300+ days of sunshine. Play in January while Northern Europe is frozen. Winter highs of 16-18°C.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-6 border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#1e3a5f] mb-2">Outstanding Value</h3>
              <p className="text-stone-600 text-sm">Frontline golf apartments from €180,000. Green fees €50-100. Annual memberships from €900.</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#1e3a5f] mb-2">World-Class Courses</h3>
              <p className="text-stone-600 text-sm">Designs by Severiano Ballesteros, Jack Nicklaus, Bernhard Langer, and José María Olazábal.</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#1e3a5f] mb-2">Golf Community</h3>
              <p className="text-stone-600 text-sm">Established international community. Golf-focused restaurants, shops, and social scene.</p>
            </div>
          </div>
          
          {/* North vs South Comparison */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* South Card */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">☀️</span>
                </div>
                <h3 className="text-2xl font-bold">Costa Blanca South</h3>
              </div>
              <p className="text-white/90 mb-6">
                The heart of Costa Blanca golf. From Torrevieja to Pilar de la Horadada, the South offers 
                the famous Villamartín triangle, La Finca Golf Resort, and the best value for golf property investment.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">8+ courses within 20 minutes</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">Frontline apartments from €180,000</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">Strong rental demand year-round</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">35-45 mins from Alicante Airport</span>
                </li>
              </ul>
              <Link 
                href="#courses-south" 
                className="inline-flex items-center gap-2 bg-white text-amber-600 px-5 py-2 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
              >
                Explore South Courses
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* North Card */}
            <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">⛰️</span>
                </div>
                <h3 className="text-2xl font-bold">Costa Blanca North</h3>
              </div>
              <p className="text-white/90 mb-6">
                Premium resort golf meets dramatic Mediterranean landscapes. Jávea, Dénia, Altea, and Benidorm 
                offer championship courses including Seve Ballesteros's masterpiece Oliva Nova.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">Oliva Nova (Ballesteros design)</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">Villaitana (Nicklaus & Langer)</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">Mountain & sea view properties</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">5-star resort facilities</span>
                </li>
              </ul>
              <Link 
                href="#courses-north" 
                className="inline-flex items-center gap-2 bg-white text-[#1e3a5f] px-5 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Explore North Courses
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best Course For Section */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4 text-center">
            Best Golf Course For...
          </h2>
          <p className="text-center text-stone-600 mb-10 max-w-2xl mx-auto">
            Not sure which course suits your style? Here's our guide to matching the perfect course to your needs.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BEST_FOR.map((item, idx) => (
              <Link
                key={idx}
                href={`/golf/${item.slug}`}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="text-sm text-[#e8913a] font-semibold mb-2">Best for {item.category}</div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-2 group-hover:text-[#e8913a] transition-colors">
                  {item.course}
                </h3>
                <p className="text-sm text-stone-600">{item.reason}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Green Fees Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4 text-center">
            Costa Blanca Golf Green Fees Comparison 2025
          </h2>
          <p className="text-center text-stone-600 mb-10 max-w-2xl mx-auto">
            Compare prices across Costa Blanca's top courses. Prices vary by season—high season is typically March-May and September-November.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
              <thead className="bg-[#1e3a5f] text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Course</th>
                  <th className="px-4 py-3 text-left">Region</th>
                  <th className="px-4 py-3 text-center">High Season</th>
                  <th className="px-4 py-3 text-center">Low Season</th>
                  <th className="px-4 py-3 text-center">Buggy</th>
                  <th className="px-4 py-3 text-center">Annual Pass</th>
                </tr>
              </thead>
              <tbody>
                {GREEN_FEES.map((fee, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-stone-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-medium text-[#1e3a5f]">{fee.course}</td>
                    <td className="px-4 py-3 text-stone-600">{fee.region}</td>
                    <td className="px-4 py-3 text-center">{fee.high}</td>
                    <td className="px-4 py-3 text-center text-green-600">{fee.low}</td>
                    <td className="px-4 py-3 text-center">{fee.buggy}</td>
                    <td className="px-4 py-3 text-center">{fee.annual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-stone-500 mt-4 text-center">
            * Prices are approximate and subject to change. Many courses offer twilight rates at 30-50% discount.
          </p>
        </div>
      </section>

      {/* North vs South Comparison */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-stone-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4 text-center">
            Costa Blanca North vs South: Where Should You Buy?
          </h2>
          <p className="text-center text-stone-600 mb-10 max-w-2xl mx-auto">
            Both regions offer excellent golf—here's how they compare for property buyers.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* South */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                <span className="text-2xl">☀️</span> Costa Blanca South
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>8+ golf courses</strong> within 30 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Lower property prices</strong> – apartments from €150k</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Large expat community</strong> – English widely spoken</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>More new build developments</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>35-45 min</strong> from Alicante Airport</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Flatter terrain, more modern developments</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-stone-200">
                <span className="text-sm text-stone-500">Best for:</span>
                <p className="font-medium text-[#1e3a5f]">Value seekers, frequent golfers, rental investors</p>
              </div>
            </div>
            
            {/* North */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                <span className="text-2xl">⛰️</span> Costa Blanca North
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Championship courses</strong> – Ballesteros, Nicklaus designs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Dramatic scenery</strong> – mountains and sea views</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>More Spanish character</strong> – authentic towns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Higher-end properties</strong> – more villas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>60-90 min</strong> from Alicante Airport</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Hilly terrain, established communities</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-stone-200">
                <span className="text-sm text-stone-500">Best for:</span>
                <p className="font-medium text-[#1e3a5f]">Luxury seekers, scenery lovers, permanent residents</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/guides/costa-blanca-north-vs-south"
              className="text-[#e8913a] hover:text-[#d4792c] font-semibold"
            >
              Read our complete North vs South guide →
            </Link>
          </div>
        </div>
      </section>

      {/* Golf Courses Section */}
      <section id="courses" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">
              Costa Blanca Golf Courses
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              From world-class championship courses to charming local clubs. Click on any course 
              to see available properties and detailed information.
            </p>
          </div>

          {/* Costa Blanca South Courses */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#1e3a5f] mb-6 flex items-center gap-2">
              <span className="text-[#e8913a]">⛳</span> Costa Blanca South Courses
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {southCourses.map((course) => {
                const propertyCount = getPropertiesNearCourse(course);
                return (
                  <Link
                    key={course.id}
                    href={`/golf/${course.slug}`}
                    className="bg-stone-50 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                  >
                    <div className="aspect-video bg-gradient-to-br from-green-600 to-green-800 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-white/30 text-6xl">
                        ⛳
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <span className="text-white font-semibold">{course.name}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-stone-600">{course.town}</span>
                        <span className="text-sm bg-white px-2 py-1 rounded">
                          {course.holes} holes
                        </span>
                      </div>
                      <p className="text-sm text-stone-500 line-clamp-2 mb-3">
                        {course.description.substring(0, 100)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#e8913a] font-semibold">
                          {propertyCount} {propertyCount === 1 ? 'property' : 'properties'} nearby
                        </span>
                        <span className="text-[#1e3a5f] group-hover:text-[#e8913a] transition-colors">
                          View →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Costa Blanca North Courses */}
          <div>
            <h3 className="text-2xl font-bold text-[#1e3a5f] mb-6 flex items-center gap-2">
              <span className="text-[#e8913a]">⛳</span> Costa Blanca North Courses
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {northCourses.map((course) => {
                const propertyCount = getPropertiesNearCourse(course);
                return (
                  <Link
                    key={course.id}
                    href={`/golf/${course.slug}`}
                    className="bg-stone-50 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                  >
                    <div className="aspect-video bg-gradient-to-br from-green-600 to-green-800 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-white/30 text-6xl">
                        ⛳
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <span className="text-white font-semibold">{course.name}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-stone-600">{course.town}</span>
                        <span className="text-sm bg-white px-2 py-1 rounded">
                          {course.holes} holes
                        </span>
                      </div>
                      <p className="text-sm text-stone-500 line-clamp-2 mb-3">
                        {course.description.substring(0, 100)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#e8913a] font-semibold">
                          {propertyCount} {propertyCount === 1 ? 'property' : 'properties'} nearby
                        </span>
                        <span className="text-[#1e3a5f] group-hover:text-[#e8913a] transition-colors">
                          View →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Guide */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4 text-center">
            When to Play Golf in Costa Blanca
          </h2>
          <p className="text-center text-stone-600 mb-10 max-w-2xl mx-auto">
            Year-round golf is possible, but here's what to expect each season.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🌸</div>
              <h3 className="font-bold text-[#1e3a5f] mb-2">Spring (Mar-May)</h3>
              <p className="text-sm text-stone-600 mb-3">20-25°C • Perfect conditions</p>
              <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">High Season Prices</span>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">☀️</div>
              <h3 className="font-bold text-[#1e3a5f] mb-2">Summer (Jun-Aug)</h3>
              <p className="text-sm text-stone-600 mb-3">28-35°C • Early/late play best</p>
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Low Season Prices</span>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🍂</div>
              <h3 className="font-bold text-[#1e3a5f] mb-2">Autumn (Sep-Nov)</h3>
              <p className="text-sm text-stone-600 mb-3">18-25°C • Ideal golf weather</p>
              <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">High Season Prices</span>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">❄️</div>
              <h3 className="font-bold text-[#1e3a5f] mb-2">Winter (Dec-Feb)</h3>
              <p className="text-sm text-stone-600 mb-3">12-18°C • Busy with visitors</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Mid Season Prices</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Golf in Costa Blanca */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8 text-center">
            Why Buy a Golf Property in Costa Blanca?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">☀️</div>
              <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2">Year-Round Golf</h3>
              <p className="text-stone-600">
                With over 300 days of sunshine and mild winters, play golf every month of the year.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏌️</div>
              <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2">World-Class Courses</h3>
              <p className="text-stone-600">
                Courses designed by legends like Ballesteros, Nicklaus, Langer, and Olazábal.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2">Strong Investment</h3>
              <p className="text-stone-600">
                Golf properties command premium rental rates from international golfers year-round.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✈️</div>
              <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2">Easy Access</h3>
              <p className="text-stone-600">
                Alicante Airport offers direct flights from 100+ destinations, courses 30-60 mins away.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏖️</div>
              <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2">Beach & Golf</h3>
              <p className="text-stone-600">
                Combine golf with beautiful Mediterranean beaches, all within 15-20 minutes.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏡</div>
              <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2">Quality Lifestyle</h3>
              <p className="text-stone-600">
                Excellent restaurants, healthcare, and a welcoming international community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4 text-center">
            Frequently Asked Questions About Golf in Costa Blanca
          </h2>
          <p className="text-center text-stone-600 mb-10">
            Everything you need to know about golf courses, green fees, and buying golf property.
          </p>
          
          <div className="space-y-4">
            {GOLF_FAQS.map((faq, idx) => (
              <details
                key={idx}
                className="bg-white rounded-xl shadow-sm overflow-hidden group"
              >
                <summary className="px-6 py-4 cursor-pointer font-semibold text-[#1e3a5f] hover:text-[#e8913a] transition-colors flex justify-between items-center">
                  {faq.question}
                  <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-4 text-stone-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Find Your Perfect Golf Property
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact us today to discuss golf properties near your preferred course. 
            We'll help you find the perfect home for your golf lifestyle in Costa Blanca.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              💬 WhatsApp Us
            </a>
            <a
              href="tel:+34634044970"
              className="bg-[#e8913a] hover:bg-[#d4792c] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              📞 +34 634 044 970
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
