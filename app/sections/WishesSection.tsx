"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants, type Easing } from "framer-motion";
import { useInView } from "react-intersection-observer";

const WISHES = [
  {
    text: "Semoga pernikahan ini menjadi awal yang indah dari sebuah perjalanan panjang yang penuh cinta dan berkah.",
    author: "Budi Santoso & Keluarga",
  },
  {
    text: "Dua jiwa yang bersatu dalam ikatan suci. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
    author: "Anita & Reza",
  },
  {
    text: "Semoga kalian selalu menjadi penyejuk di kala panas, dan kehangatan di kala dingin satu sama lain.",
    author: "Tim Kantor",
  },
  {
    text: "Cinta yang tulus adalah anugerah terbesar. Semoga anugerah itu selalu menyertai perjalanan kalian.",
    author: "Sari & Andi",
  },
  {
    text: "Mohon doa agar rumah tangga ini menjadi surga dunia bagi kalian berdua dan seluruh keluarga.",
    author: "Teman Kuliah",
  },
  {
    text: "Selamat menempuh hidup baru! Semoga rumah tangga kalian selalu dipenuhi sukacita dan kasih Tuhan.",
    author: "Keluarga Wijaya",
  },
];

const EASE_OUT: Easing = "easeOut";
const EASE_IN: Easing = "easeIn";

const slideVariants: Variants = {
  enter: { opacity: 0, y: 30, scale: 0.97 },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.97,
    transition: { duration: 0.4, ease: EASE_IN },
  },
};

export default function WishesSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const total = WISHES.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, paused]);

  return (
    <section
      id="wishes"
      className="py-28 px-6 text-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1A1208 0%, #0F0C05 100%)" }}
    >
      {/* Title */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-14"
      >
        <div className="section-eyebrow">Dari Para Tamu</div>
        <h2 className="section-heading">Ucapan &amp; Doa</h2>
      </motion.div>

      {/* Slider */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-2xl mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Card */}
        <div className="relative" style={{ minHeight: "240px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="border border-gold/20 p-10 md:p-14 text-left bg-white/[0.02] relative"
            >
              {/* Large quote mark */}
              <div
                className="absolute top-6 left-8 font-cinzel text-7xl text-gold/10 leading-none select-none"
                aria-hidden
              >
                "
              </div>

              {/* Closing quote */}
              <div
                className="absolute bottom-6 right-8 font-cinzel text-7xl text-gold/10 leading-none select-none rotate-180"
                aria-hidden
              >
                "
              </div>

              <p className="font-cormorant italic text-xl md:text-2xl text-gold-light/90 leading-relaxed mb-8 relative z-10">
                {WISHES[current].text}
              </p>

              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-gold/40" />
                <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-gold/60">
                  {WISHES[current].author}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Prev button */}
          <button
            onClick={prev}
            className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors duration-300"
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2 items-center">
            {WISHES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Wish ${i + 1}`}
              >
                <motion.div
                  animate={{
                    width: i === current ? "24px" : "6px",
                    backgroundColor:
                      i === current ? "#C9A84C" : "rgba(201,168,76,0.25)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ height: "3px", borderRadius: "2px" }}
                />
              </button>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={next}
            className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors duration-300"
            aria-label="Next"
          >
            ›
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-px bg-gold/10 relative overflow-hidden max-w-xs mx-auto">
          {!paused && (
            <motion.div
              key={current}
              className="absolute inset-y-0 left-0 bg-gold/40"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "linear" }}
            />
          )}
        </div>

        {/* Counter */}
        <div className="mt-4 font-montserrat text-[10px] tracking-widest text-gold/30">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </motion.div>
    </section>
  );
}