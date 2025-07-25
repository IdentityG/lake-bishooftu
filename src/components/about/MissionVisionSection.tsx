'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MissionVisionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mission-card', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.mission-wrapper', start: 'top 80%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#F9FAFB] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%221%22 fill=%22%231E3A8A%22 /%3E%3C/svg%3E')]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-5xl md:text-7xl font-bold text-[#111827] mb-4">
            Purpose & Perspective
          </h2>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            Guiding every decision, every detail, every dawn over the lake.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mission-wrapper grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission */}
          <motion.div
            className="mission-card relative bg-white rounded-3xl shadow-xl p-8 lg:p-12"
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1E3A8A]/5 to-transparent" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1E3A8A] text-white mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="font-playfair text-3xl font-bold text-[#111827] mb-4">Our Mission</h3>
              <p className="text-lg text-[#6B7280] leading-relaxed">
                To craft transformative experiences that honor Ethiopian heritage, celebrate
                natural beauty, and set a new benchmark for sustainable luxury hospitality.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="mission-card relative bg-white rounded-3xl shadow-xl p-8 lg:p-12"
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D4A017]/5 to-transparent" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4A017] text-white mb-6">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="font-playfair text-3xl font-bold text-[#111827] mb-4">Our Vision</h3>
              <p className="text-lg text-[#6B7280] leading-relaxed">
                To become Africa’s most iconic eco-luxury retreat—where every sunrise
                inspires, every meal tells a story, and every guest leaves as a steward of the lake.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {['Sustainability', 'Culture', 'Innovation', 'Hospitality'].map((pillar, idx) => (
              <motion.div
                key={pillar}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
                className="relative"
              >
                <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-[#1E3A8A] via-[#D4A017] to-[#166534]" />
                <p className="font-playfair text-xl font-bold text-[#111827]">{pillar}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-8 py-4 rounded-full font-medium shadow-xl hover:bg-[#152A6F] transition-colors"
          >
            <span>Join Our Journey</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}