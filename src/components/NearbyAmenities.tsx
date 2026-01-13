'use client';

import { UnifiedProperty } from '@/lib/unified-property';

// Known locations with coordinates for distance calculations
const KNOWN_LOCATIONS = {
  // Airports
  alicante_airport: { name: 'Alicante Airport', lat: 38.2822, lng: -0.5582, icon: '✈️' },
  murcia_airport: { name: 'Murcia Airport', lat: 37.8034, lng: -1.1253, icon: '✈️' },
  
  // Major shopping centers
  la_zenia_boulevard: { name: 'La Zenia Boulevard', lat: 37.9277, lng: -0.7362, icon: '🛍️' },
  habaneras: { name: 'Habaneras Shopping Center', lat: 37.9789, lng: -0.6837, icon: '🛍️' },
  
  // Golf courses (Costa Blanca South)
  la_finca_golf: { name: 'La Finca Golf', lat: 38.0647, lng: -0.7928, icon: '⛳' },
  villamartin_golf: { name: 'Villamartin Golf', lat: 37.9402, lng: -0.7645, icon: '⛳' },
  las_ramblas_golf: { name: 'Las Ramblas Golf', lat: 37.9247, lng: -0.7715, icon: '⛳' },
  campoamor_golf: { name: 'Campoamor Golf', lat: 37.8952, lng: -0.7498, icon: '⛳' },
  vistabella_golf: { name: 'Vistabella Golf', lat: 38.0298, lng: -0.8247, icon: '⛳' },
  la_marquesa_golf: { name: 'La Marquesa Golf', lat: 38.0912, lng: -0.8823, icon: '⛳' },
  
  // Golf courses (Costa Blanca North)
  javea_golf: { name: 'Javea Golf', lat: 38.7913, lng: 0.1654, icon: '⛳' },
  oliva_nova_golf: { name: 'Oliva Nova Golf', lat: 38.9187, lng: -0.0837, icon: '⛳' },
  la_sella_golf: { name: 'La Sella Golf', lat: 38.8234, lng: 0.0156, icon: '⛳' },
  
  // Major towns/beaches (Costa Blanca South)
  torrevieja_center: { name: 'Torrevieja Center', lat: 37.9786, lng: -0.6822, icon: '🏛️' },
  torrevieja_marina: { name: 'Torrevieja Marina', lat: 37.9756, lng: -0.6788, icon: '🍽️' },
  playa_del_cura: { name: 'Playa del Cura Beach', lat: 37.9823, lng: -0.6801, icon: '🏖️' },
  la_mata_beach: { name: 'La Mata Beach', lat: 37.9978, lng: -0.6623, icon: '🏖️' },
  guardamar_beach: { name: 'Guardamar Beach', lat: 38.0897, lng: -0.6489, icon: '🏖️' },
  pink_lake: { name: 'Las Salinas Pink Lake', lat: 37.9612, lng: -0.7123, icon: '📍' },
  orihuela_costa: { name: 'Orihuela Costa', lat: 37.9234, lng: -0.7456, icon: '🏛️' },
  
  // Major towns (Costa Blanca North)
  javea_center: { name: 'Javea Old Town', lat: 38.7873, lng: 0.1623, icon: '🏛️' },
  javea_port: { name: 'Javea Port', lat: 38.7934, lng: 0.1878, icon: '🍽️' },
  arenal_beach: { name: 'Arenal Beach Javea', lat: 38.7756, lng: 0.1712, icon: '🏖️' },
  denia_center: { name: 'Denia Center', lat: 38.8408, lng: 0.1056, icon: '🏛️' },
  denia_port: { name: 'Denia Port', lat: 38.8445, lng: 0.1198, icon: '⛴️' },
  altea_center: { name: 'Altea Old Town', lat: 38.5989, lng: -0.0512, icon: '🏛️' },
  calpe_center: { name: 'Calpe Center', lat: 38.6456, lng: 0.0445, icon: '🏛️' },
  moraira_center: { name: 'Moraira Center', lat: 38.6867, lng: 0.1389, icon: '🏛️' },
  benidorm_center: { name: 'Benidorm Center', lat: 38.5398, lng: -0.1312, icon: '🏛️' },
  
  // Hospitals
  torrevieja_hospital: { name: 'Torrevieja Hospital', lat: 37.9456, lng: -0.7112, icon: '🏥' },
  marina_baixa_hospital: { name: 'Marina Baixa Hospital', lat: 38.5523, lng: -0.0912, icon: '🏥' },
};

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Determine region based on latitude (roughly south of Alicante = South)
function getRegion(lat: number): 'north' | 'south' {
  return lat > 38.35 ? 'north' : 'south';
}

