"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { weddingConfig } from "../config";

export default function Footer() {
  const { bride, groom, weddingDateDisplay } = weddingConfig;
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <footer
      className="py-20 px-6 text-center border-t border-gold/10"
      style={{ background: "#0F0C05" }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-5"
      >
        <div className="font-cinzel text-6xl text-gold/15 select-none">
          {bride.initial} ✦ {groom.initial}
        </div>

        <div className="gold-divider w-40">
          <div className="gold-divider-line" />
          <div className="gold-divider-diamond" />
          <div className="gold-divider-line" />
        </div>

        <div className="font-montserrat text-[11px] tracking-[0.4em] uppercase text-gold-light/50">
          {bride.name} &amp; {groom.name}
        </div>

        <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold/30">
          {weddingDateDisplay}
        </div>

        <div className="mt-6 font-cormorant italic text-ivory/20 text-sm">
          Dibuat dengan ♥ untuk momen paling indah dalam hidup
        </div>
      </motion.div>
    </footer>
  );
}
