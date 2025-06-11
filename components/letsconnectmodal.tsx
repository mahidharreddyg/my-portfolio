"use client";

import { useState, useTransition } from "react";

const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mahidharreddyg",
    color: "#0077B5",
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/mahidharreddyg",
    color: "#333333",
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/its_mahi_473/",
    color: "#E4405F",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="7" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/its_mahi_473",
    color: "#1DA1F2",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M17.53 3.5h3.42l-7.47 8.53 8.8 10.47h-6.94l-5.43-6.47-6.2 6.47H2.25l7.98-8.33L1.5 3.5h7.06l4.87 5.8 6.1-5.8zm-1.2 16.2h1.89l-5.98-7.13-1.7 1.83 5.79 6.3zm-9.97-14.2 5.63 6.7 1.69-1.87-5.41-6.07H6.36z" fill="currentColor" />
      </svg>
    ),
  }
];

export default function FillAFormModal() {
  const [tab, setTab] = useState("quick");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isPending, startTransition] = useTransition();

  const MODAL_CONTENT_HEIGHT = 560;

  const handleTabChange = (newTab) => {
    if (newTab === tab) return;

    startTransition(() => {
      setTab(newTab);
    });
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex flex-col mx-auto w-full max-w-xl px-6 pb-6 sm:px-8 rounded-t-2xl border border-white/10 shadow-2xl bg-black/60 backdrop-blur-xl ring-1 ring-white/10"
      tabIndex={-1}
      style={{
        pointerEvents: "auto",
        minHeight: MODAL_CONTENT_HEIGHT,
        maxHeight: MODAL_CONTENT_HEIGHT,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      }}
    >
      <div className="mx-auto mt-6 mb-6 h-3 w-32 rounded-full bg-gray-300 shadow-lg border border-gray-200" />

      <div className="flex mt-2 mb-6 justify-center gap-6">
        {socials.map((social, index) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-link group relative"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="social-icon-container">
              <div
                className="social-icon-glow"
                style={{
                  background: `radial-gradient(circle, ${social.color}20 0%, transparent 70%)`
                }}
              />

              <div className="social-icon-main">
                <span className="sr-only">{social.name}</span>
                {social.icon}
              </div>

              <div
                className="social-icon-ripple"
                style={{
                  borderColor: social.color
                }}
              />

              <div className="social-icon-tooltip">
                {social.name}
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="h-12 items-center justify-center rounded-xl p-[3px] grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm mb-6 relative overflow-hidden">
          <div
            className="absolute inset-y-[3px] rounded-lg bg-black/40 shadow will-change-transform"
            style={{
              width: 'calc(50% - 3px)',
              left: tab === "quick" ? '3px' : 'calc(50% + 0px)',
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: isPending
                ? `scaleX(1.08) scaleY(0.92) ${tab === "quick" ? 'translateX(-3px)' : 'translateX(3px)'}`
                : 'scaleX(1) scaleY(1) translateX(0px)',
              borderRadius: isPending ? '16px 4px 16px 4px' : '8px',
              opacity: isPending ? 0.8 : 1,
              boxShadow: isPending
                ? '0 8px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                : '0 4px 15px rgba(0, 0, 0, 0.2)',
              animation: isPending ? 'smoothMorph 0.5s ease-out' : 'none'
            }}
          />
          <button
            type="button"
            onClick={() => handleTabChange("quick")}
            className={`relative z-10 inline-flex h-[calc(100%-2px)] flex-1 items-center justify-center gap-1.5 rounded-lg border border-transparent px-2 py-1 text-base font-medium whitespace-nowrap cursor-pointer will-change-transform transition-all duration-500 ${tab === "quick"
                ? "text-white"
                : "text-neutral-300"
              }`}
            style={{
              transform: isPending
                ? (tab === "quick" ? 'scale(1.03) translateY(-0.5px)' : 'scale(0.97) translateY(0.5px)')
                : 'scale(1) translateY(0px)',
              filter: isPending ? 'brightness(0.9)' : 'brightness(1)'
            }}
          >
            <span
              style={{
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: isPending ? 'translateY(-0.5px) scale(0.98)' : 'translateY(0px) scale(1)',
                opacity: isPending ? 0.8 : 1
              }}
            >
              Quick connect
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("form")}
            className={`relative z-10 inline-flex h-[calc(100%-2px)] flex-1 items-center justify-center gap-1.5 rounded-lg border border-transparent px-2 py-1 text-base font-medium whitespace-nowrap cursor-pointer will-change-transform transition-all duration-500 ${tab === "form"
                ? "text-white"
                : "text-neutral-300"
              }`}
            style={{
              transform: isPending
                ? (tab === "form" ? 'scale(1.03) translateY(-0.5px)' : 'scale(0.97) translateY(0.5px)')
                : 'scale(1) translateY(0px)',
              filter: isPending ? 'brightness(0.9)' : 'brightness(1)'
            }}
          >
            <span
              style={{
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: isPending ? 'translateY(-0.5px) scale(0.98)' : 'translateY(0px) scale(1)',
                opacity: isPending ? 0.8 : 1
              }}
            >
              Fill a form
            </span>
          </button>
        </div>

        <div className="flex-1 outline-none flex flex-col justify-between relative overflow-hidden" style={{ minHeight: MODAL_CONTENT_HEIGHT - 160 }}>
          <div
            className="will-change-transform"
            style={{
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: isPending ? 'scale(0.98) translateY(4px)' : 'scale(1) translateY(0px)',
              opacity: isPending ? 0.6 : 1,
              filter: isPending ? 'blur(0.5px)' : 'blur(0px)'
            }}
          >
            {tab === "form" && (
              <div
                style={{
                  animation: !isPending ? 'fadeInUp 0.5s ease-out' : 'none'
                }}
              >
                <form className="flex flex-col flex-1 h-full">
                  <div className="flex gap-6 mb-5">
                    <div className="flex-1" style={{ animation: !isPending ? 'fadeInUp 0.5s ease-out 0.1s both' : 'none' }}>
                      <label className="block mb-2 font-semibold text-white text-base">Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        required
                        className="w-full rounded-lg px-4 py-2 bg-black/40 border border-white/10 text-white text-base placeholder-neutral-500 outline-none focus:border-blue-500 transition"
                      />
                    </div>
                    <div className="flex-1" style={{ animation: !isPending ? 'fadeInUp 0.5s ease-out 0.2s both' : 'none' }}>
                      <label className="block mb-2 font-semibold text-white text-base">Email</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="your.email@example.com"
                        required
                        className="w-full rounded-lg px-4 py-2 bg-black/40 border border-white/10 text-white text-base placeholder-neutral-500 outline-none focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  <div className="mb-4 flex flex-col" style={{ animation: !isPending ? 'fadeInUp 0.5s ease-out 0.3s both' : 'none' }}>
                    <label className="block mb-2 font-semibold text-white text-base">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="What would you like to discuss?"
                      required
                      maxLength={1000}
                      className="w-full rounded-lg px-4 py-2 bg-black/40 border border-white/10 text-white text-base placeholder-neutral-500 outline-none focus:border-blue-500 transition min-h-[100px] resize-none"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-neutral-500">Characters</span>
                      <span className="text-xs text-neutral-500">{form.message.length}/1000</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="relative group w-full py-3 mt-2 rounded-2xl text-white font-semibold text-base flex items-center justify-center gap-2 shadow-xl transition-all duration-300 border border-white/10 backdrop-blur-sm overflow-hidden"
                    style={{
                      minHeight: 48,
                      letterSpacing: "0.01em",
                      background: "linear-gradient(90deg, #010202 0%, #0B1D49 50%, #010202 100%)",
                      animation: !isPending ? 'fadeInUp 0.5s ease-out 0.4s both' : 'none'
                    }}
                  >
                    <div className="h-[120px] w-10 bg-gradient-to-r from-white/10 via-white/50 to-white/10 absolute blur-sm -rotate-45 -left-16 group-hover:left-[150%] duration-700 delay-200" />
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path d="M3 20L21 12L3 4V10L15 12L3 14V20Z" />
                    </svg>
                    <span className="relative z-10">Send message</span>
                  </button>
                </form>
              </div>
            )}

            {tab === "quick" && (
              <div
                className="flex flex-col h-full"
                style={{
                  animation: !isPending ? 'fadeInUp 0.5s ease-out' : 'none'
                }}
              >
                <div className="mb-4 sm:mb-6"></div>
                
                <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2 mb-3 sm:mb-4">
                  <a
                    className="group contact-card block overflow-hidden rounded-lg border border-white/10 bg-black/30 shadow-sm transition-all duration-500 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-900/20 relative"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Email"
                    href="mailto:mahidhar.reddy2003@gmail.com"
                    style={{ 
                      animation: !isPending ? 'fadeInUp 0.5s ease-out 0.1s both' : 'none',
                      minHeight: '100px'
                    }}
                  >
                    <div className="contact-glow absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100" />
                    <div className="contact-shimmer absolute inset-0 opacity-0 group-hover:opacity-100" />

                    <div className="flex gap-x-3 border-b border-white/10 bg-gradient-to-r from-blue-900/40 to-black/50 p-3 sm:p-4 relative z-10 group-hover:from-blue-800/60 group-hover:to-blue-900/30 transition-all duration-500">
                      <div className="flex items-center gap-2">
                        <div className="contact-icon-container">
                          <svg
                            width="16"
                            height="16"
                            className="sm:w-[18px] sm:h-[18px] contact-icon text-blue-400 group-hover:text-blue-300 transition-all duration-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                        </div>
                        <h3 className="text-sm sm:text-base font-medium text-white group-hover:text-blue-100 transition-all duration-500">Email</h3>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 relative z-10">
                      <div className="flex items-center text-xs sm:text-sm font-medium text-neutral-200 transition-all duration-500 group-hover:text-white group-hover:translate-x-1">
                        <span className="truncate">mahidhar.reddy2003@gmail.com</span>
                        <svg
                          width="12"
                          height="12"
                          className="sm:w-[14px] sm:h-[14px] ml-2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17L17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </div>
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-neutral-400 group-hover:text-neutral-300 transition-all duration-500">Send me an email directly</p>
                    </div>
                  </a>

                  <a
                    className="group contact-card block overflow-hidden rounded-lg border border-white/10 bg-black/30 shadow-sm transition-all duration-500 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-900/20 relative"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Calendar"
                    href="https://cal.com/mahidharreddyg"
                    style={{ 
                      animation: !isPending ? 'fadeInUp 0.5s ease-out 0.2s both' : 'none',
                      minHeight: '100px'
                    }}
                  >
                    <div className="contact-glow-purple absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100" />
                    <div className="contact-shimmer absolute inset-0 opacity-0 group-hover:opacity-100" />

                    <div className="flex gap-x-3 border-b border-white/10 bg-gradient-to-r from-purple-900/40 to-black/50 p-3 sm:p-4 relative z-10 group-hover:from-purple-800/60 group-hover:to-purple-900/30 transition-all duration-500">
                      <div className="flex items-center gap-2">
                        <div className="contact-icon-container">
                          <svg
                            width="16"
                            height="16"
                            className="sm:w-[18px] sm:h-[18px] contact-icon text-purple-400 group-hover:text-purple-300 transition-all duration-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        </div>
                        <h3 className="text-sm sm:text-base font-medium text-white group-hover:text-purple-100 transition-all duration-500">Schedule</h3>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 relative z-10">
                      <div className="flex items-center text-xs sm:text-sm font-medium text-neutral-200 transition-all duration-500 group-hover:text-white group-hover:translate-x-1">
                        Book a meeting
                        <svg
                          width="12"
                          height="12"
                          className="sm:w-[14px] sm:h-[14px] ml-2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17L17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </div>
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-neutral-400 group-hover:text-neutral-300 transition-all duration-500">Schedule a call with me</p>
                    </div>
                  </a>
                </div>

                <div
                  className="availability-status relative group flex items-center justify-center gap-2 sm:gap-3 w-full py-2.5 sm:py-3 mt-3 sm:mt-4 rounded-2xl border border-green-400/40 px-4 sm:px-6 overflow-hidden"
                  style={{
                    color: "#D6FFE2",
                    background: "linear-gradient(90deg, #010202 0%, #062806 50%, #010202 100%)",
                    animation: !isPending ? 'fadeInUp 0.5s ease-out 0.3s both' : 'none',
                    minHeight: 44,
                    letterSpacing: "0.01em"
                  }}
                >
                  <div className="availability-shimmer absolute inset-0 opacity-0 group-hover:opacity-100" />
                  <div className="availability-glow absolute inset-0 opacity-60 group-hover:opacity-100 transition-all duration-500" />

                  <div className="status-indicator relative z-10">
                    <svg
                      width="12"
                      height="12"
                      className="sm:w-[14px] sm:h-[14px] flex-shrink-0"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="7" cy="7" r="7" fill="#4ADE80" className="animate-pulse" />
                      <circle cx="7" cy="7" r="3" fill="#22C55E" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base font-semibold relative z-10 group-hover:text-green-100 transition-all duration-500 text-center leading-tight">
                    Currently available for new opportunities
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .social-icon-link {
          animation: socialIconFloat 0.6s ease-out both;
        }

        .social-icon-container {
          position: relative;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-icon-glow {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform: scale(0.8);
          z-index: 0;
        }

        .social-icon-main {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a1a1aa;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 2;
          overflow: hidden;
        }

        .social-icon-main::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .social-icon-ripple {
          position: absolute;
          inset: -2px;
          border-radius: 14px;
          border: 2px solid transparent;
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 1;
        }

        .social-icon-tooltip {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 10;
        }

        .social-icon-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: rgba(0, 0, 0, 0.9);
        }

        .social-icon-link:hover .social-icon-glow {
          opacity: 1;
          transform: scale(1.1);
        }

        .social-icon-link:hover .social-icon-main {
          transform: translateY(-3px) scale(1.05);
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          color: white;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .social-icon-link:hover .social-icon-main::before {
          opacity: 1;
        }

        .social-icon-link:hover .social-icon-ripple {
          opacity: 0.6;
          transform: scale(1.1);
        }

        .social-icon-link:hover .social-icon-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .social-icon-link:hover .social-icon-main svg {
          filter: drop-shadow(0 0 8px currentColor);
        }

        .contact-card {
          position: relative;
          transform-style: preserve-3d;
        }

        .contact-card:hover {
          transform: translateY(-4px) scale(1.02);
        }

        .contact-glow {
          background: radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
          filter: blur(20px);
        }

        .contact-glow-purple {
          background: radial-gradient(circle at center, rgba(147, 51, 234, 0.15) 0%, transparent 70%);
          filter: blur(20px);
        }

        .contact-shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          transform: translateX(-100%);
          transition: transform 0.8s ease-out;
        }

        .contact-card:hover .contact-shimmer {
          transform: translateX(100%);
        }

        .contact-icon-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact-icon {
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .contact-card:hover .contact-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .availability-status {
          position: relative;
          overflow: hidden;
        }

        .availability-status:hover {
          transform: translateY(-2px) scale(1.01);
          border-color: rgba(34, 197, 94, 0.6);
          box-shadow: none !important;
        }

        .availability-shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 100%
          );
          transform: translateX(-100%);
          transition: transform 1s ease-out;
        }

        .availability-status:hover .availability-shimmer {
          transform: translateX(100%);
        }

        .availability-glow {
          background: radial-gradient(
            ellipse at center,
            rgba(34, 197, 94, 0.1) 0%,
            transparent 70%
          );
          filter: blur(15px);
        }

        .status-indicator {
          position: relative;
        }

        .status-indicator::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .availability-status:hover .status-indicator::before {
          opacity: 1;
          animation: statusPulse 2s infinite;
        }

        @keyframes statusPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.1; }
        }

        @keyframes socialIconFloat {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.8); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0px) scale(1); 
          }
        }

        @keyframes smoothMorph {
          0% { transform: scaleX(1) scaleY(1); border-radius: 8px; }
          50% { transform: scaleX(1.12) scaleY(0.88); border-radius: 20px 2px 20px 2px; }
          100% { transform: scaleX(1.08) scaleY(0.92); border-radius: 16px 4px 16px 4px; }
        }

        @keyframes fadeInUp {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0px) scale(1); 
          }
        }
      `}</style>
    </div>
  );
}
