"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  const email = "mahidharreddyg@gmail.com" // Assuming this is the email based on context, or a placeholder

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="relative group flex items-center gap-2 px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
    >
      <span className="hidden sm:inline-block">mahidharreddyg@gmail.com</span>
      <span className="sm:hidden">Email</span>

      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-all duration-300 ${copied ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute top-0 left-0 text-green-400 transition-all duration-300 ${copied ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-white/10 backdrop-blur-md rounded text-white pointer-events-none"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
