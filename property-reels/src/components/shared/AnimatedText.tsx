/**
 * AnimatedText — Animated text elements for reels
 *
 * Provides various entrance animations for text:
 *   • fadeUp — fade in + slide up (most common)
 *   • typewriter — character-by-character reveal
 *   • scaleIn — zoom from small to full size
 *   • slideRight — slide in from left
 *   • counter — animated number counter
 */

import React from "react";
import {
  interpolate,
  useCurrentFrame,
  Easing,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, FONT_SIZES, FONT_WEIGHTS } from "../../brand";

// ── FadeUp Text ─────────────────────────────────────

interface FadeUpTextProps {
  text: string;
  delay?: number;
  style?: React.CSSProperties;
  /** Stagger each word (default false — animate as block) */
  staggerWords?: boolean;
  /** Duration in frames */
  duration?: number;
}

export const FadeUpText: React.FC<FadeUpTextProps> = ({
  text,
  delay = 0,
  style = {},
  staggerWords = false,
  duration = 15,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!staggerWords) {
    const progress = spring({
      frame: frame - delay,
      fps,
      config: { damping: 20, stiffness: 100, mass: 0.5 },
    });

    return (
      <div
        style={{
          opacity: progress,
          transform: `translateY(${interpolate(progress, [0, 1], [30, 0])}px)`,
          ...style,
        }}
      >
        {text}
      </div>
    );
  }

  // Stagger each word
  const words = text.split(" ");
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3em", ...style }}>
      {words.map((word, i) => {
        const wordDelay = delay + i * 3;
        const progress = spring({
          frame: frame - wordDelay,
          fps,
          config: { damping: 20, stiffness: 120, mass: 0.4 },
        });

        return (
          <span
            key={i}
            style={{
              opacity: progress,
              transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
              display: "inline-block",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// ── Animated Counter ────────────────────────────────

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
  /** Format as currency (adds € and thousand separators) */
  currency?: boolean;
  /** Decimal places */
  decimals?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = "",
  suffix = "",
  delay = 0,
  duration = 30,
  style = {},
  currency = false,
  decimals = 0,
}) => {
  const frame = useCurrentFrame();

  const adjustedFrame = Math.max(0, frame - delay);
  const progress = interpolate(adjustedFrame, [0, duration], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const currentValue = Math.round(value * progress * Math.pow(10, decimals)) / Math.pow(10, decimals);

  let formatted: string;
  if (currency) {
    formatted = `€${currentValue.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  } else {
    formatted = currentValue.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  const opacity = interpolate(adjustedFrame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity, ...style }}>
      {prefix}
      {formatted}
      {suffix}
    </div>
  );
};

// ── Gold Accent Line ────────────────────────────────

interface AccentLineProps {
  delay?: number;
  width?: number;
  style?: React.CSSProperties;
}

export const AccentLine: React.FC<AccentLineProps> = ({
  delay = 0,
  width = 80,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 25, stiffness: 80, mass: 0.5 },
  });

  return (
    <div
      style={{
        width: interpolate(progress, [0, 1], [0, width]),
        height: 2,
        backgroundColor: COLORS.accent,
        ...style,
      }}
    />
  );
};

// ── Pill Badge ──────────────────────────────────────

interface PillBadgeProps {
  text: string;
  delay?: number;
  style?: React.CSSProperties;
}

export const PillBadge: React.FC<PillBadgeProps> = ({
  text,
  delay = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 120, mass: 0.4 },
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 24px",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        color: COLORS.text,
        fontFamily: FONTS.primary,
        fontWeight: FONT_WEIGHTS.medium,
        fontSize: FONT_SIZES.sm,
        letterSpacing: "0.12em",
        textTransform: "uppercase" as const,
        opacity: progress,
        transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
        ...style,
      }}
    >
      {/* Small gold dot */}
      <div
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: COLORS.accent,
          flexShrink: 0,
        }}
      />
      {text}
    </div>
  );
};

// ── Icon + Text Row ─────────────────────────────────

interface IconTextRowProps {
  icon: string; // emoji or text icon
  text: string;
  delay?: number;
  style?: React.CSSProperties;
}

export const IconTextRow: React.FC<IconTextRowProps> = ({
  icon,
  text,
  delay = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 100, mass: 0.5 },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        opacity: progress,
        transform: `translateX(${interpolate(progress, [0, 1], [-30, 0])}px)`,
        ...style,
      }}
    >
      <span style={{ fontSize: FONT_SIZES.xl }}>{icon}</span>
      <span
        style={{
          fontFamily: FONTS.primary,
          fontWeight: FONT_WEIGHTS.medium,
          fontSize: FONT_SIZES.lg,
          color: COLORS.white,
        }}
      >
        {text}
      </span>
    </div>
  );
};

// ── CTA Card ────────────────────────────────────────

interface CTACardProps {
  headline: string;
  subtext?: string;
  websiteUrl: string;
  delay?: number;
}

export const CTACard: React.FC<CTACardProps> = ({
  headline,
  subtext,
  websiteUrl,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.6 },
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 120,
        left: 56,
        right: 56,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [40, 0])}px)`,
      }}
    >
      {/* Headline — editorial serif */}
      <div
        style={{
          fontFamily: FONTS.display,
          fontWeight: FONT_WEIGHTS.regular,
          fontSize: FONT_SIZES["3xl"],
          color: COLORS.white,
          textAlign: "center",
          lineHeight: 1.1,
          letterSpacing: "0.01em",
        }}
      >
        {headline}
      </div>

      {subtext && (
        <div
          style={{
            fontFamily: FONTS.primary,
            fontWeight: FONT_WEIGHTS.regular,
            fontSize: FONT_SIZES.lg,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {subtext}
        </div>
      )}

      {/* Small gold accent line */}
      <div
        style={{
          width: 60,
          height: 2,
          background: COLORS.accent,
        }}
      />

      {/* Website URL — subtle */}
      <div
        style={{
          fontFamily: FONTS.primary,
          fontWeight: FONT_WEIGHTS.regular,
          fontSize: FONT_SIZES.sm,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
        }}
      >
        {websiteUrl}
      </div>
    </div>
  );
};
