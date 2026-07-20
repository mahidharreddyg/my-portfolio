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
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
          initial={{ y: 60, opacity: 0, scale: 1.05 }}
          animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: 60, opacity: 0, scale: 1.05 }}
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1,
          }}
          className="text-center"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
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
              initial={{ y: 40, opacity: 0, scale: 1.02 }}
              animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: 40, opacity: 0, scale: 1.02 }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              className=""
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}
