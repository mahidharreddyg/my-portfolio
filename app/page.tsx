"use client";

import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import Section from "@/components/section";
import XMarquee from "@/components/ui/XMarquee";
import { BentoGridRedesign } from "@/components/BentoGridRedesign";
import Footer from "@/components/Footer";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Certifications from "@/components/certifications";

export default function Home() {
  const sectionRef = useRef(null);
  const [clipPath, setClipPath] = useState("");
  const [isMonochrome, setIsMonochrome] = useState(false);

  const toggleTheme = () => {
    setIsMonochrome((prev) => !prev);
  }

  useEffect(() => {
    // Force start at top
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    let rafId: number;
    let timeoutId: NodeJS.Timeout;

    function updateClipPath() {
      if (!sectionRef.current) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const sectionHeight = vh * 1.3; // REDUCED from 200vh to 130vh
      const bandCenterY = 120;
      const angleRad = (12 * Math.PI) / 180;

      // Responsive band height based on your new sizing
      const bandHeight = vw <= 768 ? 40 : 80;

      // Calculate intersection points at the END of the bands
      const tanAngle = Math.tan(angleRad);
      const bandEndY = bandCenterY + (bandHeight / 2); // Move to bottom edge

      // Calculate points
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

    // Debounced version for ResizeObserver to prevent thrashing
    const debouncedUpdate = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        rafId = requestAnimationFrame(updateClipPath);
      }, 50);
    };

    updateClipPath();

    // Use ResizeObserver to detect size changes of the section itself
    const resizeObserver = new ResizeObserver(debouncedUpdate);

    if (sectionRef.current) {
      resizeObserver.observe(sectionRef.current);
    }

    // Keep window resize as a fallback for viewport changes
    window.addEventListener("resize", debouncedUpdate);

    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      resizeObserver.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main className={`relative bg-black text-white min-h-screen ${isMonochrome ? 'grayscale opacity-95 transition-all duration-1000' : ''}`}>
      <Navbar isMonochrome={isMonochrome} />

      {/* Removing heavy filter style inline wrapper that tanks scrolling performance */}
      <div>
        <div className="marquee-hero-wrapper transform-gpu will-change-transform bg-black">
          <div className="sticky top-0 h-screen z-10">
            <HeroSection onThemeToggle={toggleTheme} />
          </div>
          <div className="relative z-20">
            <div className="relative min-h-screen">
              <div className="absolute -top-[50vh] left-0 w-full h-[200vh] overflow-hidden pointer-events-none">
                <div className="relative top-[50vh] w-full h-full">
                  <XMarquee
                    topText="ABOUT EXPERIENCE SKILLS"
                    bottomText="DEVELOPER CREATOR INNOVATOR"
                  />
                </div>
              </div>
              {/* ABOUT SECTION: Normal Document Flow so it correctly sits beneath Marquee */}
              <div
                ref={sectionRef}
                className="relative min-h-[130vh] bg-gradient-to-br from-blue-900 via-black to-black overflow-hidden flex items-center justify-center pointer-events-auto"
                style={{ clipPath }}
              >
                <Section id="about" title="About Me" className="bg-transparent w-full">
                  <div className="py-4 md:py-12 flex items-center justify-center w-full min-h-[80vh] px-4 md:px-8">
                    <BentoGridRedesign />
                  </div>
                </Section>
              </div>

              {/* =========================================
                  NATIVE CSS STICKY PARALLAX STACKING 
                  (Hardware-accelerated and buttery smooth, no scroll trapping)
                  ========================================= */}
              <div className="relative z-30 w-full bg-black">

                {/* 1. EXPERIENCE */}
                <div id="experience" className="sticky top-0 h-screen w-full flex flex-col items-center justify-center rounded-t-[3rem] md:rounded-t-[4rem] bg-black shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-t border-white/5 overflow-hidden">
                  <Experience />
                </div>

                {/* 2. SKILLS */}
                <div id="skills" className="sticky top-0 h-screen w-full flex flex-col items-center justify-center rounded-t-[3rem] md:rounded-t-[4rem] bg-zinc-950 shadow-[0_-20px_60px_rgba(0,0,0,0.8)] border-t border-white/5 overflow-hidden">
                  <Skills />
                </div>

                {/* 3. PROJECTS */}
                <div id="projects" className="relative h-[300vh] w-full">
                  <Projects />
                </div>

                {/* 4. CERTIFICATIONS */}
                <div id="certifications" className="sticky top-0 h-screen w-full flex flex-col items-center justify-center rounded-t-[3rem] md:rounded-t-[4rem] bg-zinc-950 shadow-[0_-20px_60px_rgba(0,0,0,0.8)] border-t border-white/5 overflow-hidden">
                  <Certifications />
                </div>

                {/* 5. FOOTER */}
                <div id="footer" className="relative h-screen sm:h-[60vh] md:h-[50vh] w-full flex flex-col justify-end bg-black shadow-[0_-20px_60px_rgba(0,0,0,0.8)] border-t border-white/10 z-50">
                  <div className="w-full h-full">
                    <Footer />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
