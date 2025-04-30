"use client";
import { useEffect, useRef } from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // After-glow effect for circles
  useEffect(() => {
    const circles = containerRef.current?.querySelectorAll(`.${styles.circle}`);
    const timeout1 = setTimeout(() => {
      circles?.forEach((c) => c.classList.add(styles.glow));
      setTimeout(() => {
        circles?.forEach((c) => c.classList.remove(styles.glow));
      }, 1000);
    }, 5000);
    return () => {
      clearTimeout(timeout1);
    };
  }, []);

  // 3D tilt effect for image
  useEffect(() => {
    const hero = containerRef.current;
    const img = imgRef.current;
    if (!hero || !img) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
      img.style.transform = `translate(-50%, -50%) rotateX(${y}deg) rotateY(${-x}deg)`;
    };
    const handleMouseLeave = () => {
      img.style.transform = "translate(-50%, -50%)";
    };
    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.hero} ref={containerRef}>
      <div className={styles.circleContainer}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}>
          <img
            src="/mahi_memoji.png"
            alt="Memoji"
            className={styles.heroImg}
            ref={imgRef}
            draggable={false}
          />
        </div>
      </div>
      <div className={styles.heroText}>
        <h1>Welcome to My Portfolio</h1>
        <p>Creative Web Developer &amp; Designer</p>
      </div>
    </div>
  );
};

export default HeroSection;
