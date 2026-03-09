"use client";

import Section from "@/components/section";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

// Technology Data based on Devicons from BentoGrid Marquee
const technologies = [
  // Row 1 (12)
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "C", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Kotlin", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
  { name: "HTML", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Bash", img: "https://cdn.simpleicons.org/gnubash/white" },
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", img: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "Bootstrap", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },

  // Row 2 (10)
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Django", img: "https://cdn.simpleicons.org/django/10b981" },
  { name: "Flask", img: "https://cdn.simpleicons.org/flask/white" },
  { name: "FastAPI", img: "https://cdn.simpleicons.org/fastapi/009688" },
  { name: "TensorFlow", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "PyTorch", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "Scikit-learn", img: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
  { name: "OpenCV", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
  { name: "NumPy", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
  { name: "Tailwind", img: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },

  // Row 3 (8)
  { name: "Pandas", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Firebase", img: "https://cdn.simpleicons.org/firebase/FFCA28" },
  { name: "Redis", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Azure", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },

  // Row 4 (6)
  { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", img: "https://cdn.simpleicons.org/github/white" },
  { name: "Linux", img: "https://cdn.simpleicons.org/linux/white" },
  { name: "AWS", img: "https://cdn.simpleicons.org/amazonaws/FF9900" },
  { name: "VS Code", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Vercel", img: "https://cdn.simpleicons.org/vercel/white" },

  // Row 5 (4)
  { name: "Jupyter", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
  { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Postman", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "Photoshop", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },

  // Row 6 (2)
  { name: "Hugging Face", img: "https://cdn.simpleicons.org/huggingface/FFD21E" },
  { name: "Android", img: "https://cdn.simpleicons.org/android/3DDC84" },
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

  // Horizontal: tiles fan out from center (left goes left, right goes right)
  const xOffset = normalizedDist * 300;

  // Vertical: rows spread out vertically — top rows go up, bottom rows go down
  const yOffset = (rowIndex - 2.5) * 80 - Math.abs(normalizedDist) * 50;

  // Rotation proportional to horizontal position
  const rotation = normalizedDist * 20;

  return { xOffset, yOffset, rotation };
}

// Single tech card with scroll-driven parallax
const TechCard = ({
  tech,
  rowIndex,
  colIndex,
  totalCols,
  scrollProgress,
}: {
  tech: { name: string; img: string };
  rowIndex: number;
  colIndex: number;
  totalCols: number;
  scrollProgress: import("framer-motion").MotionValue<number>;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { xOffset, yOffset, rotation } = getTileParallaxOffset(rowIndex, colIndex, totalCols);

  // Map scroll progress (0→1) to tile transform values
  // Tiles start at their offset positions and converge to 0 as scroll progresses
  const x = useTransform(scrollProgress, [0, 0.5], [xOffset, 0]);
  const y = useTransform(scrollProgress, [0, 0.5], [yOffset, 0]);
  const rotate = useTransform(scrollProgress, [0, 0.5], [rotation, 0]);
  const scale = useTransform(scrollProgress, [0, 0.4], [0.5, 1]);
  const opacity = useTransform(scrollProgress, [0, 0.35], [0, 1]);

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity }}
      whileHover={{ y: -6, scale: 1.08 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      <div
        className={`
          flex flex-col items-center justify-center 
          w-[60px] h-[72px] sm:w-[68px] sm:h-[80px] lg:w-[76px] lg:h-[88px]
          rounded-[14px]
          transition-all duration-300 ease-out
          border
          backdrop-blur-xl
          bg-white/[0.06]
          ${isHovered
            ? 'border-white/10 border-b-cyan-400 shadow-[0_25px_30px_-10px_rgba(34,211,238,0.5),_0_10px_10px_-5px_rgba(59,130,246,0.6)] z-10'
            : 'border-white/10 shadow-lg z-0'}
        `}
      >
        <div className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex-shrink-0 mb-[2px] sm:mb-1">
          <Image
            src={tech.img}
            alt={tech.name}
            fill
            sizes="(max-width: 768px) 24px, 32px"
            className="object-contain transition-all duration-500 ease-out"
            style={{
              filter: isHovered
                ? 'drop-shadow(0 0 12px rgba(255,255,255,0.6))'
                : 'brightness(0) invert(1)',
              opacity: isHovered ? 1 : 0.7,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />
        </div>
        <span
          className={`
            text-[5px] sm:text-[6px] md:text-[8px] lg:text-[9px] font-medium tracking-wider
            transition-all duration-300 text-center px-1 leading-tight
            ${isHovered ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white/50'}
          `}
        >
          {tech.name}
        </span>
      </div>
    </motion.div>
  );
};


export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through this section
  // offset: start = when top of section hits bottom of viewport
  //         end   = when top of section hits top of viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  return (
    <Section
      id="skills-inner"
      title="Tech Stack"
      className="bg-transparent relative w-full overflow-hidden flex flex-col items-center justify-center py-20 min-h-screen z-10"
      style={{ background: 'radial-gradient(ellipse at center, #001a66 0%, #000d33 40%, #000000 75%)' }}
    >
      {/* Electric blue ambient glow */}
      {/* Main Electric Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
  w-[950px] h-[650px] rounded-full blur-[160px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,150,255,0.35) 0%, rgba(0,80,255,0.25) 30%, rgba(0,30,120,0.15) 55%, rgba(0,0,0,0.9) 80%)",
        }}
      />

      {/* Top Neon Spread */}
      <div
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 
  w-[700px] h-[350px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,170,255,0.25) 0%, rgba(0,70,255,0.18) 40%, transparent 75%)",
        }}
      />

      {/* Bottom Electric Glow */}
      <div
        className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 
  w-[800px] h-[400px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,120,255,0.25) 0%, rgba(0,60,200,0.15) 40%, transparent 80%)",
        }}
      />

      {/* Scroll-tracked container */}
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
                  scrollProgress={scrollYProgress}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}