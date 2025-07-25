'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroAboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-headline', {
        y: 120,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.hero-headline', start: 'top 90%' },
      });
      gsap.from('.hero-subtext', {
        y: 80,
        opacity: 0,
        duration: 1.4,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.hero-subtext', start: 'top 90%' },
      });
      gsap.from('.hero-cta', {
        y: 60,
        opacity: 0,
        duration: 1.4,
        delay: 0.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.hero-cta', start: 'top 90%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-b from-[#1E3A8A] to-[#166534] overflow-hidden">
      {/* Background Layers */}
      <motion.div
        style={{ y: parallaxY, scale }}
        className="absolute inset-0 z-0"
      >
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] min-w-[400px] min-h-[400px] rounded-full bg-gradient-to-br from-[#1E3A8A]/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] min-w-[300px] min-h-[300px] rounded-full bg-gradient-to-tl from-[#D4A017]/20 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-[#166534]/10 to-transparent blur-2xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          style={{ opacity }}
          className="absolute top-6 left-6 flex items-center gap-2 text-xs text-[#F9FAFB]/80"
        >
          <MapPin className="w-3 h-3" />
          <span>Lake Bishoftu, Ethiopia</span>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="absolute top-6 right-6 flex items-center gap-2 text-xs text-[#F9FAFB]/80"
        >
          <Sparkles className="w-3 h-3" />
          <span>5-Star Luxury Resort</span>
        </motion.div>

        <motion.h1
          className="hero-headline font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-[#F9FAFB] leading-tight max-w-5xl"
        >
          Where the&nbsp;
          <span className="relative">
            lake whispers
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#D4A017] to-[#1E3A8A]"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </span>
          <br />
          and luxury&nbsp;
          <span className="relative">
            finds its home
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#166534] to-[#D4A017]"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1, delay: 1 }}
            />
          </span>
        </motion.h1>

        <motion.p
          className="hero-subtext mt-6 max-w-3xl text-lg md:text-xl text-[#F9FAFB]/90 leading-relaxed"
        >
          Nestled on the shores of Ethiopia’s most serene crater lake, Lake Bishoftu Resort blends
          timeless Ethiopian warmth with contemporary sophistication—where every sunrise paints the water
          in gold and every moment becomes a memory.
        </motion.p>

        <motion.div
          className="hero-cta mt-10 flex flex-col sm:flex-row items-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-[#1E3A8A] text-white px-8 py-4 rounded-full font-medium shadow-xl hover:bg-[#152A6F] transition-colors"
          >
            <span>Explore Our World</span>
            <ArrowDown className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 border border-[#D4A017] text-[#D4A017] px-8 py-4 rounded-full font-medium hover:bg-[#D4A017] hover:text-white transition-colors"
          >
            <span>Take a Virtual Tour</span>
            <Sparkles className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Floating Indicators */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#166534]" />
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 text-[#6B7280]" />
      </motion.div>
    </section>
  );
}