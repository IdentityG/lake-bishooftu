'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function OurStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.story-reveal', {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.story-wrapper', start: 'top 70%' },
      });
      gsap.from('.image-reveal', {
        scale: 1.3,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.image-reveal', start: 'top 80%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#F9FAFB] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h60v60H0V0z%22 fill=%22none%22%3E%3C/path%3E%3Cpath d=%22M54 6v48H6V6h48z%22 stroke=%22%231E3A8A%22 stroke-width=%221%22 fill=%22none%22 fill-rule=%22evenodd%22/%3E%3C/svg%3E')]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Block */}
          <div className="story-wrapper space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#D4A017]" />
              <span className="text-sm font-medium text-[#111827]">Our Story</span>
            </motion.div>

            <h2 className="story-reveal font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] leading-tight">
              Born from the&nbsp;
              <span className="relative">
                lake’s soul
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4A017] to-[#1E3A8A]" />
              </span>
            </h2>

            <p className="story-reveal text-lg md:text-xl text-[#6B7280] leading-relaxed">
              Lake Bishoftu began as a vision: to craft a sanctuary where Ethiopia’s ancient
              traditions and modern luxury converge. We carved a space into the crater’s edge,
              allowing nature to remain the protagonist while architecture humbly frames her beauty.
            </p>

            <p className="story-reveal text-lg md:text-xl text-[#6B7280] leading-relaxed">
              Every stone tells a story—hand-sourced from the Rift Valley,
              every beam whispers of sustainable forests, and every sunset
              is a reminder that time here is measured in moments, not minutes.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <MapPin className="w-4 h-4 text-[#1E3A8A]" />
                <span>Lake Bishoftu, Ethiopia</span>
              </div>
              <div className="w-px h-4 bg-[#D4A017]" />
              <span className="text-sm text-[#6B7280]">Est. 2024</span>
            </motion.div>
          </div>

          {/* Image Block */}
          <div className="image-reveal relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#D4A017] to-[#166534]" />
              <img
                src="/images/bg.jpg"
                alt="Resort at sunset"
                className="w-full h-full object-cover mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="text-center">
                <p className="font-playfair text-3xl font-bold text-[#111827]">50</p>
                <p className="text-sm text-[#6B7280]">Villas & Suites</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="text-center">
                <p className="font-playfair text-3xl font-bold text-[#111827]">1</p>
                <p className="text-sm text-[#6B7280]">Crater Lake</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Timeline Strip */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 relative"
        >
          <div className="flex justify-center items-center gap-8 md:gap-16">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-[#1E3A8A]" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-[#6B7280] whitespace-nowrap">Vision</span>
            </div>
            <div className="h-px w-16 md:w-32 bg-gradient-to-r from-[#1E3A8A] to-[#D4A017]" />
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-[#D4A017]" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-[#6B7280] whitespace-nowrap">Craft</span>
            </div>
            <div className="h-px w-16 md:w-32 bg-gradient-to-r from-[#D4A017] to-[#166534]" />
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-[#166534]" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-[#6B7280] whitespace-nowrap">Experience</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}