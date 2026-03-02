/**
 * BuyerPersonaReel — 20-second composition
 * =========================================
 * "What Type of Buyer Are You?" — shows different buyer personas with
 * matching property types.
 *
 * Structure:
 *   1. Hook (2s/60f) — Lifestyle video, main headline
 *   2. Personas (3.5s/105f each) — 4 cards with emoji, traits, property match
 *   3. CTA (4s/120f) — "Find Your Perfect Property"
 *
 * Total duration = 60 + (personas.length × 105) + 120 frames
 *
 * Export:
 *   - BuyerPersonaReel (composition)
 *   - buyerPersonaReelSchema (validation)
 *   - calculateBuyerPersonaDuration (helper)
 */

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Video,
  Easing,
} from "remotion";
import { z } from "zod";
import { COLORS, FONTS, FONT_SIZES, FONT_WEIGHTS, SPACING, EASE } from "../brand";
import { VideoSegment } from "./shared/VideoSegment";
import {
  FadeUpText,
  AccentLine,
  AnimatedCounter,
  CTACard,
  IconTextRow,
} from "./shared/AnimatedText";

// ============================================================================
// SCHEMA
// ============================================================================

export const buyerPersonaReelSchema = z.object({
  headline: z.string().default("What Type of Buyer Are You?"),
  personas: z
    .array(
      z.object({
        icon: z.string(), // emoji
        name: z.string(), // "The Holiday Maker"
        traits: z.array(z.string()), // ["Wants sunshine & beach", "2-3 weeks per year", ...]
        propertyMatch: z.string(), // "2-bed apartment near the beach"
        priceFrom: z.number().optional(),
        image: z.string(), // background image for this persona
      })
    )
    .min(2)
    .max(6),
  videoHook: z.string(), // path to hook video
  videoCTA: z.string(), // path to CTA video
  websiteUrl: z.string().default("newbuildhomescostablanca.com"),
  musicTrack: z.string().optional(),
});

type BuyerPersonaReelProps = z.infer<typeof buyerPersonaReelSchema>;

// ============================================================================
// DURATION CALCULATOR
// ============================================================================

/**
 * Calculate total duration in frames
 * Hook (60) + personas.length * 105 + CTA (120) - crossfades
 */
export function calculateBuyerPersonaDuration(personaCount: number): number {
  const hookFrames = 60;
  const personaFrames = personaCount * 105;
  const ctaFrames = 120;
  const crossfadeFrames = (personaCount - 1) * 10; // 10-frame crossfades between personas

  return hookFrames + personaFrames + ctaFrames - crossfadeFrames;
}

// ============================================================================
// HOOK SCENE (2s / 60 frames)
// ============================================================================

const HookScene: React.FC<{
  videoSrc: string;
  headline: string;
}> = ({ videoSrc, headline }) => {
  const frame = useCurrentFrame();

  // Staggered entrance for main headline
  const headlineDelay = 10;
  const accentDelay = 30;

  return (
    <VideoSegment
      videoSrc={videoSrc}
      durationInFrames={60}
      kenBurns="zoom-in"
      zoomIntensity={1.12}
      gradientBottom
      overlayOpacity={0.3}
      entrance="fade"
      exit="fade"
      transitionFrames={10}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: SPACING.safeArea,
        }}
      >
        {/* Main Headline */}
        <FadeUpText
          text={headline}
          delay={headlineDelay}
          style={{
            fontFamily: FONTS.primary,
            fontWeight: FONT_WEIGHTS.bold,
            fontSize: FONT_SIZES["5xl"],
            color: COLORS.white,
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "90%",
            letterSpacing: "-0.02em",
          }}
        />

        {/* Gold accent line */}
        <div style={{ marginTop: SPACING.md }}>
          <AccentLine delay={accentDelay} width={120} />
        </div>
      </AbsoluteFill>
    </VideoSegment>
  );
};

// ============================================================================
// PERSONA CARD SCENE (3.5s / 105 frames each)
// ============================================================================

interface PersonaCardProps {
  persona: BuyerPersonaReelProps["personas"][0];
  delay?: number;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ persona, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sequential animations within the card
  const iconStartDelay = delay;
  const nameStartDelay = delay + 15;
  const traitsStartDelay = delay + 30;
  const matchStartDelay = delay + 50;
  const priceStartDelay = delay + 70;

