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

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 40,
    stiffness: 200,
    mass: 0.5,
  });

  const velocityFactor = useTransform(
    smoothVelocity,
    [-80, 80],
    [-1.5, 1.5],
    { clamp: false }
  );

  const [repetitions, setRepetitions] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const calculateRepetitions = useCallback(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;
      const newReps = Math.ceil(containerWidth / textWidth) + 2;
      setRepetitions(newReps);
    }
  }, []);

  useEffect(() => {
    const timeoutId: ReturnType<typeof setTimeout> | undefined = setTimeout(calculateRepetitions, 100);

    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
        resizeTimeoutRef.current = undefined;
      }
      resizeTimeoutRef.current = setTimeout(calculateRepetitions, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
        resizeTimeoutRef.current = undefined;
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateRepetitions, children]);

  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_t, delta) => {
    if (!hasInitialized.current) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const currentVelocity = velocityFactor.get();

    if (scrollDirection === "up") {
      directionFactor.current = -1;
      moveBy -= Math.abs(currentVelocity) * baseVelocity * (delta / 1000) * 1.5;
    } else if (scrollDirection === "down") {
      directionFactor.current = 1;
      moveBy += Math.abs(currentVelocity) * baseVelocity * (delta / 1000) * 1.5;
    }

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
const FIXED_Y_PEAK = 40;

export default function XVelocityBandsCorrected({
  topText = TOP_BAND_TEXT,
  bottomText = BOTTOM_BAND_TEXT,
  defaultVelocity = 1.2,
}: VelocityBandsProps) {
  const componentInitialized = useRef(false);

  useEffect(() => {
    if (!componentInitialized.current) {
      console.log("XVelocityBands initialized once");
      componentInitialized.current = true;
    }
  }, []);

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

      {/* Top band */}
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

      {/* Bottom band */}
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
        >
          {bottomText}
        </ParallaxText>
      </div>
    </>
  );
}
