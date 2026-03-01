"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingConfig } from "../config";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const ornTopRef = useRef<HTMLDivElement>(null);
  const ornBotRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { bride, groom, weddingDateDisplay } = weddingConfig;

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(ornTopRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
      .to(namesRef.current, {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
      }, "-=0.4")
      .to(dividerRef.current, { opacity: 1, duration: 0.8 }, "-=0.4")
      .to(dateRef.current, { opacity: 1, duration: 0.8 }, "-=0.4")
      .to(ornBotRef.current, { opacity: 1, duration: 0.8 }, "-=0.3")
      .to(scrollRef.current, { opacity: 1, duration: 0.8 }, "-=0.2");

    // Parallax on scroll
    gsap.to(namesRef.current, {
      yPercent: 25,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(eyebrowRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #2A1F0A 0%, #1A1208 70%)",
      }}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 bg-grid-gold opacity-60 pointer-events-none" />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(26,18,8,0.8) 100%)",
        }}
      />

      {/* Top ornament */}
      <div
        ref={ornTopRef}
        className="absolute top-20 left-1/2 -translate-x-1/2 opacity-0 translate-y-4"
      >
        <OrnamentTop />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6">
        <div
          ref={eyebrowRef}
          className="font-montserrat text-[11px] tracking-[0.6em] uppercase text-gold mb-7 opacity-0 translate-y-4"
        >
          — Undangan Pernikahan —
        </div>

        <div
          ref={namesRef}
          className="font-cinzel leading-none opacity-0 translate-y-6"
          style={{ fontSize: "clamp(52px, 11vw, 140px)" }}
        >
          <span className="text-ivory gold-glow">{bride.name}</span>
          <span
            className="block font-cormorant italic text-gold"
            style={{ fontSize: "clamp(32px, 7vw, 90px)" }}
          >
            &amp; {groom.name}
          </span>
        </div>

        <div
          ref={dividerRef}
          className="gold-divider opacity-0 w-full max-w-xs"
        >
          <div className="gold-divider-line flex-1" />
          <div className="gold-divider-diamond" />
          <div className="gold-divider-line flex-1" />
        </div>

        <div
          ref={dateRef}
          className="font-montserrat text-gold-light tracking-[0.3em] text-sm md:text-lg opacity-0"
        >
          {weddingDateDisplay}
        </div>
      </div>

      {/* Bottom ornament */}
      <div
        ref={ornBotRef}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-0"
      >
        <OrnamentBottom />
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="font-montserrat text-[9px] tracking-[0.4em] uppercase text-gold">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent animate-scroll-pulse" />
      </div>
    </section>
  );
}

function OrnamentTop() {
  return (
    <svg width="240" height="44" viewBox="0 0 240 44" fill="none">
      <path d="M0 22 L96 22" stroke="#C9A84C" strokeWidth="0.5" />
      <path d="M108 10 L120 22 L132 10 L120 0 L108 10" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
      <circle cx="120" cy="22" r="7" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
      <path d="M144 22 L240 22" stroke="#C9A84C" strokeWidth="0.5" />
      <circle cx="60" cy="22" r="2" fill="#C9A84C" fillOpacity="0.4" />
      <circle cx="180" cy="22" r="2" fill="#C9A84C" fillOpacity="0.4" />
    </svg>
  );
}

function OrnamentBottom() {
  return (
    <svg width="240" height="44" viewBox="0 0 240 44" fill="none">
      <path d="M0 22 L96 22" stroke="#C9A84C" strokeWidth="0.5" />
      <path d="M108 34 L120 22 L132 34 L120 44 L108 34" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
      <circle cx="120" cy="22" r="7" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
      <path d="M144 22 L240 22" stroke="#C9A84C" strokeWidth="0.5" />
    </svg>
  );
}
