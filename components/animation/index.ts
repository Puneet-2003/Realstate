// Core Animation Architecture Exports
export { SmoothScrollProvider, useLenis, type LenisContextValue } from "./SmoothScrollProvider";
export { FadeIn, type FadeInProps, type FadeInDirection } from "./FadeIn";
export { SlideUp, type SlideUpProps } from "./SlideUp";
export { StaggerContainer, StaggerItem, type StaggerContainerProps, type StaggerItemProps } from "./StaggerContainer";
export { AnimatedText, type AnimatedTextProps, type AnimatedTextType } from "./AnimatedText";
export { ParallaxSection, type ParallaxSectionProps } from "./ParallaxSection";
export { ScrollReveal, type ScrollRevealProps, type ScrollRevealEffect, type ScrollRevealEngine } from "./ScrollReveal";
export { CinematicScrollGallery, type CinematicScrollGalleryProps, type GalleryCard } from "./CinematicScrollGallery";

// Easing, Variants & GSAP Registration Helpers
export { EASING, TRANSITIONS, VARIANTS, registerGSAP, isReducedMotion } from "@/lib/animations";

// Safe Animation Hooks
export { useScrollTrigger } from "@/hooks/useScrollTrigger";
export { useReducedMotion } from "@/hooks/useReducedMotion";
