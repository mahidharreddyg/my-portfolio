"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Copy, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlassSurface from "./GlassSurface"

export default function Navbar({ isMonochrome = false }: { isMonochrome?: boolean }) {
  const [isVisible, setIsVisible] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const { scrollY } = useScroll()

  const heroHeight = 600

  useEffect(() => {
    const updateNavbarVisibility = () => {
      setIsVisible(scrollY.get() > heroHeight * 0.6)
    }

    const unsubscribe = scrollY.on("change", updateNavbarVisibility)
    return () => unsubscribe()
  }, [scrollY])

  const copyEmail = async () => {
    await navigator.clipboard.writeText("mahidhar.reddy2003@gmail.com")
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className={`relative rounded-full px-5 py-2 flex items-center justify-between shadow-2xl group transition-all duration-300 border border-white/15`}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(12px) saturate(180%)',
                WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.18), inset 0 -1px 0 rgba(255, 255, 255, 0.04)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Liquid Glass Highlight Layer */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `
                    linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
                    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)
                  `,
                  opacity: 0.8,
                }}
              />

              {/* Specular Reflection */}
              <div
                className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, transparent 100%)',
                }}
              />

              {/* Depth Shadow Layer */}
              <div
                className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none rounded-b-full z-0"
                style={{
                  background: "linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent)",
                }}
              />

              <div className="w-full h-full flex items-center justify-between px-1.5">
                {/* Profile Info */}
                <div className="flex items-center gap-3 relative z-10">
                  <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/15">
                    <Image
                      src="/profile_pic.PNG"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-white font-semibold text-[15px] tracking-tight">
                      Mahidhar Reddy
                    </h2>
                    {/* Status dot — antique gold, the site's one warm accent */}
                    <motion.div
                      className="relative flex items-center justify-center"
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.85, 1, 0.85],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {/* Glowing gold outer ring */}
                      <span
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                          background: "radial-gradient(circle, rgba(224,173,84,0.65) 0%, rgba(224,173,84,0.25) 50%, transparent 80%)",
                          boxShadow: "0 0 9px rgba(224,173,84,0.7)"
                        }}
                      />
                      {/* Inner solid gold dot */}
                      <span className="relative w-1.5 h-1.5 rounded-full"
                        style={{
                          background: "var(--accent-2)",
                          boxShadow: "0 0 6px rgba(224,173,84,0.8), inset 0 0 3px rgba(255,255,255,0.8)"
                        }} />
                    </motion.div>
                    <span className="text-gray-400 text-[13px] font-medium">
                      Software Developer
                    </span>
                  </div>
                </div>

                {/* Navigation + Copy Button */}
                <div className="hidden md:flex items-center gap-6 relative z-10">
                  <nav className="flex items-center gap-8">
                    {["About", "Experience", "Skills", "Projects", "Certifications"].map((item) => (
                      <div key={item} className="relative group/navitem">
                        <Link
                          href={`#${item.toLowerCase()}`}
                          className="text-gray-300 font-medium relative z-10 px-1
                           transition-all duration-500 hover:text-transparent
                           hover:bg-clip-text hover:bg-[linear-gradient(90deg,rgb(var(--tc2-rgb))_0%,rgb(var(--tc10-rgb))_50%,rgb(var(--tc2-rgb))_100%)]
                           hover:drop-shadow-[0_0_15px_rgba(var(--tc10-rgb),0.6)]
                           group-hover/navitem:animate-[text-glitch_0.3s_linear_infinite]"
                        >
                          {item}
                        </Link>

                        <span
                          className="absolute left-0 -bottom-1 w-full h-[2px]
                          bg-[linear-gradient(90deg,transparent_0%,rgb(var(--tc10-rgb))_50%,transparent_100%)]
                          rounded-full scale-x-0 origin-left
                          transition-transform duration-500 shadow-[0_0_25px_-3px] shadow-blue-400/60
                          group-hover/navitem:scale-x-100
                          group-hover/navitem:animate-[laser-sweep_1.5s_linear_infinite]"
                        />

                        <div
                          className="absolute -inset-2 rounded-lg bg-[radial-gradient(circle_at_center,rgba(var(--tc10-rgb),0.19)_0%,transparent_70%)]
                          opacity-0 blur-[12px] transition-opacity duration-300 -z-10
                          group-hover/navitem:opacity-100
                          group-hover/navitem:animate-[hologram-pulse_2s_linear_infinite]"
                        />
                      </div>
                    ))}
                  </nav>

                  {/* Copy Button — sleek */}
                  <Button
                    onClick={copyEmail}
                    className="group relative overflow-hidden bg-white/[0.04] hover:bg-white/[0.08]
                    text-cyan-200 hover:text-white border border-cyan-400/25 hover:border-cyan-400/45
                    rounded-full pl-4 pr-4 py-2 h-auto transition-all duration-300 shadow-none"
                  >
                    <div className="flex items-center justify-center gap-2 relative z-10">
                      <motion.div
                        animate={emailCopied ? { rotate: [0, 180, 360], scale: [1, 1.15, 1] } : { rotate: 0, scale: 1 }}
                        transition={{ duration: 0.7, times: [0, 0.5, 1] }}
                      >
                        {emailCopied
                          ? <Mail className="h-4 w-4 text-cyan-400" />
                          : <Copy className="h-4 w-4 text-cyan-300 group-hover:text-cyan-400 transition-colors" />}
                      </motion.div>
                      <span className="text-[13px] font-medium">
                        {emailCopied ? "Copied!" : "Copy Email"}
                      </span>
                    </div>
                    {/* subtle shine sweep on hover */}
                    <div className="absolute inset-y-0 -left-6 w-16 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/10 to-transparent
                    opacity-0 group-hover:opacity-100 group-hover:translate-x-[220%] transition-all duration-700 ease-out" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
