"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import SplitText from "../src/components/TextAnimations/SplitText/SplitText"
import DecryptedText from "../src/components/TextAnimations/DecryptedText/DecryptedText"
import LetsConnectModal from "./letsconnectmodal"
import Particles from './Particles';

// --- Interactive Background Gradient Animation ---
function BackgroundGradientAnimation() {
  const interactiveRef = useRef(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) return;
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
    move();
  }, [tgX, tgY, curX, curY]);

  const handleMouseMove = useCallback((event) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: "linear-gradient(72deg, #0E1D20 0%, #0D0916 100%)",
      }}
      onMouseMove={handleMouseMove}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div
        className={
          "gradients-container h-full w-full blur-lg " +
          (isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]")
        }
      >
        <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-gradient-radial from-blue-600/30 to-transparent rounded-full mix-blend-multiply animate-first"></div>
        <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-gradient-radial from-purple-600/25 to-transparent rounded-full mix-blend-multiply animate-second origin-[calc(50%-400px)]"></div>
        <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-gradient-radial from-cyan-600/25 to-transparent rounded-full mix-blend-multiply animate-third origin-[calc(50%+400px)]"></div>
        <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-gradient-radial from-violet-600/20 to-transparent rounded-full mix-blend-multiply animate-fourth origin-[calc(50%-200px)]"></div>
        <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-gradient-radial from-emerald-600/25 to-transparent rounded-full mix-blend-multiply animate-fifth origin-[calc(50%-800px)_calc(50%+800px)]"></div>
        <div
          ref={interactiveRef}
          className="absolute w-full h-full -top-1/2 -left-1/2 bg-gradient-radial from-blue-500/20 to-transparent rounded-full mix-blend-multiply opacity-70"
        ></div>
      </div>
    </div>
  );
}

