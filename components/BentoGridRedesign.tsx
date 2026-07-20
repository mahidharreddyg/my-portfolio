"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";


const glassStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.05)'
};



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

const SkillsButton = () => {
  return (
    <motion.button
      whileHover={{
        y: -2,
        boxShadow: "0 0 24px rgba(59,130,246,0.5), 0 0 8px rgba(59,130,246,0.3)",
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative flex items-center gap-1.5 px-4 py-1.5 overflow-hidden cursor-pointer rounded-md"
      style={{
        background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.04) 100%)",
        border: "1px solid rgba(59,130,246,0.3)",
      }}
    >
      <span
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.8), transparent)" }}
      />
      <span
        className="w-1 h-1 rounded-full bg-blue-400"
        style={{ boxShadow: "0 0 4px rgba(59,130,246,0.9)" }}
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
          background: "radial-gradient(600px circle at center, rgba(41, 141, 238, 0.15), transparent 40%)",
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
              "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(59,130,246,0.45) 0%, rgba(59,130,246,0.2) 35%, rgba(59,130,246,0.06) 65%, transparent 85%)",
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
  mousePos,
}: {
  hovered: boolean;
  mousePos: { x: number; y: number };
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
          border: '1px solid rgba(56, 189, 248, 0.3)', // Cyan tinted border
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(56, 189, 248, 0.2),
            inset 0 -1px 0 rgba(56, 189, 248, 0.05)
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
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] bg-[size:10px_10px]" />

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
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
          mixBlendMode: "overlay",
        }} />
      </motion.div>

      {/* Floating Shadow Pool (adapts width based on card split) */}
      <div style={{
        position: "absolute", bottom: -24, left: "15%", right: "15%", height: 16,
        background: "rgba(37,99,235,0.4)",
        filter: "blur(14px)", borderRadius: "50%",
        opacity: hovered ? 0.9 : 0.4,
        transform: `scaleX(${hovered ? 1.3 : 0.8})`,
        transition: "all 0.5s cubic-bezier(0.34,1.3,0.64,1)",
        zIndex: 0,
      }} />

    </div>
  );
}
function GlitchName({ hovered }: { hovered: boolean }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 320);
    }, 5000);
    return () => clearInterval(t);
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
          <div className="h-[2px] w-[2px] bg-blue-400 rounded-sm shadow-[0_0_8px_rgba(59,130,246,0.9)]" />
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
          <div className="h-[2px] w-[2px] bg-blue-400 rounded-sm shadow-[0_0_8px_rgba(59,130,246,0.9)]" />
        </div>
      </div>

      <div className="flex items-center gap-2.5 mt-4 text-[13px] font-mono tracking-widest uppercase">
        <span className="text-[20px] drop-shadow-md leading-none flex items-center justify-center">🇮🇳</span>
        <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/60 drop-shadow-sm flex items-center h-full">
          Bengaluru, India
        </span>
      </div>
    </div>
  );
}

function useProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.35 });


  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    setMousePos({ x: nx, y: ny });
    if (cardRef.current)
      cardRef.current.style.transform =
        `perspective(900px) rotateY(${(nx - 0.5) * 14}deg) rotateX(${(ny - 0.5) * -14}deg) scale(1.025)`;
  };

  const onMouseLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform =
        "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
    setHovered(false);
  };

  const onMouseEnter = () => setHovered(true);

  return { cardRef, hovered, mousePos, onMouseMove, onMouseLeave, onMouseEnter };
}

