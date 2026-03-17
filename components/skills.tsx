"use client";

import Section from "@/components/section";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const technologies = [
  { name: "Python", img: "/icons/blackandwhite/python.svg", hoverImg: "/icons/coloured/python.svg", color: "#3776AB", categories: ["ai-ml", "languages"] },
  { name: "JavaScript", img: "/icons/blackandwhite/js.svg", hoverImg: "/icons/coloured/js.svg", color: "#F7DF1E", categories: ["full-stack", "languages"] },
  { name: "TypeScript", img: "/icons/blackandwhite/typescript.svg", hoverImg: "/icons/coloured/typescript.svg", color: "#3178C6", categories: ["full-stack", "languages"] },
  { name: "Java", img: "/icons/blackandwhite/java.svg", hoverImg: "/icons/coloured/java.svg", color: "#E76F51", categories: ["full-stack", "languages"] },
  { name: "C++", img: "/icons/blackandwhite/c++.svg", hoverImg: "/icons/coloured/c++.svg", color: "#00599C", categories: ["languages"] },
  { name: "Go", img: "/icons/blackandwhite/go.svg", hoverImg: "/icons/coloured/go.svg", color: "#00ADD8", categories: ["languages", "devops"] },
  { name: "Swift", img: "/icons/blackandwhite/swift.svg", hoverImg: "/icons/coloured/swift.svg", color: "#F05138", categories: ["languages"] },
  { name: "Bash", img: "/icons/blackandwhite/bash.svg", hoverImg: "/icons/coloured/bash.svg", color: "#4EAA25", categories: ["devops", "languages"] },
  { name: "HTML5", img: "/icons/blackandwhite/html.svg", hoverImg: "/icons/coloured/html5.svg", color: "#E34F26", categories: ["full-stack"] },
  { name: "CSS3", img: "/icons/blackandwhite/css3.svg", hoverImg: "/icons/coloured/css3.svg", color: "#1572B6", categories: ["full-stack"] },
  { name: "React", img: "/icons/blackandwhite/react.svg", hoverImg: "/icons/coloured/react.svg", color: "#61DAFB", categories: ["full-stack"] },
  { name: "Next.js", img: "/icons/blackandwhite/nextjs2.svg", hoverImg: "/icons/coloured/nextjs2.svg", color: "#FFFFFF", categories: ["full-stack"] },
  { name: "Angular", img: "/icons/blackandwhite/angular17.svg", hoverImg: "/icons/coloured/angular17.svg", color: "#DD0031", categories: ["full-stack"] },
  { name: "Node.js", img: "/icons/blackandwhite/nodejs.svg", hoverImg: "/icons/coloured/nodejs.svg", color: "#339933", categories: ["full-stack"] },
  { name: "Express.js", img: "/icons/blackandwhite/expressjs.svg", hoverImg: "/icons/coloured/expressjs.svg", color: "#FFFFFF", categories: ["full-stack"] },
  { name: "Spring Boot", img: "/icons/blackandwhite/simple-icons_springboot.svg", hoverImg: "/icons/coloured/simple-icons_springboot.svg", color: "#6DB33F", categories: ["full-stack"] },
  { name: "GraphQL", img: "/icons/blackandwhite/graphql.svg", hoverImg: "/icons/coloured/graphql.svg", color: "#E10098", categories: ["full-stack"] },
  { name: "Bootstrap", img: "/icons/blackandwhite/bootstrap5.svg", hoverImg: "/icons/coloured/bootstrap5.svg", color: "#7952B3", categories: ["full-stack"] },
  { name: "Redux", img: "/icons/blackandwhite/redux.svg", hoverImg: "/icons/coloured/redux.svg", color: "#764ABC", categories: ["full-stack"] },
  { name: "Three.js", img: "/icons/blackandwhite/threejs.svg", hoverImg: "/icons/coloured/threejs.svg", color: "#FFFFFF", categories: ["full-stack"] },
  { name: "Firebase", img: "/icons/blackandwhite/firebase.svg", hoverImg: "/icons/coloured/firebase.svg", color: "#FFCA28", categories: ["full-stack", "devops"] },
  { name: "Vercel", img: "/icons/blackandwhite/vercel.svg", hoverImg: "/icons/coloured/vercel.svg", color: "#FFFFFF", categories: ["devops"] },
  { name: "PostgreSQL", img: "/icons/blackandwhite/postgresql.svg", hoverImg: "/icons/coloured/postgresql.svg", color: "#4169E1", categories: ["full-stack"] },
  { name: "MySQL", img: "/icons/blackandwhite/mysql.svg", hoverImg: "/icons/coloured/mysql.svg", color: "#4479A1", categories: ["full-stack"] },
  { name: "MongoDB", img: "/icons/blackandwhite/mongodb.svg", hoverImg: "/icons/coloured/mongodb.svg", color: "#47A248", categories: ["full-stack"] },
  { name: "Redis", img: "/icons/blackandwhite/redis.svg", hoverImg: "/icons/coloured/redis.svg", color: "#DD0031", categories: ["devops", "full-stack"] },
  { name: "AWS", img: "/icons/blackandwhite/aws.svg", hoverImg: "/icons/coloured/aws.svg", color: "#FF9900", categories: ["devops"] },
  { name: "Docker", img: "/icons/blackandwhite/docker.svg", hoverImg: "/icons/coloured/docker.svg", color: "#2496ED", categories: ["devops"] },
  { name: "Kubernetes", img: "/icons/blackandwhite/kubernetes.svg", hoverImg: "/icons/coloured/kubernetes.svg", color: "#326CE5", categories: ["devops"] },
  { name: "Linux", img: "/icons/blackandwhite/linux.svg", hoverImg: "/icons/coloured/linux.svg", color: "#FCC624", categories: ["devops"] },
  { name: "GitHub", img: "/icons/blackandwhite/github.svg", hoverImg: "/icons/coloured/github.svg", color: "#FFFFFF", categories: ["devops"] },
  { name: "TensorFlow", img: "/icons/blackandwhite/tensorflow.svg", hoverImg: "/icons/coloured/tensorflow.svg", color: "#FF6F00", categories: ["ai-ml"] },
  { name: "PyTorch", img: "/icons/blackandwhite/pytorch.svg", hoverImg: "/icons/coloured/pytorch.svg", color: "#EE4C2C", categories: ["ai-ml"] },
  { name: "Pandas", img: "/icons/blackandwhite/pandas.svg", hoverImg: "/icons/coloured/pandas.svg", color: "#776DD3", categories: ["ai-ml"] },
  { name: "Scikit-learn", img: "/icons/blackandwhite/scikitlearn.svg", hoverImg: "/icons/coloured/scikitlearn.svg", color: "#F7931E", categories: ["ai-ml"] },
  { name: "OpenCV", img: "/icons/blackandwhite/opencv.svg", hoverImg: "/icons/coloured/opencv.svg", color: "#5C3EE8", categories: ["ai-ml"] },
  { name: "Postman", img: "/icons/blackandwhite/postman.svg", hoverImg: "/icons/coloured/postman.svg", color: "#FF6C37", categories: ["full-stack"] },
  { name: "Figma", img: "/icons/blackandwhite/figma.svg", hoverImg: "/icons/coloured/figma.svg", color: "#F24E1E", categories: ["full-stack"] },
  { name: "Jira", img: "/icons/blackandwhite/jira.svg", hoverImg: "/icons/coloured/jira.svg", color: "#2684FF", categories: ["devops"] },
  { name: "Power BI", img: "/icons/blackandwhite/powerBI.svg", hoverImg: "/icons/coloured/powerBI.svg", color: "#F2C811", categories: ["ai-ml"] },
  { name: "Selenium", img: "/icons/blackandwhite/selenium.svg", hoverImg: "/icons/coloured/selenium.svg", color: "#43B02A", categories: ["devops"] },
  { name: "n8n", img: "/icons/blackandwhite/n8n.svg", hoverImg: "/icons/coloured/n8n.svg", color: "#FF6D5D", categories: ["devops", "ai-ml"] },
];

