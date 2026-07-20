"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin once at module level
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * LenisGSAPSync — invisible component that wires Lenis's scroll
 * position into GSAP's ticker so ScrollTrigger stays perfectly in sync.
 *
 * Architecture:
 *  - Lenis owns the smooth-scroll interpolation (lerp, momentum, etc.)
 *  - On every Lenis scroll event we call ScrollTrigger.update()
 *  - GSAP's ticker drives Lenis.raf() so there's only ONE rAF loop
 *  - lagSmoothing(0) disables GSAP's built-in lag compensation
 *    (Lenis handles its own timing)
 */
function LenisGSAPSync() {
  const lenis = useLenis();
  const callbackRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    if (!lenis) return;

    // 1. Feed Lenis scroll → ScrollTrigger
    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    // 2. GSAP ticker drives Lenis (single rAF, no double-loop)
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000); // GSAP passes seconds, Lenis expects ms
    };
    callbackRef.current = tickerCallback;
    gsap.ticker.add(tickerCallback);

    // 3. Disable GSAP's lag smoothing so Lenis's lerp stays authoritative
    gsap.ticker.lagSmoothing(0);

    // 4. Tell Lenis to NOT run its own rAF — we drive it from GSAP
    //    (autoRaf is off when we call lenis.raf() manually)

    return () => {
      lenis.off("scroll", onScroll);
      if (callbackRef.current) {
        gsap.ticker.remove(callbackRef.current);
        callbackRef.current = null;
      }
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.03,
        wheelMultiplier: 4.0,
        smoothWheel: true,
        autoRaf: false, // We drive RAF from GSAP's ticker
      }}
    >
      <LenisGSAPSync />
      {children}
    </ReactLenis>
  );
}
