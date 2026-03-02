import {
  AbsoluteFill,
  Img,
  staticFile,
} from "remotion";
import { z } from "zod";

// ============================================================================
// SCHEMA
// ============================================================================

export const areaShowcaseSchema = z.object({
  image: z.string(),
  locationName: z.string(),
  tagline: z.string().default("Discover Your Dream Home"),
  websiteUrl: z.string().default("newbuildhomescostablanca.com"),
});

type AreaShowcaseProps = z.infer<typeof areaShowcaseSchema>;

// ============================================================================
// DESIGN SYSTEM — Editorial / Verity-inspired
// Photo is 100%, text floats over a subtle gradient
// Light, airy, luxury magazine feel — NOT dark navy boxes
// ============================================================================

const COLORS = {
  text900: "#1E2A38",
  accent: "#B39960",
};

// ============================================================================
// AREA SHOWCASE — Full-bleed photo with editorial text overlay
// ============================================================================

export const AreaShowcase: React.FC<AreaShowcaseProps> = ({
  image,
  locationName,
  tagline,
  websiteUrl,
}) => {
  const imgSrc = image.startsWith("http") || image.startsWith("/")
    ? image
    : staticFile(image);

  return (
    <AbsoluteFill>
      {/* Full-bleed photo — the entire card */}
      <Img
        src={imgSrc}
        alt={locationName}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Soft gradient — just enough for text, not a dark overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background:
            "linear-gradient(transparent, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.5))",
        }}
      />

      {/* Tag pill — top left, frosted glass */}
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 32,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: COLORS.accent,
          }}
        />
        <span
          style={{
            color: COLORS.text900,
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: 2.5,
            textTransform: "uppercase",
          }}
        >
          Area Guide
        </span>
      </div>

      {/* Logo — top right, frosted glass */}
      <div
        style={{
          position: "absolute",
          top: 28,
          right: 28,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Img
          src={staticFile("logo-round.png")}
          alt="Logo"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Bottom text — floating over the photo, clean and editorial */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 40px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Location name — large editorial serif */}
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 64,
            fontWeight: 400,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: 1,
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          }}
        >
          {locationName}
        </h2>

        {/* Tagline */}
        <p
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: 1,
          }}
        >
          {tagline}
        </p>

        {/* Small gold accent line */}
        <div
          style={{
            width: 60,
            height: 2,
            background: COLORS.accent,
            marginTop: 4,
          }}
        />

        {/* Website */}
        <span
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          {websiteUrl}
        </span>
      </div>
    </AbsoluteFill>
  );
};
