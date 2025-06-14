"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useAnimation, AnimatePresence, type AnimationControls } from "framer-motion"
import SplitText from "../src/components/TextAnimations/SplitText/SplitText"
import LetsConnectModal from "./letsconnectmodal"
import Particles from "./Particles"

// --- Refined Futuristic Background Animation ---
function FuturisticBackgroundAnimation() {
  const interactiveRef = useRef<HTMLDivElement>(null)
  const [curX, setCurX] = useState(0)
  const [curY, setCurY] = useState(0)
  const [tgX, setTgX] = useState(0)
  const [tgY, setTgY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) return
      setCurX(curX + (tgX - curX) / 20)
      setCurY(curY + (tgY - curY) / 20)
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
    }
    move()
  }, [tgX, tgY, curX, curY])

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect()
      setTgX(event.clientX - rect.left)
      setTgY(event.clientY - rect.top)
    }
    setMousePosition({ x: event.clientX, y: event.clientY })
  }, [])

  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  }, [])

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #040B1A 0%, #0A1A2E 50%, #061325 100%)",
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1NiwgMTgyLCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      {/* Minimal circuit lines */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="opacity-30">
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0088FF" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Simple horizontal line */}
          <path
            d="M0,300 Q300,400 600,350 T1000,400 T1400,350"
            fill="none"
            stroke="url(#circuitGradient)"
            strokeWidth="1"
          />

          {/* Simple vertical line */}
          <path
            d="M300,0 Q350,200 300,400 T350,800 T300,1200"
            fill="none"
            stroke="url(#circuitGradient)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div
        className={
          "gradients-container h-full w-full blur-lg " + (isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]")
        }
      >
        <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-gradient-radial from-blue-600/30 to-transparent rounded-full mix-blend-multiply animate-first"></div>
        <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-gradient-radial from-cyan-600/25 to-transparent rounded-full mix-blend-multiply animate-second origin-[calc(50%-400px)]"></div>
        <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-gradient-radial from-purple-600/25 to-transparent rounded-full mix-blend-multiply animate-third origin-[calc(50%+400px)]"></div>
        <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-gradient-radial from-violet-600/20 to-transparent rounded-full mix-blend-multiply animate-fourth origin-[calc(50%-200px)]"></div>
        <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-gradient-radial from-emerald-600/25 to-transparent rounded-full mix-blend-multiply animate-fifth origin-[calc(50%-800px)_calc(50%+800px)]"></div>
        <div
          ref={interactiveRef}
          className="absolute w-full h-full -top-1/2 -left-1/2 bg-gradient-radial from-blue-500/20 to-transparent rounded-full mix-blend-multiply opacity-70"
        ></div>
      </div>

      {/* Single subtle scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent absolute animate-scanline"></div>
        </div>
      </div>

      {/* Subtle cursor glow effect */}
      <div
        className="pointer-events-none absolute w-[200px] h-[200px] rounded-full bg-gradient-radial from-cyan-500/20 to-transparent blur-xl"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          opacity: 0.3,
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.2s ease",
        }}
      ></div>
    </div>
  )
}

// --- Name Reveal Animation Component ---
function NameRevealAnimation({ showName }: { showName: boolean }) {
  const textRef = useRef<SVGTextElement>(null)
  const styleRef = useRef<HTMLStyleElement | null>(null)

  const generateKeyframes = useCallback(() => {
    return `
      @keyframes stroke {
        0% {
          fill: rgba(237, 245, 253, 0);
          stroke: #edf5fd;
          stroke-dashoffset: 25%;
          stroke-dasharray: 0 50%;
          stroke-width: 1;
        }
        70% {
          fill: rgba(237, 245, 253, 0);
          stroke: #edf5fd;
          stroke-dashoffset: 0%;
          stroke-dasharray: 50% 0;
        }
        80% {
          fill: rgba(237, 245, 253, 0);
          stroke: #edf5fd;
          stroke-width: 1;
        }
        100% {
          fill: #edf5fd;
          stroke: rgba(237, 245, 253, 0);
          stroke-dashoffset: -25%;
          stroke-dasharray: 50% 0;
          stroke-width: 0;
        }
      }
    `;
  }, []);

  useEffect(() => {
    if (!showName) return;
    
    const text = textRef.current;
    if (!text) return;

    const style = document.createElement("style");
    style.setAttribute("data-component", "hero-stroke-animation");
    style.textContent = generateKeyframes();
    document.head.appendChild(style);
    styleRef.current = style;

    text.style.animation = "stroke 4.5s ease-in-out forwards";

    return () => {
      if (styleRef.current && document.head.contains(styleRef.current)) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [generateKeyframes, showName]);

  if (!showName) return null;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 1320 120" className="w-[90vw] h-[120px] md:h-[150px] max-w-[1200px]">
        <text
          ref={textRef}
          x="50%"
          y="50%"
          dy=".35em"
          textAnchor="middle"
          className="uppercase fill-transparent stroke-[#edf5fd] stroke-1"
          style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: "clamp(40px, 8vw, 100px)",
            strokeLinejoin: "round"
          }}
        >
          MAHIDHAR REDDY G
        </text>
      </svg>
    </div>
  );
}

