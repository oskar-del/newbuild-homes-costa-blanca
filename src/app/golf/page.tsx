import { Metadata } from 'next';
import Link from 'next/link';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Golf Properties Costa Blanca | Villas Near Golf',
  description: 'Find new build properties near the best golf courses in Costa Blanca. La Finca, Villamartín, Las Ramblas, Campoamor & more. Expert help for golf property buyers.',
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

interface GolfCourse {
  name: string;
  slug: string;
  location: string;
  holes: number;
  description: string;
  highlights: string[];
  greenFees: string;
  nearbyAreas: string[];
  googleMaps: string;
  website?: string;
}

const golfCourses: GolfCourse[] = [
  {
    name: 'La Finca Golf Resort',
    slug: 'la-finca',
    location: 'Algorfa',
    holes: 18,
    description: 'One of the most prestigious courses on Costa Blanca South, known for excellent conditioning and challenging layout with stunning mountain views.',
    highlights: ['Championship 18-hole course', 'Par 72, 6,017 meters', 'Excellent practice facilities', 'Clubhouse with restaurant'],
    greenFees: '€50-80',
    nearbyAreas: ['Algorfa', 'Rojales', 'Ciudad Quesada', 'Guardamar'],
    googleMaps: 'https://maps.google.com/?q=La+Finca+Golf+Algorfa',
    website: 'https://www.lafincagolf.com'
  },
  {
    name: 'Villamartín Golf',
    slug: 'villamartin',
    location: 'Orihuela Costa',
    holes: 18,
    description: 'One of the original Costa Blanca golf courses, a favorite of international golfers for over 50 years with mature trees and well-maintained fairways.',
    highlights: ['Established championship course', 'Par 72, 5,656 meters', 'Mature Mediterranean landscape', 'Active golf community'],
    greenFees: '€45-70',
    nearbyAreas: ['Villamartín', 'Orihuela Costa', 'La Zenia', 'Playa Flamenca'],
    googleMaps: 'https://maps.google.com/?q=Villamartin+Golf+Orihuela+Costa',
    website: 'https://www.villamartingolf.com'
  },
  {
    name: 'Las Ramblas Golf',
    slug: 'las-ramblas',
    location: 'Orihuela Costa',
    holes: 18,
    description: 'A challenging and scenic course built on hilly terrain with spectacular views of the Mediterranean and dramatic elevation changes.',
    highlights: ['Scenic hillside layout', 'Par 72, 5,611 meters', 'Panoramic Mediterranean views', 'Technical and rewarding'],
    greenFees: '€40-65',
    nearbyAreas: ['Orihuela Costa', 'Villamartín', 'Campoamor'],
    googleMaps: 'https://maps.google.com/?q=Las+Ramblas+Golf+Orihuela+Costa'
  },
  {
    name: 'Campoamor Golf',
    slug: 'campoamor',
    location: 'Dehesa de Campoamor',
    holes: 18,
    description: 'A well-established course in the exclusive Dehesa de Campoamor area with flat, walker-friendly layout and excellent year-round condition.',
    highlights: ['Flat, accessible layout', 'Par 72', 'Well-maintained fairways', 'Close to beaches'],
    greenFees: '€40-60',
    nearbyAreas: ['Campoamor', 'Pilar de la Horadada', 'Torre de la Horadada'],
    googleMaps: 'https://maps.google.com/?q=Campoamor+Golf'
  },
  {
    name: 'Vistabella Golf',
    slug: 'vistabella',
    location: 'Vistabella',
    holes: 18,
    description: 'A modern course with American-style design featuring wide fairways, large greens and extensive water features. Popular with all levels.',
    highlights: ['Modern American-style design', 'Par 72, 6,279 meters', 'Water features throughout', 'Wide, forgiving fairways'],
    greenFees: '€35-55',
    nearbyAreas: ['Vistabella', 'Algorfa', 'Rojales', 'Quesada'],
    googleMaps: 'https://maps.google.com/?q=Vistabella+Golf'
  },
  {
    name: 'La Marquesa Golf',
    slug: 'la-marquesa',
    location: 'Ciudad Quesada',
    holes: 18,
    description: 'A traditional parkland course in Ciudad Quesada, popular with residents and visitors for its friendly atmosphere and good value.',
    highlights: ['Traditional parkland layout', 'Par 72', 'Central Quesada location', 'Good value green fees'],
    greenFees: '€30-50',
    nearbyAreas: ['Ciudad Quesada', 'Rojales', 'Benijófar', 'Guardamar'],
    googleMaps: 'https://maps.google.com/?q=La+Marquesa+Golf+Quesada'
  },
  {
    name: 'Lo Romero Golf',
    slug: 'lo-romero',
    location: 'Pilar de la Horadada',
    holes: 18,
    description: 'Championship-standard course designed by Jack Nicklaus II with challenging bunkers, water hazards and excellent greens.',
    highlights: ['Jack Nicklaus II design', 'Par 72, 6,485 meters', 'Championship standard', 'Tournament host course'],
    greenFees: '€50-80',
    nearbyAreas: ['Pilar de la Horadada', 'Torre de la Horadada', 'San Pedro del Pinatar'],
    googleMaps: 'https://maps.google.com/?q=Lo+Romero+Golf'
  },
  {
    name: 'Jávea Golf Club',
    slug: 'javea',
    location: 'Jávea',
    holes: 9,
    description: 'An intimate 9-hole course in the prestigious Costa Blanca North with beautiful views of the Montgó mountain.',
    highlights: ['9-hole course', 'Par 68 (18 holes)', 'Montgó mountain views', 'Friendly atmosphere'],
    greenFees: '€35-50',
    nearbyAreas: ['Jávea', 'Dénia', 'Moraira', 'Benitachell'],
    googleMaps: 'https://maps.google.com/?q=Javea+Golf+Club',
    website: 'https://www.clubdegolfjavea.com'
  }
];

