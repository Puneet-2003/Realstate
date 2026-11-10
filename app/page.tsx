import { preload } from "react-dom";
import { HomeExperience } from "@/components/HomeExperience";
import {
  DESKTOP_FRAMES_MEDIA,
  MOBILE_FRAMES_MEDIA,
  SERVER_PRELOAD_FRAMES,
  framePath,
} from "@/lib/heroFrames";

/**
 * Server Component: prerendered to static HTML at build time.
 *
 * Besides the server-rendered markup (including the hero's first-frame
 * poster), it puts resource hints in <head> so the walkthrough's opening frames
 * start downloading while the HTML is still parsing, instead of only after the
 * JavaScript bundle has loaded and hydrated (seconds later on a phone).
 */
export default function HomePage() {
  // The first full-resolution frames after the poster. `media` makes each
  // device download only its own render; `as: "fetch"` + anonymous CORS
  // matches the player's fetch() so the preloaded bytes are reused.
  for (let i = 1; i <= SERVER_PRELOAD_FRAMES; i++) {
    preload(framePath(i, "full", false), {
      as: "fetch",
      crossOrigin: "anonymous",
      media: DESKTOP_FRAMES_MEDIA,
    });
    preload(framePath(i, "full", true), {
      as: "fetch",
      crossOrigin: "anonymous",
      media: MOBILE_FRAMES_MEDIA,
    });
  }

  return <HomeExperience />;
}
