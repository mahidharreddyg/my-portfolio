"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Real WebGL replacement for the old CSS radial-gradient "glass orb". */
function Orb() {
  const group = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.5) * 0.12;
      group.current.rotation.y = Math.sin(t * 0.15) * 0.35;
    }
    if (ring1.current) ring1.current.rotation.z = t * 0.28;
    if (ring2.current) ring2.current.rotation.z = -t * 0.2;
  });

  return (
    <group ref={group}>
      {/* core sphere */}
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color="#1d4ed8"
          emissive="#2563eb"
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      {/* cheap fresnel-style rim glow: slightly larger, back-face-only, additive */}
      <mesh scale={1.14}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#7db2ff" transparent opacity={0.35} side={THREE.BackSide} />
      </mesh>
      <mesh ref={ring1} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[1.5, 0.01, 12, 80]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2, 0.4, 0]}>
        <torusGeometry args={[1.75, 0.008, 12, 80]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export default function FooterOrbScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[1.5, 1.5, 2]} intensity={14} color="#93c5fd" />
      <pointLight position={[-1.5, -1, 1.5]} intensity={5} color="#1d4ed8" />
      <Orb />
    </>
  );
}
