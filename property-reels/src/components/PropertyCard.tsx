import {
  AbsoluteFill,
  Img,
  staticFile,
} from "remotion";
import { z } from "zod";

// ============================================================================
// SCHEMA - Defines the props for the property card
// ============================================================================

export const propertyCardSchema = z.object({
  image: z.string(),
  images: z.array(z.string()).optional(), // For Pinterest multi-image layout
  title: z.string(),
  price: z.number(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  area: z.number(),
  town: z.string(),
  type: z.string(),
  propertyRef: z.string(),
  websiteUrl: z.string().default("newbuildhomescostablanca.com"),
});

type PropertyCardProps = z.infer<typeof propertyCardSchema>;

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
// FORMAT HELPERS
// ============================================================================

function formatPrice(price: number): string {
  return `€${price.toLocaleString("de-DE")}`;
}

// ============================================================================
// PROPERTY CARD - Still component for social media posts
// Works for both Square (1080x1080) and Pinterest (1080x1350)
// REDESIGNED: Photo takes ~72% of the card, info panel is compact ~28%
// No dead space — the image is the hero, info is a slim overlay strip
// ============================================================================

export const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  images,
  title,
  price,
  bedrooms,
  bathrooms,
  area,
  town,
  type,
  propertyRef,
  websiteUrl,
}) => {
  const hasMultipleImages = images && images.length >= 3;

  return (
    <AbsoluteFill style={{ background: COLORS.primary }}>
      {/* ================================================================ */}
      {/* IMAGE SECTION — takes ~72% of the card                           */}
      {/* ================================================================ */}

      {hasMultipleImages ? (
        /* Pinterest multi-image layout: Large hero + 2 smaller photos */
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "72%",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {/* Main hero photo */}
          <div style={{ flex: 3, overflow: "hidden", position: "relative" }}>
            <Img
              src={images[0]}
              alt={`${title} - photo 1`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* NEW BUILD badge */}
            <div
              style={{
                position: "absolute",
                top: 32,
                left: 0,
                background: COLORS.accent,
                padding: "12px 32px",
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
              }}
            >
              <span
                style={{
                  color: COLORS.white,
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: 2,
                }}
              >
                NEW BUILD
              </span>
            </div>

            {/* Logo watermark */}
            <div
              style={{
                position: "absolute",
                bottom: 14,
                right: 14,
                width: 60,
                height: 60,
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
                alt="Logo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Two smaller photos side by side */}
          <div style={{ flex: 1, display: "flex", gap: 4 }}>
            <div style={{ flex: 1, overflow: "hidden", borderRadius: 3 }}>
              <Img
                src={images[1]}
                alt={`${title} - photo 2`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ flex: 1, overflow: "hidden", borderRadius: 3 }}>
              <Img
                src={images[2]}
                alt={`${title} - photo 3`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Standard single-image layout — 72% photo */
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "72%",
            overflow: "hidden",
          }}
        >
          <Img
            src={image}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {/* Gradient at bottom for smooth transition to info panel */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "30%",
              background: "linear-gradient(transparent, rgba(26,35,50,0.5))",
            }}
          />

          {/* NEW BUILD badge - top-left */}
          <div
            style={{
              position: "absolute",
              top: 32,
              left: 0,
              background: COLORS.accent,
              padding: "12px 32px",
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
            }}
          >
            <span
              style={{
                color: COLORS.white,
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              NEW BUILD
            </span>
          </div>

          {/* Logo watermark - bottom-right */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              width: 70,
              height: 70,
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
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* INFO PANEL — compact 28% strip at bottom                         */}
      {/* ================================================================ */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "28%",
          background: COLORS.primary,
          padding: "20px 40px 24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {/* Row 1: Type + Town  |  Specs */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: COLORS.accent,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            {type.toUpperCase()} • {town.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
            }}
          >
            {[
              { value: bedrooms, label: "BED" },
              { value: bathrooms, label: "BATH" },
              { value: area, label: "M²" },
            ].map(({ value, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <span
                  style={{
                    color: COLORS.white,
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    color: COLORS.accent,
                    fontSize: 14,
                    fontWeight: 500,
                    marginLeft: 4,
                    letterSpacing: 0.5,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Title */}
        <div
          style={{
            color: COLORS.white,
            fontSize: hasMultipleImages ? 30 : 36,
            fontWeight: 600,
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>

        {/* Row 3: Price + Website */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              color: COLORS.accent,
              fontSize: hasMultipleImages ? 44 : 54,
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            {formatPrice(price)}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 16,
              fontWeight: 400,
              letterSpacing: 0.5,
            }}
          >
            {websiteUrl}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
