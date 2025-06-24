"use client";

import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import Section from "@/components/section";
import XMarquee from "@/components/ui/XMarquee";

export default function Home() {
  const sectionRef = useRef(null);
  const [clipPath, setClipPath] = useState("");

  useEffect(() => {
    function updateClipPath() {
      if (!sectionRef.current) return;

      const vw = window.innerWidth;
      const bandCenterY = 40; // Fixed Y position where bands intersect
      const angleRad = (12 * Math.PI) / 180;
      
      // Responsive band height based on your new sizing
      let bandHeight;
      if (vw <= 768) {
        bandHeight = 40; // h-10 on mobile/tablet
      } else {
        bandHeight = 80; // h-20 on desktop (md:h-20)
      }
      
      // Calculate intersection points at the END of the bands
      const tanAngle = Math.tan(angleRad);
      const bandEndY = bandCenterY + (bandHeight / 2); // Move to bottom edge
      
      const leftY = bandEndY + (vw * 0.5 * tanAngle);
      const rightY = bandEndY + (vw * 0.5 * tanAngle);
      const centerY = bandEndY;

      setClipPath(`
        polygon(
          0% ${leftY}px,
          50% ${centerY}px, 
          100% ${rightY}px,
          100% 100%,
          0% 100%
        )
      `.replace(/\s+/g, ' '));
    }

    updateClipPath();
    window.addEventListener("resize", updateClipPath);
    return () => window.removeEventListener("resize", updateClipPath);
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
              style={{ height: "80px" }}
            >
              <XMarquee
                topText="ABOUT EXPERIENCE SKILLS"
                bottomText="DEVELOPER CREATOR INNOVATOR"
              />
            </div>
            <div
              ref={sectionRef}
              className="relative min-h-screen bg-zinc-800 overflow-hidden"
              style={{ clipPath }}
            >
              <Section id="about" title="About Me" className="bg-transparent">
                <p className="pt-16 text-center max-w-3xl mx-auto leading-relaxed">
                  Perfect responsive triangle alignment with your new band sizing.
                </p>
              </Section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
