import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame, useScroll, useVelocity, useMotionValueEvent } from "motion/react";

const BAND_HEIGHT = 80;
const BAND_TEXT = "ACTUATE   INNOVATE   IDEATE   ACTUATE   INNOVATE   IDEATE   ";

function useResponsiveMarquee(baseVelocity: number) {
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

  const velocityFactor = useTransform(smoothVelocity, [-80, 80], [-1.5, 1.5], { clamp: false });

  useAnimationFrame((_t, delta) => {
    if (!hasInitialized.current) return;
    let moveBy = baseVelocity * (delta / 1000);
    const currentVelocity = velocityFactor.get();
    if (scrollDirection === "up") {
      moveBy -= Math.abs(currentVelocity) * baseVelocity * (delta / 1000) * 1.5;
    } else if (scrollDirection === "down") {
      moveBy += Math.abs(currentVelocity) * baseVelocity * (delta / 1000) * 1.5;
    }
    baseX.set(baseX.get() + moveBy);
  });

  return baseX;
}

function MarqueeBand({
  direction = "right",
  text = BAND_TEXT,
  rotate = 0,
  style = {},
}: {
  direction: "right" | "left";
  text: string;
  rotate: number;
  style?: React.CSSProperties;
}) {
  // Negative velocity for left, positive for right
  const baseVelocity = direction === "right" ? 60 : -60;
  const baseX = useResponsiveMarquee(baseVelocity);
  const [repetitions, setRepetitions] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;
      setRepetitions(Math.ceil(containerWidth / textWidth) + 2);
    }
  }, [text]);

  // Arrow band shape: rectangle with triangles at both ends
  // 80px tall, full width, triangles are 60px wide
  // Clip-path: left and right triangles
  const bandClip =
    "polygon(0% 0%, 5% 0%, 0% 50%, 5% 100%, 0% 100%, 95% 100%, 100% 50%, 95% 0%, 100% 0%)";

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "120vw",
        height: BAND_HEIGHT,
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
        zIndex: 10,
        pointerEvents: "none",
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          clipPath: bandClip,
          background: "#101010",
          boxShadow:
            "0 0 32px 8px #1e90ff88, 0 0 64px 16px #1e90ff44, 0 0 0 4px #101010, 0 2px 8px #1e90ff99",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <motion.div
          style={{
            x: baseX,
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            width: "100%",
            height: "100%",
            fontWeight: 900,
            fontSize: 32,
            letterSpacing: 2,
            color: "#00ff66",
            textShadow:
              "0 0 8px #00ff66, 0 0 16px #00ff66, 0 2px 8px #000, 0 0 32px #1e90ff",
            filter: "drop-shadow(0 0 8px #00ff66) drop-shadow(0 0 16px #1e90ff)",
            userSelect: "none",
          }}
        >
          {Array.from({ length: repetitions }).map((_, i) => (
            <span
              key={i}
              ref={i === 0 ? textRef : undefined}
              style={{ margin: "0 32px" }}
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function DiagonalMarqueeBands() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <MarqueeBand direction="right" text={BAND_TEXT} rotate={12} />
      <MarqueeBand direction="left" text={BAND_TEXT} rotate={168} />
    </div>
  );
} 