const CATEGORIES = [
  {
    id: "languages",
    label: "Languages",
    subLabel: "COMPILED · SCRIPTED · TYPED",
    color: "#FFFFFF",
    glowColor: "rgba(255,255,255,0.6)",
  },
  {
    id: "full-stack",
    label: "Full Stack",
    subLabel: "FRONTEND · BACKEND · DATABASE",
    color: "#EAB308",
    glowColor: "rgba(234,179,8,0.6)",
  },
  {
    id: "devops",
    label: "DevOps",
    subLabel: "INFRASTRUCTURE · CLOUD · CI/CD",
    color: "#2496ED",
    glowColor: "rgba(36,150,237,0.6)",
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    subLabel: "MODELS · DATA · VISION",
    color: "#EE4C2C",
    glowColor: "rgba(238,76,44,0.6)",
  },
];

const layoutPattern = [12, 10, 8, 6, 4, 2];
let currentIdx = 0;
const diamondRows = layoutPattern.map(count => {
  const row = technologies.slice(currentIdx, currentIdx + count);
  currentIdx += count;
  return row;
});

function getTileParallaxOffset(rowIndex: number, colIndex: number, totalCols: number) {
  const center = (totalCols - 1) / 2;
  const distFromCenter = colIndex - center;
  const normalizedDist = center === 0 ? 0 : distFromCenter / center;
  const xOffset = normalizedDist * 300;
  const yOffset = (rowIndex - 2.5) * 80 - Math.abs(normalizedDist) * 50;
  const rotation = normalizedDist * 20;
  return { xOffset, yOffset, rotation };
}

