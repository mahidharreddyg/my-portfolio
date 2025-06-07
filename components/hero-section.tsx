"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useAnimation, AnimationControls } from "framer-motion"
import Image from "next/image"
import Particles from "@tsparticles/react"
import { loadFull } from "tsparticles"
import type { Engine } from "@tsparticles/engine"

interface CircleConfig {
  size: string;
  startX: string;
  startY: string;
  delay: number;
  glowControls: AnimationControls;
}

function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      particlesInit={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        particles: {
          number: { value: 60, density: { enable: true } },
          color: { value: ["#3b82f6", "#06b6d4", "#a855f7"] },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: { min: 1, max: 3 } },
          move: { enable: true, speed: 0.6, direction: "none", outModes: "out" },
        },
        interactivity: {
          events: {
            onHover: { enable: false },
            onClick: { enable: false },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

export default function HeroSection() {
  const [allArrivedGlow, setAllArrivedGlow] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const circleContainerRef = useRef<HTMLDivElement>(null)

  // Create separate animation controls for each circle
  const glowControls1 = useAnimation()
  const glowControls2 = useAnimation()
  const glowControls3 = useAnimation()

  // Circle configurations, each with its own glowControls
  const circleConfigs: CircleConfig[] = [
    {
      size: '130vmin',
      startX: '-150%',
      startY: '-100%',
      delay: 0,
      glowControls: glowControls1
    },
    {
      size: '104vmin',
      startX: '120%',
      startY: '-50%',
      delay: 0,
      glowControls: glowControls2
    },
    {
      size: '78vmin',
      startX: '50%',
      startY: '150%',
      delay: 0,
      glowControls: glowControls3
    }
  ]

  const animationDuration = 5 // seconds

  // Individual hover handlers
  const handleHover = useCallback((controls: AnimationControls) => {
    if (!allArrivedGlow) {
      controls.start({
        boxShadow: '0 0 80px rgba(41,141,238,1)',
        transition: { duration: 0.2 }
      })
    }
  }, [allArrivedGlow])

  const handleHoverEnd = useCallback((controls: AnimationControls) => {
    if (!allArrivedGlow) {
      controls.start({
        boxShadow: '0 0 30px rgba(41,141,238,0.35)',
        transition: { duration: 0.2 }
      })
    }
  }, [allArrivedGlow])

  // Synchronized glow effect after all circles arrive
  useEffect(() => {
    const totalDelay = animationDuration * 1000
    const glowTimer = setTimeout(() => {
      setAllArrivedGlow(true)
      const glowAnimation = {
        boxShadow: [
          '0 0 30px rgba(41,141,238,0.35)',
          '0 0 60px rgba(41,141,238,0.8)',
          '0 0 30px rgba(41,141,238,0.35)'
        ],
        transition: { duration: 1, times: [0, 0.5, 1] }
      }
      // Animate all circles' glows
      Promise.all([
        glowControls1.start(glowAnimation),
        glowControls2.start(glowAnimation),
        glowControls3.start(glowAnimation)
      ]).then(() => {
        setAllArrivedGlow(false)
      })
    }, totalDelay)

    return () => clearTimeout(glowTimer)
  }, [glowControls1, glowControls2, glowControls3])

  return (
    <section className="h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
      {/* Subtle Layered Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.1),transparent_50%)]" />
      </div>
      {/* Particle Effect */}
      <ParticleBackground />

      {/* Circles Container */}
      <div 
        className="absolute top-1/2 left-1/2 w-[130vmin] h-[130vmin] -translate-x-1/2 -translate-y-1/2 z-10"
        ref={circleContainerRef}
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        {circleConfigs.map((config, index) => (
          <motion.div
            key={index}
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: config.size,
              height: config.size,
              background: 'radial-gradient(circle, #091119 55%, rgba(255, 255, 255, 0.25) 100%)',
              border: '0.1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 0 30px rgba(41, 141, 238, 0.35)'
            }}
            initial={{
              x: config.startX,
              y: config.startY,
              scale: 0.8,
              rotate: 360,
              opacity: 0
            }}
            animate={{
              x: [config.startX, "0%", "-50%"],
              y: [config.startY, "0%", "-50%"],
              scale: [0.8, 1.4, 1],
              rotate: [360, 180, 0],
              opacity: [0, 0.5, 0.8],
              transition: {
                duration: animationDuration,
                delay: config.delay,
                times: [0, 0.5, 1],
                ease: "easeOut"
              }
            }}
            onHoverStart={() => handleHover(config.glowControls)}
            onHoverEnd={() => handleHoverEnd(config.glowControls)}
          >
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              animate={config.glowControls}
              style={{
                boxShadow: '0 0 30px rgba(41,141,238,0.35)'
              }}
            />
          </motion.div>
        ))}

        {/* Profile Image with floating animation */}
        <motion.div
          className="absolute top-1/2 left-1/2 z-30 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1,
            scale: 0.8,
            y: ['-50%', 'calc(-50% - 15px)', '-50%'],
            rotate: [-3, 3, -3],
            transition: {
              opacity: { duration: 1, delay: 2 },
              scale: { duration: 1, delay: 2 },
              y: { 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              },
              rotate: { 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }
          }}
          whileHover={{
            scale: 0.84,
            rotate: 0,
            transition: { duration: 0.3 }
          }}
        >
          <Image
            ref={imageRef}
            src="/mahi_memoji.png"
            alt="Profile"
            width={200}
            height={200}
            className="rounded-full"
            style={{
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 0 10px rgba(41,141,238,0.6))'
            }}
          />
          
          {/* Animated glow effect for image */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{
              filter: [
                'drop-shadow(0 0 10px rgba(41,141,238,0.6))',
                'drop-shadow(0 0 20px rgba(41,141,238,1))',
                'drop-shadow(0 0 10px rgba(41,141,238,0.6))'
              ],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        </motion.div>
      </div>

      {/* Hero text content */}
      <motion.div
        className="text-center space-y-4 relative z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 2 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white"
          whileHover={{ scale: 1.05 }}
        >
          Welcome to My Portfolio
        </motion.h1>
        
        <motion.p className="text-xl md:text-2xl text-gray-300">
          Creative Web Developer & Designer
        </motion.p>
      </motion.div>
    </section>
  )
}
