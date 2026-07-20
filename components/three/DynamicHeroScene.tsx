"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import SceneLoader from "./SceneLoader";

/**
 * DynamicHeroScene — code-split wrapper for the 3D hero scene.
 *
 * - `ssr: false` prevents Three.js from running on the server (would crash)
 * - The HeroScene chunk is tree-shaken from the server bundle
 * - SceneLoader shows real loading progress via drei's useProgress
 */
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null, // SceneLoader handles its own display via useProgress
});

export default function DynamicHeroScene() {
  return (
    <Suspense fallback={null}>
      <SceneLoader />
      <HeroScene />
    </Suspense>
  );
}
