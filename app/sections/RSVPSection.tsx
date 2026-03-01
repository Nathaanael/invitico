"use client";

import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

type FormState = "idle" | "loading" | "success";

interface GuestData {
  name: string;
  phone: string;
  attendance: string;
  guests: string;
  message: string;
  code: string;
}

// Simple QR-like visual generator using canvas
function QRCode({ data, size = 200 }: { data: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const MODULES = 25;
    const CELL = Math.floor(size / MODULES);
    const TOTAL = CELL * MODULES;

    // White background
    ctx.fillStyle = "#F9F5EE";
    ctx.fillRect(0, 0, TOTAL, TOTAL);

    // Generate deterministic pattern from data string
    const hash = (s: string) => {
      let h = 0;
      for (let i = 0; i < s.length; i++) {
        h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
      }
      return h;
    };

    ctx.fillStyle = "#1A1208";

    // Draw cells based on data hash
    for (let row = 0; row < MODULES; row++) {
      for (let col = 0; col < MODULES; col++) {
        const seed = hash(`${data}-${row}-${col}`);
        const on = (seed & 1) === 1;

        // Enforce finder patterns (corners)
        const inTopLeft = row < 8 && col < 8;
        const inTopRight = row < 8 && col >= MODULES - 8;
        const inBottomLeft = row >= MODULES - 8 && col < 8;

        let draw = on;

        if (inTopLeft || inTopRight || inBottomLeft) {
          const r = inTopLeft ? row : inBottomLeft ? row - (MODULES - 8) : row;
          const c = inTopLeft ? col : inTopRight ? col - (MODULES - 8) : col;
          // Outer square
          if (r === 0 || r === 6 || c === 0 || c === 6) draw = true;
          else if (r >= 1 && r <= 5 && c >= 1 && c <= 5) {
            // Inner square
            if (r >= 2 && r <= 4 && c >= 2 && c <= 4) draw = true;
            else draw = false;
          } else draw = false;
        }

        if (draw) {
          ctx.fillRect(col * CELL, row * CELL, CELL - 1, CELL - 1);
        }
      }
    }

    // Gold accent border
    ctx.strokeStyle = "#C9A84C";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, TOTAL - 2, TOTAL - 2);
  }, [data, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="mx-auto"
    />
  );
}

