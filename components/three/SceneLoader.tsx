"use client";

import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

/**
 * SceneLoader — a loading screen that reflects actual Three.js asset load %
 * Uses drei's useProgress hook to track real loading state.
 * Styled to match the navy/black glassmorphic dark theme.
 */
export default function SceneLoader({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const { progress, active, loaded, total } = useProgress();
  const [show, setShow] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const hasCompletedRef = useRef(false);

  // Smooth the displayed progress value
  useEffect(() => {
    const target = Math.round(progress);
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= target) {
          clearInterval(timer);
          return target;
        }
        return prev + 1;
      });
    }, 12);
    return () => clearInterval(timer);
  }, [progress]);

  // Handle completion
  useEffect(() => {
    if (progress >= 100 && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      // Hold at 100% briefly for visual satisfaction
      const timer = setTimeout(() => {
        setShow(false);
        // Dispatch compatibility event for existing code
        window.dispatchEvent(new Event("preloaderDone"));
        window.sessionStorage.setItem("preloaderComplete", "true");
        document.body.style.overflow = "";
        onComplete?.();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  // Lock scroll during load
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, #0a1628 0%, #020617 50%, #000000 100%)",
          }}
        >
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.04,
              backgroundImage: `
                linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Animated glow orb */}
          <motion.div
            className="absolute pointer-events-none"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: "40vw",
              height: "40vw",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* System ID */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs font-mono tracking-[0.35em] text-blue-400/40 uppercase mb-8"
          >
            INITIALIZING 3D ENVIRONMENT
          </motion.div>

          {/* Percentage display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative mb-10"
          >
            <span
              className="text-7xl md:text-8xl font-extralight tracking-tighter tabular-nums"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              }}
            >
              {displayProgress}
            </span>
            <span
              className="text-2xl md:text-3xl font-extralight ml-1"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              %
            </span>
          </motion.div>

          {/* Progress bar */}
          <div className="relative w-64 md:w-80">
            {/* Track */}
            <div
              className="h-[1px] w-full rounded-full overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.06)",
              }}
            >
              {/* Fill */}
              <motion.div
                className="h-full rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${displayProgress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  background:
                    "linear-gradient(90deg, rgba(59,130,246,0.6) 0%, rgba(99,102,241,0.8) 50%, rgba(139,92,246,0.6) 100%)",
                  boxShadow:
                    "0 0 20px rgba(59,130,246,0.4), 0 0 40px rgba(99,102,241,0.2)",
                }}
              />
            </div>

            {/* Asset count */}
            <div className="flex justify-between mt-3 text-[10px] font-mono tracking-wider">
              <span style={{ color: "rgba(255,255,255,0.15)" }}>
                {loaded}/{total || "..."} ASSETS
              </span>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>
                {active ? "LOADING" : "READY"}
              </span>
            </div>
          </div>

          {/* Bottom status line */}
          <motion.div
            className="absolute bottom-8 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              animate={{
                backgroundColor: active
                  ? ["rgba(59,130,246,0.5)", "rgba(59,130,246,1)", "rgba(59,130,246,0.5)"]
                  : "rgba(34,197,94,0.8)",
                boxShadow: active
                  ? [
                      "0 0 4px rgba(59,130,246,0.3)",
                      "0 0 8px rgba(59,130,246,0.6)",
                      "0 0 4px rgba(59,130,246,0.3)",
                    ]
                  : "0 0 8px rgba(34,197,94,0.4)",
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span
              className="text-[10px] font-mono tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              {active ? "STREAMING GEOMETRY" : "SCENE COMPILED"}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
