"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { weddingConfig } from "../config";

export default function LocationSection() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const { locationName, mapsUrl } = weddingConfig;

  return (
    <section id="location" className="relative py-28 px-6 text-center overflow-hidden bg-deep">
      <div className="absolute inset-0 bg-radial-gold pointer-events-none opacity-50" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-eyebrow">Temukan Kami</div>
        <h2 className="section-heading mb-14">Lokasi Acara</h2>
      </motion.div>

      {/* Map placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-3xl mx-auto mb-10 border border-gold/25 overflow-hidden"
        style={{
          height: "340px",
          background: "linear-gradient(135deg, #1E1609, #2E1F0A)",
        }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(201,168,76,0.03) 20px, rgba(201,168,76,0.03) 21px)",
          }}
        />

        {/* Center pin */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <div className="text-5xl animate-pin-bounce mb-4">📍</div>
          <p className="font-cormorant italic text-xl text-gold-light mb-2">{locationName}</p>
          <p className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold/60">
            Klik tombol di bawah untuk membuka peta
          </p>
        </div>

        {/* Corner lines */}
        <CornerLines />
      </motion.div>

      <motion.a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="btn-gold"
      >
        <span>Buka Google Maps</span>
      </motion.a>
    </section>
  );
}

function CornerLines() {
  const size = 20;
  const positions = [
    "top-4 left-4",
    "top-4 right-4 rotate-90",
    "bottom-4 left-4 -rotate-90",
    "bottom-4 right-4 rotate-180",
  ];
  return (
    <>
      {positions.map((pos, i) => (
        <svg
          key={i}
          className={`absolute ${pos} text-gold/30`}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill="none"
        >
          <path d="M0 0 L8 0 M0 0 L0 8" stroke="currentColor" strokeWidth="1" />
        </svg>
      ))}
    </>
  );
}
