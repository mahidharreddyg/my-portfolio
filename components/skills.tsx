"use client";

import Section from "@/components/section";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

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
  { id: "languages", label: "Languages", subLabel: "COMPILED · SCRIPTED · TYPED", color: "var(--gold-hi)" },
  { id: "full-stack", label: "Full Stack", subLabel: "FRONTEND · BACKEND · DATABASE", color: "rgba(var(--tc2-rgb),1)" },
  { id: "devops", label: "DevOps", subLabel: "INFRASTRUCTURE · CLOUD · CI/CD", color: "rgba(var(--tc1-rgb),1)" },
  { id: "ai-ml", label: "AI / ML", subLabel: "MODELS · DATA · VISION", color: "var(--gold-core)" },
];

const layoutPattern = [12, 10, 8, 6, 4, 2];
let currentIdx = 0;
const diamondRows = layoutPattern.map((count) => {
  const row = technologies.slice(currentIdx, currentIdx + count);
  currentIdx += count;
  return row;
});

// ─── TechCard — the site's real glass/gold material: a soft glass chip that
// lifts and gains a thin gold-tinted ring on hover. No per-tile scroll-linked
// transforms (that was ~40 tiles × 5 live motion values recalculating every
// scroll frame — a real cost) and no infinite keyframe box-shadow loops on
// hover — just a plain CSS transition, cheap regardless of how many tiles
// are lit at once. ─────────────────────────────────────────────────────────
const TechCard = ({
  tech,
  isGroupHovered,
  hasActiveCategory,
}: {
  tech: { name: string; img: string; hoverImg: string; color: string; categories: string[] };
  isGroupHovered: boolean;
  hasActiveCategory: boolean;
}) => {
  const dimmed = hasActiveCategory && !isGroupHovered;

  return (
    <div
      className="group relative w-[60px] h-[72px] sm:w-[68px] sm:h-[80px] lg:w-[76px] lg:h-[88px]"
      style={{
        opacity: dimmed ? 0.2 : 1,
        filter: dimmed ? "grayscale(60%)" : "none",
        transition: "opacity 0.35s ease, filter 0.35s ease",
      }}
    >
      <div
        className="relative flex flex-col items-center justify-center w-full h-full rounded-[14px] overflow-hidden transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
        style={{
          background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.05) 0%, rgba(var(--tc4-rgb),0.09) 55%, rgba(0,0,0,0.18) 100%)",
          border: "1px solid rgba(230,196,110,0.14)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* hover ring + glow — static, no looping animation */}
        <div
          className="absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${tech.color}66, 0 10px 24px -8px ${tech.color}55`, background: `radial-gradient(ellipse at 50% 115%, ${tech.color}22 0%, transparent 70%)` }}
        />
        <div className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex-shrink-0 mb-[6px] sm:mb-2 flex items-center justify-center">
          <img
            src={tech.hoverImg}
            alt={`${tech.name} colored`}
            className="absolute w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ filter: `drop-shadow(0 0 8px ${tech.color}aa)` }}
          />
          <img
            src={tech.img}
            alt={`${tech.name} monochrome`}
            className="absolute w-full h-full object-contain transition-opacity duration-300 opacity-70 group-hover:opacity-0"
          />
        </div>
        <span className="relative text-[5px] sm:text-[6px] md:text-[8px] lg:text-[9px] font-mono tracking-widest text-center px-1 leading-tight uppercase text-white/80">
          {tech.name}
        </span>
      </div>
    </div>
  );
};

