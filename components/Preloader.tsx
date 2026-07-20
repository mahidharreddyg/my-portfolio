"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [sysId, setSysId] = useState("LOADING");
  const [memAlloc, setMemAlloc] = useState("0000");

  useEffect(() => {
    setSysId(Math.random().toString(36).substring(7).toUpperCase());
    setMemAlloc(Math.floor(Math.random() * 9999).toString());

    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    window.sessionStorage.removeItem("preloaderComplete");

    const startTime = Date.now();
    const minLoadTime = 2500; // Minimum time to show the cool animation
    
    // We increment progress artificially up to 90%. 
    // The last 10% happens ONLY when window actually finishes loading all assets.
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 100);

    let hasFinished = false

    const finishLoading = () => {
      if (hasFinished) return;
      hasFinished = true;

      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsed);

      setTimeout(() => {
        setProgress(100);
        clearInterval(progressInterval);
        
        // Wait at 100% for a moment before dissolving
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
          window.sessionStorage.setItem("preloaderComplete", "true");
          window.dispatchEvent(new Event("preloaderDone"));
        }, 600);
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading);
      // Fallback just in case some rogue script prevents 'load' indefinitely
      const fallbackTimer = setTimeout(finishLoading, 8000);
      return () => {
        window.removeEventListener("load", finishLoading);
        clearTimeout(fallbackTimer);
      };
    }

    return () => clearInterval(progressInterval);
  }, []);

  // Architectural drafting lines for the 'M'
  // Using an extended grid where lines shoot past their intersections
  const constructionLines = [
    // Horizontal guides
    { x1: "-50", y1: "80", x2: "150", y2: "80", delay: 0.1, opacity: 0.2 }, // Baseline
    { x1: "-50", y1: "20", x2: "150", y2: "20", delay: 0.2, opacity: 0.2 }, // Cap-height
    { x1: "-50", y1: "60", x2: "150", y2: "60", delay: 0.3, opacity: 0.1 }, // Mid-intersection line
    
    // Vertical/Diagonal construction guides
    { x1: "20", y1: "120", x2: "20", y2: "-20", delay: 0.4, opacity: 0.3 }, // Left stem guide
    { x1: "80", y1: "120", x2: "80", y2: "-20", delay: 0.5, opacity: 0.3 }, // Right stem guide
    { x1: "10", y1: "10", x2: "65", y2: "90", delay: 0.6, opacity: 0.2 },   // Left diag guide
    { x1: "90", y1: "10", x2: "35", y2: "90", delay: 0.7, opacity: 0.2 },   // Right diag guide
  ];

  const mainLines = [
    // The actual 'M' outline tracing over the construction lines
    { d: "M 20 80 L 20 20", delay: 1.0 },
    { d: "M 20 20 L 50 60", delay: 1.2 },
    { d: "M 50 60 L 80 20", delay: 1.4 },
    { d: "M 80 20 L 80 80", delay: 1.6 },
  ];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-3%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#020617]"
        >
          {/* Subtle background glow */}
          <motion.div
            animate={{ opacity: [0.05, 0.15, 0.05], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
          />

          {/* Tech-savvy Cyber Grid Background */}
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)'
          }} />

          {/* Scanning Laser Line */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-[1px] bg-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.8)] pointer-events-none z-0"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* HUD Tech Data Corners */}
          <div className="absolute top-8 left-8 text-blue-500/40 font-mono text-[10px] hidden md:block">
            SYS.INIT // {sysId}<br/>
            MEM.ALLOC // {memAlloc} MB<br/>
            SEC.PROTOCOL // ACTIVE
          </div>
          <div className="absolute bottom-8 right-8 text-blue-500/40 font-mono text-[10px] text-right hidden md:block">
            V 2.0.44<br/>
            [ CORE ONLINE ]
          </div>

          <div className="relative z-10 flex flex-col items-center gap-16 w-full max-w-lg px-8">
            
            {/* Architectural 'M' Drafting Logo */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center overflow-visible">
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full overflow-visible"
              >
                {/* 1. Draw thin, fading construction lines first */}
                {constructionLines.map((line, i) => (
                  <motion.line
                    key={`const-${i}`}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="rgba(255, 255, 255, 0.4)"
                    strokeWidth="0.5"
                    strokeDasharray="1 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: line.opacity }}
                    transition={{ 
                      duration: 1.5, 
                      ease: [0.16, 1, 0.3, 1], 
                      delay: line.delay 
                    }}
                  />
                ))}

                {/* 2. Draw the solid 'M' strokes on top */}
                {mainLines.map((line, i) => (
                  <motion.path
                    key={`main-${i}`}
                    d={line.d}
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    fill="none"
                    style={{ filter: "drop-shadow(0px 0px 4px rgba(255,255,255,0.3))" }}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ 
                      duration: 1.5, 
                      ease: [0.16, 1, 0.3, 1], 
                      delay: line.delay 
                    }}
                  />
                ))}

                {/* 3. Glowing intersection points (Architectural nodes) */}
                <motion.circle cx="20" cy="20" r="1.5" fill="white" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.8 }} transition={{ delay: 1.8 }} />
                <motion.circle cx="50" cy="60" r="1.5" fill="white" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.8 }} transition={{ delay: 1.8 }} />
                <motion.circle cx="80" cy="20" r="1.5" fill="white" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.8 }} transition={{ delay: 1.8 }} />
              </svg>
            </div>

            {/* Architectural Grid Loading Line */}
            <div className="w-full flex flex-col gap-4 mt-8">
              <div className="relative w-full h-[1px] bg-white/10 overflow-visible">
                {/* Target reticle left */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-3 bg-white/30" />
                {/* Target reticle right */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-3 bg-white/30" />
                
                <motion.div
                  className="absolute top-1/2 left-0 h-[1px] bg-white -translate-y-1/2 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>

              <div className="flex justify-between items-center w-full">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-blue-400 font-mono text-[9px] tracking-[0.4em] uppercase"
                >
                  SYSTEM.BOOT_SEQUENCE
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-blue-300 font-mono text-xs tracking-widest"
                >
                  {Math.min(100, progress)}%
                </motion.span>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
