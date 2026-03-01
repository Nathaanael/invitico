"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { weddingConfig } from "../config";

export default function EventSection() {
  const { events } = weddingConfig;
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const cardAnim: Variants = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <section id="event" className="relative py-28 px-6 text-center bg-ivory overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-eyebrow !text-gold-dark">Jadwal Acara</div>
        <h2 className="section-heading-dark mb-16">Rangkaian Acara</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {events.map((event) => (
          <motion.div key={event.id} variants={cardAnim}>
            <EventCard event={event} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function EventCard({ event }: { event: (typeof weddingConfig.events)[0] }) {
  return (
    <div className="group relative bg-white border border-gold/30 p-6 md:p-12 text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(201,168,76,0.15)]">
      <div className="absolute top-2 left-2 right-[-8px] bottom-[-8px] border border-gold/15 -z-10 transition-all duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />

      <div className="text-4xl mb-5">{event.icon}</div>

      <div className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-gold-dark mb-4">
        {event.type}
      </div>

      <div className="w-10 h-px bg-gold/50 mb-5" />

      <div className="font-cinzel text-3xl text-text-warm mb-2">{event.time}</div>
      <div className="font-cormorant italic text-text-mid text-lg mb-6">{event.date}</div>

      <div className="font-cormorant text-xl text-text-warm font-semibold mb-1">
        {event.venue}
      </div>
      <div className="font-montserrat text-[11px] tracking-wide text-text-mid/70 leading-6">
        {event.address}
      </div>
    </div>
  );
}