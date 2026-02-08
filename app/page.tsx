"use client";

import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import Section from "@/components/section";
import XMarquee from "@/components/ui/XMarquee";
import { BentoGridRedesign } from "@/components/BentoGridRedesign";
import Footer from "@/components/Footer";

export default function Home() {
  const sectionRef = useRef(null);
  const [clipPath, setClipPath] = useState("");

  useEffect(() => {
    function updateClipPath() {
      if (!sectionRef.current) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const sectionHeight = vh * 1.3; // REDUCED from 200vh to 130vh
      const bandCenterY = 120;
      const angleRad = (12 * Math.PI) / 180;

      // Responsive band height based on your new sizing
      let bandHeight;
      if (vw <= 768) {
        bandHeight = 40;
      } else {
        bandHeight = 80;
      }

      // Calculate intersection points at the END of the bands
      const tanAngle = Math.tan(angleRad);
      const bandEndY = bandCenterY + (bandHeight / 2); // Move to bottom edge

      // Calculate points using the actual section height instead of viewport height
      const leftY = bandEndY + (vw * 0.5 * tanAngle);
      const rightY = bandEndY + (vw * 0.5 * tanAngle);
      const centerY = bandEndY;

      setClipPath(`
        polygon(
          0% ${leftY}px,
          50% ${centerY}px, 
          100% ${rightY}px,
          100% ${sectionHeight}px,
          0% ${sectionHeight}px
        )
      `.replace(/\s+/g, ' '));
    }

    updateClipPath();

    // Use ResizeObserver to detect size changes of the section itself
    const resizeObserver = new ResizeObserver(() => {
      updateClipPath();
    });

    if (sectionRef.current) {
      resizeObserver.observe(sectionRef.current);
    }

    // Keep window resize as a fallback for viewport changes that might not trigger element resize
    window.addEventListener("resize", updateClipPath);

    return () => {
      window.removeEventListener("resize", updateClipPath);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <main className="relative text-white min-h-screen">
      <Navbar />
      <div className="marquee-hero-wrapper">
        <div className="sticky top-0 h-screen z-10">
          <HeroSection />
        </div>
        <div className="relative z-20">
          <div className="relative min-h-screen">
            <div
              className="absolute inset-x-0 top-0 flex justify-center pointer-events-none"
              style={{ height: "160px" }}
            >
              <XMarquee
                topText="ABOUT EXPERIENCE SKILLS"
                bottomText="DEVELOPER CREATOR INNOVATOR"
              />
            </div>
            <div
              ref={sectionRef}
              className="relative min-h-[130vh] bg-gradient-to-br from-blue-900 via-black to-black overflow-hidden flex items-center justify-center"
              style={{ clipPath }}
            >
              <Section id="about" title="About Me" className="bg-transparent">
                <div className="py-4 md:py-12 flex items-center justify-center min-h-[80vh]">
                  <BentoGridRedesign />
                </div>
              </Section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
