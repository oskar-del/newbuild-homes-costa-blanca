'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface MapLocation {
  id: string;
  name: string;
  type: 'beach' | 'golf' | 'hospital' | 'airport' | 'shopping' | 'area' | 'school' | 'market' | 'town' | 'attraction' | 'landmark' | 'residential' | 'restaurant' | 'marina' | 'nature' | 'transport';
  coordinates: [number, number]; // [lat, lng]
  distance?: string;
  description?: string;
  googleMapsLink?: string;
  internalLink?: string;
}

interface InteractiveAreaMapProps {
  areaName: string;
  centerCoordinates: [number, number]; // [lat, lng]
  zoom?: number;
  locations: MapLocation[];
}

export default function InteractiveAreaMap({
  areaName,
  centerCoordinates,
  zoom = 12,
  locations,
}: InteractiveAreaMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [mapLoaded, setMapLoaded] = useState(false);

  const typeIcons: Record<string, string> = {
    beach: '🏖️',
    golf: '⛳',
    hospital: '🏥',
    airport: '✈️',
    shopping: '🛍️',
    area: '📍',
    school: '🏫',
    market: '🛒',
    town: '🏘️',
    attraction: '🎡',
    landmark: '🏛️',
    residential: '🏠',
    restaurant: '🍽️',
    marina: '⚓',
    nature: '🌳',
    transport: '🚌',
  };

  const typeColors: Record<string, string> = {
    beach: 'bg-blue-500',
    golf: 'bg-green-500',
    hospital: 'bg-red-500',
    airport: 'bg-purple-500',
    shopping: 'bg-pink-500',
    area: 'bg-accent-500',
    school: 'bg-yellow-500',
    market: 'bg-orange-500',
    town: 'bg-indigo-500',
    attraction: 'bg-rose-500',
    landmark: 'bg-amber-500',
    residential: 'bg-teal-500',
    restaurant: 'bg-red-400',
    marina: 'bg-cyan-500',
    nature: 'bg-emerald-500',
    transport: 'bg-slate-500',
  };

  const typeLabels: Record<string, string> = {
    beach: 'Beaches',
    golf: 'Golf Courses',
    hospital: 'Healthcare',
    airport: 'Airport',
    shopping: 'Shopping',
    school: 'Schools',
    market: 'Markets',
    town: 'Towns',
    attraction: 'Attractions',
    landmark: 'Landmarks',
    residential: 'Residential',
    restaurant: 'Restaurants',
    marina: 'Marina',
    nature: 'Nature',
    transport: 'Transport',
  };

  useEffect(() => {
    // Load Leaflet dynamically
    const loadLeaflet = async () => {
      if (typeof window === 'undefined' || !mapRef.current) return;

      // Check if Leaflet is already loaded
      if ((window as any).L) {
        initMap((window as any).L);
        return;
      }

      // Load Leaflet CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(cssLink);

      // Load Leaflet JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        initMap((window as any).L);
      };
      document.body.appendChild(script);
    };

    const initMap = (L: any) => {
      if (!mapRef.current || mapRef.current.querySelector('.leaflet-container')) return;

      const map = L.map(mapRef.current).setView(centerCoordinates, zoom);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      // Custom icon function
      const createIcon = (type: string) => {
        const colors: Record<string, string> = {
          beach: '#3b82f6',
          golf: '#22c55e',
          hospital: '#ef4444',
          airport: '#a855f7',
          shopping: '#ec4899',
          area: '#d4a574',
          school: '#eab308',
          market: '#f97316',
        };

        return L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              background: ${colors[type] || '#d4a574'};
              width: 36px;
              height: 36px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              font-size: 18px;
            ">
              ${typeIcons[type] || '📍'}
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });
      };

      // Add center marker (main area)
      const centerIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background: #d4a574;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 4px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            font-size: 12px;
            font-weight: bold;
            color: white;
            text-align: center;
            line-height: 1.1;
          ">
            ${areaName}
          </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
      });

      L.marker(centerCoordinates, { icon: centerIcon })
        .addTo(map)
        .bindPopup(`<strong>${areaName}</strong><br/>Central location`);

      // Add location markers
      locations.forEach((location) => {
        const marker = L.marker(location.coordinates, { icon: createIcon(location.type) })
          .addTo(map);

        const popupContent = `
          <div style="min-width: 180px;">
            <strong style="font-size: 14px;">${typeIcons[location.type]} ${location.name}</strong>
            ${location.distance ? `<br/><span style="color: #d4a574; font-weight: 500;">📍 ${location.distance} from ${areaName}</span>` : ''}
            ${location.description ? `<br/><span style="color: #666; font-size: 12px;">${location.description}</span>` : ''}
            <div style="margin-top: 8px; display: flex; gap: 8px;">
              ${location.googleMapsLink ? `<a href="${location.googleMapsLink}" target="_blank" style="color: #d4a574; font-size: 12px; text-decoration: none;">Google Maps →</a>` : ''}
              ${location.internalLink ? `<a href="${location.internalLink}" style="color: #1a365d; font-size: 12px; text-decoration: none;">View Details →</a>` : ''}
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);
      });

      setMapLoaded(true);
    };

    loadLeaflet();
  }, [areaName, centerCoordinates, locations, zoom]);

  const filteredLocations = filter === 'all'
    ? locations
    : locations.filter(l => l.type === filter);

  const uniqueTypes = [...new Set(locations.map(l => l.type))];

  return (
    <section id="map" className="py-16 bg-warm-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Location</span>
          <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
            {areaName} <span className="font-semibold">Area Map</span>
          </h2>
          <p className="text-warm-600 max-w-2xl mx-auto">
            Explore what&apos;s nearby. Click on markers to see distances, details, and directions.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary-900 text-white'
                : 'bg-white text-warm-700 hover:bg-warm-100 shadow-sm'
            }`}
          >
            All ({locations.length})
          </button>
          {uniqueTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
                filter === type
                  ? 'bg-primary-900 text-white'
                  : 'bg-white text-warm-700 hover:bg-warm-100 shadow-sm'
              }`}
            >
              <span>{typeIcons[type]}</span>
              <span>{typeLabels[type] || type}</span>
            </button>
          ))}
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-warm-200">
          <div
            ref={mapRef}
            className="w-full h-[400px] lg:h-[500px]"
            style={{ zIndex: 1 }}
          />
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-warm-100">
              <div className="text-warm-500">Loading map...</div>
            </div>
          )}
        </div>

        {/* Location List */}
        <div className="mt-8">
          <h3 className="font-semibold text-primary-900 text-lg mb-4">
            {filter === 'all' ? 'All Locations' : typeLabels[filter] || filter} ({filteredLocations.length})
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLocations.map((location) => (
              <div
                key={location.id}
                className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 ${typeColors[location.type]} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-lg">{typeIcons[location.type]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-primary-900 truncate">{location.name}</h4>
                  {location.distance && (
                    <p className="text-accent-600 text-sm">{location.distance}</p>
                  )}
                  {location.description && (
                    <p className="text-warm-500 text-xs mt-1 line-clamp-2">{location.description}</p>
                  )}
                  <div className="flex gap-3 mt-2">
                    {location.googleMapsLink && (
                      <a
                        href={location.googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-600 hover:text-accent-700 text-xs font-medium"
                      >
                        📍 Directions
                      </a>
                    )}
                    {location.internalLink && (
                      <Link
                        href={location.internalLink}
                        className="text-primary-700 hover:text-primary-900 text-xs font-medium"
                      >
                        View Details →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
