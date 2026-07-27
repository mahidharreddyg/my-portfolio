"use client"

import React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useAnimation, AnimatePresence, useInView } from "framer-motion"
import dynamic from "next/dynamic"
import LetsConnectModal from "./letsconnectmodal"
import { HyperText } from "@/src/components/HyperText/HyperText"
import GlassSurface from "./GlassSurface"
import LazyCanvas from "./three/LazyCanvas"

const HeroGoldDustScene = dynamic(() => import("./three/HeroGoldDustScene"), { ssr: false })

// ─── Rich Background ───────────────────────────────────────────────────────────
function RichBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  // Hero is sticky and visible for a long scroll range, but does eventually
  // scroll away — stop the ambient blob loops once it's off screen instead
  // of letting them run for the rest of the session.
  const bgInView = useInView(wrapRef, { margin: "200px 0px 200px 0px" })

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
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden" style={{ background: "#020617" }}>
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "85vw", height: "70vh",
          top: "-25%", left: "-20%",
          background: "radial-gradient(ellipse at 40% 45%, rgba(var(--tc5-rgb),0.16) 0%, rgba(var(--tc5-rgb),0.05) 45%, transparent 68%)",
          filter: "blur(90px)",
        }}
        animate={bgInView ? { x: [0, 28, -12, 0], y: [0, -18, 8, 0], scale: [1, 1.07, 0.97, 1] } : undefined}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "75vw", height: "65vh",
          bottom: "-20%", right: "-15%",
          background: "radial-gradient(ellipse at 55% 50%, rgba(var(--tc11-rgb),0.13) 0%, rgba(var(--tc11-rgb),0.04) 48%, transparent 70%)",
          filter: "blur(110px)",
        }}
        animate={bgInView ? { x: [0, -22, 10, 0], y: [0, 16, -8, 0], scale: [1, 1.05, 0.98, 1] } : undefined}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "50vw", height: "50vh",
          top: "15%", right: "-5%",
          background: "radial-gradient(ellipse, rgba(var(--tc8-rgb),0.07) 0%, rgba(var(--tc8-rgb),0.02) 50%, transparent 68%)",
          filter: "blur(80px)",
        }}
        animate={bgInView ? { x: [0, -18, 6, 0], y: [0, 12, -6, 0], scale: [1, 1.09, 0.95, 1] } : undefined}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "45vw", height: "45vh",
          bottom: "5%", left: "-5%",
          background: "radial-gradient(ellipse, rgba(var(--tc9-rgb),0.08) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
        animate={bgInView ? { x: [0, 14, -8, 0], y: [0, -10, 5, 0] } : undefined}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />

      {/* Gold ember glow — the site's one warm accent against the cool field */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "40vw", height: "40vh",
          top: "4%", left: "3%",
          background: "radial-gradient(ellipse, rgba(198,155,63,0.16) 0%, rgba(122,95,34,0.07) 48%, transparent 72%)",
          filter: "blur(55px)",
        }}
        animate={bgInView ? { x: [0, 16, -6, 0], y: [0, -8, 10, 0], opacity: [0.65, 1, 0.65] } : undefined}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.85 }} />

      {/* Central glow — elevates the glass circles off the background */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          width: "92vmin", height: "92vmin",
          background: "radial-gradient(circle, rgba(var(--tc3-rgb),0.28) 0%, rgba(var(--tc2-rgb),0.10) 38%, transparent 66%)",
          filter: "blur(50px)",
        }}
        animate={bgInView ? { opacity: [0.75, 1, 0.75], scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 320, height: 320,
          top: "8%", right: "12%",
          border: "0.5px solid rgba(99,179,255,0.06)",
          background: "radial-gradient(circle, rgba(29,115,235,0.03) 0%, transparent 70%)",
        }}
        animate={bgInView ? { scale: [1, 1.04, 1], rotate: [0, 8, 0] } : undefined}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Real WebGL gold dust — genuine depth (particles drift at different
          Z, catching parallax) instead of a flat painted background. */}
      <div className="absolute inset-0 pointer-events-none">
        <LazyCanvas className="w-full h-full" camera={{ position: [0, 0, 5], fov: 45 }}>
          <HeroGoldDustScene />
        </LazyCanvas>
      </div>

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
  const [hovered, setHovered] = useState(false)

  return (
    <div className="mb-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -16, filter: "blur(8px)" }}
          animate={show ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: -16, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          style={{ pointerEvents: show ? "auto" : "none" }}
        >
          <motion.button
            onClick={onThemeToggle}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileTap={{ scale: 0.97 }}
            animate={{
              scale: hovered ? 1.02 : 1,
              boxShadow: hovered
                ? "0 12px 32px rgba(198,155,63,0.22), inset 0 1px 0 rgba(255,255,255,0.3)"
                : "0 6px 18px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.16)",
              borderColor: hovered ? "rgba(198,155,63,0.5)" : "rgba(198,155,63,0.24)",
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="group relative flex cursor-pointer items-center overflow-hidden rounded-full py-2 pl-4 pr-5"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "0.5px solid rgba(198,155,63,0.24)",
              WebkitBackdropFilter: "blur(28px)",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Liquid Glass Texture — same language as the glass circles / Let's Connect button */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ opacity: hovered ? 0.22 : 0.1 }}
              transition={{ duration: 0.28 }}
              style={{
                background: `
                  radial-gradient(circle at 28% 25%, rgba(255,255,255,0.18) 0%, transparent 50%),
                  radial-gradient(circle at 72% 78%, rgba(198,155,63,0.16) 0%, transparent 40%)
                `,
              }}
            />

            {/* Shine Sweep */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ x: hovered ? "150%" : "-150%" }}
              transition={{ duration: 1.1, ease: "easeInOut", repeat: hovered ? Infinity : 0, repeatDelay: 2 }}
              style={{
                background:
                  "linear-gradient(110deg, transparent 15%, rgba(255,255,255,0.12) 38%, rgba(243,226,179,0.14) 55%, rgba(255,255,255,0.05) 68%, transparent 85%)",
                filter: "blur(2px)",
              }}
            />

            {/* Top Inner Highlight */}
            <div className="absolute inset-0 rounded-full" style={{ boxShadow: "inset 0 2px 5px rgba(255,255,255,0.22)" }} />
            {/* Bottom Inner Depth */}
            <div className="absolute inset-0 rounded-full" style={{ boxShadow: "inset 0 -2px 5px rgba(0,0,0,0.12)" }} />

            <div className="relative z-10 flex items-center gap-2.5">
              <span className="relative flex h-2 w-2 shrink-0">
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--gold-core)" }}
                  animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <span
                  className="relative h-2 w-2 rounded-full"
                  style={{
                    background: "var(--gold-bead)",
                    border: "0.5px solid rgba(255,248,230,0.5)",
                    boxShadow: "0 0 10px rgba(212,175,55,0.85), inset 0 1px 1px rgba(255,255,255,0.6)",
                  }}
                />
              </span>
              <span className="text-[13px] font-medium tracking-wide text-white/90 group-hover:text-white transition-colors duration-300 font-sans">
                Welcome to my creative world
              </span>
            </div>
          </motion.button>
        </motion.div>
    </div>
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
    <div className="mb-3 flex items-center justify-center gap-3">
        {/* Grows outward away from the text (transformOrigin at the inner
            edge), starting at the same moment as the name's underline —
            ~1s after this row's own text has already faded in. */}
        <motion.span
          className="h-px w-8 md:w-12"
          style={{ background: "linear-gradient(90deg, transparent, rgba(198,155,63,0.85))", transformOrigin: "right" }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={show ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ scaleX: { duration: 1.4, delay: 2.0, ease: "easeInOut" }, opacity: { duration: 0.5, delay: 2.0, ease: "easeOut" } }}
        />
        <motion.span
          className="text-[13px] md:text-sm font-medium tracking-[0.32em] uppercase"
          initial={{ opacity: 0, y: 12 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
          style={{ color: "rgba(255,255,255,0.82)" }}
        >
          {greeting}, I&apos;m
        </motion.span>
        <motion.span
          className="h-px w-8 md:w-12"
          style={{ background: "linear-gradient(270deg, transparent, rgba(198,155,63,0.85))", transformOrigin: "left" }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={show ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ scaleX: { duration: 1.4, delay: 2.0, ease: "easeInOut" }, opacity: { duration: 0.5, delay: 2.0, ease: "easeOut" } }}
        />
    </div>
  )
}

// ─── Name Reveal ───────────────────────────────────────────────────────────────
function NameRevealAnimation({ showName }: { showName: boolean }) {
  const textRef = useRef<SVGTextElement>(null)
  const styleRef = useRef<HTMLStyleElement | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const hoverGradRef = useRef<SVGRadialGradientElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const rafRef = useRef<number | null>(null)

  const onNameMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (rafRef.current !== null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const svg = svgRef.current
      if (!svg) return
      const r = svg.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 1900
      const y = ((e.clientY - r.top) / r.height) * 220
      hoverGradRef.current?.setAttribute("cx", String(x))
      hoverGradRef.current?.setAttribute("cy", String(y))
    })
  }, [])

  const generateKeyframes = useCallback(() => `
    @keyframes stroke-draw {
      0%   { fill: transparent; stroke: rgba(226,240,255,0.85); stroke-dashoffset: 25%; stroke-dasharray: 0 50%; stroke-width: 0.4; opacity: 0; }
      50%  { fill: transparent; stroke: rgba(226,240,255,0.95); stroke-dashoffset: 0%; stroke-dasharray: 20% 0; stroke-width: 1; opacity: 1; }
      72%  { fill: transparent; stroke: rgba(226,240,255,0.9); stroke-width: 1; opacity: 1; }
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
      animate={showName ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.97, filter: "blur(4px)" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="flex flex-col items-center"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1900 220"
        className="w-[78vmin] h-auto max-w-[860px]"
        onMouseMove={onNameMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{ cursor: "default", userSelect: "none" }}
      >
        <defs>
          <linearGradient id="nameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#dce8fb" />
            <stop offset="100%" stopColor="#8ea3c2" />
          </linearGradient>
          <filter id="nameGlow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Antique metallic gold — the name's true material, kept hidden
              under the modern white fill above until the cursor reveals it.
              A banded gradient (dark shadow → bright specular → dark again)
              reads as real metal instead of a flat tint. */}
          <linearGradient id="nameAntiqueGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9c7a2e" />
            <stop offset="22%" stopColor="#e0ad54" />
            <stop offset="42%" stopColor="#fff3d4" />
            <stop offset="58%" stopColor="#f3d18a" />
            <stop offset="78%" stopColor="#c9a04a" />
            <stop offset="100%" stopColor="#e0ad54" />
          </linearGradient>
          {/* gold hover spotlight — position updated on mousemove, in viewBox
              units, so the reveal below tracks the cursor exactly. Single,
              modest radius — a subtle, contained reveal, not a dramatic one. */}
          <radialGradient
            ref={hoverGradRef}
            id="nameHoverGrad"
            gradientUnits="userSpaceOnUse"
            cx="950" cy="110" r="150"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          {/* the mask's own alpha comes only from the spotlight above, so the
              gold reveal is confined to wherever the cursor currently is */}
          <mask id="nameHoverMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1900" height="220">
            <rect x="0" y="0" width="1900" height="220" fill="url(#nameHoverGrad)" />
          </mask>
          {/* a soft glow halo merged behind the crisp gold glyphs — richer
              than a flat fill, still contained and tasteful */}
          <filter id="nameBloomSoft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <text
          ref={textRef}
          x="50%" y="50%" dy=".35em"
          textAnchor="middle"
          className="uppercase font-bold"
          style={{
            fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
            fontSize: "172px",
            fontWeight: 800,
            strokeLinejoin: "round",
            fill: "transparent",
            stroke: "transparent",
            opacity: 0,
            filter: "url(#nameGlow)",
            letterSpacing: "-0.005em",
            cursor: "default",
            userSelect: "none",
          }}
        >
          MAHIDHAR REDDY G
        </text>

        {/* antique gold reveal — identical glyph shape underneath the white
            name above. The cursor spotlight mask is the ONLY thing that
            makes it visible, so hovering subtly reveals the metallic gold
            beneath, never past the glyph outlines themselves. One quiet
            layer — restrained, not a dramatic spotlight. */}
        <text
          x="50%" y="50%" dy=".35em"
          textAnchor="middle"
          className="uppercase font-bold pointer-events-none"
          style={{
            fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
            fontSize: "172px",
            fontWeight: 800,
            letterSpacing: "-0.005em",
            fill: "url(#nameAntiqueGold)",
            opacity: isHovering ? 0.85 : 0,
            transition: "opacity 0.5s ease-out",
            filter: "url(#nameBloomSoft)",
          }}
          mask="url(#nameHoverMask)"
        >
          MAHIDHAR REDDY G
        </text>
      </svg>
      {/* gold accent rule beneath the name — scaleX from a center origin so
          it visibly draws outward from the middle, not left-to-right. Gated
          on showName, starting 1s after the name's own stroke-draw begins
          (that starts 100ms after showName, so 1.1s total) and running the
          same 3.5s duration. Same width as the roles pill. */}
      <motion.div
        className="h-px mt-1 w-[300px] sm:w-[340px] md:w-[380px]"
        style={{
          background: "linear-gradient(90deg, transparent, var(--gold-core) 20%, var(--gold-hi) 50%, var(--gold-core) 80%, transparent)",
          transformOrigin: "center",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={showName ? { scaleX: 1, opacity: 0.85 } : { scaleX: 0, opacity: 0 }}
        transition={{ scaleX: { duration: 3.5, delay: 1.1, ease: "easeInOut" }, opacity: { duration: 0.6, delay: 1.1, ease: "easeOut" } }}
      />
    </motion.div>
  )
}

// ─── Roles Decryption ─────────────────────────────────────────────────────────
function RolesDecryption({ showRoles }: { showRoles: boolean }) {
  const roles = [
    {
      label: "Full Stack Developer",
      icon: <path d="M8 6 2 12l6 6M16 6l6 6-6 6" />,
    },
    {
      label: "UI/UX Designer",
      icon: <path d="M12 19 19 12l3 3-7 7-3-3ZM17 14 15.5 6.5 3 4l2.5 12.5L13 19l4-5Z" />,
    },
    {
      label: "AI/ML Enthusiast",
      icon: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M12 1v4M12 19v4M1 12h4M19 12h4" /></>,
    },
    {
      label: "Creative Problem Solver",
      icon: <><path d="M9 18h6M10 22h4M15.09 14c.18-1.02.6-1.65 1.29-2.34A6 6 0 1 0 8.5 12c.32.55.55 1.15.7 1.66.14.51.22.87.31 1.34" /></>,
    },
    {
      label: "Digital Innovator",
      icon: <><path d="M12 2l1.7 4.8L18 8.5l-4.3 1.7L12 15l-1.7-4.8L6 8.5l4.3-1.7L12 2Z" /><path d="M19 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2L16 17l2.2-.8L19 14Z" /></>,
    },
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
      className="mt-4 flex items-center justify-center"
    >
      <div
        className="relative rounded-full"
        style={{
          padding: "1px",
          background: "rgba(255,255,255,0.09)",
          boxShadow: "0 0 0 1px rgba(200,147,46,0.16), 0 16px 36px -16px rgba(2,6,23,0.7), 0 8px 18px -6px rgba(0,0,0,0.55)",
        }}
      >
        <div
          className="relative z-10 flex items-center gap-3 rounded-full pl-3.5 pr-4 py-2 w-[300px] sm:w-[340px] md:w-[380px] overflow-hidden"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.04) 0%, rgba(var(--tc4-rgb),0.07) 55%, rgba(0,0,0,0.12) 100%)",
            backdropFilter: "blur(10px) saturate(120%)",
            WebkitBackdropFilter: "blur(10px) saturate(120%)",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
        {/* Specular highlight — same top-left glass catch-light the circles use */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 24% 20%, rgba(230,245,255,0.14) 0%, rgba(190,235,255,0.06) 22%, transparent 48%)",
          }}
        />
        {/* Ambient pool — same bottom blue glass pool the circles use */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 120%, rgba(var(--tc1-rgb),0.22) 0%, rgba(var(--tc1-rgb),0.06) 55%, transparent 80%)",
          }}
        />
        {/* a hint of gold warmth, kept sparing — the accent, not the material */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ opacity: 0.1, background: "radial-gradient(circle at 76% 84%, rgba(200,147,46,0.28) 0%, transparent 40%)" }}
        />

        {/* Top Inner Highlight */}
        <div className="absolute inset-0 rounded-full" style={{ boxShadow: "inset 0 2px 5px rgba(255,255,255,0.18)" }} />
        {/* Bottom Inner Depth */}
        <div className="absolute inset-0 rounded-full" style={{ boxShadow: "inset 0 -2px 5px rgba(0,0,0,0.15)" }} />

        {/* role icon — a glass roundel matching the pill's own material
            (same blue-tinted glass, not a dark gold disc), sized to feel
            proportionate to the pill's height rather than a small chip */}
        <span className="relative flex items-center justify-center shrink-0" style={{ width: "32px", height: "32px" }}>
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.16) 0%, rgba(var(--tc1-rgb),0.12) 45%, rgba(0,0,0,0.1) 100%)",
              backdropFilter: "blur(6px) saturate(120%)",
              WebkitBackdropFilter: "blur(6px) saturate(120%)",
              border: "1px solid rgba(224,173,84,0.35)",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.2)",
            }}
          />
          <AnimatePresence mode="wait">
            <motion.svg
              key={`icon-${currentRoleIndex}`}
              className="relative"
              width="17" height="17" viewBox="0 0 24 24" fill="none"
              stroke="var(--accent-2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 25 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {roles[currentRoleIndex].icon}
            </motion.svg>
          </AnimatePresence>
        </span>

        <div className="relative h-[26px] md:h-[30px] flex-1 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`wrap-${currentRoleIndex}`}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <HyperText
                triggerAnimation={triggerAnimation}
                animateOnHover={false}
                duration={2200}
                animationDirection="center-out"
                className="text-[15px] md:text-[17px] font-medium tracking-[0.04em] whitespace-nowrap"
                style={{ color: "rgba(255,255,255,0.95)", fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace", textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
                characterSet={["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]}
              >
                {roles[currentRoleIndex].label}
              </HyperText>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* role ticks — a quiet non-numeric progress read, the active one lit gold */}
        <div className="flex items-center gap-[3px] shrink-0 pl-2" style={{ borderLeft: "0.5px solid rgba(200,147,46,0.22)" }} aria-hidden>
          {roles.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-500"
              style={
                i === currentRoleIndex
                  ? { width: "10px", height: "3px", background: "var(--accent-2)", boxShadow: "0 0 5px rgba(224,173,84,0.7)" }
                  : { width: "3px", height: "3px", background: "rgba(255,255,255,0.18)" }
              }
            />
          ))}
        </div>

        {/* progress rule along the bottom edge — fills over the role's dwell time */}
        <motion.span
          key={`rule-${currentRoleIndex}`}
          className="absolute left-4 right-4 -bottom-px h-px rounded-full origin-left"
          style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-2))" }}
          initial={{ scaleX: 0, opacity: 0.9 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 6, ease: "linear" }}
          aria-hidden
        />
        </div>
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

  // HoverBorderGradient-style border — a bright highlight continuously
  // travels around the rim by sweeping the conic-gradient's own angle
  // (never a CSS transform rotate, which would swing this wide pill's
  // corners outside its own footprint). Always running, speeds up on hover.
  const borderRef = useRef<HTMLDivElement>(null)
  const hoveredRef = useRef(false)
  useEffect(() => {
    let angle = 0
    let raf: number
    let last = performance.now()
    const tick = (now: number) => {
      const dt = now - last
      last = now
      const speed = hoveredRef.current ? 90 : 30 // deg/sec
      angle = (angle + (speed * dt) / 1000) % 360
      if (borderRef.current) {
        borderRef.current.style.background = `conic-gradient(from ${angle}deg,
          rgba(122,95,34,0.3) 0deg,
          rgba(198,155,63,0.5) 70deg,
          #fff8e6 110deg,
          rgba(230,192,90,0.6) 150deg,
          rgba(122,95,34,0.25) 220deg,
          rgba(198,155,63,0.4) 300deg,
          rgba(122,95,34,0.3) 360deg)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ pointerEvents: show ? "auto" : "none" }}
        >
          <motion.button
            onClick={onClick}
            onHoverStart={() => { setHovered(true); hoveredRef.current = true }}
            onHoverEnd={() => { setHovered(false); hoveredRef.current = false }}
            whileTap={{ scale: 0.96 }}
            animate={{
              scale: hovered ? 1.02 : 1,
              boxShadow: hovered
                ? "0 20px 50px -12px rgba(0,0,0,0.55), 0 8px 22px -6px rgba(0,0,0,0.5)"
                : "0 10px 30px -10px rgba(0,0,0,0.4), 0 4px 14px -4px rgba(0,0,0,0.3)",
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative rounded-full"
            style={{ padding: "1.6px" }}
          >
            {/* the travelling gradient border */}
            <div ref={borderRef} className="absolute inset-0 rounded-full pointer-events-none" />

            <div
              className="group relative flex items-center gap-2.5 overflow-hidden rounded-full"
              style={{
                padding: "6px 7px 6px 20px",
                background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.04) 0%, rgba(var(--tc4-rgb),0.07) 55%, rgba(0,0,0,0.12) 100%)",
                backdropFilter: "blur(10px) saturate(120%)",
                WebkitBackdropFilter: "blur(10px) saturate(120%)",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
            {/* Specular highlight — same top-left glass catch-light the
                circles / roles pill use */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 24% 20%, rgba(230,245,255,0.14) 0%, rgba(190,235,255,0.06) 22%, transparent 48%)" }}
            />
            {/* Ambient pool — same bottom blue glass pool the circles / roles pill use */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(var(--tc1-rgb),0.22) 0%, rgba(var(--tc1-rgb),0.06) 55%, transparent 80%)" }}
            />
            {/* Liquid Glass Texture — glass only, no gold tint */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ opacity: hovered ? 0.22 : 0.1 }}
              transition={{ duration: 0.28 }}
              style={{
                background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18) 0%, transparent 50%)",
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
                  "linear-gradient(110deg, transparent 15%, rgba(255,255,255,0.14) 38%, rgba(255,255,255,0.18) 55%, rgba(255,255,255,0.06) 68%, transparent 85%)",
                filter: "blur(2px)",
              }}
            />

            {/* Top Inner Highlight */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "inset 0 2px 5px rgba(255,255,255,0.22)" }}
            />

            {/* Bottom Inner Depth */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "inset 0 -2px 5px rgba(0,0,0,0.2)" }}
            />

            {/* Text */}
            <span
              className="relative z-10 font-medium"
              style={{
                color: "#fff",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                textShadow: "0 1px 2px rgba(0,0,0,0.25)",
              }}
            >
              Let&apos;s Connect
            </span>

            {/* Icon disc — glass only, no gold fill on hover */}
            <motion.div
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
              className="relative z-10 flex items-center justify-center rounded-full overflow-hidden"
              style={{
                width: "34px",
                height: "34px",
                background: "rgba(255,255,255,0.06)",
                border: "0.5px solid rgba(255,255,255,0.24)",
              }}
            >
              {/* Specular Reflection */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ opacity: hovered ? 0.24 : 0.08 }}
                transition={{ duration: 0.28 }}
                style={{ background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35) 0%, transparent 50%)" }}
              />
              {/* Arrow - East (0°), Northeast (45°) on hover */}
              <motion.svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                animate={{ rotate: hovered ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="relative z-10"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
            </div>
          </motion.button>
        </motion.div>
    </div>
  )
}

