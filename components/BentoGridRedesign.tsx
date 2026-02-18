"use client";

import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

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
    >


      <GlassHighlight />

      {/* Background Marquee Layer */}
      <div className="absolute inset-0 flex flex-col justify-start pt-8 gap-3 z-0 pointer-events-none opacity-20 select-none mask-image-linear-to-b from-transparent via-black to-transparent">
        <div className="w-full overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity }}
            className="flex gap-3 w-max"
          >
            {[...Array(15)].map((_, i) => (
              <div key={`r1-${i}`} className="w-24 h-8 rounded-full border border-white/20 bg-white/5" />
            ))}
          </motion.div>
        </div>

        <div className="w-full overflow-hidden">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            className="flex gap-3 w-max"
          >
            {[...Array(15)].map((_, i) => (
              <div key={`r2-${i}`} className="w-24 h-8 rounded-full border border-white/20 bg-white/5" />
            ))}
          </motion.div>
        </div>

        <div className="w-full overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 16, ease: "linear", repeat: Infinity }}
            className="flex gap-3 w-max"
          >
            {[...Array(15)].map((_, i) => (
              <div key={`r3-${i}`} className="w-24 h-8 rounded-full border border-white/20 bg-white/5" />
            ))}
          </motion.div>
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

      <div className="relative z-10 mt-4">
        <h3 className="text-lg font-bold text-white leading-snug">
          Passionate About Next-Gen,<br />
          <span className="text-blue-500">Future-Forward Technologies.</span>
        </h3>
      </div>

      {/* Window Mockup */}
      <motion.div
        variants={{
          initial: { rotateX: 12, y: 60 },
          hover: { rotateX: 0, y: 0 }
        }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 20,
        }}
        className="relative z-10 w-64 bg-[#0a0a0a] rounded-t-xl border border-white/10 shadow-2xl p-4 pointer-events-none"
        style={{
          transformPerspective: 1000,
          transformOrigin: "bottom",
        }}
      >
        <div className="flex gap-2 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>

        <div className="space-y-4 p-2 bg-[#111] rounded-lg border border-white/5">
          <div className="w-1/2 h-2 bg-white/10 rounded-full" />
          <div className="space-y-2">
            <div className="text-[10px] text-gray-400 font-medium leading-relaxed">
              Purpose-Driven Design That Speaks<br />
              Performance-First Code That Delivers
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <div className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-[10px] border border-blue-500/30">
              Skills
            </div>
            <div className="px-3 py-1 rounded-full bg-white/5 text-gray-400 text-[10px] border border-white/10">
              Contact Me
            </div>
          </div>
        </div>
      </motion.div>
      {/* Interaction Hitbox Overlay - Placed last to ensure top z-index */}
      <div
        className="absolute inset-0 z-[100] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
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
