'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1920&q=80', alt: 'Lake sunrise' },
  { id: 2, src: 'https://images.unsplash.com/photo-1566073771259-6a8506099825?auto=format&fit=crop&w=1920&q=80', alt: 'Pool deck' },
  { id: 3, src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1920&q=80', alt: 'Traditional coffee' },
  { id: 4, src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80', alt: 'Dining terrace' },
  { id: 5, src: '/images/gallery/5.jpg', alt: 'Room interior' },
  { id: 6, src: '/images/gallery/6.jpg', alt: 'Volcano view' },
  { id: 7, src: '/images/gallery/7.jpg', alt: 'Spa sanctuary' },
  { id: 8, src: '/images/gallery/8.jpg', alt: 'Night lights' },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.grid-item',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'elastic.out(1, 0.7)',
          scrollTrigger: { trigger: '.grid-item', start: 'top 95%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#F9FAFB] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Parallax decorative shapes */}
      <div className="absolute top-0 -left-24 w-72 h-72 bg-[#D4A017]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 -right-24 w-96 h-96 bg-[#1E3A8A]/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-[#1E3A8A]">
            Lens on Luxury
          </h2>
          <p className="mt-4 font-roboto text-lg text-[#6B7280] max-w-2xl mx-auto">
            Moments captured where nature, culture, and elegance intertwine.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              className={`grid-item relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-300 ${idx % 5 === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
              onClick={() => setSelected(img.id)}
              whileHover={{ scale: 1.03 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="font-roboto text-white text-sm">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative w-full max-w-4xl max-h-[90vh] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images.find((i) => i.id === selected)?.src || ''}
                  alt={images.find((i) => i.id === selected)?.alt || ''}
                  fill
                  className="object-contain rounded-2xl"
                />
                <button
                  className="absolute top-4 right-4 text-white text-3xl"
                  onClick={() => setSelected(null)}
                >
                  &times;
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}