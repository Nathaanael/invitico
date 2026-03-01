"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SYMBOLS = ["🌸", "✦", "❋", "✿", "◈"];

export default function FloatingPetals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createPetal = () => {
      const el = document.createElement("div");
      el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      el.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: -24px;
        font-size: ${Math.random() * 10 + 8}px;
        pointer-events: none;
        z-index: 0;
        opacity: 0;
        color: #C9A84C;
      `;
      document.body.appendChild(el);

      gsap.to(el, {
        y: window.innerHeight + 40,
        x: (Math.random() - 0.5) * 160,
        rotation: Math.random() * 360,
        duration: Math.random() * 10 + 7,
        ease: "none",
        onComplete: () => el.remove(),
      });
      gsap.to(el, { opacity: 0.5, duration: 0.8 });
    };

    const interval = setInterval(createPetal, 1400);
    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />;
}
