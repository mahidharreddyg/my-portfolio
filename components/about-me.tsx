"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import LazyCanvas from "./three/LazyCanvas";

// Three.js/R3F stay out of the initial bundle entirely until this actually mounts.
const AboutOrbitScene = dynamic(() => import("./three/AboutOrbitScene"), { ssr: false });
const HeroGoldDustScene = dynamic(() => import("./three/HeroGoldDustScene"), { ssr: false });

/**
 * A note from me — deliberately NOT a summary of the site (the bento already
 * does that). This is the personal, human beat: a short first-person note, a
 * portrait, and a signature. It renders inside the same max-width column as the
 * bento grid so it reads as a continuation, not a separate full-bleed section.
 */
export default function AboutMe() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const [panelHovered, setPanelHovered] = useState(false);

  // Cursor-driven 3D, tracked once across the whole panel instead of just the
  // photo — the portrait tilts hard, the panel itself tilts subtly, so the
  // entire section reads as one spatial object instead of a flat card with
  // a 3D sticker glued on top of it (the same "everything moves together"
  // feel the hero's glass circles + name + button all share).
  useEffect(() => {
    const panel = panelRef.current;
    const card = portraitRef.current;
    if (!panel || !card) return;
    const onMove = (e: MouseEvent) => {
      if (raf.current !== null) return;
      const cx = e.clientX, cy = e.clientY;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const pr = panel.getBoundingClientRect();
        const pnx = (cx - (pr.left + pr.width / 2)) / pr.width;
        const pny = (cy - (pr.top + pr.height / 2)) / pr.height;
        panel.style.setProperty("--prx", `${(-pny * 3.2).toFixed(2)}deg`);
        panel.style.setProperty("--pry", `${(pnx * 3.6).toFixed(2)}deg`);

        const r = card.getBoundingClientRect();
        const nx = (cx - (r.left + r.width / 2)) / r.width;
        const ny = (cy - (r.top + r.height / 2)) / r.height;
        card.style.setProperty("--rx", `${(-ny * 15).toFixed(2)}deg`);
        card.style.setProperty("--ry", `${(nx * 18).toFixed(2)}deg`);
        card.style.setProperty("--px", `${(nx * 22).toFixed(1)}px`);
        card.style.setProperty("--py", `${(ny * 22).toFixed(1)}px`);
      });
    };
    const reset = () => {
      panel.style.setProperty("--prx", "0deg");
      panel.style.setProperty("--pry", "0deg");
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--px", "0px");
      card.style.setProperty("--py", "0px");
    };
    panel.addEventListener("mousemove", onMove);
    panel.addEventListener("mouseenter", () => setPanelHovered(true));
    panel.addEventListener("mouseleave", () => { setPanelHovered(false); reset(); });
    return () => {
      panel.removeEventListener("mousemove", onMove);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 pt-6 pb-20">
      <style>{`
        .note-panel { position: relative; border-radius: 24px; overflow: hidden;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.09);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 70px -40px rgba(0,0,0,0.8);
          transform: rotateX(var(--prx,0)) rotateY(var(--pry,0));
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1); }
        .note-frame { position: relative; border-radius: 24px; perspective: 1600px; }
        .note-grain { position:absolute; inset:0; pointer-events:none; opacity:0.5;
          background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 0);
          background-size: 22px 22px;
          mask-image: radial-gradient(ellipse at 70% 20%, black 10%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse at 70% 20%, black 10%, transparent 75%); }
        .note-glow { position:absolute; width:420px; height:420px; left:-120px; bottom:-160px; pointer-events:none;
          background: radial-gradient(circle, rgba(var(--tc3-rgb),0.28), transparent 68%); filter: blur(50px); }
        .note-glow-gold { position:absolute; width:340px; height:340px; right:-100px; top:-140px; pointer-events:none;
          background: radial-gradient(circle, rgba(198,155,63,0.16), transparent 70%); filter: blur(46px); }
        .note-grid { position:absolute; inset:0; pointer-events:none; opacity:0.5;
          background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse at 50% 0%, black 0%, transparent 65%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 0%, black 0%, transparent 65%); }
        .note-corner { position:absolute; width:18px; height:18px; pointer-events:none; }
        .sig { font-family: var(--font-caveat), cursive; }

        /* Portrait diorama */
        .diorama { transform-style: preserve-3d; transform: rotateX(var(--rx,0)) rotateY(var(--ry,0)); transition: transform 0.25s cubic-bezier(0.22,1,0.36,1); }
        .dio-shadow { position:absolute; left:8%; right:8%; bottom:-22px; height:22px; border-radius:9999px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 72%); pointer-events:none; }
        .dio-scan {
          position: absolute; left: 4%; right: 4%; height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.9), rgba(243,226,179,1), rgba(212,175,55,0.9), transparent);
          box-shadow: 0 0 12px 2px rgba(212,175,55,0.6); pointer-events: none;
        }
        .dio-badge {
          position: absolute; display: flex; align-items: center; gap: 5px;
          background: rgba(8,11,18,0.78); border: 1px solid rgba(212,175,55,0.4);
          border-radius: 999px; padding: 4px 9px 4px 6px; pointer-events: none;
          box-shadow: 0 8px 20px -6px rgba(0,0,0,0.7);
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="note-frame"
        style={{
          padding: "1.4px",
          background: panelHovered
            ? "linear-gradient(135deg, var(--accent-2) 0%, var(--accent) 45%, var(--accent-ink) 100%)"
            : "linear-gradient(135deg, rgba(198,155,63,0.3) 0%, rgba(122,95,34,0.15) 50%, rgba(198,155,63,0.25) 100%)",
          borderRadius: "24px",
          transition: "background 0.4s ease-out",
        }}
      >
        <div ref={panelRef} className="note-panel">
        {/* Ambient WebGL gold dust — the same depth language as the hero,
            carried through so About doesn't feel like a flat page after it */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <LazyCanvas className="w-full h-full" camera={{ position: [0, 0, 5], fov: 45 }}>
            <HeroGoldDustScene />
          </LazyCanvas>
        </div>
        <div className="note-grain" />
        <div className="note-grid" />
        <div className="note-glow" />
        <div className="note-glow-gold" />

        {/* corner brackets — same instrument language as the bento cards, gold-tinted */}
        <span className="note-corner top-4 left-4 border-t border-l rounded-tl-md" style={{ borderColor: "rgba(212,175,55,0.35)" }} />
        <span className="note-corner bottom-4 right-4 border-b border-r rounded-br-md" style={{ borderColor: "rgba(212,175,55,0.35)" }} />

        {/* top instrument bar */}
        <div className="relative z-10 flex items-center justify-between px-7 md:px-12 pt-6 pb-2">
          <span className="lo-meta" style={{ letterSpacing: "0.28em" }}>PROFILE.DAT</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.24em] uppercase" style={{ color: "rgba(230,192,90,0.8)" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold-bead)" }} />
            Verified
          </span>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 md:gap-12 p-7 md:p-12 pt-4 items-center">
          {/* Portrait — layered 3D diorama */}
          <div className="[perspective:1400px] mx-auto md:mx-0 py-6">
            <div ref={portraitRef} className="diorama relative w-[210px] md:w-full aspect-[4/5]">

              {/* deep backdrop glow — drifts opposite the cursor for depth */}
              <div
                className="absolute -inset-10 rounded-[32px] pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 40%, rgba(var(--tc3-rgb),0.5), transparent 70%)",
                  filter: "blur(34px)",
                  transform: "translateZ(-90px) translate(calc(var(--px,0px) * -1), calc(var(--py,0px) * -1))",
                }}
              />

              {/* Real WebGL rings + floating chips — one GPU canvas instead of
                  a dozen composited CSS layers. Extends past the card bounds
                  so the rings can orbit around it. */}
              <div className="absolute -inset-20 pointer-events-none">
                <LazyCanvas className="w-full h-full" camera={{ position: [0, 0, 4], fov: 40 }}>
                  <AboutOrbitScene />
                </LazyCanvas>
              </div>

              {/* ground shadow, sinks as the card tilts */}
              <div className="dio-shadow" style={{ transform: "translateZ(-60px)" }} />

              {/* the photo itself */}
              <div
                className="absolute inset-0 rounded-[20px] overflow-hidden border border-white/12"
                style={{ boxShadow: "0 30px 60px -30px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.12)", transform: "translateZ(0px)" }}
              >
                <Image src="/profile_pic.PNG" alt="Mahidhar Reddy G" width={420} height={525} className="w-full h-full object-cover" style={{ filter: "saturate(1.05) contrast(1.03)" }} />
                {/* gold biometric-style scan sweep — plays once when scrolled into view */}
                <motion.div
                  className="dio-scan"
                  style={{ top: "0%" }}
                  initial={{ y: "-10%", opacity: 0 }}
                  whileInView={{ y: ["-10%", "480%"], opacity: [0, 1, 1, 0] }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.6, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
                />
              </div>
              {/* glass sheen — sweeps opposite parallax so it reads as a reflection */}
              <div
                className="absolute inset-0 rounded-[20px] pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 46%)",
                  transform: "translateZ(2px) translate(var(--px,0px), var(--py,0px))",
                }}
              />

              {/* corner ticks — float above the surface */}
              <span className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-[#e6c05a]/80 rounded-tl-[4px]" style={{ transform: "translateZ(38px)" }} />
              <span className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-[#e6c05a]/80 rounded-br-[4px]" style={{ transform: "translateZ(38px)" }} />

              {/* ID badge — a small tech-flavored detail, floats in front */}
              <div className="dio-badge -bottom-3 left-1/2 -translate-x-1/2" style={{ transform: "translateZ(50px) translateX(-50%)" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f3e2b3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                <span className="font-mono text-[8px] tracking-[0.16em] uppercase" style={{ color: "#f3e2b3" }}>MR · 2026</span>
              </div>
            </div>
          </div>

          {/* Note */}
          <div>
            <div className="inline-flex items-center gap-2.5 mb-6">
              <span className="h-px w-8" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.75), transparent)" }} />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(230,192,90,0.75)" }}>A note from me</span>
            </div>

            <div className="space-y-4 text-[15px] md:text-[16.5px] leading-[1.75] text-white/70 max-w-[60ch]">
              <p>
                Hi — I&apos;m <span className="text-white font-medium">Mahidhar</span>. I build things because I genuinely can&apos;t
                help it. I&apos;ve always been the person who takes something apart just to understand how it fits together,
                then quietly puts it back a little better than before.
              </p>
              <p>
                What pulls me in is the seam where solid engineering meets thoughtful design — systems that scale calmly in
                the background while the experience up front feels effortless. Clean architecture, honest performance, and
                interfaces with a bit of soul. That&apos;s the work I want to keep chasing.
              </p>
              <p className="text-white/55">
                When I&apos;m not shipping, you&apos;ll find me sketching interfaces, breaking down products I admire, or
                over-thinking the details nobody asked about. If any of this resonates, I&apos;d love to build something with you.
              </p>
            </div>

            {/* Gold circuit divider — thin trace with a lit node, tech-savvy not decorative */}
            <div className="mt-9 mb-1 flex items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, var(--gold-core), transparent)" }} />
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold-bead)", boxShadow: "0 0 8px rgba(230,192,90,0.7)" }} />
              <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, var(--gold-core))" }} />
            </div>

            {/* Signature — gold ink, the one warm accent in an otherwise cool room */}
            <div className="mt-7 flex items-end justify-between flex-wrap gap-4">
              <div>
                <div className="sig lo-gold-text text-4xl md:text-5xl leading-none" style={{ filter: "drop-shadow(0 0 18px rgba(212,175,55,0.35))" }}>
                  Mahidhar
                </div>
                <div className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/35">
                  Mahidhar Reddy G · Bengaluru, IN
                </div>
              </div>
              <a
                href="mailto:mahidhar.reddy2003@gmail.com"
                className="group inline-flex items-center gap-2.5 rounded-full pl-4 pr-2 py-2 border border-white/15 bg-white/[0.04] text-white text-sm font-medium transition-all duration-300 hover:bg-white/[0.08]"
                style={{ borderColor: "rgba(198,155,63,0.25)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(230,192,90,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(198,155,63,0.25)")}
              >
                Say hello
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45"
                  style={{ background: "rgba(198,155,63,0.15)", border: "1px solid rgba(230,192,90,0.35)", color: "#e6c05a" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
              </a>
            </div>
          </div>
        </div>
        </div>
      </motion.div>
    </section>
  );
}
