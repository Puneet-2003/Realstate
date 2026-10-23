"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraScrollRigProps {
  scrollProgress: number; // 0 to 1
  mouseParallax: { x: number; y: number };
  onUpdateDoorProgress: (val: number) => void;
  onUpdateInteriorGlow: (val: number) => void;
}

export function CameraScrollRig({
  scrollProgress,
  mouseParallax,
  onUpdateDoorProgress,
  onUpdateInteriorGlow,
}: CameraScrollRigProps) {
  const { camera } = useThree();

  // Define the continuous 3D camera trajectory through the building
  const cameraPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.4, 20.0),   // 0.00: Far Exterior Arrival (looking at mansion facade)
      new THREE.Vector3(0, 2.0, 12.0),   // 0.15: Moving along stepping stone water walkway
      new THREE.Vector3(0, 1.85, 5.8),   // 0.25: Right before grand portal threshold
      new THREE.Vector3(0, 1.75, 1.5),   // 0.35: Passing directly through the sliding glass doors!
      new THREE.Vector3(0, 1.75, -2.5),  // 0.45: Inside Foyer & Gallery
      new THREE.Vector3(-1.4, 1.7, -8.5),// 0.60: Great Hall Hearth & Sunken Lounge
      new THREE.Vector3(3.2, 1.8, -16.0),// 0.75: Gliding out to the Cantilever Deck & Horizon Pool
      new THREE.Vector3(0.5, 3.8, -11.0),// 0.88: Ascending to the Upper Mezzanine
      new THREE.Vector3(0, 4.4, -6.0),   // 1.00: Sky Observatory & 300° Panoramic Horizon
    ]);
  }, []);

  // Define the lookAt focus target corresponding to each stage of the journey
  const lookPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.2, 0.0),    // 0.00: Looking at the grand glass entrance facade
      new THREE.Vector3(0, 2.0, -2.0),   // 0.15: Looking toward the glowing portal
      new THREE.Vector3(0, 1.85, -5.0),  // 0.25: Looking into the warm interior
      new THREE.Vector3(0, 1.8, -8.0),   // 0.35: Looking ahead into the Great Hall
      new THREE.Vector3(0, 1.8, -11.0),  // 0.45: Focusing on the living volume
      new THREE.Vector3(2.0, 1.5, -13.0),// 0.60: Looking at the sunken lounge & fireplace
      new THREE.Vector3(10.5, 1.2, -26.0),// 0.75: Looking down the length of the infinity pool
      new THREE.Vector3(3.5, 2.5, -18.0),// 0.88: Looking across the double-height volume
      new THREE.Vector3(0, 3.5, -24.0),  // 1.00: Looking out to the endless sunset horizon
    ]);
  }, []);

  const currentLookAt = useRef(new THREE.Vector3(0, 2.2, 0));

  useFrame((_, delta) => {
    // Clamp progress
    const t = THREE.MathUtils.clamp(scrollProgress, 0.0001, 0.9999);

    // Calculate target camera position along the spline
    const targetCamPos = cameraPath.getPointAt(t);

    // Add subtle pointer parallax on desktop
    targetCamPos.x += mouseParallax.x * 0.4;
    targetCamPos.y += mouseParallax.y * 0.25;

    // Smoothly lerp camera position for buttery physical mass feel
    camera.position.lerp(targetCamPos, delta * 4.5);

    // Calculate target lookAt point along the target spline
    const targetLookPoint = lookPath.getPointAt(t);
    targetLookPoint.x += mouseParallax.x * 0.25;
    targetLookPoint.y += mouseParallax.y * 0.15;

    currentLookAt.current.lerp(targetLookPoint, delta * 4.5);
    camera.lookAt(currentLookAt.current);

    // Door animation trigger: sliding doors open smoothly between t: 0.18 and 0.38
    let doorVal = 0;
    if (t > 0.18 && t < 0.42) {
      doorVal = THREE.MathUtils.smoothstep(t, 0.18, 0.32);
    } else if (t >= 0.42) {
      doorVal = 1;
    }
    onUpdateDoorProgress(doorVal);

    // Interior glow ramp: softens as user enters the interior (after t: 0.26)
    const glowVal = THREE.MathUtils.smoothstep(t, 0.22, 0.45);
    onUpdateInteriorGlow(glowVal);
  });

  return null;
}