/* ─────────────────────────────────────────────────────────────────────────────
   BACKGROUND
───────────────────────────────────────────────────────────────────────────── */
function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf: number;

    const resize = () => {
      const parent = c.parentElement;
      if (parent) {
        c.width = parent.offsetWidth;
        c.height = parent.offsetHeight;
      } else {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const lines = Array.from({ length: 45 }, (_, i) => ({
      x: (i / 45) + (Math.random() * 0.04 - 0.02), // Even distribution with slight jitter
      y: Math.random() * 2 - 1,
      speed: Math.random() * 0.0015 + 0.0005,
      len: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.3 + 0.15,
      hue: Math.random() > 0.5 ? 210 : 255,
    }));

    function frame() {
      if (!c || !ctx) return;
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);

      ctx.save();
      const horizon = H * 0.45;
      ctx.strokeStyle = "rgba(56,189,248,0.15)"; // Original subtle look
      ctx.lineWidth = 0.5;
      ctx.shadowBlur = 0; // No glow on grid

      for (let i = -14; i <= 14; i++) {
        const xBase = W / 2 + i * (W * 0.08);
        ctx.beginPath();
        ctx.moveTo(W / 2, horizon);
        ctx.lineTo(xBase, H);
        ctx.stroke();
      }

      for (let j = 0; j < 15; j++) {
        const p = (j / 14) ** 2;
        const y = horizon + (H - horizon) * p;
        const alpha = 0.15 * (1 - j / 15);
        ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.restore();

      const time = Date.now() / 1000;
      const pulse = (Math.sin(time * Math.PI) + 1) / 2;

      lines.forEach((l) => {
        l.y -= l.speed * 2; // Further boosted speed
        if (l.y < -0.4) l.y = 1.2;

        const lx = l.x * W;
        const lyTop = l.y * H;
        const lyBot = (l.y + l.len) * H;

        const g = ctx.createLinearGradient(0, lyTop, 0, lyBot);
        g.addColorStop(0, "transparent");
        g.addColorStop(0.15, `hsla(${l.hue}, 100%, 90%, ${l.opacity * (0.9 + 0.1 * pulse)})`); // Extremely bright "head"
        g.addColorStop(0.4, `hsla(${l.hue}, 100%, 75%, ${l.opacity * (0.7 + 0.3 * pulse)})`);
        g.addColorStop(1, "transparent");

        ctx.shadowBlur = 15 + 20 * pulse; // Maximum intensity glow
        ctx.shadowColor = `hsla(${l.hue}, 100%, 70%, ${l.opacity * pulse})`;
        ctx.fillStyle = g;
        ctx.fillRect(lx, lyTop, 3, Math.max(1, lyBot - lyTop)); // Thicker and brighter
      });

      const ag = ctx.createRadialGradient(W / 2, horizon, 0, W / 2, horizon, W * 0.7);
      ag.addColorStop(0, "rgba(10,25,80,0.12)"); // Reduced "blueness" intensity
      ag.addColorStop(1, "transparent");
      ctx.fillStyle = ag;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(frame);
    }
    frame();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100vw",
        height: "100%",
        zIndex: 0,
        opacity: 0.6,
        pointerEvents: "none"
      }}
    />
  );
}

// ─── TechCard ─────────────────────────────────────────────────────────────────

