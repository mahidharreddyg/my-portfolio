"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StickyLockProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  lockDistance?: string; // e.g., "50vh"
  zIndex?: number;
}

export default function StickyLock({ children, className = "", id, lockDistance = "50vh", zIndex = 1 }: StickyLockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate the height of the container: 100vh (for the sticky view) + lockDistance
  const containerHeight = `calc(100vh + ${lockDistance})`;

  return (
    <div 
      ref={containerRef} 
      id={id}
      className="relative w-full" 
      style={{ height: containerHeight, zIndex }}
    >
      <div className={`sticky top-0 h-screen w-full ${className}`}>
        {children}
        
        {/* Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 z-[60]">
          <motion.div
            className="h-full w-full bg-blue-500/50 origin-left"
            style={{
              scaleX: scrollYProgress,
              boxShadow: "0 0 10px rgba(var(--tc1-rgb), 0.4)"
            }}
          />
        </div>

        {/* Floating Hint */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.4em] text-white/10 font-mono pointer-events-none z-[60] uppercase"
          style={{ 
            opacity: useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 0.6, 0.6, 0]),
            y: useTransform(scrollYProgress, [0, 1], [5, -5])
          }}
        >
          Keep scrolling
        </motion.div>
      </div>
    </div>
  );
}
