'use client';

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DiningOption {
  id: number;
  title: string;
  description: string;
  hours: string;
  location: string;
  image: string;
  accent: string;
}

const diningOptions: DiningOption[] = [
  {
    id: 1,
    title: 'Abyssinian Pavilion',
    description: 'Contemporary Ethiopian cuisine with panoramic lake views.',
    hours: '7:00 AM - 10:00 PM',
    location: 'Main Building',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070',
    accent: 'var(--ethiopian-gold)',
  },
  {
    id: 2,
    title: 'Azure Terrace',
    description: 'Sunset cocktails and Mediterranean plates by the infinity pool.',
    hours: '11:00 AM - 11:00 PM',
    location: 'Poolside',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574',
    accent: 'var(--lake-blue)',
  },
  {
    id: 3,
    title: 'Green Haven',
    description: 'Farm-to-table vegan and vegetarian specialties.',
    hours: '8:00 AM - 9:00 PM',
    location: 'Garden Wing',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2574',
    accent: 'var(--nature-green)',
  },
];

export default function DiningOptionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      headerRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    ).fromTo(
      cardsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
      },
      '-=0.6'
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-[var(--warm-white)]">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="font-[Playfair_Display] text-4xl md:text-6xl text-[var(--dark-gray)] mb-6">
            Exquisite Dining Venues
          </h2>
          <p className="font-[Roboto] text-lg text-[var(--soft-gray)] max-w-2xl mx-auto">
            Three unique concepts, one unforgettable culinary journey crafted by award-winning chefs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diningOptions.map((option, index) => (
            <motion.div
              key={option.id}
              ref={(el: HTMLDivElement | null) => {
                cardsRef.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative h-[28rem]">
                <Image
                  src={option.image}
                  alt={option.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 0%, ${option.accent}99 80%)`,
                  }}
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="font-[Playfair_Display] text-3xl mb-2">
                  {option.title}
                </h3>
                <p className="font-[Roboto] text-sm mb-4 opacity-90">
                  {option.description}
                </p>

                <div className="flex items-center gap-4 text-xs opacity-80">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{option.hours}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{option.location}</span>
                  </div>
                </div>

                <motion.button
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <span className="font-[Roboto] text-sm">Explore Menu</span>
                  <ArrowRight size={16} />
                </motion.button>
              </div>

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, transparent 0%, ${option.accent}66 100%)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}