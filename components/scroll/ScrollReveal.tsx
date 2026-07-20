"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollRevealProps {
  children: ReactNode;
  /** Animation direction: up, down, left, right */
  direction?: "up" | "down" | "left" | "right";
  /** Distance to travel (in pixels) */
  distance?: number;
  /** Duration of the reveal animation */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Stagger amount when wrapping multiple children */
  stagger?: number;
  /** Start position for ScrollTrigger */
  start?: string;
  /** Whether the animation should replay on re-enter */
  toggleActions?: string;
  /** Additional className */
  className?: string;
  /** As which HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * ScrollReveal — lightweight reveal-on-scroll component.
 *
 * - GPU-only: uses translate3d + opacity (compositor thread)
 * - Efficient: uses single ScrollTrigger per element
 * - Compatible with Lenis (shares GSAP ticker)
 */
export default function ScrollReveal({
  children,
  direction = "up",
  distance = 60,
  duration = 0.8,
  delay = 0,
  stagger = 0.1,
  start = "top 85%",
  toggleActions = "play none none none",
  className = "",
  as: Component = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Calculate initial offset based on direction
    const fromVars: gsap.TweenVars = {
      opacity: 0,
      willChange: "transform, opacity",
    };

    switch (direction) {
      case "up":
        fromVars.y = distance;
        break;
      case "down":
        fromVars.y = -distance;
        break;
      case "left":
        fromVars.x = distance;
        break;
      case "right":
        fromVars.x = -distance;
        break;
    }

    const ctx = gsap.context(() => {
      // Check for direct children to stagger, or animate the container itself
      const targets = ref.current!.children.length > 1
        ? ref.current!.children
        : ref.current!;

      gsap.from(targets, {
        ...fromVars,
        duration,
        delay,
        stagger: ref.current!.children.length > 1 ? stagger : 0,
        ease: "power3.out",
        clearProps: "willChange", // Remove will-change after animation
        scrollTrigger: {
          trigger: ref.current!,
          start,
          toggleActions,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [direction, distance, duration, delay, stagger, start, toggleActions]);

  return (
    <Component
      ref={ref as any}
      className={className}
    >
      {children}
    </Component>
  );
}
