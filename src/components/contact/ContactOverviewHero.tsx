'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, ArrowRight, Clock } from 'lucide-react';

export default function ContactOverviewHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 1, 0]);

  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-[--warm-white]">
      <motion.div
        style={{ scale, y }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[--lake-blue]/20 via-transparent to-[--ethiopian-gold]/20" />
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt="Lake Bishoftu Contact"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[--dark-gray]/60 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[--lake-blue]/5 backdrop-blur-[100px] mix-blend-overlay" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="flex w-full max-w-7xl flex-col gap-12 lg:flex-row lg:items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {/* Left Text Block */}
          <div className="flex-1 text-center lg:text-left">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
              className="origin-left"
            >
              <span className="mb-4 inline-block text-sm uppercase tracking-[0.2em] text-[--ethiopian-gold]">
                Contact Us
              </span>
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="font-playfair text-4xl font-bold tracking-tight text-[--warm-white] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Let’s Plan
              <br />
              <span className="text-[--ethiopian-gold]">Your Stay</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-[--warm-white]/80 md:text-xl"
            >
              Reach out for reservations, bespoke itineraries, or simply to feel the warmth of Ethiopian hospitality.
            </motion.p>
          </div>

          {/* Right Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex-1"
          >
            <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-xl sm:p-10">
              <h2 className="font-playfair text-2xl font-bold text-white">
                Get In Touch
              </h2>

              <div className="mt-6 space-y-5">
                <a
                  href="tel:+251112345678"
                  className="group flex items-center gap-4 rounded-2xl bg-white/10 p-4 transition-all hover:bg-white/20"
                >
                  <Phone className="h-5 w-5 text-[--ethiopian-gold]" />
                  <div>
                    <span className="block text-sm text-[--warm-white]/60">Call us</span>
                    <span className="text-white">+251 11 234 5678</span>
                  </div>
                </a>

                <a
                  href="mailto:stay@lakebishoftu.com"
                  className="group flex items-center gap-4 rounded-2xl bg-white/10 p-4 transition-all hover:bg-white/20"
                >
                  <Mail className="h-5 w-5 text-[--ethiopian-gold]" />
                  <div>
                    <span className="block text-sm text-[--warm-white]/60">Email us</span>
                    <span className="text-white">stay@lakebishoftu.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                  <MapPin className="h-5 w-5 text-[--ethiopian-gold]" />
                  <div>
                    <span className="block text-sm text-[--warm-white]/60">Visit us</span>
                    <span className="text-white">Lake Bishoftu, Ethiopia</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button className="group relative w-full overflow-hidden rounded-full bg-[--ethiopian-gold] py-4 text-center text-sm font-medium text-[--dark-gray] transition-all duration-500 hover:scale-105">
                  <span className="relative z-10">Book Your Stay</span>
                  <motion.div
                    className="absolute inset-0 bg-[--warm-white]"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[--warm-white]/60">
                <Clock className="h-3 w-3" />
                <span>Response within 2 hours</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="cursor-pointer"
          >
            <ArrowRight className="h-6 w-6 rotate-90 text-[--warm-white]/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}