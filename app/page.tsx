"use client";

import { useRef, useEffect } from 'react';
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import Section from "@/components/section";
import XMarquee from "../components/ui/XMarquee";

export default function Home() {
  const hasLoadedBefore = useRef(true);

  useEffect(() => {
    if (hasLoadedBefore.current) {
      console.log("Portfolio page initialized - Effect ran only once");
      hasLoadedBefore.current = false;
    }
  }, []);

  return (
    <main className="min-h-screen text-white relative">
      <Navbar />

      {/* Fixed Hero Section */}
      <div className="sticky top-0 h-screen z-10">
        <HeroSection />
      </div>

      {/* Scrolling Content */}
      <div className="relative z-20">

        {/* About Section - Marquee above, tip of section at bottom of marquee */}
        {/* Marquee absolutely positioned at the top, outside the clipped section */}
        <div className="relative min-h-screen">
          <div className="absolute left-0 right-0 top-0 z-30 pointer-events-none flex items-start justify-center" style={{height: '80px'}}>
            <XMarquee
              topText="ABOUT   EXPERIENCE   SKILLS   ABOUT   EXPERIENCE   SKILLS"
              bottomText="DEVELOPER   CREATOR   INNOVATOR   DEVELOPER   CREATOR   INNOVATOR"
            />
          </div>
          <div
            className="relative min-h-screen bg-zinc-800 overflow-hidden"
            style={{ clipPath: 'polygon(0 260px, 50% 80px, 100% 260px, 100% 100%, 0% 100%)' }}
          >
            <Section
              id="about"
              title="About Me"
              className="bg-transparent relative z-20"
            >
              <div className="pt-10">
                <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed text-center">
                  Passionate software developer with expertise in modern web technologies. I love creating innovative solutions
                  that make a difference in the digital world.
                </p>
              </div>
            </Section>
          </div>
        </div>

      </div>
    </main>
  );
}