// ─── Glass Circles (Full Apple Liquid Glass) ──────────────────────────────────
function GlassCircles({
  circleConfigs, animationDuration, startCircles
}: {
  circleConfigs: Array<{ size: string; startX: string; startY: string; delay: number; glowControls: ReturnType<typeof useAnimation> }>
  animationDuration: number
  startCircles: boolean
}) {
  const rings = [
    {
      baseOpacity: 0.5,
      bg: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.03) 0%, rgba(var(--tc4-rgb),0.05) 50%, rgba(0,0,0,0.1) 100%)",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(16px) saturate(120%)",
      innerTop: "inset 0 2px 10px rgba(255,255,255,0.1)",
      innerBottom: "inset 0 -2px 10px rgba(var(--tc1-rgb),0.15)",
      glow: "0 0 60px rgba(var(--tc5-rgb),0.15), inset 0 0 40px rgba(var(--tc5-rgb),0.1)",
      dropShadow: "0 40px 80px rgba(2,6,23,0.6), 0 20px 40px rgba(2,6,23,0.8)",
      ambientPool: "radial-gradient(ellipse at 50% 100%, rgba(var(--tc1-rgb),0.5) 0%, rgba(var(--tc1-rgb),0.15) 60%, transparent 85%)",
    },
    {
      baseOpacity: 0.65,
      bg: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.04) 0%, rgba(var(--tc4-rgb),0.06) 50%, rgba(0,0,0,0.05) 100%)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(10px) saturate(110%)",
      innerTop: "inset 0 1px 8px rgba(255,255,255,0.15)",
      innerBottom: "inset 0 -1px 8px rgba(var(--tc1-rgb),0.2)",
      glow: "0 0 40px rgba(var(--tc3-rgb),0.2), inset 0 0 30px rgba(var(--tc3-rgb),0.15)",
      dropShadow: "0 40px 80px rgba(2,6,23,0.7), 0 20px 40px rgba(2,6,23,0.8)",
      ambientPool: "radial-gradient(ellipse at 50% 100%, rgba(var(--tc1-rgb),0.4) 0%, rgba(var(--tc1-rgb),0.1) 50%, transparent 75%)",
    },
    {
      baseOpacity: 0.8,
      bg: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, rgba(var(--tc4-rgb),0.08) 100%)",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      backdropFilter: "blur(6px) saturate(100%)",
      innerTop: "inset 0 1px 5px rgba(255,255,255,0.2)",
      innerBottom: "inset 0 -1px 5px rgba(var(--tc1-rgb),0.25)",
      glow: "0 0 30px rgba(var(--tc1-rgb),0.25), inset 0 0 20px rgba(var(--tc1-rgb),0.2)",
      dropShadow: "0 50px 100px rgba(2,6,23,0.8), 0 25px 50px rgba(2,6,23,0.9)",
      ambientPool: "radial-gradient(ellipse at 50% 100%, rgba(var(--tc1-rgb),0.3) 0%, transparent 50%)",
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
            style={{ width: config.size, height: config.size, willChange: "transform" }}
            initial={{ x: config.startX, y: config.startY, scale: 0.75 }}
            animate={startCircles ? {
              x: [config.startX, "0%", "-50%"],
              y: [config.startY, "0%", "-50%"],
              scale: [0.75, 1.35, 1],
              transition: { duration: animationDuration, delay: config.delay, times: [0, 0.5, 1], ease: [0.25, 0.46, 0.45, 0.94] },
            } : {}}
          >
            {/* Top-left specular highlight - Stays static relative to light source */}
            <div className="absolute inset-0 rounded-full pointer-events-none border border-white/20"
              style={{
                background: "radial-gradient(ellipse at 26% 16%, rgba(230,245,255,0.18) 0%, rgba(190,235,255,0.08) 20%, transparent 45%)",
                zIndex: 2,
              }} />

            {/* Bottom ambient pool - Stays static relative to light source */}
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: ring.ambientPool,
                zIndex: 2,
              }} />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: ring.bg,
                border: ring.border,
                boxShadow: `${ring.glow}, ${ring.innerTop}, ${ring.innerBottom}, ${ring.dropShadow}`,
                backdropFilter: ring.backdropFilter,
                WebkitBackdropFilter: ring.backdropFilter,
                opacity: ring.baseOpacity,
                willChange: "transform, opacity",
              }}
              initial="initial"
              animate={startCircles ? {
                rotate: [360, 180, 0],
                opacity: [0, ring.baseOpacity * 0.7, ring.baseOpacity],
                transition: { duration: animationDuration, delay: config.delay, times: [0, 0.5, 1], ease: [0.25, 0.46, 0.45, 0.94] },
              } : {}}
              whileHover="hover"
            >

            {/* Animation glow target - Driven by intro sequence */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen"
              initial={{ opacity: 0 }}
              animate={config.glowControls}
              style={{
                boxShadow: "0 0 150px rgba(var(--tc3-rgb),0.7), 0 0 120px rgba(var(--tc5-rgb),0.8), 0 0 180px rgba(var(--tc4-rgb),0.7), 0 0 250px rgba(15,23,42,0.6)",
              }}
            />

            {/* Hover glow target - Decoupled for instant interactivity */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen"
              variants={{
                initial: { opacity: 0 },
                hover: { opacity: 1, transition: { duration: 0.05, ease: "easeOut" } }
              }}
              style={{
                boxShadow: "inset 0 0 150px rgba(var(--tc3-rgb),0.7), 0 0 140px rgba(var(--tc5-rgb),0.8), 0 0 220px rgba(var(--tc4-rgb),0.7), 0 0 350px rgba(15,23,42,0.6)",
                background: "radial-gradient(circle at 50% 50%, rgba(var(--tc3-rgb),0.5) 0%, transparent 95%)",
                backdropFilter: "saturate(250%) contrast(150%)",
              }}
            />
            </motion.div>
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
      {/* Left: identity mark */}
      <span className="lo-meta" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.3em" }}>MRG</span>

      {/* Right: live time */}
      <div className="lo-meta tabular-nums" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.16em" }}>{time}</div>
    </motion.div>
  )
}

