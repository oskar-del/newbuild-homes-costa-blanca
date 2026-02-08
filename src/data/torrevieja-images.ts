// Torrevieja drone photo library organized by zone
// 104+ professional helicopter drone photos

export interface DroneImage {
  src: string;
  alt: string;
  zone?: string;
}

// Base paths
const DRONE = '/images/Drone';
const DRONE2 = '/images/Drone 2/Areas & Zones/Torrevieja';
const DRONE2_POI = '/images/Drone 2/Areas & Zones/Torrevieja/Point of interest';
const DRONE2_MATA = '/images/Drone 2/Areas & Zones/Torrevieja/La Mata';
const DRONE2_MATA_POI = '/images/Drone 2/Areas & Zones/Torrevieja/La Mata/Point of interest';
const BEACHES = '/images/Drone 2/Beaches';

// Hero image
export const heroImage: DroneImage = {
  src: `${DRONE2}/Playa del Cura .jpg`,
  alt: 'Aerial view of Playa del Cura beach Torrevieja Spain Mediterranean coastline',
};

// Zone banner images (best photo per zone for parallax headers)
export const zoneBanners: Record<string, DroneImage> = {
  centro: {
    src: `${DRONE2}/Playa del Cura ( 2) .jpg`,
    alt: 'Playa del Cura aerial panorama Torrevieja city center Costa Blanca',
  },
  naufragos: {
    src: `${DRONE2}/Los Naufragos .jpg`,
    alt: 'Playa Los Naufragos beach and harbor aerial view Torrevieja',
  },
  'la-mata': {
    src: `${DRONE2_MATA}/La Mata .jpg`,
    alt: 'La Mata beach aerial view natural park salt lagoon Torrevieja',
  },
  'los-balcones': {
    src: `${DRONE2}/Los Balcones .jpg`,
    alt: 'Los Balcones residential area aerial view Torrevieja south coast',
  },
  torretas: {
    src: `${DRONE2}/Torretas ( 1) .jpg`,
    alt: 'Torretas neighborhood aerial view residential Torrevieja Spain',
  },
  'cabo-cervera': {
    src: `${DRONE2}/Cabo Cervera .jpg`,
    alt: 'Cabo Cervera rocky coastline aerial view Torrevieja Mediterranean',
  },
  'la-siesta': {
    src: `${DRONE2}/La Siesta .jpg`,
    alt: 'La Siesta residential area aerial view Torrevieja affordable living',
  },
};

// Zone gallery images
export const zoneGalleries: Record<string, DroneImage[]> = {
  centro: [
    { src: `${DRONE2}/Club Nautico.jpg`, alt: 'Club Nautico yacht club Torrevieja aerial drone photo' },
    { src: `${DRONE2}/Club Nautico 1.jpg`, alt: 'Torrevieja yacht harbor Club Nautico marina boats' },
    { src: `${DRONE2}/Paseo Maritime _ Marina Salinas.jpg`, alt: 'Paseo Maritimo promenade Marina Salinas Torrevieja' },
    { src: `${DRONE2}/paseo Maritime .jpg`, alt: 'Torrevieja seafront promenade paseo maritimo aerial' },
    { src: `${DRONE2_POI}/Avenida Habaneras.jpg`, alt: 'Avenida de las Habaneras shopping street Torrevieja center' },
  ],
  naufragos: [
    { src: `${DRONE2_POI}/Playa Los Naufragos .jpg`, alt: 'Playa Los Naufragos Blue Flag beach aerial view Torrevieja' },
    { src: `${DRONE2_POI}/Los Naufragos POI.jpg`, alt: 'Los Naufragos beach promenade restaurants Torrevieja' },
    { src: `${DRONE2_POI}/Marina Salinas .jpg`, alt: 'Marina Salinas luxury yacht port Torrevieja' },
    { src: `${DRONE2_POI}/Marina Boats .jpg`, alt: 'Marina boats harbor Torrevieja sailing Mediterranean' },
  ],
  'la-mata': [
    { src: `${DRONE2_MATA}/La Mata 2.jpg`, alt: 'La Mata beach wide sandy coastline Torrevieja aerial' },
    { src: `${DRONE2_MATA}/La Mata North .jpg`, alt: 'La Mata north section beach and dunes aerial view' },
    { src: `${DRONE2_MATA}/La Mata _ Laguna La Mata.jpg`, alt: 'Laguna de La Mata natural salt lake pink flamingos' },
    { src: `${DRONE2_MATA}/La Mata _ Moncayo .jpg`, alt: 'La Mata Moncayo area residential beach proximity' },
    { src: `${DRONE2_MATA}/Molino Blanco .jpg`, alt: 'Molino Blanco urbanization La Mata Torrevieja' },
    { src: `${DRONE2_MATA}/Park Aromatic .jpg`, alt: 'Parque Aromatico aromatic garden park La Mata Torrevieja' },
    { src: `${DRONE2_MATA}/La Mata Town Square .jpg`, alt: 'La Mata town square plaza restaurants local life' },
  ],
  'los-balcones': [
    { src: `${DRONE2}/Los Altos .jpg`, alt: 'Los Altos residential hillside views Torrevieja aerial' },
    { src: `${DRONE2}/Los Altos ( 2) .jpg`, alt: 'Los Altos community pools villas aerial Costa Blanca' },
    { src: `${DRONE2}/Los Altos _ Dream Hills .jpg`, alt: 'Dream Hills urbanization Los Altos panoramic sea views' },
    { src: `${DRONE2_POI}/Los Balcones .jpg`, alt: 'Los Balcones community pool area aerial Torrevieja' },
    { src: `${DRONE2_POI}/Los Balcones (2).jpg`, alt: 'Los Balcones residential streets Mediterranean villas' },
  ],
  torretas: [
    { src: `${DRONE2}/Torretas ( 2) .jpg`, alt: 'Torretas 2 residential quarter Torrevieja aerial view' },
    { src: `${DRONE2}/Torretas ( 3).jpg`, alt: 'Torretas 3 neighborhood community Torrevieja' },
    { src: `${DRONE2}/Torretas 5.jpg`, alt: 'Torretas 5 area Spanish residential Torrevieja' },
    { src: `${DRONE2}/Torretas _ Torreta Florida.jpg`, alt: 'Torreta Florida urbanization parks Torrevieja' },
    { src: `${DRONE2}/Aguas nuevas.jpg`, alt: 'Aguas Nuevas residential area Torrevieja affordable homes' },
  ],
  'cabo-cervera': [
    { src: `${DRONE2}/Playa Los Locos .jpg`, alt: 'Playa Los Locos beach aerial view Torrevieja rocky coves' },
    { src: `${DRONE2}/Torre del Moro .jpg`, alt: 'Torre del Moro watchtower coastal Torrevieja aerial' },
    { src: `${DRONE2}/Torre del Moro.jpg`, alt: 'Torre del Moro headland panoramic Mediterranean view' },
    { src: `${DRONE2_POI}/Playa Los Locos .jpg`, alt: 'Playa Los Locos Blue Flag beach crystal water Torrevieja' },
    { src: `${DRONE2_POI}/Cabo Cervera.jpg`, alt: 'Cabo Cervera cliff coastline rock formations Torrevieja' },
  ],
  'la-siesta': [
    { src: `${DRONE2}/La Siesta (2) .jpg`, alt: 'La Siesta urbanization aerial view Torrevieja residential' },
    { src: `${DRONE2}/Limonar .jpg`, alt: 'El Limonar neighborhood Torrevieja affordable living aerial' },
    { src: `${DRONE2}/Rosaleda.jpg`, alt: 'Rosaleda urbanization Torrevieja community pool area' },
    { src: `${DRONE2_POI}/La Siesta .jpg`, alt: 'La Siesta commercial area shops restaurants Torrevieja' },
    { src: `${DRONE2_POI}/El Limonar .jpg`, alt: 'El Limonar residential streets family neighborhood Torrevieja' },
  ],
};

