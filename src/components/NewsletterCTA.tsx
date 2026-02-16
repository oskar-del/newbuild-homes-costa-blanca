'use client';

import { useState, FormEvent } from 'react';

type CTAType = 'developments' | 'properties' | 'area' | 'general';

interface NewsletterCTAProps {
  type: CTAType;
  areaName?: string;
  language?: string;
  sourcePage?: string;
  className?: string;
}

const translations: Record<string, {
  developments: { title: string; subtitle: string; button: string; placeholder: string };
  properties: { title: string; subtitle: string; button: string; placeholder: string };
  area: { title: string; subtitle: string; button: string; placeholder: string };
  general: { title: string; subtitle: string; button: string; placeholder: string };
  success: string;
  error: string;
  privacy: string;
}> = {
  en: {
    developments: {
      title: 'New Development Alerts',
      subtitle: 'Be the first to know about new projects, prices & availability.',
      button: 'Get Alerts',
      placeholder: 'Your email address',
    },
    properties: {
      title: 'Latest Property Updates',
      subtitle: 'Get notified when new properties match your criteria.',
      button: 'Subscribe',
      placeholder: 'Your email address',
    },
    area: {
      title: 'Stay Updated on {area}',
      subtitle: 'New developments, price changes & local news delivered to your inbox.',
      button: 'Subscribe',
      placeholder: 'Your email address',
    },
    general: {
      title: 'Costa Blanca Property Newsletter',
      subtitle: 'Market insights, new developments & buying guides — once a week.',
      button: 'Subscribe',
      placeholder: 'Your email address',
    },
    success: 'You\'re subscribed! Check your inbox.',
    error: 'Something went wrong. Please try again.',
    privacy: 'No spam. Unsubscribe anytime.',
  },
  sv: {
    developments: {
      title: 'Nya Projektnyheter',
      subtitle: 'Var forst med att fa reda pa nya projekt, priser och tillganglighet.',
      button: 'Prenumerera',
      placeholder: 'Din e-postadress',
    },
    properties: {
      title: 'Senaste Fastighetsuppdateringar',
      subtitle: 'Fa meddelande nar nya fastigheter matchar dina kriterier.',
      button: 'Prenumerera',
      placeholder: 'Din e-postadress',
    },
    area: {
      title: 'Nyheter om {area}',
      subtitle: 'Nya projekt, prisandringar och lokala nyheter direkt till din inkorg.',
      button: 'Prenumerera',
      placeholder: 'Din e-postadress',
    },
    general: {
      title: 'Nyhetsbrev om Costa Blanca',
      subtitle: 'Marknadsinsikter, nya projekt och kopguider — en gang i veckan.',
      button: 'Prenumerera',
      placeholder: 'Din e-postadress',
    },
    success: 'Du ar prenumerant! Kolla din inkorg.',
    error: 'Nagot gick fel. Forsok igen.',
    privacy: 'Ingen spam. Avanmal nar som helst.',
  },
  nl: {
    developments: {
      title: 'Nieuwbouw Meldingen',
      subtitle: 'Wees de eerste die hoort over nieuwe projecten, prijzen en beschikbaarheid.',
      button: 'Aanmelden',
      placeholder: 'Uw e-mailadres',
    },
    properties: {
      title: 'Laatste Vastgoednieuws',
      subtitle: 'Ontvang een melding wanneer nieuwe woningen aan uw criteria voldoen.',
      button: 'Aanmelden',
      placeholder: 'Uw e-mailadres',
    },
    area: {
      title: 'Blijf op de hoogte van {area}',
      subtitle: 'Nieuwe projecten, prijswijzigingen en lokaal nieuws in uw inbox.',
      button: 'Aanmelden',
      placeholder: 'Uw e-mailadres',
    },
    general: {
      title: 'Costa Blanca Vastgoed Nieuwsbrief',
      subtitle: 'Marktinzichten, nieuwe projecten en koopgidsen — wekelijks.',
      button: 'Aanmelden',
      placeholder: 'Uw e-mailadres',
    },
    success: 'U bent aangemeld! Controleer uw inbox.',
    error: 'Er is iets misgegaan. Probeer het opnieuw.',
    privacy: 'Geen spam. Op elk moment afmelden.',
  },
  de: {
    developments: {
      title: 'Neubau-Benachrichtigungen',
      subtitle: 'Erfahren Sie als Erster von neuen Projekten, Preisen und Verfugbarkeit.',
      button: 'Anmelden',
      placeholder: 'Ihre E-Mail-Adresse',
    },
    properties: {
      title: 'Neueste Immobilien-Updates',
      subtitle: 'Erhalten Sie Benachrichtigungen, wenn neue Immobilien Ihren Kriterien entsprechen.',
      button: 'Anmelden',
      placeholder: 'Ihre E-Mail-Adresse',
    },
    area: {
      title: 'Aktuelles uber {area}',
      subtitle: 'Neue Projekte, Preisanderungen und lokale Nachrichten direkt in Ihr Postfach.',
      button: 'Anmelden',
      placeholder: 'Ihre E-Mail-Adresse',
    },
    general: {
      title: 'Costa Blanca Immobilien-Newsletter',
      subtitle: 'Markteinblicke, neue Projekte und Kaufratgeber — einmal pro Woche.',
      button: 'Anmelden',
      placeholder: 'Ihre E-Mail-Adresse',
    },
    success: 'Sie sind angemeldet! Prufen Sie Ihren Posteingang.',
    error: 'Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.',
    privacy: 'Kein Spam. Jederzeit abmelden.',
  },
  fr: {
    developments: {
      title: 'Alertes Nouveaux Programmes',
      subtitle: 'Soyez le premier informe des nouveaux projets, prix et disponibilites.',
      button: "S'inscrire",
      placeholder: 'Votre adresse e-mail',
    },
    properties: {
      title: 'Dernieres Annonces Immobilieres',
      subtitle: 'Recevez une notification lorsque de nouvelles proprietes correspondent a vos criteres.',
      button: "S'inscrire",
      placeholder: 'Votre adresse e-mail',
    },
    area: {
      title: 'Restez informe sur {area}',
      subtitle: 'Nouveaux projets, changements de prix et actualites locales dans votre boite mail.',
      button: "S'inscrire",
      placeholder: 'Votre adresse e-mail',
    },
    general: {
      title: 'Newsletter Immobilier Costa Blanca',
      subtitle: "Analyses du marche, nouveaux projets et guides d'achat — chaque semaine.",
      button: "S'inscrire",
      placeholder: 'Votre adresse e-mail',
    },
    success: 'Vous etes inscrit ! Verifiez votre boite de reception.',
    error: "Une erreur s'est produite. Veuillez reessayer.",
    privacy: 'Pas de spam. Desabonnement a tout moment.',
  },
  no: {
    developments: {
      title: 'Nybygg-varsler',
      subtitle: 'Var forst til a fa vite om nye prosjekter, priser og tilgjengelighet.',
      button: 'Abonner',
      placeholder: 'Din e-postadresse',
    },
    properties: {
      title: 'Siste Eiendomsoppdateringer',
      subtitle: 'Fa beskjed nar nye eiendommer matcher dine kriterier.',
      button: 'Abonner',
      placeholder: 'Din e-postadresse',
    },
    area: {
      title: 'Hold deg oppdatert om {area}',
      subtitle: 'Nye prosjekter, prisendringer og lokale nyheter rett i innboksen.',
      button: 'Abonner',
      placeholder: 'Din e-postadresse',
    },
    general: {
      title: 'Costa Blanca Eiendomsnyhetsbrev',
      subtitle: 'Markedsinnsikt, nye prosjekter og kjopsguider — ukentlig.',
      button: 'Abonner',
      placeholder: 'Din e-postadresse',
    },
    success: 'Du er abonnent! Sjekk innboksen din.',
    error: 'Noe gikk galt. Vennligst prov igjen.',
    privacy: 'Ingen spam. Avmeld nar som helst.',
  },
  pl: {
    developments: {
      title: 'Powiadomienia o Nowych Inwestycjach',
      subtitle: 'Badz pierwszym, ktory dowie sie o nowych projektach, cenach i dostepnosci.',
      button: 'Subskrybuj',
      placeholder: 'Twoj adres e-mail',
    },
    properties: {
      title: 'Najnowsze Oferty Nieruchomosci',
      subtitle: 'Otrzymuj powiadomienia, gdy nowe nieruchomosci odpowiadaja Twoim kryteriom.',
      button: 'Subskrybuj',
      placeholder: 'Twoj adres e-mail',
    },
    area: {
      title: 'Badz na biezaco z {area}',
      subtitle: 'Nowe projekty, zmiany cen i lokalne wiadomosci prosto do Twojej skrzynki.',
      button: 'Subskrybuj',
      placeholder: 'Twoj adres e-mail',
    },
    general: {
      title: 'Newsletter Nieruchomosci Costa Blanca',
      subtitle: 'Analizy rynku, nowe projekty i przewodniki — raz w tygodniu.',
      button: 'Subskrybuj',
      placeholder: 'Twoj adres e-mail',
    },
    success: 'Jestes subskrybentem! Sprawdz skrzynke odbiorcza.',
    error: 'Cos poszlo nie tak. Sprobuj ponownie.',
    privacy: 'Bez spamu. Zrezygnuj w kazdej chwili.',
  },
  ru: {
    developments: {
      title: 'Уведомления о Новостройках',
      subtitle: 'Узнавайте первыми о новых проектах, ценах и наличии.',
      button: 'Подписаться',
      placeholder: 'Ваш email',
    },
    properties: {
      title: 'Последние Обновления Недвижимости',
      subtitle: 'Получайте уведомления, когда новые объекты соответствуют вашим критериям.',
      button: 'Подписаться',
      placeholder: 'Ваш email',
    },
    area: {
      title: 'Новости о {area}',
      subtitle: 'Новые проекты, изменения цен и местные новости на вашу почту.',
      button: 'Подписаться',
      placeholder: 'Ваш email',
    },
    general: {
      title: 'Рассылка о Недвижимости Коста Бланка',
      subtitle: 'Аналитика рынка, новые проекты и руководства — раз в неделю.',
      button: 'Подписаться',
      placeholder: 'Ваш email',
    },
    success: 'Вы подписаны! Проверьте почту.',
    error: 'Что-то пошло не так. Попробуйте еще раз.',
    privacy: 'Без спама. Отписаться можно в любой момент.',
  },
};

