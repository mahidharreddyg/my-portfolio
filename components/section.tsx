"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface SectionProps {
  id: string
  title: string
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function Section({ id, title, children, className = "", style }: SectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10px" })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transform-gpu ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Static background gradient — no infinite animation */}
      {!className.includes('bg-transparent') && (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-800">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
        </div>
      )}

      {/* Content container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0,
          }}
          className="text-center transform-gpu"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent transform-gpu"
            whileHover={{
              backgroundImage: "linear-gradient(to right, #3b82f6, #8b5cf6, #06b6d4)",
              scale: 1.05,
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h2>

          {children && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.05,
              }}
              className="transform-gpu"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}
