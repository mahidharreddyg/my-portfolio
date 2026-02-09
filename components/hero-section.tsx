"use client"

import React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useAnimation } from "framer-motion"
import LetsConnectModal from "./letsconnectmodal"
import ShinyText from "@/src/components/ShinyText/ShinyText"
import { HyperText } from "@/src/components/HyperText/HyperText"

// --- Static Hello Component ---
function StaticHello() {
  const [greeting, setGreeting] = useState("Hello")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 18) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")
  }, [])

  return (
    <div className="text-center space-y-2 mb-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-xl md:text-3xl font-medium tracking-tight text-white/80"
      >
        <span>
          {greeting}, I&apos;m
        </span>
      </motion.div>
    </div>
  )
}

// --- Updated Welcome Banner with Glassy Effect ---
function WelcomeBanner({ onThemeToggle }: { onThemeToggle?: () => void }) {
  const glowControls = useAnimation()

  useEffect(() => {
    const interval = setInterval(() => {
      glowControls.start({
        boxShadow: [
          "0 0 12px rgba(41,141,238,0.2), 0 0 20px rgba(59, 130, 246, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 0 8px rgba(41,141,238,0.05)",
          "0 0 16px rgba(41,141,238,0.25), 0 0 25px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 0 12px rgba(41,141,238,0.08)",
          "0 0 12px rgba(41,141,238,0.2), 0 0 20px rgba(59, 130, 246, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 0 8px rgba(41,141,238,0.05)",
        ],
        transition: {
          duration: 3,
          times: [0, 0.5, 1],
          ease: "easeInOut"
        },
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [glowControls])

  const handleHover = () => {
    glowControls.start({
      scale: 1.02,
      boxShadow: "0 0 20px rgba(41,141,238,0.3), 0 0 30px rgba(59, 130, 246, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 0 15px rgba(41,141,238,0.1)",
      transition: { duration: 0.3 }
    })
  }

  const handleHoverEnd = () => {
    glowControls.start({
      scale: 1,
      boxShadow: "0 0 12px rgba(41,141,238,0.2), 0 0 20px rgba(59, 130, 246, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 0 8px rgba(41,141,238,0.05)",
      transition: { duration: 0.3 }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-8"
    >
      <motion.button
        className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 py-[6px] px-5 text-xs md:text-sm font-medium opacity-90 backdrop-blur-xl transition-all duration-300 ease-in-out max-w-fit mx-auto"
        onClick={onThemeToggle}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
        animate={glowControls}
        style={{
          boxShadow: "0 0 12px rgba(41,141,238,0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full pointer-events-none" />
        <div className="relative z-10 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Welcome to My Creative World
          </span>
        </div>
      </motion.button>
    </motion.div>
  )
}

// --- 2025 Interactive Spotlight Void (Option D) ---
function EnhancedBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (spotlightRef.current) {
      spotlightRef.current.style.left = `${event.clientX - 400}px`
      spotlightRef.current.style.top = `${event.clientY - 400}px`
    }
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#020617]"
      onMouseMove={handleMouseMove}
    >
      {/* 1. Base Dark Background (clean) */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* 2. Ambient Glows (Static, very subtle) */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px]" />

      {/* 3. Interactive Spotlight (The "Flashlight") */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute w-[800px] h-[800px] rounded-full mix-blend-screen transition-opacity duration-200"
        style={{
          left: '-100%', // Start off-screen
          top: '-100%',
          background: 'radial-gradient(circle, rgba(29, 78, 216, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* 4. Noise Texture (The "Film" Look) */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
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
          fill: transparent;
          stroke: #ffffff;
          stroke-dashoffset: 25%;
          stroke-dasharray: 0 50%;
          stroke-width: 0.5;
          opacity: 0;
        }
        50% {
          fill: transparent;
          stroke: #ffffff;
          stroke-dashoffset: 0%;
          stroke-dasharray: 20% 0;
          stroke-width: 1.2;
          opacity: 1;
        }
        70% {
          fill: transparent;
          stroke: #ffffff;
          stroke-width: 1.2;
          opacity: 1;
        }
        100% {
          fill: url(#nameGradient);
          stroke: transparent;
          stroke-dashoffset: -25%;
          stroke-dasharray: 50% 0;
          stroke-width: 0;
          opacity: 1;
        }
      }
    `;
  }, []);

  useEffect(() => {
    if (!showName) return;

    const text = textRef.current;
    if (!text) return;

    text.style.opacity = "0";
    text.style.fill = "transparent";
    text.style.stroke = "transparent";

    const style = document.createElement("style");
    style.setAttribute("data-component", "hero-stroke-animation");
    style.textContent = generateKeyframes();
    document.head.appendChild(style);
    styleRef.current = style;

    setTimeout(() => {
      if (text) {
        text.style.animation = "stroke 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
      }
    }, 100);

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
      <svg viewBox="0 0 1320 120" className="w-[90vw] h-[100px] md:h-[130px] max-w-[1000px]">
        <defs>
          <linearGradient id="nameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <text
          ref={textRef}
          x="50%"
          y="50%"
          dy=".35em"
          textAnchor="middle"
          className="uppercase tracking-wider font-extrabold"
          style={{
            fontFamily: "var(--font-jakarta), sans-serif",
            fontSize: "clamp(32px, 6vw, 80px)",
            strokeLinejoin: "round",
            fill: "transparent",
            stroke: "transparent",
            opacity: 0,
            filter: "url(#glow)",
            textShadow: "0 0 30px rgba(255,255,255,0.1)"
          }}
        >
          MAHIDHAR REDDY G
        </text>
      </svg>
    </div>
  );
}

// --- Cinematic Roles Component with Center-Out HyperText Animation ---
function RolesDecryption({ showRoles }: { showRoles: boolean }) {
  const roles = [
    "Full Stack Developer",
    "UI/UX Designer",
    "AI/ML Enthusiast",
    "Creative Problem Solver",
    "Digital Innovator"
  ]

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [triggerAnimation, setTriggerAnimation] = useState(false)

  useEffect(() => {
    if (!showRoles) return

    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)

      // Trigger animation
      setTriggerAnimation(true)

      // Reset trigger after a short delay
      setTimeout(() => {
        setTriggerAnimation(false)
      }, 100)

    }, 6000)

    // Initial animation trigger
    setTimeout(() => {
      setTriggerAnimation(true)
      setTimeout(() => setTriggerAnimation(false), 100)
    }, 500)

    return () => clearInterval(interval)
  }, [showRoles, roles.length])

  if (!showRoles) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 5.0 }}
      className="text-center mt-2"
    >
      <div className="text-lg md:text-2xl font-light tracking-wide text-blue-200/80">
        <HyperText
          key={`role-${currentRoleIndex}`}
          triggerAnimation={triggerAnimation}
          animateOnHover={true}
          duration={2500}
          animationDirection="center-out"
          className="bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 bg-clip-text text-transparent"
          characterSet={["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")"]}
        >
          {roles[currentRoleIndex]}
        </HyperText>
      </div>
    </motion.div>
  )
}

// --- Glass Effect "Let's Connect" Button ---
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
        group relative inline-flex cursor-pointer items-center justify-between 
        overflow-hidden rounded-full border border-white/10 bg-white/5 
        py-[8px] pr-[8px] pl-6 text-base font-medium text-white/90
        backdrop-blur-xl transition-all duration-500 ease-out
        hover:bg-white/10 hover:border-white/20 hover:text-white
        md:py-3 md:pr-3 md:pl-8
      "
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <span className="z-10 mr-4 tracking-wide text-sm md:text-base">
        Let&apos;s Connect
      </span>

      <span className="
        relative z-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full 
        bg-white/10 border border-white/10 transition-all duration-300
        group-hover:bg-white group-hover:text-black
        md:h-10 md:w-10
      ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:-rotate-45"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </motion.button>
  )
}

// --- Main HeroSection Component ---
export default function HeroSection({ onThemeToggle }: { onThemeToggle?: () => void }) {
  const [allArrivedGlow, setAllArrivedGlow] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showRoles, setShowRoles] = useState(false)
  const circleContainerRef = useRef<HTMLDivElement>(null)
  const [showConnectModal, setShowConnectModal] = useState(false)

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

  const animationDuration = 4

  // ORIGINAL HOVER GLOW EFFECTS RESTORED
  const handleHover = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (controls: any) => {
      if (!allArrivedGlow) {
        controls.start({
          boxShadow: "0 0 80px rgba(41,141,238,0.9), 0 0 120px rgba(41,141,238,0.6)",
          transition: { duration: 0.2 },
        })
      }
    },
    [allArrivedGlow],
  )

  const handleHoverEnd = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (controls: any) => {
      if (!allArrivedGlow) {
        controls.start({
          boxShadow: "0 0 40px rgba(41,141,238,0.4), 0 0 60px rgba(41,141,238,0.2)",
          transition: { duration: 0.2 },
        })
      }
    },
    [allArrivedGlow],
  )

  useEffect(() => {
    const nameRevealTimer = setTimeout(() => {
      setShowName(true)
    }, 2000)

    const rolesRevealTimer = setTimeout(() => {
      setShowRoles(true)
    }, 4500)

    const glowTimer = setTimeout(() => {
      setAllArrivedGlow(true)
      const glowAnimation = {
        boxShadow: [
          "0 0 20px rgba(41,141,238,0.25), 0 0 40px rgba(41,141,238,0.15)",
          "0 0 35px rgba(41,141,238,0.5), 0 0 60px rgba(41,141,238,0.3)",
          "0 0 20px rgba(41,141,238,0.25), 0 0 40px rgba(41,141,238,0.15)",
        ],
        transition: { duration: 1.5, times: [0, 0.5, 1] },
      }
      Promise.all([
        glowControls1.start(glowAnimation),
        glowControls2.start(glowAnimation),
        glowControls3.start(glowAnimation),
      ]).then(() => {
        setAllArrivedGlow(false)
      })
    }, animationDuration * 1000)

    return () => {
      clearTimeout(nameRevealTimer)
      clearTimeout(rolesRevealTimer)
      clearTimeout(glowTimer)
    }
  }, [glowControls1, glowControls2, glowControls3, animationDuration])

  const openModal = () => setShowConnectModal(true)
  const closeModal = () => setShowConnectModal(false)

  return (
    <>
      <style jsx global>{`
        /* Removed Lily Script One import */
      `}</style>

      <section
        className="h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden"
        style={{
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <EnhancedBackground />

        {/* Corner Marquees */}
        <div className="absolute top-0 left-0 z-30 pointer-events-none">
          <div className="w-32 h-8 overflow-hidden transform -rotate-45 origin-bottom-left">
            <div className="flex whitespace-nowrap animate-marquee-left">
              <span className="text-blue-300 text-xs font-bold tracking-wider mx-2">PORTFOLIO</span>
              <span className="text-blue-300 text-xs font-bold tracking-wider mx-2">PORTFOLIO</span>
              <span className="text-blue-300 text-xs font-bold tracking-wider mx-2">PORTFOLIO</span>
              <span className="text-blue-300 text-xs font-bold tracking-wider mx-2">PORTFOLIO</span>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 z-30 pointer-events-none">
          <div className="w-32 h-8 overflow-hidden transform rotate-45 origin-bottom-right">
            <div className="flex whitespace-nowrap animate-marquee-right">
              <span className="text-blue-300 text-xs font-bold tracking-wider mx-2">DEVELOPER</span>
              <span className="text-blue-300 text-xs font-bold tracking-wider mx-2">DEVELOPER</span>
              <span className="text-blue-300 text-xs font-bold tracking-wider mx-2">DEVELOPER</span>
              <span className="text-blue-300 text-xs font-bold tracking-wider mx-2">DEVELOPER</span>
            </div>
          </div>
        </div>

        {/* Original Circles with Restored Hover Effects */}
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
                boxShadow: "0 0 20px rgba(41, 141, 238, 0.25)",
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
                  duration: animationDuration,
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
                  boxShadow: "0 0 20px rgba(41,141,238,0.25)",
                }}
              />
            </motion.div>
          ))}
        </div>

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
              <WelcomeBanner onThemeToggle={onThemeToggle} />

              <div className="mb-8">
                <StaticHello />
              </div>

              <NameRevealAnimation showName={showName} />

              <RolesDecryption showRoles={showRoles} />

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
