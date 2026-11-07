"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Scroll-scrubbed 717-frame cinematic hero.
 *
 * Performance architecture (why it is built this way):
 *
 * 1. Bounded decoded-memory budget. A 1920×1080 frame is ~8.3 MB once decoded.
 *    Holding all 717 decoded frames (~5.9 GB) forces the browser to evict and
 *    synchronously re-decode images inside drawImage(), which is what made
 *    scrolling degrade progressively as more frames streamed in. Here only the
 *    compressed bytes (Blob, ~150 KB/frame) are retained for the whole sequence,
 *    and a sliding window of GPU-ready ImageBitmaps around the scroll position
 *    is kept within a fixed byte budget. Bitmaps leaving the window are close()d.
 *
 * 2. Off-main-thread decoding. createImageBitmap() decodes on a worker pool at
 *    native size (~3x faster than a resampled decode), so drawImage() never
 *    decodes. Decodes are led by scroll velocity and ordered coarse-to-fine
 *    (every 8th → 4th → 2nd → every frame) so the image tracks the scroll
 *    position even when the user scrolls faster than frames can be decoded.
 *
 * 3. Resident low-res keyframes. Every 4th frame (6th on touch) is also kept
 *    as a small bitmap that is never evicted, so a fast flick always has an
 *    image within ~2 frames to show instead of freezing on a stale frame.
 *
 * 4. One frame clock. Rendering runs on the same gsap ticker that drives Lenis
 *    (Lenis is prioritized, so scroll is updated before we read it), instead of
 *    a second Framer Motion scroll listener + spring on a separate rAF loop.
 *    The canvas is only repainted when the scroll position actually changes.
 *
 * 5. Allocation-free hot path. No per-frame arrays, queues, or closures.
 */

const TOTAL_FRAMES = 717;
// Bump after regenerating tiers with `node scripts/optimize-frames.mjs`.
const CACHE_VERSION = "tiers_v1";
const MAX_CONCURRENT_FETCHES = 6;
// The tiny "lo" keyframes get their own lane so they are never stuck behind
// full-size downloads on a cold (first-visit) cache.
const MAX_CONCURRENT_KF_FETCHES = 4;
// Use the 1920px tier only when the canvas actually needs more than ~1280px.
const HD_TIER_ABOVE_SCALE = 0.68;
// Below this cover scale, decode pre-shrunk bitmaps to save memory.
const RESIZE_DECODE_BELOW_SCALE = 0.6;
// ---- Feel tuning ----
// Scroll distance the 717 frames are spread over. Taller = slower animation
// per wheel step / swipe.
const HERO_SCROLL_HEIGHT = "900vh";
// Glide time constant: how long the image takes to catch up with the scroll.
// Higher = slower, softer motion (~3x this value to fully settle).
const FRAME_GLIDE_MS = 260;
// After this long without scroll input, settle onto the nearest whole frame.
const SETTLE_IDLE_MS = 120;

// Typical decode latency expressed in display ticks, used to lead decodes.
const DECODE_LEAD_TICKS = 4;
// Max canvas backing-store pixels (native frame resolution).
const MAX_CANVAS_PIXELS = 1920 * 1080;

// Native source dimensions of the frame renders.
const NATIVE_W = 1920;
const NATIVE_H = 1080;

// Frame load status
const ST_IDLE = 0;
const ST_FETCHING = 1;
const ST_FETCHED = 2;
const ST_FAILED = 3;

interface HeroSectionProps {
  onOpenBooking?: () => void;
}

type FrameBitmap = ImageBitmap | HTMLImageElement;

type FrameTier = "lo" | "md" | "hd";

/** Size-tiered, re-encoded frames (see scripts/optimize-frames.mjs). */
const framePath = (index: number, tier: FrameTier) =>
  `/frames/${tier}/${String(index + 1).padStart(4, "0")}.webp?v=${CACHE_VERSION}`;
/** Original full-quality render, used only if a tiered file is missing. */
const fallbackFramePath = (index: number) =>
  `/frames/${String(index + 1).padStart(4, "0")}.webp?v=${CACHE_VERSION}`;