// Use nl for nl-be
const getTranslation = (lang: string) => {
  const key = lang === 'nl-be' ? 'nl' : lang;
  return translations[key] || translations.en;
};

export default function NewsletterCTA({
  type,
  areaName,
  language = 'en',
  sourcePage,
  className = '',
}: NewsletterCTAProps) {
  const t = getTranslation(language);
  const content = t[type];
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const title = content.title.replace('{area}', areaName || 'Costa Blanca');
  const subtitle = content.subtitle.replace('{area}', areaName || 'Costa Blanca');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('submitting');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: email.trim(),
          formType: 'Newsletter Signup',
          sourcePage: sourcePage || '',
          language,
          area: areaName || '',
          message: `Newsletter signup: ${type}${areaName ? ` - ${areaName}` : ''}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  // Color schemes per type
  const schemes = {
    developments: 'bg-primary-900 text-white',
    properties: 'bg-accent-50 border border-accent-200',
    area: 'bg-gradient-to-r from-primary-800 to-primary-900 text-white',
    general: 'bg-warm-100 border border-warm-200',
  };

  const buttonSchemes = {
    developments: 'bg-accent-500 hover:bg-accent-600 text-white',
    properties: 'bg-accent-500 hover:bg-accent-600 text-white',
    area: 'bg-accent-500 hover:bg-accent-600 text-white',
    general: 'bg-primary-900 hover:bg-primary-800 text-white',
  };

  const textColor = type === 'developments' || type === 'area' ? 'text-white/80' : 'text-warm-600';
  const titleColor = type === 'developments' || type === 'area' ? 'text-white' : 'text-primary-900';

  if (status === 'success') {
    return (
      <div className={`${schemes[type]} rounded-sm p-6 text-center ${className}`}>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-3">
          <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className={`font-medium ${titleColor}`}>{t.success}</p>
      </div>
    );
  }

  return (
    <div className={`${schemes[type]} rounded-sm p-6 ${className}`}>
      <h3 className={`font-bold text-lg mb-1 ${titleColor}`}>{title}</h3>
      <p className={`text-sm mb-4 ${textColor}`}>{subtitle}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={content.placeholder}
          required
          className="flex-1 px-4 py-2.5 rounded-sm border border-warm-300 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-colors text-primary-900"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={`${buttonSchemes[type]} px-5 py-2.5 rounded-sm font-semibold transition-colors whitespace-nowrap disabled:opacity-70`}
        >
          {status === 'submitting' ? '...' : content.button}
        </button>
      </form>
      <p className={`text-xs mt-2 ${textColor} opacity-70`}>{t.privacy}</p>
      {status === 'error' && (
        <p className="text-red-400 text-sm mt-2">{t.error}</p>
      )}
    </div>
  );
}