  // Icon scale-in animation
  const iconProgress = spring({
    frame: frame - iconStartDelay,
    fps,
    config: { damping: 15, stiffness: 100, mass: 0.8 },
  });

  const iconScale = interpolate(iconProgress, [0, 1], [0.3, 1], {
    extrapolateRight: "clamp",
  });

  // Name slam-in (quick scale from below)
  const nameProgress = spring({
    frame: frame - nameStartDelay,
    fps,
    config: { damping: 20, stiffness: 120, mass: 0.5 },
  });

  return (
    <VideoSegment
      imageSrc={persona.image}
      durationInFrames={105}
      kenBurns="pan-left"
      zoomIntensity={1.1}
      gradientBottom
      overlayOpacity={0.25}
      entrance="fade"
      exit="fade"
      transitionFrames={10}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: `${SPACING.safeArea}px ${SPACING.md}px`,
        }}
      >
        {/* Emoji Icon - scales in first */}
        <div
          style={{
            fontSize: FONT_SIZES["6xl"],
            marginBottom: SPACING.lg,
            opacity: iconProgress,
            transform: `scale(${iconScale})`,
            transformOrigin: "center center",
          }}
        >
          {persona.icon}
        </div>

        {/* Persona Name - slams in */}
        <div
          style={{
            fontFamily: FONTS.primary,
            fontWeight: FONT_WEIGHTS.bold,
            fontSize: FONT_SIZES["5xl"],
            color: COLORS.white,
            textAlign: "center",
            marginBottom: SPACING.lg,
            opacity: nameProgress,
            transform: `translateY(${interpolate(nameProgress, [0, 1], [20, 0])}px)`,
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          {persona.name}
        </div>

        {/* Traits - slide up one by one */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: SPACING.md,
            marginBottom: SPACING.xl,
            maxWidth: "90%",
          }}
        >
          {persona.traits.map((trait, i) => (
            <IconTextRow
              key={i}
              icon="•"
              text={trait}
              delay={traitsStartDelay + i * 5}
              style={{
                fontSize: FONT_SIZES.xl,
                justifyContent: "flex-start",
              }}
            />
          ))}
        </div>

        {/* Property Match Card */}
        <div
          style={{
            marginTop: SPACING.md,
            marginBottom: SPACING.sm,
          }}
        >
          <PropertyMatchBadge
            propertyMatch={persona.propertyMatch}
            priceFrom={persona.priceFrom}
            matchDelay={matchStartDelay}
            priceDelay={priceStartDelay}
          />
        </div>
      </AbsoluteFill>
    </VideoSegment>
  );
};

// ============================================================================
// PROPERTY MATCH BADGE (shown within persona card)
// ============================================================================

interface PropertyMatchBadgeProps {
  propertyMatch: string;
  priceFrom?: number;
  matchDelay?: number;
  priceDelay?: number;
}

