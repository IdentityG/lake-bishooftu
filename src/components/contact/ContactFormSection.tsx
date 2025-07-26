'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, User, Mail, MessageSquare, Phone, Send } from 'lucide-react';

export default function ContactFormSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[--warm-white] py-24 sm:py-32">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-[--ethiopian-gold]/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-[--lake-blue]/5 blur-3xl" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-playfair text-4xl font-bold tracking-tight text-[--dark-gray] sm:text-5xl lg:text-6xl">
            Get in Touch
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[--soft-gray]">
            Share your preferences and let our concierge craft a bespoke experience for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <form className="grid gap-6 rounded-3xl border border-[--soft-gray]/20 bg-white p-8 shadow-lg sm:p-10 lg:p-12">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="group relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[--soft-gray] transition-colors group-focus-within:text-[--lake-blue]" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="w-full rounded-2xl border border-[--soft-gray]/30 bg-[--warm-white] py-4 pl-12 pr-4 text-sm text-[--dark-gray] placeholder-[--soft-gray] transition-all focus:border-[--lake-blue] focus:outline-none focus:ring-2 focus:ring-[--lake-blue]/20"
                />
              </div>

              <div className="group relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[--soft-gray] transition-colors group-focus-within:text-[--lake-blue]" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  className="w-full rounded-2xl border border-[--soft-gray]/30 bg-[--warm-white] py-4 pl-12 pr-4 text-sm text-[--dark-gray] placeholder-[--soft-gray] transition-all focus:border-[--lake-blue] focus:outline-none focus:ring-2 focus:ring-[--lake-blue]/20"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="group relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[--soft-gray] transition-colors group-focus-within:text-[--ethiopian-gold]" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full rounded-2xl border border-[--soft-gray]/30 bg-[--warm-white] py-4 pl-12 pr-4 text-sm text-[--dark-gray] placeholder-[--soft-gray] transition-all focus:border-[--ethiopian-gold] focus:outline-none focus:ring-2 focus:ring-[--ethiopian-gold]/20"
                />
              </div>

              <div className="group relative">
                <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[--soft-gray] transition-colors group-focus-within:text-[--ethiopian-gold]" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full rounded-2xl border border-[--soft-gray]/30 bg-[--warm-white] py-4 pl-12 pr-4 text-sm text-[--dark-gray] placeholder-[--soft-gray] transition-all focus:border-[--ethiopian-gold] focus:outline-none focus:ring-2 focus:ring-[--ethiopian-gold]/20"
                />
              </div>
            </div>

            <div className="group relative">
              <MessageSquare className="pointer-events-none absolute left-4 top-5 h-5 w-5 text-[--soft-gray] transition-colors group-focus-within:text-[--nature-green]" />
              <textarea
                name="message"
                rows={5}
                placeholder="How can we make your stay unforgettable?"
                required
                className="w-full resize-none rounded-2xl border border-[--soft-gray]/30 bg-[--warm-white] py-4 pl-12 pr-4 text-sm text-[--dark-gray] placeholder-[--soft-gray] transition-all focus:border-[--nature-green] focus:outline-none focus:ring-2 focus:ring-[--nature-green]/20"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-full bg-[--lake-blue] px-8 py-4 text-sm font-medium text-white transition-all duration-500 hover:bg-[--ethiopian-gold]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Send Message
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 bg-[--ethiopian-gold]"
                initial={{ y: '100%' }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}