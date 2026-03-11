"use client";

import Section from "@/components/section";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";

const technologies = [
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
  { name: "PostgreSQL", img: "/icons/blackandwhite/postgresql.svg", hoverImg: "/icons/coloured/postgresql.svg", color: "#4169E1" },
  { name: "MySQL", img: "/icons/blackandwhite/mysql.svg", hoverImg: "/icons/coloured/mysql.svg", color: "#4479A1" },
  { name: "MongoDB", img: "/icons/blackandwhite/mongodb.svg", hoverImg: "/icons/coloured/mongodb.svg", color: "#47A248" },
  { name: "Redis", img: "/icons/blackandwhite/redis.svg", hoverImg: "/icons/coloured/redis.svg", color: "#DD0031" },
  { name: "AWS", img: "/icons/blackandwhite/aws.svg", hoverImg: "/icons/coloured/aws.svg", color: "#FF9900" },
  { name: "Docker", img: "/icons/blackandwhite/docker.svg", hoverImg: "/icons/coloured/docker.svg", color: "#2496ED" },
  { name: "Kubernetes", img: "/icons/blackandwhite/kubernetes.svg", hoverImg: "/icons/coloured/kubernetes.svg", color: "#326CE5" },
  { name: "Linux", img: "/icons/blackandwhite/linux.svg", hoverImg: "/icons/coloured/linux.svg", color: "#FCC624" },
  { name: "GitHub", img: "/icons/blackandwhite/github.svg", hoverImg: "/icons/coloured/github.svg", color: "#FFFFFF" },
  { name: "TensorFlow", img: "/icons/blackandwhite/tensorflow.svg", hoverImg: "/icons/coloured/tensorflow.svg", color: "#FF6F00" },
  { name: "PyTorch", img: "/icons/blackandwhite/pytorch.svg", hoverImg: "/icons/coloured/pytorch.svg", color: "#EE4C2C" },
  { name: "Pandas", img: "/icons/blackandwhite/pandas.svg", hoverImg: "/icons/coloured/pandas.svg", color: "#776DD3" },
  { name: "Scikit-learn", img: "/icons/blackandwhite/scikitlearn.svg", hoverImg: "/icons/coloured/scikitlearn.svg", color: "#F7931E" },
  { name: "OpenCV", img: "/icons/blackandwhite/opencv.svg", hoverImg: "/icons/coloured/opencv.svg", color: "#5C3EE8" },
  { name: "Postman", img: "/icons/blackandwhite/postman.svg", hoverImg: "/icons/coloured/postman.svg", color: "#FF6C37" },
  { name: "Figma", img: "/icons/blackandwhite/figma.svg", hoverImg: "/icons/coloured/figma.svg", color: "#F24E1E" },
  { name: "Jira", img: "/icons/blackandwhite/jira.svg", hoverImg: "/icons/coloured/jira.svg", color: "#2684FF" },
  { name: "Power BI", img: "/icons/blackandwhite/powerBI.svg", hoverImg: "/icons/coloured/powerBI.svg", color: "#F2C811" },
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

function getTileParallaxOffset(rowIndex: number, colIndex: number, totalCols: number) {
  const center = (totalCols - 1) / 2;
  const distFromCenter = colIndex - center;
  const normalizedDist = center === 0 ? 0 : distFromCenter / center;
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
  const { xOffset, yOffset, rotation } = getTileParallaxOffset(rowIndex, colIndex, totalCols);

  const x = useTransform(scrollProgress, [0, 0.75], [xOffset, 0], { ease: (t: number) => 1 - Math.pow(1 - t, 3) });
  const y = useTransform(scrollProgress, [0, 0.75], [yOffset, 0], { ease: (t: number) => 1 - Math.pow(1 - t, 3) });
  const rotate = useTransform(scrollProgress, [0, 0.75], [rotation, 0], { ease: (t: number) => 1 - Math.pow(1 - t, 3) });
  const scale = useTransform(scrollProgress, [0, 0.70], [0.5, 1], { ease: (t: number) => 1 - Math.pow(1 - t, 3) });
  const opacity = useTransform(scrollProgress, [0, 0.60], [0, 1]);

  const animDelay = `${(rowIndex * 0.05 + colIndex * 0.03).toFixed(2)}s`;

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity, willChange: 'transform, opacity' }}
      className="relative w-[60px] h-[72px] sm:w-[68px] sm:h-[80px] lg:w-[76px] lg:h-[88px] origin-center z-10 pointer-events-none"
    >
      <style>{`
        /* === Scan line sweep === */
        @keyframes scan-sweep {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(300%); opacity: 0; }
        }

        /* === Corner ping burst === */
        @keyframes corner-ping {
          0%   { opacity: 1; transform: scale(0.6); }
          60%  { opacity: 0.6; transform: scale(1.4); }
          100% { opacity: 0; transform: scale(1.8); }
        }

        /* === Border circuit trace === */
        @keyframes circuit-trace {
          0%   { stroke-dashoffset: 320; }
          100% { stroke-dashoffset: 0; }
        }

        /* === Glitch label flicker === */
        @keyframes glitch-flicker {
          0%,100% { opacity: 1; transform: skewX(0deg) translateX(0); }
          20%  { opacity: 0.8; transform: skewX(-4deg) translateX(-2px); }
          40%  { opacity: 1;   transform: skewX(0deg) translateX(0); }
          60%  { opacity: 0.7; transform: skewX(3deg)  translateX(1px); }
          80%  { opacity: 1;   transform: skewX(0deg) translateX(0); }
        }

        /* === Hover glow breathing === */
        @keyframes glow-breathe {
          0%,100% { opacity: 0.85; }
          50%      { opacity: 1; }
        }

        /* === Hover pulse ring === */
        @keyframes idle-pulse {
          0%,100% { box-shadow: 0 0 0 0px transparent; }
          50%      { box-shadow: 0 0 0 3px rgba(99,179,237,0.12); }
        }

        /* Group hover triggers */
        .tech-card-inner:hover                   { animation: idle-pulse 1.5s ease-in-out infinite; }
        .tech-card-inner:hover .scan-line        { animation: scan-sweep 0.55s ease-in-out forwards; }
        .tech-card-inner:hover .corner-tl,
        .tech-card-inner:hover .corner-tr,
        .tech-card-inner:hover .corner-bl,
        .tech-card-inner:hover .corner-br        { animation: corner-ping 0.4s ease-out forwards; }
        .tech-card-inner:hover .circuit-svg path { animation: circuit-trace 0.5s ease-out forwards; }
        .tech-card-inner:hover .glitch-label     { animation: glitch-flicker 0.4s steps(1) forwards; }
        .tech-card-inner:hover .glow-bg          { animation: glow-breathe 1.2s ease-in-out infinite; }
      `}</style>

      <div className="relative w-full h-full z-20 pointer-events-none">
        <div
          className="tech-card-inner group relative flex flex-col items-center justify-center w-full h-full rounded-[14px] backdrop-blur-xl bg-white/[0.06] transition-all duration-300 ease-out border border-white/10 shadow-lg pointer-events-auto cursor-pointer overflow-hidden hover:z-50 hover:-translate-y-2 hover:scale-110 hover:border-transparent hover:border-b-2 hover:border-b-cyan-400"
          style={{ animationDelay: animDelay }}
        >

          {/* === Dynamic color bleed background on hover === */}
          <div
            className="glow-bg absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[14px] pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 120%, ${tech.color}28 0%, ${tech.color}10 50%, transparent 75%)`,
            }}
          />

          {/* === Animated border via SVG circuit trace === */}
          <svg
            className="circuit-svg absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-[14px]"
            viewBox="0 0 76 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8,0 H68 Q76,0 76,8 V80 Q76,88 68,88 H8 Q0,88 0,80 V8 Q0,0 8,0 Z"
              stroke={tech.color}
              strokeWidth="1.2"
              strokeOpacity="0.7"
              strokeDasharray="320"
              strokeDashoffset="320"
              fill="none"
            />
          </svg>

          {/* === Scan line sweep === */}
          <div
            className="scan-line absolute left-0 right-0 h-[1.5px] pointer-events-none z-20 rounded-full opacity-0"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${tech.color}99 30%, ${tech.color}ff 50%, ${tech.color}99 70%, transparent 100%)`,
              top: '20%',
              filter: `blur(0.5px) drop-shadow(0 0 4px ${tech.color})`,
            }}
          />

          {/* === Corner accent pings === */}
          <div className="corner-tl absolute top-[3px] left-[3px] w-[6px] h-[6px] border-t border-l opacity-0 pointer-events-none z-20 rounded-tl-sm" style={{ borderColor: tech.color }} />
          <div className="corner-tr absolute top-[3px] right-[3px] w-[6px] h-[6px] border-t border-r opacity-0 pointer-events-none z-20 rounded-tr-sm" style={{ borderColor: tech.color }} />
          <div className="corner-bl absolute bottom-[3px] left-[3px] w-[6px] h-[6px] border-b border-l opacity-0 pointer-events-none z-20 rounded-bl-sm" style={{ borderColor: tech.color }} />
          <div className="corner-br absolute bottom-[3px] right-[3px] w-[6px] h-[6px] border-b border-r opacity-0 pointer-events-none z-20 rounded-br-sm" style={{ borderColor: tech.color }} />

          {/* === Outer glow ring on hover === */}
          <div
            className="absolute inset-[-2px] rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
            style={{
              boxShadow: `0 0 0 1px ${tech.color}55, 0 0 18px 2px ${tech.color}40, 0 12px 28px -6px ${tech.color}60`,
            }}
          />

          {/* === Bottom edge accent bar === */}
          <div
            className="absolute top-0 left-[15%] right-[15%] h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20"
            style={{
              background: `linear-gradient(90deg, transparent, ${tech.color}, transparent)`,
              boxShadow: `0 0 8px 2px ${tech.color}80`,
            }}
          />

          {/* Icon Container */}
          <div className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex-shrink-0 mb-[6px] sm:mb-2 flex items-center justify-center pointer-events-none z-10">
            {/* Colored icon (Hover state) */}
            <img
              src={tech.hoverImg}
              alt={`${tech.name} colored`}
              className="absolute w-full h-full object-contain scale-100 group-hover:scale-[1.2] transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{
                willChange: "opacity, transform, filter",
                filter: `drop-shadow(0 0 6px ${tech.color}cc) drop-shadow(0 0 16px ${tech.color}80)`,
                transitionDelay: '0.05s',
              }}
            />
            {/* B&W icon (Default state) */}
            <img
              src={tech.img}
              alt={`${tech.name} monochrome`}
              className="absolute w-full h-full object-contain scale-100 group-hover:scale-[1.2] transition-all duration-500 ease-out opacity-70 group-hover:opacity-0 pointer-events-none"
              style={{ willChange: "opacity, transform", transitionDelay: '0.05s' }}
            />
          </div>

          {/* Tech name — glitch flicker on hover */}
          <span
            className="glitch-label text-[5px] sm:text-[6px] md:text-[8px] lg:text-[9px] font-mono tracking-widest text-center px-1 leading-tight pointer-events-none text-white group-hover:text-white transition-colors duration-200 z-10 uppercase"
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
    offset: ["start 77%", "start 8%"],
  });

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

      <div className="relative w-full">
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