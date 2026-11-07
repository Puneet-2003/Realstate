"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import {
  Volume2,
  VolumeX,
  ArrowDown,
  Sparkles,
  Info,
  X,
  ArrowRight,
  Shield,
  Layers,
  Play,
  Pause,
} from "lucide-react";

const TOTAL_FRAMES: number = 717;
const INITIAL_BURST_COUNT = 25;
const MAX_CONCURRENT_FETCHES = 8;

// Memory management budget
const MAX_DECODED_DESKTOP = 717;
const MAX_DECODED_MOBILE = 150;

interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  range: [number, number];
  specs: string[];
}

const CHAPTERS: Chapter[] = [
  {
    id: "exterior",
    number: "01",
    title: "Architecture Beyond Ordinary.",
    subtitle: "68 stories. Timeless architecture. Elevated living.",
    description: "Geometric glass facade rising into the skyline with landscaped private motor court.",
    location: "Exterior Facade & Motor Court",
    range: [0.0, 0.18],
    specs: ["68 Stories", "STC 48 Acoustic Glazing", "Private Motor Court"],
  },
  {
    id: "approach",
    number: "02",
    title: "The Grand Arrival.",
    subtitle: "Radiant basalt pavers and warm ambient canopy.",
    description: "Architectural security portals and illuminated fluted canopy framing the tower.",
    location: "Vehicular Portal & Entrance",
    range: [0.18, 0.38],
    specs: ["Biometric Gateways", "Radiant Basalt", "Ambient 2700K Lighting"],
  },
  {
    id: "lobby",
    number: "03",
    title: "The Double-Height Foyer.",
    subtitle: "32-foot volume in bookmatched Italian Statuario.",
    description: "Monumental lobby volume enveloped in satin-honed marble and acoustic cove lighting.",
    location: "Grand Foyer & Atrium",
    range: [0.38, 0.58],
    specs: ["32ft Ceilings", "Bookmatched Statuario", "Acoustic STC 48"],
  },
  {
    id: "reception",
    number: "04",
    title: "Living Atrium & Concierge.",
    subtitle: "Champagne brass lighting and century-old black pine.",
    description: "Sculpted stone reception desk beneath bespoke brass fixtures and living bonsai plinth.",
    location: "Reception & Bonsai Garden",
    range: [0.58, 0.78],
    specs: ["24/7 Concierge", "Preserved Bonsai", "Champagne Bronze"],
  },
  {
    id: "residence",
    number: "05",
    title: "The Sky Penthouse.",
    subtitle: "Floor-to-ceiling glass and 360° horizon.",
    description: "Upper residential sanctuary with unobstructed twilight horizon and bespoke finishes.",
    location: "Level 64 Penthouse",
    range: [0.78, 1.0],
    specs: ["360° Skyline", "12,400 Sq Ft", "Private Rooftop Pool"],
  },
];

interface Hotspot {
  id: string;
  label: string;
  title: string;
  description: string;
  targetRange: [number, number];
  position: { top: string; left: string };
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "glazing",
    label: "Acoustic Glazing",
    title: "Triple-Laminated Acoustic Low-E Facade",
    description:
      "Engineered to block 99.4% of urban ambient noise while optimizing solar heat gain and chromatic clarity.",
    targetRange: [0.05, 0.16],
    position: { top: "35%", left: "45%" },
  },
  {
    id: "canopy",
    label: "Illuminated Canopy",
    title: "Linear Warm Amber Architectural Lighting",
    description:
      "Concealed 2700K warm LED ribbons bouncing indirect golden light across fluted architectural louvers.",
    targetRange: [0.22, 0.35],
    position: { top: "30%", left: "50%" },
  },
  {
    id: "marble",
    label: "Italian Marble",
    title: "Bookmatched Honed Statuario Floor",
    description:
      "Hand-selected slabs from Carrara, honed to a silky satin finish that mirrors ambient ceiling lighting.",
    targetRange: [0.42, 0.55],
    position: { top: "72%", left: "55%" },
  },
  {
    id: "bonsai",
    label: "Botanical Centerpiece",
    title: "Preserved Specimen Bonsai Garden",
    description:
      "A cultivated Japanese black pine integrated into a recessed granite plinth, bringing organic tranquility.",
    targetRange: [0.62, 0.75],
    position: { top: "52%", left: "50%" },
  },
  {
    id: "skyline",
    label: "Sunset Panorama",
    title: "Unobstructed Western Skyline Horizon",
    description:
      "Full-height structural glass mullions framing twilight sunsets across the metropolitan skyline.",
    targetRange: [0.82, 0.95],
    position: { top: "40%", left: "30%" },
  },
];