// --- Simple "Let's Connect" Button ---
interface LetsConnectButtonProps {
  onClick: () => void
}

function LetsConnectButton({ onClick }: LetsConnectButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        relative flex items-center justify-center gap-3 px-8 py-4 rounded-lg
        bg-white/[0.03] border border-white/[0.08]
        text-white font-medium text-lg
        backdrop-blur-xl
        transition-all duration-300 ease-out
        hover:bg-white/[0.06] hover:border-white/[0.12]
        hover:shadow-lg hover:shadow-blue-500/[0.05]
        hover:scale-105
      "
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="tracking-wide">Let's Connect</span>
      <motion.div
        className="w-5 h-5"
        animate={{
          x: isHovered ? 4 : 0,
          rotate: isHovered ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </motion.div>
    </motion.button>
  )
}

// --- Main HeroSection Component ---
export default function HeroSection() {
  const [allArrivedGlow, setAllArrivedGlow] = useState(false)
  const [showName, setShowName] = useState(false)
  const circleContainerRef = useRef<HTMLDivElement>(null)
  const [showConnectModal, setShowConnectModal] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const skills = ["Full Stack Developer", "UI/UX Designer", "AI/ML Enthusiast"]
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const currentSkill = skills[currentSkillIndex]

  useEffect(() => {
    if (!showName) return
    const interval = setInterval(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % skills.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [skills.length, showName])

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.03,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }),
  }

  const cursorVariants = {
    blinking: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1.4,
        repeat: Number.POSITIVE_INFINITY,
        times: [0, 0.5, 0.5, 1],
      },
    },
  }

  const glowControls1 = useAnimation()
  const glowControls2 = useAnimation()
  const glowControls3 = useAnimation()

  const circleConfigs = [
    {
      size: "130vmin",
      startX: "-150%",
      startY: "-100%",
      delay: 0,
      glowControls: glowControls1,
    },
    {
      size: "104vmin",
      startX: "120%",
      startY: "-50%",
      delay: 0,
      glowControls: glowControls2,
    },
    {
      size: "78vmin",
      startX: "50%",
      startY: "150%",
      delay: 0,
      glowControls: glowControls3,
    },
  ]

  // UPDATED: Circle animation duration reduced by 1 second (5s -> 4s)
  const animationDuration = 4

  const handleHover = useCallback(
    (controls: AnimationControls) => {
      if (!allArrivedGlow) {
        controls.start({
          boxShadow: "0 0 80px rgba(41,141,238,1)",
          transition: { duration: 0.2 },
        })
      }
    },
    [allArrivedGlow],
  )

  const handleHoverEnd = useCallback(
    (controls: AnimationControls) => {
      if (!allArrivedGlow) {
        controls.start({
          boxShadow: "0 0 30px rgba(41,141,238,0.35)",
          transition: { duration: 0.2 },
        })
      }
    },
    [allArrivedGlow],
  )

  // UPDATED: Synchronized timing - circle glow and name reveal both trigger at 4s
  useEffect(() => {
    const totalDelay = animationDuration * 1000 // 4 seconds
    const glowTimer = setTimeout(() => {
      setAllArrivedGlow(true)
      setShowName(true) // This now triggers exactly when circles glow
      const glowAnimation = {
        boxShadow: [
          "0 0 30px rgba(41,141,238,0.35)",
          "0 0 60px rgba(41,141,238,0.8)",
          "0 0 30px rgba(41,141,238,0.35)",
        ],
        transition: { duration: 1, times: [0, 0.5, 1] },
      }
      Promise.all([
        glowControls1.start(glowAnimation),
        glowControls2.start(glowAnimation),
        glowControls3.start(glowAnimation),
      ]).then(() => {
        setAllArrivedGlow(false)
      })
    }, totalDelay)

    return () => clearTimeout(glowTimer)
  }, [glowControls1, glowControls2, glowControls3, animationDuration])

  const openModal = () => setShowConnectModal(true)
  const closeModal = () => setShowConnectModal(false)

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
      `}</style>
      
      <section
        className="h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden"
        style={{
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <FuturisticBackgroundAnimation />

        <div
          ref={containerRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            minHeight: "100%",
            zIndex: 1,
            display: "block",
          }}
        >
          <Particles
            particleColors={["#00FFFF", "#80FFFF", "#1DE9B6", "#7FDBFF", "#3EF8F8"]}
            particleCount={150}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        <div
          className="absolute top-1/2 left-1/2 w-[130vmin] h-[130vmin] -translate-x-1/2 -translate-y-1/2 z-10"
          ref={circleContainerRef}
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          {circleConfigs.map((config, index) => (
            <motion.div
              key={index}
              className="absolute top-1/2 left-1/2 rounded-full"
              style={{
                width: config.size,
                height: config.size,
                background: "radial-gradient(circle, #091119 55%, rgba(255, 255, 255, 0.25) 100%)",
                border: "0.1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 0 30px rgba(41, 141, 238, 0.35)",
                willChange: "transform",
              }}
              initial={{
                x: config.startX,
                y: config.startY,
                scale: 0.8,
                rotate: 360,
                opacity: 0,
              }}
              animate={{
                x: [config.startX, "0%", "-50%"],
                y: [config.startY, "0%", "-50%"],
                scale: [0.8, 1.4, 1],
                rotate: [360, 180, 0],
                opacity: [0, 0.5, 0.8],
                transition: {
                  duration: animationDuration, // Now 4 seconds instead of 5
                  delay: config.delay,
                  times: [0, 0.5, 1],
                  ease: "easeOut",
                },
              }}
              onHoverStart={() => handleHover(config.glowControls)}
              onHoverEnd={() => handleHoverEnd(config.glowControls)}
            >
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                animate={config.glowControls}
                style={{
                  boxShadow: "0 0 30px rgba(41,141,238,0.35)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* UPDATED: Main content container with adjusted timing */}
        <motion.div
          className="text-center space-y-4 relative z-20"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2 }}
          style={{
            textRendering: "optimizeLegibility",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          {showName && (
            <>
              {/* UPDATED: "Hello! I'm" appears after the synchronized glow moment */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }} // Delay after name reveal starts
                >
                  <SplitText
                    text="Hello! I'm"
                    className="text-3xl md:text-4xl font-semibold mb-6 text-cyan-400 drop-shadow-lg"
                    splitType="words"
                    delay={120}
                    duration={1}
                    ease="power3.out"
                  />
                </motion.div>
              </div>
              
              <NameRevealAnimation showName={showName} />

              {/* UPDATED: Skill text appears after name stroke completes (4s + 4.5s = 8.5s) */}
              <div className="min-h-[60px] md:min-h-[80px] mt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSkillIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 4.5 }} // After name stroke completes
                    className="text-xl md:text-3xl font-mono text-cyan-400 drop-shadow-lg"
                    style={{
                      textRendering: "optimizeLegibility",
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale",
                    }}
                  >
                    {currentSkill.split("").map((char, index: number) => (
                      <motion.span
                        key={index}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        style={{
                          display: "inline-block",
                          willChange: "transform, opacity",
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    <motion.span variants={cursorVariants} animate="blinking" className="ml-1">
                      |
                    </motion.span>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* UPDATED: Tagline appears after skill text */}
              <motion.p
                className="text-xl md:text-2xl text-gray-300 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5.5, duration: 0.8 }}
                style={{
                  textRendering: "optimizeLegibility",
                  WebkitFontSmoothing: "antialiased",
                }}
              >
                Creating digital experiences that matter
              </motion.p>
              
              {/* UPDATED: Button appears last */}
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 6.5, duration: 0.8 }}
              >
                <LetsConnectButton onClick={openModal} />
              </motion.div>
            </>
          )}
        </motion.div>
      </section>

      <LetsConnectModal isOpen={showConnectModal} onClose={closeModal} />
    </>
  )
}
