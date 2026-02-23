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
// SCHEMA - Defines the props for the property reel
// ============================================================================

export const propertyReelSchema = z.object({
  propertyRef: z.string(),
  images: z.array(z.string()),
  title: z.string(),
  price: z.number(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  area: z.number(),
  town: z.string(),
  province: z.string(),
  type: z.string(),
  features: z.array(z.string()),
  agentName: z.string(),
  agentPhone: z.string(),
  websiteUrl: z.string(),
  language: z.enum(["en", "sv", "nl", "nl-be", "fr", "no", "de", "pl", "ru"]),
  musicTrack: z.string().optional(),
});

type PropertyReelProps = z.infer<typeof propertyReelSchema>;

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations: Record<string, {
  bedrooms: string;
  bathrooms: string;
  sqm: string;
  newBuild: string;
  contactUs: string;
  fromPrice: string;
  keyReady: string;
}> = {
  en: { bedrooms: "Bedrooms", bathrooms: "Bathrooms", sqm: "m²", newBuild: "New Build", contactUs: "Contact Us", fromPrice: "From", keyReady: "Key Ready" },
  sv: { bedrooms: "Sovrum", bathrooms: "Badrum", sqm: "m²", newBuild: "Nybygge", contactUs: "Kontakta Oss", fromPrice: "Från", keyReady: "Inflyttningsklart" },
  nl: { bedrooms: "Slaapkamers", bathrooms: "Badkamers", sqm: "m²", newBuild: "Nieuwbouw", contactUs: "Neem Contact Op", fromPrice: "Vanaf", keyReady: "Kant en Klaar" },
  "nl-be": { bedrooms: "Slaapkamers", bathrooms: "Badkamers", sqm: "m²", newBuild: "Nieuwbouw", contactUs: "Neem Contact Op", fromPrice: "Vanaf", keyReady: "Kant en Klaar" },
  fr: { bedrooms: "Chambres", bathrooms: "Salles de bain", sqm: "m²", newBuild: "Neuf", contactUs: "Contactez-nous", fromPrice: "À partir de", keyReady: "Clé en main" },
  no: { bedrooms: "Soverom", bathrooms: "Bad", sqm: "m²", newBuild: "Nybygg", contactUs: "Kontakt Oss", fromPrice: "Fra", keyReady: "Innflyttingsklar" },
  de: { bedrooms: "Schlafzimmer", bathrooms: "Badezimmer", sqm: "m²", newBuild: "Neubau", contactUs: "Kontaktieren Sie Uns", fromPrice: "Ab", keyReady: "Bezugsfertig" },
  pl: { bedrooms: "Sypialnie", bathrooms: "Łazienki", sqm: "m²", newBuild: "Nowe Budowy", contactUs: "Skontaktuj się", fromPrice: "Od", keyReady: "Pod klucz" },
  ru: { bedrooms: "Спальни", bathrooms: "Ванные", sqm: "м²", newBuild: "Новостройка", contactUs: "Свяжитесь с нами", fromPrice: "От", keyReady: "Под ключ" },
};

// ============================================================================
// FORMAT HELPERS
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

// ============================================================================
// BRAND COLORS - Matching the website
// ============================================================================

const COLORS = {
  primary: "#1a2332",    // Dark navy
  accent: "#c5a55a",     // Gold
  white: "#ffffff",
  warm50: "#faf8f5",
  warm700: "#4a4540",
};

// ============================================================================
// SCENE 1: HERO IMAGE WITH PROPERTY TYPE BADGE
// ============================================================================

const HeroScene: React.FC<{
  image: string;
  type: string;
  town: string;
  lang: string;
}> = ({ image, type, town, lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = translations[lang] || translations.en;

  // Ken Burns effect - slow zoom
  const scale = interpolate(frame, [0, 150], [1, 1.15], {
    extrapolateRight: "clamp",
  });

  // Badge slide in
  const badgeX = spring({ frame, fps, from: -300, to: 0, durationInFrames: 20 });

  // Location fade in
  const locationOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Background image with Ken Burns */}
      <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <Img
          src={image}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale})`,
          }}
        />
      </div>

      {/* Dark gradient overlay at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "linear-gradient(transparent, rgba(26,35,50,0.9))",
        }}
      />

      {/* New Build badge */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          transform: `translateX(${badgeX}px)`,
          background: COLORS.accent,
          padding: "16px 40px 16px 40px",
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <span style={{ color: COLORS.white, fontSize: 32, fontWeight: 700, letterSpacing: 2 }}>
          {t.newBuild.toUpperCase()}
        </span>
      </div>

      {/* Property type + location */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 60,
          right: 60,
          opacity: locationOpacity,
        }}
      >
        <span style={{ color: COLORS.accent, fontSize: 28, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>
          {type}
        </span>
        <div style={{ color: COLORS.white, fontSize: 52, fontWeight: 700, marginTop: 8, lineHeight: 1.2 }}>
          {town}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 2: PRICE + SPECS
// ============================================================================

const PriceScene: React.FC<{
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  title: string;
  lang: string;
}> = ({ price, bedrooms, bathrooms, area, title, lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = translations[lang] || translations.en;

  const priceScale = spring({ frame, fps, from: 0.5, to: 1, durationInFrames: 15 });
  const priceOpacity = spring({ frame, fps, from: 0, to: 1, durationInFrames: 15 });

  const specDelay = 10;
  const spec1 = spring({ frame: frame - specDelay, fps, from: 50, to: 0, durationInFrames: 15 });
  const spec2 = spring({ frame: frame - specDelay - 5, fps, from: 50, to: 0, durationInFrames: 15 });
  const spec3 = spring({ frame: frame - specDelay - 10, fps, from: 50, to: 0, durationInFrames: 15 });
  const specOpacity = interpolate(frame, [specDelay, specDelay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.primary, justifyContent: "center", alignItems: "center", padding: 60 }}>
      {/* Gold accent line */}
      <div style={{ width: 80, height: 4, background: COLORS.accent, marginBottom: 40 }} />

      {/* Title */}
      <div style={{ color: COLORS.white, fontSize: 38, fontWeight: 400, textAlign: "center", marginBottom: 30, opacity: priceOpacity, lineHeight: 1.3 }}>
        {title}
      </div>

      {/* Price - big and bold */}
      <div
        style={{
          color: COLORS.accent,
          fontSize: 96,
          fontWeight: 800,
          transform: `scale(${priceScale})`,
          opacity: priceOpacity,
          marginBottom: 50,
        }}
      >
        {formatPrice(price, lang)}
      </div>

      {/* Specs row */}
      <div style={{ display: "flex", gap: 60, opacity: specOpacity }}>
        <div style={{ textAlign: "center", transform: `translateY(${spec1}px)` }}>
          <div style={{ color: COLORS.white, fontSize: 56, fontWeight: 700 }}>{bedrooms}</div>
          <div style={{ color: COLORS.accent, fontSize: 22, fontWeight: 500, marginTop: 4 }}>{t.bedrooms}</div>
        </div>
        <div style={{ textAlign: "center", transform: `translateY(${spec2}px)` }}>
          <div style={{ color: COLORS.white, fontSize: 56, fontWeight: 700 }}>{bathrooms}</div>
          <div style={{ color: COLORS.accent, fontSize: 22, fontWeight: 500, marginTop: 4 }}>{t.bathrooms}</div>
        </div>
        <div style={{ textAlign: "center", transform: `translateY(${spec3}px)` }}>
          <div style={{ color: COLORS.white, fontSize: 56, fontWeight: 700 }}>{area}</div>
          <div style={{ color: COLORS.accent, fontSize: 22, fontWeight: 500, marginTop: 4 }}>{t.sqm}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 3: IMAGE GALLERY (cycle through remaining images)
// ============================================================================

const GalleryScene: React.FC<{
  images: string[];
  features: string[];
}> = ({ images, features }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cycle through images every 1.5 seconds (45 frames at 30fps) — TikTok pace
  const imageIndex = Math.floor(frame / 45) % Math.max(images.length, 1);
  const imageProgress = (frame % 45) / 45;

  // Ken Burns for current image — faster zoom
  const scale = interpolate(imageProgress, [0, 1], [1.02, 1.12]);

  // Feature tags animation
  const tagOpacity = spring({ frame: frame - 10, fps, from: 0, to: 1, durationInFrames: 20 });

  return (
    <AbsoluteFill>
      <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <Img
          src={images[imageIndex] || images[0]}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale})`,
          }}
        />
      </div>

      {/* Feature tags at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 40,
          right: 40,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          opacity: tagOpacity,
        }}
      >
        {features.slice(0, 5).map((feature, i) => (
          <div
            key={feature}
            style={{
              background: "rgba(26,35,50,0.85)",
              border: `2px solid ${COLORS.accent}`,
              borderRadius: 8,
              padding: "10px 24px",
              color: COLORS.white,
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            {feature}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 4: CTA - Contact / Website
// ============================================================================

const CTAScene: React.FC<{
  agentName: string;
  agentPhone: string;
  websiteUrl: string;
  lang: string;
}> = ({ agentName, agentPhone, websiteUrl, lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = translations[lang] || translations.en;

  const fadeIn = spring({ frame, fps, from: 0, to: 1, durationInFrames: 20 });
  const slideUp = spring({ frame: frame - 10, fps, from: 30, to: 0, durationInFrames: 20 });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Logo area */}
      <div style={{ opacity: fadeIn, marginBottom: 60 }}>
        <div style={{ color: COLORS.accent, fontSize: 28, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", textAlign: "center" }}>
          New Build Homes
        </div>
        <div style={{ color: COLORS.white, fontSize: 48, fontWeight: 700, textAlign: "center", marginTop: 8 }}>
          Costa Blanca
        </div>
      </div>

      {/* CTA Button */}
      <div
        style={{
          background: COLORS.accent,
          borderRadius: 12,
          padding: "24px 60px",
          opacity: fadeIn,
          transform: `translateY(${slideUp}px)`,
          marginBottom: 40,
        }}
      >
        <span style={{ color: COLORS.primary, fontSize: 36, fontWeight: 700 }}>
          {t.contactUs}
        </span>
      </div>

      {/* Agent info */}
      <div style={{ opacity: fadeIn, textAlign: "center" }}>
        <div style={{ color: COLORS.white, fontSize: 32, fontWeight: 600, marginBottom: 12 }}>
          {agentName}
        </div>
        <div style={{ color: COLORS.accent, fontSize: 28, marginBottom: 8 }}>
          {agentPhone}
        </div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 24 }}>
          {websiteUrl}
        </div>
      </div>

      {/* WhatsApp hint */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          background: "#25D366",
          borderRadius: 50,
          padding: "14px 40px",
          display: "flex",
          alignItems: "center",
          gap: 12,
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
// MAIN COMPOSITION - Orchestrates all scenes
// ============================================================================

export const PropertyReel: React.FC<PropertyReelProps> = (props) => {
  const { fps } = useVideoConfig();

  // FASTER PACING — ~2 seconds per scene for TikTok/Reels algorithm
  // At 30fps, 15 seconds total = 450 frames
  //
  // Scene 1: Hero (0-2.5s = 0-75 frames) — hook shot, fast
  // Scene 2: Price + Specs (2.5-5s = 75-150 frames) — key info quick
  // Scene 3: Gallery (5-12s = 150-360 frames) — 2s per image, cycle through
  // Scene 4: CTA (12-15s = 360-450 frames) — contact info
  //
  // PLATFORM DIFFERENCES:
  // - TikTok: 9:16, 15-60s, fast cuts, first 2s = hook
  // - Instagram Reels: 9:16, 15-90s, slightly slower OK, captions help
  // - YouTube Shorts: 9:16, up to 60s, slightly more polished
  // This composition targets the TikTok sweet spot — works on all three.

  // Resolve music track
  const musicSrc = props.musicTrack
    ? props.musicTrack.startsWith("http")
      ? props.musicTrack
      : staticFile(props.musicTrack)
    : null;

  return (
    <AbsoluteFill style={{ background: COLORS.primary }}>
      {/* Background music — fades out in last 2 seconds */}
      {musicSrc && (
        <Audio
          src={musicSrc}
          volume={(f) =>
            interpolate(f, [0, 10, 390, 450], [0, 0.6, 0.6, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      )}

      {/* Hero — 2.5s hook */}
      <Sequence from={0} durationInFrames={75}>
        <HeroScene
          image={props.images[0] || ""}
          type={props.type}
          town={props.town}
          lang={props.language}
        />
      </Sequence>

      {/* Price + Specs — 2.5s */}
      <Sequence from={75} durationInFrames={75}>
        <PriceScene
          price={props.price}
          bedrooms={props.bedrooms}
          bathrooms={props.bathrooms}
          area={props.area}
          title={props.title}
          lang={props.language}
        />
      </Sequence>

      {/* Gallery — 7s, ~2s per image */}
      <Sequence from={150} durationInFrames={210}>
        <GalleryScene
          images={props.images.slice(1, 6)}
          features={props.features}
        />
      </Sequence>

      {/* CTA — 3s */}
      <Sequence from={360} durationInFrames={90}>
        <CTAScene
          agentName={props.agentName}
          agentPhone={props.agentPhone}
          websiteUrl={props.websiteUrl}
          lang={props.language}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
