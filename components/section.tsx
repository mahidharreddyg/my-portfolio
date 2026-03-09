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
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transform-gpu backface-hidden will-change-transform ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated background gradient */}
      {!className.includes('bg-transparent') && (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-800">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 will-change-transform"
            animate={isInView ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            } : { backgroundPosition: "0% 50%" }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
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
          className="text-center will-change-transform transform-gpu"
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
              className="will-change-transform transform-gpu"
            >
              {children}
            </motion.div>
          )}
        </motion.div>

        {/* Decorative elements */}
        {isInView && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl will-change-transform"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        )}
      </div>
    </motion.section>
  )
}
