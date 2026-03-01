"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { weddingConfig } from "../config";

interface Props {
  onComplete: () => void;
}

export default function Loader({ onComplete }: Props) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const gateLeftRef = useRef<HTMLDivElement>(null);
  const gateRightRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const flowerLeftRef = useRef<HTMLDivElement>(null);
  const flowerRightRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const lightRaysRef = useRef<HTMLDivElement>(null);
  const [btnVisible, setBtnVisible] = useState(false);

  const { bride, groom } = weddingConfig;

  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial state — gates closed, bg zoomed in
    gsap.set(gateLeftRef.current,  { x: 0 });
    gsap.set(gateRightRef.current, { x: 0 });
    gsap.set(bgRef.current,        { scale: 1.15, opacity: 0.4 });
    gsap.set(lightRaysRef.current, { opacity: 0, scale: 0.8 });
    gsap.set([flowerLeftRef.current, flowerRightRef.current], { opacity: 0, scale: 0.7 });
    gsap.set(monogramRef.current,  { opacity: 0, y: 20 });
    gsap.set(lineRef.current,      { width: 0 });
    gsap.set(subtitleRef.current,  { opacity: 0 });
    gsap.set(btnRef.current,       { opacity: 0, y: 16 });

    tl
      // 1. BG fades in
      .to(bgRef.current, { opacity: 1, duration: 1, ease: "power2.out" })

      // 2. Gates open — slide left & right
      .to(gateLeftRef.current,  { x: "-100%", duration: 1.6, ease: "power3.inOut" }, "+=0.3")
      .to(gateRightRef.current, { x: "100%",  duration: 1.6, ease: "power3.inOut" }, "<")

      // 3. BG zooms out (parallax pull-back)
      .to(bgRef.current, { scale: 1, duration: 1.8, ease: "power2.out" }, "<0.3")

      // 4. Light rays burst
      .to(lightRaysRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, "<0.5")

      // 5. Flowers bloom in from corners
      .to(flowerLeftRef.current,  { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" }, "<0.2")
      .to(flowerRightRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" }, "<0.15")

      // 6. Monogram appears
      .to(monogramRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "<0.3")
      .to(lineRef.current,     { width: "140px", duration: 0.6, ease: "power2.inOut" }, "-=0.3")
      .to(subtitleRef.current, { opacity: 1, duration: 0.5 }, "-=0.2")

      // 7. Show button
      .to(btnRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "+=0.1")
      .call(() => setBtnVisible(true));

    return () => { tl.kill(); };
  }, []);

  const handleOpen = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0, duration: 0.5,
          onComplete: () => onCompleteRef.current(),
        });
      },
    });

    tl
      .to(btnRef.current,       { opacity: 0, y: -10, duration: 0.2 })
      .to(monogramRef.current,  { opacity: 0, y: -20, duration: 0.3 }, "<0.05")
      .to(subtitleRef.current,  { opacity: 0, duration: 0.2 }, "<")
      .to(lineRef.current,      { opacity: 0, duration: 0.2 }, "<")
      .to(flowerLeftRef.current,  { opacity: 0, scale: 0.8, duration: 0.4 }, "<")
      .to(flowerRightRef.current, { opacity: 0, scale: 0.8, duration: 0.4 }, "<")
      .to(lightRaysRef.current,   { opacity: 0, duration: 0.3 }, "<")
      // Gates close back in then screen fades
      .to(bgRef.current, { scale: 1.05, opacity: 0, duration: 0.6, ease: "power2.in" }, "<0.1");
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] overflow-hidden"
      style={{ background: "#0F0C05" }}
    >
      {/* ── Deep background ── */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, #2E1F0A 0%, #1A1208 50%, #0A0804 100%)",
        }}
      />

      {/* ── Light rays bursting from center ── */}
      <div
        ref={lightRaysRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute origin-center"
            style={{
              width: "2px",
              height: "60vh",
              background: "linear-gradient(to top, transparent, rgba(201,168,76,0.12), transparent)",
              transform: `rotate(${i * 30}deg) translateY(-50%)`,
              top: "50%",
              left: "50%",
              marginLeft: "-1px",
            }}
          />
        ))}
        {/* Center glow */}
        <div
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* ── Decorative arch / frame ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          className="absolute"
          width="320" height="420"
          viewBox="0 0 320 420"
          fill="none"
          style={{ opacity: 0.25 }}
        >
          {/* Arch top */}
          <path
            d="M40 420 L40 160 Q40 40 160 40 Q280 40 280 160 L280 420"
            stroke="#C9A84C" strokeWidth="1" fill="none"
          />
          {/* Inner arch */}
          <path
            d="M70 420 L70 170 Q70 80 160 80 Q250 80 250 170 L250 420"
            stroke="#C9A84C" strokeWidth="0.5" fill="none" strokeDasharray="4 6"
          />
          {/* Corner ornaments */}
          <circle cx="40" cy="160" r="4" fill="#C9A84C" opacity="0.6" />
          <circle cx="280" cy="160" r="4" fill="#C9A84C" opacity="0.6" />
          <line x1="20" y1="420" x2="300" y2="420" stroke="#C9A84C" strokeWidth="0.5" />
        </svg>
      </div>

      {/* ── Gate LEFT ── */}
      <div
        ref={gateLeftRef}
        className="absolute top-0 left-0 w-1/2 h-full z-10"
        style={{ background: "linear-gradient(to right, #0A0804, #1A1208)" }}
      >
        {/* Gate vertical bars */}
        <div className="absolute inset-0 flex justify-end">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-full"
              style={{
                width: "2px",
                marginRight: `${i * 18 + 8}px`,
                background: `linear-gradient(to bottom, transparent, rgba(201,168,76,${0.15 + i * 0.05}), transparent)`,
              }}
            />
          ))}
        </div>
        {/* Gate right edge ornament */}
        <div
          className="absolute top-0 right-0 w-px h-full"
          style={{ background: "linear-gradient(to bottom, transparent, #C9A84C 20%, #C9A84C 80%, transparent)" }}
        />
        {/* Horizontal bar */}
        <div className="absolute right-0 top-1/3 w-full h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.3))" }} />
        <div className="absolute right-0 top-2/3 w-full h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.2))" }} />
        {/* Gate lock center */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
          <div className="w-4 h-4 bg-gold/80 rotate-45 border border-gold" />
        </div>
      </div>

      {/* ── Gate RIGHT ── */}
      <div
        ref={gateRightRef}
        className="absolute top-0 right-0 w-1/2 h-full z-10"
        style={{ background: "linear-gradient(to left, #0A0804, #1A1208)" }}
      >
        {/* Gate vertical bars */}
        <div className="absolute inset-0 flex justify-start">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-full"
              style={{
                width: "2px",
                marginLeft: `${i * 18 + 8}px`,
                background: `linear-gradient(to bottom, transparent, rgba(201,168,76,${0.15 + i * 0.05}), transparent)`,
              }}
            />
          ))}
        </div>
        {/* Gate left edge ornament */}
        <div
          className="absolute top-0 left-0 w-px h-full"
          style={{ background: "linear-gradient(to bottom, transparent, #C9A84C 20%, #C9A84C 80%, transparent)" }}
        />
        {/* Horizontal bars */}
        <div className="absolute left-0 top-1/3 w-full h-px"
          style={{ background: "linear-gradient(to left, transparent, rgba(201,168,76,0.3))" }} />
        <div className="absolute left-0 top-2/3 w-full h-px"
          style={{ background: "linear-gradient(to left, transparent, rgba(201,168,76,0.2))" }} />
        {/* Gate lock center */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
          <div className="w-4 h-4 bg-gold/80 rotate-45 border border-gold" />
        </div>
      </div>

      {/* ── Flower corners (left) ── */}
      <div ref={flowerLeftRef} className="absolute bottom-0 left-0 pointer-events-none z-20 scale-75 md:scale-100 origin-bottom-left">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <circle cx="20" cy="160" r="40" fill="rgba(201,168,76,0.06)" />
          <circle cx="40" cy="140" r="25" fill="rgba(201,168,76,0.08)" />
          {/* Petals */}
          {[0,60,120,180,240,300].map((deg, i) => (
            <ellipse
              key={i}
              cx={60 + Math.cos((deg * Math.PI) / 180) * 22}
              cy={120 + Math.sin((deg * Math.PI) / 180) * 22}
              rx="10" ry="18"
              fill={`rgba(201,168,76,${0.12 + i * 0.02})`}
              transform={`rotate(${deg} ${60 + Math.cos((deg * Math.PI) / 180) * 22} ${120 + Math.sin((deg * Math.PI) / 180) * 22})`}
            />
          ))}
          <circle cx="60" cy="120" r="8" fill="rgba(201,168,76,0.3)" />
          {/* Stems */}
          <path d="M30 180 Q50 150 60 120" stroke="rgba(201,168,76,0.25)" strokeWidth="1.5" fill="none"/>
          <path d="M0 150 Q30 140 60 120" stroke="rgba(201,168,76,0.2)" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      {/* ── Flower corners (right) ── */}
      <div ref={flowerRightRef} className="absolute bottom-0 right-0 pointer-events-none z-20 scale-75 md:scale-100 origin-bottom-right">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" style={{ transform: "scaleX(-1)" }}>
          <circle cx="20" cy="160" r="40" fill="rgba(201,168,76,0.06)" />
          <circle cx="40" cy="140" r="25" fill="rgba(201,168,76,0.08)" />
          {[0,60,120,180,240,300].map((deg, i) => (
            <ellipse
              key={i}
              cx={60 + Math.cos((deg * Math.PI) / 180) * 22}
              cy={120 + Math.sin((deg * Math.PI) / 180) * 22}
              rx="10" ry="18"
              fill={`rgba(201,168,76,${0.12 + i * 0.02})`}
              transform={`rotate(${deg} ${60 + Math.cos((deg * Math.PI) / 180) * 22} ${120 + Math.sin((deg * Math.PI) / 180) * 22})`}
            />
          ))}
          <circle cx="60" cy="120" r="8" fill="rgba(201,168,76,0.3)" />
          <path d="M30 180 Q50 150 60 120" stroke="rgba(201,168,76,0.25)" strokeWidth="1.5" fill="none"/>
          <path d="M0 150 Q30 140 60 120" stroke="rgba(201,168,76,0.2)" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      {/* ── Center content (above gates) ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
        <div
          ref={monogramRef}
          className="font-cinzel text-[72px] md:text-[110px] text-gold opacity-0 translate-y-5 tracking-widest select-none gold-glow"
        >
          {bride.initial} ✦ {groom.initial}
        </div>

        <div
          ref={lineRef}
          className="h-px w-0 bg-gradient-to-r from-transparent via-gold to-transparent mt-4"
        />

        <div
          ref={subtitleRef}
          className="font-montserrat text-[11px] tracking-[0.5em] uppercase text-gold-light opacity-0 mt-4"
        >
          Undangan Pernikahan
        </div>
      </div>

      {/* ── Open button ── */}
      <div className="absolute bottom-10 md:bottom-16 left-0 right-0 flex justify-center z-30">
        <button
          ref={btnRef}
          onClick={handleOpen}
          className="relative overflow-hidden border border-gold/60 px-8 py-4 font-montserrat text-[11px] tracking-[0.4em] uppercase text-gold group opacity-0"
          style={{ pointerEvents: btnVisible ? "auto" : "none" }}
        >
          <span className="absolute inset-0 bg-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10 flex items-center gap-3">
            Buka Undangan
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path d="M0 5H14M10 1L14 5L10 9" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </span>
        </button>
      </div>

      {/* ── Names at bottom ── */}
      <div className="absolute bottom-6 left-0 right-0 text-center z-30 pointer-events-none">
        <span className="font-montserrat text-[9px] tracking-[0.4em] uppercase text-gold/30">
          {bride.name} &amp; {groom.name}
        </span>
      </div>
    </div>
  );
}