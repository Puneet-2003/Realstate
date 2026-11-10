"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  FlipButton,
  FlipButtonFront,
  FlipButtonBack,
} from "@/components/animate-ui/buttons/flip";

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
// Bump after regenerating tiers or updating assets
const CACHE_VERSION = "cloudinary_all_717_v1";
const MAX_CONCURRENT_FETCHES = 8;
// The tiny "lo" keyframes get their own lane so they are never stuck behind
// full-size downloads on a cold (first-visit) cache.
const MAX_CONCURRENT_KF_FETCHES = 6;
// Use the 1920px tier only when the canvas actually needs more than ~1280px.
const HD_TIER_ABOVE_SCALE = 0.68;
// Decode pre-shrunk bitmaps when the canvas is far smaller than the source.
const RESIZE_DECODE_BELOW_SCALE = 0.6;
// Pixel tiers of the re-encoded frames
const TIER_W_DESKTOP: Record<FrameTier, number> = { lo: 640, md: 1280, hd: 1920 };
const TIER_W_MOBILE: Record<FrameTier, number> = { lo: 540, md: 1080, hd: 1080 };
// ---- Feel tuning ----
// Scroll distance the 717 frames are spread over. Taller = slower animation
// per wheel step / swipe.
const HERO_SCROLL_HEIGHT = "900vh";
// Glide time constant: how long the image takes to catch up with the scroll.
// Kept short so frames stay locked to the user's own scroll speed (Lenis
// already smooths wheel input; touch scrolling has native momentum).
const FRAME_GLIDE_MS_WHEEL = 70;
const FRAME_GLIDE_MS_TOUCH = 45;
// After this long without scroll input, settle onto the nearest whole frame.
const SETTLE_IDLE_MS = 140;
// ---- First-load readiness (drives the branded loading screen) ----
// Full-resolution frames from the start of the walkthrough that must be
// downloaded before the site is revealed, so the first scroll is sharp.
const READY_FULL_FRAMES = 36;

// Typical decode latency expressed in display ticks, used to lead decodes.
const DECODE_LEAD_TICKS = 4;
// Max canvas backing-store pixels (native frame resolution).
const MAX_CANVAS_PIXELS = 1920 * 1080;

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

const CLOUDINARY_BASE = "https://res.cloudinary.com/ddelf4odl/image/upload";

const checkIsMobile = () =>
  typeof window !== "undefined" &&
  (window.innerWidth <= 768 || window.innerWidth < window.innerHeight);

/** Size-tiered frames from Cloudinary: fry/try/dry for desktop, mobile_frames (1st/2nd/3rd) for mobile. */
const framePath = (index: number, tier: FrameTier, isMobile: boolean = false) => {
  const folder = tier === "lo" ? "lo" : "hd";
  if (isMobile) {
    if (index < 239) {
      const pad = String(index + 1).padStart(4, "0");
      return `${CLOUDINARY_BASE}/mobile_frames/1st/${folder}/${pad}.webp`;
    } else if (index < 478) {
      const pad = String(index - 239 + 1).padStart(4, "0");
      return `${CLOUDINARY_BASE}/mobile_frames/2nd/${folder}/${pad}.webp`;
    } else {
      const pad = String(index - 478 + 1).padStart(4, "0");
      return `${CLOUDINARY_BASE}/mobile_frames/3rd/${folder}/${pad}.webp`;
    }
  }
  if (index < 239) {
    const pad = String(index + 1).padStart(4, "0");
    return `${CLOUDINARY_BASE}/fry_frames/${folder}/${pad}.webp`;
  } else if (index < 478) {
    const pad = String(index - 239 + 1).padStart(4, "0");
    return `${CLOUDINARY_BASE}/try_frames/${folder}/${pad}.webp`;
  } else {
    const pad = String(index - 478 + 1).padStart(4, "0");
    return `${CLOUDINARY_BASE}/dry_frames/${folder}/${pad}.webp`;
  }
};

