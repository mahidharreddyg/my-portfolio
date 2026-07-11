"use client"

import React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import LetsConnectModal from "./letsconnectmodal"
import { HyperText } from "@/src/components/HyperText/HyperText"

// ─── Rich Background ───────────────────────────────────────────────────────────
function RichBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let isVisible = true
    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    type Bokeh = {
      x: number; y: number; r: number
      dx: number; dy: number
      alpha: number; alphaDir: number
      color: string
    }

    const palette = [
      "29,115,235",
      "91,33,182",
      "6,182,212",
      "139,92,246",
    ]

    const bokeh: Bokeh[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 60 + 20,
      dx: (Math.random() - 0.5) * 0.12,
      dy: (Math.random() - 0.5) * 0.10,
      alpha: Math.random() * 0.06 + 0.02,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      color: palette[Math.floor(Math.random() * palette.length)],
    }))

    type Star = { x: number; y: number; r: number; alpha: number; twinkleSpeed: number; phase: number }
    const stars: Star[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 0.9 + 0.2,
      alpha: Math.random() * 0.55 + 0.1,
      twinkleSpeed: Math.random() * 0.008 + 0.003,
      phase: Math.random() * Math.PI * 2,
    }))

    function draw() {
      if (!ctx || !isVisible) {
        animId = requestAnimationFrame(draw)
        return
      }
      ctx.clearRect(0, 0, W, H)

      for (const s of stars) {
        s.phase += s.twinkleSpeed
        const a = s.alpha * (0.5 + 0.5 * Math.sin(s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,220,255,${a})`
        ctx.fill()
      }

      for (const b of bokeh) {
        b.alpha += b.alphaDir * 0.0003
        if (b.alpha > 0.09 || b.alpha < 0.01) b.alphaDir *= -1

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        grad.addColorStop(0, `rgba(${b.color},${b.alpha})`)
        grad.addColorStop(0.5, `rgba(${b.color},${b.alpha * 0.4})`)
        grad.addColorStop(1, `rgba(${b.color},0)`)
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        b.x += b.dx; b.y += b.dy
        if (b.x < -b.r) b.x = W + b.r
        if (b.x > W + b.r) b.x = -b.r
        if (b.y < -b.r) b.y = H + b.r
        if (b.y > H + b.r) b.y = -b.r
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", onResize)

    // Pause canvas when hero is scrolled off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting },
      { threshold: 0.05 }
    )
    if (canvas.parentElement) observer.observe(canvas.parentElement)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", onResize)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#020617" }}>
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "85vw", height: "70vh",
          top: "-25%", left: "-20%",
          background: "radial-gradient(ellipse at 40% 45%, rgba(29,78,216,0.16) 0%, rgba(29,78,216,0.05) 45%, transparent 68%)",
          filter: "blur(90px)",
        }}
        animate={{ x: [0, 28, -12, 0], y: [0, -18, 8, 0], scale: [1, 1.07, 0.97, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "75vw", height: "65vh",
          bottom: "-20%", right: "-15%",
          background: "radial-gradient(ellipse at 55% 50%, rgba(109,40,217,0.13) 0%, rgba(109,40,217,0.04) 48%, transparent 70%)",
          filter: "blur(110px)",
        }}
        animate={{ x: [0, -22, 10, 0], y: [0, 16, -8, 0], scale: [1, 1.05, 0.98, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "50vw", height: "50vh",
          top: "15%", right: "-5%",
          background: "radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, rgba(6,182,212,0.02) 50%, transparent 68%)",
          filter: "blur(80px)",
        }}
        animate={{ x: [0, -18, 6, 0], y: [0, 12, -6, 0], scale: [1, 1.09, 0.95, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "45vw", height: "45vh",
          bottom: "5%", left: "-5%",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
        animate={{ x: [0, 14, -8, 0], y: [0, -10, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.85 }} />

      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 320, height: 320,
          top: "8%", right: "12%",
          border: "0.5px solid rgba(99,179,255,0.06)",
          background: "radial-gradient(circle, rgba(29,115,235,0.03) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.04, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 220, height: 220,
          bottom: "12%", left: "8%",
          border: "0.5px solid rgba(139,92,246,0.07)",
          background: "radial-gradient(circle, rgba(109,40,217,0.04) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.06, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  )
}

// ─── Welcome Banner ────────────────────────────────────────────────────────────
function WelcomeBanner({ onThemeToggle, show }: { onThemeToggle?: () => void; show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-6 flex justify-center"
        >
          <button
            onClick={onThemeToggle}
            className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full py-2 px-6 text-sm md:text-base font-semibold transition-all duration-500"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(24px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 14px rgba(0,0,0,0.2)",
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"
              style={{ background: "linear-gradient(120deg, rgba(255,255,255,0.1) 0%, transparent 60%)" }} />
            <div className="relative z-10 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"
                style={{ boxShadow: "0 0 10px rgba(96,165,250,0.9)" }} />
              <span className="text-white/80 group-hover:text-white transition-colors duration-300 tracking-wide font-sans">
                Welcome to My Creative World
              </span>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Static Hello ──────────────────────────────────────────────────────────────
function StaticHello({ show }: { show: boolean }) {
  const [greeting, setGreeting] = useState("Hello")

  useEffect(() => {
    const h = new Date().getHours()
    if (h < 12) setGreeting("Good Morning")
    else if (h < 18) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-2"
        >
          <span className="text-2xl md:text-3xl font-light tracking-widest text-white/70 font-sans">
            {greeting}, I&apos;m
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Name Reveal ───────────────────────────────────────────────────────────────
function NameRevealAnimation({ showName }: { showName: boolean }) {
  const textRef = useRef<SVGTextElement>(null)
  const styleRef = useRef<HTMLStyleElement | null>(null)

  const generateKeyframes = useCallback(() => `
    @keyframes stroke-draw {
      0%   { fill: transparent; stroke: rgba(255,255,255,0.85); stroke-dashoffset: 25%; stroke-dasharray: 0 50%; stroke-width: 0.4; opacity: 0; }
      50%  { fill: transparent; stroke: rgba(255,255,255,0.95); stroke-dashoffset: 0%; stroke-dasharray: 20% 0; stroke-width: 1; opacity: 1; }
      72%  { fill: transparent; stroke: rgba(255,255,255,0.9); stroke-width: 1; opacity: 1; }
      100% { fill: url(#nameGradient); stroke: transparent; stroke-dashoffset: -25%; stroke-dasharray: 50% 0; stroke-width: 0; opacity: 1; }
    }
  `, [])

  useEffect(() => {
    if (!showName) return
    const text = textRef.current
    if (!text) return
    text.style.opacity = "0"
    text.style.fill = "transparent"
    text.style.stroke = "transparent"
    const style = document.createElement("style")
    style.setAttribute("data-hero", "name-anim")
    style.textContent = generateKeyframes()
    document.head.appendChild(style)
    styleRef.current = style
    setTimeout(() => {
      if (text) text.style.animation = "stroke-draw 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"
    }, 100)
    return () => {
      if (styleRef.current && document.head.contains(styleRef.current)) {
        document.head.removeChild(styleRef.current)
        styleRef.current = null
      }
    }
  }, [generateKeyframes, showName])

  if (!showName) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="flex flex-col items-center"
    >
      <svg viewBox="0 0 1320 120" className="w-[90vw] h-[90px] md:h-[120px] max-w-[1000px]">
        <defs>
          <linearGradient id="nameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#6b7fa3" />
          </linearGradient>
          <filter id="nameGlow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <text
          ref={textRef}
          x="50%" y="50%" dy=".35em"
          textAnchor="middle"
          className="uppercase tracking-wider font-extrabold"
          style={{
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: "clamp(36px, 8vw, 90px)",
            strokeLinejoin: "round",
            fill: "transparent",
            stroke: "transparent",
            opacity: 0,
            filter: "url(#nameGlow)",
            letterSpacing: "0.08em",
          }}
        >
          MAHIDHAR REDDY G
        </text>
      </svg>
    </motion.div>
  )
}

// ─── Roles Decryption ─────────────────────────────────────────────────────────
function RolesDecryption({ showRoles }: { showRoles: boolean }) {
  const roles = [
    "Full Stack Developer",
    "UI/UX Designer",
    "AI/ML Enthusiast",
    "Creative Problem Solver",
    "Digital Innovator",
  ]
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [triggerAnimation, setTriggerAnimation] = useState(false)

  useEffect(() => {
    if (!showRoles) return
    const fire = () => { setTriggerAnimation(true); setTimeout(() => setTriggerAnimation(false), 100) }
    fire()
    const interval = setInterval(() => {
      setCurrentRoleIndex((p) => (p + 1) % roles.length)
      fire()
    }, 6000)
    return () => clearInterval(interval)
  }, [showRoles, roles.length])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: showRoles ? 1 : 0, y: showRoles ? 0 : 10 }}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      className="text-center mt-1 h-[40px] md:h-[56px] flex items-center justify-center"
    >
      <div className="text-2xl md:text-4xl font-light tracking-wider font-sans">
        <HyperText
          key={`role-${currentRoleIndex}`}
          triggerAnimation={triggerAnimation}
          animateOnHover={true}
          duration={2500}
          animationDirection="center-out"
          className="bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent font-medium"
          characterSet={["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
        >
          {roles[currentRoleIndex]}
        </HyperText>
      </div>
    </motion.div>
  )
}

// ─── Let's Connect Button (sleek, compact, full liquid glass) ─────────────────
function LetsConnectButton({
  onClick,
  show,
}: {
  onClick: () => void
  show: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center"
        >
          <motion.button
            onClick={onClick}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileTap={{ scale: 0.97 }}
            animate={{
              y: hovered ? -2 : 0,
              boxShadow: hovered
                ? "0 16px 45px rgba(59,130,246,0.3), 0 10px 30px rgba(59,130,246,0.15), inset 0 1px 0 rgba(255,255,255,0.35)"
                : "0 10px 30px rgba(0,0,0,0.25), 0 5px 15px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="group relative flex items-center gap-3.5 overflow-hidden rounded-full"
            style={{
              padding: "9px 12px 9px 26px",
              background: "rgba(255, 255, 255, 0.07)",
              border: "0.5px solid rgba(255, 255, 255, 0.22)",
              backdropFilter: "blur(35px)",
              WebkitBackdropFilter: "blur(35px)",
              borderRadius: "9999px",
            }}
          >
            {/* Liquid Glass Texture */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ opacity: hovered ? 0.18 : 0.09 }}
              transition={{ duration: 0.28 }}
              style={{
                background: `
                  radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18) 0%, transparent 50%),
                  radial-gradient(circle at 70% 80%, rgba(59,130,246,0.12) 0%, transparent 40%)
                `,
              }}
            />

            {/* Shine Sweep */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ x: hovered ? "150%" : "-150%" }}
              transition={{
                duration: 1.1,
                ease: "easeInOut",
                repeat: hovered ? Infinity : 0,
                repeatDelay: 2,
              }}
              style={{
                background:
                  "linear-gradient(110deg, transparent 15%, rgba(255,255,255,0.14) 40%, rgba(255,255,255,0.08) 60%, transparent 85%)",
                filter: "blur(2px)",
              }}
            />

            {/* Top Inner Highlight */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "inset 0 2px 5px rgba(255,255,255,0.28)" }}
            />

            {/* Bottom Inner Depth */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "inset 0 -2px 5px rgba(0,0,0,0.12)" }}
            />

            {/* Text - smaller, sleeker */}
            <span
              className="relative z-10 font-medium"
              style={{
                color: "#fff",
                fontSize: "14px",
                fontWeight: 550,
                letterSpacing: "-0.015em",
                textShadow: "0 1px 2px rgba(0,0,0,0.25)",
              }}
            >
              Let's Connect
            </span>

            {/* Full Liquid Glass Circle */}
            <motion.div
              animate={{
                scale: hovered ? 1.06 : 1,
                background: hovered
                  ? "rgba(59,130,246,0.25)"
                  : "rgba(255,255,255,0.06)",
                border: hovered
                  ? "0.5px solid rgba(59,130,246,0.45)"
                  : "0.5px solid rgba(255,255,255,0.24)",
              }}
              transition={{
                type: "spring",
                stiffness: 340,
                damping: 22,
              }}
              className="relative z-10 flex items-center justify-center rounded-full overflow-hidden"
              style={{
                width: "42px",
                height: "42px",
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
              }}
            >
              {/* Liquid Glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  opacity: hovered ? 0.75 : 0,
                  scale: hovered ? 1.15 : 0.5,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(59,130,246,0.55) 0%, rgba(59,130,246,0.2) 50%, rgba(59,130,246,0) 75%)",
                  filter: "blur(8px)",
                }}
              />

              {/* Specular Reflection */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ opacity: hovered ? 0.22 : 0.08 }}
                transition={{ duration: 0.28 }}
                style={{
                  background:
                    "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35) 0%, transparent 50%)",
                }}
              />

              {/* Arrow - East (0°), Northeast (45°) on hover */}
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                animate={{
                  rotate: hovered ? 45 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 22,
                }}
                className="relative z-10"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    filter: hovered ? "drop-shadow(0 0 5px rgba(255,255,255,0.65))" : "none",
                  }}
                />
              </motion.svg>
            </motion.div>

            {/* Bottom Glow Line */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
              animate={{
                opacity: hovered ? 0.45 : 0,
                width: hovered ? "75%" : "0%",
              }}
              transition={{ duration: 0.35 }}
              style={{
                height: "2px",
                background: "rgba(59,130,246,0.65)",
                filter: "blur(6px)",
              }}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Glass Circles (Full Apple Liquid Glass) ──────────────────────────────────
function GlassCircles({
  circleConfigs, animationDuration, isIntroComplete, allArrivedGlow, handleHover, handleHoverEnd,
}: {
  circleConfigs: Array<{ size: string; startX: string; startY: string; delay: number; glowControls: ReturnType<typeof useAnimation> }>
  animationDuration: number
  isIntroComplete: boolean
  allArrivedGlow: boolean
  handleHover: (c: any) => void
  handleHoverEnd: (c: any) => void
}) {
  const rings = [
    {
      baseOpacity: 0.48,
      // Apple Liquid Glass: stronger blur + saturation + contrast
      bg: "rgba(255, 255, 255, 0.06)",
      border: "0.5px solid rgba(255, 255, 255, 0.28)",
      backdropFilter: "blur(40px) saturate(160%) contrast(110%)",
      innerTop: "inset 0 3px 8px rgba(255,255,255,0.32)",
      innerBottom: "inset 0 -2px 6px rgba(0,0,0,0.12)",
      glow: "0 0 90px rgba(29,115,235,0.55), 0 0 160px rgba(29,115,235,0.28)",
    },
    {
      baseOpacity: 0.55,
      bg: "rgba(255, 255, 255, 0.07)",
      border: "0.5px solid rgba(255, 255, 255, 0.25)",
      backdropFilter: "blur(40px) saturate(155%) contrast(110%)",
      innerTop: "inset 0 3px 8px rgba(255,255,255,0.3)",
      innerBottom: "inset 0 -2px 6px rgba(0,0,0,0.1)",
      glow: "0 0 75px rgba(29,115,235,0.5), 0 0 140px rgba(29,115,235,0.24)",
    },
    {
      baseOpacity: 0.62,
      bg: "rgba(255, 255, 255, 0.08)",
      border: "0.5px solid rgba(255, 255, 255, 0.22)",
      backdropFilter: "blur(35px) saturate(150%) contrast(110%)",
      innerTop: "inset 0 2px 7px rgba(255,255,255,0.28)",
      innerBottom: "inset 0 -2px 5px rgba(0,0,0,0.09)",
      glow: "0 0 60px rgba(29,115,235,0.45), 0 0 120px rgba(29,115,235,0.2)",
    },
  ]

  return (
    <div className="absolute top-1/2 left-1/2 w-[130vmin] h-[130vmin] -translate-x-1/2 -translate-y-1/2 z-10"
      style={{ perspective: "1200px" }}>
      {circleConfigs.map((config, i) => {
        const ring = rings[i]
        return (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: config.size,
              height: config.size,
              background: ring.bg,
              backdropFilter: ring.backdropFilter,
              WebkitBackdropFilter: ring.backdropFilter,
              border: ring.border,
              boxShadow: `${ring.glow}, ${ring.innerTop}, ${ring.innerBottom}`,
              opacity: ring.baseOpacity,
              willChange: "transform, box-shadow",
            }}
            initial={{ x: config.startX, y: config.startY, scale: 0.75, rotate: 360, opacity: 0 }}
            animate={{
              x: [config.startX, "0%", "-50%"],
              y: [config.startY, "0%", "-50%"],
              scale: [0.75, 1.35, 1],
              rotate: [360, 180, 0],
              opacity: [0, ring.baseOpacity * 0.7, ring.baseOpacity],
              transition: { duration: animationDuration, delay: config.delay, times: [0, 0.5, 1], ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            onHoverStart={() => handleHover(config.glowControls)}
            onHoverEnd={() => handleHoverEnd(config.glowControls)}
          >
            {/* Top-left specular highlight - Apple Liquid Glass */}
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 26% 16%, rgba(230,245,255,0.18) 0%, rgba(190,235,255,0.08) 20%, transparent 45%)",
              }} />

            {/* Bottom ambient pool */}
            <div className="absolute rounded-full pointer-events-none"
              style={{
                bottom: 0,
                left: "8%",
                right: "8%",
                height: "28%",
                background: "radial-gradient(ellipse at 50% 100%, rgba(29,115,235,0.09) 0%, transparent 70%)",
              }} />

            {/* Hover glow target */}
            <motion.div className="absolute inset-0 rounded-full pointer-events-none" animate={config.glowControls} />
          </motion.div>
        )
      })}
    </div>
  )
}

// ─── Status Bar ───────────────────────────────────────────────────────────────
function StatusBar() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }))
    }
    update()
    const t = setInterval(update, 30000)
    return () => clearInterval(t)
  }, [])

  return (
    <motion.div
      className="absolute top-5 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 1 }}
    >
      <div className="text-white/18 text-xs font-medium tracking-[0.28em] uppercase">MRG</div>
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} className="w-0.5 h-0.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.2)" }}
            animate={{ opacity: [0.2, 0.55, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>
      <div className="text-white/18 text-xs font-medium tabular-nums">{time}</div>
    </motion.div>
  )
}

// ─── Corner Marquees ──────────────────────────────────────────────────────────
function CornerMarquees() {
  return (
    <>
      <div className="absolute top-0 left-0 z-30 pointer-events-none">
        <div className="w-32 h-8 overflow-hidden transform -rotate-45 origin-bottom-left">
          <div className="flex whitespace-nowrap animate-marquee-left">
            {["PORTFOLIO", "PORTFOLIO", "PORTFOLIO", "PORTFOLIO"].map((t, i) => (
              <span key={i} className="text-blue-300/25 text-xs font-bold tracking-wider mx-2">{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 z-30 pointer-events-none">
        <div className="w-32 h-8 overflow-hidden transform rotate-45 origin-bottom-right">
          <div className="flex whitespace-nowrap animate-marquee-right">
            {["DEVELOPER", "DEVELOPER", "DEVELOPER", "DEVELOPER"].map((t, i) => (
              <span key={i} className="text-blue-300/25 text-xs font-bold tracking-wider mx-2">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Main HeroSection ─────────────────────────────────────────────────────────
export default function HeroSection({ onThemeToggle }: { onThemeToggle?: () => void }) {
  const [showBanner, setShowBanner] = useState(false)
  const [showGreeting, setShowGreeting] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showRoles, setShowRoles] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [isIntroComplete, setIsIntroComplete] = useState(false)
  const [allArrivedGlow, setAllArrivedGlow] = useState(false)
  const [showConnectModal, setShowConnectModal] = useState(false)

  const glowControls1 = useAnimation()
  const glowControls2 = useAnimation()
  const glowControls3 = useAnimation()

  const circleConfigs = [
    { size: "130vmin", startX: "-150%", startY: "-100%", delay: 0, glowControls: glowControls1 },
    { size: "104vmin", startX: "120%", startY: "-50%", delay: 0, glowControls: glowControls2 },
    { size: "78vmin", startX: "50%", startY: "150%", delay: 0, glowControls: glowControls3 },
  ]

  const animationDuration = 4

  const handleHover = useCallback((controls: any) => {
    if (isIntroComplete && !allArrivedGlow) {
      controls.start({
        boxShadow: "0 0 100px rgba(29,115,235,0.75), 0 0 180px rgba(29,115,235,0.4), 0 0 260px rgba(41,141,238,0.18), inset 0 3px 10px rgba(255,255,255,0.35)",
        transition: { duration: 0.3 },
      })
    }
  }, [allArrivedGlow, isIntroComplete])

  const handleHoverEnd = useCallback((controls: any) => {
    if (isIntroComplete && !allArrivedGlow) {
      controls.start({ boxShadow: "none", transition: { duration: 0.45 } })
    }
  }, [allArrivedGlow, isIntroComplete])

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowBanner(true), 2600),
      setTimeout(() => setShowGreeting(true), 2750),
      setTimeout(() => setShowName(true), 2650),
      setTimeout(() => setShowRoles(true), 5100),
      setTimeout(() => setShowButton(true), 5900),
    ]

    const glowTimer = setTimeout(async () => {
      setAllArrivedGlow(true)

      const pulse = {
        boxShadow: [
          "0 0 40px rgba(29,115,235,0.3), 0 0 80px rgba(29,115,235,0.15)",
          "0 0 90px rgba(29,115,235,0.85), 0 0 165px rgba(29,115,235,0.48), 0 0 250px rgba(41,141,238,0.18)",
          "0 0 40px rgba(29,115,235,0.3), 0 0 80px rgba(29,115,235,0.15)",
        ],
        transition: { duration: 0.85, times: [0, 0.5, 1] },
      }

      glowControls3.start(pulse)
      await new Promise<void>((r) => setTimeout(r, 145))
      glowControls2.start(pulse)
      await new Promise<void>((r) => setTimeout(r, 145))
      await glowControls1.start(pulse)
      await new Promise<void>((r) => setTimeout(r, 280))

      const finalPulse = {
        boxShadow: [
          "0 0 40px rgba(29,115,235,0.3), 0 0 80px rgba(29,115,235,0.15)",
          "0 0 95px rgba(29,115,235,0.9), 0 0 175px rgba(29,115,235,0.52), 0 0 260px rgba(41,141,238,0.22)",
          "0 0 40px rgba(29,115,235,0.3), 0 0 80px rgba(29,115,235,0.15)",
        ],
        transition: { duration: 2.5, times: [0, 0.5, 1] },
      }
      await Promise.all([
        glowControls1.start(finalPulse),
        glowControls2.start(finalPulse),
        glowControls3.start(finalPulse),
      ])

      setAllArrivedGlow(false)
      setIsIntroComplete(true)
    }, animationDuration * 1000)

    return () => { timers.forEach(clearTimeout); clearTimeout(glowTimer) }
  }, [glowControls1, glowControls2, glowControls3, animationDuration])

  return (
    <>
      <section
        className="h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden"
        style={{ WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }}
      >
        <RichBackground />
        <StatusBar />
        <CornerMarquees />

        <GlassCircles
          circleConfigs={circleConfigs}
          animationDuration={animationDuration}
          isIntroComplete={isIntroComplete}
          allArrivedGlow={allArrivedGlow}
          handleHover={handleHover}
          handleHoverEnd={handleHoverEnd}
        />

        <div className="relative z-20 text-center flex flex-col items-center"
          style={{ textRendering: "optimizeLegibility" }}>
          <WelcomeBanner show={showBanner} onThemeToggle={onThemeToggle} />
          <StaticHello show={showGreeting} />
          <NameRevealAnimation showName={showName} />
          <RolesDecryption showRoles={showRoles} />
          <div className="mt-10">
            <LetsConnectButton show={showButton} onClick={() => setShowConnectModal(true)} />
          </div>
        </div>
      </section>

      <LetsConnectModal isOpen={showConnectModal} onClose={() => setShowConnectModal(false)} />
    </>
  )
}