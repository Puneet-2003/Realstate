"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Layers,
  MoveUp,
  Cpu,
  Compass,
  Zap,
  Building,
  Key,
  Gem,
  Award,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import {
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
  AnimatedText,
  ParallaxSection,
  ScrollReveal,
  CinematicScrollGallery,
  useLenis,
} from "@/components/animation";
import {
  Spotlight,
  CardHoverEffect,
  MovingBorderButton,
  TextGenerateEffect,
} from "@/components/ui/aceternity";
import {
  NumberTicker,
  ShineBorder,
  Marquee,
  WordRotate,
  Particles,
} from "@/components/ui/magic";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { gsap } from "gsap";

export default function AnimationsShowcasePage() {
  const { scrollTo } = useLenis();
  const gsapBoxRef = useRef<HTMLDivElement>(null);
  const gsapContainerRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger Integration Demo with automatic cleanup
  useScrollTrigger(
    () => {
      if (!gsapBoxRef.current) return;

      gsap.fromTo(
        gsapBoxRef.current,
        {
          rotate: -8,
          scale: 0.88,
          opacity: 0.3,
        },
        {
          rotate: 0,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gsapBoxRef.current,
            start: "top 80%",
            end: "bottom 30%",
            scrub: 1.2,
          },
        }
      );
    },
    [],
    gsapContainerRef
  );

  const hoverEffectItems = [
    {
      title: "Mayfair Sanctuary Estate",
      description: "Historic Victorian townhouse restored with monolithic travertine marble and private zen courtyard.",
      badge: "London, UK",
      icon: <Building className="w-6 h-6" />,
    },
    {
      title: "The Glass Pavilion",
      description: "Cantilevered glass structure overlooking Bel-Air canyon with infinity thermal pool and motor court.",
      badge: "Los Angeles, CA",
      icon: <Gem className="w-6 h-6" />,
    },
    {
      title: "Alpine Chalet Monolith",
      description: "Sub-alpine timber and dark granite retreat with heated ski-in hangar and private helipad.",
      badge: "St. Moritz, CH",
      icon: <Key className="w-6 h-6" />,
    },
  ];

  const brandPartners = [
    "ARCHITECTURAL DIGEST",
    "ROBB REPORT",
    "FINANCIAL TIMES",
    "SOTHEBY'S PREVIEW",
    "WALL STREET JOURNAL",
    "BLOOMBERG PURSUITS",
    "VOGUE LIVING",
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F0] text-[#2B2612] selection:bg-[#BCB893]/30 selection:text-[#1E1700] relative">
      {/* Ambient background particles */}
      <Particles
        quantity={45}
        color="#BCB893"
        className="fixed inset-0 pointer-events-none"
      />

      {/* Top Floating Navigation Bar */}
      <header className="sticky top-0 z-50 glass-warm-light border-b border-[#6B6840]/15 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#6B6840] hover:text-[#4C4829] transition-colors font-medium font-serif"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Aurelia & Co.
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs uppercase tracking-widest font-mono text-[#6B6840]/80 hidden sm:inline">
              Animation Architecture
            </span>
            <button
              onClick={() => scrollTo(0)}
              className="text-xs px-3 py-1.5 rounded-full border border-[#6B6840]/30 hover:bg-[#6B6840]/10 transition-colors flex items-center gap-1.5"
            >
              <MoveUp className="w-3.5 h-3.5 text-[#BCB893]" />
              Scroll Top (Lenis)
            </button>
          </div>
        </div>
      </header>

      {/* Hero Showcase Section with Aceternity Spotlight */}
      <section className="relative overflow-hidden py-24 sm:py-32 border-b border-[#6B6840]/15">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#BCB893" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <FadeIn direction="down" duration={0.6}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6B6840]/10 border border-[#6B6840]/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#BCB893]" />
              <span className="text-xs uppercase tracking-widest font-mono font-semibold text-[#5A5734]">
                Next.js 16 + React 19 Animation Architecture
              </span>
            </div>
          </FadeIn>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#2B2612] mb-6">
            Curated Motion &{" "}
            <span className="italic font-serif text-[#6B6840]">
              <WordRotate
                words={["Architectural Elegance", "Scroll Harmony", "Fluid Performance", "Bespoke Precision"]}
              />
            </span>
          </h1>

          <div className="max-w-2xl mx-auto mb-10">
            <TextGenerateEffect
              words="A unified, high-performance animation system powering Aurelia & Co. with Lenis smooth scrolling, GSAP ScrollTrigger, Motion, Aceternity UI, and Magic UI."
              className="text-lg text-[#6F6C55] font-sans"
            />
          </div>

          <FadeIn delay={0.3} direction="up">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => scrollTo("#components-section")}
                className="px-6 py-3 rounded-lg bg-[#5A5734] hover:bg-[#4C4829] text-[#F8F7F0] text-sm font-medium tracking-wide transition-all shadow-md flex items-center gap-2"
              >
                Explore Reusable Components
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("#aceternity-section")}
                className="px-6 py-3 rounded-lg border border-[#6B6840]/30 hover:bg-[#6B6840]/10 text-[#2B2612] text-sm font-medium tracking-wide transition-all"
              >
                Aceternity & Magic UI
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* QUICK STATUS BAR (Magic UI Number Ticker) */}
      <section className="py-12 bg-[#F8F7F0] border-b border-[#6B6840]/15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-[#6B6840]/15">
            <div>
              <div className="font-serif text-3xl sm:text-4xl text-[#5A5734] font-light">
                <NumberTicker value={60} suffix=" FPS" />
              </div>
              <p className="text-xs uppercase tracking-widest text-[#6F6C55] mt-1 font-mono">
                Frame Rate Target
              </p>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl text-[#5A5734] font-light">
                <NumberTicker value={7} suffix=" Components" />
              </div>
              <p className="text-xs uppercase tracking-widest text-[#6F6C55] mt-1 font-mono">
                Core Architecture
              </p>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl text-[#5A5734] font-light">
                <NumberTicker value={100} suffix="%" />
              </div>
              <p className="text-xs uppercase tracking-widest text-[#6F6C55] mt-1 font-mono">
                Reduced Motion Safe
              </p>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl text-[#5A5734] font-light">
                <NumberTicker value={0} suffix=" ms" />
              </div>
              <p className="text-xs uppercase tracking-widest text-[#6F6C55] mt-1 font-mono">
                Hydration Mismatch
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ATTACHED VIDEO RECREATION: Cinematic Smooth Scroll Gallery */}
      <section className="border-b border-[#6B6840]/15">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-6 text-center">
          <span className="text-xs font-mono font-semibold text-[#6B6840] uppercase tracking-widest">
            Motion Highlight (From Attached Video)
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2612] font-light mt-1">
            Cinematic Scroll Gallery &bull; &ldquo;W E S T&rdquo; Interaction
          </h2>
          <p className="text-sm text-[#6F6C55] mt-1 max-w-xl mx-auto font-sans">
            Scroll down smoothly to experience the exact interaction from your video: the hero title lifts up, background darkens, and 4 vertical cards rise in a staggered parallax wave.
          </p>
        </div>

        <CinematicScrollGallery
          title="Nature."
          brand="Ready co."
          counter="04 / 09"
          caption="Instagram. Facebook. Dribbble. Twitter."
        />
      </section>

      {/* COMPONENT 1: AnimatedText Showcase */}
      <section id="components-section" className="py-20 max-w-7xl mx-auto px-6 border-b border-[#6B6840]/15">
        <div className="mb-12">
          <span className="text-xs font-mono font-semibold text-[#6B6840] uppercase tracking-widest">
            Component 1 / 7
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2612] font-light mt-1">
            AnimatedText Component
          </h2>
          <p className="text-sm text-[#6F6C55] mt-1 font-sans">
            Splits text into words, characters, or lines with accessibility preservation and luxury quintic easing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-[#6B6840]/20 bg-[#F8F7F0]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B6840] block mb-3">
              Type = &quot;words&quot;
            </span>
            <AnimatedText
              text="Architectural mastery framed by panoramic natural vistas."
              type="words"
              className="font-serif text-2xl text-[#2B2612]"
            />
          </div>

          <div className="p-6 rounded-xl border border-[#6B6840]/20 bg-[#F8F7F0]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B6840] block mb-3">
              Type = &quot;characters&quot;
            </span>
            <AnimatedText
              text="BESPOKE RESIDENCES"
              type="characters"
              className="font-serif text-2xl text-[#5A5734] tracking-widest"
            />
          </div>

          <div className="p-6 rounded-xl border border-[#6B6840]/20 bg-[#F8F7F0]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B6840] block mb-3">
              Type = &quot;lines&quot;
            </span>
            <AnimatedText
              text={`Every stone hand-selected.\nEvery view meticulously framed.\nA sanctuary without compromise.`}
              type="lines"
              className="text-sm leading-relaxed text-[#3E3A1F]"
            />
          </div>
        </div>
      </section>

      {/* COMPONENT 2 & 3: FadeIn and SlideUp Showcase */}
      <section className="py-20 max-w-7xl mx-auto px-6 border-b border-[#6B6840]/15">
        <div className="mb-12">
          <span className="text-xs font-mono font-semibold text-[#6B6840] uppercase tracking-widest">
            Component 2 & 3 / 7
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2612] font-light mt-1">
            FadeIn & SlideUp Components
          </h2>
          <p className="text-sm text-[#6F6C55] mt-1 font-sans">
            Compositor-accelerated entrance transitions with directional displacement and spring configuration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FadeIn direction="up" delay={0.1}>
            <div className="p-6 rounded-xl border border-[#6B6840]/20 bg-white/60 shadow-xs h-full">
              <Layers className="w-5 h-5 text-[#BCB893] mb-3" />
              <h3 className="font-serif text-lg font-medium text-[#2B2612]">FadeIn (Up)</h3>
              <p className="text-xs text-[#6F6C55] mt-2 leading-relaxed">
                Smooth upward slide with customizable distance, duration, and viewport trigger threshold.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <div className="p-6 rounded-xl border border-[#6B6840]/20 bg-white/60 shadow-xs h-full">
              <Compass className="w-5 h-5 text-[#BCB893] mb-3" />
              <h3 className="font-serif text-lg font-medium text-[#2B2612]">FadeIn (Left)</h3>
              <p className="text-xs text-[#6F6C55] mt-2 leading-relaxed">
                Horizontal slide-in from right to left, ideal for side panels and timeline items.
              </p>
            </div>
          </FadeIn>

          <SlideUp delay={0.1} spring={false}>
            <div className="p-6 rounded-xl border border-[#6B6840]/20 bg-white/60 shadow-xs h-full">
              <Zap className="w-5 h-5 text-[#BCB893] mb-3" />
              <h3 className="font-serif text-lg font-medium text-[#2B2612]">SlideUp (Quintic)</h3>
              <p className="text-xs text-[#6F6C55] mt-2 leading-relaxed">
                Heavy weighted luxury ease curve [0.22, 1, 0.36, 1] tailored for ultra-premium brands.
              </p>
            </div>
          </SlideUp>

          <SlideUp delay={0.2} spring={true}>
            <div className="p-6 rounded-xl border border-[#6B6840]/20 bg-white/60 shadow-xs h-full">
              <Cpu className="w-5 h-5 text-[#BCB893] mb-3" />
              <h3 className="font-serif text-lg font-medium text-[#2B2612]">SlideUp (Spring)</h3>
              <p className="text-xs text-[#6F6C55] mt-2 leading-relaxed">
                Physics-based tactile spring feel with tuned damping to avoid bounce oscillations.
              </p>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* COMPONENT 4: StaggerContainer & StaggerItem Showcase */}
      <section className="py-20 max-w-7xl mx-auto px-6 border-b border-[#6B6840]/15">
        <div className="mb-12">
          <span className="text-xs font-mono font-semibold text-[#6B6840] uppercase tracking-widest">
            Component 4 / 7
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2612] font-light mt-1">
            StaggerContainer & StaggerItem
          </h2>
          <p className="text-sm text-[#6F6C55] mt-1 font-sans">
            Automatically coordinates sequential entrance timing across sibling elements when entering viewport.
          </p>
        </div>

        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StaggerItem>
            <div className="p-6 rounded-xl border border-[#6B6840]/20 bg-white/70">
              <Award className="w-5 h-5 text-[#BCB893] mb-3" />
              <h4 className="font-serif text-xl font-medium text-[#2B2612]">Curated Heritage</h4>
              <p className="text-xs text-[#6F6C55] mt-2">Every listing undergoes a 12-stage provenance verification.</p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-6 rounded-xl border border-[#6B6840]/20 bg-white/70">
              <ShieldCheck className="w-5 h-5 text-[#BCB893] mb-3" />
              <h4 className="font-serif text-xl font-medium text-[#2B2612]">Discreet Sovereignty</h4>
              <p className="text-xs text-[#6F6C55] mt-2">Private treaty acquisitions protected by sovereign escrow agreements.</p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-6 rounded-xl border border-[#6B6840]/20 bg-white/70">
              <TrendingUp className="w-5 h-5 text-[#BCB893] mb-3" />
              <h4 className="font-serif text-xl font-medium text-[#2B2612]">Architectural Value</h4>
              <p className="text-xs text-[#6F6C55] mt-2">Asset appreciation driven by timeless Pritzker-level architectural signatures.</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* COMPONENT 5: ParallaxSection Showcase */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-b border-[#6B6840]/15">
        <div className="mb-12">
          <span className="text-xs font-mono font-semibold text-[#6B6840] uppercase tracking-widest">
            Component 5 / 7
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2612] font-light mt-1">
            ParallaxSection Component
          </h2>
          <p className="text-sm text-[#6F6C55] mt-1 font-sans">
            Compositor-driven scroll-linked parallax with dual-layer depth differential.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative h-96 rounded-2xl overflow-hidden border border-[#6B6840]/25 bg-[#1E1700]">
            {/* Background parallax layer */}
            <ParallaxSection speed={0.35} className="absolute inset-0 h-[130%] -top-[15%]">
              <div
                className="w-full h-full bg-cover bg-center opacity-70"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')",
                }}
              />
            </ParallaxSection>

            {/* Foreground floating parallax card */}
            <div className="absolute inset-x-6 bottom-6 z-10">
              <ParallaxSection speed={-0.2}>
                <div className="glass-warm-dark p-6 rounded-xl text-[#F8F7F0]">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#CFCCAE] block mb-1">
                    Differential Layer
                  </span>
                  <h4 className="font-serif text-xl">The Bel-Air Cantilever</h4>
                  <p className="text-xs text-[#CFCCAE] mt-1">Moves at negative velocity against the background scroller.</p>
                </div>
              </ParallaxSection>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-[#2B2612]">Precision Optical Depth</h3>
            <p className="text-sm text-[#6F6C55] leading-relaxed">
              By separating foreground and background layers into independent <code className="text-xs bg-[#6B6840]/10 px-1 py-0.5 rounded font-mono">ParallaxSection</code> components with varying speed factors, you achieve cinematic 3D parallax without CPU layout reflows.
            </p>
            <ul className="text-xs text-[#3E3A1F] space-y-2 list-disc list-inside">
              <li>Listens to native scroll progress via <code className="font-mono">useScroll</code>.</li>
              <li>Updates <code className="font-mono">transform: translateY()</code> only on the GPU compositor.</li>
              <li>Automatically collapses to zero displacement if the user requests reduced motion.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* COMPONENT 6: ScrollReveal Showcase (Mask and GSAP Scrub) */}
      <section ref={gsapContainerRef} className="py-24 max-w-7xl mx-auto px-6 border-b border-[#6B6840]/15">
        <div className="mb-12">
          <span className="text-xs font-mono font-semibold text-[#6B6840] uppercase tracking-widest">
            Component 6 / 7
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2612] font-light mt-1">
            ScrollReveal Component & GSAP ScrollTrigger
          </h2>
          <p className="text-sm text-[#6F6C55] mt-1 font-sans">
            Features architectural clip-path mask reveals and synchronized GSAP scrub triggers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Mask Reveal */}
          <ScrollReveal effect="mask" direction="up" duration={1.1}>
            <div className="p-8 rounded-2xl border border-[#6B6840]/30 bg-[#F8F7F0] shadow-sm relative overflow-hidden">
              <span className="text-xs uppercase font-mono tracking-widest text-[#6B6840] block mb-2 font-semibold">
                Mask Wipe Reveal (Motion)
              </span>
              <h3 className="font-serif text-2xl text-[#2B2612] mb-3">
                Architectural Geometric Reveal
              </h3>
              <p className="text-xs text-[#6F6C55] leading-relaxed">
                Utilizes hardware-accelerated CSS <code className="font-mono">clip-path: polygon()</code> to smoothly wipe content into view from bottom to top, creating the tactile impression of an architectural blueprint unrolling.
              </p>
            </div>
          </ScrollReveal>

          {/* GSAP ScrollTrigger Scrub */}
          <div
            ref={gsapBoxRef}
            className="p-8 rounded-2xl border border-[#BCB893]/50 bg-[#1E1700] text-[#F8F7F0] shadow-xl will-change-transform"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#BCB893] animate-pulse" />
              <span className="text-xs uppercase font-mono tracking-widest text-[#CFCCAE] font-semibold">
                GSAP ScrollTrigger Scrub
              </span>
            </div>
            <h3 className="font-serif text-2xl text-[#F8F7F0] mb-3">
              Direct Scrollbar Synchronization
            </h3>
            <p className="text-xs text-[#CFCCAE] leading-relaxed">
              Connected directly to Lenis via <code className="font-mono">lenis.on(&apos;scroll&apos;, ScrollTrigger.update)</code> and <code className="font-mono">gsap.ticker</code>. Scrub this card as you scroll to witness zero-lag transformation!
            </p>
          </div>
        </div>
      </section>

      {/* ACETERNITY UI SHOWCASE */}
      <section id="aceternity-section" className="py-24 max-w-7xl mx-auto px-6 border-b border-[#6B6840]/15">
        <div className="mb-12">
          <span className="text-xs font-mono font-semibold text-[#6B6840] uppercase tracking-widest">
            Aceternity UI
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2612] font-light mt-1">
            Aceternity Interactive Suite
          </h2>
          <p className="text-sm text-[#6F6C55] mt-1 font-sans">
            Premium interactive micro-interactions: Card Hover Effects, Radiant Moving Borders, and Dynamic Spotlights.
          </p>
        </div>

        {/* Card Hover Effect */}
        <div className="mb-14">
          <h3 className="text-xs uppercase font-mono tracking-widest text-[#6B6840] font-semibold mb-2">
            1. CardHoverEffect (Dynamic Fluid Backdrop)
          </h3>
          <CardHoverEffect items={hoverEffectItems} />
        </div>

        {/* Moving Border Button */}
        <div className="p-8 rounded-2xl border border-[#6B6840]/20 bg-white/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl text-[#2B2612]">2. Radiant Moving Border</h3>
            <p className="text-xs text-[#6F6C55] mt-1 max-w-md">
              A rotating radial gradient travels along an SVG contour, highlighting key acquisition calls-to-action.
            </p>
          </div>

          <MovingBorderButton
            borderRadius="0.75rem"
            className="font-serif text-base font-medium tracking-wide text-[#5A5734]"
            onClick={() => scrollTo(0)}
          >
            Schedule Private Acquisition
          </MovingBorderButton>
        </div>
      </section>

      {/* MAGIC UI SHOWCASE */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-b border-[#6B6840]/15">
        <div className="mb-12">
          <span className="text-xs font-mono font-semibold text-[#6B6840] uppercase tracking-widest">
            Magic UI
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2612] font-light mt-1">
            Magic UI Ambient & Sectional Suite
          </h2>
          <p className="text-sm text-[#6F6C55] mt-1 font-sans">
            Shine Borders, High-Performance Marquees, and Canvas Particle Dynamics.
          </p>
        </div>

        {/* Shine Border Card */}
        <div className="mb-14">
          <h3 className="text-xs uppercase font-mono tracking-widest text-[#6B6840] font-semibold mb-4">
            1. ShineBorder (Iridescent Perimeter Glow)
          </h3>
          <div className="max-w-2xl">
            <ShineBorder
              borderRadius={16}
              borderWidth={2}
              duration={8}
              color={["#E7E5D4", "#BCB893", "#8C642A"]}
              className="bg-[#F8F7F0] p-8"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#BCB893]/15 text-[#5A5734]">
                  <Gem className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-medium text-[#2B2612]">
                    Bespoke Private Treaty Protocol
                  </h4>
                  <p className="text-xs text-[#6F6C55] mt-2 leading-relaxed">
                    Ultra-rare architectural estates are frequently exchanged off-market. The Aurelia Private Treaty desk provides direct access to sovereign portfolios without public syndication.
                  </p>
                </div>
              </div>
            </ShineBorder>
          </div>
        </div>

        {/* Marquee infinite ticker */}
        <div>
          <h3 className="text-xs uppercase font-mono tracking-widest text-[#6B6840] font-semibold mb-4">
            2. Infinite Smooth Marquee (GPU Compositor Loop)
          </h3>
          <div className="py-4 border-y border-[#6B6840]/15 bg-white/40">
            <Marquee pauseOnHover repeat={4} duration="28s" className="text-xs font-serif tracking-widest text-[#5A5734]">
              {brandPartners.map((brand, i) => (
                <span key={i} className="flex items-center gap-6">
                  <span>{brand}</span>
                  <span className="text-[#BCB893]">•</span>
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* CODE EXAMPLES & USAGE GUIDE */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="mb-10 text-center">
          <span className="text-xs font-mono font-semibold text-[#6B6840] uppercase tracking-widest">
            Developer Documentation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2612] font-light mt-1">
            How to Use Each Reusable Component
          </h2>
          <p className="text-sm text-[#6F6C55] mt-1 font-sans">
            Ready-to-use imports available from <code className="bg-[#6B6840]/10 px-1 py-0.5 rounded font-mono">@/components/animation</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-[#1E1700] text-[#F8F7F0] font-mono text-xs overflow-x-auto">
            <p className="text-[#CFCCAE] mb-2">// 1. Smooth Scrolling & Programmatic Jump</p>
            <pre className="text-[#C9C7AE]">
{`import { useLenis } from "@/components/animation";

function Navigation() {
  const { scrollTo } = useLenis();
  return (
    <button onClick={() => scrollTo("#contact", { offset: -50 })}>
      Book Private Tour
    </button>
  );
}`}
            </pre>
          </div>

          <div className="p-6 rounded-xl bg-[#1E1700] text-[#F8F7F0] font-mono text-xs overflow-x-auto">
            <p className="text-[#CFCCAE] mb-2">// 2. FadeIn & SlideUp Entrances</p>
            <pre className="text-[#C9C7AE]">
{`import { FadeIn, SlideUp } from "@/components/animation";

<FadeIn direction="up" delay={0.2}>
  <h1>Luxury Villa</h1>
</FadeIn>

<SlideUp spring={true} distance={40}>
  <PropertyCard item={property} />
</SlideUp>`}
            </pre>
          </div>

          <div className="p-6 rounded-xl bg-[#1E1700] text-[#F8F7F0] font-mono text-xs overflow-x-auto">
            <p className="text-[#CFCCAE] mb-2">// 3. Staggered Container & Children</p>
            <pre className="text-[#C9C7AE]">
{`import { StaggerContainer, StaggerItem } from "@/components/animation";

<StaggerContainer staggerDelay={0.15}>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card {...item} />
    </StaggerItem>
  ))}
</StaggerContainer>`}
            </pre>
          </div>

          <div className="p-6 rounded-xl bg-[#1E1700] text-[#F8F7F0] font-mono text-xs overflow-x-auto">
            <p className="text-[#CFCCAE] mb-2">// 4. Parallax Section</p>
            <pre className="text-[#C9C7AE]">
{`import { ParallaxSection } from "@/components/animation";

<div className="relative h-96 overflow-hidden">
  <ParallaxSection speed={0.3}>
    <img src="/estate.jpg" className="w-full h-full object-cover" />
  </ParallaxSection>
</div>`}
            </pre>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#5A5734] hover:bg-[#4C4829] text-[#F8F7F0] text-sm font-medium tracking-wide transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
        </div>
      </section>
    </div>
  );
}

