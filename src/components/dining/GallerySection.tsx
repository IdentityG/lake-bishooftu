'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const gallery = [
  { id: 1, src: '/images/gallery-1.jpg', title: 'Sunset Pier', tag: 'Lake Views' },
  { id: 2, src: '/images/gallery-2.jpg', title: 'Royal Suite', tag: 'Accommodation' },
  { id: 3, src: '/images/gallery-3.jpg', title: 'Dhow Dining', tag: 'Culinary' },
  { id: 4, src: '/images/gallery-4.jpg', title: 'Infinity Pool', tag: 'Relaxation' },
  { id: 5, src: '/images/gallery-5.jpg', title: 'Spa Pavilion', tag: 'Wellness' },
  { id: 6, src: '/images/gallery-6.jpg', title: 'Garden Wedding', tag: 'Events' },
  { id: 7, src: '/images/gallery-7.jpg', title: 'Traditional Coffee', tag: 'Culture' },
  { id: 8, src: '/images/gallery-8.jpg', title: 'Morning Kayak', tag: 'Activities' },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.gallery-grid', start: 'top 80%' },
      });
    });
    return () => ctx.revert();
  }, []);

  const paginate = (newDirection: number) => {
    if (selected === null) return;
    const next = selected + newDirection;
    if (next < 0) setSelected(gallery.length - 1);
    else if (next >= gallery.length) setSelected(0);
    else setSelected(next);
    setDirection(newDirection);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#F9FAFB] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            background: `radial-gradient(circle at 25% 25%, var(--ethiopian-gold) 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, var(--lake-blue) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-5xl md:text-7xl font-bold text-[#111827] mb-4">
            A Taste of Elegance
          </h2>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            Savor the art of Ethiopian fine dining — where rich flavors, warm ambiance, and lakeside charm come together in perfect harmony.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item, idx) => (
            <motion.div
              key={item.id}
              className={`gallery-item relative overflow-hidden rounded-2xl cursor-pointer group ${idx % 3 === 0 ? 'md:row-span-2' : ''}`}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => setSelected(idx)}
            >
              <div className="relative w-full h-full min-h-[200px] md:min-h-[280px]">
                {/* Placeholder Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#D4A017] to-[#166534]" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500" />
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay Info */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1"
                >
                  <span className="inline-block px-2 py-1 bg-[#D4A017]/90 text-white text-xs rounded-full">
                    {item.tag}
                  </span>
                  <h3 className="font-playfair text-lg font-bold text-white">{item.title}</h3>
                </motion.div>
              </div>

              {/* Camera Icon */}
              <div className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selected !== null && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
                onClick={() => setSelected(null)}
              >
                <motion.div
                  key={selected}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: 'spring', stiffness: 300, damping: 30 } }}
                  className="relative max-w-5xl max-h-[90vh] mx-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={gallery[selected].src}
                    alt={gallery[selected].title}
                    className="rounded-2xl max-w-full max-h-[90vh] object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                    <h3 className="font-playfair text-2xl font-bold text-white">{gallery[selected].title}</h3>
                    <p className="text-white/80 mt-1">{gallery[selected].tag}</p>
                  </div>

                  {/* Close */}
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Arrows */}
                  <button
                    onClick={() => paginate(-1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-[#1E3A8A] text-white px-8 py-4 rounded-full font-medium shadow-lg hover:bg-[#152A6F] transition-colors"
          >
            <Camera className="w-5 h-5" />
            <span>View Full Gallery</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}