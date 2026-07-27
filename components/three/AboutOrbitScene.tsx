"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Real WebGL replacement for the old CSS-transform "diorama" (rings + chips
 * built out of translateZ'd divs). Same visual idea, genuinely rendered in
 * 3D space with a real camera and real lighting instead of simulated with
 * perspective/preserve-3d — one GPU draw-call pipeline instead of a dozen
 * composited DOM layers.
 */
function Rings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring1.current) ring1.current.rotation.z += delta * 0.24;
    if (ring2.current) ring2.current.rotation.z -= delta * 0.19;
  });

  return (
    <>
      <mesh ref={ring1} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[1.55, 0.008, 16, 96]} />
        <meshBasicMaterial color="#7db2ff" transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2.1, 0.3, 0]}>
        <torusGeometry args={[1.85, 0.006, 16, 96]} />
        <meshBasicMaterial color="#d4af6a" transparent opacity={0.28} />
      </mesh>
    </>
  );
}

function Chip({
  position,
  speed,
  offset,
  color,
}: {
  position: [number, number, number];
  speed: number;
  offset: number;
  color: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.y = position[1] + Math.sin(t) * 0.14;
    ref.current.rotation.y = t * 0.6;
    ref.current.rotation.x = Math.sin(t * 0.5) * 0.15;
  });
  return (
    <group ref={ref} position={position}>
      <mesh>
        <octahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  );
}

export default function AboutOrbitScene() {
  const chips = useMemo(
    () => [
      { position: [-1.35, 0.55, 0.3] as [number, number, number], speed: 0.7, offset: 0, color: "#7dd3fc" },
      { position: [1.3, -0.1, 0.5] as [number, number, number], speed: 0.55, offset: 2.1, color: "#e6c05a" },
      { position: [-0.4, -1.15, 0.4] as [number, number, number], speed: 0.62, offset: 4.2, color: "#93c5fd" },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 3]} intensity={12} color="#7db2ff" />
      <pointLight position={[-2, -1, 2]} intensity={4} color="#38bdf8" />
      {/* warm gold key light — real PBR shading on the gold chip, not a flat tint */}
      <pointLight position={[1.6, 0.4, 1.8]} intensity={5} color="#e6c05a" />
      <Rings />
      {chips.map((c, i) => (
        <Chip key={i} {...c} />
      ))}
    </>
  );
}