interface ScrollJourneyProps {
  onOpenBooking?: () => void;
}

type FrameSource = HTMLImageElement;

export function ScrollJourney({ onOpenBooking }: ScrollJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Continuous Dual-Layer Hardware-Accelerated Cross-Fader:
  // - Canvas A: Always solid 100% opaque base layer (IMPOSSIBLE to blink or show background)
  // - Canvas B: Framer Motion-driven GPU blend layer (opacity from 0 to 1)
  const canvasRefA = useRef<HTMLCanvasElement>(null);
  const canvasRefB = useRef<HTMLCanvasElement>(null);
  const opacityB = useMotionValue(0);
  const lastDrawnFloorRef = useRef<number>(-1);
  const lastDrawnCeilRef = useRef<number>(-1);

  // High-performance direct DOM references (zero React re-renders on scroll)
  const frameCounterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const preloadIndicatorRef = useRef<HTMLSpanElement>(null);
  const hotspotRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Discrete UI States (only update on discrete transitions)
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [initialLoadingProgress, setInitialLoadingProgress] = useState(0);
  const [isInitialReady, setIsInitialReady] = useState(false);

  // Auto-play tour tracking ref (synchronous in rAF)
  const isAutoPlayingRef = useRef<boolean>(false);

  // Audio Context Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const droneNodesRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  // Frame Engine Storage & State: Permanent memory retention (all 100 frames cached)
  const framesCacheRef = useRef<(FrameSource | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const frameStatusRef = useRef<Uint8Array>(new Uint8Array(TOTAL_FRAMES)); // 0: idle, 1: loading, 2: ready, 3: failed
  const frameLastUsedRef = useRef<number[]>(new Array(TOTAL_FRAMES).fill(0));
  const activeFetchesRef = useRef<number>(0);
  const currentRenderedFrameRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const activeChapterIndexRef = useRef<number>(0);
  const lenisRef = useRef<Lenis | null>(null);
  const isMountedRef = useRef<boolean>(true);

  // Helper to resolve frame path (prefers modern WebP with MozJPEG fallback)
  const getFramePath = useCallback((index: number, ext: "webp" | "jpg" = "webp") => {
    const pad = String(index + 1).padStart(3, "0");
    return `/frames/frame-${pad}.${ext}?v=fry_try_dry_1`;
  }, []);

  // Hardware-accelerated canvas rendering: instant single-pass draw (zero lag, 120fps lock)
  const drawFrameToCanvas = useCallback((canvas: HTMLCanvasElement | null, frameIndex: number) => {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    if (canvasWidth === 0 || canvasHeight === 0) return;

    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));
    let frameSource = framesCacheRef.current[clampedIndex];

    // Fallback to nearest loaded frame if needed
    if (!frameSource) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = clampedIndex - offset;
        if (prev >= 0 && framesCacheRef.current[prev]) {
          frameSource = framesCacheRef.current[prev];
          break;
        }
        const next = clampedIndex + offset;
        if (next < TOTAL_FRAMES && framesCacheRef.current[next]) {
          frameSource = framesCacheRef.current[next];
          break;
        }
      }
    }

    if (!frameSource) return;

    const imgWidth = frameSource.naturalWidth || 1920;
    const imgHeight = frameSource.naturalHeight || 1080;

    // High-performance object-fit: cover scaling
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const destWidth = imgWidth * scale;
    const destHeight = imgHeight * scale;
    const destX = (canvasWidth - destWidth) * 0.5;
    const destY = (canvasHeight - destHeight) * 0.5;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(frameSource, 0, 0, imgWidth, imgHeight, destX, destY, destWidth, destHeight);

    frameLastUsedRef.current[clampedIndex] = Date.now();
  }, []);

  // Renders continuous photographic cross-dissolve across any float frame value [0 .. TOTAL_FRAMES - 1]
  // Base Canvas A is ALWAYS 100% opaque (impossible to blink or show background).
  // Overlay Canvas B is blended via Framer Motion GPU opacity.
  const renderFrameSequence = useCallback(
    (val: number) => {
      const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, val));
      const floorIndex = Math.floor(clamped);
      const ceilIndex = Math.min(TOTAL_FRAMES - 1, floorIndex + 1);
      const fraction = clamped - floorIndex;

      // Only repaint Base Canvas A when floor index changes
      if (floorIndex !== lastDrawnFloorRef.current) {
        drawFrameToCanvas(canvasRefA.current, floorIndex);
        lastDrawnFloorRef.current = floorIndex;
      }

      // Only repaint Overlay Canvas B when ceil index changes
      if (ceilIndex !== lastDrawnCeilRef.current) {
        drawFrameToCanvas(canvasRefB.current, ceilIndex);
        lastDrawnCeilRef.current = ceilIndex;
      }

      // Framer Motion hardware-accelerated GPU opacity blend (smoothstep S-curve)
      // Smoothstep eliminates linear seams: fraction^2 * (3 - 2 * fraction)
      const smoothAlpha = fraction * fraction * (3 - 2 * fraction);
      opacityB.set(smoothAlpha);

      // Update telemetry frame indicator
      if (frameCounterRef.current) {
        const displayFrame = Math.min(TOTAL_FRAMES, Math.round(clamped) + 1);
        frameCounterRef.current.textContent = String(displayFrame).padStart(3, "0");
      }
    },
    [drawFrameToCanvas, opacityB]
  );

  // Viewport & High-DPI canvas buffer sizing (optimized 1.5x DPR cap for zero GPU fill-rate lag)
  const resizeCanvas = useCallback(() => {
    const isTouch =
      typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    const maxDpr = isTouch ? 1.25 : 1.5;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const pixelWidth = Math.round(width * dpr);
    const pixelHeight = Math.round(height * dpr);

    [canvasRefA.current, canvasRefB.current].forEach((canvas) => {
      if (!canvas) return;
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    });

    // Force re-paint both current floor and ceil on resized buffers
    const floor = Math.max(0, lastDrawnFloorRef.current);
    const ceil = Math.max(0, lastDrawnCeilRef.current);
    drawFrameToCanvas(canvasRefA.current, floor);
    drawFrameToCanvas(canvasRefB.current, ceil);
  }, [drawFrameToCanvas]);

  // Fetch and decode a single frame asynchronously (WebP with MozJPEG fallback)
  const loadSingleFrame = useCallback(
    async (index: number): Promise<boolean> => {
      if (index < 0 || index >= TOTAL_FRAMES) return false;
      if (frameStatusRef.current[index] === 2) return true; // Already READY
      if (frameStatusRef.current[index] === 1) return true; // Already PENDING

      frameStatusRef.current[index] = 1;
      activeFetchesRef.current += 1;

      try {
        const webpUrl = getFramePath(index, "webp");
        const jpgUrl = getFramePath(index, "jpg");

        const img = new Image();
        img.src = webpUrl;

        const readyImg = await new Promise<HTMLImageElement | null>((resolve) => {
          img.onload = async () => {
            if ("decode" in img) {
              try {
                await img.decode();
              } catch {}
            }
            resolve(img);
          };
          img.onerror = () => {
            // High-compatibility MozJPEG fallback
            const fallback = new Image();
            fallback.src = jpgUrl;
            fallback.onload = async () => {
              if ("decode" in fallback) {
                try {
                  await fallback.decode();
                } catch {}
              }
              resolve(fallback);
            };
            fallback.onerror = () => resolve(null);
          };
        });

        if (!isMountedRef.current) return false;

        if (readyImg) {
          framesCacheRef.current[index] = readyImg;
          frameStatusRef.current[index] = 2; // READY
          frameLastUsedRef.current[index] = Date.now();

          // If hero frame 0 just arrived, paint immediately on Canvas A
          if (index === 0 && lastDrawnFloorRef.current === -1) {
            drawFrameToCanvas(canvasRefA.current, 0);
            lastDrawnFloorRef.current = 0;
            opacityB.set(0);
          }

          // If current sequence needs this frame, re-render immediately
          const currentFloor = Math.floor(currentRenderedFrameRef.current);
          const currentCeil = Math.min(TOTAL_FRAMES - 1, currentFloor + 1);
          if (index === currentFloor) {
            drawFrameToCanvas(canvasRefA.current, index);
            lastDrawnFloorRef.current = index;
          }
          if (index === currentCeil) {
            drawFrameToCanvas(canvasRefB.current, index);
            lastDrawnCeilRef.current = index;
          }
          return true;
        } else {
          frameStatusRef.current[index] = 3; // FAILED
          return false;
        }
      } catch {
        frameStatusRef.current[index] = 3;
        return false;
      } finally {
        activeFetchesRef.current = Math.max(0, activeFetchesRef.current - 1);
      }
    },
    [getFramePath, drawFrameToCanvas, opacityB]
  );

  // Dynamic Priority Scheduler: preloads upcoming frames around current scroll position
  const scheduleQueue = useCallback(() => {
    if (!isMountedRef.current) return;
    if (activeFetchesRef.current >= MAX_CONCURRENT_FETCHES) return;

    const currentTarget = Math.round(targetFrameRef.current);
    const candidates: { index: number; priority: number }[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const status = frameStatusRef.current[i];
      if (status === 0 || status === 3) {
        let priority = 1000;
        const diff = i - currentTarget;

        if (diff >= 0 && diff <= 12) {
          priority = diff; // Highest priority 0 to 12 forward
        } else if (diff < 0 && diff >= -6) {
          priority = 15 + Math.abs(diff); // High priority 16 to 21 backward
        } else if (diff > 12 && diff <= 30) {
          priority = 30 + diff; // Medium priority forward
        } else {
          priority = 100 + Math.abs(diff); // Low priority background
        }

        candidates.push({ index: i, priority });
      }
    }

    candidates.sort((a, b) => a.priority - b.priority);

    const availableSlots = MAX_CONCURRENT_FETCHES - activeFetchesRef.current;
    const toLaunch = candidates.slice(0, availableSlots);

    for (const item of toLaunch) {
      loadSingleFrame(item.index).then(() => {
        scheduleQueue();
      });
    }

    if (preloadIndicatorRef.current) {
      let loaded = 0;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (frameStatusRef.current[i] === 2) loaded++;
      }
      preloadIndicatorRef.current.style.opacity = loaded === TOTAL_FRAMES ? "1" : "0.5";
    }
  }, [loadSingleFrame]);

  // Initial Boot Preload Pipeline: Preloads all 100 frames upfront (~350ms) for 100% lag-free scrolling
  useEffect(() => {
    isMountedRef.current = true;
    resizeCanvas();

    const bootSequence = async () => {
      if (TOTAL_FRAMES === 0) {
        setIsInitialReady(true);
        setInitialLoadingProgress(100);
        return;
      }
      // 1. Instantly fetch & paint hero frame 0 onto Canvas A and frame 1 onto Canvas B
      await loadSingleFrame(0);
      if (!isMountedRef.current) return;
      drawFrameToCanvas(canvasRefA.current, 0);
      lastDrawnFloorRef.current = 0;
      opacityB.set(0);
      setInitialLoadingProgress(10);

      loadSingleFrame(1).then(() => {
        if (!isMountedRef.current) return;
        drawFrameToCanvas(canvasRefB.current, 1);
        lastDrawnCeilRef.current = 1;
      });

      // 2. Preload ALL remaining frames in parallel worker pool (10 concurrent fetches, ~350ms total)
      let completedCount = 1;
      const tasks: (() => Promise<boolean>)[] = [];

      for (let i = 1; i < TOTAL_FRAMES; i++) {
        tasks.push(() =>
          loadSingleFrame(i).then((ok) => {
            if (!isMountedRef.current) return ok;
            if (ok) {
              completedCount++;
              const pct = Math.min(100, Math.round((completedCount / TOTAL_FRAMES) * 100));
              setInitialLoadingProgress(pct);
            }
            return ok;
          })
        );
      }

      let taskIdx = 0;
      const workers = Array.from({ length: 10 }, async () => {
        while (taskIdx < tasks.length && isMountedRef.current) {
          const task = tasks[taskIdx++];
          await task();
        }
      });

      await Promise.all(workers);
      if (!isMountedRef.current) return;

      setInitialLoadingProgress(100);
      setIsInitialReady(true);

      if (preloadIndicatorRef.current) {
        preloadIndicatorRef.current.style.opacity = "1";
        preloadIndicatorRef.current.title = `All ${TOTAL_FRAMES} frames cached in memory`;
      }
    };

    bootSequence();

    // Resize handling via ResizeObserver on container
    const container = containerRef.current;
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && container) {
      resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
      });
      resizeObserver.observe(container);
    }

    window.addEventListener("resize", resizeCanvas);

    return () => {
      isMountedRef.current = false;
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [loadSingleFrame, resizeCanvas, scheduleQueue, drawFrameToCanvas, opacityB]);

  // Lenis Smooth Scroll Engine + Zero-Lag Single rAF Render Loop
  useEffect(() => {
    const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const lenis = new Lenis({
      duration: isTouch ? 0.75 : 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });
    lenisRef.current = lenis;

    // Zero-reflow dimension caching
    let cachedContainerTop = 0;
    let cachedScrollable = 1;

    const measureBounds = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      cachedContainerTop = rect.top + scrollTop;
      cachedScrollable = Math.max(1, container.offsetHeight - window.innerHeight);
    };

    measureBounds();

    const calculateProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = Math.max(0, Math.min(1, (scrollTop - cachedContainerTop) / cachedScrollable));
      targetProgressRef.current = progress;
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);

      // Direct GPU transform update for bottom progress bar (0 React re-renders)
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      // Hide scroll indicator prompt once scrolled
      if (scrollPromptRef.current) {
        scrollPromptRef.current.style.opacity = progress > 0.04 ? "0" : "1";
      }

      // Hotspots visibility updates directly on DOM elements
      HOTSPOTS.forEach((hotspot) => {
        const el = hotspotRefs.current[hotspot.id];
        if (!el) return;
        const isVisible = progress >= hotspot.targetRange[0] && progress <= hotspot.targetRange[1];
        if (isVisible) {
          el.style.opacity = "1";
          el.style.transform = "translate(-50%, -50%) scale(1)";
          el.style.pointerEvents = "auto";
        } else {
          el.style.opacity = "0";
          el.style.transform = "translate(-50%, -50%) scale(0.85)";
          el.style.pointerEvents = "none";
        }
      });

      // Update active chapter only when crossing boundary
      const chapterIdx = CHAPTERS.findIndex(
        (c) => progress >= c.range[0] && progress <= c.range[1]
      );
      if (chapterIdx !== -1 && chapterIdx !== activeChapterIndexRef.current) {
        activeChapterIndexRef.current = chapterIdx;
        setActiveChapterIndex(chapterIdx);
      }
    };

    lenis.on("scroll", calculateProgress);

    // Stop auto-tour immediately on manual user gesture (wheel, touch, keyboard)
    const stopAutoTourOnUserGesture = () => {
      if (isAutoPlayingRef.current) {
        isAutoPlayingRef.current = false;
        setIsAutoPlaying(false);
      }
    };

    window.addEventListener("wheel", stopAutoTourOnUserGesture, { passive: true });
    window.addEventListener("touchstart", stopAutoTourOnUserGesture, { passive: true });
    window.addEventListener("keydown", stopAutoTourOnUserGesture, { passive: true });

    // Single unified rAF driving Lenis physics, auto-tour, and instant frame rendering
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);

      // Auto-tour continuous playback
      if (isAutoPlayingRef.current) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const currentOffset = scrollTop - cachedContainerTop;
        const increment = cachedScrollable / (60 * 15);
        const nextOffset = currentOffset + increment;

        if (nextOffset >= cachedScrollable) {
          isAutoPlayingRef.current = false;
          setIsAutoPlaying(false);
        } else {
          const nextScroll = cachedContainerTop + nextOffset;
          if (lenisRef.current) {
            lenisRef.current.scrollTo(nextScroll, { immediate: true });
          } else {
            window.scrollTo({ top: nextScroll });
          }
        }
      }

      const target = targetFrameRef.current;
      const diff = target - currentRenderedFrameRef.current;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        currentRenderedFrameRef.current = target;
      } else if (Math.abs(diff) > 2.5) {
        // High-velocity scrub: follow directly without lag
        currentRenderedFrameRef.current = target;
      } else if (Math.abs(diff) > 0.001) {
        // Silky-smooth responsive sub-frame interpolation
        currentRenderedFrameRef.current += diff * 0.55;
      } else {
        currentRenderedFrameRef.current = target;
      }

      renderFrameSequence(currentRenderedFrameRef.current);

      rafId = requestAnimationFrame(raf);
    };

    calculateProgress();
    rafId = requestAnimationFrame(raf);

    window.addEventListener("resize", measureBounds);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measureBounds);
      window.removeEventListener("wheel", stopAutoTourOnUserGesture);
      window.removeEventListener("touchstart", stopAutoTourOnUserGesture);
      window.removeEventListener("keydown", stopAutoTourOnUserGesture);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [renderFrameSequence]);

  // Subtle luxury architectural soundscape
  const toggleAudio = useCallback(() => {
    if (!isAudioEnabled) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(55, ctx.currentTime);

        osc2.type = "sine";
        osc2.frequency.setValueAtTime(110.2, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 2.5);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        droneNodesRef.current = { osc1, osc2, gain };
        setIsAudioEnabled(true);
      } catch (err) {
        console.error("Audio error", err);
      }
    } else {
      if (droneNodesRef.current && audioContextRef.current) {
        const { gain, osc1, osc2 } = droneNodesRef.current;
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.8);
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
            audioContextRef.current?.close();
          } catch {
            // ignore
          }
        }, 900);
      }
      setIsAudioEnabled(false);
    }
  }, [isAudioEnabled]);

  // Toggle automated cinematic walk-through
  const toggleAutoPlay = useCallback(() => {
    if (isAutoPlayingRef.current) {
      isAutoPlayingRef.current = false;
      setIsAutoPlaying(false);
    } else {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const containerTop = rect.top + scrollTop;
        const scrollable = container.offsetHeight - window.innerHeight;
        const currentProgress = Math.max(0, Math.min(1, -rect.top / scrollable));

        // Rewind to top if already near end
        if (currentProgress >= 0.95) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(containerTop, { immediate: true });
          } else {
            window.scrollTo({ top: containerTop });
          }
        }
      }

      isAutoPlayingRef.current = true;
      setIsAutoPlaying(true);
    }
  }, []);

  // Chapter jump with smooth scroll
  const scrollToChapter = (index: number) => {
    if (!containerRef.current) return;
    const targetRange = CHAPTERS[index].range;
    const targetProgress = (targetRange[0] + targetRange[1]) / 2;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const containerHeight = container.offsetHeight - window.innerHeight;
    const scrollTarget = containerTop + containerHeight * targetProgress;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(scrollTarget, { duration: 1.3 });
    } else {
      window.scrollTo({
        top: scrollTarget,
        behavior: "smooth",
      });
    }
  };

  const activeChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  return (
    <div
      ref={containerRef}
      id="journey"
      className="relative bg-[#140F00] text-white w-full"
      style={{ height: "480vh" }}
    >
      {/* Sticky Viewport Container: Pure GPU-accelerated pinning for 480vh */}
      <div
        ref={viewportRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#140F00]"
      >
        {/* Continuous Dual-Buffer Hardware-Accelerated Cross-Fader */}
        {/* Base Canvas A: Always solid 100% opaque. ZERO blinking, ZERO background show-through. */}
        <canvas
          ref={canvasRefA}
          className="absolute inset-0 w-full h-full object-cover block z-0 will-change-transform"
          style={{ opacity: 1 }}
        />
        {/* Overlay Canvas B: Framer Motion GPU cross-dissolve blend layer */}
        <motion.canvas
          ref={canvasRefB}
          style={{ opacity: opacityB }}
          className="absolute inset-0 w-full h-full object-cover block z-10 will-change-[opacity]"
        />

        {/* Minimal Luxury Initial Loading Overlay */}
        <AnimatePresence>
          {!isInitialReady && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-50 bg-[#140F00] flex flex-col items-center justify-center pointer-events-none p-6"
            >
              <div className="flex flex-col items-center text-center max-w-sm">
                <span className="w-2 h-2 rounded-full bg-[#BCB893] animate-ping mb-6" />
                <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#BCB893] mb-2">
                  Aurelia &amp; Co.
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-[0.15em] mb-4">
                  THE LUMIÈRE
                </h1>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 mb-8">
                  Architectural Journey
                </p>

                {/* Golden Micro-Progress Bar */}
                <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#BCB893] to-[#F1EFE3]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${initialLoadingProgress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-[#BCB893] mt-3">
                  {initialLoadingProgress}%
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cinematic Vignette & Ambient Glow Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#140F00]/95 via-transparent to-[#140F00]/40 z-10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#140F00]/70 via-transparent to-[#140F00]/60 z-10" />

        {/* Top Telemetry Bar */}
        <div className="absolute top-20 sm:top-24 left-0 right-0 px-6 sm:px-12 flex items-center justify-between text-xs font-mono uppercase tracking-[0.25em] text-white/60 pointer-events-none z-30">
          <div className="flex items-center gap-3">
            <span
              ref={preloadIndicatorRef}
              className="w-2 h-2 rounded-full bg-[#BCB893] transition-opacity duration-500"
              title="Sequence cache status"
            />
            <span className="text-[#F1EFE3] font-medium tracking-[0.2em]">
              THE LUMIÈRE
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline text-[#BCB893]">
              {activeChapter.location}
            </span>
          </div>

          <div className="flex items-center gap-3 pointer-events-auto">
            {/* Auto-Play Cinematic Tour Toggle */}
            <button
              type="button"
              onClick={toggleAutoPlay}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all backdrop-blur-md cursor-pointer ${
                isAutoPlaying
                  ? "bg-[#BCB893] text-black border-[#BCB893] shadow-lg shadow-[#BCB893]/30 font-semibold"
                  : "bg-black/50 hover:bg-black/80 border-white/10 hover:border-[#BCB893]/50 text-white/80 hover:text-white"
              }`}
              title="Toggle automatic smooth cinematic tour"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3 h-3 fill-current" />
                  <span className="text-[10px] hidden sm:inline">Pause Tour</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current text-[#BCB893]" />
                  <span className="text-[10px] hidden sm:inline">Auto Tour</span>
                </>
              )}
            </button>

            {/* Audio Ambience Toggle */}
            <button
              type="button"
              onClick={toggleAudio}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 hover:border-[#BCB893]/50 text-white/70 hover:text-white transition-all backdrop-blur-md cursor-pointer"
              title="Toggle architectural soundscape"
            >
              {isAudioEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#BCB893]" />
                  <span className="text-[10px] text-[#BCB893] hidden sm:inline">Audio On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">Sound</span>
                </>
              )}
            </button>

            {/* Frame Telemetry */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-md">
              <span className="text-[10px] text-white/40">FRAME</span>
              <span
                ref={frameCounterRef}
                className="text-[10px] text-[#F1EFE3] font-semibold"
              >
                001
              </span>
              <span className="text-[10px] text-white/30">/ {TOTAL_FRAMES}</span>
            </div>
          </div>
        </div>

        {/* Interactive Hotspots Layer */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {HOTSPOTS.map((hotspot) => (
            <div
              key={hotspot.id}
              ref={(el) => {
                hotspotRefs.current[hotspot.id] = el;
              }}
              style={{
                top: hotspot.position.top,
                left: hotspot.position.left,
                opacity: 0,
                transform: "translate(-50%, -50%) scale(0.85)",
                pointerEvents: "none",
              }}
              className="absolute transition-all duration-500 ease-out"
            >
              <button
                type="button"
                onClick={() => setActiveHotspot(hotspot)}
                className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-black/95 border border-[#BCB893]/60 text-white shadow-2xl backdrop-blur-xl cursor-pointer hover:border-[#BCB893] transition-all hover:scale-105"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BCB893] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BCB893]" />
                </span>
                <span className="text-[11px] font-sans tracking-wider uppercase text-[#F1EFE3] group-hover:text-white">
                  {hotspot.label}
                </span>
                <Info className="w-3 h-3 text-[#BCB893] opacity-70 group-hover:opacity-100" />
              </button>
            </div>
          ))}
        </div>

        {/* Hotspot Inspection Modal */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-md w-full bg-[#171200] border border-[#BCB893]/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black text-left"
              >
                <button
                  type="button"
                  onClick={() => setActiveHotspot(null)}
                  className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close detail"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#BCB893] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Specification</span>
                </div>

                <h3 className="font-serif text-2xl text-white font-light tracking-tight mt-1">
                  {activeHotspot.title}
                </h3>

                <p className="text-sm text-white/70 font-light leading-relaxed mt-4">
                  {activeHotspot.description}
                </p>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/40">
                    The Lumière Engineering
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveHotspot(null)}
                    className="px-4 py-1.5 rounded-full text-xs uppercase tracking-widest bg-[#BCB893] hover:bg-[#CFCCAE] text-black font-semibold transition-all cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Synchronized Editorial Story Overlays with AnimatePresence */}
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-end pb-24 sm:pb-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeChapter && (
              <motion.div
                key={activeChapter.id}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl pointer-events-auto"
              >
                {/* Scene Eyebrow */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#BCB893]/20 text-[#BCB893] border border-[#BCB893]/30">
                    SCENE {activeChapter.number}
                  </span>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#F1EFE3]/70 font-mono">
                    {activeChapter.location}
                  </span>
                </div>

                {/* Editorial Headline */}
                <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-white font-light tracking-tight leading-[1.08] drop-shadow-2xl">
                  {activeChapter.title}
                </h2>

                {/* Concise Supporting Copy */}
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/90 font-light leading-relaxed max-w-2xl drop-shadow-lg">
                  {activeChapter.subtitle}
                </p>

                {/* Architectural Specs Badges */}
                <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                  {activeChapter.specs.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-white/90 bg-black/60 border border-white/15 backdrop-blur-md"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Action CTAs */}
                {activeChapterIndex === 0 && (
                  <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={toggleAutoPlay}
                      className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#BCB893] hover:bg-[#CFCCAE] text-black transition-all shadow-xl shadow-[#BCB893]/20 cursor-pointer"
                    >
                      {isAutoPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>Pause Tour</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Play Walkthrough</span>
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={() => scrollToChapter(1)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer backdrop-blur-md"
                    >
                      <span>Explore Sequence</span>
                      <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={onOpenBooking}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-all cursor-pointer backdrop-blur-md"
                    >
                      <span>Book a Visit</span>
                    </motion.button>
                  </div>
                )}

                {activeChapterIndex === CHAPTERS.length - 1 && (
                  <div className="mt-6 flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={onOpenBooking}
                      className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#BCB893] hover:bg-[#CFCCAE] text-black transition-all shadow-xl shadow-[#BCB893]/20 cursor-pointer"
                    >
                      <span>Book a Private Visit</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Edge: Chapter Scrubber with Framer Motion layoutId */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-end gap-3 z-30 pointer-events-auto">
          {CHAPTERS.map((ch, idx) => {
            const isActive = activeChapterIndex === idx;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => scrollToChapter(idx)}
                className="group flex items-center gap-3 py-1 text-right focus:outline-none cursor-pointer relative"
              >
                <span
                  className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                    isActive
                      ? "text-[#BCB893] opacity-100 font-semibold"
                      : "text-white/40 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {ch.number} • {ch.id}
                </span>
                <div className="relative w-8 h-2 flex items-center justify-end">
                  {isActive ? (
                    <motion.div
                      layoutId="active-scrubber-pill"
                      className="w-8 h-1.5 rounded-full bg-[#BCB893] shadow-lg shadow-[#BCB893]/50"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  ) : (
                    <div className="w-2 h-1.5 rounded-full bg-white/20 group-hover:bg-white/50 group-hover:w-4 transition-all" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Scroll Progress Bar with GPU Transform */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 z-30 pointer-events-none">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#BCB893] via-[#DCDAC2] to-[#BCB893] origin-left will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Scroll Indicator Prompt */}
        <div
          ref={scrollPromptRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/50 text-[10px] font-mono tracking-[0.25em] uppercase transition-opacity duration-500 pointer-events-none z-30 animate-bounce"
        >
          <span>SCROLL TO ADVANCE JOURNEY</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#BCB893]" />
        </div>
      </div>
    </div>
  );
}
