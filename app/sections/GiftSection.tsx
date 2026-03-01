"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { weddingConfig } from "../config";

const NOMINAL_PRESETS = ["50.000", "100.000", "200.000", "500.000", "1.000.000"];

interface GiftForm {
  nominal: string;
  customNominal: string;
  wish: string;
  sender: string;
}

export default function GiftSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeBank, setActiveBank] = useState<string>(weddingConfig.bankAccounts[0]?.bank ?? "");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<GiftForm>({
    nominal: "",
    customNominal: "",
    wish: "",
    sender: "",
  });
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const { bankAccounts } = weddingConfig;

  const copy = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopied(bank);
    setTimeout(() => setCopied(null), 2000);
  };

  const displayNominal = form.nominal === "custom" ? form.customNominal : form.nominal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative py-28 px-6 text-center bg-ivory overflow-hidden">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-eyebrow !text-gold-dark">Amplop Digital</div>
        <h2 className="section-heading-dark mb-4">Hadiah Pernikahan</h2>
        <p className="font-cormorant italic text-text-mid text-xl mb-14 max-w-lg mx-auto">
          Doa dan kehadiran Anda sudah merupakan hadiah terbaik bagi kami. Namun jika ingin memberikan hadiah, Anda dapat mentransfer ke rekening berikut:
        </p>
      </motion.div>

      <div className="max-w-xl mx-auto text-left">
        <AnimatePresence mode="wait">
          {submitted ? (
            /* ── Success state ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-gold/40 bg-white p-12 text-center"
            >
              <div className="text-5xl mb-5">🎁</div>
              <h3 className="font-cinzel text-2xl text-text-warm mb-3">Terima Kasih!</h3>
              <p className="font-cormorant italic text-text-mid text-lg mb-4">
                Ucapan dan informasi hadiah Anda telah kami terima.
              </p>
              {displayNominal && (
                <div className="inline-block border border-gold/30 px-6 py-2 font-cinzel text-gold-dark text-sm tracking-widest">
                  Rp {displayNominal} → {activeBank}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* ── Bank selector ── */}
              <div>
                <label className="block font-montserrat text-[10px] tracking-[0.35em] uppercase text-text-mid/70 mb-3">
                  Pilih Rekening Tujuan
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {bankAccounts.map((acc) => (
                    <div
                      key={acc.bank}
                      onClick={() => setActiveBank(acc.bank)}
                      role="radio"
                      aria-checked={activeBank === acc.bank}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setActiveBank(acc.bank)}
                      className={`relative p-5 border text-left transition-all duration-300 cursor-pointer select-none ${
                        activeBank === acc.bank
                          ? "border-gold bg-white shadow-[0_0_0_1px_#C9A84C]"
                          : "border-gold/25 bg-white hover:border-gold/50"
                      }`}
                    >
                      {/* Active indicator */}
                      {activeBank === acc.bank && (
                        <motion.div
                          layoutId="bankIndicator"
                          className="absolute top-3 right-3 w-2 h-2 bg-gold rounded-full"
                        />
                      )}
                      <div className="font-cinzel text-xl text-gold mb-1">{acc.bank}</div>
                      <div className="font-cinzel text-sm text-text-warm tracking-widest mb-1">
                        {acc.accountNumber}
                      </div>
                      <div className="font-cormorant italic text-text-mid text-sm">
                        {acc.accountName}
                      </div>
                      {/* Copy */}
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); copy(acc.accountNumber, acc.bank); }}
                        className="mt-3 font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold-dark border border-gold/30 px-3 py-1.5 hover:bg-gold/5 transition-colors"
                      >
                        <AnimatePresence mode="wait">
                          {copied === acc.bank ? (
                            <motion.span key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-green-700">
                              ✓ Tersalin
                            </motion.span>
                          ) : (
                            <motion.span key="n" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              Salin Nomor
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Nama ── */}
              <FormField label="Nama Anda">
                <input
                  type="text"
                  required
                  value={form.sender}
                  onChange={(e) => setForm({ ...form, sender: e.target.value })}
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-3.5 bg-white border border-gold/30 font-cormorant text-text-warm text-lg placeholder:text-text-mid/40 focus:border-gold-dark focus:outline-none transition-colors"
                />
              </FormField>

              {/* ── Nominal presets ── */}
              <FormField label="Nominal (Rp)">
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {NOMINAL_PRESETS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setForm({ ...form, nominal: n, customNominal: "" })}
                      className={`py-3 border font-montserrat text-[10px] tracking-wider transition-all duration-200 ${
                        form.nominal === n
                          ? "border-gold bg-gold/10 text-gold-dark"
                          : "border-gold/25 bg-white text-text-mid hover:border-gold/50"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, nominal: "custom" })}
                    className={`py-3 border font-montserrat text-[10px] tracking-wider transition-all duration-200 ${
                      form.nominal === "custom"
                        ? "border-gold bg-gold/10 text-gold-dark"
                        : "border-gold/25 bg-white text-text-mid hover:border-gold/50"
                    }`}
                  >
                    Lainnya
                  </button>
                </div>

                {/* Custom input */}
                <AnimatePresence>
                  {form.nominal === "custom" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-cormorant text-text-mid text-lg pointer-events-none">
                          Rp
                        </span>
                        <input
                          type="text"
                          value={form.customNominal}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              customNominal: e.target.value
                                .replace(/\D/g, "")
                                .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                            })
                          }
                          placeholder="0"
                          className="w-full pl-12 pr-4 py-3.5 bg-white border border-gold/30 font-cormorant text-text-warm text-lg placeholder:text-text-mid/40 focus:border-gold-dark focus:outline-none transition-colors"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FormField>

              {/* ── Ucapan ── */}
              <FormField label="Ucapan & Doa">
                <textarea
                  rows={4}
                  value={form.wish}
                  onChange={(e) => setForm({ ...form, wish: e.target.value })}
                  placeholder="Tuliskan ucapan dan doa terbaik Anda..."
                  className="w-full px-4 py-3.5 bg-white border border-gold/30 font-cormorant text-text-warm text-lg placeholder:text-text-mid/40 focus:border-gold-dark focus:outline-none transition-colors resize-none"
                />
              </FormField>

              {/* ── Submit ── */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="relative w-full py-5 bg-text-warm border border-gold-dark font-cinzel text-gold tracking-[0.3em] text-sm overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gold-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">Kirim Hadiah &amp; Ucapan</span>
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-montserrat text-[10px] tracking-[0.35em] uppercase text-text-mid/70 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}