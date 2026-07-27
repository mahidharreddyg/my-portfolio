"use client";

import { useEffect, useRef, useState, Suspense, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { CanvasProps } from "@react-three/fiber";

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), {
  ssr: false,
});

/**
 * LazyCanvas — the one place every WebGL scene on this site mounts through.
 * This is what makes "real 3D" actually cheaper than the old CSS 3D divs:
 *
 *  - No WebGL context exists at all until the scene scrolls near the
 *    viewport (avoids paying GPU-context-creation cost for scenes the user
 *    may never reach, and avoids hitting the browser's ~8-16 live-context cap
 *    if more 3D sections get added later).
 *  - Once mounted, the render loop itself is paused (`frameloop="never"`)
 *    whenever the scene scrolls off screen — R3F stops ticking entirely,
 *    zero rAF cost, without tearing down and recreating the context on every
 *    scroll toggle (which is the expensive part).
 *  - `dpr` is capped — retina overdraw is the single easiest way to make a
 *    "smooth" WebGL scene stutter on a MacBook.
 */
export default function LazyCanvas({
  children,
  className,
  camera,
  dpr = [1, 1.5],
  fallback = null,
}: {
  children: ReactNode;
  className?: string;
  camera?: CanvasProps["camera"];
  dpr?: CanvasProps["dpr"];
  fallback?: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [everNear, setEverNear] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // Wide margin: mount the canvas a little before it's actually visible so
    // there's no pop-in, but nowhere near "the whole page" like a plain
    // isIntersecting-from-mount check would be.
    const mountObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEverNear(true);
          mountObserver.disconnect();
        }
      },
      { rootMargin: "400px 0px 400px 0px" }
    );
    mountObserver.observe(el);

    // Tighter, continuous check purely to gate the render loop once mounted.
    const visObserver = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "150px 0px 150px 0px" }
    );
    visObserver.observe(el);

    return () => {
      mountObserver.disconnect();
      visObserver.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      {everNear ? (
        <Canvas
          dpr={dpr}
          camera={camera}
          frameloop={visible ? "always" : "never"}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
          style={{ pointerEvents: "none" }}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      ) : (
        fallback
      )}
    </div>
  );
}
