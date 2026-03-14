"use client";

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   GLASS
───────────────────────────────────────────────────────────── */
const glass: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(3px) saturate(200%)",
  WebkitBackdropFilter: "blur(3px) saturate(200%)",
  border: "1px solid rgba(255,255,255,0.15)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.2),inset 0 -1px 0 rgba(255,255,255,0.05)",
};

const GlassHighlight = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]">
    <div className="absolute inset-0" style={{
      background: "linear-gradient(135deg,rgba(255,255,255,0.08) 0%,transparent 50%),radial-gradient(circle at 30% 20%,rgba(255,255,255,0.12) 0%,transparent 60%)",
      opacity: 0.8,
    }} />
    <div className="absolute top-0 left-0 right-0 h-1/2" style={{
      background: "linear-gradient(180deg,rgba(255,255,255,0.06) 0%,transparent 100%)"
    }} />
  </div>
);

/* ─────────────────────────────────────────────────────────────
   TECH LOGO
───────────────────────────────────────────────────────────── */
const TechLogo = ({ name }: { name: string }) => {
  const map: Record<string, string> = {
    "Python": "python.svg",
    "JavaScript": "js.svg",
    "TypeScript": "typescript.svg",
    "Java": "java.svg",
    "Go": "go.svg",
    "Swift": "swift.svg",
    "Next.js": "nextjs2.svg",
    "React": "react.svg",
    "Node.js": "nodejs.svg",
    "Express.js": "expressjs.svg",
    "Spring Boot": "simple-icons_springboot.svg",
    "GraphQL": "graphql.svg",
    "Bootstrap": "bootstrap5.svg",
    "Vercel": "vercel.svg",
    "PostgreSQL": "postgresql.svg",
    "MySQL": "mysql.svg",
    "MongoDB": "mongodb.svg",
    "Redis": "redis.svg",
    "AWS": "aws.svg",
    "Docker": "docker.svg",
    "Kubernetes": "kubernetes.svg",
    "TensorFlow": "tensorflow.svg",
    "PyTorch": "pytorch.svg",
    "Pandas": "pandas.svg",
    "Scikit-Learn": "scikitlearn.svg",
    "OpenCV": "opencv.svg",
    "Figma": "figma.svg",
    "Power BI": "powerBI.svg",
  };

  const fileName = map[name];
  if (!fileName) {
    return <span style={{ fontSize: 9, color: "white", fontFamily: "'JetBrains Mono',monospace", fontWeight: "bold" }}>{name.slice(0, 2).toUpperCase()}</span>;
  }

  return (
    <img
      src={`/icons/coloured/${fileName}`}
      alt={name}
      className="w-3 h-3 object-contain transition-all duration-300 group-hover:scale-110"
    />
  );
};

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const TECH_ROW_1 = ["Python", "JavaScript", "TypeScript", "Java", "Go", "Swift", "Next.js", "React"];
const TECH_ROW_2 = ["Node.js", "Express.js", "Spring Boot", "GraphQL", "Bootstrap", "Vercel"];
const TECH_ROW_3 = ["PostgreSQL", "MySQL", "MongoDB", "Redis", "AWS", "Docker", "Kubernetes"];
const TECH_ROW_4 = ["TensorFlow", "PyTorch", "Pandas", "Scikit-Learn", "OpenCV", "Figma", "Power BI"];
const ALL_TECH = [...TECH_ROW_1, ...TECH_ROW_2, ...TECH_ROW_3, ...TECH_ROW_4];

