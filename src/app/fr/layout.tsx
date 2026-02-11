import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Constructions Neuves Costa Blanca | Propriétés Modernes en Espagne',
    template: '%s | Constructions Neuves Costa Blanca',
  },
  description: 'Découvrez votre propriété de rêve sur la Costa Blanca, Espagne. Villas, appartements et maisons neuves de promoteurs fiables.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr',
    languages: {
      'en': 'https://newbuildhomescostablanca.com',
      'sv': 'https://newbuildhomescostablanca.com/sv',
      'nl': 'https://newbuildhomescostablanca.com/nl',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be',
      'fr': 'https://newbuildhomescostablanca.com/fr',
      'no': 'https://newbuildhomescostablanca.com/no',
      'de': 'https://newbuildhomescostablanca.com/de',
      'pl': 'https://newbuildhomescostablanca.com/pl',
      'ru': 'https://newbuildhomescostablanca.com/ru',
      'x-default': 'https://newbuildhomescostablanca.com',
    },
  },
};

export default function FrenchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
