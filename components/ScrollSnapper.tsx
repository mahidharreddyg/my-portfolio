"use client";

import { useLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';

// List of section IDs in the order they appear
const SECTIONS = [
  "experience",
  "skills",
  "projects",
  "certifications",
  "footer"
];

export default function ScrollSnapper() {
  const lenis = useLenis();
  const isSnapping = useRef(false);
  const activeIndex = useRef(0);

  useEffect(() => {
    if (!lenis) return;

    const onScroll = ({ scroll, targetScroll, velocity, direction }: any) => {
      if (isSnapping.current) return;
      
      const elements = SECTIONS.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      if (elements.length === 0) return;

      // Calculate absolute Y positions of all sections
      const sectionYs = elements.map(el => scroll + el.getBoundingClientRect().top);
      
      // Determine which section we are currently in based on actual scroll position
      let currentIndex = 0;
      for (let i = elements.length - 1; i >= 0; i--) {
        if (scroll >= sectionYs[i] - 10) { // 10px buffer
          currentIndex = i;
          break;
        }
      }
      
      activeIndex.current = currentIndex;

      // Check if the inertia is trying to skip a section
      if (direction > 0 && currentIndex < elements.length - 1) {
        // Scrolling down: if targetScroll blows past the NEXT section's top
        const nextY = sectionYs[currentIndex + 1];
        if (targetScroll > nextY + 10) {
          isSnapping.current = true;
          lenis.scrollTo(nextY, {
            duration: 1.0,
            lock: true, // Kills all momentum and prevents further scrolling until done
            easing: (t: number) => 1 - Math.pow(1 - t, 4),
            onComplete: () => {
              // Massive 1.2s cooldown to eat all trackpad momentum
              setTimeout(() => { isSnapping.current = false; }, 1200);
            }
          });
        }
      } else if (direction < 0 && currentIndex > 0) {
        // Scrolling up: if targetScroll blows past the PREVIOUS section's top
        const prevY = sectionYs[currentIndex - 1];
        if (targetScroll < prevY - 10) {
          isSnapping.current = true;
          lenis.scrollTo(prevY, {
            duration: 1.0,
            lock: true,
            easing: (t: number) => 1 - Math.pow(1 - t, 4),
            onComplete: () => {
              // Massive 1.2s cooldown to eat all trackpad momentum
              setTimeout(() => { isSnapping.current = false; }, 1200);
            }
          });
        }
      }
    };

    lenis.on('scroll', onScroll);
    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [lenis]);

  return null;
}
