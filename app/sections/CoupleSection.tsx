"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingConfig } from "../config";

gsap.registerPlugin(ScrollTrigger);

export default function CoupleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const brideRef = useRef<HTMLDivElement>(null);
  const andRef = useRef<HTMLDivElement>(null);
  const groomRef = useRef<HTMLDivElement>(null);

  const { bride, groom } = weddingConfig;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(brideRef.current, {
        opacity: 0, x: -80, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(andRef.current, {
        opacity: 0, scale: 0.4, duration: 1, ease: "back.out(1.7)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        delay: 0.2,
      });
      gsap.from(groomRef.current, {
        opacity: 0, x: 80, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        delay: 0.1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="couple"
      className="relative py-28 px-6 text-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1A1208 0%, #1E1609 100%)",
      }}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 bg-radial-gold pointer-events-none" />

      <div className="section-eyebrow">Dua Hati Menjadi Satu</div>
      <h2 className="section-heading mb-16">Mempelai</h2>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 max-w-5xl mx-auto items-center">
        {/* Bride */}
        <div ref={brideRef}>
          <PersonCard
            initial={bride.initial}
            name={bride.name}
            fullName={bride.fullName}
            fatherName={bride.fatherName}
            motherName={bride.motherName}
            side="Putri dari"
          />
        </div>

        {/* & */}
        <div
          ref={andRef}
          className="font-cormorant italic text-[100px] md:text-[120px] text-gold leading-none select-none"
          style={{ textShadow: "0 0 60px rgba(201,168,76,0.3)" }}
        >
          &
        </div>

        {/* Groom */}
        <div ref={groomRef}>
          <PersonCard
            initial={groom.initial}
            name={groom.name}
            fullName={groom.fullName}
            fatherName={groom.fatherName}
            motherName={groom.motherName}
            side="Putra dari"
          />
        </div>
      </div>
    </section>
  );
}

function PersonCard({
  initial, name, fullName, fatherName, motherName, side,
}: {
  initial: string;
  name: string;
  fullName: string;
  fatherName: string;
  motherName: string;
  side: string;
}) {
  return (
    <div className="group flex flex-col items-center">
      {/* Photo frame */}
      <div className="ornament-frame mb-8 group-hover:[&::before]:rotate-0">
        <div
          className="relative w-48 h-64 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #2A1F0A, #4A3520)",
          }}
        >
          {/* Placeholder initial */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-cinzel text-7xl text-gold/20">{initial}</span>
          </div>
          {/* Shimmer overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                "linear-gradient(135deg, transparent 40%, rgba(201,168,76,0.08) 50%, transparent 60%)",
            }}
          />
        </div>
      </div>

      <h3 className="font-cinzel text-3xl text-gold mb-1">{name}</h3>
      <p className="font-cormorant italic text-gold-light text-lg mb-4">{fullName}</p>

      <div className="w-8 h-px bg-gold/40 mb-4" />

      <p className="font-montserrat text-[11px] tracking-wider text-ivory/40 leading-7 uppercase">
        {side}<br />
        {fatherName}<br />
        &amp; {motherName}
      </p>
    </div>
  );
}
