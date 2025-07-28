'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bed, Coffee, Wind, Waves, Sparkles, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Bed,
    title: '50 Bespoke Villas & Suites',
    description: 'Each space frames the lake through floor-to-ceiling glass and hand-carved Ethiopian stone.',
    image: '/images/r1.webp',
  },
  {
    icon: Coffee,
    title: 'Farm-to-Fork Dining',
    description: 'Three restaurants sourcing produce from our organic gardens and local cooperatives.',
    image: '/images/1.avif',
  },
  {
    icon: Wind,
    title: 'Holistic Wellness',
    description: 'Overwater spa pavilions, open-air yoga decks, and sunrise meditation on the pier.',
    image: '/images/3.jpg',
  },
  {
    icon: Waves,
    title: 'Lake Adventures',
    description: 'Private dhow cruises, crater kayaking, and bird-watching with our resident naturalist.',
    image: '/images/4.webp',
  },
];

export default function ResortFeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.features-grid', start: 'top 80%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#F9FAFB] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%231E3A8A%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
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
            Discover the Extraordinary
          </h2>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            Every moment at Lake Bishoftu is designed to awaken wonder, calm the soul, and celebrate the extraordinary.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              className="feature-card relative group"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Image */}
                <div className="relative aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#D4A017] to-[#166534]" />
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover mix-blend-overlay transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F9FAFB] text-[#1E3A8A] mb-4 group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-[#111827] leading-tight">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4A017]/50 rounded-3xl transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-center">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-4xl md:text-5xl font-playfair font-bold text-[#1E3A8A]"
              >
                50+
              </motion.div>
              <p className="text-sm text-[#6B7280]">Luxury Villas</p>
            </div>
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-4xl md:text-5xl font-playfair font-bold text-[#D4A017]"
              >
                5
              </motion.div>
              <p className="text-sm text-[#6B7280]">Star Amenities</p>
            </div>
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-4xl md:text-5xl font-playfair font-bold text-[#166534]"
              >
                1
              </motion.div>
              <p className="text-sm text-[#6B7280]">Crater Lake</p>
            </div>
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
            <Star className="w-5 h-5" />
            <span>Plan Your Stay</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}