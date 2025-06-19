"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CharacterSet = string[] | readonly string[];
type AnimationDirection = "left-to-right" | "center-out";

interface HyperTextProps extends MotionProps {
  /** The text content to be animated */
  children: string;
  /** Optional className for styling */
  className?: string;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** Component to render as - defaults to div */
  as?: React.ElementType;
  /** Whether to start animation when element comes into view */
  startOnView?: boolean;
  /** Whether to trigger animation on hover */
  animateOnHover?: boolean;
  /** Custom character set for scramble effect. Defaults to uppercase alphabet */
  characterSet?: CharacterSet;
  /** External trigger for animation - when this changes, animation starts */
  triggerAnimation?: boolean;
  /** Animation direction - left-to-right or center-out */
  animationDirection?: AnimationDirection;
}

const DEFAULT_CHARACTER_SET = Object.freeze(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+".split(""),
) as readonly string[];

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

// Helper function to create center-out reveal order
const getCenterOutOrder = (length: number): number[] => {
  const order: number[] = [];
  const center = Math.floor(length / 2);
  
  // Start from center
  order.push(center);
  
  // Alternate between left and right of center
  for (let i = 1; i <= Math.max(center, length - center - 1); i++) {
    if (center - i >= 0) {
      order.push(center - i);
    }
    if (center + i < length) {
      order.push(center + i);
    }
  }
  
  return order;
};

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = "span",
  startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  triggerAnimation = false,
  animationDirection = "left-to-right",
  ...props
}: HyperTextProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayText, setDisplayText] = useState<string[]>(() =>
    children.split(""),
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef<HTMLElement>(null);
  
  // Create reveal order based on animation direction
  const revealOrder = useRef<number[]>([]);
  
  useEffect(() => {
    if (animationDirection === "center-out") {
      revealOrder.current = getCenterOutOrder(children.length);
    } else {
      revealOrder.current = Array.from({ length: children.length }, (_, i) => i);
    }
  }, [children, animationDirection]);

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  };

  // Handle external trigger
  useEffect(() => {
    if (triggerAnimation && !isAnimating) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  }, [triggerAnimation, isAnimating]);

  // Handle animation start based on view or delay
  useEffect(() => {
    if (!startOnView && !triggerAnimation) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    if (startOnView) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsAnimating(true);
            }, delay);
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" },
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }
  }, [delay, startOnView, triggerAnimation]);

  // Handle scramble animation
  useEffect(() => {
    if (!isAnimating) return;

    const maxIterations = children.length;
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentRevealCount = Math.floor(progress * maxIterations);

      setDisplayText((currentText) =>
        currentText.map((letter, index) => {
          if (letter === " ") return letter;
          
          // Check if this character should be revealed based on the reveal order
          const revealPosition = revealOrder.current.indexOf(index);
          const shouldReveal = revealPosition !== -1 && revealPosition < currentRevealCount;
          
          return shouldReveal
            ? children[index]
            : characterSet[getRandomInt(characterSet.length)];
        }),
      );

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [children, duration, isAnimating, characterSet]);

  // Update display text when children prop changes
  useEffect(() => {
    setDisplayText(children.split(""));
  }, [children]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("inline-block font-mono", className)}
      onMouseEnter={animateOnHover ? handleAnimationTrigger : undefined}
      {...props}
    >
      <AnimatePresence>
        {displayText.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            className={cn("inline-block", letter === " " ? "w-3" : "")}
          >
            {letter}
          </motion.span>
        ))}
      </AnimatePresence>
    </MotionComponent>
  );
}
