'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SpaOverviewHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
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
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80"
          alt="Lake Bishoftu Spa"
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
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            className="origin-left"
          >
            <span className="mb-4 inline-block text-sm uppercase tracking-[0.2em] text-[--ethiopian-gold]">
              Luxurious Spa Experience
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="font-playfair text-4xl font-bold tracking-tight text-[--warm-white] sm:text-5xl md:text-7xl lg:text-8xl"
          >
            Rejuvenate
            <br />
            <span className="text-[--ethiopian-gold]">Your Soul</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-[--warm-white]/80 md:text-xl"
          >
            Immerse yourself in the tranquility of Lake Bishoftu. Our award-winning spa combines traditional Ethiopian wellness practices with modern luxury treatments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <button className="group relative overflow-hidden rounded-full bg-[--ethiopian-gold] px-8 py-4 font-medium text-[--dark-gray] transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[--ethiopian-gold]/30">
              <span className="relative z-10">Book Your Treatment</span>
              <motion.div
                className="absolute inset-0 bg-[--warm-white]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>

            <button className="group rounded-full border border-[--warm-white]/30 px-8 py-4 text-[--warm-white] transition-all duration-500 hover:border-[--ethiopian-gold]/50 hover:text-[--ethiopian-gold]">
              Explore Treatments
            </button>
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
            <ChevronDown className="h-8 w-8 text-[--warm-white]/60" />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[--warm-white] to-transparent" />
    </section>
  );
}