const PropertyMatchBadge: React.FC<PropertyMatchBadgeProps> = ({
  propertyMatch,
  priceFrom,
  matchDelay = 0,
  priceDelay = 20,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const matchProgress = spring({
    frame: frame - matchDelay,
    fps,
    config: { damping: 18, stiffness: 90, mass: 0.6 },
  });

  const priceProgress = spring({
    frame: frame - priceDelay,
    fps,
    config: { damping: 18, stiffness: 90, mass: 0.6 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: SPACING.sm,
      }}
    >
      {/* Property Match Text */}
      <div
        style={{
          opacity: matchProgress,
          transform: `translateY(${interpolate(matchProgress, [0, 1], [15, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.primary,
            fontWeight: FONT_WEIGHTS.semibold,
            fontSize: FONT_SIZES.base,
            color: COLORS.accentLight,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: SPACING.sm,
          }}
        >
          Perfect match
        </div>
        <div
          style={{
            fontFamily: FONTS.primary,
            fontWeight: FONT_WEIGHTS.bold,
            fontSize: FONT_SIZES.xl,
            color: COLORS.white,
            textAlign: "center",
          }}
        >
          {propertyMatch}
        </div>
      </div>

      {/* Price Badge */}
      {priceFrom && (
        <div
          style={{
            opacity: priceProgress,
            transform: `scale(${interpolate(priceProgress, [0, 1], [0.9, 1])})`,
            transformOrigin: "center center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: SPACING.sm,
              padding: `${SPACING.sm}px ${SPACING.md}px`,
              borderRadius: 100,
              background: `rgba(179, 153, 96, 0.25)`,
              border: `1px solid ${COLORS.accent}`,
            }}
          >
            <span
              style={{
                fontFamily: FONTS.primary,
                fontWeight: FONT_WEIGHTS.regular,
                fontSize: FONT_SIZES.base,
                color: COLORS.accent,
              }}
            >
              From
            </span>
            <span
              style={{
                fontFamily: FONTS.primary,
                fontWeight: FONT_WEIGHTS.bold,
                fontSize: FONT_SIZES.xl,
                color: COLORS.accent,
              }}
            >
              €{priceFrom.toLocaleString("de-DE")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// CTA SCENE (4s / 120 frames)
// ============================================================================

const CTAScene: React.FC<{
  videoSrc: string;
  websiteUrl: string;
}> = ({ videoSrc, websiteUrl }) => {
  return (
    <VideoSegment
      videoSrc={videoSrc}
      durationInFrames={120}
      kenBurns="zoom-out"
      zoomIntensity={1.15}
      gradientBottom
      overlayOpacity={0.4}
      entrance="fade"
      exit="fade"
      transitionFrames={15}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: SPACING.safeArea,
        }}
      >
        <CTACard
          headline="Find Your Perfect Property"
          subtext="Discover the buyer persona that matches your lifestyle"
          websiteUrl={websiteUrl}
          delay={20}
        />
      </AbsoluteFill>
    </VideoSegment>
  );
};

// ============================================================================
// MAIN COMPOSITION
// ============================================================================

export const BuyerPersonaReel: React.FC<BuyerPersonaReelProps> = ({
  headline,
  personas,
  videoHook,
  videoCTA,
  websiteUrl,
  musicTrack,
}) => {
  const { durationInFrames } = useVideoConfig();

  // Resolve music source
  const musicSrc = musicTrack
    ? musicTrack.startsWith('http')
      ? musicTrack
      : staticFile(musicTrack)
    : null;

  let currentFrame = 0;

  // Hook segment
  const hookDuration = 60;
  const hookStart = currentFrame;
  currentFrame += hookDuration;

  // Persona segments with 10-frame crossfades
  const personaDuration = 105;
  const crossfadeDuration = 10;
  const personaStarts = personas.map((_, i) => {
    const start = currentFrame;
    currentFrame += personaDuration - (i > 0 ? crossfadeDuration : 0);
    return start;
  });

  // CTA segment
  const ctaDuration = 120;
  const ctaStart = currentFrame;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.primary }}>
      {/* Audio Track */}
      {musicSrc && (
        <Audio
          src={musicSrc}
          volume={(f) =>
            interpolate(f, [0, 10, durationInFrames - 60, durationInFrames], [0, 0.6, 0.6, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      )}

      {/* ================================================================ */}
      {/* HOOK SCENE */}
      {/* ================================================================ */}
      <Sequence from={hookStart} durationInFrames={hookDuration}>
        <HookScene videoSrc={videoHook} headline={headline} />
      </Sequence>

      {/* ================================================================ */}
      {/* PERSONA CARDS */}
      {/* ================================================================ */}
      {personas.map((persona, i) => (
        <Sequence
          key={`persona-${i}`}
          from={personaStarts[i]}
          durationInFrames={personaDuration + (i > 0 ? crossfadeDuration : 0)}
        >
          <PersonaCard persona={persona} delay={0} />
        </Sequence>
      ))}

      {/* ================================================================ */}
      {/* CTA SCENE */}
      {/* ================================================================ */}
      <Sequence from={ctaStart} durationInFrames={ctaDuration}>
        <CTAScene videoSrc={videoCTA} websiteUrl={websiteUrl} />
      </Sequence>
    </AbsoluteFill>
  );
};
