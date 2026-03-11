"use client";

import Section from "@/components/section";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef, useState } from "react";

// Technology Data — 42 Skills with fallback colored SVGs
const technologies = [
  // Row 1 — Programming Languages (12)
  { name: "Java", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-plain.svg", color: "#E76F51" },
  { name: "C", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", color: "#A8B9CC" },
  { name: "C++", img: "https://cdn.simpleicons.org/cplusplus/00599C", color: "#00599C" },
  { name: "Python", img: "https://cdn.simpleicons.org/python/3776AB", color: "#3776AB" },
  { name: "JavaScript", img: "https://cdn.simpleicons.org/javascript/F7DF1E", color: "#F7DF1E" },
  { name: "TypeScript", img: "https://cdn.simpleicons.org/typescript/3178C6", color: "#3178C6" },
  { name: "Go", img: "https://cdn.simpleicons.org/go/00ADD8", color: "#00ADD8" },
  { name: "Swift", img: "https://cdn.simpleicons.org/swift/F05138", color: "#F05138" },
  { name: "Bash", img: "https://cdn.simpleicons.org/gnubash/4EAA25", color: "#4EAA25" },
  { name: "React", img: "https://cdn.simpleicons.org/react/61DAFB", color: "#61DAFB" },
  { name: "Next.js", img: "https://cdn.simpleicons.org/nextdotjs/white", color: "#FFFFFF" }, // FIX: was #000000
  { name: "Angular", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", color: "#DD0031" },

  // Row 2 — Frontend + Backend (10)
  { name: "Tailwind CSS", img: "https://cdn.simpleicons.org/tailwindcss/06B6D4", color: "#06B6D4" },
  { name: "Bootstrap", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", color: "#7952B3" },
  { name: "HTML5", img: "https://cdn.simpleicons.org/html5/E34F26", color: "#E34F26" },
  { name: "CSS3", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "#1572B6" },
  { name: "Three.js", img: "https://cdn.simpleicons.org/threedotjs/white", color: "#FFFFFF" }, // FIX: was #000000
  { name: "Node.js", img: "https://cdn.simpleicons.org/nodedotjs/339933", color: "#339933" },
  { name: "Express.js", img: "https://cdn.simpleicons.org/express/white", color: "#FFFFFF" }, // FIX: was #000000
  { name: "Spring", img: "https://cdn.simpleicons.org/spring/6DB33F", color: "#6DB33F" },
  { name: "Spring Boot", img: "https://cdn.simpleicons.org/springboot/6DB33F", color: "#6DB33F" },
  { name: "GraphQL", img: "https://cdn.simpleicons.org/graphql/E10098", color: "#E10098" },

  // Row 3 — Databases + Cloud + DevOps (8)
  { name: "PostgreSQL", img: "https://cdn.simpleicons.org/postgresql/4169E1", color: "#4169E1" },
  { name: "MySQL", img: "https://cdn.simpleicons.org/mysql/4479A1", color: "#4479A1" },
  { name: "MongoDB", img: "https://cdn.simpleicons.org/mongodb/47A248", color: "#47A248" },
  { name: "Redis", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", color: "#DD0031" },
  { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", color: "#FF9900" },
  { name: "Docker", img: "https://cdn.simpleicons.org/docker/2496ED", color: "#2496ED" },
  { name: "Kubernetes", img: "https://cdn.simpleicons.org/kubernetes/326CE5", color: "#326CE5" },
  { name: "Linux", img: "https://cdn.simpleicons.org/linux/FCC624", color: "#FCC624" },

  // Row 4 — DevOps + AI/ML (6)
  { name: "Git", img: "https://cdn.simpleicons.org/git/F05032", color: "#F05032" },
  { name: "TensorFlow", img: "https://cdn.simpleicons.org/tensorflow/FF6F00", color: "#FF6F00" },
  { name: "PyTorch", img: "https://cdn.simpleicons.org/pytorch/EE4C2C", color: "#EE4C2C" },
  { name: "Pandas", img: "https://cdn.simpleicons.org/pandas/776DD3", color: "#776DD3" },
  { name: "Scikit-learn", img: "https://cdn.simpleicons.org/scikitlearn/F7931E", color: "#F7931E" },
  { name: "Selenium", img: "https://cdn.simpleicons.org/selenium/43B02A", color: "#43B02A" },

  // Row 5 — Tools (4)
  { name: "Postman", img: "https://cdn.simpleicons.org/postman/FF6C37", color: "#FF6C37" },
  { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", color: "#F24E1E" },
  { name: "Jira", img: "https://cdn.simpleicons.org/jira/2684FF", color: "#2684FF" },
  { name: "Power BI", img: "https://cdn.simpleicons.org/powerbi/F2C811", color: "#F2C811" },

  // Row 6 — Tools (2)
  { name: "Vercel", img: "https://cdn.simpleicons.org/vercel/white", color: "#FFFFFF" }, // FIX: was #000000
  { name: "Eclipse", img: "https://cdn.simpleicons.org/eclipseide/FE7A15", color: "#FE7A15" },
];

const layoutPattern = [12, 10, 8, 6, 4, 2];
let currentIdx = 0;
const diamondRows = layoutPattern.map(count => {
  const row = technologies.slice(currentIdx, currentIdx + count);
  currentIdx += count;
  return row;
});

// Compute parallax offset per tile — how far it starts from its final position
function getTileParallaxOffset(rowIndex: number, colIndex: number, totalCols: number) {
  const center = (totalCols - 1) / 2;
  const distFromCenter = colIndex - center;
  const normalizedDist = center === 0 ? 0 : distFromCenter / center; // -1 to 1

  const xOffset = normalizedDist * 300;
  const yOffset = (rowIndex - 2.5) * 80 - Math.abs(normalizedDist) * 50;
  const rotation = normalizedDist * 20;

  return { xOffset, yOffset, rotation };
}

const TechCard = ({
  tech,
  rowIndex,
  colIndex,
  totalCols,
  scrollProgress,
}: {
  tech: { name: string; img: string; color: string };
  rowIndex: number;
  colIndex: number;
  totalCols: number;
  scrollProgress: MotionValue<number>;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { xOffset, yOffset, rotation } = getTileParallaxOffset(rowIndex, colIndex, totalCols);

  const x = useTransform(scrollProgress, [0, 0.75], [xOffset, 0], { ease: (t: number) => 1 - Math.pow(1 - t, 3) });
  const y = useTransform(scrollProgress, [0, 0.75], [yOffset, 0], { ease: (t: number) => 1 - Math.pow(1 - t, 3) });
  const rotate = useTransform(scrollProgress, [0, 0.75], [rotation, 0], { ease: (t: number) => 1 - Math.pow(1 - t, 3) });
  const scale = useTransform(scrollProgress, [0, 0.70], [0.5, 1], { ease: (t: number) => 1 - Math.pow(1 - t, 3) });
  const opacity = useTransform(scrollProgress, [0, 0.60], [0, 1]);

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity, willChange: 'transform, opacity' }}
      className="relative w-[60px] h-[72px] sm:w-[68px] sm:h-[80px] lg:w-[76px] lg:h-[88px] origin-center z-10 pointer-events-none"
    >
      {/* Outer container with lift effect */}
      <div
        className="relative w-full h-full z-20 pointer-events-none"
      >
        <div
          className={`group relative flex flex-col items-center justify-center w-full h-full rounded-[14px] backdrop-blur-xl bg-white/[0.06] transition-all duration-300 ease-out border border-white/10 shadow-lg pointer-events-auto cursor-pointer hover:z-50 hover:-translate-y-1.5 hover:scale-105 hover:border-b-2 hover:border-b-cyan-400 hover:shadow-[0_25px_30px_-10px_rgba(34,211,238,0.5),_0_10px_10px_-5px_rgba(59,130,246,0.6)] hover:bg-white/[0.12]`}
        >
          {/* Explicit Hover Catch-All Overlay */}
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

          {/* Icon Container */}
          <div className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex-shrink-0 mb-[2px] sm:mb-1 flex items-center justify-center pointer-events-none z-0">

            {/* Glowing ring effect on hover */}
            <div
              className="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-300 ease-out pointer-events-none"
              style={{
                boxShadow: `0 0 20px ${tech.color}50, 0 0 40px ${tech.color}30`,
              }}
            />

            {/* The Icon - Temporarily Removed for Testing */}
            {/* 
            <img
              src={tech.img}
              alt={tech.name}
              className="absolute w-full h-full object-contain scale-100 group-hover:scale-[1.15] transition-all duration-400 ease-out opacity-70 group-hover:opacity-100 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 pointer-events-none"
              style={{ willChange: "opacity, transform, filter" }}
            />
            */}
          </div>

          {/* Tech name */}
          <span
            className="text-[5px] sm:text-[6px] md:text-[8px] lg:text-[9px] font-medium tracking-wider text-center px-1 leading-tight pointer-events-none text-white/50 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 ease-out z-0"
          >
            {tech.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.60"],
  });

  // Smooth the raw scroll progress with a spring for fluid, non-jittery motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Section
      id="skills-inner"
      title=""
      className="bg-transparent relative w-full overflow-visible flex flex-col items-center justify-center py-20 min-h-screen z-10"
      style={{ background: 'radial-gradient(ellipse at center, #001a66 0%, #000d33 40%, #000000 75%)' }}
    >
      {/* Custom styled title */}
      <style>{`
        .tech-stack-title {
          background: linear-gradient(
            125deg,
            #1e3a8a 0%,
            #60a5fa 15%,
            #bfdbfe 28%,
            #3b82f6 42%,
            #1d4ed8 55%,
            #93c5fd 68%,
            #dbeafe 78%,
            #2563eb 90%,
            #1e3a8a 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          display: inline-block;
        }
        .tech-stack-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 0%,
            transparent 30%,
            rgba(255, 255, 255, 0.4) 50%,
            transparent 70%,
            transparent 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .tech-stack-title:hover .tech-stack-shimmer {
          opacity: 1;
          animation: shimmer-sweep 1.2s ease-in-out infinite;
        }
        @keyframes shimmer-sweep {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
      <h2 className="tech-stack-title font-malinton text-5xl md:text-7xl font-bold mb-10 cursor-default select-none text-center">
        Tech Stack
        <span className="tech-stack-shimmer" aria-hidden="true">Tech Stack</span>
      </h2>

      {/* Full-width relative wrapper for glow + grid */}
      <div className="relative w-full">
        {/* Electric blue ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[650px] rounded-full blur-[160px] pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(circle, rgba(0,150,255,0.35) 0%, rgba(0,80,255,0.25) 30%, rgba(0,30,120,0.15) 55%, rgba(0,0,0,0.9) 80%)",
          }}
        />
        <div
          className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[120px] pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(circle, rgba(0,170,255,0.25) 0%, rgba(0,70,255,0.18) 40%, transparent 75%)",
          }}
        />
        <div
          className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[140px] pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(circle, rgba(0,120,255,0.25) 0%, rgba(0,60,200,0.15) 40%, transparent 80%)",
          }}
        />

        {/* Scroll-tracked grid container */}
        <div
          ref={sectionRef}
          className="relative z-10 w-full max-w-[1400px] mx-auto px-2 sm:px-4 flex flex-col items-center justify-center"
        >
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