"use client";

import Section from "@/components/section";
import { motion } from "framer-motion";
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
  { name: "Bash", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Bootstrap", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },

  // Row 2 (10)
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Django", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Flask", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
  { name: "FastAPI", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "TensorFlow", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "PyTorch", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "Scikit-learn", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "OpenCV", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
  { name: "NumPy", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
  { name: "Tailwind", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },

  // Row 3 (8)
  { name: "Pandas", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Firebase", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Redis", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Azure", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },

  // Row 4 (6)
  { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "VS Code", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Vercel", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },

  // Row 5 (4)
  { name: "Jupyter", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
  { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Postman", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "Photoshop", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },

  // Row 6 (2)
  { name: "Hugging Face", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/huggingface/huggingface-original.svg" },
  { name: "Android", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg" },
];

// Helper to chunk the tech array into the diamond layout
const layoutPattern = [12, 10, 8, 6, 4, 2]; // 42 items total, perfect inverted pyramid
let currentIdx = 0;
const diamondRows = layoutPattern.map(count => {
  const row = technologies.slice(currentIdx, currentIdx + count);
  currentIdx += count;
  return row;
});

// A single glassmorphic tech stack card
const TechCard = ({ tech }: { tech: { name: string, img: string } }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* 
        Container with light frosted glass matching the reference.
        Thin border, visible text by default. 
        On hover, a sharp blue cross gradient border is applied.
      */}
      <div
        className={`
          flex flex-col items-center justify-center 
          w-[60px] h-[72px] sm:w-[68px] sm:h-[80px] lg:w-[76px] lg:h-[88px]
          rounded-[14px]
          transition-all duration-300 ease-out
          border
          backdrop-blur-xl
          bg-white/[0.04]
          ${isHovered
            ? 'border-transparent shadow-[0_0_20px_rgba(59,130,246,0.5),inset_0_0_0_1px_rgba(59,130,246,0.8),inset_0_0_0_2px_rgba(34,211,238,0.4)] z-10'
            : 'border-white/10 shadow-lg z-0'}
        `}
      >
        {/* The Icon */}
        <div className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex-shrink-0 mb-[2px] sm:mb-1">
          <Image
            src={tech.img}
            alt={tech.name}
            fill
            sizes="(max-width: 768px) 24px, 32px"
            className={`
              object-contain transition-all duration-500 ease-out
              ${isHovered
                ? 'grayscale-0 opacity-100 drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]'
                : 'grayscale brightness-[800%] contrast-[20%] opacity-90'}
            `}
          />
        </div>

        {/* Text always visible, brightens on hover */}
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

// Animated Orbital Background Entity
const OrbBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 3D Perspective Grid / Wormhole lines - Layer 1 */}
      <div
        className="absolute inset-0 animate-wormhole"
        style={{
          // Using ellipse for flattened top, mimicking the reference shape
          backgroundImage: 'radial-gradient(ellipse at center, transparent 30%, #000 80%), linear-gradient(0deg, transparent 49%, rgba(255, 255, 255, .15) 50%, transparent 51%), linear-gradient(90deg, transparent 49%, rgba(255, 255, 255, .15) 50%, transparent 51%)',
          backgroundSize: '100px 100px',
          transformOrigin: '50% 50%',
        }}
      />
      {/* 3D Perspective Grid / Wormhole lines - Layer 2 (Delayed) */}
      <div
        className="absolute inset-0 animate-wormhole"
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, transparent 30%, #000 80%), linear-gradient(0deg, transparent 49%, rgba(139, 92, 246, .2) 50%, transparent 51%), linear-gradient(90deg, transparent 49%, rgba(139, 92, 246, .2) 50%, transparent 51%)',
          backgroundSize: '100px 100px',
          transformOrigin: '50% 50%',
          animationDelay: '-4s'
        }}
      />

      {/* Floating Glowing Orb mimicking the reference */}
      <motion.div
        animate={{
          x: ["-20%", "20%", "-10%", "-20%"],
          y: ["-20%", "10%", "20%", "-20%"],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
        }}
        className="absolute top-[20%] left-[20%] w-64 h-64 md:w-96 md:h-96 rounded-full blur-[100px] opacity-40 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(59,130,246,0.4) 50%, transparent 80%)",
        }}
      />

      {/* Dimmed purple ambient lighting */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-900/20 to-transparent blur-3xl" />
    </div>
  );
};


export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Section id="skills-inner" title="Tech Stack" className="bg-transparent relative w-full overflow-hidden flex flex-col items-center justify-center py-20 min-h-screen z-10">
      <OrbBackground />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-2 sm:px-4 flex flex-col items-center justify-center">

        {/* Diamond Layout Flex Container */}
        <div ref={containerRef} className="flex flex-col items-center justify-center gap-2 sm:gap-3 lg:gap-4 w-full">
          {diamondRows.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="flex flex-row justify-center items-center gap-2 sm:gap-3 lg:gap-4 w-full"
            >
              {row.map((tech) => (
                <TechCard
                  key={tech.name}
                  tech={tech}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
