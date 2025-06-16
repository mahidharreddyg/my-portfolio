"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useAnimation, AnimatePresence, type AnimationControls } from "framer-motion"
import SplitText from "../src/components/TextAnimations/SplitText/SplitText"
import LetsConnectModal from "./letsconnectmodal"

// --- Welcome Banner Component ---
function WelcomeBanner() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="mb-8"
    >
      <a 
        className="group relative inline-flex cursor-pointer items-center rounded-full border border-white/10 bg-white/5 text-sm backdrop-blur-xl transition-all duration-500 ease-out lg:text-base hover:bg-white/8 hover:border-white/20 hover:scale-105 overflow-hidden max-w-fit mx-auto px-4 py-2" 
        href="/portfolio"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Shimmer effect overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-transform duration-1000 ${
            isHovered ? 'translate-x-full' : '-translate-x-full'
          }`}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        
        {/* Metallic gradient text */}
        <span 
          className="relative z-10 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent font-medium tracking-wide"
          style={{
            backgroundSize: '200% 100%',
            animation: isHovered ? 'metallicShine 2s ease-in-out' : 'none',
            textShadow: '0 0 10px rgba(251, 191, 36, 0.3), 0 0 20px rgba(251, 191, 36, 0.2)',
          }}
        >
          Welcome to my creative universe
        </span>
        
        {/* Metallic arrow */}
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
          className="ml-2 transition-all duration-300 ease-in-out group-hover:translate-x-1 text-amber-300"
          style={{
            filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))',
          }}
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </a>
    </motion.div>
  )
}

// --- Enhanced Parallax Stars Background ---
function ParallaxStarsBackground() {
  const interactiveRef = useRef<HTMLDivElement>(null)
  const [curX, setCurX] = useState(0)
  const [curY, setCurY] = useState(0)
  const [tgX, setTgX] = useState(0)
  const [tgY, setTgY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Fix for hydration error - generate stars only on client
  const [stars, setStars] = useState({
    small: '',
    medium: '',
    large: ''
  })
  const [isClient, setIsClient] = useState(false)

  // Generate stars only on client side
  useEffect(() => {
    setIsClient(true)
    const generateStars = (count: number) => {
      return Array.from({ length: count }, () => 
        `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`
      ).join(', ');
    };

    setStars({
      small: generateStars(700),
      medium: generateStars(200),
      large: generateStars(100)
    })
  }, [])

  // Fix for infinite loop - use useRef for animation frame
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) return
      
      setCurX(prev => {
        const newX = prev + (tgX - prev) / 20
        setCurY(prevY => {
          const newY = prevY + (tgY - prevY) / 20
          if (interactiveRef.current) {
            interactiveRef.current.style.transform = `translate(${Math.round(newX)}px, ${Math.round(newY)}px)`
          }
          return newY
        })
        return newX
      })
      
      animationFrameRef.current = requestAnimationFrame(move)
    }
    
    if (tgX !== 0 || tgY !== 0) {
      animationFrameRef.current = requestAnimationFrame(move)
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [tgX, tgY])

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

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css?family=Lato:300,400,700';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // Don't render stars until client-side
  if (!isClient) {
    return (
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at bottom, #081626 0%, #041018 100%),
            radial-gradient(ellipse at top left, rgba(8, 22, 38, 0.8) 0%, transparent 60%),
            radial-gradient(ellipse at top right, rgba(6, 18, 32, 0.7) 0%, transparent 60%),
            radial-gradient(ellipse at bottom left, rgba(41, 141, 238, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(0, 255, 255, 0.04) 0%, transparent 50%)
          `,
        }}
      />
    )
  }

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes animStar {
          from { 
            transform: translateY(0px);
          }
          to { 
            transform: translateY(-2000px);
          }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes metallicShine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes glassShimmer {
          0%, 100% {
            background-position: -200% 0;
          }
          50% {
            background-position: 200% 0;
          }
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }
        
        #stars:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: ${stars.small};
        }
        
        #stars2:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: ${stars.medium};
        }
        
        #stars3:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: ${stars.large};
        }
        
        .stars-layer {
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
      
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at bottom, #081626 0%, #041018 100%),
            radial-gradient(ellipse at top left, rgba(8, 22, 38, 0.8) 0%, transparent 60%),
            radial-gradient(ellipse at top right, rgba(6, 18, 32, 0.7) 0%, transparent 60%),
            radial-gradient(ellipse at bottom left, rgba(41, 141, 238, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(0, 255, 255, 0.04) 0%, transparent 50%)
          `,
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Parallax Stars Layers */}
        <div 
          id="stars" 
          className="stars-layer"
          style={{
            width: '1px',
            height: '1px',
            background: 'transparent',
            boxShadow: stars.small,
            animation: 'animStar 50s linear infinite'
          }}
        ></div>
        <div 
          id="stars2" 
          className="stars-layer"
          style={{
            width: '2px',
            height: '2px',
            background: 'transparent',
            boxShadow: stars.medium,
            animation: 'animStar 100s linear infinite'
          }}
        ></div>
        <div 
          id="stars3" 
          className="stars-layer"
          style={{
            width: '3px',
            height: '3px',
            background: 'transparent',
            boxShadow: stars.large,
            animation: 'animStar 150s linear infinite'
          }}
        ></div>

        {/* Enhanced grid overlay with subtle animation */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1NiwgMTgyLCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-25"></div>

        {/* Enhanced circuit lines with glow effect */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="opacity-40">
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#0088FF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0044BB" stopOpacity="0.2" />
              </linearGradient>
              <filter id="circuitGlow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <path
              d="M0,300 Q300,400 600,350 T1000,400 T1400,350"
              fill="none"
              stroke="url(#circuitGradient)"
              strokeWidth="1"
              filter="url(#circuitGlow)"
            />
            <path
              d="M300,0 Q350,200 300,400 T350,800 T300,1200"
              fill="none"
              stroke="url(#circuitGradient)"
              strokeWidth="1"
              filter="url(#circuitGlow)"
            />
            <path
              d="M800,100 Q900,300 800,500 T900,900"
              fill="none"
              stroke="url(#circuitGradient)"
              strokeWidth="0.8"
              filter="url(#circuitGlow)"
              opacity="0.7"
            />
          </svg>
        </div>

        {/* Noise texture overlay for depth */}
        <div 
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Animated gradient blobs */}
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

        {/* Enhanced scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-12">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent absolute animate-scanline"></div>
          </div>
        </div>

        {/* Enhanced cursor glow effect */}
        <div
          className="pointer-events-none absolute w-[250px] h-[250px] rounded-full bg-gradient-radial from-cyan-500/25 to-transparent blur-xl"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            opacity: 0.4,
            transform: "translate(-50%, -50%)",
            transition: "opacity 0.2s ease",
          }}
        ></div>
      </div>
    </>
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
          stroke: #edf5fd;
          stroke-dashoffset: 25%;
          stroke-dasharray: 0 50%;
          stroke-width: 1;
          opacity: 1;
        }
        50% {
          fill: transparent;
          stroke: #edf5fd;
          stroke-dashoffset: 0%;
          stroke-dasharray: 50% 0;
          opacity: 1;
        }
        60% {
          fill: transparent;
          stroke: #edf5fd;
          stroke-width: 1;
          opacity: 1;
        }
        100% {
          fill: #edf5fd;
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
        text.style.animation = "stroke 4.5s ease-in-out forwards";
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
      <svg viewBox="0 0 1320 120" className="w-[90vw] h-[120px] md:h-[150px] max-w-[1200px]">
        <text
          ref={textRef}
          x="50%"
          y="50%"
          dy=".35em"
          textAnchor="middle"
          className="uppercase"
          style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: "clamp(40px, 8vw, 100px)",
            strokeLinejoin: "round",
            fill: "transparent",
            stroke: "transparent",
            opacity: 0,
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

  useEffect(() => {
    const nameRevealTimer = setTimeout(() => {
      setShowName(true)
    }, 2000)

    const glowTimer = setTimeout(() => {
      setAllArrivedGlow(true)
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
    }, animationDuration * 1000)

    return () => {
      clearTimeout(nameRevealTimer)
      clearTimeout(glowTimer)
    }
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
        <ParallaxStarsBackground />

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
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(30px) saturate(180%) contrast(110%)",
                WebkitBackdropFilter: "blur(30px) saturate(180%) contrast(110%)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderTop: "1px solid rgba(255, 255, 255, 0.25)",
                borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.3),
                  inset 1px 0 0 rgba(255, 255, 255, 0.15),
                  inset -1px 0 0 rgba(255, 255, 255, 0.08),
                  inset 0 -1px 0 rgba(255, 255, 255, 0.05),
                  0 20px 40px rgba(0, 0, 0, 0.1),
                  0 10px 20px rgba(0, 0, 0, 0.05),
                  0 0 30px rgba(41, 141, 238, 0.2)
                `,
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
              {/* Glass reflection overlay */}
              <div 
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.4) 0%, 
                      rgba(255, 255, 255, 0.2) 15%, 
                      rgba(255, 255, 255, 0.05) 30%, 
                      transparent 40%, 
                      transparent 60%, 
                      rgba(255, 255, 255, 0.03) 70%, 
                      rgba(255, 255, 255, 0.1) 85%, 
                      rgba(255, 255, 255, 0.2) 100%
                    )
                  `,
                  opacity: 0.7,
                }}
              />
              
              {/* Glass surface texture */}
              <div 
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `
                    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                    linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.08) 50%, transparent 60%)
                  `,
                  opacity: 0.5,
                  animation: 'glassShimmer 6s ease-in-out infinite',
                  backgroundSize: '200% 200%',
                }}
              />
              
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
              {/* Welcome Banner */}
              <WelcomeBanner />
              
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
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

              <div className="min-h-[60px] md:min-h-[80px] mt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSkillIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 4.5 }}
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
