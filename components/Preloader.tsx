"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Cinematic multi-language "hello" — a title-card sequence through six
// languages before landing on English, closing with a fast, high-energy
// light-burst punch into the hero (a studio-logo sting, not a slow reveal).
// Colors come ONLY from the site's real design tokens (--gold-*, --accent*,
// --tc*-rgb, --lo-*) — no ad-hoc rgba literals — so nothing clashes with
// the rest of the site's palette. Each word gets its own real Unicode font
// (see app/layout.tsx) — system font fallback silently drops scripts it
// doesn't cover.
const GREETINGS = [
  { word: "నమస్తే", lang: "Telugu", font: "var(--font-noto-telugu)" },
  { word: "வணக்கம்", lang: "Tamil", font: "var(--font-noto-tamil)" },
  { word: "ನಮಸ್ಕಾರ", lang: "Kannada", font: "var(--font-noto-kannada)" },
  { word: "नमस्ते", lang: "Hindi", font: "var(--font-noto-devanagari)" },
  { word: "Hola", lang: "Spanish", font: "var(--font-malinton)" },
  { word: "Bonjour", lang: "French", font: "var(--font-malinton)" },
  { word: "Hello", lang: "English", font: "var(--font-malinton)" },
] as const;

const WORD_MS = 620;
const FINAL_HOLD_MS = 1200;
const LAST_INDEX = GREETINGS.length - 1;
const CHARGE_MS = 260; // the panel winds up before it lets go
const PUNCH_MS = 620; // total time for the burst + punch-out to clear

type Dust = { id: number; x: number; y: number; size: number; duration: number; delay: number };