export default function RSVPSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [guestData, setGuestData] = useState<GuestData | null>(null);
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = data.get("name") as string;
    const phone = data.get("phone") as string;
    const attendance = data.get("attendance") as string;
    const guests = data.get("guests") as string;
    const message = data.get("message") as string;

    // Generate unique check-in code
    const code = `WED-${Date.now().toString(36).toUpperCase().slice(-6)}`;

    await new Promise((r) => setTimeout(r, 1500));

    setGuestData({ name, phone, attendance, guests, message, code });
    setFormState("success");
  };

  const qrData = guestData
    ? `WEDDING-CHECKIN|${guestData.code}|${guestData.name}|${guestData.guests}`
    : "";

  return (
    <section id="rsvp" className="py-28 px-6 text-center bg-ivory">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto"
      >
        <div className="section-eyebrow !text-gold-dark">Konfirmasi Kehadiran</div>
        <h2 className="section-heading-dark mb-3">RSVP</h2>
        <p className="font-cormorant italic text-text-mid text-xl mb-12">
          Kehadiran Anda adalah kebahagiaan kami
        </p>

        <AnimatePresence mode="wait">
          {formState === "success" && guestData ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="border border-gold/40 bg-white overflow-hidden"
            >
              {/* Header */}
              <div
                className="px-8 py-6"
                style={{ background: "linear-gradient(135deg, #1A1208, #2A1F0A)" }}
              >
                <div className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-gold mb-1">
                  E-TICKET CHECK-IN
                </div>
                <div className="font-cinzel text-2xl text-ivory">
                  Tiket Kehadiran
                </div>
              </div>

              {/* Dashed separator */}
              <div className="flex items-center px-4">
                <div className="w-5 h-5 rounded-full bg-ivory border border-gold/20 -ml-5 flex-shrink-0" />
                <div className="flex-1 border-t-2 border-dashed border-gold/20 mx-2" />
                <div className="w-5 h-5 rounded-full bg-ivory border border-gold/20 -mr-5 flex-shrink-0" />
              </div>

              {/* Body */}
              <div className="px-8 py-6">
                {/* Guest info */}
                <div className="grid grid-cols-2 gap-4 text-left mb-6">
                  <TicketField label="Nama Tamu" value={guestData.name} />
                  <TicketField label="Jumlah Tamu" value={guestData.guests} />
                  <TicketField label="Kehadiran" value={
                    guestData.attendance.includes("hadir") ? "✓ Hadir" : "✗ Tidak Hadir"
                  } />
                  <TicketField label="Kode Unik" value={guestData.code} highlight />
                </div>

                {/* QR Code */}
                <div className="border border-gold/20 p-4 mb-4 bg-ivory/50">
                  <QRCode data={qrData} size={180} />
                  <p className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-text-mid/50 mt-3">
                    Tunjukkan QR ini saat check-in
                  </p>
                </div>

                {/* Event info */}
                <div className="bg-gold/5 border border-gold/15 px-5 py-4 text-left">
                  <div className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold-dark mb-2">
                    Detail Acara
                  </div>
                  <p className="font-cormorant text-text-warm text-base leading-6">
                    Sabtu, 15 November 2025<br />
                    The Grand Ballroom — Hotel Mulia Senayan<br />
                    Resepsi: 11.00 – 15.00 WIB
                  </p>
                </div>

                {/* Print button */}
                <button
                  onClick={() => window.print()}
                  className="mt-5 w-full py-3 border border-gold/40 font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold-dark hover:bg-gold/5 transition-colors duration-300"
                >
                  🖨 Cetak / Simpan Tiket
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-5 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FormField label="Nama Lengkap">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-3.5 bg-white border border-gold/30 font-cormorant text-text-warm text-lg placeholder:text-text-mid/40 focus:border-gold-dark focus:outline-none transition-colors"
                />
              </FormField>

              <FormField label="Nomor Telepon">
                <input
                  name="phone"
                  type="tel"
                  placeholder="+62 812 xxxx xxxx"
                  className="w-full px-4 py-3.5 bg-white border border-gold/30 font-cormorant text-text-warm text-lg placeholder:text-text-mid/40 focus:border-gold-dark focus:outline-none transition-colors"
                />
              </FormField>

              <FormField label="Kehadiran">
                <select
                  name="attendance"
                  required
                  className="w-full px-4 py-3.5 bg-white border border-gold/30 font-cormorant text-text-warm text-lg focus:border-gold-dark focus:outline-none transition-colors appearance-none"
                >
                  <option value="">-- Pilih --</option>
                  <option value="hadir">Ya, saya akan hadir 🎉</option>
                  <option value="hadir-pasangan">Hadir bersama pasangan 💑</option>
                  <option value="tidak-hadir">Tidak dapat hadir 😔</option>
                </select>
              </FormField>

              <FormField label="Jumlah Tamu">
                <select
                  name="guests"
                  className="w-full px-4 py-3.5 bg-white border border-gold/30 font-cormorant text-text-warm text-lg focus:border-gold-dark focus:outline-none transition-colors appearance-none"
                >
                  <option value="1 orang">1 orang</option>
                  <option value="2 orang">2 orang</option>
                  <option value="3 orang">3 orang</option>
                  <option value="4 orang">4 orang</option>
                </select>
              </FormField>

              <FormField label="Ucapan & Doa">
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tuliskan doa dan ucapan terbaik Anda..."
                  className="w-full px-4 py-3.5 bg-white border border-gold/30 font-cormorant text-text-warm text-lg placeholder:text-text-mid/40 focus:border-gold-dark focus:outline-none transition-colors resize-none"
                />
              </FormField>

              <motion.button
                type="submit"
                disabled={formState === "loading"}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="relative w-full py-5 bg-text-warm border border-gold-dark font-cinzel text-gold tracking-[0.3em] text-sm overflow-hidden group disabled:opacity-70"
              >
                <span className="absolute inset-0 bg-gold-dark translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
                <span className="relative z-10">
                  {formState === "loading" ? "Memproses..." : "Kirim & Dapatkan Tiket"}
                </span>
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block font-montserrat text-[10px] tracking-[0.35em] uppercase text-text-mid/70 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function TicketField({
  label, value, highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-text-mid/50 mb-1">
        {label}
      </div>
      <div className={`font-cinzel text-sm ${highlight ? "text-gold-dark" : "text-text-warm"}`}>
        {value}
      </div>
    </div>
  );
}