// ─── Corner Registration Marks (observatory framing) ──────────────────────────
function CornerFrame() {
  const stroke = "rgba(120,170,255,0.22)"
  const goldStroke = "rgba(198,155,63,0.4)"
  const corner = (pos: string, d: string, color = stroke) => (
    <svg
      className={`absolute ${pos} z-30 pointer-events-none`}
      width="46" height="46" viewBox="0 0 46 46" fill="none"
    >
      <path d={d} stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 1.2 }}
      className="absolute inset-0 pointer-events-none"
    >
      {/* dual-tone: gold on the diagonal pair, blue on the other — a deliberate, restrained accent */}
      {corner("top-6 left-6", "M1 15 L1 1 L15 1", goldStroke)}
      {corner("top-6 right-6", "M45 15 L45 1 L31 1")}
      {corner("bottom-6 left-6", "M1 31 L1 45 L15 45")}
      {corner("bottom-6 right-6", "M45 31 L45 45 L31 45", goldStroke)}
    </motion.div>
  )
}

// ─── Scroll Cue ───────────────────────────────────────────────────────────────
function ScrollCue({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="lo-meta" style={{ letterSpacing: "0.3em" }}>Scroll</span>
          <div className="relative h-9 w-[22px] rounded-full" style={{ border: "1px solid var(--lo-hairline-strong)" }}>
            <motion.span
              className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sky-400"
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ boxShadow: "0 0 8px rgba(var(--tc2-rgb),0.8)" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Main HeroSection ─────────────────────────────────────────────────────────
export default function HeroSection({ onThemeToggle }: { onThemeToggle?: () => void }) {
  const [showBanner, setShowBanner] = useState(false)
  const [showGreeting, setShowGreeting] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showRoles, setShowRoles] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [startCircles, setStartCircles] = useState(false)
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



  useEffect(() => {
    let isMounted = true
    let timers: NodeJS.Timeout[] = []
    let glowTimer: NodeJS.Timeout

    let hasStarted = false

    const startAnimations = () => {
      if (hasStarted) return
      hasStarted = true
      
      setStartCircles(true)

      // The circles form over `animationDuration`, then run a staggered
      // per-circle glow before all three finally glow together at once —
      // that combined moment lands at (animationDuration + 0.3s) + 350ms +
      // 350ms + 1.5s ≈ animationDuration + 2.5s. Delaying the whole text/UI
      // sequence by that same amount means the name's 3.5s stroke-draw
      // (which starts 100ms after showName fires) finishes in the same
      // second as that synchronized three-circle glow, instead of ~2s early.
      const START_DELAY = 3200
      timers = [
        setTimeout(() => isMounted && setShowBanner(true), 700 + START_DELAY),
        setTimeout(() => isMounted && setShowGreeting(true), 850 + START_DELAY),
        setTimeout(() => isMounted && setShowName(true), 750 + START_DELAY),
        setTimeout(() => isMounted && setShowRoles(true), 2200 + START_DELAY),
        setTimeout(() => isMounted && setShowButton(true), 3000 + START_DELAY),
      ]

      glowTimer = setTimeout(async () => {
        if (!isMounted) return
        setAllArrivedGlow(true)

        const pulse: any = {
          opacity: [0, 1, 0],
          scale: 1,
          transition: { duration: 1.5, ease: "easeInOut" },
        }

        glowControls3.start(pulse)
        await new Promise<void>((r) => setTimeout(r, 350))
        if (!isMounted) return

        glowControls2.start(pulse)
        await new Promise<void>((r) => setTimeout(r, 350))
        if (!isMounted) return

        await glowControls1.start(pulse)
        if (!isMounted) return

        const finalPulse: any = {
          opacity: [0, 1, 0],
          scale: 1,
          transition: { duration: 2.0, ease: "easeInOut" },
        }
        await Promise.all([
          glowControls1.start(finalPulse),
          glowControls2.start(finalPulse),
          glowControls3.start(finalPulse),
        ])

        if (!isMounted) return
        setAllArrivedGlow(false)
        setIsIntroComplete(true)
      }, (animationDuration + 0.3) * 1000)
    }

    if (typeof window !== "undefined") {
      if (window.sessionStorage.getItem("preloaderComplete") === "true") {
        startAnimations()
      } else {
        window.addEventListener("preloaderDone", startAnimations)
      }
    }

    return () => {
      isMounted = false
      timers.forEach(clearTimeout)
      clearTimeout(glowTimer)
      if (typeof window !== "undefined") {
        window.removeEventListener("preloaderDone", startAnimations)
      }
    }
  }, [glowControls1, glowControls2, glowControls3, animationDuration])

  return (
    <>
      <section
        className="h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden"
        style={{ WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }}
      >
        <RichBackground />
        <StatusBar />
        <CornerFrame />

        <GlassCircles
          circleConfigs={circleConfigs}
          animationDuration={animationDuration}
          startCircles={startCircles}
        />

        <div className="relative z-20 text-center flex flex-col items-center"
          style={{ textRendering: "optimizeLegibility", transform: "translateY(-10px)" }}>
          <WelcomeBanner show={showBanner} onThemeToggle={onThemeToggle} />
          <StaticHello show={showGreeting} />
          <NameRevealAnimation showName={showName} />
          <RolesDecryption showRoles={showRoles} />
          <div className="mt-9">
            <LetsConnectButton show={showButton} onClick={() => setShowConnectModal(true)} />
          </div>
        </div>
      </section>

      <LetsConnectModal isOpen={showConnectModal} onClose={() => setShowConnectModal(false)} />
    </>
  )
}