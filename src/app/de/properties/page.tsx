'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Metadata handled by layout
// Title: Neubau Costa Blanca kaufen | Villen & Wohnungen
// Description: Blättern Sie durch 1000+ Neubauvillas und Wohnungen zum Verkauf an der Costa Blanca.

function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

export default function DePropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    town: '',
    beds: '',
    maxPrice: '',
  });

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const response = await fetch('/api/properties');
        const data = await response.json();
        setProperties(data || []);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  const filteredProperties = properties.filter(p => {
    if (filters.town && !p.town?.includes(filters.town)) return false;
    if (filters.beds && p.bedrooms !== parseInt(filters.beds)) return false;
    if (filters.maxPrice && p.price > parseInt(filters.maxPrice)) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-warm-600">Immobilien werden geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Alle Neubauten an der <span className="font-semibold">Costa Blanca</span>
          </h1>
          <p className="text-warm-300 text-lg mb-8">
            {filteredProperties.length.toLocaleString()} Immobilien zum Verkauf
          </p>

          <div className="grid md:grid-cols-3 gap-4 bg-white/10 backdrop-blur p-6 rounded-sm">
            <div>
              <label className="text-white text-sm font-medium block mb-2">Ort</label>
              <input
                type="text"
                placeholder="Stadt eingeben"
                value={filters.town}
                onChange={(e) => setFilters({...filters, town: e.target.value})}
                className="w-full px-4 py-2 rounded-sm border border-warm-200 bg-white text-primary-900"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-2">Schlafzimmer</label>
              <select
                value={filters.beds}
                onChange={(e) => setFilters({...filters, beds: e.target.value})}
                className="w-full px-4 py-2 rounded-sm border border-warm-200 bg-white text-primary-900"
              >
                <option value="">Alle</option>
                <option value="1">1 Zimmer</option>
                <option value="2">2 Zimmer</option>
                <option value="3">3 Zimmer</option>
                <option value="4">4+ Zimmer</option>
              </select>
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-2">Max. Preis</label>
              <input
                type="number"
                placeholder="Max Preis"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                className="w-full px-4 py-2 rounded-sm border border-warm-200 bg-white text-primary-900"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {filteredProperties.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.slice(0, 30).map((property) => (
                <Link
                  key={property.id}
                  href={`/de/properties/${property.id}`}
                  className="group bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all border border-warm-100"
                >
                  <div className="relative h-48 overflow-hidden bg-warm-200">
                    {property.image && (
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-accent-600 font-medium">{property.zone || property.town}</span>
                    <h3 className="text-primary-900 font-semibold mt-2 group-hover:text-accent-600 transition-colors line-clamp-2">
                      {property.title}
                    </h3>
                    <p className="text-warm-600 text-sm mt-1">
                      {property.bedrooms} Zimmer • {property.size || property.builtArea}m²
                    </p>
                    <div className="mt-3 pt-3 border-t border-warm-100">
                      <span className="text-lg font-bold text-primary-900">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-warm-600 text-lg">Keine Immobilien gefunden</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-white mb-4">
            Benötigen Sie <span className="font-semibold">Hilfe?</span>
          </h2>
          <p className="text-warm-300 mb-8">Unsere Experten helfen Ihnen, Ihre ideale Immobilie zu finden.</p>
          <Link
            href="/de/contact"
            className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
          >
            Kontakt Aufnehmen
          </Link>
        </div>
      </section>
    </main>
  );
}