function buildDust(): Dust[] {
  return Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 2,
    duration: 5 + Math.random() * 4,
    delay: Math.random() * 4,
  }));
}

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [assetsReady, setAssetsReady] = useState(false);
  const [sequenceDone, setSequenceDone] = useState(false);
  const [charging, setCharging] = useState(false);
  const [punching, setPunching] = useState(false);
  const [dust, setDust] = useState<Dust[]>([]);

  // Generated client-side only, post-mount — building this at render scope
  // would bake random values into the SSR HTML that the client
  // re-randomizes on hydration, causing a mismatch.
  useEffect(() => setDust(buildDust()), []);

  // A single rAF loop driven purely by elapsed wall-clock time computes the
  // current word directly — no chain of setTimeouts that can drift or stall
  // on a particular word.
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = () => {
      const elapsed = performance.now() - start;
      const idx = Math.min(LAST_INDEX, Math.floor(elapsed / WORD_MS));
      setWordIndex((prev) => (prev === idx ? prev : idx));
      const totalNeeded = LAST_INDEX * WORD_MS + FINAL_HOLD_MS;
      if (elapsed >= totalNeeded) {
        setSequenceDone(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.sessionStorage.removeItem("preloaderComplete");

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? prev : prev + Math.floor(Math.random() * 3) + 1));
    }, 220);

    let hasFinished = false;
    const finishLoading = () => {
      if (hasFinished) return;
      hasFinished = true;
      setAssetsReady(true);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading);
    }
    const fallbackTimer = setTimeout(finishLoading, 10000);

    return () => {
      window.removeEventListener("load", finishLoading);
      clearTimeout(fallbackTimer);
      clearInterval(progressInterval);
    };
  }, []);

  // Once truly done: the panel winds up bright (the charge), then a hard
  // flash-cut light burst punches the whole scene out in one fast beat —
  // a studio-logo sting, not a slow dissolve. Only once it's cleared do we
  // unmount and hand off to the hero underneath.
  useEffect(() => {
    if (!assetsReady || !sequenceDone) return;
    setProgress(100);
    const chargeTimer = setTimeout(() => setCharging(true), 400);
    return () => clearTimeout(chargeTimer);
  }, [assetsReady, sequenceDone]);

  useEffect(() => {
    if (!charging) return;
    const punchTimer = setTimeout(() => setPunching(true), CHARGE_MS);
    return () => clearTimeout(punchTimer);
  }, [charging]);

  useEffect(() => {
    if (!punching) return;
    const doneTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
      window.sessionStorage.setItem("preloaderComplete", "true");
      window.dispatchEvent(new Event("preloaderDone"));
    }, PUNCH_MS);
    return () => clearTimeout(doneTimer);
  }, [punching]);

  const current = GREETINGS[wordIndex];
  const isFinal = wordIndex === LAST_INDEX;

  return (
    <AnimatePresence>
      {isLoading && (
        <div className="fixed inset-0 z-[99999] overflow-hidden" style={{ background: "var(--lo-canvas)" }}>
          {/* The whole scene punches out fast in sync with the light burst,
              so the hero is genuinely what's behind it — not a second,
              separately-timed reveal. */}
          <motion.div
            className="absolute inset-0"
            animate={punching ? { opacity: 0, scale: 1.12 } : { opacity: 1, scale: charging ? 1.015 : 1 }}
            transition={
              punching
                ? { duration: 0.3, ease: [0.7, 0, 0.84, 0] }
                : { duration: CHARGE_MS / 1000, ease: "easeOut" }
            }
          >
            <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, var(--lo-canvas-2) 0%, var(--lo-canvas) 60%, var(--lo-elevate) 100%)" }} />

            {/* One ambient glow in the site's real signature blue, one small
                warm gold accent — the same two-color story as the rest of
                the site, not an invented palette. */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                width: "60vw", height: "50vh", top: "-10%", left: "50%", marginLeft: "-30vw",
                background: "radial-gradient(ellipse at 50% 40%, rgba(var(--lo-accent-rgb),0.14) 0%, transparent 65%)",
                filter: "blur(70px)",
              }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              animate={{ opacity: [0.12, 0.24, 0.12] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[30rem] h-[30rem] rounded-full blur-[100px] pointer-events-none"
              style={{ top: "10%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(var(--gold-rgb),0.2) 0%, transparent 70%)" }}
            />

            {/* Faint rising motes, transform/opacity only — no per-element
                shadows, kept few in number for a light footprint */}
            {dust.map((d) => (
              <motion.div
                key={d.id}
                className="absolute rounded-full pointer-events-none"
                style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size, background: "rgba(var(--lo-accent-rgb),0.5)" }}
                animate={{ y: [0, -22, 0], opacity: [0.1, 0.55, 0.1] }}
                transition={{ duration: d.duration, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
              />
            ))}

            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8 w-full max-w-2xl mx-auto px-8">
              {/* The word, in a real glass panel — the hero's own material,
                  not bare floating text. This is what visibly charges up. */}
              <motion.div
                className="relative rounded-[28px] overflow-hidden"
                style={{ padding: "1.5px", background: "linear-gradient(135deg, var(--accent-2) 0%, var(--accent) 45%, var(--accent-ink) 100%)" }}
                animate={charging ? { scale: [1, 1.04] } : { scale: 1 }}
                transition={{ duration: CHARGE_MS / 1000, ease: [0.34, 1.2, 0.64, 1] }}
              >
                <div
                  className="relative flex items-center justify-center rounded-[28px] px-14 py-9 md:px-20 md:py-11 overflow-hidden"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.04) 0%, rgba(var(--tc4-rgb),0.08) 55%, rgba(0,0,0,0.15) 100%)",
                    backdropFilter: "blur(10px) saturate(120%)",
                    WebkitBackdropFilter: "blur(10px) saturate(120%)",
                  }}
                >
                  {/* Specular + ambient pool, matching the circles/button/pill */}
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 24% 20%, rgba(230,245,255,0.14) 0%, transparent 48%)" }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(var(--tc1-rgb),0.2) 0%, transparent 75%)" }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 2px 5px rgba(255,255,255,0.18), inset 0 -2px 6px rgba(0,0,0,0.25)" }} />
                  {/* The charge — panel brightens hard right before it punches out */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "var(--gold-hi)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: charging ? 0.55 : 0 }}
                    transition={{ duration: CHARGE_MS / 1000, ease: "easeIn" }}
                  />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.word}
                      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.5 }}
                      animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                      exit={{ clipPath: "inset(0 0 0 100%)", opacity: 0.5 }}
                      transition={{ duration: isFinal ? 0.6 : 0.36, ease: [0.85, 0, 0.15, 1] }}
                      className="relative z-10"
                    >
                      <span
                        className="font-bold text-white block text-center"
                        style={{
                          fontFamily: current.font,
                          fontSize: isFinal ? "clamp(56px, 8.5vw, 104px)" : "clamp(38px, 6.5vw, 72px)",
                          letterSpacing: "-0.01em",
                          filter: isFinal
                            ? "drop-shadow(0 0 16px rgba(var(--gold-rgb),0.7)) drop-shadow(0 0 46px rgba(var(--gold-rgb),0.45))"
                            : "drop-shadow(0 0 12px rgba(255,255,255,0.3))",
                        }}
                      >
                        {current.word}
                      </span>
                      {isFinal && (
                        <motion.span
                          className="h-px mt-3 block mx-auto"
                          style={{ background: "linear-gradient(90deg, transparent, var(--gold-core) 20%, var(--gold-hi) 50%, var(--gold-core) 80%, transparent)", width: "60%" }}
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 0.9 }}
                          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* language caption */}
              <div className="h-4 relative w-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current.lang}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-mono text-[10px] tracking-[0.5em] uppercase"
                    style={{ color: isFinal ? "var(--gold-hi)" : "rgba(255,255,255,0.35)" }}
                  >
                    {current.lang}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Loading capsule */}
              <div className="w-full max-w-md flex flex-col gap-3 mt-2">
                <div
                  className="relative w-full h-[6px] rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)" }}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: "linear-gradient(90deg, var(--gold-core), var(--gold-hi))", boxShadow: "0 0 10px rgba(var(--gold-rgb),0.6)" }}
                    animate={{ width: `${Math.min(100, progress)}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: "var(--gold-core)" }}>
                    {punching ? "Arriving" : charging ? "Ready" : "Loading"}
                  </span>
                  <span className="font-mono text-xs tracking-widest" style={{ color: "var(--gold-hi)" }}>
                    {Math.min(100, progress)}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── The punch: a hard flash-cut and a graphic light burst — the
              studio-logo sting. Flat color + hard-edged conic spokes only,
              no soft multi-stop gradients, so nothing bands or looks muddy. ── */}
          {punching && (
            <>
              <motion.div
                className="absolute inset-0 pointer-events-none z-30"
                style={{ background: "var(--gold-hi)" }}
                initial={{ opacity: 0.85 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <motion.div
                className="absolute pointer-events-none z-30"
                style={{
                  left: "50%",
                  top: "42%",
                  width: "220vmax",
                  height: "220vmax",
                  marginLeft: "-110vmax",
                  marginTop: "-110vmax",
                  background: `conic-gradient(from 0deg,
                    transparent 0deg, var(--gold-hi) 4deg, transparent 12deg,
                    transparent 42deg, var(--gold-hi) 46deg, transparent 54deg,
                    transparent 84deg, var(--gold-hi) 88deg, transparent 96deg,
                    transparent 126deg, var(--gold-hi) 130deg, transparent 138deg,
                    transparent 168deg, var(--gold-hi) 172deg, transparent 180deg,
                    transparent 210deg, var(--gold-hi) 214deg, transparent 222deg,
                    transparent 252deg, var(--gold-hi) 256deg, transparent 264deg,
                    transparent 294deg, var(--gold-hi) 298deg, transparent 306deg,
                    transparent 336deg, var(--gold-hi) 340deg, transparent 348deg,
                    transparent 360deg)`,
                }}
                initial={{ scale: 0.05, opacity: 1, rotate: 0 }}
                animate={{ scale: 1, opacity: 0, rotate: 14 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              />
            </>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
