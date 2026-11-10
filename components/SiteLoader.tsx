"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/animation/SmoothScrollProvider";

/**
 * Branded first-load screen for the home page.
 *
 * It is server-rendered (visible from the very first paint, so the site never
 * flashes in half-loaded) and stays up until the hero walkthrough reports that
 * its essential frames are ready (`hero:progress` events from HeroSection),
 * then lifts away like a curtain. Scrolling is locked while it is visible so
 * the walkthrough always starts sharp and from the first frame.
 */

const BRAND = "AURELIA & CO.";
// Minimum time on screen: a full brand moment on a first visit, a brief one after.
const MIN_FIRST_VISIT_MS = 1600;
const MIN_RETURN_VISIT_MS = 700;
// Never hold the visitor longer than this, even on a very slow connection.
const MAX_WAIT_MS = 9000;
const EXIT_MS = 1300;
const SEEN_KEY = "aurelia:intro-seen";

// Shown once per page load: client-side navigation back to "/" skips it.
let shownThisLoad = false;

type HeroWindow = Window & { __heroProgress?: number; __heroReady?: boolean };

export function SiteLoader() {
  const [mounted, setMounted] = useState(() => !shownThisLoad);
  const [exiting, setExiting] = useState(false);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!mounted) return;
    shownThisLoad = true;

    const html = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = performance.now();

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* storage unavailable: treat as a first visit */
    }
    const minMs = reduced ? 300 : seen ? MIN_RETURN_VISIT_MS : MIN_FIRST_VISIT_MS;

    // Start the walkthrough from the top, with scrolling locked meanwhile.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    html.style.overflow = "hidden";
    lenis.stop();
    // iOS Safari can still rubber-band/scroll the page under overflow:hidden.
    const blockTouch = (e: TouchEvent) => e.preventDefault();
    window.addEventListener("touchmove", blockTouch, { passive: false });
    const unblock = () => window.removeEventListener("touchmove", blockTouch);

    const hw = window as HeroWindow;
    let target = 0; // reported asset progress
    let shown = 0; // eased progress on screen
    let assetsReady = false;
    let fontsReady = false;
    let finished = false;
    let raf = 0;
    let exitTimer: ReturnType<typeof setTimeout> | null = null;

    document.fonts?.ready.then(() => (fontsReady = true)).catch(() => (fontsReady = true));
    if (!document.fonts) fontsReady = true;

    const onProgress = () => {
      target = Math.max(target, hw.__heroProgress ?? 0);
      if (hw.__heroReady) assetsReady = true;
    };
    onProgress();
    window.addEventListener("hero:progress", onProgress);

    const finish = () => {
      if (finished) return;
      finished = true;
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
      setExiting(true);
      unblock(); // the page is already visible while the curtain lifts
      exitTimer = setTimeout(() => {
        html.style.overflow = "";
        lenis.start();
        setMounted(false);
      }, reduced ? 250 : EXIT_MS);
    };

    const frame = () => {
      const elapsed = performance.now() - startedAt;
      const timedOut = elapsed > MAX_WAIT_MS;
      const ready = (assetsReady && fontsReady) || timedOut;
      // The time floor keeps the counter from racing to 100 on a warm cache.
      const timeCap = Math.min(1, elapsed / minMs);
      const goal = ready ? Math.min(1, timeCap) : Math.min(target, timeCap, 0.97);
      shown += (goal - shown) * 0.08;
      if (goal - shown < 0.002) shown = goal;

      const p = Math.min(1, shown);
      if (pctRef.current) pctRef.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(1 - p);

      if (ready && p >= 1) {
        finish();
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hero:progress", onProgress);
      if (exitTimer) clearTimeout(exitTimer);
      unblock();
      html.style.overflow = "";
      lenis.start();
    };
    // lenis context value is stable for the app's lifetime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Aurelia & Co."
      className={`site-loader fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-[#140F00] text-[#F4F3EA] ${
        exiting ? "site-loader--exit" : ""
      }`}
    >
      {/* Soft champagne glow and fine frame lines */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(188,184,147,0.10),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-4 sm:inset-8 border border-[#BCB893]/10" />

      <div className="site-loader__content relative flex flex-col items-center px-6 text-center">
        {/* Monogram with progress ring */}
        <div className="relative h-28 w-28 sm:h-32 sm:w-32">
          <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(188,184,147,0.14)" strokeWidth="1" />
            <circle
              ref={ringRef}
              cx="60"
              cy="60"
              r="56"
              fill="none"
              stroke="#BCB893"
              strokeWidth="1.25"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="1"
            />
          </svg>
          <span className="site-loader__mono absolute inset-0 flex items-center justify-center font-serif text-5xl sm:text-6xl font-light italic text-[#F4F3EA]">
            A
          </span>
        </div>

        {/* Wordmark, letters revealed one by one */}
        <h2 className="mt-9 font-serif text-lg sm:text-xl font-light tracking-[0.42em] pl-[0.42em]" aria-hidden="true">
          {BRAND.split("").map((ch, i) => (
            <span key={i} className="site-loader__letter inline-block" style={{ animationDelay: `${250 + i * 55}ms` }}>
              {ch === " " ? " " : ch}
            </span>
          ))}
        </h2>
        <p className="site-loader__tagline mt-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#BCB893]/75">
          Private Real Estate Advisory
        </p>

        {/* Hairline progress */}
        <div className="mt-12 flex items-center gap-4">
          <div className="relative h-px w-40 sm:w-52 overflow-hidden bg-[#BCB893]/15">
            <div
              ref={barRef}
              className="absolute inset-0 origin-left bg-gradient-to-r from-[#9D9970] via-[#BCB893] to-[#DCDAC2]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <span ref={pctRef} className="w-8 font-mono text-[10px] tabular-nums tracking-[0.2em] text-[#BCB893]/80">
            000
          </span>
        </div>
      </div>

      <p className="site-loader__caption absolute bottom-8 sm:bottom-12 left-0 right-0 text-center font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-[#F4F3EA]/35">
        <span className="site-loader__caption-text inline-block">Preparing your private walkthrough</span>
      </p>
    </div>
  );
}
