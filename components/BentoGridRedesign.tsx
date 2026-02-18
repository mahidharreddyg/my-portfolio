"use client";

import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  SiC, SiPython, SiJavascript, SiTypescript, SiGo, SiSpring, SiSpringboot, SiNodedotjs, SiExpress,
  SiNextdotjs, SiReact, SiAngular, SiTailwindcss, SiPostgresql, SiMysql, SiMongodb,
  SiDocker, SiKubernetes, SiLinux, SiPandas, SiTensorflow, SiPytorch,
  SiScikitlearn, SiGit, SiGithub, SiJira, SiFigma, SiPostman, SiVercel,
  SiSpringsecurity, SiHtml5, SiCss3, SiRedux, SiGraphql, SiPrisma, SiRedis
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const glassStyle = {
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(16px) saturate(180%)',
  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.05)'
};

const GlassHighlight = () => (
  <>
    <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)'
    }} />
    <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl" style={{
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 100%)'
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
  { name: "Java", icon: FaJava, color: "#f89820" },
  { name: "Python", icon: SiPython, color: "#3776ab" },
  { name: "Go (Gin)", icon: SiGo, color: "#00add8" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "#000000" },
  { name: "C", icon: SiC, color: "#a8b9cc" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
];

const techRow2 = [
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "Angular", icon: SiAngular, color: "#dd0031" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "MySQL", icon: SiMysql, color: "#4479a1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
  { name: "Redis", icon: SiRedis, color: "#dc382d" },
];

const techRow3 = [
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326ce5" },
  { name: "Linux", icon: SiLinux, color: "#fcc624" },
  { name: "Pandas", icon: SiPandas, color: "#150458" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#ff6f00" },
  { name: "Git", icon: SiGit, color: "#f05032" },
  { name: "Figma", icon: SiFigma, color: "#f24e1e" },
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
      className="row-span-2 rounded-2xl p-8 pb-0 relative overflow-hidden flex flex-col items-center text-center justify-between cursor-pointer z-30"
      style={glassStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >


      <GlassHighlight />

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
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(1px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(1px) saturate(200%)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.05)'
                }}
              >
                <div
                  className="rounded bg-white/5 p-0.5 flex items-center justify-center shrink-0 border border-white/10"
                  style={{ width: "20px", height: "20px" }}
                >
                  <tech.icon style={{ color: tech.color }} className="w-3 h-3" />
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
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(1px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(1px) saturate(200%)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.05)'
                }}
              >
                <div
                  className="rounded bg-white/5 p-0.5 flex items-center justify-center shrink-0 border border-white/10"
                  style={{ width: "20px", height: "20px" }}
                >
                  <tech.icon style={{ color: tech.color }} className="w-3 h-3" />
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
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(1px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(1px) saturate(200%)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.05)'
                }}
              >
                <div
                  className="rounded bg-white/5 p-0.5 flex items-center justify-center shrink-0 border border-white/10"
                  style={{ width: "20px", height: "20px" }}
                >
                  <tech.icon style={{ color: tech.color }} className="w-3 h-3" />
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


      {/* 
  NOTE: For the Skills and Contact buttons to have independent hover effects,
  define these two components OUTSIDE your main component so they don't 
  inherit variants from the parent motion.div:
*/}

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
                backdropFilter: "blur(10px)",
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

            <div className="text-[11px] text-gray-400 font-medium leading-relaxed">
              Purpose-Driven Design That Speaks<br />
              Performance-First Code That Delivers
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

export function BentoGridRedesign() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-12 pt-24 md:pt-48">
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* LEFT COLUMN - Fixed Independent Heights */}
        <div className="flex flex-col gap-4">
          {/* 1. Profile Card (Top Left) - Fixed Height 270px */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-[270px] rounded-2xl p-6 relative overflow-hidden group flex flex-row items-center gap-4"
            style={glassStyle}
          >
            <GlassHighlight />
            <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg relative z-10">
              <Image src="/profile_pic.PNG" alt="Profile" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center relative z-10">
              <h3 className="text-white text-lg font-bold leading-tight">Mahidhar<br />Reddy Gaddam.</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400">🇮🇳 Bengaluru, India.</span>
              </div>
            </div>
          </motion.div>

          {/* 3. Large Vertical Left (Bottom Left) - Fixed Height 502px */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-[502px] rounded-2xl relative overflow-hidden"
            style={glassStyle}
          >
            <GlassHighlight />
            {/* Empty as requested */}
          </motion.div>
        </div>

        {/* RIGHT COLUMN - Independent Grid */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4 grid-rows-[70px_184px_296px_190px]">

          {/* 2. Top Bar (Top Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-2 rounded-2xl relative overflow-hidden"
            style={glassStyle}
          >
            <GlassHighlight />
            {/* Empty as requested */}
          </motion.div>

          {/* 4. Center Top (Middle Left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl relative overflow-hidden"
            style={glassStyle}
          >
            <GlassHighlight />
            {/* Empty as requested */}
          </motion.div>

          <PassionateCard />

          {/* 6. Center Bottom (Middle Left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl relative overflow-hidden"
            style={glassStyle}
          >
            <GlassHighlight />
            {/* Empty as requested */}
          </motion.div>

          {/* 7. Bottom Wide (Bottom) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-2 rounded-2xl relative overflow-hidden"
            style={glassStyle}
          >
            <GlassHighlight />
            {/* Empty as requested */}
          </motion.div>
        </div>


        {/* CENTRAL MR BADGE - Revamped with Micro-Interactions */}
        <div className="absolute left-[33.333%] top-[270px] -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center pointer-events-none">
          <motion.div
            className="relative flex items-center justify-center pointer-events-none"
            initial="initial"
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
              className="w-32 h-32 rounded-full flex items-center justify-center relative cursor-pointer backdrop-blur-xl z-10 overflow-hidden pointer-events-auto"
              style={{
                ...glassStyle,
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                boxShadow: "0 0 30px rgba(41,141,238,0.3), inset 0 0 20px rgba(255,255,255,0.05)",
              }}
            >
              {/* Rotating Ring 1 (Slow) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-white/10 border-t-white/40 border-l-transparent"
              />

              {/* Rotating Ring 2 (Counter-Rotate, Faster on Hover) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                className="absolute inset-2 rounded-full border border-white/5 border-b-white/20 border-r-transparent"
              />

              {/* Inner Scale Ring */}
              <motion.div
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.1 },
                }}
                className="absolute inset-4 rounded-full border border-white/10"
              />

              {/* Text Scale & Glow */}
              <motion.span
                variants={{
                  initial: { scale: 1, textShadow: "0 0 0px rgba(255,255,255,0)" },
                  hover: { scale: 1.15, textShadow: "0 0 10px rgba(255,255,255,0.5)" },
                }}
                className="text-4xl font-black text-white tracking-tighter drop-shadow-lg select-none z-20 relative"
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
