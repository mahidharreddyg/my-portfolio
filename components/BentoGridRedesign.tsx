"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";


const glassStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.05)'
};

/* Puzzle-assemble entrance — every card slides in from its own edge with a
   slight rotate + scale, staggered so the grid clicks together like pieces. */
const puzzleIn = (delay: number, fromX = 0, fromY = 0, fromR = 0) => ({
  initial: { opacity: 0, scale: 0.86, x: fromX, y: fromY, rotate: fromR },
  whileInView: { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});



const GlassHighlight = () => (
  <>
    <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)',
      opacity: 0.8,
    }} />
    <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl" style={{
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, transparent 100%)'
    }} />
  </>
);

/* Shared card microinteraction chrome — learned from the profile & Passionate
   cards: hover spotlight glow, tech grid, ambient corner glow, HUD brackets,
   and a bottom shimmer line. Gives every bento card the same living feel. */
function CardChrome({ hovered, accent = "56,189,248" }: { hovered: boolean; accent?: string }) {
  return (
    <>
      {/* cursor spotlight (uses --mx/--my set by useCardTilt) */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 z-0"
        style={{ background: `radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(${accent},0.10) 0%, transparent 55%)`, opacity: hovered ? 1 : 0 }} />
      {/* tech grid */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
          backgroundSize: "22px 22px", opacity: hovered ? 0.7 : 0.15,
          maskImage: "radial-gradient(ellipse at center,black 15%,transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center,black 15%,transparent 80%)",
        }} />
      {/* ambient corner glows */}
      <div className="absolute pointer-events-none rounded-full transition-opacity duration-500" style={{ top: -42, left: -42, width: 170, height: 170, background: `radial-gradient(circle, rgba(${accent},0.16) 0%, transparent 70%)`, filter: "blur(30px)", opacity: hovered ? 1 : 0 }} />
      <div className="absolute pointer-events-none rounded-full transition-opacity duration-500" style={{ bottom: -30, right: -30, width: 130, height: 130, background: `radial-gradient(circle, rgba(${accent},0.10) 0%, transparent 70%)`, filter: "blur(22px)", opacity: hovered ? 1 : 0 }} />
      {/* HUD brackets */}
      <svg className="absolute pointer-events-none" style={{ top: 11, left: 11, zIndex: 5 }} width="14" height="14" viewBox="0 0 15 15" fill="none">
        <path d="M1 7.5 L1 1 L7.5 1" stroke={hovered ? `rgba(${accent},0.9)` : "rgba(255,255,255,0.14)"} strokeWidth="1.5" strokeLinecap="round" style={{ transition: "stroke .35s ease" }} />
      </svg>
      <svg className="absolute pointer-events-none" style={{ bottom: 11, right: 11, zIndex: 5 }} width="14" height="14" viewBox="0 0 15 15" fill="none">
        <path d="M7.5 14 L14 14 L14 7.5" stroke={hovered ? `rgba(${accent},0.9)` : "rgba(255,255,255,0.14)"} strokeWidth="1.5" strokeLinecap="round" style={{ transition: "stroke .35s ease" }} />
      </svg>
      {/* bottom shimmer */}
      <div className="absolute pointer-events-none rounded-full" style={{ bottom: 0, left: "15%", right: "15%", height: "1px", zIndex: 5, background: `linear-gradient(90deg, transparent, rgba(${accent},0.8), rgba(var(--tc7-rgb),0.6), transparent)`, opacity: hovered ? 1 : 0.1, transform: `scaleX(${hovered ? 1 : 0.4})`, transition: "opacity .5s ease, transform .5s cubic-bezier(0.22,1,0.36,1)", boxShadow: hovered ? `0 -2px 10px rgba(${accent},0.5)` : "none" }} />
    </>
  );
}

/* Generic 3D cursor tilt + hover state (rAF-throttled, no re-renders on move).
   Apply the returned ref/handlers to an inner wrapper so it never fights the
   card's framer-motion entrance transform on the outer element. */
function useCardTilt(max = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const raf = useRef<number | null>(null);
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const cx = e.clientX, cy = e.clientY;
    if (raf.current !== null) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = null;
      const r = el.getBoundingClientRect();
      const nx = (cx - r.left) / r.width, ny = (cy - r.top) / r.height;
      el.style.setProperty("--mx", `${nx * 100}%`);
      el.style.setProperty("--my", `${ny * 100}%`);
      el.style.transform = `perspective(900px) rotateY(${(nx - 0.5) * max}deg) rotateX(${(ny - 0.5) * -max}deg)`;
    });
  };
  const onMouseEnter = () => setHovered(true);
  const onMouseLeave = () => {
    if (raf.current !== null) { cancelAnimationFrame(raf.current); raf.current = null; }
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
    setHovered(false);
  };
  useEffect(() => () => { if (raf.current !== null) cancelAnimationFrame(raf.current); }, []);
  return { ref, hovered, onMouseMove, onMouseEnter, onMouseLeave };
}

