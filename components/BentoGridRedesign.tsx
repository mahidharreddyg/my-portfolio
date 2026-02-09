"use client";

import React from "react";
import { motion } from "framer-motion";
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

          {/* 5. Passionate Card (Middle Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="row-span-2 rounded-2xl p-8 relative overflow-hidden flex flex-col items-center text-center"
            style={glassStyle}
          >
            <GlassHighlight />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">
                Passionate About Next-Gen,<br />
                <span className="text-blue-500">Future-Forward Technologies.</span>
              </h3>

              {/* Decorative Rings */}
              <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none">
                <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[150%] h-[150%] border border-white/5 rounded-full" />
                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-[120%] border border-white/5 rounded-full" />
                <div className="absolute bottom-[0%] left-1/2 -translate-x-1/2 w-[90%] h-[90%] border border-white/5 rounded-full" />
              </div>

              {/* Laptop/Window Mockup */}
              <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-48 h-32 bg-[#1e1e1e] rounded-t-xl border border-white/20 shadow-2xl p-2 z-10">
                <div className="flex gap-1 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                  <div className="bg-blue-600/30 text-blue-300 text-[8px] px-2 py-0.5 rounded-full">Skills</div>
                  <div className="bg-white/10 text-gray-400 text-[8px] px-2 py-0.5 rounded-full">Contact Me</div>
                </div>
              </div>
            </div>
          </motion.div>

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


        {/* CENTRAL MR BADGE - Adjusted Position for 270px top row */}
        <div className="absolute left-[33.333%] top-[270px] -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 80px rgba(41,141,238,0.9), 0 0 120px rgba(41,141,238,0.6)",
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-32 h-32 rounded-full flex items-center justify-center relative cursor-pointer backdrop-blur-xl"
            style={{
              ...glassStyle,
              // Keep original MR button gradient as it might be specific
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.05) 100%)",
            }}
          >
            {/* Restored Inner Rings from Previous Design */}
            <div className="absolute inset-0 rounded-full border border-white/20" />
            <div className="absolute -inset-2 rounded-full border border-white/5 scale-110" />

            <span className="text-4xl font-black text-white tracking-tighter drop-shadow-lg select-none">MR</span>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