// --- Enhanced "Let's Connect" Button with Interactive Effects ---
function LetsConnectButton({ onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(0, 255, 255, 0.15), 
              rgba(29, 233, 182, 0.1), 
              transparent 40%
            )
          `,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Glass Morphism Base */}
      <div className="
        relative flex items-center gap-3 px-8 py-4 rounded-full
        bg-white/5 border border-white/10
        text-white font-semibold text-lg
        backdrop-blur-xl
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        transition-all duration-300
        group-hover:bg-white/10 group-hover:border-cyan-400/30
        group-hover:shadow-[0_8px_32px_0_rgba(0,255,255,0.2)]
      ">
        {/* Animated Text */}
        <motion.span
          className="relative z-10"
          animate={{
            color: isHovered ? "#00FFFF" : "#FFFFFF",
          }}
          transition={{ duration: 0.3 }}
        >
          Let's Connect
        </motion.span>

        {/* Enhanced Arrow Icon with Rotation */}
        <motion.div
          className="relative z-10"
          animate={{
            rotate: isHovered ? 45 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-colors duration-300"
          >
            <motion.circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              animate={{
                stroke: isHovered ? "#00FFFF" : "#FFFFFF",
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.path
              d="M8 12l4 4 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              animate={{
                stroke: isHovered ? "#00FFFF" : "#FFFFFF",
                d: isHovered ? "M8 12l4-4 4 4" : "M8 12l4 4 4-4",
              }}
              transition={{ duration: 0.3 }}
            />
          </svg>
        </motion.div>

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              linear-gradient(
                45deg,
                transparent 30%,
                rgba(0, 255, 255, 0.1) 50%,
                transparent 70%
              )
            `,
            transform: "translateX(-100%)",
          }}
          animate={{
            transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 1,
          }}
        />
      </div>

      {/* Outer Glow Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-cyan-400/20"
        animate={{
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
        }}
      />
    </motion.button>
  );
}

// --- Main HeroSection Component ---
export default function HeroSection() {
  const [allArrivedGlow, setAllArrivedGlow] = useState(false)
  const [showName, setShowName] = useState(false)
  const circleContainerRef = useRef(null)
  const [showConnectModal, setShowConnectModal] = useState(false)
  const containerRef = useRef(null);

  const skills = useMemo(() => [
    "Full Stack Developer",
    "UI/UX Designer",
    "AI/ML Enthusiast"
  ], []);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const currentSkill = skills[currentSkillIndex]

  useEffect(() => {
    if (!showName) return;
    const interval = setInterval(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % skills.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [skills.length, showName])

  const textVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.045,
        duration: 0.34,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  }
  const cursorVariants = {
    blinking: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1.4,
        repeat: Infinity,
        times: [0, 0.5, 0.5, 1]
      }
    }
  }

  const glowControls1 = useAnimation()
  const glowControls2 = useAnimation()
  const glowControls3 = useAnimation()

  const circleConfigs = [
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

  const animationDuration = 5

  const handleHover = useCallback((controls) => {
    if (!allArrivedGlow) {
      controls.start({
        boxShadow: '0 0 80px rgba(41,141,238,1)',
        transition: { duration: 0.2 }
      })
    }
  }, [allArrivedGlow])

  const handleHoverEnd = useCallback((controls) => {
    if (!allArrivedGlow) {
      controls.start({
        boxShadow: '0 0 30px rgba(41,141,238,0.35)',
        transition: { duration: 0.2 }
      })
    }
  }, [allArrivedGlow])

  useEffect(() => {
    const totalDelay = animationDuration * 1000
    const glowTimer = setTimeout(() => {
      setAllArrivedGlow(true)
      setShowName(true)
      const glowAnimation = {
        boxShadow: [
          '0 0 30px rgba(41,141,238,0.35)',
          '0 0 60px rgba(41,141,238,0.8)',
          '0 0 30px rgba(41,141,238,0.35)'
        ],
        transition: { duration: 1, times: [0, 0.5, 1] }
      }
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

  // --- Enhanced Animated Name ---
  const name = "Mahidhar Reddy G".split("");
  const introBlock = useMemo(() => (
    <>
      <div>
        <SplitText
          text="Hello! I'm"
          className="text-3xl md:text-4xl font-semibold mb-2 metallic-cyan-3d"
          splitType="words"
          delay={120}
          duration={1}
          ease="power3.out"
        />
      </div>
      <div>
        <motion.h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 flex flex-wrap justify-center gap-1">
          {name.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
      </div>
    </>
  ), []);

  // Handle modal close when clicking on backdrop
  const handleModalClose = useCallback(() => {
    setShowConnectModal(false);
  }, []);

  // Handle modal open
  const handleModalOpen = useCallback(() => {
    setShowConnectModal(true);
  }, []);

  return (
    <>
      <section className="h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
        <BackgroundGradientAnimation />

        {/* --- Particles background with cyan colors and hover interaction --- */}
        <div
          ref={containerRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            minHeight: '100%',
            zIndex: 1,
            display: 'block',
          }}
        >
          <Particles
            particleColors={[
              '#00FFFF', // Bright cyan
              '#80FFFF', // Light cyan
              '#1DE9B6', // Turquoise
              '#7FDBFF', // Sky blue
              '#3EF8F8', // Mint
            ]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

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
        </div>

        {/* Hero text content with animated intro and name */}
        <motion.div
          className="text-center space-y-4 relative z-20"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2 }}
        >
          {showName && introBlock}

          {/* Skills and tagline only after showName */}
          {showName && (
            <>
              <div className="min-h-[60px] md:min-h-[80px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSkillIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-xl md:text-3xl font-mono metallic-cyan-3d"
                  >
                    {currentSkill.split("").map((char, index) => (
                      <motion.span
                        key={index}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                      >
                        {char}
                      </motion.span>
                    ))}
                    <motion.span
                      variants={cursorVariants}
                      animate="blinking"
                      className="ml-1"
                    >
                      |
                    </motion.span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <motion.p className="text-xl md:text-2xl text-gray-300 mt-6">
                Creating digital experiences that matter
              </motion.p>
              {/* Enhanced "Let's Connect" Button */}
              <div className="mt-8 flex justify-center">
                <LetsConnectButton onClick={handleModalOpen} />
              </div>
            </>
          )}
        </motion.div>
      </section>

      {/* Enhanced Modal Opening with Smooth Blur Effect */}
      <AnimatePresence mode="wait">
        {showConnectModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1]
            }}
          >
            {/* Enhanced Blurred Background Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ 
                backdropFilter: "blur(0px)",
                backgroundColor: "rgba(0, 0, 0, 0)"
              }}
              animate={{ 
                backdropFilter: "blur(16px)",
                backgroundColor: "rgba(0, 0, 0, 0.5)"
              }}
              exit={{ 
                backdropFilter: "blur(0px)",
                backgroundColor: "rgba(0, 0, 0, 0)"
              }}
              transition={{ 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onClick={handleModalClose}
              style={{ cursor: 'pointer' }}
            />
            
            {/* Modal Wrapper with Smooth Scale Animation */}
            <motion.div
              className="relative z-10"
              initial={{ 
                scale: 0.7, 
                opacity: 0,
                y: 60
              }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: 0
              }}
              exit={{ 
                scale: 0.85, 
                opacity: 0,
                y: 20
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8,
                delay: 0.1
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Keep the LetsConnectModal unchanged */}
              <LetsConnectModal 
                open={showConnectModal} 
                onClose={handleModalClose} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
