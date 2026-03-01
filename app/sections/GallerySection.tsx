"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants, type Easing } from "framer-motion";
import { useInView } from "react-intersection-observer";

const GALLERY_ITEMS = [
  { symbol: "✦", label: "Foto 1" },
  { symbol: "R&A", label: "Foto 2", large: true },
  { symbol: "❋", label: "Foto 3" },
  { symbol: "♥", label: "Foto 4", large: true },
  { symbol: "✦", label: "Foto 5" },
  { symbol: "❋", label: "Foto 6" },
  { symbol: "✦", label: "Foto 7" },
  { symbol: "R&A", label: "Foto 8", large: true },
  { symbol: "❋", label: "Foto 9" },
  { symbol: "♥", label: "Foto 10", large: true },
  { symbol: "✦", label: "Foto 11" },
  { symbol: "❋", label: "Foto 12" },
];

const EASE_OUT: Easing = "easeOut";
const EASE_IN: Easing = "easeIn";

export default function GallerySection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const total = GALLERY_ITEMS.length;

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [next, paused]);

  const variants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: EASE_OUT },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.5, ease: EASE_IN },
    }),
  };

  const prevIdx = (current - 1 + total) % total;
  const nextIdx = (current + 1) % total;

  return (
    <section id="gallery" className="py-28 bg-ivory overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <div className="section-eyebrow !text-gold-dark">Momen Berharga</div>
        <h2 className="section-heading-dark">Galeri Kenangan</h2>
      </motion.div>

      <div
        className="relative max-w-2xl mx-auto px-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Slide area */}
        <div
          className="relative overflow-hidden border border-gold/25"
          style={{ height: "clamp(280px, 55vw, 440px)" }}
        >
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, #2A1F0A, #3D2B10)" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-cinzel text-gold/20 select-none"
                  style={{ fontSize: GALLERY_ITEMS[current].large ? "100px" : "72px" }}
                >
                  {GALLERY_ITEMS[current].symbol}
                </span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-gold-light">
                  {GALLERY_ITEMS[current].label}
                </span>
              </div>

              <div className="absolute top-4 right-5 font-montserrat text-[10px] tracking-widest text-gold/50">
                {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-gold/40 bg-deep/60 backdrop-blur-sm flex items-center justify-center text-gold hover:bg-gold/10 transition-colors duration-300"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-gold/40 bg-deep/60 backdrop-blur-sm flex items-center justify-center text-gold hover:bg-gold/10 transition-colors duration-300"
            aria-label="Next"
          >
            ›
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-3 mt-4 justify-center">
          {[prevIdx, current, nextIdx].map((idx, pos) => (
            <motion.div
              key={idx}
              onClick={() => goTo(idx)}
              animate={{
                scale: pos === 1 ? 1 : 0.85,
                opacity: pos === 1 ? 1 : 0.45,
              }}
              transition={{ duration: 0.3 }}
              className="relative flex-shrink-0 border cursor-pointer overflow-hidden"
              style={{
                width: pos === 1 ? "80px" : "60px",
                height: pos === 1 ? "80px" : "60px",
                background: "linear-gradient(135deg, #2A1F0A, #3D2B10)",
                borderColor: pos === 1 ? "rgba(201,168,76,0.7)" : "rgba(201,168,76,0.2)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-cinzel text-gold/30 text-lg select-none">
                  {GALLERY_ITEMS[idx].symbol}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 justify-center mt-5">
          {GALLERY_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300"
              aria-label={`Go to slide ${i + 1}`}
            >
              <motion.div
                animate={{
                  width: i === current ? "24px" : "6px",
                  backgroundColor: i === current ? "#C9A84C" : "rgba(201,168,76,0.3)",
                }}
                transition={{ duration: 0.3 }}
                style={{ height: "4px", borderRadius: "2px" }}
              />
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-px bg-gold/10 relative overflow-hidden max-w-xs mx-auto">
          {!paused && (
            <motion.div
              key={current}
              className="absolute inset-y-0 left-0 bg-gold/50"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.5, ease: "linear" }}
            />
          )}
        </div>
      </div>
    </section>
  );
}