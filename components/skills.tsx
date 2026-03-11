"use client";

import Section from "@/components/section";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef, useState } from "react";

// Technology Data — 42 Skills with fallback colored SVGs
const technologies = [
  // Row 1 — Programming Languages (12)
  { name: "Python", img: "/icons/blackandwhite/python.svg", hoverImg: "/icons/coloured/python.svg", color: "#3776AB" },
  { name: "JavaScript", img: "/icons/blackandwhite/js.svg", hoverImg: "/icons/coloured/js.svg", color: "#F7DF1E" },
  { name: "TypeScript", img: "/icons/blackandwhite/typescript.svg", hoverImg: "/icons/coloured/typescript.svg", color: "#3178C6" },
  { name: "Java", img: "/icons/blackandwhite/java.svg", hoverImg: "/icons/coloured/java.svg", color: "#E76F51" },
  { name: "C++", img: "/icons/blackandwhite/c++.svg", hoverImg: "/icons/coloured/c++.svg", color: "#00599C" },
  { name: "Go", img: "/icons/blackandwhite/go.svg", hoverImg: "/icons/coloured/go.svg", color: "#00ADD8" },
  { name: "Swift", img: "/icons/blackandwhite/swift.svg", hoverImg: "/icons/coloured/swift.svg", color: "#F05138" },
  { name: "Bash", img: "/icons/blackandwhite/bash.svg", hoverImg: "/icons/coloured/bash.svg", color: "#4EAA25" },
  { name: "HTML5", img: "/icons/blackandwhite/html.svg", hoverImg: "/icons/coloured/html5.svg", color: "#E34F26" },
  { name: "CSS3", img: "/icons/blackandwhite/css3.svg", hoverImg: "/icons/coloured/css3.svg", color: "#1572B6" },
  { name: "React", img: "/icons/blackandwhite/react.svg", hoverImg: "/icons/coloured/react.svg", color: "#61DAFB" },
  { name: "Next.js", img: "/icons/blackandwhite/nextjs2.svg", hoverImg: "/icons/coloured/nextjs2.svg", color: "#FFFFFF" },

  // Row 2 — Frontend + Backend (10)
  { name: "Angular", img: "/icons/blackandwhite/angular17.svg", hoverImg: "/icons/coloured/angular17.svg", color: "#DD0031" },
  { name: "Node.js", img: "/icons/blackandwhite/nodejs.svg", hoverImg: "/icons/coloured/nodejs.svg", color: "#339933" },
  { name: "Express.js", img: "/icons/blackandwhite/expressjs.svg", hoverImg: "/icons/coloured/expressjs.svg", color: "#FFFFFF" },
  { name: "Spring Boot", img: "/icons/blackandwhite/simple-icons_springboot.svg", hoverImg: "/icons/coloured/simple-icons_springboot.svg", color: "#6DB33F" },
  { name: "GraphQL", img: "/icons/blackandwhite/graphql.svg", hoverImg: "/icons/coloured/graphql.svg", color: "#E10098" },
  { name: "Bootstrap", img: "/icons/blackandwhite/bootstrap5.svg", hoverImg: "/icons/coloured/bootstrap5.svg", color: "#7952B3" },
  { name: "Redux", img: "/icons/blackandwhite/redux.svg", hoverImg: "/icons/coloured/redux.svg", color: "#764ABC" },
  { name: "Three.js", img: "/icons/blackandwhite/threejs.svg", hoverImg: "/icons/coloured/threejs.svg", color: "#FFFFFF" },
  { name: "Firebase", img: "/icons/blackandwhite/firebase.svg", hoverImg: "/icons/coloured/firebase.svg", color: "#FFCA28" },
  { name: "Vercel", img: "/icons/blackandwhite/vercel.svg", hoverImg: "/icons/coloured/vercel.svg", color: "#FFFFFF" },

  // Row 3 — Databases + Cloud + DevOps (8)
  { name: "PostgreSQL", img: "/icons/blackandwhite/postgresql.svg", hoverImg: "/icons/coloured/postgresql.svg", color: "#4169E1" },
  { name: "MySQL", img: "/icons/blackandwhite/mysql.svg", hoverImg: "/icons/coloured/mysql.svg", color: "#4479A1" },
  { name: "MongoDB", img: "/icons/blackandwhite/mongodb.svg", hoverImg: "/icons/coloured/mongodb.svg", color: "#47A248" },
  { name: "Redis", img: "/icons/blackandwhite/redis.svg", hoverImg: "/icons/coloured/redis.svg", color: "#DD0031" },
  { name: "AWS", img: "/icons/blackandwhite/aws.svg", hoverImg: "/icons/coloured/aws.svg", color: "#FF9900" },
  { name: "Docker", img: "/icons/blackandwhite/docker.svg", hoverImg: "/icons/coloured/docker.svg", color: "#2496ED" },
  { name: "Kubernetes", img: "/icons/blackandwhite/kubernetes.svg", hoverImg: "/icons/coloured/kubernetes.svg", color: "#326CE5" },
  { name: "Linux", img: "/icons/blackandwhite/linux.svg", hoverImg: "/icons/coloured/linux.svg", color: "#FCC624" },

  // Row 4 — DevOps + AI/ML (6)
  { name: "GitHub", img: "/icons/blackandwhite/github.svg", hoverImg: "/icons/coloured/github.svg", color: "#FFFFFF" },
  { name: "TensorFlow", img: "/icons/blackandwhite/tensorflow.svg", hoverImg: "/icons/coloured/tensorflow.svg", color: "#FF6F00" },
  { name: "PyTorch", img: "/icons/blackandwhite/pytorch.svg", hoverImg: "/icons/coloured/pytorch.svg", color: "#EE4C2C" },
  { name: "Pandas", img: "/icons/blackandwhite/pandas.svg", hoverImg: "/icons/coloured/pandas.svg", color: "#776DD3" },
  { name: "Scikit-learn", img: "/icons/blackandwhite/scikitlearn.svg", hoverImg: "/icons/coloured/scikitlearn.svg", color: "#F7931E" },
  { name: "OpenCV", img: "/icons/blackandwhite/opencv.svg", hoverImg: "/icons/coloured/opencv.svg", color: "#5C3EE8" },

  // Row 5 — Tools (4)
  { name: "Postman", img: "/icons/blackandwhite/postman.svg", hoverImg: "/icons/coloured/postman.svg", color: "#FF6C37" },
  { name: "Figma", img: "/icons/blackandwhite/figma.svg", hoverImg: "/icons/coloured/figma.svg", color: "#F24E1E" },
  { name: "Jira", img: "/icons/blackandwhite/jira.svg", hoverImg: "/icons/coloured/jira.svg", color: "#2684FF" },
  { name: "Power BI", img: "/icons/blackandwhite/powerBI.svg", hoverImg: "/icons/coloured/powerBI.svg", color: "#F2C811" },

  // Row 6 — Tools (2)
  { name: "Selenium", img: "/icons/blackandwhite/selenium.svg", hoverImg: "/icons/coloured/selenium.svg", color: "#43B02A" },
  { name: "n8n", img: "/icons/blackandwhite/n8n.svg", hoverImg: "/icons/coloured/n8n.svg", color: "#FF6D5D" },
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
  tech: { name: string; img: string; hoverImg: string; color: string };
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

            {/* Colored icon (Hover state) */}
            <img
              src={tech.hoverImg}
              alt={`${tech.name} colored`}
              className="absolute w-full h-full object-contain scale-100 group-hover:scale-[1.15] transition-all duration-400 ease-out opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{ willChange: "opacity, transform" }}
            />

            {/* B&W icon (Default state) */}
            <img
              src={tech.img}
              alt={`${tech.name} monochrome`}
              className="absolute w-full h-full object-contain scale-100 group-hover:scale-[1.15] transition-all duration-400 ease-out opacity-70 group-hover:opacity-0 pointer-events-none"
              style={{ willChange: "opacity, transform" }}
            />
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