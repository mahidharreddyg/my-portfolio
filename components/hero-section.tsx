"use client"

import React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useAnimation, AnimatePresence, AnimationControls } from "framer-motion"
import LetsConnectModal from "./letsconnectmodal"
import ShinyText from "@/src/components/ShinyText/ShinyText"
import { HyperText } from "@/src/components/HyperText/HyperText"




// --- Static Hello Component ---
function StaticHello() {
  return (
    <div className="text-center space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-4xl md:text-6xl font-bold"
      >
        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
          Hello, I'm
        </span>
      </motion.div>
    </div>
  )
}

// --- Updated Welcome Banner with Glassy Effect ---
function WelcomeBanner() {
  const [isHovered, setIsHovered] = useState(false)
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
    setIsHovered(true)
    glowControls.start({
      scale: 1.02,
      boxShadow: "0 0 20px rgba(41,141,238,0.3), 0 0 30px rgba(59, 130, 246, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 0 15px rgba(41,141,238,0.1)",
      transition: { duration: 0.3 }
    })
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
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
      transition={{ duration: 0.8, delay: 1.5 }}
      className="mb-8"
    >
      <motion.a 
        className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white/15 py-[6px] px-5 text-sm font-medium opacity-95 backdrop-blur-xl transition-all duration-300 ease-in-out lg:text-base max-w-fit mx-auto"
        href="/portfolio"
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
        animate={glowControls}
        style={{
          boxShadow: "0 0 12px rgba(41,141,238,0.2), 0 0 20px rgba(59, 130, 246, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 0 8px rgba(41,141,238,0.05)",
          borderColor: "rgba(255, 255, 255, 0.4)",
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.05) 100%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/8 to-transparent rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-full" />
        <div 
          className="absolute inset-[1px] rounded-full opacity-60"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.05)",
          }}
        />
        <div 
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: "radial-gradient(ellipse at top, rgba(255, 255, 255, 0.15) 0%, transparent 70%)",
            filter: "blur(0.5px)",
          }}
        />
        <div className="relative z-10">
          <ShinyText 
            text="Welcome to My Creative World ✨" 
            disabled={false} 
            speed={2.7} 
            className='custom-class' 
          />
        </div>
      </motion.a>
    </motion.div>
  )
}

