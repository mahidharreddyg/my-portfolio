"use client";
import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useMotionValue, useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import LazyCanvas from "./three/LazyCanvas";

const FooterOrbScene = dynamic(() => import("./three/FooterOrbScene"), { ssr: false });

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRaf = useRef<number | null>(null);
  // Footer is mounted (and its infinite loops start) from initial page load,
  // long before the user scrolls anywhere near it — only actually animate
  // the orb while it's on screen.
  const footerInView = useInView(containerRef, { margin: "200px 0px 200px 0px" });

  // Cursor-driven 3D tilt on the headline block (CSS vars, no re-renders).
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onMove = (e: MouseEvent) => {
      if (tiltRaf.current !== null) return;
      const cx = e.clientX, cy = e.clientY;
      tiltRaf.current = requestAnimationFrame(() => {
        tiltRaf.current = null;
        const r = stage.getBoundingClientRect();
        const nx = (cx - (r.left + r.width / 2)) / r.width;
        const ny = (cy - (r.top + r.height / 2)) / r.height;
        stage.style.setProperty("--frx", `${(-ny * 5).toFixed(2)}deg`);
        stage.style.setProperty("--fry", `${(nx * 6).toFixed(2)}deg`);
      });
    };
    const reset = () => { stage.style.setProperty("--frx", "0deg"); stage.style.setProperty("--fry", "0deg"); };
    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", reset);
    return () => {
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", reset);
      if (tiltRaf.current !== null) cancelAnimationFrame(tiltRaf.current);
    };
  }, []);

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
              "radial-gradient(ellipse at 50% 100%, rgba(var(--tc4-rgb),0.5) 0%, rgba(23,37,84,0.3) 70%, transparent 100%)",
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
              "radial-gradient(ellipse at 50% 100%, rgba(var(--tc5-rgb),0.25) 0%, rgba(var(--tc4-rgb),0.1) 80%, transparent 100%)",
            filter: "blur(15px)",
          }}
        />
        {/* Layer 4 — bright horizon rim, gives the arc a crisp lit edge */}
        <motion.div
          className="absolute bottom-0 origin-bottom rounded-full"
          style={{
            width: "min(160px, 20vw)",
            height: "3px",
            scale: arcScale,
            opacity: useTransform(scrollYProgress, [0, 1], [0, 0.9]),
            y: useTransform(scrollYProgress, [0, 1], [30, -6]),
            background: "linear-gradient(90deg, transparent, rgba(148,197,255,0.95), transparent)",
            boxShadow: "0 0 24px 4px rgba(var(--tc10-rgb),0.55)",
          }}
        />
        {/* Layer 5 — slow rotating shimmer sweep across the arc */}
        <motion.div
          className="absolute bottom-0 origin-bottom rounded-full pointer-events-none"
          style={{
            width: "min(700px, 85vw)",
            height: "min(340px, 38vw)",
            scale: arcScale,
            opacity: useTransform(scrollYProgress, [0, 1], [0, 0.35]),
            y: arcY,
            background: "conic-gradient(from 0deg, transparent 0%, rgba(125,178,255,0.25) 8%, transparent 16%, transparent 100%)",
            mixBlendMode: "screen",
          }}
          animate={footerInView ? { rotate: 360 } : undefined}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4338ca08_1px,transparent_1px),linear-gradient(to_bottom,#4338ca08_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-12 relative z-10 pt-4">
        {/* Closing statement */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 [perspective:1600px]">
          <div
            ref={stageRef}
            className="flex flex-col gap-5 max-w-xl relative [transform-style:preserve-3d]"
            style={{ transform: "rotateX(var(--frx,0)) rotateY(var(--fry,0))", transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}
          >
            {/* floating glass orb — real WebGL sphere with actual lighting/depth
                instead of a CSS radial-gradient standing in for one */}
            <div
              className="absolute -top-16 -right-10 md:-right-20 w-28 h-28 md:w-36 md:h-36 pointer-events-none hidden sm:block"
              style={{ transform: "translateZ(60px)" }}
            >
              <LazyCanvas className="w-full h-full" camera={{ position: [0, 0, 3.2], fov: 40 }}>
                <FooterOrbScene />
              </LazyCanvas>
            </div>

            <div className="inline-flex items-center gap-2.5 w-max" style={{ transform: "translateZ(30px)" }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 8px rgba(52,211,153,0.8)" }} />
              </span>
              <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-emerald-300/70">
                Available for work
              </span>
            </div>

            <h2
              className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[0.98] relative"
              style={{ letterSpacing: "-0.03em", transform: "translateZ(46px)" }}
            >
              {/* embossed depth layer behind the text */}
              <span className="absolute inset-0 -z-10" aria-hidden style={{ color: "rgba(var(--tc3-rgb),0.35)", transform: "translate(3px,5px) translateZ(-20px)", filter: "blur(1px)" }}>
                Let&apos;s build<br />the future.
              </span>
              Let&apos;s build<br />the future<span className="text-sky-400">.</span>
            </h2>
            <p className="text-white/40 max-w-md text-sm leading-relaxed" style={{ transform: "translateZ(24px)" }}>
              Open to engineering roles, freelance work, and open-source collaboration — worldwide.
            </p>

            <a
              href="mailto:mahidhar.reddy2003@gmail.com"
              className="group/mail mt-1 inline-flex w-max items-center gap-3 rounded-full pl-5 pr-2 py-2 border border-white/15 bg-white/[0.04] text-white text-sm font-medium transition-all duration-300 hover:border-sky-400/40 hover:bg-white/[0.07]"
              style={{ transform: "translateZ(38px)" }}
            >
              mahidhar.reddy2003@gmail.com
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 transition-transform duration-300 group-hover/mail:rotate-45">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </span>
            </a>
          </div>

          {/* Right: navigation + socials */}
          <div className="flex gap-14">
            <nav className="flex flex-col gap-3">
              <h3 className="lo-meta mb-1">Navigate</h3>
              {[
                { href: "#home", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#experience", label: "Experience" },
                { href: "#projects", label: "Projects" },
                { href: "#certifications", label: "Certifications" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/45 hover:text-white transition-colors duration-300 text-[13px] w-max"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              <h3 className="lo-meta mb-1">Connect</h3>
              {[
                { href: "https://github.com/mahidharreddy", icon: <FaGithub size={14} />, label: "GitHub" },
                { href: "https://linkedin.com/in/mahidharreddy", icon: <FaLinkedin size={14} />, label: "LinkedIn" },
                { href: "https://twitter.com/mahidharreddy", icon: <FaTwitter size={14} />, label: "Twitter" },
                { href: "mailto:mahidhar.reddy2003@gmail.com", icon: <FaEnvelope size={14} />, label: "Email" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-white/45 hover:text-sky-300 transition-colors duration-300 flex items-center gap-2.5 text-[13px] group/link w-max"
                >
                  <span className="text-white/35 group-hover/link:text-sky-300 transition-colors">{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom legal bar ── */}
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-3 mt-10 pt-6 relative z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <p className="text-[10px] font-mono text-white/25 tracking-wider">
          &copy; {new Date().getFullYear()} Mahidhar Reddy G · Bengaluru, IN
        </p>
        <p className="text-[10px] font-mono text-white/25 tracking-wider">
          Designed &amp; built with intent · <span className="text-white/40">Next.js</span>
        </p>
      </div>
    </footer>
  );
}