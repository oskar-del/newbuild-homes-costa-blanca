import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Nowe Budowy Costa Blanca | Nowoczesne Nieruchomości w Hiszpanii',
    template: '%s | Nowe Budowy Costa Blanca',
  },
  description: 'Znajdź wymarzoną nieruchomość na Costa Blanca w Hiszpanii. Wille, apartamenty i domy szeregowe od sprawdzonych deweloperów.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl',
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

export default function PolishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
