"use client";

import HeroSection from "./components/HeroSection";
import WorkExperienceSection from "./components/WorkExperienceSection";

export default function Home() {
  return (
    <main className="relative w-full bg-black">
      {/* Hero Section */}
      <section className="relative z-10 h-screen">
        <HeroSection />
      </section>

      {/* Work Experience Section — positioned behind Hero Section */}
      <section className="relative z-0">
        <div className="absolute top-0 left-0 w-full h-screen flex items-end">
          <WorkExperienceSection />
        </div>
      </section>
    </main>
  );
}
