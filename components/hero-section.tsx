"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isGlowing, setIsGlowing] = useState(false)
  const { scrollY } = useScroll()
  const heroHeight = 600
  const imageRef = useRef<HTMLImageElement>(null)

  // Transform values for moving elements to navbar
  const profileY = useTransform(scrollY, [0, heroHeight * 0.7], [0, -300])
  const profileScale = useTransform(scrollY, [0, heroHeight * 0.7], [1, 0.4])
  const profileOpacity = useTransform(scrollY, [heroHeight * 0.6, heroHeight * 0.8], [1, 0])

  const nameY = useTransform(scrollY, [0, heroHeight * 0.7], [0, -280])
  const nameScale = useTransform(scrollY, [0, heroHeight * 0.7], [1, 0.6])
  const nameOpacity = useTransform(scrollY, [heroHeight * 0.6, heroHeight * 0.8], [1, 0])

  const titleY = useTransform(scrollY, [0, heroHeight * 0.7], [0, -260])
  const titleScale = useTransform(scrollY, [0, heroHeight * 0.7], [1, 0.7])
  const titleOpacity = useTransform(scrollY, [heroHeight * 0.6, heroHeight * 0.8], [1, 0])

  const descriptionOpacity = useTransform(scrollY, [0, heroHeight * 0.3], [1, 0])
  const arrowOpacity = useTransform(scrollY, [0, heroHeight * 0.2], [1, 0])

  const roles = [
    "Full Stack Developer",
    "UI/UX Designer",
    "AI/ML Enthusiast",
  ];
  const [currentRole, setCurrentRole] = useState(0);

  // Glow state for timed glow
  const [timedGlow, setTimedGlow] = useState(false);
  // Glow state for hover
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimedGlow(true);
      setTimeout(() => setTimedGlow(false), 1000);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // 3D tilt effect for image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x: x * 30, y: y * 30 });
    if (imageRef.current) {
      imageRef.current.style.transform = `translate(-50%, -50%) rotateX(${y * 30}deg) rotateY(${-x * 30}deg)`;
    }
  };
  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    if (imageRef.current) {
      imageRef.current.style.transform = 'translate(-50%, -50%)';
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
      {/* Previous Beautiful Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.1),transparent_50%)]" />
      </div>

      {/* Floating particles from previous background */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Hero Text - Exact timing from HTML */}
      <motion.div
        layoutId="name-title"
        className="text-center space-y-4 relative z-20"
        style={{
          y: nameY,
          scale: nameScale,
          opacity: nameOpacity,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
          whileHover={{
            backgroundImage: "linear-gradient(to right, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)",
            scale: 1.05,
          }}
          transition={{ duration: 0.3 }}
        >
          Mahidhar Reddy G
        </motion.h1>
        {/* Animated single role with fade/slide effect */}
        <motion.div
          key={roles[currentRole]}
          className="mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <span className="text-xl md:text-2xl font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {roles[currentRole]}
          </span>
        </motion.div>
      </motion.div>

      <motion.p
        className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed text-center relative z-20 mt-6"
        style={{ opacity: descriptionOpacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        Creative Web Developer & Designer crafting exceptional digital experiences
      </motion.p>

      <motion.div
        className="absolute bottom-10 left-0 right-0 flex justify-center z-20"
        style={{ opacity: arrowOpacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="p-2 rounded-full border border-gray-700/50 bg-black/20 backdrop-blur-sm"
          whileHover={{
            borderColor: "rgba(59, 130, 246, 0.5)",
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
          }}
        >
          <ChevronDown className="text-gray-400 h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
