"use client";
import { useEffect, useRef } from "react";
const ParallaxBg = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrolled = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      ref={bgRef}
      className="fixed top-0 left-0 w-screen h-[120vh] z-0 pointer-events-none"
      style={{
        background: "linear-gradient(120deg, #181c27 0%, #10131a 100%)",
        willChange: "transform",
        transition: "background 0.5s",
      }}
    />
  );
};
export default ParallaxBg;
