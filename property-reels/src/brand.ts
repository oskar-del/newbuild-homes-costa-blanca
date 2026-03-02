/**
 * Brand Design System for Remotion Reel Templates
 * ================================================
 * Mirrors the website's visual identity:
 *   newbuildhomescostablanca.com
 *
 * Colors, typography, spacing, and shared style helpers
 * used across ALL reel compositions.
 */

// ── Colors ──────────────────────────────────────────
export const COLORS = {
  // Primary — deep slate navy (authority & trust)
  primary: "#1E2A38",
  primaryLight: "#334155",
  primaryMuted: "#475569",

  // Accent — muted gold (premium quality)
  accent: "#B39960",
  accentHover: "#9a7f4a",
  accentLight: "#e6d5ad",
  accentPale: "#f2e9d3",

  // Backgrounds
  bg: "#FDFCFA",
  bgCard: "#FAF9F7",
  bgSection: "#F7F5F0",

  // Text
  text: "#2D3436",
  textLight: "#6B7280",
  textMuted: "#94a3b8",
  white: "#FFFFFF",

  // Borders
  border: "#E8E6E1",
  borderLight: "#F0EDE8",

  // Warm palette
  warm50: "#FDFCFA",
  warm100: "#FAF9F7",
  warm200: "#F0EDE8",

  // Success / sage green
  sage: "#7D8B75",

  // Overlays — softer, photo-forward (not heavy navy)
  overlayDark: "rgba(0, 0, 0, 0.55)",
  overlayMedium: "rgba(0, 0, 0, 0.4)",
  overlayLight: "rgba(0, 0, 0, 0.25)",
  overlayGold: "rgba(179, 153, 96, 0.15)",
  // Frosted glass
  frostedWhite: "rgba(255, 255, 255, 0.92)",
  frostedDark: "rgba(30, 42, 56, 0.85)",
} as const;

// ── Typography ──────────────────────────────────────
export const FONTS = {
  // DM Sans for body text, Playfair Display for editorial headings
  primary: "DM Sans, system-ui, sans-serif",
  display: "'Playfair Display', Georgia, serif",
  mono: "JetBrains Mono, monospace",
} as const;

export const FONT_SIZES = {
  /** 24px — fine print, watermarks */
  xs: 24,
  /** 28px — secondary text, labels */
  sm: 28,
  /** 34px — body text */
  base: 34,
  /** 40px — lead text, descriptions */
  lg: 40,
  /** 48px — sub-headings */
  xl: 48,
  /** 60px — section titles */
  "2xl": 60,
  /** 76px — big headlines */
  "3xl": 76,
  /** 96px — hero text */
  "4xl": 96,
  /** 120px — impact text */
  "5xl": 120,
  /** 160px — price/number callouts */
  "6xl": 160,
} as const;

export const FONT_WEIGHTS = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// ── Spacing (in pixels, for 1080-wide canvas) ───────
export const SPACING = {
  /** 24px */
  xs: 24,
  /** 36px */
  sm: 36,
  /** 48px */
  md: 48,
  /** 64px */
  lg: 64,
  /** 80px */
  xl: 80,
  /** 120px */
  "2xl": 120,
  /** Safe area inset from edges — enough for phone notch/status bar */
  safeArea: 72,
} as const;

// ── Reusable style objects ──────────────────────────

/** Full-bleed video background, covers the frame */
export const videoBackgroundStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

/** Soft gradient overlay from bottom — photo-forward, not heavy */
export const gradientBottomStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "55%",
  background:
    "linear-gradient(transparent, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.5))",
};

/** Soft gradient overlay from top */
export const gradientTopStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "35%",
  background:
    "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)",
};

/** Full overlay (for text-heavy slides) — softer than before */
export const fullOverlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: COLORS.overlayDark,
};

/** Gold accent line (horizontal divider) */
export const accentLineStyle: React.CSSProperties = {
  width: 80,
  height: 3,
  backgroundColor: COLORS.accent,
  borderRadius: 2,
};

/** Heading text defaults — editorial serif */
export const headingStyle: React.CSSProperties = {
  fontFamily: FONTS.display,
  fontWeight: FONT_WEIGHTS.regular,
  color: COLORS.white,
  letterSpacing: "0.01em",
  lineHeight: 1.1,
};