export function BentoGridRedesign() {
  const { cardRef, hovered, mousePos, onMouseMove: profileMouseMove, onMouseLeave: profileMouseLeave, onMouseEnter: profileMouseEnter } = useProfileCard();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-12 pt-24 md:pt-48 group/bento">
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
            initial={{ opacity: 0, x: -100, y: -50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
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
                  background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(56,189,248,0.07) 0%, transparent 60%)`,
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
                  background: "radial-gradient(circle at 50% 100%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)",
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
                background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
                filter: "blur(28px)", display: hovered ? "block" : "none",
              }} />

              {/* Ambient glow — bottom right */}
              <div className="absolute pointer-events-none rounded-full transition-opacity duration-500" style={{
                bottom: -30, right: -30, width: 130, height: 130,
                background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
                filter: "blur(20px)", display: hovered ? "block" : "none",
              }} />

              {/* HUD bracket — top left */}
              <svg className="absolute pointer-events-none" style={{ top: 12, left: 12, zIndex: 5 }}
                width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M1 7.5 L1 1 L7.5 1"
                  stroke={hovered ? "rgba(56,189,248,0.85)" : "rgba(255,255,255,0.15)"}
                  strokeWidth="1.6" strokeLinecap="round"
                  style={{ transition: "stroke 0.35s ease" }}
                />
              </svg>

              {/* HUD bracket — bottom right */}
              <svg className="absolute pointer-events-none" style={{ bottom: 12, right: 12, zIndex: 5 }}
                width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 14 L14 14 L14 7.5"
                  stroke={hovered ? "rgba(56,189,248,0.85)" : "rgba(255,255,255,0.15)"}
                  strokeWidth="1.6" strokeLinecap="round"
                  style={{ transition: "stroke 0.35s ease" }}
                />
              </svg>

              {/* Bottom shimmer */}
              <div className="absolute pointer-events-none rounded-full" style={{
                bottom: 0, left: "15%", right: "15%", height: "1px", zIndex: 5,
                background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.8), rgba(14,165,233,0.6), transparent)",
                opacity: hovered ? 1 : 0.1,
                transform: `scaleX(${hovered ? 1 : 0.4})`,
                transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.23,1,0.32,1)",
                boxShadow: hovered ? "0 -2px 10px rgba(56,189,248,0.5)" : "none"
              }} />

              {/* Avatar with folded corner */}
              <FoldedAvatar hovered={hovered} mousePos={mousePos} />

              {/* Name + location */}
              <div className="flex flex-col justify-center relative z-10 flex-1 text-left pl-1">
                <div className="font-mono text-[8px] tracking-wider uppercase font-semibold mb-2 flex flex-wrap items-center gap-1 w-max">
                  <span className="text-blue-500 font-bold">{'>'}</span>
                  <span className="text-blue-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">Software Engineer</span>
                  <span className="text-gray-500">{"W/"}</span>
                  <span className="text-gray-400">Design Eye</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="w-[1.5px] h-2.5 bg-blue-400 inline-block shadow-[0_0_5px_rgba(59,130,246,0.8)] ml-0.5"
                  />
                </div>
                <GlitchName hovered={hovered} />
              </div>
            </div>
          </motion.div>

          {/* 3. Large Vertical Left (Bottom Left) — Live Code Activity */}
          <motion.div
            initial={{ opacity: 0, x: -100, y: 50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bento-card h-[502px] rounded-2xl relative overflow-hidden"
            style={glassStyle}
          >
            <GlassHighlight />

            {/* Terminal-style background */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }} />

            <div className="absolute inset-0 p-6 flex flex-col z-10">
              {/* Header */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400/80" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                  <div className="w-2 h-2 rounded-full bg-green-400/80" />
                </div>
                <span className="text-[9px] font-mono text-white/25 ml-2 tracking-wider">~/code/activity</span>
              </div>

              {/* Commit Heatmap */}
              <div className="mb-5">
                <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-3">Contribution Heatmap</div>
                <div className="grid grid-cols-12 gap-[3px]">
                  {Array.from({ length: 84 }, (_, i) => {
                    const intensity = Math.random();
                    const bg = intensity > 0.8 ? 'bg-blue-400' : intensity > 0.6 ? 'bg-blue-500/70' : intensity > 0.35 ? 'bg-blue-600/40' : 'bg-white/5';
                    return <div key={i} className={`w-full aspect-square rounded-[2px] ${bg}`} />;
                  })}
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3">
                  <div className="text-[9px] font-mono text-white/30 uppercase tracking-wider mb-1">Total Commits</div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-mono">2,400+</div>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3">
                  <div className="text-[9px] font-mono text-white/30 uppercase tracking-wider mb-1">Active Repos</div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 font-mono">15+</div>
                </div>
              </div>

              {/* Recent Commits */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Recent Activity</div>
                {[
                  { msg: 'feat: implement agentic AI pipeline', time: '2h ago', color: 'bg-green-400' },
                  { msg: 'refactor: optimize scroll perf', time: '5h ago', color: 'bg-blue-400' },
                  { msg: 'fix: resolve hydration mismatch', time: '1d ago', color: 'bg-yellow-400' },
                  { msg: 'chore: update dependencies', time: '2d ago', color: 'bg-purple-400' },
                ].map((commit, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.04] rounded-md px-3 py-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${commit.color} shrink-0`} style={{ boxShadow: '0 0 6px currentColor' }} />
                    <span className="text-[10px] font-mono text-white/60 truncate flex-1">{commit.msg}</span>
                    <span className="text-[9px] font-mono text-white/20 shrink-0">{commit.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN - Independent Grid */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4 grid-rows-[70px_184px_296px_190px]">

          {/* 2. Top Bar (Top Right) — Performance Pulse */}
          <motion.div
            initial={{ opacity: 0, x: 100, y: -50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bento-card col-span-2 rounded-2xl relative overflow-hidden group/topbar"
            style={glassStyle}
          >
            <GlassHighlight />

            {/* Animated line sweep on hover */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-0 group-hover/topbar:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="absolute inset-0 flex items-center justify-between px-6 md:px-8 z-10">
              <div className="flex items-center gap-3">
                {/* Live pulse metallic orb */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden"
                       style={{
                         background: "radial-gradient(circle at 30% 30%, #ffffff 0%, #e2e8f0 10%, #94a3b8 40%, #334155 80%, #0f172a 100%)",
                         boxShadow: "inset -2px -2px 6px rgba(0,0,0,0.5), inset 2px 2px 6px rgba(255,255,255,0.8), 0 4px 10px rgba(0,0,0,0.4)"
                       }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-900 mix-blend-overlay"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    {/* Sharp metallic specular */}
                    <div className="absolute top-1 left-1.5 w-3 h-2 bg-white/80 rounded-full blur-[1px] rotate-[-45deg]" />
                  </div>
                  <motion.div
                    className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border border-green-200"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ boxShadow: '0 0 8px rgba(34,197,94,0.8), inset 1px 1px 2px rgba(255,255,255,0.8)' }}
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Systems Online</h3>
                  <p className="text-[10px] text-white/30 font-mono tracking-wider">ALL SERVICES OPERATIONAL</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-1.5">
                  {[0.3, 0.6, 0.8, 0.5, 0.9, 0.7, 0.4, 0.85].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-full bg-gradient-to-t from-blue-500 to-cyan-400"
                      initial={{ height: 4 }}
                      animate={{ height: [4, h * 28, 4] }}
                      transition={{ duration: 1.5, delay: i * 0.12, repeat: Infinity, ease: "easeInOut" }}
                      style={{ opacity: 0.6 + h * 0.4 }}
                    />
                  ))}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-mono">99.9%</div>
                  <p className="text-[9px] text-white/20 font-mono tracking-wider">UPTIME</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. Center Top (Middle Left) — Glassmorphic Clock */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bento-card rounded-2xl relative overflow-hidden group/clock"
            style={glassStyle}
          >
            <GlassHighlight />

            <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
              {/* Clock face */}
              <div className="relative w-20 h-20 mx-auto">
                {/* Outer metallic ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                  style={{
                    background: "conic-gradient(from 0deg, #94a3b8, #e2e8f0, #94a3b8, #475569, #94a3b8, #e2e8f0, #94a3b8)",
                    padding: "2px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.4)"
                  }}
                >
                  {/* Clock body */}
                  <div className="w-full h-full rounded-full relative overflow-hidden"
                       style={{
                         background: "radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)",
                         boxShadow: "inset 0 4px 8px rgba(0,0,0,0.6)"
                       }}>
                    
                    {/* Hour markers */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
                      <div key={i} className="absolute w-[1.5px] h-1.5 bg-slate-400" style={{
                        top: '50%', left: '50%',
                        transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-28px)`,
                        height: i % 3 === 0 ? '5px' : '3px',
                        opacity: i % 3 === 0 ? 0.8 : 0.4,
                      }} />
                    ))}
                    
                    {/* Hour hand metallic */}
                    <motion.div
                      className="absolute w-[2px] h-5 rounded-full origin-bottom"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 43200, ease: "linear", repeat: Infinity }}
                      style={{ bottom: '50%', left: 'calc(50% - 1px)', background: "linear-gradient(to top, #64748b, #f8fafc)", boxShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                    />
                    
                    {/* Minute hand metallic */}
                    <motion.div
                      className="absolute w-[1.5px] h-7 rounded-full origin-bottom"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3600, ease: "linear", repeat: Infinity }}
                      style={{ bottom: '50%', left: 'calc(50% - 0.75px)', background: "linear-gradient(to top, #3b82f6, #93c5fd)", boxShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                    />
                    
                    {/* Center metallic dot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                         style={{
                           background: "radial-gradient(circle at 30% 30%, #ffffff 0%, #94a3b8 50%, #1e293b 100%)",
                           boxShadow: "0 2px 4px rgba(0,0,0,0.5)"
                         }} />
                  </div>
                </motion.div>
              </div>

              {/* Info */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ boxShadow: '0 0 6px rgba(34,197,94,0.6)' }}
                  />
                  <span className="text-[9px] font-mono text-green-400/70 uppercase tracking-widest">Available</span>
                </div>
                <p className="text-lg font-bold text-white font-mono">IST <span className="text-white/20 text-xs">UTC+5:30</span></p>
                <p className="text-[10px] text-white/25 font-mono mt-0.5">Remote Worldwide</p>
              </div>
            </div>
          </motion.div>

          <PassionateCard />

          {/* 6. Center Bottom (Middle Left) — Current Focus Areas */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: 50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bento-card rounded-2xl relative overflow-hidden group/focus"
            style={glassStyle}
          >
            <GlassHighlight />

            <div className="absolute inset-0 p-5 flex flex-col z-10">
              <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-3">Current Focus</div>

              <div className="flex flex-col gap-2.5 flex-1 justify-center">
                {[
                  { label: 'Agentic AI', pct: 92, from: '#3b82f6', to: '#06b6d4' },
                  { label: 'System Design', pct: 85, from: '#8b5cf6', to: '#a78bfa' },
                  { label: 'Voice AI', pct: 78, from: '#22c55e', to: '#34d399' },
                  { label: 'Web Perf', pct: 88, from: '#f59e0b', to: '#fbbf24' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-semibold text-white/70">{item.label}</span>
                      <span className="text-[9px] font-mono text-white/25">{item.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{
                          background: `linear-gradient(90deg, ${item.from}, ${item.to})`,
                          boxShadow: `0 0 8px ${item.from}40`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1.5 mt-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="text-[8px] font-mono text-white/15 uppercase tracking-wider">Always Learning</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* 7. Bottom Wide (Bottom) — Let's Create Together */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bento-card col-span-2 rounded-2xl relative overflow-hidden group/cta"
            style={glassStyle}
          >
            <GlassHighlight />

            {/* Hover glow sweep */}
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-0 group-hover/cta:opacity-100" style={{
              background: 'radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.12) 0%, transparent 60%)',
            }} />

            <div className="absolute inset-0 p-6 md:p-8 flex items-center justify-between z-10">
              <div className="flex-1">
                {/* Open to work badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ boxShadow: '0 0 6px rgba(34,197,94,0.6)' }}
                  />
                  <span className="text-[9px] font-mono text-green-400/80 uppercase tracking-widest">Open to Collaborate</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-400">Let's Create</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"> Together</span>
                </h3>
                <p className="text-xs md:text-sm text-white/30 max-w-sm leading-relaxed">Open for engineering roles, freelance opportunities, and exciting collaborations worldwide.</p>
              </div>

              {/* Animated orbiting element */}
              <div className="w-24 h-24 md:w-28 md:h-28 relative hidden md:flex items-center justify-center shrink-0">
                {/* Orbiting rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-white/[0.06]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400/60" style={{ boxShadow: '0 0 8px rgba(59,130,246,0.4)' }} />
                </motion.div>
                <motion.div
                  className="absolute inset-3 rounded-full border border-blue-500/15"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                >
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/60" style={{ boxShadow: '0 0 6px rgba(6,182,212,0.4)' }} />
                </motion.div>

                {/* Center metallic icon */}
                <div className="w-12 h-12 rounded-full relative overflow-hidden flex items-center justify-center"
                     style={{
                       background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #cbd5e1 15%, #64748b 50%, #1e293b 90%)",
                       boxShadow: "inset -2px -2px 6px rgba(0,0,0,0.6), inset 2px 2px 6px rgba(255,255,255,0.8), 0 5px 15px rgba(0,0,0,0.5)"
                     }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-900 mix-blend-overlay">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {/* Sharp metallic specular */}
                  <div className="absolute top-1.5 left-2.5 w-4 h-2 bg-white/90 rounded-full blur-[1px] rotate-[-45deg]" />
                </div>
              </div>
            </div>
          </motion.div>
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
                animate={{ rotate: 360 }}
                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-white/10 border-t-white/40 border-l-transparent"
              />

              {/* Rotating Ring 2 (Counter-Rotate) */}
              <motion.div
                animate={{ rotate: -360 }}
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
