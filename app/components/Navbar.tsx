"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { weddingConfig } from "../config";

const navLinks = [
  { label: "Pasangan", href: "#couple" },
  { label: "Acara", href: "#event" },
  { label: "Hitung Mundur", href: "#countdown" },
  { label: "Lokasi", href: "#location" },
  { label: "RSVP", href: "#rsvp" },
];

interface Props {
  visible: boolean;
}

export default function Navbar({ visible }: Props) {
  const navRef = useRef<HTMLElement>(null);
  const [lastScroll, setLastScroll] = useState(0);
  const [hidden, setHidden] = useState(false);
  const { bride, groom } = weddingConfig;

  useEffect(() => {
    if (visible) {
      gsap.to(navRef.current, { opacity: 1, duration: 0.8 });
    }
  }, [visible]);

  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY;
      if (cur > lastScroll + 10 && cur > 200) {
        setHidden(true);
        gsap.to(navRef.current, { yPercent: -100, duration: 0.4 });
      } else if (cur < lastScroll - 10) {
        setHidden(false);
        gsap.to(navRef.current, { yPercent: 0, duration: 0.4 });
      }
      setLastScroll(cur);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-10 py-5 flex items-center justify-between opacity-0"
      style={{
        background: "linear-gradient(to bottom, rgba(26,18,8,0.92), transparent)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="font-cinzel text-lg text-gold tracking-[0.3em]">
        {bride.initial} ✦ {groom.initial}
      </div>

      <div className="hidden md:flex gap-8">
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold-light hover:text-gold transition-colors duration-300"
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Mobile: hamburger not needed for invitation page */}
    </nav>
  );
}