// --- Enhanced Background with Gradient (No Circuit Lines) ---
function EnhancedBackground() {
  const interactiveRef = useRef<HTMLDivElement>(null)
  const [curX, setCurX] = useState(0)
  const [curY, setCurY] = useState(0)
  const [tgX, setTgX] = useState(0)
  const [tgY, setTgY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const [stars, setStars] = useState({
    small: '',
    medium: '',
    large: ''
  })
  const [isClient, setIsClient] = useState(false)

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

  const animationFrameRef = useRef<number>()

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

  if (!isClient) {
    return (
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at bottom, #081626 0%, #041018 100%),
            linear-gradient(135deg, rgba(41, 141, 238, 0.08) 0%, rgba(6, 18, 32, 0.9) 50%, rgba(8, 22, 38, 0.95) 100%),
            radial-gradient(ellipse at top left, rgba(41, 141, 238, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse at bottom right, rgba(0, 255, 255, 0.06) 0%, transparent 50%)
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
        
        @keyframes marquee-diagonal-1 {
          0% {
            transform: rotate(25deg) translateX(-100%);
          }
          100% {
            transform: rotate(25deg) translateX(100%);
          }
        }
        
        @keyframes marquee-diagonal-2 {
          0% {
            transform: rotate(-25deg) translateX(100%);
          }
          100% {
            transform: rotate(-25deg) translateX(-100%);
          }
        }
        
        .animate-marquee-diagonal-1 {
          animation: marquee-diagonal-1 20s linear infinite;
        }
        
        .animate-marquee-diagonal-2 {
          animation: marquee-diagonal-2 25s linear infinite;
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
            linear-gradient(135deg, rgba(41, 141, 238, 0.08) 0%, rgba(6, 18, 32, 0.9) 50%, rgba(8, 22, 38, 0.95) 100%),
            radial-gradient(ellipse at top left, rgba(41, 141, 238, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse at bottom right, rgba(0, 255, 255, 0.06) 0%, transparent 50%)
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

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1NiwgMTgyLCAyNTUsIDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-15"></div>

        {/* Noise texture overlay for depth */}
        <div 
          className="absolute inset-0 opacity-[0.01] mix-blend-overlay"
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
          <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-gradient-radial from-blue-600/25 to-transparent rounded-full mix-blend-multiply animate-first"></div>
          <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-gradient-radial from-cyan-600/20 to-transparent rounded-full mix-blend-multiply animate-second origin-[calc(50%-400px)]"></div>
          <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-gradient-radial from-purple-600/20 to-transparent rounded-full mix-blend-multiply animate-third origin-[calc(50%+400px)]"></div>
          <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-gradient-radial from-violet-600/15 to-transparent rounded-full mix-blend-multiply animate-fourth origin-[calc(50%-200px)]"></div>
          <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-gradient-radial from-emerald-600/20 to-transparent rounded-full mix-blend-multiply animate-fifth origin-[calc(50%-800px)_calc(50%+800px)]"></div>
          <div
            ref={interactiveRef}
            className="absolute w-full h-full -top-1/2 -left-1/2 bg-gradient-radial from-blue-500/15 to-transparent rounded-full mix-blend-multiply opacity-70"
          ></div>
        </div>

        {/* Enhanced cursor glow effect */}
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
            fontFamily: "'Lily Script One', system-ui",
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
      className="text-center mt-6"
    >
      <div className="text-2xl md:text-3xl font-semibold text-white">
        <HyperText
          key={`role-${currentRoleIndex}`}
          triggerAnimation={triggerAnimation}
          animateOnHover={true}
          duration={2500}
          animationDirection="center-out"
          className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
          characterSet={["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","!","@","#","$","%","^","&","*","(",")"]}
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
        overflow-hidden rounded-full border border-white/20 bg-white/10 
        py-[6px] pr-[6px] pl-4 text-base font-medium opacity-90 
        backdrop-blur-md transition-all duration-300 ease-in-out
        hover:bg-transparent hover:border-white/30
        md:py-2 md:pr-2 md:pl-5
      "
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        boxShadow: isHovered 
          ? '0 8px 32px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
          : '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-full" />
      
      <span className="z-10 px-3 text-white transition-colors duration-300 group-hover:text-black">
        Let's Connect
      </span>
      
      <span 
        className="
          absolute inset-0 translate-x-[45%] scale-0 rounded-full 
          bg-gradient-to-br from-white/95 via-white/90 to-white/85
          opacity-0 transition-all duration-300 ease-in-out 
          group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100
          backdrop-blur-sm
        "
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.3), 0 4px 16px rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.75) 100%)',
        }}
      />
      
      <span className="
        z-10 flex items-center justify-center overflow-hidden rounded-full 
        bg-gradient-to-br from-white/30 via-white/20 to-white/10
        border border-white/30 backdrop-blur-md
        p-2 transition-all duration-300 
        group-hover:bg-gradient-to-br group-hover:from-white/95 group-hover:via-white/90 group-hover:to-white/85
        group-hover:border-white/40 group-hover:shadow-lg
        md:p-2.5
      "
      style={{
        boxShadow: isHovered 
          ? 'inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.2)' 
          : 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 2px 8px rgba(255, 255, 255, 0.05)',
      }}
      >
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
          className="
            text-white transition-all duration-300 
            group-hover:translate-x-5 group-hover:opacity-0
          "
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
        
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
          className="
            absolute -translate-x-5 text-black opacity-0 
            transition-all duration-300 
            group-hover:translate-x-0 group-hover:opacity-100
          "
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </motion.button>
  )
}

// --- Main HeroSection Component ---
export default function HeroSection() {
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

  const handleHover = useCallback(
    (controls: AnimationControls) => {
      if (!allArrivedGlow) {
        controls.start({
          boxShadow: "0 0 80px rgba(41,141,238,0.9)",
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
          boxShadow: "0 0 40px rgba(41,141,238,0.4)",
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
          "0 0 20px rgba(41,141,238,0.25)",
          "0 0 35px rgba(41,141,238,0.5)",
          "0 0 20px rgba(41,141,238,0.25)",
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
      clearTimeout(rolesRevealTimer)
      clearTimeout(glowTimer)
    }
  }, [glowControls1, glowControls2, glowControls3, animationDuration])

  const openModal = () => setShowConnectModal(true)
  const closeModal = () => setShowConnectModal(false)

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lily+Script+One&display=swap');
      `}</style>
      
      <section
        className="h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden"
        style={{
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <EnhancedBackground />

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
              <WelcomeBanner />
              
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
