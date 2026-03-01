import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8D5A3",
          dark: "#8B6914",
          muted: "rgba(201,168,76,0.15)",
        },
        ivory: {
          DEFAULT: "#F9F5EE",
          dark: "#EDE6D6",
        },
        deep: {
          DEFAULT: "#1A1208",
          mid: "#2A1F0A",
          light: "#3D2B10",
        },
        text: {
          warm: "#2C1F0A",
          mid: "#6B5328",
        },
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      animation: {
        "scroll-pulse": "scrollPulse 2s ease-in-out infinite",
        "pin-bounce": "pinBounce 2s ease-in-out infinite",
        "gallery-scroll": "galleryScroll 35s linear infinite",
        "fade-in": "fadeIn 0.8s ease forwards",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        scrollPulse: {
          "0%, 100%": { opacity: "1", transform: "scaleY(1)" },
          "50%": { opacity: "0.3", transform: "scaleY(0.6)" },
        },
        pinBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        galleryScroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
      },
      backgroundImage: {
        "grid-gold": "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(201,168,76,0.04) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(201,168,76,0.04) 80px)",
        "radial-gold": "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
