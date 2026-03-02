import {
  AbsoluteFill,
  Img,
  staticFile,
} from "remotion";
import { z } from "zod";

// ============================================================================
// SCHEMA
// ============================================================================

export const propertyCardSchema = z.object({
  image: z.string(),
  images: z.array(z.string()).optional(),
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
// DESIGN SYSTEM — Editorial / Verity-inspired
// Matches the website's new Key-Ready Under €400k section
// ============================================================================

const COLORS = {
  bg: "#FDFCFA",           // Warm cream page background
  cardBg: "#FFFFFF",       // White card surface
  text900: "#1E2A38",      // Deep slate — primary text
  text600: "#475569",      // Medium slate
  text400: "#B8B3AA",      // Warm grey — secondary
  accent: "#B39960",       // Muted gold
  accentDark: "#9a7f4a",   // Darker gold
  tagBg: "#F7F5F0",        // Warm stone — tag pill background
  border: "#E8E6E1",       // Subtle warm border
};

// ============================================================================
// HELPERS
// ============================================================================

const resolveImg = (src: string) =>
  src.startsWith("http") || src.startsWith("/") ? src : staticFile(src);

function formatPrice(price: number): string {
  return `€${price.toLocaleString("de-DE")}`;
}

// ============================================================================
// PROPERTY CARD — Photo-forward editorial design
// Photo is the star (85%+), text is minimal and elegant
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
  const heroImg = resolveImg(image);
  const resolvedImages = images?.map(resolveImg);
  const hasMultipleImages = resolvedImages && resolvedImages.length >= 3;

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* ================================================================ */}
      {/* PHOTO SECTION — Full-bleed, takes ~82% of the card              */}
      {/* ================================================================ */}

      {hasMultipleImages ? (
        /* Pinterest: Hero + 2 smaller photos in a clean grid */
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "70%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Main hero — 75% of image area */}
          <div style={{ flex: 3, overflow: "hidden", position: "relative" }}>
            <Img
              src={resolvedImages![0]}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {/* Two thumbnails side by side */}
          <div style={{ flex: 1, display: "flex", gap: 3 }}>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <Img
                src={resolvedImages![1]}
                alt={`${title} - 2`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <Img
                src={resolvedImages![2]}
                alt={`${title} - 3`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Square: Single hero photo, full bleed */
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "82%",
            overflow: "hidden",
          }}
        >
          <Img
            src={heroImg}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {/* Soft gradient fade into info area */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "20%",
              background: "linear-gradient(transparent, rgba(253,252,250,0.6))",
            }}
          />
        </div>
      )}

      {/* ================================================================ */}
      {/* TAG PILL — top left, subtle and modern                          */}
      {/* ================================================================ */}
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
          New Build
        </span>
      </div>

      {/* ================================================================ */}
      {/* INFO STRIP — clean, cream background, editorial typography      */}
      {/* ================================================================ */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: hasMultipleImages ? "30%" : "18%",
          background: COLORS.bg,
          padding: hasMultipleImages ? "24px 40px 32px" : "0px 40px 28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: hasMultipleImages ? 10 : 6,
        }}
      >
        {/* Title + Price row */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: hasMultipleImages ? 32 : 34,
              fontWeight: 400,
              color: COLORS.text900,
              lineHeight: 1.2,
              letterSpacing: 0.5,
              flex: 1,
            }}
          >
            {title}
          </h3>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: hasMultipleImages ? 34 : 38,
              fontWeight: 400,
              color: COLORS.text900,
              whiteSpace: "nowrap",
            }}
          >
            {formatPrice(price)}
          </span>
        </div>

        {/* Location + Specs row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Town + Type */}
          <span
            style={{
              fontSize: 16,
              fontWeight: 400,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: COLORS.text400,
            }}
          >
            {type} · {town}
          </span>

          {/* Bed / Bath / M² — minimal */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {[
              { icon: "⌂", value: `${bedrooms} bed` },
              { icon: "◦", value: `${bathrooms} bath` },
              { icon: "□", value: `${area} m²` },
            ].map(({ value }, i) => (
              <span
                key={i}
                style={{
                  fontSize: 15,
                  color: COLORS.text600,
                  fontWeight: 400,
                }}
              >
                {value}
              </span>
            ))}
          </div>
        </div>

        {/* Divider line */}
        <div
          style={{
            width: "100%",
            height: 1,
            background: COLORS.border,
            marginTop: 2,
          }}
        />

        {/* Website URL — subtle */}
        <span
          style={{
            fontSize: 13,
            color: COLORS.text400,
            letterSpacing: 1,
            textAlign: "right",
          }}
        >
          {websiteUrl}
        </span>
      </div>
    </AbsoluteFill>
  );
};
