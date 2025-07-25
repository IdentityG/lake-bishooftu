'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Sun, Moon, Wind, Waves } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ambianceCards = [
  {
    time: 'Dawn',
    icon: Sun,
    title: 'Golden Sunrise',
    description: 'Watch the lake awaken with soft amber light as morning mist dances over the water.',
    image: '/images/dawn.jpg',
  },
  {
    time: 'Day',
    icon: Wind,
    title: 'Serene Daylight',
    description: 'Bask in gentle breezes, the scent of fresh coffee, and panoramic lake views.',
    image: '/images/day.jpg',
  },
  {
    time: 'Dusk',
    icon: Moon,
    title: 'Crimson Sunset',
    description: 'Fire-lit terraces, scarlet skies, and the rhythmic sound of lapping waves.',
    image: '/images/dusk.jpg',
  },
  {
    time: 'Night',
    icon: Waves,
    title: 'Star-lit Tranquility',
    description: 'Lantern-lit pathways, whispering palms, and a sky dusted with infinite stars.',
    image: '/images/night.jpg',
  },
];

export default function AmbianceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ambiance-card', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ambiance-grid', start: 'top 80%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#F9FAFB] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Parallax Background */}
      <motion.div ref={parallaxRef} style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/5 via-transparent to-[#D4A017]/5" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-5xl md:text-7xl font-bold text-[#111827] mb-4">
            Ambiance & Atmosphere
          </h2>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in a sanctuary where Ethiopian heritage meets contemporary luxury, 
            framed by the timeless beauty of Lake Bishoftu.
          </p>
        </motion.div>

        {/* Horizontal Scroll Cards */}
        <div className="ambiance-grid grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {ambianceCards.map((card, index) => (
            <motion.div
              key={card.time}
              className="ambiance-card relative group cursor-pointer"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl h-[480px]">
                {/* Image Layer */}
                <div className="absolute inset-0">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${card.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                {/* Content Layer */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <motion.div
                    animate={{ opacity: activeIndex === index ? 1 : 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 right-4"
                  >
                    <Sparkles className="w-5 h-5 text-white/60" />
                  </motion.div>

                  <div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm"
                    >
                      <card.icon className="w-4 h-4" />
                      <span>{card.time}</span>
                    </motion.div>
                  </div>

                  <div>
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.1 }}
                      className="font-playfair text-2xl font-bold text-white mb-2"
                    >
                      {card.title}
                    </motion.h3>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="text-white/80 text-sm leading-relaxed"
                    >
                      {card.description}
                    </motion.p>
                  </div>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#D4A017]/90 via-[#D4A017]/50 to-transparent"
                  animate={{ opacity: activeIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Floating Glow */}
              <motion.div
                animate={{
                  scale: activeIndex === index ? 1 : 0,
                  opacity: activeIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute -inset-2 bg-[#D4A017]/20 blur-2xl rounded-2xl -z-10"
              />
            </motion.div>
          ))}
        </div>

        {/* Interactive Ambiance Selector */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white rounded-full px-8 py-4 shadow-xl">
            <span className="text-sm text-[#6B7280]">Experience:</span>
            <div className="flex gap-2">
              {ambianceCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: activeIndex === index ? '#D4A017' : '#E5E7EB',
                    transform: activeIndex === index ? 'scale(1.5)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-8 py-4 rounded-full font-medium shadow-lg hover:bg-[#152A6F] transition-colors"
          >
            <span>Reserve Your Experience</span>
            <Waves className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}