const projects = [
  {
    id: 1, name: "StarForge", subtitle: "AI SaaS Template", year: "2024", type: "SaaS Product",
    status: "DEPLOYED", ping: "42ms", commits: "347",
    description: "A sleek and modern AI SaaS landing page built for performance and visual impact. Smooth parallax interactions that captivate users from the first scroll.",
    bullets: ["Built with React and Vite for fast, scalable development", "Fully responsive layouts via Tailwind CSS", "Smooth animations with react-just-parallax"],
    usedTech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Framer Motion"],
    accentColor: "#e91e8c", accentRgb: "233,30,140", bgGlow: "rgba(233,30,140,0.15)",
    tagActive: { bg: "rgba(233,30,140,0.15)", border: "rgba(233,30,140,0.5)", text: "#f472b6" },
    cardGrad: "linear-gradient(145deg,#0f0118 0%,#2d0845 45%,#6b1060 75%,#a01050 100%)",
    hexCoord: "0x4F2A",
  },
  {
    id: 2, name: "RuneAI", subtitle: "Intelligent AI Assistant", year: "2024", type: "AI Application",
    status: "LIVE", ping: "18ms", commits: "892",
    description: "AI assistant with RAG system, three specialized models and 500K context limit. Advanced Web Search and intelligent Tool Calling automation.",
    bullets: ["Three models: Fast (Groq), Thinking (Gemini), and Pro", "500K context limit for deep document analysis", "Advanced Web Search with automated Tool Calling"],
    usedTech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Python", "LangChain", "OpenAI", "Framer Motion"],
    accentColor: "#f97316", accentRgb: "249,115,22", bgGlow: "rgba(249,115,22,0.15)",
    tagActive: { bg: "rgba(249,115,22,0.15)", border: "rgba(249,115,22,0.5)", text: "#fb923c" },
    cardGrad: "linear-gradient(145deg,#0d0500 0%,#3d1200 45%,#7c2d12 75%,#c2440a 100%)",
    hexCoord: "0x7C1E",
  },
  {
    id: 3, name: "SUS Goals", subtitle: "Sustainability Platform", year: "2023", type: "Side Project",
    status: "STABLE", ping: "67ms", commits: "214",
    description: "College project promoting SDGs. Daily eco-tasks for users with a live global counter tracking sustainable actions worldwide.",
    bullets: ["Daily SDG tasks promoting sustainable habits", "Global counter tracking eco-actions in real time", "AI-powered personalised recommendations"],
    usedTech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase", "MongoDB", "Python", "Figma"],
    accentColor: "#22c55e", accentRgb: "34,197,94", bgGlow: "rgba(34,197,94,0.12)",
    tagActive: { bg: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.5)", text: "#4ade80" },
    cardGrad: "linear-gradient(145deg,#000d04 0%,#052010 45%,#14532d 75%,#1a7a40 100%)",
    hexCoord: "0x3B9F",
  },
];

/* ─────────────────────────────────────────────────────────────
   ANIMATED TICKER (cycles chars before settling)
───────────────────────────────────────────────────────────── */
function GlitchText({ value, className, style }: { value: string; className?: string; style?: React.CSSProperties }) {
  const [display, setDisplay] = useState(value);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_-";
  useEffect(() => {
    let frame = 0;
    const total = 12;
    const id = setInterval(() => {
      if (frame >= total) { setDisplay(value); clearInterval(id); return; }
      setDisplay(value.split("").map((ch, i) =>
        i < Math.floor((frame / total) * value.length) ? ch : chars[Math.floor(Math.random() * chars.length)]
      ).join(""));
      frame++;
    }, 35);
    return () => clearInterval(id);
  }, [value]);
  return <span className={className} style={style}>{display}</span>;
}

