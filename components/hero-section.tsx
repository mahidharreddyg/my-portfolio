"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, useAnimation, AnimationControls, AnimatePresence } from "framer-motion"
import SplitText from "../src/components/TextAnimations/SplitText/SplitText"
import DecryptedText from "../src/components/TextAnimations/DecryptedText/DecryptedText"

interface CircleConfig {
  size: string;
  startX: string;
  startY: string;
  delay: number;
  glowControls: AnimationControls;
}

function BackgroundGradientAnimation() {
  const interactiveRef = useRef<HTMLDivElement>(null);
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

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
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

export default function HeroSection() {
  const [allArrivedGlow, setAllArrivedGlow] = useState(false)
  const [showName, setShowName] = useState(false)
  const circleContainerRef = useRef<HTMLDivElement>(null)

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
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.2,
        ease: "easeOut"
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

  // Memoize the intro block so it only mounts once
  const introBlock = useMemo(() => (
    <>
      <div>
        <SplitText
          text="Hello! I'm"
          className="text-3xl md:text-4xl font-semibold text-cyan-300 mb-2"
          splitType="words"
          delay={120}
          duration={0.6}
          ease="power3.out"
        />
      </div>
      <div>
        <DecryptedText
          text="Mahidhar Reddy G"
          interval={40}
          className="text-5xl md:text-7xl font-extrabold text-white mb-4"
        />
      </div>
    </>
  ), []);

  return (
    <section className="h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
      <BackgroundGradientAnimation />

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
                  className="text-xl md:text-3xl font-mono text-cyan-300"
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
          </>
        )}
      </motion.div>
    </section>
  )
}
