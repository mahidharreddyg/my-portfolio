"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  useProgress,
} from "@react-three/drei";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────────────────────
   ScrollDrivenTorus — the hero 3D object
   Rotates, scales and translates based on scroll progress
   driven by a GSAP ScrollTrigger (scrub mode).
   ───────────────────────────────────────────────────────────── */
function ScrollDrivenTorus() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const progress = useRef({ value: 0 });
  const materialRef = useRef<any>(null);

  // ScrollTrigger → drives progress.value from 0 to 1
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#hero-3d-trigger",
      start: "top top",
      end: "bottom top",
      scrub: 1.5, // smooth scrubbing, 1.5s lag
      onUpdate: (self) => {
        progress.current.value = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // Per-frame interpolation toward ScrollTrigger's progress
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const p = progress.current.value;
    const time = state.clock.elapsedTime;

    // Rotation: idle spin + scroll-driven rotation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      p * Math.PI * 2 + time * 0.08,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      p * Math.PI * 1.5 + time * 0.05,
      0.05
    );

    // Scale: starts at 1, grows to 1.35 at midpoint, shrinks to 0.7 at end
    const targetScale = 1 + 0.35 * Math.sin(p * Math.PI) - p * 0.3;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.04)
    );

    // Y position: drifts down as user scrolls
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      -p * 2.5 + Math.sin(time * 0.3) * 0.15,
      0.04
    );

    // Z position: pushes into scene
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      -p * 1.5,
      0.04
    );
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={meshRef} castShadow>
        <torusKnotGeometry args={[1, 0.35, 256, 64, 2, 3]} />
        <MeshTransmissionMaterial
          ref={materialRef}
          backside
          samples={8}
          thickness={0.4}
          chromaticAberration={0.15}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.4}
          temporalDistortion={0.15}
          ior={1.5}
          color="#1a3a5c"
          attenuationColor="#3b82f6"
          attenuationDistance={0.6}
          roughness={0.05}
          toneMapped={true}
        />
      </mesh>
    </Float>
  );
}

/* ─────────────────────────────────────────────────────────────
   OrbitingSpheres — glass-like orbiting spheres
   ───────────────────────────────────────────────────────────── */
function OrbitingSpheres() {
  const groupRef = useRef<THREE.Group>(null!);
  const progress = useRef({ value: 0 });

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#hero-3d-trigger",
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
      onUpdate: (self) => {
        progress.current.value = self.progress;
      },
    });
    return () => trigger.kill();
  }, []);

  const sphereData = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        angle: (i / 6) * Math.PI * 2,
        radius: 2.2 + (i % 2) * 0.4,
        speed: 0.15 + i * 0.03,
        size: 0.12 + Math.random() * 0.12,
        yOffset: (Math.random() - 0.5) * 1.2,
        color: ["#3b82f6", "#6366f1", "#06b6d4", "#8b5cf6", "#1d73eb", "#a78bfa"][i],
      })),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const p = progress.current.value;

    // Group rotation synced to scroll
    groupRef.current.rotation.y = time * 0.12 + p * Math.PI;
    groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1 + p * 0.3;

    // Individual sphere positions
    groupRef.current.children.forEach((child, i) => {
      const data = sphereData[i];
      if (!data) return;
      const angle = data.angle + time * data.speed + p * Math.PI * 2;
      const r = data.radius * (1 - p * 0.3);
      child.position.x = Math.cos(angle) * r;
      child.position.z = Math.sin(angle) * r;
      child.position.y = data.yOffset + Math.sin(time * 0.5 + i) * 0.2;

      // Scale spheres based on scroll — fade out at end
      const scale = data.size * (1 - p * 0.5);
      child.scale.setScalar(Math.max(0.01, scale));
    });
  });

  return (
    <group ref={groupRef}>
      {sphereData.map((data, i) => (
        <mesh key={i} castShadow>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial
            color={data.color}
            metalness={0.1}
            roughness={0.05}
            transmission={0.92}
            thickness={0.5}
            ior={1.45}
            envMapIntensity={1.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   Particles — floating ambient particles
   ───────────────────────────────────────────────────────────── */
function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 120;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#6b9fff"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─────────────────────────────────────────────────────────────
   SceneContent — assembles all scene elements
   ───────────────────────────────────────────────────────────── */
function SceneContent() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.6}
        color="#b8d4ff"
        castShadow
      />
      <pointLight position={[-3, 2, -3]} intensity={0.4} color="#3b82f6" />
      <pointLight position={[3, -2, 2]} intensity={0.3} color="#8b5cf6" />

      {/* 3D Objects */}
      <ScrollDrivenTorus />
      <OrbitingSpheres />
      <AmbientParticles />

      {/* Environment for reflections */}
      <Environment preset="night" />

      {/* Subtle fog for depth */}
      <fog attach="fog" args={["#020617", 5, 18]} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   HeroScene — the exported Canvas wrapper
   ───────────────────────────────────────────────────────────── */
export default function HeroScene() {
  return (
    <div
      className="r3f-canvas-wrapper"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 50 }}
        style={{ background: "transparent" }}
        // Performance: only render when visible
        frameloop="always"
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
