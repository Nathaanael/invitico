import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan",
  description: "Kami mengundang Anda untuk hadir dalam momen bahagia kami",
  openGraph: {
    title: "Undangan Pernikahan",
    description: "Kami mengundang Anda untuk hadir dalam momen bahagia kami",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body suppressHydrationWarning
        className={`${cinzel.variable} ${cormorant.variable} ${montserrat.variable} bg-deep text-ivory overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}