// ─── Category Label ───────────────────────────────────────────────────────
const CategoryLabel = ({
  category,
  isHovered,
  onHover,
  onLeave,
  count,
}: {
  category: (typeof CATEGORIES)[0];
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  count: number;
}) => {
  return (
    <div
      className="relative flex-1 flex flex-col items-center cursor-pointer select-none"
      style={{ minWidth: 0 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative flex flex-col items-center gap-[4px] px-4 py-[7px]" style={{ width: "100%" }}>
        <span
          className="block font-mono uppercase font-semibold tracking-[0.3em] transition-colors duration-300"
          style={{
            fontSize: "clamp(14px, 1.5vw, 18px)",
            color: isHovered ? category.color : "rgba(255,255,255,0.45)",
            textShadow: isHovered ? `0 0 16px ${category.color}66` : "none",
            whiteSpace: "nowrap",
          }}
        >
          {category.label}
        </span>

        <div
          className="h-[1px] origin-center transition-all duration-300"
          style={{
            width: isHovered ? "70%" : "24%",
            background: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
            opacity: isHovered ? 0.9 : 0.3,
          }}
        />

        <div style={{ minHeight: "12px", width: "100%", display: "flex", justifyContent: "center" }}>
          <span
            className="font-mono uppercase tracking-[0.2em] text-center transition-opacity duration-300"
            style={{ fontSize: "clamp(8px, 0.8vw, 11px)", color: `${category.color}99`, opacity: isHovered ? 1 : 0, whiteSpace: "nowrap" }}
          >
            {category.subLabel}
          </span>
        </div>

        <div style={{ minHeight: "14px", display: "flex", alignItems: "center", gap: 5, opacity: isHovered ? 1 : 0, transition: "opacity 0.3s ease" }}>
          <span className="font-mono tracking-widest uppercase" style={{ fontSize: "clamp(10px, 0.9vw, 12px)", color: `${category.color}cc` }}>
            {count} TOOLS
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────
export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(sectionRef, { once: true, margin: "-10% 0px -10% 0px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const getCategoryCount = (catId: string) => technologies.filter((t) => t.categories.includes(catId)).length;

  return (
    <>
      {/* Same dark canvas + soft ambient glow as the rest of the site — no
          second WebGL renderer running underneath this section on top of
          the hero's, and no bright off-theme blue wash. */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{ background: "linear-gradient(160deg, var(--lo-canvas-2) 0%, var(--lo-canvas) 55%, var(--lo-elevate) 100%)" }}>
        <div
          className="absolute pointer-events-none"
          style={{ width: "60vw", height: "55vh", top: "-10%", left: "-8%", background: "radial-gradient(ellipse at 40% 40%, rgba(var(--tc5-rgb),0.14) 0%, transparent 65%)", filter: "blur(90px)" }}
        />
        <div
          className="absolute pointer-events-none"
          style={{ width: "55vw", height: "50vh", bottom: "-10%", right: "-8%", background: "radial-gradient(ellipse at 55% 55%, rgba(var(--gold-rgb),0.1) 0%, transparent 65%)", filter: "blur(100px)" }}
        />
      </div>

      <Section
        id="skills-inner"
        title=""
        className="bg-transparent relative w-full overflow-visible flex flex-col items-center justify-center py-20 min-h-screen z-10"
      >
        <div className="relative flex flex-col items-center justify-center mb-10 text-center mt-[-40px]">
          {/* Oversized faint watermark behind the heading — same motif as
              the Experience section's GhostYear (.tl-ghost). */}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 font-malinton font-bold pointer-events-none select-none whitespace-nowrap"
            style={{
              fontSize: "clamp(90px, 13vw, 170px)",
              transform: "translate(-50%, -50%)",
              letterSpacing: "-6px",
              background: "linear-gradient(180deg, rgba(var(--gold-rgb),0.16) 0%, rgba(var(--gold-rgb),0) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "1px rgba(var(--gold-rgb),0.09)",
            }}
          >
            SKILLS
          </span>
          <span className="relative text-[10px] tracking-[5px] uppercase mb-3 block font-mono" style={{ color: "var(--gold-core)", textShadow: "0 0 10px rgba(var(--gold-rgb),0.25)" }}>
            // expertise
          </span>
          <h2 className="relative font-malinton font-bold text-white tracking-[-1.5px] leading-[1.05] mb-4" style={{ fontSize: "clamp(42px, 6vw, 72px)" }}>
            <span style={{ color: "var(--gold-hi)", filter: "drop-shadow(0 0 20px rgba(var(--gold-rgb),0.4))" }}>Tech</span> Stack
          </h2>
        </div>

        <div className="relative w-full">
          {/* ── Category Labels (Absolute Full-Width) ── */}
          <div className="absolute top-[65%] left-0 right-0 z-30 pointer-events-none">
            <div className="absolute left-[-200px] top-0 flex flex-col gap-12 items-start pointer-events-auto">
              {CATEGORIES.slice(0, 2).map((cat) => (
                <div key={cat.id} className="w-[180px] sm:w-[220px]">
                  <CategoryLabel
                    category={cat}
                    isHovered={activeCategory === cat.id}
                    onHover={() => setActiveCategory(cat.id)}
                    onLeave={() => setActiveCategory(null)}
                    count={getCategoryCount(cat.id)}
                  />
                </div>
              ))}
            </div>

            <div className="absolute right-[-200px] top-0 flex flex-col gap-12 items-end text-right pointer-events-auto">
              {CATEGORIES.slice(2).map((cat) => (
                <div key={cat.id} className="w-[180px] sm:w-[220px]">
                  <CategoryLabel
                    category={cat}
                    isHovered={activeCategory === cat.id}
                    onHover={() => setActiveCategory(cat.id)}
                    onLeave={() => setActiveCategory(null)}
                    count={getCategoryCount(cat.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div ref={sectionRef} className="relative z-10 w-full max-w-[1400px] mx-auto px-2 sm:px-4 flex flex-col items-center justify-center">
            <motion.div
              className="flex flex-col items-center justify-center gap-2 sm:gap-3 lg:gap-4 w-full"
              initial={{ opacity: 0, y: 24 }}
              animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {diamondRows.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="flex flex-row justify-center items-center gap-2 sm:gap-3 lg:gap-4 w-full">
                  {row.map((tech) => (
                    <TechCard
                      key={tech.name}
                      tech={tech}
                      isGroupHovered={activeCategory !== null && tech.categories.includes(activeCategory)}
                      hasActiveCategory={activeCategory !== null}
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
}
