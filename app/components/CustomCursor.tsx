"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const moveCursor = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.25, ease: "power2.out" });
    };

    const growCursor = () => gsap.to(ring, { scale: 2.5, duration: 0.3 });
    const shrinkCursor = () => gsap.to(ring, { scale: 1, duration: 0.3 });
    const hideCursor = () => setVisible(false);
    const showCursor = () => setVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", hideCursor);
    window.addEventListener("mouseenter", showCursor);

    const attachHoverListeners = () => {
      document.querySelectorAll("a, button, [data-cursor-grow]").forEach((el) => {
        el.addEventListener("mouseenter", growCursor);
        el.addEventListener("mouseleave", shrinkCursor);
      });
    };

    // Attach immediately + after short delay for dynamic elements
    attachHoverListeners();
    const t = setTimeout(attachHoverListeners, 1000);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("mouseenter", showCursor);
      clearTimeout(t);
    };
  }, [visible]);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 border border-gold/60 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
}