/** Original full-quality render fallback. */
const fallbackFramePath = (index: number, isMobile: boolean = false) => {
  if (isMobile) {
    if (index < 239) {
      const pad = String(index + 1).padStart(4, "0");
      return `${CLOUDINARY_BASE}/mobile_frames/1st/hd/${pad}.webp`;
    } else if (index < 478) {
      const pad = String(index - 239 + 1).padStart(4, "0");
      return `${CLOUDINARY_BASE}/mobile_frames/2nd/hd/${pad}.webp`;
    } else {
      const pad = String(index - 478 + 1).padStart(4, "0");
      return `${CLOUDINARY_BASE}/mobile_frames/3rd/hd/${pad}.webp`;
    }
  }
  if (index < 239) {
    const pad = String(index + 1).padStart(4, "0");
    return `${CLOUDINARY_BASE}/fry_frames/hd/${pad}.webp`;
  } else if (index < 478) {
    const pad = String(index - 239 + 1).padStart(4, "0");
    return `${CLOUDINARY_BASE}/try_frames/hd/${pad}.webp`;
  } else {
    const pad = String(index - 478 + 1).padStart(4, "0");
    return `${CLOUDINARY_BASE}/dry_frames/hd/${pad}.webp`;
  }
};

const bitmapW = (b: FrameBitmap) => ("naturalWidth" in b ? b.naturalWidth : b.width);
const bitmapH = (b: FrameBitmap) => ("naturalHeight" in b ? b.naturalHeight : b.height);
const releaseBitmap = (b: FrameBitmap | null) => {
  if (b && "close" in b) b.close();
};

/** A region of the full frame, as fractions (0–1) of its width/height. */
interface Region {
  x: number;
  y: number;
  w: number;
  h: number;
}
const FULL_REGION: Region = { x: 0, y: 0, w: 1, h: 1 };
/** Which part of the full frame each decoded bitmap holds. */
const regionOf = new WeakMap<object, Region>();
const getRegion = (b: FrameBitmap) => regionOf.get(b) ?? FULL_REGION;

/**
 * Off-main-thread decode of only the visible (cover-cropped) part of a frame.
 * On a portrait phone that is ~25% of the frame, so 4x more frames fit in the
 * same memory and no pixels are wasted. Native-size decode is ~3x faster than
 * a resampled one, so resizing is only used when the canvas is far smaller.
 */