// Town center coordinates for distance calculations (not exact property location)
const TOWN_CENTERS: Record<string, { lat: number; lng: number }> = {
  // Costa Blanca South
  'torrevieja': { lat: 37.9786, lng: -0.6822 },
  'orihuela costa': { lat: 37.9234, lng: -0.7456 },
  'villamartin': { lat: 37.9402, lng: -0.7645 },
  'guardamar del segura': { lat: 38.0897, lng: -0.6489 },
  'guardamar': { lat: 38.0897, lng: -0.6489 },
  'algorfa': { lat: 38.0647, lng: -0.7928 },
  'rojales': { lat: 38.0876, lng: -0.7234 },
  'ciudad quesada': { lat: 38.0512, lng: -0.7623 },
  'quesada': { lat: 38.0512, lng: -0.7623 },
  'la zenia': { lat: 37.9277, lng: -0.7362 },
  'playa flamenca': { lat: 37.9312, lng: -0.7523 },
  'pilar de la horadada': { lat: 37.8656, lng: -0.7912 },
  'san miguel de salinas': { lat: 37.9823, lng: -0.7845 },
  'los montesinos': { lat: 38.0123, lng: -0.7534 },
  'almoradi': { lat: 38.1089, lng: -0.7912 },
  'catral': { lat: 38.1567, lng: -0.8023 },
  
  // Costa Blanca North
  'javea': { lat: 38.7873, lng: 0.1623 },
  'xabia': { lat: 38.7873, lng: 0.1623 },
  'moraira': { lat: 38.6867, lng: 0.1389 },
  'calpe': { lat: 38.6456, lng: 0.0445 },
  'altea': { lat: 38.5989, lng: -0.0512 },
  'denia': { lat: 38.8408, lng: 0.1056 },
  'benidorm': { lat: 38.5398, lng: -0.1312 },
  'albir': { lat: 38.5712, lng: -0.0634 },
  'alfaz del pi': { lat: 38.5823, lng: -0.0923 },
  'benitachell': { lat: 38.7234, lng: 0.1567 },
  'cumbre del sol': { lat: 38.7123, lng: 0.1456 },
  'pedreguer': { lat: 38.8123, lng: 0.0345 },
  'gata de gorgos': { lat: 38.7734, lng: 0.0823 },
  'teulada': { lat: 38.7289, lng: 0.1045 },
  
  // Inland
  'pinoso': { lat: 38.4012, lng: -1.0412 },
  'hondon de las nieves': { lat: 38.2934, lng: -0.9623 },
  'aspe': { lat: 38.3456, lng: -0.7678 },
  'elche': { lat: 38.2669, lng: -0.6983 },
  'alicante': { lat: 38.3452, lng: -0.4810 },
};

// Get town center coordinates (fallback to property coords if town not found)
function getTownCoordinates(property: UnifiedProperty): { lat: number; lng: number } | null {
  const townLower = property.town?.toLowerCase().trim();
  
  // Try exact match first
  if (townLower && TOWN_CENTERS[townLower]) {
    return TOWN_CENTERS[townLower];
  }
  
  // Try partial match
  for (const [key, coords] of Object.entries(TOWN_CENTERS)) {
    if (townLower?.includes(key) || key.includes(townLower || '')) {
      return coords;
    }
  }
  
  // Fallback to property coordinates if we have them (rare case)
  if (property.latitude && property.longitude) {
    return { lat: property.latitude, lng: property.longitude };
  }
  
  return null;
}

