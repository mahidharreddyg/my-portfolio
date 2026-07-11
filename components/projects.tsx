"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";

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
    id: 1, name: "StarForge", subtitle: "AI SaaS Template", year: "2024", type: "SaaS Product", category: "UI UX",
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
    id: 2, name: "RuneAI", subtitle: "Intelligent AI Assistant", year: "2024", type: "AI Application", category: "AI/ML",
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
    id: 3, name: "Neural Link", subtitle: "Brain-Computer Interface Spec", year: "2024", type: "Research Prototype", category: "AI/ML",
    status: "ALPHA", ping: "12ms", commits: "124",
    description: "Real-time EEG data processing dashboard. Visualizing neural pathways and cognitive load using advanced signal processing and deep learning.",
    bullets: ["Real-time data streaming from OpenBCI hardware", "Cognitive state classification using CNN-LSTM", "Interactive 3D brain map visualization"],
    usedTech: ["Python", "PyTorch", "OpenCV", "MySQL", "React", "TypeScript", "Framer Motion"],
    accentColor: "#0ea5e9", accentRgb: "14,165,233", bgGlow: "rgba(14,165,233,0.12)",
    tagActive: { bg: "rgba(14,165,233,0.15)", border: "rgba(14,165,233,0.5)", text: "#7dd3fc" },
    cardGrad: "linear-gradient(145deg,#00081a 0%,#001e4a 45%,#074d91 75%,#0ea5e9 100%)",
    hexCoord: "0x9E2D",
  },
  {
    id: 4, name: "OmniShop", subtitle: "Next-Gen E-Commerce", year: "2024", type: "Full-Stack Web App", category: "Full Stack",
    status: "BETA", ping: "25ms", commits: "512",
    description: "Multi-vendor marketplace with real-time inventory sync and AI-generated product descriptions. High-performance storefront with localized experience.",
    bullets: ["End-to-end encryption for secure transactions", "Real-time inventory management with Redis", "Scalable microservices architecture via AWS"],
    usedTech: ["Next.js", "Express.js", "Node.js", "PostgreSQL", "Redis", "AWS", "Framer Motion"],
    accentColor: "#8b5cf6", accentRgb: "139,92,246", bgGlow: "rgba(139,92,246,0.15)",
    tagActive: { bg: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.5)", text: "#c084fc" },
    cardGrad: "linear-gradient(145deg,#0a011a 0%,#2e1065 45%,#5b21b6 75%,#8b5cf6 100%)",
    hexCoord: "0xFC3A",
  },
  {
    id: 5, name: "ZenSpace", subtitle: "Mindfulness Experience", year: "2023", type: "Design Concept", category: "UI UX",
    status: "CONCEPT", ping: "0ms", commits: "0",
    description: "Ultra-minimalist meditation app focusing on spatial soundscapes and haptic feedback. A masterclass in whitespace and motion design.",
    bullets: ["Neumorphic UI components with glass textures", "Generative audio environments", "Custom interactions designed in Figma"],
    usedTech: ["Figma", "React", "Framer Motion", "Tailwind CSS"],
    accentColor: "#a855f7", accentRgb: "168,85,247", bgGlow: "rgba(168,85,247,0.15)",
    tagActive: { bg: "rgba(168,85,247,0.15)", border: "rgba(168,85,247,0.5)", text: "#d8b4fe" },
    cardGrad: "linear-gradient(145deg,#05010a 0%,#2a0d45 45%,#6b21a8 75%,#a855f7 100%)",
    hexCoord: "0xA8F7",
  },
  {
    id: 6, name: "SUS Goals", subtitle: "Sustainability Platform", year: "2023", type: "Side Project", category: "Full Stack",
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
  const [tick, setTick] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("Full Stack");
  const [, startTransition] = useTransition();

  /* ── Toggle pill state ── */
  const wrapRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillLeft, setPillLeft] = useState(0);
  const [pillWidth, setPillWidth] = useState(0);

  const categories = ["Full Stack", "AI/ML", "UI UX"];

  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory) return;
    startTransition(() => {
      setActiveCategory(cat);
    });
  };

  /* Update pill position whenever activeCategory changes */
  useEffect(() => {
    const idx = categories.indexOf(activeCategory);
    const tab = tabRefs.current[idx];
    const wrap = wrapRef.current;
    if (!tab || !wrap) return;
    const wR = wrap.getBoundingClientRect();
    const tR = tab.getBoundingClientRect();
    setPillLeft(tR.left - wR.left);
    setPillWidth(tR.width);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  /* Also set pill on mount & resize */
  useEffect(() => {
    const update = () => {
      const idx = categories.indexOf(activeCategory);
      const tab = tabRefs.current[idx];
      const wrap = wrapRef.current;
      if (!tab || !wrap) return;
      const wR = wrap.getBoundingClientRect();
      const tR = tab.getBoundingClientRect();
      setPillLeft(tR.left - wR.left);
      setPillWidth(tR.width);
    };
    // slight delay so layout is settled
    const t = setTimeout(update, 30);
    window.addEventListener("resize", update);
    return () => { clearTimeout(t); window.removeEventListener("resize", update); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProjects = projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    const onScroll = () => {
      const s = sectionRef.current;
      if (!s) return;
      const rect = s.getBoundingClientRect();
      const sectionHeight = s.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const totalScrollable = sectionHeight - viewportHeight;
      const revealZone = viewportHeight;
      const exitZone = viewportHeight;
      const activeScroll = Math.max(0, scrolled - revealZone);
      const activeTotal = totalScrollable - revealZone - exitZone;
      const p = activeTotal > 0 ? Math.min(Math.max(0, activeScroll / activeTotal), 1) : 0;
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 600);
    return () => clearInterval(id);
  }, []);

  const N = filteredProjects.length;
  const scaled = progress * N;
  const activeIndex = Math.min(Math.floor(scaled), N - 1);
  const slot = scaled - activeIndex;

  const project = filteredProjects[activeIndex];
  if (!project) return null;
  const next = filteredProjects[activeIndex + 1] ?? null;

  const outY = `${slot * 30}%`;
  const outScale = 1 - slot * 0.06;
  const outOpacity = 1 - slot * 0.55;
  const inY = next ? `${(1 - slot) * 100}vh` : undefined;

  const cursor = tick % 2 === 0 ? "█" : " ";

  const activeIdx = categories.indexOf(activeCategory);

  return (
    <>
      {/* Font import */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@700;800&display=swap');`}</style>

      <div ref={sectionRef} className="relative h-full w-full">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center rounded-[3rem] md:rounded-[4rem] bg-black border-t border-white/5 overflow-hidden">

          <style>{`
            @keyframes nebula-float {
              0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
              33% { transform: translate(5%, -5%) scale(1.1); opacity: 0.6; }
              66% { transform: translate(-5%, 5%) scale(0.9); opacity: 0.3; }
            }
            @keyframes pulse-trace {
              0%, 100% { opacity: 0.03; stroke-width: 0.5; }
              50% { opacity: 0.08; stroke-width: 1.2; }
            }
            .nebula-layer {
              filter: blur(120px);
              mix-blend-mode: screen;
            }
            @keyframes pillSqueeze {
              0%   { transform: scaleX(1)    scaleY(1);   }
              25%  { transform: scaleX(1.05) scaleY(0.91);}
              60%  { transform: scaleX(0.97) scaleY(1.04);}
              85%  { transform: scaleX(1.01) scaleY(0.99);}
              100% { transform: scaleX(1)    scaleY(1);   }
            }
          `}</style>

          {/* ── Background layers ── */}
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-[#020617]/40" />

          <div className="absolute inset-0 overflow-hidden pointer-events-none transform-gpu will-change-transform">
            <div className="absolute inset-[-15%] opacity-30 nebula-layer" style={{
              background: `radial-gradient(circle at 20% 40%, rgba(30, 58, 138, 0.35) 0%, transparent 60%),
                           radial-gradient(circle at 80% 60%, rgba(15, 23, 42, 0.25) 0%, transparent 70%)`,
              animation: 'nebula-float 35s infinite ease-in-out alternate'
            }} />
          </div>

          <div className="absolute inset-0 opacity-[0.08] pointer-events-none transform-gpu" style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }} />

          <svg className="absolute inset-0 w-full h-full pointer-events-none transform-gpu opacity-30" style={{ zIndex: 1 }}>
            {[25, 75].map((y, i) => (
              <line
                key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`}
                stroke={project.accentColor}
                style={{
                  animation: `pulse-trace 8s infinite ease-in-out ${i * 2}s`,
                  strokeDasharray: "4 120",
                  strokeWidth: 0.5
                }}
              />
            ))}
          </svg>

          <div className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out transform-gpu will-change-transform" style={{
            background: `radial-gradient(circle at 30% 50%, rgba(${project.accentRgb}, 0.15), transparent 70%)`,
            filter: 'blur(80px)',
            opacity: 0.5,
            zIndex: 1
          }} />

          {/* ── CONTENT ── */}
          <div className="relative h-full w-full flex items-center justify-center px-6 md:px-12 lg:px-24 gap-16">

            {/* ── LEFT: card stage ── */}
            <div className="flex-shrink-0 flex flex-col gap-3" style={{ width: "45%" }}>

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

              <div className="relative" style={{ height: "65vh" }}>
                <div className="absolute inset-0" style={{
                  transform: `translateY(${outY}) scale(${outScale})`,
                  opacity: outOpacity,
                  transformOrigin: "bottom center",
                  willChange: "transform,opacity",
                }}>
                  <ProjectCard p={project} />
                </div>
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

              <div className="flex items-center gap-2 mb-5 text-[10px]" style={{ fontFamily: "'JetBrains Mono',monospace", color: "rgba(255,255,255,0.2)" }}>
                <span>~/projects/</span>
                <GlitchText
                  value={project.name.toLowerCase().replace(/\s/g, "-")}
                  style={{ color: project.accentColor }}
                />
                <span style={{ color: project.accentColor, opacity: 0.7 }}>{cursor}</span>
              </div>

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

              {/* Stabilized text container to prevent vertical jumping */}
              <div className="min-h-[220px]">
                <p className="text-sm leading-relaxed mb-5" style={{
                  color: "rgba(255,255,255,0.48)",
                  fontFamily: "system-ui,sans-serif",
                  maxWidth: "36ch",
                }}>
                  {project.description}
                </p>

                <div className="mb-6 flex flex-col gap-1.5">
                  {project.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12px]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "system-ui,sans-serif" }}>
                      <span className="mt-0.5 text-[10px]" style={{ color: project.accentColor, fontFamily: "monospace", flexShrink: 0 }}>▸</span>
                      {b}
                    </div>
                  ))}
                </div>
              </div>

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

              <div className="flex items-center gap-3 mb-3">
                <span className="text-[9px] tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.18)", fontFamily: "'JetBrains Mono',monospace" }}>
                  STACK
                </span>
                <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,rgba(255,255,255,0.07),transparent)" }} />
                <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.12)", fontFamily: "monospace" }}>
                  {project.usedTech.length}/{ALL_TECH.length} ACTIVE
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-10">
                {ALL_TECH.map((t) => {
                  const used = project.usedTech.includes(t);
                  return (
                    <div
                      key={t}
                      className="relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg shrink-0 transition-all duration-300 mt-2"
                      style={used ? {
                        ...glass,
                        background: `rgba(${project.accentRgb},0.05)`,
                        borderColor: `rgba(${project.accentRgb},0.3)`,
                        color: project.tagActive.text,
                        boxShadow: `0 4px 20px rgba(${project.accentRgb},0.15)`,
                      } : {
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.13)",
                      }}
                    >
                      {used && <GlassHighlight />}
                      <div
                        className="rounded-md p-1 flex items-center justify-center shrink-0 z-10 transition-all duration-300 relative"
                        style={{ 
                          width: "24px", 
                          height: "24px", 
                          background: used ? `linear-gradient(135deg, rgba(${project.accentRgb},0.2), rgba(${project.accentRgb},0.05))` : "rgba(255,255,255,0.03)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          border: used ? `1px solid rgba(${project.accentRgb}, 0.5)` : "1px solid rgba(255,255,255,0.1)",
                          boxShadow: used ? `0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)` : "0 4px 12px rgba(0,0,0,0.2)",
                        }}
                      >
                        <span style={{ opacity: used ? 1 : 0.4, transform: "scale(1)" }}>
                          <TechLogo name={t} />
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold whitespace-nowrap" style={{ fontFamily: "'JetBrains Mono',monospace", opacity: used ? 1 : 0.4 }}>
                        {t}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* ── CATEGORY TOGGLE ── */}
              <div
                ref={wrapRef}
                className="relative inline-flex items-stretch self-center mt-6"
                style={{
                  padding: 5,
                  borderRadius: 18,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.13)",
                }}
              >
                {/* Top caustic highlight on the outer shell */}
                <div
                  className="absolute pointer-events-none z-10"
                  style={{
                    top: 0, left: 18, right: 18, height: 1,
                    background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.4) 30%,rgba(255,255,255,0.55) 50%,rgba(255,255,255,0.4) 70%,transparent)",
                  }}
                />

                {/* Liquid glass pill */}
                <div
                  className="absolute pointer-events-none z-[1]"
                  style={{
                    top: 4,
                    bottom: 4,
                    borderRadius: 10,
                    left: pillLeft,
                    width: pillWidth,
                    background: "linear-gradient(175deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.08) 40%,rgba(255,255,255,0.04) 65%,rgba(255,255,255,0.14) 100%)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5),inset 0 -1px 0 rgba(0,0,0,0.3),inset 1px 0 0 rgba(255,255,255,0.1),inset -1px 0 0 rgba(255,255,255,0.1),0 6px 28px rgba(0,0,0,0.45),0 2px 6px rgba(0,0,0,0.3)",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    transition: "left 0.4s cubic-bezier(0.34,1.44,0.64,1),width 0.4s cubic-bezier(0.34,1.44,0.64,1)",
                    animation: "pillSqueeze 0.4s cubic-bezier(0.34,1.44,0.64,1)",
                  }}
                >
                  {/* Pill inner top gleam */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      top: 1, left: 14, right: 14, height: 1,
                      background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.6) 30%,rgba(255,255,255,0.92) 50%,rgba(255,255,255,0.6) 70%,transparent)",
                      borderRadius: 1,
                    }}
                  />
                  {/* Pill bottom refraction */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      bottom: 2, left: 22, right: 22, height: 0.5,
                      background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.18) 50%,transparent)",
                    }}
                  />
                </div>

                {/* Tabs + separators */}
                {categories.map((cat, i) => {
                  const hideSep = i > 0 && (i === activeIdx || i === activeIdx + 1);
                  return (
                    <React.Fragment key={cat}>
                      {/* Separator line between tabs */}
                      {i > 0 && (
                        <div
                          style={{
                            width: 1,
                            alignSelf: "stretch",
                            margin: "10px 0",
                            flexShrink: 0,
                            pointerEvents: "none",
                            background: "linear-gradient(180deg,transparent,rgba(255,255,255,0.18) 30%,rgba(255,255,255,0.22) 50%,rgba(255,255,255,0.18) 70%,transparent)",
                            opacity: hideSep ? 0 : 1,
                            transition: "opacity 0.3s ease",
                          }}
                        />
                      )}

                      <button
                        ref={(el) => { tabRefs.current[i] = el; }}
                        onClick={() => handleCategoryChange(cat)}
                        style={{
                          position: "relative",
                          zIndex: 2,
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          outline: "none",
                          borderRadius: 11,
                          flex: 1,
                          minWidth: 150,
                          height: 38,
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          whiteSpace: "nowrap",
                          userSelect: "none",
                          color: cat === activeCategory ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.35)",
                          textShadow: cat === activeCategory ? "0 1px 12px rgba(255,255,255,0.4)" : "none",
                          transition: "color 0.3s ease,text-shadow 0.3s ease",
                        }}
                      >
                        {cat.toUpperCase()}
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>
              {/* ── END CATEGORY TOGGLE ── */}

            </div>
          </div>

          {/* ── Side scroll bar ── */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-50">
            {filteredProjects.map((p, i) => (
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
          <div className="absolute bottom-0 left-0 right-0 h-10 flex items-center px-8 gap-6 z-50" style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
            backdropFilter: "blur(2px)",
          }}>
            <span className="text-[9px]" style={{ color: `rgba(${project.accentRgb},0.7)`, fontFamily: "monospace" }}>
              PROJECTS.TSX // {activeCategory.toUpperCase()}
            </span>
            <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "monospace" }}>
              {project.name.toUpperCase()} · {project.type.toUpperCase()} · v2.0
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