export default function GolfPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-green-800 to-green-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Golf Properties in Costa Blanca</h1>
          <p className="text-xl text-green-100 max-w-3xl mb-8">
            Discover new build homes near the best golf courses in Spain. Whether you're looking for a retirement retreat or a holiday home with year-round golf, we'll help you find the perfect property.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-white text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">WhatsApp Us</a>
            <a href="#courses" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">View Golf Courses</a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Golf in Costa Blanca?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">☀️</div>
              <h3 className="text-xl font-bold mb-3">300+ Days of Sunshine</h3>
              <p className="text-gray-600">Play golf year-round in one of Europe's sunniest climates. Mild winters mean no off-season.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⛳</div>
              <h3 className="text-xl font-bold mb-3">20+ Quality Courses</h3>
              <p className="text-gray-600">From championship courses to friendly local clubs, incredible variety for all skill levels.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3">Excellent Value</h3>
              <p className="text-gray-600">Green fees, property prices, and cost of living offer exceptional value vs Northern Europe.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="courses" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Golf Courses</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Explore the best golf courses in Costa Blanca and find properties nearby</p>
          <div className="space-y-8">
            {golfCourses.map((course) => (
              <div key={course.slug} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{course.name}</h3>
                      <p className="text-gray-500">{course.location} • {course.holes} holes</p>
                    </div>
                    <div className="flex gap-2">
                      <a href={course.googleMaps} target="_blank" rel="noopener noreferrer" className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">📍 Map</a>
                      {course.website && <a href={course.website} target="_blank" rel="noopener noreferrer" className="text-sm bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg transition-colors">🌐 Website</a>}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6">{course.description}</p>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Course Highlights</h4>
                      <ul className="space-y-1">
                        {course.highlights.map((h, i) => <li key={i} className="text-gray-600 text-sm flex items-start gap-2"><span className="text-green-500">✓</span> {h}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Nearby Areas</h4>
                      <p className="text-gray-600 text-sm">{course.nearbyAreas.join(', ')}</p>
                      <p className="text-gray-500 text-sm mt-2">Green fees: <span className="font-semibold">{course.greenFees}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Find Your Golf Property</h2>
            <p className="text-gray-600">Tell us which courses interest you and we'll send matching properties</p>
          </div>
          <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
            <LeadForm propertyInterest="Golf Properties - Costa Blanca" title="Get Golf Property Recommendations" subtitle="We specialize in properties near golf courses" compact={false} formName="lead-inquiry" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Golf Property?</h2>
          <p className="text-xl text-green-100 mb-8">Contact us today. We know the golf areas inside out and can match you with the perfect property.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-white text-green-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors">WhatsApp Us Now</a>
            <a href={`tel:${CONTACT.phone}`} className="border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors">{CONTACT.phone}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
