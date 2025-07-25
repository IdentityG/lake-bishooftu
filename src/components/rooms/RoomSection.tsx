'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Star } from 'lucide-react';
import Link from 'next/link';
import { rooms }  from '../../data/rooms'

gsap.registerPlugin(ScrollTrigger);

interface Room {
  id: string;
  type: 'single' | 'double' | 'standard' | 'vip' | 'family';
  title: string;
  description: string;
  price: number;
  image: string;
  amenities: string[];
  maxGuests: number;
}

const filters = [
  { key: 'all', label: 'All' },
  { key: 'single', label: 'Single' },
  { key: 'double', label: 'Double' },
  { key: 'standard', label: 'Standard' },
  { key: 'vip', label: 'VIP' },
  { key: 'family', label: 'Family' },
];

export default function RoomSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  useEffect(() => {
    gsap.fromTo(
      '.room-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  useEffect(() => {
    const newFiltered =
      activeFilter === 'all'
        ? rooms
        : rooms.filter((r) => r.type === activeFilter);
    setFilteredRooms(newFiltered);
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--warm-white)] py-24 px-4 sm:px-8 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-playfair text-[var(--dark-gray)] text-center mb-4"
        >
          Our Luxury Rooms
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[var(--soft-gray)] text-center mb-12 max-w-2xl mx-auto"
        >
          Discover refined comfort with breathtaking views of Lake Bishoftu.
        </motion.p>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 focus:outline-none
                ${
                  activeFilter === f.key
                    ? 'bg-[var(--ethiopian-gold)] text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-[var(--dark-gray)] hover:bg-gray-200'
                }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredRooms.map((room) => (
              <motion.div
                key={room.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="room-card bg-white rounded-2xl shadow-xl overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-[var(--ethiopian-gold)] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ${room.price} / Night
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-playfair text-[var(--dark-gray)] mb-2">
                    {room.title}
                  </h3>
                  <p className="text-[var(--soft-gray)] text-sm mb-4 line-clamp-3">
                    {room.description}
                  </p>

                  <div className="flex items-center gap-3 text-sm text-[var(--soft-gray)] mb-4">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>Up to {room.maxGuests}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-[var(--ethiopian-gold)]" />
                      <span>4.9</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="text-xs bg-gray-100 text-[var(--dark-gray)] px-3 py-1 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <Link href={`/rooms/details/${room.id}`}>
                    <button className="w-full bg-[var(--nature-green)] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}