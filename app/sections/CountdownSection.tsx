"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { weddingConfig } from "../config";

gsap.registerPlugin(ScrollTrigger);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const prevRef = useRef<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const { weddingDate } = weddingConfig;

  const calculate = () => {
    const now = new Date().getTime();
    const diff = weddingDate.getTime() - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  };

  useEffect(() => {
    setTimeLeft(calculate());
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  const units: Array<{ key: keyof TimeLeft; label: string }> = [
    { key: "days", label: "Hari" },
    { key: "hours", label: "Jam" },
    { key: "minutes", label: "Menit" },
    { key: "seconds", label: "Detik" },
  ];

  return (
    <section
      id="countdown"
      className="relative py-28 px-6 text-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1A1208, #2E1F0A)" }}
    >
      <div className="absolute inset-0 bg-radial-gold pointer-events-none" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="font-cormorant italic text-2xl md:text-3xl text-gold-light mb-14"
      >
        Menghitung Hari Menuju Hari Bahagia
      </motion.div>

      <div className="flex flex-wrap items-start justify-center gap-4 md:gap-8">
        {units.map((unit, i) => (
          <div key={unit.key} className="flex items-start gap-4 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <CountdownNumber value={pad(timeLeft[unit.key])} />
              <span className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-gold-light mt-3">
                {unit.label}
              </span>
            </motion.div>

            {i < units.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.4 } : {}}
                transition={{ delay: i * 0.15 + 0.3 }}
                className="font-cinzel text-5xl md:text-7xl text-gold leading-none pt-2"
              >
                :
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function CountdownNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value && ref.current) {
      gsap.fromTo(
        ref.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      prev.current = value;
    }
  }, [value]);

  return (
    <span
      ref={ref}
      className="font-cinzel text-6xl md:text-8xl lg:text-9xl text-gold leading-none block relative"
      style={{ textShadow: "0 0 30px rgba(201,168,76,0.3)" }}
    >
      {value}
      <span className="absolute bottom-0 left-0 right-0 h-px bg-gold/20" />
    </span>
  );
}
