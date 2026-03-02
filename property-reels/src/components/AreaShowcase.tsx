import {
  AbsoluteFill,
  Img,
  staticFile,
} from "remotion";
import { z } from "zod";

// ============================================================================
// SCHEMA - Defines the props for the area showcase
// ============================================================================

export const areaShowcaseSchema = z.object({
  image: z.string(),
  locationName: z.string(),
  tagline: z.string().default("Discover Your Dream Home"),
  websiteUrl: z.string().default("newbuildhomescostablanca.com"),
});

type AreaShowcaseProps = z.infer<typeof areaShowcaseSchema>;

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
// AREA SHOWCASE - Still component for area engagement posts
// Works for Square (1080x1080) and Pinterest (1080x1350)
// Full-bleed drone/area photo with large text overlay
// ============================================================================

export const AreaShowcase: React.FC<AreaShowcaseProps> = ({
  image,
  locationName,
  tagline,
  websiteUrl,
}) => {
  return (
    <AbsoluteFill>
      {/* Full-bleed area photo (drone shot, beach, town) */}
      <Img
        src={image.startsWith("http") ? image : staticFile(image)}
        alt={locationName}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Dark gradient overlay from bottom — heavier for text legibility */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "75%",
          background: "linear-gradient(transparent, rgba(26,35,50,0.95))",
        }}
      />

      {/* Subtle gradient from top for logo area */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "20%",
          background: "linear-gradient(rgba(26,35,50,0.4), transparent)",
        }}
      />

      {/* Logo watermark - top-right */}
      <div
        style={{
          position: "absolute",
          top: 28,
          right: 28,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile("logo-round.png")}
          alt="New Build Homes Costa Blanca logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Bottom content container */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "60px 44px 44px 44px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {/* Gold accent line above location name */}
        <div
          style={{
            width: 80,
            height: 4,
            background: COLORS.accent,
            marginBottom: 20,
            borderRadius: 2,
          }}
        />

        {/* Location name - LARGE, bold, white */}
        <div
          style={{
            color: COLORS.white,
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: 20,
          }}
        >
          {locationName}
        </div>

        {/* Tagline - gold, medium size */}
        <div
          style={{
            color: COLORS.accent,
            fontSize: 36,
            fontWeight: 500,
            letterSpacing: 0.5,
            marginBottom: 36,
          }}
        >
          {tagline}
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: "100%",
            height: 2,
            background: COLORS.accent,
            opacity: 0.3,
            marginBottom: 16,
          }}
        />

        {/* Website URL - visible but not overpowering */}
        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 20,
            fontWeight: 400,
            letterSpacing: 0.5,
            textAlign: "right",
          }}
        >
          {websiteUrl}
        </div>
      </div>
    </AbsoluteFill>
  );
};
