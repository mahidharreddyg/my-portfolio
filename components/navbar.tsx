"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Copy, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const { scrollY } = useScroll()

  const heroHeight = 600

  useEffect(() => {
    const updateNavbarVisibility = () => {
      if (scrollY.get() > heroHeight * 0.6) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    const unsubscribe = scrollY.onChange(updateNavbarVisibility)
    return () => unsubscribe()
  }, [scrollY])

  const copyEmail = async () => {
    await navigator.clipboard.writeText("mahidhar@example.com")
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  // Navbar animations
  const navbarY = useTransform(scrollY, [heroHeight * 0.6, heroHeight * 0.8], [-100, 0])
  const navbarOpacity = useTransform(scrollY, [heroHeight * 0.6, heroHeight * 0.8], [0, 1])

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
              className="relative bg-black/80 backdrop-blur-xl rounded-full px-6 py-4 flex items-center justify-between border border-gray-800/50 shadow-2xl"
              whileHover={{
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.1)",
                borderColor: "rgba(59, 130, 246, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center gap-4 relative z-10">
                <motion.div
                  layoutId="profile-image"
                  className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-gray-700/50 group"
                  whileHover={{
                    scale: 1.1,
                    borderColor: "rgba(59, 130, 246, 0.5)",
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Profile"
                    width={48}
                    height={48}
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                <motion.div layoutId="name-title" className="flex items-center gap-3">
                  <motion.h2
                    className="text-white font-semibold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text"
                    whileHover={{
                      backgroundImage: "linear-gradient(to right, #3b82f6, #8b5cf6, #06b6d4)",
                      scale: 1.05,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Mahidhar
                  </motion.h2>
                  <motion.div
                    className="w-1 h-1 bg-blue-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.span
                    className="text-gray-400 text-sm font-medium"
                    whileHover={{
                      color: "#60a5fa",
                      scale: 1.05,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Software Developer
                  </motion.span>
                </motion.div>
              </div>

              <nav className="hidden md:flex items-center gap-8 relative z-10">
                {["About", "Skills", "Experience", "Projects", "Certifications"].map((item) => (
                  <motion.div key={item} className="relative group">
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-300 hover:text-white transition-colors font-medium relative z-10"
                    >
                      {item}
                    </Link>
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur-sm"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 origin-left"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </nav>

              <motion.div className="relative z-10">
                <Button
                  onClick={copyEmail}
                  className="group relative overflow-hidden bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700/50 hover:border-blue-500/50 rounded-full px-4 py-2 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <div className="flex items-center gap-2 relative z-10">
                    <motion.div animate={emailCopied ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 0.5 }}>
                      {emailCopied ? <Mail className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </motion.div>
                    <span className="text-sm font-medium">{emailCopied ? "Copied!" : "Copy Email"}</span>
                  </div>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
