"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BuildingSceneProps {
  doorProgress: number; // 0 (closed) to 1 (fully open)
  interiorGlow: number; // 0 to 1
  selectedHotspot: string | null;
  onSelectHotspot: (id: string) => void;
}

export function BuildingScene({
  doorProgress,
  interiorGlow,
  selectedHotspot,
  onSelectHotspot,
}: BuildingSceneProps) {
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);
  const fireLightRef = useRef<THREE.PointLight>(null);
  const waterRef = useRef<THREE.Mesh>(null);

  // Smooth door sliding & fire flicker
  useFrame((state, delta) => {
    // Sliding doors
    if (leftDoorRef.current) {
      const targetX = -doorProgress * 1.6;
      leftDoorRef.current.position.x = THREE.MathUtils.lerp(
        leftDoorRef.current.position.x,
        targetX,
        delta * 6
      );
    }
    if (rightDoorRef.current) {
      const targetX = doorProgress * 1.6;
      rightDoorRef.current.position.x = THREE.MathUtils.lerp(
        rightDoorRef.current.position.x,
        targetX,
        delta * 6
      );
    }

    // Fireplace flicker
    if (fireLightRef.current) {
      const flicker = Math.sin(state.clock.elapsedTime * 9) * 0.25 + 0.9;
      fireLightRef.current.intensity = flicker * (0.8 + interiorGlow * 1.5);
    }

    // Water ripple subtle effect
    if (waterRef.current) {
      const mat = waterRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.roughness = 0.08 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
      }
    }
  });

  return (
    <group>
      {/* ================= AMBIENT & DIRECTIONAL LIGHTING ================= */}
      <ambientLight intensity={0.45} color="#2b2d42" />
      
      {/* Sunset Golden Hour Sun */}
      <directionalLight
        position={[-18, 14, -20]}
        intensity={2.2}
        color="#f4a261"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Blue Hour Sky Fill */}
      <directionalLight position={[15, 12, 15]} intensity={0.6} color="#457b9d" />

      {/* ================= EXTERIOR ENVIRONMENT ================= */}
      {/* Distant Canyon Silhouette & Horizon */}
      <mesh position={[0, -2, -60]} receiveShadow>
        <planeGeometry args={[180, 50]} />
        <meshBasicMaterial color="#0c0d14" />
      </mesh>

      {/* Ground Landscape Plinth */}
      <mesh position={[0, -0.4, -4]} receiveShadow>
        <boxGeometry args={[44, 0.6, 56]} />
        <meshStandardMaterial color="#111116" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Entrance Front Reflection Pool */}
      <mesh position={[0, -0.06, 9]} receiveShadow>
        <boxGeometry args={[16, 0.2, 10]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.4} />
      </mesh>
      {/* Front Pool Water */}
      <mesh position={[0, 0.04, 9]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15.6, 9.6]} />
        <meshStandardMaterial
          color="#102538"
          roughness={0.06}
          metalness={0.8}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Stepping Stone Pathway Across Front Reflection Pool */}
      {[-3, -1.5, 0, 1.5, 3].map((z, i) => (
        <mesh key={`step-${i}`} position={[0, 0.08, 9 + z]} receiveShadow>
          <boxGeometry args={[3.2, 0.12, 1.1]} />
          <meshStandardMaterial color="#22222a" roughness={0.6} metalness={0.2} />
        </mesh>
      ))}

      {/* Entrance Pathway Recessed Ground Lights */}
      {[-1.8, 1.8].map((x, i) =>
        [5, 7.5, 10, 12.5].map((z, j) => (
          <group key={`light-peg-${i}-${j}`} position={[x, 0.1, z]}>
            <mesh>
              <cylinderGeometry args={[0.06, 0.06, 0.08, 12]} />
              <meshBasicMaterial color="#dfc293" />
            </mesh>
            <pointLight color="#dfc293" intensity={0.35} distance={2.5} />
          </group>
        ))
      )}

      {/* Sculptural Minimalist Trees */}
      {[-8, 8, -9, 9].map((x, i) => (
        <group key={`tree-${i}`} position={[x, 0, 6 + (i % 2) * 4]}>
          <mesh position={[0, 1.6, 0]}>
            <cylinderGeometry args={[0.08, 0.14, 3.2, 8]} />
            <meshStandardMaterial color="#1a1412" roughness={0.9} />
          </mesh>
          <mesh position={[0, 3.2, 0]}>
            <coneGeometry args={[0.9, 2.2, 8]} />
            <meshStandardMaterial color="#1d2e24" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ================= BUILDING STRUCTURE ================= */}
      {/* Main Floor Slab (Granite & Marble) */}
      <mesh position={[0, 0.02, -10]} receiveShadow>
        <boxGeometry args={[26, 0.15, 30]} />
        <meshStandardMaterial color="#15151c" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Monumental Cantilevered Roof Canopy */}
      <mesh position={[0, 6.2, -8]} castShadow receiveShadow>
        <boxGeometry args={[32, 0.4, 38]} />
        <meshStandardMaterial color="#0c0c12" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Warm Underside Roof Recessed LED Strips */}
      {[-8, -2, 4, 10].map((z, i) => (
        <mesh key={`roof-led-${i}`} position={[0, 5.98, z]}>
          <boxGeometry args={[24, 0.04, 0.12]} />
          <meshBasicMaterial color="#eed8b1" />
        </mesh>
      ))}
      <pointLight position={[0, 5.8, -4]} color="#ffeedd" intensity={1.8 + interiorGlow * 1.5} distance={16} />

      {/* Massive Exterior Portal Columns (Roman Travertine) */}
      <mesh position={[-4.5, 2.8, 4]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 5.6, 1.2]} />
        <meshStandardMaterial color="#2d2826" roughness={0.6} />
      </mesh>
      <mesh position={[4.5, 2.8, 4]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 5.6, 1.2]} />
        <meshStandardMaterial color="#2d2826" roughness={0.6} />
      </mesh>

      {/* Entrance Header Beam */}
      <mesh position={[0, 5.2, 4]} castShadow>
        <boxGeometry args={[10.2, 0.8, 1.2]} />
        <meshStandardMaterial color="#16161f" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Glass Wall Surrounding Entrance */}
      <mesh position={[-6.2, 2.7, 4]}>
        <boxGeometry args={[2.2, 5.4, 0.1]} />
        <meshPhysicalMaterial
          color="#112233"
          transmission={0.8}
          roughness={0.08}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh position={[6.2, 2.7, 4]}>
        <boxGeometry args={[2.2, 5.4, 0.1]} />
        <meshPhysicalMaterial
          color="#112233"
          transmission={0.8}
          roughness={0.08}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* ================= ANIMATED SLIDING ENTRANCE DOORS ================= */}
      {/* Portal Opening is from X: -2.8 to +2.8 at Z: 4 */}
      <group position={[0, 0, 4]}>
        {/* Left Sliding Glass Door */}
        <group ref={leftDoorRef} position={[-1.4, 2.4, 0]}>
          {/* Glass Pane */}
          <mesh castShadow>
            <boxGeometry args={[2.7, 4.8, 0.08]} />
            <meshPhysicalMaterial
              color="#2a3b4c"
              transmission={0.85}
              roughness={0.06}
              transparent
              opacity={0.45}
              ior={1.52}
            />
          </mesh>
          {/* Door Frame Profile (Blackened Steel) */}
          <mesh>
            <boxGeometry args={[2.74, 4.84, 0.12]} />
            <meshStandardMaterial color="#08080a" roughness={0.2} metalness={0.9} wireframe />
          </mesh>
          {/* Bronze Architectural Handle */}
          <mesh position={[1.1, 0, 0.1]}>
            <cylinderGeometry args={[0.025, 0.025, 1.6, 12]} />
            <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Right Sliding Glass Door */}
        <group ref={rightDoorRef} position={[1.4, 2.4, 0]}>
          {/* Glass Pane */}
          <mesh castShadow>
            <boxGeometry args={[2.7, 4.8, 0.08]} />
            <meshPhysicalMaterial
              color="#2a3b4c"
              transmission={0.85}
              roughness={0.06}
              transparent
              opacity={0.45}
              ior={1.52}
            />
          </mesh>
          {/* Door Frame Profile */}
          <mesh>
            <boxGeometry args={[2.74, 4.84, 0.12]} />
            <meshStandardMaterial color="#08080a" roughness={0.2} metalness={0.9} wireframe />
          </mesh>
          {/* Bronze Architectural Handle */}
          <mesh position={[-1.1, 0, 0.1]}>
            <cylinderGeometry args={[0.025, 0.025, 1.6, 12]} />
            <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* ================= INTERIOR: FOYER & VESTIBULE (Z: 3 to -3) ================= */}
      {/* Foyer Floating Console Table */}
      <mesh position={[0, 0.8, 0.5]} castShadow>
        <boxGeometry args={[3.2, 0.1, 0.8]} />
        <meshStandardMaterial color="#0b0b0e" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Console Bronze Sculpture */}
      <mesh position={[0, 1.3, 0.5]} castShadow>
        <torusKnotGeometry args={[0.26, 0.08, 64, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* Picture Spotlight */}
      <pointLight position={[0, 3.2, 0.5]} color="#ffecd1" intensity={1.5} distance={5} />

      {/* Left Interior Wall (Textured Dark Oak Slats) */}
      <mesh position={[-7.5, 2.7, -4]} receiveShadow>
        <boxGeometry args={[0.3, 5.4, 16]} />
        <meshStandardMaterial color="#141110" roughness={0.7} />
      </mesh>

      {/* Large Format Gallery Artwork on Wall */}
      <mesh position={[-7.3, 2.8, -3]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4.5, 2.6]} />
        <meshStandardMaterial color="#4a3e35" roughness={0.8} />
      </mesh>

      {/* ================= INTERIOR: THE GREAT ENTERTAINING PAVILION (Z: -6 to -16) ================= */}
      {/* Sunken Lounge Foundation */}
      <mesh position={[1.5, -0.25, -11]} receiveShadow>
        <boxGeometry args={[7.5, 0.4, 7.5]} />
        <meshStandardMaterial color="#0c0c10" roughness={0.5} />
      </mesh>

      {/* Modular Sectional Sofa in Ivory Boucle */}
      {/* Backrest */}
      <mesh position={[1.5, 0.45, -13.8]} castShadow>
        <boxGeometry args={[6.2, 0.7, 0.8]} />
        <meshStandardMaterial color="#ebe6dc" roughness={0.9} />
      </mesh>
      {/* Side Return Left */}
      <mesh position={[-1.2, 0.45, -11.5]} castShadow>
        <boxGeometry args={[0.8, 0.7, 3.8]} />
        <meshStandardMaterial color="#ebe6dc" roughness={0.9} />
      </mesh>
      {/* Cushions Seating */}
      <mesh position={[1.5, 0.2, -12]} castShadow>
        <boxGeometry args={[4.8, 0.35, 3.2]} />
        <meshStandardMaterial color="#dcd6cb" roughness={0.9} />
      </mesh>

      {/* Low Marble Coffee Table */}
      <mesh position={[1.5, 0.22, -10.2]} castShadow>
        <boxGeometry args={[2.8, 0.22, 1.4]} />
        <meshStandardMaterial color="#f0eee9" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Champagne Flutes & Decanter on Table */}
      <mesh position={[1.2, 0.4, -10.2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.2, 12]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.05} />
      </mesh>
      <mesh position={[1.8, 0.42, -10.2]}>
        <cylinderGeometry args={[0.06, 0.08, 0.24, 12]} />
        <meshPhysicalMaterial color="#eed8b1" transmission={0.9} roughness={0.05} />
      </mesh>

      {/* Monumental Monolithic Floating Fireplace (Black Quartzite) */}
      <mesh position={[-4.5, 2.5, -11]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 4.8, 4.5]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.8} />
      </mesh>
      {/* Firebox Opening */}
      <mesh position={[-3.38, 1.4, -11]}>
        <boxGeometry args={[0.2, 1.2, 3.2]} />
        <meshBasicMaterial color="#1a0a00" />
      </mesh>
      {/* Ember Glow Bed */}
      <mesh position={[-3.3, 0.95, -11]}>
        <boxGeometry args={[0.3, 0.1, 2.8]} />
        <meshBasicMaterial color="#ff5500" />
      </mesh>
      {/* Animated Fireplace Light */}
      <pointLight
        ref={fireLightRef}
        position={[-3.0, 1.5, -11]}
        color="#ff7700"
        intensity={2.2}
        distance={8}
      />

      {/* Suspended Circular Minimalist Chandelier Ring */}
      <group position={[1.5, 4.8, -11]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.8, 0.04, 16, 64]} />
          <meshBasicMaterial color="#ffeedd" />
        </mesh>
        <pointLight color="#fff0db" intensity={2.4} distance={9} />
      </group>

      {/* Sculptural Floating Bronze Staircase */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={`stair-${i}`}
          position={[-6.2 + i * 0.25, 0.3 + i * 0.32, -6 - i * 0.6]}
          castShadow
        >
          <boxGeometry args={[1.6, 0.08, 0.45]} />
          <meshStandardMaterial color="#886b43" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Floor-to-Ceiling West Glass Facade Overlooking the Terrace & Horizon */}
      <mesh position={[8.5, 2.8, -12]}>
        <boxGeometry args={[0.1, 5.6, 18]} />
        <meshPhysicalMaterial
          color="#334455"
          transmission={0.88}
          roughness={0.05}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* ================= OUTDOOR: CANTILEVER DECK & HORIZON POOL (Z: -16 to -30) ================= */}
      {/* Teak Slatted Terrace Deck Plinth */}
      <mesh position={[8, -0.05, -23]} receiveShadow>
        <boxGeometry args={[12, 0.3, 16]} />
        <meshStandardMaterial color="#2d221a" roughness={0.7} />
      </mesh>

      {/* 120ft Infinity Edge Cantilever Horizon Pool */}
      <mesh position={[10.5, 0.05, -23]} receiveShadow>
        <boxGeometry args={[6.5, 0.4, 15]} />
        <meshStandardMaterial color="#08090d" roughness={0.3} />
      </mesh>

      {/* Pool Water Surface */}
      <mesh
        ref={waterRef}
        position={[10.5, 0.18, -23]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[6.1, 14.6]} />
        <meshStandardMaterial
          color="#1282a2"
          roughness={0.06}
          metalness={0.85}
          transparent
          opacity={0.82}
        />
      </mesh>

      {/* Underwater Cyan LED Light Strips */}
      <pointLight position={[10.5, -0.1, -23]} color="#00ffff" intensity={2.8} distance={10} />
      <pointLight position={[10.5, -0.1, -18]} color="#00ffff" intensity={2.2} distance={8} />

      {/* Poolside Sun Loungers */}
      {[-20, -23, -26].map((z, i) => (
        <group key={`lounger-${i}`} position={[6.2, 0.25, z]} rotation={[0, Math.PI / 2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.9, 0.15, 0.8]} />
            <meshStandardMaterial color="#faf8f5" roughness={0.8} />
          </mesh>
          <mesh position={[-0.7, 0.25, 0]} rotation={[0, 0, 0.35]}>
            <boxGeometry args={[0.6, 0.12, 0.78]} />
            <meshStandardMaterial color="#f0ede6" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Al Fresco Sunset Fire Pit Bowl */}
      <group position={[6.5, 0.35, -17]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.7, 0.5, 0.35, 24]} />
          <meshStandardMaterial color="#1a1a1f" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.08, 24]} />
          <meshBasicMaterial color="#ff5500" />
        </mesh>
        <pointLight position={[0, 0.4, 0]} color="#ff7700" intensity={1.6} distance={6} />
      </group>

      {/* ================= UPPER MEZZANINE & OBSERVATORY SUITE (Y: 3.8 to 5.5, Z: -14 to -6) ================= */}
      {/* Mezzanine Upper Floor Slab */}
      <mesh position={[-2, 3.8, -10]} receiveShadow>
        <boxGeometry args={[10, 0.18, 12]} />
        <meshStandardMaterial color="#171720" roughness={0.4} />
      </mesh>

      {/* Mezzanine Smoked Glass Guardrail */}
      <mesh position={[3.0, 4.4, -10]}>
        <boxGeometry args={[0.06, 1.0, 12]} />
        <meshPhysicalMaterial
          color="#111116"
          transmission={0.8}
          roughness={0.1}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Upper Suite Executive Desk & Lounge */}
      <mesh position={[-3.5, 4.25, -12]} castShadow>
        <boxGeometry args={[2.4, 0.1, 1.0]} />
        <meshStandardMaterial color="#302016" roughness={0.5} />
      </mesh>
      {/* Ambient Mezzanine Warm Light */}
      <pointLight position={[-2, 5.2, -10]} color="#ffecd1" intensity={1.8} distance={8} />

      {/* ================= INTERACTIVE 3D HOTSPOTS ================= */}
      {[
        {
          id: "exterior",
          name: "Arrival Portal",
          pos: [0, 1.8, 6.5],
        },
        {
          id: "entrance",
          name: "Motorized Glazing",
          pos: [0, 2.2, 3.8],
        },
        {
          id: "hearth",
          name: "Quartzite Fireplace",
          pos: [-3.3, 2.0, -11],
        },
        {
          id: "pool",
          name: "120ft Horizon Pool",
          pos: [10.5, 1.0, -22],
        },
        {
          id: "mezzanine",
          name: "Sky Observatory",
          pos: [0, 4.5, -9],
        },
      ].map((spot) => {
        const isSelected = selectedHotspot === spot.id;
        return (
          <group key={spot.id} position={spot.pos as [number, number, number]}>
            <mesh onClick={() => onSelectHotspot(spot.id)}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial
                color={isSelected ? "#d4af37" : "#ffffff"}
                emissive={isSelected ? "#d4af37" : "#c5a880"}
                emissiveIntensity={isSelected ? 2 : 1}
              />
            </mesh>
            <pointLight
              color="#dfc293"
              intensity={isSelected ? 1.5 : 0.6}
              distance={3}
            />
          </group>
        );
      })}
    </group>
  );
}
