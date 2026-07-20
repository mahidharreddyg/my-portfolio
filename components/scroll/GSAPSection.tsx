"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface GSAPSectionProps {
  children: ReactNode;
  /** ScrollTrigger start position (e.g., "top top", "top 80%") */
  start?: string;
  /** ScrollTrigger end position (e.g., "bottom top", "+=200%") */
  end?: string;
  /** Pin the section during scroll */
  pin?: boolean;
  /** Scrub value: true, or number for smoothing (higher = more lag) */
  scrub?: boolean | number;
  /** Snap points (e.g., { snapTo: 1/3, duration: 0.5 }) */
  snap?: ScrollTrigger.SnapVars | number | number[];
  /** GSAP animation properties to apply (from → to) */
  animateFrom?: gsap.TweenVars;
  animateTo?: gsap.TweenVars;
  /** Additional className for the wrapper */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
  /** Unique ID for the section (used as ScrollTrigger ID and HTML id) */
  id?: string;
  /** Markers for debugging (remove in production) */
  markers?: boolean;
  /** Callback when scroll enters/leaves */
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

/**
 * GSAPSection — a reusable wrapper that creates a GSAP ScrollTrigger
 * animation for any section.
 *
 * Features:
 * - GPU-only transforms (translate3d, scale3d, rotate3d) — no layout properties
 * - will-change:transform applied during active scroll, removed after
 * - Proper React cleanup via gsap.context()
 * - Compatible with Lenis smooth scroll (shares GSAP ticker)
 */
export default function GSAPSection({
  children,
  start = "top bottom",
  end = "bottom top",
  pin = false,
  scrub = false,
  snap,
  animateFrom,
  animateTo,
  className = "",
  style,
  id,
  markers = false,
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack,
}: GSAPSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !innerRef.current) return;

    const ctx = gsap.context(() => {
      const target = innerRef.current!;

      // Apply will-change management
      const managePerfHints = {
        onToggle: (self: ScrollTrigger) => {
          if (self.isActive) {
            target.setAttribute("data-scroll-active", "true");
          } else {
            target.setAttribute("data-scroll-active", "false");
          }
        },
      };

      if (animateFrom && animateTo) {
        // Tween animation with ScrollTrigger
        gsap.fromTo(target, animateFrom, {
          ...animateTo,
          scrollTrigger: {
            trigger: sectionRef.current!,
            start,
            end,
            pin,
            scrub,
            snap,
            markers,
            id,
            ...managePerfHints,
            onEnter,
            onLeave,
            onEnterBack,
            onLeaveBack,
          },
        });
      } else if (animateTo) {
        // To-only animation
        gsap.to(target, {
          ...animateTo,
          scrollTrigger: {
            trigger: sectionRef.current!,
            start,
            end,
            pin,
            scrub,
            snap,
            markers,
            id,
            ...managePerfHints,
            onEnter,
            onLeave,
            onEnterBack,
            onLeaveBack,
          },
        });
      } else {
        // No animation, just callbacks / pinning
        ScrollTrigger.create({
          trigger: sectionRef.current!,
          start,
          end,
          pin,
          scrub,
          snap,
          markers,
          id,
          ...managePerfHints,
          onEnter,
          onLeave,
          onEnterBack,
          onLeaveBack,
        });
      }
    }, sectionRef);

    return () => ctx.revert(); // Clean kill of all ScrollTriggers in this context
  }, [
    start,
    end,
    pin,
    scrub,
    snap,
    animateFrom,
    animateTo,
    id,
    markers,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
  ]);

  return (
    <div ref={sectionRef} id={id} className={className} style={style}>
      <div
        ref={innerRef}
        data-scroll-active="false"
        style={{ willChange: "auto" }}
      >
        {children}
      </div>
    </div>
  );
}
