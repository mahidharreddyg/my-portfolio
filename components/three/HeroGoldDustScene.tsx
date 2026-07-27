"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A sparse field of drifting gold motes behind the hero content — real
 * depth (particles at varying Z catch parallax as they drift) instead of a
 * flat background. One draw call (THREE.Points), ~70 particles: trivially
 * cheap on the GPU regardless of how "3D" it reads.
 */
export default function HeroGoldDustScene() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 110;

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      seeds[i] = Math.random() * Math.PI * 2;
    }
    return { positions, seeds };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const geo = pointsRef.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      pos.setY(i, pos.getY(i) + Math.sin(t * 0.08 + s) * 0.0006);
      pos.setX(i, pos.getX(i) + Math.cos(t * 0.06 + s) * 0.0004);
    }
    pos.needsUpdate = true;
    if (pointsRef.current) pointsRef.current.rotation.y = t * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d4af6a"
        size={0.042}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
