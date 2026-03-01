"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { weddingConfig } from "../config";

// ✏️ Ganti ayat di sini jika perlu
const VERSE = {
  text: "Sebab itu seorang laki-laki akan meninggalkan ayahnya dan ibunya dan bersatu dengan isterinya, sehingga keduanya menjadi satu daging.",
  source: "Kejadian 2:24",
};

export default function OpeningSection() {
  const { invitationText } = weddingConfig;
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  return (
    <section
      id="opening"
      className="relative py-28 px-6 text-center bg-ivory overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Corner ornaments */}
      <CornerOrnament className="absolute top-6 left-6 text-gold/30" />
      <CornerOrnament className="absolute top-6 right-6 text-gold/30 scale-x-[-1]" />
      <CornerOrnament className="absolute bottom-6 left-6 text-gold/30 scale-y-[-1]" />
      <CornerOrnament className="absolute bottom-6 right-6 text-gold/30 scale-[-1]" />

      <motion.div
        ref={ref}
        className="max-w-2xl mx-auto"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {/* Cross ornament */}
        <motion.div variants={item} className="flex justify-center mb-8">
          <svg width="32" height="40" viewBox="0 0 32 40" fill="none">
            <rect x="13" y="0" width="6" height="40" fill="#8B6914" opacity="0.5" />
            <rect x="0" y="12" width="32" height="6" fill="#8B6914" opacity="0.5" />
          </svg>
        </motion.div>

        {/* Bible verse */}
        <motion.p
          variants={item}
          className="font-cormorant italic text-xl md:text-2xl text-text-mid leading-relaxed mb-6"
        >
          "{VERSE.text}"
        </motion.p>

        <motion.p
          variants={item}
          className="font-montserrat text-[11px] tracking-[0.35em] uppercase text-text-mid/60 mb-10"
        >
          — {VERSE.source}
        </motion.p>

        {/* Gold divider */}
        <motion.div variants={item} className="gold-divider">
          <div className="gold-divider-line" />
          <div className="gold-divider-diamond" />
          <div className="gold-divider-line" />
        </motion.div>

        {/* Invitation text */}
        <motion.p
          variants={item}
          className="font-cormorant text-xl md:text-2xl text-text-mid leading-relaxed mt-8"
        >
          {invitationText}
        </motion.p>
      </motion.div>
    </section>
  );
}

function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="currentColor"
    >
      <path d="M0 0 L16 0 L16 2 L2 2 L2 16 L0 16 Z" />
      <path d="M20 10 L22 10 L22 20 L20 20 Z" opacity="0.4" />
      <path d="M10 20 L20 20 L20 22 L10 22 Z" opacity="0.4" />
    </svg>
  );
}