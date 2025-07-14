"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValueEvent,
} from "motion/react";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

// Utility to wrap motion values
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  baseVelocity: number;
  className?: string;
}

function ParallaxText({
  children,
  baseVelocity = 1.2,
  className,
  ...props
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const hasInitialized = useRef(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      return;
    }

    const previous = scrollY.getPrevious() ?? 0;
    const diff = current - previous;

    if (Math.abs(diff) > 0.1) {
      setScrollDirection(diff > 0 ? "down" : "up");
    }
  });

  // Smooth velocity handling with better spring settings
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(
    smoothVelocity,
    [0, 1000],
    [0, 5],
    { clamp: false }
  );

  const [repetitions, setRepetitions] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const calculateRepetitions = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = textRef.current.offsetWidth;
        const newRepetitions = Math.ceil(containerWidth / textWidth) + 2;
        setRepetitions(newRepetitions);
      }
    };

    calculateRepetitions();

    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [children]);

  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

  const directionFactor = React.useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-full overflow-hidden whitespace-nowrap flex items-center justify-center", className)}
      {...props}
    >
      <motion.div
        className="inline-block"
        style={{
          x,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {Array.from({ length: repetitions }).map((_, i) => (
          <span
            key={i}
            ref={i === 0 ? textRef : null}
            className="mx-2 sm:mx-4 font-bold tracking-wide inline-flex items-center justify-center"
            style={{
              height: "100%",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

interface VelocityBandsProps {
  topText?: string;
  bottomText?: string;
  defaultVelocity?: number;
}

const TOP_BAND_TEXT = "ACTUATE   INNOVATE   IDEATE   ACTUATE   INNOVATE   IDEATE";
const BOTTOM_BAND_TEXT = "ACTUATE   INNOVATE   IDEATE   ACTUATE   INNOVATE   IDEATE";
const FIXED_Y_PEAK = 120; // Moved down further from 80 to 120

export default function XVelocityBandsCorrected({
  topText = TOP_BAND_TEXT,
  bottomText = BOTTOM_BAND_TEXT,
  defaultVelocity = 1.2,
}: VelocityBandsProps) {
  return (
    <>
      <style jsx global>{`
        .matrix-band {
          background: transparent !important;
          border-top: 1px solid rgba(41, 141, 238, 0.3);
          border-bottom: 1px solid rgba(41, 141, 238, 0.3);
          box-shadow:
            0 0 20px rgba(41, 141, 238, 0.2),
            0 0 40px rgba(41, 141, 238, 0.1),
            inset 0 1px 0 rgba(41, 141, 238, 0.1),
            inset 0 -1px 0 rgba(41, 141, 238, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .matrix-text {
          text-shadow:
            0 0 10px rgba(41, 141, 238, 0.8),
            0 0 20px rgba(41, 141, 238, 0.6),
            0 0 30px rgba(41, 141, 238, 0.4),
            0 2px 4px rgba(0, 0, 0, 0.8);
          filter: drop-shadow(0 0 8px rgba(41, 141, 238, 0.5));
        }

        @media (max-width: 768px) {
          .matrix-text {
            text-shadow:
              0 0 6px rgba(41, 141, 238, 0.6),
              0 0 12px rgba(41, 141, 238, 0.4),
              0 1px 2px rgba(0, 0, 0, 0.6);
            filter: drop-shadow(0 0 4px rgba(41, 141, 238, 0.3));
          }
        }
      `}</style>

      {/* Top Band */}
      <div
        className={cn(
          "absolute z-50 pointer-events-none overflow-hidden matrix-band",
          "h-10 md:h-20 w-[150vw] md:w-[200vw]"
        )}
        style={{
          left: "50%",
          top: `${FIXED_Y_PEAK}px`,
          transform: "translate(-50%, -50%) rotate(12deg)",
          transformOrigin: "center center",
        }}
      >
        <ParallaxText
          baseVelocity={defaultVelocity}
          className="text-blue-300 text-sm sm:text-base md:text-lg lg:text-xl font-extrabold tracking-wider matrix-text"
        >
          {topText}
        </ParallaxText>
      </div>

      {/* Bottom Band */}
      <div
        className={cn(
          "absolute z-50 pointer-events-none overflow-hidden matrix-band",
          "h-10 md:h-20 w-[150vw] md:w-[200vw]"
        )}
        style={{
          left: "50%",
          top: `${FIXED_Y_PEAK}px`,
          transform: "translate(-50%, -50%) rotate(168deg)",
          transformOrigin: "center center",
        }}
      >
        <ParallaxText
          baseVelocity={-defaultVelocity}
          className="text-blue-300 text-sm sm:text-base md:text-lg lg:text-xl font-extrabold tracking-wider matrix-text"
          style={{ transform: "rotate(180deg)" }}
        >
          {bottomText}
        </ParallaxText>
      </div>
    </>
  );
}
