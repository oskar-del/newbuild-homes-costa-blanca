import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Polityka prywatności | New Build Homes Costa Blanca',
  description: 'Polityka prywatności New Build Homes Costa Blanca. Dowiedz się, jak zbieramy, używamy i chronimy Twoje dane osobowe.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl/privacy',
  },
};

export default function PrivacyPagePl() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Strona główna', url: 'https://newbuildhomescostablanca.com/pl/' },
    { name: 'Polityka prywatności', url: 'https://newbuildhomescostablanca.com/pl/privacy/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-primary-900 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-4">
              <Link href="/pl/" className="hover:text-white transition-colors">Strona główna</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Polityka prywatności</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-light text-white">
              Polityka prywatności
            </h1>
            <p className="text-warm-300 mt-4">
              Ostatnia aktualizacja: Luty 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 prose prose-warm max-w-none">

              <h2 className="text-2xl font-semibold text-primary-900 mt-0">1. Wprowadzenie</h2>
              <p className="text-warm-700">
                New Build Homes Costa Blanca (&quot;my,&quot; &quot;nas,&quot; lub &quot;naszych&quot;) zobowiązuje się do ochrony Twojej prywatności.
                Niniejsza Polityka prywatności wyjaśnia, w jaki sposób zbieramy, wykorzystujemy, ujawniamy i chronimy Twoje informacje, gdy
                odwiedzasz naszą witrynę newbuildhomescostablanca.com.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">2. Informacje, które zbieramy</h2>

              <h3 className="text-lg font-semibold text-primary-900">Dane osobowe</h3>
              <p className="text-warm-700">
                Gdy wypełniasz nasze formularze kontaktowe lub formularze zapytań, możemy zbierać:
              </p>
              <ul className="text-warm-700">
                <li>Imię i nazwisko</li>
                <li>Adres e-mail</li>
                <li>Numer telefonu</li>
                <li>Preferencje nieruchomości i wymagania</li>
                <li>Zakres budżetu</li>
                <li>Harmonogram zakupu</li>
              </ul>

              <h3 className="text-lg font-semibold text-primary-900">Automatycznie zebrane informacje</h3>
              <p className="text-warm-700">
                Gdy odwiedzasz naszą witrynę, możemy automatycznie zbierać pewne informacje, w tym:
              </p>
              <ul className="text-warm-700">
                <li>Adres IP</li>
                <li>Typ i wersja przeglądarki</li>
                <li>Odwiedzone strony i czas spędzony</li>
                <li>Witryna odsyłająca</li>
                <li>Informacje o urządzeniu</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">3. Pliki cookie</h2>
              <p className="text-warm-700">
                Używamy plików cookie i podobnych technologii śledzenia, aby poprawić Twoje doświadczenie przeglądania.
                Możesz kontrolować preferencje plików cookie za pośrednictwem naszego baneru zgody na pliki cookie.
              </p>

              <h3 className="text-lg font-semibold text-primary-900">Rodzaje plików cookie, które używamy</h3>
              <ul className="text-warm-700">
                <li><strong>Pliki cookie niezbędne:</strong> Niezbędne do prawidłowego działania witryny</li>
                <li><strong>Pliki cookie analityczne:</strong> Pomagają nam zrozumieć, w jaki sposób odwiedzający korzystają z naszej witryny (Google Analytics)</li>
                <li><strong>Pliki cookie marketingowe:</strong> Używane do śledzenia odwiedzających na witrynach w celach reklamowych</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">4. Jak wykorzystujemy Twoje informacje</h2>
              <p className="text-warm-700">Wykorzystujemy zebrane informacje do:</p>
              <ul className="text-warm-700">
                <li>Odpowiadania na Twoje zapytania i wnioski dotyczące nieruchomości</li>
                <li>Wysyłania Ci informacji o nieruchomościach spełniających Twoje kryteria</li>
                <li>Poprawy naszej witryny i usług</li>
                <li>Analizy wzorców użytkowania witryny</li>
                <li>Spełniania zobowiązań prawnych</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">5. Udostępnianie danych</h2>
              <p className="text-warm-700">
                Możemy udostępniać Twoje informacje:
              </p>
              <ul className="text-warm-700">
                <li>Deweloperom nieruchomości i budowniczym, gdy wyrażasz zainteresowanie konkretnymi projektami</li>
                <li>Naszym zaufanym partnerom (prawników, doradcom hipotecznym) na żądanie</li>
                <li>Dostawcom usług, którzy pomagają nam obsługiwać naszą witrynę</li>
                <li>Władzom prawnym, gdy jest to wymagane przez prawo</li>
              </ul>
              <p className="text-warm-700">
                Nigdy nie będziemy sprzedawać Twoich danych osobowych stronom trzecim.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">6. Twoje prawa (RODO)</h2>
              <p className="text-warm-700">
                Zgodnie z Ogólnym Rozporządzeniem o Ochronie Danych (RODO) masz prawo do:
              </p>
              <ul className="text-warm-700">
                <li><strong>Dostępu:</strong> Zażądaj kopii swoich danych osobowych</li>
                <li><strong>Sprostowania:</strong> Zażądaj poprawienia niedokładnych danych</li>
                <li><strong>Usunięcia:</strong> Zażądaj usunięcia swoich danych osobowych</li>
                <li><strong>Ograniczenia przetwarzania:</strong> Zażądaj ograniczenia sposobu wykorzystywania Twoich danych</li>
                <li><strong>Przenoszalności danych:</strong> Uzyskaj swoje dane w przenośnym formacie</li>
                <li><strong>Sprzeciwu:</strong> Sprzeciwu się przetwarzaniu Twoich danych osobowych</li>
                <li><strong>Wycofania zgody:</strong> Wycofaj zgodę w dowolnym momencie</li>
              </ul>
              <p className="text-warm-700">
                Aby skorzystać z któregokolwiek z tych praw, skontaktuj się z nami na{' '}
                <a href="mailto:info@newbuildhomescostablanca.com" className="text-accent-600 hover:underline">
                  info@newbuildhomescostablanca.com
                </a>
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">7. Bezpieczeństwo danych</h2>
              <p className="text-warm-700">
                Wdrażamy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych
                osobowych przed nieuprawnionym dostępem, zmianą, ujawnieniem lub zniszczeniem. Jednak
                żadna metoda przesyłania przez Internet nie jest w 100% bezpieczna.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">8. Przechowywanie danych</h2>
              <p className="text-warm-700">
                Przechowujemy Twoje dane osobowe tak długo, jak jest to konieczne do realizacji celów
                określonych w niniejszej polityce, chyba że prawo wymaga dłuższego okresu przechowywania. Dane zapytań
                są zwykle przechowywane przez 3 lata od Twojej ostatniej interakcji z nami.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">9. Usługi stron trzecich</h2>
              <p className="text-warm-700">
                Nasza witryna może korzystać z usług stron trzecich, w tym:
              </p>
              <ul className="text-warm-700">
                <li>Google Analytics (analiza witryny)</li>
                <li>Google Tag Manager (zarządzanie tagami)</li>
                <li>Netlify (hosting witryny i przetwarzanie formularzy)</li>
                <li>WhatsApp (usługa wiadomości)</li>
              </ul>
              <p className="text-warm-700">
                Te usługi mają własne polityki prywatności regulujące korzystanie z Twoich informacji.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">10. Prywatność dzieci</h2>
              <p className="text-warm-700">
                Nasza witryna nie jest przeznaczona dla dzieci poniżej 16 roku życia. Nie zbieramy świadomie
                danych osobowych od dzieci poniżej 16 roku życia.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">11. Zmiany w tej polityce</h2>
              <p className="text-warm-700">
                Możemy okresowo aktualizować niniejszą Politykę prywatności. Powiadomimy Cię o zmianach
                poprzez opublikowanie nowej Polityki prywatności na tej stronie i zaktualizowanie daty &quot;Ostatnia aktualizacja&quot;.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">12. Skontaktuj się z nami</h2>
              <p className="text-warm-700">
                Jeśli masz pytania dotyczące niniejszej Polityki prywatności, skontaktuj się z nami:
              </p>
              <ul className="text-warm-700">
                <li>E-mail: <a href="mailto:info@newbuildhomescostablanca.com" className="text-accent-600 hover:underline">info@newbuildhomescostablanca.com</a></li>
                <li>Telefon: <a href="tel:+34634044970" className="text-accent-600 hover:underline">+34 634 044 970</a></li>
                <li>WhatsApp: <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">Wyślij nam wiadomość</a></li>
              </ul>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
