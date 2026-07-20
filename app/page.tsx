"use client";

import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import XMarquee from "@/components/ui/XMarquee";
import { BentoGridRedesign } from "@/components/BentoGridRedesign";
import Footer from "@/components/Footer";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Certifications from "@/components/certifications";
import AboutMe from "@/components/about-me";
import GSAPSection from "@/components/scroll/GSAPSection";

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
      const el = sectionRef.current as HTMLElement;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const sectionHeight = Math.max(vh * 1.3, el.scrollHeight); // Use actual content height if taller
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
          100% ${sectionHeight + 200}px,
          0% ${sectionHeight + 200}px
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
        <div className="marquee-hero-wrapper bg-black">
          <div className="sticky top-0 h-screen z-10">
            <HeroSection onThemeToggle={toggleTheme} />
          </div>
          <div className="relative z-20">
            <div className="relative min-h-screen">
              <div className="absolute -top-[50vh] left-0 w-full h-[200vh] overflow-hidden pointer-events-none z-30">
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
                className="relative bg-gradient-to-br from-blue-900 via-black to-black overflow-hidden flex items-start justify-center pointer-events-auto rounded-b-[3rem] md:rounded-b-[4rem] z-20"
                style={{ clipPath, minHeight: "130vh" }}
              >
                <div className="w-full flex flex-col items-center justify-start pt-[45vw] md:pt-[25vw] xl:pt-[20vw] pb-24 px-4 md:px-8">
                  <BentoGridRedesign />
                  <AboutMe />
                </div>
              </div>

              {/* =========================================
                  NATIVE CSS STICKY PARALLAX STACKING 
                  Enhanced with GSAP ScrollTrigger for
                  precise control and snap behavior
                  ========================================= */}
              <div className="relative w-full bg-black z-10 mt-[-100vh] mb-[62vh]">

                {/* 1. EXPERIENCE - z10 */}
                <GSAPSection
                  id="experience"
                  className="relative w-full z-10"
                  start="top 80%"
                  animateFrom={{ opacity: 0, y: 40 }}
                  animateTo={{ opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }}
                >
                  <Experience />
                </GSAPSection>

                {/* 2. SKILLS - z30 (Stacks OVER Experience AND covers Projects for reveal) */}
                <div id="skills" className="relative h-[200vh] z-30 mt-[-100vh]">
                  <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center rounded-[3rem] md:rounded-[4rem] bg-[#050505] shadow-[0_20px_100px_rgba(0,0,0,0.9)] border-t border-white/5 overflow-hidden">
                    <Skills />
                  </div>
                </div>

                {/* 3. PROJECTS - z20 (Hidden behind Skills, revealed as Skills scrolls away) */}
                <div id="projects" className="relative h-[500vh] w-full z-20 mt-[-100vh] bg-black">
                  <Projects />
                </div>

                {/* 4. CERTIFICATIONS - z50 */}
                <div id="certifications" className="relative z-50 bg-zinc-950 shadow-[0_-50px_100px_rgba(0,0,0,0.9)] border-t border-white/5 overflow-hidden rounded-[3rem] md:rounded-[4rem] mt-[-100vh]">
                  <Certifications />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. FOOTER - Fixed at bottom, revealed by margin on above container */}
      <div id="footer" className="fixed bottom-0 left-0 w-full h-[62vh] bg-[#04040c] border-t border-white/10 z-0">
        <Footer />
      </div>
    </main>
  );
}
