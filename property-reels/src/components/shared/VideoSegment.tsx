/**
 * VideoSegment — A single segment of a reel with:
 *   • Ken Burns zoom/pan on a background video or image
 *   • Smooth entrance/exit transitions
 *   • Optional dark overlay for text readability
 *
 * Used by all reel templates as the base building block.
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  Video,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { COLORS } from "../../brand";

export interface VideoSegmentProps {
  /** Video source path (MP4) */
  videoSrc?: string;
  /** Image source path (fallback if no video) */
  imageSrc?: string;
  /** Duration of this segment in frames */
  durationInFrames: number;
  /** Start time offset within the source video (seconds) */
  startFrom?: number;
  /** Ken Burns effect direction */
  kenBurns?: "zoom-in" | "zoom-out" | "pan-left" | "pan-right" | "pan-up" | "none";
  /** Ken Burns zoom intensity (default 1.15 = 15% zoom) */
  zoomIntensity?: number;
  /** Overlay darkness: 0 = none, 1 = fully dark */
  overlayOpacity?: number;
  /** Gradient overlay from bottom */
  gradientBottom?: boolean;
  /** Gradient overlay from top */
  gradientTop?: boolean;
  /** Entrance transition type */
  entrance?: "fade" | "slide-left" | "slide-right" | "slide-up" | "zoom" | "none";
  /** Exit transition type */
  exit?: "fade" | "slide-left" | "slide-right" | "slide-up" | "zoom" | "none";
  /** Transition duration in frames */
  transitionFrames?: number;
  /** Children (text overlays etc) */
  children?: React.ReactNode;
}

export const VideoSegment: React.FC<VideoSegmentProps> = ({
  videoSrc,
  imageSrc,
  durationInFrames,
  startFrom = 0,
  kenBurns = "zoom-in",
  zoomIntensity = 1.15,
  overlayOpacity = 0,
  gradientBottom = true,
  gradientTop = false,
  entrance = "fade",
  exit = "fade",
  transitionFrames = 12,
  children,
}) => {
  const frame = useCurrentFrame();

  // ── Ken Burns transform ─────────────────────────
  const progress = frame / Math.max(durationInFrames, 1);

  let scale = 1;
  let translateX = 0;
  let translateY = 0;

  switch (kenBurns) {
    case "zoom-in":
      scale = interpolate(progress, [0, 1], [1, zoomIntensity]);
      break;
    case "zoom-out":
      scale = interpolate(progress, [0, 1], [zoomIntensity, 1]);
      break;
    case "pan-left":
      scale = 1.1;
      translateX = interpolate(progress, [0, 1], [3, -3]);
      break;
    case "pan-right":
      scale = 1.1;
      translateX = interpolate(progress, [0, 1], [-3, 3]);
      break;
    case "pan-up":
      scale = 1.1;
      translateY = interpolate(progress, [0, 1], [3, -3]);
      break;
    case "none":
    default:
      scale = 1;
  }

  const mediaTransform = `scale(${scale}) translate(${translateX}%, ${translateY}%)`;

  // ── Entrance/exit opacity & transform ───────────
  const entranceOpacity =
    entrance === "none"
      ? 1
      : interpolate(frame, [0, transitionFrames], [0, 1], {
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });

  const exitOpacity =
    exit === "none"
      ? 1
      : interpolate(
          frame,
          [durationInFrames - transitionFrames, durationInFrames],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) }
        );

  const opacity = Math.min(entranceOpacity, exitOpacity);

  // Slide transforms for entrance
  let slideTransform = "";
  if (entrance === "slide-left" && frame < transitionFrames) {
    const x = interpolate(frame, [0, transitionFrames], [100, 0], {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    slideTransform = `translateX(${x}%)`;
  } else if (entrance === "slide-up" && frame < transitionFrames) {
    const y = interpolate(frame, [0, transitionFrames], [30, 0], {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    slideTransform = `translateY(${y}%)`;
  } else if (entrance === "zoom" && frame < transitionFrames) {
    const s = interpolate(frame, [0, transitionFrames], [1.3, 1], {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    slideTransform = `scale(${s})`;
  }

  return (
    <AbsoluteFill style={{ opacity, transform: slideTransform }}>
      {/* Background media with Ken Burns */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-10%",
            transform: mediaTransform,
            transformOrigin: "center center",
          }}
        >
          {videoSrc ? (
            <Video
              src={videoSrc}
              startFrom={startFrom * 30}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              muted
            />
          ) : imageSrc ? (
            <Img
              src={imageSrc}
              alt="Video segment background image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: COLORS.primary,
              }}
            />
          )}
        </div>
      </div>

      {/* Flat overlay */}
      {overlayOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: `rgba(30, 42, 56, ${overlayOpacity})`,
          }}
        />
      )}

      {/* Gradient overlays */}
      {gradientBottom && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "65%",
            background:
              "linear-gradient(to top, rgba(30,42,56,0.92) 0%, rgba(30,42,56,0.6) 40%, transparent 100%)",
          }}
        />
      )}
      {gradientTop && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "35%",
            background:
              "linear-gradient(to bottom, rgba(30,42,56,0.7) 0%, transparent 100%)",
          }}
        />
      )}

      {/* Content overlay */}
      {children}
    </AbsoluteFill>
  );
};
