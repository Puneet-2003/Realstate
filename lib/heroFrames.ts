/**
 * Frame sequence for the home-page hero walkthrough.
 *
 * Shared by the server (page-level preload hints + the server-rendered poster)
 * and the client (HeroSection's streaming canvas player), so both always ask
 * Cloudinary for byte-identical URLs and the browser cache is reused.
 */

export const TOTAL_FRAMES = 717;

const CLOUDINARY_ORIGIN = "https://res.cloudinary.com";
const CLOUDINARY_BASE = `${CLOUDINARY_ORIGIN}/ddelf4odl/image/upload`;

/**
 * Only two encodes exist on Cloudinary per sequence:
 *  - "lo": small keyframe tier (desktop 640×360, mobile 540×960)
 *  - "full": the native render (desktop 1920×1080, mobile 1080×1920)
 */
export type FrameTier = "lo" | "full";

export const FRAME_SIZE = {
  desktop: { lo: { w: 640, h: 360 }, full: { w: 1920, h: 1080 } },
  mobile: { lo: { w: 540, h: 960 }, full: { w: 1080, h: 1920 } },
} as const;

/**
 * Same rule as the client's `checkIsMobile()` (narrow or portrait screens get
 * the portrait render), expressed as a media query for server-side hints.
 */
export const MOBILE_FRAMES_MEDIA = "(max-width: 768px), (orientation: portrait)";
export const DESKTOP_FRAMES_MEDIA = "(min-width: 769px) and (orientation: landscape)";

export const checkIsMobile = () =>
  typeof window !== "undefined" &&
  (window.innerWidth <= 768 || window.innerWidth < window.innerHeight);

const DESKTOP_FOLDERS = ["fry_frames", "try_frames", "dry_frames"];
const MOBILE_FOLDERS = ["mobile_frames/1st", "mobile_frames/2nd", "mobile_frames/3rd"];
const FRAMES_PER_FOLDER = 239;

/** Cloudinary URL of one frame of the walkthrough. */
export const framePath = (index: number, tier: FrameTier, isMobile: boolean) => {
  const part = Math.min(2, Math.floor(index / FRAMES_PER_FOLDER));
  const folder = (isMobile ? MOBILE_FOLDERS : DESKTOP_FOLDERS)[part];
  const pad = String(index - part * FRAMES_PER_FOLDER + 1).padStart(4, "0");
  return `${CLOUDINARY_BASE}/${folder}/${tier === "lo" ? "lo" : "hd"}/${pad}.webp`;
};

/**
 * Full-resolution frames hinted from the server HTML (after the poster frame),
 * so they download while the JavaScript is still loading.
 */
export const SERVER_PRELOAD_FRAMES = 6;