const TechCard = ({
  tech,
  rowIndex,
  colIndex,
  totalCols,
  scrollProgress,
  isGroupHovered,
  hasActiveCategory,
}: {
  tech: { name: string; img: string; hoverImg: string; color: string; categories: string[] };
  rowIndex: number;
  colIndex: number;
  totalCols: number;
  scrollProgress: MotionValue<number>;
  isGroupHovered: boolean;
  hasActiveCategory: boolean;
}) => {
  const { xOffset, yOffset, rotation } = getTileParallaxOffset(rowIndex, colIndex, totalCols);

  const x = useTransform(scrollProgress, [0, 0.75], [xOffset, 0], { ease: (t: number) => 1 - Math.pow(1 - t, 3) });
  const y = useTransform(scrollProgress, [0, 0.75], [yOffset, 0], { ease: (t: number) => 1 - Math.pow(1 - t, 3) });
  const rotate = useTransform(scrollProgress, [0, 0.75], [rotation, 0], { ease: (t: number) => 1 - Math.pow(1 - t, 3) });
  const scale = useTransform(scrollProgress, [0, 0.70], [0.5, 1], { ease: (t: number) => 1 - Math.pow(1 - t, 3) });
  const opacity = useTransform(scrollProgress, [0, 0.60], [0, 1]);

  const animDelay = `${(rowIndex * 0.05 + colIndex * 0.03).toFixed(2)}s`;
  const dimmed = hasActiveCategory && !isGroupHovered;

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity, willChange: 'transform, opacity' }}
      className="relative w-[60px] h-[72px] sm:w-[68px] sm:h-[80px] lg:w-[76px] lg:h-[88px] origin-center z-10 pointer-events-none"
    >
      <style>{`
        @keyframes scan-sweep {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(300%); opacity: 0; }
        }
        @keyframes corner-ping {
          0%   { opacity: 1; transform: scale(0.6); }
          60%  { opacity: 0.6; transform: scale(1.4); }
          100% { opacity: 0; transform: scale(1.8); }
        }
        @keyframes circuit-trace {
          0%   { stroke-dashoffset: 320; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes glitch-flicker {
          0%,100% { opacity: 1; transform: skewX(0deg) translateX(0); }
          20%  { opacity: 0.8; transform: skewX(-4deg) translateX(-2px); }
          40%  { opacity: 1;   transform: skewX(0deg) translateX(0); }
          60%  { opacity: 0.7; transform: skewX(3deg)  translateX(1px); }
          80%  { opacity: 1;   transform: skewX(0deg) translateX(0); }
        }
        @keyframes glow-breathe {
          0%,100% { opacity: 0.85; }
          50%      { opacity: 1; }
        }
        @keyframes idle-pulse {
          0%,100% { box-shadow: 0 0 0 0px transparent; }
          50%      { box-shadow: 0 0 0 3px rgba(99,179,237,0.12); }
        }
        @keyframes group-hover-pulse {
          0%   { box-shadow: 0 0 0 0px transparent; }
          50%  { box-shadow: 0 0 0 2px rgba(99,179,237,0.2); }
          100% { box-shadow: 0 0 0 0px transparent; }
        }
        .tech-card-inner:hover { animation: idle-pulse 1.5s ease-in-out infinite; }
        .tech-card-inner:hover .scan-line        { animation: scan-sweep 0.55s ease-in-out forwards; }
        .tech-card-inner:hover .corner-tl,
        .tech-card-inner:hover .corner-tr,
        .tech-card-inner:hover .corner-bl,
        .tech-card-inner:hover .corner-br        { animation: corner-ping 0.4s ease-out forwards; }
        .tech-card-inner:hover .circuit-svg path { animation: circuit-trace 0.5s ease-out forwards; }
        .tech-card-inner:hover .glitch-label     { animation: glitch-flicker 0.4s steps(1) forwards; }
        .tech-card-inner:hover .glow-bg          { animation: glow-breathe 1.2s ease-in-out infinite; }
        .tech-card-inner.group-lit .scan-line        { animation: scan-sweep 0.55s ease-in-out forwards; }
        .tech-card-inner.group-lit .corner-tl,
        .tech-card-inner.group-lit .corner-tr,
        .tech-card-inner.group-lit .corner-bl,
        .tech-card-inner.group-lit .corner-br        { opacity: 1 !important; }
        .tech-card-inner.group-lit .circuit-svg      { opacity: 1 !important; }
        .tech-card-inner.group-lit .circuit-svg path { stroke-dashoffset: 0 !important; }
        .tech-card-inner.group-lit .glitch-label     { animation: glitch-flicker 0.4s steps(1) forwards; }
        .tech-card-inner.group-lit .glow-bg          { opacity: 1 !important; animation: glow-breathe 1.2s ease-in-out infinite; }
        .tech-card-inner.group-lit .colored-icon     { opacity: 1 !important; transform: scale(1.2) !important; }
        .tech-card-inner.group-lit .bw-icon          { opacity: 0 !important; }
        .tech-card-inner.group-lit .bottom-bar       { opacity: 1 !important; }
        .tech-card-inner.group-lit .outer-glow       { opacity: 1 !important; }
        .tech-card-inner.group-lit                   { transform: translateY(-4px) scale(1.06) !important; border-color: transparent !important; border-bottom: 2px solid #22d3ee !important; animation: group-hover-pulse 1.5s ease-in-out infinite; }
      `}</style>

      <div
        className="relative w-full h-full z-20 pointer-events-none"
        style={{
          opacity: dimmed ? 0.15 : 1,
          filter: dimmed ? 'grayscale(70%)' : 'none',
          transition: 'opacity 0.35s ease, filter 0.35s ease',
        }}
      >
        <div
          className={`tech-card-inner group relative flex flex-col items-center justify-center w-full h-full rounded-[14px] backdrop-blur-xl bg-white/[0.06] transition-all duration-300 ease-out border border-white/10 shadow-lg pointer-events-auto cursor-pointer overflow-hidden hover:z-50 hover:-translate-y-2 hover:scale-110 hover:border-transparent hover:border-b-2 hover:border-b-cyan-400${isGroupHovered ? ' group-lit' : ''}`}
          style={{ animationDelay: animDelay }}
        >
          <div
            className="glow-bg absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[14px] pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% 120%, ${tech.color}28 0%, ${tech.color}10 50%, transparent 75%)` }}
          />
          <svg
            className="circuit-svg absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-[14px]"
            viewBox="0 0 76 88" fill="none"
          >
            <path
              d="M8,0 H68 Q76,0 76,8 V80 Q76,88 68,88 H8 Q0,88 0,80 V8 Q0,0 8,0 Z"
              stroke={tech.color} strokeWidth="1.2" strokeOpacity="0.7"
              strokeDasharray="320" strokeDashoffset="320" fill="none"
            />
          </svg>
          <div
            className="scan-line absolute left-0 right-0 h-[1.5px] pointer-events-none z-20 rounded-full opacity-0"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${tech.color}99 30%, ${tech.color}ff 50%, ${tech.color}99 70%, transparent 100%)`,
              top: '20%',
              filter: `blur(0.5px) drop-shadow(0 0 4px ${tech.color})`,
            }}
          />
          <div className="corner-tl absolute top-[3px] left-[3px] w-[6px] h-[6px] border-t border-l opacity-0 pointer-events-none z-20 rounded-tl-sm" style={{ borderColor: tech.color }} />
          <div className="corner-tr absolute top-[3px] right-[3px] w-[6px] h-[6px] border-t border-r opacity-0 pointer-events-none z-20 rounded-tr-sm" style={{ borderColor: tech.color }} />
          <div className="corner-bl absolute bottom-[3px] left-[3px] w-[6px] h-[6px] border-b border-l opacity-0 pointer-events-none z-20 rounded-bl-sm" style={{ borderColor: tech.color }} />
          <div className="corner-br absolute bottom-[3px] right-[3px] w-[6px] h-[6px] border-b border-r opacity-0 pointer-events-none z-20 rounded-br-sm" style={{ borderColor: tech.color }} />
          <div
            className="outer-glow absolute inset-[-2px] rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
            style={{ boxShadow: `0 0 0 1px ${tech.color}55, 0 0 18px 2px ${tech.color}40, 0 12px 28px -6px ${tech.color}60` }}
          />
          <div
            className="bottom-bar absolute bottom-0 left-[15%] right-[15%] h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20"
            style={{
              background: `linear-gradient(90deg, transparent, #22d3ee, transparent)`,
              boxShadow: `0 0 8px 2px #22d3ee80`,
            }}
          />
          <div className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex-shrink-0 mb-[6px] sm:mb-2 flex items-center justify-center pointer-events-none z-10">
            <img
              src={tech.hoverImg} alt={`${tech.name} colored`}
              className="colored-icon absolute w-full h-full object-contain scale-100 group-hover:scale-[1.2] transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{ willChange: "opacity, transform, filter", filter: `drop-shadow(0 0 6px ${tech.color}cc) drop-shadow(0 0 16px ${tech.color}80)`, transitionDelay: '0.05s' }}
            />
            <img
              src={tech.img} alt={`${tech.name} monochrome`}
              className="bw-icon absolute w-full h-full object-contain scale-100 group-hover:scale-[1.2] transition-all duration-500 ease-out opacity-70 group-hover:opacity-0 pointer-events-none"
              style={{ willChange: "opacity, transform", transitionDelay: '0.05s' }}
            />
          </div>
          <span className="glitch-label text-[5px] sm:text-[6px] md:text-[8px] lg:text-[9px] font-mono tracking-widest text-center px-1 leading-tight pointer-events-none text-white group-hover:text-white transition-colors duration-200 z-10 uppercase">
            {tech.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Category Label ───────────────────────────────────────────────────────────

const CategoryLabel = ({
  category,
  isHovered,
  onHover,
  onLeave,
  count,
  sequenceIndex,
}: {
  category: typeof CATEGORIES[0];
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  count: number;
  sequenceIndex: number;
}) => {
  return (

    <div
      className="relative flex-1 flex flex-col items-center cursor-pointer select-none"
      style={{ minWidth: 0 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* ── Main label block ── fixed outer size so nothing shifts ── */}

      <div
        className="relative flex flex-col items-center gap-[4px] px-4 py-[7px] bg-transparent rounded-lg"
        style={{ width: '100%' }}
      >
        {/* Corner brackets — absolutely placed, zero flow impact */}
        {(['tl', 'tr', 'bl', 'br'] as const).map(c => (
          <div
            key={c}
            className="absolute pointer-events-none transition-all duration-300"
            style={{
              top: c.startsWith('t') ? 0 : 'auto',
              bottom: c.startsWith('b') ? 0 : 'auto',
              left: c.endsWith('l') ? 0 : 'auto',
              right: c.endsWith('r') ? 0 : 'auto',
              width: isHovered ? '8px' : '5px',
              height: isHovered ? '8px' : '5px',
              borderTop: c.startsWith('t') ? `1px solid ${isHovered ? category.color : 'rgba(255,255,255,0.14)'}` : 'none',
              borderBottom: c.startsWith('b') ? `1px solid ${isHovered ? category.color : 'rgba(255,255,255,0.14)'}` : 'none',
              borderLeft: c.endsWith('l') ? `1px solid ${isHovered ? category.color : 'rgba(255,255,255,0.14)'}` : 'none',
              borderRight: c.endsWith('r') ? `1px solid ${isHovered ? category.color : 'rgba(255,255,255,0.14)'}` : 'none',
              opacity: isHovered ? 1 : 0.35,
              zIndex: 10,
            }}
          />
        ))}

        {/* Label row — constant size, style swaps on hover */}
        <div className="relative flex items-center justify-center" style={{ whiteSpace: 'nowrap', zIndex: 10 }}>
          <span
            className="block font-mono uppercase font-semibold tracking-[0.3em] relative transition-all duration-300"
            style={{
              fontSize: 'clamp(14px, 1.5vw, 18px)',

              // Idle state: Transparent text revealed only by a shimmer sweep
              // Hover state: Full colored flicker glow
              WebkitTextFillColor: isHovered ? 'currentcolor' : 'transparent',
              color: isHovered ? category.color : 'transparent',

              backgroundColor: 'transparent',
              backgroundImage: !isHovered
                ? `linear-gradient(115deg, 
                    transparent 10%, 
                    rgba(255,255,255,0.03) 30%, 
                    rgba(255,255,255,0.15) 42%, 
                    rgba(255,255,255,0.7) 50%, 
                    rgba(255,255,255,0.15) 58%, 
                    rgba(255,255,255,0.03) 70%, 
                    transparent 90%
                  )`
                : 'none',
              backgroundSize: '250% 100%',
              backgroundRepeat: 'no-repeat',
              WebkitBackgroundClip: !isHovered ? 'text' : 'none',
              backgroundClip: !isHovered ? 'text' : 'none',

              textShadow: isHovered
                ? `0 0 10px ${category.glowColor}, 0 0 24px ${category.glowColor}`
                : 'none',

              animationName: isHovered
                ? 'cat-flicker'
                : (sequenceIndex === 0 || sequenceIndex === 1 ? 'cat-shimmer-sweep-rtl' : 'cat-shimmer-sweep-ltr'),
              animationDuration: isHovered ? '0.35s' : '10s',
              animationTimingFunction: isHovered ? 'steps(1)' : 'linear',
              animationIterationCount: isHovered ? '1' : 'infinite',
              animationFillMode: isHovered ? 'forwards' : 'none',
              animationDelay: isHovered ? '0s' : `${sequenceIndex * 2.5}s`,

              letterSpacing: '0.3em',
            }}
          >
            {category.label}
          </span>

          {/* Underline trace that animates in */}
          <div
            className="absolute bottom-[-1px] left-0 right-0 h-[1px] origin-left pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent, ${category.color}cc, transparent)`,
              boxShadow: `0 0 5px ${category.color}`,
              transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
              opacity: isHovered ? 1 : 0,
              transition: 'transform 0.38s ease-out, opacity 0.2s ease',
            }}
          />
        </div>

        {/* Sub-label — always in flow with fixed min-height; hidden when idle */}
        <div style={{ minHeight: '12px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <span
            className="font-mono uppercase tracking-[0.2em] text-center"
            style={{
              fontSize: 'clamp(8px, 0.8vw, 11px)',
              color: `${category.color}99`,
              visibility: isHovered ? 'visible' : 'hidden',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.25s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {category.subLabel}
          </span>
        </div>

        {/* Badge row — always in flow, hidden when idle */}
        <div
          style={{
            minHeight: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            visibility: isHovered ? 'visible' : 'hidden',
            opacity: isHovered ? 1 : 0,
            animation: isHovered ? 'badge-rise 0.3s ease forwards' : 'none',
          }}
        >
          <div className="w-[3px] h-[3px] rounded-full" style={{ background: category.color, boxShadow: `0 0 5px ${category.color}` }} />
          <span
            className="font-mono tracking-widest uppercase"
            style={{ fontSize: 'clamp(10px, 0.9vw, 12px)', color: `${category.color}cc` }}
          >
            {count} TOOLS
          </span>
          <div className="w-[3px] h-[3px] rounded-full" style={{ background: category.color, boxShadow: `0 0 5px ${category.color}` }} />
        </div>
      </div>

      {/* ── Bottom connector (mirror) ── */}
      <div className="relative flex items-center justify-center w-full" style={{ height: '10px' }}>
        <div
          className="absolute h-[1px] right-1/2 pointer-events-none transition-all duration-400"
          style={{
            width: isHovered ? '35%' : '15%',
            background: isHovered
              ? `linear-gradient(to left, ${category.color}00, ${category.color}40)`
              : 'linear-gradient(to left, rgba(255,255,255,0.04), transparent)',
            opacity: isHovered ? 1 : 0.4,
          }}
        />
        <div
          className="w-[3px] h-[3px] rounded-full transition-all duration-300"
          style={{ background: isHovered ? `${category.color}55` : 'rgba(255,255,255,0.06)' }}
        />
        <div
          className="absolute h-[1px] left-1/2 pointer-events-none transition-all duration-400"
          style={{
            width: isHovered ? '35%' : '15%',
            background: isHovered
              ? `linear-gradient(to right, ${category.color}00, ${category.color}40)`
              : 'linear-gradient(to right, rgba(255,255,255,0.04), transparent)',
            opacity: isHovered ? 1 : 0.4,
          }}
        />
      </div>

      {/* Ambient glow — absolutely positioned, zero layout contribution */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none -z-10 transition-opacity duration-500"
        style={{
          boxShadow: `0 0 30px 8px ${category.glowColor}1a`,
          opacity: isHovered ? 1 : 0,
        }}
      />
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 77%", "start 8%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  const getCategoryCount = (catId: string) =>
    technologies.filter(t => t.categories.includes(catId)).length;

  return (
    <Section
      id="skills-inner"
      title=""
      className="bg-transparent relative w-full overflow-visible flex flex-col items-center justify-center py-20 min-h-screen z-10"
      style={{ background: 'radial-gradient(ellipse at center, #020617 0%, #010414 40%, #000000 75%)' }}
    >
      <style>{`
        .tech-stack-title {
          background: linear-gradient(
            125deg,
            #1e3a8a 0%, #60a5fa 15%, #bfdbfe 28%, #3b82f6 42%,
            #1d4ed8 55%, #93c5fd 68%, #dbeafe 78%, #2563eb 90%, #1e3a8a 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          display: inline-block;
        }
        .tech-stack-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 0%, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%, transparent 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        }
        .tech-stack-title:hover .tech-stack-shimmer {
          opacity: 1;
          animation: shimmer-sweep 1.2s ease-in-out infinite;
        }
        @keyframes shimmer-sweep {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* Category Label Animations */
        @keyframes cat-shimmer-sweep-ltr {
          0%   { background-position: -150% 0; }
          35%  { background-position: 150% 0; }
          100% { background-position: 150% 0; }
        }
        @keyframes cat-shimmer-sweep-rtl {
          0%   { background-position: 150% 0; }
          35%  { background-position: -150% 0; }
          100% { background-position: -150% 0; }
        }
        @keyframes cat-flicker {
          0%, 100% { opacity: 1; }
          15% { opacity: 0.35; }
          30% { opacity: 1; }
          55% { opacity: 0.6; }
          70% { opacity: 1; }
        }
        @keyframes badge-rise {
          0%   { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Background />

      <h2 className="tech-stack-title font-malinton text-5xl md:text-7xl font-bold mb-10 cursor-default select-none text-center">
        Tech Stack
        <span className="tech-stack-shimmer" aria-hidden="true">Tech Stack</span>
      </h2>

      <div className="relative w-full">
        {/* Background glows */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[650px] rounded-full blur-[160px] pointer-events-none -z-10"
          style={{ background: "radial-gradient(circle, rgba(0,150,255,0.35) 0%, rgba(0,80,255,0.25) 30%, rgba(0,30,120,0.15) 55%, rgba(0,0,0,0.9) 80%)" }}
        />
        <div
          className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[120px] pointer-events-none -z-10"
          style={{ background: "radial-gradient(circle, rgba(0,170,255,0.25) 0%, rgba(0,70,255,0.18) 40%, transparent 75%)" }}
        />
        <div
          className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[140px] pointer-events-none -z-10"
          style={{ background: "radial-gradient(circle, rgba(0,120,255,0.25) 0%, rgba(0,60,200,0.15) 40%, transparent 80%)" }}
        />

        {/* Active category ambient glow */}
        {activeCategory && (() => {
          const cat = CATEGORIES.find(c => c.id === activeCategory);
          return cat ? (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none z-0 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle, ${cat.glowColor}18 0%, transparent 70%)` }}
            />
          ) : null;
        })()}

        {/* ── Category Labels (Absolute Full-Width) ── */}
        <div className="absolute top-[65%] left-0 right-0 z-30 pointer-events-none">
          {/* Left Side Pair */}
          <div className="absolute left-[-200px] top-0 flex flex-col gap-12 items-start pointer-events-auto">
            {CATEGORIES.slice(0, 2).map((cat) => (
              <div key={cat.id} className="w-[180px] sm:w-[220px]">
                <CategoryLabel
                  category={cat}
                  isHovered={activeCategory === cat.id}
                  onHover={() => setActiveCategory(cat.id)}
                  onLeave={() => setActiveCategory(null)}
                  count={getCategoryCount(cat.id)}
                  sequenceIndex={cat.id === 'languages' ? 0 : 3}
                />
              </div>
            ))}
          </div>

          {/* Right Side Pair */}
          <div className="absolute right-[-200px] top-0 flex flex-col gap-12 items-end text-right pointer-events-auto">
            {CATEGORIES.slice(2).map((cat) => (
              <div key={cat.id} className="w-[180px] sm:w-[220px]">
                <CategoryLabel
                  category={cat}
                  isHovered={activeCategory === cat.id}
                  onHover={() => setActiveCategory(cat.id)}
                  onLeave={() => setActiveCategory(null)}
                  count={getCategoryCount(cat.id)}
                  sequenceIndex={cat.id === 'devops' ? 1 : 2}
                />
              </div>
            ))}
          </div>
        </div>

        <div
          ref={sectionRef}
          className="relative z-10 w-full max-w-[1400px] mx-auto px-2 sm:px-4 flex flex-col items-center justify-center"
        >
          {/* Tile grid */}
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 lg:gap-4 w-full">
            {diamondRows.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className="flex flex-row justify-center items-center gap-2 sm:gap-3 lg:gap-4 w-full"
              >
                {row.map((tech, colIndex) => (
                  <TechCard
                    key={tech.name}
                    tech={tech}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    totalCols={row.length}
                    scrollProgress={smoothProgress}
                    isGroupHovered={activeCategory !== null && tech.categories.includes(activeCategory)}
                    hasActiveCategory={activeCategory !== null}
                  />
                ))}
              </div>
            ))}
          </div>


        </div>
      </div>
    </Section>
  );
}