"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  // Fallback native scroll tracker for reliable footer reveal 
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how close we are to the absolute bottom of the page
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // The distance from the bottom of the viewport to the bottom of the page
      const distanceToBottom = documentHeight - (scrollY + windowHeight);

      // We want the glow to animate during the last 800px of scrolling
      const triggerDistance = 800;

      let progress = 0;
      if (distanceToBottom <= triggerDistance) {
        progress = 1 - (Math.max(0, distanceToBottom) / triggerDistance);
      }
      scrollYProgress.set(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once to set initial value
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollYProgress]);

  // ── Sunrise motion: mapped to our manual 0-1 progress ──
  const arcScale = useTransform(scrollYProgress, [0, 1], [0.35, 1.55]);
  const arcOpacity = useTransform(scrollYProgress, [0, 1], [0.15, 0.95]);
  const arcY = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <footer
      ref={containerRef}
      className="w-full min-h-[62vh] bg-[#04040c] flex flex-col justify-between pt-14 pb-6 px-4 md:px-14 relative overflow-hidden z-0"
    >
      {/* ── Subtle Dark Blue Aurora Glow (No hard edges) ── */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none w-full flex justify-center">
        {/* Layer 1 — outer subtle deep blue */}
        <motion.div
          className="absolute bottom-0 origin-bottom"
          style={{
            width: "min(900px, 100vw)",
            height: "min(400px, 45vw)",
            scale: arcScale,
            opacity: arcOpacity,
            y: arcY,
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.2) 60%, transparent 100%)",
            filter: "blur(40px)",
          }}
        />
        {/* Layer 2 — mid dark indigo/blue */}
        <motion.div
          className="absolute bottom-0 origin-bottom"
          style={{
            width: "min(500px, 60vw)",
            height: "min(200px, 25vw)",
            scale: arcScale,
            opacity: arcOpacity,
            y: arcY,
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(30,58,138,0.5) 0%, rgba(23,37,84,0.3) 70%, transparent 100%)",
            filter: "blur(30px)",
          }}
        />
        {/* Layer 3 — core blue edge */}
        <motion.div
          className="absolute bottom-0 origin-bottom"
          style={{
            width: "min(250px, 30vw)",
            height: "min(100px, 15vw)",
            scale: arcScale,
            opacity: arcOpacity,
            y: arcY,
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(29,78,216,0.25) 0%, rgba(30,58,138,0.1) 80%, transparent 100%)",
            filter: "blur(15px)",
          }}
        />
      </div>

      {/* Grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4338ca08_1px,transparent_1px),linear-gradient(to_bottom,#4338ca08_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-14 relative z-10 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr_0.7fr_0.9fr] gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2.5 w-max">
              <motion.div
                className="w-2 h-2 rounded-full bg-indigo-400"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ boxShadow: "0 0 10px rgba(99,102,241,0.6)" }}
              />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-indigo-400/60">
                System Ready
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Let&apos;s Build
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-blue-500">
                The Future
              </span>
            </h2>
            <p className="text-white/25 max-w-sm text-sm leading-relaxed font-mono">
              Open to collaborations, open-source projects, and exciting engineering challenges.
            </p>
          </div>

          {/* Navigate */}
          <div className="flex flex-col gap-3 font-mono text-sm">
            <h3 className="text-white/30 uppercase tracking-widest text-[10px] font-semibold mb-1">
              Navigate
            </h3>
            {[
              { href: "#home", label: "Home" },
              { href: "#work", label: "Work" },
              { href: "#about", label: "About" },
              { href: "#contact", label: "Contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/30 hover:text-indigo-400 transition-all duration-300 text-xs w-max"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-3 font-mono text-sm">
            <h3 className="text-white/30 uppercase tracking-widest text-[10px] font-semibold mb-1">
              Connect
            </h3>
            {[
              { href: "https://github.com/mahidharreddy", icon: <FaGithub size={14} />, label: "GitHub" },
              { href: "https://linkedin.com/in/mahidharreddy", icon: <FaLinkedin size={14} />, label: "LinkedIn" },
              { href: "https://twitter.com/mahidharreddy", icon: <FaTwitter size={14} />, label: "Twitter" },
              { href: "mailto:mahidharreddy@email.com", icon: <FaEnvelope size={14} />, label: "Email" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-blue-400 transition-all duration-300 flex items-center gap-2.5 group/link"
              >
                <span className="group-hover/link:drop-shadow-[0_0_6px_rgba(99,102,241,0.5)] transition-all">
                  {link.icon}
                </span>
                <span className="text-xs">{link.label}</span>
              </a>
            ))}
          </div>

          {/* System readout */}
          <div className="flex flex-col gap-2.5 font-mono text-[11px]">
            <h3 className="text-white/30 uppercase tracking-widest text-[10px] font-semibold mb-1">
              System
            </h3>
            <div className="flex justify-between text-white/20 gap-4">
              <span>STATUS</span>
              <motion.span
                className="text-indigo-400/70"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ONLINE
              </motion.span>
            </div>
            <div className="flex justify-between text-white/20 gap-4">
              <span>LOCATION</span>
              <span className="text-white/30">BLR, IN</span>
            </div>
            <div className="flex justify-between text-white/20 gap-4">
              <span>BUILD</span>
              <span className="text-white/30">v2.4.1</span>
            </div>
            <div className="flex justify-between text-white/20 gap-4">
              <span>LATENCY</span>
              <motion.span
                className="text-blue-400/60"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                12ms
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom legal bar ── */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-3 mt-12 pt-6 relative z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <p className="text-[10px] font-mono text-white/15 tracking-wider">
          &copy; {new Date().getFullYear()} MAHIDHAR REDDY G.
        </p>
        <div className="flex items-center gap-5 text-[10px] font-mono text-white/15">
          <span className="hover:text-white/40 transition-colors cursor-pointer tracking-wider">SYS.INFO</span>
          <span className="hover:text-white/40 transition-colors cursor-pointer tracking-wider">TERMINAL</span>
          <span className="tracking-wider">SUNRISE_v1</span>
        </div>
      </div>
    </footer>
  );
}