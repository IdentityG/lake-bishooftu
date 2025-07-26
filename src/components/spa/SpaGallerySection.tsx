'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

const images = [
  {
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    alt: 'Lakefront Infinity Pool',
    category: 'Pools'
  },
  {
    src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    alt: 'Royal Couple Suite',
    category: 'Suites'
  },
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    alt: 'Hammam Marble',
    category: 'Wellness'
  },
  {
    src: 'https://images.unsplash.com/photo-1556742502-ec7c0e19f32e?w=800&q=80',
    alt: 'Relaxation Lounge',
    category: 'Lounges'
  },
  {
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    alt: 'Herbal Steam',
    category: 'Wellness'
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    alt: 'Zen Garden',
    category: 'Outdoor'
  }
];

export default function SpaGallerySection() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const categories = ['All', ...new Set(images.map((img) => img.category))];
  const filtered = filter === 'All' ? images : images.filter((img) => img.category === filter);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[var(--warm-white)] py-24 sm:py-32">
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[var(--ethiopian-gold)]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[var(--lake-blue)]/10 blur-3xl" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className={`font-playfair text-4xl font-bold tracking-tight text-[var(--dark-gray)] sm:text-5xl lg:text-6xl ${playfair.className}`}>
            Spa Gallery
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[var(--soft-gray)]">
            A visual journey through the serene spaces and exquisite details that define our spa experience.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${playfair.className} cursor-pointer ${
                filter === cat
                  ? 'bg-[var(--lake-blue)] text-white shadow-lg'
                  : 'bg-[var(--warm-white)] text-[var(--dark-gray)] shadow hover:bg-[var(--lake-blue)]/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((img, idx) => (
            <motion.div
              key={`${filter}-${idx}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg"
              onClick={() => setSelected(idx)}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-sm font-medium">{img.category}</span>
                <h3 className={`font-playfair text-xl font-bold ${playfair.className}`}>{img.alt}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[90vh] max-w-5xl rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[selected].src}
                alt={filtered[selected].alt}
                className="h-full w-full object-contain"
              />
              <button
                className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30"
                onClick={() => setSelected(null)}
              >
                <X className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* CTA */}
      
      </div>
    </section>
  );
}