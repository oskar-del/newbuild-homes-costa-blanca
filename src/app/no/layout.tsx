import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Nybygg Costa Blanca | Moderne Boliger i Spania',
    template: '%s | Nybygg Costa Blanca',
  },
  description: 'Finn din drømmebolig på Costa Blanca, Spania. Villaer, leiligheter og rekkehus fra pålitlige utbyggere.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no',
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

export default function NorwegianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
