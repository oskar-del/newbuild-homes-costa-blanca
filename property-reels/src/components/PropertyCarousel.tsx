import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
  staticFile,
} from "remotion";
import { z } from "zod";

// ============================================================================
// SCHEMA
// ============================================================================

const carouselPropertySchema = z.object({
  reference: z.string(),
  image: z.string(),
  title: z.string(),
  price: z.number(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  area: z.number(),
  town: z.string(),
  type: z.string(),
});

export const propertyCarouselSchema = z.object({
  properties: z.array(carouselPropertySchema),
  headline: z.string(),
  subheadline: z.string(),
  agentName: z.string(),
  agentPhone: z.string(),
  websiteUrl: z.string(),
  language: z.enum(["en", "sv", "nl", "nl-be", "fr", "no", "de", "pl", "ru"]),
  musicTrack: z.string().optional(),
});

type CarouselProperty = z.infer<typeof carouselPropertySchema>;
type PropertyCarouselProps = z.infer<typeof propertyCarouselSchema>;

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations: Record<string, {
  bedrooms: string;
  bathrooms: string;
  sqm: string;
  viewAll: string;
  contactUs: string;
  fromPrice: string;
  newProperties: string;
}> = {
  en: { bedrooms: "Bed", bathrooms: "Bath", sqm: "m²", viewAll: "View All Properties", contactUs: "Contact Us", fromPrice: "From", newProperties: "New Properties" },
  sv: { bedrooms: "Sovrum", bathrooms: "Bad", sqm: "m²", viewAll: "Visa Alla", contactUs: "Kontakta Oss", fromPrice: "Från", newProperties: "Nya Bostäder" },
  nl: { bedrooms: "Slpk", bathrooms: "Badk", sqm: "m²", viewAll: "Bekijk Alles", contactUs: "Neem Contact Op", fromPrice: "Vanaf", newProperties: "Nieuwe Woningen" },
  "nl-be": { bedrooms: "Slpk", bathrooms: "Badk", sqm: "m²", viewAll: "Bekijk Alles", contactUs: "Neem Contact Op", fromPrice: "Vanaf", newProperties: "Nieuwe Woningen" },
  fr: { bedrooms: "Ch.", bathrooms: "SdB", sqm: "m²", viewAll: "Voir Tout", contactUs: "Contactez-nous", fromPrice: "À partir de", newProperties: "Nouveautés" },
  no: { bedrooms: "Sov", bathrooms: "Bad", sqm: "m²", viewAll: "Se Alle", contactUs: "Kontakt Oss", fromPrice: "Fra", newProperties: "Nye Boliger" },
  de: { bedrooms: "Schlafz.", bathrooms: "Badez.", sqm: "m²", viewAll: "Alle Anzeigen", contactUs: "Kontaktieren Sie Uns", fromPrice: "Ab", newProperties: "Neue Immobilien" },
  pl: { bedrooms: "Syp.", bathrooms: "Łaz.", sqm: "m²", viewAll: "Zobacz Wszystkie", contactUs: "Skontaktuj się", fromPrice: "Od", newProperties: "Nowe Nieruchomości" },
  ru: { bedrooms: "Спал.", bathrooms: "Ванн.", sqm: "м²", viewAll: "Смотреть Все", contactUs: "Связаться", fromPrice: "От", newProperties: "Новые Объекты" },
};

// ============================================================================
// HELPERS
// ============================================================================

function formatPrice(price: number, lang: string): string {
  if (["de", "nl", "nl-be", "fr", "pl"].includes(lang)) {
    return `€${price.toLocaleString("de-DE")}`;
  }
  if (lang === "sv" || lang === "no") {
    return `${price.toLocaleString("sv-SE")} €`;
  }
  if (lang === "ru") {
    return `€${price.toLocaleString("ru-RU")}`;
  }
  return `€${price.toLocaleString("en-GB")}`;
}

const COLORS = {
  primary: "#1a2332",
  accent: "#c5a55a",
  white: "#ffffff",
  warm50: "#faf8f5",
  warm700: "#4a4540",
};

// ============================================================================
// INTRO SCENE — Headline + branding
// ============================================================================

const IntroScene: React.FC<{
  headline: string;
  subheadline: string;
  lang: string;
}> = ({ headline, subheadline, lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = translations[lang] || translations.en;

  const fadeIn = spring({ frame, fps, from: 0, to: 1, durationInFrames: 20 });
  const lineWidth = spring({ frame: frame - 5, fps, from: 0, to: 80, durationInFrames: 25 });
  const subFade = spring({ frame: frame - 15, fps, from: 0, to: 1, durationInFrames: 20 });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      {/* Gold accent line */}
      <div
        style={{
          width: lineWidth,
          height: 4,
          background: COLORS.accent,
          marginBottom: 50,
        }}
      />

      {/* Brand name */}
      <div
        style={{
          opacity: fadeIn,
          color: COLORS.accent,
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        New Build Homes
      </div>

      {/* Headline */}
      <div
        style={{
          opacity: fadeIn,
          color: COLORS.white,
          fontSize: 56,
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: 30,
        }}
      >
        {headline}
      </div>

      {/* Subheadline (e.g. "From €164,000") */}
      <div
        style={{
          opacity: subFade,
          color: COLORS.accent,
          fontSize: 42,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        {subheadline}
      </div>

      {/* New Properties badge */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          background: "rgba(197,165,90,0.15)",
          border: `2px solid ${COLORS.accent}`,
          borderRadius: 50,
          padding: "12px 36px",
          opacity: subFade,
        }}
      >
        <span style={{ color: COLORS.accent, fontSize: 24, fontWeight: 600, letterSpacing: 2 }}>
          {t.newProperties.toUpperCase()}
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// PROPERTY CARD SCENE — One property at a time, full screen
// ============================================================================

const PropertyCardScene: React.FC<{
  property: CarouselProperty;
  index: number;
  total: number;
  lang: string;
}> = ({ property, index, total, lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = translations[lang] || translations.en;

  // Image Ken Burns — faster zoom for snappier feel
  const scale = interpolate(frame, [0, 90], [1.02, 1.15], {
    extrapolateRight: "clamp",
  });

  // Content slide up — faster animation
  const slideUp = spring({ frame: frame - 3, fps, from: 40, to: 0, durationInFrames: 12 });
  const contentOpacity = spring({ frame: frame - 3, fps, from: 0, to: 1, durationInFrames: 12 });

  // Price pop — punchy entrance
  const priceScale = spring({ frame: frame - 8, fps, from: 0.6, to: 1, durationInFrames: 10, config: { damping: 8 } });
  const priceOpacity = spring({ frame: frame - 8, fps, from: 0, to: 1, durationInFrames: 10 });

  return (
    <AbsoluteFill>
      {/* Background image */}
      <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <Img
          src={property.image}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale})`,
          }}
        />
      </div>

      {/* Gradient overlay — taller for more readable text */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          background: "linear-gradient(transparent 0%, rgba(26,35,50,0.4) 30%, rgba(26,35,50,0.95) 70%)",
        }}
      />

      {/* Counter badge */}
      <div
        style={{
          position: "absolute",
          top: 70,
          right: 50,
          background: "rgba(26,35,50,0.7)",
          backdropFilter: "blur(10px)",
          borderRadius: 50,
          padding: "12px 28px",
          border: `1px solid rgba(197,165,90,0.4)`,
        }}
      >
        <span style={{ color: COLORS.accent, fontSize: 26, fontWeight: 700 }}>
          {index + 1}/{total}
        </span>
      </div>

      {/* Property type badge */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          background: COLORS.accent,
          padding: "12px 36px 12px 44px",
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          opacity: contentOpacity,
        }}
      >
        <span style={{ color: COLORS.primary, fontSize: 26, fontWeight: 700, letterSpacing: 2 }}>
          {property.type.toUpperCase()}
        </span>
      </div>

      {/* Content area — more padding, cleaner layout */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 60,
          right: 60,
          opacity: contentOpacity,
          transform: `translateY(${slideUp}px)`,
        }}
      >
        {/* Town */}
        <div style={{
          color: COLORS.accent,
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: 3,
          marginBottom: 14,
        }}>
          📍 {property.town.toUpperCase()}
        </div>

        {/* Price — big and bold */}
        <div
          style={{
            color: COLORS.white,
            fontSize: 72,
            fontWeight: 800,
            marginBottom: 30,
            transform: `scale(${priceScale})`,
            opacity: priceOpacity,
            transformOrigin: "left center",
            lineHeight: 1,
          }}
        >
          {formatPrice(property.price, lang)}
        </div>

        {/* Specs row — pill style, well spaced */}
        <div style={{ display: "flex", gap: 20 }}>
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              borderRadius: 50,
              padding: "14px 28px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ color: COLORS.white, fontSize: 30, fontWeight: 700 }}>{property.bedrooms}</span>
            <span style={{ color: COLORS.accent, fontSize: 20, fontWeight: 500 }}>{t.bedrooms}</span>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              borderRadius: 50,
              padding: "14px 28px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ color: COLORS.white, fontSize: 30, fontWeight: 700 }}>{property.bathrooms}</span>
            <span style={{ color: COLORS.accent, fontSize: 20, fontWeight: 500 }}>{t.bathrooms}</span>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              borderRadius: 50,
              padding: "14px 28px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ color: COLORS.white, fontSize: 30, fontWeight: 700 }}>{property.area}</span>
            <span style={{ color: COLORS.accent, fontSize: 20, fontWeight: 500 }}>{t.sqm}</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// CTA SCENE
// ============================================================================

const CarouselCTAScene: React.FC<{
  agentName: string;
  agentPhone: string;
  websiteUrl: string;
  lang: string;
  propertyCount: number;
}> = ({ agentName, agentPhone, websiteUrl, lang, propertyCount }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = translations[lang] || translations.en;

  const fadeIn = spring({ frame, fps, from: 0, to: 1, durationInFrames: 15 });
  const slideUp = spring({ frame: frame - 6, fps, from: 30, to: 0, durationInFrames: 15 });
  const btnPop = spring({ frame: frame - 12, fps, from: 0.8, to: 1, durationInFrames: 12 });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.primary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Top section — Brand */}
      <div style={{ opacity: fadeIn, textAlign: "center", marginBottom: 80 }}>
        <div style={{ color: COLORS.accent, fontSize: 26, fontWeight: 600, letterSpacing: 6, textTransform: "uppercase" }}>
          New Build Homes
        </div>
        <div style={{ color: COLORS.white, fontSize: 52, fontWeight: 700, marginTop: 12 }}>
          Costa Blanca
        </div>
      </div>

      {/* Middle section — CTA button */}
      <div
        style={{
          opacity: fadeIn,
          transform: `translateY(${slideUp}px) scale(${btnPop})`,
          marginBottom: 80,
        }}
      >
        <div
          style={{
            background: COLORS.accent,
            borderRadius: 16,
            padding: "28px 80px",
          }}
        >
          <span style={{ color: COLORS.primary, fontSize: 36, fontWeight: 700 }}>
            {t.viewAll}
          </span>
        </div>
      </div>

      {/* Bottom section — Contact info, well spaced */}
      <div style={{ opacity: fadeIn, textAlign: "center" }}>
        <div style={{ color: COLORS.white, fontSize: 34, fontWeight: 600, marginBottom: 20 }}>
          {agentName}
        </div>
        <div style={{ color: COLORS.accent, fontSize: 30, marginBottom: 16 }}>
          {agentPhone}
        </div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 24 }}>
          {websiteUrl}
        </div>
      </div>

      {/* WhatsApp — fixed to bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          background: "#25D366",
          borderRadius: 50,
          padding: "16px 44px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          opacity: fadeIn,
        }}
      >
        <span style={{ fontSize: 30 }}>💬</span>
        <span style={{ color: COLORS.white, fontSize: 24, fontWeight: 600 }}>WhatsApp</span>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// MAIN COMPOSITION
// ============================================================================

export const PropertyCarousel: React.FC<PropertyCarouselProps> = (props) => {
  const { fps } = useVideoConfig();

  // SNAPPIER TIMING — ~2-3s per scene
  // Intro: 2.5s (75 frames) — hook fast
  // Each property: 3s (90 frames) — enough to read price + specs
  // CTA: 3s (90 frames) — contact info
  // Max 5 properties = 2.5 + 15 + 3 = 20.5s (punchy, high retention)

  const introFrames = 75;
  const propertyFrames = 90;
  const ctaFrames = 90;
  const maxProperties = Math.min(props.properties.length, 5);
  const totalFrames = introFrames + maxProperties * propertyFrames + ctaFrames;

  // Resolve music track
  const musicSrc = props.musicTrack
    ? props.musicTrack.startsWith("http")
      ? props.musicTrack
      : staticFile(props.musicTrack)
    : null;

  return (
    <AbsoluteFill style={{ background: COLORS.primary }}>
      {/* Background music — fades in/out */}
      {musicSrc && (
        <Audio
          src={musicSrc}
          volume={(f) =>
            interpolate(
              f,
              [0, 20, totalFrames - 60, totalFrames],
              [0, 0.5, 0.5, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )
          }
        />
      )}

      {/* Intro */}
      <Sequence from={0} durationInFrames={introFrames}>
        <IntroScene
          headline={props.headline}
          subheadline={props.subheadline}
          lang={props.language}
        />
      </Sequence>

      {/* Property cards */}
      {props.properties.slice(0, maxProperties).map((property, i) => (
        <Sequence
          key={property.reference}
          from={introFrames + i * propertyFrames}
          durationInFrames={propertyFrames}
        >
          <PropertyCardScene
            property={property}
            index={i}
            total={maxProperties}
            lang={props.language}
          />
        </Sequence>
      ))}

      {/* CTA */}
      <Sequence
        from={introFrames + maxProperties * propertyFrames}
        durationInFrames={ctaFrames}
      >
        <CarouselCTAScene
          agentName={props.agentName}
          agentPhone={props.agentPhone}
          websiteUrl={props.websiteUrl}
          lang={props.language}
          propertyCount={props.properties.length}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
