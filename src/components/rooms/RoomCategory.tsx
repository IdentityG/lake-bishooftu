'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight, Users, BedDouble, Waves } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface RoomCategory {
  name: string;
  description: string;
  price: string;
  image: string;
  features: { icon: React.ReactNode; text: string }[];
  color: string;
}

const roomCategories: RoomCategory[] = [
  {
    name: 'Lakeview Suite',
    description: 'Panoramic views of Lake Bishoftu with private balcony and premium amenities.',
    price: '$450',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
    features: [
      { icon: <Users className="w-4 h-4" />, text: 'Up to 4 guests' },
      { icon: <BedDouble className="w-4 h-4" />, text: 'King size bed' },
      { icon: <Waves className="w-4 h-4" />, text: 'Lake view' },
    ],
    color: '#1E3A8A',
  },
  {
    name: 'Garden Villa',
    description: 'Secluded villa surrounded by lush gardens with outdoor jacuzzi and terrace.',
    price: '$650',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    features: [
      { icon: <Users className="w-4 h-4" />, text: 'Up to 6 guests' },
      { icon: <BedDouble className="w-4 h-4" />, text: 'Two bedrooms' },
      { icon: <Waves className="w-4 h-4" />, text: 'Garden view' },
    ],
    color: '#166534',
  },
  {
    name: 'Royal Penthouse',
    description: 'Ultimate luxury with rooftop terrace, private pool, and dedicated butler service.',
    price: '$1,200',
    image: '/images/r6.webp',
    features: [
      { icon: <Users className="w-4 h-4" />, text: 'Up to 8 guests' },
      { icon: <BedDouble className="w-4 h-4" />, text: 'Three bedrooms' },
      { icon: <Waves className="w-4 h-4" />, text: 'Lake & garden view' },
    ],
    color: '#D4A017',
  },
];

export default function RoomCategories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const image = card.querySelector('.room-image');
      const content = card.querySelector('.room-content');
      const features = card.querySelectorAll('.feature-item');

      gsap.fromTo(
        image,
        { scale: 1.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        content,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        features,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-[#F9FAFB] to-[#E5E7EB] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[#111827] mb-6">
            Our Room Categories
          </h2>
          <p className="text-lg md:text-xl text-[#6B7280] max-w-2xl mx-auto">
            Discover unparalleled comfort and elegance in our carefully curated accommodations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {roomCategories.map((room, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null) => {
                cardsRef.current[index] = el;
              }}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative h-80 lg:h-96 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="room-image object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div
                  className="absolute top-6 right-6 px-4 py-2 rounded-full text-white font-medium text-sm"
                  style={{ backgroundColor: room.color }}
                >
                  {room.price}/night
                </div>
              </div>

              <div className="room-content p-8">
                <h3 className="font-playfair text-2xl lg:text-3xl text-[#111827] mb-3">
                  {room.name}
                </h3>
                <p className="text-[#6B7280] mb-6 leading-relaxed">
                  {room.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  {room.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="feature-item flex items-center gap-2 text-sm text-[#6B7280]"
                    >
                      <span className="text-[#D4A017]">{feature.icon}</span>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group/btn relative inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A8A] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#1E3A8A]/90"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </motion.button>
              </div>

              <div
                className="absolute inset-x-0 bottom-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: room.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}