const SkillsButton = () => {
  return (
    <motion.button
      whileHover={{
        y: -2,
        boxShadow: "0 0 24px rgba(var(--tc1-rgb),0.5), 0 0 8px rgba(var(--tc1-rgb),0.3)",
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative flex items-center gap-1.5 px-4 py-1.5 overflow-hidden cursor-pointer rounded-md"
      style={{
        background: "linear-gradient(135deg, rgba(var(--tc1-rgb),0.1) 0%, rgba(var(--tc1-rgb),0.04) 100%)",
        border: "1px solid rgba(var(--tc1-rgb),0.3)",
      }}
    >
      <span
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(var(--tc1-rgb),0.8), transparent)" }}
      />
      <span
        className="w-1 h-1 rounded-full bg-blue-400"
        style={{ boxShadow: "0 0 4px rgba(var(--tc1-rgb),0.9)" }}
      />
      <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-blue-300">
        Skills
      </span>
    </motion.button>
  );
};

const ContactButton = () => {
  return (
    <motion.button
      whileHover={{
        y: -2,
        boxShadow: "0 0 20px rgba(255,255,255,0.1), 0 0 6px rgba(255,255,255,0.08)",
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative flex items-center gap-1.5 px-4 py-1.5 overflow-hidden cursor-pointer rounded-md"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <span
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
      />
      <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className="text-gray-400">
        <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-gray-300">
        Contact Me
      </span>
    </motion.button>
  );
};
// Tech Stack Data
const techRow1 = [
  { name: "Java", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Go", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
  { name: "Spring Boot", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" }, // Express is strictly text/white usually, checking
  { name: "C", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
];

const techRow2 = [
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" }, // Next.js is black/white
  { name: "Angular", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  { name: "Tailwind CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "PostgreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Redis", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
];

const techRow3 = [
  { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Kubernetes", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Pandas", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "TensorFlow", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
];
const PassionateCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bento-card row-span-2 rounded-2xl p-8 pb-0 relative overflow-hidden flex flex-col items-center text-center justify-between cursor-pointer z-30"
      style={{ ...glassStyle }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >


      <GlassHighlight />


      {/* Default Dark State (Fades out on hover) */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none transition-opacity duration-500 rounded-b-2xl z-10"
        style={{
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)",
          opacity: isHovered ? 0 : 1,
        }}
      />

      {/* Hover Blue Glow State (Fades in on hover) - Reduced Intensity */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-2xl z-10"
        style={{
          background: "radial-gradient(600px circle at center, rgba(var(--tc6-rgb), 0.15), transparent 40%)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Hover Yellow Left Glow (Fades in on hover) */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-2xl z-10 overflow-hidden"
        style={{
          background: "linear-gradient(90deg, rgba(253, 224, 71, 0.1), transparent 50%)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Background Marquee Layer */}
      {/* Controls the vertical position of the marquee - Increase/Decrease pt value */}
      <div className=" absolute inset-0 flex flex-col justify-start pt-[85px] gap-4 z-[5] pointer-events-none select-none mask-image-linear-to-b from-transparent via-black to-transparent " >

        {/* Row 1: Languages & Backend */}
        <div className="w-full overflow-hidden">
          <div
            className="flex gap-1.5 w-max animate-marquee"
            style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
          >
            {[...techRow1, ...techRow1].map((tech, i) => (
              <div
                key={`r1-${i}`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md shrink-0 transition-all"
                style={glassStyle}
              >
                <div
                  className="rounded bg-white/5 p-0.5 flex items-center justify-center shrink-0 border border-white/10"
                  style={{ width: "20px", height: "20px" }}
                >
                  <img src={tech.img} alt={tech.name} className="w-3 h-3 object-contain opacity-90" loading="lazy" decoding="async" />
                </div>
                <span className="text-[10px] font-semibold text-white/90 whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Frontend & Database & Cloud */}
        <div className="w-full overflow-hidden">
          <div
            className="flex gap-1.5 w-max animate-marquee-reverse"
            style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
          >
            {[...techRow2, ...techRow2].map((tech, i) => (
              <div
                key={`r2-${i}`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md shrink-0 transition-all"
                style={glassStyle}
              >
                <div
                  className="rounded bg-white/5 p-0.5 flex items-center justify-center shrink-0 border border-white/10"
                  style={{ width: "20px", height: "20px" }}
                >
                  <img src={tech.img} alt={tech.name} className="w-3 h-3 object-contain opacity-90" loading="lazy" decoding="async" />
                </div>
                <span className="text-[10px] font-semibold text-white/90 whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: AI/ML & Tools */}
        <div className="w-full overflow-hidden">
          <div
            className="flex gap-1.5 w-max animate-marquee"
            style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
          >
            {[...techRow3, ...techRow3].map((tech, i) => (
              <div
                key={`r3-${i}`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md shrink-0 transition-all"
                style={glassStyle}
              >
                <div
                  className="rounded bg-white/5 p-0.5 flex items-center justify-center shrink-0 border border-white/10"
                  style={{ width: "20px", height: "20px" }}
                >
                  <img src={tech.img} alt={tech.name} className="w-3 h-3 object-contain opacity-90" loading="lazy" decoding="async" />
                </div>
                <span className="text-[10px] font-semibold text-white/90 whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Concentric Circles Background */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[180%] aspect-square rounded-full bg-blue-600 blur-[80px] opacity-20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[160%] aspect-square border-2 border-white/5 rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[140%] aspect-square border-2 border-white/10 rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[120%] aspect-square border-2 border-white/20 rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[100%] aspect-square border-2 border-white/30 rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[80%] aspect-square border-2 border-white/40 rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[60%] aspect-square border-2 border-white/50 rounded-full" />
        {/* Innermost Circle - Most Prominent */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[40%] aspect-square border-2 border-white/60 rounded-full bg-[#087CC4]/60 blur-[1px]" />
      </div>

      <div className="relative z-10 -mt-2">
        <h3 className="text-[1.2rem] font-bold font-malinton text-white leading-snug tracking-wide">
          Passionate About Next Gen,<br />
          <span className="text-[1.2rem] text-blue-500 whitespace-nowrap">
            Future Forward Technologies.
          </span>
        </h3>
      </div>


      {/* ─── Window Mockup (paste inside your JSX) ─── */}
      <motion.div
        variants={{
          initial: {
            rotateX: 12,
            y: 60,
            boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          },
          hover: {
            rotateX: 0,
            y: 0,
            boxShadow: "0 70px 160px rgba(0,0,0,0.9)",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          },
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
        }}
        className="relative z-10 w-80 overflow-hidden"
        style={{
          transformPerspective: 1000,
          transformOrigin: "bottom",
          willChange: "transform",
          borderTopLeftRadius: "14px",
          borderTopRightRadius: "14px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          background: "#0a0a0b",
        }}
      >

        {/* 🔥 Inner Blue Glow — visible only on hover, spreads upward from bottom */}
        <motion.div
          variants={{
            initial: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute pointer-events-none"
          style={{
            bottom: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "75%",
            background:
              "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(var(--tc1-rgb),0.45) 0%, rgba(var(--tc1-rgb),0.2) 35%, rgba(var(--tc1-rgb),0.06) 65%, transparent 85%)",
            filter: "blur(18px)",
            zIndex: 0,
          }}
        />

        {/* Title Bar */}
        <div
          className="flex items-center px-3 h-8 relative select-none"
          style={{
            background: "linear-gradient(180deg, #2c2c2e 0%, #1f1f21 100%)",
            borderBottom: "1px solid rgba(0,0,0,0.6)",
            zIndex: 10,
          }}
        >
          {/* Traffic Lights */}
          <div className="flex items-center gap-1.5 z-10">
            {["#ff5f57", "#febc2e", "#28c840"].map((color, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: color,
                  boxShadow:
                    "0 0 0 0.5px rgba(0,0,0,0.4), inset 0 0.5px 0 rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>

          {/* Safari Pill */}
          <motion.div
            variants={{
              initial: { width: 140 },
              hover: { width: 170 },
            }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="absolute left-1/2 -translate-x-1/2 h-[18px] rounded-full flex items-center justify-center gap-1.5 px-3 overflow-hidden"
            style={{
              background: "#000",
              border: "0.5px solid rgba(255,255,255,0.08)",
            }}
          >
            <motion.div
              variants={{
                initial: { opacity: 1 },
                hover: { opacity: 0 },
              }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 rounded-full"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "none",
              }}
            />

            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80 relative z-10"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>

            <span className="text-[10px] text-white/80 tracking-wide relative z-10">
              mahidharreddyg.in
            </span>
          </motion.div>
        </div>

        {/* Content */}
        <div
          className="p-6 relative"
          style={{
            background: "transparent",
            zIndex: 2,
          }}
        >
          <div
            className="space-y-5 p-4 rounded-lg text-center"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "0.5px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex justify-center">
              <div className="w-20 h-1 bg-white/20 rounded-full" />
            </div>

            <div className="text-[12px] text-gray-400 font-malinton leading-relaxed">
              Purpose Driven Design That Speaks<br />
              Performance First Code That Delivers
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-3 pt-2">
              <SkillsButton />
              <ContactButton />
            </div>
          </div>
        </div>

      </motion.div>



    </motion.div>
  );
};

function FoldedAvatar({
  hovered,
}: {
  hovered: boolean;
}) {
  const W = 95, H = 140; // Shrunk slightly to give name plenty of space inside constraints

  return (
    <div style={{ position: "relative", width: W, height: H, flexShrink: 0, zIndex: 2, perspective: 1200 }} className="flex items-center justify-center">

      {/* 1. Base Playing Card (Navbar Glassmorphism Texture) */}
      <motion.div
        className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl transition-shadow"
        initial={{ rotateZ: 0, x: 0, y: 0 }}
        animate={{
          rotateZ: hovered ? -8 : 0,
          x: hovered ? -20 : 0,
          y: hovered ? 8 : 0,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        style={{
          background: 'rgba(10, 15, 30, 0.4)', // Darker tech blue base
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          border: '1px solid rgba(var(--tc2-rgb), 0.3)', // Cyan tinted border
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(var(--tc2-rgb), 0.2),
            inset 0 -1px 0 rgba(var(--tc2-rgb), 0.05)
          `,
        }}
      >
        {/* Glass specular shine highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)
            `,
            opacity: 0.8,
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none bg-gradient-to-b from-white/5 to-transparent"
        />
        {/* Subtle grid pattern inside base card for tech feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--tc2-rgb),0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--tc2-rgb),0.08)_1px,transparent_1px)] bg-[size:10px_10px]" />

        {/* Tech Corner Accents on Base Card */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />

        {/* Card Suit / Emblem for base card */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white z-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
          </svg>
        </div>
      </motion.div>

      {/* 2. Top Playing Card (Profile Image) */}
      <motion.div
        className="absolute inset-0 rounded-lg overflow-hidden"
        initial={{ rotateZ: 0, x: 0, y: 0 }}
        animate={{
          rotateZ: hovered ? 4 : 0,
          x: hovered ? 10 : 0,
          y: hovered ? -6 : 0,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        style={{ border: '1px solid rgba(255, 255, 255, 0.15)', boxShadow: '0 15px 35px rgba(0,0,0,0.5)' }}
      >
        <Image
          src="/Mahidhar_Reddy_G_Card_Pic.png"
          alt="Mahidhar Reddy Gaddam"
          fill
          sizes="95px"
          className="object-cover"
          style={{
            objectPosition: "50% 10%",
            filter: hovered ? "contrast(1.08) saturate(1.1) brightness(1.05)" : "contrast(1.02) saturate(1.02) brightness(0.95)",
            transition: "filter 0.4s ease"
          }}
        />

        {/* Glossy gradient overlay to reinforce 'card' material feel */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none opacity-40 mix-blend-overlay" />

        {/* Interactive hover glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(circle at var(--mx, 50%) var(--my, 35%), rgba(255,255,255,0.15) 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
          mixBlendMode: "overlay",
        }} />
      </motion.div>

      {/* Floating Shadow Pool (adapts width based on card split) */}
      <div style={{
        position: "absolute", bottom: -24, left: "15%", right: "15%", height: 16,
        background: "rgba(var(--tc3-rgb),0.4)",
        filter: "blur(14px)", borderRadius: "50%",
        opacity: hovered ? 0.9 : 0.4,
        transform: `scaleX(${hovered ? 1.3 : 0.8})`,
        transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
        zIndex: 0,
      }} />

    </div>
  );
}
function GlitchName({ hovered }: { hovered: boolean }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    let offTimeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setGlitch(true);
      offTimeout = setTimeout(() => setGlitch(false), 320);
    }, 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(offTimeout);
    };
  }, []);

  const css = `
    .pgn {
      background: linear-gradient(125deg, #f1f5f9 0%, #93c5fd 40%, #3b82f6 80%, #1d4ed8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 22px;
      letter-spacing: 0.02em;
      line-height: 1.05;
      white-space: nowrap;
    }
    .pgn-last {
      background: linear-gradient(125deg, #3b82f6 0%, #60a5fa 40%, #38bdf8 80%, #0ea5e9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 22px;
      letter-spacing: 0.02em;
      line-height: 1.05;
      white-space: nowrap;
    }
    .pgn.hov, .pgn-last.hov {
      background: linear-gradient(125deg, #ffffff 0%, #bae6fd 30%, #38bdf8 65%, #0ea5e9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `;
  const clsFirst = `pgn font-malinton${hovered ? " hov" : ""}`;
  const clsLast = `pgn-last font-malinton${hovered ? " hov" : ""}`;

  return (
    <div className="relative select-none text-left">
      <style>{css}</style>

      {/* Top Tech Accent Line */}
      <div className="flex items-center gap-1.5 mb-2.5 w-max opacity-80">
        <div className="flex gap-[2px]">
          <div className="h-[2px] w-[2px] bg-blue-400 rounded-sm shadow-[0_0_8px_rgba(var(--tc1-rgb),0.9)]" />
          <div className="h-[2px] w-[2px] bg-blue-400/80 rounded-sm" />
          <div className="h-[2px] w-[2px] bg-blue-400/60 rounded-sm" />
        </div>
        <div className="h-[1px] w-12 bg-gradient-to-r from-blue-500/90 via-blue-400/40 to-transparent" />
      </div>

      <div className="relative">
        <div style={{ lineHeight: 1.05 }} className="whitespace-nowrap">
          <span className={clsFirst}>Mahidhar</span>
        </div>
        <div style={{ lineHeight: 1.05 }} className="flex items-baseline whitespace-nowrap">
          <span className={clsLast}>Reddy Gaddam</span>
          <span className="font-malinton text-white" style={{ fontSize: "22px", letterSpacing: "0.02em" }}>.</span>
        </div>

        {/* Glitch layers */}
        {glitch && (
          <>
            <div className="font-malinton flex flex-col whitespace-nowrap" aria-hidden style={{
              position: "absolute", inset: 0,
              fontSize: "22px", letterSpacing: "0.02em", lineHeight: 1.05,
              background: "linear-gradient(125deg, #22d3ee, #38bdf8)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              opacity: 0.75,
              clipPath: "polygon(0 10%, 100% 10%, 100% 38%, 0 38%)",
              transform: "translateX(-3px)", pointerEvents: "none",
            }}>
              <div>Mahidhar</div>
              <div>Reddy Gaddam.</div>
            </div>
            <div className="font-malinton flex flex-col whitespace-nowrap" aria-hidden style={{
              position: "absolute", inset: 0,
              fontSize: "22px", letterSpacing: "0.02em", lineHeight: 1.05,
              background: "linear-gradient(125deg, #0ea5e9, #0284c7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              opacity: 0.6,
              clipPath: "polygon(0 62%, 100% 62%, 100% 82%, 0 82%)",
              transform: "translateX(3px)", pointerEvents: "none",
            }}>
              <div>Mahidhar</div>
              <div>Reddy Gaddam.</div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Tech Accent Line */}
      <div className="flex items-center gap-1.5 mt-2 w-max opacity-80">
        <div className="h-[1px] w-24 bg-gradient-to-l from-blue-500/90 via-blue-400/40 to-transparent" />
        <div className="flex gap-[2px]">
          <div className="h-[2px] w-[2px] bg-blue-400/60 rounded-sm" />
          <div className="h-[2px] w-[2px] bg-blue-400/80 rounded-sm" />
          <div className="h-[2px] w-[2px] bg-blue-400 rounded-sm shadow-[0_0_8px_rgba(var(--tc1-rgb),0.9)]" />
        </div>
      </div>

      <div className="flex items-center gap-2.5 mt-4 text-[13px] font-mono tracking-widest uppercase">
        <span className="text-[20px] drop-shadow-md leading-none flex items-center justify-center">🇮🇳</span>
        <span className="font-semibold text-white/85 drop-shadow-sm flex items-center h-full">
          Bengaluru, India
        </span>
      </div>
    </div>
  );
}

function useProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const rafId = useRef<number | null>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      const r = el.getBoundingClientRect();
      const nx = (clientX - r.left) / r.width;
      const ny = (clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${nx * 100}%`);
      el.style.setProperty("--my", `${ny * 100}%`);
      el.style.transform =
        `perspective(900px) rotateY(${(nx - 0.5) * 14}deg) rotateX(${(ny - 0.5) * -14}deg) scale(1.025)`;
    });
  };

  const onMouseLeave = () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    if (cardRef.current)
      cardRef.current.style.transform =
        "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
    setHovered(false);
  };

  const onMouseEnter = () => setHovered(true);

  useEffect(() => () => {
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
  }, []);

  return { cardRef, hovered, onMouseMove, onMouseLeave, onMouseEnter };
}

/* ================================================================
   MEANINGFUL BENTO BOXES (redesigned to earn their place)
================================================================ */

// Shared micro-label — mono is reserved for real data / measurement.
const CardKicker = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 mb-4">
    <span className="h-1 w-1 rounded-full bg-sky-400" style={{ boxShadow: "0 0 6px rgba(var(--tc2-rgb),0.9)" }} />
    <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-white/35">{children}</span>
  </div>
);

const CAPABILITIES = [
  { t: "Full-Stack Engineering", d: "End-to-end products — data model to pixel.", icon: "M8 6 3 12l5 6M16 6l5 6-5 6" },
  { t: "Cloud & DevOps", d: "AWS-native infra, containers, CI/CD automation.", icon: "M17 18a4 4 0 0 0 .3-8A5.5 5.5 0 0 0 6.5 9 3.5 3.5 0 0 0 7 18z" },
  { t: "AI / ML Systems", d: "Agentic pipelines, RAG, applied machine learning.", icon: "M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M3 12h3m12 0h3M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1" },
  { t: "UI / UX Strategy", d: "Interfaces engineered with a designer's eye.", icon: "M12 3 3 8l9 5 9-5zM3 14l9 5 9-5" },
  { t: "Performance", d: "Scalable architectures tuned for speed.", icon: "M13 2 4 14h6l-1 8 10-12h-7z" },
];

// TALL LEFT — Capabilities (what he builds). Replaces the fake commit heatmap.
function CapabilitiesCard() {
  const { ref, hovered, onMouseMove, onMouseEnter, onMouseLeave } = useCardTilt(5);
  return (
    <motion.div {...puzzleIn(0.12, -70, 40, 3)} className="h-[502px] rounded-2xl relative" style={{ perspective: "1000px" }}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="bento-card w-full h-full rounded-2xl relative overflow-hidden group/cap"
        style={{ ...glassStyle, transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)" }}
      >
      <GlassHighlight />
      <CardChrome hovered={hovered} />
      <div className="absolute inset-0 p-6 flex flex-col z-10">
        <CardKicker>What I build</CardKicker>
        <h3 className="font-display text-[22px] leading-[1.1] font-bold text-white mb-5 tracking-tight">
          Capabilities
        </h3>
        <div className="flex flex-col divide-y divide-white/[0.06] -mx-1">
          {CAPABILITIES.map((c) => (
            <div key={c.t} className="group/row flex items-start gap-3.5 py-3 px-1 rounded-lg transition-colors duration-300 hover:bg-white/[0.02]">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-sky-300 transition-colors duration-300 group-hover/row:border-sky-400/40 group-hover/row:text-sky-200">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d={c.icon} />
                </svg>
              </span>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-white/90 leading-tight">{c.t}</div>
                <div className="text-[11.5px] text-white/40 leading-snug mt-0.5">{c.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </motion.div>
  );
}

// WIDE STRIP — Credentials (proof). Replaces the fake "Systems Online" uptime.
function CredentialsStrip() {
  const items = [
    { k: "Certified", v: "AWS ×2", s: "Cloud Practitioner · Solutions Architect" },
    { k: "Education", v: "B.Tech CS", s: "VIT · Final year" },
    { k: "Based in", v: "Bengaluru", s: "IST · UTC+5:30" },
  ];
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      {...puzzleIn(0.06, 0, -50, -2)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="bento-card col-span-2 rounded-2xl relative overflow-hidden"
      style={glassStyle}
    >
      <GlassHighlight />
      <CardChrome hovered={hov} />
      <div className="absolute inset-0 flex items-center divide-x divide-white/[0.07] z-10">
        {items.map((it) => (
          <div key={it.k} className="flex-1 px-5 md:px-7 min-w-0 group/cred">
            <div className="font-mono text-[8px] tracking-[0.28em] uppercase text-white/30 mb-1 transition-colors group-hover/cred:text-sky-300/60">{it.k}</div>
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="font-display text-base md:text-lg font-bold text-white shrink-0">{it.v}</span>
              <span className="hidden lg:inline text-[10px] text-white/35 truncate">{it.s}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// SMALL — Availability (when/where). Live IST readout replaces the generic clock.
function AvailabilityCard() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const update = () =>
      setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date()));
    update();
    const t = setInterval(update, 15000);
    return () => clearInterval(t);
  }, []);
  const { ref, hovered, onMouseMove, onMouseEnter, onMouseLeave } = useCardTilt(7);
  return (
    <motion.div {...puzzleIn(0.18, 50, -30, 3)} className="rounded-2xl relative" style={{ perspective: "800px" }}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="bento-card w-full h-full rounded-2xl relative overflow-hidden group/avail"
        style={{ ...glassStyle, transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <GlassHighlight />
        <CardChrome hovered={hovered} accent="52,211,153" />
        <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 8px rgba(52,211,153,0.8)" }} />
            </span>
            <span className="font-mono text-[9px] tracking-[0.24em] uppercase text-emerald-300/80">Available</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-3xl font-bold text-white tabular-nums tracking-tight">{time}</span>
              <span className="font-mono text-[10px] text-white/30">IST</span>
            </div>
            <p className="text-[11px] text-white/40 mt-1 leading-snug">Open to full-time &amp; freelance — remote-friendly.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const NOW_ITEMS = [
  "Building agentic AI & RAG systems",
  "Shipping cloud-native, containerized apps",
  "Sharpening large-scale system design",
];

// SMALL — Now (what's next). Replaces the % progress bars (craft-floor anti-pattern).
function NowCard() {
  const { ref, hovered, onMouseMove, onMouseEnter, onMouseLeave } = useCardTilt(7);
  return (
    <motion.div {...puzzleIn(0.24, 50, 50, -3)} className="rounded-2xl relative" style={{ perspective: "800px" }}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="bento-card w-full h-full rounded-2xl relative overflow-hidden group/now"
        style={{ ...glassStyle, transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <GlassHighlight />
        <CardChrome hovered={hovered} />
        <div className="absolute inset-0 p-5 flex flex-col z-10">
          <CardKicker>Currently</CardKicker>
          <h3 className="font-display text-lg font-bold text-white mb-4 tracking-tight">On my desk</h3>
          <div className="flex flex-col gap-3.5 flex-1">
            {NOW_ITEMS.map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/80" style={{ boxShadow: "0 0 6px rgba(var(--tc2-rgb),0.6)" }} />
                <span className="text-[12.5px] text-white/60 leading-snug">{t}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/[0.06]">
            <span className="font-mono text-[8px] tracking-[0.24em] uppercase text-white/25">Graduating 2026</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// WIDE — Contact CTA (call to action). Replaces the gradient-text "Let's Create".
function ContactCTA() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("mahidhar.reddy2003@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      {...puzzleIn(0.3, 0, 60, 2)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="bento-card col-span-2 rounded-2xl relative overflow-hidden group/cta"
      style={glassStyle}
    >
      <GlassHighlight />
      <CardChrome hovered={hov} />
      <div className="absolute inset-0 p-6 md:p-8 flex items-center justify-between gap-6 z-10">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.7)" }} />
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-emerald-300/80">Open to collaborate</span>
          </div>
          <h3 className="font-display text-2xl md:text-[28px] font-bold text-white leading-tight tracking-tight">
            Let&apos;s build something<span className="text-sky-400"> together.</span>
          </h3>
          <p className="text-[12.5px] md:text-sm text-white/40 mt-1.5 max-w-md leading-relaxed">
            Engineering roles, freelance work, and ambitious side projects — worldwide.
          </p>
        </div>
        <button
          onClick={copy}
          className="hidden md:inline-flex shrink-0 items-center gap-2.5 rounded-full pl-5 pr-2 py-2 border border-white/15 bg-white/[0.04] text-white text-sm font-medium transition-all duration-300 hover:border-sky-400/40 hover:bg-white/[0.07]"
        >
          <span className="tabular-nums">{copied ? "Copied to clipboard" : "mahidhar.reddy2003@gmail.com"}</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {copied ? <path d="M20 6 9 17l-5-5" /> : <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></>}
            </svg>
          </span>
        </button>
      </div>
    </motion.div>
  );
}

export function BentoGridRedesign() {
  const { cardRef, hovered, onMouseMove: profileMouseMove, onMouseLeave: profileMouseLeave, onMouseEnter: profileMouseEnter } = useProfileCard();
  const bentoRootRef = useRef<HTMLDivElement>(null);
  // The whole grid mounts at page load (before the user has scrolled here) —
  // only spin the MR circle's rings while the grid is actually on screen.
  const bentoInView = useInView(bentoRootRef, { margin: "200px 0px 200px 0px" });

  return (
    <div ref={bentoRootRef} className="w-full max-w-6xl mx-auto px-4 pb-12 pt-10 md:pt-24 group/bento">
      <style>{`
        @keyframes bento-pulse-glow {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        .bento-pulse-anim { animation: bento-pulse-glow 2s infinite ease-in-out; }
      `}</style>
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* LEFT COLUMN - Fixed Independent Heights */}
        <div className="flex flex-col gap-4">
          {/* 1. Profile Card (Top Left) - Fixed Height 270px */}
          <motion.div
            {...puzzleIn(0, -70, -40, -3)}
            className="h-[270px] rounded-2xl relative"
            style={{ perspective: "1000px" }}
          >
            <div
              ref={cardRef}
              onMouseMove={profileMouseMove}
              onMouseLeave={profileMouseLeave}
              onMouseEnter={profileMouseEnter}
              className="bento-card w-full h-full rounded-2xl relative overflow-hidden flex flex-row items-center gap-3 px-4 py-6 cursor-default"
              style={{
                ...glassStyle,
                border: hovered
                  ? "1px solid rgba(255, 255, 255, 0.15)"
                  : "1px solid rgba(255, 255, 255, 0.07)",
                boxShadow: hovered
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.1)"
                  : glassStyle.boxShadow,
                transition: "border 0.4s ease, box-shadow 0.4s ease, transform 0.16s cubic-bezier(0.23,1,0.32,1)",
              }}
            >
              <GlassHighlight />


              {/* Mouse spotlight over whole card */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at var(--mx, 50%) var(--my, 35%), rgba(var(--tc2-rgb),0.07) 0%, transparent 60%)`,
                  opacity: hovered ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  zIndex: 0,
                }}
              />

              {/* Tech-savvy grid background */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                  opacity: hovered ? 0.8 : 0.2,
                  maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
                }}
              />

              {/* Default Dark State (Fades out on hover) matching Box 5 */}
              <div
                className="absolute inset-x-0 bottom-0 h-full pointer-events-none transition-opacity duration-500 rounded-2xl z-0"
                style={{
                  background: "linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 80%)",
                  opacity: hovered ? 0 : 1,
                }}
              />

              {/* Hover Blue Glow State (Fades in on hover) - Reduced Intensity */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-700 z-10 ${hovered ? "bento-pulse-anim" : ""}`}
                style={{
                  background: "radial-gradient(circle at 50% 100%, rgba(var(--tc1-rgb), 0.15) 0%, transparent 60%)",
                  opacity: hovered ? 1 : 0,
                }}
              />

              {/* Hover Yellow Left Glow (Fades in on hover) */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-2xl z-0"
                style={{
                  background: "linear-gradient(90deg, rgba(253, 224, 71, 0.1) 0%, transparent 60%)",
                  opacity: hovered ? 1 : 0,
                }}
              />

              {/* Ambient glow — top left */}
              <div className="absolute pointer-events-none rounded-full transition-opacity duration-500" style={{
                top: -44, left: -44, width: 190, height: 190,
                background: "radial-gradient(circle, rgba(var(--tc3-rgb),0.18) 0%, transparent 70%)",
                filter: "blur(28px)", display: hovered ? "block" : "none",
              }} />

              {/* Ambient glow — bottom right */}
              <div className="absolute pointer-events-none rounded-full transition-opacity duration-500" style={{
                bottom: -30, right: -30, width: 130, height: 130,
                background: "radial-gradient(circle, rgba(var(--tc7-rgb),0.1) 0%, transparent 70%)",
                filter: "blur(20px)", display: hovered ? "block" : "none",
              }} />

              {/* HUD bracket — top left */}
              <svg className="absolute pointer-events-none" style={{ top: 12, left: 12, zIndex: 5 }}
                width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M1 7.5 L1 1 L7.5 1"
                  stroke={hovered ? "rgba(var(--tc2-rgb),0.85)" : "rgba(255,255,255,0.15)"}
                  strokeWidth="1.6" strokeLinecap="round"
                  style={{ transition: "stroke 0.35s ease" }}
                />
              </svg>

              {/* HUD bracket — bottom right */}
              <svg className="absolute pointer-events-none" style={{ bottom: 12, right: 12, zIndex: 5 }}
                width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 14 L14 14 L14 7.5"
                  stroke={hovered ? "rgba(var(--tc2-rgb),0.85)" : "rgba(255,255,255,0.15)"}
                  strokeWidth="1.6" strokeLinecap="round"
                  style={{ transition: "stroke 0.35s ease" }}
                />
              </svg>

              {/* Bottom shimmer */}
              <div className="absolute pointer-events-none rounded-full" style={{
                bottom: 0, left: "15%", right: "15%", height: "1px", zIndex: 5,
                background: "linear-gradient(90deg, transparent, rgba(var(--tc2-rgb),0.8), rgba(var(--tc7-rgb),0.6), transparent)",
                opacity: hovered ? 1 : 0.1,
                transform: `scaleX(${hovered ? 1 : 0.4})`,
                transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.23,1,0.32,1)",
                boxShadow: hovered ? "0 -2px 10px rgba(var(--tc2-rgb),0.5)" : "none"
              }} />

              {/* Avatar with folded corner */}
              <FoldedAvatar hovered={hovered} />

              {/* Name + location */}
              <div className="flex flex-col justify-center relative z-10 flex-1 text-left pl-1">
                <div className="font-mono text-[8px] tracking-wider uppercase font-semibold mb-2 flex flex-wrap items-center gap-1 w-max">
                  <span className="text-blue-500 font-bold">{'>'}</span>
                  <span className="text-blue-300 drop-shadow-[0_0_8px_rgba(var(--tc1-rgb),0.6)]">Software Engineer</span>
                  <span className="text-gray-500">{"W/"}</span>
                  <span className="text-gray-400">Design Eye</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="w-[1.5px] h-2.5 bg-blue-400 inline-block shadow-[0_0_5px_rgba(var(--tc1-rgb),0.8)] ml-0.5"
                  />
                </div>
                <GlitchName hovered={hovered} />
              </div>
            </div>
          </motion.div>

          <CapabilitiesCard />

        </div>

        {/* RIGHT COLUMN - Independent Grid */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4 grid-rows-[70px_184px_296px_190px]">

          <CredentialsStrip />


          <AvailabilityCard />


          <PassionateCard />

          <NowCard />


          <ContactCTA />

        </div>


        <div className="absolute left-[33.333%] top-[270px] -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center pointer-events-none">
          <motion.div
            className="relative flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            whileHover="hover"
          >
            {/* Pulsing Outer Glow (Behind) */}
            <motion.div
              variants={{
                initial: { opacity: 0.5, scale: 0.9 },
                hover: { opacity: 0.8, scale: 1.1 },
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 rounded-full blur-xl bg-blue-500/30 pointer-events-none"
            />

            {/* Main Glass Circle */}
            <motion.div
              variants={{
                initial: { scale: 1, rotate: 0 },
                hover: { scale: 1.1, rotate: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-32 h-32 rounded-full flex items-center justify-center relative cursor-pointer z-10 overflow-hidden pointer-events-auto shadow-2xl transition-all duration-300"
              style={{
                // True Liquid Glass Background - High Transparency, Minimal Blur
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.08),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(255, 255, 255, 0.05)
                `,
              }}
            >
              {/* Liquid Glass Highlight Layer */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `
                    linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.25) 0%, transparent 60%)
                  `,
                  opacity: 0.9,
                  boxShadow: "inset 0px 4px 20px rgba(255, 255, 255, 0.2), inset 0px -4px 20px rgba(0, 0, 0, 0.4)",
                  backdropFilter: "blur(8px)",
                }}
              />

              {/* Specular Reflection (Soft Glass Curve) */}
              <div
                className="absolute top-[5%] left-[10%] right-[10%] h-[40%] rounded-t-full pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
                }}
              />
              
              {/* Rotating Ring 1 (Slow) */}
              <motion.div
                animate={bentoInView ? { rotate: 360 } : undefined}
                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-white/10 border-t-white/40 border-l-transparent"
              />

              {/* Rotating Ring 2 (Counter-Rotate) */}
              <motion.div
                animate={bentoInView ? { rotate: -360 } : undefined}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                className="absolute inset-2 rounded-full border border-white/5 border-b-white/30 border-r-transparent"
              />

              {/* Inner Scale Ring */}
              <motion.div
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.1 },
                }}
                className="absolute inset-4 rounded-full border border-white/10 bg-white/[0.02]"
              />

              {/* Text Scale & Glow */}
              <motion.span
                variants={{
                  initial: { scale: 1, textShadow: "0 0 0px rgba(255,255,255,0)" },
                  hover: { scale: 1.15, textShadow: "0 0 15px rgba(255,255,255,0.7)" },
                }}
                className="text-4xl font-black text-white tracking-tighter drop-shadow-xl select-none z-20 relative mix-blend-screen"
              >
                MR
              </motion.span>
            </motion.div>

            {/* Ripple Effect Ring (Expands on Hover) */}
            <motion.div
              variants={{
                initial: { opacity: 0, scale: 1 },
                hover: {
                  opacity: [0, 0.4, 0],
                  scale: [1, 1.4, 1.5],
                  transition: { duration: 1.5, repeat: Infinity, ease: "easeOut" }
                },
              }}
              className="absolute inset-0 rounded-full border border-blue-400/50 pointer-events-none"
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
