"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isGlowing, setIsGlowing] = useState(false)
  const { scrollY } = useScroll()
  const heroHeight = 600

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

  // Handle mouse movement for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x: x * 30, y: y * 30 })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  // Trigger glow effect after initial animation (exactly like HTML)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGlowing(true)
      setTimeout(() => setIsGlowing(false), 1000)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

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

      {/* Circle Container - Exact HTML Implementation */}
      <div
        className="circle-container absolute top-1/2 left-1/2 w-[130vmin] h-[130vmin] -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "130vmin",
          height: "130vmin",
          transform: "translate(-50%, -50%)",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Circle 1 - Largest (100%) */}
        <motion.div
          className="circle"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "radial-gradient(circle, #091119 55%, rgba(255, 255, 255, 0.25) 100%)",
            border: "0.1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: isGlowing ? "0 0 60px rgba(41, 141, 238, 0.8)" : "0 0 30px rgba(41, 141, 238, 0.35)",
            opacity: 0.8,
            willChange: "box-shadow, opacity",
            x: "-50%",
            y: "-50%",
            scale: 1,
            rotate: 0,
          }}
          initial={{
            x: "-150%",
            y: "-100%",
            scale: 0.8,
            rotate: 360,
            opacity: 0,
          }}
          animate={{
            x: "-50%",
            y: "-50%",
            scale: 1,
            rotate: 0,
            opacity: 1,
          }}
          transition={{
            duration: 5,
            ease: "easeOut",
            times: [0, 0.5, 1],
            scale: [0.8, 1.4, 1],
            opacity: [0, 0.5, 1],
          }}
          whileHover={{
            boxShadow: "0 0 80px rgba(41, 141, 238, 1)",
            transition: { duration: 0.2 },
          }}
        />
        {/* Circle 2 - Medium (80%) */}
        <motion.div
          className="circle"
          style={{
            width: "80%",
            height: "80%",
            borderRadius: "50%",
            background: "radial-gradient(circle, #091119 55%, rgba(255, 255, 255, 0.25) 100%)",
            border: "0.1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: isGlowing ? "0 0 60px rgba(41, 141, 238, 0.8)" : "0 0 30px rgba(41, 141, 238, 0.35)",
            opacity: 0.8,
            willChange: "box-shadow, opacity",
            x: "-50%",
            y: "-50%",
            scale: 1,
            rotate: 0,
          }}
          initial={{
            x: "120%",
            y: "-50%",
            scale: 0.8,
            rotate: 360,
            opacity: 0,
          }}
          animate={{
            x: "-50%",
            y: "-50%",
            scale: 1,
            rotate: 0,
            opacity: 1,
          }}
          transition={{
            duration: 5,
            ease: "easeOut",
            times: [0, 0.5, 1],
            scale: [0.8, 1.4, 1],
            opacity: [0, 0.5, 1],
          }}
          whileHover={{
            boxShadow: "0 0 80px rgba(41, 141, 238, 1)",
            transition: { duration: 0.2 },
          }}
        />
        {/* Circle 3 - Smallest (60%) with Profile Image */}
        <motion.div
          className="circle"
          style={{
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            background: "radial-gradient(circle, #091119 55%, rgba(255, 255, 255, 0.25) 100%)",
            border: "0.1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: isGlowing ? "0 0 60px rgba(41, 141, 238, 0.8)" : "0 0 30px rgba(41, 141, 238, 0.35)",
            opacity: 0.8,
            willChange: "box-shadow, opacity",
            x: "-50%",
            y: "-50%",
            scale: 1,
            rotate: 0,
          }}
          initial={{
            x: "50%",
            y: "150%",
            scale: 0.8,
            rotate: 360,
            opacity: 0,
          }}
          animate={{
            x: "-50%",
            y: "-50%",
            scale: 1,
            rotate: 0,
            opacity: 1,
          }}
          transition={{
            duration: 5,
            ease: "easeOut",
            times: [0, 0.5, 1],
            scale: [0.8, 1.4, 1],
            opacity: [0, 0.5, 1],
          }}
          whileHover={{
            boxShadow: "0 0 80px rgba(41, 141, 238, 1)",
            transition: { duration: 0.2 },
          }}
        >
          {/* Profile Image with 3D tilt */}
          <motion.div
            layoutId="profile-image"
            className="absolute z-30"
            style={{
              top: "50%",
              left: "50%",
              width: "32%",
              height: "32%",
              y: profileY,
              scale: profileScale,
              opacity: profileOpacity,
              rotateX: mousePosition.y,
              rotateY: -mousePosition.x,
              transform: `translate(-50%, -50%) translateY(-15px) rotateX(${mousePosition.y}deg) rotateY(${-mousePosition.x}deg)`,
              transition: "transform 0.3s ease, filter 0.3s ease",
              pointerEvents: "none",
            }}
            animate={{
              y: [-15, 15, -15],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-full h-full rounded-full overflow-hidden scale-75"
              animate={{
                filter: [
                  "drop-shadow(0 0 10px rgba(41, 141, 238, 0.6))",
                  "drop-shadow(0 0 20px rgba(41, 141, 238, 1))",
                  "drop-shadow(0 0 10px rgba(41, 141, 238, 0.6))",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Profile"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

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

        {/* Animated subtitle with staggered fade-in */}
        <motion.div
          className="flex flex-col items-center justify-center gap-2 mt-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {[
            "Full Stack Developer",
            "UI/UX Designer",
            "AI/ML Enthusiast",
          ].map((role, idx) => (
            <motion.span
              key={role}
              className="text-xl md:text-2xl text-gray-300 font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {role}
            </motion.span>
          ))}
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
