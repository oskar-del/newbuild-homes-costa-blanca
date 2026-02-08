// Jávea Super Guide - Image definitions
// Aerial canvas photos and any available imagery

export interface GuideImage {
  src: string;
  alt: string;
  zone?: string;
}

// Base paths
const CANVAS = '/images/Area canvas';

// Hero image — stunning aerial of Jávea coastline
export const heroImage: GuideImage = {
  src: `${CANVAS}/Javea.png`,
  alt: 'Aerial view of Jávea coastline with Montgó mountain and Mediterranean Sea',
};

// Secondary aerial — different angle
export const secondaryImage: GuideImage = {
  src: `${CANVAS}/Javea (2).png`,
  alt: 'Aerial panorama of Jávea showing Arenal beach, port, and old town',
};

// Zone banner images — map each neighborhood to the best available image
export const zoneBanners: Record<string, GuideImage> = {
  arenal: {
    src: `${CANVAS}/Javea.png`,
    alt: 'Aerial view of Arenal beach and bay in Jávea',
    zone: 'arenal',
  },
  'old-town': {
    src: `${CANVAS}/Javea (2).png`,
    alt: 'Aerial view of Jávea old town and Montgó mountain',
    zone: 'old-town',
  },
  port: {
    src: `${CANVAS}/Javea.png`,
    alt: 'Jávea port area with marina and fishing boats',
    zone: 'port',
  },
  montanar: {
    src: `${CANVAS}/Javea (2).png`,
    alt: 'Montgó mountain and Montañar residential area aerial view',
    zone: 'montanar',
  },
};

// Nearby area images for the Costa Blanca North context section
export const nearbyAreaImages: GuideImage[] = [
  { src: `${CANVAS}/Moraira.png`, alt: 'Aerial view of Moraira coastline' },
  { src: `${CANVAS}/Calpe.png`, alt: 'Aerial view of Calpe and Peñón de Ifach' },
  { src: `${CANVAS}/Denia.png`, alt: 'Aerial view of Denia castle and coastline' },
  { src: `${CANVAS}/altea.png`, alt: 'Aerial view of Altea old town' },
  { src: `${CANVAS}/Benissa.png`, alt: 'Aerial view of Benissa coast' },
  { src: `${CANVAS}/Benitachell.png`, alt: 'Aerial view of Benitachell cliffs' },
];

export function getAllJaveaImages(): GuideImage[] {
  return [
    heroImage,
    secondaryImage,
    ...Object.values(zoneBanners),
    ...nearbyAreaImages,
  ];
}
