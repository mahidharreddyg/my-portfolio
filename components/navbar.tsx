"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, AnimatePresence } from "framer-motion"
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
      setIsVisible(scrollY.get() > heroHeight * 0.6)
    }

    const unsubscribe = scrollY.onChange(updateNavbarVisibility)
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
              className="relative bg-black/80 backdrop-blur-xl rounded-full px-6 py-4 flex items-center justify-between border border-cyan-800/50 shadow-2xl group transition-all duration-300"
            >
              {/* Profile Info */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-gray-700/50">
                  <Image
                    src="/profile_pic.PNG"
                    alt="Profile"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <h2 className="text-white font-semibold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                    Mahidhar Reddy
                  </h2>
                  {/* <div className="w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" /> */}
                  <motion.div
                className="w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
                  <span className="text-gray-400 text-sm font-medium">
                    Software Developer
                  </span>
                </div>
              </div>

              {/* Navigation + Copy Button */}
              <div className="hidden md:flex items-center gap-4 ml-32 relative z-10">
                <nav className="flex items-center gap-8">
                  {["About", "Skills", "Experience", "Projects", "Certifications"].map((item) => (
                    <div key={item} className="relative group/navitem">
                      <Link
                        href={`#${item.toLowerCase()}`}
                        className="text-gray-300 font-medium relative z-10 px-1
                          transition-all duration-500 hover:text-transparent
                          hover:bg-clip-text hover:bg-[linear-gradient(90deg,#00f2fe_0%,#4facfe_50%,#00f2fe_100%)]
                          hover:drop-shadow-[0_0_15px_rgba(79,172,254,0.6)]
                          group-hover/navitem:animate-[text-glitch_0.3s_linear_infinite]"
                      >
                        {item}
                      </Link>

                      <span
                        className="absolute left-0 -bottom-1 w-full h-[2px]
                          bg-[linear-gradient(90deg,transparent_0%,#4facfe_50%,transparent_100%)]
                          rounded-full scale-x-0 origin-left
                          transition-transform duration-500 shadow-[0_0_25px_-3px] shadow-blue-400/60
                          group-hover/navitem:scale-x-100 
                          group-hover/navitem:animate-[laser-sweep_1.5s_linear_infinite]"
                      />

                      <div
                        className="absolute -inset-2 rounded-lg bg-[radial-gradient(circle_at_center,#4facfe30_0%,transparent_70%)]
                          opacity-0 blur-[12px] transition-opacity duration-300 -z-10
                          group-hover/navitem:opacity-100 
                          group-hover/navitem:animate-[hologram-pulse_2s_linear_infinite]" 
                      />
                    </div>
                  ))}
                </nav>

                {/* Copy Button */}
                <motion.div className="relative z-10 ml-4">
                  <Button
                    onClick={copyEmail}
                    className="group relative overflow-hidden w-[150px] bg-gray-900/80 hover:bg-gray-800/90
                      text-cyan-300 hover:text-white border-2 border-cyan-400/30 hover:border-cyan-400/50
                      rounded-full px-7 py-2.5 transition-all duration-300 shadow-[0_0_20px_-5px_#00f2fe30]
                      hover:shadow-[0_0_30px_-5px_#4facfe60]"
                  >
                    {/* Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(79,172,254,0.1)_1px,transparent_1px),
                      linear-gradient(90deg,rgba(79,172,254,0.1)_1px,transparent_1px)]
                      bg-[size:8px_8px] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

                    <div className="flex items-center justify-center gap-2 relative z-10">
                      <motion.div 
                        animate={emailCopied ? { 
                          rotate: [0, 180, 360],
                          scale: [1, 1.2, 1]
                        } : { 
                          rotate: 0,
                          scale: 1
                        }} 
                        transition={{ duration: 0.7, times: [0, 0.5, 1] }}
                      >
                        {emailCopied ? (
                          <Mail className="h-5 w-5 text-cyan-400 animate-[icon-pulse_1s_ease-in-out_infinite]" />
                        ) : (
                          <Copy className="h-5 w-5 text-cyan-300 group-hover:text-cyan-400 transition-colors" />
                        )}
                      </motion.div>
                      <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        {emailCopied ? "Copied!" : "Copy Email"}
                      </span>
                    </div>

                    {/* Data Stream Animation */}
                    <div className="absolute inset-y-0 -left-4 w-12 bg-[linear-gradient(90deg,transparent_0%,#4facfe20_30%,transparent_70%)]
                      skew-x-[30deg] opacity-0 group-hover:opacity-100 group-hover:animate-[data-stream_1s_linear_infinite]
                      transition-opacity duration-300" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
