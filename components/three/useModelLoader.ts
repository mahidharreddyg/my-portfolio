"use client";

import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import * as THREE from "three";

/**
 * useModelLoader — configures Draco + KTX2 compressed model loading.
 *
 * Usage:
 *   const gltf = useModelLoader('/models/my-model.glb');
 *   return <primitive object={gltf.scene} />;
 *
 * Infrastructure is set up for when you add .glb models later.
 * Draco decoder is loaded from Google's CDN (no self-hosting needed).
 * KTX2 loader uses Three.js's built-in basis transcoder.
 */

// Singleton Draco loader — shared across all model loads
let dracoLoader: DRACOLoader | null = null;
function getDracoLoader() {
  if (!dracoLoader) {
    dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
    );
    dracoLoader.setDecoderConfig({ type: "js" }); // Use JS decoder (no WASM issues)
    dracoLoader.preload();
  }
  return dracoLoader;
}

// Singleton KTX2 loader
let ktx2Loader: KTX2Loader | null = null;
function getKTX2Loader(gl: THREE.WebGLRenderer) {
  if (!ktx2Loader) {
    ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath(
      "https://unpkg.com/three@0.174.0/examples/jsm/libs/basis/"
    );
    ktx2Loader.detectSupport(gl);
  }
  return ktx2Loader;
}

/**
 * Hook to load a GLTF/GLB model with Draco compression support.
 * @param path - URL path to the .glb/.gltf file
 * @returns The loaded GLTF object
 */
export function useModelLoader(path: string) {
  const gltf = useLoader(GLTFLoader, path, (loader) => {
    const draco = getDracoLoader();
    (loader as GLTFLoader).setDRACOLoader(draco);
  });

  return gltf;
}

/**
 * Utility: preload a model so it's cached before the component mounts.
 * Call this in a parent component's useEffect for eager loading.
 */
export function preloadModel(path: string) {
  useLoader.preload(GLTFLoader, path, (loader) => {
    const draco = getDracoLoader();
    (loader as GLTFLoader).setDRACOLoader(draco);
  });
}

export { getDracoLoader, getKTX2Loader };