/* ─────────────────────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────────────────────── */
function ProjectCard({ p }: { p: typeof projects[0] }) {
  return (
    <div className="relative rounded-2xl overflow-hidden w-full h-full" style={{
      background: p.cardGrad,
      border: `1px solid rgba(${p.accentRgb},0.35)`,
      boxShadow: `0 0 60px rgba(${p.accentRgb},0.2), 0 40px 80px rgba(0,0,0,0.7)`,
    }}>

      {/* CRT scanlines */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{
        background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)",
      }} />

      {/* Noise grain */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none z-10"><filter id={`n${p.id}`}><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter><rect width="100%" height="100%" filter={`url(#n${p.id})`} /></svg>

      {/* Corner brackets — all four */}
      {[["top-3 left-3", "tl"], ["top-3 right-3", "tr"], ["bottom-3 left-3", "bl"], ["bottom-3 right-3", "br"]].map(([pos, key]) => (
        <div key={key} className={`absolute ${pos} w-5 h-5 z-20`} style={{
          borderTop: key.startsWith("t") ? `1.5px solid ${p.accentColor}` : "none",
          borderBottom: key.startsWith("b") ? `1.5px solid ${p.accentColor}` : "none",
          borderLeft: key.endsWith("l") ? `1.5px solid ${p.accentColor}` : "none",
          borderRight: key.endsWith("r") ? `1.5px solid ${p.accentColor}` : "none",
          opacity: 0.9,
        }} />
      ))}

      {/* Top status bar */}
      <div className="absolute top-0 left-0 right-0 h-8 z-30 flex items-center justify-between px-4" style={{
        background: "rgba(0,0,0,0.55)", borderBottom: `1px solid rgba(${p.accentRgb},0.18)`,
        backdropFilter: "blur(4px)",
      }}>
        <div className="flex items-center gap-3">
          <span className="text-[9px] tracking-[0.25em]" style={{ color: `rgba(${p.accentRgb},0.7)`, fontFamily: "'JetBrains Mono',monospace" }}>
            {p.hexCoord}
          </span>
          <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>|</span>
          <span className="text-[9px] tracking-[0.2em]" style={{ color: p.accentColor, fontFamily: "'JetBrains Mono',monospace" }}>
            ● {p.status}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
            PING <span style={{ color: p.accentColor }}>{p.ping}</span>
          </span>
          <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
            {p.year}
          </span>
        </div>
      </div>

      {/* Diagonal accent line */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" style={{ opacity: 0.08 }}>
        <line x1="0" y1="40%" x2="100%" y2="60%" stroke={p.accentColor} strokeWidth="1" />
        <line x1="0" y1="60%" x2="100%" y2="40%" stroke={p.accentColor} strokeWidth="0.5" />
      </svg>

      {/* Central content */}
      <div className="absolute inset-0 flex items-center justify-center pt-8 pb-4 px-6 z-20">
        <div className="w-full rounded-xl overflow-hidden" style={{ ...glass, background: "rgba(0,0,0,0.42)" }}>
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-2" style={{ borderBottom: `1px solid rgba(${p.accentRgb},0.12)`, background: "rgba(0,0,0,0.3)" }}>
            {["#ff5f56", "#ffbd2e", "#27c93f"].map((c, j) => (
              <div key={j} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
            <div className="flex-1 mx-3 rounded px-3 py-1 text-[9px] text-center" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
              /{p.name.toLowerCase().replace(/\s/g, "")}/v2
            </div>
            <div className="w-2 h-2 rounded-full" style={{ background: p.accentColor, boxShadow: `0 0 6px ${p.accentColor}` }} />
          </div>

          <div className="p-5 flex flex-col gap-2">
            {/* Terminal-style name */}
            <div className="flex items-center gap-2">
              <span style={{ color: p.accentColor, fontFamily: "monospace", fontSize: 11 }}>$</span>
              <span className="text-lg font-black tracking-tight" style={{ color: "white", fontFamily: "'JetBrains Mono','Courier New',monospace", textShadow: `0 0 20px rgba(${p.accentRgb},0.6)` }}>
                {p.name}
              </span>
            </div>
            <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.38)", fontFamily: "monospace" }}>
              // {p.subtitle}
            </div>

            {/* Mini stats row */}
            <div className="flex items-center gap-3 mt-2 pt-2" style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
              <div className="text-[9px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
                <span style={{ color: p.accentColor }}>↑</span> {p.commits} commits
              </div>
              <div className="text-[9px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
                <span style={{ color: p.accentColor }}>◈</span> {p.usedTech.length} deps
              </div>
              <div className="ml-auto text-[10px] px-2.5 py-1 rounded" style={{ background: `rgba(${p.accentRgb},0.15)`, color: p.accentColor, fontFamily: "monospace", border: `1px solid rgba(${p.accentRgb},0.3)` }}>
                OPEN →
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px z-30" style={{
        background: `linear-gradient(90deg,transparent,${p.accentColor},transparent)`,
      }} />

      {/* Type pill bottom-left */}
      <div className="absolute bottom-3 left-3 z-30 text-[8px] tracking-[0.25em] px-2.5 py-1 rounded" style={{
        ...glass, color: `rgba(${p.accentRgb},0.8)`, fontFamily: "monospace",
        border: `1px solid rgba(${p.accentRgb},0.25)`,
      }}>
        {p.type.toUpperCase()}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [tick, setTick] = useState(0); // for blinking cursor

  useEffect(() => {
    const onScroll = () => {
      const s = sectionRef.current;
      if (!s) return;
      const rect = s.getBoundingClientRect();
      const sectionHeight = s.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate how far we are into the 300vh section
      // rect.top is current distance from viewport top
      const scrolled = -rect.top;
      const total = sectionHeight - viewportHeight;

      const p = Math.min(Math.max(0, scrolled / total), 1);
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 600);
    return () => clearInterval(id);
  }, []);

  const N = projects.length;
  const scaled = progress * N;
  const activeIndex = Math.min(Math.floor(scaled), N - 1);
  const slot = scaled - activeIndex;

  const project = projects[activeIndex];
  const next = projects[activeIndex + 1] ?? null;

  // Outgoing slides DOWN — pushed out the bottom as incoming rises up
  const outY = `${slot * 30}%`;
  const outScale = 1 - slot * 0.06;
  const outOpacity = 1 - slot * 0.55;
  const inY = next ? `${(1 - slot) * 100}vh` : undefined;

  const cursor = tick % 2 === 0 ? "█" : " ";

  return (
    <>
      {/* Font import */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@700;800&display=swap');`}</style>

      <div ref={sectionRef} className="relative h-full w-full overflow-visible">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center rounded-t-[3rem] md:rounded-t-[4rem] bg-black shadow-[0_-20px_60px_rgba(0,0,0,0.8)] border-t border-white/5 overflow-hidden">

          {/* ── Background layers ── */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(145deg,#020c1b 0%,#040e24 40%,#06101e 70%,#020a14 100%)",
          }} />

          {/* Circuit-board dot grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.045) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }} />

          {/* Horizontal circuit traces */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
            {[15, 35, 55, 70, 85].map(y => (
              <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke={project.accentColor} strokeWidth="1" strokeDasharray="4 40" />
            ))}
            {[10, 30, 60, 80].map(x => (
              <line key={x} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke={project.accentColor} strokeWidth="1" strokeDasharray="4 60" />
            ))}
          </svg>

          {/* Accent glow blob */}
          <div className="absolute inset-0 pointer-events-none transition-all duration-700" style={{
            background: `radial-gradient(ellipse 55% 70% at 25% 50%,${project.bgGlow},transparent 65%)`,
          }} />

          {/* ── CONTENT ── */}
          <div className="relative h-full w-full flex items-center justify-center px-6 md:px-12 lg:px-24 gap-16">

            {/* ── LEFT: card stage ── */}
            <div className="flex-shrink-0 flex flex-col gap-3" style={{ width: "45%" }}>

              {/* Section header */}
              <div className="flex items-center gap-3 mb-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: project.accentColor, boxShadow: `0 0 6px ${project.accentColor}` }} />
                  <span className="text-[10px] tracking-[0.4em]" style={{ color: project.accentColor, fontFamily: "'JetBrains Mono',monospace" }}>
                    PROJECTS
                  </span>
                </div>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,rgba(${project.accentRgb},0.4),transparent)` }} />
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
                  {String(activeIndex + 1).padStart(2, "0")}/{String(N).padStart(2, "0")}
                </span>
              </div>

              {/* Card viewport */}
              <div className="relative" style={{ height: "65vh" }}>
                {/* Outgoing */}
                <div className="absolute inset-0" style={{
                  transform: `translateY(${outY}) scale(${outScale})`,
                  opacity: outOpacity,
                  transformOrigin: "bottom center",
                  willChange: "transform,opacity",
                }}>
                  <ProjectCard p={project} />
                </div>
                {/* Incoming */}
                {next && (
                  <div className="absolute inset-0" style={{
                    transform: `translateY(${inY})`,
                    willChange: "transform",
                  }}>
                    <ProjectCard p={next} />
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: info panel ── */}
            <div className="flex-1 flex flex-col gap-0 self-center">

              {/* Terminal breadcrumb */}
              <div className="flex items-center gap-2 mb-5 text-[10px]" style={{ fontFamily: "'JetBrains Mono',monospace", color: "rgba(255,255,255,0.2)" }}>
                <span>~/projects/</span>
                <GlitchText
                  value={project.name.toLowerCase().replace(/\s/g, "-")}
                  style={{ color: project.accentColor }}
                />
                <span style={{ color: project.accentColor, opacity: 0.7 }}>{cursor}</span>
              </div>

              {/* Project name */}
              <h2 className="leading-none mb-1 transition-all duration-300" style={{
                fontSize: "clamp(2.2rem,4.5vw,4rem)",
                color: "white",
                fontFamily: "'Syne','JetBrains Mono',monospace",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                textShadow: `0 0 40px rgba(${project.accentRgb},0.3)`,
              }}>
                {project.name}
              </h2>

              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1" style={{ maxWidth: 32, background: project.accentColor }} />
                <span className="text-[11px] tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'JetBrains Mono',monospace" }}>
                  {project.subtitle}
                </span>
              </div>

              {/* Status chips */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-[10px] px-2.5 py-1 rounded" style={{
                  background: `rgba(${project.accentRgb},0.12)`,
                  border: `1px solid rgba(${project.accentRgb},0.35)`,
                  color: project.accentColor,
                  fontFamily: "monospace",
                }}>
                  ● {project.status}
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded" style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.35)", fontFamily: "monospace",
                }}>
                  {project.type}
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded" style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.35)", fontFamily: "monospace",
                }}>
                  {project.year}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-5" style={{
                color: "rgba(255,255,255,0.48)",
                fontFamily: "system-ui,sans-serif",
                maxWidth: "36ch",
              }}>
                {project.description}
              </p>

              {/* Bullet list — terminal style */}
              <div className="mb-6 flex flex-col gap-1.5">
                {project.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-[12px]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "system-ui,sans-serif" }}>
                    <span className="mt-0.5 text-[10px]" style={{ color: project.accentColor, fontFamily: "monospace", flexShrink: 0 }}>▸</span>
                    {b}
                  </div>
                ))}
              </div>

              {/* Divider with label */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[9px] tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.18)", fontFamily: "'JetBrains Mono',monospace" }}>
                  STACK
                </span>
                <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,rgba(255,255,255,0.07),transparent)" }} />
                <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.12)", fontFamily: "monospace" }}>
                  {project.usedTech.length}/{ALL_TECH.length} ACTIVE
                </span>
              </div>

              {/* Tech tags - exact Bento cell design */}
              <div className="flex flex-wrap gap-1.5">
                {ALL_TECH.map((t) => {
                  const used = project.usedTech.includes(t);
                  return (
                    <div
                      key={t}
                      className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-md shrink-0 transition-all duration-300"
                      style={used ? {
                        ...glass,
                        background: `rgba(${project.accentRgb},0.12)`,
                        borderColor: `rgba(${project.accentRgb},0.45)`,
                        color: project.tagActive.text,
                        boxShadow: `0 8px 32px rgba(0,0,0,0.1), 0 0 10px rgba(${project.accentRgb},0.1)`,
                      } : {
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.13)",
                      }}
                    >
                      {used && <GlassHighlight />}

                      {/* Icon Wrapper matching Bento design */}
                      <div
                        className="rounded bg-white/5 p-0.5 flex items-center justify-center shrink-0 border border-white/10"
                        style={{ width: "20px", height: "20px" }}
                      >
                        <span style={{ opacity: used ? 1 : 0.25, transform: "scale(0.85)" }}>
                          <TechLogo name={t} />
                        </span>
                      </div>

                      <span className="text-[10px] font-semibold whitespace-nowrap" style={{ fontFamily: "'JetBrains Mono',monospace", opacity: used ? 0.95 : 0.4 }}>
                        {t}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Side scroll bar ── */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-50">
            {projects.map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                {i === activeIndex && (
                  <span className="text-[8px] mb-1" style={{ color: p.accentColor, fontFamily: "monospace", writingMode: "vertical-rl" }}>
                    {p.hexCoord}
                  </span>
                )}
                <div className="rounded-full transition-all duration-500" style={{
                  width: "3px",
                  height: i === activeIndex ? "40px" : "10px",
                  background: i === activeIndex ? p.accentColor : "rgba(255,255,255,0.08)",
                  boxShadow: i === activeIndex ? `0 0 8px ${p.accentColor}` : "none",
                }} />
              </div>
            ))}
          </div>

          {/* ── Bottom terminal bar ── */}
          <div className="absolute bottom-0 left-0 right-0 h-7 flex items-center px-8 gap-6 z-50" style={{
            background: "rgba(0,0,0,0.6)",
            borderTop: `1px solid rgba(${project.accentRgb},0.12)`,
            backdropFilter: "blur(4px)",
          }}>
            <span className="text-[9px]" style={{ color: `rgba(${project.accentRgb},0.7)`, fontFamily: "monospace" }}>
              PROJECTS.TSX
            </span>
            <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "monospace" }}>
              {project.name.toUpperCase()} · {project.type.toUpperCase()} · {project.year}
            </span>
            <div className="flex-1" />
            <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "monospace" }}>
              UTF-8 · TSX · {Math.round(progress * 100)}%
            </span>
            <div className="w-20 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="h-full rounded-full transition-all duration-300" style={{
                width: `${progress * 100}%`,
                background: `linear-gradient(90deg,${project.accentColor},rgba(${project.accentRgb},0.4))`,
              }} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}