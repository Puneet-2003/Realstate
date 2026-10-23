"use client";

import React, { useRef, useState, Suspense } from "react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { Sun, Moon, Sunset, RotateCw, Sparkles } from "lucide-react";

interface Hotspot {
  id: string;
  name: string;
  description: string;
  position: [number, number, number];
  cameraTarget: [number, number, number];
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "pool",
    name: "Cantilever Infinity Pool",
    description: "120ft heated saltwater pool suspended over canyon ridge.",
    position: [2.5, 0.4, 1.2],
    cameraTarget: [4, 1.5, 3],
  },
  {
    id: "living",
    name: "Great Glass Pavilion",
    description: "Floor-to-ceiling motorized acoustic glass walls with 360° views.",
    position: [0, 0.8, 0],
    cameraTarget: [0, 2, 5],
  },
  {
    id: "suite",
    name: "Cantilevered Master Suite",
    description: "Private upper level floating 24 feet over the lower terrace.",
    position: [-1.2, 2.2, 0.5],
    cameraTarget: [-3, 3, 4],
  },
];

// Procedural Modern Architectural Villa Model
function ModernVillaModel({
  lightingMode,
  selectedHotspot,
  onSelectHotspot,
}: {
  lightingMode: "day" | "sunset" | "night";
  selectedHotspot: string | null;
  onSelectHotspot: (id: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle slow rotation
  useFrame((_, delta) => {
    if (groupRef.current && !selectedHotspot) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  const isNight = lightingMode === "night";
  const isSunset = lightingMode === "sunset";

  // Materials
  const concreteColor = isNight ? "#1a1a24" : isSunset ? "#2d262b" : "#e5e3df";
  const steelColor = isNight ? "#0d0d12" : "#18181f";
  const poolColor = isNight ? "#1282a2" : isSunset ? "#0e6ba8" : "#2a9d8f";
  const glassColor = isNight ? "#112233" : "#88bbee";
  const glowIntensity = isNight ? 2.5 : isSunset ? 1.8 : 0.8;

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Base Plinth / Travertine Foundation */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <boxGeometry args={[8.5, 0.3, 6]} />
        <meshStandardMaterial color={concreteColor} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Infinity Pool Plinth */}
      <mesh position={[2.6, 0.02, 1.2]} receiveShadow>
        <boxGeometry args={[3.2, 0.25, 2.4]} />
        <meshStandardMaterial color="#111116" roughness={0.3} />
      </mesh>

      {/* Water Surface with subtle reflection */}
      <mesh position={[2.6, 0.16, 1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 2.2]} />
        <meshStandardMaterial
          color={poolColor}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Ground Floor - Main Glass Pavilion */}
      <mesh position={[-0.4, 0.75, 0]}>
        <boxGeometry args={[4.2, 1.3, 3.4]} />
        <meshPhysicalMaterial
          color={glassColor}
          transmission={0.75}
          opacity={0.6}
          transparent
          roughness={0.1}
          ior={1.5}
        />
      </mesh>

      {/* Ground Floor Interior Floor & Core */}
      <mesh position={[-0.8, 0.75, 0]}>
        <boxGeometry args={[2.2, 1.2, 2.2]} />
        <meshStandardMaterial color="#22222b" roughness={0.5} />
      </mesh>

      {/* Warm Interior Lighting */}
      <pointLight
        position={[-0.4, 0.9, 0]}
        color={isNight ? "#ffb347" : "#ffeedd"}
        intensity={glowIntensity * 2}
        distance={6}
      />

      {/* Structural Blackened Steel Columns */}
      {[-2.3, 1.5].map((x, i) =>
        [-1.5, 1.5].map((z, j) => (
          <mesh key={`col-${i}-${j}`} position={[x, 0.75, z]}>
            <cylinderGeometry args={[0.04, 0.04, 1.3, 12]} />
            <meshStandardMaterial color={steelColor} metalness={0.8} roughness={0.2} />
          </mesh>
        ))
      )}

      {/* Middle Floor Slab */}
      <mesh position={[-0.2, 1.45, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 0.15, 3.8]} />
        <meshStandardMaterial color={concreteColor} roughness={0.6} />
      </mesh>

      {/* Upper Floor Cantilever Suite (Dramatic Modern Overhang) */}
      <mesh position={[-1.2, 2.15, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 1.25, 3]} />
        <meshStandardMaterial color={steelColor} roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Upper Floor Panoramic Window */}
      <mesh position={[-1.2, 2.15, 2.02]}>
        <planeGeometry args={[3.4, 0.95]} />
        <meshPhysicalMaterial
          color={glassColor}
          transmission={0.8}
          opacity={0.5}
          transparent
          roughness={0.1}
        />
      </mesh>

      <pointLight
        position={[-1.2, 2.2, 0.8]}
        color={isNight ? "#ffaa44" : "#ffeedd"}
        intensity={glowIntensity * 1.5}
        distance={4}
      />

      {/* Roof Canopy with Elegant Recessed Overhang */}
      <mesh position={[-1.0, 2.85, 0.5]} castShadow>
        <boxGeometry args={[4.4, 0.12, 3.6]} />
        <meshStandardMaterial color={concreteColor} roughness={0.6} />
      </mesh>

      {/* Architectural Terrace Louver Pergola */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`louver-${i}`} position={[1.4 + i * 0.25, 1.6, 0.2]}>
          <boxGeometry args={[0.08, 0.08, 2.8]} />
          <meshStandardMaterial color="#c5a880" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Poolside Sun Loungers */}
      <mesh position={[2.2, 0.28, 0.6]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[0.7, 0.1, 1.6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh position={[3.1, 0.28, 0.8]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[0.7, 0.1, 1.6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>

      {/* Subtle Landscape Greenery Accents */}
      <mesh position={[-3.6, 0.1, -1.8]}>
        <coneGeometry args={[0.3, 0.9, 8]} />
        <meshStandardMaterial color="#2d4a3e" roughness={0.8} />
      </mesh>
      <mesh position={[-3.2, 0.1, -2.1]}>
        <coneGeometry args={[0.25, 0.75, 8]} />
        <meshStandardMaterial color="#243d32" roughness={0.8} />
      </mesh>

      {/* Interactive 3D Hotspots */}
      {HOTSPOTS.map((spot) => {
        const isSelected = selectedHotspot === spot.id;
        return (
          <group key={spot.id} position={spot.position}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
              <mesh onClick={() => onSelectHotspot(spot.id)}>
                <sphereGeometry args={[0.16, 16, 16]} />
                <meshStandardMaterial
                  color={isSelected ? "#d4af37" : "#ffffff"}
                  emissive={isSelected ? "#d4af37" : "#c5a880"}
                  emissiveIntensity={isSelected ? 2 : 1}
                />
              </mesh>
            </Float>
          </group>
        );
      })}
    </group>
  );
}

// Lighting Setup for Day, Sunset, Night
function SceneLighting({ mode }: { mode: "day" | "sunset" | "night" }) {
  if (mode === "sunset") {
    return (
      <>
        <ambientLight intensity={0.45} color="#e59866" />
        <directionalLight position={[10, 6, 8]} intensity={1.8} color="#f39c12" castShadow />
        <directionalLight position={[-8, 4, -6]} intensity={0.6} color="#9b59b6" />
      </>
    );
  }

  if (mode === "night") {
    return (
      <>
        <ambientLight intensity={0.2} color="#1c2833" />
        <directionalLight position={[6, 10, 6]} intensity={0.4} color="#5dade2" />
        <pointLight position={[0, 4, 3]} intensity={1.5} color="#f7dc6f" distance={12} />
      </>
    );
  }

  // Day
  return (
    <>
      <ambientLight intensity={0.75} color="#ffffff" />
      <directionalLight position={[10, 15, 10]} intensity={1.6} color="#ffffff" castShadow />
      <directionalLight position={[-10, 8, -5]} intensity={0.4} color="#85c1e9" />
    </>
  );
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export default function ArchitecturalCanvas({
  className = "",
  showControls = true,
}: {
  className?: string;
  showControls?: boolean;
}) {
  const [lightingMode, setLightingMode] = useState<"day" | "sunset" | "night">("sunset");
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [hasWebGL] = useState<boolean>(checkWebGLSupport);
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);

  const handleSelectHotspot = (id: string) => {
    setSelectedHotspot((prev) => (prev === id ? null : id));
  };

  const activeSpotData = HOTSPOTS.find((s) => s.id === selectedHotspot);

  if (!hasWebGL) {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-black ${className}`}>
        <Image
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop"
          alt="Architectural Villa"
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-8">
          <div>
            <span className="text-[#c5a880] text-xs uppercase tracking-widest font-semibold">3D Architectural Rendering</span>
            <h3 className="text-2xl font-serif text-white mt-1">The Glass Pavilion Cantilever</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#09090d] select-none ${className}`}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [5.5, 3.8, 6.5], fov: 42 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <SceneLighting mode={lightingMode} />
          <ModernVillaModel
            lightingMode={lightingMode}
            selectedHotspot={selectedHotspot}
            onSelectHotspot={handleSelectHotspot}
          />
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            minDistance={4}
            maxDistance={14}
            maxPolarAngle={Math.PI / 2.1}
            dampingFactor={0.06}
            autoRotate={!selectedHotspot}
            autoRotateSpeed={0.8}
          />
        </Suspense>
      </Canvas>

      {/* Overlay Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs">
        <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
        <span className="text-zinc-200 font-medium">Interactive 3D Architectural Model</span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      {/* Selected Hotspot Drawer */}
      {activeSpotData && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-sm z-10 p-4 rounded-xl bg-black/80 backdrop-blur-xl border border-[#c5a880]/30 shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs uppercase tracking-wider text-[#c5a880] font-semibold">Spatial Highlight</span>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="text-zinc-400 hover:text-white text-xs underline cursor-pointer"
            >
              Reset View
            </button>
          </div>
          <h4 className="text-lg font-serif text-white">{activeSpotData.name}</h4>
          <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{activeSpotData.description}</p>
        </div>
      )}

      {/* Hotspots Quick Switcher */}
      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2">
        {HOTSPOTS.map((spot) => (
          <button
            key={spot.id}
            type="button"
            onClick={() => handleSelectHotspot(spot.id)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider transition-all backdrop-blur-md cursor-pointer ${
              selectedHotspot === spot.id
                ? "bg-[#c5a880] text-black font-semibold shadow-md"
                : "bg-black/70 text-zinc-300 border border-white/10 hover:border-[#c5a880]"
            }`}
          >
            {spot.name}
          </button>
        ))}
      </div>

      {/* Interactive Controls Bar */}
      {showControls && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
          <button
            type="button"
            title="Daylight Architecture"
            onClick={() => setLightingMode("day")}
            className={`p-2 rounded-full transition-all cursor-pointer ${
              lightingMode === "day"
                ? "bg-[#c5a880] text-black"
                : "text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Golden Hour Sunset"
            onClick={() => setLightingMode("sunset")}
            className={`p-2 rounded-full transition-all cursor-pointer ${
              lightingMode === "sunset"
                ? "bg-[#c5a880] text-black"
                : "text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <Sunset className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Twilight / Night Ambiance"
            onClick={() => setLightingMode("night")}
            className={`p-2 rounded-full transition-all cursor-pointer ${
              lightingMode === "night"
                ? "bg-[#c5a880] text-black"
                : "text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Orbit Helper Cue */}
      <div className="pointer-events-none absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/5 text-[11px] text-zinc-400">
        <RotateCw className="w-3 h-3 text-[#c5a880]" />
        <span>Drag to orbit • Scroll to zoom</span>
      </div>
    </div>
  );
}
