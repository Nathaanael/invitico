"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Components loaded dynamically (client-only, GSAP-heavy)
const Loader = dynamic(() => import("./components/Loader"), { ssr: false });
const CustomCursor = dynamic(() => import("./components/CustomCursor"), { ssr: false });
const ParticleCanvas = dynamic(() => import("./components/ParticleCanvas"), { ssr: false });
const FloatingPetals = dynamic(() => import("./components/FloatingPetals"), { ssr: false });
const MusicButton = dynamic(() => import("./components/MusicButton"), { ssr: false });
const Navbar = dynamic(() => import("./components/Navbar"), { ssr: false });

// Sections
import HeroSection from "./sections/HeroSection";
import OpeningSection from "./sections/OpeningSection";
import CoupleSection from "./sections/CoupleSection";
import EventSection from "./sections/EventSection";
import CountdownSection from "./sections/CountdownSection";
import GallerySection from "./sections/GallerySection";
import LocationSection from "./sections/LocationSection";
import GiftSection from "./sections/GiftSection";
import RSVPSection from "./sections/RSVPSection";
import WishesSection from "./sections/WishesSection";
import Footer from "./components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleLoaderComplete = () => {
    setShowContent(true);
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Cursor */}
      <CustomCursor />

      {/* Loader */}
      {loaded && !showContent && <Loader onComplete={handleLoaderComplete} />}

      {/* Background FX */}
      {showContent && (
        <>
          <ParticleCanvas />
          <FloatingPetals />
          <MusicButton visible={showContent} />
          <Navbar visible={showContent} />
        </>
      )}

      {/* Main Content */}
      <main
        className="relative z-[2]"
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <HeroSection />
        <OpeningSection />
        <CoupleSection />
        <EventSection />
        <CountdownSection />
        <GallerySection />
        <LocationSection />
        <GiftSection />
        <RSVPSection />
        <WishesSection />
        <Footer />
      </main>
    </>
  );
}