const bitmapW = (b: FrameBitmap) => ("naturalWidth" in b ? b.naturalWidth : b.width);
const bitmapH = (b: FrameBitmap) => ("naturalHeight" in b ? b.naturalHeight : b.height);
const releaseBitmap = (b: FrameBitmap | null) => {
  if (b && "close" in b) b.close();
};

/**
 * Off-main-thread decode. Native-size decode is ~3x faster than a resampled
 * one (the GPU scales for free in drawImage), so resizing is only used when
 * the canvas is far smaller than the source and memory savings matter.
 */
async function decodeBlob(
  blob: Blob,
  width: number,
  height: number,
  resize: boolean
): Promise<FrameBitmap> {
  if (typeof createImageBitmap === "function") {
    if (!resize) return createImageBitmap(blob);
    try {
      return await createImageBitmap(blob, {
        resizeWidth: width,
        resizeHeight: height,
        resizeQuality: "medium",
      });
    } catch {
      // Older engines without resize options
      return await createImageBitmap(blob);
    }
  }
  // Legacy fallback
  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    await img.decode();
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

// ---- Story overlays -----------------------------------------------------
// Business introduction shown over the walkthrough. `start`/`end` are hero
// scroll progress (0–1) over which a chapter is fully visible; it fades in
// and out over OVERLAY_FADE on either side.
interface HeroChapter {
  eyebrow: string;
  title: string;
  accent?: string;
  body: string;
  start: number;
  end: number;
  cta?: string;
}

const HERO_CHAPTERS: HeroChapter[] = [
  {
    eyebrow: "Aurelia & Co. · Private Real Estate Advisory",
    title: "Extraordinary homes,",
    accent: "privately represented.",
    body: "For nearly two decades we have guided families, founders and collectors to the world's most exceptional residences — quietly, and entirely on their terms.",
    start: 0,
    end: 0.14,
    cta: "Book a Private Consultation",
  },
  {
    eyebrow: "Established 2008",
    title: "Eighteen years of",
    accent: "private stewardship.",
    body: "A principal-led practice built on discretion, deep market knowledge and long-standing relationships from Beverly Hills to London.",
    start: 0.2,
    end: 0.34,
  },
  {
    eyebrow: "Proven Track Record",
    title: "1,450+ trophy estates.",
    accent: "$4.2 billion closed.",
    body: "From architectural villas to sky penthouses, every acquisition and sale handled with the same precision and care.",
    start: 0.4,
    end: 0.54,
  },
  {
    eyebrow: "Off-Market Access",
    title: "The finest homes",
    accent: "rarely reach the market.",
    body: "Our private network brings you pocket listings and off-market opportunities long before they are ever made public.",
    start: 0.6,
    end: 0.74,
  },
  {
    eyebrow: "Your Next Address",
    title: "Begins with",
    accent: "a conversation.",
    body: "Arrange a private viewing or a confidential consultation with our principal advisor.",
    start: 0.82,
    end: 1,
    cta: "Schedule a Private Viewing",
  },
];
const OVERLAY_FADE = 0.045;
const OVERLAY_DRIFT_PX = 28;

export function HeroSection({ onOpenBooking }: HeroSectionProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    if (!container || !viewport || !canvas) return;

    let disposed = false;
    const abort = new AbortController();

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const decodedBudgetBytes = (isTouch ? 200 : 400) * 1024 * 1024;
    // createImageBitmap decodes on a worker pool; use the cores we have.
    const maxDecodes = Math.max(2, Math.min(6, (navigator.hardwareConcurrency || 4) - 2));

    // ---- Frame storage -------------------------------------------------
    const status = new Uint8Array(TOTAL_FRAMES);
    const blobs: (Blob | null)[] = new Array(TOTAL_FRAMES).fill(null);
    const bitmaps: (FrameBitmap | null)[] = new Array(TOTAL_FRAMES).fill(null);
    const bitmapGen = new Int32Array(TOTAL_FRAMES).fill(-1); // decode-size generation
    const decoding = new Uint8Array(TOTAL_FRAMES);
    const decodedIndices = new Set<number>();
    let activeFetches = 0;
    let settledFetches = 0;
    let activeDecodes = 0;

    // Resident low-res keyframes (every KF_STRIDE-th frame, 0.3–0.9 MB each):
    // a never-evicted fallback so very fast flicks never freeze the image.
    const KF_STRIDE = isTouch ? 6 : 4;
    const KF_W = isTouch ? 384 : 640;
    const KF_H = Math.round((KF_W * NATIVE_H) / NATIVE_W);
    const keyframes: (FrameBitmap | null)[] = new Array(TOTAL_FRAMES).fill(null);
    const kfStatus = new Uint8Array(TOTAL_FRAMES);
    let activeKfFetches = 0;
    let settledKfFetches = 0;
    const totalKeyframes = Math.ceil(TOTAL_FRAMES / KF_STRIDE);

    // Full-size tier: chosen once at boot from the canvas size and connection.
    let tier: FrameTier = "hd";

    // Source frames are fixed 1920×1080 renders.
    const nativeW = NATIVE_W;
    const nativeH = NATIVE_H;

    // ---- Canvas & decode sizing ----------------------------------------
    let ctx: CanvasRenderingContext2D | null = null;
    let decodeW = NATIVE_W;
    let decodeH = NATIVE_H;
    let decodeResize = false;
    let generation = 0;
    let windowAhead = 30;
    let windowBehind = 12;

    // ---- Scroll state --------------------------------------------------
    let containerTop = 0;
    let scrollable = 1;
    let lastScrollY = -1;
    let currentFrame = 0; // float, frame currently shown (eased)
    let targetFrame = 0; // float, frame the scroll position asks for
    let lastScrollChange = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let center = 0; // integer frame the window is centred on
    let direction = 1;
    let velocity = 0; // smoothed |frames per tick|
    let prevTickFrame = 0;
    let needsDraw = true;
    let shownExact = false; // is the exact requested frame (and blend) on screen?

    const computeDecodeSize = () => {
      const coverScale = Math.max(canvas.width / nativeW, canvas.height / nativeH);
      const resize = coverScale < RESIZE_DECODE_BELOW_SCALE;
      const w = resize ? Math.max(1, Math.ceil(nativeW * coverScale)) : nativeW;
      const h = resize ? Math.max(1, Math.ceil(nativeH * coverScale)) : nativeH;
      if (w !== decodeW || h !== decodeH) {
        decodeW = w;
        decodeH = h;
        decodeResize = resize;
        generation++; // existing bitmaps stay drawable but get re-decoded lazily
      }
      const perFrame = decodeW * decodeH * 4;
      const maxDecoded = Math.max(12, Math.min(96, Math.floor(decodedBudgetBytes / perFrame)));
      windowAhead = Math.round(maxDecoded * 0.7);
      windowBehind = maxDecoded - windowAhead - 1;
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isTouch ? 1.25 : 1.5);
      const cssW = viewport.clientWidth || window.innerWidth;
      const cssH = viewport.clientHeight || window.innerHeight;
      // Uniform cap keeps the aspect ratio intact (no CSS stretching).
      const cap = Math.min(1, Math.sqrt(MAX_CANVAS_PIXELS / (cssW * dpr * cssH * dpr)));
      const w = Math.max(1, Math.floor(cssW * dpr * cap));
      const h = Math.max(1, Math.floor(cssH * dpr * cap));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        ctx = null; // context state resets on resize
      }
      computeDecodeSize();
      needsDraw = true;
    };

    const measure = () => {
      const rect = container.getBoundingClientRect();
      containerTop = rect.top + window.scrollY;
      scrollable = Math.max(1, container.offsetHeight - window.innerHeight);
      lastScrollY = -1; // force progress recompute
    };

    // ---- Drawing -------------------------------------------------------
    const getCtx = () => {
      if (ctx) return ctx;
      ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }
      return ctx;
    };

    const nearestDecoded = (idx: number): number => {
      if (bitmaps[idx]) return idx;
      const reach = windowAhead + windowBehind;
      for (let d = 1; d <= reach; d++) {
        const a = idx - d;
        if (a >= 0 && bitmaps[a]) return a;
        const b = idx + d;
        if (b < TOTAL_FRAMES && bitmaps[b]) return b;
      }
      return -1;
    };

    // Output of resolveSource (kept in closure vars to avoid per-frame objects).
    let resolvedIdx = -1;
    let resolvedIsKeyframe = false;

    /**
     * Best available image for a frame: the exact full-res bitmap, else the
     * closer of the nearest full-res bitmap and the nearest resident low-res
     * keyframe. A full-res neighbour one frame away beats a keyframe.
     */
    const resolveSource = (idx: number): FrameBitmap | null => {
      resolvedIsKeyframe = false;
      const full = nearestDecoded(idx);
      const fullGap = full < 0 ? Infinity : Math.abs(full - idx);
      if (fullGap <= 1) {
        resolvedIdx = full;
        return bitmaps[full];
      }
      const k0 = idx - (idx % KF_STRIDE);
      let kf = -1;
      let kfGap = Infinity;
      for (let k = k0 - KF_STRIDE; k <= k0 + 2 * KF_STRIDE; k += KF_STRIDE) {
        if (k >= 0 && k < TOTAL_FRAMES && keyframes[k] && Math.abs(k - idx) < kfGap) {
          kf = k;
          kfGap = Math.abs(k - idx);
        }
      }
      if (kf >= 0 && kfGap < fullGap) {
        resolvedIdx = kf;
        resolvedIsKeyframe = true;
        return keyframes[kf];
      }
      resolvedIdx = full;
      return full >= 0 ? bitmaps[full] : null;
    };

    const draw = (frameFloat: number) => {
      const c = getCtx();
      if (!c) return;

      const floorIdx = Math.floor(frameFloat);
      const ceilIdx = Math.min(TOTAL_FRAMES - 1, floorIdx + 1);
      const fraction = frameFloat - floorIdx;

      let baseIdx = floorIdx;
      let blendIdx = -1;
      if (fraction > 0.97 && bitmaps[ceilIdx]) {
        baseIdx = ceilIdx;
      } else if (fraction > 0.03 && bitmaps[floorIdx] && bitmaps[ceilIdx] && ceilIdx !== floorIdx) {
        blendIdx = ceilIdx;
      }

      const base = resolveSource(baseIdx);
      const resolved = resolvedIdx;
      if (!base) return; // nothing ready yet; keep last painted image
      if (resolved !== baseIdx || resolvedIsKeyframe) blendIdx = -1;

      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / nativeW, ch / nativeH);
      const nw = Math.ceil(nativeW * scale);
      const nh = Math.ceil(nativeH * scale);
      const nx = Math.round((cw - nw) / 2);
      const ny = Math.round((ch - nh) / 2);

      c.globalAlpha = 1;
      c.drawImage(base, nx, ny, nw, nh);

      if (blendIdx >= 0) {
        c.globalAlpha = fraction;
        c.drawImage(bitmaps[blendIdx]!, nx, ny, nw, nh);
        c.globalAlpha = 1;
      }

      // Seamlessly mask bottom-right watermark by cloning a clean patch of the base frame.
      if (nativeW >= 1900 && nativeH >= 1000) {
        const s = bitmapW(base) / nativeW;
        const sy = bitmapH(base) / nativeH;
        c.drawImage(
          base,
          1448 * s,
          875 * sy,
          72 * s,
          65 * sy,
          nx + (1448 / nativeW) * nw,
          ny + (942 / nativeH) * nh,
          Math.ceil((72 / nativeW) * nw),
          Math.ceil((65 / nativeH) * nh)
        );
      }
      const wantsBlend = fraction > 0.03 && fraction <= 0.97 && ceilIdx !== floorIdx;
      shownExact = resolved === baseIdx && !resolvedIsKeyframe && (!wantsBlend || blendIdx >= 0);
    };

    // ---- Decode window management --------------------------------------
    const inWindow = (idx: number) => {
      const lo = direction > 0 ? center - windowBehind : center - windowAhead;
      const hi = direction > 0 ? center + windowAhead : center + windowBehind;
      return idx >= lo && idx <= hi;
    };

    const evictOutsideWindow = () => {
      decodedIndices.forEach((idx) => {
        if (!inWindow(idx)) {
          releaseBitmap(bitmaps[idx]);
          bitmaps[idx] = null;
          bitmapGen[idx] = -1;
          decodedIndices.delete(idx);
        }
      });
    };

    const decodeFrame = (idx: number) => {
      const blob = blobs[idx];
      if (!blob) return;
      decoding[idx] = 1;
      activeDecodes++;
      const gen = generation;
      decodeBlob(blob, decodeW, decodeH, decodeResize)
        .then((bmp) => {
          if (disposed) {
            releaseBitmap(bmp);
            return;
          }
          if (!inWindow(idx)) {
            releaseBitmap(bmp);
            return;
          }
          releaseBitmap(bitmaps[idx]);
          bitmaps[idx] = bmp;
          bitmapGen[idx] = gen;
          decodedIndices.add(idx);
          // Repaint only if this frame improves what is on screen.
          if (!shownExact || Math.abs(idx - currentFrame) <= 2) needsDraw = true;
        })
        .catch(() => {
          /* corrupt frame: leave undecoded, nearest-frame fallback covers it */
        })
        .finally(() => {
          decoding[idx] = 0;
          activeDecodes--;
          if (!disposed) pumpDecodes();
        });
    };

    const needsDecode = (idx: number) =>
      idx >= 0 &&
      idx < TOTAL_FRAMES &&
      status[idx] === ST_FETCHED &&
      !decoding[idx] &&
      bitmapGen[idx] !== generation;

    /** Starts a decode if needed; returns false once all decode slots are busy. */
    const tryDecode = (idx: number) => {
      if (needsDecode(idx)) decodeFrame(idx);
      return activeDecodes < maxDecodes;
    };

    /**
     * Coarse-to-fine decode order: the frames under the playhead first, then
     * every 8th, 4th, 2nd and finally every frame ahead in the scroll
     * direction. When the user scrolls faster than frames can be decoded, the
     * nearest ready frame is then at most a few frames away instead of the
     * image freezing on a frame far behind the scroll position.
     */
    const pumpDecodes = () => {
      if (activeDecodes >= maxDecodes) return;
      // Aim where the playhead will be when the decode lands (~4 ticks out),
      // otherwise fast scrolling decodes frames that are stale on arrival.
      const lead = Math.min(windowAhead >> 1, Math.round(velocity * DECODE_LEAD_TICKS));
      const head = center + direction * lead;
      if (!tryDecode(head) || !tryDecode(head + direction)) return;
      if (!tryDecode(head + 2 * direction) || !tryDecode(head - direction)) return;
      for (let stride = 8; stride >= 1; stride >>= 1) {
        for (let d = lead + stride; d <= windowAhead; d += stride) {
          if (!tryDecode(center + direction * d)) return;
        }
      }
      for (let d = lead - 2; d >= 0; d--) {
        if (!tryDecode(center + direction * d)) return;
      }
      for (let d = 2; d <= windowBehind; d++) {
        if (!tryDecode(center - direction * d)) return;
      }
    };

    // ---- Network streaming (compressed bytes only) -----------------------
    const fetchBlob = async (url: string): Promise<Blob | null> => {
      const res = await fetch(url, { signal: abort.signal });
      if (!res.ok) return null;
      return res.blob();
    };

    const fetchFrame = (idx: number) => {
      status[idx] = ST_FETCHING;
      activeFetches++;
      fetchBlob(framePath(idx, tier))
        .catch(() => null)
        .then((blob) => blob ?? fetchBlob(fallbackFramePath(idx)).catch(() => null))
        .then((blob) => {
          if (disposed) return;
          if (blob) {
            blobs[idx] = blob;
            status[idx] = ST_FETCHED;
            if (inWindow(idx)) pumpDecodes();
          } else {
            status[idx] = ST_FAILED;
          }
        })
        .finally(() => {
          activeFetches--;
          settledFetches++;
          if (!disposed) pumpFetches();
        });
    };

    const tryFetch = (idx: number) => {
      if (idx >= 0 && idx < TOTAL_FRAMES && status[idx] === ST_IDLE) fetchFrame(idx);
      return activeFetches < MAX_CONCURRENT_FETCHES;
    };

    /**
     * Fetch priority (nearest-first, biased in scroll direction, no queues):
     * 1. frames inside the decode window, 2. everything else outward.
     * Keyframes stream separately from the tiny "lo" tier (pumpKeyframes).
     */
    const pumpFetches = () => {
      if (settledFetches >= TOTAL_FRAMES || activeFetches >= MAX_CONCURRENT_FETCHES) return;
      for (let d = 0; d <= windowAhead; d++) {
        if (!tryFetch(center + direction * d)) return;
        if (d > 0 && d <= windowBehind && !tryFetch(center - direction * d)) return;
      }
      for (let d = 0; d < TOTAL_FRAMES; d++) {
        if (!tryFetch(center + direction * d)) return;
        if (d > 0 && !tryFetch(center - direction * d)) return;
      }
    };

    /**
     * Resident low-res keyframes come from the ~4 KB "lo" tier on their own
     * lane, nearest-first. On a cold cache the whole walkthrough becomes
     * scrubbable within a few hundred KB, instead of waiting on full frames.
     */
    const fetchKeyframe = (idx: number) => {
      kfStatus[idx] = ST_FETCHING;
      activeKfFetches++;
      fetchBlob(framePath(idx, "lo"))
        .catch(() => null)
        .then((blob) => (blob ? decodeBlob(blob, KF_W, KF_H, true) : null))
        .then((bmp) => {
          if (!bmp) {
            kfStatus[idx] = ST_FAILED;
            return;
          }
          if (disposed) {
            releaseBitmap(bmp);
            return;
          }
          keyframes[idx] = bmp;
          kfStatus[idx] = ST_FETCHED;
          if (!shownExact) needsDraw = true;
        })
        .catch(() => {
          kfStatus[idx] = ST_FAILED;
        })
        .finally(() => {
          activeKfFetches--;
          settledKfFetches++;
          if (!disposed) pumpKeyframes();
        });
    };

    const pumpKeyframes = () => {
      if (settledKfFetches >= totalKeyframes) return;
      const k0 = center - (center % KF_STRIDE);
      for (let d = 0; d < TOTAL_FRAMES && activeKfFetches < MAX_CONCURRENT_KF_FETCHES; d += KF_STRIDE) {
        const a = k0 + direction * d;
        if (a >= 0 && a < TOTAL_FRAMES && kfStatus[a] === ST_IDLE) fetchKeyframe(a);
        const b = k0 - direction * d;
        if (d > 0 && activeKfFetches < MAX_CONCURRENT_KF_FETCHES && b >= 0 && b < TOTAL_FRAMES && kfStatus[b] === ST_IDLE) {
          fetchKeyframe(b);
        }
      }
    };

    // ---- Story overlays: opacity/transform only, written only on change --
    // Layers stay composited at opacity 0 (no visibility toggling, which would
    // force re-rasterizing the large type at every chapter transition).
    const overlayOpacity = new Float32Array(HERO_CHAPTERS.length).fill(-1);
    const overlayInteractive = new Uint8Array(HERO_CHAPTERS.length).fill(2);
    const updateOverlays = (p: number) => {
      for (let i = 0; i < HERO_CHAPTERS.length; i++) {
        const el = chapterRefs.current[i];
        if (!el) continue;
        const ch = HERO_CHAPTERS[i];
        const fadeIn = Math.min(1, Math.max(0, (p - (ch.start - OVERLAY_FADE)) / OVERLAY_FADE));
        const fadeOut = Math.min(1, Math.max(0, (ch.end + OVERLAY_FADE - p) / OVERLAY_FADE));
        const op = ch.start <= 0 ? fadeOut : ch.end >= 1 ? fadeIn : Math.min(fadeIn, fadeOut);
        if (Math.abs(op - overlayOpacity[i]) < 0.002) continue;
        overlayOpacity[i] = op;
        // Drift up while entering, continue upward while leaving.
        const dy = (1 - op) * OVERLAY_DRIFT_PX * (p < ch.start ? 1 : -1);
        el.style.opacity = op.toFixed(3);
        el.style.transform = `translate3d(0, ${dy.toFixed(1)}px, 0)`;
        const interactive = op > 0.6 ? 1 : 0;
        if (interactive !== overlayInteractive[i]) {
          overlayInteractive[i] = interactive;
          el.style.pointerEvents = interactive ? "auto" : "none";
        }
      }
    };

    // ---- Single per-frame tick (shared clock with Lenis) ---------------
    // `deltaMs` comes from the gsap ticker; called without it (boot) we snap.
    const tick = (_time?: number, deltaMs?: number) => {
      velocity = velocity * 0.75 + Math.abs(currentFrame - prevTickFrame) * 0.25;
      prevTickFrame = currentFrame;

      const now = performance.now();
      const y = window.scrollY;
      if (y !== lastScrollY) {
        lastScrollY = y;
        lastScrollChange = now;
        const progress = Math.min(1, Math.max(0, (y - containerTop) / scrollable));
        targetFrame = progress * (TOTAL_FRAMES - 1);
      } else if (now - lastScrollChange > SETTLE_IDLE_MS && targetFrame !== Math.round(targetFrame)) {
        // Scrolling stopped between two frames: glide onto the nearest whole
        // frame so the cross-fade fades out and a single sharp frame remains
        // (resting on a blend of two frames looks like ghosting/blur).
        targetFrame = Math.round(targetFrame);
      }

      // Slow cinematic glide: the shown frame eases toward the scroll target
      // (frame-rate independent exponential smoothing), then settles exactly.
      if (currentFrame !== targetFrame) {
        const diff = targetFrame - currentFrame;
        if (deltaMs === undefined || reducedMotion || Math.abs(diff) < 0.002) {
          currentFrame = targetFrame;
        } else {
          const k = 1 - Math.exp(-Math.min(deltaMs, 100) / FRAME_GLIDE_MS);
          currentFrame += diff * k;
        }
        needsDraw = true;
        const shownProgress = currentFrame / (TOTAL_FRAMES - 1);
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${shownProgress})`;
        }
        updateOverlays(shownProgress);
        const nextCenter = Math.round(currentFrame);
        if (nextCenter !== center) {
          direction = nextCenter > center ? 1 : -1;
          center = nextCenter;
          evictOutsideWindow();
          pumpDecodes();
          pumpFetches();
          pumpKeyframes();
        }
      }

      if (needsDraw) {
        needsDraw = false;
        draw(currentFrame);
      }

      // At rest, make sure the exact full-resolution frame (not a low-res
      // fallback or a neighbour) gets decoded and painted.
      if (!shownExact && currentFrame === targetFrame) pumpDecodes();
    };

    // ---- Boot -----------------------------------------------------------
    resizeCanvas();
    measure();

    // Pick the full-size tier: 1920px only for large canvases on a decent link.
    {
      const conn = (navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }).connection;
      const slowLink = !!conn && (conn.saveData === true || /(^|-)(2g|3g)$/.test(conn.effectiveType ?? ""));
      const coverScale = Math.max(canvas.width / NATIVE_W, canvas.height / NATIVE_H);
      tier = !slowLink && coverScale > HD_TIER_ABOVE_SCALE ? "hd" : "md";
    }

    tick(); // establish initial centre from current scroll position
    updateOverlays(currentFrame / (TOTAL_FRAMES - 1));
    pumpKeyframes();
    pumpFetches();

    gsap.ticker.add(tick);

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      measure();
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeCanvas();
        evictOutsideWindow();
        pumpDecodes();
      }, 120);
    };
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    ro?.observe(container);
    ro?.observe(document.body);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      disposed = true;
      abort.abort();
      gsap.ticker.remove(tick);
      ro?.disconnect();
      window.removeEventListener("resize", onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        releaseBitmap(bitmaps[i]);
        releaseBitmap(keyframes[i]);
        bitmaps[i] = null;
        keyframes[i] = null;
        blobs[i] = null;
      }
      decodedIndices.clear();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative bg-[#1E1700] text-[#F4F3EA] w-full"
      style={{ height: HERO_SCROLL_HEIGHT }}
    >
      {/* Sticky Viewport Container: Pure Unobstructed Full-Screen Canvas */}
      <div
        ref={viewportRef}
        className="sticky top-0 w-full h-screen h-svh min-h-[520px] [@media(max-height:500px)]:min-h-0 overflow-hidden bg-[#1E1700]"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

        {/* Legibility scrims (static gradients: no blur, compositor-cheap) */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#140F00]/80 via-[#140F00]/35 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[85%] sm:h-2/3 z-10 bg-gradient-to-t from-[#140F00]/90 sm:from-[#140F00]/85 via-[#140F00]/40 sm:via-[#140F00]/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 z-10 bg-gradient-to-b from-[#140F00]/50 to-transparent" />

        {/* Business introduction chapters, revealed along the walkthrough */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {HERO_CHAPTERS.map((ch, i) => (
            <div
              key={ch.eyebrow}
              ref={(el) => {
                chapterRefs.current[i] = el;
              }}
              /* Phones/tablets: bottom padding clears the floating menu + WhatsApp buttons;
                 on short landscape screens the text clears them on the right instead. */
              className="absolute left-0 bottom-0 w-full px-5 sm:px-12 lg:px-20 pb-[9.5rem] sm:pb-40 lg:pb-24 [@media(max-height:500px)]:pb-6 [@media(max-height:500px)]:pr-24 will-change-[opacity,transform]"
              style={{
                opacity: i === 0 ? 1 : 0,
                pointerEvents: i === 0 ? "auto" : "none",
              }}
            >
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#BCB893]">
                  <span className="h-px w-8 bg-[#BCB893]/70" />
                  {ch.eyebrow}
                </span>
                {i === 0 ? (
                  <h1 className="mt-4 sm:mt-5 font-serif font-light text-[2.125rem] min-[400px]:text-[2.5rem] leading-[1.08] sm:text-6xl lg:text-[4.25rem] [@media(max-height:500px)]:text-4xl tracking-tight text-[#F4F3EA]">
                    {ch.title}
                    {ch.accent && <span className="block italic text-[#BCB893]">{ch.accent}</span>}
                  </h1>
                ) : (
                  <h2 className="mt-4 sm:mt-5 font-serif font-light text-[1.875rem] min-[400px]:text-[2.25rem] leading-[1.08] sm:text-5xl lg:text-6xl [@media(max-height:500px)]:text-3xl tracking-tight text-[#F4F3EA]">
                    {ch.title}
                    {ch.accent && <span className="block italic text-[#BCB893]">{ch.accent}</span>}
                  </h2>
                )}
                <p className="mt-4 sm:mt-5 max-w-xl text-sm sm:text-base [@media(max-height:500px)]:hidden font-light leading-relaxed text-[#F4F3EA]/85">
                  {ch.body}
                </p>
                {ch.cta && (
                  <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-[#BCB893] hover:bg-[#CFCCAE] text-[#1E1700] text-[11px] font-mono font-semibold uppercase tracking-[0.2em] shadow-xl shadow-black/40 transition-colors cursor-pointer"
                    >
                      {ch.cta}
                    </button>
                    {i === 0 && (
                      <span className="hidden min-[400px]:inline font-mono text-[10px] uppercase tracking-[0.3em] text-[#F4F3EA]/60">
                        Scroll to begin the walkthrough
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Micro-Precision Progress Hairline at the Very Bottom Edge */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-40 pointer-events-none">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#9D9970]/60 via-[#9D9970] to-[#DCDAC2] origin-left will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
