'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  {
    name: 'Lakefront Suite',
    price: 450,
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    desc: 'Panoramic lake views with private balcony and premium amenities.',
    perks: ['King Bed', 'Lake View', 'Spa Bath'],
  },
  {
    name: 'Volcano Vista Villa',
    price: 580,
    img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1920&q=80',
    desc: 'Elevated villa overlooking volcanic hills and Lake Bishoftu.',
    perks: ['Private Pool', 'Sunset Deck', 'Butler Service'],
  },
  {
    name: 'Ethiopian Heritage Cabin',
    price: 320,
    img: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1920&q=80',
    desc: 'Cozy cabin inspired by traditional Ethiopian architecture.',
    perks: ['Fireplace', 'Garden View', 'Cultural Touches'],
  },
];

const FeaturedRooms = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.room-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.room-card', start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F9FAFB] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-[#1E3A8A]">
            Featured Rooms & Villas
          </h2>
          <p className="mt-4 font-roboto text-lg text-[#6B7280] max-w-2xl mx-auto">
            Curated sanctuaries that blend Ethiopian elegance with modern luxury.
          </p>
        </motion.div>

        {/* Room Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, idx) => (
            <motion.article
              key={idx}
              className="room-card group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="relative h-72 w-full">
                <Image
                  src={room.img}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 right-4 bg-[#D4A017] text-white px-3 py-1 rounded-full font-roboto font-semibold text-sm">
                  From ${room.price}/night
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-playfair text-2xl font-bold text-[#111827] mb-2">
                  {room.name}
                </h3>
                <p className="font-roboto text-sm text-[#6B7280] mb-4">
                  {room.desc}
                </p>

                <ul className="flex flex-wrap gap-2 mb-6">
                  {room.perks.map((perk) => (
                    <li
                      key={perk}
                      className="bg-[#F3F4F6] text-[#1E3A8A] px-3 py-1 rounded-full font-roboto text-xs font-medium"
                    >
                      {perk}
                    </li>
                  ))}
                </ul>

                {/*<div className="mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#1E3A8A] text-white font-roboto font-medium rounded-lg hover:bg-[#1E3A8A]/90 transition-colors"
                  >
                    Book Now <ArrowRight size={16} />
                  </motion.button>
                </div> */}
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
           <Link href="/rooms">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 font-roboto font-medium text-[#1E3A8A] border-2 border-[#1E3A8A] rounded-full hover:bg-[#1E3A8A] hover:text-white transition-colors duration-300"
          >
            View All Rooms
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedRooms;