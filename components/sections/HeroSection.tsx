"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const TOTAL_FRAMES = 100;
const MAX_CONCURRENT_FETCHES = 6;

type FrameSource = HTMLImageElement;

interface HeroSectionProps {
  onOpenBooking?: () => void;
}

export function HeroSection({ onOpenBooking }: HeroSectionProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Hardware-Accelerated Dual-Canvas Cross-Fader
  const canvasRefA = useRef<HTMLCanvasElement>(null);
  const canvasRefB = useRef<HTMLCanvasElement>(null);
  const lastDrawnFloorRef = useRef<number>(-1);
  const lastDrawnCeilRef = useRef<number>(-1);

  // Direct DOM refs (zero React re-renders on scroll loop)
  const progressBarRef = useRef<HTMLDivElement>(null);
  const frameCounterRef = useRef<HTMLSpanElement>(null);

  // Discrete UI States
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  // Telemetry & animation refs
  const isAutoPlayingRef = useRef<boolean>(false);
  const framesCacheRef = useRef<(FrameSource | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const frameStatusRef = useRef<Uint8Array>(new Uint8Array(TOTAL_FRAMES)); // 0: idle, 1: loading, 2: ready, 3: failed
  const frameLastUsedRef = useRef<number[]>(new Array(TOTAL_FRAMES).fill(0));
  const activeFetchesRef = useRef<number>(0);
  const currentRenderedFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lenisRef = useRef<Lenis | null>(null);
  const isMountedRef = useRef<boolean>(true);

  // Audio Context Ref
  const audioContextRef = useRef<AudioContext | null>(null);
  const droneNodesRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  // Helper to resolve frame path: /sequence/frame-001.webp -> frame-100.webp
  const getFramePath = useCallback((index: number, ext: "webp" | "jpg" = "webp") => {
    const pad = String(index + 1).padStart(3, "0");
    return `/sequence/frame-${pad}.${ext}`;
  }, []);

  // Hardware-accelerated canvas paint with object-fit: cover
  const drawFrameToCanvas = useCallback((canvas: HTMLCanvasElement | null, frameIndex: number) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    if (canvasWidth === 0 || canvasHeight === 0) return;

    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));
    let frameSource = framesCacheRef.current[clampedIndex];

    // Fallback to nearest loaded frame if current frame is decoding
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

  // Continuous S-curve cross-dissolve across any float frame value [0 .. 99]
  const renderFrameSequence = useCallback(
    (val: number) => {
      const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, val));
      const floorIndex = Math.floor(clamped);
      const ceilIndex = Math.min(TOTAL_FRAMES - 1, floorIndex + 1);
      const fraction = clamped - floorIndex;

      if (floorIndex !== lastDrawnFloorRef.current) {
        drawFrameToCanvas(canvasRefA.current, floorIndex);
        lastDrawnFloorRef.current = floorIndex;
      }

      if (ceilIndex !== lastDrawnCeilRef.current) {
        drawFrameToCanvas(canvasRefB.current, ceilIndex);
        lastDrawnCeilRef.current = ceilIndex;
      }

      const smoothFactor = fraction * fraction * (3 - 2 * fraction);
      if (canvasRefB.current) {
        canvasRefB.current.style.opacity = String(smoothFactor);
      }

      if (frameCounterRef.current) {
        const displayFrame = Math.min(TOTAL_FRAMES, Math.round(clamped) + 1);
        frameCounterRef.current.textContent = String(displayFrame).padStart(3, "0");
      }
    },
    [drawFrameToCanvas]
  );

  // Resize canvas to device DPR
  const resizeCanvas = useCallback(() => {
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const w = viewportRef.current?.clientWidth || window.innerWidth;
    const h = viewportRef.current?.clientHeight || window.innerHeight;

    [canvasRefA.current, canvasRefB.current].forEach((canvas) => {
      if (canvas) {
        if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
          canvas.width = Math.floor(w * dpr);
          canvas.height = Math.floor(h * dpr);
        }
      }
    });

    const floor = Math.max(0, lastDrawnFloorRef.current);
    const ceil = Math.max(0, lastDrawnCeilRef.current);
    drawFrameToCanvas(canvasRefA.current, floor);
    drawFrameToCanvas(canvasRefB.current, ceil);
  }, [drawFrameToCanvas]);

  // Asynchronous frame fetch and decode
  const loadSingleFrame = useCallback(
    async (index: number): Promise<boolean> => {
      if (index < 0 || index >= TOTAL_FRAMES) return false;
      if (frameStatusRef.current[index] === 2) return true;
      if (frameStatusRef.current[index] === 1) return true;

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
          frameStatusRef.current[index] = 2;
          frameLastUsedRef.current[index] = Date.now();

          if (index === 0 && lastDrawnFloorRef.current === -1) {
            drawFrameToCanvas(canvasRefA.current, 0);
            lastDrawnFloorRef.current = 0;
            if (canvasRefB.current) canvasRefB.current.style.opacity = "0";
          }

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
          frameStatusRef.current[index] = 3;
          return false;
        }
      } catch {
        frameStatusRef.current[index] = 3;
        return false;
      } finally {
        activeFetchesRef.current = Math.max(0, activeFetchesRef.current - 1);
      }
    },
    [getFramePath, drawFrameToCanvas]
  );

  // Dynamic Priority Scheduler
  const scheduleQueue = useCallback(() => {
    if (!isMountedRef.current) return;
    if (activeFetchesRef.current >= MAX_CONCURRENT_FETCHES) return;

    const currentTarget = Math.round(targetFrameRef.current);
    const candidates: { index: number; dist: number }[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const status = frameStatusRef.current[i];
      if (status === 0 || status === 3) {
        candidates.push({ index: i, dist: Math.abs(i - currentTarget) });
      }
    }

    candidates.sort((a, b) => a.dist - b.dist);

    const needed = MAX_CONCURRENT_FETCHES - activeFetchesRef.current;
    const toFetch = candidates.slice(0, needed);

    toFetch.forEach((item) => {
      loadSingleFrame(item.index).then(() => {
        scheduleQueue();
      });
    });
  }, [loadSingleFrame]);

  // Initial Sequence Burst & Mount Lifecycle
  useEffect(() => {
    isMountedRef.current = true;
    resizeCanvas();

    const initSequence = async () => {
      // Fetch & paint hero frame 0 onto Canvas A and frame 1 onto Canvas B
      await loadSingleFrame(0);
      if (canvasRefA.current) {
        drawFrameToCanvas(canvasRefA.current, 0);
        lastDrawnFloorRef.current = 0;
      }

      loadSingleFrame(1).then(() => {
        if (canvasRefB.current) {
          drawFrameToCanvas(canvasRefB.current, 1);
          lastDrawnCeilRef.current = 1;
        }
      });

      // Preload remaining frames
      for (let i = 2; i < TOTAL_FRAMES; i++) {
        if (i < 15) {
          loadSingleFrame(i);
        }
      }
      scheduleQueue();
    };

    initSequence();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isMountedRef.current = false;
      window.removeEventListener("resize", handleResize);
    };
  }, [loadSingleFrame, resizeCanvas, scheduleQueue, drawFrameToCanvas]);

  // Scroll & Journey Animation Loop
  useEffect(() => {
    const globalLenis = (window as unknown as { __lenis?: Lenis }).__lenis || null;
    lenisRef.current = globalLenis;

    let cachedContainerTop = 0;
    let cachedScrollable = 1;

    const measureBounds = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      cachedContainerTop = rect.top + scrollTop;
      const viewH = viewportRef.current?.clientHeight || Math.max(580, window.innerHeight - 104);
      cachedScrollable = Math.max(1, container.offsetHeight - viewH);
    };

    measureBounds();

    const calculateProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = Math.max(
        0,
        Math.min(1, (scrollTop - cachedContainerTop) / cachedScrollable)
      );

      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);

      // Direct GPU transform for bottom progress scrubber
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      scheduleQueue();
    };

    if (globalLenis) {
      globalLenis.on("scroll", calculateProgress);
    }
    window.addEventListener("scroll", calculateProgress, { passive: true });
    window.addEventListener("resize", measureBounds, { passive: true });

    const stopAutoTourOnUserGesture = () => {
      if (isAutoPlayingRef.current) {
        isAutoPlayingRef.current = false;
        setIsAutoPlaying(false);
      }
    };

    window.addEventListener("wheel", stopAutoTourOnUserGesture, { passive: true });
    window.addEventListener("touchstart", stopAutoTourOnUserGesture, { passive: true });
    window.addEventListener("keydown", stopAutoTourOnUserGesture, { passive: true });

    let rafId: number;
    const raf = () => {
      // Auto-tour continuous playback
      if (isAutoPlayingRef.current) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const currentOffset = scrollTop - cachedContainerTop;
        const increment = cachedScrollable / (60 * 14);
        const nextOffset = currentOffset + increment;

        if (nextOffset >= cachedScrollable) {
          isAutoPlayingRef.current = false;
          setIsAutoPlaying(false);
        } else {
          const nextScroll = cachedContainerTop + nextOffset;
          if (globalLenis) {
            globalLenis.scrollTo(nextScroll, { immediate: true });
          } else {
            window.scrollTo({ top: nextScroll });
          }
        }
      }

      // Smooth interpolation for frame cross-dissolve
      const target = targetFrameRef.current;
      const diff = target - currentRenderedFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        currentRenderedFrameRef.current += diff * 0.18;
        renderFrameSequence(currentRenderedFrameRef.current);
      }

      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      if (globalLenis) {
        globalLenis.off("scroll", calculateProgress);
      }
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", measureBounds);
      window.removeEventListener("wheel", stopAutoTourOnUserGesture);
      window.removeEventListener("touchstart", stopAutoTourOnUserGesture);
      window.removeEventListener("keydown", stopAutoTourOnUserGesture);
    };
  }, [renderFrameSequence, scheduleQueue]);

  // Auto-Play Tour Toggle
  const toggleAutoPlay = () => {
    const next = !isAutoPlaying;
    setIsAutoPlaying(next);
    isAutoPlayingRef.current = next;

    if (next && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const containerTop = rect.top + scrollTop;
      const currentScroll = scrollTop;

      if (currentScroll >= containerTop + containerRef.current.offsetHeight - window.innerHeight - 50) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(containerTop, { duration: 0.8 });
        } else {
          window.scrollTo({ top: containerTop, behavior: "smooth" });
        }
      }
    }
  };

  // Optional Architectural Binaural Soundscape
  const toggleAudio = () => {
    if (typeof window === "undefined") return;

    if (!isAudioEnabled) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 3);

        const osc1 = ctx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(55, ctx.currentTime);

        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(110, ctx.currentTime);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();

        droneNodesRef.current = { osc1, osc2, gain: gainNode };
        setIsAudioEnabled(true);
      } catch {
        setIsAudioEnabled(false);
      }
    } else {
      if (droneNodesRef.current && audioContextRef.current) {
        const ctx = audioContextRef.current;
        droneNodesRef.current.gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);
        setTimeout(() => {
          droneNodesRef.current?.osc1.stop();
          droneNodesRef.current?.osc2.stop();
          ctx.close();
          droneNodesRef.current = null;
          audioContextRef.current = null;
        }, 1100);
      }
      setIsAudioEnabled(false);
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative bg-[#18110B] text-[#FAF7F2] w-full"
      style={{ height: "240vh" }}
    >
      {/* Sticky Viewport Container: Plain Frames Experience (No Overlapping Texts) */}
      <div
        ref={viewportRef}
        className="sticky top-20 w-full h-[calc(100vh-80px)] min-h-[580px] overflow-hidden bg-[#18110B]"
      >
        {/* Continuous Dual-Buffer Hardware-Accelerated Cross-Fader Canvas */}
        <canvas
          ref={canvasRefA}
          className="absolute inset-0 w-full h-full object-cover block z-0 will-change-transform"
          style={{ opacity: 1 }}
        />
        <canvas
          ref={canvasRefB}
          className="absolute inset-0 w-full h-full object-cover block z-10 will-change-[opacity]"
          style={{ opacity: 0 }}
        />

        {/* Subtle Luxury Vignette Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#18110B]/60 via-transparent to-[#18110B]/40 z-20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#18110B]/50 via-transparent to-[#18110B]/50 z-20" />

        {/* Top-Right Telemetry & Walkthrough Controls */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-8 lg:right-10 z-30 flex items-center gap-2.5 sm:gap-3">
          {/* Auto-Play Tour Button */}
          <button
            type="button"
            onClick={toggleAutoPlay}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider backdrop-blur-xl transition-all cursor-pointer ${
              isAutoPlaying
                ? "bg-[#C89D5C] text-[#18110B] border-[#C89D5C] shadow-lg shadow-[#C89D5C]/30 font-semibold"
                : "bg-[#18110B]/80 hover:bg-[#18110B] border-[#C89D5C]/30 hover:border-[#DFBD85] text-[#FAF7F2]"
            }`}
            title="Toggle automatic smooth cinematic tour"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Pause Tour</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-[#C89D5C]" />
                <span className="hidden sm:inline">Play Tour</span>
              </>
            )}
          </button>

          {/* Sound Ambience Toggle */}
          <button
            type="button"
            onClick={toggleAudio}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18110B]/80 hover:bg-[#18110B] border border-[#C89D5C]/30 hover:border-[#DFBD85] text-[#FAF7F2] backdrop-blur-xl transition-all cursor-pointer"
            title="Toggle architectural ambience"
          >
            {isAudioEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#C89D5C]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#D8C3AC]" />
            )}
            <span className="text-[10px] font-mono uppercase tracking-wider hidden sm:inline text-[#EADECF]">
              {isAudioEnabled ? "Audio On" : "Sound"}
            </span>
          </button>

          {/* Frame Telemetry Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18110B]/80 border border-[#C89D5C]/30 backdrop-blur-xl font-mono text-[11px]">
            <span className="text-white/40">FRAME</span>
            <span ref={frameCounterRef} className="text-[#DFBD85] font-semibold">
              001
            </span>
            <span className="text-white/30">/ {TOTAL_FRAMES}</span>
          </div>
        </div>

        {/* Bottom Hardware-Accelerated Progress Scrubber Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-40">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#8C5A30] via-[#DFBD85] to-[#8C5A30] origin-left will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
