"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

export default function MusicButton({ visible }: { visible: boolean }) {
  const [playing, setPlaying] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (visible) gsap.to(btnRef.current, { opacity: 1, duration: 0.6, delay: 0.3 });
  }, [visible]);

  const toggle = () => {
    setPlaying((p) => !p);
    gsap.to(btnRef.current, { rotate: playing ? 0 : 360, duration: 0.5 });
  };

  return (
    <motion.button
      ref={btnRef}
      onClick={toggle}
      title="Musik"
      className="fixed bottom-8 right-8 z-[200] w-12 h-12 border border-gold/60 bg-deep/90 backdrop-blur-md flex items-center justify-center text-lg text-gold hover:bg-gold/10 transition-colors duration-300 opacity-0"
    >
      {playing ? "♫" : "♪"}
    </motion.button>
  );
}