// Beaches for carousel section
export const beachImages: DroneImage[] = [
  { src: `${DRONE2}/Playa del Cura .jpg`, alt: 'Playa del Cura main city beach Torrevieja Blue Flag award', zone: 'centro' },
  { src: `${BEACHES}/Playa Los Naufragos.jpg`, alt: 'Playa Los Naufragos family beach golden sand Torrevieja', zone: 'naufragos' },
  { src: `${BEACHES}/Playa Los Locos.jpg`, alt: 'Playa Los Locos secluded cove beach Torrevieja', zone: 'cabo-cervera' },
  { src: `${BEACHES}/La Mata Beach.jpg`, alt: 'La Mata Beach natural dunes 2km coastline Torrevieja', zone: 'la-mata' },
  { src: `${DRONE2}/Cabo Cervera .jpg`, alt: 'Cabo Cervera rocky coastline natural swimming pools', zone: 'cabo-cervera' },
  { src: `${DRONE2}/Playa Acequion.jpg`, alt: 'Playa del Acequion sheltered beach Torrevieja port area', zone: 'centro' },
  { src: `${DRONE2_MATA}/La Mata _ Azul Beach.jpg`, alt: 'Azul Beach La Mata chiringuito beach bar Mediterranean', zone: 'la-mata' },
  { src: `${DRONE2}/Aldea del Mar .jpg`, alt: 'Aldea del Mar beach cove south Torrevieja residential', zone: 'cabo-cervera' },
  { src: `${DRONE2}/Calas Blancas.jpg`, alt: 'Calas Blancas white rock coves swimming Torrevieja coast', zone: 'cabo-cervera' },
];

// Points of interest (additional context images)
export const pointsOfInterest: DroneImage[] = [
  { src: `${DRONE2_POI}/Market _ Sport center .jpg`, alt: 'Torrevieja Friday market sports center aerial view' },
  { src: `${DRONE2}/Parque Naciones.jpg`, alt: 'Parque de las Naciones water park Torrevieja' },
  { src: `${DRONE2}/Jardin del Mar ( Carrefour).jpg`, alt: 'Jardin del Mar Carrefour shopping area Torrevieja' },
  { src: `${DRONE2}/ Mar Azul .jpg`, alt: 'Mar Azul urbanization Torrevieja Mediterranean coast' },
  { src: `${DRONE2}/Market _ sport area .jpg`, alt: 'Torrevieja weekly market sports facilities aerial' },
  { src: `${DRONE2_POI}/Sector 25.jpg`, alt: 'Sector 25 new development area Torrevieja expansion' },
  { src: `${DRONE2_POI}/Playa del Cura - POI.jpg`, alt: 'Playa del Cura amenities restaurants Torrevieja center' },
  { src: `${DRONE2_POI}/Playa Acequion  .jpg`, alt: 'Playa Acequion port area beach Torrevieja aerial' },
];

// All Torrevieja images flattened for sitemap/gallery
export function getAllTorreviejaImages(): DroneImage[] {
  return [
    heroImage,
    ...Object.values(zoneBanners),
    ...Object.values(zoneGalleries).flat(),
    ...beachImages,
    ...pointsOfInterest,
  ];
}