/** Body text defaults */
export const bodyStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.regular,
  color: COLORS.white,
  lineHeight: 1.5,
  opacity: 0.9,
};

/** Gold accent text */
export const accentTextStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.semibold,
  color: COLORS.accent,
};

/** Stat / number callout */
export const statStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.bold,
  color: COLORS.accent,
  fontSize: FONT_SIZES["4xl"],
  lineHeight: 1,
};

/** Pill / tag badge — frosted glass style */
export const pillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 24px",
  background: "rgba(255,255,255,0.92)",
  backdropFilter: "blur(12px)",
  color: COLORS.primary,
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.medium,
  fontSize: FONT_SIZES.sm,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
};

/** CTA button style — elegant, not chunky */
export const ctaButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px 48px",
  background: "rgba(255,255,255,0.92)",
  backdropFilter: "blur(12px)",
  color: COLORS.primary,
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.medium,
  fontSize: FONT_SIZES.base,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

// ── Video background mapping ────────────────────────
// Maps content themes to appropriate background videos
// from the Digital assets library.

export type VideoTheme =
  | "beach"
  | "golf"
  | "city"
  | "nightlife"
  | "building"
  | "lifestyle"
  | "nature"
  | "marina"
  | "sunset"
  | "drone"
  | "generic";

export const VIDEO_BACKGROUNDS: Record<VideoTheme, string[]> = {
  beach: [
    "drone view of beach.mp4",
    "general _ walking on beach.mp4",
    "general beach with palm.mp4",
    "playa san juan.mp4",
    "Playa san jaun.mp4",
    "playa muchavista voiews towars costa blanca north.mp4",
    "playa postiguet alicante city.mp4",
    "cabo huertas _ san uuan.mp4",
    "water on rock.mp4",
  ],
  golf: [
    "Golf alicante.mp4",
    "golf 1.mp4",
    "golf 2.mp4",
    "golf 3.mp4",
  ],
  city: [
    "alicante city.mp4",
    "old town alicante.mp4",
    "old town alicante ( holidays).mp4",
    "passeo alicante vity.mp4",
    "castillo santa barbara alicante.mp4",
    "castillo santa barbara.mp4",
  ],
  nightlife: [
    "alicante by night.mp4",
  ],
  building: [
    "building men.mp4",
    "building site.mp4",
    "genral building.mp4",
    "general building 2.mp4",
  ],
  lifestyle: [
    "general holding hand.mp4",
    "general real estate _ click.mp4",
    "modern 1.mp4",
  ],
  nature: [
    "sunrise.mp4",
    "sunset.mp4",
  ],
  marina: [
    "Marina alicante.mp4",
    "views over alicante marina.mp4",
  ],
  sunset: [
    "sunrise.mp4",
    "sunset.mp4",
  ],
  drone: [
    "drone view of beach.mp4",
    "playa muchavista voiews towars costa blanca north.mp4",
    "san juan.mp4",
  ],
  generic: [
    "general _ walking on beach.mp4",
    "general holding hand.mp4",
    "drone view of beach.mp4",
    "sunset.mp4",
  ],
};

/** Base path for Canva vertical videos */
export const CANVA_VIDEO_BASE =
  "/sessions/exciting-tender-cerf/mnt/New Web/Digital assets/Vertical videos canva/";

/** Base path for area photos */
export const AREA_PHOTO_BASE =
  "/sessions/exciting-tender-cerf/mnt/New Web/Digital assets/Photos from phone ( areas)/";

// ── Animation presets ───────────────────────────────

/** Standard easing for smooth motion */
export const EASE = {
  /** Smooth entrance */
  out: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  /** Smooth exit */
  in: [0.55, 0.06, 0.68, 0.19] as [number, number, number, number],
  /** Smooth both */
  inOut: [0.77, 0, 0.175, 1] as [number, number, number, number],
  /** Snappy spring-like */
  spring: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
} as const;

/** Standard transition durations (in frames at 30fps) */
export const TRANSITION = {
  /** 0.3s — fast fade/slide */
  fast: 9,
  /** 0.5s — standard */
  base: 15,
  /** 0.8s — slow, elegant */
  slow: 24,
  /** 1.0s — dramatic reveal */
  dramatic: 30,
} as const;