// Get relevant amenities for a property based on its TOWN location (not exact address)
function getRelevantAmenities(property: UnifiedProperty) {
  const townCoords = getTownCoordinates(property);
  
  if (!townCoords) return [];
  
  const { lat, lng } = townCoords;
  const region = getRegion(lat);
  const amenities: { name: string; distance: number; icon: string; type: string; googleMapsUrl: string }[] = [];
  
  // Note: Google Maps URLs point to TOWN center, not exact property (for lead generation)
  
  // Always include nearest airport
  const alicanteDistance = calculateDistance(lat, lng, KNOWN_LOCATIONS.alicante_airport.lat, KNOWN_LOCATIONS.alicante_airport.lng);
  const murciaDistance = calculateDistance(lat, lng, KNOWN_LOCATIONS.murcia_airport.lat, KNOWN_LOCATIONS.murcia_airport.lng);
  
  if (alicanteDistance < murciaDistance) {
    amenities.push({
      name: 'Alicante Airport',
      distance: Math.round(alicanteDistance),
      icon: '✈️',
      type: 'airport',
      googleMapsUrl: `https://www.google.com/maps/search/Alicante+Airport`
    });
  } else {
    amenities.push({
      name: 'Murcia Airport',
      distance: Math.round(murciaDistance),
      icon: '✈️',
      type: 'airport',
      googleMapsUrl: `https://www.google.com/maps/search/Murcia+Corvera+Airport`
    });
  }
  
  // Find nearest beach
  const beaches = region === 'south' 
    ? ['playa_del_cura', 'la_mata_beach', 'guardamar_beach']
    : ['arenal_beach', 'denia_port'];
  
  let nearestBeach = { name: '', distance: Infinity, icon: '🏖️', lat: 0, lng: 0 };
  beaches.forEach(key => {
    const loc = KNOWN_LOCATIONS[key as keyof typeof KNOWN_LOCATIONS];
    const dist = calculateDistance(lat, lng, loc.lat, loc.lng);
    if (dist < nearestBeach.distance) {
      nearestBeach = { name: loc.name, distance: dist, icon: loc.icon, lat: loc.lat, lng: loc.lng };
    }
  });
  if (nearestBeach.name) {
    amenities.push({
      name: nearestBeach.name,
      distance: Math.round(nearestBeach.distance * 10) / 10,
      icon: nearestBeach.icon,
      type: 'beach',
      googleMapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(nearestBeach.name)}`
    });
  }
  
  // Find nearest shopping center
  const shopping = region === 'south'
    ? ['la_zenia_boulevard', 'habaneras']
    : ['denia_center', 'benidorm_center'];
  
  let nearestShopping = { name: '', distance: Infinity, icon: '🛍️', lat: 0, lng: 0 };
  shopping.forEach(key => {
    const loc = KNOWN_LOCATIONS[key as keyof typeof KNOWN_LOCATIONS];
    const dist = calculateDistance(lat, lng, loc.lat, loc.lng);
    if (dist < nearestShopping.distance) {
      nearestShopping = { name: loc.name, distance: dist, icon: loc.icon, lat: loc.lat, lng: loc.lng };
    }
  });
  if (nearestShopping.name) {
    amenities.push({
      name: nearestShopping.name,
      distance: Math.round(nearestShopping.distance * 10) / 10,
      icon: nearestShopping.icon,
      type: 'shopping',
      googleMapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(nearestShopping.name)}`
    });
  }
  
  // Find nearest golf course
  const golfCourses = region === 'south'
    ? ['la_finca_golf', 'villamartin_golf', 'las_ramblas_golf', 'campoamor_golf', 'vistabella_golf', 'la_marquesa_golf']
    : ['javea_golf', 'oliva_nova_golf', 'la_sella_golf'];
  
  let nearestGolf = { name: '', distance: Infinity, icon: '⛳', lat: 0, lng: 0 };
  golfCourses.forEach(key => {
    const loc = KNOWN_LOCATIONS[key as keyof typeof KNOWN_LOCATIONS];
    const dist = calculateDistance(lat, lng, loc.lat, loc.lng);
    if (dist < nearestGolf.distance) {
      nearestGolf = { name: loc.name, distance: dist, icon: loc.icon, lat: loc.lat, lng: loc.lng };
    }
  });
  if (nearestGolf.name && nearestGolf.distance < 30) { // Only show if within 30km
    amenities.push({
      name: nearestGolf.name,
      distance: Math.round(nearestGolf.distance * 10) / 10,
      icon: nearestGolf.icon,
      type: 'golf',
      googleMapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(nearestGolf.name)}`
    });
  }
  
  // Find nearest marina/port
  const marinas = region === 'south'
    ? ['torrevieja_marina']
    : ['javea_port', 'denia_port'];
  
  let nearestMarina = { name: '', distance: Infinity, icon: '🍽️', lat: 0, lng: 0 };
  marinas.forEach(key => {
    const loc = KNOWN_LOCATIONS[key as keyof typeof KNOWN_LOCATIONS];
    const dist = calculateDistance(lat, lng, loc.lat, loc.lng);
    if (dist < nearestMarina.distance) {
      nearestMarina = { name: loc.name, distance: dist, icon: loc.icon, lat: loc.lat, lng: loc.lng };
    }
  });
  if (nearestMarina.name && nearestMarina.distance < 25) {
    amenities.push({
      name: nearestMarina.name,
      distance: Math.round(nearestMarina.distance * 10) / 10,
      icon: nearestMarina.icon,
      type: 'dining',
      googleMapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(nearestMarina.name)}`
    });
  }
  
  // Add Pink Lake for south properties
  if (region === 'south') {
    const pinkLakeDistance = calculateDistance(lat, lng, KNOWN_LOCATIONS.pink_lake.lat, KNOWN_LOCATIONS.pink_lake.lng);
    if (pinkLakeDistance < 15) {
      amenities.push({
        name: 'Las Salinas Pink Lake',
        distance: Math.round(pinkLakeDistance * 10) / 10,
        icon: '📍',
        type: 'attraction',
        googleMapsUrl: `https://www.google.com/maps/search/Las+Salinas+Pink+Lake+Torrevieja`
      });
    }
  }
  
  // Sort by distance
  return amenities.sort((a, b) => a.distance - b.distance).slice(0, 6);
}

interface NearbyAmenitiesProps {
  property: UnifiedProperty;
}

export default function NearbyAmenities({ property }: NearbyAmenitiesProps) {
  const amenities = getRelevantAmenities(property);
  
  if (amenities.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-stone-50 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#1e3a5f]">
          Distances from {property.town || 'this area'}
        </h3>
        <span className="text-sm text-stone-500">Approximate distances</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {amenities.map((amenity, index) => (
          <a
            key={index}
            href={amenity.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-stone-200 hover:border-[#e8913a] hover:shadow-sm transition-all"
          >
            <span className="text-2xl">{amenity.icon}</span>
            <div>
              <div className="font-medium text-stone-800">{amenity.name}</div>
              <div className="text-sm text-stone-500">{amenity.distance} km</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