async function decodeBlob(
  blob: Blob,
  srcW: number,
  srcH: number,
  crop: Region,
  outW: number,
  outH: number,
  resize: boolean
): Promise<FrameBitmap> {
  if (typeof createImageBitmap === "function") {
    const full = crop.w >= 0.999 && crop.h >= 0.999;
    const sx = full ? 0 : Math.max(0, Math.floor(crop.x * srcW));
    const sy = full ? 0 : Math.max(0, Math.floor(crop.y * srcH));
    const sw = full ? srcW : Math.min(srcW - sx, Math.ceil(crop.w * srcW));
    const sh = full ? srcH : Math.min(srcH - sy, Math.ceil(crop.h * srcH));
    const opts: ImageBitmapOptions | undefined = resize
      ? { resizeWidth: outW, resizeHeight: outH, resizeQuality: "medium" }
      : undefined;
    try {
      const bmp = full
        ? await createImageBitmap(blob, opts)
        : await createImageBitmap(blob, sx, sy, sw, sh, opts);
      regionOf.set(bmp, full ? FULL_REGION : { x: sx / srcW, y: sy / srcH, w: sw / srcW, h: sh / srcH });
      return bmp;
    } catch {
      // Older engines without crop/resize options: plain full decode.
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
// Chapters are 0.06 apart; a fade under half of that means one chapter has
// fully left before the next starts (no two headlines overlapping).
const OVERLAY_FADE = 0.028;
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
    const blobW = new Uint16Array(TOTAL_FRAMES); // pixel width of each stored blob
    const decodedIndices = new Set<number>();
    let activeFetches = 0;
    let settledFetches = 0;
    let activeDecodes = 0;

    // Resident low-res keyframes (every KF_STRIDE-th frame), decoded from the
    // 640px "lo" tier at full sharpness and cropped to the visible region: a
    // never-evicted fallback so very fast flicks never freeze the image.
    const KF_STRIDE = 4;
    // Max decoded pixels per keyframe (bounds memory on landscape screens).
    const KF_MAX_PX = isTouch ? 140_000 : 230_400;
    const keyframes: (FrameBitmap | null)[] = new Array(TOTAL_FRAMES).fill(null);
    const kfBlobs: (Blob | null)[] = new Array(TOTAL_FRAMES).fill(null);
    const kfStatus = new Uint8Array(TOTAL_FRAMES);
    const kfGen = new Int32Array(TOTAL_FRAMES).fill(-1); // crop generation decoded at
    const kfBusy = new Uint8Array(TOTAL_FRAMES);
    let activeKfJobs = 0;
    let settledKfFetches = 0;
    let failedKeyframes = 0;
    let currentKeyframes = 0; // keyframes decoded for the current crop
    const totalKeyframes = Math.ceil(TOTAL_FRAMES / KF_STRIDE);

    // Full-size tier: chosen once at boot from the canvas size and connection.
    let tier: FrameTier = "hd";

    const isMobile = checkIsMobile();
    // Source frame dimensions: 1080x1920 (portrait) for mobile, 1920x1080 (landscape) for desktop
    const nativeW = isMobile ? 1080 : 1920;
    const nativeH = isMobile ? 1920 : 1080;
    const tierW = isMobile ? TIER_W_MOBILE : TIER_W_DESKTOP;

    // ---- Canvas & decode sizing ----------------------------------------
    let ctx: CanvasRenderingContext2D | null = null;
    // Visible (cover-cropped) part of the frame for the current canvas shape.
    let crop: Region = FULL_REGION;
    let cropGen = 0; // bumps when the crop changes (keyframes re-decode lazily)
    let generation = 0; // bumps when crop or canvas size changes (full frames)
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
    const glideMs = isTouch ? FRAME_GLIDE_MS_TOUCH : FRAME_GLIDE_MS_WHEEL;
    let center = 0; // integer frame the window is centred on
    let direction = 1;
    let velocity = 0; // smoothed |frames per tick|
    let prevTickFrame = 0;
    let needsDraw = true;
    let shownExact = false; // is the exact requested frame (and blend) on screen?

    /** Output size for decoding the visible part of a `srcW`-wide blob. */
    let outW = 1;
    let outH = 1;
    let outResize = false;
    const planDecode = (srcW: number) => {
      const srcH = Math.round((srcW * nativeH) / nativeW);
      const cropPxW = crop.w * srcW;
      const cropPxH = crop.h * srcH;
      outResize = canvas.width < cropPxW * RESIZE_DECODE_BELOW_SCALE;
      outW = outResize ? canvas.width : Math.ceil(cropPxW);
      outH = outResize ? canvas.height : Math.ceil(cropPxH);
    };

    let lastCanvasW = 0;
    let lastCanvasH = 0;
    const computeDecodeSize = () => {
      // Cover crop: the part of the frame that is actually on screen.
      const aspect = canvas.width / canvas.height;
      const nativeAspect = nativeW / nativeH;
      const next: Region =
        aspect < nativeAspect
          ? { x: (1 - aspect / nativeAspect) / 2, y: 0, w: aspect / nativeAspect, h: 1 }
          : { x: 0, y: (1 - nativeAspect / aspect) / 2, w: 1, h: nativeAspect / aspect };
      if (Math.abs(next.w - crop.w) > 0.002 || Math.abs(next.h - crop.h) > 0.002) {
        crop = next;
        cropGen++;
        currentKeyframes = 0;
        generation++; // existing bitmaps stay drawable but get re-decoded lazily
      } else if (canvas.width !== lastCanvasW || canvas.height !== lastCanvasH) {
        generation++;
      }
      lastCanvasW = canvas.width;
      lastCanvasH = canvas.height;
      planDecode(tierW[tier]);
      const perFrame = outW * outH * 4;
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
      // The sticky viewport is sized in svh, which (unlike innerHeight) does
      // not change when the mobile address bar shows/hides, so the frame for a
      // given scroll position never jumps mid-scroll.
      scrollable = Math.max(1, container.offsetHeight - (viewport.offsetHeight || window.innerHeight));
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

    /** Draws the visible (cover-cropped) part of a bitmap over the full canvas. */
    const blit = (c: CanvasRenderingContext2D, bmp: FrameBitmap) => {
      const r = getRegion(bmp);
      const bw = bitmapW(bmp);
      const bh = bitmapH(bmp);
      c.drawImage(
        bmp,
        ((crop.x - r.x) / r.w) * bw,
        ((crop.y - r.y) / r.h) * bh,
        (crop.w / r.w) * bw,
        (crop.h / r.h) * bh,
        0,
        0,
        canvas.width,
        canvas.height
      );
    };

    /** Masks the bottom-right watermark by cloning a clean patch of the same frame. */
    const maskWatermark = (c: CanvasRenderingContext2D, bmp: FrameBitmap) => {
      const r = getRegion(bmp);
      const bw = bitmapW(bmp);
      const bh = bitmapH(bmp);
      const pw = 72 / nativeW;
      const ph = 65 / nativeH;
      const sx = ((1448 / nativeW - r.x) / r.w) * bw;
      const sy = ((875 / nativeH - r.y) / r.h) * bh;
      const sw = (pw / r.w) * bw;
      const sh = (ph / r.h) * bh;
      if (sx < 0 || sy < 0 || sx + sw > bw || sy + sh > bh) return; // patch not in this bitmap
      const dx = ((1448 / nativeW - crop.x) / crop.w) * canvas.width;
      const dy = ((942 / nativeH - crop.y) / crop.h) * canvas.height;
      const dw = Math.ceil((pw / crop.w) * canvas.width);
      const dh = Math.ceil((ph / crop.h) * canvas.height);
      if (dx >= canvas.width || dy >= canvas.height || dx + dw <= 0 || dy + dh <= 0) return; // off screen
      c.drawImage(bmp, sx, sy, sw, sh, dx, dy, dw, dh);
    };

    const draw = (frameFloat: number) => {
      const c = getCtx();
      if (!c) return;

      const now = performance.now();
      const isActivelyScrolling = now - lastScrollChange < 60;

      const floorIdx = Math.floor(frameFloat);
      const ceilIdx = Math.min(TOTAL_FRAMES - 1, floorIdx + 1);
      const fraction = frameFloat - floorIdx;

      let baseIdx = isActivelyScrolling ? floorIdx : Math.round(frameFloat);
      let blendIdx = -1;
      if (isActivelyScrolling && fraction > 0.97 && bitmaps[ceilIdx]) {
        baseIdx = ceilIdx;
      } else if (isActivelyScrolling && fraction > 0.04 && bitmaps[floorIdx] && bitmaps[ceilIdx] && ceilIdx !== floorIdx) {
        blendIdx = ceilIdx;
      }

      const base = resolveSource(baseIdx);
      const resolved = resolvedIdx;
      if (!base) return; // nothing ready yet; keep last painted image
      if (resolved !== baseIdx || resolvedIsKeyframe) blendIdx = -1;

      c.globalAlpha = 1;
      blit(c, base);

      if (blendIdx >= 0) {
        c.globalAlpha = fraction;
        blit(c, bitmaps[blendIdx]!);
        c.globalAlpha = 1;
      }

      if (!isMobile) {
        maskWatermark(c, base);
      }
      const wantsBlend = isActivelyScrolling && fraction > 0.04 && fraction <= 0.97 && ceilIdx !== floorIdx;
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
      const srcW = blobW[idx] || nativeW;
      planDecode(srcW);
      decodeBlob(blob, srcW, Math.round((srcW * nativeH) / nativeW), crop, outW, outH, outResize)
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
      let w = tierW[tier];
      fetchBlob(framePath(idx, tier, isMobile))
        .catch(() => null)
        .then((blob) => {
          if (blob) return blob;
          w = nativeW; // original full-size render
          return fetchBlob(fallbackFramePath(idx, isMobile)).catch(() => null);
        })
        .then((blob) => {
          if (disposed) return;
          if (blob) {
            blobs[idx] = blob;
            blobW[idx] = w;
            status[idx] = ST_FETCHED;
            if (inWindow(idx)) pumpDecodes();
          } else {
            status[idx] = ST_FAILED;
          }
        })
        .finally(() => {
          activeFetches--;
          settledFetches++;
          if (!disposed) {
            pumpFetches();
            reportReadiness();
          }
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
    /** Decodes a keyframe's visible region from its "lo" blob (re-run on crop change). */
    const decodeKeyframe = (idx: number) => {
      const blob = kfBlobs[idx];
      if (!blob) return;
      kfBusy[idx] = 1;
      activeKfJobs++;
      const g = cropGen;
      const srcW = tierW.lo;
      const srcH = Math.round((srcW * nativeH) / nativeW);
      const px = crop.w * srcW * crop.h * srcH;
      const s = px > KF_MAX_PX ? Math.sqrt(KF_MAX_PX / px) : 1;
      decodeBlob(
        blob,
        srcW,
        srcH,
        crop,
        Math.max(1, Math.round(crop.w * srcW * s)),
        Math.max(1, Math.round(crop.h * srcH * s)),
        s < 1
      )
        .then((bmp) => {
          if (disposed) {
            releaseBitmap(bmp);
            return;
          }
          releaseBitmap(keyframes[idx]);
          keyframes[idx] = bmp;
          kfGen[idx] = g;
          if (g === cropGen) currentKeyframes++;
          if (!shownExact) needsDraw = true;
        })
        .catch(() => {
          kfGen[idx] = g; // undecodable: don't retry for this crop
        })
        .finally(() => {
          kfBusy[idx] = 0;
          activeKfJobs--;
          if (!disposed) {
            pumpKeyframes();
            reportReadiness();
          }
        });
    };

    const fetchKeyframe = (idx: number) => {
      kfStatus[idx] = ST_FETCHING;
      activeKfJobs++;
      fetchBlob(framePath(idx, "lo", isMobile))
        .catch(() => null)
        .then((blob) => {
          if (disposed) return;
          if (blob) {
            kfBlobs[idx] = blob;
            kfStatus[idx] = ST_FETCHED;
          } else {
            kfStatus[idx] = ST_FAILED;
            failedKeyframes++;
          }
        })
        .finally(() => {
          activeKfJobs--;
          settledKfFetches++;
          if (!disposed) {
            pumpKeyframes();
            reportReadiness();
          }
        });
    };

    /** Starts a keyframe fetch or (re-)decode if needed; false once the lane is full. */
    const tryKeyframe = (k: number) => {
      if (k < 0 || k >= TOTAL_FRAMES) return true;
      if (kfStatus[k] === ST_IDLE) fetchKeyframe(k);
      else if (kfStatus[k] === ST_FETCHED && kfGen[k] !== cropGen && !kfBusy[k]) decodeKeyframe(k);
      return activeKfJobs < MAX_CONCURRENT_KF_FETCHES;
    };

    const pumpKeyframes = () => {
      if (activeKfJobs >= MAX_CONCURRENT_KF_FETCHES) return;
      if (settledKfFetches >= totalKeyframes && currentKeyframes + failedKeyframes >= totalKeyframes) return;
      const k0 = center - (center % KF_STRIDE);
      for (let d = 0; d < TOTAL_FRAMES; d += KF_STRIDE) {
        if (!tryKeyframe(k0 + direction * d)) return;
        if (d > 0 && !tryKeyframe(k0 - direction * d)) return;
      }
    };

    // ---- First-load readiness ------------------------------------------
    // Progress (0–1) is published on window for the branded loading screen:
    // every keyframe (so any scroll position has a sharp-enough image) plus
    // the first READY_FULL_FRAMES full-resolution frames, and frame 0 painted.
    type HeroWindow = Window & { __heroProgress?: number; __heroReady?: boolean };
    const hw = window as HeroWindow;
    let readyReported = false;
    const reportReadiness = () => {
      if (readyReported) return;
      const kf = Math.min(1, (currentKeyframes + failedKeyframes) / totalKeyframes);
      let full = 0;
      const start = Math.max(0, Math.min(center, TOTAL_FRAMES - READY_FULL_FRAMES));
      for (let i = start; i < start + READY_FULL_FRAMES; i++) {
        if (status[i] === ST_FETCHED || status[i] === ST_FAILED) full++;
      }
      const fullP = full / READY_FULL_FRAMES;
      const p = kf * 0.55 + fullP * 0.45;
      const ready = kf >= 1 && fullP >= 1 && shownExact;
      if (ready) readyReported = true;
      const prev = hw.__heroProgress ?? 0;
      if (ready || p - prev >= 0.01) {
        hw.__heroProgress = ready ? 1 : Math.max(prev, p);
        hw.__heroReady = ready;
        window.dispatchEvent(new CustomEvent("hero:progress", { detail: hw.__heroProgress }));
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
      const isMoving = y !== lastScrollY;
      if (isMoving) {
        lastScrollY = y;
        lastScrollChange = now;
        const progress = Math.min(1, Math.max(0, (y - containerTop) / scrollable));
        targetFrame = progress * (TOTAL_FRAMES - 1);
        const diff = targetFrame - currentFrame;
        // Tightly track the active scroll position
        const k = 1 - Math.exp(-Math.min(deltaMs ?? 16, 50) / 20);
        currentFrame += diff * k;
        needsDraw = true;
      } else {
        // SCROLL STOPPED: Immediately halt frame changing transitions!
        const restingFrame = Math.round(targetFrame);
        if (currentFrame !== restingFrame) {
          currentFrame = restingFrame;
          targetFrame = restingFrame;
          needsDraw = true;
        }
      }

      if (needsDraw) {
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
      if (!readyReported && shownExact) reportReadiness();
    };

    // ---- Boot -----------------------------------------------------------
    hw.__heroProgress = 0;
    hw.__heroReady = false;
    resizeCanvas();
    measure();

    // Pick the full-size tier: 1920px only for large canvases on a decent link.
    {
      const conn = (navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string; downlink?: number };
      }).connection;
      const slowLink =
        !!conn &&
        (conn.saveData === true ||
          /(^|-)(2g|3g)$/.test(conn.effectiveType ?? "") ||
          (typeof conn.downlink === "number" && conn.downlink > 0 && conn.downlink < 5));
      const coverScale = Math.max(canvas.width / nativeW, canvas.height / nativeH);
      tier = !slowLink && coverScale > HD_TIER_ABOVE_SCALE ? "hd" : "md";
      computeDecodeSize(); // window size depends on the tier's pixel size
    }

    tick(); // establish initial centre from current scroll position
    updateOverlays(currentFrame / (TOTAL_FRAMES - 1));
    pumpKeyframes();
    pumpFetches();

    gsap.ticker.add(tick);

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let prevIsMobile = isMobile;
    const onResize = () => {
      measure();
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const nextIsMobile = checkIsMobile();
        if (nextIsMobile !== prevIsMobile) {
          window.location.reload();
          return;
        }
        resizeCanvas();
        evictOutsideWindow();
        pumpDecodes();
        pumpKeyframes(); // re-decode keyframes if the visible crop changed
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
        kfBlobs[i] = null;
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

        {/* Light, localized legibility scrim: only the bottom-left corner behind the
            copy is softly shaded so the frames keep their full brightness. */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,15,0,0.45)_0%,rgba(20,15,0,0.15)_40%,transparent_65%)]" />

        {/* Business introduction chapters, revealed along the walkthrough */}
        <div className="absolute inset-0 z-20 pointer-events-none [text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_2px_18px_rgba(0,0,0,0.45)]">
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
                    <FlipButton
                      from="top"
                      tapScale={0.97}
                      onClick={onOpenBooking}
                      className="shadow-xl shadow-black/40 cursor-pointer"
                    >
                      <FlipButtonFront className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-[#BCB893] text-[#1E1700] text-[11px] font-mono font-semibold uppercase tracking-[0.2em]">
                        {ch.cta}
                      </FlipButtonFront>
                      <FlipButtonBack className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-[#CFCCAE] text-[#1E1700] text-[11px] font-mono font-semibold uppercase tracking-[0.2em]">
                        Reserve Viewing →
                      </FlipButtonBack>
                    </FlipButton>
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
